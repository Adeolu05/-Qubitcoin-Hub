import Link from "next/link";
import {
  CURRENT_STATUS,
  NETWORK_UPDATES,
  PROJECT_MILESTONES,
  type NetworkUpdate,
  type UpdateSeverity,
} from "@/lib/network-updates";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { cn } from "@/lib/utils";

const severityClass: Record<UpdateSeverity, string> = {
  critical: "border-[var(--severity-critical-border)] bg-[var(--severity-critical-bg)]",
  important: "border-[var(--severity-important-border)] bg-[var(--severity-important-bg)]",
  info: "border-border bg-card",
};

const severityLabelClass: Record<UpdateSeverity, string> = {
  critical: "text-[var(--severity-critical-fg)]",
  important: "text-[var(--severity-important-fg)]",
  info: "text-muted",
};

const audienceLabels: Record<NetworkUpdate["audience"][number], string> = {
  miners: "Miners",
  "node-operators": "Nodes",
  "wallet-users": "Wallets",
  everyone: "All",
};

function UpdateRow({ update }: { update: NetworkUpdate }) {
  return (
    <details className="group border-b border-border last:border-b-0">
      <summary
        className={cn(
          "flex cursor-pointer list-none items-start gap-3 px-4 py-3 transition hover:bg-card-hover [&::-webkit-details-marker]:hidden",
        )}
      >
        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <time className="text-[11px] text-muted">{update.date}</time>
            <span
              className={cn(
                "badge-pill uppercase tracking-wide",
                severityLabelClass[update.severity],
                severityClass[update.severity],
                "border px-1.5 py-0 text-[10px]",
              )}
            >
              {update.severity}
            </span>
            {update.audience.map((a) => (
              <span key={a} className="text-[10px] text-muted">
                {audienceLabels[a]}
              </span>
            ))}
          </div>
          <h2 className="mt-1 text-sm font-medium text-foreground">
            {update.title}
          </h2>
          <p className="mt-1 line-clamp-2 text-xs text-muted">{update.summary}</p>
        </div>
        <span className="shrink-0 text-xs text-muted transition group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="border-t border-border bg-accent-subtle px-4 py-3 pl-9">
        <p className="text-xs font-medium text-accent-foreground">What to do</p>
        <p className="mt-1 text-sm text-foreground">{update.action}</p>
        {update.sources.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3">
            {update.sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-link"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </details>
  );
}

export const metadata = {
  title: "Network updates",
  description:
    "Qubitcoin patch history, upgrade actions, and project milestones from official announcements.",
};

export default function UpdatesPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Operations" title="Network updates">
        Patch history from official announcements. Live alerts on{" "}
        <Link href="/community" className="text-link">
          official channels
        </Link>
        .
      </PageHeader>

      <div className="callout-info mb-6 px-4 py-3.5">
        <p className="text-sm font-medium">Current guidance</p>
        <p className="mt-1 text-sm opacity-90">{CURRENT_STATUS.message}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={CURRENT_STATUS.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-[#0a0a0a] transition hover:brightness-110"
          >
            Downloads ↗
          </a>
          <a
            href={CURRENT_STATUS.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition hover:bg-card-hover"
          >
            GitHub ↗
          </a>
          <Link
            href="/start/mine"
            className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition hover:bg-card-hover"
          >
            Mining setup
          </Link>
        </div>
        <p className="mt-2 text-[11px] opacity-70">
          Reviewed {CURRENT_STATUS.lastReviewed}
        </p>
      </div>

      <section>
        <h2 className="text-sm font-semibold text-foreground">
          Patch history
        </h2>
        <p className="mt-1 text-xs text-muted">
          Newest first, confirm against live announcements.
        </p>
        <div className="surface-panel mt-3 overflow-hidden">
          {NETWORK_UPDATES.map((update) => (
            <UpdateRow key={update.id} update={update} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold text-foreground">Milestones</h2>
        <div className="surface-panel mt-3 divide-y divide-border">
          {PROJECT_MILESTONES.map((m) => (
            <div key={m.id} className="flex gap-3 px-4 py-3">
              <time className="w-14 shrink-0 text-[11px] text-muted">{m.date}</time>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-foreground">{m.title}</h3>
                <p className="mt-0.5 text-xs text-muted">{m.description}</p>
                {m.url &&
                  (m.url.startsWith("/") ? (
                    <Link href={m.url} className="mt-1 inline-block text-xs text-link">
                      More →
                    </Link>
                  ) : (
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-link"
                    >
                      View ↗
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
