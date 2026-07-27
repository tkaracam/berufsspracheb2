export interface SprachbausteinQuestion {
  id: string;
  part: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const sprachbausteineQuestions: SprachbausteinQuestion[] = [
  {
    id: "sb1",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Ich habe Ihre Bewerbung erhalten und __________ Sie um weitere Unterlagen.\"",
    options: ["bitte", "frage", "möchte"],
    correctIndex: 0,
    explanation: "'bitten um' ist die feste Verbindung.",
  },
  {
    id: "sb2",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Könnten Sie mir __________, wann Sie frühestens anfangen könnten?\"",
    options: ["sagen", "sprechen", "erzählen"],
    correctIndex: 0,
    explanation: "'mir sagen' passt hier; 'sprechen' und 'erzählen' erfordern andere Konstruktionen.",
  },
  {
    id: "sb3",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Bitte __________ Sie uns Ihre Zeugnisse per E-Mail.\"",
    options: ["schicken", "geben", "machen"],
    correctIndex: 0,
    explanation: "'jemandem etwas schicken' ist korrekt.",
  },
  {
    id: "sb4",
    part: "Teil 2: Auf Anfragen reagieren",
    question:
      "Wählen Sie die passende Antwort. \"Vielen Dank für Ihre __________. Wir werden sie schnellstmöglich bearbeiten.\"",
    options: ["Anfrage", "Frage", "Sache"],
    correctIndex: 0,
    explanation: "'Anfrage' ist der formelle Begriff im Geschäftsverkehr.",
  },
  {
    id: "sb5",
    part: "Teil 2: Auf Anfragen reagieren",
    question:
      "Wählen Sie die passende Antwort. \"Wir können Ihnen leider kein __________ Angebot unterbreiten.\"",
    options: ["besseres", "mehr", "gute"],
    correctIndex: 0,
    explanation: "'ein besseres Angebot' ist grammatisch korrekt (Adjektiv dekliniert).",
  },
  {
    id: "sb6",
    part: "Teil 2: Auf Anfragen reagieren",
    question:
      "Wählen Sie die passende Antwort. \"__________ Ihrer Anfrage teilen wir Ihnen mit, dass ...\"",
    options: ["Aufgrund", "Wegen", "Durch"],
    correctIndex: 0,
    explanation: "'Aufgrund Ihrer Anfrage' ist formell und korrekt.",
  },
  {
    id: "sb7",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Nomen-Verb-Verbindung. \"Die Geschäftsführung muss schnell eine __________ treffen.\"",
    options: ["Entscheidung", "Besprechung", "Termin"],
    correctIndex: 0,
    explanation: "'eine Entscheidung treffen' ist die feste Verbindung.",
  },
  {
    id: "sb8",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Nomen-Verb-Verbindung. \"Der Mitarbeiter hat sein Einverständnis __________.\"",
    options: ["erklärt", "gesagt", "gegeben"],
    correctIndex: 0,
    explanation: "'sein Einverständnis erklären' ist die feste Verbindung.",
  },
  {
    id: "sb9",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Präposition. \"Ich habe großes Interesse __________ dieser Position.\"",
    options: ["an", "für", "auf"],
    correctIndex: 0,
    explanation: "'Interesse an etwas haben' verlangt die Präposition 'an'.",
  },
  {
    id: "sb10",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie den passenden Konnektor. \"Die Software ist teuer, __________ bietet sie viele Vorteile.\"",
    options: ["aber", "weil", "damit"],
    correctIndex: 0,
    explanation: "'aber' drückt den Gegensatz aus.",
  },
  {
    id: "sb11",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Wir haben Ihre Unterlagen erhalten und __________ Sie um Geduld.\"",
    options: ["bitten", "fragen", "sagen"],
    correctIndex: 0,
    explanation: "'bitten um Geduld' ist die korrekte Verbindung.",
  },
  {
    id: "sb12",
    part: "Teil 2: Auf Anfragen reagieren",
    question:
      "Wählen Sie die passende Antwort. \"Leider können wir Ihnen keinen __________ Termin anbieten.\"",
    options: ["früheren", "frühere", "früheres"],
    correctIndex: 0,
    explanation: "Vor dem maskulinen Nomen 'Termin' im Akkusativ Singular heißt es 'früheren'.",
  },
  {
    id: "sb13",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Nomen-Verb-Verbindung. \"Wir müssen Konsequenzen aus diesem Vorfall __________.\"",
    options: ["ziehen", "machen", "tun"],
    correctIndex: 0,
    explanation: "'Konsequenzen ziehen' ist die feste Verbindung.",
  },
  {
    id: "sb14",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Präposition. \"Ich habe mich __________ die Stelle beworben.\"",
    options: ["um", "auf", "für"],
    correctIndex: 0,
    explanation: "'Sich um eine Stelle bewerben' verlangt die Präposition 'um'.",
  },
  {
    id: "sb15",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie den passenden Konnektor. \"Zunächst war das Projekt schwierig, __________ konnten wir es erfolgreich abschließen.\"",
    options: ["aber", "weil", "obwohl"],
    correctIndex: 0,
    explanation: "'aber' drückt einen Gegensatz aus.",
  },
  {
    id: "sb16",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Wir freuen uns, Sie zu einem Gespräch __________.\"",
    options: ["einladen", "laden", "einladend"],
    correctIndex: 0,
    explanation: "'jemanden zu einem Gespräch einladen' ist die feste Verbindung.",
  },
  {
    id: "sb17",
    part: "Teil 2: Auf Anfragen reagieren",
    question:
      "Wählen Sie die passende Antwort. \"__________ Ihrer Bitte senden wir Ihnen die Unterlagen zu.\"",
    options: ["Entsprechend", "Weil", "Trotz"],
    correctIndex: 0,
    explanation: "'Entsprechend Ihrer Bitte' ist formell und korrekt.",
  },
  {
    id: "sb18",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Nomen-Verb-Verbindung. \"Wir müssen eine Lösung für dieses Problem __________.\"",
    options: ["finden", "machen", "geben"],
    correctIndex: 0,
    explanation: "'eine Lösung finden' ist die feste Verbindung.",
  },
  {
    id: "sb19",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Präposition. \"Ich bin __________ die neue Regelung informiert worden.\"",
    options: ["über", "für", "von"],
    correctIndex: 0,
    explanation: "'über etwas informiert werden' verlangt die Präposition 'über'.",
  },
  {
    id: "sb20",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie den passenden Konnektor. \"Der Kurs ist anspruchsvoll, __________ lohnt er sich.\"",
    options: ["aber", "weil", "obwohl"],
    correctIndex: 0,
    explanation: "'aber' drückt einen Gegensatz aus.",
  },
  {
    id: "sb21",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Könnten Sie uns __________, wann Sie verfügbar sind?\"",
    options: ["mitteilen", "sagen", "erzählen"],
    correctIndex: 0,
    explanation: "'uns mitteilen' passt hier besonders gut in der formellen Schrift.",
  },
  {
    id: "sb22",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Nomen-Verb-Verbindung. \"Der Betriebsrat hat sein Einverständnis __________.\"",
    options: ["erklärt", "gesagt", "gegeben"],
    correctIndex: 0,
    explanation: "'sein Einverständnis erklären' ist die feste Verbindung.",
  },
  {
    id: "sb23",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Wir haben Ihre Bewerbung mit großem Interesse __________.\"",
    options: ["gelesen", "gelesenen", "gelesenes"],
    correctIndex: 0,
    explanation: "'gelesen' ist das Partizip II zu 'lesen' und passt hier als Verbform.",
  },
  {
    id: "sb24",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Könnten Sie uns kurz __________, warum Sie sich für unsere Firma interessieren?\"",
    options: ["schildern", "berichten", "erklären"],
    correctIndex: 2,
    explanation: "'erklären' passt hier am besten, weil ein Grund genannt werden soll.",
  },
  {
    id: "sb25",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Wir würden uns __________, Sie bald persönlich kennenzulernen.\"",
    options: ["freuen", "freut", "freuend"],
    correctIndex: 0,
    explanation: "'wir würden uns freuen' ist die korrekte Konjunktiv-II-Form.",
  },
  {
    id: "sb26",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Bitte __________ Sie uns die fehlenden Unterlagen bis zum 10. dieses Monats.\"",
    options: ["senden", "geben", "machen"],
    correctIndex: 0,
    explanation: "'Unterlagen senden' ist die formelle Verbindung.",
  },
  {
    id: "sb27",
    part: "Teil 2: Auf Anfragen reagieren",
    question:
      "Wählen Sie die passende Antwort. \"Wir haben Ihre Anfrage __________ und werden uns bald bei Ihnen melden.\"",
    options: ["erhalten", "bekommen", "genommen"],
    correctIndex: 0,
    explanation: "'erhalten' ist formeller und passt besser in der Geschäftskorrespondenz.",
  },
  {
    id: "sb28",
    part: "Teil 2: Auf Anfragen reagieren",
    question:
      "Wählen Sie die passende Antwort. \"__________ Ihrer Bitte senden wir Ihnen das Protokoll zu.\"",
    options: ["Gemäß", "Trotz", "Während"],
    correctIndex: 0,
    explanation: "'Gemäß Ihrer Bitte' bedeutet 'entsprechend Ihrer Bitte' und ist formell korrekt.",
  },
  {
    id: "sb29",
    part: "Teil 2: Auf Anfragen reagieren",
    question:
      "Wählen Sie die passende Antwort. \"Leider müssen wir Ihnen __________, dass der Termin verschoben werden muss.\"",
    options: ["mitteilen", "sagen", "sprechen"],
    correctIndex: 0,
    explanation: "'mitteilen' ist die formelle Verbindung für schriftliche Informationen.",
  },
  {
    id: "sb30",
    part: "Teil 2: Auf Anfragen reagieren",
    question:
      "Wählen Sie die passende Antwort. \"Wir bedanken uns __________ für Ihr Vertrauen.\"",
    options: ["herzlich", "herzliche", "herzlichen"],
    correctIndex: 0,
    explanation: "'herzlich' ist hier das passende Adverb.",
  },
  {
    id: "sb31",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Nomen-Verb-Verbindung. \"Wir müssen __________ aus der letzten Besprechung ziehen.\"",
    options: ["Lehren", "Lektionen", "Ergebnisse"],
    correctIndex: 0,
    explanation: "'Lehren ziehen' ist die feste Verbindung (Plural von 'Lehre').",
  },
  {
    id: "sb32",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Nomen-Verb-Verbindung. \"Der Chef hat den Mitarbeitern das Projekt __________.\"",
    options: ["erklärt", "gesagt", "gegeben"],
    correctIndex: 0,
    explanation: "'jemandem etwas erklären' passt hier, weil es um das Verständnis geht.",
  },
  {
    id: "sb33",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Präposition. \"Ich bin sehr zufrieden __________ der Zusammenarbeit.\"",
    options: ["mit", "über", "für"],
    correctIndex: 0,
    explanation: "'zufrieden mit etwas sein' verlangt die Präposition 'mit'.",
  },
  {
    id: "sb34",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Präposition. \"Wir haben großen Bedarf __________ qualifizierten Fachkräften.\"",
    options: ["an", "für", "nach"],
    correctIndex: 2,
    explanation: "'Bedarf nach etwas haben' ist die feste Verbindung.",
  },
  {
    id: "sb35",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie den passenden Konnektor. \"Die Aufgabe ist schwierig, __________ lohnt es sich, sie zu lösen.\"",
    options: ["aber", "weil", "obwohl"],
    correctIndex: 0,
    explanation: "'aber' drückt den Gegensatz aus.",
  },
  {
    id: "sb36",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie den passenden Konnektor. \"__________ des schlechten Wetters fand die Veranstaltung statt.\"",
    options: ["Trotz", "Wegen", "Während"],
    correctIndex: 0,
    explanation: "'Trotz des schlechten Wetters' drückt aus, dass etwas trotz eines Hindernisses passiert ist.",
  },
  {
    id: "sb37",
    part: "Teil 1: Rückfragen zu Bewerbungen",
    question:
      "Wählen Sie die passende Antwort. \"Bitte __________ Sie sich, dass Sie alle Angaben wahrheitsgemäß machen.\"",
    options: ["bewusst", "bewusst sein", "seien Sie bewusst"],
    correctIndex: 2,
    explanation: "'Seien Sie sich bewusst' ist die korrekte Aufforderung.",
  },
  {
    id: "sb38",
    part: "Teil 2: Auf Anfragen reagieren",
    question:
      "Wählen Sie die passende Antwort. \"Wir freuen uns, Ihnen __________ zu können, dass Ihr Antrag genehmigt wurde.\"",
    options: ["mitzuteilen", "sagen", "berichten"],
    correctIndex: 0,
    explanation: "'mitteilen, dass ...' ist die formelle Konstruktion.",
  },
  {
    id: "sb39",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Nomen-Verb-Verbindung. \"Wir müssen __________ für die Verzögerung übernehmen.\"",
    options: ["die Verantwortung", "die Möglichkeit", "die Entscheidung"],
    correctIndex: 0,
    explanation: "'die Verantwortung übernehmen' ist die feste Verbindung.",
  },
  {
    id: "sb40",
    part: "Teil 3: Sprachbausteine im Kontext",
    question:
      "Ergänzen Sie die passende Präposition. \"Ich habe mich __________ den Kurs angemeldet.\"",
    options: ["für", "an", "auf"],
    correctIndex: 0,
    explanation: "'sich für einen Kurs anmelden' verlangt die Präposition 'für'.",
  },
];
