import Link from "next/link";
import { Volume2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const wordOfTheDay = {
  word: "die Terminabsprache",
  article: "die",
  translation: "appointment arrangement",
  example: "Wir müssen noch eine Terminabsprache mit dem Kunden treffen.",
  field: "Büro & Verwaltung",
};

export function WordOfTheDay() {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 h-full overflow-hidden border-l-4 border-l-amber-500 bg-card text-card-foreground shadow-sm">
      <CardContent className="flex h-full flex-col p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-muted/40 px-5 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Wort des Tages
            </span>
          </div>
          <Badge variant="secondary">{wordOfTheDay.field}</Badge>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{wordOfTheDay.article}</p>
            <p className="mt-0.5 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
              {wordOfTheDay.word}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground/80">
              {wordOfTheDay.translation}
            </p>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="shrink-0 rounded-full"
            aria-label="Aussprache anhören"
          >
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Example */}
        <div className="mx-5 mb-5 rounded-lg border bg-muted/40 p-4">
          <p className="text-sm leading-relaxed text-foreground">
            „{wordOfTheDay.example}“
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t bg-muted/30 px-5 py-3">
          <Button
            variant="link"
            className="h-auto p-0 text-primary hover:text-primary/80"
            asChild
          >
            <Link href="/berufsfelder">
              Mehr Fachwörter entdecken{" "}
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
