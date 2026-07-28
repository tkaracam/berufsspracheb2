import Link from "next/link";
import { Briefcase, HeartPulse, Hammer, Search, ShoppingBag } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { getBerufsfelder, getAllFachwoerter, getBerufeByFeld } from "@/lib/queries";
import { BerufsfelderSearch } from "@/components/home/berufsfelder-search";
import type { IconName } from "@/components/home/berufsfelder-search";
import { PhoneFrame } from "@/components/concept27/phone-frame";
import { MobileTabs } from "@/components/concept27/mobile-tabs";

export const metadata = { title: `Berufsfelder – ${APP_NAME}` };

const featuredAssets = [
  { title: "Gesundheit & Pflege", icon: HeartPulse, accent: "mint" as const },
  { title: "Wirtschaft & Verwaltung", icon: Briefcase, accent: "sand" as const },
  { title: "Technik & Handwerk", icon: Hammer, accent: "slate" as const },
  { title: "Gastronomie & Hotel", icon: ShoppingBag, accent: "peach" as const },
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
    <PhoneFrame className="max-w-[340px]">
      <div className="flex items-center justify-between">
        <div className="w-4" />
        <p className="text-[2rem] text-slate-900 [font-family:Georgia,serif]">Berufsfelder</p>
        <Search className="h-4 w-4 text-slate-500" />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Wähle dein Berufsfeld und lerne gezielt die Sprache, die du brauchst.
      </p>

      <div className="mt-5 space-y-3">
        {featured.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group relative block overflow-hidden rounded-[1.35rem] border border-[#eadfce] bg-[#fbf7f1] shadow-sm"
            >
              <div
                className={`absolute inset-0 ${
                  item.accent === "sand"
                    ? "bg-[radial-gradient(circle_at_right,#f6e4c9,transparent_36%)]"
                    : item.accent === "slate"
                      ? "bg-[radial-gradient(circle_at_right,#e9edf3,transparent_36%)]"
                      : item.accent === "peach"
                        ? "bg-[radial-gradient(circle_at_right,#fde7d8,transparent_36%)]"
                        : "bg-[radial-gradient(circle_at_right,#dff1ea,transparent_36%)]"
                }`}
              />
              <div className="relative z-20 flex min-h-[6.3rem] items-center gap-3 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#c49553] shadow-sm">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="max-w-[11.5rem]">
                  <p className="text-[1rem] leading-5 text-slate-900 [font-family:Georgia,serif]">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.description}</p>
                </div>
                <div
                  className={`ml-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 text-sm font-semibold shadow-sm ${
                    item.accent === "sand"
                      ? "bg-[#fff2df] text-[#b67d3a]"
                      : item.accent === "slate"
                        ? "bg-[#eef2f7] text-[#64748b]"
                        : item.accent === "peach"
                          ? "bg-[#fff0e7] text-[#d9825b]"
                          : "bg-[#eef7f4] text-[#73beb2]"
                  }`}
                >
                  B2
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base text-slate-900 [font-family:Georgia,serif]">Alle Berufsfelder</h2>
          <span className="text-xs text-slate-500">{modules.length} Bereiche</span>
        </div>
        <BerufsfelderSearch modules={modules} />
      </div>

      <MobileTabs active="berufsfelder" />
    </PhoneFrame>
  );
}
