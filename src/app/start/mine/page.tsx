import { MiningWizard } from "@/components/mining/mining-wizard";
import { PageShell } from "@/components/ui/page-shell";
import { getMiningSetupData } from "@/lib/mining-data";

export const revalidate = 3600;

export const metadata = {
  title: "Start Mining Qubitcoin: Guided Setup",
  description:
    "Step-by-step Qubitcoin mining setup. Pick your hardware, get a verified config, and start earning QTC.",
};

export default async function StartMiningPage() {
  const data = await getMiningSetupData();

  return (
    <PageShell>
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="page-eyebrow">Guided onboarding</p>
        <h1 className="page-title mt-1">Start mining Qubitcoin</h1>
        <p className="page-lead mt-2">
          Five simple steps. We&apos;ll generate a ready-to-run config verified
          against{" "}
          <a
            href={data.config.verifiedSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            official pool docs
          </a>
          .
        </p>
      </div>

      <MiningWizard data={data} />
    </PageShell>
  );
}
