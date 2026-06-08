"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HardwareVendor, OSType } from "@/lib/mining-types";

export type MiningStep = 1 | 2 | 3 | 4 | 5;

interface MiningState {
  step: MiningStep;
  hardware: HardwareVendor;
  os: OSType;
  minerId: string | null;
  wallet: string;
  worker: string;
  poolHost: string;
  poolPort: number;
  setStep: (step: MiningStep) => void;
  setHardware: (hardware: HardwareVendor) => void;
  setOs: (os: OSType) => void;
  setMinerId: (id: string) => void;
  setWallet: (wallet: string) => void;
  setWorker: (worker: string) => void;
  setPool: (host: string, port: number) => void;
  reset: () => void;
}

const initialState = {
  step: 1 as MiningStep,
  hardware: "unsure" as HardwareVendor,
  os: "windows" as OSType,
  minerId: null as string | null,
  wallet: "",
  worker: "rig1",
  poolHost: "qubitcoin.luckypool.io",
  poolPort: 8610,
};

export const useMiningStore = create<MiningState>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      setHardware: (hardware) => set({ hardware }),
      setOs: (os) => set({ os }),
      setMinerId: (minerId) => set({ minerId }),
      setWallet: (wallet) => set({ wallet }),
      setWorker: (worker) => set({ worker }),
      setPool: (poolHost, poolPort) => set({ poolHost, poolPort }),
      reset: () => set(initialState),
    }),
    { name: "qtc-mining-setup" },
  ),
);
