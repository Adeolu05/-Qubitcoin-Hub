import { CircuitVisualizer } from "@/components/learn/circuit-visualizer";
import { LearnCompleteTracker } from "@/components/learn/learn-complete-tracker";
import { LearnQuizLink } from "@/components/learn/learn-quiz-link";
import { NextLesson } from "@/components/learn/next-lesson";
import { GlossaryTip } from "@/components/ui/glossary-tip";

export const metadata = {
  title: "What is Quantum Proof of Work (qPoW)?",
  description:
    "Interactive 16-qubit circuit simulator. Learn how qPoW replaces SHA-256 mining with useful quantum work.",
};

export default function QpowPage() {
  return (
    <article className="prose-qtc">
      <LearnCompleteTracker slug="qpow" />
      <h2>What is qPoW?</h2>
      <p className="lead">
        Quantum Proof of Work replaces &ldquo;guess a random number&rdquo; with
        &ldquo;simulate a quantum circuit.&rdquo;
      </p>

      <div className="body-stack">
        <p>
          When you mine Qubitcoin, your GPU doesn&apos;t grind SHA-256 hashes
          endlessly. Instead, it runs a{" "}
          <strong>
            16-<GlossaryTip term="qubit">qubit</GlossaryTip> quantum circuit
          </strong>{" "}
          made of rotation gates (Ry, Rz) and entanglement gates (
          <GlossaryTip term="CNOT">CNOT</GlossaryTip>). The angles for each gate
          come from hashed block data, so every block produces a unique circuit.
        </p>
        <p>
          After the simulation, the quantum state&apos;s{" "}
          <strong>expectation values</strong> are compressed into a 256-bit hash.
          If that hash meets the network&apos;s difficulty target, you&apos;ve
          found a block and earn QTC.
        </p>
      </div>

      <h3>Try it: interactive circuit</h3>
      <p className="caption">
        Hover gates to learn what they do. Hit Run simulation to watch the circuit
        execute.
      </p>
      <div className="mt-4">
        <CircuitVisualizer />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          {
            gate: "Ry",
            name: "Y-rotation",
            desc: "Tilts a qubit's state on the Bloch sphere, like spinning a coin.",
          },
          {
            gate: "Rz",
            name: "Z-rotation",
            desc: "Changes the phase of a qubit without affecting measurement odds.",
          },
          {
            gate: "CNOT",
            name: "Entanglement",
            desc: "Links two qubits, measuring one instantly affects the other.",
          },
        ].map((g) => (
          <div key={g.gate} className="info-card">
            <code>{g.gate}</code>
            <p className="name">{g.name}</p>
            <p>{g.desc}</p>
          </div>
        ))}
      </div>

      <LearnQuizLink learnSlug="qpow" />
      <NextLesson
        href="/learn/how-it-works"
        title="How it works"
        subtitle="Follow the full mining loop from block to reward"
      />
    </article>
  );
}
