import { AMA_ENTRIES } from "@/lib/ama-content";

export interface FaqItem {
  id: string;
  category: "basics" | "mining" | "safety" | "technical" | "from-team";
  question: string;
  answer: string;
}

export const faqCategories = [
  { id: "basics", label: "Basics" },
  { id: "mining", label: "Mining" },
  { id: "safety", label: "Safety & trust" },
  { id: "technical", label: "Technical" },
  { id: "from-team", label: "From the team (AMA)" },
] as const;

const coreFaq: FaqItem[] = [
  {
    id: "what-is-qtc",
    category: "basics",
    question: "What is Qubitcoin?",
    answer:
      "Qubitcoin (QTC) is a Bitcoin fork that uses Quantum Proof of Work (qPoW) instead of traditional SHA-256 mining. It keeps Bitcoin's 21M supply cap and halving schedule, but miners simulate 16-qubit quantum circuits on GPUs to secure the network.",
  },
  {
    id: "diff-btc",
    category: "basics",
    question: "How is Qubitcoin different from Bitcoin?",
    answer:
      "Same economics (21M cap, halving every 210k blocks). Different work: Bitcoin miners solve throwaway hash puzzles; Qubitcoin miners run quantum circuit simulations that also advance benchmarking research.",
  },
  {
    id: "need-phd",
    category: "basics",
    question: "Do I need to understand quantum physics to use Qubitcoin?",
    answer:
      "No. You need a wallet address and mining software, same as any cryptocurrency. Our Learn section and Academy explain the concepts in plain language if you're curious.",
  },
  {
    id: "how-mine",
    category: "mining",
    question: "How do I start mining?",
    answer:
      "Use our guided setup at /start/mine: pick your GPU, choose a miner (OneZeroMiner for NVIDIA), enter your bc1 wallet address, and copy the generated config. Join LuckyPool at qubitcoin.luckypool.io:8610. See /pool for alternatives.",
  },
  {
    id: "what-gpu",
    category: "mining",
    question: "What hardware do I need?",
    answer:
      "NVIDIA RTX GPUs are best supported via OneZeroMiner and cuQuantum. AMD works with WildRig Multi. CPU mining is possible but much slower.",
  },
  {
    id: "which-wallet",
    category: "mining",
    question: "Which wallet should I use?",
    answer:
      "Official web wallet at wallet.superquantum.io (fastest). Windows: direct download of qubitcoin-electrum.exe from superquantum.io/files. Community option: Qverse Chrome extension. See /wallet for all verified links. Your receiving address starts with bc1.",
  },
  {
    id: "software-updates",
    category: "mining",
    question: "Do I need to update my miner or node?",
    answer:
      "Sometimes yes. Qubitcoin has released emergency hash patches that require updated node, miner, and wallet software. Check /updates for patch history and always verify binaries from superquantum.io or GitHub. Join official Telegram or X for live alerts.",
  },
  {
    id: "is-legit",
    category: "safety",
    question: "Is Qubitcoin legitimate?",
    answer:
      "Qubitcoin is an open-source project by Superquantum (non-profit). It's early-stage with limited exchange listings and thin liquidity. Verify all downloads from superquantum.io only. Never share your seed phrase.",
  },
  {
    id: "is-scam",
    category: "safety",
    question: "Is this a scam?",
    answer:
      "Qubitcoin has real open-source code, an active mining pool, and a documented qPoW mechanism. That said, it's a niche experimental project, not financial advice. Do your own research, use official sources only, and never invest more than you can afford to lose.",
  },
  {
    id: "download-safe",
    category: "safety",
    question: "Where do I safely download software?",
    answer:
      "Official site: superquantum.io/qubitcoin. Node and miner source: github.com/super-quantum/qubitcoin. Avoid random download links from Telegram DMs or unofficial sites. See /updates after any network patch.",
  },
  {
    id: "otc-scams",
    category: "safety",
    question: "How do I avoid OTC and Telegram scams?",
    answer:
      "Official Telegram lists verified OTC admins only, never trust random DMs offering deals or support. No legitimate admin will ask for your seed phrase. Use /community for official channel links only.",
  },
  {
    id: "what-qpow",
    category: "technical",
    question: "What exactly is qPoW?",
    answer:
      "Quantum Proof of Work. Each mining attempt simulates a 16-qubit circuit (Ry, Rz, CNOT gates) on your GPU. Gate angles come from hashed block data. The simulation output is hashed and compared to the difficulty target.",
  },
  {
    id: "what-byos",
    category: "technical",
    question: "What is BYOS?",
    answer:
      "Bring Your Own Solver, miners can replace the default cuQuantum simulator with a custom backend (different GPU kernels, CPU solvers, or experimental quantum hardware).",
  },
  {
    id: "supply",
    category: "technical",
    question: "What is the total supply?",
    answer:
      "21,000,000 QTC hard cap. Block reward starts at 50 QTC, halving every 210,000 blocks. Currently in Epoch 0.",
  },
];

const amaFaq: FaqItem[] = AMA_ENTRIES.map((entry) => ({
  id: `ama-${entry.id}`,
  category: "from-team" as const,
  question: entry.question,
  answer: `${entry.answer} (Source: official ${entry.source}.)`,
}));

export const faqItems: FaqItem[] = [...coreFaq, ...amaFaq];
