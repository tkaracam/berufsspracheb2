export interface GrammarQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const grammarQuestions: GrammarQuestion[] = [
  {
    id: "g1",
    topic: "Konjunktiv I",
    question: "Wie lautet die indirekte Rede? Der Geschäftsführer sagte: 'Die Software wird im September eingeführt.'",
    options: [
      "Der Geschäftsführer sagte, die Software wird im September eingeführt.",
      "Der Geschäftsführer sagte, die Software sei im September eingeführt.",
      "Der Geschäftsführer sagte, die Software würde im September eingeführt.",
    ],
    correctIndex: 1,
    explanation:
      "Im Konjunktiv I wird aus 'wird' (Präsens Indikativ) 'sei' (Konjunktiv I).",
  },
  {
    id: "g2",
    topic: "Konjunktiv I",
    question: "Wählen Sie die korrekte indirekte Rede. Die Kollegin sagte: 'Ich habe den Bericht fertig.'",
    options: [
      "Die Kollegin sagte, sie habe den Bericht fertig.",
      "Die Kollegin sagte, sie hätte den Bericht fertig.",
      "Die Kollegin sagte, sie hat den Bericht fertig.",
    ],
    correctIndex: 0,
    explanation:
      "'Ich habe' wird im Konjunktiv I zu 'sie habe' (haben – Konjunktiv I).",
  },
  {
    id: "g3",
    topic: "Konjunktiv II",
    question: "Welcher Satz ist höflich formuliert?",
    options: [
      "Geben Sie mir die Unterlagen!",
      "Könnten Sie mir bitte die Unterlagen geben?",
      "Sie müssen mir die Unterlagen geben.",
    ],
    correctIndex: 1,
    explanation:
      "'Könnten' ist Konjunktiv II und klingt höflicher als ein Imperativ.",
  },
  {
    id: "g4",
    topic: "Passiv",
    question: "Wählen Sie die korrekte Passiv-Form: Die Rechnung (überweisen) gestern.",
    options: [
      "wurde überwiesen",
      "ist überwiesen worden",
      "wurde überweisen",
    ],
    correctIndex: 0,
    explanation:
      "Vorgangspassiv Präteritum: wurde + Partizip II. 'Die Rechnung wurde gestern überwiesen.'",
  },
  {
    id: "g5",
    topic: "Passiv",
    question: "Welcher Satz enthält eine Passiv-Konstruktion mit Modalverb?",
    options: [
      "Die Ware muss bis Freitag geliefert werden.",
      "Die Ware liefert bis Freitag.",
      "Die Firma liefert die Ware bis Freitag.",
    ],
    correctIndex: 0,
    explanation:
      "'muss geliefert werden' ist Passiv mit Modalverb.",
  },
  {
    id: "g6",
    topic: "Partizipialkonstruktionen",
    question: "Welcher Satz enthält eine Partizipialkonstruktion?",
    options: [
      "Der Antrag, der von der Geschäftsführung genehmigt wurde, liegt vor.",
      "Der von der Geschäftsführung genehmigte Antrag liegt vor.",
      "Die Geschäftsführung genehmigte den Antrag.",
    ],
    correctIndex: 1,
    explanation:
      "'Der von der Geschäftsführung genehmigte Antrag' ist eine Partizipialkonstruktion (Nebensatz verkürzt).",
  },
  {
    id: "g7",
    topic: "Nominalisierung",
    question: "Nominalisieren Sie: 'Wir bitten Sie, den Antrag schnell zu bearbeiten.'",
    options: [
      "Wir bitten um eine schnelle Bearbeitung Ihres Antrags.",
      "Wir bitten Sie, den Antrag schnell bearbeitend.",
      "Wir bitten, schnell den Antrag zu bearbeiten.",
    ],
    correctIndex: 0,
    explanation:
      "'Bearbeiten' wird zum Nomen 'Bearbeitung'.",
  },
  {
    id: "g8",
    topic: "Konnektoren",
    question: "Welcher Konnektor passt? Die Software ist teuer, ____ spart sie langfristig Zeit.",
    options: ["deshalb", "aber", "weil"],
    correctIndex: 1,
    explanation:
      "'Aber' drückt einen Gegensatz aus. 'Deshalb' würde eine Folge bedeuten, 'weil' einen Grund.",
  },
  {
    id: "g9",
    topic: "Konnektoren",
    question: "Welcher Konnektor drückt einen Grund aus?",
    options: ["trotzdem", "angesichts", "dennoch"],
    correctIndex: 1,
    explanation:
      "'Angesichts' leitet einen Grund ein (genitivisch).",
  },
  {
    id: "g10",
    topic: "Modalpartikeln",
    question: "Welche Modalpartikel drückt Erstaunen/Bestätigung aus?",
    options: ["ja", "halt", "wohl"],
    correctIndex: 0,
    explanation:
      "'Das ist ja eine gute Idee' drückt Erstaunen oder Bestätigung aus.",
  },
  {
    id: "g11",
    topic: "Konjunktiv II",
    question: "Wie formuliert man einen Ratschlag höflich?",
    options: [
      "An Ihrer Stelle würde ich mich vorab abstimmen.",
      "An Ihrer Stelle stimme ich mich vorab ab.",
      "An Ihrer Stelle habe ich mich vorab abgestimmt.",
    ],
    correctIndex: 0,
    explanation:
      "'Würde' (Konjunktiv II) macht den Rat höflich.",
  },
  {
    id: "g12",
    topic: "Nominalisierung",
    question: "Welche Nominalisierung ist korrekt?",
    options: [
      "Das Schreiben von E-Mails nimmt viel Zeit in Anspruch.",
      "Das Geschriebene von E-Mails nimmt viel Zeit in Anspruch.",
      "Das Schreibe von E-Mails nimmt viel Zeit in Anspruch.",
    ],
    correctIndex: 0,
    explanation:
      "'Schreiben' ist das Nomen zum Verb 'schreiben'.",
  },
  {
    id: "g13",
    topic: "Konjunktiv I",
    question: "Wählen Sie die korrekte indirekte Rede: 'Wir planen die Einführung für nächste Woche.'",
    options: [
      "Sie sagten, sie planen die Einführung für nächste Woche.",
      "Sie sagten, sie planten die Einführung für nächste Woche.",
      "Sie sagten, sie planeten die Einführung für nächste Woche.",
    ],
    correctIndex: 1,
    explanation:
      "Konjunktiv I von 'planen' ist 'planten'. 'Planeten' wäre falsch geschrieben.",
  },
  {
    id: "g14",
    topic: "Passiv",
    question: "Welcher Satz ist im Zustandspassiv?",
    options: [
      "Der Brief wurde geschrieben.",
      "Der Brief ist geschrieben.",
      "Der Brief wird geschrieben.",
    ],
    correctIndex: 1,
    explanation:
      "'Ist geschrieben' ist Zustandspassiv (Ergebnis).",
  },
  {
    id: "g15",
    topic: "Partizipialkonstruktionen",
    question: "Welche Konstruktion ist korrekt?",
    options: [
      "Der gestern gelieferte Ware war beschädigt.",
      "Die gestern gelieferte Ware war beschädigt.",
      "Die gestern gelieferten Ware war beschädigt.",
    ],
    correctIndex: 1,
    explanation:
      "'Die Ware' ist feminin und Singular, daher 'die gestern gelieferte Ware'.",
  },
  {
    id: "g16",
    topic: "Konnektoren",
    question: "Welcher Konnektor passt am besten? ____ der hohen Kosten entschieden wir uns für das Angebot.",
    options: ["Trotz", "Wegen", "Indem"],
    correctIndex: 1,
    explanation:
      "'Wegen' leitet einen Grund ein (Genitiv/Dativ).",
  },
  {
    id: "g17",
    topic: "Modalpartikeln",
    question: "Welche Modalpartikel drückt Vermutung aus?",
    options: ["ja", "halt", "wohl"],
    correctIndex: 2,
    explanation:
      "'Er kommt wohl erst morgen' drückt eine Vermutung aus.",
  },
  {
    id: "g18",
    topic: "Nebensätze",
    question: "Welcher Satz enthält einen Finalsatz?",
    options: [
      "Ich rufe an, damit wir einen Termin vereinbaren.",
      "Ich rufe an, weil ich einen Termin brauche.",
      "Ich rufe an, obwohl ich keine Zeit habe.",
    ],
    correctIndex: 0,
    explanation:
      "'Damit' leitet einen Finalsatz (Zweck) ein.",
  },
  {
    id: "g19",
    topic: "Relativsätze",
    question: "Welche Relativpronomen sind korrekt? Der Mitarbeiter, ______ gestern gekündigt hat, war lange krank.",
    options: ["der", "den", "dem"],
    correctIndex: 0,
    explanation:
      "'Der' ist Nominativ Singular Maskulin und bezieht sich auf 'der Mitarbeiter'.",
  },
  {
    id: "g20",
    topic: "Präpositionen",
    question: "Wählen Sie die richtige Präposition: Ich habe mich ______ das Angebot entschieden.",
    options: ["für", "gegen", "mit"],
    correctIndex: 0,
    explanation:
      "'Sich für etwas entscheiden' ist die feste Verbindung.",
  },
  {
    id: "g21",
    topic: "Adjektivdeklination",
    question: "Welche Form ist korrekt? Ein ______ Mitarbeiter meldete sich krank.",
    options: ["junge", "junger", "jungen"],
    correctIndex: 1,
    explanation:
      "Nach dem unbestimmten Artikel 'ein' im Nominativ Maskulin heißt es 'junger Mitarbeiter'.",
  },
  {
    id: "g22",
    topic: "Konjunktiv II",
    question: "Wie formuliert man einen höflichen Wunsch?",
    options: [
      "Ich möchte gern früher gehen.",
      "Ich will früher gehen.",
      "Ich gehe früher.",
    ],
    correctIndex: 0,
    explanation:
      "'Möchte' ist Konjunktiv II von 'mögen' und drückt einen höflichen Wunsch aus.",
  },
  {
    id: "g23",
    topic: "dass-Sätze",
    question: "Wählen Sie die korrekte Wortstellung. Ich hoffe, ____",
    options: [
      "dass er morgen kommt.",
      "dass kommt er morgen.",
      "dass er kommt morgen.",
    ],
    correctIndex: 0,
    explanation:
      "In dass-Sätzen steht das konjugierte Verb am Ende: 'dass er morgen kommt'.",
  },
  {
    id: "g24",
    topic: "Reflexive Verben",
    question: "Ergänzen Sie das korrekte Reflexivpronomen. Ich habe ____ für das Seminar angemeldet.",
    options: ["mich", "mir", "sich"],
    correctIndex: 0,
    explanation:
      "'sich anmelden' wird mit Akkusativ verwendet: 'Ich habe mich angemeldet.'",
  },
  {
    id: "g25",
    topic: "Vergleich",
    question: "Welche Steigerung ist korrekt? Diese Lösung ist ____ als die andere.",
    options: ["besser", "mehr gut", "guter"],
    correctIndex: 0,
    explanation:
      "'gut' wird unregelmäßig gesteigert: gut – besser – am besten.",
  },
  {
    id: "g26",
    topic: "Futur I",
    question: "Welcher Satz steht im Futur I?",
    options: [
      "Wir werden das Projekt nächste Woche abschließen.",
      "Wir haben das Projekt abgeschlossen.",
      "Wir schließen das Projekt ab.",
    ],
    correctIndex: 0,
    explanation:
      "'werden + Infinitiv' bildet das Futur I.",
  },
  {
    id: "g27",
    topic: "Präpositionen",
    question: "Wählen Sie die richtige Präposition: Er arbeitet ____ einem internationalen Projekt.",
    options: ["an", "mit", "für"],
    correctIndex: 0,
    explanation:
      "'an etwas arbeiten' ist die korrekte Verbindung.",
  },
  {
    id: "g28",
    topic: "Relativsätze",
    question: "Welches Relativpronomen passt? Die Kollegin, ____ ich gestern getroffen habe, ist neu.",
    options: ["die", "der", "den"],
    correctIndex: 0,
    explanation:
      "'die' ist Akkusativ Singular Feminin und bezieht sich auf 'die Kollegin'.",
  },
  {
    id: "g29",
    topic: "Nebensätze",
    question: "Welcher Satz enthält einen Kausalsatz?",
    options: [
      "Ich bleibe zu Hause, weil ich krank bin.",
      "Ich bleibe zu Hause, obwohl ich gesund bin.",
      "Ich bleibe zu Hause, damit ich mich ausruhe.",
    ],
    correctIndex: 0,
    explanation:
      "'weil' leitet einen Kausalsatz (Grund) ein.",
  },
  {
    id: "g30",
    topic: "Passiv",
    question: "Wählen Sie die korrekte Passiv-Form: Die Anträge ____ bis Freitag bearbeitet.",
    options: [
      "werden",
      "wurden",
      "sind",
    ],
    correctIndex: 0,
    explanation:
      "'Die Anträge werden bis Freitag bearbeitet' ist Vorgangspassiv Präsens.",
  },
  {
    id: "g31",
    topic: "Plusquamperfekt",
    question: "Welcher Satz steht im Plusquamperfekt?",
    options: [
      "Die Ware war schon geliefert worden.",
      "Die Ware wird geliefert.",
      "Die Ware ist geliefert worden.",
    ],
    correctIndex: 0,
    explanation:
      "Plusquamperfekt: war/waren + Partizip II + worden. Es beschreibt Vorzeitigkeit in der Vergangenheit.",
  },
  {
    id: "g32",
    topic: "Genitiv",
    question: "Welcher Satz enthält den Genitiv?",
    options: [
      "Die Meinung des Kunden ist wichtig.",
      "Der Kunde sagt seine Meinung.",
      "Ich spreche mit dem Kunden.",
    ],
    correctIndex: 0,
    explanation:
      "'Des Kunden' ist Genitiv Singular Maskulin.",
  },
  {
    id: "g33",
    topic: "Steigerung",
    question: "Welche Steigerung ist korrekt?",
    options: [
      "Diese Methode ist am effizientesten.",
      "Diese Methode ist die effizienteste.",
      "Diese Methode ist am effizientersten.",
    ],
    correctIndex: 0,
    explanation:
      "Superlativ mit 'am' endet auf '-sten': 'am effizientesten'.",
  },
  {
    id: "g34",
    topic: "Modalverben",
    question: "Welcher Satz drückt Erlaubnis aus?",
    options: [
      "Sie dürfen den Raum betreten.",
      "Sie können den Raum betreten.",
      "Sie müssen den Raum betreten.",
    ],
    correctIndex: 0,
    explanation:
      "'Dürfen' drückt Erlaubnis aus, 'können' Fähigkeit und 'müssen' Notwendigkeit.",
  },
  {
    id: "g35",
    topic: "Infinitiv mit zu",
    question: "Welcher Satz enthält einen Infinitivsatz mit 'zu'?",
    options: [
      "Ich habe vor, morgen früher zu kommen.",
      "Ich komme morgen früher.",
      "Ich habe morgen früher gekommen.",
    ],
    correctIndex: 0,
    explanation:
      "'Vorhaben, etwas zu tun' ist eine Infinitivkonstruktion mit zu.",
  },
  {
    id: "g36",
    topic: "Indefinitpronomen",
    question: "Welches Indefinitpronomen passt? ____ hat den Fehler bemerkt.",
    options: ["Niemand", "Jeder", "Alle"],
    correctIndex: 0,
    explanation:
      "'Niemand' bezieht sich auf niemanden und steht im Singular.",
  },
  {
    id: "g37",
    topic: "N-Deklination",
    question: "Welche Form ist korrekt? Der Kunde dankte dem ____.",
    options: ["Kunden", "Kunde", "Kundes"],
    correctIndex: 0,
    explanation:
      "Schwache Maskulina (N-Deklination) bilden den Dativ Singular auf '-en': 'dem Kunden'.",
  },
  {
    id: "g38",
    topic: "Passiv-Ersatzformen",
    question: "Welcher Satz enthält eine Passiv-Ersatzform?",
    options: [
      "Der Bericht liegt vor.",
      "Der Bericht wurde geschrieben.",
      "Der Bericht wird geschrieben.",
    ],
    correctIndex: 0,
    explanation:
      "'Liegt vor' ist eine Ersatzform für Passiv (Zustandspassiv-Ersatz).",
  },
  {
    id: "g39",
    topic: "Konnektoren",
    question: "Welcher Konnektor drückt einen Gegensatz aus? Die Lieferung kam an, ____ sie beschädigt war.",
    options: ["obwohl", "weil", "damit"],
    correctIndex: 0,
    explanation:
      "'Obwohl' leitet einen Konzessivsatz (Gegensatz) ein.",
  },
  {
    id: "g40",
    topic: "Zweiteilige Konnektoren",
    question: "Welcher Satz verwendet einen zweiteiligen Konnektor korrekt?",
    options: [
      "Entweder kommen Sie zur Besprechung, oder wir verschieben den Termin.",
      "Entweder kommen Sie zur Besprechung, aber wir verschieben den Termin.",
      "Entweder kommen Sie zur Besprechung, deshalb verschieben wir den Termin.",
    ],
    correctIndex: 0,
    explanation:
      "'Entweder ... oder' ist ein zweiteiliger Konnektor für Alternativen.",
  },
  {
    id: "g41",
    topic: "als / wie",
    question: "Welche Partikel passt? Die neue Software arbeitet ____ erwartet.",
    options: ["wie", "als", "denn"],
    correctIndex: 0,
    explanation:
      "'Wie' wird bei Gleichheit verwendet: 'so ... wie' oder 'wie erwartet'.",
  },
  {
    id: "g42",
    topic: "Temporale Konnektoren",
    question: "Welcher Konnektor drückt Gleichzeitigkeit aus?",
    options: ["während", "bevor", "nachdem"],
    correctIndex: 0,
    explanation:
      "'Während' drückt aus, dass zwei Handlungen gleichzeitig stattfinden.",
  },
  {
    id: "g43",
    topic: "Artikel",
    question: "Welcher Artikel ist korrekt? ____ Software wurde aktualisiert.",
    options: ["Die", "Der", "Das"],
    correctIndex: 0,
    explanation:
      "'Software' ist feminin, daher 'die Software'.",
  },
  {
    id: "g44",
    topic: "Trennbare Verben",
    question: "Welcher Satz enthält ein trennbares Verb in der richtigen Form?",
    options: [
      "Wir führen das neue System morgen ein.",
      "Wir einführen das neue System morgen.",
      "Wir führen ein das neue System morgen.",
    ],
    correctIndex: 0,
    explanation:
      "Bei trennbaren Verben steht die Vorsilbe am Satzende: 'führen ... ein'.",
  },
  {
    id: "g45",
    topic: "Partizip II",
    question: "Welche Partizip-II-Form ist korrekt?",
    options: ["angeboten", "angebietet", "angebotet"],
    correctIndex: 0,
    explanation:
      "'Anbieten' bildet das Partizip II unregelmäßig: 'angeboten'.",
  },
  {
    id: "g46",
    topic: "Konjunktiv II",
    question: "Wie formuliert man eine höfliche Bitte?",
    options: [
      "Könnten Sie mir bitte helfen?",
      "Helfen Sie mir sofort!",
      "Sie helfen mir bitte.",
    ],
    correctIndex: 0,
    explanation:
      "'Könnten' ist Konjunktiv II und drückt eine höfliche Bitte aus.",
  },
  {
    id: "g47",
    topic: "Präpositionen",
    question: "Wählen Sie die richtige Präposition: Ich habe mich ____ den neuen Kollegen vorgestellt.",
    options: ["bei", "mit", "für"],
    correctIndex: 1,
    explanation:
      "'Sich mit jemandem vorstellen' ist die korrekte Verbindung.",
  },
  {
    id: "g48",
    topic: "Adjektivdeklination",
    question: "Welche Form ist korrekt? Die ____ Kollegin hat den Preis gewonnen.",
    options: ["erfahrene", "erfahrenen", "erfahrenem"],
    correctIndex: 0,
    explanation:
      "'Die erfahrene Kollegin' ist Nominativ Singular Feminin mit bestimmtem Artikel.",
  },
  {
    id: "g49",
    topic: "Relativsätze",
    question: "Welches Relativpronomen passt? Das Projekt, ____ wir gestern besprochen haben, startet nächste Woche.",
    options: ["das", "dem", "dessen"],
    correctIndex: 0,
    explanation:
      "'Das' bezieht sich auf 'das Projekt' (Akkusativ Singular Neutrum).",
  },
  {
    id: "g50",
    topic: "Konnektoren",
    question: "Welcher Konnektor passt? Wir müssen uns beeilen, ____ der Zug gleich abfährt.",
    options: ["weil", "obwohl", "damit"],
    correctIndex: 0,
    explanation:
      "'Weil' leitet einen Kausalsatz (Grund) ein.",
  },
  {
    id: "g51",
    topic: "Indirekte Fragen",
    question: "Wählen Sie die korrekte indirekte Frage. 'Wann beginnt die Besprechung?'",
    options: [
      "Können Sie mir sagen, wann die Besprechung beginnt?",
      "Können Sie mir sagen, wann beginnt die Besprechung?",
      "Können Sie mir sagen, die Besprechung wann beginnt?",
    ],
    correctIndex: 0,
    explanation:
      "In indirekten Fragen steht das Verb am Ende: 'wann die Besprechung beginnt'.",
  },
  {
    id: "g52",
    topic: "Artikel",
    question: "Welcher Artikel ist korrekt? ____ Kundenbeschwerde wurde bearbeitet.",
    options: ["Die", "Der", "Das"],
    correctIndex: 0,
    explanation:
      "'Kundenbeschwerde' ist feminin, daher 'die Kundenbeschwerde'.",
  },
  {
    id: "g53",
    topic: "Reflexive Verben",
    question: "Ergänzen Sie das korrekte Reflexivpronomen. Er hat ____ sehr über das Geschenk gefreut.",
    options: ["sich", "ihn", "ihm"],
    correctIndex: 0,
    explanation:
      "'Sich freuen' ist reflexiv und wird mit Akkusativ verwendet: 'Er hat sich gefreut'.",
  },
  {
    id: "g54",
    topic: "Nomen-Verb-Verbindungen",
    question: "Welche Nomen-Verb-Verbindung ist korrekt? Wir müssen ____ aus diesem Vorfall ziehen.",
    options: ["Lehren", "Lektionen", "Ergebnisse"],
    correctIndex: 0,
    explanation:
      "'Lehren ziehen' ist die feste Verbindung (Plural von 'Lehre').",
  },
  {
    id: "g55",
    topic: "Präteritum",
    question: "Welche Präteritum-Form ist korrekt? Er ____ gestern krank.",
    options: ["war", "ist", "wurde"],
    correctIndex: 0,
    explanation:
      "'War' ist das Präteritum von 'sein': 'Er war gestern krank'.",
  },
  {
    id: "g56",
    topic: "Futur II",
    question: "Welcher Satz steht im Futur II?",
    options: [
      "Bis morgen werde ich den Bericht geschrieben haben.",
      "Bis morgen schreibe ich den Bericht.",
      "Bis morgen habe ich den Bericht geschrieben.",
    ],
    correctIndex: 0,
    explanation:
      "Futur II: werden + Partizip II + haben/sein. 'Ich werde den Bericht geschrieben haben'.",
  },
  {
    id: "g57",
    topic: "Konzessivsätze",
    question: "Welcher Konnektor drückt einen Gegensatz aus? ____ des Regens kamen alle pünktlich.",
    options: ["Trotz", "Wegen", "Durch"],
    correctIndex: 0,
    explanation:
      "'Trotz' drückt aus, dass etwas trotz eines Hindernisses passiert.",
  },
  {
    id: "g58",
    topic: "Konditionalsätze",
    question: "Welcher Satz enthält einen Konditionalsatz?",
    options: [
      "Wenn wir den Auftrag bekommen, freuen wir uns sehr.",
      "Weil wir den Auftrag bekommen haben, freuen wir uns sehr.",
      "Obwohl wir den Auftrag bekommen haben, freuen wir uns sehr.",
    ],
    correctIndex: 0,
    explanation:
      "'Wenn' leitet einen Konditionalsatz (Bedingung) ein.",
  },
  {
    id: "g59",
    topic: "Indefinitpronomen",
    question: "Welches Indefinitpronomen passt? ____ von uns hat die E-Mail erhalten.",
    options: ["Jeder", "Alle", "Manche"],
    correctIndex: 0,
    explanation:
      "'Jeder' steht im Singular und passt zu 'hat'.",
  },
  {
    id: "g60",
    topic: "Passiv",
    question: "Wählen Sie die korrekte Passiv-Form: Das Problem ____ gelöst.",
    options: ["wurde", "wird", "ist"],
    correctIndex: 1,
    explanation:
      "'Das Problem wird gelöst' ist Vorgangspassiv Präsens.",
  },
  {
    id: "g61",
    topic: "Konjunktiv I",
    question: "Wählen Sie die korrekte indirekte Rede. 'Wir sind mit dem Ergebnis zufrieden.'",
    options: [
      "Sie sagten, sie seien mit dem Ergebnis zufrieden.",
      "Sie sagten, sie wären mit dem Ergebnis zufrieden.",
      "Sie sagten, sie sind mit dem Ergebnis zufrieden.",
    ],
    correctIndex: 0,
    explanation:
      "Konjunktiv I von 'sind' ist 'seien'. 'Wären' wäre Konjunktiv II.",
  },
  {
    id: "g62",
    topic: "Präpositionen",
    question: "Wählen Sie die richtige Präposition: Ich bin ____ Ihre Anfrage informiert worden.",
    options: ["über", "für", "von"],
    correctIndex: 0,
    explanation:
      "'Über etwas informiert werden' ist die feste Verbindung.",
  },
  {
    id: "g63",
    topic: "Adjektivdeklination",
    question: "Welche Form ist korrekt? Mit ____ Kollegen arbeite ich gern zusammen.",
    options: ["erfahrenen", "erfahrene", "erfahrenem"],
    correctIndex: 0,
    explanation:
      "'Mit erfahrenen Kollegen' ist Dativ Plural mit bestimmtem Artikel (hier: Nullartikel + Adjektivendung -en).",
  },
  {
    id: "g64",
    topic: "Nebensätze",
    question: "Welcher Satz enthält einen Konsekutivsatz (Folge)?",
    options: [
      "Es regnete so stark, dass wir die Veranstaltung absagten.",
      "Es regnete so stark, weil wir die Veranstaltung absagten.",
      "Es regnete so stark, obwohl wir die Veranstaltung absagten.",
    ],
    correctIndex: 0,
    explanation:
      "'So ... dass' leitet einen Konsekutivsatz (Folge) ein.",
  },
  {
    id: "g65",
    topic: "Zweiteilige Konnektoren",
    question: "Welcher Satz verwendet einen zweiteiligen Konnektor korrekt?",
    options: [
      "Weder hat er angerufen, noch hat er geschrieben.",
      "Weder hat er angerufen, aber er hat geschrieben.",
      "Weder hat er angerufen, deshalb hat er geschrieben.",
    ],
    correctIndex: 0,
    explanation:
      "'Weder ... noch' ist ein zweiteiliger Konnektor für Ausschluss.",
  },
  {
    id: "g66",
    topic: "Relativsätze",
    question: "Welcher Relativsatz ist korrekt? Der Mitarbeiter, ____ den Bericht geschrieben hat, ist krank.",
    options: ["der", "den", "dem"],
    correctIndex: 0,
    explanation:
      "'Der' ist der Nominativ-Relativpronomen für maskulin und bezieht sich auf das Subjekt.",
  },
  {
    id: "g67",
    topic: "Relativsätze",
    question: "Wählen Sie die richtige Form: Die Firma, ____ ich vor drei Jahren gearbeitet habe, hat geschlossen.",
    options: ["bei der", "bei deren", "bei dem"],
    correctIndex: 0,
    explanation:
      "'Bei der' ist korrekt, weil 'Firma' feminin ist und die Präposition 'bei' mit Dativ verlangt.",
  },
  {
    id: "g68",
    topic: "Infinitiv mit zu",
    question: "Welcher Satz enthält einen Infinitivsatz mit 'zu'?",
    options: [
      "Ich hoffe, dass ich die Prüfung bestehe.",
      "Ich hoffe, die Prüfung zu bestehen.",
      "Ich hoffe, die Prüfung bestehend.",
    ],
    correctIndex: 1,
    explanation:
      "'Hoffen' kann mit einem Infinitivsatz mit 'zu' konstruiert werden.",
  },
  {
    id: "g69",
    topic: "Um ... zu",
    question: "Welcher Satz verwendet 'um ... zu' korrekt?",
    options: [
      "Ich lerne, um die Prüfung bestehen.",
      "Ich lerne, um die Prüfung zu bestehen.",
      "Ich lerne, um die Prüfung bestehend.",
    ],
    correctIndex: 1,
    explanation:
      "'Um ... zu' drückt einen Zweck aus und verlangt den Infinitiv mit 'zu'.",
  },
  {
    id: "g70",
    topic: "Vergleichskonstruktionen",
    question: "Welcher Satz ist korrekt?",
    options: [
      "Je mehr man übt, desto besser wird man.",
      "Je mehr man übt, umso besser wird man.",
      "Beides ist korrekt.",
    ],
    correctIndex: 2,
    explanation:
      "Sowohl 'je ... desto' als auch 'je ... umso' sind korrekte Vergleichskonstruktionen.",
  },
  {
    id: "g71",
    topic: "Plusquamperfekt",
    question: "Welcher Satz steht im Plusquamperfekt?",
    options: [
      "Er hatte den Bericht schon abgegeben, bevor der Chef kam.",
      "Er hat den Bericht abgegeben.",
      "Er gab den Bericht ab.",
    ],
    correctIndex: 0,
    explanation:
      "'Hatte abgegeben' ist Plusquamperfekt und drückt eine Vorvergangenheit aus.",
  },
  {
    id: "g72",
    topic: "Futur I",
    question: "Welcher Satz steht im Futur I?",
    options: [
      "Wir werden uns morgen mit dem Kunden treffen.",
      "Wir treffen uns morgen mit dem Kunden.",
      "Wir haben uns morgen mit dem Kunden getroffen.",
    ],
    correctIndex: 0,
    explanation:
      "'Werden ... treffen' ist Futur I und drückt Zukünftiges aus.",
  },
  {
    id: "g73",
    topic: "Reflexive Verben",
    question: "Welcher Satz ist korrekt?",
    options: [
      "Ich freue mich auf die Zusammenarbeit.",
      "Ich freue auf die Zusammenarbeit.",
      "Ich freue mir auf die Zusammenarbeit.",
    ],
    correctIndex: 0,
    explanation:
      "'Sich freuen auf' ist reflexiv und verlangt das Akkusativ-Reflexivpronomen 'mich'.",
  },
  {
    id: "g74",
    topic: "Verben mit Präpositionen",
    question: "Welche Präposition passt zu 'sich beschweren'?",
    options: ["über", "für", "mit"],
    correctIndex: 0,
    explanation:
      "Man beschwert sich 'über' etwas oder jemanden.",
  },
  {
    id: "g75",
    topic: "Verben mit Präpositionen",
    question: "Welche Präposition passt zu 'sich interessieren'?",
    options: ["für", "an", "über"],
    correctIndex: 0,
    explanation:
      "'Sich interessieren für' ist die feste Verbindung.",
  },
  {
    id: "g76",
    topic: "Konjunktiv II",
    question: "Welcher Satz ist Konjunktiv II der Höflichkeit?",
    options: [
      "Könnten Sie mir bitte helfen?",
      "Können Sie mir helfen?",
      "Helfen Sie mir!",
    ],
    correctIndex: 0,
    explanation:
      "'Könnten' ist Konjunktiv II und macht die Bitte höflicher.",
  },
  {
    id: "g77",
    topic: "Adjektivdeklination",
    question: "Welche Form ist korrekt? Das ist ein ____ Problem.",
    options: ["großes", "große", "großen"],
    correctIndex: 0,
    explanation:
      "Nach dem unbestimmten Artikel 'ein' im Nominativ Neutrum lautet die Endung '-es'.",
  },
  {
    id: "g78",
    topic: "Artikel",
    question: "Welcher Artikel ist korrekt? ____ Sachbearbeiter bearbeitet den Antrag.",
    options: ["Der", "Die", "Das"],
    correctIndex: 0,
    explanation:
      "'Sachbearbeiter' ist maskulin und wird im Nominativ Singular mit 'der' verwendet.",
  },
  {
    id: "g79",
    topic: "Wortstellung",
    question: "Welcher Satz hat die korrekte Wortstellung?",
    options: [
      "Weil er krank war, er blieb zu Hause.",
      "Weil er krank war, blieb er zu Hause.",
      "Er blieb zu Hause, weil krank er war.",
    ],
    correctIndex: 1,
    explanation:
      "Im Hauptsatz steht das finite Verb an zweiter Stelle: 'blieb er'.",
  },
  {
    id: "g80",
    topic: "Konjunktiv I",
    question: "Wählen Sie die korrekte indirekte Rede. 'Wir werden die Lieferung morgen verschicken.'",
    options: [
      "Sie sagten, sie werden die Lieferung morgen verschicken.",
      "Sie sagten, sie würden die Lieferung morgen verschicken.",
      "Sie sagten, sie werden die Lieferung morgen zu verschicken.",
    ],
    correctIndex: 1,
    explanation:
      "Konjunktiv I von 'werden' ist 'würden' in der indirekten Rede.",
  },
];
