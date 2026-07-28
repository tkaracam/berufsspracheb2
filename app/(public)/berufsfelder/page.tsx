import { APP_NAME } from "@/lib/constants";
import { getBerufsfelder, getAllFachwoerter, getBerufeByFeld } from "@/lib/queries";
import { BerufsfelderSearch } from "@/components/home/berufsfelder-search";
import type { IconName } from "@/components/home/berufsfelder-search";

export const metadata = {
  title: `Berufsfelder – ${APP_NAME}`,
};

export default async function BerufsfelderPage() {
  const felder = await getBerufsfelder();
  const allWoerter = await getAllFachwoerter();
  const allBerufe = await Promise.all(felder.map((f) => getBerufeByFeld(f.id)));

  const stats = new Map(
    felder.map((feld, i) => [
      feld.id,
      {
        words: allWoerter.filter((w) => w.berufsfeld_id === feld.id).length,
        jobs: allBerufe[i].length,
      },
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

  const totalWords = modules.reduce((sum, module) => sum + module.words, 0);
  const totalJobs = modules.reduce((sum, module) => sum + module.jobs, 0);

  return (
    <div className="relative flex-1 overflow-hidden py-10 md:py-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.14),_transparent_58%)]" />
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-5xl">
          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.4)] backdrop-blur md:p-8 dark:border-slate-800/70 dark:bg-slate-950/75">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <span className="inline-flex items-center rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-300">
                  Berufssprache B2 Module
                </span>
                <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                  Wählen Sie Ihr Berufsfeld und lernen Sie
                  {" "}
                  <span className="bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">
                    gezielt für den Arbeitsalltag
                  </span>
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  Jedes Modul bündelt typische Berufe, zentrale Fachbegriffe und
                  berufsnahe Formulierungen in einer klaren, modernen Lernstruktur.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-3xl border border-sky-100 bg-sky-50/80 p-4 dark:border-sky-950 dark:bg-sky-950/30">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
                    Berufsfelder
                  </p>
                  <p className="mt-2 text-3xl font-bold">{modules.length}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    thematisch sortierte Lernräume
                  </p>
                </div>
                <div className="rounded-3xl border border-emerald-100 bg-emerald-50/80 p-4 dark:border-emerald-950 dark:bg-emerald-950/30">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                    Fachbegriffe
                  </p>
                  <p className="mt-2 text-3xl font-bold">{totalWords}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    für echte Berufssituationen
                  </p>
                </div>
                <div className="rounded-3xl border border-amber-100 bg-amber-50/80 p-4 dark:border-amber-950 dark:bg-amber-950/30">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                    Berufe
                  </p>
                  <p className="mt-2 text-3xl font-bold">{totalJobs}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    als Orientierung im Modul
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BerufsfelderSearch modules={modules} />
      </div>
    </div>
  );
}
