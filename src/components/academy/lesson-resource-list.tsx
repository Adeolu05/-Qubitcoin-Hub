import Link from "next/link";
import type { LessonResource } from "@/lib/academy-content";

function ResourceRow({ resource }: { resource: LessonResource }) {
  const isInternal = resource.internal ?? resource.url.startsWith("/");
  const inner = (
    <>
      <span className="text-sm font-medium text-foreground">{resource.name}</span>
      {resource.description && (
        <p className="mt-0.5 text-xs text-muted">{resource.description}</p>
      )}
      <span className="mt-1 inline-block text-[11px] text-link">
        {isInternal ? "Open →" : "Open link ↗"}
      </span>
    </>
  );

  if (isInternal) {
    return (
      <Link href={resource.url} className="surface-row block items-stretch">
        {inner}
      </Link>
    );
  }

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="surface-row block items-stretch"
    >
      {inner}
    </a>
  );
}

export function LessonResourceList({
  resources,
  title = "Handy links",
}: {
  resources: LessonResource[];
  title?: string;
}) {
  if (resources.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-xs font-medium uppercase tracking-wide text-accent-foreground">
        {title}
      </h3>
      <div className="surface-panel mt-2 overflow-hidden">
        {resources.map((resource) => (
          <ResourceRow
            key={`${resource.name}-${resource.url}`}
            resource={resource}
          />
        ))}
      </div>
    </div>
  );
}
