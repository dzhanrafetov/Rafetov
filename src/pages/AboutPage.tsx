import { Link as RouterLink } from "react-router-dom";
import { useLang, withLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { SITE_ORIGIN } from "../seo/head";
import { ABOUT_BASE, featuredFor } from "../constants/projects";
import About from "./About";
import Process from "./Portfolio";
import Reviews from "./Reviews";
import TrustedBy from "../components/TrustedBy";
import { CardsGrid } from "./OnlinePresenceCTA";

/**
 * „За нас“: същата секция като на началната страница (с h1), логата, избрани проекти,
 * отзивите и процесът. Отделен адрес, за да има какво да се сподели и да се намери в Google.
 */
export default function AboutPage() {
  const { t, lang, href } = useLang();
  const path = ABOUT_BASE[lang];
  useSeo({
    title: t.about.pageTitle,
    description: t.about.pageDescription,
    path,
    alternates: { bg: ABOUT_BASE.bg, en: ABOUT_BASE.en, de: ABOUT_BASE.de, nl: ABOUT_BASE.nl },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: t.about.pageTitle,
      description: t.about.pageDescription,
      url: `${SITE_ORIGIN}${withLang(path, lang)}`,
      about: { "@id": `${SITE_ORIGIN}/#organization` },
      inLanguage: lang,
    },
  });
  const featured = featuredFor(lang).slice(0, 6);

  return (
    <main className="text-slate-200" style={{ backgroundColor: "#07090f" }}>
      <About page />
      <TrustedBy />
      <section className="relative text-slate-200" style={{ backgroundColor: "#07090f" }}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] font-extrabold leading-tight tracking-[-0.02em] text-slate-100">
              {t.work.h2a} <span className="gradient-text">{t.work.h2b}</span>
            </h2>
            <RouterLink to={href("/")+"#work"} className="shrink-0 text-[13.5px] font-semibold text-slate-400 transition-colors hover:text-slate-100">
              {t.work.caseStudy.back} →
            </RouterLink>
          </div>
          <CardsGrid projects={featured} />
        </div>
      </section>
      <Reviews />
      <Process />
    </main>
  );
}
