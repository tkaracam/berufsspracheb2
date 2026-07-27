"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  type Locale,
  type Dictionary,
  defaultLocale,
  getDictionary,
  rtlLocales,
} from "@/lib/i18n/dictionaries";

const COOKIE_NAME = "NEXT_LOCALE";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: Dictionary;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  const value = match?.[2] as Locale | undefined;
  return value && ["de", "tr", "en", "ar", "uk"].includes(value) ? value : null;
}

function setCookieLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=${60 * 60 * 24 * 365}`;
}

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    getCookieLocale() ?? initialLocale
  );
  const dictionary = getDictionary(locale);
  const isRtl = rtlLocales.includes(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [locale, isRtl]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setCookieLocale(next);
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dictionary, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

export function useTranslation() {
  return useLanguage().dictionary;
}
