import { LearnCompleteTracker } from "@/components/learn/learn-complete-tracker";
import { LearnQuizLink } from "@/components/learn/learn-quiz-link";
import { NextLesson } from "@/components/learn/next-lesson";
import { YoutubeEmbed } from "@/components/media/youtube-embed";

export const metadata = {
  title: "Why Qubitcoin Matters",
  description:
    "Useful work vs wasted energy, BYOS, and why qPoW mining advances quantum science.",
};

export default function WhyItMattersPage() {
  return (
    <article className="prose-qtc">
      <LearnCompleteTracker slug="why-it-matters" />
      <h2>Why it matters</h2>
      <p className="lead">
        Bitcoin proved that financial incentives can drive hardware revolutions.
        Qubitcoin asks: what if that same energy advanced science?
      </p>

      <div className="mt-8 grid gap-3">
        {[
          {
            title: "Useful work, not wasted heat",
            body: "Bitcoin mining consumes enormous energy solving puzzles with no output beyond security. qPoW mining produces quantum simulation data that researchers can use to compare GPUs, optimize algorithms, and push toward real quantum hardware.",
          },
          {
            title: "A standardized benchmark",
            body: "Every miner runs the same class of 16-qubit circuits. That creates a competitive leaderboard for quantum simulators, which GPU is fastest? Which solver is most efficient? The mining race becomes a science race.",
          },
          {
            title: "Open to innovation",
            body: "The Bring Your Own Solver (BYOS) model means researchers and developers can plug in custom GPU kernels, CPU fallbacks, or even real quantum processors. The network doesn't care how you solve the circuit, only that you solve it correctly.",
          },
          {
            title: "Same trust model as Bitcoin",
            body: "You don't need to understand quantum physics to trust the network. Proof-of-work still means miners compete, blocks are verified, and the chain with the most work wins. The quantum part is the work itself.",
          },
        ].map((item) => (
          <div key={item.title} className="info-card">
            <h3 className="!mt-0 text-base">{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>

      <div className="highlight-box mt-8">
        <p className="font-medium">The vision</p>
        <p className="mt-2">
          Combine blockchain&apos;s incentive engine with quantum computing&apos;s
          frontier. Miners earn coins. Science gets data. Hardware gets better.
          Everyone who participates pushes both industries forward.
        </p>
      </div>

      <YoutubeEmbed
        videoId="Fj1Z8qANEoU"
        title="Qubitcoin founder interview on YouTube"
      />

      <LearnQuizLink learnSlug="why-it-matters" />
      <NextLesson
        href="/learn/tokenomics"
        title="Tokenomics"
        subtitle="21M cap and the halving schedule"
      />
    </article>
  );
}
