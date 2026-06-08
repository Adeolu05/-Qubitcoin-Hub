import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/academy/lesson-player";
import { getLesson, academyLessons } from "@/lib/academy-content";
import { PageShell } from "@/components/ui/page-shell";

export function generateStaticParams() {
  return academyLessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return {
    title: lesson ? `${lesson.title}, Academy` : "Academy",
    description: lesson?.description,
  };
}

export default async function AcademyLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  return (
    <PageShell narrow>
      <LessonPlayer lesson={lesson} />
    </PageShell>
  );
}
