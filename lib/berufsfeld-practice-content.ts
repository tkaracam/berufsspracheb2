type PracticeTask = {
  title: string;
  mode: "Schreiben" | "Sprechen" | "Praxis";
  prompt: string;
  output: string;
  sampleAnswer: string;
  criteria: string[];
};

type RepetitionStage = {
  level: string;
  title: string;
  description: string;
};

type ExamBridge = {
  title: string;
  href: string;
  description: string;
};

type FieldHint = {
  focus: string;
  situation: string;
  recipients: string[];
  speakingPartners: string[];
  keywords: string;
};

const FIELD_HINTS: Record<string, FieldHint> = {
  "logistik-transport": {
    focus: "Lieferprobleme klären, Rückfragen stellen und Absprachen verbindlich festhalten",
    situation: "eine verspätete Lieferung, eine fehlende Position oder eine unklare Tourenplanung",
    recipients: ["Kundschaft", "Spedition", "Schichtleitung"],
    speakingPartners: ["Fahrer", "Lagerteam", "Kunde"],
    keywords: "Lieferung, Wareneingang, Termin, Reklamation",
  },
  "lager-produktion": {
    focus: "Abweichungen melden, Arbeitsabläufe erklären und Sicherheitsfragen ansprechen",
    situation: "ein Maschinenproblem, Materialmangel oder eine Abweichung in der Produktion",
    recipients: ["Schichtleitung", "Qualitätssicherung", "Kollegium"],
    speakingPartners: ["Schichtleiter", "Kollege", "Qualitätskontrolle"],
    keywords: "Maschine, Qualität, Material, Ablauf",
  },
  "pflege-gesundheit": {
    focus: "Beobachtungen weitergeben, empathisch kommunizieren und Informationen dokumentieren",
    situation: "eine Veränderung beim Patienten, eine Übergabe oder eine Rückfrage von Angehörigen",
    recipients: ["Stationsleitung", "Kollegium", "Angehörige"],
    speakingPartners: ["Patient", "Angehörige", "Team"],
    keywords: "Pflege, Beobachtung, Übergabe, Gesundheit",
  },
  "erziehung-paedagogik": {
    focus: "Entwicklungen beschreiben, Eltern informieren und pädagogische Absprachen treffen",
    situation: "eine Beobachtung im Gruppenalltag, ein Elterngespräch oder eine Teamabsprache",
    recipients: ["Eltern", "Kita-Leitung", "Team"],
    speakingPartners: ["Elternteil", "Kollegin", "Leitung"],
    keywords: "Kind, Entwicklung, Alltag, Zusammenarbeit",
  },
  "hotel-gastronomie": {
    focus: "Beschwerden höflich bearbeiten, Gästewünsche aufnehmen und intern abstimmen",
    situation: "eine Reklamation, eine Reservierungsänderung oder eine Rückfrage zum Service",
    recipients: ["Gast", "Rezeption", "Küchenteam"],
    speakingPartners: ["Gast", "Kollege", "Schichtleitung"],
    keywords: "Reservierung, Service, Reklamation, Gast",
  },
  "einzelhandel-verkauf": {
    focus: "beraten, nachfragen, reklamieren und kundenorientiert Lösungen anbieten",
    situation: "eine Rückgabe, ein Beratungsgespräch oder eine Reklamation an der Kasse",
    recipients: ["Kunde", "Filialleitung", "Team"],
    speakingPartners: ["Kundin", "Kollege", "Filialleiter"],
    keywords: "Produkt, Kasse, Umtausch, Beratung",
  },
  "buero-verwaltung": {
    focus: "formelle Nachrichten schreiben, Termine abstimmen und professionell nachfragen",
    situation: "eine Terminverschiebung, fehlende Unterlagen oder eine interne Rückfrage",
    recipients: ["Kollegium", "Kunde", "Vorgesetzte"],
    speakingPartners: ["Sekretariat", "Projektleitung", "Kunde"],
    keywords: "E-Mail, Termin, Unterlagen, Rückfrage",
  },
  "it-digitale-berufe": {
    focus: "Störungen präzise beschreiben, Support geben und technische Schritte verständlich erklären",
    situation: "eine Zugriffsproblematik, ein Supportfall oder ein Ausfall im System",
    recipients: ["Nutzer", "IT-Team", "Projektleitung"],
    speakingPartners: ["Nutzerin", "Support-Team", "Kollege"],
    keywords: "Ticket, Zugang, Fehler, Lösung",
  },
  "handwerk-bau": {
    focus: "Arbeitsstände melden, Sicherheit ansprechen und klare Baustellenabsprachen treffen",
    situation: "eine Planänderung, ein Sicherheitsproblem oder fehlendes Material",
    recipients: ["Bauleitung", "Kollegium", "Kunde"],
    speakingPartners: ["Vorarbeiter", "Kollege", "Bauleiter"],
    keywords: "Baustelle, Material, Sicherheit, Termin",
  },
  "reinigung-gebaeudemanagement": {
    focus: "Hygieneprobleme melden, Reinigungsabläufe erklären und Zustände dokumentieren",
    situation: "ein Sonderreinigungsfall, fehlendes Material oder eine Rückmeldung zum Objekt",
    recipients: ["Objektleitung", "Kunde", "Team"],
    speakingPartners: ["Hausmeister", "Schichtleitung", "Kundin"],
    keywords: "Hygiene, Plan, Material, Objekt",
  },
  "sicherheit-service": {
    focus: "ruhig informieren, Vorfälle beschreiben und in heiklen Situationen deeskalieren",
    situation: "eine Kontrolle, ein Konflikt im Eingangsbereich oder eine Meldung zum Sicherheitsvorfall",
    recipients: ["Schichtleitung", "Empfang", "Leitung"],
    speakingPartners: ["Besucher", "Kollege", "Vorgesetzter"],
    keywords: "Kontrolle, Vorfall, Meldung, Sicherheit",
  },
  "bewerbung-arbeitsmarkt": {
    focus: "sich professionell vorstellen, formelle Anfragen schreiben und Kompetenzen klar darstellen",
    situation: "eine Bewerbung, ein Vorstellungsgespräch oder eine Rückfrage zum Arbeitsvertrag",
    recipients: ["Personalabteilung", "Arbeitgeber", "Unternehmen"],
    speakingPartners: ["Personalreferentin", "Arbeitgeber", "Interviewer"],
    keywords: "Bewerbung, Erfahrung, Vertrag, Motivation",
  },
};

function fallbackHint(feldTitle: string, feldDescription: string): FieldHint {
  return {
    focus: `berufliche Kommunikation in typischen Situationen aus ${feldTitle}`,
    situation: feldDescription || `eine typische Arbeitssituation aus ${feldTitle}`,
    recipients: ["Team", "Leitung", "Kunde"],
    speakingPartners: ["Kollege", "Leitung", "Kunde"],
    keywords: feldTitle,
  };
}

function createWritingTasks(hint: FieldHint): PracticeTask[] {
  return [
    {
      title: "Schreiben 1 – Formelle Nachricht",
      mode: "Schreiben",
      prompt: `Sie arbeiten im Bereich ${hint.keywords}. Schreiben Sie eine formelle Nachricht an ${hint.recipients[0]} zum Thema ${hint.situation}. Beschreiben Sie das Problem klar, nennen Sie die wichtigsten Fakten und formulieren Sie eine konkrete Bitte oder Lösung.`,
      output: "BAMF-nah: klare Struktur, sachlicher Ton, vollständiger Schluss.",
      sampleAnswer: "Ein guter Text nennt zuerst den Anlass, beschreibt dann die Situation mit 2 bis 3 konkreten Informationen und endet mit einer klaren Bitte oder einem Lösungsvorschlag.",
      criteria: [
        "Anlass klar benennen",
        "wichtige Fakten vollständig nennen",
        "höfliche Bitte oder Lösung formulieren",
      ],
    },
    {
      title: "Schreiben 2 – Rückmeldung an den Betrieb",
      mode: "Schreiben",
      prompt: `Formulieren Sie eine kurze berufliche Rückmeldung an ${hint.recipients[1]}. Erklären Sie, was passiert ist, welche Folgen das hat und was als nächster Schritt sinnvoll ist.`,
      output: "B2-Ziel: Informationen ordnen, Ursachen benennen, Handlungsschritt formulieren.",
      sampleAnswer: "Eine passende Antwort beschreibt zuerst das Ereignis, erklärt danach kurz die Auswirkungen und schlägt am Ende den nächsten sinnvollen Schritt vor.",
      criteria: [
        "Situation nachvollziehbar darstellen",
        "Folgen oder Problem benennen",
        "nächsten Schritt logisch formulieren",
      ],
    },
    {
      title: "Schreiben 3 – Lösung vorschlagen",
      mode: "Schreiben",
      prompt: `Schreiben Sie an ${hint.recipients[2]} und schlagen Sie eine praktikable Lösung zu ${hint.situation} vor. Begründen Sie Ihren Vorschlag kurz und freundlich.`,
      output: "DTB-nah: Problem, Vorschlag, Begründung, Abschluss.",
      sampleAnswer: "Ein starker Text zeigt kurz das Problem, macht dann einen umsetzbaren Vorschlag und erklärt in 1 bis 2 Sätzen, warum dieser Vorschlag sinnvoll ist.",
      criteria: [
        "Problem knapp und passend darstellen",
        "konkreten Vorschlag machen",
        "Vorschlag kurz begründen",
      ],
    },
  ];
}

function createSpeakingTasks(hint: FieldHint): PracticeTask[] {
  return [
    {
      title: "Sprechen 1 – Situation erklären",
      mode: "Sprechen",
      prompt: `Sprechen Sie mit ${hint.speakingPartners[0]} über ${hint.situation}. Erklären Sie die Lage verständlich, nennen Sie die wichtigsten Informationen und reagieren Sie auf eine Rückfrage.`,
      output: "Ziel: sicher erklären, nachfragen und verständlich reagieren.",
      sampleAnswer: "Eine gute mündliche Antwort beginnt mit einer kurzen Einordnung, nennt dann die zwei wichtigsten Informationen und reagiert ruhig und direkt auf die Nachfrage.",
      criteria: [
        "Gespräch klar eröffnen",
        "wichtige Informationen verständlich nennen",
        "auf Rückfragen passend reagieren",
      ],
    },
    {
      title: "Sprechen 2 – Lösung abstimmen",
      mode: "Sprechen",
      prompt: `Führen Sie mit ${hint.speakingPartners[1]} ein Gespräch, um eine Lösung zu vereinbaren. Beschreiben Sie das Problem, machen Sie einen Vorschlag und suchen Sie nach einem Kompromiss.`,
      output: "BAMF-nah: Meinung äußern, begründen, gemeinsam entscheiden.",
      sampleAnswer: "Eine passende Antwort beschreibt erst das Problem, schlägt dann eine Lösung vor und zeigt Gesprächsbereitschaft mit Formulierungen wie 'Wie sehen Sie das?' oder 'Wäre das für Sie möglich?'.",
      criteria: [
        "Problem sachlich benennen",
        "eigene Lösung verständlich formulieren",
        "kooperativ auf den Partner eingehen",
      ],
    },
    {
      title: "Sprechen 3 – Berufsnah argumentieren",
      mode: "Sprechen",
      prompt: `Besprechen Sie mit ${hint.speakingPartners[2]}, wie man in Zukunft besser mit ${hint.situation} umgehen kann. Nennen Sie Vorteile, mögliche Schwierigkeiten und Ihre Empfehlung.`,
      output: "B2-Ziel: strukturiert argumentieren und Lösungen entwickeln.",
      sampleAnswer: "Eine starke Antwort nennt zuerst einen Vorschlag, beschreibt dann Vorteile und mögliche Schwierigkeiten und schließt mit einer klaren Empfehlung ab.",
      criteria: [
        "Vorteile und Schwierigkeiten nennen",
        "eigene Position begründen",
        "mit klarer Empfehlung abschließen",
      ],
    },
  ];
}

function createPraxisTask(hint: FieldHint): PracticeTask {
  return {
    title: "Praxisauftrag – Berufsalltag",
    mode: "Praxis",
    prompt: `Bearbeiten Sie ${hint.situation} so, wie es im Berufsalltag verlangt wird: Informationen sammeln, Problem einordnen, angemessen reagieren und das Ergebnis sprachlich klar festhalten.`,
    output: `Fokus: ${hint.focus}.`,
    sampleAnswer: "Eine gute Bearbeitung trennt Beobachtung, Bewertung und Reaktion sauber. Zuerst wird beschrieben, dann eingeordnet und anschließend zielgerichtet gehandelt.",
    criteria: [
      "Situation richtig erfassen",
      "angemessen reagieren",
      "sprachlich klar und beruflich passend bleiben",
    ],
  };
}

export function getBerufsfeldPracticeContent(
  feldId: string,
  feldTitle: string,
  feldDescription: string
) {
  const hint = FIELD_HINTS[feldId] ?? fallbackHint(feldTitle, feldDescription);

  const tasks: PracticeTask[] = [
    createPraxisTask(hint),
    ...createWritingTasks(hint),
    ...createSpeakingTasks(hint),
  ];

  const repetition: RepetitionStage[] = [
    {
      level: "Stufe 1",
      title: "Verstehen und sichern",
      description: `Arbeiten Sie zuerst mit Fachwörtern und Redemitteln zu ${hint.keywords}. Markieren Sie wichtige Muster und typische Formulierungen.`,
    },
    {
      level: "Stufe 2",
      title: "Anwenden im Kurs",
      description: `Übertragen Sie den Wortschatz in kurze Schreibaufgaben, Mini-Dialoge und Rollenspiele. So entsteht aktive Sprachpraxis statt reinem Wiedererkennen.`,
    },
    {
      level: "Stufe 3",
      title: "Prüfungsnah reagieren",
      description: `Formulieren Sie unter Zeitdruck vollständige Antworten, begründen Sie Lösungen und trainieren Sie typische DTB-B2-Handlungsschritte.`,
    },
  ];

  const examBridge: ExamBridge[] = [
    {
      title: "Schreiben wie im Kurs- und Prüfungskontext",
      href: "/pruefungstraining/schreiben",
      description: "Trainieren Sie formelle Mitteilungen, strukturierte Antworten und kurze Stellungnahmen im berufsnahen B2-Stil.",
    },
    {
      title: "Sprechen mit BAMF-/DTB-Nähe",
      href: "/pruefungstraining/sprechen",
      description: "Nutzen Sie diese Situationen für freies Sprechen, Meinungsäußerung, Nachfragen und begründete Lösungsvorschläge.",
    },
    {
      title: "Lesen, Hören und Sprachbausteine verbinden",
      href: "/pruefungstraining",
      description: "Kombinieren Sie Fachwortschatz mit Prüfungsaufgaben, damit Wortschatz, Verständnis und Handlungssprache zusammenwachsen.",
    },
  ];

  return {
    intro: `Für ${feldTitle} sollte das Training möglichst nah an Kurs, Alltag und BAMF-orientierten B2-Aufgaben liegen. Im Mittelpunkt stehen ${hint.focus}.`,
    tasks,
    repetition,
    examBridge,
  };
}
