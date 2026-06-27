"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Locale } from "@/lib/translations";
import { translations } from "@/lib/translations";

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = "evh-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "de" || stored === "en") {
      setLocaleState(stored);
    } else {
      const browserLang = navigator.language?.startsWith("de") ? "de" : "en";
      setLocaleState(browserLang);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const dict = translations[locale] || translations.en;
      let value = dict[key as keyof typeof dict] as string | undefined;
      if (value === undefined) {
        value = translations.en[key as keyof typeof translations.en] as string | undefined;
      }
      if (value === undefined) return key;
      if (vars) {
        return Object.entries(vars).reduce((str, [k, v]) => str.replace(`{${k}}`, String(v)), value);
      }
      return value;
    },
    [locale]
  );

  if (!mounted) return <>{children}</>;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    const fallbackT = (key: string, vars?: Record<string, string | number>): string => {
      const value = translations.en[key as keyof typeof translations.en] as string | undefined;
      if (value === undefined) return key;
      if (vars) {
        return Object.entries(vars).reduce((str, [k, v]) => str.replace(`{${k}}`, String(v)), value);
      }
      return value;
    };
    return { locale: "en" as Locale, setLocale: () => {}, t: fallbackT };
  }
  return context;
}
