"use client";

import Link from "next/link";
import { Briefcase, Menu, User, BookOpen, ChevronDown, Search, GraduationCap, BookText, Pencil, Headphones, Mic, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_NAME } from "@/lib/constants";
import { useTranslation } from "@/components/layout/language-provider";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useFocusMode } from "./focus-mode-provider";

export function PublicNavbar() {
  const t = useTranslation();
  const pathname = usePathname();
  const { focusMode } = useFocusMode();

  if (focusMode) return null;

  const mainLinks = [
    { href: "/berufsfelder", label: t.nav.professions, icon: Briefcase },
    { href: "/nomen-verb", label: t.nav.redemittel, icon: MessageCircle },
    { href: "/kommunikation", label: t.nav.communication, icon: MessageCircle },
    { href: "/pruefungstraining", label: t.nav.examTraining, icon: GraduationCap },
  ];

  const learnLinks = [
    { href: "/grammatik", label: t.nav.grammar, icon: BookText },
    { href: "/redemittel", label: t.nav.redemittel, icon: MessageCircle },
    { href: "/schreiben", label: t.nav.writing, icon: Pencil },
    { href: "/lesen", label: t.nav.reading, icon: BookOpen },
    { href: "/hoeren", label: t.nav.listening, icon: Headphones },
    { href: "/sprechen", label: t.nav.speaking, icon: Mic },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Briefcase className="h-6 w-6" />
          <span className="hidden sm:inline">{APP_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {mainLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-md px-3 py-2 transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}

          <Link
            href="/suche"
            className={cn(
              "relative flex items-center gap-1 rounded-md px-3 py-2 transition-colors",
              isActive("/suche")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Search className="h-4 w-4" />
            {t.nav.search}
            {isActive("/suche") && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  className={cn(
                    "relative flex items-center gap-1 rounded-md px-3 py-2 transition-colors",
                    learnLinks.some((l) => isActive(l.href))
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <BookOpen className="h-4 w-4" />
                  {t.nav.learn}
                  <ChevronDown className="h-3 w-3" />
                  {learnLinks.some((l) => isActive(l.href)) && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </button>
              }
            />
            <DropdownMenuContent align="end">
              {learnLinks.map((link) => (
                <DropdownMenuItem key={link.href} render={<Link href={link.href}>{link.label}</Link>} />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/login">{t.nav.login}</Link>
          </Button>
          <Button size="sm" asChild className="hidden sm:flex">
            <Link href="/register">{t.nav.register}</Link>
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-72 p-0">
              <div className="flex h-full flex-col">
                <SheetHeader className="border-b p-4">
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <Briefcase className="h-6 w-6" />
                    {APP_NAME}
                  </Link>
                </SheetHeader>

                <nav className="flex-1 overflow-auto py-4 px-3 space-y-6">
                  <div>
                    <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t.nav.learn}
                    </h3>
                    <ul className="space-y-1">
                      {mainLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                active
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              <Icon className="h-4 w-4 shrink-0" />
                              <span className="truncate">{link.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                      <li>
                        <Link
                          href="/suche"
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive("/suche")
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Search className="h-4 w-4 shrink-0" />
                          <span className="truncate">{t.nav.search}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t.nav.learn}
                    </h3>
                    <ul className="space-y-1">
                      {learnLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);
                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                active
                                  ? "bg-primary text-primary-foreground"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              <Icon className="h-4 w-4 shrink-0" />
                              <span className="truncate">{link.label}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </nav>

                <div className="border-t p-4 space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/login">
                      <User className="mr-2 h-4 w-4" />
                      {t.nav.login}
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/register">{t.nav.register}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
