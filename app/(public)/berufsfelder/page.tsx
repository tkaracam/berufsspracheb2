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
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(237,246,239,0.82),_transparent_58%)]" />
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-[#f5e7d6]/50 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#e7f4ef]/60 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-5xl">
          <div className="rounded-[2rem] border border-[#eadfce] bg-[linear-gradient(135deg,#fffdf9_0%,#fff5eb_55%,#f4fbf6_100%)] p-6 shadow-[0_24px_70px_-38px_rgba(115,190,178,0.16)] md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <span className="inline-flex items-center rounded-full border border-[#eadfce] bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                  Lernbereiche für den Berufsalltag
                </span>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                  Wählen Sie Ihr Berufsfeld und lernen Sie
                  {" "}
                  <span className="bg-gradient-to-r from-[#73beb2] to-[#d3a86f] bg-clip-text text-transparent">
                    gezielt für den Arbeitsalltag
                  </span>
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                  Jedes Modul bündelt typische Berufe, zentrale Fachbegriffe und
                  berufsnahe Formulierungen in einer klaren, modernen Lernstruktur.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-3xl border border-[#eadfce] bg-white/88 p-4 shadow-[0_12px_28px_-24px_rgba(32,50,58,0.16)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#73beb2]">
                    Berufsfelder
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{modules.length}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    thematisch sortierte Lernräume
                  </p>
                </div>
                <div className="rounded-3xl border border-[#dbe9dc] bg-white/88 p-4 shadow-[0_12px_28px_-24px_rgba(32,50,58,0.16)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5a8d7d]">
                    Fachbegriffe
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{totalWords}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    für echte Berufssituationen
                  </p>
                </div>
                <div className="rounded-3xl border border-[#f0dfc7] bg-white/88 p-4 shadow-[0_12px_28px_-24px_rgba(32,50,58,0.16)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c49a63]">
                    Berufe
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{totalJobs}</p>
                  <p className="mt-1 text-sm text-slate-500">
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
