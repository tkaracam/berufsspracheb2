export interface ExamModule {
  id: string;
  icon: string;
  title: string;
  desc: string;
  duration: string;
  points: number;
  strategy: string[];
  example: {
    title: string;
    text: string;
  };
}

export const examModules: ExamModule[] = [
  {
    id: "lesen",
    icon: "BookOpen",
    title: "Lesen",
    desc: "4 Teile, 45 Minuten: Artikel zuordnen, Einweisungen verstehen, Rahmenbedingungen und Aufgabenverteilung nachvollziehen.",
    duration: "45 Min.",
    points: 60,
    strategy: [
      "Lesen Sie zuerst die Aufgabenstellung, dann den Text.",
      "Achten Sie bei Zuordnungsaufgaben auf Täuscher – nicht jedes Detail passt.",
      "Unterstreichen Sie Schlüsselwörter in den Fragen.",
      "Bearbeiten Sie zuerst die leichteren Teile, wenn Sie unsicher sind.",
    ],
    example: {
      title: "Lesen Teil 1 – Zuordnung",
      text: `Sie lesen online in einer Wirtschaftszeitung. Entscheiden Sie, welcher Artikel a – h zu welcher Person 1 – 5 passt.

Beispiel:
1. Elena weiß nicht, wie es nach ihrer Ausbildung weitergeht.
2. Joaquin überlegt, welche Weiterbildung er als Nächstes machen kann.

Lösung: 1 – f, 2 – c`,
    },
  },
  {
    id: "lesen-schreiben",
    icon: "PenTool",
    title: "Lesen und Schreiben",
    desc: "2 Teile, 20 Minuten: Beschwerden/Anweisungen verstehen und darauf schriftlich reagieren.",
    duration: "20 Min.",
    points: 13,
    strategy: [
      "Lesen Sie die Ausgangssituation genau.",
      "Notieren Sie, auf welche Punkte Sie eingehen müssen.",
      "Schreiben Sie höflich, sachlich und vollständig.",
      "Prüfen Sie Anrede, Betreff und Grußformel.",
    ],
    example: {
      title: "Lesen und Schreiben Teil 2 – Auf Beschwerden reagieren",
      text: `Sie erhalten eine Beschwerde eines Kunden. Schreiben Sie eine Antwort.

Aufgabenpunkte:
• sich für das Problem entschuldigen
• eine Erklärung geben
• eine Lösung oder einen Ausgleich anbieten`,
    },
  },
  {
    id: "hoeren",
    icon: "Headphones",
    title: "Hören",
    desc: "4 Teile, 20 Minuten: Arbeitsabläufe, Argumentationen, betriebliche Informationen und Anliegen erfassen.",
    duration: "20 Min.",
    points: 60,
    strategy: [
      "Lesen Sie die Fragen, bevor der Text beginnt.",
      "Konzentrieren Sie sich auf Zahlen, Namen, Fristen und Tätigkeiten.",
      "Hören Sie auf Signalwörter wie „allerdings\", „deshalb\", „zuerst\".",
      "Machen Sie sich Stichnotizen.",
    ],
    example: {
      title: "Hören Teil 1 – Richtig / Falsch",
      text: `Hörtext: Ein Vorgesetzter bespricht mit dem Team den Ablauf der nächsten Woche.

Aussage: „Die Besprechung findet am Montag um 8 Uhr statt."
Antwort: Falsch – der Text nennt Dienstag um 9 Uhr.`,
    },
  },
  {
    id: "hoeren-schreiben",
    icon: "Mic",
    title: "Hören und Schreiben",
    desc: "2 Teile, 5 Minuten: Kundenanfragen entgegennehmen und dokumentieren.",
    duration: "5 Min.",
    points: 9,
    strategy: [
      "Hören Sie gezielt nach Wer, Was, Wann, Warum.",
      "Übertragen Sie die Informationen vollständig.",
      "Achten Sie auf Höflichkeitsformen.",
      "Schreiben Sie kurz und präzise.",
    ],
    example: {
      title: "Hören und Schreiben Teil 2 – Kundenanfrage dokumentieren",
      text: `Hörtext: Eine Kundin ruft an und möchte einen Termin für nächste Woche Mittwoch um 14 Uhr vereinbaren.

Aufgabe: Notieren Sie Name, Wunschtermin und Anliegen.`,
    },
  },
  {
    id: "sprachbausteine",
    icon: "Puzzle",
    title: "Sprachbausteine und Schreiben",
    desc: "3 Teile, 35 Minuten: Rückfragen zu Bewerbungen, Anfragen reagieren, Forumsbeitrag schreiben.",
    duration: "35 Min.",
    points: 60,
    strategy: [
      "Lesen Sie den ganzen Satz, bevor Sie die Lücke füllen.",
      "Achten Sie auf feste Verbindungen und Kasus.",
      "Beim Forumsbeitrag: eigene Meinung mit Beispielen begründen.",
      "Reservieren Sie Zeit für das Korrekturlesen.",
    ],
    example: {
      title: "Sprachbausteine Teil 3 – Forumsbeitrag",
      text: `Thema: „Sollte Homeoffice für alle Arbeitnehmer ein Recht sein?"

Schreiben Sie einen Forumsbeitrag (ca. 120 Wörter). Gehen Sie auf:
• Ihre Meinung
• ein Argument dafür und eins dagegen
• ein Beispiel aus Ihrer Erfahrung`,
    },
  },
  {
    id: "sprechen",
    icon: "MessageCircle",
    title: "Sprechen",
    desc: "3 Teile, ca. 16 Minuten: Über ein Thema sprechen, informelles Gespräch, Lösungswege diskutieren.",
    duration: "ca. 16 Min.",
    points: 60,
    strategy: [
      "Strukturieren Sie Ihren Beitrag: Einleitung – Hauptteil – Schluss.",
      "Reagieren Sie auf Ihre Gesprächspartnerin / Ihren Gesprächspartner.",
      "Verwenden Sie Redemittel wie „Einerseits ... andererseits\".",
      "Sprechen Sie deutlich und nicht zu schnell.",
    ],
    example: {
      title: "Sprechen Teil 1A – Über ein Thema sprechen",
      text: `Wählen Sie ein Thema und sprechen Sie ca. zwei Minuten darüber.

Themen (Beispiele):
• Weiterbildung am Arbeitsplatz
• Homeoffice und Teamarbeit
• Gesunde Ernährung im Betrieb`,
    },
  },
];

export const examInfo = {
  totalPoints: 240,
  passPercentage: 60,
  minSkillPoints: 36,
  compensableMinPercentage: 40,
  writtenDurationMinutes: 125,
  oralDurationMinutes: 16,
};
