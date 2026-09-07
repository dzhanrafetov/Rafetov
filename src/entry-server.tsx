/**
 * Server entry за prerender при build (scripts/prerender.mjs).
 * Рендерира всяка страница до статичен HTML, за да я виждат Google и социалните мрежи
 * без да изпълняват JavaScript. В браузъра React заменя този HTML при зареждане.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppShell, { type Pages } from "./AppShell";
import Hero from "./pages/Hero";
import Services from "./pages/Services";
import Guarantees from "./pages/Guarantees";
import Market from "./pages/OnlinePresenceCTA";
import Portfolio from "./pages/Portfolio";
import BlogTeaser from "./pages/BlogTeaser";
import Contact from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import ServicePage from "./pages/ServicePage";
import NotFound from "./pages/NotFound";
import { SeoCollectorContext, headToHtml, type HeadData } from "./seo/head";
import { LANGS, langFromPath, withLang, type Lang } from "./i18n";
import { BLOG_BASE, POSTS, postAlternates, postPath } from "./blog";
import { SERVICES, serviceAlternates, servicePath } from "./services";
import { BUSINESS } from "./constants/business";

const pages: Pages = {
  Hero, Services, Guarantees, Market, Portfolio, BlogTeaser, Contact,
  PrivacyPolicy, LegalNotice, BlogIndex, BlogPost, ServicePage, NotFound,
};

export type RouteEntry = {
  /** Пълен URL път с езиков префикс, напр. "/en/blog/…" */
  url: string;
  lang: Lang;
  /** Път без префикс */
  path: string;
  /** Пътища без префикс за всички езици (за hreflang в sitemap) */
  alternates: Record<Lang, string>;
  lastmod: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
};

const LEGAL_LASTMOD = "2026-09-06";
const BUILD_DATE = new Date().toISOString().slice(0, 10);

/** Всички адреси, които се пререндерират и влизат в sitemap.xml. */
export function getRoutes(): RouteEntry[] {
  const same = (p: string) => ({ bg: p, en: p, de: p });
  const out: RouteEntry[] = [];
  for (const lang of LANGS) {
    const home = lang === "bg" ? 1.0 : 0.9;
    out.push({ url: withLang("/", lang), lang, path: "/", alternates: same("/"), lastmod: BUILD_DATE, changefreq: "monthly", priority: home });
    for (const s of SERVICES) {
      const path = servicePath(s, lang);
      out.push({ url: withLang(path, lang), lang, path, alternates: serviceAlternates(s), lastmod: BUILD_DATE, changefreq: "monthly", priority: 0.9 });
    }
    out.push({ url: withLang(BLOG_BASE, lang), lang, path: BLOG_BASE, alternates: same(BLOG_BASE), lastmod: POSTS[0]?.date ?? BUILD_DATE, changefreq: "weekly", priority: 0.8 });
    for (const post of POSTS) {
      const path = postPath(post, lang);
      out.push({ url: withLang(path, lang), lang, path, alternates: postAlternates(post), lastmod: post.date, changefreq: "monthly", priority: 0.7 });
    }
    out.push({ url: withLang("/privacy", lang), lang, path: "/privacy", alternates: same("/privacy"), lastmod: LEGAL_LASTMOD, changefreq: "yearly", priority: 0.3 });
    out.push({ url: withLang("/legal", lang), lang, path: "/legal", alternates: same("/legal"), lastmod: LEGAL_LASTMOD, changefreq: "yearly", priority: 0.3 });
  }
  return out;
}

export function render(url: string): { html: string; head: HeadData; headHtml: string } {
  const collector = { current: null as HeadData | null };
  const html = renderToString(
    <SeoCollectorContext.Provider value={collector}>
      <StaticRouter location={url}>
        <AppShell pages={pages} initialLang={langFromPath(url)} />
      </StaticRouter>
    </SeoCollectorContext.Provider>,
  );
  if (!collector.current) throw new Error(`No SEO data collected for ${url}`);
  return { html, head: collector.current, headHtml: headToHtml(collector.current) };
}

export { withLang, BUSINESS };
