import { sanityClient } from "./sanity";
import { miningFallbackData } from "./mining-fallback";
import type { MiningSetupData, MinerProfile } from "./mining-types";

const miningQuery = `{
  "config": *[_type == "miningConfig"][0]{
    _id, title, defaultPoolHost, defaultPoolPort, poolGuideUrl,
    walletDownloadUrl, walletAddressRegex, walletAddressHint,
    algorithm, verifiedSource, lastVerified, poolServers
  },
  "miners": *[_type == "minerProfile"] | order(sortOrder asc) {
    _id, name, "slug": slug.current, vendor, algoFlag, downloadUrl,
    downloadLabel, windowsBatTemplate, linuxShTemplate, configLineHelp,
    devFee, recommended, sortOrder, stuckHelp
  }
}`;

export async function getMiningSetupData(): Promise<MiningSetupData> {
  try {
    const data = await sanityClient.fetch<MiningSetupData>(miningQuery);
    if (data?.config && data.miners?.length) {
      return data;
    }
  } catch {
    // Fall through to local verified defaults
  }
  return miningFallbackData;
}

export function getRecommendedMiner(
  miners: MinerProfile[],
  vendor: string,
): MinerProfile | undefined {
  const vendorMap: Record<string, string[]> = {
    nvidia: ["nvidia", "multi"],
    amd: ["amd", "multi"],
    cpu: ["cpu", "multi"],
    unsure: ["multi", "nvidia", "amd"],
  };

  const preferred = vendorMap[vendor] ?? vendorMap.unsure;
  for (const v of preferred) {
    const match = miners.find((m) => m.vendor === v && m.recommended);
    if (match) return match;
  }
  return miners.find((m) => m.recommended) ?? miners[0];
}

export function validateWalletAddress(
  address: string,
  regexPattern: string,
): boolean {
  try {
    return new RegExp(regexPattern).test(address.trim());
  } catch {
    return address.trim().startsWith("bc1") && address.trim().length >= 14;
  }
}

export function renderMinerConfig(
  template: string,
  values: {
    wallet: string;
    worker: string;
    poolHost: string;
    poolPort: number;
  },
): string {
  return template
    .replaceAll("{{wallet}}", values.wallet.trim())
    .replaceAll("{{worker}}", values.worker.trim())
    .replaceAll("{{poolHost}}", values.poolHost)
    .replaceAll("{{poolPort}}", String(values.poolPort));
}

export function explainConfigLine(
  line: string,
  help: MinerProfile["configLineHelp"],
): string | undefined {
  const match = help.find((h) => line.includes(h.pattern));
  return match?.explanation;
}
