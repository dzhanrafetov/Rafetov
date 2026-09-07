import type { Lang } from "../i18n/types";

/** Блок съдържание. Текстът поддържа **удебелен** и [линк](/път) синтаксис. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "tip"; text: string };

export type PostTag = "site" | "shop" | "menu" | "general";

export type PostContent = {
  /** Латински slug, различен за всеки език (SEO). */
  slug: string;
  title: string;
  excerpt: string;
  imageAlt: string;
  body: Block[];
};

export type Post = {
  id: string;
  /** ISO дата YYYY-MM-DD */
  date: string;
  tag: PostTag;
  /** Път в /public, 1600×900 */
  image: string;
  /** Път в /public, 800×450 (за карти) */
  imageSmall: string;
  /** Автор/източник на снимката — Unsplash лиценз, без задължение за посочване. */
  imageCredit: string;
  content: Record<Lang, PostContent>;
};
