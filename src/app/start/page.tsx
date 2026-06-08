import Link from "next/link";
import { Suspense } from "react";
import { ONBOARDING_PATHS } from "@/lib/onboarding-paths";
import { PageShell } from "@/components/ui/page-shell";
import { PathTracker } from "@/components/onboarding/path-tracker";

export const metadata = {
  title: "Start Here: Pick Your Path",
  description:
    "New to Qubitcoin? Choose how you want to begin: understand qPoW, start mining, or buy and hold QTC.",
};

export default function StartPage() {
  return (
    <PageShell>
      <Suspense fallback={null}>
        <PathTracker />
      </Suspense>
      <div className="mx-auto max-w-2xl text-center">
        <p className="page-eyebrow">Onboarding school</p>
        <h1 className="page-title mt-1">Where do you want to start?</h1>
        <p className="page-lead mt-2">
          Pick a path below. Each one tells you exactly what to do next, no guesswork.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
        {ONBOARDING_PATHS.map((path) => (
          <Link
            key={path.id}
            href={path.href}
            data-path={path.id}
            className="group surface-panel flex flex-col p-5 transition hover:border-accent/30 hover:bg-card-hover"
          >
            <span className="text-2xl" aria-hidden>
              {path.icon}
            </span>
            <h2 className="mt-3 font-display text-base font-semibold text-foreground group-hover:text-accent-foreground">
              {path.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {path.description}
            </p>
            <p className="mt-3 text-xs font-medium text-accent-foreground">
              {path.duration} · {path.steps.length} steps
            </p>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <h2 className="text-center text-sm font-medium text-foreground">
          Not sure? Start with Learn
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          The{" "}
          <Link href="/learn" className="text-link">
            Learn section
          </Link>{" "}
          explains qPoW in plain language with interactive demos. You can always
          switch paths later.
        </p>
      </div>
    </PageShell>
  );
}
