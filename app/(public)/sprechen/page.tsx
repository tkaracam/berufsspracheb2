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
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

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
    <div className="section-padding">
      <Container>
        <PageHeader
          title="Sprechen für BSK B2"
          description="Übungsaufgaben, Tipps und Musterlösungen für Sprechsituationen im Beruf."
          className="text-center sm:text-left"
        >
          <Button asChild>
            <Link href="/trainer/sprechen">
              <Play className="mr-2 h-4 w-4" /> Zum Sprechtrainer
            </Link>
          </Button>
        </PageHeader>

        <div className="mt-10 grid grid-cols-1 gap-6">
          {speakingTasks.map((task) => (
            <Card key={task.id} className="transition-all hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mic className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{task.title}</CardTitle>
                      <CardDescription>{task.task}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    <MessageCircle className="mr-1 h-3 w-3" />
                    {task.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Vorbereitung: {formatTime(task.preparationTimeSeconds)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    Sprechzeit: {formatTime(task.speakingTimeSeconds)}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-bold text-foreground">Tipps</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {task.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-muted p-4">
                  <h4 className="mb-2 font-bold text-foreground">Musterlösung</h4>
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
                    {task.modelAnswer}
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
