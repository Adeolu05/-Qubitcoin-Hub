import { sanityClient } from "@/lib/sanity";
import { academyLessons, type AcademyLesson } from "@/lib/academy-content";
import { glossaryTerms, type GlossaryTerm } from "@/lib/glossary";
import { faqCategories } from "@/lib/faq-content";
import { NETWORK_UPDATES, CURRENT_STATUS } from "@/lib/network-updates";

/** Fetch academy lessons from Sanity with static fallback */
export async function getAcademyLessons(): Promise<AcademyLesson[]> {
  try {
    const remote = await sanityClient.fetch<AcademyLesson[]>(
      `*[_type == "academyLesson"] | order(title asc)`,
    );
    if (remote?.length) return remote;
  } catch {
    /* use fallback */
  }
  return academyLessons;
}

export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  try {
    const remote = await sanityClient.fetch<GlossaryTerm[]>(
      `*[_type == "glossaryTerm"] | order(term asc)`,
    );
    if (remote?.length) return remote;
  } catch {
    /* use fallback */
  }
  return glossaryTerms;
}

export async function getFaqCategories() {
  try {
    const remote = await sanityClient.fetch<typeof faqCategories>(
      `*[_type == "faqCategory"]{ title, id, items }`,
    );
    if (remote?.length) return remote;
  } catch {
    /* use fallback */
  }
  return faqCategories;
}

export async function getNetworkUpdates() {
  try {
    const remote = await sanityClient.fetch<typeof NETWORK_UPDATES>(
      `*[_type == "networkUpdate"] | order(date desc)`,
    );
    if (remote?.length) return remote;
  } catch {
    /* use fallback */
  }
  return NETWORK_UPDATES;
}

export async function getCurrentStatus() {
  try {
    const remote = await sanityClient.fetch<typeof CURRENT_STATUS>(
      `*[_type == "currentStatus"][0]`,
    );
    if (remote) return remote;
  } catch {
    /* use fallback */
  }
  return CURRENT_STATUS;
}
