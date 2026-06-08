import Link from "next/link";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { glossaryTerms } from "@/lib/glossary";

export const metadata = {
  title: "Glossary: Qubitcoin Hub",
  description: "Plain-language definitions for qPoW, QHash, qubits, and other Qubitcoin terms.",
};

export default function GlossaryPage() {
  return (
    <PageShell narrow>
      <PageHeader eyebrow="Glossary" title="Terms, explained">
        Jargon-free definitions. Tap or hover underlined terms in Learn, Academy, and FAQ for quick tooltips.
      </PageHeader>

      <div className="surface-panel divide-y divide-border">
        {glossaryTerms.map((entry) => (
          <article key={entry.slug} id={entry.slug} className="scroll-mt-24 px-4 py-3.5">
            <h2 className="text-sm font-semibold text-foreground">{entry.term}</h2>
            <p className="mt-1 text-sm text-muted">{entry.simple}</p>
            {entry.deeper && (
              <p className="mt-1 text-xs text-muted opacity-80">{entry.deeper}</p>
            )}
            {entry.related && entry.related.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {entry.related.map((rel) => {
                  const slug = rel.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={rel}
                      href={`/glossary#${slug}`}
                      className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted transition hover:text-link"
                    >
                      {rel}
                    </Link>
                  );
                })}
              </div>
            )}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
