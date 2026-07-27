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
import { AudioPlayer } from "@/components/exercises/audio-player";

export const metadata = {
  title: `Hörverstehen B2 – ${APP_NAME}`,
};

export default function HoerenPage() {
  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Hörverstehen für BSK B2
        </h1>
        <p className="text-muted-foreground text-lg">
          Üben Sie mit echten Hörtexten, Transkripten und Aufgaben.
        </p>
      </div>

      <Alert className="max-w-4xl mx-auto mb-10">
        <Headphones className="h-5 w-5" />
        <AlertTitle>Hinweis</AlertTitle>
        <AlertDescription>
          Klicken Sie auf das Lautsprecher-Symbol, um den originalen Hörtext
          anzuhören. Anschließend können Sie das Transkript zur Kontrolle lesen.
        </AlertDescription>
      </Alert>

      <div className="space-y-10 max-w-4xl mx-auto">
        {listeningTasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-fit rounded-xl bg-primary/10 p-3 text-primary shrink-0">
                    <Headphones className="h-6 w-6" />
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
              <div className="rounded-lg bg-muted/60 p-4">
                <h4 className="font-semibold mb-2">Transkript</h4>
                <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                  {task.transcript}
                </pre>
              </div>

              <div className="space-y-4">
                {task.questions.map((question, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="font-medium text-sm">{question.q}</p>
                    </div>
                    <details className="text-sm ml-7">
                      <summary className="cursor-pointer text-primary font-medium">
                        Lösung anzeigen
                      </summary>
                      <div className="mt-2">
                        <Badge variant="secondary" className="mb-1">
                          Antwort
                        </Badge>
                        <p>{question.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
