import Link from "next/link";
import { LEARN_TO_ACADEMY } from "@/lib/academy-content";

interface LearnQuizLinkProps {
  learnSlug: string;
}

export function LearnQuizLink({ learnSlug }: LearnQuizLinkProps) {
  const academySlug = LEARN_TO_ACADEMY[learnSlug];
  if (!academySlug) return null;

  return (
    <div className="callout-info mt-8 px-4 py-3.5">
      <p className="text-sm font-medium">Ready to test yourself?</p>
      <Link
        href={`/academy/${academySlug}`}
        className="mt-1 inline-block text-sm text-link"
      >
        Take the Academy quiz →
      </Link>
    </div>
  );
}
