import { AcademyDashboard } from "@/components/academy/academy-dashboard";
import { PageHeader, PageShell } from "@/components/ui/page-shell";

export const metadata = {
  title: "Academy: Learn & Earn XP",
};

export default function AcademyPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Academy" title="Learn, quiz, level up">
        Practical guides and technical explainers with verified links. Earn XP and
        badges as you go.
      </PageHeader>
      <AcademyDashboard />
    </PageShell>
  );
}
