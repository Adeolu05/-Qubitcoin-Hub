export type UpdateSeverity = "critical" | "important" | "info";
export type UpdateAudience = "miners" | "node-operators" | "wallet-users" | "everyone";

export interface NetworkUpdate {
  id: string;
  date: string;
  title: string;
  summary: string;
  severity: UpdateSeverity;
  audience: UpdateAudience[];
  action: string;
  sources: { label: string; url: string }[];
}

export interface ProjectMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  url?: string;
}

/** Curated from official Telegram announcements, not a live feed */
export const NETWORK_UPDATES: NetworkUpdate[] = [
  {
    id: "patch-sep-2025",
    date: "2025-09-23",
    title: "Breaking hash algorithm patch",
    summary:
      "Emergency patch changed the QHash algorithm. Existing mining software stopped working after activation unless updated. Node operators and miners had ~48 hours to upgrade.",
    severity: "critical",
    audience: ["miners", "node-operators", "wallet-users"],
    action:
      "Update node binary from superquantum.io or GitHub. Update miner software (OneZeroMiner / WildRig). Use the new Electrum wallet from the downloads section.",
    sources: [
      { label: "Downloads", url: "https://superquantum.io/qubitcoin" },
      { label: "GitHub", url: "https://github.com/super-quantum/qubitcoin" },
    ],
  },
  {
    id: "patch-aug-2025",
    date: "2025-08-02",
    title: "Hash function security patch",
    summary:
      "Second security patch rejecting potentially malicious blocks. Source and binaries on website and GitHub were updated before the ~24h activation window.",
    severity: "critical",
    audience: ["node-operators", "miners"],
    action:
      "Update qubitcoind and mining software from official sources before any deadline announced in Telegram or X.",
    sources: [
      { label: "GitHub", url: "https://github.com/super-quantum/qubitcoin" },
      { label: "Superquantum", url: "https://superquantum.io/qubitcoin" },
    ],
  },
  {
    id: "patch-jul-2025",
    date: "2025-07-20",
    title: "First emergency hash patch",
    summary:
      "Potential exploit in the hash function. Team released emergency node binary; source withheld briefly during the 24h consensus window.",
    severity: "critical",
    audience: ["node-operators"],
    action:
      "Node operators must run updated binaries. Pool/exchange operators who couldn't go offline contacted the team directly.",
    sources: [
      { label: "Superquantum", url: "https://superquantum.io/qubitcoin" },
    ],
  },
  {
    id: "electrum-sep-2025",
    date: "2025-09-25",
    title: "Electrum wallet & explorer restored",
    summary:
      "Electrum server was temporarily down during the hash update. Updated Electrum wallet released, old version may not work after network update.",
    severity: "important",
    audience: ["wallet-users"],
    action:
      "Download the latest qubitcoin-electrum from superquantum.io. Restart your wallet if connections fail.",
    sources: [
      {
        label: "Windows wallet",
        url: "https://superquantum.io/files/qubitcoin-electrum.exe",
      },
      { label: "Web wallet", url: "https://wallet.superquantum.io" },
    ],
  },
  {
    id: "electrum-aug-2025",
    date: "2025-08-01",
    title: "Electrum server restart (CMC listing)",
    summary:
      "Electrum server restarted for CMC integration. Traffic redirected to backup, users may need to restart Electrum wallets.",
    severity: "info",
    audience: ["wallet-users"],
    action: "Restart Electrum if it stops syncing. Web wallet unaffected.",
    sources: [{ label: "Explorer", url: "https://explorer.superquantum.io" }],
  },
  {
    id: "web-wallet-aug-2025",
    date: "2025-08-14",
    title: "Official web wallet launched",
    summary:
      "Browser-based Qubitcoin wallet released, no heavy install required.",
    severity: "info",
    audience: ["everyone", "wallet-users"],
    action: "Use wallet.superquantum.io for a quick bc1 address.",
    sources: [{ label: "Web wallet", url: "https://wallet.superquantum.io" }],
  },
  {
    id: "sdc-nov-2025",
    date: "2025-11-29",
    title: "Superdense Consensus: early code release",
    summary:
      "Multi-task PoW architecture on GitHub sdc-testing branch. Experimental, not for production. Community testing and feedback welcome.",
    severity: "info",
    audience: ["node-operators"],
    action:
      "Developers: review sdc-testing branch. Do not run test binaries on production nodes or mainnet mining.",
    sources: [
      {
        label: "GitHub (sdc-testing)",
        url: "https://github.com/super-quantum/qubitcoin/tree/sdc-testing",
      },
    ],
  },
];

export const PROJECT_MILESTONES: ProjectMilestone[] = [
  {
    id: "medium-launch",
    date: "2024-08",
    title: "First Medium blog post",
    description: "Core qPoW vision published: useful quantum simulation via mining.",
    url: "https://medium.com/@qubitcoin/boost-quantum-simulators-with-your-hashpower-c8142ad73894",
  },
  {
    id: "roadmap",
    date: "2025-07",
    title: "Official roadmap live",
    description: "Long-term milestones published at superquantum.io/roadmap.",
    url: "https://superquantum.io/roadmap",
  },
  {
    id: "x-launch",
    date: "2025-07",
    title: "Official X account",
    description: "Project presence at x.com/qubitcoinx.",
    url: "https://x.com/qubitcoinx",
  },
  {
    id: "cmc-cg",
    date: "2025-08",
    title: "CMC submitted, CoinGecko ready",
    description: "Top holders added to explorer with SafeTrade help.",
    url: "https://explorer.superquantum.io",
  },
  {
    id: "coinex",
    date: "2025-09",
    title: "CoinEx listing",
    description: "QTC/USDT spot market goes live.",
    url: "https://www.coinex.com/en/exchange/QTC-USDT",
  },
  {
    id: "ama",
    date: "2025-09",
    title: "#AskQTC AMA",
    description: "13 team answers on wallets, security, hashrate, smart contracts, and roadmap.",
    url: "/faq#from-team",
  },
  {
    id: "anniversary",
    date: "2025-11",
    title: "Launch anniversary + qPoW demo",
    description: "Live stream with demo and updated project direction.",
    url: "https://www.youtube.com/live/E-usWHq_5JY",
  },
  {
    id: "rmsynth",
    date: "2026-01",
    title: "rmsynth tool released",
    description: "Clifford+T optimization for compilation workflow.",
    url: "https://github.com/super-quantum/rmsynth",
  },
  {
    id: "iquhack",
    date: "2026-01",
    title: "MIT iQuHACK top-tier sponsor",
    description: "Superquantum sponsors the MIT quantum hackathon.",
    url: "https://iquhack.mit.edu/",
  },
];

export const CURRENT_STATUS = {
  lastReviewed: "2026-03",
  message:
    "Always verify you are on the latest node, miner, and wallet from superquantum.io or GitHub. Critical patches are announced on Telegram and X first, check /community for official channels.",
  downloadUrl: "https://superquantum.io/qubitcoin",
  githubUrl: "https://github.com/super-quantum/qubitcoin",
};
