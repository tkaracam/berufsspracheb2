export const BERUFSFELD_VISUALS: Record<
  string,
  {
    image: string;
    eyebrow: string;
  }
> = {
  "logistik-transport": {
    image: "/images/professions/logistics.png",
    eyebrow: "Logistik",
  },
  "lager-produktion": {
    image: "/images/professions/logistics.png",
    eyebrow: "Produktion",
  },
  "pflege-gesundheit": {
    image: "/images/professions/healthcare.png",
    eyebrow: "Gesundheit",
  },
  "erziehung-paedagogik": {
    image: "/images/professions/healthcare.png",
    eyebrow: "Pädagogik",
  },
  "hotel-gastronomie": {
    image: "/images/professions/hospitality.png",
    eyebrow: "Gastronomie",
  },
  "einzelhandel-verkauf": {
    image: "/images/professions/retail.png",
    eyebrow: "Verkauf",
  },
  "buero-verwaltung": {
    image: "/images/professions/office.png",
    eyebrow: "Verwaltung",
  },
  "it-digitale-berufe": {
    image: "/images/professions/technology.png",
    eyebrow: "Digital",
  },
  "handwerk-bau": {
    image: "/images/professions/craft.png",
    eyebrow: "Handwerk",
  },
  "reinigung-gebaeudemanagement": {
    image: "/images/professions/service.png",
    eyebrow: "Service",
  },
  "sicherheit-service": {
    image: "/images/professions/service.png",
    eyebrow: "Sicherheit",
  },
  "bewerbung-arbeitsmarkt": {
    image: "/images/professions/office.png",
    eyebrow: "Arbeitswelt",
  },
  "landwirtschaft-gartenbau": {
    image: "/images/professions/green-tech.png",
    eyebrow: "Natur",
  },
  "kfz-mechatronik": {
    image: "/images/professions/craft.png",
    eyebrow: "Fahrzeugtechnik",
  },
  "friseur-kosmetik": {
    image: "/images/professions/service.png",
    eyebrow: "Kosmetik",
  },
  "lebensmittel-metzgerei": {
    image: "/images/professions/hospitality.png",
    eyebrow: "Lebensmittel",
  },
  "tourismus-reisen": {
    image: "/images/professions/hospitality.png",
    eyebrow: "Tourismus",
  },
  "soziales-behindertenbetreuung": {
    image: "/images/professions/healthcare.png",
    eyebrow: "Soziales",
  },
  "erneuerbare-energien-umwelt": {
    image: "/images/professions/green-tech.png",
    eyebrow: "Nachhaltigkeit",
  },
  "banken-versicherungen": {
    image: "/images/professions/office.png",
    eyebrow: "Finanzen",
  },
  "marketing-medien": {
    image: "/images/professions/creative.png",
    eyebrow: "Medien",
  },
  "chemie-pharma": {
    image: "/images/professions/healthcare.png",
    eyebrow: "Labor",
  },
  "maschinenbau-anlagenbau": {
    image: "/images/professions/technology.png",
    eyebrow: "Anlagenbau",
  },
  "textil-mode": {
    image: "/images/professions/retail.png",
    eyebrow: "Mode",
  },
  "sport-fitness": {
    image: "/images/professions/healthcare.png",
    eyebrow: "Fitness",
  },
  "kunst-kultur": {
    image: "/images/professions/creative.png",
    eyebrow: "Kultur",
  },
  elektrotechnik: {
    image: "/images/professions/technology.png",
    eyebrow: "Elektro",
  },
  "tiefbau-strassenbau": {
    image: "/images/professions/craft.png",
    eyebrow: "Tiefbau",
  },
  "druck-medienproduktion": {
    image: "/images/professions/creative.png",
    eyebrow: "Produktion",
  },
  kunststofftechnik: {
    image: "/images/professions/technology.png",
    eyebrow: "Technik",
  },
  "optik-medizintechnik": {
    image: "/images/professions/technology.png",
    eyebrow: "Medizintechnik",
  },
  "hauswirtschaft-familienpflege": {
    image: "/images/professions/service.png",
    eyebrow: "Hauswirtschaft",
  },
  "oeffentlicher-dienst": {
    image: "/images/professions/office.png",
    eyebrow: "Öffentlicher Dienst",
  },
  "schmuck-uhren": {
    image: "/images/professions/creative.png",
    eyebrow: "Präzision",
  },
  "moebel-kuechenbau": {
    image: "/images/professions/craft.png",
    eyebrow: "Innenausbau",
  },
  "tierpflege-veterinaermedizin": {
    image: "/images/professions/green-tech.png",
    eyebrow: "Tierpflege",
  },
  "musikinstrumente-tonstudio": {
    image: "/images/professions/creative.png",
    eyebrow: "Musik",
  },
  fahrzeugaufbereitung: {
    image: "/images/professions/craft.png",
    eyebrow: "Aufbereitung",
  },
};

export const DEFAULT_BERUFSFELD_VISUAL = {
  image: "/images/professions/office.png",
  eyebrow: "Berufsfeld",
};

const IMAGE_BY_KEYWORD: Array<{ match: RegExp; image: string }> = [
  { match: /pflege|arzt|patient|therapie|physio|medizin|pharma|apotheke/i, image: "/images/professions/healthcare.png" },
  { match: /koch|service|kellner|hotel|rezeption|gast|tourismus|reise/i, image: "/images/professions/hospitality.png" },
  { match: /verk[aä]ufer|kasse|filial|kundenberater|mode|textil/i, image: "/images/professions/retail.png" },
  { match: /logistik|lager|transport|fahrer|spedition|kommission|zusteller/i, image: "/images/professions/logistics.png" },
  { match: /it|software|system|digital|support|medien|marketing|content|design|druck|musik/i, image: "/images/professions/technology.png" },
  { match: /elektr|mechanik|mechatronik|bauer|schwei|cnc|installateur|tischler|schreiner|lackierer|kfz|straßen|tiefbau|möbel|küchen/i, image: "/images/professions/craft.png" },
  { match: /garten|landwirt|tier|umwelt|solar|wind|recycling|energie/i, image: "/images/professions/green-tech.png" },
  { match: /büro|verwaltung|buchhalter|empfang|sekret|amt|bank|versicherung|finanz/i, image: "/images/professions/office.png" },
  { match: /friseur|kosmetik|hauswirtschaft|reinigung|security|alltag|familie/i, image: "/images/professions/service.png" },
  { match: /kunst|kultur|theater|restaurator|juwelier|goldschmied|uhr|grafik/i, image: "/images/professions/creative.png" },
];

export function getBerufVisual(berufsfeldId: string, berufTitle: string) {
  const normalized = `${berufsfeldId} ${berufTitle}`;

  const keywordMatch = IMAGE_BY_KEYWORD.find((entry) => entry.match.test(normalized));
  if (keywordMatch) {
    return {
      image: keywordMatch.image,
      eyebrow: berufTitle,
    };
  }

  const fieldVisual = BERUFSFELD_VISUALS[berufsfeldId] ?? DEFAULT_BERUFSFELD_VISUAL;
  return {
    image: fieldVisual.image,
    eyebrow: fieldVisual.eyebrow,
  };
}
