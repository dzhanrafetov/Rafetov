/**
 * Vercel Routing Middleware — избира език според държавата на посетителя.
 *
 * Правила (само за пътища БЕЗ езиков префикс: "/", "/privacy", "/legal"):
 *  1. Ботове (Google, Bing, Facebook…) никога не се пренасочват — индексират "/" на български,
 *     а другите езици намират през hreflang.
 *  2. Ако има cookie "lang" (ръчен избор от менюто) — то е с предимство.
 *  3. Иначе по държава от IP: BG → български (без redirect), DE/AT/CH/LI → /de, всички останали → /en.
 *  4. Ако държавата не е известна — по Accept-Language на браузъра.
 *
 * Пренасочването е 302 (временно), за да не „запечата“ Google един език за корена.
 */
import { geolocation, next } from "@vercel/functions";

type Lang = "bg" | "en" | "de";

const SUPPORTED: Lang[] = ["bg", "en", "de"];
const GERMAN_COUNTRIES = new Set(["DE", "AT", "CH", "LI"]);

const BOT_RE =
  /bot|crawl|spider|slurp|facebookexternalhit|facebot|whatsapp|telegram|twitterbot|linkedinbot|pinterest|embedly|skypeuripreview|discordbot|googlebot|bingbot|yandex|duckduck|baidu|applebot|ia_archiver|lighthouse|pagespeed|gtmetrix|headless|preview/i;

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return null;
}

function langForCountry(country: string | undefined | null): Lang | null {
  if (!country) return null;
  if (country === "BG") return "bg";
  if (GERMAN_COUNTRIES.has(country)) return "de";
  return "en";
}

function langForAcceptLanguage(header: string | null): Lang {
  const primary = (header || "").toLowerCase().split(",")[0].trim();
  if (primary.startsWith("bg")) return "bg";
  if (primary.startsWith("de")) return "de";
  return "en";
}

export default function middleware(request: Request) {
  const ua = request.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) return next();

  const cookieLang = readCookie(request.headers.get("cookie"), "lang");
  let lang: Lang;

  if (cookieLang && (SUPPORTED as string[]).includes(cookieLang)) {
    lang = cookieLang as Lang;
  } else {
    const country = geolocation(request).country ?? request.headers.get("x-vercel-ip-country");
    lang = langForCountry(country) ?? langForAcceptLanguage(request.headers.get("accept-language"));
  }

  if (lang === "bg") return next();

  const url = new URL(request.url);
  url.pathname = url.pathname === "/" ? `/${lang}` : `/${lang}${url.pathname}`;
  return Response.redirect(url.toString(), 302);
}

export const config = {
  matcher: ["/", "/privacy", "/legal"],
};
