"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const steps = [
  { id: "block", label: "Block data", desc: "Latest block header is hashed" },
  { id: "angles", label: "Circuit angles", desc: "Hash seeds rotation angles for each gate" },
  { id: "simulate", label: "GPU simulates", desc: "16-qubit circuit runs on your NVIDIA GPU" },
  { id: "expect", label: "Expectation values", desc: "Quantum state is measured and compressed" },
  { id: "hash", label: "256-bit hash", desc: "Result checked against network difficulty" },
  { id: "result", label: "Block found?", desc: "If valid → new block + QTC reward. If not → try again." },
] as const;

export function MiningLoop() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  async function play() {
    setPlaying(true);
    for (let i = 0; i < steps.length; i++) {
      setActive(i);
      await new Promise((r) => setTimeout(r, reducedMotion ? 200 : 900));
    }
    setPlaying(false);
  }

  return (
    <div className="surface-panel p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted">One mining attempt, step by step</p>
        <button
          type="button"
          onClick={play}
          disabled={playing}
          className="btn-secondary disabled:opacity-50"
        >
          {playing ? "Playing…" : "Play loop"}
        </button>
      </div>

      <div className="space-y-2">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3 transition",
              active === i && playing
                ? "border-accent/40 bg-accent-muted"
                : active === i
                  ? "border-accent/25 bg-accent-subtle"
                  : "border-border bg-transparent",
            )}
          >
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                active === i
                  ? "bg-accent text-[#0a0a0a]"
                  : "bg-border text-muted",
              )}
            >
              {i + 1}
            </div>
            <div>
              <p className="font-medium text-foreground">{step.label}</p>
              <p className="text-sm text-muted">{step.desc}</p>
            </div>
            <AnimatePresence>
              {active === i && playing && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="ml-auto h-2 w-2 rounded-full bg-accent"
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
