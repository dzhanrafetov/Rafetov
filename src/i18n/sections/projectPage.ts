import type { Lang } from "../types";

/** Нови надписи на страницата на проект (src/pages/ProjectPage.tsx); останалите са в t.work.caseStudy. */
export type ProjectPageCopy = {
  projects: string;
  /** Етикет над записа: истинският сайт, не илюстрация. */
  recording: string;
  /** Подсказка под рамката. */
  hint: string;
  pause: string;
  play: string;
  /** „Направено с услугата“ + името ѝ. */
  service: string;
  cta: string;
  whatsapp: string;
  whatsappText: string;
  prev: string;
  next: string;
  task: string;
  built: string;
  admin: string;
  adminReal: string;
  adminDemo: string;
  more: string;
  zoom: string;
  prevTab: string;
  nextTab: string;
  close: string;
  /** Същият списък при проекти без панел: още неща на самия сайт. */
  moreSite: string;
  roles: string;
  /** Преди и след (само при смяна на стар сайт). */
  before: string;
  beforeOld: string;
  beforeNew: string;
  beforeOldList: string;
  beforeNewList: string;
};

export const projectPageCopy: Record<Lang, ProjectPageCopy> = {
  bg: {
    projects: "Проекти",
    recording: "Истинският сайт",
    hint: "Страницата се превърта сама. Бутонът горе вдясно я спира.",
    pause: "Спри превъртането",
    play: "Пусни превъртането",
    service: "Услуга",
    cta: "Искам подобен проект",
    whatsapp: "или пишете в WhatsApp",
    whatsappText: "Здравейте, видях проекта {title} и искам нещо подобно.",
    prev: "Предишен",
    next: "Следващ",
    task: "Задачата",
    built: "Какво направихме",
    admin: "Админ панелът",
    adminReal: "Истински панел · данните са скрити",
    adminDemo: "Демо данни",
    more: "Още в панела",
    zoom: "Цял екран",
    prevTab: "Предишен раздел",
    nextTab: "Следващ раздел",
    close: "Затвори",
    moreSite: "Още в проекта",
    roles: "Роли в платформата",
    before: "Старият сайт и новият",
    beforeOld: "Преди",
    beforeNew: "След",
    beforeOldList: "Какво не работеше",
    beforeNewList: "Какво има сега",
  },
  en: {
    projects: "Projects",
    recording: "The real site",
    hint: "The page scrolls by itself. The button at the top right stops it.",
    pause: "Pause scrolling",
    play: "Play scrolling",
    service: "Service",
    cta: "I want a similar project",
    whatsapp: "or message us on WhatsApp",
    whatsappText: "Hello, I saw the {title} project and would like something similar.",
    prev: "Previous",
    next: "Next",
    task: "The brief",
    built: "What we built",
    admin: "The admin panel",
    adminReal: "Real panel · data hidden",
    adminDemo: "Demo data",
    more: "Also in the panel",
    zoom: "Full screen",
    prevTab: "Previous section",
    nextTab: "Next section",
    close: "Close",
    moreSite: "Also in the project",
    roles: "Roles in the platform",
    before: "The old site and the new one",
    beforeOld: "Before",
    beforeNew: "After",
    beforeOldList: "What did not work",
    beforeNewList: "What is there now",
  },
  de: {
    projects: "Projekte",
    recording: "Die echte Webseite",
    hint: "Die Seite scrollt von selbst. Der Button oben rechts hält sie an.",
    pause: "Scrollen anhalten",
    play: "Scrollen starten",
    service: "Leistung",
    cta: "Ich möchte etwas Ähnliches",
    whatsapp: "oder schreiben Sie uns auf WhatsApp",
    whatsappText: "Hallo, ich habe das Projekt {title} gesehen und möchte etwas Ähnliches.",
    prev: "Vorheriges",
    next: "Nächstes",
    task: "Die Aufgabe",
    built: "Was wir gebaut haben",
    admin: "Das Admin-Panel",
    adminReal: "Echtes Panel · Daten verborgen",
    adminDemo: "Demodaten",
    more: "Außerdem im Panel",
    zoom: "Vollbild",
    prevTab: "Vorheriger Bereich",
    nextTab: "Nächster Bereich",
    close: "Schließen",
    moreSite: "Außerdem im Projekt",
    roles: "Rollen in der Plattform",
    before: "Die alte Website und die neue",
    beforeOld: "Vorher",
    beforeNew: "Nachher",
    beforeOldList: "Was nicht funktionierte",
    beforeNewList: "Was es jetzt gibt",
  },
  nl: {
    projects: "Projecten",
    recording: "De echte website",
    hint: "De pagina scrolt vanzelf. De knop rechtsboven zet hem stil.",
    pause: "Scrollen pauzeren",
    play: "Scrollen starten",
    service: "Dienst",
    cta: "Ik wil een gelijkaardig project",
    whatsapp: "of stuur ons een bericht op WhatsApp",
    whatsappText: "Hallo, ik zag het project {title} en wil iets gelijkaardigs.",
    prev: "Vorige",
    next: "Volgende",
    task: "De opdracht",
    built: "Wat we bouwden",
    admin: "Het beheerpaneel",
    adminReal: "Echt paneel · gegevens verborgen",
    adminDemo: "Demogegevens",
    more: "Ook in het paneel",
    zoom: "Volledig scherm",
    prevTab: "Vorige sectie",
    nextTab: "Volgende sectie",
    close: "Sluiten",
    moreSite: "Ook in het project",
    roles: "Rollen in het platform",
    before: "De oude website en de nieuwe",
    beforeOld: "Voor",
    beforeNew: "Na",
    beforeOldList: "Wat niet werkte",
    beforeNewList: "Wat er nu is",
  },
};
