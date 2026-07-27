import Link from "next/link";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row">
      {/* Branding side */}
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-amber-600 p-10 text-primary-foreground lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,white/10,transparent_40%)]" />
        <Link href="/" className="relative z-10 flex items-center gap-2 text-xl font-bold">
          <Briefcase className="h-7 w-7" />
          {APP_NAME}
        </Link>
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold leading-tight">
            Berufssprachkurs B2 professionell trainieren
          </h2>
          <ul className="mt-6 space-y-3 text-primary-foreground/90">
            {[
              "Fachwortschatz aus 38 Berufsfeldern",
              "Nomen-Verb-Verbindungen mit Beispielen",
              "Kommunikation für den Alltag",
              "Prüfungstraining für DTB B2",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} {APP_NAME}
        </p>
      </div>

      {/* Form side */}
      <div className="flex flex-1 flex-col">
        <header className="border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 lg:hidden">
          <div className="container mx-auto flex h-16 items-center px-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Briefcase className="h-6 w-6" />
              {APP_NAME}
            </Link>
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center p-6 py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
