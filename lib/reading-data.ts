export interface ReadingQuestion {
  q: string;
  options?: string[];
  correctIndex?: number;
  answer: string;
}

export interface ReadingText {
  id: string;
  title: string;
  source: string;
  text: string;
  questions: ReadingQuestion[];
}

export const readingTexts: ReadingText[] = [
  {
    id: "r1",
    title: "Text 1: Homeoffice im Beruf",
    source: "angepasst an DTB B2 Niveau",
    text: `Immer mehr Unternehmen bieten ihren Mitarbeitenden die Möglichkeit, regelmäßig im Homeoffice zu arbeiten. Eine Studie zeigt, dass viele Beschäftigte in der eigenen Wohnung konzentrierter arbeiten und weniger Zeit mit dem Weg zur Arbeit verlieren. Allerdings warnen Gewerkschaften davor, dass die Grenze zwischen Berufs- und Privatleben verschwimmen kann. Außerdem fehlt im Homeoffice der direkte Austausch mit Kolleginnen und Kollegen, was die Teamarbeit erschweren kann.

Viele Firmen haben deshalb sogenannte Hybridmodelle eingeführt: Mitarbeitende arbeiten einige Tage zu Hause und andere Tage im Büro. Laut Experten ist das der erfolgversprechendste Weg, denn er verbindet die Vorteile beider Arbeitsformen. Wichtig ist dabei eine klare Vereinbarung zwischen Arbeitgeber und Arbeitnehmer über Arbeitszeiten, Erreichbarkeit und die zur Verfügung gestellte Technik.`,
    questions: [
      {
        q: "Was ist laut dem Text ein Nachteil von Homeoffice?",
        options: [
          "A: Die Mitarbeitenden sind weniger konzentriert.",
          "B: Der Austausch mit Kolleginnen und Kollegen kann schwieriger sein.",
          "C: Die Arbeitszeiten sind zu flexibel.",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Was versteht man unter einem Hybridmodell?",
        options: [
          "A: Alle Mitarbeitenden arbeiten nur noch im Büro.",
          "B: Mitarbeitende arbeiten abwechselnd zu Hause und im Büro.",
          "C: Die Firma stellt ausschließlich Technik zur Verfügung.",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Homeoffice wird in der Studie kritisch betrachtet.",
        answer: "Falsch – die Studie nennt vor allem positive Aspekte; Kritik kommt von Gewerkschaften.",
      },
    ],
  },
  {
    id: "r2",
    title: "Text 2: Weiterbildung im Betrieb",
    source: "angepasst an DTB B2 Niveau",
    text: `Weiterbildung ist in vielen Berufen unverzichtbar, um auf dem Arbeitsmarkt erfolgreich zu bleiben. Besonders in Branchen mit schneller technischer Entwicklung, wie der IT oder der Logistik, müssen Mitarbeitende regelmäßig neue Kenntnisse erwerben. Viele Unternehmen fördern deshalb gezielt die berufliche Weiterbildung ihrer Beschäftigten.

Die Förderung kann unterschiedlich aussehen: Manche Firmen bezahlen Kursgebühren, andere gewähren bezahlte Freistellungen oder stellen interne Schulungen zur Verfügung. Wer sich weiterbilden möchte, sollte frühzeitig mit der Personalabteilung oder dem Vorgesetzten sprechen und einen konkreten Plan vorlegen. Dabei ist es hilfreich, darzustellen, wie die Weiterbildung den Arbeitsalltag verbessern und welche Vorteile sie dem Unternehmen bringen wird.`,
    questions: [
      {
        q: "Warum ist Weiterbildung besonders in IT und Logistik wichtig?",
        options: [
          "A: Weil dort besonders viele Mitarbeitende arbeitslos sind.",
          "B: Weil sich die Technik schnell verändert.",
          "C: Weil die Gehälter besonders niedrig sind.",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Was sollte ein Mitarbeitender tun, der sich weiterbilden möchte?",
        options: [
          "A: Er sollte direkt einen Kurs buchen.",
          "B: Er sollte mit der Personalabteilung sprechen und einen Plan vorlegen.",
          "C: Er sollte auf die Zustimmung der Gewerkschaft warten.",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Alle Unternehmen bezahlen die Kursgebühren.",
        answer: "Falsch – die Förderung ist unterschiedlich; manche Firmen bieten z. B. bezahlte Freistellungen oder interne Schulungen an.",
      },
    ],
  },
  {
    id: "r3",
    title: "Text 3: Arbeitssicherheit am Arbeitsplatz",
    source: "angepasst an DTB B2 Niveau",
    text: `Arbeitssicherheit ist ein zentrales Thema in jedem Betrieb. Unfälle am Arbeitsplatz können nicht nur für die betroffenen Beschäftigten schwerwiegende Folgen haben, sondern auch den Betrieb selbst belasten. Deshalb ist es wichtig, Gefahren frühzeitig zu erkennen und entsprechende Schutzmaßnahmen zu ergreifen.

Viele Unternehmen führen regelmäßige Unterweisungen durch, in denen Mitarbeitende lernen, wie sie Maschinen sicher bedienen und welche Schutzausrüstung sie tragen müssen. Auch ergonomisch gestaltete Arbeitsplätze helfen, gesundheitliche Beschwerden vorzubeugen. Betriebsräte und Sicherheitsbeauftragte überwachen die Einhaltung der Vorschriften und arbeiten kontinuierlich an der Verbesserung der Arbeitsbedingungen.`,
    questions: [
      {
        q: "Warum sind Unfälle am Arbeitsplatz problematisch?",
        options: [
          "A: Sie betreffen nur den Arbeitgeber.",
          "B: Sie haben Folgen für Beschäftigte und den Betrieb.",
          "C: Sie sind in jedem Betrieb unvermeidbar.",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Was gehört zu den Schutzmaßnahmen?",
        options: [
          "A: Regelmäßige Unterweisungen und Schutzausrüstung",
          "B: Längere Pausen ohne Unterweisungen",
          "C: Verzicht auf ergonomische Arbeitsplätze",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Richtig oder falsch? Betriebsräte überwachen die Einhaltung von Sicherheitsvorschriften.",
        answer: "Richtig – Betriebsräte und Sicherheitsbeauftragte kümmern sich um die Einhaltung und Verbesserung der Arbeitsbedingungen.",
      },
    ],
  },
  {
    id: "r4",
    title: "Text 4: Kundenservice im Wandel",
    source: "angepasst an DTB B2 Niveau",
    text: `Der Kundenservice hat sich in den letzten Jahren stark verändert. Früher war das Telefon der wichtigste Kontaktkanal, heute nutzen Kundinnen und Kunden zunehmend E-Mail, Chatbots und soziale Medien. Unternehmen müssen deshalb ihre Serviceangebote diversifizieren und sicherstellen, dass Anfragen schnell und kompetent beantwortet werden.

Ein guter Kundenservice zeichnet sich durch Freundlichkeit, Zuverlässigkeit und Problemlösungskompetenz aus. Beschwerden sollten als Chance verstanden werden, denn sie zeigen, wo der Betrieb sich verbessern kann. Mitarbeitende im Kundenservice benötigen daher nicht nur Fachwissen, sondern auch Kommunikations- und Konfliktlösungsfähigkeiten.`,
    questions: [
      {
        q: "Welche Kontaktkanäle werden heute häufig genutzt?",
        options: [
          "A: Nur das Telefon",
          "B: E-Mail, Chatbots und soziale Medien",
          "C: Nur persönliche Gespräche",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Wie sollten Beschwerden betrachtet werden?",
        options: [
          "A: Als reine Belastung",
          "B: Als Chance zur Verbesserung",
          "C: Als Grund für Kündigungen",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Ein guter Kundenservice erfordert nur Fachwissen.",
        answer: "Falsch – neben Fachwissen sind auch Kommunikations- und Konfliktlösungsfähigkeiten wichtig.",
      },
    ],
  },
  {
    id: "r5",
    title: "Text 5: Weiterbildung und Karriereplanung",
    source: "angepasst an DTB B2 Niveau",
    text: `Die berufliche Weiterbildung spielt eine immer größere Rolle, um auf dem Arbeitsmarkt erfolgreich zu bleiben. Besonders in Branchen mit schnellem technischen Wandel, wie der IT oder der Logistik, müssen sich Mitarbeitende regelmäßig neue Kenntnisse aneignen. Viele Unternehmen fördern deshalb gezielt die Weiterbildung ihrer Beschäftigten.

Wer sich beruflich weiterentwickeln möchte, sollte frühzeitig mit der Personalabteilung oder dem Vorgesetzten sprechen. Dabei ist es hilfreich, einen konkreten Plan vorzulegen: Welche Qualifikation wird angestrebt? Wie passt sie zur aktuellen Tätigkeit? Und welchen Nutzen hat das Unternehmen davon? Eine gute Vorbereitung erhöht die Chancen, dass die Weiterbildung genehmigt und finanziert wird.`,
    questions: [
      {
        q: "Warum ist Weiterbildung besonders wichtig?",
        options: [
          "A: Weil der Arbeitsmarkt sich schnell verändert.",
          "B: Weil alle Mitarbeitenden befördert werden wollen.",
          "C: Weil Weiterbildung gesetzlich vorgeschrieben ist.",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Was sollte ein Mitarbeitender vor einem Gespräch vorbereiten?",
        options: [
          "A: Einen konkreten Weiterbildungsplan",
          "B: Einen Kündigungsbrief",
          "C: Eine Liste aller Kollegen",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Richtig oder falsch? Nur die IT-Branche benötigt Weiterbildung.",
        answer: "Falsch – auch andere Branchen wie die Logistik verändern sich schnell und erfordern neue Kenntnisse.",
      },
    ],
  },
  {
    id: "r6",
    title: "Text 6: Datenschutz am Arbeitsplatz",
    source: "angepasst an DTB B2 Niveau",
    text: `Datenschutz ist in Unternehmen ein wichtiges Thema. Mitarbeitende dürfen personenbezogene Daten von Kundinnen, Kunden und Kolleginnen nur für den jeweiligen Arbeitszweck verwenden. Das Weitergeben von Daten an Dritte ist in der Regel nicht erlaubt.

Jeder Betrieb muss klare Regeln für den Umgang mit Daten festlegen und die Beschäftigten regelmäßig schulen. Passwörter sollten sicher aufbewahrt und nicht weitergegeben werden. Wer sich unsicher ist, welche Daten er speichern oder weitergeben darf, sollte die Datenschutzbeauftragte oder den Vorgesetzten fragen. Verstöße gegen den Datenschutz können für das Unternehmen hohe Bußgelder nach sich ziehen.`,
    questions: [
      {
        q: "Wofür dürfen personenbezogene Daten verwendet werden?",
        options: [
          "A: Nur für den jeweiligen Arbeitszweck",
          "B: Für private Zwecke",
          "C: Für Marketingzwecke ohne Zustimmung",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Was sollte man bei Unsicherheit tun?",
        options: [
          "A: Die Daten einfach weitergeben",
          "B: Die Datenschutzbeauftragte oder den Vorgesetzten fragen",
          "C: Die Daten löschen",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Passwörter dürfen an Kollegen weitergegeben werden.",
        answer: "Falsch – Passwörter sollten sicher aufbewahrt und nicht weitergegeben werden.",
      },
    ],
  },
  {
    id: "r7",
    title: "Text 7: Nachhaltigkeit im Betrieb",
    source: "angepasst an DTB B2 Niveau",
    text: `Nachhaltigkeit wird in Unternehmen immer wichtiger. Viele Betriebe achten darauf, Energie zu sparen, Abfall zu reduzieren und umweltfreundliche Materialien zu verwenden. Das ist nicht nur gut für die Umwelt, sondern kann auch Kosten senken.

Kunden und Geschäftspartner achten zunehmend auf ein nachhaltiges Wirtschaften. Unternehmen, die sich dafür engagieren, verbessern oft auch ihr Image. Mitarbeitende können durch kleine Veränderungen im Alltag einen großen Beitrag leisten, zum Beispiel durch sparsames Drucken, das Ausschalten von Geräten oder die richtige Mülltrennung.`,
    questions: [
      {
        q: "Warum lohnt sich nachhaltiges Wirtschaften für Unternehmen?",
        options: [
          "A: Es senkt Kosten und verbessert das Image.",
          "B: Es ist gesetzlich vorgeschrieben.",
          "C: Es erhöht den Energieverbrauch.",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Wie können Mitarbeitende im Alltag nachhaltig handeln?",
        options: [
          "A: Indem sie mehr drucken",
          "B: Indem sie Geräte ausschalten und Müll trennen",
          "C: Indem sie alle Abfälle zusammen entsorgen",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Nachhaltigkeit ist nur für die Umwelt wichtig.",
        answer: "Falsch – Nachhaltigkeit kann auch Kosten senken und das Image verbessern.",
      },
    ],
  },
  {
    id: "r8",
    title: "Text 8: Diversity im Team",
    source: "angepasst an DTB B2 Niveau",
    text: `Teams mit unterschiedlichen kulturellen Hintergründen, Erfahrungen und Fähigkeiten können besonders kreativ und innovativ sein. Vielfalt im Betrieb führt oft zu besseren Lösungen, weil verschiedene Perspektiven einfließen.

Allerdings braucht Diversity auch eine offene Unternehmenskultur. Kommunikation und gegenseitiger Respekt sind besonders wichtig. Viele Unternehmen bieten deshalb Schulungen an, um Vorurteile abzubauen und die Zusammenarbeit zu verbessern.`,
    questions: [
      {
        q: "Welchen Vorteil kann Diversity im Team bringen?",
        options: [
          "A: Weniger Kommunikation",
          "B: Mehr Kreativität und bessere Lösungen",
          "C: Einheitlichere Arbeitsweise",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Was ist für erfolgreiche Diversity wichtig?",
        options: [
          "A: Offene Unternehmenskultur und Respekt",
          "B: Gleiche Herkunft aller Mitarbeitenden",
          "C: Wenige Schulungen",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Richtig oder falsch? Diversity führt automatisch zu besserer Zusammenarbeit.",
        answer: "Falsch – dafür braucht es auch eine offene Kultur, Kommunikation und Respekt.",
      },
    ],
  },
  {
    id: "r9",
    title: "Text 9: Mobbing am Arbeitsplatz",
    source: "angepasst an DTB B2 Niveau",
    text: `Mobbing am Arbeitsplatz ist ein ernstes Problem. Dazu gehören wiederholte Beleidigungen, das absichtliche Zurückhalten von Informationen oder das isolieren von Kolleginnen und Kollegen. Betroffene fühlen sich oft hilflos und ängstlich, was zu gesundheitlichen Problemen und sinkender Leistungsfähigkeit führen kann.

Unternehmen sind verpflichtet, ihre Beschäftigten vor Mobbing zu schützen. Deshalb sollten Betriebe klare Regeln aufstellen und Vertrauenspersonen benennen. Wer von Mobbing betroffen ist, sollte Vorfälle schriftlich dokumentieren und frühzeitig mit dem Vorgesetzten, dem Betriebsrat oder der Personalabteilung sprechen.`,
    questions: [
      {
        q: "Was gehört laut Text nicht zu Mobbing?",
        options: [
          "A: Wiederholte Beleidigungen",
          "B: Absichtliches Zurückhalten von Informationen",
          "C: Konstruktive Kritik am Arbeitsplatz",
        ],
        correctIndex: 2,
        answer: "C",
      },
      {
        q: "Was sollten Betriebe laut Text tun?",
        options: [
          "A: Klare Regeln aufstellen und Vertrauenspersonen benennen",
          "B: Betroffene ignorieren",
          "C: Mobbing als Privatsache behandeln",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Richtig oder falsch? Mobbing kann gesundheitliche Folgen haben.",
        answer: "Richtig – Betroffene können sich hilflos und ängstlich fühlen, was zu gesundheitlichen Problemen führen kann.",
      },
    ],
  },
  {
    id: "r10",
    title: "Text 10: E-Mail-Kommunikation im Beruf",
    source: "angepasst an DTB B2 Niveau",
    text: `E-Mails sind im Berufsalltag ein wichtiges Kommunikationsmittel. Eine gute E-Mail ist klar, höflich und strukturiert. Schon in der Betreffzeile sollte der Inhalt erkennbar sein, damit die Empfängerin oder der Empfänger weiß, worum es geht.

Bei formellen E-Mails sollte man eine angemessene Anrede und einen höflichen Gruß verwenden. Auch die Länge ist wichtig: Lange Texte werden oft nur überflogen. Deshalb empfiehlt es sich, wichtige Informationen in Stichpunkten darzustellen. Abschließend sollte man die E-Mail auf Rechtschreibfehler prüfen, bevor man sie abschickt.`,
    questions: [
      {
        q: "Was zeichnet eine gute Betreffzeile aus?",
        options: [
          "A: Sie ist möglichst lang.",
          "B: Der Inhalt ist erkennbar.",
          "C: Sie enthält keine Informationen.",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Warum sollten wichtige Informationen als Stichpunkte dargestellt werden?",
        options: [
          "A: Weil lange Texte oft überflogen werden",
          "B: Weil Stichpunkte unhöflich sind",
          "C: Weil die E-Mail dann länger wirkt",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Richtig oder falsch? Formelle E-Mails sollten eine angemessene Anrede enthalten.",
        answer: "Richtig – bei formellen E-Mails sollte man eine angemessene Anrede und einen höflichen Gruß verwenden.",
      },
    ],
  },
  {
    id: "r11",
    title: "Text 11: Gesundheit am Arbeitsplatz",
    source: "angepasst an DTB B2 Niveau",
    text: `Eine gesunde Arbeitsweise ist wichtig für das Wohlbefinden und die Leistungsfähigkeit. Viele Beschäftigte sitzen stundenlang am Schreibtisch und bewegen sich wenig. Das kann zu Rückenschmerzen, Kopfschmerzen und Konzentrationsschwäche führen.

Experten empfehlen deshalb regelmäßige Pausen, kleine Bewegungseinheiten und eine ergonomische Gestaltung des Arbeitsplatzes. Auch die Work-Life-Balance spielt eine große Rolle: Wer genug Zeit für Familie, Freunde und Hobbys hat, kann berufliche Anforderungen besser bewältigen. Unternehmen können durch flexible Arbeitszeiten und Gesundheitsangebote dazu beitragen.`,
    questions: [
      {
        q: "Welche gesundheitlichen Probleme können durch langes Sitzen entstehen?",
        options: [
          "A: Rückenschmerzen und Kopfschmerzen",
          "B: Bessere Konzentration",
          "C: Mehr Energie",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Was empfehlen Experten?",
        options: [
          "A: Keine Pausen machen",
          "B: Regelmäßige Pausen und Bewegung",
          "C: Den ganzen Tag sitzen bleiben",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Eine gute Work-Life-Balance kann helfen, berufliche Anforderungen besser zu bewältigen.",
        answer: "Richtig – ausreichend Zeit für Familie, Freunde und Hobbys unterstützt die Bewältigung beruflicher Anforderungen.",
      },
    ],
  },
  {
    id: "r12",
    title: "Text 12: Projektarbeit im Team",
    source: "angepasst an DTB B2 Niveau",
    text: `Projekte werden in den meisten Unternehmen im Team bearbeitet. Jede Person übernimmt dabei bestimmte Aufgaben und Verantwortlichkeiten. Damit ein Projekt erfolgreich ist, braucht es klare Ziele, gute Planung und eine offene Kommunikation.

Regelmäßige Besprechungen helfen, den Fortschritt zu kontrollieren und Probleme frühzeitig zu erkennen. Wichtig ist auch, Termine einzuhalten und sich gegenseitig zu unterstützen. Wenn Konflikte entstehen, sollten sie konstruktiv gelöst werden, damit das Team weiterhin effektiv zusammenarbeiten kann.`,
    questions: [
      {
        q: "Was braucht ein erfolgreiches Projekt laut Text?",
        options: [
          "A: Klare Ziele, gute Planung und offene Kommunikation",
          "B: Möglichst wenige Besprechungen",
          "C: Dass jeder alleine arbeitet",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Warum sind regelmäßige Besprechungen wichtig?",
        options: [
          "A: Um den Fortschritt zu kontrollieren",
          "B: Um Zeit zu verschwenden",
          "C: Um alle Entscheidungen dem Chef zu überlassen",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Richtig oder falsch? Konflikte im Team sollten ignoriert werden.",
        answer: "Falsch – Konflikte sollten konstruktiv gelöst werden, damit das Team effektiv zusammenarbeiten kann.",
      },
    ],
  },
  {
    id: "r13",
    title: "Text 13: Digitale Kommunikation im Beruf",
    source: "angepasst an DTB B2 Niveau",
    text: `Digitale Kommunikation hat den Arbeitsalltag stark verändert. Tools wie E-Mail, Chat und Videokonferenzen ermöglichen einen schnellen Austausch, unabhängig von Ort und Zeit. Besonders in verteilten Teams sind diese Kanäle unverzichtbar.

Allerdings gibt es auch Herausforderungen: Missverständnisse entstehen schneller, wenn man Gesprächspartner nicht persönlich sieht. Zudem kann die ständige Erreichbarkeit zu Stress führen. Deshalb ist es wichtig, klare Regeln für digitale Kommunikation zu vereinbaren, zum Beispiel zu festen Zeiten auf Nachrichten zu antworten und komplexe Themen lieber persönlich oder im Videoanruf zu besprechen.`,
    questions: [
      {
        q: "Welchen Vorteil nennt der Text für digitale Kommunikation?",
        options: [
          "A: Sie ermöglicht schnellen Austausch unabhängig von Ort und Zeit.",
          "B: Sie ersetzt persönliche Gespräche vollständig.",
          "C: Sie führt immer zu weniger Missverständnissen.",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Was kann die ständige Erreichbarkeit verursachen?",
        options: [
          "A: Mehr Produktivität",
          "B: Stress",
          "C: Bessere Teamarbeit",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Komplexe Themen sollten besser persönlich besprochen werden.",
        answer: "Richtig – der Text empfiehlt, komplexe Themen persönlich oder im Videoanruf zu besprechen.",
      },
    ],
  },
  {
    id: "r14",
    title: "Text 14: Künstliche Intelligenz am Arbeitsplatz",
    source: "angepasst an DTB B2 Niveau",
    text: `Künstliche Intelligenz (KI) wird in vielen Berufen eingesetzt. Sie kann repetitive Aufgaben übernehmen, Daten analysieren und sogar Kundenanfragen beantworten. Dadurch gewinnen Mitarbeitende Zeit für komplexere und kreativere Tätigkeiten.

Allerdings verändert KI auch Anforderungen an die Beschäftigten. Wer mit KI-Systemen arbeitet, muss lernen, diese kritisch zu prüfen und Ergebnisse zu kontrollieren. Weiterbildung ist deshalb besonders wichtig, um mit den neuen Technologien Schritt zu halten und Arbeitsplätze langfristig zu sichern.`,
    questions: [
      {
        q: "Welche Aufgabe kann KI übernehmen?",
        options: [
          "A: Repetitive Aufgaben und Datenanalysen",
          "B: Nur kreative Arbeit",
          "C: Persönliche Gespräche mit Kunden",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Was müssen Beschäftigte lernen, die mit KI arbeiten?",
        options: [
          "A: Alle Ergebnisse blind zu vertrauen",
          "B: KI-Ergebnisse kritisch zu prüfen und zu kontrollieren",
          "C: KI gar nicht zu nutzen",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? KI kann helfen, Zeit für komplexere Aufgaben zu gewinnen.",
        answer: "Richtig – durch die Übernahme repetitiver Aufgaben bleibt mehr Zeit für komplexere Tätigkeiten.",
      },
    ],
  },
  {
    id: "r15",
    title: "Text 15: Stressmanagement im Beruf",
    source: "angepasst an DTB B2 Niveau",
    text: `Stress am Arbeitsplatz ist ein weitverbreitetes Problem. Zu viele Aufgaben, enge Termine und ständige Unterbrechungen können die Leistungsfähigkeit senken und sogar zu Krankheiten führen. Unternehmen sind deshalb zunehmend gefordert, Präventionsmaßnahmen anzubieten.

Wichtige Strategien gegen Stress sind gute Zeitplanung, klare Prioritäten und regelmäßige Pausen. Auch Sport und Entspannungsübungen helfen, den Alltag besser zu bewältigen. Manche Betriebe bieten zudem Workshops oder Coachings an, um Mitarbeitende im Umgang mit Stress zu stärken.`,
    questions: [
      {
        q: "Was kann Stress am Arbeitsplatz verursachen?",
        options: [
          "A: Höhere Leistungsfähigkeit",
          "B: Sinkende Leistungsfähigkeit und Krankheiten",
          "C: Mehr Motivation",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Welche Strategie gegen Stress nennt der Text?",
        options: [
          "A: Keine Pausen machen",
          "B: Gute Zeitplanung und regelmäßige Pausen",
          "C: Alle Aufgaben gleichzeitig erledigen",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Unternehmen sollten Präventionsmaßnahmen gegen Stress anbieten.",
        answer: "Richtig – der Text sieht darin eine wichtige Aufgabe der Unternehmen.",
      },
    ],
  },
  {
    id: "r16",
    title: "Text 16: Betriebsklima und Mitarbeitermotivation",
    source: "angepasst an DTB B2 Niveau",
    text: `Ein gutes Betriebsklima ist wichtig für die Motivation der Mitarbeitenden. Wer sich wertgeschätzt und gut informiert fühlt, arbeitet in der Regel engagierter. Kommunikation spielt dabei eine zentrale Rolle: Transparente Entscheidungen und regelmäßiges Feedback stärken das Vertrauen in die Führung.

Anerkennung ist ein weiterer wichtiger Faktor. Anerkennung muss nicht immer finanzieller Natur sein. Auch ein persönliches Dankeschön oder die Möglichkeit, eigenverantwortlich zu arbeiten, können die Zufriedenheit deutlich steigern. Unternehmen mit einem positiven Betriebsklima haben oft weniger Krankheitstage und geringere Fluktuation.`,
    questions: [
      {
        q: "Was stärkt das Vertrauen in die Führung?",
        options: [
          "A: Transparente Entscheidungen und regelmäßiges Feedback",
          "B: Wenig Kommunikation",
          "C: Geheime Entscheidungen",
        ],
        correctIndex: 0,
        answer: "A",
      },
      {
        q: "Welche Form der Anerkennung nennt der Text?",
        options: [
          "A: Nur finanzielle Boni",
          "B: Persönliches Dankeschön und eigenverantwortliches Arbeiten",
          "C: Mehr Überstunden",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Ein gutes Betriebsklima kann die Fluktuation senken.",
        answer: "Richtig – Unternehmen mit positivem Betriebsklima haben oft geringere Fluktuation.",
      },
    ],
  },
  {
    id: "r17",
    title: "Text 17: Kundenzufriedenheit messen",
    source: "angepasst an DTB B2 Niveau",
    text: `Viele Unternehmen möchten wissen, wie zufrieden ihre Kunden sind. Dafür nutzen sie verschiedene Methoden: Online-Umfragen, Bewertungsportale oder persönliche Gespräche. Die Ergebnisse helfen, Schwächen zu erkennen und den Service zu verbessern.

Wichtig ist jedoch, das Feedback ernst zu nehmen und konkret darauf zu reagieren. Kunden, die das Gefühl haben, gehört zu werden, bleiben einem Unternehmen oft treu. Auch Beschwerden sollten als Chance verstanden werden, denn sie zeigen, wo Handlungsbedarf besteht.`,
    questions: [
      {
        q: "Welche Methode zur Messung der Kundenzufriedenheit nennt der Text?",
        options: [
          "A: Nur persönliche Gespräche",
          "B: Online-Umfragen, Bewertungsportale oder persönliche Gespräche",
          "C: Keine Messung",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Wie sollten Unternehmen mit Beschwerden umgehen?",
        options: [
          "A: Sie ignorieren",
          "B: Als Chance zur Verbesserung verstehen",
          "C: Sie löschen",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Feedback sollte ernst genommen und konkret beantwortet werden.",
        answer: "Richtig – das Feedback zu nutzen und darauf zu reagieren ist wichtig für die Kundenzufriedenheit.",
      },
    ],
  },
  {
    id: "r18",
    title: "Text 18: Datensicherheit im Unternehmen",
    source: "angepasst an DTB B2 Niveau",
    text: `Datensicherheit ist für Unternehmen ein wichtiges Thema. Cyberangriffe können sensible Kundendaten stehlen oder Betriebsabläufe lahmlegen. Deshalb sollten Betriebe ihre IT-Systeme regelmäßig aktualisieren und Sicherheitskopien anlegen.

Auch die Mitarbeitenden spielen eine große Rolle. Viele Angriffe beginnen mit Phishing-E-Mails, die geschickt täuschen. Wer unbekannte Anhänge nicht öffnet und verdächtige Nachrichten meldet, schützt das Unternehmen aktiv. Regelmäßige Schulungen helfen, das Bewusstsein für Datensicherheit zu stärken.`,
    questions: [
      {
        q: "Was können Cyberangriffe verursachen?",
        options: [
          "A: Schnellere Internetverbindung",
          "B: Datenverlust oder Betriebsunterbrechungen",
          "C: Bessere Software",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Wie können Mitarbeitende das Unternehmen schützen?",
        options: [
          "A: Unbekannte Anhänge öffnen",
          "B: Verdächtige Nachrichten melden und keine unbekannten Anhänge öffnen",
          "C: Passwörter weitergeben",
        ],
        correctIndex: 1,
        answer: "B",
      },
      {
        q: "Richtig oder falsch? Regelmäßige Schulungen stärken das Bewusstsein für Datensicherheit.",
        answer: "Richtig – der Text empfiehlt regelmäßige Schulungen zu diesem Thema.",
      },
    ],
  },
];
