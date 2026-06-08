export interface KnowledgeChunk {
  id: string;
  topic: string;
  keywords: string[];
  content: string;
  link?: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  {
    id: "what-is",
    topic: "What is Qubitcoin",
    keywords: ["what", "qubitcoin", "qtc", "about", "intro", "explain"],
    content:
      "Qubitcoin (QTC) is a Bitcoin fork with a 21 million coin cap and identical halving schedule. Instead of SHA-256 puzzles, it uses Quantum Proof of Work (qPoW), miners simulate 16-qubit quantum circuits on GPUs. Your mining work secures the blockchain AND advances quantum simulation benchmarking.",
    link: "/learn/what-is-qtc",
  },
  {
    id: "qpow",
    topic: "qPoW",
    keywords: ["qpow", "quantum", "proof", "work", "qhash", "circuit", "qubit", "gate", "cnot", "simulation"],
    content:
      "qPoW (Quantum Proof of Work) replaces random hash puzzles with quantum circuit simulation. Miners run 16-qubit circuits with Ry, Rz rotation gates and CNOT entanglement gates. Gate angles come from hashed block data. The simulation output is compressed into a 256-bit hash. Algorithm name: QHash.",
    link: "/learn/qpow",
  },
  {
    id: "mining",
    topic: "Mining",
    keywords: ["mine", "mining", "miner", "pool", "gpu", "nvidia", "amd", "setup", "start", "hashrate"],
    content:
      "To mine QTC: 1) Get a bc1 wallet address (/wallet). 2) Pick a pool, LuckyPool (recommended), Rplant, Suprnova, or Qverse (/pool). 3) Use OneZeroMiner (NVIDIA) or WildRig Multi (AMD/NVIDIA). 4) Run with QHash algorithm. Use /start/mine for a verified LuckyPool config.",
    link: "/start/mine",
  },
  {
    id: "wallet",
    topic: "Wallet",
    keywords: ["wallet", "address", "bc1", "electrum", "seed", "receive", "download"],
    content:
      "QTC addresses start with bc1 (SegWit format). Official: web wallet at wallet.superquantum.io, Windows .exe at superquantum.io/files/qubitcoin-electrum.exe. Community: Qverse Chrome extension. See /wallet for links. Never share your seed phrase, only your receiving address for mining.",
    link: "/wallet",
  },
  {
    id: "tokenomics",
    topic: "Tokenomics",
    keywords: ["supply", "halving", "21m", "epoch", "reward", "tokenomics", "scarcity", "emission"],
    content:
      "Qubitcoin has a hard cap of 21,000,000 QTC. Block reward starts at 50 QTC and halves every 210,000 blocks (~4 years), identical to Bitcoin. Currently in Epoch 0. Difficulty adjusts via ASERT.",
    link: "/learn/tokenomics",
  },
  {
    id: "hardware",
    topic: "Hardware",
    keywords: ["hardware", "rtx", "gpu", "cuda", "cuquantum", "requirements", "vram", "cpu"],
    content:
      "Qubitcoin mining is optimized for NVIDIA RTX GPUs using cuQuantum/cuStateVec libraries. AMD GPUs work via WildRig Multi. CPU mining is possible but much slower. NVIDIA + OneZeroMiner is the recommended setup.",
    link: "/start/mine",
  },
  {
    id: "vision",
    topic: "Vision",
    keywords: ["why", "matter", "vision", "useful", "science", "research", "byos", "benchmark"],
    content:
      "Qubitcoin turns mining incentives toward quantum science. Every hash attempt runs a real quantum simulation, creating a competitive benchmark for simulators. BYOS (Bring Your Own Solver) lets researchers plug custom backends. The vision: blockchain incentives + quantum research progress.",
    link: "/learn/why-it-matters",
  },
  {
    id: "ecosystem",
    topic: "Ecosystem",
    keywords: ["ecosystem", "exchange", "explorer", "community", "superquantum", "luckypool", "node"],
    content:
      "Ecosystem: Superquantum (org), qubitcoind node, mining pools (LuckyPool, Rplant, Suprnova, Qverse, /pool), wallets (web, Windows, Qverse, /wallet), exchanges (CoinEx, SafeTrade, Exbitron, /buy). See /ecosystem for the interactive map.",
    link: "/ecosystem",
  },
  {
    id: "safe",
    topic: "Safety",
    keywords: ["safe", "scam", "legit", "trust", "risk", "legitimate", "real"],
    content:
      "Qubitcoin is an early-stage project by Superquantum (non-profit). Verify downloads only from superquantum.io. QTC has thin liquidity and limited exchange listings, treat it as experimental. Never share seed phrases. Official repos: github.com/super-quantum/qubitcoin and qubitcoin-electrum.",
    link: "/faq",
  },
  {
    id: "glossary",
    topic: "Glossary",
    keywords: ["glossary", "term", "definition", "mean", "jargon", "word"],
    content:
      "Browse the glossary at /glossary for plain-language definitions of qPoW, QHash, qubit, CNOT, ASERT, halving, stratum, and more. Hover underlined terms on Learn pages for quick tooltips.",
    link: "/glossary",
  },
  {
    id: "community",
    topic: "Community",
    keywords: [
      "telegram",
      "discord",
      "community",
      "x",
      "twitter",
      "medium",
      "official",
      "channel",
      "join",
    ],
    content:
      "Official channels: Telegram t.me/qubitcoingroup, Discord discord.gg/FTmV3GYd9a, X x.com/qubitcoinx. Research: Medium articles, arXiv preprint, YouTube interviews. Explorer: explorer.superquantum.io. Roadmap: superquantum.io/roadmap. All links at /community.",
    link: "/community",
  },
  {
    id: "updates",
    topic: "Network updates",
    keywords: [
      "patch",
      "update",
      "upgrade",
      "emergency",
      "binary",
      "electrum",
      "node",
      "breaking",
      "hash",
    ],
    content:
      "Qubitcoin has released emergency hash patches requiring updated node, miner, and wallet software. Check /updates for patch history and actions. Always download from superquantum.io or GitHub. Join official Telegram/X for live alerts.",
    link: "/updates",
  },
  {
    id: "ama",
    topic: "Team AMA",
    keywords: [
      "ama",
      "team",
      "premine",
      "staking",
      "replay",
      "51",
      "qhash",
      "smart contract",
      "quantum resistant",
      "binance",
    ],
    content:
      "Official AMA answers: No premine, no staking. qhash/s is not comparable to SHA-256 TH/s. Replay attacks don't work, circuits are block-bound. Smart contracts via Bitcoin-style UTXO + L2s. Post-quantum wallet migration planned. Full FAQ at /faq#from-team.",
    link: "/faq#from-team",
  },
  {
    id: "scam",
    topic: "Scams & OTC",
    keywords: ["scam", "otc", "dm", "phishing", "fake", "admin", "seed"],
    content:
      "Never share seed phrases. OTC only through verified Telegram admins listed on /community. Ignore random DMs offering deals or support. Download only from superquantum.io and official GitHub.",
    link: "/community",
  },
];

export function searchKnowledge(query: string, limit = 3): KnowledgeChunk[] {
  const words = query
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 2);

  const scored = knowledgeBase.map((chunk) => {
    let score = 0;
    for (const word of words) {
      if (chunk.keywords.some((k) => k.includes(word) || word.includes(k)))
        score += 3;
      if (chunk.content.toLowerCase().includes(word)) score += 1;
      if (chunk.topic.toLowerCase().includes(word)) score += 2;
    }
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.chunk);
}

export function buildTutorResponse(query: string): {
  answer: string;
  sources: { topic: string; link?: string }[];
} {
  const matches = searchKnowledge(query);

  if (matches.length === 0) {
    return {
      answer:
        "I don't have a specific answer for that yet. Try asking about qPoW, mining setup, wallets, tokenomics, or the Qubitcoin ecosystem. You can also visit /learn for detailed guides or /start/mine for the mining wizard.",
      sources: [],
    };
  }

  const answer = matches.map((m) => m.content).join("\n\n");
  const sources = matches.map((m) => ({ topic: m.topic, link: m.link }));

  const linkHint = matches.find((m) => m.link);
  const suffix = linkHint?.link
    ? `\n\nLearn more: ${linkHint.link}`
    : "";

  return { answer: answer + suffix, sources };
}

export const suggestedQuestions = [
  "What is qPoW?",
  "How do I start mining?",
  "Where are official Telegram and Discord?",
  "Do I need to update my miner?",
];
