import { HalvingCurve } from "@/components/learn/halving-curve";
import { LearnCompleteTracker } from "@/components/learn/learn-complete-tracker";
import { LearnQuizLink } from "@/components/learn/learn-quiz-link";
import Link from "next/link";

export const metadata = {
  title: "Qubitcoin Tokenomics",
  description:
    "21M cap, halving schedule, and epoch rewards. Same scarcity model as Bitcoin.",
};

export default function TokenomicsPage() {
  return (
    <article className="prose-qtc">
      <LearnCompleteTracker slug="tokenomics" />
      <h2>Tokenomics</h2>
      <p className="lead">
        If you understand Bitcoin&apos;s supply curve, you already understand
        Qubitcoin&apos;s.
      </p>

      <div className="mt-6">
        <HalvingCurve />
      </div>

      <div className="body-stack mt-10">
        <p>
          <strong>Hard cap:</strong> 21,000,000 QTC, identical to Bitcoin. No
          pre-mine, no inflation beyond the emission schedule.
        </p>
        <p>
          <strong>Block time:</strong> Targeting ~10 minutes per block, adjusted
          via ASERT difficulty algorithm.
        </p>
        <p>
          <strong>Current epoch:</strong> Epoch 0, 50 QTC per block until block
          210,000. We&apos;re early.
        </p>
      </div>

      <LearnQuizLink learnSlug="tokenomics" />
      <div className="callout-warn mt-10 px-5 py-4">
        <p className="font-medium">You understand the economics. Now mine.</p>
        <p className="mt-1 text-sm opacity-90">
          Set up your wallet and miner in 5 guided steps.
        </p>
        <Link href="/start?path=mine" className="mt-3 inline-block text-sm font-semibold">
          Start mining path →
        </Link>
      </div>
    </article>
  );
}
