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
      <div className="soft-ring mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between rounded-[1.8rem] border border-[#eadfce] bg-[rgba(255,252,247,0.9)] px-3 sm:px-5 backdrop-blur-2xl">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-foreground">
          <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,#0f4f55_0%,#2f7c78_46%,#73beb2_100%)] text-primary-foreground shadow-[0_18px_44px_-22px_rgba(15,79,85,0.46)]">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="leading-none">
            <span className="hidden text-lg font-extrabold tracking-tight sm:block">{APP_NAME}</span>
            <span className="hidden pt-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-[#8f6d47] lg:block">
              Deutsch für Ihren beruflichen Erfolg
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
                  "relative rounded-full px-4 py-2.5 transition-all duration-200",
                  active
                  ? "bg-[linear-gradient(135deg,rgba(22,119,200,0.16),rgba(45,212,191,0.10))] text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-[#fffaf4] hover:text-foreground"
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
              "relative flex items-center gap-2 rounded-full px-4 py-2.5 transition-all duration-200",
              isActive("/suche")
                ? "bg-[linear-gradient(135deg,rgba(15,79,85,0.12),rgba(115,190,178,0.12))] text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-[#fffaf4] hover:text-foreground"
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
                    "relative flex items-center gap-2 rounded-full px-4 py-2.5 transition-all duration-200",
                    learnLinks.some((l) => isActive(l.href))
                      ? "bg-[linear-gradient(135deg,rgba(15,79,85,0.12),rgba(115,190,178,0.12))] text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-[#fffaf4] hover:text-foreground"
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
            <DropdownMenuContent align="end" className="w-56 rounded-2xl border-[#eadfce] bg-[rgba(255,252,247,0.96)] backdrop-blur-2xl">
              {learnLinks.map((link) => (
                <DropdownMenuItem key={link.href} render={<Link href={link.href}>{link.label}</Link>} />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" asChild className="hidden rounded-full px-4 text-foreground md:flex">
            <Link href="/login">{t.nav.login}</Link>
          </Button>
          <Button size="sm" asChild className="hidden rounded-full bg-[#0f4f55] px-5 hover:bg-[#0c4348] md:flex">
            <Link href="/register">{t.nav.register}</Link>
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-full lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              }
            />
            <SheetContent side="right" className="w-80 border-l border-[#eadfce] bg-[rgba(255,252,247,0.94)] p-0 backdrop-blur-2xl">
              <div className="flex h-full flex-col">
                <SheetHeader className="border-b border-border p-5">
                  <Link href="/" className="flex items-center gap-3 text-xl font-bold">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,#0f4f55_0%,#2f7c78_46%,#73beb2_100%)] text-primary-foreground shadow-[0_18px_44px_-22px_rgba(15,79,85,0.46)]">
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
                                  ? "bg-[linear-gradient(135deg,#0f4f55,#2f7c78)] text-primary-foreground shadow-sm shadow-primary/20"
                                  : "text-muted-foreground hover:bg-white/70 hover:text-foreground"
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
                              ? "bg-[linear-gradient(135deg,#0f4f55,#2f7c78)] text-primary-foreground shadow-sm shadow-primary/20"
                              : "text-muted-foreground hover:bg-white/70 hover:text-foreground"
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
                                  ? "bg-[linear-gradient(135deg,#0f4f55,#2f7c78)] text-primary-foreground shadow-sm shadow-primary/20"
                                  : "text-muted-foreground hover:bg-white/70 hover:text-foreground"
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
                  <Button asChild variant="outline" className="w-full justify-start rounded-2xl">
                    <Link href="/login">
                      <User className="mr-2 h-4 w-4" />
                      {t.nav.login}
                    </Link>
                  </Button>
                  <Button asChild className="w-full rounded-2xl">
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
