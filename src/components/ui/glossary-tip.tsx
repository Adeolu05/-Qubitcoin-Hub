"use client";

import { useState } from "react";
import Link from "next/link";
import { getGlossaryByTerm } from "@/lib/glossary";

interface GlossaryTipProps {
  term: string;
  children?: React.ReactNode;
}

export function GlossaryTip({ term, children }: GlossaryTipProps) {
  const [show, setShow] = useState(false);
  const entry = getGlossaryByTerm(term);

  if (!entry) {
    return <span>{children ?? term}</span>;
  }

  return (
    <span className="relative inline">
      <button
        type="button"
        aria-expanded={show}
        aria-describedby={show ? `tip-${entry.slug}` : undefined}
        className="border-b border-dashed border-accent/40 text-link transition hover:border-accent hover:text-accent-foreground"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onClick={() => setShow((v) => !v)}
      >
        {children ?? term}
      </button>
      {show && (
        <span
          id={`tip-${entry.slug}`}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg border border-border bg-card px-3 py-2 text-left text-xs leading-relaxed text-muted shadow-xl"
        >
          <strong className="text-foreground">{entry.term}</strong>
          <br />
          {entry.simple}
          <Link href={`/glossary#${entry.slug}`} className="mt-1 block text-link">
            Learn more →
          </Link>
        </span>
      )}
    </span>
  );
}
