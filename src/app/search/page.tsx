"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";
import { searchSite } from "@/lib/search-index";
import { trackEvent } from "@/lib/analytics";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    trackEvent("search_query", { q: query.trim().slice(0, 40) });
    return searchSite(query);
  }, [query]);

  return (
    <PageShell narrow>
      <p className="page-eyebrow">Search</p>
      <h1 className="page-title mt-1">Find anything on the hub</h1>
      <p className="page-lead mt-2">
        Lessons, FAQ, glossary, pools, wallets, and troubleshooting.
      </p>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try bc1, stratum, wallet, qPoW…"
        className="form-input mt-6"
        aria-label="Search site"
        autoFocus
      />

      {query.trim().length >= 2 && results.length === 0 && (
        <p className="mt-6 text-sm text-muted">No results. Try the FAQ or Quantum Tutor.</p>
      )}

      <ul className="mt-6 space-y-2">
        {results.map((r) => (
          <li key={`${r.href}-${r.title}`}>
            <Link
              href={r.href}
              className="surface-panel block px-4 py-3 transition hover:bg-card-hover"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{r.title}</span>
                <span className="badge-pill badge-community">{r.category}</span>
              </div>
              <p className="mt-1 text-xs text-muted line-clamp-2">{r.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
