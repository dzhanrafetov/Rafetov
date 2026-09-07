import type { Lang } from "../i18n/types";
import type { Post, PostContent } from "./types";
import { countWords, readingMinutes } from "./inline";
import kolkoStruvaSait from "./posts/kolko-struva-sait";
import saitIliFacebook from "./posts/sait-ili-facebook";
import googleBusiness from "./posts/google-business-restorant";
import sedemGreshki from "./posts/7-greshki";
import lokalnoSeo from "./posts/lokalno-seo";
import kolkoVreme from "./posts/kolko-vreme";
import digitalnoMenu from "./posts/digitalno-menu-restorant";
import kakDaIzberete from "./posts/kak-da-izberete-firma";
import onlainMagazin from "./posts/onlain-magazin-dostavki";
import hosting from "./posts/hosting-zashto-bezplaten";

export type { Post, PostContent, Block, PostTag } from "./types";

/** Всички статии, най-новата първа. */
export const POSTS: Post[] = [
  kolkoStruvaSait,
  saitIliFacebook,
  googleBusiness,
  sedemGreshki,
  lokalnoSeo,
  kolkoVreme,
  digitalnoMenu,
  kakDaIzberete,
  onlainMagazin,
  hosting,
].sort((a, b) => (a.date < b.date ? 1 : -1));

export const BLOG_BASE = "/blog";

/** Път БЕЗ езиков префикс: "/blog/<slug за езика>". */
export function postPath(post: Post, lang: Lang): string {
  return `${BLOG_BASE}/${post.content[lang].slug}`;
}

/** Алтернативни пътища (без префикс) за всички езици — за hreflang и превключвателя. */
export function postAlternates(post: Post): Record<Lang, string> {
  return { bg: postPath(post, "bg"), en: postPath(post, "en"), de: postPath(post, "de") };
}

export function findPost(lang: Lang, slug: string): Post | undefined {
  return POSTS.find((p) => p.content[lang].slug === slug);
}

/** Ако slug-ът е от друг език, връща статията и езика ѝ — за redirect към правилния адрес. */
export function findPostAnyLang(slug: string): { post: Post; lang: Lang } | undefined {
  for (const post of POSTS) {
    for (const lang of ["bg", "en", "de"] as Lang[]) {
      if (post.content[lang].slug === slug) return { post, lang };
    }
  }
  return undefined;
}

export function postWords(content: PostContent): number {
  return content.body.reduce((n, b) => {
    if (b.type === "ul" || b.type === "ol") return n + b.items.reduce((m, t) => m + countWords(t), 0);
    return n + countWords(b.text);
  }, 0);
}

export function postReadingMinutes(content: PostContent): number {
  return readingMinutes(postWords(content));
}

export function formatDate(iso: string, lang: Lang): string {
  const locale = lang === "bg" ? "bg-BG" : lang === "de" ? "de-DE" : "en-GB";
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}
