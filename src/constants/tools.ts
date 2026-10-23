import type { Lang } from "../i18n/types";

/** Адреси (без езиков префикс) на инструментите: планер на проект и безплатна проверка на сайт. */
export const PLANNER_BASE: Record<Lang, string> = { bg: "/planer", en: "/planner", de: "/planer", nl: "/planner" };
export const AUDIT_BASE: Record<Lang, string> = { bg: "/proverka-na-sait", en: "/website-check", de: "/website-check", nl: "/website-check" };

/**
 * Адресът от полето „Проверете сайта си“ → пълен URL или null. Приема и „сайт.bg“ без схема.
 * Ползва се и от картата на началната страница (Tools.tsx), и от самата проверка (SiteCheck.tsx).
 */
export function normalizeSiteUrl(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    return u.hostname.includes(".") ? u.href : null;
  } catch {
    return null;
  }
}
