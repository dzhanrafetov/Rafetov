import type { Lang } from "../types";
import type { ServiceKey } from "./services";
import type { ReplyKey } from "./contact";

/**
 * Планер на проект (/planer): пет кратки въпроса → написан план, който човекът праща с един тап.
 * Имената на услугите идват от servicesCopy; тук са въпросите, функциите, обхватът и текстовете на плана.
 * Без цени и без обещания за месечна поддръжка (политика: 30 дни дребни промени безплатно, после по заявка).
 */
export type GoalKey = "leads" | "sell" | "time" | "image" | "replace";
export const GOAL_KEYS: GoalKey[] = ["leads", "sell", "time", "image", "replace"];
export type StateKey = "none" | "old" | "ready" | "help";
export const STATE_KEYS: StateKey[] = ["none", "old", "ready", "help"];
export type WhenKey = "asap" | "month" | "exploring";
export const WHEN_KEYS: WhenKey[] = ["asap", "month", "exploring"];
export type TimelineKey = "short" | "shop" | "large" | "call";

/** Услугите в стъпка 1, по ред. */
export const PLANNER_SERVICES: ServiceKey[] = ["sites", "shop", "menu", "booking", "platform", "mobile", "desktop", "ai", "ads", "seo", "care"];

/** Функциите за избор в стъпка 3 според услугата. Текстовете са в `features` на всеки език. */
export const FEATURES: Record<ServiceKey, string[]> = {
  sites: ["multilingual", "blog", "gallery", "booking_form", "admin", "map_reviews"],
  shop: ["payments", "couriers", "import", "invoices", "promo", "multilingual", "admin"],
  menu: ["multilingual", "photos", "allergens", "qr", "ordering", "admin"],
  booking: ["calendar_sync", "reminders", "online_payment", "staff", "multilingual"],
  platform: ["roles", "requests", "documents", "reports", "invoicing", "notifications"],
  mobile: ["ios_android", "login", "push", "payments", "offline", "admin"],
  desktop: ["windows_mac", "offline", "printers", "invoices", "stock", "sync"],
  ai: ["chatbot", "autoreply", "doc_processing", "crm", "ai_booking", "summaries"],
  ads: ["google_search", "meta", "landing", "tracking", "remarketing"],
  seo: ["google_business", "local_pages", "reviews", "technical", "content"],
  care: ["fixes", "speed", "integrations", "migration", "content_updates", "security"],
};

/** Срокът според услугата; за сайт става „large“ при много функции или нужда от текстове (виж Planner.tsx). */
export const TIMELINE: Record<ServiceKey, TimelineKey> = {
  sites: "short", menu: "short", booking: "short", shop: "shop",
  platform: "call", mobile: "call", desktop: "call", ai: "call", ads: "call", seo: "call", care: "call",
};

export type PlannerCopy = {
  nav: string;
  /** Тих линк от формата и страниците на услугите: „Не сте сигурни какво ви трябва? Направете план за 1 минута“. */
  entry: { question: string; link: string };
  metaTitle: string;
  metaDescription: string;
  title: string;
  sub: string;
  /** „Стъпка {n} от {total}“ */
  stepOf: string;
  back: string;
  next: string;
  showPlan: string;
  steps: {
    service: { title: string; hint: string };
    goals: { title: string; hint: string; options: Record<GoalKey, string> };
    features: { title: string; hint: string; none: string };
    state: { title: string; options: Record<StateKey, string> };
    when: { title: string; options: Record<WhenKey, string> };
  };
  features: Record<string, string>;
  scope: Record<ServiceKey, string[]>;
  result: {
    title: string;
    build: string;
    buildText: Record<ServiceKey, string>;
    goalsLead: string;
    featuresTitle: string;
    noFeatures: string;
    scopeTitle: string;
    timelineTitle: string;
    timelines: Record<TimelineKey, string>;
    timelineNote: string;
    stateNote: Record<StateKey, string>;
    whenNote: Record<WhenKey, string>;
    nextTitle: string;
    nextSteps: string[];
    edit: string;
    restart: string;
  };
  form: {
    title: string;
    text: string;
    name: string;
    namePlaceholder: string;
    nameError: string;
    contact: string;
    contactPlaceholder: string;
    contactError: string;
    channel: string;
    channels: Record<ReplyKey, string>;
    submit: string;
    sending: string;
    whatsapp: string;
    success: { title: string; text: string; again: string };
    failed: { title: string; text: string };
  };
  /** Етикети за текста на плана (съобщение към нас и WhatsApp). */
  labels: { plan: string; service: string; goals: string; features: string; scope: string; timeline: string; state: string; when: string; reply: string; name: string; contact: string };
  waIntro: string;
};

export const plannerCopy: Record<Lang, PlannerCopy> = {
  bg: {
    entry: { question: "Не сте сигурни какво ви трябва?", link: "Направете план за 1 минута" },
    nav: "Планер на проект",
    metaTitle: "Планер на проект: план за сайт, магазин или приложение за 1 минута | Rafetov.com",
    metaDescription: "Отговорете на пет кратки въпроса и получете написан план: какво ще изградим, функции, обхват, реалистичен срок и какво следва. Изпращате го с един тап.",
    title: "Направете план за проекта\u00a0си за една минута",
    sub: "Пет кратки въпроса. Накрая получавате написан план с функции, обхват и срок, който пращате с един тап. Без ангажимент.",
    stepOf: "Стъпка {n} от {total}",
    back: "Назад",
    next: "Напред",
    showPlan: "Покажи плана",
    steps: {
      service: { title: "Какво ви трябва?", hint: "Изберете едно. Ако са няколко, започнете с най-важното." },
      goals: { title: "Каква е целта?", hint: "Може да изберете повече от едно.", options: { leads: "Повече запитвания и обаждания", sell: "Да продавам онлайн", time: "Да спестя време на екипа", image: "Да изглеждам по-професионално", replace: "Да сменя стар сайт или система" } },
      features: { title: "Какво да включва?", hint: "Отбележете каквото ви трябва. Останалото уточняваме в разговора.", none: "Засега нищо от това" },
      state: { title: "Къде сте в момента?", options: { none: "Нямам сайт", old: "Имам сайт, който искам да сменя", ready: "Имам готови текстове и лого", help: "Трябва ми помощ с текстове и снимки" } },
      when: { title: "Кога искате да стартираме?", options: { asap: "Възможно най-скоро", month: "До месец", exploring: "Само проучвам" } },
    },
    features: {
      multilingual: "Няколко езика", blog: "Блог или новини", gallery: "Галерия или проекти", booking_form: "Форма за записване на час", admin: "Админ панел, за да променяте съдържанието сами", map_reviews: "Карта и отзиви от Google",
      payments: "Плащане с карта и наложен платеж", couriers: "Доставка с Еконт и Спиди", import: "Импорт на продукти от файл", invoices: "Фактури", promo: "Промокодове и отстъпки",
      photos: "Снимки към ястията", allergens: "Алергени", qr: "QR кодове за масите", ordering: "Поръчка от масата или за доставка",
      calendar_sync: "Синхронизация с Google Calendar", reminders: "Напомняния по имейл или SMS", online_payment: "Плащане при записване", staff: "Няколко служители или помещения",
      roles: "Роли и права за различни потребители", requests: "Заявки, задачи и графици", documents: "Документи и файлове", reports: "Отчети и справки", invoicing: "Връзка с фактурирането", notifications: "Известия по имейл",
      ios_android: "iOS и Android", login: "Вход с телефон или имейл", push: "Push известия", offline: "Работа без интернет",
      windows_mac: "Windows и macOS", printers: "Връзка с принтери и устройства", stock: "Склад и наличности", sync: "Синхронизация между компютри",
      chatbot: "Чатбот на сайта", autoreply: "Автоматични отговори на имейли и запитвания", doc_processing: "Обработка на документи", crm: "Връзка с CRM или таблици", ai_booking: "Записване на час през чата", summaries: "Обобщения и отчети",
      google_search: "Google реклама в търсенето", meta: "Facebook и Instagram реклама", landing: "Целева страница за рекламата", tracking: "Проследяване на запитванията", remarketing: "Ремаркетинг",
      google_business: "Google бизнес профил", local_pages: "Страници за град и услуга", reviews: "Повече отзиви в Google", technical: "Техническа настройка на сайта", content: "Текстове за услугите",
      fixes: "Поправки на съществуващ сайт", speed: "По-бързо зареждане", integrations: "Връзка с външни системи", migration: "Преместване на друг хостинг", content_updates: "Смяна на текстове и снимки", security: "HTTPS и сигурност",
    },
    scope: {
      sites: ["Начална страница с ясно послание", "Страница за всяка услуга", "За нас", "Проекти или галерия", "Контакти с форма, телефон и карта"],
      shop: ["Начало с акценти и промоции", "Категории и страници на продуктите", "Кошница и поръчка в три стъпки", "Админ панел за поръчки и наличности", "Общи условия и доставка"],
      menu: ["Категории и ястия със снимки", "Езикови версии", "QR кодове за маси и витрина", "Панел за промяна на цени от телефона"],
      booking: ["Страница за записване с календар", "Потвърждение и напомняне", "Панел с графика ви", "Страница за услугите и цените ви"],
      platform: ["Вход и профили по роли", "Основните работни процеси", "Документи и справки", "Админ панел", "Връзка със сайта и имейла"],
      mobile: ["Приложение за iOS и Android от един код", "Вход и профил", "Основните екрани", "Админ панел за съдържанието", "Публикуване в App Store и Google Play"],
      desktop: ["Програма за Windows и macOS", "Основните работни екрани", "Данни на компютъра и синхронизация", "Връзка с устройства", "Инсталация и обучение"],
      ai: ["Кратък анализ на процеса ви", "Автоматизация на избраните стъпки", "Връзка с каналите ви: сайт, имейл, WhatsApp", "Тестове с реални запитвания", "Обучение на екипа"],
      ads: ["Проверка на сайта преди рекламата", "Кампании по услуга и град", "Целева страница при нужда", "Проследяване на запитванията", "Отчет на прост език"],
      seo: ["Проверка на сайта и Google профила", "Заглавия и описания за услугите и града", "Страници за услуга и град", "Техническа настройка", "План за отзиви"],
      care: ["Преглед на сегашния сайт", "Списък с поправки и промени", "Изпълнение по приоритет", "Проверка след промените"],
    },
    result: {
      title: "Вашият план",
      build: "Какво ще изградим",
      buildText: {
        sites: "Фирмен сайт, направен за вашия бизнес, бърз на телефон и готов за Google.",
        shop: "Онлайн магазин с продукти, кошница, плащания и доставки, който управлявате сами.",
        menu: "Дигитално меню с QR код, което сменяте от телефона за минута.",
        booking: "Онлайн записване на часове с потвърждение и график, без телефонни обаждания.",
        platform: "Вътрешна система или платформа, направена за начина, по който работите.",
        mobile: "Мобилно приложение за iOS и Android, публикувано в магазините.",
        desktop: "Десктоп програма за офиса или производството, която работи и без интернет.",
        ai: "AI автоматизация, която поема повтарящата се работа със запитвания и документи.",
        ads: "Реклама в Google и Meta, насочена към хората, които търсят вашата услуга.",
        seo: "Локално SEO, за да излизате в Google за услугата и града ви.",
        care: "Поправки, подобрения и интеграции на сегашния ви сайт.",
      },
      goalsLead: "Цел",
      featuresTitle: "Функции",
      noFeatures: "Без допълнителни функции засега. Уточняваме в разговора.",
      scopeTitle: "Предложен обхват",
      timelineTitle: "Реалистичен срок",
      timelines: { short: "1–2 седмици", shop: "2–4 седмици", large: "3–5 седмици", call: "По оценка след разговора" },
      timelineNote: "от момента, в който имаме текстове и снимки",
      stateNote: {
        none: "Започваме от нула: структура, дизайн, текстове и пускане на живо на ваш домейн.",
        old: "Ще прегледаме сегашния сайт, ще запазим това, което работи, и ще пренесем адресите, за да не губите позиции в Google.",
        ready: "Имате готови материали: това съкращава срока и започваме с дизайна веднага.",
        help: "Ще помогнем с текстовете и снимките: разказвате ни за бизнеса по телефона, ние подреждаме останалото.",
      },
      whenNote: {
        asap: "Можем да започнем след първия разговор.",
        month: "Нормален старт: разговор тази седмица, оферта до няколко дни.",
        exploring: "Няма проблем. Планът остава ваш и можете да се върнете, когато решите.",
      },
      nextTitle: "Какво следва",
      nextSteps: [
        "Безплатен разговор по телефон или Google Meet, за да уточним детайлите.",
        "Фиксирана оферта с ясен обхват и срок.",
        "Изработка с преглед на всеки етап.",
        "Пускане на живо. Първите 30 дни дребни промени са безплатни, след това промени по заявка с цена, казана предварително.",
      ],
      edit: "Промяна на отговорите",
      restart: "Започни отначало",
    },
    form: {
      title: "Изпратете плана и ще ви отговорим до 24 часа",
      text: "Получаваме плана такъв, какъвто го виждате. Без ангажимент.",
      name: "Име",
      namePlaceholder: "Вашето име",
      nameError: "Напишете името си.",
      contact: "Телефон или имейл",
      contactPlaceholder: "+359 … или име@…",
      contactError: "Напишете телефон или имейл, за да ви отговорим.",
      channel: "Как да ви отговорим?",
      channels: { whatsapp: "WhatsApp", viber: "Viber", call: "Обаждане", email: "Имейл" },
      submit: "Изпрати плана",
      sending: "Изпращане…",
      whatsapp: "или изпратете в WhatsApp",
      success: { title: "Планът е при нас", text: "Ще ви отговорим до 24 часа по {channel} с първите въпроси и предложение за разговор.", again: "Нов план" },
      failed: { title: "Не успяхме да изпратим плана", text: "Опитайте отново или го изпратете през WhatsApp с бутона по-долу." },
    },
    labels: { plan: "План от rafetov.com", service: "Услуга", goals: "Цел", features: "Функции", scope: "Обхват", timeline: "Срок", state: "В момента", when: "Старт", reply: "Да отговорим", name: "Име", contact: "Контакт" },
    waIntro: "Здравейте, ето моя план от rafetov.com:",
  },

  en: {
    entry: { question: "Not sure what you need?", link: "Make a plan in 1 minute" },
    nav: "Project planner",
    metaTitle: "Project planner: a plan for your website, shop or app in 1 minute | Rafetov.com",
    metaDescription: "Answer five short questions and get a written plan: what we would build, features, scope, a realistic timeline and what happens next. Send it with one tap.",
    title: "Plan your project in one minute",
    sub: "Five short questions. At the end you get a written plan with features, scope and a timeline that you send with one tap. No commitment.",
    stepOf: "Step {n} of {total}",
    back: "Back",
    next: "Next",
    showPlan: "Show my plan",
    steps: {
      service: { title: "What do you need?", hint: "Pick one. If it is several things, start with the most important." },
      goals: { title: "What is the goal?", hint: "You can pick more than one.", options: { leads: "More enquiries and calls", sell: "Sell online", time: "Save the team time", image: "Look more professional", replace: "Replace an old website or system" } },
      features: { title: "What should it include?", hint: "Tick what you need. We clarify the rest on the call.", none: "None of these for now" },
      state: { title: "Where are you now?", options: { none: "I have no website", old: "I have a website I want to replace", ready: "I have texts and a logo ready", help: "I need help with texts and photos" } },
      when: { title: "When would you like to start?", options: { asap: "As soon as possible", month: "Within a month", exploring: "Just exploring" } },
    },
    features: {
      multilingual: "Several languages", blog: "Blog or news", gallery: "Gallery or projects", booking_form: "Appointment booking form", admin: "Admin panel to edit the content yourself", map_reviews: "Map and Google reviews",
      payments: "Card payments and cash on delivery", couriers: "Courier integrations", import: "Product import from a file", invoices: "Invoices", promo: "Promo codes and discounts",
      photos: "Photos next to the dishes", allergens: "Allergens", qr: "QR codes for the tables", ordering: "Ordering from the table or for delivery",
      calendar_sync: "Google Calendar sync", reminders: "Email or SMS reminders", online_payment: "Payment at booking", staff: "Several staff members or rooms",
      roles: "Roles and permissions for different users", requests: "Requests, tasks and schedules", documents: "Documents and files", reports: "Reports", invoicing: "Link to invoicing", notifications: "Email notifications",
      ios_android: "iOS and Android", login: "Login with phone or email", push: "Push notifications", offline: "Works without internet",
      windows_mac: "Windows and macOS", printers: "Printers and devices", stock: "Stock and inventory", sync: "Sync between computers",
      chatbot: "Chatbot on the website", autoreply: "Automatic replies to emails and enquiries", doc_processing: "Document processing", crm: "CRM or spreadsheet integration", ai_booking: "Booking appointments through the chat", summaries: "Summaries and reports",
      google_search: "Google Search ads", meta: "Facebook and Instagram ads", landing: "Landing page for the ads", tracking: "Enquiry tracking", remarketing: "Remarketing",
      google_business: "Google Business Profile", local_pages: "Pages per town and service", reviews: "More Google reviews", technical: "Technical setup of the site", content: "Texts for the services",
      fixes: "Fixes to an existing website", speed: "Faster loading", integrations: "Integration with external systems", migration: "Move to another hosting", content_updates: "Text and photo changes", security: "HTTPS and security",
    },
    scope: {
      sites: ["Home page with a clear message", "A page for each service", "About", "Projects or gallery", "Contact with form, phone and map"],
      shop: ["Home with highlights and promotions", "Categories and product pages", "Cart and three-step checkout", "Admin panel for orders and stock", "Terms and shipping"],
      menu: ["Categories and dishes with photos", "Language versions", "QR codes for tables and window", "Panel to change prices from your phone"],
      booking: ["Booking page with a calendar", "Confirmation and reminder", "Panel with your schedule", "Page for your services and prices"],
      platform: ["Login and profiles by role", "The main workflows", "Documents and reports", "Admin panel", "Link to the website and email"],
      mobile: ["iOS and Android app from one codebase", "Login and profile", "The main screens", "Admin panel for the content", "Publishing on the App Store and Google Play"],
      desktop: ["Program for Windows and macOS", "The main work screens", "Local data and sync", "Device integration", "Installation and training"],
      ai: ["Short analysis of your process", "Automation of the selected steps", "Connection to your channels: website, email, WhatsApp", "Tests with real enquiries", "Team training"],
      ads: ["Website check before the ads", "Campaigns per service and town", "Landing page if needed", "Enquiry tracking", "Plain-language report"],
      seo: ["Check of the website and Google profile", "Titles and descriptions for services and town", "Pages per service and town", "Technical setup", "Review plan"],
      care: ["Review of the current website", "List of fixes and changes", "Work by priority", "Check after the changes"],
    },
    result: {
      title: "Your plan",
      build: "What we would build",
      buildText: {
        sites: "A business website made for your company, fast on phones and ready for Google.",
        shop: "An online shop with products, cart, payments and shipping that you manage yourself.",
        menu: "A digital QR menu that you change from your phone in a minute.",
        booking: "Online appointment booking with confirmation and a schedule, without phone calls.",
        platform: "An internal system or platform built around the way you work.",
        mobile: "A mobile app for iOS and Android, published in the stores.",
        desktop: "A desktop program for the office or production that also works offline.",
        ai: "An AI automation that takes over repetitive work with enquiries and documents.",
        ads: "Google and Meta ads aimed at people searching for your service.",
        seo: "Local SEO so you show up on Google for your service and your town.",
        care: "Fixes, improvements and integrations for your current website.",
      },
      goalsLead: "Goal",
      featuresTitle: "Features",
      noFeatures: "No extra features for now. We clarify on the call.",
      scopeTitle: "Suggested scope",
      timelineTitle: "Realistic timeline",
      timelines: { short: "1–2 weeks", shop: "2–4 weeks", large: "3–5 weeks", call: "Estimated after the call" },
      timelineNote: "from the moment we have texts and photos",
      stateNote: {
        none: "We start from zero: structure, design, texts and going live on your domain.",
        old: "We review the current site, keep what works and carry over the addresses so you keep your Google positions.",
        ready: "You have the materials ready: that shortens the timeline and we start with the design right away.",
        help: "We help with texts and photos: you tell us about the business on the phone, we organise the rest.",
      },
      whenNote: {
        asap: "We can start after the first call.",
        month: "A normal start: a call this week, a quote within a few days.",
        exploring: "No problem. The plan is yours and you can come back whenever you decide.",
      },
      nextTitle: "What happens next",
      nextSteps: [
        "A free call by phone or Google Meet to clarify the details.",
        "A fixed quote with a clear scope and deadline.",
        "The build, with a review at each stage.",
        "Launch. Small changes are free for the first 30 days; after that, changes on request with the price told in advance.",
      ],
      edit: "Change my answers",
      restart: "Start over",
    },
    form: {
      title: "Send the plan and we reply within 24 hours",
      text: "We receive the plan exactly as you see it. No commitment.",
      name: "Name",
      namePlaceholder: "Your name",
      nameError: "Please write your name.",
      contact: "Phone or email",
      contactPlaceholder: "+44 … or name@…",
      contactError: "Write a phone number or email so we can reply.",
      channel: "How should we reply?",
      channels: { whatsapp: "WhatsApp", viber: "Viber", call: "Call", email: "Email" },
      submit: "Send the plan",
      sending: "Sending…",
      whatsapp: "or send it on WhatsApp",
      success: { title: "We have your plan", text: "We reply within 24 hours via {channel} with the first questions and a suggestion for a call.", again: "New plan" },
      failed: { title: "We could not send the plan", text: "Try again or send it via WhatsApp with the button below." },
    },
    labels: { plan: "Plan from rafetov.com", service: "Service", goals: "Goal", features: "Features", scope: "Scope", timeline: "Timeline", state: "Current state", when: "Start", reply: "Reply via", name: "Name", contact: "Contact" },
    waIntro: "Hello, here is my plan from rafetov.com:",
  },

  de: {
    entry: { question: "Nicht sicher, was Sie brauchen?", link: "Plan in 1 Minute erstellen" },
    nav: "Projektplaner",
    metaTitle: "Projektplaner: Plan für Webseite, Shop oder App in 1 Minute | Rafetov.com",
    metaDescription: "Beantworten Sie fünf kurze Fragen und erhalten Sie einen schriftlichen Plan: was wir bauen würden, Funktionen, Umfang, realistischer Zeitrahmen und die nächsten Schritte. Mit einem Tipp gesendet.",
    title: "Planen Sie Ihr Projekt in einer Minute",
    sub: "Fünf kurze Fragen. Am Ende erhalten Sie einen schriftlichen Plan mit Funktionen, Umfang und Zeitrahmen, den Sie mit einem Tipp senden. Unverbindlich.",
    stepOf: "Schritt {n} von {total}",
    back: "Zurück",
    next: "Weiter",
    showPlan: "Plan anzeigen",
    steps: {
      service: { title: "Was brauchen Sie?", hint: "Wählen Sie eins. Bei mehreren beginnen Sie mit dem Wichtigsten." },
      goals: { title: "Was ist das Ziel?", hint: "Mehrere Antworten möglich.", options: { leads: "Mehr Anfragen und Anrufe", sell: "Online verkaufen", time: "Dem Team Zeit sparen", image: "Professioneller wirken", replace: "Alte Webseite oder System ersetzen" } },
      features: { title: "Was soll enthalten sein?", hint: "Markieren Sie, was Sie brauchen. Den Rest klären wir im Gespräch.", none: "Vorerst nichts davon" },
      state: { title: "Wo stehen Sie gerade?", options: { none: "Ich habe keine Webseite", old: "Ich habe eine Webseite, die ich ersetzen will", ready: "Texte und Logo sind fertig", help: "Ich brauche Hilfe bei Texten und Fotos" } },
      when: { title: "Wann möchten Sie starten?", options: { asap: "So bald wie möglich", month: "Innerhalb eines Monats", exploring: "Ich informiere mich nur" } },
    },
    features: {
      multilingual: "Mehrere Sprachen", blog: "Blog oder Neuigkeiten", gallery: "Galerie oder Projekte", booking_form: "Formular zur Terminbuchung", admin: "Admin-Bereich, um Inhalte selbst zu ändern", map_reviews: "Karte und Google-Bewertungen",
      payments: "Kartenzahlung und Nachnahme", couriers: "Anbindung an Paketdienste", import: "Produktimport aus einer Datei", invoices: "Rechnungen", promo: "Gutscheincodes und Rabatte",
      photos: "Fotos zu den Gerichten", allergens: "Allergene", qr: "QR-Codes für die Tische", ordering: "Bestellung vom Tisch oder zur Lieferung",
      calendar_sync: "Google-Kalender-Synchronisation", reminders: "Erinnerungen per E-Mail oder SMS", online_payment: "Zahlung bei der Buchung", staff: "Mehrere Mitarbeiter oder Räume",
      roles: "Rollen und Rechte für verschiedene Nutzer", requests: "Anfragen, Aufgaben und Pläne", documents: "Dokumente und Dateien", reports: "Berichte und Auswertungen", invoicing: "Anbindung an die Rechnungsstellung", notifications: "Benachrichtigungen per E-Mail",
      ios_android: "iOS und Android", login: "Anmeldung mit Telefon oder E-Mail", push: "Push-Benachrichtigungen", offline: "Funktioniert ohne Internet",
      windows_mac: "Windows und macOS", printers: "Drucker und Geräte", stock: "Lager und Bestände", sync: "Synchronisation zwischen Computern",
      chatbot: "Chatbot auf der Webseite", autoreply: "Automatische Antworten auf E-Mails und Anfragen", doc_processing: "Dokumentenverarbeitung", crm: "Anbindung an CRM oder Tabellen", ai_booking: "Terminbuchung über den Chat", summaries: "Zusammenfassungen und Berichte",
      google_search: "Google-Suchanzeigen", meta: "Facebook- und Instagram-Werbung", landing: "Zielseite für die Werbung", tracking: "Erfassung der Anfragen", remarketing: "Remarketing",
      google_business: "Google-Unternehmensprofil", local_pages: "Seiten je Stadt und Leistung", reviews: "Mehr Google-Bewertungen", technical: "Technische Einrichtung der Seite", content: "Texte für die Leistungen",
      fixes: "Korrekturen an der bestehenden Webseite", speed: "Schnelleres Laden", integrations: "Anbindung externer Systeme", migration: "Umzug auf ein anderes Hosting", content_updates: "Änderung von Texten und Fotos", security: "HTTPS und Sicherheit",
    },
    scope: {
      sites: ["Startseite mit klarer Botschaft", "Eine Seite je Leistung", "Über uns", "Projekte oder Galerie", "Kontakt mit Formular, Telefon und Karte"],
      shop: ["Startseite mit Highlights und Aktionen", "Kategorien und Produktseiten", "Warenkorb und Bestellung in drei Schritten", "Admin-Bereich für Bestellungen und Bestände", "AGB und Versand"],
      menu: ["Kategorien und Gerichte mit Fotos", "Sprachversionen", "QR-Codes für Tische und Schaufenster", "Bereich zum Ändern der Preise vom Handy"],
      booking: ["Buchungsseite mit Kalender", "Bestätigung und Erinnerung", "Bereich mit Ihrem Terminplan", "Seite für Ihre Leistungen und Preise"],
      platform: ["Anmeldung und Profile nach Rolle", "Die wichtigsten Arbeitsabläufe", "Dokumente und Auswertungen", "Admin-Bereich", "Anbindung an Webseite und E-Mail"],
      mobile: ["iOS- und Android-App aus einem Code", "Anmeldung und Profil", "Die wichtigsten Bildschirme", "Admin-Bereich für die Inhalte", "Veröffentlichung im App Store und bei Google Play"],
      desktop: ["Programm für Windows und macOS", "Die wichtigsten Arbeitsbildschirme", "Lokale Daten und Synchronisation", "Anbindung von Geräten", "Installation und Einweisung"],
      ai: ["Kurze Analyse Ihres Ablaufs", "Automatisierung der gewählten Schritte", "Anbindung Ihrer Kanäle: Webseite, E-Mail, WhatsApp", "Tests mit echten Anfragen", "Einweisung des Teams"],
      ads: ["Prüfung der Webseite vor der Werbung", "Kampagnen je Leistung und Stadt", "Zielseite bei Bedarf", "Erfassung der Anfragen", "Bericht in einfacher Sprache"],
      seo: ["Prüfung der Webseite und des Google-Profils", "Titel und Beschreibungen für Leistungen und Stadt", "Seiten je Leistung und Stadt", "Technische Einrichtung", "Plan für Bewertungen"],
      care: ["Prüfung der aktuellen Webseite", "Liste der Korrekturen und Änderungen", "Umsetzung nach Priorität", "Kontrolle nach den Änderungen"],
    },
    result: {
      title: "Ihr Plan",
      build: "Was wir bauen würden",
      buildText: {
        sites: "Eine Unternehmenswebseite für Ihren Betrieb, schnell auf dem Handy und bereit für Google.",
        shop: "Ein Onlineshop mit Produkten, Warenkorb, Zahlungen und Versand, den Sie selbst verwalten.",
        menu: "Eine digitale QR-Speisekarte, die Sie in einer Minute vom Handy ändern.",
        booking: "Online-Terminbuchung mit Bestätigung und Terminplan, ohne Telefonate.",
        platform: "Ein internes System oder eine Plattform, gebaut für die Art, wie Sie arbeiten.",
        mobile: "Eine mobile App für iOS und Android, veröffentlicht in den Stores.",
        desktop: "Ein Desktop-Programm für Büro oder Produktion, das auch offline funktioniert.",
        ai: "Eine KI-Automatisierung, die wiederkehrende Arbeit mit Anfragen und Dokumenten übernimmt.",
        ads: "Google- und Meta-Werbung für Menschen, die genau Ihre Leistung suchen.",
        seo: "Lokales SEO, damit Sie bei Google für Ihre Leistung und Ihre Stadt erscheinen.",
        care: "Korrekturen, Verbesserungen und Anbindungen für Ihre aktuelle Webseite.",
      },
      goalsLead: "Ziel",
      featuresTitle: "Funktionen",
      noFeatures: "Vorerst keine Zusatzfunktionen. Wir klären das im Gespräch.",
      scopeTitle: "Vorgeschlagener Umfang",
      timelineTitle: "Realistischer Zeitrahmen",
      timelines: { short: "1–2 Wochen", shop: "2–4 Wochen", large: "3–5 Wochen", call: "Einschätzung nach dem Gespräch" },
      timelineNote: "ab dem Moment, in dem Texte und Fotos vorliegen",
      stateNote: {
        none: "Wir beginnen bei null: Struktur, Design, Texte und Start auf Ihrer Domain.",
        old: "Wir prüfen die aktuelle Seite, behalten, was funktioniert, und übernehmen die Adressen, damit Sie Ihre Google-Positionen behalten.",
        ready: "Ihre Materialien sind fertig: das verkürzt den Zeitrahmen, und wir beginnen sofort mit dem Design.",
        help: "Wir helfen bei Texten und Fotos: Sie erzählen uns am Telefon von Ihrem Betrieb, wir ordnen den Rest.",
      },
      whenNote: {
        asap: "Wir können nach dem ersten Gespräch beginnen.",
        month: "Normaler Start: Gespräch diese Woche, Angebot innerhalb weniger Tage.",
        exploring: "Kein Problem. Der Plan gehört Ihnen, und Sie können zurückkommen, wann Sie wollen.",
      },
      nextTitle: "Wie es weitergeht",
      nextSteps: [
        "Kostenloses Gespräch per Telefon oder Google Meet, um die Details zu klären.",
        "Festpreisangebot mit klarem Umfang und Termin.",
        "Umsetzung mit Abnahme nach jedem Schritt.",
        "Start. In den ersten 30 Tagen sind kleine Änderungen kostenlos; danach Änderungen auf Anfrage, mit vorab genanntem Preis.",
      ],
      edit: "Antworten ändern",
      restart: "Neu beginnen",
    },
    form: {
      title: "Plan senden, Antwort innerhalb von 24 Stunden",
      text: "Wir erhalten den Plan genau so, wie Sie ihn sehen. Unverbindlich.",
      name: "Name",
      namePlaceholder: "Ihr Name",
      nameError: "Bitte schreiben Sie Ihren Namen.",
      contact: "Telefon oder E-Mail",
      contactPlaceholder: "+49 … oder name@…",
      contactError: "Schreiben Sie eine Telefonnummer oder E-Mail, damit wir antworten können.",
      channel: "Wie sollen wir antworten?",
      channels: { whatsapp: "WhatsApp", viber: "Viber", call: "Anruf", email: "E-Mail" },
      submit: "Plan senden",
      sending: "Wird gesendet…",
      whatsapp: "oder per WhatsApp senden",
      success: { title: "Ihr Plan ist bei uns", text: "Wir antworten innerhalb von 24 Stunden per {channel} mit den ersten Fragen und einem Vorschlag für ein Gespräch.", again: "Neuer Plan" },
      failed: { title: "Der Plan konnte nicht gesendet werden", text: "Versuchen Sie es erneut oder senden Sie ihn per WhatsApp mit dem Button unten." },
    },
    labels: { plan: "Plan von rafetov.com", service: "Leistung", goals: "Ziel", features: "Funktionen", scope: "Umfang", timeline: "Zeitrahmen", state: "Aktuell", when: "Start", reply: "Antwort per", name: "Name", contact: "Kontakt" },
    waIntro: "Hallo, hier ist mein Plan von rafetov.com:",
  },

  nl: {
    entry: { question: "Niet zeker wat u nodig heeft?", link: "Maak een plan in 1 minuut" },
    nav: "Projectplanner",
    metaTitle: "Projectplanner: een plan voor uw website, webshop of app in 1 minuut | Rafetov.com",
    metaDescription: "Beantwoord vijf korte vragen en krijg een geschreven plan: wat we zouden bouwen, functies, omvang, een realistische termijn en wat er daarna gebeurt. Verstuur het met één tik.",
    title: "Plan uw project in één minuut",
    sub: "Vijf korte vragen. Aan het eind krijgt u een geschreven plan met functies, omvang en termijn, dat u met één tik verstuurt. Vrijblijvend.",
    stepOf: "Stap {n} van {total}",
    back: "Terug",
    next: "Volgende",
    showPlan: "Toon mijn plan",
    steps: {
      service: { title: "Wat heeft u nodig?", hint: "Kies er één. Zijn het er meer, begin dan met het belangrijkste." },
      goals: { title: "Wat is het doel?", hint: "U kunt er meer dan één kiezen.", options: { leads: "Meer aanvragen en telefoontjes", sell: "Online verkopen", time: "Het team tijd besparen", image: "Professioneler overkomen", replace: "Een oude website of systeem vervangen" } },
      features: { title: "Wat moet erin?", hint: "Vink aan wat u nodig heeft. De rest bespreken we in het gesprek.", none: "Voorlopig niets hiervan" },
      state: { title: "Waar staat u nu?", options: { none: "Ik heb geen website", old: "Ik heb een website die ik wil vervangen", ready: "Teksten en logo zijn klaar", help: "Ik heb hulp nodig met teksten en foto's" } },
      when: { title: "Wanneer wilt u starten?", options: { asap: "Zo snel mogelijk", month: "Binnen een maand", exploring: "Ik oriënteer me alleen" } },
    },
    features: {
      multilingual: "Meerdere talen", blog: "Blog of nieuws", gallery: "Galerij of projecten", booking_form: "Formulier om een afspraak te maken", admin: "Beheerpaneel om de inhoud zelf aan te passen", map_reviews: "Kaart en Google-reviews",
      payments: "Kaartbetaling en rembours", couriers: "Koppeling met koeriers", import: "Productimport uit een bestand", invoices: "Facturen", promo: "Kortingscodes en acties",
      photos: "Foto's bij de gerechten", allergens: "Allergenen", qr: "QR-codes voor de tafels", ordering: "Bestellen aan tafel of voor levering",
      calendar_sync: "Synchronisatie met Google Agenda", reminders: "Herinneringen per e-mail of sms", online_payment: "Betalen bij het boeken", staff: "Meerdere medewerkers of ruimtes",
      roles: "Rollen en rechten voor verschillende gebruikers", requests: "Aanvragen, taken en planningen", documents: "Documenten en bestanden", reports: "Rapporten en overzichten", invoicing: "Koppeling met facturatie", notifications: "Meldingen per e-mail",
      ios_android: "iOS en Android", login: "Inloggen met telefoon of e-mail", push: "Pushmeldingen", offline: "Werkt zonder internet",
      windows_mac: "Windows en macOS", printers: "Printers en apparaten", stock: "Voorraad", sync: "Synchronisatie tussen computers",
      chatbot: "Chatbot op de website", autoreply: "Automatische antwoorden op e-mails en aanvragen", doc_processing: "Documentverwerking", crm: "Koppeling met CRM of spreadsheets", ai_booking: "Afspraken maken via de chat", summaries: "Samenvattingen en rapporten",
      google_search: "Google-zoekadvertenties", meta: "Facebook- en Instagram-advertenties", landing: "Landingspagina voor de advertenties", tracking: "Aanvragen bijhouden", remarketing: "Remarketing",
      google_business: "Google-bedrijfsprofiel", local_pages: "Pagina's per stad en dienst", reviews: "Meer Google-reviews", technical: "Technische instelling van de site", content: "Teksten voor de diensten",
      fixes: "Herstellingen aan de bestaande website", speed: "Sneller laden", integrations: "Koppeling met externe systemen", migration: "Verhuizing naar andere hosting", content_updates: "Teksten en foto's wijzigen", security: "HTTPS en beveiliging",
    },
    scope: {
      sites: ["Startpagina met een duidelijke boodschap", "Een pagina per dienst", "Over ons", "Projecten of galerij", "Contact met formulier, telefoon en kaart"],
      shop: ["Start met highlights en acties", "Categorieën en productpagina's", "Winkelmand en bestellen in drie stappen", "Beheerpaneel voor bestellingen en voorraad", "Voorwaarden en verzending"],
      menu: ["Categorieën en gerechten met foto's", "Taalversies", "QR-codes voor tafels en etalage", "Paneel om prijzen vanaf uw telefoon te wijzigen"],
      booking: ["Boekingspagina met kalender", "Bevestiging en herinnering", "Paneel met uw planning", "Pagina voor uw diensten en prijzen"],
      platform: ["Inloggen en profielen per rol", "De belangrijkste werkprocessen", "Documenten en overzichten", "Beheerpaneel", "Koppeling met website en e-mail"],
      mobile: ["iOS- en Android-app uit één code", "Inloggen en profiel", "De belangrijkste schermen", "Beheerpaneel voor de inhoud", "Publicatie in de App Store en Google Play"],
      desktop: ["Programma voor Windows en macOS", "De belangrijkste werkschermen", "Lokale gegevens en synchronisatie", "Koppeling met apparaten", "Installatie en training"],
      ai: ["Korte analyse van uw proces", "Automatisering van de gekozen stappen", "Koppeling met uw kanalen: website, e-mail, WhatsApp", "Tests met echte aanvragen", "Training van het team"],
      ads: ["Controle van de website vóór de advertenties", "Campagnes per dienst en stad", "Landingspagina indien nodig", "Aanvragen bijhouden", "Rapport in gewone taal"],
      seo: ["Controle van de website en het Google-profiel", "Titels en beschrijvingen voor diensten en stad", "Pagina's per dienst en stad", "Technische instelling", "Plan voor reviews"],
      care: ["Controle van de huidige website", "Lijst met herstellingen en wijzigingen", "Uitvoering op prioriteit", "Controle na de wijzigingen"],
    },
    result: {
      title: "Uw plan",
      build: "Wat we zouden bouwen",
      buildText: {
        sites: "Een bedrijfswebsite gemaakt voor uw zaak, snel op de telefoon en klaar voor Google.",
        shop: "Een webshop met producten, winkelmand, betalingen en verzending die u zelf beheert.",
        menu: "Een digitale QR-menukaart die u in een minuut vanaf uw telefoon aanpast.",
        booking: "Online afspraken maken met bevestiging en planning, zonder telefoontjes.",
        platform: "Een intern systeem of platform, gebouwd rond de manier waarop u werkt.",
        mobile: "Een mobiele app voor iOS en Android, gepubliceerd in de stores.",
        desktop: "Een desktopprogramma voor kantoor of productie dat ook offline werkt.",
        ai: "Een AI-automatisering die het terugkerende werk met aanvragen en documenten overneemt.",
        ads: "Google- en Meta-advertenties gericht op mensen die uw dienst zoeken.",
        seo: "Lokale SEO zodat u in Google verschijnt voor uw dienst en uw stad.",
        care: "Herstellingen, verbeteringen en koppelingen voor uw huidige website.",
      },
      goalsLead: "Doel",
      featuresTitle: "Functies",
      noFeatures: "Voorlopig geen extra functies. We bespreken het in het gesprek.",
      scopeTitle: "Voorgestelde omvang",
      timelineTitle: "Realistische termijn",
      timelines: { short: "1–2 weken", shop: "2–4 weken", large: "3–5 weken", call: "Inschatting na het gesprek" },
      timelineNote: "vanaf het moment dat we teksten en foto's hebben",
      stateNote: {
        none: "We beginnen van nul: structuur, ontwerp, teksten en live gaan op uw domein.",
        old: "We bekijken de huidige site, houden wat werkt en nemen de adressen over zodat u uw Google-posities behoudt.",
        ready: "Uw materiaal is klaar: dat verkort de termijn en we beginnen meteen met het ontwerp.",
        help: "We helpen met teksten en foto's: u vertelt ons over de zaak aan de telefoon, wij ordenen de rest.",
      },
      whenNote: {
        asap: "We kunnen na het eerste gesprek beginnen.",
        month: "Een normale start: gesprek deze week, offerte binnen enkele dagen.",
        exploring: "Geen probleem. Het plan is van u en u kunt terugkomen wanneer u wilt.",
      },
      nextTitle: "Wat er daarna gebeurt",
      nextSteps: [
        "Een gratis gesprek via telefoon of Google Meet om de details te bespreken.",
        "Een vaste offerte met duidelijke omvang en termijn.",
        "De bouw, met een controle bij elke stap.",
        "Live gaan. De eerste 30 dagen zijn kleine wijzigingen gratis; daarna wijzigingen op aanvraag, met de prijs vooraf.",
      ],
      edit: "Antwoorden wijzigen",
      restart: "Opnieuw beginnen",
    },
    form: {
      title: "Verstuur het plan en we antwoorden binnen 24 uur",
      text: "We ontvangen het plan precies zoals u het ziet. Vrijblijvend.",
      name: "Naam",
      namePlaceholder: "Uw naam",
      nameError: "Schrijf uw naam.",
      contact: "Telefoon of e-mail",
      contactPlaceholder: "+32 … of naam@…",
      contactError: "Schrijf een telefoonnummer of e-mail zodat we kunnen antwoorden.",
      channel: "Hoe mogen we antwoorden?",
      channels: { whatsapp: "WhatsApp", viber: "Viber", call: "Bellen", email: "E-mail" },
      submit: "Plan versturen",
      sending: "Versturen…",
      whatsapp: "of verstuur via WhatsApp",
      success: { title: "We hebben uw plan", text: "We antwoorden binnen 24 uur via {channel} met de eerste vragen en een voorstel voor een gesprek.", again: "Nieuw plan" },
      failed: { title: "Het plan kon niet worden verstuurd", text: "Probeer opnieuw of verstuur het via WhatsApp met de knop hieronder." },
    },
    labels: { plan: "Plan van rafetov.com", service: "Dienst", goals: "Doel", features: "Functies", scope: "Omvang", timeline: "Termijn", state: "Nu", when: "Start", reply: "Antwoord via", name: "Naam", contact: "Contact" },
    waIntro: "Hallo, hier is mijn plan van rafetov.com:",
  },
};
