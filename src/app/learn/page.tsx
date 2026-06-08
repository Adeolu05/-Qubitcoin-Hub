import Link from "next/link";
import { learnTopics } from "@/lib/learn-content";

export const metadata = {
  title: "Learn: What is Qubitcoin & qPoW?",
  description:
    "Visual lessons on Qubitcoin, qPoW, tokenomics, and how mining works. Interactive circuit simulator included.",
};

export default function LearnPage() {
  return (
    <div>
      <p className="page-lead">
        New to Qubitcoin? Start here. Short, visual lessons, no physics degree
        required.
      </p>

      <div className="surface-panel mt-6 overflow-hidden">
        {learnTopics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/learn/${topic.slug}`}
            className="surface-row items-start sm:items-center"
          >
            <span className="text-lg opacity-70">{topic.icon}</span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-medium text-foreground">{topic.title}</h2>
              <p className="text-xs text-muted">{topic.subtitle}</p>
            </div>
            <span className="text-[11px] text-muted">{topic.duration}</span>
          </Link>
        ))}
      </div>

      <div className="callout-warn mt-6 px-4 py-3.5">
        <p className="text-sm font-medium">Ready to mine?</p>
        <Link href="/start/mine" className="mt-1 inline-block text-xs text-link">
          Start mining setup →
        </Link>
      </div>
    </div>
  );
}
