import Link from "next/link";
import { ResourceLinksGrid } from "@/components/ecosystem/resource-links-grid";
import { WALLETS } from "@/lib/ecosystem-links";
import { PageHeader, PageShell } from "@/components/ui/page-shell";

export const metadata = {
  title: "Wallets",
  description:
    "Official Qubitcoin wallets, web, Windows Electrum, and Qverse Chrome extension.",
};

export default function WalletPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Resources" title="Wallets">
        QTC uses <code className="text-accent-foreground">bc1...</code> addresses.
        Share only your receiving address, never your seed phrase.
      </PageHeader>

      <ResourceLinksGrid items={WALLETS} />

      <ul className="mt-6 space-y-1.5 text-xs text-muted">
        <li>· Download only from links on this page or superquantum.io</li>
        <li>· Verify Chrome extension IDs before installing</li>
        <li>· Back up seed phrases offline</li>
      </ul>

      <p className="mt-6 text-xs text-muted">
        Ready to mine?{" "}
        <Link href="/start/mine" className="text-link">
          Mining setup →
        </Link>
      </p>
    </PageShell>
  );
}
