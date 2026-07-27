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

  return (
    <div className="relative flex-1 overflow-hidden py-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Berufsfelder</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Wählen Sie Ihr Berufsfeld und trainieren Sie den passenden
            Fachwortschatz, typische Berufe und praxisnahe Gespräche.
          </p>
        </div>

        <BerufsfelderSearch modules={modules} />
      </div>
    </div>
  );
}
