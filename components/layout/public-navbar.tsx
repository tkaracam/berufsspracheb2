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
    <header className="sticky top-0 z-50 px-4 pt-3 sm:pt-4">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between rounded-2xl border border-border/80 bg-white/90 px-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:px-5">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-foreground">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="leading-none">
            <span className="hidden text-lg font-extrabold tracking-tight sm:block">{APP_NAME}</span>
            <span className="hidden pt-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground lg:block">
              Berufssprache B2
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex">
          {mainLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2.5 transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}

          <Link
            href="/suche"
            className={cn(
              "relative flex items-center gap-2 rounded-full px-4 py-2.5 transition-colors",
              isActive("/suche")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Search className="h-4 w-4" />
            {t.nav.search}
            {isActive("/suche") && (
              <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-2.5 transition-colors",
                    learnLinks.some((l) => isActive(l.href))
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <BookOpen className="h-4 w-4" />
                  {t.nav.learn}
                  <ChevronDown className="h-3 w-3" />
                  {learnLinks.some((l) => isActive(l.href)) && (
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </button>
              }
            />
            <DropdownMenuContent align="end" className="w-52 rounded-xl">
              {learnLinks.map((link) => (
                <DropdownMenuItem key={link.href} render={<Link href={link.href}>{link.label}</Link>} />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" asChild className="hidden rounded-lg px-4 text-foreground md:flex">
            <Link href="/login">{t.nav.login}</Link>
          </Button>
          <Button size="sm" asChild className="hidden rounded-lg px-5 md:flex">
            <Link href="/register">{t.nav.register}</Link>
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-lg lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-80 border-l border-border bg-background p-0">
              <div className="flex h-full flex-col">
                <SheetHeader className="border-b border-border p-5">
                  <Link href="/" className="flex items-center gap-3 text-xl font-bold">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    {APP_NAME}
                  </Link>
                </SheetHeader>

                <nav className="flex-1 overflow-auto px-4 py-6 space-y-6">
                  <div>
                    <h3 className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                                active
                                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
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
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                            isActive("/suche")
                              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
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
                    <h3 className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                                active
                                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
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

                <div className="border-t border-border p-4 space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start rounded-xl">
                    <Link href="/login">
                      <User className="mr-2 h-4 w-4" />
                      {t.nav.login}
                    </Link>
                  </Button>
                  <Button asChild className="w-full rounded-lg">
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
