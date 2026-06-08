"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { learnTopics } from "@/lib/learn-content";
import { useLearnStore } from "@/store/learn-store";
import { cn } from "@/lib/utils";

export function LearnNav() {
  const pathname = usePathname();
  const completed = useLearnStore((s) => s.completed);

  return (
    <nav className="flex flex-col gap-0.5">
      <Link
        href="/learn"
        className={cn(
          "rounded-lg px-3 py-2 text-sm transition",
          pathname === "/learn"
            ? "bg-accent/15 font-medium text-accent"
            : "text-muted hover:bg-muted/10 hover:text-foreground",
        )}
      >
        Overview
      </Link>
      {learnTopics.map((topic) => {
        const href = `/learn/${topic.slug}`;
        const active = pathname === href;
        const done = completed.includes(topic.slug);
        return (
          <Link
            key={topic.slug}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
              active
                ? "bg-accent/15 font-medium text-accent"
                : "text-muted hover:bg-muted/10 hover:text-foreground",
            )}
          >
            <span className="w-4 text-center text-xs opacity-60">
              {done ? "✓" : topic.icon}
            </span>
            {topic.title}
          </Link>
        );
      })}
      <Link
        href="/academy"
        className="mt-2 rounded-lg border border-border px-3 py-2 text-xs text-muted transition hover:text-foreground"
      >
        Take Academy quizzes →
      </Link>
    </nav>
  );
}
