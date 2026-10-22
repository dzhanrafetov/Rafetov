import type { Lang } from "../types";

/** Текстовете на глава 03 „Отзиви“. Имената на езиците и „{n} отзива в Google“ се взимат от общия речник (t.reviews). */
export type ReviewsCopy = {
  chapter: string;
  title: string;
  sub: string;
  /** Линк към страницата на проекта на клиента, ако има такава. */
  viewProject: string;
  /** Малък етикет над показания превод. */
  translated: string;
  /** Малък етикет, когато се показва оригиналът. {lang} е името на езика. */
  originalIn: string;
  /** Връща към превода, когато се чете оригиналът. */
  showTranslation: string;
  /** aria за точките и брояча: {i} и {n} се заменят. */
  reviewOf: string;
  /** aria за стената с останалите отзиви. */
  wall: string;
  /** Единственият линк навън от главата. */
  viewAll: string;
};

export const reviewsCopy: Record<Lang, ReviewsCopy> = {
  bg: {
    chapter: "Отзиви",
    title: "Какво казват клиентите",
    sub: "Всички отзиви са от Google, дословно. Написаните на друг език показваме преведени — оригиналът е на един клик.",
    viewProject: "Вижте проекта",
    translated: "Превод",
    originalIn: "оригинал на {lang}",
    showTranslation: "покажи превода",
    reviewOf: "Отзив {i} от {n}",
    wall: "Още отзиви — изберете един, за да го прочетете",
    viewAll: "Вижте всички отзиви в Google",
  },
  en: {
    chapter: "Reviews",
    title: "What clients say",
    sub: "Every review is from Google, word for word. Reviews written in another language are shown translated — the original is one click away.",
    viewProject: "See the project",
    translated: "Translation",
    originalIn: "original in {lang}",
    showTranslation: "show translation",
    reviewOf: "Review {i} of {n}",
    wall: "More reviews — pick one to read it",
    viewAll: "See all reviews on Google",
  },
  de: {
    chapter: "Bewertungen",
    title: "Was Kunden sagen",
    sub: "Alle Bewertungen stammen wörtlich von Google. In einer anderen Sprache verfasste zeigen wir übersetzt – das Original ist einen Klick entfernt.",
    viewProject: "Projekt ansehen",
    translated: "Übersetzung",
    originalIn: "Original auf {lang}",
    showTranslation: "Übersetzung anzeigen",
    reviewOf: "Bewertung {i} von {n}",
    wall: "Weitere Bewertungen – zum Lesen eine auswählen",
    viewAll: "Alle Bewertungen bei Google ansehen",
  },
  nl: {
    chapter: "Beoordelingen",
    title: "Wat klanten zeggen",
    sub: "Alle beoordelingen komen woordelijk van Google. Beoordelingen in een andere taal tonen we vertaald – het origineel is één klik verwijderd.",
    viewProject: "Bekijk het project",
    translated: "Vertaling",
    originalIn: "origineel in het {lang}",
    showTranslation: "vertaling tonen",
    reviewOf: "Beoordeling {i} van {n}",
    wall: "Meer beoordelingen – kies er een om te lezen",
    viewAll: "Alle beoordelingen op Google bekijken",
  },
};
