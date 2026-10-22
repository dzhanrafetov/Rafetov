import type { Lang, WorkTag } from "../types";

/**
 * Копие само за глава 02 „Проекти“ на началната страница (редизайн 2026-10).
 * Заглавието, описанията на проектите, типовете и бутонът „Покажи всички“ се взимат от t.work.*.
 */
export type ProjectsCopy = {
  /** Етикет на възела от пътя: „02 проекти“. */
  label: string;
  /** Чипове за филтър по тип (множествено число). */
  filters: Record<WorkTag, string>;
  /** Връзка към страницата на проекта. */
  view: string;
};

export const PROJECTS_COPY: Record<Lang, ProjectsCopy> = {
  bg: {
    label: "Проекти",
    filters: { site: "Сайтове", shop: "Магазини", platform: "Платформи", menu: "Менюта" },
    view: "Виж проекта",
  },
  en: {
    label: "Projects",
    filters: { site: "Websites", shop: "Online stores", platform: "Platforms", menu: "Menus" },
    view: "View project",
  },
  de: {
    label: "Projekte",
    filters: { site: "Webseiten", shop: "Onlineshops", platform: "Plattformen", menu: "Speisekarten" },
    view: "Projekt ansehen",
  },
  nl: {
    label: "Projecten",
    filters: { site: "Websites", shop: "Webshops", platform: "Platformen", menu: "Menukaarten" },
    view: "Project bekijken",
  },
};
