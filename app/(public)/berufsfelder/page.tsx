import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  HeartPulse,
  Hammer,
  Search,
  ShoppingBag,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { getBerufsfelder, getAllFachwoerter, getBerufeByFeld } from "@/lib/queries";
import { BerufsfelderSearch } from "@/components/home/berufsfelder-search";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import type { IconName } from "@/components/home/berufsfelder-search";

export const metadata = { title: `Berufsfelder – ${APP_NAME}` };

const featuredAssets = [
  {
    title: "Pflege",
    icon: HeartPulse,
    accent: "mint" as const,
    image: "/images/professions/healthcare.png",
  },
  {
    title: "Verwaltung",
    icon: Briefcase,
    accent: "sand" as const,
    image: "/images/professions/office.png",
  },
  {
    title: "Technik",
    icon: Hammer,
    accent: "slate" as const,
    image: "/images/professions/technology.png",
  },
  {
    title: "Gastronomie",
    icon: ShoppingBag,
    accent: "peach" as const,
    image: "/images/professions/hospitality.png",
  },
];

const highlights = [
  {
    title: "Passende Themen schneller finden",
    text: "Berufsfelder, Begriffe und typische Situationen sind direkt nach Praxisbereichen gegliedert.",
    icon: Search,
  },
  {
    title: "Zielgerichtet lernen",
    text: "Du arbeitest nicht allgemein, sondern genau in dem Umfeld, das für Kurs und Beruf relevant ist.",
    icon: Target,
  },
  {
    title: "Nah an echten Berufen",
    text: "Jedes Feld verbindet Fachwortschatz mit konkreten Rollen, Aufgaben und Kommunikationssituationen.",
    icon: Users,
  },
];

const accentStyles: Record<string, { card: string; icon: string }> = {
  mint: { card: "bg-emerald-50/80 hover:bg-emerald-100/60", icon: "bg-emerald-100 text-emerald-700" },
  sand: { card: "bg-amber-50/80 hover:bg-amber-100/60", icon: "bg-amber-100 text-amber-700" },
  slate: { card: "bg-slate-100/80 hover:bg-slate-200/60", icon: "bg-slate-200 text-slate-700" },
  peach: { card: "bg-orange-50/80 hover:bg-orange-100/60", icon: "bg-orange-100 text-orange-700" },
};

export default async function BerufsfelderPage() {
  const felder = await getBerufsfelder();
  const allWoerter = await getAllFachwoerter();
  const allBerufe = await Promise.all(felder.map((f) => getBerufeByFeld(f.id)));
  const stats = new Map(
    felder.map((feld, i) => [
      feld.id,
      { words: allWoerter.filter((w) => w.berufsfeld_id === feld.id).length, jobs: allBerufe[i].length },
    ])
  );
  const modules = felder.map((feld) => {
    const { words, jobs } = stats.get(feld.id) ?? { words: 0, jobs: 0 };
    return {
      id: feld.id,
      href: `/berufsfelder/${feld.id}`,
      title: feld.title,
      description: feld.description ?? "",
      icon: (feld.icon ?? "Briefcase") as IconName,
      words,
      jobs,
    };
  });
  const featured = featuredAssets.map((asset, index) => ({
    ...asset,
    href: modules[index]?.href ?? "/berufsfelder",
    lessons: modules[index]?.words ?? 0,
  }));
  const totalWords = modules.reduce((sum, module) => sum + module.words, 0);
  const totalJobs = modules.reduce((sum, module) => sum + module.jobs, 0);

  return (
    <div className="relative overflow-hidden">
      <section className="px-4 pb-14 pt-20 sm:pt-24 lg:pb-20 lg:pt-28">
        <Container size="large">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <PageHeader
                title="Berufsfelder für klares, praxisnahes Lernen"
                description="Wähle das Arbeitsumfeld, das zu deinem Alltag passt, und lerne gezielt Fachwortschatz, typische Kommunikation und berufsnahe Situationen."
                badge={
                  <div className="editorial-badge">
                    <Sparkles className="h-4 w-4" />
                    Berufssprache nach echten Arbeitsbereichen
                  </div>
                }
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="editorial-card p-4">
                  <p className="text-2xl font-extrabold text-foreground">{modules.length}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Berufsfelder</p>
                </div>
                <div className="editorial-card p-4">
                  <p className="text-2xl font-extrabold text-foreground">{totalWords}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Begriffe insgesamt</p>
                </div>
                <div className="editorial-card p-4">
                  <p className="text-2xl font-extrabold text-foreground">{totalJobs}</p>
                  <p className="mt-1 text-sm text-muted-foreground">berufsnahe Rollen</p>
                </div>
              </div>
            </div>

            <div className="editorial-shell p-6">
              <div className="grid gap-4">
                {highlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <div
                      key={highlight.title}
                      className="editorial-card bg-[rgba(255,252,247,0.82)] p-5"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-lg font-bold text-foreground">
                        {highlight.title}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {highlight.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding pt-0">
        <Container size="large">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((item) => {
              const Icon = item.icon;
              const styles = accentStyles[item.accent];
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group relative overflow-hidden rounded-3xl border border-[#eadfce] p-0 shadow-[0_20px_54px_-38px_rgba(86,77,64,0.18)] transition-all hover:-translate-y-1 hover:shadow-md ${styles.card}`}
                >
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1200}
                      height={900}
                      className="h-44 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/8 to-transparent" />
                    <div className="absolute left-4 top-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon} shadow-sm`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-lg font-bold text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.lessons} Begriffe direkt im beruflichen Kontext.
                    </p>
                    <div className="mt-4 flex items-center text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Bereich öffnen <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-padding pt-0">
        <Container size="large">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Alle Bereiche
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Finde das passende Modul für deinen Berufsweg
              </h2>
            </div>
            <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              {modules.length} Felder verfügbar
            </span>
          </div>

          <BerufsfelderSearch modules={modules} />
        </Container>
      </section>
    </div>
  );
}
