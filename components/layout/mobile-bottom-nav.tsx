"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/components/layout/language-provider";
import { useFocusMode } from "./focus-mode-provider";
import { getMobileNavItems } from "@/lib/nav-items";
import type { Database } from "@/types/database";

type Role = Database["public"]["Enums"]["app_role"];

interface MobileBottomNavProps {
  role: Role;
}

export function MobileBottomNav({ role }: MobileBottomNavProps) {
  const pathname = usePathname();
  const items = getMobileNavItems(role);
  const t = useTranslation();
  const { focusMode } = useFocusMode();

  if (focusMode) return null;

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 rounded-t-2xl border-t border-border/40 bg-background/95 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/80"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const Icon = item.icon;
          const label = t.nav[item.labelKey];
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 py-2.5 min-h-[3.75rem] text-xs font-medium transition-colors active:scale-95",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <span className="absolute top-1.5 h-1 w-5 rounded-full bg-primary" />
                )}
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                    isActive ? "bg-primary/10" : "bg-transparent"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="truncate max-w-[4.5rem]">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
