import Link from "next/link";
import { LearnNav } from "@/components/learn/learn-nav";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="page-eyebrow">Learn</p>
          <h1 className="page-title mt-1">Understand Qubitcoin</h1>
        </div>
        <Link
          href="/start"
          className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-[#0a0a0a] transition hover:brightness-110"
        >
          Pick your path →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <LearnNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
