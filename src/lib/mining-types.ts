export type HardwareVendor = "nvidia" | "amd" | "cpu" | "multi" | "unsure";
export type OSType = "windows" | "linux";

export interface ConfigLineHelp {
  pattern: string;
  explanation: string;
}

export interface MinerProfile {
  _id: string;
  name: string;
  slug: string;
  vendor: HardwareVendor;
  algoFlag: string;
  downloadUrl: string;
  downloadLabel: string;
  windowsBatTemplate: string;
  linuxShTemplate: string;
  configLineHelp: ConfigLineHelp[];
  devFee: string;
  recommended: boolean;
  sortOrder: number;
  stuckHelp: string;
}

export interface PoolServer {
  region: string;
  host: string;
  ports: number[];
}

export interface MiningConfig {
  _id: string;
  title: string;
  defaultPoolHost: string;
  defaultPoolPort: number;
  poolGuideUrl: string;
  walletDownloadUrl: string;
  walletAddressRegex: string;
  walletAddressHint: string;
  algorithm: string;
  verifiedSource: string;
  lastVerified?: string;
  poolServers: PoolServer[];
}

export interface MiningSetupData {
  config: MiningConfig;
  miners: MinerProfile[];
}
