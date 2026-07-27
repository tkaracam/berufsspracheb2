import type { WritingTask } from "./writing-data";

export interface ExamWritingTask extends WritingTask {
  examPart: "lesen-schreiben" | "sprachbausteine";
}

export const examWritingTasks: ExamWritingTask[] = [
  {
    id: "els-1",
    title: "Auf Beschwerde reagieren: Defekte Ware",
    type: "E-Mail",
    examPart: "lesen-schreiben",
    situation:
      "Sie haben ein Produkt online bestellt. Nach der Lieferung stellen Sie fest, dass die Ware beschädigt ist. Sie erhalten eine E-Mail vom Kundenservice, in der Sie um eine Stellungnahme gebeten werden. Schreiben Sie eine Antwort.",
    requiredPoints: [
      "Sich für das Problem entschuldigen",
      "Eine mögliche Ursache nennen",
      "Eine Lösung oder einen Ausgleich anbieten",
      "Höflich um Rückmeldung bitten",
    ],
    modelAnswer: `Betreff: Re: Beschwerde – Bestellung Nr. 98765

Sehr geehrte Damen und Herren,

vielen Dank für Ihre Nachricht. Es tut mir sehr leid, dass die gelieferte Ware beschädigt angekommen ist.

Möglicherweise ist das Paket während des Transports beschädigt worden. Wir werden dies selbstverständlich umgehend für Sie klären.

Selbstverständlich können wir Ihnen entweder eine kostenlose Ersatzlieferung zusenden oder den Kaufpreis vollständig erstatten. Bitte teilen Sie mir mit, welche Lösung Sie bevorzugen.

Ich bitte Sie, uns ein Foto des Schadens zukommen zu lassen, damit wir den Vorfall bei unserem Logistikpartner melden können.

Mit freundlichen Grüßen

Maria Schmidt
Kundenservice`,
    checklist: [
      "Die E-Mail enthält eine Entschuldigung.",
      "Eine mögliche Ursache wird genannt.",
      "Eine Lösung oder ein Ausgleich wird angeboten.",
      "Es wird höflich um Rückmeldung gebeten.",
      "Anrede, Betreff und Grußformel sind formell.",
    ],
  },
  {
    id: "els-2",
    title: "Auf Beschwerde reagieren: Terminverspätung",
    type: "E-Mail",
    examPart: "lesen-schreiben",
    situation:
      "Ein Kunde beschwert sich schriftlich, dass der vereinbarte Termin für die Lieferung nicht eingehalten wurde. Schreiben Sie eine Antwort.",
    requiredPoints: [
      "Das Problem anerkennen und sich entschuldigen",
      "Eine Erklärung für die Verspätung geben",
      "Einen neuen Liefertermin nennen",
      "Eine kleine Entschädigung anbieten",
    ],
    modelAnswer: `Betreff: Re: Terminverspätung Ihrer Lieferung

Sehr geehrter Herr Becker,

vielen Dank für Ihre Nachricht. Es tut mir leid, dass wir den vereinbarten Liefertermin nicht einhalten konnten.

Aufgrund eines unerwarteten Engpasses bei einem unserer Zulieferer mussten wir die Auslieferung leider um zwei Tage verschieben. Diese Verzögerung tut uns sehr leid.

Wir werden die Ware nun am kommenden Dienstag, den 18.07., zwischen 9 und 12 Uhr bei Ihnen anliefern. Sollte Ihnen dieser Termin nicht passen, melden Sie sich bitte kurz.

Als kleine Entschädigung schenken wir Ihnen einen Gutschein über 15 Euro für Ihre nächste Bestellung.

Mit freundlichen Grüßen

Anna Müller`,
    checklist: [
      "Das Problem wird anerkannt und entschuldigt.",
      "Eine Erklärung für die Verspätung wird gegeben.",
      "Ein neuer Liefertermin wird genannt.",
      "Eine Entschädigung wird angeboten.",
      "Der Ton ist höflich und verantwortungsbewusst.",
    ],
  },
  {
    id: "els-3",
    title: "Auf Beschwerde reagieren: Falsche Rechnung",
    type: "E-Mail",
    examPart: "lesen-schreiben",
    situation:
      "Ein Kunde hat eine Rechnung erhalten, in der ein Artikel doppelt berechnet wurde. Schreiben Sie eine Antwort.",
    requiredPoints: [
      "Die Beschwerde bestätigen",
      "Den Fehler erklären",
      "Eine Korrektur zusagen",
      "Sagen, wann die Korrektur erfolgt",
    ],
    modelAnswer: `Betreff: Re: Rechnungskorrektur

Sehr geehrte Frau Weber,

vielen Dank für Ihre Nachricht. Ich habe die Rechnung geprüft und den Fehler festgestellt.

Tatsächlich wurde der Artikel 'Bürostuhl Modell X' aus Versehen zweimal erfasst. Das tut mir leid.

Wir werden die Rechnung umgehend korrigieren und Ihnen eine neue Rechnung per E-Mail zusenden. Der zu viel gezahlte Betrag wird Ihnen innerhalb der nächsten fünf Werktage auf Ihr Konto erstattet.

Bei weiteren Fragen stehe ich Ihnen gerne zur Verfügung.

Mit freundlichen Grüßen

Thomas Becker
Buchhaltung`,
    checklist: [
      "Die Beschwerde wird bestätigt.",
      "Der Fehler wird erklärt.",
      "Eine Korrektur wird zugesagt.",
      "Der Zeitpunkt der Korrektur wird genannt.",
      "Die E-Mail ist sachlich und freundlich.",
    ],
  },
  {
    id: "els-4",
    title: "Auf Anweisung reagieren: Verpasste Schulung",
    type: "E-Mail",
    examPart: "lesen-schreiben",
    situation:
      "Sie erhalten eine E-Mail von Ihrer Vorgesetzten, in der Sie aufgefordert werden, an einer obligatorischen Schulung teilzunehmen. Sie haben die letzte Schulung verpasst. Schreiben Sie eine Antwort.",
    requiredPoints: [
      "Auf die Anweisung eingehen",
      "Sich für das Verpassen entschuldigen",
      "Einen Grund nennen",
      "Sich für den Nachholtermin anmelden",
    ],
    modelAnswer: `Betreff: Re: Teilnahme an der Arbeitssicherheitsschulung

Sehr geehrte Frau Klein,

vielen Dank für Ihre E-Mail. Ich werde selbstverständlich an der nächsten Arbeitssicherheitsschulung teilnehmen.

Es tut mir leid, dass ich die letzte Schulung verpasst habe. An dem Tag war ich leider krankgeschrieben und konnte deshalb nicht teilnehmen.

Bitte melden Sie mich für den nächsten Termin am 12.08. an. Sollte ich an diesem Tag verhindert sein, gebe ich Ihnen rechtzeitig Bescheid.

Mit freundlichen Grüßen

Max Mustermann`,
    checklist: [
      "Auf die Anweisung der Vorgesetzten wird eingegangen.",
      "Es wird sich für das Verpassen entschuldigt.",
      "Ein Grund wird genannt.",
      "Es wird sich für den Nachholtermin angemeldet.",
      "Der Ton ist respektvoll und höflich.",
    ],
  },
  {
    id: "els-5",
    title: "Auf Beschwerde reagieren: Lärmbelästigung",
    type: "E-Mail",
    examPart: "lesen-schreiben",
    situation:
      "Ein Mieter beschwert sich über Lärm aus Ihrem Betrieb in den frühen Morgenstunden. Schreiben Sie eine Antwort.",
    requiredPoints: [
      "Die Beschwerde ernst nehmen und sich entschuldigen",
      "Die Situation erklären",
      "Konkrete Maßnahmen nennen",
      "Um Verständnis und Rückmeldung bitten",
    ],
    modelAnswer: `Betreff: Re: Lärmbelästigung in den Morgenstunden

Sehr geehrte Frau Neumann,

vielen Dank für Ihre Nachricht. Es tut mir leid, dass Sie durch Geräusche aus unserem Betrieb gestört wurden.

In den letzten Tagen fanden vorbereitende Arbeiten für eine neue Maschine statt, die leider außerhalb der normalen Betriebszeiten erledigt werden mussten. Das war eine Ausnahmesituation.

Um Wiederholungen zu vermeiden, haben wir nun verbindliche Ruhezeiten festgelegt und die lauten Arbeiten auf die regulären Öffnungszeiten verlegt. Zusätzlich prüfen wir, ob wir die Lärmemissionen durch Schallschutzmaßnahmen weiter reduzieren können.

Wir bitten um Ihr Verständnis und freuen uns über eine kurze Rückmeldung, falls die Geräusche weiterhin auftreten sollten.

Mit freundlichen Grüßen

Peter Hoffmann
Betriebsleitung`,
    checklist: [
      "Die Beschwerde wird ernst genommen und entschuldigt.",
      "Die Situation wird erklärt.",
      "Konkrete Maßnahmen werden genannt.",
      "Es wird um Verständnis und Rückmeldung gebeten.",
      "Die E-Mail ist höflich und lösungsorientiert.",
    ],
  },
  {
    id: "sbs-1",
    title: "Forumsbeitrag: Homeoffice",
    type: "E-Mail",
    examPart: "sprachbausteine",
    situation:
      "In einem Online-Forum für Arbeitnehmer wird diskutiert: 'Sollte Homeoffice für alle Beschäftigten ein Recht sein?' Schreiben Sie einen Forumsbeitrag von ca. 120 Wörtern.",
    requiredPoints: [
      "Eigene Meinung äußern",
      "Ein Argument dafür nennen",
      "Ein Argument dagegen nennen",
      "Ein Beispiel aus der eigenen Erfahrung geben",
    ],
    modelAnswer: `Ich finde, dass Homeoffice eine sinnvolle Option sein kann, aber nicht für alle Berufe gleichermaßen als Recht gelten sollte.

Einerseits profitieren viele Beschäftigte von der Flexibilität. Sie sparen Zeit für den Weg zur Arbeit und können Familie und Beruf besser vereinbaren. Auch die Konzentration ist zu Hause oft höher.

Andererseits gibt es Berufe, bei denen die Anwesenheit im Betrieb notwendig ist, zum Beispiel in der Produktion oder im Verkauf. Außerdem fehlt im Homeoffice manchmal der direkte Austausch mit Kolleginnen und Kollegen.

In meinem Beruf im Bürobereich funktioniert Homeoffice gut. Ich arbeite zwei Tage pro Woche zu Hause und merke, dass ich dadurch produktiver bin. Deshalb sollte Homeoffice dort möglich sein, wo es sinnvoll ist.`,
    checklist: [
      "Eigene Meinung wird klar geäußert.",
      "Es wird mindestens ein Pro-Argument genannt.",
      "Es wird mindestens ein Contra-Argument genannt.",
      "Ein Beispiel aus der eigenen Erfahrung ist enthalten.",
      "Wortzahl liegt bei ca. 120 Wörtern.",
    ],
  },
  {
    id: "sbs-2",
    title: "Forumsbeitrag: Weiterbildung",
    type: "E-Mail",
    examPart: "sprachbausteine",
    situation:
      "In einem Berufsforum diskutieren Arbeitnehmer über das Thema: 'Sollten Arbeitgeber die Weiterbildung ihrer Mitarbeitenden verpflichtend fördern?' Schreiben Sie einen Forumsbeitrag von ca. 120 Wörtern.",
    requiredPoints: [
      "Eigene Meinung äußern",
      "Ein Argument für die Pflicht nennen",
      "Ein Argument gegen die Pflicht nennen",
      "Ein Beispiel nennen",
    ],
    modelAnswer: `Meiner Meinung nach sollten Arbeitgeber die Weiterbildung ihrer Mitarbeitenden verpflichtend fördern, aber mit Freiräumen für die individuelle Auswahl.

Einerseits profitieren Unternehmen selbst von gut geschulten Mitarbeitenden. Wer regelmäßig dazulernt, arbeitet sicherer und produktiver. Das ist besonders in Branchen mit schnellem Wandel wichtig.

Andererseits kann eine Pflicht zu Bürokratie führen. Nicht jede Weiterbildung passt zu jedem Beruf oder zu den persönlichen Zielen der Beschäftigten.

Ich persönlich habe von einem finanzierten Sprachkurs sehr profitiert. Mein Arbeitgeber hat die Kosten übernommen, weil der Kurs für meine Tätigkeit relevant war. Deshalb finde ich: Förderung ja, aber gezielt und individuell abgestimmt.`,
    checklist: [
      "Eigene Meinung wird klar geäußert.",
      "Ein Argument für die Pflicht wird genannt.",
      "Ein Argument gegen die Pflicht wird genannt.",
      "Ein Beispiel ist enthalten.",
      "Wortzahl liegt bei ca. 120 Wörtern.",
    ],
  },
  {
    id: "sbs-3",
    title: "Forumsbeitrag: Gesunde Ernährung im Betrieb",
    type: "E-Mail",
    examPart: "sprachbausteine",
    situation:
      "In einem Forum für Betriebsräte wird diskutiert: 'Sollten Unternehmen gesunde Ernährung im Betrieb stärker fördern?' Schreiben Sie einen Forumsbeitrag von ca. 120 Wörtern.",
    requiredPoints: [
      "Eigene Meinung äußern",
      "Ein Argument dafür nennen",
      "Ein Argument dagegen nennen",
      "Einen konkreten Vorschlag machen",
    ],
    modelAnswer: `Ich halte es für sinnvoll, wenn Unternehmen gesunde Ernährung im Betrieb stärker fördern, denn die Gesundheit der Mitarbeitenden ist auch im Interesse des Arbeitgebers.

Einerseits können gesunde Mahlzeiten die Konzentration und Leistungsfähigkeit steigern. Wer gut isst, wird seltener krank und bleibt motivierter.

Andererseits sollte man die persönliche Freiheit nicht einschränken. Jeder sollte selbst entscheiden dürfen, was er isst. Außerdem können gesunde Angebote teuer sein.

Mein Vorschlag wäre, in der Kantine jeden Tag ein ausgewogenes Menü anzubieten und zusätzlich frisches Obst in den Pausenräumen bereitzustellen. So bleibt die Wahl beim Mitarbeitenden, das Angebot wird aber verbessert.`,
    checklist: [
      "Eigene Meinung wird klar geäußert.",
      "Ein Pro-Argument wird genannt.",
      "Ein Contra-Argument wird genannt.",
      "Ein konkreter Vorschlag wird gemacht.",
      "Wortzahl liegt bei ca. 120 Wörtern.",
    ],
  },
  {
    id: "els-6",
    title: "Auf Beschwerde reagieren: Falsch gelieferte Ware",
    type: "E-Mail",
    examPart: "lesen-schreiben",
    situation:
      "Ein Kunde hat bei Ihnen 20 Bürostühle bestellt, aber es wurden 20 Schreibtischlampen geliefert. Er beschwert sich schriftlich. Schreiben Sie eine Antwort.",
    requiredPoints: [
      "Sich für den Fehler entschuldigen",
      "Eine Erklärung geben",
      "Die korrekte Lieferung zusagen",
      "Eine Entschädigung anbieten",
    ],
    modelAnswer: `Betreff: Re: Falsch gelieferte Ware – Bestellung Nr. 45231

Sehr geehrter Herr Braun,

vielen Dank für Ihre Nachricht. Es tut mir sehr leid, dass Ihnen versehentlich die falschen Artikel zugesandt wurden.

Bei der Kommissionierung ist offenbar ein Fehler unterlaufen. Die Schreibtischlampen waren für einen anderen Kunden bestimmt.

Wir werden Ihnen selbstverständlich umgehend die 20 bestellten Bürostühle zusenden. Sie erhalten die korrekte Lieferung voraussichtlich am kommenden Mittwoch. Die falsch gelieferten Lampen holen wir gleichzeitig bei Ihnen ab.

Als Entschuldigung schenken wir Ihnen einen Rabatt von 10 Prozent auf Ihre nächste Bestellung.

Mit freundlichen Grüßen

Maria Schmidt
Kundenservice`,
    checklist: [
      "Es wird sich für den Fehler entschuldigt.",
      "Eine Erklärung wird gegeben.",
      "Die korrekte Lieferung wird zugesagt.",
      "Eine Entschädigung wird angeboten.",
      "Anrede, Betreff und Grußformel sind formell.",
    ],
  },
  {
    id: "els-7",
    title: "Auf Beschwerde reagieren: Lange Wartezeit",
    type: "E-Mail",
    examPart: "lesen-schreiben",
    situation:
      "Ein Kunde beschwert sich, dass er im Telefon-Support 20 Minuten in der Warteschleife war. Schreiben Sie eine Antwort.",
    requiredPoints: [
      "Die Wartezeit anerkennen und sich entschuldigen",
      "Eine Erklärung nennen",
      "Konkrete Verbesserungen zusagen",
      "Höflich um Vertrauen werben",
    ],
    modelAnswer: `Betreff: Re: Ihre Wartezeit im Kundenservice

Sehr geehrte Frau Weber,

vielen Dank für Ihre Rückmeldung. Es tut mir leid, dass Sie so lange in der Warteschleife warten mussten.

Leider hatten wir in der letzten Woche einen unerwartet hohen Anrufaufkommen, sodass unsere Kapazitäten vorübergehend nicht ausgereicht haben. Das entspricht nicht unserem Anspruch an einen guten Service.

Wir haben deshalb bereits zusätzliche Mitarbeitende geschult und die Sprechzeiten erweitert, damit zukünftig schneller geholfen werden kann.

Wir würden uns freuen, wenn Sie uns weiterhin Ihr Vertrauen schenken. Bei Rückfragen erreichen Sie mich auch direkt per E-Mail.

Mit freundlichen Grüßen

Anna Müller
Kundenservice`,
    checklist: [
      "Die Wartezeit wird anerkannt und entschuldigt.",
      "Eine Erklärung wird genannt.",
      "Konkrete Verbesserungen werden zugesagt.",
      "Es wird höflich um Vertrauen geworben.",
      "Der Ton ist freundlich und professionell.",
    ],
  },
  {
    id: "els-8",
    title: "Auf Anfrage reagieren: Produktinformationen",
    type: "E-Mail",
    examPart: "lesen-schreiben",
    situation:
      "Ein Interessent hat nach technischen Details und dem Preis eines Produkts gefragt. Schreiben Sie eine Antwort.",
    requiredPoints: [
      "Auf die Anfrage eingehen",
      "Technische Details nennen",
      "Preis nennen",
      "Nächsten Schritt vorschlagen",
    ],
    modelAnswer: `Betreff: Re: Anfrage zu Produkt XY

Sehr geehrter Herr Schmidt,

vielen Dank für Ihr Interesse an unserem Produkt XY.

Gerne gebe ich Ihnen die gewünschten Informationen: Das Produkt hat eine Lebensdauer von ca. 10.000 Betriebsstunden und ist für den Dauerbetrieb geeignet. Es verfügt über eine Energiesparfunktion und erfüllt alle gängigen Sicherheitsstandards.

Der Preis beträgt 299 Euro zuzüglich Mehrwertsteuer. Bei Abnahme ab 10 Stück gewähren wir einen Mengenrabatt von 15 Prozent.

Ich schicke Ihnen gerne ein ausführliches Datenblatt per E-Mail zu. Bei Interesse vereinbaren wir auch gerne ein kurzes Telefonat.

Mit freundlichen Grüßen

Thomas Becker
Vertrieb`,
    checklist: [
      "Auf die Anfrage wird eingegangen.",
      "Technische Details werden genannt.",
      "Der Preis wird genannt.",
      "Ein nächster Schritt wird vorgeschlagen.",
      "Die E-Mail ist höflich und werbend.",
    ],
  },
  {
    id: "els-9",
    title: "Entschuldigung für verspätete Antwort",
    type: "E-Mail",
    examPart: "lesen-schreiben",
    situation:
      "Sie haben die E-Mail eines Kunden erst nach einer Woche beantwortet. Entschuldigen Sie sich und bearbeiten Sie das Anliegen.",
    requiredPoints: [
      "Sich für die verspätete Antwort entschuldigen",
      "Einen Grund nennen",
      "Das Anliegen bearbeiten",
      "Höflichen Abschluss formulieren",
    ],
    modelAnswer: `Betreff: Re: Ihre Anfrage vom 02.07.

Sehr geehrte Frau Neumann,

vielen Dank für Ihre Nachricht und bitte entschuldigen Sie die späte Rückmeldung.

Aufgrund von personellen Engpässen konnten wir Ihre Anfrage leider nicht früher bearbeiten. Das tut mir leid.

Gerne beantworte ich Ihre Fragen nun ausführlich: Ja, wir bieten auch Schulungen vor Ort an. Die Kosten richten sich nach der Teilnehmerzahl und dem Umfang. Ein konkretes Angebot erstelle ich Ihnen gerne nach einem kurzen Telefonat.

Bei weiteren Fragen stehe ich Ihnen selbstverständlich zur Verfügung.

Mit freundlichen Grüßen

Peter Hoffmann`,
    checklist: [
      "Es wird sich für die verspätete Antwort entschuldigt.",
      "Ein Grund wird genannt.",
      "Das Anliegen wird bearbeitet.",
      "Der Abschluss ist höflich.",
      "Die E-Mail ist sachlich und verständlich.",
    ],
  },
  {
    id: "els-10",
    title: "Auf Anweisung reagieren: Sicherheitsvorschriften",
    type: "E-Mail",
    examPart: "lesen-schreiben",
    situation:
      "Ihre Vorgesetzte weist Sie an, die neuen Sicherheitsvorschriften an Ihr Team weiterzugeben. Schreiben Sie eine kurze interne E-Mail.",
    requiredPoints: [
      "Das Thema nennen",
      "Wichtige Inhalte zusammenfassen",
      "Konsequenzen bei Nichtbeachtung erwähnen",
      "Um Rückmeldung bitten",
    ],
    modelAnswer: `Betreff: Neue Sicherheitsvorschriften – bitte zur Kenntnis nehmen

Liebe Kolleginnen und Kollegen,

ab dem 01.09. gelten in unserem Betrieb neue Sicherheitsvorschriften. Bitte nehmen Sie die Änderungen zur Kenntnis.

Zu den wichtigsten Punkten gehören:
- Tragen der vorgeschriebenen Schutzausrüstung in der Produktionshalle
- Meldung von Unfällen und Beinaheunfällen umgehend an die Sicherheitsfachkraft
- Regelmäßige Überprüfung der Arbeitsmittel

Bei Nichtbeachtung können leider Sanktionen nicht ausgeschlossen werden. Unser Ziel ist es, alle Beschäftigten bestmöglich zu schützen.

Bitte bestätigen Sie mir bis zum 25.08., dass Sie die neuen Vorschriften gelesen haben.

Mit freundlichen Grüßen

Max Mustermann`,
    checklist: [
      "Das Thema wird klar genannt.",
      "Wichtige Inhalte werden zusammengefasst.",
      "Konsequenzen werden erwähnt.",
      "Es wird um Rückmeldung gebeten.",
      "Die E-Mail ist klar struktiert.",
    ],
  },
  {
    id: "sbs-4",
    title: "Forumsbeitrag: Flexible Arbeitszeiten",
    type: "E-Mail",
    examPart: "sprachbausteine",
    situation:
      "In einem Arbeitnehmer-Forum wird diskutiert: 'Sollten alle Beschäftigten das Recht auf flexible Arbeitszeiten haben?' Schreiben Sie einen Forumsbeitrag von ca. 120 Wörtern.",
    requiredPoints: [
      "Eigene Meinung äußern",
      "Ein Argument dafür nennen",
      "Ein Argument dagegen nennen",
      "Ein Beispiel aus der eigenen Erfahrung geben",
    ],
    modelAnswer: `Ich finde, flexible Arbeitszeiten sind eine gute Sache, aber sie müssen betriebsabstimmbar sein.

Einerseits können Beschäftigte Familie und Beruf besser vereinbaren. Wer früh beginnt, kann den Nachmittag für die Kinder nutzen. Das steigert oft auch die Zufriedenheit und Motivation.

Andererseits brauchen Teams gemeinsame Kernzeiten, um sich abzustimmen. Wenn jeder zu unterschiedlichen Zeiten arbeitet, kann die Kommunikation darunter leiden.

In meinem Team haben wir vereinbart, dass jeder seine Arbeitszeit innerhalb gewisser Grenzen selbst einteilen kann. Das funktioniert gut, weil wir täglich eine gemeinsame Stunde für Besprechungen reservieren. Deshalb sollte Flexibilität möglich sein, aber mit klaren Absprachen.`,
    checklist: [
      "Eigene Meinung wird klar geäußert.",
      "Ein Pro-Argument wird genannt.",
      "Ein Contra-Argument wird genannt.",
      "Ein Beispiel aus der eigenen Erfahrung ist enthalten.",
      "Wortzahl liegt bei ca. 120 Wörtern.",
    ],
  },
  {
    id: "sbs-5",
    title: "Forumsbeitrag: Teambuilding-Maßnahmen",
    type: "E-Mail",
    examPart: "sprachbausteine",
    situation:
      "In einem Forum für Personalverantwortliche wird diskutiert: 'Sind Teambuilding-Maßnahmen im Betrieb sinnvoll?' Schreiben Sie einen Forumsbeitrag von ca. 120 Wörtern.",
    requiredPoints: [
      "Eigene Meinung äußern",
      "Ein Argument dafür nennen",
      "Ein Argument dagegen nennen",
      "Einen konkreten Vorschlag machen",
    ],
    modelAnswer: `Meiner Meinung nach können Teambuilding-Maßnahmen sehr sinnvoll sein, wenn sie gut geplant sind.

Einerseits stärken gemeinsame Aktivitäten das Vertrauen und verbessern die Zusammenarbeit im Alltag. Kolleginnen und Kollegen lernen sich außerhalb der Arbeitsroutine besser kennen.

Andererseits kann Teambuilding schnell gezwungen wirken, wenn die Aktivitäten nicht zum Team passen. Nicht jeder fühlt sich bei gemeinsamen Spielen wohl.

Ich schlage vor, regelmäßig kurze Feedbackrunden im Team durchzuführen und gemeinsam auszuwählen, welche Maßnahmen gewünscht sind. So bleibt die Teilnahme freiwillig und die Aktivitäten sind wirklich passend.`,
    checklist: [
      "Eigene Meinung wird klar geäußert.",
      "Ein Pro-Argument wird genannt.",
      "Ein Contra-Argument wird genannt.",
      "Ein konkreter Vorschlag wird gemacht.",
      "Wortzahl liegt bei ca. 120 Wörtern.",
    ],
  },
  {
    id: "sbs-6",
    title: "Forumsbeitrag: Ehrenamtliches Engagement",
    type: "E-Mail",
    examPart: "sprachbausteine",
    situation:
      "In einem Betriebsforum wird diskutiert: 'Sollten Unternehmen das ehrenamtliche Engagement ihrer Mitarbeitenden unterstützen?' Schreiben Sie einen Forumsbeitrag von ca. 120 Wörtern.",
    requiredPoints: [
      "Eigene Meinung äußern",
      "Ein Argument dafür nennen",
      "Ein Argument dagegen nennen",
      "Einen konkreten Vorschlag machen",
    ],
    modelAnswer: `Ich finde, Unternehmen sollten das ehrenamtliche Engagement ihrer Mitarbeitenden aktiv unterstützen.

Einerseits profitiert die Gesellschaft von engagierten Menschen. Wenn Beschäftigte beispielsweise in Sportvereinen, Flüchtlingshilfen oder Umweltprojekten helfen, stärkt das den sozialen Zusammenhalt.

Andererseits darf das Engagement nicht zu Lasten der Arbeitszeit gehen. Der Betrieb muss weiterhin seine Aufgaben erfüllen können.

Mein Vorschlag wäre, Beschäftigten pro Jahr einen oder zwei bezahlte Ehrenamttage zu geben. So können sie sich engagieren, ohne Urlaub zu verbrauchen. Das wäre auch ein positives Signal des Arbeitgebers.`,
    checklist: [
      "Eigene Meinung wird klar geäußert.",
      "Ein Pro-Argument wird genannt.",
      "Ein Contra-Argument wird genannt.",
      "Ein konkreter Vorschlag wird gemacht.",
      "Wortzahl liegt bei ca. 120 Wörtern.",
    ],
  },
];
