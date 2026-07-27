"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Faq {
  question: string;
  answer: string;
}

interface Props {
  faqs?: Faq[];
  title?: string;
  subtitle?: string;
}

const defaultFaqs = [
  {
    question: "Wie bereite ich mich am besten auf den B2-Kurs vor?",
    answer:
      "Starten Sie mit dem Fachwortschatz zu Ihrem Berufsfeld, üben Sie dann Nomen-Verb-Verbindungen und arbeiten Sie sich Schritt für Schritt durch die Kommunikationsmodule und das Prüfungstraining.",
  },
  {
    question: "Ist die Plattform wirklich kostenlos?",
    answer:
      "Ja, der Großteil der Inhalte ist kostenlos nutzbar. Mit einer kostenlosen Registrierung können Sie Favoriten speichern und Ihren Lernfortschritt verfolgen.",
  },
  {
    question: "Welche Prüfungsteile werden abgedeckt?",
    answer:
      "Alle vier Prüfungsteile: Lesen, Hören, Schreiben und Sprechen. Zu jedem Teil gibt es gezielte Übungen und Beispielaufgaben.",
  },
  {
    question: "Kann ich die Inhalte auf dem Handy nutzen?",
    answer:
      "Ja, die Plattform ist vollständig responsiv und funktioniert auf Smartphone, Tablet und Desktop.",
  },
  {
    question: "Für wen ist BSK B2 geeignet?",
    answer:
      "Für alle Teilnehmer eines Berufssprachkurses B2 (DTZ, EoB) sowie für Berufstätige, die ihre Deutschkenntnisse im beruflichen Kontext verbessern möchten.",
  },
];

export function FaqSection({
  faqs = defaultFaqs,
  title = "Häufig gestellte Fragen",
  subtitle = "Antworten zu den wichtigsten Fragen rund um das Lernen mit BSK B2.",
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t bg-muted/30 px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border bg-card text-card-foreground shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium transition-colors hover:bg-muted/50"
                >
                  {faq.question}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      open && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    open ? "max-h-96" : "max-h-0"
                  )}
                >
                  <p className="px-5 pb-4 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
