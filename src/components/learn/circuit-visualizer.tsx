"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type GateType = "Ry" | "Rz" | "CNOT";

interface Gate {
  id: string;
  type: GateType;
  qubit: number;
  target?: number;
  column: number;
  angle?: number;
}

const QUBITS = 16;
const LINE_HEIGHT = 22;
const COL_WIDTH = 52;
const PADDING = 24;

const gateHelp: Record<GateType, string> = {
  Ry: "Rotates this qubit around the Y-axis, changes its quantum state.",
  Rz: "Rotates this qubit around the Z-axis, shifts its phase.",
  CNOT: "Entangles two qubits, the control qubit influences the target.",
};

/** Simplified circuit pattern inspired by real qPoW (16-qubit, Ry/Rz/CNOT). */
function buildCircuit(): Gate[] {
  const gates: Gate[] = [];
  let col = 0;

  for (let layer = 0; layer < 4; layer++) {
    for (let q = 0; q < QUBITS; q++) {
      gates.push({
        id: `ry-${layer}-${q}`,
        type: "Ry",
        qubit: q,
        column: col + q % 4,
        angle: ((q + 1) * 37 + layer * 13) % 360,
      });
    }
    col += 4;
    for (let q = 0; q < QUBITS; q += 2) {
      gates.push({
        id: `rz-${layer}-${q}`,
        type: "Rz",
        qubit: q,
        column: col,
        angle: ((q + 3) * 29 + layer * 7) % 360,
      });
    }
    col += 1;
    for (let q = 0; q < QUBITS - 1; q += 3) {
      gates.push({
        id: `cnot-${layer}-${q}`,
        type: "CNOT",
        qubit: q,
        target: q + 1,
        column: col,
      });
    }
    col += 2;
  }

  return gates;
}

function mockHash(): string {
  const chars = "0123456789abcdef";
  return Array.from({ length: 64 }, () =>
    chars[Math.floor(Math.random() * 16)],
  ).join("");
}

export function CircuitVisualizer() {
  const reducedMotion = useReducedMotion();
  const gates = useMemo(() => buildCircuit(), []);
  const maxCol = useMemo(
    () => Math.max(...gates.map((g) => g.column)) + 1,
    [gates],
  );

  const [hoveredGate, setHoveredGate] = useState<string | null>(null);
  const [activeCol, setActiveCol] = useState(-1);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [hash, setHash] = useState<string | null>(null);

  const svgWidth = PADDING * 2 + maxCol * COL_WIDTH + 40;
  const svgHeight = PADDING * 2 + QUBITS * LINE_HEIGHT;

  const runSimulation = useCallback(async () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setHash(null);
    setActiveCol(-1);

    for (let c = 0; c <= maxCol; c++) {
      setActiveCol(c);
      await new Promise((r) =>
        setTimeout(r, reducedMotion ? 30 : 180),
      );
    }

    setHash(mockHash());
    setDone(true);
    setRunning(false);
  }, [running, maxCol, reducedMotion]);

  const hovered = gates.find((g) => g.id === hoveredGate);

  return (
    <div className="surface-panel p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            {QUBITS} qubits · Ry, Rz & CNOT gates · angles from block data
          </p>
        </div>
        <button
          type="button"
          onClick={runSimulation}
          disabled={running}
          className="btn-primary disabled:opacity-50"
        >
          {running ? "Simulating…" : done ? "Run again" : "Run simulation"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-background">
        <svg
          width={svgWidth}
          height={svgHeight}
          className="min-w-full"
          role="img"
          aria-label="16-qubit quantum circuit diagram"
        >
          {/* Qubit lines */}
          {Array.from({ length: QUBITS }).map((_, q) => {
            const y = PADDING + q * LINE_HEIGHT + LINE_HEIGHT / 2;
            return (
              <g key={`qubit-${q}`}>
                <text
                  x={8}
                  y={y + 4}
                  className="fill-zinc-500 text-[9px] font-mono"
                >
                  q{q}
                </text>
                <line
                  x1={PADDING}
                  y1={y}
                  x2={svgWidth - PADDING}
                  y2={y}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={1}
                />
                <AnimatePresence>
                  {activeCol >= 0 && (
                    <motion.circle
                      key={`pulse-${q}-${activeCol}`}
                      cx={PADDING + activeCol * COL_WIDTH}
                      cy={y}
                      r={3}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                      transition={{ duration: reducedMotion ? 0 : 0.3 }}
                      fill="#22d3ee"
                    />
                  )}
                </AnimatePresence>
              </g>
            );
          })}

          {/* CNOT connectors */}
          {gates
            .filter((g) => g.type === "CNOT" && g.target !== undefined)
            .map((g) => {
              const x = PADDING + g.column * COL_WIDTH + COL_WIDTH / 2;
              const y1 = PADDING + g.qubit * LINE_HEIGHT + LINE_HEIGHT / 2;
              const y2 = PADDING + g.target! * LINE_HEIGHT + LINE_HEIGHT / 2;
              const lit =
                activeCol >= g.column ||
                hoveredGate === g.id;
              return (
                <line
                  key={`cnot-line-${g.id}`}
                  x1={x}
                  y1={y1}
                  x2={x}
                  y2={y2}
                  stroke={lit ? "#7c3aed" : "rgba(124,58,237,0.35)"}
                  strokeWidth={lit ? 2 : 1}
                  strokeDasharray={lit ? undefined : "3 3"}
                />
              );
            })}

          {/* Gates */}
          {gates.map((g) => {
            const x = PADDING + g.column * COL_WIDTH + COL_WIDTH / 2;
            const y =
              PADDING + g.qubit * LINE_HEIGHT + LINE_HEIGHT / 2;
            const lit = activeCol >= g.column || hoveredGate === g.id;

            if (g.type === "CNOT" && g.target !== undefined) {
              const ty =
                PADDING + g.target * LINE_HEIGHT + LINE_HEIGHT / 2;
              return (
                <g
                  key={g.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredGate(g.id)}
                  onMouseLeave={() => setHoveredGate(null)}
                  onClick={() =>
                    setHoveredGate((prev) => (prev === g.id ? null : g.id))
                  }
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={7}
                    fill={lit ? "#7c3aed" : "rgba(124,58,237,0.2)"}
                    stroke={lit ? "#a78bfa" : "#7c3aed"}
                    strokeWidth={1.5}
                  />
                  <text x={x} y={y + 3} textAnchor="middle" className="fill-white text-[8px] font-bold">
                    +
                  </text>
                  <circle
                    cx={x}
                    cy={ty}
                    r={7}
                    fill={lit ? "#22d3ee" : "rgba(34,211,238,0.15)"}
                    stroke={lit ? "#67e8f9" : "#22d3ee"}
                    strokeWidth={1.5}
                  />
                  <text x={x} y={ty + 3} textAnchor="middle" className="fill-white text-[8px] font-bold">
                    ×
                  </text>
                </g>
              );
            }

            return (
              <g
                key={g.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredGate(g.id)}
                onMouseLeave={() => setHoveredGate(null)}
                onClick={() =>
                  setHoveredGate((prev) => (prev === g.id ? null : g.id))
                }
              >
                <rect
                  x={x - 14}
                  y={y - 10}
                  width={28}
                  height={20}
                  rx={4}
                  fill={lit ? (g.type === "Ry" ? "#7c3aed" : "#0891b2") : "rgba(255,255,255,0.06)"}
                  stroke={lit ? (g.type === "Ry" ? "#a78bfa" : "#22d3ee") : "rgba(255,255,255,0.15)"}
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  className="fill-white text-[9px] font-mono font-semibold"
                >
                  {g.type}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip */}
      <div className="mt-3 min-h-[3rem] rounded-lg bg-card-hover px-4 py-2.5 text-sm">
        {hovered ? (
          <p className="text-muted">
            <strong className="text-foreground">{hovered.type}</strong>
            {hovered.angle !== undefined && (
              <span> · angle {hovered.angle}°</span>
            )}
            {", "}
            {gateHelp[hovered.type]}
          </p>
        ) : (
          <p className="text-muted">
            Tap or hover a gate to learn what it does. Hit Run simulation to watch
            the circuit execute.
          </p>
        )}
      </div>

      {/* Output */}
      <AnimatePresence>
        {hash && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="callout-info mt-4 p-4"
          >
            <p className="text-xs font-medium">
              Expectation values → 256-bit hash
            </p>
            <p className="mt-2 break-all font-mono text-xs opacity-90">
              {hash}
            </p>
            <p className="mt-2 text-xs opacity-80">
              Your miner repeats this thousands of times per second until the hash
              meets network difficulty, that&apos;s qPoW.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
