import Link from "next/link";
import { MessageCircle, CheckCircle, Play } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: `Redemittel B2 – ${APP_NAME}`,
};

const sections = [
  {
    title: "Argumentieren",
    desc: "Eigene Meinung begründen und einbringen.",
    phrases: [
      "Aus meiner Sicht / Aus meiner Perspektive …",
      "Ich bin der Meinung, dass …",
      "Das lässt sich dadurch erklären, dass …",
      "Ein wichtiges Argument dafür ist …",
      "Im Gegensatz dazu / Im Vergleich dazu …",
    ],
  },
  {
    title: "Einleiten",
    desc: "Ein Thema oder einen Text einführen.",
    phrases: [
      "Zunächst einmal möchte ich auf … eingehen.",
      "Im Folgenden geht es um …",
      "Was … betrifft, so …",
      "Vor dem Hintergrund …",
      "In diesem Zusammenhang ist zu erwähnen, dass …",
    ],
  },
  {
    title: "Überleiten",
    desc: "Zwischen Absätzen und Gedanken verbinden.",
    phrases: [
      "Darüber hinaus …",
      "Hinzu kommt, dass …",
      "Außerdem ist anzumerken, dass …",
      "Ebenso wichtig ist …",
      "Andererseits muss man bedenken, dass …",
    ],
  },
  {
    title: "Gegenteil / Einschränkung",
    desc: "Differenziert argumentieren.",
    phrases: [
      "Allerdings …",
      "Trotzdem / Dennoch …",
      "Obwohl …",
      "Das mag zwar stimmen, aber …",
      "Nicht zu vergessen ist …",
    ],
  },
  {
    title: "Beispiele nennen",
    desc: "Abstrakte Aussagen konkretisieren.",
    phrases: [
      "Zum Beispiel …",
      "Ein konkretes Beispiel dafür ist …",
      "Das zeigt sich besonders bei …",
      "In der Praxis bedeutet das …",
    ],
  },
  {
    title: "Schlussfolgern & Beenden",
    desc: "Einen Text oder Beitrag abschließen.",
    phrases: [
      "Zusammenfassend lässt sich sagen, dass …",
      "Alles in allem bin ich der Auffassung, dass …",
      "Abschließend möchte ich betonen, dass …",
      "Unter Berücksichtigung aller Aspekte …",
      "Ich komme zu dem Schluss, dass …",
    ],
  },
  {
    title: "Höflichkeit & Diplomatie",
    desc: "Schwierige Themen vorsichtig ansprechen.",
    phrases: [
      "Ich hätte noch eine kleine Anmerkung.",
      "Vielleicht könnten wir das noch einmal überdenken.",
      "Es wäre hilfreich, wenn …",
      "Ich möchte nicht zu direkt klingen, aber …",
      "Könnten Sie mir dazu bitte Ihre Meinung sagen?",
    ],
  },
  {
    title: "E-Mails & Briefe",
    desc: "Formelle Schriftkommunikation einleiten und beenden.",
    phrases: [
      "Sehr geehrte Damen und Herren,",
      "Ich schreibe Ihnen bezüglich / in Sachen …",
      "Ich wäre Ihnen dankbar, wenn Sie …",
      "Bitte teilen Sie mir mit, ob …",
      "Mit freundlichen Grüßen / Mit freundlichem Gruß",
    ],
  },
];

export default function RedemittelPage() {
  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Redemittel für BSK B2
        </h1>
        <p className="text-muted-foreground text-lg">
          Feste Wendungen für Diskussionen, Präsentationen, E-Mails und
          Prüfungen.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/trainer/redemittel">
              <Play className="mr-2 h-4 w-4" /> Zum Redemittel-Trainer
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {sections.map((section) => (
          <Card key={section.title} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-fit rounded-xl bg-primary/10 p-3 text-primary mb-3">
                <MessageCircle className="h-6 w-6" />
              </div>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {section.phrases.map((phrase, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="italic">{phrase}</span>
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
