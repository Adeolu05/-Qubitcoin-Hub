import { academyLessons } from "@/lib/academy-content";
import { learnTopics } from "@/lib/learn-content";
import { faqItems } from "@/lib/faq-content";
import { glossaryTerms } from "@/lib/glossary";
import { TROUBLESHOOTING_TOPICS } from "@/lib/troubleshooting-content";

export interface SearchResult {
  title: string;
  excerpt: string;
  href: string;
  category: string;
}

export function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const topic of learnTopics) {
    results.push({
      title: topic.title,
      excerpt: topic.subtitle,
      href: `/learn/${topic.slug}`,
      category: "Learn",
    });
  }

  for (const lesson of academyLessons) {
    results.push({
      title: lesson.title,
      excerpt: lesson.description,
      href: `/academy/${lesson.slug}`,
      category: "Academy",
    });
  }

  for (const item of faqItems) {
    results.push({
      title: item.question,
      excerpt: item.answer.slice(0, 140),
      href: `/faq#${item.id}`,
      category: "FAQ",
    });
  }

  for (const term of glossaryTerms) {
    results.push({
      title: term.term,
      excerpt: term.simple,
      href: `/glossary#${term.slug}`,
      category: "Glossary",
    });
  }

  for (const topic of TROUBLESHOOTING_TOPICS) {
    results.push({
      title: topic.title,
      excerpt: topic.symptoms.join(". "),
      href: `/help/troubleshooting#${topic.id}`,
      category: "Help",
    });
  }

  results.push(
    {
      title: "Start here: pick your path",
      excerpt: "Understand, mine, or buy QTC",
      href: "/start",
      category: "Onboarding",
    },
    {
      title: "Mining setup wizard",
      excerpt: "5-step guided config",
      href: "/start/mine",
      category: "Onboarding",
    },
    {
      title: "Mining pools",
      excerpt: "LuckyPool, Rplant, Suprnova, Qverse",
      href: "/pool",
      category: "Resources",
    },
    {
      title: "Wallets",
      excerpt: "Official web, Windows Electrum, Qverse",
      href: "/wallet",
      category: "Resources",
    },
    {
      title: "Buy QTC",
      excerpt: "CoinEx, SafeTrade, Exbitron",
      href: "/buy",
      category: "Resources",
    },
  );

  return results;
}

export function searchSite(query: string, limit = 20): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const index = buildSearchIndex();
  return index
    .map((item) => {
      const haystack = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase();
      const wordHits = q.split(/\s+/).filter((w) => haystack.includes(w)).length;
      const score =
        (haystack.includes(q) ? 10 : 0) +
        (item.title.toLowerCase().includes(q) ? 5 : 0) +
        wordHits;
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
