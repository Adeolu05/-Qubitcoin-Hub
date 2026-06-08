"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { TROUBLESHOOTING_TOPICS } from "@/lib/troubleshooting-content";
import { trackEvent } from "@/lib/analytics";

export default function TroubleshootingPage() {
  useEffect(() => {
    trackEvent("troubleshooting_view");
  }, []);

  return (
    <PageShell>
      <p className="page-eyebrow">Help</p>
      <h1 className="page-title mt-1">Troubleshooting</h1>
      <p className="page-lead mt-2">
        Common problems when setting up mining or wallets. Pick the symptom that
        matches yours.
      </p>

      <div className="mt-8 space-y-3">
        {TROUBLESHOOTING_TOPICS.map((topic) => (
          <details key={topic.id} className="surface-panel group" id={topic.id}>
            <summary className="cursor-pointer list-none px-4 py-3.5 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-2">
                {topic.title}
                <span className="text-xs text-muted transition-transform group-open:rotate-180">
                  ▾
                </span>
              </span>
            </summary>
            <div className="border-t border-border px-4 py-4 text-sm">
              <p className="font-medium text-foreground">Symptoms</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
                {topic.symptoms.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="mt-4 font-medium text-foreground">Try this</p>
              <ol className="mt-2 list-inside list-decimal space-y-1.5 text-muted">
                {topic.fixes.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ol>
              {topic.links && (
                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  {topic.links.map((link) =>
                    link.href.startsWith("http") ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link key={link.href} href={link.href} className="text-link">
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>

      <div className="callout-info mt-8 px-4 py-3.5">
        <p className="text-sm">
          Still stuck? Ask the{" "}
          <Link href="/faq" className="text-link">
            FAQ
          </Link>
          , search the{" "}
          <Link href="/glossary" className="text-link">
            glossary
          </Link>
          , or use the Quantum Tutor button (bottom right).
        </p>
      </div>
    </PageShell>
  );
}
