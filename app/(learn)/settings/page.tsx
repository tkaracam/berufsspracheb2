"use client";

import { useState, useSyncExternalStore } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    setSettings((s) => ({ ...s, [key]: value }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSRSSettings(settings);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new StorageEvent("storage", { key: "bsk-srs-settings" }));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Lerneinstellungen</h1>
        <p className="text-muted-foreground">Passe dein Lernverhalten an.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Session</CardTitle>
            <CardDescription>Begrenze die Anzahl der Karten pro Lernsession.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionLimit">Karten pro Session</Label>
              <Input
                id="sessionLimit"
                type="number"
                min={0}
                value={settings.sessionLimit}
                onChange={(e) => update("sessionLimit", Math.max(0, parseInt(e.target.value, 10) || 0))}
              />
              <p className="text-xs text-muted-foreground">
                0 bedeutet unbegrenzt.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tageslimits</CardTitle>
            <CardDescription>Maximale Anzahl neuer und wiederholender Karten pro Tag.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newCardsPerDay">Neue Karten pro Tag</Label>
              <Input
                id="newCardsPerDay"
                type="number"
                min={1}
                value={settings.newCardsPerDay}
                onChange={(e) => update("newCardsPerDay", Math.max(1, parseInt(e.target.value, 10) || 1))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewLimit">Wiederholungen pro Tag</Label>
              <Input
                id="reviewLimit"
                type="number"
                min={1}
                value={settings.reviewLimit}
                onChange={(e) => update("reviewLimit", Math.max(1, parseInt(e.target.value, 10) || 1))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SRS-Algorithmus</CardTitle>
            <CardDescription>Fortgeschrittene Einstellungen für den Wiederholungsalgorithmus.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startingEase">Starte Leichtigkeit</Label>
              <Input
                id="startingEase"
                type="number"
                step={0.1}
                min={1.3}
                value={settings.startingEase}
                onChange={(e) => update("startingEase", Math.max(1.3, parseFloat(e.target.value) || 2.5))}
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
                onChange={(e) => update("easyBonus", Math.max(1, parseFloat(e.target.value) || 1.3))}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-4">
          <Button type="submit">Speichern</Button>
          {saved && <span className="text-sm text-green-600">Gespeichert.</span>}
        </div>
      </form>
    </div>
  );
}
