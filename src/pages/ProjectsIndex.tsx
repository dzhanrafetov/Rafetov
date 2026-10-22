import { useLang, withLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { SITE_ORIGIN } from "../seo/head";
import { PROJECT_BASE, projectPath, projectsFor } from "../constants/projects";
import Gallery from "./OnlinePresenceCTA";

/** Всички проекти на отделен адрес (/proekti, /en/projects …): същата галерия, разгъната по подразбиране. */
export default function ProjectsIndex() {
  const { t, lang } = useLang();
  const path = PROJECT_BASE[lang];
  useSeo({
    title: t.work.indexTitle,
    description: t.work.indexDescription,
    path,
    alternates: { bg: PROJECT_BASE.bg, en: PROJECT_BASE.en, de: PROJECT_BASE.de, nl: PROJECT_BASE.nl },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: t.work.indexTitle,
      description: t.work.indexDescription,
      url: `${SITE_ORIGIN}${withLang(path, lang)}`,
      hasPart: projectsFor(lang).map((p) => ({ "@type": "CreativeWork", name: t.work.titles?.[p.id] ?? p.title, url: `${SITE_ORIGIN}${withLang(projectPath(p, lang), lang)}` })),
      inLanguage: lang,
    },
  });
  return (
    <main className="text-slate-200" style={{ backgroundColor: "#07090f" }}>
      <Gallery page />
    </main>
  );
}
