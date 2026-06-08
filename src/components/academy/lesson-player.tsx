"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { LessonResourceList } from "@/components/academy/lesson-resource-list";
import type { AcademyLesson } from "@/lib/academy-content";
import {
  ACADEMY_TO_LEARN,
  getLesson,
  getLessonCta,
  getNextLessonSlug,
} from "@/lib/academy-content";
import { useAcademyStore } from "@/store/academy-store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface LessonPlayerProps {
  lesson: AcademyLesson;
}

export function LessonPlayer({ lesson }: LessonPlayerProps) {
  const reducedMotion = useReducedMotion();
  const completeLesson = useAcademyStore((s) => s.completeLesson);
  const [phase, setPhase] = useState<"learn" | "quiz" | "done">("learn");
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const question = lesson.quiz[qIndex];
  const cta = getLessonCta(lesson.slug);
  const nextSlug = getNextLessonSlug(lesson.slug);
  const nextLesson = nextSlug ? getLesson(nextSlug) : null;
  const deepDiveSlug = ACADEMY_TO_LEARN[lesson.slug];

  function handleAnswer(index: number) {
    if (selected !== null) return;
    setSelected(index);
    setResponses((r) => ({ ...r, [qIndex]: index }));
    setShowExplanation(true);
  }

  function computeScore(resps: Record<number, number>) {
    return lesson.quiz.filter((q, i) => resps[i] === q.correctIndex).length;
  }

  function handleNext() {
    if (qIndex < lesson.quiz.length - 1) {
      setQIndex((i) => i + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      const allResponses = {
        ...responses,
        ...(selected !== null ? { [qIndex]: selected } : {}),
      };
      const score = computeScore(allResponses);
      setFinalScore(score);
      completeLesson(lesson.slug, score, lesson.quiz.length);
      setPhase("done");
      if (!reducedMotion && score >= lesson.quiz.length * 0.6) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      }
    }
  }

  return (
    <div>
      <Link href="/academy" className="text-sm text-link">
        ← Academy
      </Link>

      <h1 className="page-title mt-4">
        {lesson.icon} {lesson.title}
      </h1>
      <p className="page-lead mt-1">{lesson.description}</p>

      <AnimatePresence mode="wait">
        {phase === "learn" && (
          <motion.div
            key="learn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            <div className="space-y-4">
              {lesson.content.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted">
                  {para}
                </p>
              ))}
            </div>
            {deepDiveSlug && (
              <div className="callout-info mt-6 px-4 py-3">
                <p className="text-sm">
                  Want the full visual explainer?{" "}
                  <Link href={`/learn/${deepDiveSlug}`} className="text-link">
                    Read the Learn deep dive →
                  </Link>
                </p>
              </div>
            )}
            {lesson.resources && (
              <LessonResourceList
                resources={lesson.resources}
                title={
                  lesson.category === "practical"
                    ? "Verified links"
                    : "Go deeper"
                }
              />
            )}
            <button
              type="button"
              onClick={() => setPhase("quiz")}
              className="btn-primary mt-6"
            >
              Take the quiz ({lesson.quiz.length} questions)
            </button>
          </motion.div>
        )}

        {phase === "quiz" && question && (
          <motion.div
            key={`quiz-${qIndex}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="mt-6"
          >
            <p className="text-xs text-muted">
              Question {qIndex + 1} of {lesson.quiz.length}
            </p>
            <h2 className="mt-2 text-base font-medium text-foreground">
              {question.question}
            </h2>

            <div className="mt-4 space-y-2">
              {question.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === question.correctIndex;
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={selected !== null}
                    onClick={() => handleAnswer(i)}
                    aria-pressed={isSelected}
                    className={cn(
                      "choice-card w-full text-sm",
                      selected === null
                        ? "text-foreground"
                        : isCorrect
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : isSelected
                            ? "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                            : "opacity-50",
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="callout-info mt-4 px-4 py-3 text-sm"
              >
                {question.explanation}
              </motion.div>
            )}

            {selected !== null && (
              <button type="button" onClick={handleNext} className="btn-primary mt-5">
                {qIndex < lesson.quiz.length - 1
                  ? "Next question"
                  : "See results"}
              </button>
            )}
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl text-[#0a0a0a]">
              ✓
            </div>
            <h2 className="page-title mt-4 text-xl">
              {finalScore >= lesson.quiz.length * 0.6
                ? "Lesson complete!"
                : "Keep practicing!"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Score: {finalScore}/{lesson.quiz.length}, +{lesson.xp} XP available
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {nextLesson && finalScore >= lesson.quiz.length * 0.6 && (
                <Link
                  href={`/academy/${nextLesson.slug}`}
                  className="btn-primary"
                >
                  Up next: {nextLesson.title} →
                </Link>
              )}
              <Link href={cta.href} className="btn-secondary">
                {cta.label}
              </Link>
              <Link href="/academy" className="btn-secondary">
                Academy home
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
