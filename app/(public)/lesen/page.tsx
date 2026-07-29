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
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: `Leseverstehen B2 – ${APP_NAME}`,
};

export default function LesenPage() {
  return (
    <div className="section-padding">
      <Container>
        <PageHeader
          title="Leseverstehen für BSK B2"
          description="Trainieren Sie das Verstehen beruflicher Texte mit Beispielaufgaben."
          className="text-center sm:text-left"
        />

        <div className="mt-10 space-y-8">
          {readingTexts.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.source}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-xl bg-muted p-4">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </pre>
                </div>

                <div className="space-y-4">
                  {item.questions.map((question, idx) => (
                    <div key={idx} className="rounded-xl border border-border p-4">
                      <div className="mb-3 flex items-start gap-2">
                        <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-sm font-semibold text-foreground">{question.q}</p>
                      </div>
                      {"options" in question && question.options ? (
                        <ul className="mb-3 ml-7 space-y-1 text-sm text-muted-foreground">
                          {question.options.map((opt, i) => (
                            <li key={i}>{opt}</li>
                          ))}
                        </ul>
                      ) : null}
                      <details className="ml-7 text-sm">
                        <summary className="cursor-pointer font-semibold text-primary">
                          Lösung anzeigen
                        </summary>
                        <div className="mt-2">
                          <Badge variant="secondary" className="mb-1">
                            Lösung
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
