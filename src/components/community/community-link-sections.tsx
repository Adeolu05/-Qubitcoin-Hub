import Link from "next/link";
import {
  COMMUNITY_LINKS,
  COMMUNITY_SECTIONS,
  REGIONAL_GROUPS,
  VERIFIED_OTC_CONTACTS,
  type CommunityLink,
} from "@/lib/community-links";

function LinkRow({ item }: { item: CommunityLink }) {
  const isInternal = item.url.startsWith("/");
  const inner = (
    <>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-foreground">
            {item.name}
          </span>
          {item.badge && (
            <span className={`badge-pill badge-${item.badge} shrink-0`}>
              {item.badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted">{item.description}</p>
      </div>
      <span className="shrink-0 text-xs text-link">↗</span>
    </>
  );

  if (isInternal) {
    return (
      <Link href={item.url} className="surface-row group">
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="surface-row group"
    >
      {inner}
    </a>
  );
}

export function CommunityLinkSections() {
  return (
    <div className="space-y-6">
      {COMMUNITY_SECTIONS.map((section) => {
        const items = COMMUNITY_LINKS.filter((l) => l.section === section.id);
        if (items.length === 0) return null;

        return (
          <section key={section.id}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold text-foreground">
                {section.label}
              </h2>
              <span className="text-xs text-muted">{items.length} links</span>
            </div>
            <p className="mb-3 text-xs text-muted">{section.description}</p>
            <div className="surface-panel overflow-hidden">
              {items.map((item) => (
                <LinkRow key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}

      <section>
        <h2 className="text-sm font-semibold text-foreground">
          Community in your language
        </h2>
        <p className="mt-1 text-xs text-muted">
          Unofficial regional groups listed in official Telegram rules.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {REGIONAL_GROUPS.map((g) => (
            <a
              key={g.url}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted transition hover:border-accent/30 hover:text-foreground"
            >
              {g.region}
            </a>
          ))}
        </div>
      </section>

      <section className="callout-danger px-4 py-3.5">
        <h2 className="text-sm font-semibold">OTC &amp; scam safety</h2>
        <p className="mt-1.5 text-xs leading-relaxed opacity-90">
          OTC only through verified admins. Never trust random DMs. Verified:{" "}
          {VERIFIED_OTC_CONTACTS.join(", ")}.
        </p>
        <p className="mt-2 text-xs opacity-80">
          Downloads only from superquantum.io and GitHub. See{" "}
          <Link href="/updates" className="text-link font-medium">
            network updates
          </Link>{" "}
          after patches.
        </p>
      </section>
    </div>
  );
}
