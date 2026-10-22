import type { Lang } from "../i18n/types";

/** Едно място за юридическите данни, за да не се разминават между страниците и footer-а. */
export const BUSINESS = {
  brand: "Rafetov",
  domain: "rafetov.com",
  legalName: "Джан Рафетов",
  bulstat: "181648949",
  email: "business@rafetov.com",
  phone: "+359 897 758 062",
  phoneHref: "tel:+359897758062",
  registeredAddress: "гр. Попово, обл. Търговище",
  activityScope: "Услугите се предоставят дистанционно на територията на цялата страна.",
  updated: "6 септември 2026",
} as const;

export const ROUTES = {
  privacy: "/privacy",
  legal: "/legal",
} as const;

/** Google Business профилът. Рейтингът и броят се обновяват ръчно при нови отзиви. */
export const GOOGLE_REVIEWS = {
  rating: 5,
  count: 20,
  url: "https://www.google.com/search?kgmid=%2Fg%2F11zymcpw1b&q=Rafetov",
} as const;

/** Viber бизнес профилът — отваря чат в приложението; на десктоп води към viber.me. */
export const VIBER_HREF = "https://viber.me/359897758062";

/** Социални профили. TikTok се показва само когато адресът е попълнен. */
export const SOCIALS = {
  instagram: "https://www.instagram.com/rafetov.com_/",
  facebook: "https://www.facebook.com/profile.php?id=61565660383482",
  tiktok: "https://www.tiktok.com/@rafetov.com",
} as const;

/** Линк към WhatsApp с предварително написано съобщение. */
export function whatsappHref(text: string): string {
  return `https://wa.me/359897758062?text=${encodeURIComponent(text)}`;
}

export function googleReviewsUrl(lang: Lang): string {
  return `${GOOGLE_REVIEWS.url}&hl=${lang}`;
}
