type PracticeTask = {
  title: string;
  mode: "Schreiben" | "Sprechen" | "Praxis";
  prompt: string;
  output: string;
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
  writing: string;
  speaking: string;
  situation: string;
  repetition: string;
};

const FIELD_HINTS: Record<string, FieldHint> = {
  "logistik-transport": {
    focus: "Lieferabweichungen, Rückfragen und klare Abstimmung in der Transportkette",
    writing: "eine kurze Reklamations- oder Statusmail zur Lieferung",
    speaking: "ein Klärungsgespräch mit Lager, Fahrer oder Kundschaft",
    situation: "eine verspätete Lieferung oder fehlende Ware",
    repetition: "Fachwörter zu Lieferung, Lager und Transportablauf",
  },
  "lager-produktion": {
    focus: "Arbeitsanweisungen, Sicherheit und Rückmeldungen zur Produktion",
    writing: "eine kurze Notiz zu Fehlern, Material oder Übergaben",
    speaking: "eine Rückfrage zu Schicht, Maschine oder Qualitätskontrolle",
    situation: "eine Abweichung in der Produktion oder bei der Verpackung",
    repetition: "Begriffe zu Maschine, Qualität und Produktionsschritten",
  },
  "pflege-gesundheit": {
    focus: "Patientenkommunikation, Übergaben und dokumentierte Beobachtungen",
    writing: "eine knappe Pflegenotiz oder Rückmeldung an das Team",
    speaking: "ein ruhiges Gespräch mit Patient, Angehörigen oder Kollegium",
    situation: "eine Beobachtung im Stationsalltag oder bei der Versorgung",
    repetition: "Wortschatz zu Pflege, Gesundheit und Gesprächsführung",
  },
  "erziehung-paedagogik": {
    focus: "Elternkommunikation, Teamabsprachen und Beobachtungen im Alltag",
    writing: "eine kurze Information an Eltern oder das Team",
    speaking: "ein Gespräch über Verhalten, Tagesablauf oder Förderung",
    situation: "eine Rückmeldung zu einem Kind oder einer Gruppe",
    repetition: "Begriffe zu Betreuung, Entwicklung und Zusammenarbeit",
  },
  "hotel-gastronomie": {
    focus: "Gästekommunikation, Serviceabläufe und höfliche Reaktion auf Probleme",
    writing: "eine kurze Nachricht zu Reservierung, Beschwerde oder Schicht",
    speaking: "ein Gespräch mit Gast, Rezeption oder Küchenteam",
    situation: "eine Reklamation oder ein Wunsch im Gästekontakt",
    repetition: "Wortschatz zu Service, Küche und Rezeption",
  },
  "einzelhandel-verkauf": {
    focus: "Beratung, Reklamationen und klare Kundengespräche",
    writing: "eine kurze Antwort zu Reklamation, Bestellung oder Umtausch",
    speaking: "ein Verkaufsgespräch oder eine sachliche Reklamationsklärung",
    situation: "eine Nachfrage zu Produkt, Preis oder Rückgabe",
    repetition: "Begriffe zu Verkauf, Sortiment und Kasse",
  },
  "buero-verwaltung": {
    focus: "E-Mails, Terminabstimmung und formelle Kommunikation",
    writing: "eine präzise E-Mail mit Anliegen, Frist und Abschluss",
    speaking: "ein Telefonat oder Meetingbeitrag mit klarer Struktur",
    situation: "eine Terminverschiebung oder Rückfrage zu Unterlagen",
    repetition: "Begriffe zu Bürokommunikation und Abläufen",
  },
  "it-digitale-berufe": {
    focus: "Tickets, Supportgespräche und verständliche Problembeschreibung",
    writing: "ein kurzes Ticket-Update oder eine technische Rückmeldung",
    speaking: "ein Supportgespräch mit Schritt-für-Schritt-Erklärung",
    situation: "eine Störung, ein Zugangsthema oder eine Rückfrage aus dem Team",
    repetition: "Begriffe zu IT-Support, Systemen und Abstimmung",
  },
  "handwerk-bau": {
    focus: "Sicherheitsabsprachen, Materialbedarf und klare Arbeitskommunikation",
    writing: "eine Baustellennotiz oder Materialanforderung",
    speaking: "eine Abstimmung zu Ablauf, Sicherheit oder Termin",
    situation: "eine Änderung auf der Baustelle oder ein Sicherheitsproblem",
    repetition: "Wortschatz zu Werkzeugen, Baustelle und Ausführung",
  },
  "reinigung-gebaeudemanagement": {
    focus: "Arbeitsanweisungen, Hygiene und Rückmeldungen zum Zustand",
    writing: "eine kurze Meldung zu Raum, Material oder Hygieneproblem",
    speaking: "eine Übergabe oder Rückfrage zum Reinigungsplan",
    situation: "eine besondere Verschmutzung oder fehlendes Material",
    repetition: "Begriffe zu Reinigung, Ablauf und Gebäudebetreuung",
  },
  "sicherheit-service": {
    focus: "Ruhe, Präzision und deeskalierende Kommunikation",
    writing: "einen kurzen Vorfallsbericht oder eine Dienstnotiz",
    speaking: "eine höfliche, aber klare Ansprache in einer heiklen Situation",
    situation: "eine Kontrolle, ein Konflikt oder ein Zwischenfall",
    repetition: "Begriffe zu Sicherheit, Meldung und Servicekontakt",
  },
  "bewerbung-arbeitsmarkt": {
    focus: "Bewerbung, Vorstellung und Arbeitsweltkommunikation",
    writing: "eine kurze Bewerbungsmail oder formelle Anfrage",
    speaking: "eine Selbstvorstellung oder Antwort im Bewerbungsgespräch",
    situation: "eine Kontaktaufnahme mit Arbeitgeber oder Personalabteilung",
    repetition: "Begriffe zu Bewerbung, Vertrag und Arbeitsmarkt",
  },
};

function fallbackHint(feldTitle: string, feldDescription: string): FieldHint {
  return {
    focus: `berufliche Kommunikation und typische Situationen in ${feldTitle}`,
    writing: `eine kurze berufliche Nachricht passend zu ${feldTitle}`,
    speaking: `ein berufliches Gespräch aus dem Bereich ${feldTitle}`,
    situation: feldDescription || `eine typische Arbeitssituation in ${feldTitle}`,
    repetition: `Wortschatz und Redemittel aus ${feldTitle}`,
  };
}

export function getBerufsfeldPracticeContent(
  feldId: string,
  feldTitle: string,
  feldDescription: string
) {
  const hint = FIELD_HINTS[feldId] ?? fallbackHint(feldTitle, feldDescription);

  const tasks: PracticeTask[] = [
    {
      title: "Praxisauftrag",
      mode: "Praxis",
      prompt: `Bearbeiten Sie ${hint.situation}. Formulieren Sie die wichtigsten Informationen klar und sachlich und entscheiden Sie, welche Rückfrage oder Reaktion im Arbeitsalltag jetzt nötig ist.`,
      output: `Ziel: sicher auf ${hint.focus} reagieren.`,
    },
    {
      title: "Schreibaufgabe",
      mode: "Schreiben",
      prompt: `Verfassen Sie ${hint.writing}. Achten Sie auf Betreff, klare Struktur, höfliche Formulierungen und ein konkretes nächstes Anliegen.`,
      output: "Ziel: formell, verständlich und B2-gerecht schreiben.",
    },
    {
      title: "Sprechimpuls",
      mode: "Sprechen",
      prompt: `Üben Sie ${hint.speaking}. Beschreiben Sie das Problem, schlagen Sie eine Lösung vor und reagieren Sie auf eine Rückfrage aus dem Gespräch.`,
      output: "Ziel: flüssig, höflich und lösungsorientiert sprechen.",
    },
  ];

  const repetition: RepetitionStage[] = [
    {
      level: "Stufe 1",
      title: "Verstehen",
      description: `Lernen Sie zuerst ${hint.repetition} mit Artikel, Beispielsatz und kurzer Wiederholung.`,
    },
    {
      level: "Stufe 2",
      title: "Anwenden",
      description: `Nutzen Sie den Wortschatz aktiv in Mini-Dialogen, Kurzantworten und typischen Arbeitssituationen aus ${feldTitle}.`,
    },
    {
      level: "Stufe 3",
      title: "Prüfen",
      description: `Übertragen Sie die Inhalte in B2-Aufgaben: strukturierte Antworten, kurze Stellungnahmen und berufsnahe Reaktionen unter Zeitdruck.`,
    },
  ];

  const examBridge: ExamBridge[] = [
    {
      title: "Schreiben im B2-Stil",
      href: "/pruefungstraining/schreiben",
      description: `Nutzen Sie ${hint.writing}, um längere strukturierte Antworten für formelle B2-Aufgaben zu trainieren.`,
    },
    {
      title: "Sprechen unter Prüfungsdruck",
      href: "/pruefungstraining/sprechen",
      description: `Übertragen Sie ${hint.speaking} in freie B2-Sprechsituationen mit klarer Einleitung, Begründung und Lösung.`,
    },
    {
      title: "Lesen und Hören mit Berufsbezug",
      href: "/pruefungstraining",
      description: `Verbinden Sie ${hint.repetition} mit typischen Prüfungsformaten aus Lesen, Hören und Sprachbausteinen.`,
    },
  ];

  return {
    intro: `Für ${feldTitle} reicht reines Wortlernen nicht aus. Entscheidend sind ${hint.focus}.`,
    tasks,
    repetition,
    examBridge,
  };
}
