import type { Lang } from "../types";
import type { ServiceKey } from "./services";

/**
 * Глава 02 „Безплатни инструменти“ на началната страница (src/pages/Tools.tsx): две карти —
 * проверка на сайт с поле за адрес и планер на проект с първия му въпрос като чипове.
 * Имената на услугите в чиповете идват от servicesCopy; тук са само текстовете на главата.
 */
export type ToolsCopy = {
  mark: string;
  title: string;
  sub: string;
  check: {
    title: string;
    text: string;
    urlLabel: string;
    urlPlaceholder: string;
    button: string;
    /** „Безплатно · около минута · без регистрация“ */
    note: string;
  };
  planner: {
    title: string;
    text: string;
    /** Чипът „Друго“ — води към планера без избрана услуга. */
    other: string;
    /** Тих линк под чиповете. */
    link: string;
  };
};

/** Най-често търсените услуги, по ред на чиповете. */
export const TOOLS_SERVICES: ServiceKey[] = ["sites", "shop", "booking", "mobile", "ai", "platform"];

export const toolsCopy: Record<Lang, ToolsCopy> = {
  bg: {
    mark: "Безплатни инструменти",
    title: "Не знаете откъде да започнете?",
    sub: "Проверете сегашния си сайт или направете план за нов проект. Отнема минута и не изисква регистрация.",
    check: {
      title: "Проверете сайта си",
      text: "Вижте какво му пречи да носи запитвания: как го вижда Google, как се отваря на телефон и лесно ли е да ви потърсят.",
      urlLabel: "Адрес на сайта",
      urlPlaceholder: "вашият-сайт.bg",
      button: "Провери",
      note: "Безплатно · около минута · без регистрация",
    },
    planner: {
      title: "Планирайте нов проект",
      text: "Какво ви трябва? Изберете и след четири кратки въпроса получавате план с функции, обхват и срок.",
      other: "Друго",
      link: "Или започнете планера от началото",
    },
  },
  en: {
    mark: "Free tools",
    title: "Not sure where to start?",
    sub: "Check your current website or plan a new project. It takes a minute and needs no sign-up.",
    check: {
      title: "Check your website",
      text: "See what stops it from bringing enquiries: how Google sees it, how it opens on a phone and how easy it is to reach you.",
      urlLabel: "Website address",
      urlPlaceholder: "your-site.com",
      button: "Check",
      note: "Free · about a minute · no sign-up",
    },
    planner: {
      title: "Plan a new project",
      text: "What do you need? Pick one and after four short questions you get a plan with features, scope and timeline.",
      other: "Something else",
      link: "Or start the planner from the beginning",
    },
  },
  de: {
    mark: "Kostenlose Werkzeuge",
    title: "Nicht sicher, wo Sie anfangen sollen?",
    sub: "Prüfen Sie Ihre aktuelle Webseite oder planen Sie ein neues Projekt. Dauert eine Minute, ohne Registrierung.",
    check: {
      title: "Webseite prüfen",
      text: "Sehen Sie, was sie daran hindert, Anfragen zu bringen: wie Google sie sieht, wie sie auf dem Handy öffnet und wie leicht man Sie erreicht.",
      urlLabel: "Adresse der Webseite",
      urlPlaceholder: "ihre-webseite.de",
      button: "Prüfen",
      note: "Kostenlos · etwa eine Minute · ohne Registrierung",
    },
    planner: {
      title: "Neues Projekt planen",
      text: "Was brauchen Sie? Wählen Sie aus und nach vier kurzen Fragen erhalten Sie einen Plan mit Funktionen, Umfang und Zeitrahmen.",
      other: "Etwas anderes",
      link: "Oder den Planer von vorne beginnen",
    },
  },
  nl: {
    mark: "Gratis tools",
    title: "Weet u niet waar te beginnen?",
    sub: "Controleer uw huidige website of plan een nieuw project. Het duurt een minuut en vraagt geen registratie.",
    check: {
      title: "Controleer uw website",
      text: "Zie wat verhindert dat hij aanvragen oplevert: hoe Google hem ziet, hoe hij op een telefoon opent en hoe makkelijk u te bereiken bent.",
      urlLabel: "Adres van de website",
      urlPlaceholder: "uw-website.be",
      button: "Controleren",
      note: "Gratis · ongeveer een minuut · zonder registratie",
    },
    planner: {
      title: "Plan een nieuw project",
      text: "Wat heeft u nodig? Kies en na vier korte vragen krijgt u een plan met functies, omvang en planning.",
      other: "Iets anders",
      link: "Of begin de planner vanaf het begin",
    },
  },
};
