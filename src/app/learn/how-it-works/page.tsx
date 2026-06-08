import { MiningLoop } from "@/components/learn/mining-loop";
import { LearnCompleteTracker } from "@/components/learn/learn-complete-tracker";
import { NextLesson } from "@/components/learn/next-lesson";
import { GlossaryTip } from "@/components/ui/glossary-tip";

export const metadata = {
  title: "How Qubitcoin Works",
  description:
    "Follow the full mining loop from block data to GPU simulation and QTC rewards.",
};

export default function HowItWorksPage() {
  return (
    <article className="prose-qtc">
      <LearnCompleteTracker slug="how-it-works" />
      <h2>How it works</h2>
      <p className="lead">
        From block data to coins in your wallet, the full loop in plain language.
      </p>

      <div className="mt-6">
        <MiningLoop />
      </div>

      <div className="body-stack mt-10">
        <section>
          <h3>1. Block data becomes a circuit</h3>
          <p>
            Every mining attempt starts with the current block header. It gets
            hashed, and that hash determines the rotation angles and gate layout
            for a 16-qubit circuit. No two blocks produce the same circuit.
          </p>
        </section>

        <section>
          <h3>2. Your GPU runs the simulation</h3>
          <p>
            Qubitcoin uses NVIDIA&apos;s <strong>cuQuantum / cuStateVec</strong>{" "}
            libraries to execute the circuit on your graphics card. This is real
            GPU-accelerated quantum state simulation, not a metaphor. Miners can
            also plug in custom solvers (Bring Your Own Solver).
          </p>
        </section>

        <section>
          <h3>3. Hash, check, repeat</h3>
          <p>
            The simulation output is normalized to fixed-point values and hashed
            with SHA-256 and SHA3. If the result is below the difficulty target,
            the miner broadcasts a new block. If not, they tweak the nonce and try
            again, millions of times per second.
          </p>
        </section>

        <section>
          <h3>4. Difficulty adjusts automatically</h3>
          <p>
            Qubitcoin uses <strong><GlossaryTip term="ASERT">ASERT</GlossaryTip></strong> (Absolutely Scheduled
            Exponentially Rising Targets) to keep block times stable as hashrate
            changes, similar in spirit to Bitcoin&apos;s difficulty adjustment,
            but tuned for qPoW.
          </p>
        </section>
      </div>

      <NextLesson
        href="/learn/why-it-matters"
        title="Why it matters"
        subtitle="Useful work vs wasted energy"
      />
    </article>
  );
}
