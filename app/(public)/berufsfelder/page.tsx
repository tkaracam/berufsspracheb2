import Image from "next/image";
import Link from "next/link";
import { Briefcase, HeartPulse, Hammer, Search, ShoppingBag } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { getBerufsfelder, getAllFachwoerter, getBerufeByFeld } from "@/lib/queries";
import { BerufsfelderSearch } from "@/components/home/berufsfelder-search";
import type { IconName } from "@/components/home/berufsfelder-search";

export const metadata = { title: `Berufsfelder – ${APP_NAME}` };

const featuredAssets = [
  { title: "Gesundheit & Pflege", image: "/concept27/beruf-healthcare.png", icon: HeartPulse },
  { title: "Wirtschaft & Verwaltung", image: "/concept27/beruf-office.png", icon: Briefcase },
  { title: "Technik & Handwerk", image: "/concept27/beruf-technical.png", icon: Hammer },
  { title: "Gastronomie & Hotel", image: "/concept27/beruf-hospitality.png", icon: ShoppingBag },
];

export default async function BerufsfelderPage() {
  const felder = await getBerufsfelder();
  const allWoerter = await getAllFachwoerter();
  const allBerufe = await Promise.all(felder.map((f) => getBerufeByFeld(f.id)));
  const stats = new Map(felder.map((feld, i) => [feld.id, { words: allWoerter.filter((w) => w.berufsfeld_id === feld.id).length, jobs: allBerufe[i].length }]));
  const modules = felder.map((feld) => {
    const { words, jobs } = stats.get(feld.id) ?? { words: 0, jobs: 0 };
    return { id: feld.id, href: `/berufsfelder/${feld.id}`, title: feld.title, description: feld.description ?? "", icon: (feld.icon ?? "Briefcase") as IconName, words, jobs };
  });
  const featured = featuredAssets.map((asset, index) => ({ ...asset, href: modules[index]?.href ?? "/berufsfelder", description: modules[index]?.description ?? "Lerne gezielt Sprache, die du im Berufsalltag wirklich brauchst." }));

  return (
    <div className="space-y-8">
      <section className="rounded-[2.2rem] border border-[#eadfce] bg-[linear-gradient(135deg,#fffdf9_0%,#fff6eb_55%,#f5fbf6_100%)] p-6 shadow-[0_24px_60px_-34px_rgba(138,116,83,0.18)] md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[2.2rem] text-slate-900 [font-family:Georgia,serif]">Berufsfelder</p>
            <p className="mt-2 max-w-xl text-slate-600">Wähle dein Berufsfeld und lerne gezielt die Sprache, die du brauchst.</p>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-[#eadfce] bg-white text-slate-500 md:flex">
            <Search className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {featured.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} className="group relative block overflow-hidden rounded-[1.6rem] border border-[#eadfce] bg-[#fbf4ea] shadow-sm">
                <div className="absolute inset-y-0 left-0 z-10 w-[58%] bg-[linear-gradient(90deg,rgba(251,244,234,0.98),rgba(251,244,234,0.92),rgba(251,244,234,0))]" />
                <div className="relative z-20 flex min-h-[10rem] items-center gap-4 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#c49553] shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="max-w-[13rem]">
                    <p className="text-[1.35rem] leading-6 text-slate-900 [font-family:Georgia,serif]">{item.title}</p>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{item.description}</p>
                  </div>
                </div>
                <Image src={item.image} alt={item.title} width={1400} height={700} className="absolute inset-y-0 right-0 h-full w-[55%] object-cover object-center transition-transform duration-300 group-hover:scale-105" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-slate-900 [font-family:Georgia,serif]">Alle Berufsfelder</h2>
          <span className="text-sm text-slate-500">{modules.length} Bereiche</span>
        </div>
        <BerufsfelderSearch modules={modules} />
      </section>
    </div>
  );
}
