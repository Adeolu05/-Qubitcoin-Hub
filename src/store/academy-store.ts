"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  academyBadges,
  academyLessons,
  practicalLessonSlugs,
} from "@/lib/academy-content";
import { trackEvent } from "@/lib/analytics";

interface LessonProgress {
  completed: boolean;
  bestScore: number;
  attempts: number;
  completedAt?: string;
}

interface AcademyState {
  xp: number;
  streak: number;
  lastLessonDate: string | null;
  lessons: Record<string, LessonProgress>;
  badges: string[];
  addXp: (amount: number) => void;
  completeLesson: (
    slug: string,
    score: number,
    total: number,
  ) => { newBadges: string[] };
  getCompletedCount: () => number;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function checkBadges(
  completedCount: number,
  badges: string[],
  perfectFirstTry: boolean,
  lessonProgress: Record<string, LessonProgress>,
): string[] {
  const earned = [...badges];
  const add = (id: string) => {
    if (!earned.includes(id)) earned.push(id);
  };

  if (completedCount >= 1) add("quantum-novice");
  if (completedCount >= 3) add("qubit-miner");

  const practicalDone = practicalLessonSlugs.every(
    (slug) => lessonProgress[slug]?.completed,
  );
  if (practicalDone && practicalLessonSlugs.length > 0) {
    add("network-navigator");
  }

  if (completedCount >= academyLessons.length) add("superposition-scholar");
  if (perfectFirstTry) add("perfect-score");

  return earned;
}

export const useAcademyStore = create<AcademyState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastLessonDate: null,
      lessons: {},
      badges: [],

      addXp: (amount) => set((s) => ({ xp: s.xp + amount })),

      completeLesson: (slug, score, total) => {
        const pct = Math.round((score / total) * 100);
        const existing = get().lessons[slug];
        const isFirstTry = !existing || existing.attempts === 0;
        const perfectFirstTry = isFirstTry && score === total;

        const lessonXp =
          academyLessons.find((l) => l.slug === slug)?.xp ?? 30;
        const bonus = pct === 100 ? Math.round(lessonXp * 0.5) : 0;
        const earnedXp = Math.round(lessonXp * (pct / 100)) + bonus;

        const now = today();
        const last = get().lastLessonDate;
        let streak = get().streak;
        if (last !== now) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yStr = yesterday.toISOString().slice(0, 10);
          streak = last === yStr ? streak + 1 : 1;
        }

        const prevBadges = get().badges;
        let earnedBadgeIds: string[] = [];

        set((s) => {
          const lessons = {
            ...s.lessons,
            [slug]: {
              completed: pct >= 60,
              bestScore: Math.max(existing?.bestScore ?? 0, pct),
              attempts: (existing?.attempts ?? 0) + 1,
              completedAt: pct >= 60 ? now : existing?.completedAt,
            },
          };

          const completedCount = Object.values(lessons).filter(
            (l) => l.completed,
          ).length;
          const newXp = s.xp + earnedXp;
          const newBadges = checkBadges(
            completedCount,
            prevBadges,
            perfectFirstTry,
            lessons,
          );
          earnedBadgeIds = newBadges.filter((b) => !prevBadges.includes(b));

          if (pct >= 60) {
            trackEvent("academy_quiz_pass", { slug, score: pct });
          }

          return {
            xp: newXp,
            streak,
            lastLessonDate: now,
            lessons,
            badges: newBadges,
          };
        });

        return { newBadges: earnedBadgeIds };
      },

      getCompletedCount: () =>
        Object.values(get().lessons).filter((l) => l.completed).length,
    }),
    { name: "qtc-academy" },
  ),
);

export function getBadgeInfo(id: string) {
  return academyBadges.find((b) => b.id === id);
}
