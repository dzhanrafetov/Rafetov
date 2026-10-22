import type { Lang } from "../types";

/**
 * Копие за глави 04 „Как работим“ и 05 „Въпроси“ (src/pages/Portfolio.tsx).
 * Самите въпроси и отговори остават в t.process.faq — AppShell строи FAQPage JSON-LD от тях.
 * Само реални факти: „фиксирана оферта до 24 часа“ и „отговаряме до 24 часа“ са верни; без срокове за изработка.
 */
export type ProcessCopy = {
  label: string;
  h2a: string;
  h2b: string;
  /** Четирите стъпки — заглавие и най-много две кратки изречения. */
  steps: { title: string; text: string }[];
  /** Тих линк под списъка на десктоп. */
  startLink: string;
  /** Текст във визуализациите вдясно. */
  chat: { name: string; status: string; inbound: string; reply: string; placeholder: string };
  offer: { title: string; stamp: string; scope: string; scopeValue: string; term: string; termValue: string; steps: string; stepsValue: string[]; price: string; priceValue: string };
  build: { badge: string; site: string; shot: string };
  live: { badge: string; google: string; title: string; caption: string };
  faq: {
    label: string;
    h2: string;
    sub: string;
    cardTitle: string;
    cardText: string;
    reply: string;
    whatsapp: string;
    viber: string;
    call: string;
    brief: string;
  };
};

export const PROCESS: Record<Lang, ProcessCopy> = {
  bg: {
    label: "Как работим",
    h2a: "От съобщението до сайт на живо —",
    h2b: "в четири стъпки.",
    steps: [
      { title: "Разкажете ни", text: "Едно съобщение в WhatsApp, Viber или през формата. Не е нужно да знаете какво точно искате." },
      { title: "План и фиксирана оферта", text: "След безплатен разговор получавате писмена оферта до 24 часа: обхват, срок и стъпки. Започваме след одобрение." },
      { title: "Изработка", text: "Дизайн, съдържание и настройки. Виждате сайта преди пускане и казвате какво да променим." },
      { title: "Пускане и поддръжка", text: "Пускаме сайта на живо и ви показваме как се ползва. Оставаме на разположение и след това." },
    ],
    startLink: "Започнете с едно съобщение",
    chat: {
      name: "rafetov.com",
      status: "отговаряме до 24 часа",
      inbound: "Здравейте, имаме месарница в Пловдив и искаме онлайн магазин с доставка.",
      reply: "Здравейте! Кога ви е удобно за кратък разговор? Безплатен е и без ангажимент.",
      placeholder: "Напишете съобщение…",
    },
    offer: {
      title: "Оферта",
      stamp: "до 24 часа",
      scope: "Обхват",
      scopeValue: "Онлайн магазин на български",
      term: "Срок",
      termValue: "записан и спазен",
      steps: "Стъпки",
      stepsValue: ["Дизайн", "Съдържание", "Пускане"],
      price: "Цена",
      priceValue: "фиксирана, без изненади",
    },
    build: { badge: "Преглед преди пускане", site: "vulcho.bg", shot: "/work/live/vulcho.webp?v=3" },
    live: { badge: "Сайтът е онлайн", google: "Google", title: "Вълчо", caption: "онлайн магазин за месо · България" },
    faq: {
      label: "Въпроси",
      h2: "Най-честите въпроси",
      sub: "Кратки и честни отговори. Ако нещо липсва — пишете ни.",
      cardTitle: "Не намерихте отговор?",
      cardText: "Пишете ни директно — отговаряме на български, английски, немски и нидерландски.",
      reply: "Отговаряме до 24 часа",
      whatsapp: "Пишете ни в WhatsApp",
      viber: "Viber",
      call: "Обадете се",
      brief: "или попълнете кратката заявка",
    },
  },
  en: {
    label: "How we work",
    h2a: "From your message to a live site —",
    h2b: "in four steps.",
    steps: [
      { title: "Tell us", text: "One message on WhatsApp, Viber or through the form. You don't need to know exactly what you want yet." },
      { title: "Plan and fixed quote", text: "After a free call you get a written quote within 24 hours: scope, deadline and steps. We start once you approve." },
      { title: "Build", text: "Design, content and setup. You see the site before launch and tell us what to change." },
      { title: "Launch and support", text: "We put the site live and show you how to use it. We stay available afterwards." },
    ],
    startLink: "Start with one message",
    chat: {
      name: "rafetov.com",
      status: "we reply within 24 hours",
      inbound: "Hi, I run a cleaning company in London and need a new website.",
      reply: "Hello! When would suit you for a short call? It's free and without obligation.",
      placeholder: "Write a message…",
    },
    offer: {
      title: "Quote",
      stamp: "within 24 h",
      scope: "Scope",
      scopeValue: "Website in English",
      term: "Deadline",
      termValue: "written down and kept",
      steps: "Steps",
      stepsValue: ["Design", "Content", "Launch"],
      price: "Price",
      priceValue: "fixed, no surprises",
    },
    build: { badge: "Preview before launch", site: "emiscleaning.co.uk", shot: "/work/live/emis-cleaning.webp?v=3" },
    live: { badge: "Site is live", google: "Google", title: "Emis Cleaning", caption: "London, UK · site in English" },
    faq: {
      label: "Questions",
      h2: "Frequently asked questions",
      sub: "Short, honest answers. If something is missing, just write to us.",
      cardTitle: "Didn't find your answer?",
      cardText: "Write to us directly — we answer in English, Bulgarian, German and Dutch.",
      reply: "We reply within 24 hours",
      whatsapp: "Message us on WhatsApp",
      viber: "Viber",
      call: "Call us",
      brief: "or fill in the short brief",
    },
  },
  de: {
    label: "So arbeiten wir",
    h2a: "Von Ihrer Nachricht zur fertigen Website —",
    h2b: "in vier Schritten.",
    steps: [
      { title: "Erzählen Sie uns", text: "Eine Nachricht per WhatsApp, Viber oder über das Formular. Sie müssen noch nicht genau wissen, was Sie brauchen." },
      { title: "Plan und Festpreis-Angebot", text: "Nach einem kostenlosen Gespräch erhalten Sie innerhalb von 24 Stunden ein schriftliches Angebot: Umfang, Termin und Schritte. Wir starten nach Ihrer Freigabe." },
      { title: "Umsetzung", text: "Design, Inhalte und Einrichtung. Sie sehen die Website vor dem Start und sagen uns, was geändert werden soll." },
      { title: "Start und Betreuung", text: "Wir schalten die Website live und zeigen Ihnen, wie sie funktioniert. Danach bleiben wir erreichbar." },
    ],
    startLink: "Mit einer Nachricht beginnen",
    chat: {
      name: "rafetov.com",
      status: "Antwort innerhalb von 24 Stunden",
      inbound: "Hallo, ich habe eine Renovierungsfirma in Deutschland und brauche eine Website auf Deutsch.",
      reply: "Hallo! Wann passt Ihnen ein kurzes Gespräch? Es ist kostenlos und unverbindlich.",
      placeholder: "Nachricht schreiben…",
    },
    offer: {
      title: "Angebot",
      stamp: "innerhalb 24 h",
      scope: "Umfang",
      scopeValue: "Website auf Deutsch",
      term: "Termin",
      termValue: "schriftlich und eingehalten",
      steps: "Schritte",
      stepsValue: ["Design", "Inhalte", "Start"],
      price: "Preis",
      priceValue: "fest, ohne Überraschungen",
    },
    build: { badge: "Vorschau vor dem Start", site: "innenausbau-ahmedov.de", shot: "/work/live/innenausbau-ahmedov.webp?v=3" },
    live: { badge: "Website ist online", google: "Google", title: "Innenausbau Ahmedov", caption: "Hanau, Deutschland · Website auf Deutsch" },
    faq: {
      label: "Fragen",
      h2: "Häufige Fragen",
      sub: "Kurze, ehrliche Antworten. Fehlt etwas? Schreiben Sie uns einfach.",
      cardTitle: "Keine Antwort gefunden?",
      cardText: "Schreiben Sie uns direkt — wir antworten auf Deutsch, Englisch, Bulgarisch und Niederländisch.",
      reply: "Antwort innerhalb von 24 Stunden",
      whatsapp: "Per WhatsApp schreiben",
      viber: "Viber",
      call: "Anrufen",
      brief: "oder das kurze Briefing ausfüllen",
    },
  },
  nl: {
    label: "Zo werken we",
    h2a: "Van uw bericht tot een live website —",
    h2b: "in vier stappen.",
    steps: [
      { title: "Vertel het ons", text: "Eén bericht via WhatsApp, Viber of het formulier. U hoeft nog niet precies te weten wat u wilt." },
      { title: "Plan en vaste offerte", text: "Na een gratis gesprek krijgt u binnen 24 uur een schriftelijke offerte: omvang, termijn en stappen. We starten na uw goedkeuring." },
      { title: "Bouw", text: "Ontwerp, inhoud en instellingen. U ziet de site vóór de lancering en zegt wat we moeten aanpassen." },
      { title: "Lancering en ondersteuning", text: "We zetten de site live en tonen u hoe hij werkt. Daarna blijven we bereikbaar." },
    ],
    startLink: "Begin met één bericht",
    chat: {
      name: "rafetov.com",
      status: "antwoord binnen 24 uur",
      inbound: "Hallo, ik heb een schoonmaakbedrijf in Gent en heb een nieuwe website nodig.",
      reply: "Hallo! Wanneer past een kort gesprek? Het is gratis en vrijblijvend.",
      placeholder: "Schrijf een bericht…",
    },
    offer: {
      title: "Offerte",
      stamp: "binnen 24 u",
      scope: "Omvang",
      scopeValue: "Website in het Nederlands",
      term: "Termijn",
      termValue: "op papier en nagekomen",
      steps: "Stappen",
      stepsValue: ["Ontwerp", "Inhoud", "Lancering"],
      price: "Prijs",
      priceValue: "vast, zonder verrassingen",
    },
    build: { badge: "Preview vóór de lancering", site: "alphareiniging.be", shot: "/work/live/alpha-reiniging.webp?v=3" },
    live: { badge: "Site is live", google: "Google", title: "Alpha Reiniging", caption: "Gent, België · site in het Nederlands" },
    faq: {
      label: "Vragen",
      h2: "Veelgestelde vragen",
      sub: "Korte, eerlijke antwoorden. Mist er iets? Schrijf ons gerust.",
      cardTitle: "Geen antwoord gevonden?",
      cardText: "Schrijf ons rechtstreeks — we antwoorden in het Nederlands, Engels, Duits en Bulgaars.",
      reply: "We antwoorden binnen 24 uur",
      whatsapp: "Stuur ons een WhatsApp",
      viber: "Viber",
      call: "Bel ons",
      brief: "of vul de korte briefing in",
    },
  },
};
