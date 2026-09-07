import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import type { Dict, Lang } from "./types";
import bg from "./bg";
import en from "./en";
import de from "./de";

export type { Lang, Dict } from "./types";

export const DEFAULT_LANG: Lang = "bg";
export const LANGS: Lang[] = ["bg", "en", "de"];
/** Езици, които се показват като URL-префикс (българският е на корена). */
export const PREFIXED_LANGS: Lang[] = ["en", "de"];

export const LANG_META: Record<Lang, { label: string; name: string; flag: string; locale: string }> = {
  bg: { label: "БГ", name: "Български", flag: "🇧🇬", locale: "bg_BG" },
  en: { label: "EN", name: "English", flag: "🇬🇧", locale: "en_GB" },
  de: { label: "DE", name: "Deutsch", flag: "🇩🇪", locale: "de_DE" },
};

export const DICTS: Record<Lang, Dict> = { bg, en, de };

/** Cookie, което middleware-ът чете, за да уважи ръчния избор на език. */
export const LANG_COOKIE = "lang";

export function isLang(v: string | undefined | null): v is Lang {
  return !!v && (LANGS as string[]).includes(v);
}

/** Връща езика от началото на пътя: "/en/privacy" → "en", "/privacy" → "bg". */
export function langFromPath(pathname: string): Lang {
  const first = pathname.split("/")[1];
  return isLang(first) && first !== DEFAULT_LANG ? first : DEFAULT_LANG;
}

/** Маха езиковия префикс: "/en/privacy" → "/privacy", "/de" → "/". */
export function stripLang(pathname: string): string {
  const parts = pathname.split("/");
  if (isLang(parts[1]) && parts[1] !== DEFAULT_LANG) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname === "" ? "/" : pathname;
}

/** Слага езиков префикс на път без такъв: ("/privacy","de") → "/de/privacy"; ("/","en") → "/en". */
export function withLang(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === DEFAULT_LANG) return clean;
  if (clean === "/") return `/${lang}`;
  if (clean.startsWith("/#") || clean.startsWith("/?")) return `/${lang}${clean.slice(1)}`;
  return `/${lang}${clean}`;
}

export function setLangCookie(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;SameSite=Lax`;
}

/** Пътища (без префикс) на текущата страница в другите езици — напр. статия с различни slug-ове. */
export type Alternates = Partial<Record<Lang, string>>;

type Ctx = {
  lang: Lang;
  t: Dict;
  /** Локализира вътрешен път спрямо текущия език. */
  href: (path: string) => string;
  alternates: Alternates;
  setAlternates: (a: Alternates) => void;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children, initialLang }: { children: ReactNode; initialLang?: Lang }) {
  const { pathname } = useLocation();
  const lang = initialLang ?? langFromPath(pathname);
  const [alternates, setAlternates] = useState<Alternates>({});

  const value = useMemo<Ctx>(
    () => ({ lang, t: DICTS[lang], href: (path) => withLang(path, lang), alternates, setAlternates }),
    [lang, alternates],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
