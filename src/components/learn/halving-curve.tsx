"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { halvingEpochs } from "@/lib/learn-content";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const MAX_SUPPLY = 21_000_000;

export function HalvingCurve() {
  const reducedMotion = useReducedMotion();
  const [epoch, setEpoch] = useState(0);
  const current = halvingEpochs[epoch];

  return (
    <div className="surface-panel p-4 sm:p-5">
      <div className="mb-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted">Block reward</p>
            <p className="font-display text-3xl font-bold text-foreground">
              {current.subsidy}{" "}
              <span className="text-lg text-muted">QTC / block</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Epoch {current.epoch}</p>
            <p className="text-sm text-muted">Blocks {current.blocks}</p>
          </div>
        </div>
      </div>

      <div className="mb-2 flex justify-between text-xs text-muted">
        <span>Coins minted toward 21M cap</span>
        <span>{current.pct}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${current.pct}%` }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
        />
      </div>
      <p className="mt-2 text-xs text-muted">
        {current.cumulative.toLocaleString()} of {MAX_SUPPLY.toLocaleString()}{" "}
        QTC minted by end of this epoch
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {halvingEpochs.map((e) => (
          <button
            key={e.epoch}
            type="button"
            onClick={() => setEpoch(e.epoch)}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm transition",
              epoch === e.epoch
                ? "choice-card-selected"
                : "border-border text-muted hover:border-accent/30",
            )}
          >
            Epoch {e.epoch}
            <span className="ml-1.5 text-xs opacity-60">{e.subsidy} QTC</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-end gap-2" style={{ height: 120 }}>
        {halvingEpochs.map((e) => {
          const height = (e.subsidy / 50) * 100;
          const active = e.epoch === epoch;
          return (
            <button
              key={e.epoch}
              type="button"
              onClick={() => setEpoch(e.epoch)}
              className="group flex flex-1 flex-col items-center gap-1"
            >
              <motion.div
                className={cn(
                  "w-full rounded-t-md",
                  active ? "bg-accent" : "bg-border group-hover:bg-accent-muted",
                )}
                animate={{ height: `${height}%` }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                style={{ minHeight: 8 }}
              />
              <span
                className={cn(
                  "text-[10px]",
                  active ? "text-accent-foreground" : "text-muted",
                )}
              >
                {e.subsidy}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-muted">
        Qubitcoin copies Bitcoin&apos;s emission model exactly: halving every
        210,000 blocks (~4 years), starting at 50 QTC per block, hard cap of 21
        million. Scarcity you already understand, new consensus underneath.
      </p>
    </div>
  );
}
