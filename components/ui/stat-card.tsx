import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  trend?: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "accent";
}

const variantMap = {
  default: "bg-card",
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
};

const iconVariantMap = {
  default: "bg-primary/10 text-primary",
  primary: "bg-white/20 text-white",
  accent: "bg-white/30 text-accent-foreground",
};

export function StatCard({
  label,
  value,
  icon,
  trend,
  className,
  variant = "default",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-2xl p-5 shadow-sm ring-1 ring-border transition-all hover:shadow-md",
        variantMap[variant],
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              variant === "default" ? "text-muted-foreground" : "opacity-90"
            )}
          >
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {value}
          </p>
        </div>
        {icon ? (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              iconVariantMap[variant]
            )}
          >
            {icon}
          </div>
        ) : null}
      </div>
      {trend ? (
        <div
          className={cn(
            "mt-4 text-xs font-medium",
            variant === "default" ? "text-muted-foreground" : "opacity-90"
          )}
        >
          {trend}
        </div>
      ) : null}
    </div>
  );
}
