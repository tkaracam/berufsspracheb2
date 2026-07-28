import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-14 w-14 items-center justify-center text-[#73beb2] md:h-16 md:w-16">
        <div className="absolute inset-0 rounded-full border-[2.5px] border-current/85" />
        <div className="absolute bottom-[5px] left-[5px] h-3 w-3 rotate-12 rounded-bl-md border-b-[2.5px] border-l-[2.5px] border-current/85" />
        <span className="relative text-[1.7rem] font-medium tracking-tight [font-family:Georgia,serif]">
          B2
        </span>
      </div>
      {!compact ? (
        <div>
          <p className="text-[2.15rem] leading-none text-slate-900 md:text-[2.55rem] [font-family:Georgia,serif]">
            Berufssprache B2
          </p>
          <p className="mt-2 text-[0.72rem] uppercase tracking-[0.38em] text-slate-500 md:text-[0.9rem]">
            Sprache. Kompetenz. Zukunft.
          </p>
        </div>
      ) : null}
    </div>
  );
}
