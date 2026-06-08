import Link from "next/link";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { faqCategories, faqItems } from "@/lib/faq-content";

export const metadata = {
  title: "FAQ: Qubitcoin Hub",
  description:
    "Frequently asked questions about Qubitcoin, qPoW mining, wallets, safety, and getting started.",
};

export default function FaqPage() {
  return (
    <PageShell narrow>
      <PageHeader eyebrow="FAQ" title="Common questions">
        Straight answers, including risks and early-stage honesty.
      </PageHeader>

      <div className="space-y-8">
        {faqCategories.map((cat) => {
          const items = faqItems.filter((f) => f.category === cat.id);
          if (items.length === 0) return null;
          return (
            <section key={cat.id} id={cat.id}>
              <h2 className="mb-3 text-sm font-semibold text-foreground">
                {cat.label}
              </h2>
              {cat.id === "from-team" && (
                <p className="mb-3 text-xs text-muted">
                  From official #AskQTC and community AMAs.
                </p>
              )}
              <FaqAccordion items={items} />
            </section>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        Still stuck? Try the{" "}
        <strong className="text-foreground">Quantum Tutor</strong> or{" "}
        <Link href="/glossary" className="text-link">
          glossary
        </Link>
        .
      </p>
    </PageShell>
  );
}
