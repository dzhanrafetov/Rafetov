import type { Lang } from "../types";

/** Заглавия и бутони на страниците за отделна услуга (src/pages/ServicePage.tsx). */
export type ServicePageCopy = {
  services: string;
  cta: string;
  /** Вторичен линк под бутона в hero. */
  orWhatsapp: string;
  /** Готово съобщение за WhatsApp; {service} е името на услугата. */
  whatsappText: string;
  rating: string;
  example: string;
  cases: string;
  includes: string;
  forWhom: string;
  steps: string;
  projects: string;
  allProjects: string;
  faq: string;
  faqSub: string;
  cardTitle: string;
  cardText: string;
  viber: string;
  call: string;
  reply: string;
  others: string;
};

export const servicePageCopy: Record<Lang, ServicePageCopy> = {
  bg: {
    services: "Услуги",
    cta: "Опишете задачата",
    orWhatsapp: "или пишете в WhatsApp",
    whatsappText: "Здравейте, интересува ме: {service}",
    rating: "в Google · {n} отзива",
    example: "Илюстрация",
    cases: "Какво можем да направим за вас",
    includes: "Какво включва",
    forWhom: "За кого е",
    steps: "Как работим",
    projects: "Реални проекти",
    allProjects: "Всички проекти",
    faq: "Въпроси",
    faqSub: "Ако не намирате отговора тук, пишете ни. Отговаряме до 24 часа.",
    cardTitle: "Разкажете ни какво ви трябва",
    cardText: "Три кратки стъпки във формата или едно съобщение. Цената е фиксирана и я казваме след безплатен разговор.",
    viber: "Viber",
    call: "Обаждане",
    reply: "Отговаряме до 24 часа",
    others: "Други услуги",
  },
  en: {
    services: "Services",
    cta: "Describe the task",
    orWhatsapp: "or message us on WhatsApp",
    whatsappText: "Hello, I am interested in: {service}",
    rating: "on Google · {n} reviews",
    example: "Illustration",
    cases: "What we can do for you",
    includes: "What is included",
    forWhom: "Who it is for",
    steps: "How we work",
    projects: "Real projects",
    allProjects: "All projects",
    faq: "Questions",
    faqSub: "If you do not find the answer here, write to us. We reply within 24 hours.",
    cardTitle: "Tell us what you need",
    cardText: "Three short steps in the form or a single message. The price is fixed and we tell you after a free call.",
    viber: "Viber",
    call: "Call",
    reply: "We reply within 24 hours",
    others: "Other services",
  },
  de: {
    services: "Leistungen",
    cta: "Aufgabe beschreiben",
    orWhatsapp: "oder schreiben Sie uns auf WhatsApp",
    whatsappText: "Hallo, ich interessiere mich für: {service}",
    rating: "bei Google · {n} Bewertungen",
    example: "Illustration",
    cases: "Was wir für Sie tun können",
    includes: "Was enthalten ist",
    forWhom: "Für wen",
    steps: "So arbeiten wir",
    projects: "Echte Projekte",
    allProjects: "Alle Projekte",
    faq: "Fragen",
    faqSub: "Wenn Sie die Antwort hier nicht finden, schreiben Sie uns. Wir antworten innerhalb von 24 Stunden.",
    cardTitle: "Sagen Sie uns, was Sie brauchen",
    cardText: "Drei kurze Schritte im Formular oder eine einzige Nachricht. Der Preis ist fest, Sie erfahren ihn nach einem kostenlosen Gespräch.",
    viber: "Viber",
    call: "Anrufen",
    reply: "Antwort innerhalb von 24 Stunden",
    others: "Weitere Leistungen",
  },
  nl: {
    services: "Diensten",
    cta: "Beschrijf de opdracht",
    orWhatsapp: "of stuur ons een bericht op WhatsApp",
    whatsappText: "Hallo, ik heb interesse in: {service}",
    rating: "op Google · {n} reviews",
    example: "Illustratie",
    cases: "Wat we voor u kunnen doen",
    includes: "Wat inbegrepen is",
    forWhom: "Voor wie",
    steps: "Zo werken we",
    projects: "Echte projecten",
    allProjects: "Alle projecten",
    faq: "Vragen",
    faqSub: "Vindt u het antwoord hier niet, stuur ons dan een bericht. We antwoorden binnen 24 uur.",
    cardTitle: "Vertel ons wat u nodig heeft",
    cardText: "Drie korte stappen in het formulier of één bericht. De prijs ligt vast en u hoort die na een gratis gesprek.",
    viber: "Viber",
    call: "Bellen",
    reply: "Antwoord binnen 24 uur",
    others: "Andere diensten",
  },
};
