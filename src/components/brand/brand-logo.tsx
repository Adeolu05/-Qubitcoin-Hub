import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  compact?: boolean;
};

export function BrandLogo({
  size = 32,
  className,
  showWordmark = false,
  wordmarkClassName,
  compact = false,
}: BrandLogoProps) {
  const radius = compact ? "rounded-[9px]" : "rounded-[11px]";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "shrink-0 overflow-hidden ring-1 ring-border",
          radius,
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt="Qubitcoin"
          width={size}
          height={size}
          className={cn("h-full w-full object-cover", radius)}
          priority={size >= 28}
        />
      </div>
      {showWordmark && (
        <span
          className={cn(
            "nav-brand-wordmark font-display font-bold tracking-tight text-foreground",
            compact ? "text-[15px]" : "text-lg font-semibold",
            wordmarkClassName,
          )}
        >
          Qubitcoin Hub
        </span>
      )}
    </div>
  );
}
