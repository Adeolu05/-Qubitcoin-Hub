import Link from "next/link";
import {
  BADGE_LABELS,
  type EcosystemResource,
  type ResourceBadge,
} from "@/lib/ecosystem-links";

function ResourceRow({
  item,
  children,
}: {
  item: EcosystemResource;
  children: React.ReactNode;
}) {
  const className =
    "surface-row group flex-col items-stretch sm:flex-row sm:items-center";

  if (item.url.startsWith("/")) {
    return (
      <Link href={item.url} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function ResourceLinksGrid({ items }: { items: EcosystemResource[] }) {
  return (
    <div className="surface-panel overflow-hidden">
      {items.map((item) => (
        <ResourceRow key={item.id} item={item}>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground group-hover:text-accent-foreground">
                {item.name}
              </span>
              {item.badge && (
                <span className={`badge-pill badge-${item.badge}`}>
                  {BADGE_LABELS[item.badge as ResourceBadge]}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted">{item.description}</p>
            {item.stratum && (
              <p className="mt-1 font-mono text-[11px] text-accent-foreground">
                {item.stratum}
              </p>
            )}
          </div>
          <span className="shrink-0 text-xs text-link">Open ↗</span>
        </ResourceRow>
      ))}
    </div>
  );
}
