import { cookies } from "next/headers";
import { type Locale, defaultLocale, getDictionary, type Dictionary } from "./dictionaries";

export async function getDictionaryFromCookie(): Promise<Dictionary> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("NEXT_LOCALE")?.value as Locale | undefined;
  const locale = cookie && ["de", "tr", "en", "ar", "uk"].includes(cookie) ? cookie : defaultLocale;
  return getDictionary(locale);
}
