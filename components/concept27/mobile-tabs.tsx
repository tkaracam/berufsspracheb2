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
    <div className="mt-5 flex items-end justify-between border-t border-[#efe4d6] pt-3 text-[0.64rem] text-slate-400">
      {items.map((item) => {
        const Icon = iconMap[item.key];
        const isActive = item.key === active;
        return (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1.5 transition-colors",
              isActive ? "text-[#73beb2]" : "text-slate-400"
            )}
          >
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full",
                isActive && "bg-[#eef7f4]"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive && "stroke-[2.2]")} />
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
