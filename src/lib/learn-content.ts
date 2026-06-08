export interface LearnTopic {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: string;
}

export const learnTopics: LearnTopic[] = [
  {
    slug: "what-is-qtc",
    title: "What is Qubitcoin?",
    subtitle: "The 60-second version, no jargon required",
    duration: "3 min",
    icon: "◇",
  },
  {
    slug: "qpow",
    title: "What is qPoW?",
    subtitle: "Interactive quantum circuit simulator",
    duration: "5 min",
    icon: "⚛",
  },
  {
    slug: "how-it-works",
    title: "How it works",
    subtitle: "From block data to quantum hash",
    duration: "4 min",
    icon: "→",
  },
  {
    slug: "why-it-matters",
    title: "Why it matters",
    subtitle: "Useful work, not wasted energy",
    duration: "3 min",
    icon: "✦",
  },
  {
    slug: "tokenomics",
    title: "Tokenomics",
    subtitle: "21M cap, Bitcoin-style halving",
    duration: "4 min",
    icon: "◐",
  },
];

export const bitcoinComparison = [
  { label: "Max supply", bitcoin: "21,000,000", qubitcoin: "21,000,000" },
  { label: "Halving schedule", bitcoin: "Every 210,000 blocks", qubitcoin: "Every 210,000 blocks" },
  { label: "Starting block reward", bitcoin: "50 BTC", qubitcoin: "50 QTC" },
  { label: "Proof of work", bitcoin: "SHA-256 hash puzzles", qubitcoin: "16-qubit quantum circuit simulation (QHash)" },
  { label: "Work output", bitcoin: "No useful computation", qubitcoin: "Advances quantum simulation benchmarking" },
  { label: "Best mining hardware", bitcoin: "ASIC miners", qubitcoin: "NVIDIA GPUs (cuQuantum)" },
] as const;

export const halvingEpochs = [
  { epoch: 0, blocks: "0 – 209,999", subsidy: 50, newCoins: 10_500_000, cumulative: 10_500_000, pct: 50 },
  { epoch: 1, blocks: "210k – 419k", subsidy: 25, newCoins: 5_250_000, cumulative: 15_750_000, pct: 75 },
  { epoch: 2, blocks: "420k – 629k", subsidy: 12.5, newCoins: 2_625_000, cumulative: 18_375_000, pct: 87.5 },
  { epoch: 3, blocks: "630k – 839k", subsidy: 6.25, newCoins: 1_312_500, cumulative: 19_687_500, pct: 93.75 },
  { epoch: 4, blocks: "840k – 1.04M", subsidy: 3.125, newCoins: 656_250, cumulative: 20_343_750, pct: 96.875 },
] as const;
