import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
        <div className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,#eef6ef_0%,#f9efe4_100%)]" />
        <div className="absolute left-[8px] top-[11px] h-7 w-4 rounded-[999px_999px_999px_999px] bg-[#6f9f88] rotate-[-28deg] md:left-[10px] md:top-[13px]" />
        <div className="absolute right-[8px] top-[11px] h-7 w-4 rounded-[999px_999px_999px_999px] bg-[#4f8b73] rotate-[28deg] md:right-[10px] md:top-[13px]" />
        <div className="absolute inset-[6px] rounded-full border border-[#dbe6db]/80" />
      </div>
      {!compact ? (
        <div>
          <p className="text-[2.15rem] leading-none text-slate-900 md:text-[2.55rem] [font-family:Georgia,serif]">
            Berufssprache B2
          </p>
          <p className="mt-1.5 text-[0.72rem] text-slate-500 md:text-[0.92rem]">
            Deutsch für den Beruf. Sicher. Klar. Kompetent.
          </p>
        </div>
      ) : null}
    </div>
  );
}
