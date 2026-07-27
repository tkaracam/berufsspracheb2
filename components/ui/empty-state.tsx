import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn("overflow-hidden border-t-4 border-t-slate-300 text-center", className)}>
      <CardContent className="space-y-4 py-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          {description && (
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action && <div className="pt-1">{action}</div>}
      </CardContent>
    </Card>
  );
}
