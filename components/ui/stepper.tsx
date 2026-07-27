import { cn } from "@/lib/utils";

interface StepperProps {
  steps: string[];
  current?: number;
  className?: string;
}

export function Stepper({ steps, current = 0, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center">
        {steps.map((label, index) => {
          const isActive = index === current;
          const isCompleted = index < current;
          const isLast = index === steps.length - 1;

          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ring-2 transition-colors",
                    isActive && "bg-primary text-primary-foreground ring-primary",
                    isCompleted && "bg-primary/80 text-primary-foreground ring-primary/80",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground ring-border"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium leading-tight hidden sm:block",
                    isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "mx-1 h-0.5 flex-1 rounded-full transition-colors",
                    index < current ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
