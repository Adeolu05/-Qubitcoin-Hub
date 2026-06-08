export type ResourceBadge = "official" | "recommended" | "community";

export interface EcosystemResource {
  id: string;
  name: string;
  url: string;
  description: string;
  badge?: ResourceBadge;
  note?: string;
  /** Mining pool stratum endpoint */
  stratum?: string;
}

/** Verified pools, community list from Qverse ecosystem roundup */
export const MINING_POOLS: EcosystemResource[] = [
  {
    id: "luckypool",
    name: "LuckyPool",
    url: "https://qtc.luckypool.io/",
    stratum: "stratum+tcp://qubitcoin.luckypool.io:8610",
    description:
      "Popular QTC pool with a stats dashboard and how-to-mine guides. Default in our mining wizard.",
    badge: "recommended",
  },
  {
    id: "rplant",
    name: "Rplant",
    url: "https://pool.rplant.xyz",
    description:
      "Multi-coin pool operator with QTC support. Good alternative if you already mine on Rplant.",
    badge: "community",
  },
  {
    id: "suprnova",
    name: "Suprnova",
    url: "https://qtc.suprnova.cc",
    description:
      "Established pool network (Suprnova) with a dedicated QTC instance.",
    badge: "community",
  },
  {
    id: "qverse",
    name: "Qverse Pool",
    url: "https://pool.qverse.pro/",
    description:
      "Pool run by the Qverse wallet team. Pairs well if you use the Qverse browser extension.",
    badge: "community",
  },
];

export const WALLETS: EcosystemResource[] = [
  {
    id: "web",
    name: "Official Web Wallet",
    url: "https://wallet.superquantum.io",
    description:
      "Browser wallet from Superquantum. No install, create a bc1 address in seconds.",
    badge: "official",
    note: "Best for beginners and mining payouts.",
  },
  {
    id: "windows",
    name: "Official Windows (Electrum)",
    url: "https://superquantum.io/files/qubitcoin-electrum.exe",
    description:
      "Desktop Electrum fork for Windows. Direct download from Superquantum (~75 MB).",
    badge: "official",
    note: "Save your seed phrase offline. Never share it.",
  },
  {
    id: "qverse",
    name: "Qverse Extension",
    url: "https://chromewebstore.google.com/detail/kjphpgbaehghblgmicbdpggnnofpcoof",
    description:
      "Chrome extension wallet by Qverse. Handy for quick sends while browsing.",
    badge: "community",
    note: "Verify the extension ID on the Chrome Web Store before installing.",
  },
];

export const EXCHANGES: EcosystemResource[] = [
  {
    id: "coinex",
    name: "CoinEx",
    url: "https://www.coinex.com/en/exchange/QTC-USDT",
    description: "QTC/USDT spot market. Check liquidity and fees before trading.",
    badge: "community",
  },
  {
    id: "safetrade",
    name: "SafeTrade",
    url: "https://safetrade.com/exchange/QTC-USDT",
    description: "Privacy-focused exchange listing QTC/USDT.",
    badge: "community",
  },
  {
    id: "exbitron",
    name: "Exbitron",
    url: "https://app.exbitron.com/exchange/?market=QTC-USDT",
    description: "Another QTC/USDT venue. Always confirm the correct trading pair.",
    badge: "community",
  },
];

export const BADGE_LABELS: Record<ResourceBadge, string> = {
  official: "Official",
  recommended: "Recommended",
  community: "Community",
};
