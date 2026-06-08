import Link from "next/link";
import { EcosystemMap } from "@/components/ecosystem/ecosystem-map";
import { PageHeader, PageShell } from "@/components/ui/page-shell";

export const metadata = {
  title: "Qubitcoin Ecosystem Map",
};

export default function EcosystemPage() {
  return (
    <PageShell className="max-w-6xl">
      <PageHeader eyebrow="Ecosystem" title="How everything connects">
        Nodes, miners, pools, wallets, and community, click any node to explore.
      </PageHeader>

      <EcosystemMap />

      <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/pool", title: "Pools", desc: "LuckyPool, Rplant, Suprnova, Qverse" },
          { href: "/wallet", title: "Wallets", desc: "Web, Windows, Qverse" },
          { href: "/buy", title: "Buy QTC", desc: "CoinEx, SafeTrade, Exbitron" },
          { href: "/community", title: "Community", desc: "Telegram, Discord, X" },
          { href: "/updates", title: "Updates", desc: "Patches & milestones" },
          { href: "/faq#from-team", title: "Team AMA", desc: "#AskQTC answers" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="surface-panel px-4 py-3 transition hover:bg-card-hover"
          >
            <h2 className="text-sm font-medium text-foreground">{item.title}</h2>
            <p className="mt-0.5 text-xs text-muted">{item.desc}</p>
          </Link>
        ))}
      </div>

      <div className="callout-warn mt-6 px-4 py-3.5">
        <p className="text-sm font-medium">Ready to join?</p>
        <Link href="/start/mine" className="mt-1 inline-block text-xs text-link">
          Start mining setup →
        </Link>
      </div>
    </PageShell>
  );
}
