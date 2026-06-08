/** Verified Qubitcoin wallet URLs */
export const WALLET_URLS = {
  /** Browser wallet, works without install */
  web: "https://wallet.superquantum.io",
  /** Direct Windows executable on Superquantum CDN (~75 MB) */
  windowsExe: "https://superquantum.io/files/qubitcoin-electrum.exe",
  /** Official downloads page (fallback if direct link changes) */
  downloadsPage: "https://superquantum.io/qubitcoin",
  /** Qverse Chrome extension */
  qverseExtension:
    "https://chromewebstore.google.com/detail/kjphpgbaehghblgmicbdpggnnofpcoof",
  /** Source repository */
  sourceRepo: "https://github.com/super-quantum/qubitcoin-electrum",
} as const;
