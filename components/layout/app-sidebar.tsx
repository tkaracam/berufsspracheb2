"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, LogOut, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { useTranslation } from "@/components/layout/language-provider";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useFocusMode } from "./focus-mode-provider";
import { getNavItems, getMobileNavItems, type NavItem } from "@/lib/nav-items";
import type { Database } from "@/types/database";

type Role = Database["public"]["Enums"]["app_role"];

interface SidebarContentProps {
  items: NavItem[];
  userName: string;
  userEmail: string;
}

function SidebarContent({ items, userName, userEmail }: SidebarContentProps) {
  const pathname = usePathname();
  const t = useTranslation();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between gap-2 border-b border-border px-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="truncate text-lg font-extrabold tracking-tight">{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
        </div>
      </div>

      <nav className="flex-1 overflow-auto px-3 py-5">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const label = t.nav[item.labelKey];
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                        : "bg-muted group-hover:bg-background"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  {label}
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold text-sm text-foreground">
            {userName.slice(0, 2).toUpperCase() || <User className="h-5 w-5" />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
        </div>
        <form action="/api/auth/logout" method="POST">
          <Button type="submit" variant="outline" className="w-full justify-start rounded-xl" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            {t.nav.logout}
          </Button>
        </form>
      </div>
    </div>
  );
}

interface MobileSidebarContentProps extends SidebarContentProps {
  role: Role;
}

function MobileSidebarContent({ items, userName, userEmail }: MobileSidebarContentProps) {
  const pathname = usePathname();
  const t = useTranslation();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex h-full flex-col">
      <SheetHeader className="border-b border-border p-5">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-bold">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20">
            <Briefcase className="h-5 w-5" />
          </div>
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-3 pt-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold text-sm text-foreground">
            {userName.slice(0, 2).toUpperCase() || <User className="h-5 w-5" />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
        </div>
      </SheetHeader>

      <nav className="flex-1 overflow-auto px-3 py-5">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const label = t.nav[item.labelKey];
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                      active
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                        : "bg-muted group-hover:bg-background"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                  </div>
                  <span className="truncate">{label}</span>
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <SheetFooter className="border-t border-border p-4">
        <form action="/api/auth/logout" method="POST" className="w-full">
          <Button
            type="submit"
            variant="outline"
            className="w-full justify-start rounded-xl"
            size="sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t.nav.logout}
          </Button>
        </form>
      </SheetFooter>
    </div>
  );
}

interface AppSidebarProps {
  role: Role;
  userName: string;
  userEmail: string;
}

export function AppSidebar({ role, userName, userEmail }: AppSidebarProps) {
  const desktopItems = getNavItems(role);
  const mobileItems = getMobileNavItems(role);
  const { focusMode } = useFocusMode();

  if (focusMode) return null;

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 border-r border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <SidebarContent items={desktopItems} userName={userName} userEmail={userEmail} />
      </aside>

      {/* Mobile */}
      <div className="lg:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/80 px-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20">
            <Briefcase className="h-4 w-4" />
          </div>
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-lg">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <SheetContent side="left" className="w-80 p-0">
              <MobileSidebarContent
                items={mobileItems}
                userName={userName}
                userEmail={userEmail}
                role={role}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
