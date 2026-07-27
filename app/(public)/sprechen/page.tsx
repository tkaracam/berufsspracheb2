import Link from "next/link";
import { Mic, Clock, Play, MessageCircle } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { speakingTasks } from "@/lib/speaking-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `Sprechen B2 – ${APP_NAME}`,
};

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function SprechenPage() {
  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Sprechen für BSK B2
        </h1>
        <p className="text-muted-foreground text-lg">
          Übungsaufgaben, Tipps und Musterlösungen für Sprechsituationen im
          Beruf.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/trainer/sprechen">
              <Play className="mr-2 h-4 w-4" /> Zum interaktiven Sprechtrainer
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
        {speakingTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-fit rounded-xl bg-primary/10 p-3 text-primary shrink-0">
                    <Mic className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.task}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {task.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Vorbereitung: {formatTime(task.preparationTimeSeconds)}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mic className="h-4 w-4" />
                  Sprechzeit: {formatTime(task.speakingTimeSeconds)}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Tipps</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {task.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-muted/60 p-4">
                <h4 className="font-semibold mb-2">Musterlösung</h4>
                <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                  {task.modelAnswer}
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
