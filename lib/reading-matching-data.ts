export interface MatchingPerson {
  id: string;
  text: string;
}

export interface MatchingArticle {
  id: string;
  text: string;
}

export interface ReadingMatchingTask {
  id: string;
  title: string;
  introText: string;
  people: MatchingPerson[];
  articles: MatchingArticle[];
  matches: Record<string, string>;
  explanations: Record<string, string>;
}

export const readingMatchingTasks: ReadingMatchingTask[] = [
  {
    id: "rm1",
    title: "Lesen Teil 1 – Homeoffice und Arbeitsmodelle",
    introText:
      "Sie lesen online in einer Fachzeitschrift über Arbeitsmodelle. Entscheiden Sie, welcher Artikel a – h zu welcher Person 1 – 5 passt. Jeder Artikel kann nur einmal verwendet werden. Drei Artikel passen zu keiner Person.",
    people: [
      {
        id: "p1",
        text: "1. Frau Meier möchte am liebsten immer von zu Hause aus arbeiten, weil sie weit entfernt wohnt.",
      },
      {
        id: "p2",
        text: "2. Herr Schmidt findet, dass regelmäßige Treffen im Büro wichtig für das Teamgefühl sind.",
      },
      {
        id: "p3",
        text: "3. Frau Yilmaz sucht einen Kompromiss aus Büro und Homeoffice.",
      },
      {
        id: "p4",
        text: "4. Herr Braun befürchtet, dass zu viel Homeoffice die Kommunikation erschwert.",
      },
      {
        id: "p5",
        text: "5. Frau Klein braucht für kreative Arbeiten die Ruhe zu Hause.",
      },
    ],
    articles: [
      { id: "a", text: "a. Das klassische Büro: Hier finden alle wichtigen Besprechungen statt." },
      { id: "b", text: "b. Das reine Homeoffice: Ideal für alle, die weite Wege haben und ungestört arbeiten möchten." },
      { id: "c", text: "c. Hybridmodelle: Mitarbeitende wechseln zwischen Büro und Homeoffice und nutzen die Vorteile beider Orte." },
      { id: "d", text: "d. Teambuilding-Events: Sie stärken den Zusammenhalt, besonders wenn man sich selten sieht." },
      { id: "e", text: "e. Die Gefahren von zu viel Homeoffice: Missverständnisse und Isolation können die Zusammenarbeit erschweren." },
      { id: "f", text: "f. Foktarbeit zu Hause: Viele kreative Prozesse profitieren von Ruhe und wenig Ablenkung." },
      { id: "g", text: "g. Die digitale Infrastruktur: Sie ist die technische Voraussetzung für mobiles Arbeiten." },
      { id: "h", text: "h. Gleitzeitmodelle: Sie ermöglichen flexible Beginn- und Endzeiten, unabhängig vom Arbeitsort." },
    ],
    matches: {
      p1: "b",
      p2: "a",
      p3: "c",
      p4: "e",
      p5: "f",
    },
    explanations: {
      p1: "Frau Meier will immer von zu Hause arbeiten – passt zu Artikel b (reines Homeoffice).",
      p2: "Herr Schmidt betont Büro und Teamgefühl – passt zu Artikel a (klassisches Büro).",
      p3: "Frau Yilmaz sucht einen Kompromiss – passt zu Artikel c (Hybridmodell).",
      p4: "Herr Braun sieht Risiken bei Homeoffice – passt zu Artikel e (Gefahren von zu viel Homeoffice).",
      p5: "Frau Klein braucht Ruhe für kreative Arbeit – passt zu Artikel f (Foktarbeit zu Hause).",
    },
  },
  {
    id: "rm2",
    title: "Lesen Teil 1 – Weiterbildung im Beruf",
    introText:
      "Sie lesen Beiträge aus einer Zeitschrift für Berufstätige. Entscheiden Sie, welcher Artikel a – h zu welcher Person 1 – 5 passt. Jeder Artikel kann nur einmal verwendet werden. Drei Artikel passen zu keiner Person.",
    people: [
      {
        id: "p1",
        text: "1. Herr Özdemir möchte sich beruflich verändern und sucht neue Qualifikationen.",
      },
      {
        id: "p2",
        text: "2. Frau Becker fragt sich, wer die Kosten für Weiterbildung übernimmt.",
      },
      {
        id: "p3",
        text: "3. Herr Schmidt hat Angst, den Anschluss zu verlieren, weil sich die Technik schnell ändert.",
      },
      {
        id: "p4",
        text: "4. Frau Müller möchte Führungskompetenzen erwerben.",
      },
      {
        id: "p5",
        text: "5. Herr Neumann bevorzugt Lernen in der Freizeit, da er tagsüber wenig Zeit hat.",
      },
    ],
    articles: [
      { id: "a", text: "a. Fördermöglichkeiten: Viele Unternehmen übernehmen Kursgebühren oder gewähren bezahlte Freistellungen." },
      { id: "b", text: "b. Abendkurse: Sie richten sich an Berufstätige, die tagsüber arbeiten müssen." },
      { id: "c", text: "c. Berufliche Neuorientierung: Zusatzqualifikationen erleichtern den Wechsel in einen neuen Bereich." },
      { id: "d", text: "d. Lebenslanges Lernen: Wer nicht weiterlernt, verliert schnell den Anschluss an neue Entwicklungen." },
      { id: "e", text: "e. Führungskräftetraining: Gezielte Kurse stärken Kompetenzen wie Teammanagement und Kommunikation." },
      { id: "f", text: "f. Online-Lernen: Flexible Kurse ermöglichen das Lernen von überall und jederzeit." },
      { id: "g", text: "g. Praktische Übungen: Sie helfen, theoretisches Wissen direkt im Arbeitsalltag anzuwenden." },
      { id: "h", text: "h. Anerkannte Zertifikate: Sie verbessern die Chancen auf dem Arbeitsmarkt nachweisbar." },
    ],
    matches: {
      p1: "c",
      p2: "a",
      p3: "d",
      p4: "e",
      p5: "b",
    },
    explanations: {
      p1: "Herr Özdemir will sich beruflich verändern – passt zu Artikel c (Neuorientierung).",
      p2: "Frau Becker fragt nach Kostenübernahme – passt zu Artikel a (Fördermöglichkeiten).",
      p3: "Herr Schmidt fürchtet den Anschlussverlust – passt zu Artikel d (lebenslanges Lernen).",
      p4: "Frau Müller will Führungskompetenzen – passt zu Artikel e (Führungskräftetraining).",
      p5: "Herr Neumann lernt in der Freizeit – passt zu Artikel b (Abendkurse).",
    },
  },
  {
    id: "rm3",
    title: "Lesen Teil 1 – Gesundheit am Arbeitsplatz",
    introText:
      "Sie lesen Tipps zur Gesundheit im Beruf. Entscheiden Sie, welcher Artikel a – h zu welcher Person 1 – 5 passt. Jeder Artikel kann nur einmal verwendet werden. Drei Artikel passen zu keiner Person.",
    people: [
      {
        id: "p1",
        text: "1. Frau Yilmaz leidet unter Rückenschmerzen durch langes Sitzen.",
      },
      {
        id: "p2",
        text: "2. Herr Becker möchte sich im Alltag mehr bewegen.",
      },
      {
        id: "p3",
        text: "3. Frau Schulz fühlt sich oft gestresst und überlastet.",
      },
      {
        id: "p4",
        text: "4. Herr Demir möchte gesünder essen, hat aber wenig Zeit.",
      },
      {
        id: "p5",
        text: "5. Frau Neumann achtet auf eine gute Work-Life-Balance.",
      },
    ],
    articles: [
      { id: "a", text: "a. Ergonomische Arbeitsplätze: Höhenverstellbare Tische und gute Stühle helfen gegen Rückenbeschwerden." },
      { id: "b", text: "b. Pausenaktivierung: Kleine Bewegungseinheiten zwischendurch fördern die Durchblutung." },
      { id: "c", text: "c. Stressmanagement: Regelmäßige Pausen und klare Prioritäten schützen vor Überlastung." },
      { id: "d", text: "d. Meal Prep: Gesunde Mahlzeiten am Wochenende vorbereiten spart Zeit im Arbeitsalltag." },
      { id: "e", text: "e. Flexible Arbeitszeiten: Sie helfen, Beruf und Privatleben besser zu vereinbaren." },
      { id: "f", text: "f. Betriebssport: Viele Firmen bieten Kurse oder Förderungen für sportliche Aktivitäten an." },
      { id: "g", text: "g. Gesundheitsvorsorge: Jährliche Check-ups erkennen Krankheiten frühzeitig." },
      { id: "h", text: "h. Kantinenessen: Eine ausgewogene Kantine macht gesunde Ernährung im Betrieb einfacher." },
    ],
    matches: {
      p1: "a",
      p2: "b",
      p3: "c",
      p4: "d",
      p5: "e",
    },
    explanations: {
      p1: "Frau Yilmaz hat Rückenschmerzen – passt zu Artikel a (ergonomische Arbeitsplätze).",
      p2: "Herr Becker will sich mehr bewegen – passt zu Artikel b (Pausenaktivierung).",
      p3: "Frau Schulz fühlt sich gestresst – passt zu Artikel c (Stressmanagement).",
      p4: "Herr Demir will gesünder essen, hat aber wenig Zeit – passt zu Artikel d (Meal Prep).",
      p5: "Frau Neumann achtet auf Work-Life-Balance – passt zu Artikel e (flexible Arbeitszeiten).",
    },
  },
  {
    id: "rm4",
    title: "Lesen Teil 1 – Mobilität und Umwelt",
    introText:
      "Sie lesen Artikel über nachhaltige Mobilität im Beruf. Entscheiden Sie, welcher Artikel a – h zu welcher Person 1 – 5 passt. Jeder Artikel kann nur einmal verwendet werden. Drei Artikel passen zu keiner Person.",
    people: [
      {
        id: "p1",
        text: "1. Herr Köhler möchte zur Arbeit lieber das Fahrrad nutzen.",
      },
      {
        id: "p2",
        text: "2. Frau Özdemir wohnt weit außerhalb und ist auf das Auto angewiesen.",
      },
      {
        id: "p3",
        text: "3. Herr Schmidt findet, dass öffentliche Verkehrsmittel zu teuer sind.",
      },
      {
        id: "p4",
        text: "4. Frau Demir fährt gerne Bus, weil sie unterwegs arbeiten kann.",
      },
      {
        id: "p5",
        text: "5. Herr Yilmaz organisiert eine Fahrgemeinschaft mit Kollegen.",
      },
    ],
    articles: [
      { id: "a", text: "a. Fahrradprämie: Viele Arbeitgeber unterstützen den Kauf oder die Nutzung eines Dienstfahrrads." },
      { id: "b", text: "b. Jobticket: Ein verbilligtes Ticket macht den öffentlichen Nahverkehr attraktiver." },
      { id: "c", text: "c. Fahrgemeinschaften: Sie sparen Kosten und reduzieren gleichzeitig den Verkehr." },
      { id: "d", text: "d. Homeoffice: Wer nicht pendelt, schont Umwelt und Nerven." },
      { id: "e", text: "e. Elektromobilität: Firmenwagen mit E-Antrieb werden immer beliebter." },
      { id: "f", text: "f. Ländlicher Raum: Dort fehlen oft gute ÖPNV-Anbindungen, sodass das Auto unverzichtbar bleibt." },
      { id: "g", text: "g. Mobilitätsbudget: Arbeitgeber stellen ein Budget zur freien Wahl des Verkehrsmittels zur Verfügung." },
      { id: "h", text: "h. Produktivität unterwegs: In Bus und Bahn kann man lesen, arbeiten oder entspannen." },
    ],
    matches: {
      p1: "a",
      p2: "f",
      p3: "b",
      p4: "h",
      p5: "c",
    },
    explanations: {
      p1: "Herr Köhler will Fahrrad fahren – passt zu Artikel a (Fahrradprämie).",
      p2: "Frau Özdemir ist auf das Auto angewiesen – passt zu Artikel f (ländlicher Raum).",
      p3: "Herr Schmidt findet ÖPNV teuer – passt zu Artikel b (Jobticket).",
      p4: "Frau Demir arbeitet unterwegs – passt zu Artikel h (Produktivität unterwegs).",
      p5: "Herr Yilmaz organisiert Fahrgemeinschaft – passt zu Artikel c (Fahrgemeinschaften).",
    },
  },
  {
    id: "rm5",
    title: "Lesen Teil 1 – Weiterbildung und Qualifizierung",
    introText:
      "Sie lesen Artikel über Weiterbildungsmöglichkeiten im Beruf. Entscheiden Sie, welcher Artikel a – h zu welcher Person 1 – 5 passt. Jeder Artikel kann nur einmal verwendet werden. Drei Artikel passen zu keiner Person.",
    people: [
      { id: "p1", text: "1. Frau Becker möchte gezielt Führungskompetenzen aufbauen." },
      { id: "p2", text: "2. Herr Yilmaz hat wenig Zeit und sucht ein flexibles Lernformat." },
      { id: "p3", text: "3. Frau Demir möchte ihre Sprachkenntnisse für den Beruf verbessern." },
      { id: "p4", text: "4. Herr Schmidt will praxisnah an echten Projekten lernen." },
      { id: "p5", text: "5. Frau Neumann möchte sich berufsbegleitend weiterqualifizieren." },
    ],
    articles: [
      { id: "a", text: "a. Online-Seminare: Lernen Sie zeit- und ortsunabhängig mit Videolektionen und Quizzes." },
      { id: "b", text: "b. Sprachkurse am Abend: Speziell für Berufstätige mit Termindruck konzipiert." },
      { id: "c", text: "c. Leadership-Programm: Gezielte Förderung von Führungskräften mit Coaching." },
      { id: "d", text: "d. Projektpraktikum: Arbeiten Sie drei Monate in einem anderen Team mit echten Aufgaben." },
      { id: "e", text: "e. Konferenzbesuche: Lernen Sie Trends kennen und knüpfen Sie Kontakte." },
      { id: "f", text: "f. Duales Studium: Theorie an der Hochschule und Praxis im Betrieb kombiniert." },
      { id: "g", text: "g. Berufsbegleitendes Studium: Qualifizieren Sie sich neben dem Job mit festen Vorlesungsterminen." },
      { id: "h", text: "h. Interne Mentoring-Programme: Erfahrene Kolleginnen begleiten Sie persönlich." },
    ],
    matches: {
      p1: "c",
      p2: "a",
      p3: "b",
      p4: "d",
      p5: "g",
    },
    explanations: {
      p1: "Frau Becker will Führungskompetenzen aufbauen – passt zu Artikel c (Leadership-Programm).",
      p2: "Herr Yilmaz sucht ein flexibles Format – passt zu Artikel a (Online-Seminare).",
      p3: "Frau Demir will Sprachkenntnisse verbessern – passt zu Artikel b (Sprachkurse am Abend).",
      p4: "Herr Schmidt will praxisnah lernen – passt zu Artikel d (Projektpraktikum).",
      p5: "Frau Neumann will sich berufsbegleitend qualifizieren – passt zu Artikel g (berufsbegleitendes Studium).",
    },
  },
  {
    id: "rm6",
    title: "Lesen Teil 1 – Kommunikation im Team",
    introText:
      "Sie lesen Meinungen von Beschäftigten zu Kommunikation im Betrieb. Entscheiden Sie, welcher Artikel a – h zu welcher Person 1 – 5 passt. Jeder Artikel kann nur einmal verwendet werden. Drei Artikel passen zu keiner Person.",
    people: [
      { id: "p1", text: "1. Herr Köhler findet, dass E-Mails oft zu unübersichtlich werden." },
      { id: "p2", text: "2. Frau Yilmaz schätzt kurze persönliche Absprachen am Arbeitsplatz." },
      { id: "p3", text: "3. Frau Schmidt arbeitet in einem internationalen Team und braucht ein gemeinsames Tool." },
      { id: "p4", text: "4. Herr Demir möchte, dass wichtige Entscheidungen schriftlich festgehalten werden." },
      { id: "p5", text: "5. Frau Becker wünscht sich klarere Regeln für Online-Meetings." },
    ],
    articles: [
      { id: "a", text: "a. E-Mail-Regeln: Betreff präzise, Inhalt strukturiert, Antwortzeit festgelegt." },
      { id: "b", text: "b. Kurze Stand-ups: Täglich 10 Minuten für den Abgleich im Team." },
      { id: "c", text: "c. Protokolle: Nach Besprechungen werden Ergebnisse und Aufgaben schriftlich dokumentiert." },
      { id: "d", text: "d. Chat-Tools: Schneller Austausch, auch über Standorte und Zeitzonen hinweg." },
      { id: "e", text: "e. Meeting-Etikette: Kamera an, Mikrofon stumm bei Ruhe, Redebeiträge melden." },
      { id: "f", text: "f. Feedbackgespräche: Regelmäßige Gespräche zwischen Vorgesetzten und Mitarbeitenden." },
      { id: "g", text: "g. Telefonkonferenzen: Klassische Absprache für alle, die keine Software nutzen wollen." },
      { id: "h", text: "h. Informationsboard: Wichtige Meldungen zentral im Büro sichtbar." },
    ],
    matches: {
      p1: "a",
      p2: "b",
      p3: "d",
      p4: "c",
      p5: "e",
    },
    explanations: {
      p1: "Herr Köhler findet E-Mails unübersichtlich – passt zu Artikel a (E-Mail-Regeln).",
      p2: "Frau Yilmaz schätzt kurze persönliche Absprachen – passt zu Artikel b (Stand-ups).",
      p3: "Frau Schmidt arbeitet international – passt zu Artikel d (Chat-Tools).",
      p4: "Herr Demir will schriftliche Festhaltung – passt zu Artikel c (Protokolle).",
      p5: "Frau Becker will klare Online-Meeting-Regeln – passt zu Artikel e (Meeting-Etikette).",
    },
  },
];
