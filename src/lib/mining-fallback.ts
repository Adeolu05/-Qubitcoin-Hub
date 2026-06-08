import type { MiningSetupData } from "./mining-types";

/** Verified fallback when Sanity is unreachable. Source: qtc.luckypool.io/how-to-mine */
export const miningFallbackData: MiningSetupData = {
  config: {
    _id: "fallback",
    title: "Qubitcoin Mining Defaults",
    defaultPoolHost: "qubitcoin.luckypool.io",
    defaultPoolPort: 8610,
    poolGuideUrl: "https://qtc.luckypool.io/how-to-mine",
    walletDownloadUrl: "https://superquantum.io/qubitcoin",
    walletAddressRegex: "^bc1[a-z0-9]{25,62}$",
    walletAddressHint:
      "Your QTC wallet address starts with bc1 (Bitcoin-style SegWit format)",
    algorithm: "qhash",
    verifiedSource: "https://qtc.luckypool.io/how-to-mine",
    lastVerified: "2026-06-07",
    poolServers: [
      {
        region: "Europe (France)",
        host: "qubitcoin.luckypool.io",
        ports: [8610, 8611, 8615, 8616],
      },
    ],
  },
  miners: [
    {
      _id: "onezerominer",
      name: "OneZeroMiner",
      slug: "onezerominer",
      vendor: "nvidia",
      algoFlag: "qhash",
      downloadUrl: "https://github.com/OneZeroMiner/onezerominer/releases",
      downloadLabel: "Download OneZeroMiner (GitHub Releases)",
      windowsBatTemplate:
        "@echo off\ncd /d %~dp0\nonezerominer.exe -a qhash -w {{wallet}}.{{worker}} -o stratum+tcp://{{poolHost}}:{{poolPort}}\npause",
      linuxShTemplate:
        "./onezerominer -a qhash -w {{wallet}}.{{worker}} -o stratum+tcp://{{poolHost}}:{{poolPort}}",
      configLineHelp: [
        {
          pattern: "-a qhash",
          explanation:
            "Tells the miner to use the QHash algorithm (Quantum Proof of Work).",
        },
        {
          pattern: "-w",
          explanation:
            "Your wallet address and worker name, separated by a dot.",
        },
        {
          pattern: "-o stratum+tcp://",
          explanation: "Connects your miner to the LuckyPool mining server.",
        },
      ],
      devFee: "3%",
      recommended: true,
      sortOrder: 1,
      stuckHelp:
        "Make sure you extracted the miner zip, run as administrator, and have an NVIDIA GPU with updated drivers.",
    },
    {
      _id: "wildrig-multi",
      name: "WildRig Multi",
      slug: "wildrig-multi",
      vendor: "amd",
      algoFlag: "qhash",
      downloadUrl: "https://github.com/andru-kun/wildrig-multi/releases",
      downloadLabel: "Download WildRig Multi (GitHub Releases)",
      windowsBatTemplate:
        "@echo off\ncd /d %~dp0\nwildrig-multi.exe --algo qhash --url stratum+tcp://{{poolHost}}:{{poolPort}} --user {{wallet}}.{{worker}} --pass x\npause",
      linuxShTemplate:
        "./wildrig-multi --algo qhash --url stratum+tcp://{{poolHost}}:{{poolPort}} --user {{wallet}}.{{worker}} --pass x",
      configLineHelp: [
        {
          pattern: "--algo qhash",
          explanation: "Sets the mining algorithm to QHash (qPoW).",
        },
        {
          pattern: "--user",
          explanation: "Your wallet address and worker name combined.",
        },
        {
          pattern: "--url",
          explanation: "The pool server address your miner connects to.",
        },
      ],
      devFee: "1%",
      recommended: true,
      sortOrder: 2,
      stuckHelp:
        "WildRig supports both AMD and NVIDIA. Try port 8611 if 8610 doesn't connect.",
    },
  ],
};
