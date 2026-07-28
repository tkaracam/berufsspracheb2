import Link from "next/link";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#fffaf4_0%,#fbf4ea_42%,#fdfcf8_100%)] lg:flex-row">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-[#e7f4ef]/90 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-60px] h-[340px] w-[340px] rounded-full bg-[#f5e7d6]/80 blur-3xl" />
      </div>

      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden px-10 py-12 lg:flex">
        <Link href="/" className="relative z-10 flex items-center gap-2 text-xl font-bold text-slate-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e8ddd0] bg-white/85 shadow-[0_16px_30px_-24px_rgba(32,50,58,0.35)]">
            <Briefcase className="h-5 w-5 text-[#73beb2]" />
          </div>
          {APP_NAME}
        </Link>

        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center rounded-full border border-[#e8ddd0] bg-white/90 px-3 py-1 text-sm font-medium text-slate-600 shadow-sm">
            Sprache. Kompetenz. Zukunft.
          </span>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-900">
            Sprache öffnet Türen.
            <br />
            <span className="text-[#73beb2]">Wir öffnen sie mit dir.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
            Melde dich an und lerne in einer ruhigen, freundlichen App mit
            Fachwortschatz, Kommunikation und kurzen Einheiten für den Beruf.
          </p>
          <ul className="mt-8 space-y-3 text-slate-600">
            {[
              "Fachwortschatz aus 38 Berufsfeldern",
              "Nomen-Verb-Verbindungen mit Beispielen",
              "Kommunikation für den Alltag",
              "Prüfungstraining für DTB B2",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-[1.4rem] border border-white/60 bg-white/75 px-4 py-3 shadow-[0_16px_35px_-26px_rgba(32,50,58,0.22)]">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#73beb2]" />
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
        <header className="border-b border-[#e8ddd0] bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 lg:hidden">
          <div className="container mx-auto flex h-16 items-center px-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e8ddd0] bg-white/85">
                <Briefcase className="h-5 w-5 text-[#73beb2]" />
              </div>
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
