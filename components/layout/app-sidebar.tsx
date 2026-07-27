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
import { ThemeToggle } from "@/components/layout/theme-toggle";
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
      <div className="flex h-16 items-center justify-between gap-2 border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="truncate">{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      <nav className="flex-1 overflow-auto px-3 py-4">
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
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
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

      <div className="border-t p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground font-semibold text-sm">
            {userName.slice(0, 2).toUpperCase() || <User className="h-5 w-5" />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
        </div>
        <form action="/api/auth/logout" method="POST">
          <Button type="submit" variant="outline" className="w-full justify-start" size="sm">
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
      <SheetHeader className="border-b">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="h-5 w-5" />
          </div>
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-3 pt-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground font-semibold text-sm">
            {userName.slice(0, 2).toUpperCase() || <User className="h-5 w-5" />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
        </div>
      </SheetHeader>

      <nav className="flex-1 overflow-auto px-3 py-4">
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
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
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

      <SheetFooter className="border-t">
        <form action="/api/auth/logout" method="POST" className="w-full">
          <Button
            type="submit"
            variant="outline"
            className="w-full justify-start"
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
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <SidebarContent items={desktopItems} userName={userName} userEmail={userEmail} />
      </aside>

      {/* Mobile */}
      <div className="lg:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="h-5 w-5" />
          </div>
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
            <SheetContent side="left" className="w-72 p-0">
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
