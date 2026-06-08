"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const primaryNav = [
  { href: "/start", label: "Start", desc: "Pick your onboarding path" },
  { href: "/learn", label: "Learn", desc: "Understand qPoW" },
  { href: "/academy", label: "Academy", desc: "Quizzes & badges" },
  { href: "/ecosystem", label: "Ecosystem", desc: "Explore the network" },
  { href: "/community", label: "Community", desc: "Telegram, Discord & links" },
  { href: "/updates", label: "Updates", desc: "Patches & milestones" },
];

const secondaryNav = [
  { href: "/faq", label: "FAQ" },
  { href: "/glossary", label: "Glossary" },
  { href: "/help/troubleshooting", label: "Troubleshooting" },
  { href: "/search", label: "Search" },
];

function MenuIcon({ open }: { open: boolean }) {
  const transition = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };
  const barClass = cn(
    "menu-toggle-bar absolute block w-4 rounded-full",
    open ? "h-[2px] bg-current" : "h-[1.5px] bg-foreground",
  );

  return (
    <div className="relative flex h-4 w-4 flex-col items-center justify-center" aria-hidden="true">
      <motion.span
        className={barClass}
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
        transition={transition}
      />
      <motion.span
        className={barClass}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={transition}
      />
      <motion.span
        className={barClass}
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
        transition={transition}
      />
    </div>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.setAttribute("data-menu-open", "");
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("data-menu-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.removeAttribute("data-menu-open");
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className={cn(
          "menu-toggle-btn nav-icon-btn relative flex h-8 w-8 items-center justify-center rounded-full transition",
          open
            ? "bg-foreground text-background shadow-sm"
            : "text-foreground hover:bg-foreground/10",
        )}
      >
        <MenuIcon open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mobile-menu-backdrop fixed inset-0 z-40 bg-black/50"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-4 right-4 top-[calc(1.5rem+3rem+0.5rem)] z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/25"
            >
              <div className="px-4 py-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  Navigate
                </p>
                <div className="space-y-1">
                  {primaryNav.map((item, i) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-4 py-3.5 transition",
                            active
                              ? "bg-accent/15 text-foreground"
                              : "text-foreground hover:bg-foreground/5",
                          )}
                        >
                          <div>
                            <span className="block text-base font-semibold">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-sm text-muted">
                              {item.desc}
                            </span>
                          </div>
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="my-4 h-px bg-border" />

                <div className="flex gap-2">
                  {secondaryNav.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex-1 rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition",
                          active
                            ? "border-cyan-400/30 bg-accent/10 text-foreground"
                            : "border-border bg-surface-elevated text-foreground hover:border-foreground/20",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href="/start"
                  onClick={() => setOpen(false)}
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-nav-cta-bg py-3 text-sm font-medium text-nav-cta-fg transition hover:brightness-110"
                >
                  Get Started
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
