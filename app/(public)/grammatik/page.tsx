import { BookOpen, CheckCircle } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: `Grammatik B2 – ${APP_NAME}`,
};

const topics = [
  {
    title: "Konjunktiv I – Indirekte Rede",
    desc: "Wiedergabe von Äußerungen ohne eigene Wertung.",
    explanation:
      "Im Beruf verwendet man den Konjunktiv I, um Meinungen, Ankündigungen oder Auskünfte anderer sachlich wiederzugeben.",
    examples: [
      "Der Geschäftsführer sagte, die Einführung der Software sei für September geplant.",
      "Die Kollegin teilte mit, sie habe den Bericht bereits fertiggestellt.",
      "Laut Personalabteilung werde die Stelle nächste Woche ausgeschrieben.",
    ],
  },
  {
    title: "Konjunktiv II – Höfliche Bitte & Irrealis",
    desc: "Höfliche Anfragen und unrealistische Annahmen.",
    explanation:
      "Mit dem Konjunktiv II drückt man höfliche Bitten, Ratschläge oder nicht erfüllbare Bedingungen aus.",
    examples: [
      "Könnten Sie mir bitte die Unterlagen zusenden?",
      "Ich würde den Termin gern auf nächste Woche verschieben.",
      "An Ihrer Stelle würde ich mich vorab mit der Abteilung abstimmen.",
    ],
  },
  {
    title: "Passiv",
    desc: "Handlungen sachlich und ohne Handelnden formulieren.",
    explanation:
      "Das Passiv eignet sich besonders für Berichte, Anleitungen und formelle Mitteilungen.",
    examples: [
      "Die Rechnung wurde am Montag überwiesen.",
      "Die Ware muss bis Freitag geliefert werden.",
      "Es wurde beschlossen, die Besprechung zu verschieben.",
    ],
  },
  {
    title: "Partizipialkonstruktionen",
    desc: "Sätze verkürzen und prägnanter machen.",
    explanation:
      "Partizipialkonstruktionen ersetzen Nebensätze und machen Texte kompakter.",
    examples: [
      "Der von der Geschäftsführung genehmigte Antrag liegt vor.",
      "Die gestern verschickte E-Mail enthielt alle Unterlagen.",
      "Von allen Mitarbeitenden unterschrieben, wurde der Vertrag zurückgeschickt.",
    ],
  },
  {
    title: "Nominalisierung",
    desc: "Verben und Adjektive in Substantive umwandeln.",
    explanation:
      "Nominalisierungen wirken besonders in formellen Texten wie Berichten oder E-Mails sachlicher.",
    examples: [
      "Das Schreiben von E-Mails nimmt viel Zeit in Anspruch.",
      "Die Einführung der neuen Software ist für September geplant.",
      "Wir bitten um eine schnelle Bearbeitung Ihres Antrags.",
    ],
  },
  {
    title: "Konnektoren",
    desc: "Sätze logisch miteinander verbinden.",
    explanation:
      "Konnektoren helfen, Zusammenhänge klar herauszustellen und den Text flüssig zu gestalten.",
    examples: [
      "Zwar ist die Software teuer, aber sie spart langfristig Zeit.",
      "Angesichts der aktuellen Lage verschieben wir das Meeting.",
      "Dennoch sollten wir die Frist einhalten.",
    ],
  },
  {
    title: "Modalpartikeln",
    desc: "Gespräche natürlicher und höflicher klingen lassen.",
    explanation:
      "Modalpartikeln wie „ja“, „doch“, „halt“, „eben“, „wohl“ verleihen gesprochener Sprache den passenden Ton.",
    examples: [
      "Das ist ja eine gute Idee.",
      "Das Problem ist halt komplexer als gedacht.",
      "Er kommt wohl erst morgen zurück.",
    ],
  },
];

export default function GrammatikPage() {
  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Grammatik für BSK B2
        </h1>
        <p className="text-muted-foreground text-lg">
          Die wichtigsten Strukturen für den Berufssprachkurs und den
          Deutsch-Test für den Beruf B2.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {topics.map((topic) => (
          <Card key={topic.title} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-fit rounded-xl bg-primary/10 p-3 text-primary mb-3">
                <BookOpen className="h-6 w-6" />
              </div>
              <CardTitle>{topic.title}</CardTitle>
              <CardDescription>{topic.desc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{topic.explanation}</p>
              <ul className="space-y-2 text-sm">
                {topic.examples.map((example, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="italic">„{example}“</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
