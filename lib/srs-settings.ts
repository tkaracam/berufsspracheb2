export interface SRSSettings {
  newCardsPerDay: number;
  reviewLimit: number;
  startingEase: number;
  easyBonus: number;
  maxInterval: number;
  sessionLimit: number;
}

const DEFAULT_SETTINGS: SRSSettings = {
  newCardsPerDay: 20,
  reviewLimit: 100,
  startingEase: 2.5,
  easyBonus: 1.3,
  maxInterval: 3650,
  sessionLimit: 0,
};

const STORAGE_KEY = "bsk-srs-settings";

export function getSRSSettings(): SRSSettings {
  if (typeof window === "undefined") return { ...DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<SRSSettings>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSRSSettings(settings: SRSSettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
