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
  { title: "Pflege", icon: HeartPulse, accent: "mint" as const },
  { title: "Verwaltung", icon: Briefcase, accent: "sand" as const },
  { title: "Technik", icon: Hammer, accent: "slate" as const },
  { title: "Gastronomie", icon: ShoppingBag, accent: "peach" as const },
];

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

  return (
    <PhoneFrame className="max-w-[380px]">
      <div className="flex items-center justify-between">
        <p className="text-[2rem] text-slate-900 [font-family:Georgia,serif]">Berufsfelder</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#eadfce] bg-white shadow-sm">
          <Search className="h-4 w-4 text-slate-500" />
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Wähle dein Arbeitsumfeld und lerne zielgerichtet.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {featured.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`rounded-[1.45rem] border border-[#eadfce] p-4 shadow-sm transition-transform hover:-translate-y-0.5 ${
                item.accent === "sand"
                  ? "bg-[linear-gradient(180deg,#fbf4e8_0%,#fffaf3_100%)]"
                  : item.accent === "slate"
                    ? "bg-[linear-gradient(180deg,#eef3f3_0%,#f8fbfb_100%)]"
                    : item.accent === "peach"
                      ? "bg-[linear-gradient(180deg,#fff0e8_0%,#fff8f4_100%)]"
                      : "bg-[linear-gradient(180deg,#eef7f4_0%,#f9fcfa_100%)]"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/88 shadow-sm">
                <Icon
                  className={`h-5 w-5 ${
                    item.accent === "sand"
                      ? "text-[#b88a4a]"
                      : item.accent === "slate"
                        ? "text-[#64748b]"
                        : item.accent === "peach"
                          ? "text-[#d69061]"
                          : "text-[#5c9c88]"
                  }`}
                />
              </div>
              <p className="mt-6 text-[1.45rem] leading-tight text-slate-900 [font-family:Georgia,serif]">
                {item.title}
              </p>
              <p className="mt-2 text-sm text-slate-500">{item.lessons} Lektionen</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base text-slate-900 [font-family:Georgia,serif]">Alle Bereiche</h2>
          <span className="text-xs text-slate-500">{modules.length} Felder</span>
        </div>
        <BerufsfelderSearch modules={modules} />
      </div>

      <MobileTabs active="berufsfelder" />
    </PhoneFrame>
  );
}
