import { cn } from "@/lib/utils";

interface StickyMobileActionProps {
  children: React.ReactNode;
  className?: string;
}

export function StickyMobileAction({ children, className }: StickyMobileActionProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-40 -mx-4 border-t bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none",
        className
      )}
    >
      {children}
    </div>
  );
}
