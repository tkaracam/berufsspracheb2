export interface SpeakingTask {
  id: string;
  title: string;
  type: "Vorstellung" | "Kurzvortrag" | "Diskussion";
  task: string;
  preparationTimeSeconds: number;
  speakingTimeSeconds: number;
  tips: string[];
  modelAnswer: string;
}

export const speakingTasks: SpeakingTask[] = [
  {
    id: "s1",
    title: "Sich beruflich vorstellen",
    type: "Vorstellung",
    task: "Stellen Sie sich kurz vor. Sprechen Sie über Ihren Beruf, Ihre Erfahrung und Ihre Ziele.",
    preparationTimeSeconds: 60,
    speakingTimeSeconds: 90,
    tips: [
      "Nennen Sie Name, Herkunft und Beruf.",
      "Erwähnen Sie relevante Erfahrung.",
      "Sagen Sie, was Sie an der neuen Stelle reizt.",
      "Sprechen Sie deutlich und nicht zu schnell.",
    ],
    modelAnswer: `Guten Tag, mein Name ist Leyla Özdemir. Ich komme aus der Türkei und arbeite seit zwei Jahren als Pflegefachkraft in einem Altenheim. In meiner Heimat habe ich Pflege studiert.

Ich spreche Türkisch, Kurdisch und lerne gerade Deutsch. Meine Stärken sind Teamfähigkeit, Geduld und Zuverlässigkeit. Ich möchte mich beruflich weiterentwickeln und langfristig in Deutschland arbeiten.

In meiner Freizeit lese ich gerne und fahre Fahrrad. Vielen Dank.`,
  },
  {
    id: "s2",
    title: "Homeoffice – Vor- und Nachteile",
    type: "Kurzvortrag",
    task: "Sprechen Sie über die Vor- und Nachteile von Homeoffice im Beruf.",
    preparationTimeSeconds: 120,
    speakingTimeSeconds: 120,
    tips: [
      "Gliedern Sie in Einleitung, Argumente und Schluss.",
      "Nennen Sie ein Pro- und ein Contra-Argument.",
      "Verwenden Sie Redemittel wie „Einerseits … andererseits\".",
      "Geben Sie am Ende Ihre eigene Meinung wieder.",
    ],
    modelAnswer: `Homeoffice ist heute in vielen Berufen ein wichtiges Thema. Einerseits bietet es große Vorteile: Man spart Zeit für den Weg zur Arbeit und kann konzentrierter arbeiten. Auch die Vereinbarung von Familie und Beruf wird einfacher.

Andererseits gibt es Nachteile. Der Austausch mit Kolleginnen und Kollegen fehlt, und die Grenze zwischen Arbeit und Freizeit kann verschwimmen. Manche Menschen fühlen sich zu Hause einsam.

Meiner Meinung nach ist ein Hybridmodell die beste Lösung. Wer einige Tage im Büro und einige Tage zu Hause arbeitet, kann die Vorteile beider Modelle nutzen.`,
  },
  {
    id: "s3",
    title: "Diskussion: Firmen-Sportangebote",
    type: "Diskussion",
    task: "Diskutieren Sie mit Ihrem Gesprächspartner: Sollten Firmen Sportangebote für Mitarbeitende finanzieren?",
    preparationTimeSeconds: 60,
    speakingTimeSeconds: 180,
    tips: [
      "Reagieren Sie auf das Gesagte Ihres Partners.",
      "Nennen Sie mindestens ein Pro- und ein Contra-Argument.",
      "Bleiben Sie höflich, auch wenn Sie widersprechen.",
      "Versuchen Sie, am Ende eine gemeinsame Position zu finden.",
    ],
    modelAnswer: `A: Ich finde das sinnvoll, weil gesunde Mitarbeitende weniger krank sind. Außerdem fördert Sport die Motivation.

B: Das stimmt, aber es kostet das Unternehmen viel Geld. Nicht jeder Mitarbeitende nimmt das Angebot auch wahr.

A: Das ist richtig. Vielleicht könnte die Firma aber nur einen Teil finanzieren, zum Beispiel die Hälfte der Kosten.

B: Ja, das ist ein guter Kompromiss. Dann bleibt die Motivation hoch, ohne dass das Unternehmen zu viel zahlt.

A: Genau. Und wer möchte, kann das Angebot nutzen.`,
  },
  {
    id: "s4",
    title: "Kurzvortrag: Weiterbildung",
    type: "Kurzvortrag",
    task: "Sprechen Sie über die Bedeutung beruflicher Weiterbildung.",
    preparationTimeSeconds: 90,
    speakingTimeSeconds: 120,
    tips: [
      "Beginnen Sie mit einem kurzen Beispiel.",
      "Nennen Sie Gründe für Weiterbildung.",
      "Sagen Sie, welche Kurse für Sie interessant wären.",
      "Schließen Sie mit einem Fazit.",
    ],
    modelAnswer: `Berufliche Weiterbildung ist heute sehr wichtig, weil sich viele Branchen schnell verändern. Besonders in der IT und in der Logistik muss man regelmäßig neue Kenntnisse erwerben.

Weiterbildung hat viele Vorteile. Mitarbeitende können ihre Kenntnisse erweitern und ihre Chancen auf dem Arbeitsmarkt verbessern. Für Unternehmen profitieren ebenfalls, weil gut geschulte Mitarbeitende produktiver arbeiten.

Ich persönlich interessiere mich für einen Kurs im Bereich Projektmanagement. Ich denke, das würde mir in meiner täglichen Arbeit sehr helfen.`,
  },
  {
    id: "s5",
    title: "Diskussion: Mobilität am Arbeitsplatz",
    type: "Diskussion",
    task: "Diskutieren Sie mit Ihrem Gesprächspartner: Sollten Arbeitgeber das Jobticket oder die Nutzung öffentlicher Verkehrsmittel fördern?",
    preparationTimeSeconds: 60,
    speakingTimeSeconds: 180,
    tips: [
      "Nennen Sie ökonomische und ökologische Argumente.",
      "Reagieren Sie auf das Gesagte Ihres Partners.",
      "Bleiben Sie sachlich und höflich.",
      "Versuchen Sie, am Ende eine gemeinsame Meinung zu finden.",
    ],
    modelAnswer: `A: Ich finde, Arbeitgeber sollten das Jobticket fördern. Das ist gut für die Umwelt und entlastet die Mitarbeitenden finanziell.

B: Das stimmt, aber nicht jeder kann gut mit öffentlichen Verkehrsmitteln zur Arbeit fahren. Auf dem Land fehlen oft Verbindungen.

A: Das sehe ich auch. Deshalb sollte man vielleicht zusätzlich eine Fahrradprämie anbieten.

B: Ja, das ist ein guter Kompromiss. Dann profitieren sowohl Menschen in der Stadt als auch auf dem Land.

A: Genau. So bleibt die Mobilität flexibel und umweltfreundlich.`,
  },
  {
    id: "s6",
    title: "Kurzvortrag: Gesunde Ernährung im Betrieb",
    type: "Kurzvortrag",
    task: "Sprechen Sie über die Bedeutung gesunder Ernährung am Arbeitsplatz.",
    preparationTimeSeconds: 90,
    speakingTimeSeconds: 120,
    tips: [
      "Beginnen Sie mit einem Beispiel aus dem Alltag.",
      "Nennen Sie Vorteile gesunder Ernährung.",
      "Sagen Sie, was Unternehmen tun können.",
      "Schließen Sie mit einem Fazit.",
    ],
    modelAnswer: `Gesunde Ernährung am Arbeitsplatz ist wichtig, weil sie die Konzentration und Leistungsfähigkeit steigert. Wer ausgewogen isst, hat oft mehr Energie und wird seltener krank.

Unternehmen können dazu beitragen, indem sie in der Kantine gesunde Menüs anbieten oder Obst und Gemüse zur Verfügung stellen. Auch ausreichende Pausen helfen, Mahlzeiten in Ruhe zu genießen.

Ich persönlich versuche, jeden Tag eine ausgewogene Mahlzeit mitzubringen. Das hilft mir, den Arbeitstag gut zu bewältigen.`,
  },
  {
    id: "s7",
    title: "Kurzvortrag: Berufliche Herausforderungen",
    type: "Kurzvortrag",
    task: "Sprechen Sie über eine berufliche Herausforderung, die Sie gemeistert haben.",
    preparationTimeSeconds: 90,
    speakingTimeSeconds: 120,
    tips: [
      "Beschreiben Sie die Situation kurz.",
      "Nennen Sie, was schwierig war.",
      "Erklären Sie, wie Sie die Herausforderung gemeistert haben.",
      "Sagen Sie, was Sie daraus gelernt haben.",
    ],
    modelAnswer: `Vor etwa einem Jahr hatte ich im Betrieb eine große Herausforderung: Ein wichtiger Kunde benötigte eine Lieferung sehr schnell, aber wir hatten personelle Engpässe.

Die Situation war schwierig, weil die Frist sehr knapp war und niemand zusätzlich einspringen konnte. Ich musste die Aufgaben im Team neu verteilen und die Abläufe optimieren.

Wir haben die Arbeit in Schichten eingeteilt und die wichtigsten Aufträge priorisiert. Am Ende konnten wir die Lieferung pünktlich abschicken.

Diese Erfahrung hat mir gezeigt, wie wichtig gute Organisation und Teamarbeit sind. Seitdem plane ich kritische Termine noch sorgfältiger.`,
  },
  {
    id: "s8",
    title: "Diskussion: Umwelt im Betrieb",
    type: "Diskussion",
    task: "Diskutieren Sie mit Ihrem Gesprächspartner: Sollten Unternehmen verpflichtet werden, umweltfreundlicher zu arbeiten?",
    preparationTimeSeconds: 60,
    speakingTimeSeconds: 180,
    tips: [
      "Nennen Sie ökologische und ökonomische Argumente.",
      "Reagieren Sie auf das Gesagte Ihres Partners.",
      "Bleiben Sie sachlich und höflich.",
      "Versuchen Sie, am Ende eine gemeinsame Meinung zu finden.",
    ],
    modelAnswer: `A: Ich finde, Unternehmen sollten verpflichtet werden, umweltfreundlicher zu arbeiten. Das schützt die Umwelt und verbessert oft auch das Image des Betriebs.

B: Das stimmt, aber eine Pflicht kann für kleine Unternehmen sehr teuer sein. Nicht jeder Betrieb kann sich sofort neue Maschinen oder Verpackungen leisten.

A: Das sehe ich auch. Deshalb sollte die Pflicht schrittweise eingeführt werden und kleine Betriebe sollten finanzielle Unterstützung erhalten.

B: Ja, das ist ein guter Kompromiss. So bleibt der Schutz der Umwelt erhalten, ohne dass Unternehmen überfordert werden.

A: Genau. Und langfristig profitieren alle davon.`,
  },
  {
    id: "s9",
    title: "Kurzvortrag: Konfliktlösung im Team",
    type: "Kurzvortrag",
    task: "Sprechen Sie über Möglichkeiten der Konfliktlösung im Team.",
    preparationTimeSeconds: 90,
    speakingTimeSeconds: 120,
    tips: [
      "Beginnen Sie mit einem Beispiel.",
      "Nennen Sie Ursachen von Konflikten.",
      "Beschreiben Sie Lösungsstrategien.",
      "Schließen Sie mit einem Fazit.",
    ],
    modelAnswer: `Konflikte im Team können viele Ursachen haben, zum Beispiel unterschiedliche Meinungen, Missverständnisse oder unfaire Arbeitsverteilung.

Wichtig ist, Konflikte früh anzusprechen und nicht zu unterdrücken. Ein offenes Gespräch kann helfen, Missverständnisse auszuräumen. Dabei sollten beide Seiten ihre Sichtweise sachlich darlegen.

Manchmal ist es auch sinnvoll, eine neutrale Person dazuzuholen, zum Beispiel den Vorgesetzten oder eine Mediatorin. Ziel sollte immer sein, eine Lösung zu finden, mit der beide Seiten leben können.

Ich finde, dass gute Kommunikation und Respekt die besten Mittel gegen Konflikte sind.`,
  },
  {
    id: "s10",
    title: "Diskussion: Weiterbildungspflicht",
    type: "Diskussion",
    task: "Diskutieren Sie mit Ihrem Gesprächspartner: Sollte berufliche Weiterbildung verpflichtend sein?",
    preparationTimeSeconds: 60,
    speakingTimeSeconds: 180,
    tips: [
      "Nennen Sie Pro- und Contra-Argumente.",
      "Reagieren Sie auf das Gesagte Ihres Partners.",
      "Bleiben Sie höflich, auch wenn Sie anderer Meinung sind.",
      "Versuchen Sie, am Ende eine gemeinsame Position zu finden.",
    ],
    modelAnswer: `A: Ich finde, berufliche Weiterbildung sollte verpflichtend sein, weil sich viele Branchen schnell verändern. Wer nicht weiterlernt, verliert den Anschluss.

B: Das verstehe ich, aber eine Pflicht kann stressig sein. Viele Menschen haben neben dem Job schon viele Verpflichtungen.

A: Das stimmt. Deshalb sollte Weiterbildung in der Arbeitszeit stattfinden und vom Arbeitgeber finanziert werden.

B: Ja, das finde ich fair. Wenn die Weiterbildung bezahlt wird und während der Arbeitszeit liegt, ist eine Pflicht akzeptabel.

A: Genau. So profitieren sowohl die Mitarbeitenden als auch die Unternehmen.`,
  },
];
