"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Precomputed orbit positions to avoid sin/cos hydration mismatch between server and client */
const ORBIT_DOTS = [
  { top: "50%", left: "90%" },
  { top: "84.64%", left: "70%" },
  { top: "84.64%", left: "30%" },
  { top: "50%", left: "10%" },
  { top: "15.36%", left: "30%" },
  { top: "15.36%", left: "70%" },
] as const;

const beats = [
  {
    title: "Random puzzles.",
    subtitle:
      "Traditional mining burns energy on SHA-256 guesses that do nothing else.",
  },
  {
    title: "Quantum circuits.",
    subtitle:
      "Qubitcoin replaces the puzzle with 16-qubit simulations, real work on your GPU.",
  },
  {
    title: "Useful work.",
    subtitle:
      "Secure the network, advance quantum science, and earn QTC. All at once.",
  },
];

function PhaseVisual({ phase }: { phase: number }) {
  if (phase === 0) {
    return (
      <div className="grid grid-cols-6 gap-1.5 p-4">
        {Array.from({ length: 36 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex h-3 items-center justify-center rounded bg-white/10 font-mono text-[6px] text-zinc-600"
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: (i * 0.05) % 1.2,
            }}
          >
            {((i * 7919) % 16).toString(16)}
          </motion.div>
        ))}
      </div>
    );
  }

  if (phase === 1) {
    return (
      <svg viewBox="0 0 200 120" className="h-full w-full p-4">
        {Array.from({ length: 8 }).map((_, q) => {
          const y = 15 + q * 13;
          return (
            <g key={q}>
              <line
                x1="10"
                y1={y}
                x2="190"
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              {[30, 70, 110, 150].map((x, gi) => (
                <rect
                  key={`${q}-${gi}`}
                  x={x - 8}
                  y={y - 6}
                  width={16}
                  height={12}
                  rx={2}
                  fill={
                    gi % 3 === 0
                      ? "#7c3aed"
                      : gi % 3 === 1
                        ? "#0891b2"
                        : "transparent"
                  }
                  stroke={gi % 3 === 2 ? "#7c3aed" : "none"}
                  strokeWidth={1}
                  opacity={0.9}
                />
              ))}
            </g>
          );
        })}
      </svg>
    );
  }

  return (
    <div className="flex h-full items-center justify-center p-8">
      <motion.div
        className="relative flex h-32 w-32 items-center justify-center rounded-full bg-black shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/40"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Image
          src="/logo.png"
          alt="Qubitcoin"
          width={80}
          height={80}
          className="h-20 w-20"
        />
        {ORBIT_DOTS.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
            style={{ top: pos.top, left: pos.left }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function BeatText({
  index,
  beat,
  scrollYProgress,
}: {
  index: number;
  beat: (typeof beats)[0];
  scrollYProgress: MotionValue<number>;
}) {
  const start = index * 0.3;
  const end = start + 0.35;
  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [start, start + 0.1, end - 0.1, end],
    [20, 0, 0, -20],
  );

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
        {beat.title}
      </h2>
      <p className="mt-3 text-lg text-zinc-400">{beat.subtitle}</p>
    </motion.div>
  );
}

function BeatVisual({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const phase0 = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const phase1 = useTransform(scrollYProgress, [0.25, 0.45, 0.65], [0, 1, 0]);
  const phase2 = useTransform(scrollYProgress, [0.55, 0.75, 1], [0, 1, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

  return (
    <>
      <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        <motion.div style={{ opacity: phase0 }} className="absolute inset-0">
          <PhaseVisual phase={0} />
        </motion.div>
        <motion.div style={{ opacity: phase1 }} className="absolute inset-0">
          <PhaseVisual phase={1} />
        </motion.div>
        <motion.div style={{ opacity: phase2 }} className="absolute inset-0">
          <PhaseVisual phase={2} />
        </motion.div>
      </div>
      <motion.div
        style={{ opacity: ctaOpacity }}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <Link
          href="/start"
          className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-center text-sm font-semibold text-[#0A0B1E] transition hover:brightness-110"
        >
          Get started
        </Link>
        <Link
          href="/learn/qpow"
          className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-white/5"
        >
          See the circuit
        </Link>
      </motion.div>
    </>
  );
}

export function ScrollyHero() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (reducedMotion) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <p className="mb-4 inline-block rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-1 text-sm text-violet-200">
          Quantum Proof of Work · qPoW
        </p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Mining that advances{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            quantum science
          </span>
        </h1>
        <p className="mt-6 text-lg text-zinc-400">
          Qubitcoin replaces random hash puzzles with useful quantum circuit
          simulation on your GPU.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/start"
            className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-3.5 text-base font-semibold text-[#0A0B1E]"
          >
            Start mining
          </Link>
          <Link
            href="/learn"
            className="rounded-full border border-white/15 px-8 py-3.5 text-base font-medium text-white"
          >
            Learn qPoW
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 sm:h-72">
            <p className="mb-6 inline-block rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs text-violet-200">
              Quantum Proof of Work · qPoW
            </p>
            {beats.map((beat, i) => (
              <BeatText
                key={beat.title}
                index={i}
                beat={beat}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center">
            <BeatVisual scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}
