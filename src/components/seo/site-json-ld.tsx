import { academyLessons } from "@/lib/academy-content";
import { faqItems } from "@/lib/faq-content";

export function SiteJsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://qubitcoin-hub.vercel.app";

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Qubitcoin Academy",
    description: "Beginner quizzes and practical lessons for Qubitcoin onboarding.",
    provider: {
      "@type": "Organization",
      name: "Qubitcoin Hub",
      url: siteUrl,
    },
    hasCourseInstance: academyLessons.map((l) => ({
      "@type": "CourseInstance",
      name: l.title,
      description: l.description,
      url: `${siteUrl}/academy/${l.slug}`,
    })),
  };

  const faqEntries = faqItems;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.slice(0, 12).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to start mining Qubitcoin",
    description: "Wallet-first guided setup for QTC mining.",
    step: [
      {
        "@type": "HowToStep",
        name: "Get a wallet",
        text: "Create a bc1 address using the official browser wallet or Electrum.",
        url: `${siteUrl}/academy/wallet-101`,
      },
      {
        "@type": "HowToStep",
        name: "Choose hardware and miner",
        text: "Pick your GPU and mining software in the setup wizard.",
        url: `${siteUrl}/start/mine`,
      },
      {
        "@type": "HowToStep",
        name: "Run your config",
        text: "Copy the generated config and start mining on a verified pool.",
        url: `${siteUrl}/pool`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
