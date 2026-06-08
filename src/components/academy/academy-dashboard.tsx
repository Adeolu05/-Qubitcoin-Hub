"use client";

import Link from "next/link";
import {
  academyLessons,
  FUNDAMENTALS_LESSON_ORDER,
  LESSON_CATEGORIES,
  PRACTICAL_LESSON_ORDER,
  VISION_LESSON_ORDER,
  xpProgress,
  xpToLevel,
} from "@/lib/academy-content";
import { useAcademyStore } from "@/store/academy-store";
import { academyBadges } from "@/lib/academy-content";
import { ProgressSync } from "@/components/progress/progress-sync";
import { cn } from "@/lib/utils";

function sortLessons(
  lessons: typeof academyLessons,
  order: readonly string[],
) {
  return [...lessons].sort(
    (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug),
  );
}

export function AcademyDashboard() {
  const { xp, streak, lessons, badges } = useAcademyStore();
  const level = xpToLevel(xp);
  const progress = xpProgress(xp);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: `Level ${level}`, value: `${xp} XP`, sub: `${progress}/100 to next` },
          { label: "Streak", value: `${streak} ${streak === 1 ? "day" : "days"}`, sub: null },
          {
            label: "Lessons done",
            value: `${Object.values(lessons).filter((l) => l.completed).length}/${academyLessons.length}`,
            sub: null,
          },
        ].map((stat) => (
          <div key={stat.label} className="surface-panel px-4 py-3">
            <p className="text-[11px] text-muted">{stat.label}</p>
            <p className="mt-0.5 font-display text-xl font-semibold text-foreground">
              {stat.value}
            </p>
            {stat.label.startsWith("Level") && (
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            {stat.sub && <p className="mt-1 text-[10px] text-muted">{stat.sub}</p>}
          </div>
        ))}
      </div>

      <div className="callout-info mt-6 px-4 py-3">
        <h2 className="text-sm font-semibold">Quick links</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            { href: "/pool", label: "Pools" },
            { href: "/wallet", label: "Wallets" },
            { href: "/buy", label: "Buy QTC" },
            { href: "/community", label: "Community" },
            { href: "/updates", label: "Updates" },
            { href: "/start", label: "Pick your path" },
            { href: "/start/mine", label: "Mining setup" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[var(--callout-info-border)] px-3 py-1 text-xs text-link transition hover:bg-accent-subtle"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <h2 className="mt-8 text-sm font-semibold text-foreground">Badges</h2>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {academyBadges.map((badge) => {
          const earned = badges.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={cn(
                "surface-panel px-3 py-3 text-center",
                !earned && "opacity-40",
              )}
            >
              <span className="text-xl">{badge.icon}</span>
              <p className="mt-1 text-[11px] font-medium text-foreground">
                {badge.name}
              </p>
            </div>
          );
        })}
      </div>

      <ProgressSync />

      {LESSON_CATEGORIES.map((category) => {
        let categoryLessons = academyLessons.filter(
          (l) => l.category === category.id,
        );
        if (category.id === "practical") {
          categoryLessons = sortLessons(categoryLessons, PRACTICAL_LESSON_ORDER);
        } else if (category.id === "fundamentals") {
          categoryLessons = sortLessons(
            categoryLessons,
            FUNDAMENTALS_LESSON_ORDER,
          );
        } else if (category.id === "vision") {
          categoryLessons = sortLessons(categoryLessons, VISION_LESSON_ORDER);
        }
        if (categoryLessons.length === 0) return null;

        return (
          <div key={category.id} className="mt-8">
            <h2 className="text-sm font-semibold text-foreground">{category.label}</h2>
            <p className="mt-0.5 text-xs text-muted">{category.description}</p>
            <div className="surface-panel mt-3 overflow-hidden">
              {categoryLessons.map((lesson) => {
                const prog = lessons[lesson.slug];
                const done = prog?.completed;
                return (
                  <Link
                    key={lesson.slug}
                    href={`/academy/${lesson.slug}`}
                    className="surface-row items-start sm:items-center"
                  >
                    <span className="text-lg">{lesson.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {lesson.title}
                        </p>
                        {done && (
                          <span className="badge-pill badge-official">Done</span>
                        )}
                      </div>
                      <p className="text-xs text-muted">{lesson.description}</p>
                    </div>
                    <span className="text-xs text-accent-foreground">
                      +{lesson.xp} XP
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
