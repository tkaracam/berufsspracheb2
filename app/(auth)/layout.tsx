import Link from "next/link";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#f7fbff_0%,#eef7ff_42%,#f8fcff_100%)] lg:flex-row">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-sky-200/50 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-60px] h-[340px] w-[340px] rounded-full bg-cyan-100/70 blur-3xl" />
      </div>

      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden px-10 py-12 lg:flex">
        <Link href="/" className="relative z-10 flex items-center gap-2 text-xl font-bold text-slate-900">
          <Briefcase className="h-7 w-7" />
          {APP_NAME}
        </Link>

        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center rounded-full border border-sky-100 bg-white/85 px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
            Ruhig lernen. Sicher anwenden.
          </span>
          <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900">
            Deutsch für den Beruf in einer klaren, leichten Lernumgebung.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
            Melden Sie sich an und lernen Sie mit Fachwortschatz, Kommunikation
            und kurzen Übungseinheiten für den beruflichen Alltag.
          </p>
          <ul className="mt-8 space-y-3 text-slate-600">
            {[
              "Fachwortschatz aus 38 Berufsfeldern",
              "Nomen-Verb-Verbindungen mit Beispielen",
              "Kommunikation für den Alltag",
              "Prüfungstraining für DTB B2",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl bg-white/75 px-4 py-3 shadow-[0_16px_35px_-26px_rgba(15,23,42,0.28)]">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-sm text-slate-400">
          © {new Date().getFullYear()} {APP_NAME}
        </p>
      </div>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-sky-100 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 lg:hidden">
          <div className="container mx-auto flex h-16 items-center px-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <Briefcase className="h-6 w-6" />
              {APP_NAME}
            </Link>
          </div>
        </header>
        <main className="relative flex flex-1 items-center justify-center p-6 py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
