import { BrandMark } from "@/components/concept27/brand-mark";
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="editorial-grid absolute inset-0 opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(223,195,156,0.18)_0%,transparent_46%),radial-gradient(ellipse_at_bottom_left,rgba(115,190,178,0.14)_0%,transparent_42%),linear-gradient(180deg,#fbf6ef_0%,#f8f3eb_100%)]" />
        <div className="animate-aurora-float absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="animate-aurora-float absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/40 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden lg:block">
          <div className="max-w-xl">
            <BrandMark />
            <p className="mt-5 text-xl font-semibold text-foreground">
              Klar lernen. Sicher anwenden.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Berufssprache B2 begleitet dich mit einer ruhigen Oberfläche,
              klaren Lernwegen und einem nachvollziehbaren Einstieg in Fachsprache,
              Kommunikation und Prüfungsvorbereitung.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                {
                  icon: CheckCircle2,
                  title: "Einfacher Einstieg",
                  text: "Registrieren, E-Mail bestätigen und direkt mit dem Lernen beginnen.",
                },
                {
                  icon: ShieldCheck,
                  title: "Sicheres Konto",
                  text: "Deine Anmeldung läuft über Supabase mit bestätigter E-Mail und geschützter Session.",
                },
                {
                  icon: Mail,
                  title: "Klare Rückmeldung",
                  text: "Bei Registrierung, Login und Passwort-Reset erhältst du jetzt deutlichere Hinweise.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="editorial-card p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-lg font-bold text-foreground">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <main className="relative w-full max-w-xl justify-self-center lg:w-full">
          <div className="mb-8 text-center lg:hidden">
            <BrandMark />
            <p className="mt-4 text-lg font-medium text-foreground">
              Klar lernen. Sicher anwenden.
            </p>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
