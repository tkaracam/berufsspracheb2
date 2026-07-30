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

const ROLE_VISUALS: Record<string, { image: string; eyebrow: string }> = {
  "hotel-gastronomie::kellner / servicekraft": {
    image: "/images/professions/roles/kellner-servicekraft.png",
    eyebrow: "Service",
  },
  "hotel-gastronomie::koch": {
    image: "/images/professions/roles/koch.png",
    eyebrow: "Küche",
  },
  "hotel-gastronomie::hotelrezeptionist": {
    image: "/images/professions/roles/hotelrezeptionist.png",
    eyebrow: "Rezeption",
  },
  "hotel-gastronomie::restaurantleiter": {
    image: "/images/professions/roles/restaurantleiter.png",
    eyebrow: "Leitung",
  },
  "logistik-transport::lagerarbeiter": {
    image: "/images/professions/roles/lagerarbeiter.png",
    eyebrow: "Lager",
  },
  "logistik-transport::gabelstaplerfahrer": {
    image: "/images/professions/roles/gabelstaplerfahrer.png",
    eyebrow: "Stapler",
  },
  "logistik-transport::speditionskaufmann": {
    image: "/images/professions/roles/speditionskaufmann.png",
    eyebrow: "Disposition",
  },
  "logistik-transport::lkw-fahrer": {
    image: "/images/professions/roles/lkw-fahrer.png",
    eyebrow: "Transport",
  },
  "logistik-transport::kommissionierer": {
    image: "/images/professions/roles/kommissionierer.png",
    eyebrow: "Picking",
  },
  "logistik-transport::disponent": {
    image: "/images/professions/roles/disponent.png",
    eyebrow: "Planung",
  },
};

const FIELD_VISUAL_POOLS: Record<string, string[]> = {
  "logistik-transport": [
    "/images/professions/roles/lagerarbeiter.png",
    "/images/professions/roles/gabelstaplerfahrer.png",
    "/images/professions/roles/speditionskaufmann.png",
    "/images/professions/roles/lkw-fahrer.png",
    "/images/professions/roles/kommissionierer.png",
    "/images/professions/roles/disponent.png",
  ],
  "hotel-gastronomie": [
    "/images/professions/roles/kellner-servicekraft.png",
    "/images/professions/roles/koch.png",
    "/images/professions/roles/hotelrezeptionist.png",
    "/images/professions/roles/restaurantleiter.png",
  ],
  "lager-produktion": [
    "/images/professions/logistics.png",
    "/images/professions/craft.png",
    "/images/professions/technology.png",
  ],
  "pflege-gesundheit": [
    "/images/professions/healthcare.png",
    "/images/professions/service.png",
    "/images/professions/office.png",
  ],
  "erziehung-paedagogik": [
    "/images/professions/healthcare.png",
    "/images/professions/service.png",
    "/images/professions/office.png",
  ],
  "einzelhandel-verkauf": [
    "/images/professions/retail.png",
    "/images/professions/service.png",
    "/images/professions/office.png",
  ],
  "buero-verwaltung": [
    "/images/professions/office.png",
    "/images/professions/service.png",
    "/images/professions/technology.png",
  ],
  "it-digitale-berufe": [
    "/images/professions/technology.png",
    "/images/professions/office.png",
    "/images/professions/creative.png",
  ],
  "handwerk-bau": [
    "/images/professions/craft.png",
    "/images/professions/technology.png",
    "/images/professions/green-tech.png",
  ],
  "reinigung-gebaeudemanagement": [
    "/images/professions/service.png",
    "/images/professions/office.png",
    "/images/professions/craft.png",
  ],
  "sicherheit-service": [
    "/images/professions/service.png",
    "/images/professions/office.png",
    "/images/professions/logistics.png",
  ],
  "bewerbung-arbeitsmarkt": [
    "/images/professions/office.png",
    "/images/professions/service.png",
    "/images/professions/retail.png",
  ],
  "landwirtschaft-gartenbau": [
    "/images/professions/green-tech.png",
    "/images/professions/craft.png",
    "/images/professions/service.png",
  ],
  "kfz-mechatronik": [
    "/images/professions/craft.png",
    "/images/professions/technology.png",
    "/images/professions/logistics.png",
  ],
  "friseur-kosmetik": [
    "/images/professions/service.png",
    "/images/professions/retail.png",
    "/images/professions/creative.png",
  ],
  "lebensmittel-metzgerei": [
    "/images/professions/hospitality.png",
    "/images/professions/service.png",
    "/images/professions/craft.png",
  ],
  "tourismus-reisen": [
    "/images/professions/hospitality.png",
    "/images/professions/office.png",
    "/images/professions/service.png",
  ],
  "soziales-behindertenbetreuung": [
    "/images/professions/healthcare.png",
    "/images/professions/service.png",
    "/images/professions/office.png",
  ],
  "erneuerbare-energien-umwelt": [
    "/images/professions/green-tech.png",
    "/images/professions/technology.png",
    "/images/professions/craft.png",
  ],
  "banken-versicherungen": [
    "/images/professions/office.png",
    "/images/professions/technology.png",
    "/images/professions/service.png",
  ],
  "marketing-medien": [
    "/images/professions/creative.png",
    "/images/professions/technology.png",
    "/images/professions/office.png",
  ],
  "chemie-pharma": [
    "/images/professions/healthcare.png",
    "/images/professions/technology.png",
    "/images/professions/service.png",
  ],
  "maschinenbau-anlagenbau": [
    "/images/professions/technology.png",
    "/images/professions/craft.png",
    "/images/professions/logistics.png",
  ],
  "textil-mode": [
    "/images/professions/retail.png",
    "/images/professions/creative.png",
    "/images/professions/service.png",
  ],
  "sport-fitness": [
    "/images/professions/healthcare.png",
    "/images/professions/service.png",
    "/images/professions/green-tech.png",
  ],
  "kunst-kultur": [
    "/images/professions/creative.png",
    "/images/professions/service.png",
    "/images/professions/office.png",
  ],
  elektrotechnik: [
    "/images/professions/technology.png",
    "/images/professions/craft.png",
    "/images/professions/green-tech.png",
  ],
  "tiefbau-strassenbau": [
    "/images/professions/craft.png",
    "/images/professions/logistics.png",
    "/images/professions/technology.png",
  ],
  "druck-medienproduktion": [
    "/images/professions/creative.png",
    "/images/professions/technology.png",
    "/images/professions/office.png",
  ],
  kunststofftechnik: [
    "/images/professions/technology.png",
    "/images/professions/craft.png",
    "/images/professions/logistics.png",
  ],
  "optik-medizintechnik": [
    "/images/professions/technology.png",
    "/images/professions/healthcare.png",
    "/images/professions/office.png",
  ],
  "hauswirtschaft-familienpflege": [
    "/images/professions/service.png",
    "/images/professions/healthcare.png",
    "/images/professions/office.png",
  ],
  "oeffentlicher-dienst": [
    "/images/professions/office.png",
    "/images/professions/service.png",
    "/images/professions/healthcare.png",
  ],
  "schmuck-uhren": [
    "/images/professions/creative.png",
    "/images/professions/retail.png",
    "/images/professions/technology.png",
  ],
  "moebel-kuechenbau": [
    "/images/professions/craft.png",
    "/images/professions/retail.png",
    "/images/professions/service.png",
  ],
  "tierpflege-veterinaermedizin": [
    "/images/professions/green-tech.png",
    "/images/professions/healthcare.png",
    "/images/professions/service.png",
  ],
  "musikinstrumente-tonstudio": [
    "/images/professions/creative.png",
    "/images/professions/technology.png",
    "/images/professions/service.png",
  ],
  fahrzeugaufbereitung: [
    "/images/professions/craft.png",
    "/images/professions/service.png",
    "/images/professions/logistics.png",
  ],
};

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

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

function slugifyRoleAssetSegment(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function getGeneratedRoleImagePath(berufsfeldId: string, berufTitle: string) {
  return `/images/professions/roles/${slugifyRoleAssetSegment(berufsfeldId)}--${slugifyRoleAssetSegment(berufTitle)}.svg`;
}

export function getBerufVisual(berufsfeldId: string, berufTitle: string) {
  const fieldVisual = BERUFSFELD_VISUALS[berufsfeldId] ?? DEFAULT_BERUFSFELD_VISUAL;

  if (berufTitle.trim()) {
    return {
      image: getGeneratedRoleImagePath(berufsfeldId, berufTitle),
      eyebrow: fieldVisual.eyebrow,
    };
  }

  const exactKey = `${berufsfeldId}::${berufTitle.toLowerCase()}`;
  const exactVisual = ROLE_VISUALS[exactKey];
  if (exactVisual) {
    return exactVisual;
  }

  const pool = FIELD_VISUAL_POOLS[berufsfeldId];
  if (pool?.length) {
    const image = pool[hashString(exactKey) % pool.length];
    return {
      image,
      eyebrow: fieldVisual.eyebrow,
    };
  }

  const normalized = `${berufsfeldId} ${berufTitle}`;

  const keywordMatch = IMAGE_BY_KEYWORD.find((entry) => entry.match.test(normalized));
  if (keywordMatch) {
    return {
      image: keywordMatch.image,
      eyebrow: berufTitle,
    };
  }

  return {
    image: fieldVisual.image,
    eyebrow: fieldVisual.eyebrow,
  };
}
