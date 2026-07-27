import { PenTool, FileText } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: `Schreiben B2 – ${APP_NAME}`,
};

const templates = [
  {
    title: "Terminabsage / Terminverschiebung",
    type: "E-Mail",
    situation:
      "Sie können an einem vereinbarten Termin nicht teilnehmen und schlagen einen neuen Termin vor.",
    structure: [
      "Betreff nennen (z. B. Terminabsage – [Thema] am [Datum])",
      "Höfliche Anrede",
      "Absage mit kurzem Grund",
      "Alternativtermin vorschlagen",
      "Bitte um Rückmeldung",
      "Grußformel",
    ],
    example: `Betreff: Terminabsage – Besprechung am 15.07.

Sehr geehrte Frau Becker,

leider muss ich unseren Termin am 15.07. absagen, da ich an diesem Tag krankgeschrieben bin.

Könnten wir den Termin auf den 18.07. verschieben? Ich bin am Vormittag und Nachmittag verfügbar.

Ich wäre Ihnen dankbar, wenn Sie mir kurz Bescheid geben könnten.

Mit freundlichen Grüßen
Max Mustermann`,
  },
  {
    title: "Beschwerde / Reklamation",
    type: "E-Mail / Brief",
    situation:
      "Sie haben ein Problem mit einer Lieferung oder Dienstleistung und möchten sich beschweren.",
    structure: [
      "Betreff mit Bestell-/Rechnungsnummer",
      "Sachliche Beschreibung des Problems",
      "Angabe von Datum und Fakten",
      "Konkrete Lösung oder Frist nennen",
      "Höflicher Schluss",
    ],
    example: `Betreff: Reklamation – Bestellung Nr. 12345

Sehr geehrte Damen und Herren,

am 10.06. bestellte ich bei Ihnen 50 Bürostühle. Leider wurden nur 40 Stühle geliefert. Zudem ist einer der gelieferten Stühle beschädigt.

Ich bitte Sie, die fehlenden 10 Stühle innerhalb der nächsten fünf Werktage nachzuliefern und den beschädigten Stuhl auszutauschen.

Anbei finden Sie den Lieferschein und ein Foto des beschädigten Stuhls.

Mit freundlichen Grüßen
Anna Müller`,
  },
  {
    title: "Anfrage / Information erbitten",
    type: "E-Mail",
    situation:
      "Sie benötigen Informationen zu einem Produkt, einer Stelle oder einem Verfahren.",
    structure: [
      "Betreff nennen",
      "Kurze Vorstellung, wer man ist",
      "Genau beschreiben, welche Informationen man braucht",
      "Fragen Sie nach Fristen oder nächsten Schritten",
      "Höflichen Abschluss",
    ],
    example: `Betreff: Anfrage zu Weiterbildungsmöglichkeiten

Sehr geehrte Frau Weber,

ich arbeite seit einem Jahr in der Verwaltung Ihres Unternehmens und interessiere mich für eine Weiterbildung im Bereich Projektmanagement.

Könnten Sie mir mitteilen, welche internen oder externen Kurse angeboten werden und ob die Kosten von der Firma übernommen werden?

Über eine Rückmeldung bis Ende des Monats würde ich mich freuen.

Mit freundlichen Grüßen
Thomas Becker`,
  },
  {
    title: "Bewerbung",
    type: "Anschreiben",
    situation: "Sie bewerben sich auf eine ausgeschriebene Stelle.",
    structure: [
      "Betreff mit Stellenbezeichnung",
      "Interesse an der Stelle begründen",
      "Qualifikationen und Erfahrungen nennen",
      "Verfügbarkeit und Gehaltsvorstellung falls gefragt",
      "Höflicher Abschluss mit Anlagehinweis",
    ],
    example: `Betreff: Bewerbung als Sachbearbeiter (Stellenanzeige Nr. 456)

Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihre Stellenanzeige für den Sachbearbeiter gelesen. Aufgrund meiner mehrjährigen Erfahrung in der Verwaltung bin ich überzeugt, dass ich Ihr Team gut ergänzen kann.

In meiner bisherigen Tätigkeit war ich für die Bearbeitung von Anträgen, die Terminplanung und die Kundenkommunikation zuständig. Zudem beherrsche ich die gängigen Office-Programme sehr gut.

Über die Einladung zu einem persönlichen Gespräch würde ich mich sehr freuen.

Mit freundlichen Grüßen
Leyla Özdemir

Anlagen: Lebenslauf, Zeugnisse`,
  },
  {
    title: "Interne Mitteilung",
    type: "E-Mail / Notiz",
    situation:
      "Sie informieren Kolleginnen und Kollegen über eine wichtige Änderung oder einen Termin.",
    structure: [
      "Betreff kurz und prägnant",
      "Wichtigste Information zuerst",
      "Einzelheiten in Stichpunkten",
      "Handlungsaufforderung und Frist",
      "Kurzer Abschluss",
    ],
    example: `Betreff: Neue Schulung zur Software – Anmeldung bis 18.08.

Liebes Team,

wie bereits angekündigt, wird ab dem 01.09. die neue Software eingeführt. Alle Mitarbeitenden erhalten dazu eine Schulung.

• Termin: 25.08. um 14 Uhr
• Ort: Konferenzraum 2
• Dauer: ca. 2 Stunden

Bitte melden Sie sich bis zum 18.08. bei Frau Meier an.

Viele Grüße
Sandra`,
  },
  {
    title: "Zusammenfassung",
    type: "Text",
    situation:
      "Sie sollen einen längeren Text oder ein Gespräch kurz und sachlich zusammenfassen.",
    structure: [
      "Hauptthema in einem Satz nennen",
      "Wichtigste Argumente oder Fakten wiedergeben",
      "Eigene Schlussfolgerung oder Fazit",
    ],
    example: `Aufgabe: Fassen Sie den Text in 40–50 Wörtern zusammen.

Text: Das Unternehmen führt ab nächstem Monat eine neue Software ein. Alle Mitarbeitenden erhalten eine Schulung. Bei Verhinderung ist die Personalabteilung zu informieren. Ziel ist die Reduzierung von Fehlern und eine bessere Zusammenarbeit.

Lösung: Ab nächstem Monat wird im Unternehmen eine neue Software eingeführt. Mitarbeitende erhalten dafür eine Schulung. Bei Verhinderung muss die Personalabteilung informiert werden. Ziel sind weniger Fehler und eine bessere Zusammenarbeit.`,
  },
];

export default function SchreibenPage() {
  return (
    <div className="flex-1 py-12 container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Schreiben für BSK B2
        </h1>
        <p className="text-muted-foreground text-lg">
          Templates und Musterlösungen für E-Mails, Briefe und Prüfungstexte.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
        {templates.map((t) => (
          <Card key={t.title} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-fit rounded-xl bg-primary/10 p-3 text-primary shrink-0">
                    <PenTool className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{t.title}</CardTitle>
                    <CardDescription>{t.situation}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">
                  <FileText className="h-3 w-3 mr-1" />
                  {t.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Aufbau</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  {t.structure.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="rounded-lg bg-muted/60 p-4">
                <h4 className="font-semibold mb-2">Musterlösung</h4>
                <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                  {t.example}
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
