import { BitcoinComparison } from "@/components/learn/bitcoin-comparison";
import { LearnCompleteTracker } from "@/components/learn/learn-complete-tracker";
import { NextLesson } from "@/components/learn/next-lesson";

export const metadata = {
  title: "What is Qubitcoin?",
  description:
    "A 60-second intro to Qubitcoin (QTC), qPoW, and how it compares to Bitcoin.",
};

export default function WhatIsQtcPage() {
  return (
    <article className="prose-qtc">
      <LearnCompleteTracker slug="what-is-qtc" />
      <h2>What is Qubitcoin?</h2>
      <p className="lead">
        Imagine Bitcoin, but the &ldquo;work&rdquo; your computer does while
        mining actually <em>means something</em>.
      </p>

      <div className="body-stack">
        <p>
          <strong>Qubitcoin (QTC)</strong> is a cryptocurrency built on a fork of
          Bitcoin Core. It keeps the parts people trust, 21 million coin cap,
          halving every 210,000 blocks, proof-of-work security, but replaces
          the mining puzzle with something new:{" "}
          <strong>Quantum Proof of Work (qPoW)</strong>.
        </p>

        <div className="highlight-box">
          <p>
            <strong>The one-liner:</strong> Your GPU pretends to be a tiny quantum
            computer. That simulation secures the blockchain and helps advance
            quantum science, while you earn QTC.
          </p>
        </div>

        <p>
          Traditional Bitcoin mining burns electricity solving random math puzzles
          that get thrown away. Qubitcoin miners run{" "}
          <strong>16-qubit quantum circuit simulations</strong> on NVIDIA GPUs.
          The results are turned into a hash that secures the network, and every
          simulation contributes to benchmarking quantum computing hardware.
        </p>

        <p>
          Qubitcoin is maintained by{" "}
          <a
            href="https://superquantum.io/qubitcoin"
            target="_blank"
            rel="noopener noreferrer"
          >
            Superquantum
          </a>
          , a non-profit focused on merging blockchain incentives with quantum
          research.
        </p>
      </div>

      <h3>Bitcoin vs Qubitcoin</h3>
      <p className="caption">Same scarcity model. Different kind of work.</p>
      <div className="mt-4">
        <BitcoinComparison />
      </div>

      <NextLesson
        href="/learn/qpow"
        title="What is qPoW?"
        subtitle="See a live quantum circuit simulation"
      />
    </article>
  );
}
