export interface CommunicationModule {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tips: string[];
  redemittel: string[];
  example: {
    title: string;
    text: string;
  };
}

export const communicationModules: CommunicationModule[] = [
  {
    id: "telefonieren",
    icon: "Phone",
    title: "Telefonieren im Beruf",
    desc: "Höflich und zielgerichtet am Telefon kommunizieren.",
    tips: [
      "Sagen Sie gleich am Anfang, wer Sie sind und wen Sie sprechen möchten.",
      "Nennen Sie kurz den Grund Ihres Anrufs.",
      "Notieren Sie sich wichtige Informationen während des Gesprächs.",
      "Fassen Sie am Ende zusammen, was vereinbart wurde.",
    ],
    redemittel: [
      "Guten Tag, hier spricht [Name] von [Firma].",
      "Könnten Sie mich bitte mit Herrn/Frau [Name] verbinden?",
      "Ich rufe an wegen …",
      "Könnten Sie mir das bitte noch einmal erklären?",
      "Vielen Dank für Ihre Hilfe. Auf Wiederhören.",
    ],
    example: {
      title: "Beispielgespräch",
      text: `A: Guten Tag, hier spricht Maria Schmidt von der Logistik GmbH. Kann ich bitte Herrn Müller sprechen?\nB: Einen Moment, ich verbinde Sie.\nA: Danke.\nC: Müller am Apparat.\nA: Guten Tag, Herr Müller. Ich rufe an wegen der Lieferung vom 12. Juni. Der Lieferschein stimmt nicht mit der Bestellung überein.\nC: Das tut mir leid. Können Sie mir die Auftragsnummer nennen?\nA: Ja, gerne. Es ist die Nummer 45892.\nC: Vielen Dank. Ich prüfe das sofort und melde mich bis morgen zurück.\nA: Das wäre sehr nett. Auf Wiederhören, Herr Müller.`,
    },
  },
  {
    id: "emails",
    icon: "Mail",
    title: "E-Mails schreiben",
    desc: "Klare, höfliche und professionelle E-Mails verfassen.",
    tips: [
      "Verwenden Sie einen präzisen Betreff.",
      "Beginnen Sie mit einer höflichen Anrede.",
      "Strukturieren Sie die E-Mail in Einleitung, Hauptteil und Schluss.",
      "Vermeiden Sie umgangssprachliche Abkürzungen.",
    ],
    redemittel: [
      "Betreff: Terminabsage – [Datum]",
      "Sehr geehrte Damen und Herren,",
      "Ich schreibe Ihnen bezüglich …",
      "Ich wäre Ihnen dankbar, wenn Sie mir bis … Bescheid geben könnten.",
      "Mit freundlichen Grüßen",
    ],
    example: {
      title: "Beispiel-E-Mail",
      text: `Betreff: Terminabsage – Besprechung am 15.07.\n\nSehr geehrte Frau Becker,\n\nleider muss ich unseren Termin am 15.07. absagen, da ich an diesem Tag krankgeschrieben bin.\n\nKönnten wir den Termin auf den 18.07. verschieben? Ich bin am Vormittag und Nachmittag verfügbar.\n\nIch wäre Ihnen dankbar, wenn Sie mir kurz Bescheid geben könnten.\n\nMit freundlichen Grüßen\nMax Mustermann\nMusterfirma GmbH`,
    },
  },
  {
    id: "beschwerden",
    icon: "AlertTriangle",
    title: "Beschwerden formulieren",
    desc: "Reklamationen sachlich und lösungsorientiert ausdrücken.",
    tips: [
      "Beschreiben Sie das Problem genau (Wann? Was? Wo?).",
      "Bleiben Sie sachlich und höflich.",
      "Nennen Sie eine konkrete Lösung oder Frist.",
      "Fügen Sie Belege bei (Rechnung, Fotos).",
    ],
    redemittel: [
      "Leider muss ich mich über … beschweren.",
      "Bei der Lieferung vom [Datum] fehlten folgende Artikel: …",
      "Ich bitte Sie, den Fehler innerhalb von … zu beheben.",
      "Sollte keine Lösung gefunden werden, behalte ich mir vor, …",
      "Ich freue mich auf eine zeitnahe Rückmeldung.",
    ],
    example: {
      title: "Beispiel-Beschwerde",
      text: `Sehr geehrte Damen und Herren,\n\nam 10.06. bestellte ich bei Ihnen 50 Bürostühle. Leider wurden nur 40 Stühle geliefert. Zudem ist einer der gelieferten Stühle beschädigt.\n\nIch bitte Sie, die fehlenden 10 Stühle innerhalb der nächsten fünf Werktage nachzuliefern und den beschädigten Stuhl auszutauschen.\n\nAnbei finden Sie den Lieferschein und ein Foto des beschädigten Stuhls.\n\nMit freundlichen Grüßen\nAnna Müller`,
    },
  },
  {
    id: "termine",
    icon: "Calendar",
    title: "Termine vereinbaren",
    desc: "Termine vorschlagen, bestätigen und verschieben.",
    tips: [
      "Machen Sie gleich mehrere Terminvorschläge.",
      "Nennen Sie Dauer und Ort/Zugangsdaten.",
      "Bestätigen Sie den Termin schriftlich.",
    ],
    redemittel: [
      "Ich schlage Ihnen folgende Termine vor: …",
      "Passt es Ihnen am [Datum] um [Uhrzeit]?",
      "Könnten wir den Termin leider verschieben?",
      "Vielen Dank für die Terminbestätigung.",
      "Ich freue mich auf unser Gespräch.",
    ],
    example: {
      title: "Beispiel",
      text: `Sehr geehrter Herr Schmidt,\n\nich schlage Ihnen für unsere Besprechung folgende Termine vor:\n\n- Dienstag, 12.07. um 10:00 Uhr\n- Mittwoch, 13.07. um 14:00 Uhr\n\nDas Meeting würde etwa 45 Minuten dauern und findet online über Teams statt.\n\nBitte teilen Sie mir mit, welcher Termin Ihnen passt.\n\nMit freundlichen Grüßen\nLisa Weber`,
    },
  },
  {
    id: "meetings",
    icon: "Users",
    title: "Meetings",
    desc: "An Meetings teilnehmen und eigene Punkte einbringen.",
    tips: [
      "Hören Sie anderen aufmerksam zu.",
      "Notieren Sie sich wichtige Aufgaben.",
      "Bringen Sie Ihre Meinung klar und höflich ein.",
    ],
    redemittel: [
      "Darf ich noch etwas dazu sagen?",
      "Ich bin der Meinung, dass …",
      "Ich stimme Ihnen zu, allerdings …",
      "Könnten wir das kurz zusammenfassen?",
      "Wer übernimmt diese Aufgabe?",
    ],
    example: {
      title: "Beispiel",
      text: `Leitung: Dann kommen wir zum nächsten Punkt. Wer hat etwas zum Thema Qualitätskontrolle zu sagen?\n\nTeilnehmer: Ich hätte einen Vorschlag. Wir könnten die Kontrolle am Ende jedes Arbeitsschritts durchführen. Das würde Fehler frühzeitig erkennen.\n\nLeitung: Gute Idee. Wer übernimmt die Umsetzung?\n\nTeilnehmer: Ich kümmere mich darum und erstelle bis Freitag einen Plan.`,
    },
  },
  {
    id: "konflikte",
    icon: "Handshake",
    title: "Konflikte am Arbeitsplatz",
    desc: "Schwierige Gespräche konstruktiv führen.",
    tips: [
      "Beschreiben Sie das Verhalten, nicht die Person.",
      "Sagen Sie, wie Sie sich fühlen und was Sie brauchen.",
      "Suchen Sie gemeinsam nach einer Lösung.",
    ],
    redemittel: [
      "Ich habe das Gefühl, dass …",
      "Es wäre hilfreich, wenn …",
      "Wie können wir das gemeinsam lösen?",
      "Ich möchte keine Schuldzuweisungen machen, aber …",
      "Lassen Sie uns einen Kompromiss finden.",
    ],
    example: {
      title: "Beispiel",
      text: `A: Ich möchte kurz mit dir sprechen. Ich habe das Gefühl, dass die Termine in letzter Zeit oft nicht eingehalten werden. Das macht die Zusammenarbeit schwierig.\n\nB: Das verstehe ich. In der letzten Woche gab es Lieferverzögerungen.\n\nA: Können wir gemeinsam schauen, wie wir das besser planen? Es wäre hilfreich, wenn wir uns jeden Morgen kurz abstimmen.\n\nB: Gute Idee. Dann machen wir ein kurzes Daily-Meeting.`,
    },
  },
  {
    id: "bewerbungsgespraech",
    icon: "MessageSquare",
    title: "Bewerbungsgespräch",
    desc: "Sich im Vorstellungsgespräch überzeugend präsentieren.",
    tips: [
      "Bereiten Sie konkrete Beispiele aus Ihrer Erfahrung vor.",
      "Kleiden Sie sich passend zum Betrieb.",
      "Stellen Sie selbst Fragen zum Unternehmen.",
    ],
    redemittel: [
      "Ich habe [X Jahre] Erfahrung in …",
      "Meine Stärken sind …",
      "In meiner letzten Position habe ich …",
      "Was erwarten Sie von der neuen Mitarbeiterin/vom neuen Mitarbeiter?",
      "Vielen Dank für das informative Gespräch.",
    ],
    example: {
      title: "Beispielfragen & Antworten",
      text: `Frage: Erzählen Sie etwas über sich.\nAntwort: Ich bin Fachkraft für Lagerlogistik und habe drei Jahre Erfahrung im Kommissionieren und Versand. Ich arbeite genau und teamorientiert.\n\nFrage: Warum möchten Sie bei uns arbeiten?\nAntwort: Ihr Unternehmen ist bekannt für gute Ausbildung und faire Arbeitsbedingungen. Ich möchte mich weiterentwickeln und langfristig Teil des Teams werden.`,
    },
  },
  {
    id: "rechte",
    icon: "Scale",
    title: "Rechte und Pflichten",
    desc: "Wichtige Begriffe aus dem Arbeitsrecht verstehen.",
    tips: [
      "Lesen Sie Ihren Arbeitsvertrag sorgfältig.",
      "Informieren Sie sich über Kündigungsfristen und Urlaubsanspruch.",
      "Wichtige Dokumente immer schriftlich verlangen.",
    ],
    redemittel: [
      "Mein Arbeitsvertrag sieht … vor.",
      "Ich habe Anspruch auf …",
      "Laut Gesetz gilt …",
      "Könnten Sie mir das schriftlich bestätigen?",
      "Ich würde das gerne mit dem Betriebsrat besprechen.",
    ],
    example: {
      title: "Wichtige Begriffe",
      text: `• Arbeitsvertrag: schriftliche Vereinbarung zwischen Arbeitgeber und Arbeitnehmer\n• Probezeit: erste Monate im Job, oft mit kürzerer Kündigungsfrist\n• Urlaubsanspruch: gesetzlich mindestens 24 Werktage bei einer 6-Tage-Woche\n• Kündigungsfrist: Zeit, die Arbeitgeber oder Arbeitnehmer einhalten müssen\n• Betriebsrat: Vertretung der Arbeitnehmer, die bei Problemen hilft`,
    },
  },
  {
    id: "arbeitsantritt",
    icon: "DoorOpen",
    title: "Arbeitsantritt & Onboarding",
    desc: "Den ersten Tag und die Einarbeitung meistern.",
    tips: [
      "Halten Sie wichtige Kontaktdaten bereit (HR, Vorgesetzte, IT).",
      "Fragen Sie gezielt nach Ihren Aufgaben und Zuständigkeiten.",
      "Notieren Sie sich wichtige Abläufe und Fachbegriffe.",
      "Beteiligen Sie sich aktiv an der Einarbeitung.",
    ],
    redemittel: [
      "Wann bekomme ich meine Zugangsdaten?",
      "Wer ist meine Ansprechperson für …?",
      "Könnten Sie mir den Ablauf noch einmal erklären?",
      "Ich habe noch eine Frage zu meinen Aufgaben.",
      "Vielen Dank für die Einführung.",
    ],
    example: {
      title: "Beispiel",
      text: `Neuer Mitarbeiter: Guten Tag, ich bin der neue Mitarbeiter in der Verwaltung. Mein Name ist Ali Yilmaz.\n\nKollegin: Herzlich willkommen! Ich zeige Ihnen heute Ihren Arbeitsplatz und die wichtigsten Programme. Falls Sie Fragen haben, sprechen Sie mich einfach an.\n\nNeuer Mitarbeiter: Vielen Dank. Wann bekomme ich meine E-Mail-Zugangsdaten?\n\nKollegin: Die IT schickt Ihnen die Zugangsdaten bis heute Nachmittag per E-Mail.`,
    },
  },
  {
    id: "smalltalk",
    icon: "Coffee",
    title: "Smalltalk & soziale Kontakte",
    desc: "Sich mit Kolleginnen und Kollegen zwanglos unterhalten.",
    tips: [
      "Beginnen Sie mit neutralen Themen (Wochenende, Wetter, Freizeit).",
      "Vermeiden Sie zu private oder heikle Themen.",
      "Zeigen Sie echtes Interesse und hören Sie zu.",
      "Beenden Sie Smalltalk höflich, wenn die Arbeit ruft.",
    ],
    redemittel: [
      "Haben Sie schöne Wochenendepläne?",
      "Wie war Ihr Feierabend gestern?",
      "Das Wetter ist ja wirklich schön heute.",
      "Entschuldigung, ich muss dann mal weiterarbeiten.",
      "Hatten Sie einen guten Start in die Woche?",
    ],
    example: {
      title: "Beispiel",
      text: `A: Guten Morgen! Hatten Sie ein schönes Wochenende?\n\nB: Ja, danke. Wir waren wandern. Und Sie?\n\nA: Ich habe mich ausgeruht und Freunde getroffen. Übrigens, haben Sie die E-Mail vom Chef gesehen?\n\nB: Ja, die Besprechung wurde verschoben.`,
    },
  },
  {
    id: "dienstreise",
    icon: "Plane",
    title: "Dienstreise & Außenkontakte",
    desc: "Kunden und Partner vor Ort professionell betreuen.",
    tips: [
      "Bereiten Sie Termine und Unterlagen gut vor.",
      "Informieren Sie sich über die Gepflogenheiten des Gegenübers.",
      "Notieren Sie Vereinbarungen direkt vor Ort.",
      "Reichen Sie Reisekosten zeitnah ein.",
    ],
    redemittel: [
      "Ich freue mich, Sie persönlich kennenzulernen.",
      "Lassen Sie uns die Details besprechen.",
      "Könnten Sie mir Ihre Visitenkarte geben?",
      "Ich fasse kurz zusammen, was wir vereinbart haben.",
      "Ich melde mich nächste Woche schriftlich.",
    ],
    example: {
      title: "Beispiel",
      text: `Mitarbeiter: Guten Tag, Frau Dr. Maier. Schön, dass wir uns endlich persönlich treffen.\n\nKundin: Guten Tag, Herr Schulz. Willkommen in unserem Haus.\n\nMitarbeiter: Ich würde gerne unsere nächsten Schritte besprechen und Ihre Fragen zur Lieferung klären.\n\nKundin: Sehr gerne. Dann gehen wir in den Besprechungsraum.`,
    },
  },
  {
    id: "weiterbildung",
    icon: "GraduationCap",
    title: "Berufliche Aus- & Weiterbildung",
    desc: "Sich über Ausbildungsmöglichkeiten und Fortbildungen austauschen.",
    tips: [
      "Informieren Sie sich über relevante Kurse und Zertifikate.",
      "Fragen Sie beim Arbeitgeber nach Fördermöglichkeiten.",
      "Dokumentieren Sie Ihre erworbenen Kenntnisse.",
      "Teilen Sie Gelerntes im Team.",
    ],
    redemittel: [
      "Ich würde gerne eine Weiterbildung machen.",
      "Gibt es interne Schulungen zu …?",
      "Kann die Firma die Kosten übernehmen?",
      "Ich habe mein Zertifikat erworben.",
      "Ich möchte mich gerne weiterentwickeln.",
    ],
    example: {
      title: "Beispiel",
      text: `Mitarbeiter: Frau Meier, ich würde gerne eine Weiterbildung im Bereich Projektmanagement machen.\n\nVorgesetzte: Das klingt sinnvoll. Welchen Kurs haben Sie sich angesehen?\n\nMitarbeiter: Den Kurs „Projektmanagement B2\" beim IHK-Bildungszentrum.\n\nVorgesetzte: Senden Sie mir bitte die Informationen. Wir prüfen, ob die Kosten übernommen werden können.`,
    },
  },
  {
    id: "kuendigung",
    icon: "LogOut",
    title: "Kündigung & Jobwechsel",
    desc: "Ein Arbeitsverhältnis sachlich beenden und wechseln.",
    tips: [
      "Kündigen Sie immer schriftlich und fristgerecht.",
      "Bleiben Sie sachlich und professionell.",
      "Fragen Sie rechtzeitig nach Arbeitszeugnis und Zeugnis.",
      "Bereiten Sie die Übergabe vor.",
    ],
    redemittel: [
      "Hiermit kündige ich mein Arbeitsverhältnis fristgerecht.",
      "Ich habe mich für einen beruflichen Wechsel entschieden.",
      "Könnten Sie mir ein qualifiziertes Arbeitszeugnis ausstellen?",
      "Ich stehe für eine ordentliche Übergabe zur Verfügung.",
      "Ich bedanke mich für die gute Zusammenarbeit.",
    ],
    example: {
      title: "Beispiel",
      text: `Sehr geehrte Frau Weber,\n\nhiermit kündige ich mein Arbeitsverhältnis in Ihrem Unternehmen zum nächstmöglichen Termin ordentlich und fristgerecht.\n\nIch habe mich für eine neue berufliche Herausforderung entschieden. Für eine reibungslose Übergabe meiner Aufgaben stehe ich Ihnen selbstverständlich zur Verfügung.\n\nÜber ein qualifiziertes Arbeitszeugnis würde ich mich freuen.\n\nMit freundlichen Grüßen\nThomas Becker`,
    },
  },
  {
    id: "meinung",
    icon: "MessageCircle",
    title: "Meinung argumentieren & Stellung beziehen",
    desc: "In Diskussionen klar und höflich Position beziehen.",
    tips: [
      "Begründen Sie Ihre Meinung mit Beispielen.",
      "Verwenden Sie differenzierte Formulierungen.",
      "Respektieren Sie andere Standpunkte.",
      "Fassen Sie Ihre Hauptargumente am Ende zusammen.",
    ],
    redemittel: [
      "Aus meiner Sicht …",
      "Ich bin der Meinung, dass …",
      "Das lässt sich dadurch begründen, dass …",
      "Einerseits … andererseits …",
      "Abschließend möchte ich betonen, dass …",
    ],
    example: {
      title: "Beispiel",
      text: `A: Was halten Sie von der Idee, wöchentlich im Homeoffice zu arbeiten?\n\nB: Aus meiner Sicht hat das Vor- und Nachteile. Einerseits können wir konzentrierter arbeiten, andererseits fehlt der direkte Austausch im Büro. Ich schlage vor, wir testen es drei Monate lang und werten dann aus.`,
    },
  },
  {
    id: "konsens",
    icon: "UsersRound",
    title: "Konsens & Dissens im Team",
    desc: "Gemeinsame Lösungen finden, auch bei unterschiedlichen Meinungen.",
    tips: [
      "Hören Sie allen Beteiligten zu.",
      "Suchen Sie Gemeinsamkeiten heraus.",
      "Formulieren Sie Kompromisse konkret.",
      "Dokumentieren Sie das Ergebnis.",
    ],
    redemittel: [
      "Wo sind wir uns einig?",
      "Können wir uns auf Folgendes einigen?",
      "Ich verstehe Ihr Argument, aber …",
      "Lassen Sie uns eine Zwischenlösung finden.",
      "Wir stimmen also ab, dass …",
    ],
    example: {
      title: "Beispiel",
      text: `A: Ich plädiere für Software X, weil sie günstiger ist.\n\nB: Ich bevorzuge Software Y, weil der Support besser ist.\n\nA: Können wir uns darauf einigen, beide Programme im nächsten Monat zu testen?\n\nB: Gute Idee. Dann haben wir reale Erfahrungen für die Entscheidung.`,
    },
  },
  {
    id: "informationen",
    icon: "Share2",
    title: "Informationen austauschen & zusammenfassen",
    desc: "Wichtige Informationen weitergeben und prägnant zusammenfassen.",
    tips: [
      "Prüfen Sie, welche Informationen wirklich nötig sind.",
      "Strukturieren Sie Ihre Nachricht mit Stichpunkten.",
      "Nennen Sie Handlungsbedarf und Fristen.",
      "Fragen Sie nach Rückmeldung, ob alles verstanden wurde.",
    ],
    redemittel: [
      "Zusammenfassend lässt sich sagen, dass …",
      "Die wichtigsten Punkte sind …",
      "Bitte bestätigen Sie den Erhalt.",
      "Falls noch Unklarheiten bestehen, melden Sie sich.",
      "Ich leite Ihnen die Unterlagen weiter.",
    ],
    example: {
      title: "Beispiel",
      text: `Liebes Team,\n\nzusammenfassend zum heutigen Meeting:\n\n1. Die neue Software wird ab 01.09. eingeführt.\n2. Es gibt eine Schulung am 25.08. um 14 Uhr.\n3. Bitte melden Sie sich bis zum 18.08. an.\n\nBei Fragen sprechen Sie mich an.\n\nViele Grüße\nSandra`,
    },
  },
];
