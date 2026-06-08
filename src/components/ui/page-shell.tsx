import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
};

export function PageShell({
  children,
  className,
  narrow = false,
}: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 py-8 sm:px-6 sm:py-10",
        narrow ? "max-w-2xl" : "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className="mb-8 border-b border-border pb-6">
      <p className="page-eyebrow">{eyebrow}</p>
      <h1 className="page-title mt-1.5">{title}</h1>
      {children && <div className="page-lead mt-3 max-w-xl">{children}</div>}
    </header>
  );
}
