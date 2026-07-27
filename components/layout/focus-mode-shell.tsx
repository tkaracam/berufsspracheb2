"use client";

import { cn } from "@/lib/utils";
import { useFocusMode } from "./focus-mode-provider";

interface FocusModeShellProps {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}

export function FocusModeShell({ children, className, padded = true }: FocusModeShellProps) {
  const { focusMode } = useFocusMode();
  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-300",
        padded && !focusMode && "lg:pl-64",
        className
      )}
    >
      {children}
    </div>
  );
}
