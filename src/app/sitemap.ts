import type { MetadataRoute } from "next";
import { academyLessons } from "@/lib/academy-content";
import { learnTopics } from "@/lib/learn-content";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://qubitcoin-hub.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/start",
    "/learn",
    "/start/mine",
    "/academy",
    "/ecosystem",
    "/pool",
    "/wallet",
    "/buy",
    "/community",
    "/updates",
    "/faq",
    "/glossary",
    "/search",
    "/help/troubleshooting",
  ];

  const learnPages = learnTopics.map((t) => `/learn/${t.slug}`);
  const academyPages = academyLessons.map((l) => `/academy/${l.slug}`);

  return [...staticPages, ...learnPages, ...academyPages].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/start/mine" ? 0.9 : 0.7,
  }));
}
