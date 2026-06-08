import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";

const links = {
  Learn: [
    { href: "/learn", label: "Overview" },
    { href: "/learn/qpow", label: "What is qPoW?" },
    { href: "/learn/tokenomics", label: "Tokenomics" },
    { href: "/glossary", label: "Glossary" },
    { href: "/faq", label: "FAQ" },
  ],
  Start: [
    { href: "/start", label: "Pick your path" },
    { href: "/start/mine", label: "Mining setup" },
    { href: "/academy", label: "Academy" },
    { href: "/ecosystem", label: "Ecosystem" },
  ],
  Resources: [
    { href: "/pool", label: "Mining pools" },
    { href: "/wallet", label: "Wallets" },
    { href: "/buy", label: "Buy QTC" },
    { href: "/community", label: "Community" },
    { href: "/updates", label: "Network updates" },
  ],
  Official: [
    { href: "https://superquantum.io/qubitcoin", label: "Superquantum", external: true },
    { href: "https://github.com/super-quantum/qubitcoin", label: "GitHub", external: true },
  ],
};

function FooterLink({
  item,
}: {
  item: { href: string; label: string; external?: boolean };
}) {
  const className = "text-sm text-muted transition hover:text-foreground";

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {item.label} ↗
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-12">
        {/* Mobile: compact brand + accordion */}
        <div className="md:hidden">
          <div className="flex items-center justify-between gap-3">
            <BrandLogo size={28} showWordmark compact />
            <Link
              href="/start"
              className="shrink-0 rounded-full bg-nav-cta-bg px-3.5 py-1.5 text-xs font-medium text-nav-cta-fg"
            >
              Get Started
            </Link>
          </div>

          <nav
            className="mt-4 divide-y divide-border rounded-xl border border-border"
            aria-label="Footer"
          >
            {Object.entries(links).map(([title, items]) => (
              <details key={title} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between px-3.5 py-2.5 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                  {title}
                  <span
                    className="text-xs text-muted transition-transform group-open:rotate-180"
                    aria-hidden
                  >
                    ▾
                  </span>
                </summary>
                <ul className="space-y-1.5 px-3.5 pb-3">
                  {items.map((item) => (
                    <li key={item.href}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </nav>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
            Not financial advice · Experimental project · DYOR
            <br />
            © {year} Qubitcoin Hub
          </p>
        </div>

        {/* Desktop: full grid */}
        <div className="hidden md:block">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <BrandLogo size={36} showWordmark />
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The beginner-friendly onboarding platform for the Qubitcoin
                ecosystem.
              </p>
            </div>

            {Object.entries(links).map(([title, items]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-foreground">{title}</h3>
                <ul className="mt-3 space-y-2">
                  {items.map((item) => (
                    <li key={item.href}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-xs text-muted">
              Not financial advice. Qubitcoin is experimental, DYOR.
            </p>
            <p className="text-xs text-muted">
              © {year} Qubitcoin Hub · Community onboarding project
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
