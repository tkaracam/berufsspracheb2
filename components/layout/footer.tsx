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

  const legalLinks = [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
  ];

  return (
    <footer className="pb-28 pt-8 md:pb-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-[2rem] border border-[#eadfce] bg-[#fffdf9]/88 p-6 shadow-[0_24px_50px_-34px_rgba(138,116,83,0.22)] md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Link href="/" className="mb-4 flex items-center gap-3 font-semibold text-xl text-slate-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#eadfce] bg-white text-primary shadow-[0_12px_24px_-20px_rgba(32,50,58,0.25)]">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="[font-family:Georgia,serif]">{APP_NAME}</span>
              </Link>
              <p className="text-sm leading-7 text-slate-600 md:text-base">
                Deutsch für den Beruf in einer klaren, ruhigen Lernoberfläche.
                Wortschatz, Kommunikation und B2-Training an einem Ort.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/berufsfelder"
                className="inline-flex items-center gap-2 rounded-full border border-[#eadfce] bg-white px-4 py-2.5 text-sm text-slate-700 transition-colors hover:text-slate-900"
              >
                {t.nav.professions}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#73beb2] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#64aea3]"
              >
                {t.nav.register}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[#eadfce] pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {APP_NAME}
            </p>
            <div className="flex flex-wrap gap-5">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition-colors hover:text-slate-900">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
