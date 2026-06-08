export interface GlossaryTerm {
  term: string;
  slug: string;
  simple: string;
  deeper?: string;
  related?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "qPoW",
    slug: "qpow",
    simple: "Quantum Proof of Work, mining by simulating quantum circuits instead of random hash puzzles.",
    deeper: "Miners run 16-qubit circuits with Ry, Rz, and CNOT gates. Output expectation values become a 256-bit hash checked against network difficulty.",
    related: ["QHash", "qubit"],
  },
  {
    term: "QHash",
    slug: "qhash",
    simple: "The mining algorithm used by Qubitcoin. Your miner must support qhash/qPoW.",
    related: ["qPoW"],
  },
  {
    term: "qubit",
    slug: "qubit",
    simple: "A quantum bit, the basic unit in a quantum circuit. Qubitcoin uses 16 qubits per mining attempt.",
    related: ["CNOT", "qPoW"],
  },
  {
    term: "CNOT",
    slug: "cnot",
    simple: "A quantum gate that entangles two qubits, the control qubit influences the target.",
    related: ["qubit", "qPoW"],
  },
  {
    term: "ASIC",
    slug: "asic",
    simple: "Specialized mining hardware. Bitcoin uses ASICs; Qubitcoin is optimized for GPUs instead.",
    related: ["GPU"],
  },
  {
    term: "GPU",
    slug: "gpu",
    simple: "Graphics card, the recommended hardware for Qubitcoin mining (NVIDIA RTX best supported).",
    related: ["cuQuantum", "OneZeroMiner"],
  },
  {
    term: "cuQuantum",
    slug: "cuquantum",
    simple: "NVIDIA's SDK for GPU-accelerated quantum simulation. Qubitcoin uses cuStateVec under the hood.",
    related: ["GPU", "qPoW"],
  },
  {
    term: "BYOS",
    slug: "byos",
    simple: "Bring Your Own Solver, plug a custom quantum simulator backend into the mining process.",
    related: ["qPoW"],
  },
  {
    term: "ASERT",
    slug: "asert",
    simple: "Difficulty adjustment algorithm that keeps block times stable as hashrate changes.",
    related: ["halving"],
  },
  {
    term: "halving",
    slug: "halving",
    simple: "Block reward cuts in half every 210,000 blocks (~4 years). Same schedule as Bitcoin.",
    related: ["QTC", "ASERT"],
  },
  {
    term: "QTC",
    slug: "qtc",
    simple: "Qubitcoin's native coin. Max supply: 21 million.",
    related: ["halving", "wallet"],
  },
  {
    term: "stratum",
    slug: "stratum",
    simple: "The protocol miners use to connect to a pool. Example: stratum+tcp://qubitcoin.luckypool.io:8610",
    related: ["pool", "worker"],
  },
  {
    term: "pool",
    slug: "pool",
    simple: "A mining pool combines hashrate from many miners to find blocks more consistently. Main pool: LuckyPool.",
    related: ["stratum", "worker"],
  },
  {
    term: "worker",
    slug: "worker",
    simple: "A label for your mining rig (e.g. bc1q...myrig). Helps track machines on the pool dashboard.",
    related: ["pool", "wallet"],
  },
  {
    term: "wallet",
    slug: "wallet",
    simple: "Stores your QTC. Addresses start with bc1. Use the browser wallet or Electrum for desktop.",
    related: ["worker", "QTC"],
  },
  {
    term: "OneZeroMiner",
    slug: "onezerominer",
    simple: "Popular mining software for NVIDIA GPUs with native QHash support.",
    related: ["GPU", "QHash"],
  },
  {
    term: "bc1",
    slug: "bc1",
    simple: "Prefix for QTC SegWit wallet addresses. Your receiving address for mining and withdrawals starts with bc1.",
    related: ["wallet", "QTC"],
  },
  {
    term: "nonce",
    slug: "nonce",
    simple: "A number miners change on each attempt to produce a different circuit hash.",
    related: ["qPoW", "difficulty"],
  },
  {
    term: "difficulty",
    slug: "difficulty",
    simple: "How hard it is to find a valid block. The network adjusts it so blocks stay ~10 minutes apart.",
    related: ["ASERT", "qPoW"],
  },
  {
    term: "Electrum",
    slug: "electrum",
    simple: "Desktop wallet software. Qubitcoin ships a custom Electrum build from Superquantum.",
    related: ["wallet", "bc1"],
  },
  {
    term: "LuckyPool",
    slug: "luckypool",
    simple: "The default mining pool in the setup wizard. stratum+tcp://qubitcoin.luckypool.io:8610",
    related: ["pool", "stratum"],
  },
  {
    term: "qhash/s",
    slug: "qhash-s",
    simple: "Quantum hashes per second. Measures full qPoW cycles, not comparable to Bitcoin TH/s.",
    related: ["QHash", "qPoW"],
  },
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find(
    (t) => t.slug === slug || t.term.toLowerCase() === slug.toLowerCase(),
  );
}

export function getGlossaryByTerm(term: string): GlossaryTerm | undefined {
  return glossaryTerms.find(
    (t) => t.term.toLowerCase() === term.toLowerCase(),
  );
}
