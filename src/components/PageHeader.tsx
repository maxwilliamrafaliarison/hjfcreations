import type { ReactNode } from "react";

export default function PageHeader({
  label,
  title,
  watermark,
  children,
}: {
  label: string;
  title: ReactNode;
  watermark?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-linen bg-ivory">
      {watermark && (
        <span className="pointer-events-none absolute right-[-1.5rem] top-1/2 hidden -translate-y-1/2 select-none text-[9rem] font-extrabold uppercase tracking-tighter text-terracotta/[0.06] md:block">
          {watermark}
        </span>
      )}
      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 md:py-20">
        <p className="eyebrow flex items-center gap-3 text-gold-dark">
          <span className="h-0.5 w-10 bg-terracotta" />
          {label}
        </p>
        <h1 className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl">
          {title}
        </h1>
        {children && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-taupe">{children}</p>
        )}
      </div>
    </header>
  );
}
