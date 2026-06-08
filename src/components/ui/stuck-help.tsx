"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface StuckHelpProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function StuckHelp({
  title = "I'm stuck",
  children,
  className,
}: StuckHelpProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("mt-4", className)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-sm text-link underline-offset-4 transition hover:underline"
      >
        {open ? "Hide help" : title}
      </button>
      {open && (
        <div className="callout-info mt-2 px-4 py-3 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
