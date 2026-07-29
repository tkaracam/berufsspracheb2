import Link from "next/link";
import { Briefcase, LayoutGrid, Home, UserRound, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  home: Home,
  lernen: LayoutGrid,
  berufsfelder: Briefcase,
  trainer: MessageCircle,
  profil: UserRound,
};

interface TabItem {
  key: keyof typeof iconMap;
  href: string;
  label: string;
}

interface MobileTabsProps {
  active: TabItem["key"];
}

export function MobileTabs({ active }: MobileTabsProps) {
  const items: TabItem[] = [
    { key: "home", href: "/", label: "Start" },
    { key: "lernen", href: "/dashboard", label: "Lernen" },
    { key: "berufsfelder", href: "/berufsfelder", label: "Berufsfelder" },
    { key: "trainer", href: "/trainer", label: "Trainer" },
    { key: "profil", href: "/profil", label: "Profil" },
  ];

  return (
    <div className="mt-6 flex items-end justify-between border-t border-border pt-4 text-[0.65rem] font-semibold text-muted-foreground">
      {items.map((item) => {
        const Icon = iconMap[item.key];
        const isActive = item.key === active;
        return (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1.5 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-xl transition-colors",
                isActive && "bg-primary/10"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive && "stroke-[2.5]")} />
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
