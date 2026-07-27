export const APP_NAME = "Berufssprache B2";
export const APP_DESCRIPTION =
  "Trainieren Sie Fachwortschatz, berufliche Kommunikation und prüfungsrelevante Strukturen für den Berufssprachkurs B2.";

export const ROLES = {
  guest: { label: "Gast", color: "secondary" as const },
  learner: { label: "Lernender", color: "default" as const },
  teacher: { label: "Lehrkraft", color: "outline" as const },
  admin: { label: "Admin", color: "destructive" as const },
} as const;

export type RoleKey = keyof typeof ROLES;

export const BERUFSFELDER = [
  {
    id: "logistik-transport",
    title: "Logistik & Transport",
    icon: "Truck",
    description:
      "Lagerlogistik, Spedition, Versand, Lieferketten, Staplerfahren, Warenannahme",
  },
  {
    id: "lager-produktion",
    title: "Lager & Produktion",
    icon: "Package",
    description:
      "Kommissionierung, Verpackung, Maschinenbedienung, Qualitätskontrolle",
  },
  {
    id: "pflege-gesundheit",
    title: "Pflege & Gesundheitswesen",
    icon: "HeartPulse",
    description:
      "Altenpflege, Krankenpflege, Krankenhausalltag, Kommunikation mit Patienten",
  },
  {
    id: "erziehung-paedagogik",
    title: "Erziehung & Pädagogik",
    icon: "Baby",
    description:
      "Kita, Kindergarten, Schule, Betreuung von Kindern, Elternkommunikation",
  },
  {
    id: "hotel-gastronomie",
    title: "Hotel & Gastronomie",
    icon: "UtensilsCrossed",
    description:
      "Rezeption, Service, Housekeeping, Restaurant, Küche, Gästekommunikation",
  },
  {
    id: "einzelhandel-verkauf",
    title: "Einzelhandel & Verkauf",
    icon: "ShoppingCart",
    description:
      "Kasse, Kundenberatung, Reklamationen, Warenpräsentation",
  },
  {
    id: "buero-verwaltung",
    title: "Büro & Verwaltung",
    icon: "Building2",
    description:
      "E-Mails schreiben, Telefonieren, Terminplanung, Aktenbearbeitung",
  },
  {
    id: "it-digitale-berufe",
    title: "IT & digitale Berufe",
    icon: "Monitor",
    description:
      "IT-Support, Kommunikation im Team, Ticketsysteme, Software-Grundlagen",
  },
  {
    id: "handwerk-bau",
    title: "Handwerk & Bau",
    icon: "Hammer",
    description:
      "Bauarbeiten, Elektro, Sanitär, Werkzeuge, Sicherheitsvorschriften",
  },
  {
    id: "reinigung-gebaeudemanagement",
    title: "Reinigung & Gebäudemanagement",
    icon: "Sparkles",
    description:
      "Reinigungskräfte, Hygienepläne, Arbeitsanweisungen, Sicherheit",
  },
  {
    id: "sicherheit-service",
    title: "Sicherheit & Service",
    icon: "ShieldCheck",
    description:
      "Sicherheitsdienst, Empfang, Kontrolle, Notfallsituationen",
  },
  {
    id: "bewerbung-arbeitsmarkt",
    title: "Bewerbung & Arbeitsmarkt",
    icon: "Briefcase",
    description:
      "Lebenslauf, Vorstellungsgespräch, Arbeitsvertrag, Rechte/Pflichten",
  },
  {
    id: "landwirtschaft-gartenbau",
    title: "Landwirtschaft & Gartenbau",
    icon: "Leaf",
    description:
      "Ackerbau, Viehhaltung, Garten- und Landschaftsbau, Pflanzenschutz, Ernte",
  },
  {
    id: "kfz-mechatronik",
    title: "Kfz-Technik & Mechatronik",
    icon: "Car",
    description:
      "Fahrzeugwartung, Reparatur, Diagnose, Elektrik, E-Mobilität",
  },
  {
    id: "friseur-kosmetik",
    title: "Friseur & Kosmetik",
    icon: "Scissors",
    description:
      "Haareschneiden, Färben, Pflege, Beratung, Kosmetikbehandlung",
  },
  {
    id: "lebensmittel-metzgerei",
    title: "Lebensmittel & Metzgerei",
    icon: "Beef",
    description:
      "Lebensmittelverarbeitung, Fleischer, Hygiene, Verkauf, Frische",
  },
  {
    id: "tourismus-reisen",
    title: "Tourismus & Reisen",
    icon: "Plane",
    description:
      "Reisebüro, Reiseleitung, Buchung, Gästebetreuung, Ausflüge",
  },
  {
    id: "soziales-behindertenbetreuung",
    title: "Soziales & Behindertenbetreuung",
    icon: "HeartHandshake",
    description:
      "Betreuung, Förderung, Alltagsbegleitung, Inklusion, Wohnen",
  },
  {
    id: "erneuerbare-energien-umwelt",
    title: "Erneuerbare Energien & Umwelt",
    icon: "Sun",
    description:
      "Solar, Windkraft, Recycling, Umweltschutz, Nachhaltigkeit",
  },
  {
    id: "banken-versicherungen",
    title: "Banken & Versicherungen",
    icon: "Landmark",
    description:
      "Kontoführung, Beratung, Kredite, Versicherungsabschluss, Schadensregulierung",
  },
  {
    id: "marketing-medien",
    title: "Marketing & Medien",
    icon: "Megaphone",
    description:
      "Werbung, Social Media, Kampagnen, Content-Erstellung, Öffentlichkeitsarbeit",
  },
  {
    id: "chemie-pharma",
    title: "Chemie & Pharmazie",
    icon: "FlaskConical",
    description:
      "Laborarbeit, Rezeptur, Medikamente, Sicherheitsdatenblätter, GMP",
  },
  {
    id: "maschinenbau-anlagenbau",
    title: "Maschinenbau & Anlagenbau",
    icon: "Cog",
    description:
      "Konstruktion, Montage, Wartung, CAD, Fertigungsverfahren",
  },
  {
    id: "textil-mode",
    title: "Textil & Mode",
    icon: "Shirt",
    description:
      "Schneiderei, Verkauf, Stoffkunde, Muster, Modeberatung",
  },
  {
    id: "sport-fitness",
    title: "Sport & Fitness",
    icon: "Dumbbell",
    description:
      "Training, Kursleitung, Ernährungsberatung, Rehabilitation, Wellness",
  },
  {
    id: "kunst-kultur",
    title: "Kunst & Kultur",
    icon: "Palette",
    description:
      "Museen, Theater, Veranstaltungen, Restauration, Kulturmanagement",
  },
  {
    id: "elektrotechnik",
    title: "Elektrotechnik",
    icon: "Zap",
    description:
      "Elektroinstallation, Schaltanlagen, Leitungsbau, Energietechnik, SPS",
  },
  {
    id: "tiefbau-strassenbau",
    title: "Tiefbau & Straßenbau",
    icon: "Road",
    description:
      "Straßenbau, Kanalbau, Asphaltierung, Erdarbeiten, Baustelleneinrichtung",
  },
  {
    id: "druck-medienproduktion",
    title: "Druck & Medienproduktion",
    icon: "Printer",
    description:
      "Offsetdruck, Digitaldruck, Buchbinderei, Druckvorstufe, Werbetechnik",
  },
  {
    id: "kunststofftechnik",
    title: "Kunststofftechnik",
    icon: "Layers",
    description:
      "Spritzguss, Extrusion, Thermoformen, Werkzeugbau, Verarbeitung",
  },
  {
    id: "optik-medizintechnik",
    title: "Optik & Medizintechnik",
    icon: "Glasses",
    description:
      "Brillenoptik, Kontaktlinsen, Hörgeräte, orthopädische Hilfsmittel",
  },
  {
    id: "hauswirtschaft-familienpflege",
    title: "Hauswirtschaft & Familienpflege",
    icon: "Home",
    description:
      "Haushaltsführung, Mahlzeiten, Einkauf, Betreuung zu Hause, Familienmanagement",
  },
  {
    id: "oeffentlicher-dienst",
    title: "Öffentlicher Dienst",
    icon: "Files",
    description:
      "Behörden, Bürgerservice, Sozialamt, Jugendamt, Schulverwaltung",
  },
  {
    id: "schmuck-uhren",
    title: "Schmuck & Uhren",
    icon: "Watch",
    description:
      "Juwelen, Uhrmacher, Goldschmied, Verkauf, Reparatur, Pflege",
  },
  {
    id: "moebel-kuechenbau",
    title: "Möbel & Küchenbau",
    icon: "Sofa",
    description:
      "Möbelmontage, Küchenplanung, Schreinerei, Einrichtungsberatung",
  },
  {
    id: "tierpflege-veterinaermedizin",
    title: "Tierpflege & Veterinärmedizin",
    icon: "Cat",
    description:
      "Tierarztpraxis, Tierpflege, Hundesalon, Landwirtschaftliche Tierhaltung",
  },
  {
    id: "musikinstrumente-tonstudio",
    title: "Musikinstrumente & Tonstudio",
    icon: "Music",
    description:
      "Instrumentenbau, Reparatur, Musikunterricht, Tontechnik, Aufnahmen",
  },
  {
    id: "fahrzeugaufbereitung",
    title: "Fahrzeugaufbereitung",
    icon: "Droplets",
    description:
      "Autopflege, Lackaufbereitung, Innenreinigung, Fahrzeugwäsche, Detailing",
  },
] as const;

export const SCHWIERIGKEITEN = [
  { value: "leicht", label: "Leicht" },
  { value: "mittel", label: "Mittel" },
  { value: "schwer", label: "Schwer" },
] as const;
