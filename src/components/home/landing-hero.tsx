"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const partners = [
  { name: "LuckyPool", href: "https://qtc.luckypool.io/", weight: "font-bold" },
  { name: "Superquantum", href: "https://superquantum.io/qubitcoin", weight: "font-semibold" },
  { name: "CoinEx", href: "https://www.coinex.com/en/exchange/QTC-USDT", weight: "font-semibold" },
  { name: "MIT iQuHACK", href: "https://iquhack.mit.edu/", weight: "font-medium" },
] as const;

function usePreferStaticHero() {
  const [preferStatic, setPreferStatic] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)");
    const reducedData = window.matchMedia("(prefers-reduced-data: reduce)");
    const update = () => setPreferStatic(mobile.matches && reducedData.matches);
    update();
    mobile.addEventListener("change", update);
    reducedData.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      reducedData.removeEventListener("change", update);
    };
  }, []);

  return preferStatic;
}

export function LandingHero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const preferStatic = usePreferStaticHero();
  const showVideo = !videoFailed && !preferStatic;

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#050505]">
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.webp"
          aria-label="Decorative background video showing quantum-themed visuals"
          className="absolute inset-0 h-full w-full transform-gpu object-cover"
          onError={() => setVideoFailed(true)}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      ) : (
        <>
          <Image
            src="/hero-poster.webp"
            alt=""
            fill
            priority
            className="object-cover"
            aria-hidden="true"
          />
          <div className="hero-poster-glow absolute inset-0" aria-hidden="true" />
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60 max-md:from-black/5 max-md:via-black/15 max-md:to-black/50" />

      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
        <div className="mb-[100px] flex max-w-[420px] flex-col items-center px-6 text-center">
          <h1 className="font-display text-[40px] font-semibold tracking-tight text-white sm:text-[56px]">
            Mine the quantum future
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#D1D1D1]">
            Learn qPoW, set up your wallet, and start mining QTC, beginner-friendly
            onboarding for the Qubitcoin ecosystem.
          </p>
          <Link
            href="/start"
            className="mt-6 rounded-xl bg-white px-6 py-2.5 text-[13px] font-medium text-black transition hover:bg-zinc-100"
          >
            Get Started
          </Link>
          <a
            href="#scrolly"
            className="mt-4 text-[12px] text-white/50 transition hover:text-white/80"
          >
            Scroll to explore ↓
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 px-6 opacity-70">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[15px] text-white transition hover:opacity-100 ${p.weight}`}
            >
              {p.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
