"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand/brand-logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useNavMenu } from "@/components/layout/nav-menu-context";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/start", label: "Start" },
  { href: "/learn", label: "Learn" },
  { href: "/academy", label: "Academy" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/faq", label: "FAQ" },
  { href: "/search", label: "Search" },
];

export function FloatingNav() {
  const pathname = usePathname();
  const { open: menuOpen } = useNavMenu();

  return (
    <header className="pointer-events-none fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div
        data-nav-menu-open={menuOpen ? "" : undefined}
        className={cn(
          "floating-nav-pill pointer-events-auto flex w-full max-w-[800px] items-center justify-between gap-2",
          "rounded-full border border-border bg-nav-bg py-1.5 pl-4 pr-2 backdrop-blur-md",
          "shadow-lg shadow-black/5 dark:shadow-black/20",
          menuOpen && "border-border bg-card shadow-md backdrop-blur-none",
        )}
      >
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
          <BrandLogo
            size={28}
            showWordmark
            compact
            wordmarkClassName={menuOpen ? "text-foreground" : undefined}
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[13px] font-medium transition",
                  active
                    ? "text-foreground"
                    : "text-nav-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <ThemeToggle menuOpen={menuOpen} />
          <Link
            href="/start"
            className="hidden rounded-full bg-nav-cta-bg px-4 py-2 text-[13px] font-medium text-nav-cta-fg transition hover:brightness-110 sm:inline-block"
          >
            Get Started
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
