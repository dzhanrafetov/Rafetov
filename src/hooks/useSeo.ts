import { useContext, useEffect, useMemo } from "react";
import { useLang, type Alternates } from "../i18n";
import { buildHead, SeoCollectorContext, type HeadData } from "../seo/head";

export { SITE_ORIGIN } from "../seo/head";

type SeoOptions = {
  title: string;
  description: string;
  /** Път БЕЗ езиков префикс, напр. "/" или "/privacy". Езикът се взима от контекста. */
  path: string;
  /** Пътища без префикс за другите езици, когато се различават (статии със свои slug-ове). */
  alternates?: Alternates;
  image?: string;
  ogType?: "website" | "article";
  jsonLd?: object | object[];
};

const MANAGED = "data-seo";

function applyHead(h: HeadData) {
  document.documentElement.lang = h.lang;
  document.title = h.title;

  for (const m of h.metas) {
    const sel = `meta[${m.attr}="${m.key}"]`;
    let el = document.head.querySelector<HTMLMetaElement>(sel);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(m.attr, m.key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  }

  // Управляваните link/script тагове се пресъздават изцяло при всяка смяна на страница.
  document.head.querySelectorAll(`[${MANAGED}]`).forEach((el) => el.remove());
  // Статичните тагове от index.html (canonical/alternate от prerender) също не трябва да остават.
  document.head.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang], script[type="application/ld+json"]').forEach((el) => el.remove());

  for (const l of h.links) {
    const el = document.createElement("link");
    el.rel = l.rel;
    if (l.hreflang) el.hreflang = l.hreflang;
    el.href = l.href;
    el.setAttribute(MANAGED, "");
    document.head.appendChild(el);
  }
  for (const j of h.jsonLd) {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify(j);
    el.setAttribute(MANAGED, "");
    document.head.appendChild(el);
  }
}

/**
 * Задава title, description, canonical, hreflang, Open Graph и JSON-LD за текущата страница.
 * При server render записва същите данни в SeoCollectorContext, за да влязат в статичния HTML.
 */
export function useSeo(opts: SeoOptions) {
  const { lang, setAlternates } = useLang();
  const collector = useContext(SeoCollectorContext);

  const altKey = JSON.stringify(opts.alternates ?? {});
  const jsonKey = JSON.stringify(opts.jsonLd ?? null);

  const head = useMemo(
    () => buildHead({ ...opts, lang }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, opts.title, opts.description, opts.path, opts.image, opts.ogType, altKey, jsonKey],
  );

  if (collector) collector.current = head;

  useEffect(() => {
    applyHead(head);
  }, [head]);

  useEffect(() => {
    setAlternates(opts.alternates ?? {});
    return () => setAlternates({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [altKey, setAlternates]);
}
