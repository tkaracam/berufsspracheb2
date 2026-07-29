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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: `Leseverstehen B2 – ${APP_NAME}`,
};

export default function LesenPage() {
  return (
    <div className="section-padding">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/20 p-6 shadow-lg shadow-slate-900/5 sm:p-10">
          <PageHeader
            title="Leseverstehen für BSK B2"
            description="Trainiere berufliche Texte mit klaren Aufgaben, gut gegliederten Lösungen und einer ruhigen Lernstruktur."
            badge={
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Lesen im Beruf
              </span>
            }
            className="text-center sm:text-left"
          >
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/trainer/lesen">Zum Lesetrainer</Link>
            </Button>
          </PageHeader>
        </div>

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
