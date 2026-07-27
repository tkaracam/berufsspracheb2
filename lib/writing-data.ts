export interface WritingTask {
  id: string;
  title: string;
  type: "E-Mail" | "Brief" | "Zusammenfassung";
  situation: string;
  requiredPoints: string[];
  modelAnswer: string;
  checklist: string[];
}

export const writingTasks: WritingTask[] = [
  {
    id: "w1",
    title: "Terminabsage / Terminverschiebung",
    type: "E-Mail",
    situation:
      "Sie können an einem vereinbarten Termin nicht teilnehmen und schlagen einen neuen Termin vor. Schreiben Sie eine E-Mail an Ihre Teamleitung.",
    requiredPoints: [
      "Absage mit kurzem Grund",
      "Alternativtermin vorschlagen",
      "Bitte um Rückmeldung",
    ],
    modelAnswer: `Betreff: Terminabsage – Besprechung am 15.07.

Sehr geehrte Frau Becker,

leider muss ich unseren Termin am 15.07. absagen, da ich an diesem Tag krankgeschrieben bin.

Könnten wir den Termin auf den 18.07. verschieben? Ich bin am Vormittag und Nachmittag verfügbar.

Ich wäre Ihnen dankbar, wenn Sie mir kurz Bescheid geben könnten.

Mit freundlichen Grüßen
Max Mustermann`,
    checklist: [
      "Betreff ist präzise und informativ.",
      "Anrede und Grußformel sind formell.",
      "Alle drei Aufgabenpunkte wurden bearbeitet.",
      "Der Ton ist höflich und sachlich.",
      "Rechtschreibung und Grammatik sind weitgehend korrekt.",
    ],
  },
  {
    id: "w2",
    title: "Beschwerde / Reklamation",
    type: "E-Mail",
    situation:
      "Sie haben ein Problem mit einer Lieferung und möchten sich beschweren. Schreiben Sie eine E-Mail an den Lieferanten.",
    requiredPoints: [
      "Sachliche Beschreibung des Problems",
      "Angabe von Datum und Fakten",
      "Konkrete Lösung oder Frist nennen",
    ],
    modelAnswer: `Betreff: Reklamation – Bestellung Nr. 12345

Sehr geehrte Damen und Herren,

am 10.06. bestellte ich bei Ihnen 50 Bürostühle. Leider wurden nur 40 Stühle geliefert. Zudem ist einer der gelieferten Stühle beschädigt.

Ich bitte Sie, die fehlenden 10 Stühle innerhalb der nächsten fünf Werktage nachzuliefern und den beschädigten Stuhl auszutauschen.

Anbei finden Sie den Lieferschein und ein Foto des beschädigten Stuhls.

Mit freundlichen Grüßen
Anna Müller`,
    checklist: [
      "Betreff enthält Bestell- oder Rechnungsnummer.",
      "Problem wird konkret und sachlich beschrieben.",
      "Eine Lösung oder Frist wird genannt.",
      "Der Ton bleibt höflich, auch wenn man sich beschwert.",
      "E-Mail ist in Einleitung, Hauptteil und Schluss gegliedert.",
    ],
  },
  {
    id: "w3",
    title: "Anfrage / Information erbitten",
    type: "E-Mail",
    situation:
      "Sie benötigen Informationen zu einer Weiterbildung. Schreiben Sie eine E-Mail an die Personalabteilung.",
    requiredPoints: [
      "Kurze Vorstellung",
      "Genau beschreiben, welche Informationen nötig sind",
      "Nach Fristen oder nächsten Schritten fragen",
    ],
    modelAnswer: `Betreff: Anfrage zu Weiterbildungsmöglichkeiten

Sehr geehrte Frau Weber,

ich arbeite seit einem Jahr in der Verwaltung Ihres Unternehmens und interessiere mich für eine Weiterbildung im Bereich Projektmanagement.

Könnten Sie mir mitteilen, welche internen oder externen Kurse angeboten werden und ob die Kosten von der Firma übernommen werden?

Über eine Rückmeldung bis Ende des Monats würde ich mich freuen.

Mit freundlichen Grüßen
Thomas Becker`,
    checklist: [
      "Absender stellt sich kurz vor.",
      "Anliegen ist klar formuliert.",
      "Konkrete Fragen sind enthalten.",
      "Ein Zeitpunkt für die Rückmeldung wird genannt.",
      "E-Mail ist höflich und formell.",
    ],
  },
  {
    id: "w4",
    title: "Bewerbung",
    type: "Brief",
    situation:
      "Sie bewerben sich auf eine ausgeschriebene Stelle. Schreiben Sie das Anschreiben.",
    requiredPoints: [
      "Interesse an der Stelle begründen",
      "Qualifikationen und Erfahrungen nennen",
      "Höflicher Abschluss mit Anlagehinweis",
    ],
    modelAnswer: `Betreff: Bewerbung als Sachbearbeiter (Stellenanzeige Nr. 456)

Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihre Stellenanzeige für den Sachbearbeiter gelesen. Aufgrund meiner mehrjährigen Erfahrung in der Verwaltung bin ich überzeugt, dass ich Ihr Team gut ergänzen kann.

In meiner bisherigen Tätigkeit war ich für die Bearbeitung von Anträgen, die Terminplanung und die Kundenkommunikation zuständig. Zudem beherrsche ich die gängigen Office-Programme sehr gut.

Über die Einladung zu einem persönlichen Gespräch würde ich mich sehr freuen.

Mit freundlichen Grüßen
Leyla Özdemir

Anlagen: Lebenslauf, Zeugnisse`,
    checklist: [
      "Betreff nennt Stelle und ggf. Anzeigennummer.",
      "Motivation wird klar begründet.",
      "Qualifikationen passen zur Stelle.",
      "Anschreiben ist auf eine Seite begrenzt.",
      "Anlagen werden erwähnt.",
    ],
  },
  {
    id: "w5",
    title: "Zusammenfassung",
    type: "Zusammenfassung",
    situation:
      "Fassen Sie den folgenden Text in 40–50 Wörtern zusammen.",
    requiredPoints: [
      "Hauptthema in einem Satz nennen",
      "Wichtigste Fakten wiedergeben",
      "Eigenes Fazit oder Schlussfolgerung",
    ],
    modelAnswer: `Ab nächstem Monat wird im Unternehmen eine neue Software eingeführt. Mitarbeitende erhalten dafür eine Schulung. Bei Verhinderung muss die Personalabteilung informiert werden. Ziel sind weniger Fehler und eine bessere Zusammenarbeit.`,
    checklist: [
      "Wortzahl liegt im vorgegebenen Rahmen.",
      "Hauptinformationen sind enthalten.",
      "Formulierungen sind eigene Worte.",
      "Text ist sachlich und prägnant.",
      "Verbindungswörter verknüpfen die Sätze.",
    ],
  },
  {
    id: "w6",
    title: "Dankschreiben",
    type: "E-Mail",
    situation:
      "Sie haben ein erfolgreiches Vorstellungsgespräch absolviert. Schreiben Sie eine Dankes-E-Mail an die Personalverantwortliche.",
    requiredPoints: [
      "Dank für das Gespräch ausdrücken",
      "Interesse an der Stelle bekräftigen",
      "Höflichen Abschluss",
    ],
    modelAnswer: `Betreff: Dank für das Gespräch

Sehr geehrte Frau Schneider,

vielen Dank für das freundliche und informative Gespräch am heutigen Tag. Es hat mich sehr gefreut, Ihr Team und die Aufgabenbereiche der Stelle näher kennenzulernen.

Nach dem Gespräch bin ich noch überzeugter, dass meine Erfahrungen gut zu Ihrem Unternehmen passen. Ich würde mich sehr über eine positive Rückmeldung freuen.

Mit freundlichen Grüßen
Leyla Özdemir`,
    checklist: [
      "Dank wird konkret und freundlich ausgedrückt.",
      "Interesse an der Stelle wird bekräftigt.",
      "Anrede und Grußformel sind formell.",
      "E-Mail ist kurz und höflich.",
      "Rechtschreibung und Grammatik sind weitgehend korrekt.",
    ],
  },
  {
    id: "w7",
    title: "Entschuldigung",
    type: "E-Mail",
    situation:
      "Sie haben eine wichtige Frist nicht eingehalten. Entschuldigen Sie sich bei Ihrer Vorgesetzten und geben Sie an, wie Sie das Problem lösen.",
    requiredPoints: [
      "Entschuldigung aussprechen",
      "Grund nennen",
      "Lösung oder neuen Zeitpunkt anbieten",
    ],
    modelAnswer: `Betreff: Entschuldigung – verspätete Abgabe des Berichts

Sehr geehrte Frau Becker,

es tut mir leid, dass ich den Bericht nicht wie vereinbart bis gestern abgeben konnte. Aufgrund unerwarteter technischer Probleme konnte ich die letzten Daten nicht rechtzeitig auswerten.

Ich werde den Bericht bis morgen, 12 Uhr, nachliefern und Sie selbstverständlich sofort informieren, sobald er fertig ist.

Mit freundlichen Grüßen
Max Mustermann`,
    checklist: [
      "Entschuldigung wird klar ausgesprochen.",
      "Grund wird kurz und ehrlich genannt.",
      "Eine Lösung oder neuer Termin wird genannt.",
      "Der Ton bleibt höflich und verantwortungsbewusst.",
      "E-Mail ist klar gegliedert.",
    ],
  },
  {
    id: "w8",
    title: "Einladung",
    type: "E-Mail",
    situation:
      "Sie organisieren eine Betriebsfeier und laden die Mitarbeitenden ein. Schreiben Sie eine Einladungs-E-Mail.",
    requiredPoints: [
      "Anlass und Datum nennen",
      "Ort und Uhrzeit mitteilen",
      "Um Rückmeldung bitten",
    ],
    modelAnswer: `Betreff: Einladung zur Betriebsfeier am 20.09.

Liebe Kolleginnen und Kollegen,

wir laden Sie herzlich zur diesjährigen Betriebsfeier ein.

Termin: Freitag, der 20.09., ab 18 Uhr
Ort: Festsaal im Hotel Stadtgarten, Hauptstraße 45

Für Essen und Getränke ist gesorgt. Wir freuen uns auf einen gemeinsamen Abend.

Bitte geben Sie uns bis zum 10.09. Bescheid, ob Sie teilnehmen können.

Mit freundlichen Grüßen
Das Organisationsteam`,
    checklist: [
      "Anlass, Datum und Uhrzeit sind enthalten.",
      "Ort wird genannt.",
      "Es wird um Rückmeldung gebeten.",
      "Ton ist freundlich und einladend.",
      "Alle wichtigen Informationen sind übersichtlich dargestellt.",
    ],
  },
  {
    id: "w9",
    title: "Angebot",
    type: "E-Mail",
    situation:
      "Ein Kunde hat nach Ihren Dienstleistungen angefragt. Schreiben Sie ein formelles Angebot per E-Mail.",
    requiredPoints: [
      "Bezug auf die Anfrage nehmen",
      "Leistungen und Preise nennen",
      "Nächsten Schritt vorschlagen",
    ],
    modelAnswer: `Betreff: Angebot für Schulungsleistungen

Sehr geehrte Frau Weber,

vielen Dank für Ihre Anfrage vom 02.07. Gerne unterbreite ich Ihnen ein Angebot für eine zweitägige Deutsch-Weiterbildung in Ihrem Unternehmen.

Leistungen:
- 16 Unterrichtsstunden à 45 Minuten
- Unterrichtsmaterialien
- Abschlusstest

Gesamtpreis: 1.200 € zzgl. MwSt.

Bei Interesse schlage ich ein kurzes Telefonat zur Terminplanung vor.

Mit freundlichen Grüßen
Thomas Becker`,
    checklist: [
      "Auf die Anfrage wird eingegangen.",
      "Leistungen und Preise sind klar genannt.",
      "Nächster Schritt wird vorgeschlagen.",
      "Ton ist professionell und werbend.",
      "E-Mail ist übersichtlich strukturiert.",
    ],
  },
  {
    id: "w10",
    title: "Information / Mitteilung",
    type: "E-Mail",
    situation:
      "Sie informieren Ihr Team über eine neue Abteilungsregelung. Schreiben Sie eine kurze Mitteilung.",
    requiredPoints: [
      "Thema der Mitteilung nennen",
      "Wichtige Details erklären",
      "Bei Fragen Hilfe anbieten",
    ],
    modelAnswer: `Betreff: Neue Regelung für Urlaubsanträge

Liebe Kolleginnen und Kollegen,

ab dem 01.08. gilt eine neue Regelung für Urlaubsanträge. Bitte reichen Sie Anträge mindestens zwei Wochen vor Urlaubsbeginn bei der Personalabteilung ein.

Die Anträge werden innerhalb von fünf Werktagen bearbeitet. Bei dringenden Fällen sprechen Sie mich bitte direkt an.

Vielen Dank für Ihre Mitarbeit.

Mit freundlichen Grüßen
Maria Schmidt`,
    checklist: [
      "Thema wird in der Betreffzeile und im Text klar genannt.",
      "Wichtige Details sind enthalten.",
      "Bei Rückfragen wird Hilfe angeboten.",
      "Ton ist sachlich und freundlich.",
      "Mitteilung ist kurz und verständlich.",
    ],
  },
];
