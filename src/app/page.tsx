import Link from "next/link";
import { LandingHero } from "@/components/home/landing-hero";
import { ScrollyHero } from "@/components/home/scrolly-hero";

export default function HomePage() {
  return (
    <>
      <LandingHero />

      <div id="scrolly" className="bg-[#0a0a0a] text-white">
        <ScrollyHero />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Pick your path",
              body: "Understand, mine, or buy QTC. Guided from step one.",
              href: "/start",
            },
            {
              title: "Understand qPoW",
              body: "Interactive quantum circuit simulator.",
              href: "/learn/qpow",
            },
            {
              title: "Academy",
              body: "Quizzes, XP, and badges.",
              href: "/academy",
            },
            {
              title: "Ecosystem",
              body: "Explore nodes, pools, wallets & more.",
              href: "/ecosystem",
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-border bg-card p-6 transition hover:border-cyan-400/30 hover:bg-accent-muted"
            >
              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-cyan-400">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {card.body}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
