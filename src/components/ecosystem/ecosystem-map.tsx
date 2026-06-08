"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  categoryColors,
  ecosystemEdges,
  ecosystemNodes,
  type EcosystemNode,
} from "@/lib/ecosystem-data";
export function EcosystemMap() {
  const [active, setActive] = useState<EcosystemNode | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const highlightIds = new Set<string>();
  if (active) {
    highlightIds.add(active.id);
    ecosystemEdges.forEach((e) => {
      if (e.from === active.id) highlightIds.add(e.to);
      if (e.to === active.id) highlightIds.add(e.from);
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <svg
          viewBox="0 0 100 100"
          className="w-full aspect-[4/3] sm:aspect-[16/10]"
          role="img"
          aria-label="Qubitcoin ecosystem map"
        >
          {/* Edges */}
          {ecosystemEdges.map((edge) => {
            const from = ecosystemNodes.find((n) => n.id === edge.from)!;
            const to = ecosystemNodes.find((n) => n.id === edge.to)!;
            const lit =
              hovered === edge.from ||
              hovered === edge.to ||
              highlightIds.has(edge.from) ||
              highlightIds.has(edge.to);
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={lit ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.08)"}
                strokeWidth={lit ? 0.4 : 0.2}
              />
            );
          })}

          {/* Nodes */}
          {ecosystemNodes.map((node) => {
            const isActive = active?.id === node.id;
            const isHovered = hovered === node.id;
            const isHighlighted = highlightIds.has(node.id);
            const color = categoryColors[node.category];
            const r = node.id === "network" ? 5 : 3.5;

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onClick={() => setActive(node)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {(isActive || isHighlighted) && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r + 2}
                    fill="none"
                    stroke={color}
                    strokeWidth={0.3}
                    opacity={0.5}
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r}
                  fill={isActive || isHovered ? color : `${color}88`}
                  stroke={isActive ? "#fff" : color}
                  strokeWidth={isActive ? 0.4 : 0.2}
                />
                <text
                  x={node.x}
                  y={node.y + r + 3.5}
                  textAnchor="middle"
                  className="fill-zinc-400 text-[2.8px] font-medium"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 border-t border-border px-4 py-3">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <span key={cat} className="flex items-center gap-1.5 text-xs text-muted">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Side panel */}
      <div className="surface-panel p-4">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span
                className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
                style={{
                  backgroundColor: `${categoryColors[active.category]}22`,
                  color: categoryColors[active.category],
                }}
              >
                {active.category}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                {active.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {active.description}
              </p>
              {active.url &&
                (active.url.startsWith("/") ? (
                  <Link
                    href={active.url}
                    className="mt-3 inline-block text-sm text-link"
                  >
                    View all →
                  </Link>
                ) : (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-link"
                  >
                    Visit →
                  </a>
                ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted"
            >
              <p className="font-medium text-foreground">Click a node</p>
              <p className="mt-2">
                Explore how nodes, miners, pools, wallets, and exchanges connect
                in the Qubitcoin ecosystem.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
