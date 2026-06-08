"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { learnTopics } from "@/lib/learn-content";
import { trackEvent } from "@/lib/analytics";

interface LearnState {
  completed: string[];
  markComplete: (slug: string) => void;
  isComplete: (slug: string) => boolean;
  getCompletedCount: () => number;
}

export const useLearnStore = create<LearnState>()(
  persist(
    (set, get) => ({
      completed: [],

      markComplete: (slug) => {
        if (get().completed.includes(slug)) return;
        set((s) => ({ completed: [...s.completed, slug] }));
        trackEvent("learn_topic_complete", { slug });
      },

      isComplete: (slug) => get().completed.includes(slug),

      getCompletedCount: () => get().completed.length,
    }),
    { name: "qtc-learn" },
  ),
);

export function learnProgressPercent(): number {
  if (learnTopics.length === 0) return 0;
  return Math.round(
    (useLearnStore.getState().getCompletedCount() / learnTopics.length) * 100,
  );
}
