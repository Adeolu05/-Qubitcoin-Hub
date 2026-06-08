import Link from "next/link";

interface NextLessonProps {
  href: string;
  title: string;
  subtitle: string;
}

export function NextLesson({ href, title, subtitle }: NextLessonProps) {
  return (
    <Link href={href} className="next-lesson-card">
      <div>
        <p className="text-xs font-medium text-accent-foreground">Up next</p>
        <p className="mt-1 font-display text-sm font-semibold text-foreground">
          {title}
        </p>
        <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
      </div>
      <span className="text-accent-foreground">→</span>
    </Link>
  );
}
