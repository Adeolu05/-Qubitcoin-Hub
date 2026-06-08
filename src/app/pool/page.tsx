import Link from "next/link";
import { ResourceLinksGrid } from "@/components/ecosystem/resource-links-grid";
import { MINING_POOLS } from "@/lib/ecosystem-links";
import { PageHeader, PageShell } from "@/components/ui/page-shell";

export const metadata = {
  title: "Mining Pools",
  description:
    "Verified Qubitcoin mining pools, LuckyPool, Rplant, Suprnova, and Qverse.",
};

export default function PoolPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Resources" title="Mining pools">
        Pools combine hashrate for steadier blocks. You need a{" "}
        <Link href="/wallet" className="text-link">
          wallet address
        </Link>{" "}
        for payouts.
      </PageHeader>

      <ResourceLinksGrid items={MINING_POOLS} />

      <div className="callout-warn mt-6 px-4 py-3.5">
        <p className="text-sm font-medium">New to mining?</p>
        <p className="mt-1 text-xs opacity-90">
          Wizard defaults to LuckyPool with a ready config.
        </p>
        <Link href="/start/mine" className="mt-2 inline-block text-xs font-medium text-link">
          Start mining setup →
        </Link>
      </div>
    </PageShell>
  );
}
