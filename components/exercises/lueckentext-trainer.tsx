"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { AudioPlayer } from "./audio-player";
import { FavoriteButton } from "@/components/favorite-button";
import { addDemoProgress } from "@/lib/demo-storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import type { Database } from "@/types/database";

type Entry = Database["public"]["Tables"]["nomen_verb_verbindungen"]["Row"];

interface Props {
  entries: Entry[];
}

export function LueckentextTrainer({ entries }: Props) {
  const [shuffled] = useState(() => [...entries].sort(() => Math.random() - 0.5));
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Keine Einträge vorhanden.
        </CardContent>
      </Card>
    );
  }

  const current = shuffled[index];

  // Ersetze die Verbindung im Beispielsatz durch eine Lücke
  const sentence = current.beispielsatz
    ? current.beispielsatz.replace(new RegExp(current.phrase, "i"), "_____")
    : `Bitte ergänzen Sie: ${current.phrase}`;

  const check = () => {
    if (checked) return;
    const normalizedInput = input.trim().toLowerCase();
    const normalizedPhrase = current.phrase.toLowerCase();
    const isCorrect = normalizedInput === normalizedPhrase;
    if (isCorrect) setScore((s) => s + 1);
    setChecked(true);
  };

  const next = () => {
    if (index + 1 >= shuffled.length) {
      const percentage = Math.round((score / shuffled.length) * 100);
      addDemoProgress({
        itemType: "lueckentext",
        itemId: current.id,
        score: percentage,
        practicedAt: new Date().toISOString(),
      });
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setInput("");
      setChecked(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setInput("");
    setChecked(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / shuffled.length) * 100);
    return (
      <Card className="text-center py-12">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold">Übung beendet!</h2>
          <p className="text-muted-foreground">
            {score} von {shuffled.length} richtig ({percentage}%).
          </p>
          <Progress value={percentage} className="w-full max-w-md mx-auto" />
          <Button onClick={restart}>
            <RotateCcw className="mr-2 h-4 w-4" /> Wiederholen
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isCorrect =
    input.trim().toLowerCase() === current.phrase.toLowerCase();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Satz {index + 1} von {shuffled.length}
          </span>
          <span className="text-sm text-muted-foreground">Punkte: {score}</span>
        </div>
        <Progress value={(index / shuffled.length) * 100} />
        <div className="flex items-start gap-3 mt-4">
          <CardTitle className="text-xl leading-relaxed font-normal">
            {sentence}
          </CardTitle>
          <AudioPlayer path={current.audio_path} text={current.beispielsatz ?? current.phrase} />
          <FavoriteButton
            itemType="nomen_verb"
            itemId={current.id}
            title={current.phrase}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Fehlende Verbindung eingeben..."
          disabled={checked}
          onKeyDown={(e) => e.key === "Enter" && check()}
        />
        {!checked ? (
          <Button onClick={check} className="w-full sm:w-auto">
            Prüfen
          </Button>
        ) : (
          <div className="space-y-3">
            <div
              className={`flex items-center gap-2 font-medium ${
                isCorrect ? "text-primary" : "text-destructive"
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              {isCorrect ? "Richtig!" : `Richtige Lösung: ${current.phrase}`}
            </div>
            <Button onClick={next}>
              {index + 1 >= shuffled.length ? "Abschließen" : "Weiter"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
