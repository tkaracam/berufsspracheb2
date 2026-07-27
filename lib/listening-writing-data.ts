export interface ListeningWritingQuestion {
  q: string;
  answer: string;
}

export interface ListeningWritingTask {
  id: string;
  title: string;
  audioPath: string;
  transcript: string;
  questions: ListeningWritingQuestion[];
}

export const listeningWritingTasks: ListeningWritingTask[] = [
  {
    id: "hlw-1",
    title: "Aufgabe 1: Terminvereinbarung",
    audioPath: "/audio/hlw1.m4a",
    transcript: `Guten Tag, hier ist Frau Sandra Meier. Ich rufe wegen meines Termins bei Ihnen an. Leider kann ich den Termin am kommenden Dienstag um 14 Uhr nicht wahrnehmen. Könnten wir den Termin bitte auf Donnerstag um 10 Uhr verschieben? Ich habe noch einige Unterlagen, die ich mitbringen möchte. Meine Telefonnummer ist 0172 1234567. Vielen Dank und auf Wiederhören.`,
    questions: [
      { q: "Wie heißt die Anruferin?", answer: "Frau Sandra Meier" },
      { q: "Wann ist der neue Termin?", answer: "Donnerstag um 10 Uhr" },
      { q: "Was möchte die Anruferin mitbringen?", answer: "Unterlagen" },
    ],
  },
  {
    id: "hlw-2",
    title: "Aufgabe 2: Reklamation",
    audioPath: "/audio/hlw2.m4a",
    transcript: `Guten Tag, mein Name ist Herr Tobias Braun. Ich habe vor einer Woche bei Ihnen einen Schreibtisch bestellt, Bestellnummer 45231. Leider wurde der Schreibtisch beschädigt geliefert. An der rechten Ecke ist ein Kratzer. Ich bitte um einen Austausch oder eine Rückerstattung. Sie erreichen mich unter der Nummer 030 9876543. Vielen Dank.`,
    questions: [
      { q: "Wie heißt der Anrufer?", answer: "Herr Tobias Braun" },
      { q: "Was ist das Problem?", answer: "Der Schreibtisch wurde beschädigt geliefert / Es gibt einen Kratzer an der rechten Ecke" },
      { q: "Welche Lösung wünscht sich der Anrufer?", answer: "Austausch oder Rückerstattung" },
    ],
  },
  {
    id: "hlw-3",
    title: "Aufgabe 3: Krankmeldung",
    audioPath: "/audio/hlw3.m4a",
    transcript: `Guten Morgen, hier ist Aylin Yilmaz aus der Buchhaltung. Ich muss mich leider für heute krankmelden. Ich habe seit gestern Abend Fieber und kann nicht zur Arbeit kommen. Meine Krankmeldung vom Arzt schicke ich Ihnen morgen zu. Ich hoffe, dass ich am übernächsten Tag wieder kommen kann. Entschuldigen Sie die kurzfristige Absage.`,
    questions: [
      { q: "Wer meldet sich krank?", answer: "Aylin Yilmaz" },
      { q: "Was sind die Symptome?", answer: "Fieber" },
      { q: "Wann wird die Krankmeldung vom Arzt eingereicht?", answer: "Morgen" },
    ],
  },
  {
    id: "hlw-4",
    title: "Aufgabe 4: Anfrage nach Lieferstatus",
    audioPath: "/audio/hlw4.m4a",
    transcript: `Guten Tag, hier ist Frau Petra Schulz von der Firma Müller GmbH. Ich wollte nach dem Status meiner Lieferung fragen. Die Bestellnummer lautet 78934. Die Lieferung war für gestern angekündigt, aber sie ist noch nicht angekommen. Wir benötigen die Ware dringend für unser Projekt. Bitte rufen Sie mich zurück unter 040 11223344. Vielen Dank.`,
    questions: [
      { q: "Von welcher Firma ruft die Anruferin an?", answer: "Müller GmbH" },
      { q: "Wie lautet die Bestellnummer?", answer: "78934" },
      { q: "Warum ist die Lieferung wichtig?", answer: "Für ein Projekt benötigt / dringend benötigt" },
    ],
  },
  {
    id: "hlw-5",
    title: "Aufgabe 5: Weiterbildungsanmeldung",
    audioPath: "/audio/hlw5.m4a",
    transcript: `Guten Tag, mein Name ist Markus Lehmann. Ich arbeite in der IT-Abteilung und möchte mich für den Kurs „Projektmanagement Grundlagen" anmelden. Der Kurs beginnt am 15. September und findet dienstags von 17 bis 19 Uhr statt. Bitte bestätigen Sie mir die Anmeldung per E-Mail an m.lehmann@firma.de. Vielen Dank.`,
    questions: [
      { q: "Wie heißt der Anrufer?", answer: "Markus Lehmann" },
      { q: "Für welchen Kurs möchte er sich anmelden?", answer: "Projektmanagement Grundlagen" },
      { q: "Wann beginnt der Kurs?", answer: "Am 15. September" },
    ],
  },
  {
    id: "hlw-6",
    title: "Aufgabe 6: Raumbuchung im Büro",
    audioPath: "/audio/hlw6.m4a",
    transcript: `Guten Tag, hier ist Frau Laura Schmidt aus der Marketingabteilung. Ich möchte gerne den Besprechungsraum 3 für kommenden Dienstag, den 18. Juli, von 10 bis 12 Uhr reservieren. Wir sind zu sechst und benötigen einen Beamer. Bitte bestätigen Sie mir die Buchung per E-Mail an l.schmidt@firma.de. Vielen Dank.`,
    questions: [
      { q: "Wer möchte einen Raum reservieren?", answer: "Frau Laura Schmidt aus der Marketingabteilung" },
      { q: "Welcher Raum und wann soll reserviert werden?", answer: "Besprechungsraum 3, Dienstag, 18. Juli, 10 bis 12 Uhr" },
      { q: "Was wird zusätzlich benötigt?", answer: "Ein Beamer" },
    ],
  },
  {
    id: "hlw-7",
    title: "Aufgabe 7: Technische Störung melden",
    audioPath: "/audio/hlw7.m4a",
    transcript: `Guten Tag, hier ist Herr Thomas Weber aus der Buchhaltung, Etage 2, Raum 205. Mein Computer ist seit heute Morgen sehr langsam und das Programm stürzt ständig ab. Meine Durchwahl ist 312. Könnten Sie bitte einen Techniker vorbeischicken? Ich bin heute bis 16 Uhr erreichbar. Vielen Dank.`,
    questions: [
      { q: "Wer meldet die Störung und wo sitzt er?", answer: "Herr Thomas Weber, Etage 2, Raum 205" },
      { q: "Was ist das Problem?", answer: "Der Computer ist sehr langsam und das Programm stürzt ab." },
      { q: "Unter welcher Durchwahl ist er erreichbar?", answer: "Durchwahl 312" },
    ],
  },
  {
    id: "hlw-8",
    title: "Aufgabe 8: Feedback zum Kundengespräch",
    audioPath: "/audio/hlw8.m4a",
    transcript: `Guten Tag, Frau Becker. Hier ist Peter Hoffmann vom Vertrieb. Ich wollte Ihnen kurz das Feedback vom Kundengespräch heute Mittag weitergeben. Der Kunde ist mit dem neuen Angebot sehr zufrieden, wünscht sich aber eine längere Zahlungsfrist. Er bittet um 30 statt 14 Tage. Bitte prüfen Sie, ob das möglich ist, und rufen Sie mich zurück.`,
    questions: [
      { q: "Wer ruft an und aus welcher Abteilung?", answer: "Peter Hoffmann vom Vertrieb" },
      { q: "Was wünscht sich der Kunde?", answer: "Eine längere Zahlungsfrist von 30 statt 14 Tagen" },
      { q: "Was soll Frau Becker tun?", answer: "Prüfen, ob das möglich ist, und zurückrufen" },
    ],
  },
  {
    id: "hlw-9",
    title: "Aufgabe 9: Anfrage nach Urlaubsvertretung",
    audioPath: "/audio/hlw9.m4a",
    transcript: `Guten Tag, Frau Klein. Hier ist Aylin Yilmaz. Ich bin vom 7. bis zum 14. August im Urlaub. Könnten Sie bitte während dieser Zeit meine E-Mails prüfen und dringende Anfragen an Herrn Schmidt weiterleiten? Wichtig ist der Termin am 10. August mit Frau Müller. Bitte bestätigen Sie mir das kurz. Vielen Dank.`,
    questions: [
      { q: "Wann ist Aylin Yilmaz im Urlaub?", answer: "Vom 7. bis zum 14. August" },
      { q: "Was soll Frau Klein währenddessen tun?", answer: "E-Mails prüfen und dringende Anfragen an Herrn Schmidt weiterleiten" },
      { q: "Welcher Termin ist besonders wichtig?", answer: "Der Termin am 10. August mit Frau Müller" },
    ],
  },
  {
    id: "hlw-10",
    title: "Aufgabe 10: Bestellung von Dienstleistungen",
    audioPath: "/audio/hlw10.m4a",
    transcript: `Guten Tag, hier ist Max Mustermann von der Firma Schmidt GmbH. Wir benötigen für unseren Standort eine professionelle Reinigung der Büroräume. Die Reinigung soll zweimal pro Woche erfolgen, dienstags und donnerstags ab 18 Uhr. Bitte senden Sie mir ein Angebot an m.mustermann@schmidt-gmbh.de. Vielen Dank.`,
    questions: [
      { q: "Wer ruft an und von welcher Firma?", answer: "Max Mustermann von der Firma Schmidt GmbH" },
      { q: "Welche Dienstleistung wird benötigt?", answer: "Professionelle Reinigung der Büroräume" },
      { q: "Wann soll die Reinigung erfolgen?", answer: "Zweimal pro Woche, dienstags und donnerstags ab 18 Uhr" },
    ],
  },
];
