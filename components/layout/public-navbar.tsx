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

  if (focusMode || pathname === "/") return null;

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
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between rounded-[1.8rem] border border-[#eadfce] bg-[#fffdf9]/92 px-4 shadow-[0_18px_40px_-28px_rgba(138,116,83,0.35)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#fffdf9]/82">
        <Link href="/" className="flex items-center gap-3 font-semibold text-xl text-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-[1.1rem] border border-[#eadfce] bg-white shadow-[0_12px_24px_-20px_rgba(32,50,58,0.25)]">
            <Briefcase className="h-5 w-5 text-[#73beb2]" />
          </div>
          <div className="leading-none">
            <span className="hidden text-[1.55rem] [font-family:Georgia,serif] sm:block">{APP_NAME}</span>
            <span className="hidden pt-1 text-[0.6rem] uppercase tracking-[0.28em] text-slate-400 lg:block">
              Sprache. Kompetenz. Zukunft.
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {mainLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-full px-4 py-2.5 transition-colors",
                  active
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:bg-white/80 hover:text-slate-900"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-[0.45rem] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#73beb2]" />
                )}
              </Link>
            );
          })}

          <Link
            href="/suche"
            className={cn(
              "relative flex items-center gap-2 rounded-full px-4 py-2.5 transition-colors",
              isActive("/suche")
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:bg-white/80 hover:text-slate-900"
            )}
          >
            <Search className="h-4 w-4" />
            {t.nav.search}
            {isActive("/suche") && (
              <span className="absolute bottom-[0.45rem] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#73beb2]" />
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-2.5 transition-colors",
                    learnLinks.some((l) => isActive(l.href))
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:bg-white/80 hover:text-slate-900"
                  )}
                >
                  <BookOpen className="h-4 w-4" />
                  {t.nav.learn}
                  <ChevronDown className="h-3 w-3" />
                  {learnLinks.some((l) => isActive(l.href)) && (
                    <span className="absolute bottom-[0.45rem] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#73beb2]" />
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

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" asChild className="hidden rounded-full px-4 text-slate-700 md:flex">
            <Link href="/login">{t.nav.login}</Link>
          </Button>
          <Button size="sm" asChild className="hidden rounded-full bg-[#73beb2] px-5 text-white hover:bg-[#64aea3] md:flex">
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
            <SheetContent side="right" className="w-72 border-l border-[#eadfce] bg-[#fffaf4] p-0">
              <div className="flex h-full flex-col">
                <SheetHeader className="border-b border-[#eadfce] p-4">
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#eadfce] bg-white/90">
                      <Briefcase className="h-5 w-5 text-[#73beb2]" />
                    </div>
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
                                  ? "bg-[#73beb2] text-white"
                                  : "text-muted-foreground hover:bg-white hover:text-foreground"
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
                              ? "bg-[#73beb2] text-white"
                              : "text-muted-foreground hover:bg-white hover:text-foreground"
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
                                  ? "bg-[#73beb2] text-white"
                                  : "text-muted-foreground hover:bg-white hover:text-foreground"
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

                <div className="border-t border-[#eadfce] p-4 space-y-2">
                  <Button asChild variant="outline" className="w-full justify-start rounded-xl border-[#eadfce]">
                    <Link href="/login">
                      <User className="mr-2 h-4 w-4" />
                      {t.nav.login}
                    </Link>
                  </Button>
                  <Button asChild className="w-full rounded-xl bg-[#73beb2] hover:bg-[#64aea3]">
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
