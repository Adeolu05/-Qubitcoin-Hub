"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  explainConfigLine,
  getRecommendedMiner,
  renderMinerConfig,
  validateWalletAddress,
} from "@/lib/mining-data";
import type { MiningSetupData } from "@/lib/mining-types";
import { useMiningStore } from "@/store/mining-store";
import { StuckHelp } from "@/components/ui/stuck-help";
import { WalletOptions } from "@/components/mining/wallet-options";
import { WalletGateBanner } from "@/components/mining/wallet-gate-banner";
import { DayOneChecklist } from "@/components/mining/day-one-checklist";
import { WALLET_URLS } from "@/lib/wallet-urls";
import { GlossaryTip } from "@/components/ui/glossary-tip";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const STEPS = [
  "Your hardware",
  "Pick a miner",
  "Wallet & worker",
  "Your config",
  "You're mining!",
] as const;

interface MiningWizardProps {
  data: MiningSetupData;
}

export function MiningWizard({ data }: MiningWizardProps) {
  const reducedMotion = useReducedMotion();
  const {
    step,
    hardware,
    os,
    minerId,
    wallet,
    worker,
    poolHost,
    poolPort,
    setStep,
    setHardware,
    setOs,
    setMinerId,
    setWallet,
    setWorker,
    setPool,
  } = useMiningStore();

  const { config, miners } = data;

  useEffect(() => {
    setPool(config.defaultPoolHost, config.defaultPoolPort);
  }, [config.defaultPoolHost, config.defaultPoolPort, setPool]);

  const selectedMiner = useMemo(
    () => miners.find((m) => m._id === minerId) ?? null,
    [miners, minerId],
  );

  const recommendedMiner = useMemo(
    () => getRecommendedMiner(miners, hardware),
    [miners, hardware],
  );

  useEffect(() => {
    if (!minerId && recommendedMiner) {
      setMinerId(recommendedMiner._id);
    }
  }, [minerId, recommendedMiner, setMinerId]);

  const walletValid = validateWalletAddress(wallet, config.walletAddressRegex);
  const configText = selectedMiner
    ? renderMinerConfig(
        os === "windows"
          ? selectedMiner.windowsBatTemplate
          : selectedMiner.linuxShTemplate,
        { wallet: wallet || "YOUR_WALLET", worker, poolHost, poolPort },
      )
    : "";

  const configLines = configText.split("\n");

  function fireConfetti() {
    if (reducedMotion) return;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#7C3AED", "#22D3EE", "#FBBF24"],
    });
  }

  function goNext() {
    trackEvent("wizard_step_complete", { step });
    if (step < 5) setStep((step + 1) as typeof step);
    if (step === 4) fireConfetti();
  }

  function goBack() {
    if (step > 1) setStep((step - 1) as typeof step);
  }

  async function copyConfig() {
    await navigator.clipboard.writeText(configText);
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-3 flex justify-between text-xs text-muted">
          <span>
            Step {step} of {STEPS.length}
          </span>
          <span>{STEPS[step - 1]}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${(step / STEPS.length) * 100}%` }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
          />
        </div>
        <div className="mt-4 hidden gap-2 sm:flex">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={cn(
                "rounded-full px-3 py-1 text-xs",
                i + 1 === step
                  ? "bg-accent-muted font-medium text-accent-foreground"
                  : i + 1 < step
                    ? "text-muted"
                    : "text-muted/50",
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="wizard-panel"
        >
          {step === 1 && (
            <>
              <WalletGateBanner />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                What GPU do you have?
              </h2>
              <p className="mt-2 text-muted">
                Qubitcoin mining uses your graphics card to run quantum circuit
                simulations. Pick what matches your setup.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["nvidia", "NVIDIA (RTX)", "Best supported (recommended)"],
                    ["amd", "AMD", "Use WildRig Multi"],
                    ["cpu", "CPU only", "Slower, but possible"],
                    ["unsure", "Not sure", "We'll pick a safe default"],
                  ] as const
                ).map(([value, label, hint]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setHardware(value)}
                    className={cn(
                      "choice-card",
                      hardware === value && "choice-card-selected",
                    )}
                  >
                    <div className="font-medium text-foreground">{label}</div>
                    <div className="mt-1 text-sm text-muted">{hint}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <p className="mb-2 text-sm text-muted">Your operating system</p>
                <div className="flex flex-wrap gap-3">
                  {(["windows", "linux"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setOs(value)}
                      className={cn(
                        "rounded-lg border px-4 py-2 text-sm capitalize transition",
                        os === value
                          ? "choice-card-selected"
                          : "border-border text-muted hover:border-accent/30",
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted">
                  macOS is not supported natively. Use Windows, Linux, or a Linux VM
                  on Mac hardware.
                </p>
              </div>

              <StuckHelp>
                <p>
                  Open Task Manager (Windows) or run{" "}
                  <code className="text-accent-foreground">lspci | grep VGA</code>{" "}
                  (Linux). Look for NVIDIA GeForce/RTX or AMD Radeon. Qubitcoin
                  qPoW works best on NVIDIA GPUs with recent drivers.
                </p>
              </StuckHelp>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Choose your mining software
              </h2>
              <p className="mt-2 text-muted">
                We recommend{" "}
                <strong className="text-foreground">
                  {recommendedMiner?.name ?? "a miner"}
                </strong>{" "}
                for your hardware. All use the verified{" "}
                <code className="text-accent-foreground">{config.algorithm}</code>{" "}
                algorithm.
              </p>

              <div className="mt-6 space-y-3">
                {miners.map((miner) => (
                  <button
                    key={miner._id}
                    type="button"
                    onClick={() => setMinerId(miner._id)}
                    className={cn(
                      "choice-card w-full",
                      minerId === miner._id && "choice-card-selected",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground">{miner.name}</span>
                      <div className="flex gap-2">
                        {miner.recommended && (
                          <span className="badge-pill badge-recommended">
                            Recommended
                          </span>
                        )}
                        <span className="text-xs text-muted">
                          {miner.devFee} fee
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      Best for {miner.vendor} ·{" "}
                      <a
                        href={miner.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {miner.downloadLabel}
                      </a>
                    </p>
                  </button>
                ))}
              </div>

              {selectedMiner && (
                <StuckHelp>{selectedMiner.stuckHelp}</StuckHelp>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Your wallet & worker name
              </h2>
              <p className="mt-2 text-muted">
                You need a QTC wallet address to receive mined coins. Pick a
                wallet option below, then paste your address here.
              </p>

              <WalletOptions />

              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="wallet"
                    className="form-label"
                  >
                    Wallet address
                  </label>
                  <input
                    id="wallet"
                    type="text"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder="bc1q..."
                    className="form-input font-mono"
                  />
                  <p className="mt-1.5 text-xs text-muted">
                    {config.walletAddressHint}
                  </p>
                  {wallet && !walletValid && (
                    <p className="mt-1 text-xs text-rose-400">
                      That doesn&apos;t look like a valid QTC address yet.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="worker"
                    className="form-label"
                  >
                    <GlossaryTip term="worker">Worker</GlossaryTip> name
                  </label>
                  <input
                    id="worker"
                    type="text"
                    value={worker}
                    onChange={(e) => setWorker(e.target.value)}
                    placeholder="rig1"
                    className="form-input"
                  />
                  <p className="mt-1.5 text-xs text-muted">
                    A label for this machine, helps you track rigs on the pool
                    dashboard.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="poolHost"
                      className="form-label"
                    >
                      <GlossaryTip term="pool">Pool</GlossaryTip> server
                    </label>
                    <select
                      id="poolHost"
                      value={poolHost}
                      onChange={(e) => setPool(e.target.value, poolPort)}
                      className="form-input"
                    >
                      {config.poolServers.map((s) => (
                        <option key={s.host} value={s.host}>
                          {s.region}, {s.host}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="poolPort"
                      className="form-label"
                    >
                      Pool port
                    </label>
                    <select
                      id="poolPort"
                      value={poolPort}
                      onChange={(e) =>
                        setPool(poolHost, Number(e.target.value))
                      }
                      className="form-input"
                    >
                      {(config.poolServers.find((s) => s.host === poolHost)
                        ?.ports ?? [8610, 8611]).map((port) => (
                        <option key={port} value={port}>
                          {port}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <StuckHelp>
                <p>
                  <strong className="text-foreground">Fastest path:</strong> use the{" "}
                  <a
                    href={WALLET_URLS.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:underline"
                  >
                    browser wallet
                  </a>
                  , generate a SegWit address, and copy it here. For Windows,
                  download via the button above or from the{" "}
                  <a
                    href={WALLET_URLS.downloadsPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:underline"
                  >
                    official downloads page
                  </a>
                  . Your address should start with{" "}
                  <code className="text-accent-foreground">bc1</code>. Source code:{" "}
                  <a
                    href={WALLET_URLS.sourceRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:underline"
                  >
                    qubitcoin-electrum on GitHub
                  </a>
                  .
                </p>
              </StuckHelp>
            </>
          )}

          {step === 4 && selectedMiner && (
            <>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Your mining config
              </h2>
              <p className="mt-2 text-muted">
                Save this as{" "}
                <code className="text-accent-foreground">
                  {os === "windows" ? "start-mining.bat" : "start-mining.sh"}
                </code>
                , place it in your miner folder, and double-click to run.
              </p>

              <div className="surface-panel mt-6 overflow-hidden">
                {configLines.map((line, i) => {
                  const explanation = explainConfigLine(
                    line,
                    selectedMiner.configLineHelp,
                  );
                  return (
                    <div
                      key={`${line}-${i}`}
                      className="border-b border-border last:border-0"
                    >
                      <pre className="overflow-x-auto bg-background px-4 py-2 font-mono text-sm text-accent-foreground">
                        {line || " "}
                      </pre>
                      {explanation && (
                        <p className="bg-card-hover px-4 py-2 text-xs text-muted">
                          → {explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={copyConfig}
                className="btn-primary mt-4 w-full py-3"
              >
                Copy to clipboard
              </button>

              <p className="mt-4 text-xs text-muted">
                Verified against{" "}
                <a
                  href={config.verifiedSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:underline"
                >
                  {config.verifiedSource}
                </a>
                {config.lastVerified && ` · Last checked ${config.lastVerified}`}
              </p>

              <StuckHelp>{selectedMiner.stuckHelp}</StuckHelp>
            </>
          )}

          {step === 5 && (
            <>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl text-[#0a0a0a]">
                  ✓
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  You&apos;re ready to mine Qubitcoin!
                </h2>
                <p className="mt-2 text-muted">
                  Your GPU is about to do something useful, simulating quantum
                  circuits while securing the network and earning QTC.
                </p>
              </div>

              <DayOneChecklist />

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={selectedMiner?.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 py-3 text-center"
                >
                  Download {selectedMiner?.name}
                </a>
                <a
                  href="/learn"
                  className="btn-secondary flex-1 py-3 text-center"
                >
                  Learn about qPoW
                </a>
              </div>
            </>
          )}

          {/* Nav buttons */}
          {step < 5 && (
            <div className="mt-8 flex justify-between gap-4">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="btn-secondary disabled:opacity-30"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={step === 3 && (!walletValid || !worker.trim())}
                className="btn-primary disabled:opacity-40"
              >
                {step === 4 ? "Finish" : "Continue"}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
