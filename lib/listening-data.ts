export interface ListeningQuestion {
  q: string;
  answer: string;
  options: string[];
  correctIndex: number;
}

export interface ListeningTask {
  id: string;
  title: string;
  type: string;
  audioPath: string;
  transcript: string;
  questions: ListeningQuestion[];
}

export const listeningTasks: ListeningTask[] = [
  {
    id: "l1",
    title: "Aufgabe 1: Durchsage im Betrieb",
    type: "Ansage",
    audioPath: "/audio/l1.m4a",
    transcript: `Achtung, alle Mitarbeitenden in der Produktionshalle. Aufgrund einer kurzfristigen Wartung an der Maschine 4 fällt die Frühschicht am Donnerstag aus. Die Schicht beginnt stattdessen um 7 Uhr. Bitte informieren Sie auch Ihre Kolleginnen und Kollegen, die heute nicht anwesend sind. Vielen Dank.`,
    questions: [
      {
        q: "Welche Maschine wird gewartet?",
        answer: "Maschine 4",
        options: ["Maschine 2", "Maschine 4", "Maschine 5", "Maschine 8"],
        correctIndex: 1,
      },
      {
        q: "Wann beginnt die Schicht am Donnerstag?",
        answer: "Um 7 Uhr",
        options: ["Um 6 Uhr", "Um 7 Uhr", "Um 8 Uhr", "Um 9 Uhr"],
        correctIndex: 1,
      },
      {
        q: "Was sollen die Mitarbeitenden tun?",
        answer: "Sie sollen ihre Kolleginnen und Kollegen informieren.",
        options: [
          "Sie sollen die Wartung durchführen.",
          "Sie sollen ihre Kolleginnen und Kollegen informieren.",
          "Sie sollen die Maschine abschalten.",
          "Sie sollen die Schichtleitung anrufen.",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l2",
    title: "Aufgabe 2: Telefonat Kundenservice",
    type: "Gespräch",
    audioPath: "/audio/l2.m4a",
    transcript: `Mitarbeiter: Guten Tag, Kundenservice Müller, was kann ich für Sie tun?

Kundin: Guten Tag, hier ist Frau Schmidt. Ich habe vor zwei Wochen einen Schreibtisch bei Ihnen bestellt, aber leider ist bis heute nichts angekommen.

Mitarbeiter: Das tut mir leid. Können Sie mir bitte Ihre Bestellnummer nennen?

Kundin: Ja, die Nummer ist 78934.

Mitarbeiter: Danke. Ich sehe gerade, dass die Lieferung verzögert ist. Sie wird voraussichtlich am Freitag bei Ihnen eintreffen. Ich schicke Ihnen noch eine E-Mail mit der neuen Sendungsnummer.

Kundin: Gut, vielen Dank.

Mitarbeiter: Gern geschehen. Auf Wiederhören.`,
    questions: [
      {
        q: "Was hat Frau Schmidt bestellt?",
        answer: "Einen Schreibtisch",
        options: ["Einen Schrank", "Einen Schreibtisch", "Einen Stuhl", "Einen Tisch"],
        correctIndex: 1,
      },
      {
        q: "Wie lautet die Bestellnummer?",
        answer: "78934",
        options: ["78943", "78934", "79834", "73984"],
        correctIndex: 1,
      },
      {
        q: "Wann kommt die Lieferung voraussichtlich an?",
        answer: "Am Freitag",
        options: ["Am Mittwoch", "Am Donnerstag", "Am Freitag", "Am Montag"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "l3",
    title: "Aufgabe 3: Sicherheitsunterweisung",
    type: "Anweisung",
    audioPath: "/audio/l3.m4a",
    transcript: `Herzlich willkommen zur Sicherheitsunterweisung. Zunächst zeige ich Ihnen die Notausgänge im Gebäude. Im Erdgeschoss befinden sich zwei Ausgänge, im Obergeschoss einen. Bitte merken Sie sich den kürzesten Weg von Ihrem Arbeitsplatz aus.

Anschließend besprechen wir den Umgang mit Feuerlöschern. Jeder Abteilung ist mindestens ein Feuerlöscher zugeordnet. Sie stehen in roten Kästen an den Wänden. Im Ernstfall entnehmen Sie den Löscher, brechen die Sicherung und richten das Rohr auf den Boden des Feuers.

Zum Schluss üben wir die Evakuierung. Wenn der Alarm ertönt, verlassen Sie das Gebäude ruhig über den nächsten Notausgang. Sammelplatz ist der Parkplatz vor dem Haupteingang.`,
    questions: [
      {
        q: "Wie viele Notausgänge gibt es im Obergeschoss?",
        answer: "Einen",
        options: ["Keinen", "Einen", "Zwei", "Drei"],
        correctIndex: 1,
      },
      {
        q: "Wo stehen die Feuerlöscher?",
        answer: "In roten Kästen an den Wänden",
        options: [
          "In grünen Kästen an den Türen",
          "In roten Kästen an den Wänden",
          "In der Eingangshalle",
          "Unter den Treppen",
        ],
        correctIndex: 1,
      },
      {
        q: "Wo ist der Sammelplatz?",
        answer: "Der Parkplatz vor dem Haupteingang",
        options: [
          "Der Parkplatz hinter dem Gebäude",
          "Der Parkplatz vor dem Haupteingang",
          "Der Schulungsraum",
          "Der Eingangsbereich",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l4",
    title: "Aufgabe 4: Diskussion im Meeting",
    type: "Diskussion",
    audioPath: "/audio/l4.m4a",
    transcript: `Leiterin: Wir müssen entscheiden, ob wir nächstes Jahr neue Schichtmodelle einführen. Herr Braun, was ist Ihre Meinung?

Herr Braun: Ich bin dafür. Flexible Schichten würden es den Mitarbeitenden erleichtern, Familie und Beruf zu vereinbaren. Außerdem könnten wir so die Produktion besser auf die Auftragslage abstimmen.

Frau Klein: Ich sehe das etwas skeptischer. Flexible Schichtmodelle erfordern viel Organisation. Wenn nicht alle mitmachen, haben wir schnell Probleme mit der Planung.

Herr Braun: Das stimmt. Deshalb sollten wir zuerst eine Umfrage unter den Mitarbeitenden machen.

Leiterin: Gute Idee. Dann wissen wir, ob genügend Interesse besteht, bevor wir das Modell einführen.`,
    questions: [
      {
        q: "Welche Meinung vertritt Herr Braun?",
        answer: "Er ist für flexible Schichten, weil sie Vereinbarkeit und Produktionsanpassung ermöglichen.",
        options: [
          "Er ist gegen flexible Schichten, weil sie die Planung erschweren.",
          "Er ist für flexible Schichten, weil sie Vereinbarkeit und Produktionsanpassung ermöglichen.",
          "Er möchte zuerst die Gewerkschaft befragen.",
          "Er findet, die Schichtmodelle sind bereits ausreichend flexibel.",
        ],
        correctIndex: 1,
      },
      {
        q: "Was befürchtet Frau Klein?",
        answer: "Sie befürchtet organisatorische Probleme, wenn nicht alle mitmachen.",
        options: [
          "Sie befürchtet, dass die Produktion sinkt.",
          "Sie befürchtet organisatorische Probleme, wenn nicht alle mitmachen.",
          "Sie befürchtet höhere Lohnkosten durch flexible Schichten.",
          "Sie befürchtet, dass die Mitarbeitenden zu viel Urlaub nehmen.",
        ],
        correctIndex: 1,
      },
      {
        q: "Was wird als nächster Schritt vereinbart?",
        answer: "Eine Umfrage unter den Mitarbeitenden",
        options: [
          "Eine Umfrage unter den Mitarbeitenden",
          "Die sofortige Einführung neuer Schichtmodelle",
          "Eine Ausschreibung für neue Mitarbeitende",
          "Eine Schulung für die Schichtleitung",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l5",
    title: "Aufgabe 5: Bewerbungsgespräch",
    type: "Gespräch",
    audioPath: "/audio/l5.m4a",
    transcript: `Personalleiterin: Guten Tag, Frau Özdemir. Schön, dass Sie zu uns gekommen sind. Bitte nehmen Sie Platz. Ich habe Ihre Bewerbungsunterlagen gelesen und bin sehr interessiert an Ihrer Tätigkeit in der Qualitätssicherung.

Bewerberin: Guten Tag. Vielen Dank für die Einladung. In meinem bisherigen Job habe ich vor allem Prozesse analysiert und Dokumentationen geprüft. Das hat mir sehr viel Spaß gemacht.

Personalleiterin: Was motiviert Sie, bei uns zu arbeiten?

Bewerberin: Ich schätze die Möglichkeit, in einem internationalen Team tätig zu sein, und ich möchte meine Kenntnisse im Bereich Auditierung weiter ausbauen.

Personalleiterin: Das klingt gut. Wir bieten dafür auch regelmäßige Weiterbildungen an.`,
    questions: [
      {
        q: "In welchem Bereich hat Frau Özdemir gearbeitet?",
        answer: "Qualitätssicherung",
        options: ["Vertrieb", "Qualitätssicherung", "Personalabteilung", "Buchhaltung"],
        correctIndex: 1,
      },
      {
        q: "Was hat sie in ihrem bisherigen Job vor allem gemacht?",
        answer: "Sie hat Prozesse analysiert und Dokumentationen geprüft.",
        options: [
          "Sie hat Kunden beraten und Rechnungen geschrieben.",
          "Sie hat Prozesse analysiert und Dokumentationen geprüft.",
          "Sie hat Maschinen bedient und gewartet.",
          "Sie hat Schulungen für neue Mitarbeitende gegeben.",
        ],
        correctIndex: 1,
      },
      {
        q: "Was motiviert sie für die neue Stelle?",
        answer: "Das internationale Team und die Weiterentwicklung im Bereich Auditierung",
        options: [
          "Ein höheres Gehalt und mehr Urlaubstage",
          "Das internationale Team und die Weiterentwicklung im Bereich Auditierung",
          "Die Möglichkeit, im Homeoffice zu arbeiten",
          "Eine kürzere Anfahrtszeit zum Betrieb",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l6",
    title: "Aufgabe 6: Information zur Qualitätskontrolle",
    type: "Ansage",
    audioPath: "/audio/l6.m4a",
    transcript: `Liebe Kolleginnen und Kollegen, ab nächster Woche wird die Qualitätskontrolle neu organisiert. Jede produzierte Charge muss vor der Verpackung geprüft werden. Dazu erhalten Sie an Ihrem Arbeitsplatz eine Checkliste.

Bitte tragen Sie dort alle festgestellten Mängel ein und melden wiederkehrende Probleme umgehend an die Qualitätsmanagementabteilung. Unser Ziel ist es, die Reklamationsrate weiter zu senken und die Kundenzufriedenheit zu erhöhen. Vielen Dank für Ihre Mithilfe.`,
    questions: [
      {
        q: "Wann muss jede Charge geprüft werden?",
        answer: "Vor der Verpackung",
        options: ["Nach der Verpackung", "Vor der Verpackung", "Nach der Lieferung", "Vor der Produktion"],
        correctIndex: 1,
      },
      {
        q: "Was erhalten die Mitarbeitenden an ihrem Arbeitsplatz?",
        answer: "Eine Checkliste",
        options: ["Ein neues Werkzeug", "Eine Checkliste", "Eine Schulungsunterlage", "Ein Tablet"],
        correctIndex: 1,
      },
      {
        q: "An wen sollen wiederkehrende Probleme gemeldet werden?",
        answer: "An die Qualitätsmanagementabteilung",
        options: [
          "An die Personalabteilung",
          "An die Buchhaltung",
          "An die Qualitätsmanagementabteilung",
          "An den Betriebsrat",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "l7",
    title: "Aufgabe 7: Kundenanfrage per Telefon",
    type: "Gespräch",
    audioPath: "/audio/l7.m4a",
    transcript: `Mitarbeiter: Guten Tag, Kundenservice Müller, was kann ich für Sie tun?

Kunde: Guten Tag, hier ist Herr Becker. Ich hätte eine Frage zu meiner Rechnung vom 12. Juni. Dort wurde ein Artikel doppelt berechnet.

Mitarbeiter: Das tut mir leid. Können Sie mir bitte Ihre Kundennummer und die Rechnungsnummer nennen?

Kunde: Ja, meine Kundennummer ist 45621 und die Rechnungsnummer lautet RE-2024-0612.

Mitarbeiter: Danke. Ich sehe den Fehler. Der Artikel wurde tatsächlich zweimal erfasst. Wir erstatten Ihnen den Betrag innerhalb der nächsten fünf Werktage auf Ihr Konto.

Kunde: Vielen Dank.

Mitarbeiter: Gern geschehen. Auf Wiederhören.`,
    questions: [
      {
        q: "Was ist das Problem des Kunden?",
        answer: "Ein Artikel wurde doppelt berechnet.",
        options: [
          "Die Rechnung ist insgesamt zu hoch.",
          "Ein Artikel wurde doppelt berechnet.",
          "Die Lieferung ist beschädigt angekommen.",
          "Die Rechnung ist nicht angekommen.",
        ],
        correctIndex: 1,
      },
      {
        q: "Wie lautet die Rechnungsnummer?",
        answer: "RE-2024-0612",
        options: ["RE-2024-0612", "RE-2024-0611", "RE-2024-0621", "RE-2024-0610"],
        correctIndex: 0,
      },
      {
        q: "Wie wird das Problem gelöst?",
        answer: "Der Betrag wird innerhalb von fünf Werktagen erstattet.",
        options: [
          "Der Artikel wird erneut geliefert.",
          "Der Betrag wird innerhalb von fünf Werktagen erstattet.",
          "Der Kunde erhält einen Gutschein.",
          "Die Rechnung wird storniert und neu erstellt.",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l8",
    title: "Aufgabe 8: Diskussion über Homeoffice-Regelungen",
    type: "Diskussion",
    audioPath: "/audio/l8.m4a",
    transcript: `Leiterin: Wir müssen entscheiden, wie unsere Homeoffice-Regelung ab nächstem Jahr aussehen soll. Herr Schmidt, was ist Ihre Meinung?

Herr Schmidt: Ich bin dafür, dass jeder Mitarbeitende mindestens zwei Tage pro Woche im Homeoffice arbeiten kann. Das erhöht die Zufriedenheit und spart Zeit.

Frau Klein: Ich sehe das kritisch. Nicht alle Aufgaben lassen sich von zu Hause erledigen. Außerdem brauchen wir im Büro einen regelmäßigen Austausch.

Herr Schmidt: Das stimmt. Deshalb schlage ich vor, dass die Teams selbst entscheiden, welche Tage im Büro wichtig sind.

Leiterin: Das klingt nach einer guten Lösung. Dann bleibt die Flexibilität, aber wir können wichtige Termine im Büro planen.`,
    questions: [
      {
        q: "Wie viele Homeoffice-Tage schlägt Herr Schmidt vor?",
        answer: "Mindestens zwei Tage pro Woche",
        options: [
          "Einen Tag pro Woche",
          "Mindestens zwei Tage pro Woche",
          "Drei Tage pro Woche",
          "So viele wie möglich",
        ],
        correctIndex: 1,
      },
      {
        q: "Was befürchtet Frau Klein?",
        answer: "Sie befürchtet, dass nicht alle Aufgaben von zu Hause erledigt werden können und der Austausch im Büro fehlt.",
        options: [
          "Sie befürchtet, dass die Mitarbeitenden weniger produktiv arbeiten.",
          "Sie befürchtet, dass nicht alle Aufgaben von zu Hause erledigt werden können und der Austausch im Büro fehlt.",
          "Sie befürchtet höhere Stromkosten im Büro.",
          "Sie befürchtet, dass die Datensicherheit nicht gewährleistet ist.",
        ],
        correctIndex: 1,
      },
      {
        q: "Was wird als Lösung vereinbart?",
        answer: "Die Teams entscheiden selbst, welche Tage im Büro wichtig sind.",
        options: [
          "Jeder Mitarbeitende entscheidet allein über seine Homeoffice-Tage.",
          "Homeoffice wird generell untersagt.",
          "Die Teams entscheiden selbst, welche Tage im Büro wichtig sind.",
          "Es gibt feste Homeoffice-Tage für alle.",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "l9",
    title: "Aufgabe 9: Information zum Schulungstermin",
    type: "Ansage",
    audioPath: "/audio/l9.m4a",
    transcript: `Liebe Kolleginnen und Kollegen, ich möchte Sie auf die nächste Schulung zum Thema Arbeitssicherheit hinweisen. Die Schulung findet am kommenden Montag um 9 Uhr im Schulungsraum 302 statt. Sie dauert etwa zwei Stunden und ist für alle Mitarbeitenden der Produktion verpflichtend.

Bitte bringen Sie Ihren Sicherheitsausweis und Ihre persönliche Schutzausrüstung mit. Wer an diesem Termin nicht teilnehmen kann, meldet sich bitte bis Freitag bei der Personalabteilung.`,
    questions: [
      {
        q: "Wann findet die Schulung statt?",
        answer: "Am kommenden Montag um 9 Uhr",
        options: [
          "Am kommenden Dienstag um 10 Uhr",
          "Am kommenden Montag um 9 Uhr",
          "Am kommenden Freitag um 14 Uhr",
          "Am kommenden Mittwoch um 8 Uhr",
        ],
        correctIndex: 1,
      },
      {
        q: "In welchem Raum findet die Schulung statt?",
        answer: "Schulungsraum 302",
        options: ["Schulungsraum 203", "Schulungsraum 302", "Schulungsraum 320", "Raum 202"],
        correctIndex: 1,
      },
      {
        q: "Was sollen die Teilnehmenden mitbringen?",
        answer: "Sicherheitsausweis und persönliche Schutzausrüstung",
        options: [
          "Laptop und Unterlagen",
          "Sicherheitsausweis und persönliche Schutzausrüstung",
          "Verpflegung und Getränke",
          "Arbeitsvertrag und Lohnabrechnung",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l10",
    title: "Aufgabe 10: Gespräch über Urlaubsplanung",
    type: "Gespräch",
    audioPath: "/audio/l10.m4a",
    transcript: `Mitarbeiterin: Guten Tag, Frau Braun. Ich wollte mit Ihnen kurz meinen Urlaub für August besprechen.

Vorgesetzte: Guten Tag, Frau Yilmaz. Welche Woche hätten Sie denn gerne?

Mitarbeiterin: Am liebsten die erste Augustwoche, also vom 4. bis zum 8. August.

Vorgesetzte: Das sollte möglich sein. In der Abteilung sind dann noch zwei Kolleginnen im Urlaub, aber wir können die Vertretung organisieren.

Mitarbeiterin: Vielen Dank. Dann reiche ich den Antrag heute noch ein.

Vorgesetzte: Bitte geben Sie ihn mir unterschrieben bis spätestens morgen.`,
    questions: [
      {
        q: "In welchem Monat möchte Frau Yilmaz Urlaub nehmen?",
        answer: "Im August",
        options: ["Im Juli", "Im August", "Im September", "Im Juni"],
        correctIndex: 1,
      },
      {
        q: "Welche Woche wünscht sie sich?",
        answer: "Die erste Augustwoche, vom 4. bis zum 8. August",
        options: [
          "Die zweite Augustwoche, vom 11. bis zum 15. August",
          "Die erste Augustwoche, vom 4. bis zum 8. August",
          "Die letzte Augustwoche, vom 25. bis zum 29. August",
          "Die dritte Augustwoche, vom 18. bis zum 22. August",
        ],
        correctIndex: 1,
      },
      {
        q: "Bis wann soll der Antrag abgegeben werden?",
        answer: "Bis spätestens morgen",
        options: [
          "Bis spätestens morgen",
          "Bis Ende der Woche",
          "Bis zum Monatsende",
          "Bis nächste Woche Montag",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l11",
    title: "Aufgabe 11: Durchsage Wareneingang",
    type: "Ansage",
    audioPath: "/audio/l11.m4a",
    transcript: `Guten Tag, hier spricht die Wareneingangsabteilung. Wir haben heute Vormittag eine Lieferung mit der Sendungsnummer 98765 erhalten. Leider fehlen zwei Paletten. Bitte prüfen Sie Ihren Lieferschein und melden sich umgehend bei uns. Sie erreichen uns unter der Durchwahl 234. Vielen Dank.`,
    questions: [
      {
        q: "Was fehlt bei der Lieferung?",
        answer: "Zwei Paletten",
        options: ["Zwei Pakete", "Zwei Paletten", "Zwei Kartons", "Zwei Sendungen"],
        correctIndex: 1,
      },
      {
        q: "Wie lautet die Sendungsnummer?",
        answer: "98765",
        options: ["98756", "98765", "97865", "98675"],
        correctIndex: 1,
      },
      {
        q: "Unter welcher Durchwahl ist die Wareneingangsabteilung erreichbar?",
        answer: "Durchwahl 234",
        options: ["Durchwahl 243", "Durchwahl 324", "Durchwahl 234", "Durchwahl 423"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "l12",
    title: "Aufgabe 12: IT-Support-Anfrage",
    type: "Gespräch",
    audioPath: "/audio/l12.m4a",
    transcript: `Mitarbeiterin: Guten Tag, hier ist Frau Neumann aus der Buchhaltung. Mein Computer startet seit heute Morgen nicht mehr.

IT-Support: Guten Tag, Frau Neumann. Das tut mir leid. Zeigt der Bildschirm denn eine Fehlermeldung an?

Mitarbeiterin: Ja, dort steht, dass das Betriebssystem nicht geladen werden kann.

IT-Support: Danke für die Information. Können Sie mir bitte die Inventarnummer auf dem Gerät nennen? Die finden Sie auf der Rückseite des Rechners.

Mitarbeiterin: Die Nummer lautet PC-2024-112.

IT-Support: Vielen Dank. Ich erstelle sofort ein Ticket und schicke einen Techniker vorbei. Das sollte heute noch behoben werden.`,
    questions: [
      {
        q: "Welches Problem hat Frau Neumann?",
        answer: "Ihr Computer startet nicht mehr.",
        options: [
          "Ihr Drucker funktioniert nicht.",
          "Ihr Computer startet nicht mehr.",
          "Sie hat ihr Passwort vergessen.",
          "Ihre E-Mails lassen sich nicht öffnen.",
        ],
        correctIndex: 1,
      },
      {
        q: "Was steht auf dem Bildschirm?",
        answer: "Das Betriebssystem kann nicht geladen werden.",
        options: [
          "Das Passwort ist falsch.",
          "Das Betriebssystem kann nicht geladen werden.",
          "Die Festplatte ist voll.",
          "Keine Internetverbindung verfügbar.",
        ],
        correctIndex: 1,
      },
      {
        q: "Wie lautet die Inventarnummer?",
        answer: "PC-2024-112",
        options: ["PC-2024-121", "PC-2024-112", "PC-2024-211", "PC-2024-102"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l13",
    title: "Aufgabe 13: Hinweis zum Reinigungsplan",
    type: "Anweisung",
    audioPath: "/audio/l13.m4a",
    transcript: `Liebe Kolleginnen und Kollegen, ab sofort ändert sich der Reinigungsplan. Die Büros werden jetzt dienstags und donnerstags gereinigt. Bitte räumen Sie am Vorabend Ihre Schreibtische frei. Putzmittel finden Sie im Versorgungsraum. Bei Fragen wenden Sie sich an die Gebäudemanagementabteilung. Vielen Dank für Ihre Mithilfe.`,
    questions: [
      {
        q: "An welchen Tagen werden die Büros gereinigt?",
        answer: "Dienstags und donnerstags",
        options: [
          "Montags und mittwochs",
          "Dienstags und donnerstags",
          "Freitags und samstags",
          "Täglich",
        ],
        correctIndex: 1,
      },
      {
        q: "Was sollen die Mitarbeitenden am Vorabend tun?",
        answer: "Sie sollen ihre Schreibtische freiräumen.",
        options: [
          "Sie sollen die Büros abschließen.",
          "Sie sollen ihre Schreibtische freiräumen.",
          "Sie sollen Putzmittel kaufen.",
          "Sie sollen den Müll entsorgen.",
        ],
        correctIndex: 1,
      },
      {
        q: "Wo befinden sich die Putzmittel?",
        answer: "Im Versorgungsraum",
        options: ["Im Büro", "Im Versorgungsraum", "Im Keller", "Im Eingangsbereich"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l14",
    title: "Aufgabe 14: Gespräch über Weiterbildung",
    type: "Gespräch",
    audioPath: "/audio/l14.m4a",
    transcript: `Vorgesetzter: Guten Tag, Frau Demir. Sie haben Interesse an einer Weiterbildung?

Mitarbeiterin: Ja, gerne. Ich möchte meine Deutschkenntnisse im beruflichen Schreiben verbessern.

Vorgesetzter: Das ist eine gute Idee. Wir bieten dafür einen Kurs an der Volkshochschule an. Der Kurs findet zweimal pro Woche am Abend statt.

Mitarbeiterin: Das passt gut. Wie ist das mit den Kosten?

Vorgesetzter: Die Firma übernimmt die Kursgebühren, wenn Sie den Kurs erfolgreich abschließen. Bitte reichen Sie mir bis Ende der Woche eine schriftliche Anmeldung ein.`,
    questions: [
      {
        q: "In welchem Bereich möchte Frau Demir sich weiterbilden?",
        answer: "Im beruflichen Schreiben",
        options: [
          "Im beruflichen Schreiben",
          "In der Buchhaltung",
          "In der Personalführung",
          "In der IT-Sicherheit",
        ],
        correctIndex: 0,
      },
      {
        q: "Wie oft findet der Kurs statt?",
        answer: "Zweimal pro Woche",
        options: ["Einmal pro Woche", "Zweimal pro Woche", "Täglich", "Einmal im Monat"],
        correctIndex: 1,
      },
      {
        q: "Was muss Frau Demir bis Ende der Woche einreichen?",
        answer: "Eine schriftliche Anmeldung",
        options: [
          "Eine Kostenaufstellung",
          "Eine schriftliche Anmeldung",
          "Ein Zeugnis",
          "Eine Kündigung",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l15",
    title: "Aufgabe 15: Krankmeldung per Telefon",
    type: "Gespräch",
    audioPath: "/audio/l15.m4a",
    transcript: `Mitarbeiter: Guten Morgen, Herr Schulz. Hier ist Mehmet Kaya aus der Produktion.

Vorgesetzter: Guten Morgen, Herr Kaya. Was kann ich für Sie tun?

Mitarbeiter: Ich muss mich leider krankmelden. Ich habe seit gestern Abend starke Rückenschmerzen und kann heute nicht zur Arbeit kommen.

Vorgesetzter: Das tut mir leid. Bitte schicken Sie uns eine Krankmeldung vom Arzt spätestens morgen zu.

Mitarbeiter: Mache ich. Ich hoffe, dass ich übermorgen wieder kommen kann.

Vorgesetzter: Gute Besserung. Melden Sie sich bitte, wenn sich etwas ändert.`,
    questions: [
      {
        q: "Warum meldet sich Herr Kaya krank?",
        answer: "Er hat starke Rückenschmerzen.",
        options: [
          "Er hat starkes Fieber.",
          "Er hat starke Rückenschmerzen.",
          "Er hat sich am Arm verletzt.",
          "Er hat Migräne.",
        ],
        correctIndex: 1,
      },
      {
        q: "Was soll er spätestens morgen einschicken?",
        answer: "Eine Krankmeldung vom Arzt",
        options: [
          "Eine Krankmeldung vom Arzt",
          "Eine Urlaubsanfrage",
          "Eine Rechnung",
          "Ein Attest der Krankenkasse",
        ],
        correctIndex: 0,
      },
      {
        q: "Wann hofft er, wieder zur Arbeit zu kommen?",
        answer: "Übermorgen",
        options: ["Morgen", "Übermorgen", "In einer Woche", "Am Montag"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l16",
    title: "Aufgabe 16: Kundenfeedback zur neuen Software",
    type: "Gespräch",
    audioPath: "/audio/l16.m4a",
    transcript: `Mitarbeiterin: Guten Tag, Herr Becker. Sie haben unsere neue Software jetzt zwei Wochen im Einsatz. Wie sind Ihre Erfahrungen?

Kunde: Guten Tag. Die Bedienung ist intuitiver als erwartet. Allerdings dauert der Datenaustausch mit unserem alten System etwas länger.

Mitarbeiterin: Das Problem ist uns bekannt. Im nächsten Update wird ein schnellerer Import verfügbar sein.

Kunde: Wann erscheint das Update?

Mitarbeiterin: Voraussichtlich in drei Wochen. Ich schicke Ihnen vorher eine Testversion.`,
    questions: [
      {
        q: "Was gefällt dem Kunden an der neuen Software?",
        answer: "Die Bedienung ist intuitiver als erwartet.",
        options: [
          "Die Bedienung ist intuitiver als erwartet.",
          "Der Datenaustausch ist sehr schnell.",
          "Die Software ist besonders günstig.",
          "Es gibt viele neue Funktionen.",
        ],
        correctIndex: 0,
      },
      {
        q: "Was ist das Problem?",
        answer: "Der Datenaustausch mit dem alten System dauert länger.",
        options: [
          "Die Software stürzt oft ab.",
          "Der Datenaustausch mit dem alten System dauert länger.",
          "Die Bedienung ist kompliziert.",
          "Die Software ist zu teuer.",
        ],
        correctIndex: 1,
      },
      {
        q: "Wann erscheint das Update?",
        answer: "In drei Wochen",
        options: ["In zwei Wochen", "In drei Wochen", "In vier Wochen", "In einem Monat"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l17",
    title: "Aufgabe 17: Hinweis zur Brandschutzübung",
    type: "Ansage",
    audioPath: "/audio/l17.m4a",
    transcript: `Liebe Kolleginnen und Kollegen, am kommenden Donnerstag um 14 Uhr findet unsere halbjährliche Brandschutzübung statt. Der Alarm wird ca. zwei Minuten lang zu hören sein. Bitte verlassen Sie das Gebäude über die nächsten Notausgänge und begeben Sie sich zum Sammelplatz auf dem Hof.

Die Feuerwehr wird gegen 14:15 Uhr eintreffen und die Übung gemeinsam mit unseren Sicherheitsbeauftragten auswerten. Bitte beachten Sie, dass während der Übung alle Aufzüge außer Betrieb sind. Vielen Dank für Ihre Mithilfe.`,
    questions: [
      {
        q: "Wann findet die Brandschutzübung statt?",
        answer: "Am kommenden Donnerstag um 14 Uhr",
        options: [
          "Am kommenden Mittwoch um 10 Uhr",
          "Am kommenden Donnerstag um 14 Uhr",
          "Am kommenden Freitag um 16 Uhr",
          "Am kommenden Dienstag um 9 Uhr",
        ],
        correctIndex: 1,
      },
      {
        q: "Wohin sollen sich die Mitarbeitenden begeben?",
        answer: "Zum Sammelplatz auf dem Hof",
        options: [
          "Zum Parkplatz vor dem Gebäude",
          "In den Schulungsraum",
          "Zum Sammelplatz auf dem Hof",
          "In die Kantine",
        ],
        correctIndex: 2,
      },
      {
        q: "Wann trifft die Feuerwehr ein?",
        answer: "Gegen 14:15 Uhr",
        options: ["Gegen 14:00 Uhr", "Gegen 14:15 Uhr", "Gegen 14:30 Uhr", "Gegen 15:00 Uhr"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l18",
    title: "Aufgabe 18: Gespräch über Betriebsferien",
    type: "Gespräch",
    audioPath: "/audio/l18.m4a",
    transcript: `Mitarbeiterin: Guten Tag, Frau Hoffmann. Ich wollte fragen, wann in diesem Jahr die Betriebsferien sind.

Personalreferentin: Guten Tag. Die Firma macht vom 24. Dezember bis zum 6. Januar geschlossen. Zusätzlich gibt es noch Brückentage am 14. und 31. Mai.

Mitarbeiterin: Muss ich für diese Tage Urlaub einreichen?

Personalreferentin: Nein, die Betriebsferien und Brückentage gelten für alle Beschäftigten. Sie werden automatisch abgegolten.

Mitarbeiterin: Vielen Dank für die Information.`,
    questions: [
      {
        q: "Wann sind die Betriebsferien?",
        answer: "Vom 24. Dezember bis zum 6. Januar",
        options: [
          "Vom 20. Dezember bis zum 2. Januar",
          "Vom 24. Dezember bis zum 6. Januar",
          "Vom 27. Dezember bis zum 10. Januar",
          "Vom 1. bis zum 15. Januar",
        ],
        correctIndex: 1,
      },
      {
        q: "Welche zusätzlichen Brückentage gibt es?",
        answer: "Am 14. und 31. Mai",
        options: [
          "Am 1. und 15. Mai",
          "Am 14. und 31. Mai",
          "Am 24. und 31. Dezember",
          "Am 1. und 31. Oktober",
        ],
        correctIndex: 1,
      },
      {
        q: "Muss die Mitarbeiterin Urlaub einreichen?",
        answer: "Nein, die Tage gelten für alle und werden automatisch abgegolten.",
        options: [
          "Ja, für alle Brückentage muss Urlaub beantragt werden.",
          "Nein, die Tage gelten für alle und werden automatisch abgegolten.",
          "Ja, aber nur für die Tage zwischen den Feiertagen.",
          "Nein, aber sie muss eine schriftliche Freistellung beantragen.",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "l19",
    title: "Aufgabe 19: Durchsage zur Parkplatzsperre",
    type: "Ansage",
    audioPath: "/audio/l19.m4a",
    transcript: `Achtung, liebe Kolleginnen und Kollegen. Aus technischen Gründen ist der hintere Parkplatz ab morgen, dem 12. Juni, bis voraussichtlich Freitag gesperrt. Bitte nutzen Sie in dieser Zeit den Parkplatz vor dem Hauptgebäude oder die öffentlichen Parkplätze in der Nähe.

Wer bereits einen Stellplatz auf dem hinteren Parkplatz reserviert hat, kann vorübergehend auf dem Besucherparkplatz parken. Wir bitten um Verständnis.`,
    questions: [
      {
        q: "Welcher Parkplatz ist gesperrt?",
        answer: "Der hintere Parkplatz",
        options: [
          "Der vordere Parkplatz",
          "Der hintere Parkplatz",
          "Der Besucherparkplatz",
          "Der Parkplatz neben dem Hauptgebäude",
        ],
        correctIndex: 1,
      },
      {
        q: "Ab wann ist der Parkplatz gesperrt?",
        answer: "Ab dem 12. Juni",
        options: ["Ab dem 10. Juni", "Ab dem 12. Juni", "Ab dem 14. Juni", "Ab dem 15. Juni"],
        correctIndex: 1,
      },
      {
        q: "Wo können Mitarbeitende mit Reservierung ausweichen?",
        answer: "Auf den Besucherparkplatz",
        options: [
          "Auf den Besucherparkplatz",
          "Auf den hinteren Parkplatz",
          "In die Tiefgarage",
          "Auf die Straße vor dem Betrieb",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: "l20",
    title: "Aufgabe 20: Bestellung von Büromaterial",
    type: "Gespräch",
    audioPath: "/audio/l20.m4a",
    transcript: `Mitarbeiter: Guten Tag, hier ist Frau Yilmaz aus der Buchhaltung. Ich möchte gerne Büromaterial bestellen.

Lieferant: Guten Tag, Frau Yilmaz. Gerne. Welche Artikel benötigen Sie?

Mitarbeiter: Wir brauchen zehn Packungen Druckerpapier A4, fünf Kugelschreiber in blau und drei Ordner in der Farbe rot.

Lieferant: Alles klar. Die Lieferung erfolgt voraussichtlich morgen Vormittag. Sie erhalten vorher eine Versandbestätigung per E-Mail.

Mitarbeiter: Vielen Dank.`,
    questions: [
      {
        q: "Wer ruft beim Lieferanten an?",
        answer: "Frau Yilmaz aus der Buchhaltung",
        options: [
          "Frau Yilmaz aus der Buchhaltung",
          "Frau Yilmaz aus der Personalabteilung",
          "Herr Becker aus der Buchhaltung",
          "Frau Schmidt aus dem Einkauf",
        ],
        correctIndex: 0,
      },
      {
        q: "Welche Farbe sollen die Ordner haben?",
        answer: "Rot",
        options: ["Blau", "Rot", "Grün", "Schwarz"],
        correctIndex: 1,
      },
      {
        q: "Wann erfolgt die Lieferung?",
        answer: "Voraussichtlich morgen Vormittag",
        options: [
          "Voraussichtlich heute Nachmittag",
          "Voraussichtlich morgen Vormittag",
          "Voraussichtlich übermorgen",
          "Voraussichtlich nächste Woche",
        ],
        correctIndex: 1,
      },
    ],
  },
];
