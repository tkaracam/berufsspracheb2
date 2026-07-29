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
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

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
    <div className="section-padding">
      <Container>
        <PageHeader
          title="Redemittel für BSK B2"
          description="Feste Wendungen für Diskussionen, Präsentationen, E-Mails und Prüfungen."
          className="text-center sm:text-left"
        >
          <Button asChild>
            <Link href="/trainer/redemittel">
              <Play className="mr-2 h-4 w-4" /> Zum Redemittel-Trainer
            </Link>
          </Button>
        </PageHeader>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.title} className="transition-all hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {section.phrases.map((phrase, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="italic text-muted-foreground">{phrase}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
