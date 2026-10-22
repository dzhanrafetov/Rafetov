import type { Lang } from "../types";

/**
 * Копието на първия екран (hero). Чатът вдясно е ПРИМЕРЕН разговор — примерът е с реален проект от
 * constants/projects.ts, затова нишата на клиентското съобщение следва проекта за съответния език.
 * Без обещания за срокове и време за отговор извън реалните: отговор до 24 часа, фиксирана оферта до 24 часа.
 */
export type HeroCopy = {
  /** Заглавие на три части: преди акцента, акцентната дума (в циан), след акцента. */
  h1: [string, string, string];
  sub: string;
  cta: string;
  quiet: string;
  /** „{r} в Google от {n} отзива“ — {r} и {n} се заменят. */
  proofGoogle: string;
  proofCountries: string;
  chat: {
    /** aria-label на целия панел. */
    aria: string;
    /** Малък надпис, че разговорът е примерен. */
    example: string;
    name: string;
    status: string;
    day1: string;
    day2: string;
    inMsg: string;
    outIntro: string;
    plan: [string, string, string];
    typing: string;
    live: string;
    /** id от constants/projects.ts и град/държава за надписа под снимката. */
    projectId: string;
    city: string;
    openProject: string;
  };
};

const hero: Record<Lang, HeroCopy> = {
  bg: {
    h1: ["Пишете ни едно съобщение. ", "Останалото", " е наша работа."],
    sub: "Сайтове, онлайн магазини, платформи, приложения и AI автоматизации за фирми в България и Европа — на вашия език, готови за Google.",
    cta: "Пишете ни в WhatsApp",
    quiet: "или вижте как работим",
    proofGoogle: "{r} в Google от {n} отзива",
    proofCountries: "клиенти в 6 държави",
    chat: {
      aria: "Примерен разговор: от първото съобщение до онлайн сайт",
      example: "примерен разговор",
      name: "RAFETOV.COM",
      status: "отговаряме до 24 часа",
      day1: "Понеделник",
      day2: "Когато сайтът е готов",
      inMsg: "Здравейте, правим ремонти и интериор в София. Искаме сайт, който да показва проектите ни и да носи запитвания.",
      outIntro: "Здравейте! Ето как ще стане:",
      plan: ["Безплатен разговор за услугите и клиентите ви", "Фиксирана оферта до 24 часа", "Сайт с портфолио и форма, готов за Google"],
      typing: "Пишем отговор",
      live: "Сайтът е онлайн",
      projectId: "creative-homes",
      city: "София, България",
      openProject: "Вижте проекта",
    },
  },
  en: {
    h1: ["Send us one message. ", "The rest", " is our job."],
    sub: "Websites, online shops, platforms, apps and AI automations for businesses in Bulgaria and Europe — in your language, ready for Google.",
    cta: "Message us on WhatsApp",
    quiet: "or see how we work",
    proofGoogle: "{r} on Google from {n} reviews",
    proofCountries: "clients in 6 countries",
    chat: {
      aria: "Example conversation: from the first message to a live website",
      example: "example conversation",
      name: "RAFETOV.COM",
      status: "we reply within 24 hours",
      day1: "Monday",
      day2: "When the site is ready",
      inMsg: "Hi, we run a cleaning company in London. We need a website where customers can find and book us.",
      outIntro: "Hello! Here is how it goes:",
      plan: ["A free call about your services and your area", "A fixed quote within 24 hours", "A site in English, ready for Google"],
      typing: "Typing a reply",
      live: "The site is live",
      projectId: "emis-cleaning",
      city: "London, United Kingdom",
      openProject: "View the project",
    },
  },
  de: {
    h1: ["Schreiben Sie uns eine Nachricht. ", "Den Rest", " erledigen wir."],
    sub: "Webseiten, Onlineshops, Plattformen, Apps und KI-Automatisierungen für Firmen in Bulgarien und Europa — in Ihrer Sprache, bereit für Google.",
    cta: "Schreiben Sie uns auf WhatsApp",
    quiet: "oder sehen Sie, wie wir arbeiten",
    proofGoogle: "{r} bei Google aus {n} Bewertungen",
    proofCountries: "Kunden in 6 Ländern",
    chat: {
      aria: "Beispielgespräch: von der ersten Nachricht bis zur fertigen Webseite",
      example: "Beispielgespräch",
      name: "RAFETOV.COM",
      status: "wir antworten innerhalb von 24 Stunden",
      day1: "Montag",
      day2: "Wenn die Webseite fertig ist",
      inMsg: "Hallo, wir machen Sanierung und Abdichtung in Duisburg. Wir brauchen eine Webseite, über die uns Kunden finden.",
      outIntro: "Hallo! So läuft es ab:",
      plan: ["Kostenloses Gespräch über Ihre Leistungen und Ihre Region", "Festes Angebot innerhalb von 24 Stunden", "Webseite auf Deutsch, bereit für Google"],
      typing: "Antwort wird geschrieben",
      live: "Die Webseite ist online",
      projectId: "nn-bau",
      city: "Duisburg, Deutschland",
      openProject: "Projekt ansehen",
    },
  },
  nl: {
    h1: ["Stuur ons één bericht. ", "De rest", " is ons werk."],
    sub: "Websites, webshops, platformen, apps en AI-automatisering voor bedrijven in België, Bulgarije en Europa — in uw taal, klaar voor Google.",
    cta: "Stuur ons een WhatsApp-bericht",
    quiet: "of bekijk hoe we werken",
    proofGoogle: "{r} op Google uit {n} beoordelingen",
    proofCountries: "klanten in 6 landen",
    chat: {
      aria: "Voorbeeldgesprek: van het eerste bericht tot een website die online staat",
      example: "voorbeeldgesprek",
      name: "RAFETOV.COM",
      status: "we antwoorden binnen 24 uur",
      day1: "Maandag",
      day2: "Wanneer de website klaar is",
      inMsg: "Hallo, wij reinigen ramen, daken en gevels in Gent. We hebben een website nodig waarmee klanten ons vinden.",
      outIntro: "Hallo! Zo gaat het in zijn werk:",
      plan: ["Een gratis gesprek over uw diensten en uw regio", "Een vaste offerte binnen 24 uur", "Een website in het Nederlands, klaar voor Google"],
      typing: "Antwoord wordt getypt",
      live: "De website staat online",
      projectId: "alpha-reiniging",
      city: "Gent, België",
      openProject: "Project bekijken",
    },
  },
};

export default hero;
