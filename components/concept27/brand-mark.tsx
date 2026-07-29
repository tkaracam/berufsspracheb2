import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20" />
        <div className="absolute inset-1 rounded-xl bg-white/20" />
        <div className="relative text-primary-foreground">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
          </svg>
        </div>
      </div>
      {!compact ? (
        <div>
          <p className="text-[1.8rem] leading-none text-foreground md:text-[2.1rem] font-heading font-extrabold tracking-tight">
            Berufssprache B2
          </p>
          <p className="mt-1.5 text-[0.75rem] font-medium text-muted-foreground md:text-[0.85rem]">
            Deutsch für den Beruf. Sicher. Klar. Kompetent.
          </p>
        </div>
      ) : null}
    </div>
  );
}
