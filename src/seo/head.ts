import { createContext, type MutableRefObject } from "react";
import { LANGS, LANG_META, DEFAULT_LANG, withLang, type Alternates } from "../i18n";
import type { Lang } from "../i18n/types";

export const SITE_ORIGIN = "https://www.rafetov.com";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/zzzz.jpg`;

export type SeoInput = {
  title: string;
  description: string;
  /** Път БЕЗ езиков префикс за текущия език, напр. "/" или "/blog/slug". */
  path: string;
  lang: Lang;
  /** Пътища без префикс за другите езици (ако се различават от `path`). */
  alternates?: Alternates;
  /** Абсолютен URL или път от корена за og:image. */
  image?: string;
  ogType?: "website" | "article";
  jsonLd?: object | object[];
};

export type HeadData = {
  lang: Lang;
  title: string;
  metas: { attr: "name" | "property"; key: string; content: string }[];
  links: { rel: string; href: string; hreflang?: string }[];
  jsonLd: object[];
};

function abs(url: string): string {
  return url.startsWith("http") ? url : `${SITE_ORIGIN}${url}`;
}

/** Единствената логика за head тагове — ползва се от useSeo (браузър) и от prerender скрипта (HTML). */
export function buildHead(input: SeoInput): HeadData {
  const { title, description, path, lang } = input;
  const pathFor = (l: Lang) => input.alternates?.[l] ?? path;
  const url = abs(withLang(path, lang));
  const image = abs(input.image ?? DEFAULT_OG_IMAGE);

  const metas: HeadData["metas"] = [
    { attr: "name", key: "description", content: description },
    { attr: "property", key: "og:type", content: input.ogType ?? "website" },
    { attr: "property", key: "og:title", content: title },
    { attr: "property", key: "og:description", content: description },
    { attr: "property", key: "og:url", content: url },
    { attr: "property", key: "og:image", content: image },
    { attr: "property", key: "og:locale", content: LANG_META[lang].locale },
    { attr: "name", key: "twitter:title", content: title },
    { attr: "name", key: "twitter:description", content: description },
    { attr: "name", key: "twitter:image", content: image },
  ];

  const links: HeadData["links"] = [{ rel: "canonical", href: url }];
  for (const l of LANGS) links.push({ rel: "alternate", hreflang: l, href: abs(withLang(pathFor(l), l)) });
  links.push({ rel: "alternate", hreflang: "x-default", href: abs(withLang(pathFor(DEFAULT_LANG), DEFAULT_LANG)) });

  const jsonLd = input.jsonLd ? (Array.isArray(input.jsonLd) ? input.jsonLd : [input.jsonLd]) : [];
  return { lang, title, metas, links, jsonLd };
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** HTML низ с всички head тагове (за prerender). */
export function headToHtml(h: HeadData): string {
  const out: string[] = [`<title>${esc(h.title)}</title>`];
  for (const m of h.metas) out.push(`<meta ${m.attr}="${m.key}" content="${esc(m.content)}" />`);
  for (const l of h.links)
    out.push(`<link rel="${l.rel}"${l.hreflang ? ` hreflang="${l.hreflang}"` : ""} href="${esc(l.href)}" />`);
  for (const j of h.jsonLd)
    out.push(`<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`);
  return out.join("\n    ");
}

/** По време на server render страниците записват head данните си тук. */
export const SeoCollectorContext = createContext<MutableRefObject<HeadData | null> | null>(null);

/** Общи JSON-LD данни за организацията — прилагат се на началната страница. */
export function organizationJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: "Rafetov",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/rafetov-logo.png`,
    image: DEFAULT_OG_IMAGE,
    telephone: "+359897758062",
    email: "business@rafetov.com",
    priceRange: "€€",
    areaServed: ["BG", "DE", "AT", "CH", "GB", "BE", "NO", "ES"],
    availableLanguage: ["bg", "en", "de"],
    address: { "@type": "PostalAddress", addressCountry: "BG" },
    sameAs: ["https://www.instagram.com/rafetov.com_/", "https://www.facebook.com/profile.php?id=61565660383482"],
    inLanguage: lang,
  };
}
