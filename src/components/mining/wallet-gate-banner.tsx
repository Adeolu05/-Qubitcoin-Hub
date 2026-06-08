import Link from "next/link";

export function WalletGateBanner() {
  return (
    <div className="callout-warn mb-6 px-4 py-3.5">
      <p className="text-sm font-medium">Do you have a bc1 wallet address?</p>
      <p className="mt-1 text-xs opacity-90">
        You need one before mining can pay you. No address means no rewards.
      </p>
      <div className="mt-2 flex flex-wrap gap-3 text-xs">
        <Link href="/academy/wallet-101" className="font-medium underline">
          Wallet 101 lesson
        </Link>
        <Link href="/wallet" className="font-medium underline">
          Wallet options
        </Link>
      </div>
    </div>
  );
}
