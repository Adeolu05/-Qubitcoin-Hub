export type OnboardingPath = "understand" | "mine" | "hold";

export const ONBOARDING_PATHS = [
  {
    id: "understand" as const,
    title: "I'm new, explain it",
    description:
      "Visual lessons on qPoW, tokenomics, and why Qubitcoin exists. No mining required.",
    duration: "~15 min",
    icon: "📖",
    href: "/learn",
    steps: [
      { label: "Read Learn overview", href: "/learn" },
      { label: "Try the circuit simulator", href: "/learn/qpow" },
      { label: "Take fundamentals quizzes", href: "/academy" },
    ],
  },
  {
    id: "mine" as const,
    title: "I want to mine QTC",
    description:
      "Wallet first, then hardware, pool, and a verified mining config.",
    duration: "~30 min",
    icon: "⛏",
    href: "/academy/wallet-101",
    steps: [
      { label: "Get a wallet (Wallet 101)", href: "/academy/wallet-101" },
      { label: "Mining basics quiz", href: "/academy/mining-101" },
      { label: "Run the setup wizard", href: "/start/mine" },
      { label: "Troubleshooting if stuck", href: "/help/troubleshooting" },
    ],
  },
  {
    id: "hold" as const,
    title: "I just want QTC",
    description:
      "Create a wallet, buy on a verified exchange, and stay safe. No GPU needed.",
    duration: "~10 min",
    icon: "💎",
    href: "/academy/hold-qtc-101",
    steps: [
      { label: "Hold QTC 101 lesson", href: "/academy/hold-qtc-101" },
      { label: "Set up a wallet", href: "/wallet" },
      { label: "Buy on verified exchanges", href: "/buy" },
      { label: "Read safety FAQ", href: "/faq#safety" },
    ],
  },
] as const;

export function getPathById(id: OnboardingPath) {
  return ONBOARDING_PATHS.find((p) => p.id === id);
}
