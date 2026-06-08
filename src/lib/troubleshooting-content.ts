export interface TroubleshootingTopic {
  id: string;
  title: string;
  symptoms: string[];
  fixes: string[];
  links?: { label: string; href: string }[];
}

export const TROUBLESHOOTING_TOPICS: TroubleshootingTopic[] = [
  {
    id: "miner-wont-start",
    title: "Miner won't start",
    symptoms: [
      "Double-clicking the bat/sh file closes instantly",
      "CUDA or GPU driver errors in the console",
      "Antivirus quarantined the miner",
    ],
    fixes: [
      "Update NVIDIA drivers (or AMD drivers for WildRig). Restart the PC.",
      "Run the miner from Command Prompt so you can read the error text.",
      "Add an antivirus exception for the miner folder.",
      "Confirm the algorithm is QHash / qhash, not SHA-256 or Ethash.",
      "Re-download the miner from the official link on /pool or /start/mine.",
    ],
    links: [
      { label: "Mining setup wizard", href: "/start/mine" },
      { label: "Troubleshooting FAQ", href: "/faq" },
    ],
  },
  {
    id: "invalid-wallet",
    title: "Invalid wallet address",
    symptoms: [
      "Pool rejects your address",
      "Address doesn't start with bc1",
      "Copied the wrong string from the wallet",
    ],
    fixes: [
      "QTC uses SegWit addresses starting with bc1. Generate one in the official browser wallet.",
      "Copy the receiving address only, never your seed phrase.",
      "Paste into a text file first to check for extra spaces or line breaks.",
      "Complete the Wallet 101 Academy lesson if you're unsure.",
    ],
    links: [
      { label: "Wallet options", href: "/wallet" },
      { label: "Wallet 101 lesson", href: "/academy/wallet-101" },
    ],
  },
  {
    id: "no-shares",
    title: "0 hashrate or no shares",
    symptoms: [
      "Miner runs but pool dashboard shows zero hashrate",
      "Connected but no shares accepted",
      "Worker name missing on pool site",
    ],
    fixes: [
      "Verify pool host and port match your config (LuckyPool default: port 8610 or 8611).",
      "Check firewall allows outbound connections on the pool port.",
      "Use a short worker name (e.g. rig1) with no special characters.",
      "Wait 5-10 minutes; some pools delay stats updates.",
      "Search your bc1 address on the pool site, not the worker name alone.",
    ],
    links: [
      { label: "Compare pools", href: "/pool" },
      { label: "Regenerate config", href: "/start/mine" },
    ],
  },
  {
    id: "wallet-sync",
    title: "Wallet won't sync",
    symptoms: [
      "Electrum stuck on synchronizing",
      "Balance not updating after a patch",
      "Transactions not appearing",
    ],
    fixes: [
      "Download the latest Electrum build from superquantum.io after network patches.",
      "Restart the wallet completely (quit, not just minimize).",
      "Check /updates for Electrum server restarts or breaking patches.",
      "Browser wallet users: hard refresh and clear site cache if the UI is stale.",
    ],
    links: [
      { label: "Network updates", href: "/updates" },
      { label: "Official downloads", href: "https://superquantum.io/qubitcoin" },
    ],
  },
  {
    id: "after-patch",
    title: "Stopped working after a network patch",
    symptoms: [
      "Miner worked yesterday, dead today",
      "Community mentions a hash algorithm update",
      "Node or wallet version mismatch",
    ],
    fixes: [
      "Read the latest critical entries on /updates immediately.",
      "Update qubitcoind, miner, and wallet from superquantum.io or GitHub only.",
      "Join official Telegram or X via /community for patch deadlines.",
      "Never download 'fixed' miners from random DMs or Discord links.",
    ],
    links: [
      { label: "Patch history", href: "/updates" },
      { label: "Community channels", href: "/community" },
    ],
  },
];
