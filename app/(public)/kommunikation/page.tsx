import { APP_NAME } from "@/lib/constants";
import { communicationModules } from "@/lib/communication-data";
import { KommunikationSearch } from "@/components/home/kommunikation-search";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { MessageCircle, Users, Briefcase, Headphones } from "lucide-react";

export const metadata = {
  title: `Kommunikation im Beruf – ${APP_NAME}`,
};

const highlights = [
  { icon: MessageCircle, title: "Redemittel", text: "Typische Wendungen für Gespräche im Beruf." },
  { icon: Users, title: "Teamgespräche", text: "Sicher kommunizieren mit Kolleg:innen." },
  { icon: Briefcase, title: "Kundengespräche", text: "Höflich und professionell im Kundenkontakt." },
  { icon: Headphones, title: "Telefon & E-Mail", text: "Schriftlich und mündlich souverän." },
];

export default function KommunikationPage() {
  return (
    <div className="section-padding">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/20 p-6 shadow-lg shadow-slate-900/5 sm:p-10 lg:p-12">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              Kommunikation im Arbeitsalltag
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Kommunikation im Beruf
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Trainieren Sie berufliche Gesprächssituationen gezielt und in
              einer ruhigen, modernen Lernoberfläche.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 font-bold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <KommunikationSearch modules={communicationModules} />
        </div>
      </Container>
    </div>
  );
}
