import {
  EXCHANGES,
  MINING_POOLS,
  WALLETS,
  type EcosystemResource,
} from "@/lib/ecosystem-links";

export type LessonCategory = "practical" | "fundamentals" | "vision";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonResource {
  name: string;
  url: string;
  description?: string;
  badge?: "official" | "recommended" | "community";
  internal?: boolean;
}

export interface AcademyLesson {
  slug: string;
  title: string;
  description: string;
  category: LessonCategory;
  xp: number;
  icon: string;
  content: string[];
  resources?: LessonResource[];
  quiz: QuizQuestion[];
}

export const LESSON_CATEGORIES: {
  id: LessonCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "practical",
    label: "Getting started",
    description: "Wallets, pools, exchanges & verified links",
  },
  {
    id: "fundamentals",
    label: "Technical basics",
    description: "qPoW, supply & how mining works",
  },
  {
    id: "vision",
    label: "Big picture",
    description: "Why Qubitcoin exists",
  },
];

function toResources(items: EcosystemResource[]): LessonResource[] {
  return items.map((r) => ({
    name: r.name,
    url: r.url,
    description: r.description,
    badge: r.badge,
  }));
}

export const academyBadges = [
  {
    id: "quantum-novice",
    name: "Quantum Novice",
    description: "Complete your first Academy lesson",
    icon: "◇",
  },
  {
    id: "qubit-miner",
    name: "Qubit Miner",
    description: "Complete 3 Academy lessons",
    icon: "⚛",
  },
  {
    id: "network-navigator",
    name: "Network Navigator",
    description: "Complete all Getting started lessons",
    icon: "🔗",
  },
  {
    id: "superposition-scholar",
    name: "Superposition Scholar",
    description: "Complete all Academy lessons",
    icon: "✦",
  },
  {
    id: "perfect-score",
    name: "Perfect Circuit",
    description: "Ace a quiz with 100% on the first try",
    icon: "◎",
  },
] as const;

export const academyLessons: AcademyLesson[] = [
  {
    slug: "ecosystem-navigator",
    title: "Your QTC toolkit",
    description: "Where to find pools, wallets, exchanges & official sources.",
    category: "practical",
    xp: 45,
    icon: "🔗",
    content: [
      "You don't need to hunt through Discord or random posts, this hub collects verified links in one place.",
      "Mining pools live at /pool (LuckyPool, Rplant, Suprnova, Qverse). Wallets at /wallet. Exchanges at /buy.",
      "Official project home: superquantum.io/qubitcoin, downloads, docs, and node software.",
      "Use /start/mine for a guided mining config. Use /ecosystem for the interactive map of how everything connects.",
      "Bookmark what you need. Always verify URLs match the ones on this site before entering seed phrases or sending funds.",
    ],
    resources: [
      {
        name: "Mining pools",
        url: "/pool",
        description: "All verified QTC pools in one place",
        internal: true,
      },
      {
        name: "Wallets",
        url: "/wallet",
        description: "Official web, Windows, and Qverse extension",
        internal: true,
      },
      {
        name: "Buy QTC",
        url: "/buy",
        description: "CoinEx, SafeTrade, Exbitron USDT pairs",
        internal: true,
      },
      {
        name: "Ecosystem map",
        url: "/ecosystem",
        description: "See how nodes, miners, pools & wallets connect",
        internal: true,
      },
      {
        name: "Superquantum",
        url: "https://superquantum.io/qubitcoin",
        description: "Official project site: downloads & documentation",
        badge: "official",
      },
      {
        name: "GitHub",
        url: "https://github.com/super-quantum/qubitcoin",
        description: "Open-source node and miner code",
        badge: "official",
      },
      {
        name: "Community & channels",
        url: "/community",
        description: "Telegram, Discord, X, research & regional groups",
        internal: true,
      },
      {
        name: "Network updates",
        url: "/updates",
        description: "Patch history and upgrade actions",
        internal: true,
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Where on this site do you find all mining pools?",
        options: ["/wallet", "/pool", "/buy", "/glossary"],
        correctIndex: 1,
        explanation: "/pool lists LuckyPool, Rplant, Suprnova, and Qverse.",
      },
      {
        id: "q2",
        question: "What is the official project website?",
        options: [
          "qverse.pro",
          "superquantum.io/qubitcoin",
          "luckypool.io",
          "coinex.com",
        ],
        correctIndex: 1,
        explanation: "Superquantum hosts official downloads and documentation.",
      },
      {
        id: "q3",
        question: "Before installing a wallet or sending funds, you should…",
        options: [
          "Trust any link from a Telegram DM",
          "Verify the URL matches this site's official links",
          "Skip verification if the logo looks right",
          "Share your seed phrase to confirm it's real",
        ],
        correctIndex: 1,
        explanation: "Always cross-check URLs, phishing sites copy branding.",
      },
    ],
  },
  {
    slug: "wallet-101",
    title: "Wallet essentials",
    description: "Get a QTC address before you mine.",
    category: "practical",
    xp: 40,
    icon: "👛",
    content: [
      "You need a bc1... address to receive mined QTC. No address = no rewards.",
      "Fastest path: the official browser wallet at wallet.superquantum.io, no install, works on any OS.",
      "Windows desktop: direct download of qubitcoin-electrum.exe from superquantum.io/files (~75 MB).",
      "Community option: Qverse Chrome extension, handy for quick sends; verify the Web Store listing first.",
      "Never share your seed phrase. Copy only your receiving address for mining and pool dashboards.",
    ],
    resources: [
      ...toResources(WALLETS),
      {
        name: "All wallet options",
        url: "/wallet",
        description: "Full list with safety notes",
        internal: true,
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "What prefix do QTC wallet addresses use?",
        options: ["0x", "bc1", "qtc1", "1A"],
        correctIndex: 1,
        explanation: "Qubitcoin uses Bitcoin-style SegWit addresses starting with bc1.",
      },
      {
        id: "q2",
        question: "Which wallet works without installing anything?",
        options: [
          "qubitcoind CLI",
          "Official browser wallet",
          "ASIC firmware",
          "Bitcoin Core",
        ],
        correctIndex: 1,
        explanation: "wallet.superquantum.io runs entirely in your browser.",
      },
      {
        id: "q3",
        question: "What should you NEVER share with anyone?",
        options: [
          "Your bc1 receiving address",
          "Your pool worker name",
          "Your seed phrase / private keys",
          "LuckyPool's stratum URL",
        ],
        correctIndex: 2,
        explanation: "Only share receiving addresses. Seed phrases grant full control of funds.",
      },
    ],
  },
  {
    slug: "mining-101",
    title: "Mining 101",
    description: "Hardware, pools, and miners: the essentials.",
    category: "practical",
    xp: 60,
    icon: "⛏",
    content: [
      "Qubitcoin mining uses the QHash algorithm. Your GPU simulates 16-qubit quantum circuits.",
      "NVIDIA GPUs are best supported (OneZeroMiner). AMD works via WildRig Multi.",
      "LuckyPool is our wizard default, stratum+tcp://qubitcoin.luckypool.io:8610. Other pools: Rplant, Suprnova, Qverse.",
      "Each pool has its own dashboard, track payouts with the wallet address you configured in your miner.",
      "Use /start/mine to generate a verified config, or /pool to compare pools before you commit.",
    ],
    resources: [
      ...toResources(MINING_POOLS),
      {
        name: "Guided mining setup",
        url: "/start/mine",
        description: "5-step wizard with ready-to-run config",
        internal: true,
      },
      {
        name: "All pools",
        url: "/pool",
        description: "Compare pools side by side",
        internal: true,
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "What algorithm does Qubitcoin mining use?",
        options: ["SHA-256", "Ethash", "QHash", "RandomX"],
        correctIndex: 2,
        explanation: "QHash is the qPoW mining algorithm.",
      },
      {
        id: "q2",
        question: "Which miner is recommended for NVIDIA GPUs?",
        options: ["WildRig Multi", "OneZeroMiner", "cgminer", "XMRig"],
        correctIndex: 1,
        explanation: "OneZeroMiner has native qhash support for NVIDIA.",
      },
      {
        id: "q3",
        question: "How many QTC mining pools are listed on this site?",
        options: ["1", "2", "4", "10"],
        correctIndex: 2,
        explanation: "LuckyPool, Rplant, Suprnova, and Qverse, see /pool.",
      },
    ],
  },
  {
    slug: "buy-and-trade",
    title: "Buy & trade QTC",
    description: "Where to trade, and what to watch out for.",
    category: "practical",
    xp: 40,
    icon: "💱",
    content: [
      "You don't need an exchange to mine, pools pay directly to your wallet address.",
      "If you want to buy or sell QTC, three venues list QTC/USDT: CoinEx, SafeTrade, and Exbitron.",
      "Liquidity is still thin on all of them. Check spreads, fees, and withdrawal minimums before moving money.",
      "Always do a small test withdrawal to your own wallet before moving larger amounts.",
      "This is not financial advice. QTC is experimental. Only use funds you can afford to lose.",
    ],
    resources: [
      ...toResources(EXCHANGES),
      {
        name: "Exchange guide",
        url: "/buy",
        description: "Full list with trading safety notes",
        internal: true,
      },
      {
        name: "Get a wallet first",
        url: "/wallet",
        description: "You'll need a bc1 address to withdraw to",
        internal: true,
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Which trading pair is used for QTC on these exchanges?",
        options: ["QTC/BTC", "QTC/ETH", "QTC/USDT", "QTC/USD direct"],
        correctIndex: 2,
        explanation: "CoinEx, SafeTrade, and Exbitron list QTC against USDT.",
      },
      {
        id: "q2",
        question: "Before a large withdrawal from an exchange, you should…",
        options: [
          "Skip testing to save fees",
          "Send a small test amount to your wallet first",
          "Post your address publicly for help",
          "Use a random address from Google",
        ],
        correctIndex: 1,
        explanation: "A test withdrawal confirms the exchange sends to the right network and address.",
      },
      {
        id: "q3",
        question: "Do you need an exchange to start mining?",
        options: [
          "Yes, you must buy QTC first",
          "No, pools pay directly to your wallet",
          "Only if you use NVIDIA",
          "Only on weekends",
        ],
        correctIndex: 1,
        explanation: "Mining rewards go straight to the bc1 address in your miner config.",
      },
    ],
  },
  {
    slug: "hold-qtc-101",
    title: "Hold QTC without mining",
    description: "Wallet, buy, and stay safe. No GPU required.",
    category: "practical",
    xp: 45,
    icon: "💎",
    content: [
      "You do not need to mine to own QTC. Many people buy on an exchange and withdraw to their own wallet.",
      "Step 1: create a wallet and copy your bc1 receiving address. Use the official browser wallet for the fastest start.",
      "Step 2: buy QTC on a verified exchange (CoinEx, SafeTrade, or Exbitron). Start with a small amount to learn the flow.",
      "Step 3: withdraw to your own wallet. Always test with a tiny withdrawal first. Never leave large balances on an exchange long term.",
      "Liquidity is thin and spreads can be wide. This is experimental tech, not financial advice. Only use money you can afford to lose.",
      "Bookmark /updates for patch news and /community for official channels. Scammers DM people offering OTC deals.",
    ],
    resources: [
      {
        name: "Wallet options",
        url: "/wallet",
        description: "Official web, Windows, and Qverse extension",
        internal: true,
      },
      {
        name: "Buy QTC",
        url: "/buy",
        description: "Verified exchanges with safety notes",
        internal: true,
      },
      {
        name: "Safety FAQ",
        url: "/faq#safety",
        description: "Scams, OTC, and seed phrase rules",
        internal: true,
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Do you need a GPU to hold QTC?",
        options: [
          "Yes, always",
          "No, you can buy and withdraw to a wallet",
          "Only on CoinEx",
          "Only with a node",
        ],
        correctIndex: 1,
        explanation: "Mining is one way to get QTC. Buying and self-custody is another.",
      },
      {
        id: "q2",
        question: "Before a large exchange withdrawal, you should…",
        options: [
          "Skip testing",
          "Send a small test withdrawal first",
          "Share your seed phrase with support",
          "Use a random address from Google",
        ],
        correctIndex: 1,
        explanation: "A test withdrawal confirms the right network and address format.",
      },
      {
        id: "q3",
        question: "Where should you get OTC or support help?",
        options: [
          "Random Telegram DMs",
          "Official channels listed on /community only",
          "YouTube comments",
          "Discord bots",
        ],
        correctIndex: 1,
        explanation: "Verified OTC admins are listed on the community page only.",
      },
    ],
  },
  {
    slug: "team-answers",
    title: "What the team said",
    description: "AMA answers on security, utility, wallets, and timeline.",
    category: "practical",
    xp: 50,
    icon: "💬",
    content: [
      "These answers come from official #AskQTC and community AMA sessions, not rumors or Telegram hype.",
      "Real utility: mining runs VQA-style quantum simulations and benchmarks hardware. BYOS lets researchers plug in custom solvers.",
      "Security: each mining attempt is bound to block data, replay attacks don't work. 51% risk exists like any PoW chain.",
      "Hashrate: qhash/s is NOT comparable to SHA-256 TH/s. Use network difficulty and block times instead.",
      "No premine, no staking. Founder wallets are visible and time-locked. Multi-year research horizon, patience expected.",
      "Full list in FAQ → From the team. Live patch alerts on /updates and /community.",
    ],
    resources: [
      {
        name: "AMA FAQ section",
        url: "/faq#from-team",
        description: "All 14 team-sourced Q&As",
        internal: true,
      },
      {
        name: "Network updates",
        url: "/updates",
        description: "Patch history and what to do",
        internal: true,
      },
      {
        name: "Community channels",
        url: "/community",
        description: "Telegram, Discord, X, research links",
        internal: true,
      },
      {
        name: "Founder interview",
        url: "https://youtu.be/Fj1Z8qANEoU",
        description: "Mikhail Shalaginov on YouTube",
        badge: "official",
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "Can someone replay a mining simulation to fork the chain?",
        options: [
          "Yes, simulations are reusable",
          "No, each attempt is bound to block data",
          "Only on Tuesdays",
          "Only with 51% hashrate",
        ],
        correctIndex: 1,
        explanation: "Block data determines circuit parameters, any change produces a new result.",
      },
      {
        id: "q2",
        question: "How should you compare Qubitcoin hashrate to Bitcoin?",
        options: [
          "Compare TH/s directly",
          "Don't use qhash/s and network difficulty instead",
          "Multiply by 1000",
          "Only compare on CoinEx",
        ],
        correctIndex: 1,
        explanation: "qhash/s counts full qPoW cycles, not SHA-256 hashes.",
      },
      {
        id: "q3",
        question: "Was there a premine?",
        options: [
          "Yes, 50% premine",
          "No, mined after launch; team wallets visible",
          "Only for exchanges",
          "Classified",
        ],
        correctIndex: 1,
        explanation: "Team stated no premine in the Aug 2025 AMA.",
      },
      {
        id: "q4",
        question: "Where do you find official patch announcements?",
        options: [
          "Random Discord DMs",
          "Official Telegram, X, and /updates on this site",
          "Only on CoinGecko",
          "Reddit only",
        ],
        correctIndex: 1,
        explanation: "Critical updates are announced on official channels first.",
      },
    ],
  },
  {
    slug: "qpow-basics",
    title: "qPoW in 2 minutes",
    description: "Can you explain quantum proof of work to a friend?",
    category: "fundamentals",
    xp: 50,
    icon: "⚛",
    content: [
      "Traditional mining solves random SHA-256 puzzles. The work is thrown away after each attempt.",
      "qPoW (Quantum Proof of Work) replaces that puzzle with a 16-qubit quantum circuit simulation on your GPU.",
      "Gates like Ry, Rz, and CNOT transform the circuit. Angles come from hashed block data, so every block is unique.",
      "After the simulation, expectation values are compressed into a 256-bit hash checked against network difficulty.",
      "If the hash is valid, you found a block and earn QTC. If not, the miner tweaks the nonce and tries again.",
      "This is real GPU work (cuQuantum/cuStateVec), not a metaphor. Researchers use mining data to benchmark simulators.",
      "Read the full Learn guide for an interactive circuit you can run in your browser.",
    ],
    resources: [
      {
        name: "Deep dive: qPoW",
        url: "/learn/qpow",
        description: "Full explainer with circuit visualizer",
        internal: true,
      },
      {
        name: "How it works",
        url: "/learn/how-it-works",
        description: "Mining loop from GPU to block reward",
        internal: true,
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "What does qPoW stand for?",
        options: [
          "Quick Proof of Wealth",
          "Quantum Proof of Work",
          "Queued Proof of Wallet",
          "Quantum Pool of Workers",
        ],
        correctIndex: 1,
        explanation: "qPoW = Quantum Proof of Work, mining via quantum circuit simulation.",
      },
      {
        id: "q2",
        question: "How many qubits does the QHash circuit use?",
        options: ["4", "8", "16", "32"],
        correctIndex: 2,
        explanation: "Qubitcoin uses 16-qubit circuits derived from hashed block data.",
      },
      {
        id: "q3",
        question: "Which gate entangles two qubits?",
        options: ["Ry", "Rz", "CNOT", "SHA-256"],
        correctIndex: 2,
        explanation: "CNOT (controlled-NOT) links a control qubit to a target qubit.",
      },
    ],
  },
  {
    slug: "tokenomics-quiz",
    title: "Supply & halving",
    description: "Same scarcity story as Bitcoin.",
    category: "fundamentals",
    xp: 40,
    icon: "◐",
    content: [
      "Qubitcoin has a hard cap of 21,000,000 QTC, identical to Bitcoin.",
      "Block reward starts at 50 QTC and halves every 210,000 blocks (~4 years).",
      "We're currently in Epoch 0. Early miners earn the highest per-block rewards.",
      "Scarcity is built into the protocol, no team can print more coins.",
      "Block time targets ~10 minutes. ASERT adjusts difficulty as hashrate changes.",
      "If you know Bitcoin's halving chart, you already understand QTC emissions.",
      "See the interactive halving curve on the Learn tokenomics page.",
    ],
    resources: [
      {
        name: "Tokenomics page",
        url: "/learn/tokenomics",
        description: "Halving curve and epoch breakdown",
        internal: true,
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "What is Qubitcoin's max supply?",
        options: ["10.5M", "21M", "84M", "Unlimited"],
        correctIndex: 1,
        explanation: "21 million QTC, same cap as Bitcoin.",
      },
      {
        id: "q2",
        question: "How often does the block reward halve?",
        options: [
          "Every 100,000 blocks",
          "Every 210,000 blocks",
          "Every year",
          "Never",
        ],
        correctIndex: 1,
        explanation: "Halving every 210,000 blocks, matching Bitcoin's schedule.",
      },
    ],
  },
  {
    slug: "vision-quiz",
    title: "Why Qubitcoin?",
    description: "The bigger picture behind useful work.",
    category: "vision",
    xp: 50,
    icon: "✦",
    content: [
      "Bitcoin proved incentives drive hardware innovation (CPU → GPU → ASIC).",
      "Qubitcoin applies that same competitive drive to quantum simulators.",
      "Every mining attempt produces simulation data useful for benchmarking GPUs and solvers.",
      "BYOS (Bring Your Own Solver) lets researchers plug in custom quantum backends.",
      "You don't need a physics degree to trust the network: proof-of-work security still applies.",
      "The vision: miners earn coins, science gets data, hardware gets better.",
      "Read the full Learn article for the four reasons qPoW matters.",
    ],
    resources: [
      {
        name: "Why it matters",
        url: "/learn/why-it-matters",
        description: "Vision, BYOS, and useful work",
        internal: true,
      },
      {
        name: "Superquantum",
        url: "https://superquantum.io/qubitcoin",
        description: "Official project vision and research goals",
        badge: "official",
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "What makes qPoW different from Bitcoin mining?",
        options: [
          "It uses proof of stake",
          "The work advances quantum simulation",
          "It doesn't require electricity",
          "It has no block rewards",
        ],
        correctIndex: 1,
        explanation: "qPoW mining produces useful quantum simulation work.",
      },
      {
        id: "q2",
        question: "What does BYOS stand for?",
        options: [
          "Bring Your Own Server",
          "Bring Your Own Solver",
          "Build Your Own Software",
          "Bitcoin Yield Optimization System",
        ],
        correctIndex: 1,
        explanation: "Miners can use custom quantum solver backends.",
      },
    ],
  },
];

/** Wallet-first practical track order */
export const PRACTICAL_LESSON_ORDER = [
  "wallet-101",
  "mining-101",
  "ecosystem-navigator",
  "buy-and-trade",
  "team-answers",
  "hold-qtc-101",
] as const;

export const FUNDAMENTALS_LESSON_ORDER = [
  "qpow-basics",
  "tokenomics-quiz",
] as const;

export const VISION_LESSON_ORDER = ["vision-quiz"] as const;

export const LESSON_CHAIN_ORDER = [
  ...PRACTICAL_LESSON_ORDER,
  ...FUNDAMENTALS_LESSON_ORDER,
  ...VISION_LESSON_ORDER,
] as const;

export const practicalLessonSlugs = PRACTICAL_LESSON_ORDER.filter((slug) =>
  academyLessons.some((l) => l.slug === slug),
);

export const LEARN_TO_ACADEMY: Record<string, string> = {
  qpow: "qpow-basics",
  "why-it-matters": "vision-quiz",
  tokenomics: "tokenomics-quiz",
};

export const ACADEMY_TO_LEARN: Record<string, string> = Object.fromEntries(
  Object.entries(LEARN_TO_ACADEMY).map(([k, v]) => [v, k]),
);

export function getNextLessonSlug(slug: string): string | null {
  const idx = LESSON_CHAIN_ORDER.indexOf(
    slug as (typeof LESSON_CHAIN_ORDER)[number],
  );
  if (idx < 0 || idx >= LESSON_CHAIN_ORDER.length - 1) return null;
  const next = LESSON_CHAIN_ORDER[idx + 1];
  return academyLessons.some((l) => l.slug === next) ? next : null;
}

export function getLesson(slug: string): AcademyLesson | undefined {
  return academyLessons.find((l) => l.slug === slug);
}

export function getLessonCta(slug: string): { href: string; label: string } {
  switch (slug) {
    case "wallet-101":
      return { href: "/wallet", label: "Open wallets" };
    case "mining-101":
      return { href: "/start/mine", label: "Start mining setup" };
    case "hold-qtc-101":
      return { href: "/buy", label: "See exchanges" };
    case "buy-and-trade":
      return { href: "/buy", label: "See exchanges" };
    case "ecosystem-navigator":
      return { href: "/ecosystem", label: "Explore ecosystem" };
    case "team-answers":
      return { href: "/faq#from-team", label: "Read full AMA FAQ" };
    case "qpow-basics":
      return { href: "/learn/qpow", label: "Read qPoW guide" };
    default:
      return { href: "/start/mine", label: "Start mining" };
  }
}

export function xpToLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function xpProgress(xp: number): number {
  return xp % 100;
}
