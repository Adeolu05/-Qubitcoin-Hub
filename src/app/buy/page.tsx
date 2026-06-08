import Link from "next/link";
import { ResourceLinksGrid } from "@/components/ecosystem/resource-links-grid";
import { EXCHANGES } from "@/lib/ecosystem-links";
import { PageHeader, PageShell } from "@/components/ui/page-shell";

export const metadata = {
  title: "Buy QTC",
  description:
    "Where to trade Qubitcoin (QTC), CoinEx, SafeTrade, and Exbitron USDT pairs.",
};

export default function BuyPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Resources" title="Buy & trade QTC">
        Thin liquidity, check spreads and fees. Not financial advice.
      </PageHeader>

      <ResourceLinksGrid items={EXCHANGES} />

      <div className="callout-danger mt-6 px-4 py-3.5">
        <p className="text-sm font-medium">Before you trade</p>
        <ul className="mt-2 space-y-1 text-xs opacity-90">
          <li>· Confirm ticker is QTC on Qubitcoin network</li>
          <li>· Test withdrawal with a small amount first</li>
          <li>· Mining pays direct to wallet, no exchange required</li>
        </ul>
        <p className="mt-2 text-xs">
          Need a wallet?{" "}
          <Link href="/wallet" className="text-link font-medium">
            Wallet options →
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
