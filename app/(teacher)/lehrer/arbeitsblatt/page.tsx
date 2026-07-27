"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorksheetDownloadButton, type WorksheetItem } from "@/components/worksheet-pdf";
import { mockFachwoerter, mockNomenVerbVerbindungen } from "@/lib/mock-data";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateItems(type: string, count: number): WorksheetItem[] {
  if (type === "nomen-verb") {
    return shuffle(mockNomenVerbVerbindungen)
      .slice(0, count)
      .map((nv) => ({
        id: nv.id,
        type: "nomen-verb",
        question: `Ergänzen Sie die passende Nomen-Verb-Verbindung. Synonym: ${nv.synonym}`,
        answer: nv.phrase,
      }));
  }

  if (type === "fachwort") {
    return shuffle(mockFachwoerter)
      .slice(0, count)
      .map((w) => ({
        id: w.id,
        type: "fachwort",
        question: `Welcher Artikel gehört zu „${w.begriff}"? Schreiben Sie außerdem einen passenden Satz.`,
        answer: `${w.artikel} ${w.begriff}${w.synonym ? ` – ${w.synonym}` : ""}`,
      }));
  }

  // Lückentext: use example sentences and blank out the phrase
  return shuffle(mockNomenVerbVerbindungen)
    .filter((nv) => nv.beispielsatz?.toLowerCase().includes(nv.phrase.toLowerCase()))
    .slice(0, count)
    .map((nv) => {
      const sentence = nv.beispielsatz ?? "";
      const regex = new RegExp(nv.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      const question = sentence.replace(regex, "__________");
      return {
        id: nv.id,
        type: "lueckentext",
        question: `Ergänzen Sie: ${question}`,
        answer: nv.phrase,
      };
    });
}

export default function ArbeitsblattPage() {
  const [title, setTitle] = useState("Arbeitsblatt BSK B2");
  const [type, setType] = useState("nomen-verb");
  const [count, setCount] = useState(10);
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [items, setItems] = useState<WorksheetItem[]>(() =>
    generateItems("nomen-verb", 10)
  );

  const regenerate = () => {
    setItems(generateItems(type, count));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Arbeitsblatt erstellen</h1>
        <p className="text-muted-foreground">
          PDF-Arbeitsblätter mit Aufgaben und optionalen Lösungen generieren.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> Einstellungen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Inhalt</Label>
              <Select value={type} onValueChange={(v) => setType(v ?? "nomen-verb")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nomen-verb">Nomen-Verb-Verbindungen</SelectItem>
                  <SelectItem value="fachwort">Fachwortschatz</SelectItem>
                  <SelectItem value="lueckentext">Lückentext</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="count">Anzahl Aufgaben</Label>
              <Input
                id="count"
                type="number"
                min={1}
                max={50}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="answers"
              checked={includeAnswers}
              onCheckedChange={(v) => setIncludeAnswers(v === true)}
            />
            <Label htmlFor="answers">Lösungen mit ausgeben</Label>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="outline" onClick={regenerate}>
              Aufgaben neu mischen
            </Button>
            <WorksheetDownloadButton
              title={title}
              items={items}
              includeAnswers={includeAnswers}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vorschau ({items.length} Aufgaben)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.slice(0, 10).map((item, i) => (
            <div key={item.id} className="border-b pb-2 last:border-0">
              <p className="text-sm">
                {i + 1}. {item.question}
              </p>
              {includeAnswers && (
                <p className="text-sm text-muted-foreground">
                  Lösung: {item.answer}
                </p>
              )}
            </div>
          ))}
          {items.length > 10 && (
            <p className="text-sm text-muted-foreground">
              ... und {items.length - 10} weitere Aufgaben im PDF.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
