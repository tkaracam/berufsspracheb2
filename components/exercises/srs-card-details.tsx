"use client";

import { Info, Calendar, EyeOff, Pause, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  getSRSCard,
  formatInterval,
  formatDueDate,
  suspendItem,
  buryItem,
  unsuspendItem,
} from "@/lib/spaced-repetition";

interface SRSCardDetailsProps {
  itemId: string;
  onChange?: () => void;
}

function nowDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function SRSCardDetails({ itemId, onChange }: SRSCardDetailsProps) {
  const card = typeof window !== "undefined" ? getSRSCard(itemId) : undefined;
  const today = nowDate();

  const isSuspended = !!card?.suspendedUntil && card.suspendedUntil >= today;
  const isBuried = !!card?.buriedUntil && card.buriedUntil >= today;
  const isHidden = isSuspended || isBuried;

  const status = !card ? "Neu" : card.dueDate <= today ? "Fällig" : "Zukünftig";

  const handleAction = (action: () => void) => {
    action();
    onChange?.();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent cursor-pointer"
          role="button"
          aria-label="Kartendetails"
          tabIndex={0}
        >
          <Info className="h-5 w-5" />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Kartendetails
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Status</p>
              <p className="font-medium">
                <Badge variant={status === "Fällig" ? "default" : "secondary"}>
                  {isHidden ? `${status} (ausgeblendet)` : status}
                </Badge>
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Intervall</p>
              <p className="font-medium">{card ? formatInterval(card.interval) : "—"}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Wiederholungen</p>
              <p className="font-medium">{card?.repetition ?? 0}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Leichtigkeit</p>
              <p className="font-medium">{card ? card.ease.toFixed(2) : "—"}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Fällig</p>
              <p className="font-medium flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {card ? formatDueDate(card.dueDate) : "—"}
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-muted-foreground text-xs">Zuletzt gelernt</p>
              <p className="font-medium">
                {card?.lastReviewed
                  ? new Date(card.lastReviewed).toLocaleDateString("de-DE")
                  : "—"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Aktionen</p>
            <div className="flex flex-wrap gap-2">
              {isHidden ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction(() => unsuspendItem(itemId))}
                >
                  <Eye className="mr-2 h-4 w-4" /> Wieder anzeigen
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(() => buryItem(itemId))}
                  >
                    <EyeOff className="mr-2 h-4 w-4" /> Bis morgen verbergen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(() => suspendItem(itemId, 7))}
                  >
                    <Pause className="mr-2 h-4 w-4" /> 1 Woche aussetzen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(() => suspendItem(itemId, 30))}
                  >
                    <Pause className="mr-2 h-4 w-4" /> 1 Monat aussetzen
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
