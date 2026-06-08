import Link from "next/link";
import { CommunityLinkSections } from "@/components/community/community-link-sections";
import { PageHeader, PageShell } from "@/components/ui/page-shell";

export const metadata = {
  title: "Community & official links",
  description:
    "Official Qubitcoin channels, research, explorer, regional groups, and safety guidance.",
};

export default function CommunityPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Community" title="Official links & channels">
        Curated from official Telegram pins. For patch history see{" "}
        <Link href="/updates" className="text-link">
          network updates
        </Link>
        .
      </PageHeader>

      <CommunityLinkSections />

      <p className="mt-8 text-xs text-muted">
        Team AMA answers:{" "}
        <Link href="/faq#from-team" className="text-link">
          FAQ
        </Link>{" "}
        ·{" "}
        <Link href="/academy/team-answers" className="text-link">
          Academy
        </Link>
      </p>
    </PageShell>
  );
}
