"use client";

import { useState, useSyncExternalStore } from "react";
import {
  BookOpen,
  CheckCircle2,
  Gauge,
  SlidersHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/ui/container";
import { getSRSSettings, saveSRSSettings, type SRSSettings } from "@/lib/srs-settings";

function useSRSSettingsState(): [SRSSettings, (value: SRSSettings | ((prev: SRSSettings) => SRSSettings)) => void] {
  const settings = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const handler = () => callback();
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    () => getSRSSettings(),
    () => getSRSSettings()
  );
  const [optimistic, setOptimistic] = useState<SRSSettings | null>(null);
  const current = optimistic ?? settings;
  const setValue = (value: SRSSettings | ((prev: SRSSettings) => SRSSettings)) => {
    setOptimistic(typeof value === "function" ? (value as (prev: SRSSettings) => SRSSettings)(current) : value);
  };
  return [current, setValue];
}

export default function SettingsPage() {
  const [settings, setSettings] = useSRSSettingsState();
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof SRSSettings>(key: K, value: SRSSettings[K]) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveSRSSettings(settings);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new StorageEvent("storage", { key: "bsk-srs-settings" }));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Container size="small">
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#e7ddcf] bg-[linear-gradient(135deg,rgba(255,251,246,0.98)_0%,rgba(248,253,250,0.94)_52%,rgba(238,248,245,0.98)_100%)] p-6 shadow-[0_30px_90px_-52px_rgba(83,70,54,0.28)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(115,190,178,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(225,193,145,0.16),transparent_30%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7ebe4] bg-white/78 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f4f55]">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Persönliche Lernsteuerung
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Lernen so einstellen,
                <span className="mt-2 block text-[#0f4f55]">dass es zu Ihrem Alltag passt.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Passen Sie Tagesmengen, Session-Limits und Wiederholungsverhalten so an,
                dass der Lernrhythmus realistisch, ruhig und nachhaltig bleibt.
              </p>
            </div>

            <div className="grid gap-3">
              <MiniInfo label="Neue Karten" value={`${settings.newCardsPerDay} pro Tag`} />
              <MiniInfo label="Wiederholungen" value={`${settings.reviewLimit} pro Tag`} />
              <MiniInfo label="Session-Limit" value={settings.sessionLimit === 0 ? "Unbegrenzt" : `${settings.sessionLimit} Karten`} />
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="rounded-[1.8rem] border-[#eadfce] bg-white/88 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.22)]">
            <CardContent className="space-y-5 p-6 sm:p-7">
              <SectionIntro
                icon={<BookOpen className="h-4 w-4" />}
                title="Session"
                text="Begrenzen Sie, wie viele Karten in einer Lernrunde angezeigt werden."
              />
              <div className="space-y-2">
                <Label htmlFor="sessionLimit">Karten pro Session</Label>
                <Input
                  id="sessionLimit"
                  type="number"
                  min={0}
                  value={settings.sessionLimit}
                  onChange={(event) => update("sessionLimit", Math.max(0, parseInt(event.target.value, 10) || 0))}
                  className="h-12 rounded-2xl border-[#e6ddd2] bg-[#fffdfa]"
                />
                <p className="text-xs text-slate-500">0 bedeutet unbegrenzt.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.8rem] border-[#eadfce] bg-white/88 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.22)]">
            <CardContent className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 sm:p-7">
              <div className="sm:col-span-2">
                <SectionIntro
                  icon={<Gauge className="h-4 w-4" />}
                  title="Tageslimits"
                  text="Definieren Sie ein realistisches Maß für neue Karten und Wiederholungen pro Tag."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newCardsPerDay">Neue Karten pro Tag</Label>
                <Input
                  id="newCardsPerDay"
                  type="number"
                  min={1}
                  value={settings.newCardsPerDay}
                  onChange={(event) => update("newCardsPerDay", Math.max(1, parseInt(event.target.value, 10) || 1))}
                  className="h-12 rounded-2xl border-[#e6ddd2] bg-[#fffdfa]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewLimit">Wiederholungen pro Tag</Label>
                <Input
                  id="reviewLimit"
                  type="number"
                  min={1}
                  value={settings.reviewLimit}
                  onChange={(event) => update("reviewLimit", Math.max(1, parseInt(event.target.value, 10) || 1))}
                  className="h-12 rounded-2xl border-[#e6ddd2] bg-[#fffdfa]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.8rem] border-[#eadfce] bg-white/88 shadow-[0_24px_70px_-52px_rgba(60,44,26,0.22)]">
            <CardContent className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 sm:p-7">
              <div className="sm:col-span-2">
                <SectionIntro
                  icon={<SlidersHorizontal className="h-4 w-4" />}
                  title="SRS-Algorithmus"
                  text="Feineinstellungen für Leichtigkeit und Wiederholungstempo."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startingEase">Start-Leichtigkeit</Label>
                <Input
                  id="startingEase"
                  type="number"
                  step={0.1}
                  min={1.3}
                  value={settings.startingEase}
                  onChange={(event) => update("startingEase", Math.max(1.3, parseFloat(event.target.value) || 2.5))}
                  className="h-12 rounded-2xl border-[#e6ddd2] bg-[#fffdfa]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="easyBonus">Einfach-Bonus</Label>
                <Input
                  id="easyBonus"
                  type="number"
                  step={0.1}
                  min={1}
                  value={settings.easyBonus}
                  onChange={(event) => update("easyBonus", Math.max(1, parseFloat(event.target.value) || 1.3))}
                  className="h-12 rounded-2xl border-[#e6ddd2] bg-[#fffdfa]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Button type="submit" className="rounded-full bg-[#0f4f55] px-6 hover:bg-[#0c4348]">
              Einstellungen speichern
            </Button>
            {saved ? (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Gespeichert.
              </span>
            ) : null}
          </div>
        </form>
      </div>
    </Container>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-[#e3efe9] bg-white/82 p-4 shadow-[0_18px_40px_-34px_rgba(15,79,85,0.24)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f4f55]">{label}</p>
      <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-slate-950">{value}</p>
    </div>
  );
}

function SectionIntro({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0f4f55]">
        {icon}
        {title}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
