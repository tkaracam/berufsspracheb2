export type DemoItemType = "fachwort" | "nomen_verb";

export interface DemoFavorite {
  itemType: DemoItemType;
  itemId: string;
  title: string;
  addedAt: string;
}

export interface DemoProgress {
  itemType:
    | DemoItemType
    | "nomen_verb_quiz"
    | "lueckentext"
    | "grammar_quiz"
    | "reading_quiz"
    | "listening_quiz"
    | "writing_quiz"
    | "speaking_quiz"
    | "redemittel_quiz";
  itemId: string;
  score: number;
  practicedAt: string;
}

const FAVORITES_KEY = "bsk-demo-favorites";
const PROGRESS_KEY = "bsk-demo-progress";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getDemoFavorites(): DemoFavorite[] {
  if (typeof window === "undefined") return [];
  return safeParse<DemoFavorite[]>(localStorage.getItem(FAVORITES_KEY), []);
}

export function saveDemoFavorites(favorites: DemoFavorite[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isDemoFavorite(itemType: DemoItemType, itemId: string): boolean {
  return getDemoFavorites().some(
    (f) => f.itemType === itemType && f.itemId === itemId
  );
}

export function toggleDemoFavorite(
  itemType: DemoItemType,
  itemId: string,
  title: string
): boolean {
  const favorites = getDemoFavorites();
  const existingIndex = favorites.findIndex(
    (f) => f.itemType === itemType && f.itemId === itemId
  );

  if (existingIndex >= 0) {
    favorites.splice(existingIndex, 1);
    saveDemoFavorites(favorites);
    return false;
  }

  favorites.unshift({
    itemType,
    itemId,
    title,
    addedAt: new Date().toISOString(),
  });
  saveDemoFavorites(favorites);
  return true;
}

export function getDemoProgress(): DemoProgress[] {
  if (typeof window === "undefined") return [];
  return safeParse<DemoProgress[]>(localStorage.getItem(PROGRESS_KEY), []);
}

export function saveDemoProgress(progress: DemoProgress[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function addDemoProgress(entry: DemoProgress) {
  const progress = getDemoProgress();
  const existingIndex = progress.findIndex(
    (p) => p.itemType === entry.itemType && p.itemId === entry.itemId
  );

  if (existingIndex >= 0) {
    progress[existingIndex] = entry;
  } else {
    progress.unshift(entry);
  }

  saveDemoProgress(progress);
}

export function getTodayDemoProgressCount(): number {
  const today = new Date();
  return getDemoProgress().filter((p) => {
    const practiced = new Date(p.practicedAt);
    return (
      practiced.getDate() === today.getDate() &&
      practiced.getMonth() === today.getMonth() &&
      practiced.getFullYear() === today.getFullYear()
    );
  }).length;
}

export function getCompletedDemoProgressCount(): number {
  return getDemoProgress().filter((p) => p.score >= 80).length;
}

export function getDemoFavoritesCount(): number {
  return getDemoFavorites().length;
}
