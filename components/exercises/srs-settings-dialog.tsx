"use client";

import { useState } from "react";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { type SRSSettings, getSRSSettings, saveSRSSettings } from "@/lib/srs-settings";

interface SRSSettingsDialogProps {
  onChange?: () => void;
}

export function SRSSettingsDialog({ onChange }: SRSSettingsDialogProps) {
  const [settings, setSettings] = useState<SRSSettings>(() => getSRSSettings());
  const [open, setOpen] = useState(false);

  const update = <K extends keyof SRSSettings>(key: K, value: SRSSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveSRSSettings(settings);
    onChange?.();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent cursor-pointer"
          role="button"
          aria-label="SRS-Einstellungen"
          tabIndex={0}
        >
          <Settings2 className="h-5 w-5" />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            SRS-Einstellungen
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <label htmlFor="newCardsPerDay" className="text-sm font-medium">Neue Karten pro Tag</label>
            <Input
              id="newCardsPerDay"
              type="number"
              min={0}
              max={999}
              value={settings.newCardsPerDay}
              onChange={(e) => update("newCardsPerDay", Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="reviewLimit" className="text-sm font-medium">Review-Limit pro Tag</label>
            <Input
              id="reviewLimit"
              type="number"
              min={0}
              max={999}
              value={settings.reviewLimit}
              onChange={(e) => update("reviewLimit", Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="startingEase" className="text-sm font-medium">Start-Leichtigkeit</label>
            <Input
              id="startingEase"
              type="number"
              step={0.1}
              min={1.3}
              max={3}
              value={settings.startingEase}
              onChange={(e) =>
                update("startingEase", Math.max(1.3, parseFloat(e.target.value) || 2.5))
              }
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="easyBonus" className="text-sm font-medium">Einfach-Bonus</label>
            <Input
              id="easyBonus"
              type="number"
              step={0.05}
              min={1}
              max={2}
              value={settings.easyBonus}
              onChange={(e) => update("easyBonus", Math.max(1, parseFloat(e.target.value) || 1.3))}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="maxInterval" className="text-sm font-medium">Maximales Intervall (Tage)</label>
            <Input
              id="maxInterval"
              type="number"
              min={1}
              max={99999}
              value={settings.maxInterval}
              onChange={(e) => update("maxInterval", Math.max(1, parseInt(e.target.value) || 3650))}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Abbrechen
          </Button>
          <Button onClick={handleSave}>Speichern</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
