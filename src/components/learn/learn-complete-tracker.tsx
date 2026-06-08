"use client";

import { useEffect } from "react";
import { useLearnStore } from "@/store/learn-store";

export function LearnCompleteTracker({ slug }: { slug: string }) {
  const markComplete = useLearnStore((s) => s.markComplete);

  useEffect(() => {
    const timer = setTimeout(() => markComplete(slug), 8000);
    return () => clearTimeout(timer);
  }, [slug, markComplete]);

  return null;
}
