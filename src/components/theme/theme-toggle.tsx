"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

type ThemeToggleProps = {
  className?: string;
  menuOpen?: boolean;
};

export function ThemeToggle({ className, menuOpen }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const strokeWidth = menuOpen ? 2 : 1.5;

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Theme"
        className={cn(
          "theme-toggle-btn nav-icon-btn flex h-8 w-8 items-center justify-center rounded-full text-foreground",
          menuOpen && "text-foreground",
          className,
        )}
      />
    );
  }

  const current = theme ?? "system";
  const idx = themes.findIndex((t) => t.value === current);
  const next = themes[(idx + 1) % themes.length];

  return (
    <button
      type="button"
      onClick={() => setTheme(next.value)}
      aria-label={`Theme: ${current}. Click for ${next.label}.`}
      title={`${resolvedTheme === "dark" ? "Dark" : "Light"} · ${themes.find((t) => t.value === current)?.label}`}
      className={cn(
        "theme-toggle-btn nav-icon-btn flex h-8 w-8 items-center justify-center rounded-full text-foreground transition hover:bg-foreground/10",
        menuOpen && "text-foreground",
        className,
      )}
    >
      {resolvedTheme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
