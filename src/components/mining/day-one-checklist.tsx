import Link from "next/link";

const STEPS: { label: string; detail: string; href?: string }[] = [
  {
    label: "Download your miner",
    detail: "Use the link from step 4. Place files in one folder.",
  },
  {
    label: "Save and run your config",
    detail: "Double-click start-mining.bat (Windows) or run the .sh script (Linux).",
  },
  {
    label: "Verify shares on the pool dashboard",
    detail: "Search your wallet address on LuckyPool or your chosen pool site.",
  },
  {
    label: "Join official channels for patch alerts",
    detail: "Critical updates are announced on Telegram and X first.",
    href: "/community",
  },
];

export function DayOneChecklist() {
  return (
    <div className="surface-panel mt-6 p-4">
      <h3 className="text-sm font-semibold text-foreground">Day 1 mining checklist</h3>
      <ol className="mt-3 space-y-3">
        {STEPS.map((step, i) => (
          <li key={step.label} className="flex gap-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-muted text-xs font-bold text-accent-foreground">
              {i + 1}
            </span>
            <div>
              {step.href ? (
                <Link href={step.href} className="font-medium text-link">
                  {step.label}
                </Link>
              ) : (
                <p className="font-medium text-foreground">{step.label}</p>
              )}
              <p className="text-xs text-muted">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-muted">
        Stuck? See{" "}
        <Link href="/help/troubleshooting" className="text-link">
          troubleshooting
        </Link>{" "}
        or ask the{" "}
        <Link href="/faq" className="text-link">
          FAQ
        </Link>
        .
      </p>
    </div>
  );
}
