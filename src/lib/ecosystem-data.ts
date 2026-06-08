export type EcosystemCategory =
  | "core"
  | "mining"
  | "wallet"
  | "market"
  | "community";

export interface EcosystemNode {
  id: string;
  label: string;
  category: EcosystemCategory;
  description: string;
  url?: string;
  x: number;
  y: number;
}

export interface EcosystemEdge {
  from: string;
  to: string;
  label?: string;
}

export const ecosystemNodes: EcosystemNode[] = [
  {
    id: "network",
    label: "Qubitcoin Network",
    category: "core",
    description:
      "The blockchain secured by qPoW. 21M cap, ~10 min blocks, ASERT difficulty.",
    x: 50,
    y: 45,
  },
  {
    id: "node",
    label: "Full Node",
    category: "core",
    description: "qubitcoind: run a full node to validate blocks and relay transactions.",
    url: "https://superquantum.io/qubitcoin",
    x: 22,
    y: 25,
  },
  {
    id: "explorer",
    label: "Block Explorer",
    category: "core",
    description: "View blocks, transactions, top holders, and network stats.",
    url: "https://explorer.superquantum.io",
    x: 78,
    y: 22,
  },
  {
    id: "miner-soft",
    label: "Mining Software",
    category: "mining",
    description: "qubitcoin-miner (official), OneZeroMiner (NVIDIA), WildRig Multi (AMD/NVIDIA).",
    url: "https://superquantum.io/qubitcoin",
    x: 18,
    y: 55,
  },
  {
    id: "pool",
    label: "Mining Pools",
    category: "mining",
    description:
      "LuckyPool (recommended), Rplant, Suprnova, and Qverse. Stratum example: qubitcoin.luckypool.io:8610.",
    url: "/pool",
    x: 35,
    y: 72,
  },
  {
    id: "gpu",
    label: "Your GPU",
    category: "mining",
    description: "NVIDIA RTX recommended. Runs 16-qubit circuit sims via cuQuantum/cuStateVec.",
    x: 12,
    y: 78,
  },
  {
    id: "wallet-web",
    label: "Web Wallet",
    category: "wallet",
    description: "Browser-based wallet at wallet.superquantum.io. No install, instant bc1 address.",
    url: "https://wallet.superquantum.io/",
    x: 72,
    y: 58,
  },
  {
    id: "wallet-electrum",
    label: "Electrum Wallet",
    category: "wallet",
    description:
      "Official Windows desktop wallet. Direct .exe from superquantum.io/files.",
    url: "https://superquantum.io/files/qubitcoin-electrum.exe",
    x: 88,
    y: 38,
  },
  {
    id: "wallet-qverse",
    label: "Qverse Wallet",
    category: "wallet",
    description:
      "Chrome extension wallet. Pairs with Qverse pool for a browser-native flow.",
    url: "https://chromewebstore.google.com/detail/kjphpgbaehghblgmicbdpggnnofpcoof",
    x: 78,
    y: 48,
  },
  {
    id: "exchange",
    label: "Exchanges",
    category: "market",
    description:
      "Trade QTC/USDT on CoinEx, SafeTrade, and Exbitron. Thin liquidity, DYOR.",
    url: "/buy",
    x: 88,
    y: 68,
  },
  {
    id: "superquantum",
    label: "Superquantum",
    category: "community",
    description: "Non-profit behind Qubitcoin. Downloads, docs, and project vision.",
    url: "https://superquantum.io/qubitcoin",
    x: 55,
    y: 18,
  },
  {
    id: "community",
    label: "Community",
    category: "community",
    description: "Telegram, Discord, X, and regional language groups.",
    url: "/community",
    x: 62,
    y: 82,
  },
];

export const ecosystemEdges: EcosystemEdge[] = [
  { from: "superquantum", to: "network", label: "maintains" },
  { from: "node", to: "network", label: "validates" },
  { from: "explorer", to: "network", label: "indexes" },
  { from: "gpu", to: "miner-soft", label: "runs" },
  { from: "miner-soft", to: "pool", label: "connects" },
  { from: "pool", to: "network", label: "finds blocks" },
  { from: "wallet-web", to: "network", label: "receives QTC" },
  { from: "wallet-electrum", to: "network", label: "receives QTC" },
  { from: "wallet-qverse", to: "network", label: "receives QTC" },
  { from: "exchange", to: "network", label: "trades QTC" },
  { from: "community", to: "superquantum", label: "supports" },
  { from: "gpu", to: "network", label: "secures via qPoW" },
];

export const categoryColors: Record<EcosystemCategory, string> = {
  core: "#7c3aed",
  mining: "#fbbf24",
  wallet: "#1abc9c",
  market: "#34d399",
  community: "#f472b6",
};
