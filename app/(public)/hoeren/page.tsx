import { Headphones, HelpCircle } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { listeningTasks } from "@/lib/listening-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { AudioPlayer } from "@/components/exercises/audio-player";

export const metadata = {
  title: `Hörverstehen B2 – ${APP_NAME}`,
};

export default function HoerenPage() {
  return (
    <div className="section-padding">
      <Container>
        <PageHeader
          title="Hörverstehen für BSK B2"
          description="Üben Sie mit echten Hörtexten, Transkripten und Aufgaben."
          className="text-center sm:text-left"
        />

        <Alert className="mt-8">
          <Headphones className="h-5 w-5" />
          <AlertTitle>Hinweis</AlertTitle>
          <AlertDescription>
            Klicken Sie auf das Lautsprecher-Symbol, um den originalen Hörtext
            anzuhören. Anschließend können Sie das Transkript zur Kontrolle lesen.
          </AlertDescription>
        </Alert>

        <div className="mt-8 space-y-8">
          {listeningTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Headphones className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{task.title}</CardTitle>
                      <CardDescription>Textsorte: {task.type}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AudioPlayer path={task.audioPath} label="Hörtext anhören" />
                    <Badge variant="outline">Hörtext</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-xl bg-muted p-4">
                  <h4 className="mb-2 font-bold text-foreground">Transkript</h4>
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
                    {task.transcript}
                  </pre>
                </div>

                <div className="space-y-4">
                  {task.questions.map((question, idx) => (
                    <div key={idx} className="rounded-xl border border-border p-4">
                      <div className="mb-2 flex items-start gap-2">
                        <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-sm font-semibold text-foreground">{question.q}</p>
                      </div>
                      <details className="ml-7 text-sm">
                        <summary className="cursor-pointer font-semibold text-primary">
                          Lösung anzeigen
                        </summary>
                        <div className="mt-2">
                          <Badge variant="secondary" className="mb-1">
                            Antwort
                          </Badge>
                          <p className="text-muted-foreground">{question.answer}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
