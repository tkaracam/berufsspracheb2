"use client";

import Link from "next/link";
import { Briefcase, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { useTranslation } from "@/components/layout/language-provider";
import { useFocusMode } from "./focus-mode-provider";

export function Footer() {
  const t = useTranslation();
  const { focusMode } = useFocusMode();

  if (focusMode) return null;

  const learnLinks = [
    { href: "/berufsfelder", label: t.nav.professions },
    { href: "/kommunikation", label: t.nav.communication },
    { href: "/pruefungstraining", label: t.nav.examTraining },
    { href: "/redemittel", label: t.nav.redemittel },
  ];

  const legalLinks = [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
  ];

  return (
    <footer className="pb-28 pt-12 sm:pb-12">
      <div className="page-container">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-lg shadow-slate-900/5 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="space-y-5">
              <Link href="/" className="flex items-center gap-3 font-bold text-foreground">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="text-xl font-extrabold tracking-tight">{APP_NAME}</span>
              </Link>
              <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                Deutsch für den Beruf in einer klaren, modernen Lernoberfläche.
                Wortschatz, Kommunikation und B2-Training an einem Ort.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/berufsfelder"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {t.nav.professions}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
                >
                  {t.nav.register}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Lernen
              </h3>
              <ul className="space-y-3">
                {learnLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Rechtliches
              </h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Kontakt
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  hallo@bsk-b2.de
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  +49 30 12345678
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  Musterstraße 1, 10115 Berlin
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium">
              © {new Date().getFullYear()} {APP_NAME}. Alle Rechte vorbehalten.
            </p>
            <p className="text-xs">
              Mit ❤️ für berufliche Deutschlerner entwickelt.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
