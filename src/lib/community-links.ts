export type LinkSection = "official" | "community" | "research" | "network";

export interface CommunityLink {
  id: string;
  name: string;
  url: string;
  description: string;
  section: LinkSection;
  badge?: "official" | "community" | "research";
}

export const COMMUNITY_SECTIONS: { id: LinkSection; label: string; description: string }[] = [
  {
    id: "official",
    label: "Official project",
    description: "Downloads, docs, roadmap, and open-source code",
  },
  {
    id: "network",
    label: "Network tools",
    description: "Explorer, hashrate, and on-chain data",
  },
  {
    id: "community",
    label: "Community channels",
    description: "Where the team and community communicate",
  },
  {
    id: "research",
    label: "Research & media",
    description: "Papers, articles, interviews, and talks",
  },
];

export const COMMUNITY_LINKS: CommunityLink[] = [
  {
    id: "superquantum",
    name: "Superquantum",
    url: "https://superquantum.io/qubitcoin",
    description: "Official project home: miners, wallets, node binaries, docs.",
    section: "official",
    badge: "official",
  },
  {
    id: "roadmap",
    name: "Official roadmap",
    url: "https://superquantum.io/roadmap",
    description: "Long-term vision and upcoming milestones.",
    section: "official",
    badge: "official",
  },
  {
    id: "github",
    name: "GitHub: qubitcoin",
    url: "https://github.com/super-quantum/qubitcoin",
    description: "Node, miner source code, and release notes.",
    section: "official",
    badge: "official",
  },
  {
    id: "github-rmsynth",
    name: "GitHub: rmsynth",
    url: "https://github.com/super-quantum/rmsynth",
    description: "Clifford+T circuit optimization tool for compilation workflow.",
    section: "official",
    badge: "official",
  },
  {
    id: "explorer",
    name: "Block explorer",
    url: "https://explorer.superquantum.io",
    description: "Blocks, transactions, top holders, and network stats.",
    section: "network",
    badge: "official",
  },
  {
    id: "luckypool-stats",
    name: "LuckyPool hashrate",
    url: "https://qtc.luckypool.io/",
    description: "Network hashrate dashboard and pool stats.",
    section: "network",
    badge: "community",
  },
  {
    id: "telegram",
    name: "Telegram (English)",
    url: "https://t.me/qubitcoingroup",
    description: "Main community group. English only: see regional groups below.",
    section: "community",
    badge: "official",
  },
  {
    id: "discord",
    name: "Discord",
    url: "https://discord.gg/FTmV3GYd9a",
    description: "Community chat and support.",
    section: "community",
    badge: "official",
  },
  {
    id: "x",
    name: "X (Twitter)",
    url: "https://x.com/qubitcoinx",
    description: "Official announcements and updates.",
    section: "community",
    badge: "official",
  },
  {
    id: "medium-intro",
    name: "Medium: Boost quantum simulators",
    url: "https://medium.com/@qubitcoin/boost-quantum-simulators-with-your-hashpower-c8142ad73894",
    description: "Founding blog post on qPoW and useful mining work.",
    section: "research",
    badge: "research",
  },
  {
    id: "medium-beginners",
    name: "Medium: Beginner's guide",
    url: "https://superquantum.medium.com/a-beginners-guide-to-qubitcoin-c231c22836a0",
    description: "Accessible intro to Qubitcoin for newcomers.",
    section: "research",
    badge: "research",
  },
  {
    id: "medium-compilation",
    name: "Medium: Decoding the T-gate",
    url: "https://superquantum.medium.com/decoding-the-t-gate-bcc0ea590599",
    description: "Quantum compilation and coding theory primer.",
    section: "research",
    badge: "research",
  },
  {
    id: "arxiv",
    name: "arXiv preprint",
    url: "https://arxiv.org/pdf/2204.10643",
    description: "Quantum Proof of Work with Parameterized Quantum Circuits.",
    section: "research",
    badge: "research",
  },
  {
    id: "interview",
    name: "Founder interview (YouTube)",
    url: "https://youtu.be/Fj1Z8qANEoU",
    description: "Mikhail Shalaginov on quantum computing → qPoW → Qubitcoin.",
    section: "research",
    badge: "research",
  },
  {
    id: "anniversary",
    name: "Anniversary stream (YouTube)",
    url: "https://www.youtube.com/live/E-usWHq_5JY",
    description: "qPoW demo and project direction: Nov 2025.",
    section: "research",
    badge: "research",
  },
  {
    id: "iquhack",
    name: "MIT iQuHACK",
    url: "https://iquhack.mit.edu/",
    description: "Superquantum is a top-tier sponsor of the MIT quantum hackathon.",
    section: "research",
    badge: "official",
  },
];

export const REGIONAL_GROUPS = [
  { region: "Germany 🇩🇪", url: "https://t.me/qtc_dach" },
  { region: "Netherlands & Belgium 🇳🇱🇧🇪", url: "https://t.me/+2ds0vwk-pC42ZWJk" },
  { region: "Russia 🇷🇺", url: "https://t.me/qubitcoinrussia" },
  { region: "Turkey 🇹🇷", url: "https://t.me/qubitcointr" },
  { region: "Ukraine 🇺🇦", url: "https://t.me/qubitcoinUA" },
  { region: "Indonesia 🇮🇩", url: "https://t.me/qtc_indonesia" },
  { region: "UAE 🇦🇪", url: "https://t.me/Qtc_UAE" },
] as const;

/** Verified OTC admins from official Telegram, never trust random DMs */
export const VERIFIED_OTC_CONTACTS = [
  "@Juanma15gg",
  "@LukasQtc",
  "@Kixyz4n",
  "@Rapha991",
  "Francesco (admin)",
] as const;
