import { WALLET_URLS } from "@/lib/wallet-urls";
import Link from "next/link";

export function WalletOptions() {
  return (
    <div className="mt-6 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={WALLET_URLS.web}
          target="_blank"
          rel="noopener noreferrer"
          className="choice-card choice-card-selected"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-foreground">Official web wallet</span>
            <span className="badge-pill badge-recommended">Recommended</span>
          </div>
          <p className="mt-2 text-sm text-muted">
            No install. Create a wallet in your browser and copy your{" "}
            <code className="text-accent-foreground">bc1</code> address instantly.
          </p>
        </a>

        <a
          href={WALLET_URLS.windowsExe}
          target="_blank"
          rel="noopener noreferrer"
          className="choice-card"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-foreground">Windows Electrum</span>
            <span className="badge-pill badge-official">Official</span>
          </div>
          <p className="mt-2 text-sm text-muted">
            Direct download of{" "}
            <code className="text-accent-foreground">qubitcoin-electrum.exe</code>{" "}
            from Superquantum (~75 MB).
          </p>
        </a>
      </div>

      <a
        href={WALLET_URLS.qverseExtension}
        target="_blank"
        rel="noopener noreferrer"
        className="choice-card block"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-foreground">Qverse extension</span>
          <span className="badge-pill badge-community">Chrome</span>
        </div>
        <p className="mt-2 text-sm text-muted">
          Browser extension wallet. Verify the listing on the Chrome Web Store before
          installing.
        </p>
      </a>

      <p className="text-xs text-muted">
        More options on the{" "}
        <Link href="/wallet" className="text-link">
          wallets page
        </Link>
        .
      </p>
    </div>
  );
}
