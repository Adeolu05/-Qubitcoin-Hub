"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { OnboardingPath } from "@/lib/onboarding-paths";
import { trackEvent } from "@/lib/analytics";

const VALID_PATHS: OnboardingPath[] = ["understand", "mine", "hold"];

export function PathTracker() {
  const searchParams = useSearchParams();
  const path = searchParams.get("path");

  useEffect(() => {
    if (path && VALID_PATHS.includes(path as OnboardingPath)) {
      trackEvent("path_selected", { path });
      localStorage.setItem("qtc-onboarding-path", path);
    }
  }, [path]);

  return null;
}
