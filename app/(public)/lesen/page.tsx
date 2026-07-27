import { BookOpen, HelpCircle } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { readingTexts } from "@/lib/reading-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: `Leseverstehen B2 – ${APP_NAME}`,
};

export default function LesenPage() {
  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Leseverstehen für BSK B2
        </h1>
        <p className="text-muted-foreground text-lg">
          Trainieren Sie das Verstehen beruflicher Texte mit Beispielaufgaben.
        </p>
      </div>

      <div className="space-y-10 max-w-4xl mx-auto">
        {readingTexts.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-fit rounded-xl bg-primary/10 p-3 text-primary shrink-0">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.source}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted/60 p-4">
                <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                  {item.text}
                </pre>
              </div>

              <div className="space-y-4">
                {item.questions.map((question, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-3">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="font-medium text-sm">{question.q}</p>
                    </div>
                    {"options" in question && question.options ? (
                      <ul className="space-y-1 text-sm ml-7 mb-3">
                        {question.options.map((opt, i) => (
                          <li key={i}>{opt}</li>
                        ))}
                      </ul>
                    ) : null}
                    <details className="text-sm ml-7">
                      <summary className="cursor-pointer text-primary font-medium">
                        Lösung anzeigen
                      </summary>
                      <div className="mt-2">
                        <Badge variant="secondary" className="mb-1">
                          Lösung
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
