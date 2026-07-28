"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Truck,
  Package,
  HeartPulse,
  Baby,
  UtensilsCrossed,
  ShoppingCart,
  Building2,
  Monitor,
  Hammer,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Leaf,
  Car,
  Scissors,
  Beef,
  Plane,
  HeartHandshake,
  Sun,
  Landmark,
  Megaphone,
  FlaskConical,
  Cog,
  Shirt,
  Dumbbell,
  Palette,
  Zap,
  Road,
  Printer,
  Layers,
  Glasses,
  Home,
  Files,
  Watch,
  Sofa,
  Cat,
  Music,
  Droplets,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ICON_MAP = {
  Truck,
  Package,
  HeartPulse,
  Baby,
  UtensilsCrossed,
  ShoppingCart,
  Building2,
  Monitor,
  Hammer,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Leaf,
  Car,
  Scissors,
  Beef,
  Plane,
  HeartHandshake,
  Sun,
  Landmark,
  Megaphone,
  FlaskConical,
  Cog,
  Shirt,
  Dumbbell,
  Palette,
  Zap,
  Road,
  Printer,
  Layers,
  Glasses,
  Home,
  Files,
  Watch,
  Sofa,
  Cat,
  Music,
  Droplets,
} satisfies Record<string, React.ElementType>;

export type IconName = keyof typeof ICON_MAP;

interface Module {
  id: string;
  href: string;
  title: string;
  description: string;
  icon: IconName;
  words: number;
  jobs: number;
}

interface Props {
  modules: Module[];
}

const quickFilters = [
  { key: "all", label: "Alle" },
  { key: "large", label: "Viele Begriffe" },
  { key: "jobs", label: "Viele Berufe" },
] as const;

export function BerufsfelderSearch({ modules }: Props) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof quickFilters)[number]["key"]>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const searched = !q
      ? modules
      : modules.filter((m) =>
          [m.title, m.description].join(" ").toLowerCase().includes(q)
        );

    if (activeFilter === "large") {
      return searched.filter((m) => m.words >= 20);
    }

    if (activeFilter === "jobs") {
      return searched.filter((m) => m.jobs >= 5);
    }

    return searched;
  }, [activeFilter, modules, query]);

  const featuredModule = useMemo(() => {
    return [...modules].sort((a, b) => b.words - a.words)[0];
  }, [modules]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="rounded-[1.75rem] border border-white/60 bg-white/80 p-4 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Berufsfeld oder Thema suchen..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-12 rounded-2xl border-border/70 bg-background/80 pl-11 pr-10 text-sm shadow-none"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <Button
                key={filter.key}
                type="button"
                variant={activeFilter === filter.key ? "default" : "outline"}
                className={`rounded-2xl px-4 ${
                  activeFilter === filter.key
                    ? "bg-slate-950 text-white hover:bg-slate-800"
                    : "bg-background/80"
                }`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{filtered.length} von {modules.length} Berufsfeldern sichtbar</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>klar gegliedert nach Berufspraxis</span>
          </div>
        </div>

        {featuredModule ? (
          <Link href={featuredModule.href} className="group block">
            <div className="h-full rounded-[1.75rem] border border-sky-200/70 bg-gradient-to-br from-sky-600 via-blue-600 to-emerald-500 p-[1px] shadow-[0_24px_70px_-38px_rgba(14,165,233,0.65)]">
              <div className="flex h-full flex-col justify-between rounded-[1.65rem] bg-slate-950 p-5 text-white">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                    <Sparkles className="h-3.5 w-3.5" />
                    Empfehlung
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{featuredModule.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {featuredModule.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex gap-2 text-xs">
                    <span className="rounded-full bg-white/10 px-3 py-1">
                      {featuredModule.words} Begriffe
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1">
                      {featuredModule.jobs} Berufe
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((feld) => {
          const Icon = ICON_MAP[feld.icon] ?? Briefcase;
          return (
            <Link key={feld.id} href={feld.href} className="group block">
              <Card className="h-full overflow-hidden rounded-[1.75rem] border border-border/70 bg-white/85 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.45)]">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="rounded-full border-sky-200 bg-sky-50 text-sky-700">
                      B2
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-6">{feld.title}</CardTitle>
                  <CardDescription className="line-clamp-3 text-sm leading-6">
                    {feld.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="rounded-full">
                        {feld.words} Begriffe
                      </Badge>
                      <Badge variant="outline" className="rounded-full">
                        {feld.jobs} Berufe
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">
                        Modul öffnen
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-sky-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-[2rem] border border-dashed border-border bg-card/70 px-6 py-14 text-center shadow-sm">
          <p className="text-lg font-semibold">Kein Berufsfeld gefunden</p>
          <p className="mt-2 text-muted-foreground">
            Probieren Sie einen anderen Suchbegriff oder wechseln Sie zurück auf
            den Filter <span className="font-medium text-foreground">Alle</span>.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-5 rounded-2xl"
            onClick={() => {
              setQuery("");
              setActiveFilter("all");
            }}
          >
            Suche zurücksetzen
          </Button>
        </div>
      )}
    </div>
  );
}
