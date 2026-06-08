/** Team-sourced answers from official AMAs (#AskQTC, Aug 2025 AMA) */

export interface AmaEntry {
  id: string;
  question: string;
  answer: string;
  source: "AskQTC" | "AMA Aug 2025";
}

export const AMA_ENTRIES: AmaEntry[] = [
  {
    id: "wallet-roadmap",
    source: "AskQTC",
    question: "What wallet integrations are next?",
    answer:
      "Additional desktop wallet platforms, then light-wallet integrations. Hardware wallet support is on the radar but not promised until further technical work is done.",
  },
  {
    id: "real-utility",
    source: "AskQTC",
    question: "Is there real-world use beyond price speculation?",
    answer:
      "Yes. Mining runs useful quantum simulations (VQA-style circuits) and benchmarks simulators/hardware, that's the point of qPoW. BYOS lets researchers plug in custom solvers and eventually real devices.",
  },
  {
    id: "smart-contracts",
    source: "AskQTC",
    question: "How will smart-contract-like functionality work?",
    answer:
      "Likely Bitcoin-style UTXO scripting (timelocks, HTLCs, multisig) plus L2s for richer logic. Longer-term options will be discussed publicly before commitment.",
  },
  {
    id: "replay-forks",
    source: "AskQTC",
    question: "Can an attacker replay simulations to fork the chain?",
    answer:
      "No. Each attempt is bound to block data: hash the block, derive angle parameters, run the circuit, mix the measured vector into the hash. Any header or tx change produces a new circuit and result. Full nodes re-simulate to verify.",
  },
  {
    id: "51-percent",
    source: "AskQTC",
    question: "Does a 51% attack risk exist?",
    answer:
      "Yes, same economic model as proof-of-work. qPoW inherits PoW security properties; cumulative work governs chain selection.",
  },
  {
    id: "hashrate-compare",
    source: "AskQTC",
    question: "Is qPoW hashrate comparable to SHA-256 hashrate?",
    answer:
      "Not directly. Qubitcoin exposes qhash/s (full qPoW cycles per second). Network difficulty and block times are the apples-to-apples metrics, don't compare SHA-256 TH/s to qhash/s.",
  },
  {
    id: "verification-speed",
    source: "AskQTC",
    question: "How fast is block verification?",
    answer:
      "Re-simulating the current 16-qubit task is under ~1 ms on an RTX 3060. ASERT smooths difficulty vs hashrate swings.",
  },
  {
    id: "what-miners-compute",
    source: "AskQTC",
    question: "What exactly are miners computing?",
    answer:
      "Parameterized quantum circuits (Ry/Rz + CNOT on neighbors) with angles from the block hash. Measured Z-projections concatenate into a 256-bit string folded into the hash trial.",
  },
  {
    id: "quantum-wallets",
    source: "AskQTC",
    question: "Will wallets be safe from future quantum attacks?",
    answer:
      "Long-term: migration path to post-quantum signature schemes (PQ address types, dual-sig transitions) without breaking UTXO compatibility. Until then: avoid address reuse; keep funds in wallets you control.",
  },
  {
    id: "no-staking",
    source: "AMA Aug 2025",
    question: "Is there staking?",
    answer:
      "No. QTC is an L1 coin. The team has stated they will not interfere with the market.",
  },
  {
    id: "no-premine",
    source: "AMA Aug 2025",
    question: "Was there a premine?",
    answer:
      "No premine, coins were mined after launch. Founder and advisor allocations exist in visible, time-locked team wallets used for research and hiring.",
  },
  {
    id: "open-source",
    source: "AMA Aug 2025",
    question: "Is the ecosystem open source?",
    answer:
      "Yes. Open-source model with planned grants for contributors. The team invites anyone to build with them.",
  },
  {
    id: "timeline-honest",
    source: "AMA Aug 2025",
    question: "What's the realistic time horizon?",
    answer:
      "Quantum research takes years. The team asks for patience, they plan to evolve with the broader quantum sector. This is a multi-year research project, not a quick flip.",
  },
  {
    id: "qubic-unrelated",
    source: "AMA Aug 2025",
    question: "Is Qubitcoin related to Qubic?",
    answer:
      "Completely unrelated, different algorithm and goals.",
  },
];
