"use client";

import Link from "next/link";
import { Briefcase, ArrowUpRight } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { useTranslation } from "@/components/layout/language-provider";
import { useFocusMode } from "./focus-mode-provider";

export function Footer() {
  const t = useTranslation();
  const { focusMode } = useFocusMode();

  if (focusMode) return null;

  const learnLinks = [
    { href: "/berufsfelder", label: t.nav.professions },
    { href: "/nomen-verb", label: t.nav.redemittel },
    { href: "/kommunikation", label: t.nav.communication },
    { href: "/pruefungstraining", label: t.nav.examTraining },
  ];

  const examLinks = [
    { href: "/pruefungstraining/lesen", label: t.nav.reading },
    { href: "/pruefungstraining/hoeren", label: t.nav.listening },
    { href: "/pruefungstraining/schreiben", label: t.nav.writing },
    { href: "/pruefungstraining/sprechen", label: t.nav.speaking },
  ];

  const accountLinks = [
    { href: "/login", label: t.nav.login },
    { href: "/register", label: t.nav.register },
  ];

  const legalLinks = [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
  ];

  return (
    <footer className="relative mt-8 border-t border-[#eadfce] bg-[#f9f2e9]/70 pb-28 pt-14 md:pb-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#eadfce] bg-white text-primary shadow-[0_12px_24px_-20px_rgba(32,50,58,0.25)]">
                <Briefcase className="h-5 w-5" />
              </div>
              {APP_NAME}
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Deutsch für den Beruf in einer ruhigen, freundlichen Lernoberfläche.
              Fachwortschatz, Kommunikation und Prüfungsvorbereitung an einem Ort.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground">{t.nav.learn}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {learnLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-1 hover:text-foreground transition-colors">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground">{t.nav.examTraining}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {examLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-1 hover:text-foreground transition-colors">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm text-foreground">{t.nav.profile}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-1 hover:text-foreground transition-colors">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-1 hover:text-foreground transition-colors">
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#eadfce] pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {APP_NAME}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-5">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
