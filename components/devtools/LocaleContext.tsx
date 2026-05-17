"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Locale } from "@/lib/devtools/translations";
import { t as translate } from "@/lib/devtools/translations";

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({
  children,
  initialLocale: init,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale_] = useState<Locale>(init ?? "zh");

  // Client-side: check localStorage for user override
  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && stored !== locale) {
      setLocale_(stored);
    } else {
      document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setLocale = (l: Locale) => {
    setLocale_(l);
    localStorage.setItem("locale", l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  };

  const r = (key: string, vars?: Record<string, string>) => translate(key, locale, vars);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: r }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextType {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
