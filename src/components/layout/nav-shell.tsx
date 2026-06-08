"use client";

import { NavMenuProvider } from "@/components/layout/nav-menu-context";
import { FloatingNav } from "@/components/layout/floating-nav";
import type { ReactNode } from "react";

export function NavShell({ children }: { children: ReactNode }) {
  return (
    <NavMenuProvider>
      <FloatingNav />
      {children}
    </NavMenuProvider>
  );
}
