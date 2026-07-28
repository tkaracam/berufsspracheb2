import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-14 w-14 items-center justify-center text-[#73beb2]">
        <div className="absolute inset-0 rounded-full border-2 border-current/80" />
        <div className="absolute left-1 bottom-1 h-3 w-3 rotate-12 border-b-2 border-l-2 border-current/80 rounded-bl-sm" />
        <span className="relative text-[1.7rem] font-medium tracking-tight [font-family:Georgia,serif]">
          B2
        </span>
      </div>
      {!compact ? (
        <div>
          <p className="text-[2.15rem] leading-none text-slate-900 [font-family:Georgia,serif]">
            Berufssprache B2
          </p>
          <p className="mt-2 text-[0.82rem] uppercase tracking-[0.42em] text-slate-500">
            Sprache. Kompetenz. Zukunft.
          </p>
        </div>
      ) : null}
    </div>
  );
}
