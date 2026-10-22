import type { Lang } from "../types";

/**
 * Глава 01 „Какво правим“ на началната страница: четири раздела (табове) със списък на услугите и картина.
 * Ключовете са и стойността на `?service=` в линка към формата (/?service=<key>#contact).
 */
export type ServiceKey =
  | "sites" | "shop" | "menu" | "booking"
  | "platform" | "mobile" | "desktop"
  | "ai"
  | "ads" | "seo" | "care";

export type ServiceGroupKey = "web" | "software" | "ai" | "growth";

export type ServiceItemCopy = {
  /** Име в списъка на раздела. */
  name: string;
  /** Един ред под името. */
  tagline: string;
  /** Заглавие и описание: показват се в раздел с една услуга (AI). */
  title: string;
  text: string;
  points: string[];
};

export type ServicesCopy = {
  mark: string;
  title: string;
  sub: string;
  groups: Record<ServiceGroupKey, string>;
  items: Record<ServiceKey, ServiceItemCopy>;
  /** „На живо“ етикет върху снимка на реален проект. */
  live: string;
  /** „Отворете сайта“ линк под снимката. */
  open: string;
  /** Линк към страницата на услугата: „Повече за {name}“. */
  more: string;
  /** Линк към формата, когато няма отделна страница. */
  ask: string;
  /** Пример (не реален проект) — етикет на илюстрациите. */
  example: string;
  cta: string;
  v: {
    booking: { title: string; day: string; slots: string[]; confirmed: string; note: string };
    mobile: { app: string; push: string; rows: [string, string][]; };
    desktop: { nav: string[]; head: [string, string, string]; rows: [string, string, string][] };
    /** Софтуер: десктоп програма и мобилно приложение в една система; нова поръчка излиза и на двете. */
    apps: { newRow: [string, string, string]; push: string; tabs: [string, string, string, string]; synced: string; real: string };
    /** Автоматизация: съобщение → AI → CRM, отговор, известие, оферта. */
    flow: {
      channel: string; from: string; time: string; msg: string;
      ai: { title: string; sub: string };
      fields: [string, string][];
      crm: { title: string; rows: [string, string][] };
      reply: { title: string; text: string };
      notify: { title: string; text: string };
      pdf: { title: string; text: string };
      chips: string[];
    };
    ads: { query: string; sponsored: string; title: string; line: string; metaTitle: string; metaText: string; metaCta: string };
    seo: { kind: string; city: string; reviews: string; actions: [string, string, string]; verified: string };
    care: { items: [string, string, string, string]; status: string };
  };
};

export const servicesCopy: Record<Lang, ServicesCopy> = {
  bg: {
    mark: "Какво правим",
    title: "Всичко, от което бизнесът ви има нужда онлайн.",
    sub: "От фирмен сайт до вътрешна система и AI асистент. Изберете направление и вижте услугите в него.",
    groups: { web: "Сайтове и магазини", software: "Софтуер и приложения", ai: "AI автоматизации", growth: "Реклами, SEO и поддръжка" },
    items: {
      sites: {
        name: "Уебсайтове",
        tagline: "Фирмени и многоезични сайтове",
        title: "Сайт, който носи запитвания",
        text: "Фирмен сайт, който с едно изречение казва кой сте и какво правите, зарежда бързо на телефон и излиза в Google за услугата и града ви. За фирми в чужбина: на езика на клиентите им.",
        points: ["Дизайн за вашия бизнес, не шаблон", "Многоезични версии: BG, DE, NL, EN и други", "Форма, телефон с един клик, карта и Google настройка"],
      },
      shop: {
        name: "Онлайн магазини",
        tagline: "Продажби, плащания, доставки",
        title: "Магазин, който продава от телефона",
        text: "Онлайн магазин с продукти, варианти и промоции, плащане с карта или наложен платеж и доставка през Еконт и Спиди. Вие управлявате поръчките сами от телефона.",
        points: ["Плащания: карта, банков превод, наложен платеж", "Еконт и Спиди: етикети и проследяване", "Промокодове, наличности и администрация"],
      },
      menu: {
        name: "Дигитално меню",
        tagline: "QR меню за заведения",
        title: "QR меню, което сменяте за минута",
        text: "Гостът сканира кода на масата и вижда менюто на своя език, със снимки и алергени. Вие сменяте цена или ястие от телефона, без нов печат.",
        points: ["Няколко езика и снимки към ястията", "Промени от телефона за минута", "QR кодове за маси, витрина и Google профила"],
      },
      booking: {
        name: "Онлайн записване",
        tagline: "Часове и резервации",
        title: "Записване без телефонни обаждания",
        text: "Клиентът избира ден и час в сайта ви, получава потвърждение, а вие виждате графика в календара си. За салони, сервизи, лекари, огледи и консултации.",
        points: ["Свободни часове по вашия график", "Потвърждение и напомняне по имейл или SMS", "Синхронизация с Google Calendar"],
      },
      platform: {
        name: "Платформи и вътрешни системи",
        tagline: "CRM, портали, учебни платформи",
        title: "Система, направена за вашата работа",
        text: "Когато таблиците и чатовете вече не стигат: профили за клиенти и служители, заявки, графици, документи и отчети на едно място. Пример: платформата за обучения на ЦЗПО с профили за администратори, преподаватели, курсисти и инспектори.",
        points: ["Роли и права за всеки вид потребител", "Заявки, графици, документи и отчети", "Връзка със сайта, фактурирането и имейла"],
      },
      mobile: {
        name: "Мобилни приложения",
        tagline: "iOS и Android",
        title: "Приложение в джоба на клиентите ви",
        text: "Мобилно приложение за iOS и Android: поръчки, записване, лоялност или вътрешно приложение за екипа на терен. Една кодова база, публикувано в App Store и Google Play.",
        points: ["iOS и Android от един код", "Известия, вход с телефон, офлайн режим", "Публикуване и обновяване в магазините"],
      },
      desktop: {
        name: "Десктоп приложения",
        tagline: "Windows и macOS",
        title: "Програма за офиса и производството",
        text: "Приложение за компютъра, когато работата е в офиса или в цеха: склад, фактури, работни карти, връзка с принтери и устройства. Работи и без интернет.",
        points: ["Windows и macOS", "Работа офлайн и синхронизация", "Връзка с принтери, баркод четци и касови апарати"],
      },
      ai: {
        name: "AI автоматизации",
        tagline: "Чатботове, запитвания, документи",
        title: "Рутината върши машината",
        text: "AI, който отговаря на клиенти и подрежда документи вместо вас: чатбот в WhatsApp, Viber и Messenger, автоматична обработка на запитвания, отговори на Google отзиви, извличане на данни от фактури и автоматични оферти.",
        points: ["Чатбот за WhatsApp, Viber, Messenger и сайта", "Запитвания и отзиви: сортиране и отговор", "Фактури и документи → данни и оферти"],
      },
      ads: {
        name: "Реклами в Google и Meta",
        tagline: "Търсене, Facebook, Instagram",
        title: "Реклама пред хората, които търсят вас",
        text: "Кампании в Google за хората, които търсят услугата ви в момента, и във Facebook и Instagram за района ви. Измерваме запитванията, не кликовете.",
        points: ["Google търсене и карти", "Facebook и Instagram кампании", "Отчет с обаждания и запитвания"],
      },
      seo: {
        name: "Локално SEO",
        tagline: "Google Business Profile и карти",
        title: "Да ви намират в Google и в картите",
        text: "Настройваме сайта и Google Business профила ви така, че да излизате за услугата и града си: категории, снимки, отзиви, работно време и страници за всяка услуга.",
        points: ["Google Business Profile: настройка и поддръжка", "Страници за услуга и град", "Отзиви: събиране и отговори"],
      },
      care: {
        name: "Поддръжка и интеграции",
        tagline: "По заявка, без месечен абонамент",
        title: "Промени, когато ви трябват",
        text: "Без месечна такса към нас, а първите 30 дни след пускането дребните промени са безплатни. Промени по сайта, Еконт и Спиди, картови плащания, фактуриране, хостинг и домейн. Пишете ни, казваме цената предварително.",
        points: ["30 дни безплатни дребни промени след пускането", "Еконт, Спиди, картови плащания, фактуриране", "Промени по заявка с цена предварително"],
      },
    },
    live: "На живо",
    open: "Отворете сайта",
    more: "Повече",
    ask: "Запитване",
    example: "Илюстрация",
    cta: "Обсъдете проекта си",
    v: {
      booking: { title: "Запазете час", day: "Сряда", slots: ["09:00", "10:30", "13:00", "15:30"], confirmed: "Потвърдено", note: "Потвърждение по имейл и SMS" },
      mobile: { app: "Заявки", push: "Нова заявка от сайта", rows: [["Оглед · Люлин", "Днес"], ["Оферта · Младост", "Изпратена"], ["Монтаж · Дружба", "Утре"]] },
      desktop: { nav: ["Клиенти", "Поръчки", "Фактури", "Склад"], head: ["Поръчка", "Статус", "Срок"], rows: [["Покривна конструкция", "В работа", "петък"], ["Дограма PVC", "Чака материали", "вторник"], ["Пергола", "Готово", "—"]] },
      apps: { newRow: ["Навес за кола", "Ново", "днес"], push: "Нова поръчка: Навес за кола", tabs: ["Днес", "Поръчки", "Чат", "Профил"], synced: "Синхронизирано", real: "Реален проект" },
      flow: {
        channel: "WhatsApp", from: "Клиент", time: "10:42",
        msg: "Здравейте, колко струва монтаж на климатик в Пловдив? Може ли до края на седмицата?",
        ai: { title: "AI асистент", sub: "Разбира запитването и извлича данните" },
        fields: [["Услуга", "Монтаж на климатик"], ["Град", "Пловдив"], ["Срок", "До края на седмицата"]],
        crm: { title: "Карта в CRM", rows: [["Клиент", "+359 88 ··· ···"], ["Услуга", "Монтаж на климатик"], ["Статус", "Ново"]] },
        reply: { title: "Автоматичен отговор", text: "Здравейте! Работим в Пловдив. Свободни часове за оглед: четвъртък 10:00 или петък 14:00. Кое ви е удобно?" },
        notify: { title: "Известие в Telegram", text: "Ново запитване: климатик · Пловдив · тази седмица" },
        pdf: { title: "Чернова на оферта", text: "oferta-montazh-klimatik.pdf · за преглед" },
        chips: ["Чатбот WhatsApp / Viber / Messenger", "Обработка на запитвания", "Отговори на Google отзиви", "Фактури → данни → оферти"],
      },
      ads: { query: "ремонт на покриви софия", sponsored: "Спонсорирано", title: "Ремонт на покриви в София · Оглед и оферта", line: "Хидроизолация, керемиди, улуци. Пишете ни в WhatsApp.", metaTitle: "Facebook · Instagram", metaText: "Реклама за района ви с бутон за съобщение", metaCta: "Изпратете съобщение" },
      seo: { kind: "Уеб студио", city: "София", reviews: "отзива в Google", actions: ["Уебсайт", "Маршрут", "Обаждане"], verified: "Потвърден профил" },
      care: { items: ["Хостинг и HTTPS", "Еконт и Спиди", "Плащания с карта", "Промени по заявка"], status: "Сайтът е онлайн" },
    },
  },

  en: {
    mark: "What we do",
    title: "Everything your business needs online.",
    sub: "From a company website to an internal system and an AI assistant. Pick an area to see the services in it.",
    groups: { web: "Websites and shops", software: "Software and apps", ai: "AI automations", growth: "Ads, SEO and care" },
    items: {
      sites: {
        name: "Websites",
        tagline: "Company and multilingual sites",
        title: "A website that brings enquiries",
        text: "A company site that says in one sentence who you are and what you do, loads fast on a phone and ranks in Google for your service and city. For businesses abroad: in the language of their customers.",
        points: ["Design made for your business, not a template", "Language versions: EN, DE, NL, BG and more", "Form, one-tap phone, map and Google setup"],
      },
      shop: {
        name: "Online shops",
        tagline: "Sales, payments, delivery",
        title: "A shop that sells from the phone",
        text: "An online shop with products, variants and promotions, card or cash-on-delivery payment and shipping through local couriers. You manage the orders yourself from your phone.",
        points: ["Payments: card, bank transfer, cash on delivery", "Courier integration: labels and tracking", "Promo codes, stock and an admin panel"],
      },
      menu: {
        name: "Digital menu",
        tagline: "QR menu for restaurants",
        title: "A QR menu you change in a minute",
        text: "The guest scans the code on the table and sees the menu in their language, with photos and allergens. You change a price or a dish from your phone, with no reprinting.",
        points: ["Several languages and photos of the dishes", "Changes from your phone in a minute", "QR codes for tables, the window and your Google profile"],
      },
      booking: {
        name: "Online booking",
        tagline: "Appointments and reservations",
        title: "Bookings without phone calls",
        text: "The client picks a day and time on your site, gets a confirmation, and you see the schedule in your calendar. For salons, workshops, clinics, site visits and consultations.",
        points: ["Free slots based on your schedule", "Confirmation and reminder by email or SMS", "Sync with Google Calendar"],
      },
      platform: {
        name: "Platforms and internal systems",
        tagline: "CRM, portals, training platforms",
        title: "A system built for your work",
        text: "When spreadsheets and chats are no longer enough: accounts for clients and staff, requests, schedules, documents and reports in one place. Example: the CZPO training platform with roles for admins, teachers, students and inspectors.",
        points: ["Roles and permissions for every user type", "Requests, schedules, documents and reports", "Connected to your site, invoicing and email"],
      },
      mobile: {
        name: "Mobile apps",
        tagline: "iOS and Android",
        title: "An app in your customers' pocket",
        text: "A mobile app for iOS and Android: orders, booking, loyalty or an internal app for the team in the field. One codebase, published in the App Store and Google Play.",
        points: ["iOS and Android from one codebase", "Push notifications, phone login, offline mode", "Publishing and updates in the stores"],
      },
      desktop: {
        name: "Desktop apps",
        tagline: "Windows and macOS",
        title: "Software for the office and the workshop",
        text: "A desktop application when the work happens in the office or on the shop floor: stock, invoices, job cards, printers and devices. Works without internet too.",
        points: ["Windows and macOS", "Offline work and sync", "Printers, barcode scanners and POS devices"],
      },
      ai: {
        name: "AI automations",
        tagline: "Chatbots, enquiries, documents",
        title: "Let the machine do the routine",
        text: "AI that answers customers and sorts documents for you: a chatbot on WhatsApp, Viber and Messenger, automatic handling of enquiries, replies to Google reviews, data extraction from invoices and automatic quotes.",
        points: ["Chatbot for WhatsApp, Viber, Messenger and your site", "Enquiries and reviews: sorting and replies", "Invoices and documents → data and quotes"],
      },
      ads: {
        name: "Google and Meta ads",
        tagline: "Search, Facebook, Instagram",
        title: "Ads in front of people looking for you",
        text: "Google campaigns for people searching for your service right now, and Facebook and Instagram campaigns for your area. We measure enquiries, not clicks.",
        points: ["Google Search and Maps", "Facebook and Instagram campaigns", "A report with calls and enquiries"],
      },
      seo: {
        name: "Local SEO",
        tagline: "Google Business Profile and Maps",
        title: "Be found in Google and on the map",
        text: "We set up your site and Google Business Profile so you show up for your service and city: categories, photos, reviews, opening hours and a page for every service.",
        points: ["Google Business Profile: setup and upkeep", "Pages per service and city", "Reviews: collecting and replying"],
      },
      care: {
        name: "Care and integrations",
        tagline: "On request, no monthly subscription",
        title: "Changes when you need them",
        text: "No monthly fee to us, and small changes are free for the first 30 days after launch. Site changes, couriers, card payments, invoicing, hosting and domain. Write to us and we tell you the price in advance.",
        points: ["30 days of free small changes after launch", "Couriers, card payments, invoicing", "Changes on request, price in advance"],
      },
    },
    live: "Live",
    open: "Open the site",
    more: "Learn more",
    ask: "Ask us",
    example: "Illustration",
    cta: "Discuss your project",
    v: {
      booking: { title: "Book a slot", day: "Wednesday", slots: ["09:00", "10:30", "13:00", "15:30"], confirmed: "Confirmed", note: "Confirmation by email and SMS" },
      mobile: { app: "Requests", push: "New request from the site", rows: [["Site visit · North", "Today"], ["Quote · Eastside", "Sent"], ["Installation · Harbour", "Tomorrow"]] },
      desktop: { nav: ["Clients", "Orders", "Invoices", "Stock"], head: ["Order", "Status", "Due"], rows: [["Roof structure", "In progress", "Friday"], ["PVC windows", "Awaiting materials", "Tuesday"], ["Pergola", "Done", "—"]] },
      apps: { newRow: ["Carport", "New", "today"], push: "New order: Carport", tabs: ["Today", "Orders", "Chat", "Profile"], synced: "Synced", real: "Real project" },
      flow: {
        channel: "WhatsApp", from: "Customer", time: "10:42",
        msg: "Hi, how much is a boiler service in Manchester? Could you do it before the weekend?",
        ai: { title: "AI assistant", sub: "Understands the request and extracts the details" },
        fields: [["Service", "Boiler service"], ["City", "Manchester"], ["When", "Before the weekend"]],
        crm: { title: "CRM card", rows: [["Customer", "+44 7··· ··· ···"], ["Service", "Boiler service"], ["Status", "New"]] },
        reply: { title: "Automatic reply", text: "Hello! We cover Manchester. Free slots for a visit: Thursday 10:00 or Friday 14:00. Which suits you?" },
        notify: { title: "Telegram notification", text: "New enquiry: boiler · Manchester · this week" },
        pdf: { title: "Quote draft", text: "quote-boiler-service.pdf · for review" },
        chips: ["WhatsApp / Viber / Messenger chatbot", "Enquiry handling", "Replies to Google reviews", "Invoices → data → quotes"],
      },
      ads: { query: "roof repair manchester", sponsored: "Sponsored", title: "Roof repair in Manchester · Visit and quote", line: "Waterproofing, tiles, gutters. Message us on WhatsApp.", metaTitle: "Facebook · Instagram", metaText: "An ad for your area with a message button", metaCta: "Send message" },
      seo: { kind: "Web studio", city: "Sofia", reviews: "Google reviews", actions: ["Website", "Directions", "Call"], verified: "Verified profile" },
      care: { items: ["Hosting and HTTPS", "Couriers", "Card payments", "Changes on request"], status: "Site is online" },
    },
  },

  de: {
    mark: "Was wir machen",
    title: "Alles, was Ihr Betrieb online braucht.",
    sub: "Von der Firmenwebsite bis zum internen System und KI-Assistenten. Wählen Sie einen Bereich und sehen Sie die Leistungen darin.",
    groups: { web: "Websites und Shops", software: "Software und Apps", ai: "KI-Automatisierung", growth: "Werbung, SEO und Betreuung" },
    items: {
      sites: {
        name: "Websites",
        tagline: "Firmen- und mehrsprachige Websites",
        title: "Eine Website, die Anfragen bringt",
        text: "Eine Firmenwebsite, die in einem Satz sagt, wer Sie sind und was Sie tun, auf dem Handy schnell lädt und bei Google für Ihre Leistung und Ihre Stadt erscheint. Für Betriebe im Ausland: in der Sprache ihrer Kunden.",
        points: ["Design für Ihren Betrieb, keine Vorlage", "Sprachversionen: DE, EN, NL, BG und mehr", "Formular, Anruf mit einem Tipp, Karte und Google-Einrichtung"],
      },
      shop: {
        name: "Onlineshops",
        tagline: "Verkauf, Zahlung, Versand",
        title: "Ein Shop, der vom Handy aus verkauft",
        text: "Ein Onlineshop mit Produkten, Varianten und Aktionen, Zahlung per Karte oder Nachnahme und Versand über Paketdienste. Die Bestellungen verwalten Sie selbst vom Handy.",
        points: ["Zahlung: Karte, Überweisung, Nachnahme", "Versand: Etiketten und Sendungsverfolgung", "Gutscheincodes, Bestände und Verwaltung"],
      },
      menu: {
        name: "Digitale Speisekarte",
        tagline: "QR-Karte für Gastronomie",
        title: "Eine QR-Karte, die Sie in einer Minute ändern",
        text: "Der Gast scannt den Code am Tisch und sieht die Karte in seiner Sprache, mit Fotos und Allergenen. Sie ändern Preis oder Gericht vom Handy, ohne Neudruck.",
        points: ["Mehrere Sprachen und Fotos zu den Gerichten", "Änderungen vom Handy in einer Minute", "QR-Codes für Tische, Schaufenster und Google-Profil"],
      },
      booking: {
        name: "Online-Terminbuchung",
        tagline: "Termine und Reservierungen",
        title: "Termine ohne Telefonate",
        text: "Der Kunde wählt Tag und Uhrzeit auf Ihrer Website, bekommt eine Bestätigung, und Sie sehen den Plan in Ihrem Kalender. Für Salons, Werkstätten, Praxen, Besichtigungen und Beratungen.",
        points: ["Freie Zeiten nach Ihrem Plan", "Bestätigung und Erinnerung per E-Mail oder SMS", "Abgleich mit Google Kalender"],
      },
      platform: {
        name: "Plattformen und interne Systeme",
        tagline: "CRM, Portale, Lernplattformen",
        title: "Ein System, gebaut für Ihre Arbeit",
        text: "Wenn Tabellen und Chats nicht mehr reichen: Konten für Kunden und Mitarbeiter, Anfragen, Pläne, Dokumente und Berichte an einem Ort. Beispiel: die Lernplattform von CZPO mit Rollen für Verwaltung, Dozenten, Teilnehmer und Prüfer.",
        points: ["Rollen und Rechte für jeden Nutzertyp", "Anfragen, Pläne, Dokumente und Berichte", "Verbunden mit Website, Rechnungen und E-Mail"],
      },
      mobile: {
        name: "Mobile Apps",
        tagline: "iOS und Android",
        title: "Eine App in der Tasche Ihrer Kunden",
        text: "Eine App für iOS und Android: Bestellungen, Termine, Treueprogramm oder eine interne App für das Team auf der Baustelle. Ein Code, veröffentlicht im App Store und bei Google Play.",
        points: ["iOS und Android aus einem Code", "Push-Nachrichten, Login per Telefon, Offline-Modus", "Veröffentlichung und Updates in den Stores"],
      },
      desktop: {
        name: "Desktop-Anwendungen",
        tagline: "Windows und macOS",
        title: "Software für Büro und Werkstatt",
        text: "Eine Anwendung für den Computer, wenn die Arbeit im Büro oder in der Halle passiert: Lager, Rechnungen, Arbeitskarten, Drucker und Geräte. Läuft auch ohne Internet.",
        points: ["Windows und macOS", "Offline arbeiten und synchronisieren", "Drucker, Barcode-Scanner und Kassensysteme"],
      },
      ai: {
        name: "KI-Automatisierung",
        tagline: "Chatbots, Anfragen, Dokumente",
        title: "Die Routine erledigt die Maschine",
        text: "KI, die Kunden antwortet und Dokumente ordnet: Chatbot in WhatsApp, Viber und Messenger, automatische Bearbeitung von Anfragen, Antworten auf Google-Bewertungen, Datenauslesen aus Rechnungen und automatische Angebote.",
        points: ["Chatbot für WhatsApp, Viber, Messenger und Website", "Anfragen und Bewertungen: Sortieren und Antworten", "Rechnungen und Dokumente → Daten und Angebote"],
      },
      ads: {
        name: "Google- und Meta-Werbung",
        tagline: "Suche, Facebook, Instagram",
        title: "Werbung vor Menschen, die Sie suchen",
        text: "Google-Kampagnen für Menschen, die Ihre Leistung gerade suchen, und Facebook- und Instagram-Kampagnen für Ihre Region. Wir messen Anfragen, nicht Klicks.",
        points: ["Google Suche und Maps", "Facebook- und Instagram-Kampagnen", "Bericht mit Anrufen und Anfragen"],
      },
      seo: {
        name: "Lokales SEO",
        tagline: "Google-Unternehmensprofil und Maps",
        title: "Bei Google und auf der Karte gefunden werden",
        text: "Wir richten Website und Google-Unternehmensprofil so ein, dass Sie für Ihre Leistung und Stadt erscheinen: Kategorien, Fotos, Bewertungen, Öffnungszeiten und eine Seite je Leistung.",
        points: ["Google-Unternehmensprofil: Einrichtung und Pflege", "Seiten je Leistung und Stadt", "Bewertungen: sammeln und beantworten"],
      },
      care: {
        name: "Betreuung und Integrationen",
        tagline: "Auf Anfrage, ohne monatliches Abo",
        title: "Änderungen, wenn Sie sie brauchen",
        text: "Keine monatliche Gebühr an uns, und in den ersten 30 Tagen nach dem Start sind kleine Änderungen kostenlos. Änderungen an der Website, Paketdienste, Kartenzahlung, Rechnungen, Hosting und Domain. Schreiben Sie uns, den Preis nennen wir vorab.",
        points: ["30 Tage kostenlose kleine Änderungen nach dem Start", "Paketdienste, Kartenzahlung, Rechnungen", "Änderungen auf Anfrage, Preis vorab"],
      },
    },
    live: "Live",
    open: "Website öffnen",
    more: "Mehr dazu",
    ask: "Anfragen",
    example: "Illustration",
    cta: "Projekt besprechen",
    v: {
      booking: { title: "Termin buchen", day: "Mittwoch", slots: ["09:00", "10:30", "13:00", "15:30"], confirmed: "Bestätigt", note: "Bestätigung per E-Mail und SMS" },
      mobile: { app: "Anfragen", push: "Neue Anfrage von der Website", rows: [["Besichtigung · Hanau", "Heute"], ["Angebot · Offenbach", "Gesendet"], ["Montage · Frankfurt", "Morgen"]] },
      desktop: { nav: ["Kunden", "Aufträge", "Rechnungen", "Lager"], head: ["Auftrag", "Status", "Termin"], rows: [["Dachstuhl", "In Arbeit", "Freitag"], ["PVC-Fenster", "Wartet auf Material", "Dienstag"], ["Pergola", "Fertig", "—"]] },
      apps: { newRow: ["Carport", "Neu", "heute"], push: "Neuer Auftrag: Carport", tabs: ["Heute", "Aufträge", "Chat", "Profil"], synced: "Synchronisiert", real: "Echtes Projekt" },
      flow: {
        channel: "WhatsApp", from: "Kunde", time: "10:42",
        msg: "Hallo, was kostet eine Klimaanlagen-Montage in Hanau? Geht das noch diese Woche?",
        ai: { title: "KI-Assistent", sub: "Versteht die Anfrage und liest die Daten aus" },
        fields: [["Leistung", "Klimaanlagen-Montage"], ["Stadt", "Hanau"], ["Termin", "Diese Woche"]],
        crm: { title: "CRM-Karte", rows: [["Kunde", "+49 17· ··· ····"], ["Leistung", "Klimaanlagen-Montage"], ["Status", "Neu"]] },
        reply: { title: "Automatische Antwort", text: "Hallo! Wir arbeiten in Hanau. Freie Termine für eine Besichtigung: Donnerstag 10:00 oder Freitag 14:00. Was passt Ihnen?" },
        notify: { title: "Telegram-Benachrichtigung", text: "Neue Anfrage: Klimaanlage · Hanau · diese Woche" },
        pdf: { title: "Angebotsentwurf", text: "angebot-klimaanlage-montage.pdf · zur Prüfung" },
        chips: ["Chatbot WhatsApp / Viber / Messenger", "Bearbeitung von Anfragen", "Antworten auf Google-Bewertungen", "Rechnungen → Daten → Angebote"],
      },
      ads: { query: "dachsanierung hanau", sponsored: "Gesponsert", title: "Dachsanierung in Hanau · Besichtigung und Angebot", line: "Abdichtung, Ziegel, Dachrinnen. Schreiben Sie uns auf WhatsApp.", metaTitle: "Facebook · Instagram", metaText: "Anzeige für Ihre Region mit Nachricht-Button", metaCta: "Nachricht senden" },
      seo: { kind: "Webstudio", city: "Sofia", reviews: "Google-Bewertungen", actions: ["Website", "Route", "Anrufen"], verified: "Bestätigtes Profil" },
      care: { items: ["Hosting und HTTPS", "Paketdienste", "Kartenzahlung", "Änderungen auf Anfrage"], status: "Website ist online" },
    },
  },

  nl: {
    mark: "Wat we doen",
    title: "Alles wat uw zaak online nodig heeft.",
    sub: "Van bedrijfswebsite tot intern systeem en AI-assistent. Kies een domein en bekijk de diensten erin.",
    groups: { web: "Websites en webshops", software: "Software en apps", ai: "AI-automatisering", growth: "Advertenties, SEO en nazorg" },
    items: {
      sites: {
        name: "Websites",
        tagline: "Bedrijfs- en meertalige websites",
        title: "Een website die aanvragen oplevert",
        text: "Een bedrijfswebsite die in één zin zegt wie u bent en wat u doet, snel laadt op een gsm en in Google verschijnt voor uw dienst en uw stad. Voor zaken in het buitenland: in de taal van hun klanten.",
        points: ["Design voor uw zaak, geen sjabloon", "Taalversies: NL, FR, DE, EN, BG en meer", "Formulier, bellen met één tik, kaart en Google-instelling"],
      },
      shop: {
        name: "Webshops",
        tagline: "Verkoop, betalingen, levering",
        title: "Een webshop die verkoopt vanop de gsm",
        text: "Een webshop met producten, varianten en promoties, betaling met kaart of Bancontact en levering via koeriers. U beheert de bestellingen zelf vanop uw gsm.",
        points: ["Betalingen: kaart, Bancontact, overschrijving", "Koeriers: etiketten en tracking", "Kortingscodes, voorraad en beheer"],
      },
      menu: {
        name: "Digitale menukaart",
        tagline: "QR-menu voor horeca",
        title: "Een QR-menu dat u in een minuut aanpast",
        text: "De gast scant de code op tafel en ziet de kaart in zijn taal, met foto's en allergenen. U wijzigt een prijs of gerecht vanop uw gsm, zonder herdrukken.",
        points: ["Meerdere talen en foto's bij de gerechten", "Wijzigingen vanop uw gsm in een minuut", "QR-codes voor tafels, raam en Google-profiel"],
      },
      booking: {
        name: "Online afspraken",
        tagline: "Afspraken en reservaties",
        title: "Afspraken zonder telefoontjes",
        text: "De klant kiest dag en uur op uw website, krijgt een bevestiging, en u ziet de planning in uw agenda. Voor salons, garages, praktijken, plaatsbezoeken en consultaties.",
        points: ["Vrije uren volgens uw planning", "Bevestiging en herinnering per e-mail of sms", "Synchronisatie met Google Agenda"],
      },
      platform: {
        name: "Platformen en interne systemen",
        tagline: "CRM, portalen, leerplatformen",
        title: "Een systeem gebouwd voor uw werk",
        text: "Wanneer tabellen en chats niet meer volstaan: accounts voor klanten en medewerkers, aanvragen, planningen, documenten en rapporten op één plek. Voorbeeld: het leerplatform van CZPO met rollen voor beheerders, docenten, cursisten en inspecteurs.",
        points: ["Rollen en rechten per type gebruiker", "Aanvragen, planningen, documenten en rapporten", "Gekoppeld aan website, facturatie en e-mail"],
      },
      mobile: {
        name: "Mobiele apps",
        tagline: "iOS en Android",
        title: "Een app in de zak van uw klanten",
        text: "Een app voor iOS en Android: bestellingen, afspraken, klantenkaart of een interne app voor het team op de werf. Eén code, gepubliceerd in de App Store en Google Play.",
        points: ["iOS en Android uit één code", "Meldingen, inloggen met gsm, offline modus", "Publicatie en updates in de stores"],
      },
      desktop: {
        name: "Desktopsoftware",
        tagline: "Windows en macOS",
        title: "Software voor kantoor en atelier",
        text: "Een programma voor de computer wanneer het werk op kantoor of in het atelier gebeurt: voorraad, facturen, werkbonnen, printers en toestellen. Werkt ook zonder internet.",
        points: ["Windows en macOS", "Offline werken en synchroniseren", "Printers, barcodescanners en kassasystemen"],
      },
      ai: {
        name: "AI-automatisering",
        tagline: "Chatbots, aanvragen, documenten",
        title: "De routine doet de machine",
        text: "AI die klanten beantwoordt en documenten ordent: een chatbot op WhatsApp, Viber en Messenger, automatische verwerking van aanvragen, antwoorden op Google-reviews, gegevens uit facturen halen en automatische offertes.",
        points: ["Chatbot voor WhatsApp, Viber, Messenger en website", "Aanvragen en reviews: sorteren en beantwoorden", "Facturen en documenten → gegevens en offertes"],
      },
      ads: {
        name: "Google- en Meta-advertenties",
        tagline: "Zoeken, Facebook, Instagram",
        title: "Advertenties voor wie u zoekt",
        text: "Google-campagnes voor mensen die uw dienst nu zoeken, en Facebook- en Instagram-campagnes voor uw regio. We meten aanvragen, geen klikken.",
        points: ["Google Zoeken en Maps", "Facebook- en Instagram-campagnes", "Rapport met oproepen en aanvragen"],
      },
      seo: {
        name: "Lokale SEO",
        tagline: "Google Bedrijfsprofiel en Maps",
        title: "Gevonden worden in Google en op de kaart",
        text: "We stellen uw website en Google Bedrijfsprofiel zo in dat u verschijnt voor uw dienst en stad: categorieën, foto's, reviews, openingsuren en een pagina per dienst.",
        points: ["Google Bedrijfsprofiel: instelling en onderhoud", "Pagina's per dienst en stad", "Reviews: verzamelen en beantwoorden"],
      },
      care: {
        name: "Nazorg en integraties",
        tagline: "Op aanvraag, zonder maandabonnement",
        title: "Aanpassingen wanneer u ze nodig heeft",
        text: "Geen maandelijkse kost aan ons, en de eerste 30 dagen na de lancering zijn kleine aanpassingen gratis. Aanpassingen aan de website, koeriers, kaartbetalingen, facturatie, hosting en domein. Stuur ons een bericht, we zeggen u vooraf de prijs.",
        points: ["30 dagen gratis kleine aanpassingen na de lancering", "Koeriers, kaartbetalingen, facturatie", "Aanpassingen op aanvraag, prijs vooraf"],
      },
    },
    live: "Live",
    open: "Open de website",
    more: "Meer hierover",
    ask: "Vraag stellen",
    example: "Illustratie",
    cta: "Bespreek uw project",
    v: {
      booking: { title: "Afspraak maken", day: "Woensdag", slots: ["09:00", "10:30", "13:00", "15:30"], confirmed: "Bevestigd", note: "Bevestiging per e-mail en sms" },
      mobile: { app: "Aanvragen", push: "Nieuwe aanvraag via de website", rows: [["Plaatsbezoek · Gent", "Vandaag"], ["Offerte · Antwerpen", "Verzonden"], ["Montage · Leuven", "Morgen"]] },
      desktop: { nav: ["Klanten", "Orders", "Facturen", "Voorraad"], head: ["Order", "Status", "Deadline"], rows: [["Dakstructuur", "In uitvoering", "vrijdag"], ["PVC-ramen", "Wacht op materiaal", "dinsdag"], ["Pergola", "Klaar", "—"]] },
      apps: { newRow: ["Carport", "Nieuw", "vandaag"], push: "Nieuwe order: Carport", tabs: ["Vandaag", "Orders", "Chat", "Profiel"], synced: "Gesynchroniseerd", real: "Echt project" },
      flow: {
        channel: "WhatsApp", from: "Klant", time: "10:42",
        msg: "Hallo, wat kost de plaatsing van een airco in Gent? Kan dat nog deze week?",
        ai: { title: "AI-assistent", sub: "Begrijpt de aanvraag en haalt de gegevens eruit" },
        fields: [["Dienst", "Plaatsing airco"], ["Stad", "Gent"], ["Wanneer", "Deze week"]],
        crm: { title: "CRM-kaart", rows: [["Klant", "+32 4·· ·· ·· ··"], ["Dienst", "Plaatsing airco"], ["Status", "Nieuw"]] },
        reply: { title: "Automatisch antwoord", text: "Hallo! We werken in Gent. Vrije momenten voor een plaatsbezoek: donderdag 10:00 of vrijdag 14:00. Wat past u?" },
        notify: { title: "Telegram-melding", text: "Nieuwe aanvraag: airco · Gent · deze week" },
        pdf: { title: "Offerte-ontwerp", text: "offerte-plaatsing-airco.pdf · ter controle" },
        chips: ["Chatbot WhatsApp / Viber / Messenger", "Verwerking van aanvragen", "Antwoorden op Google-reviews", "Facturen → gegevens → offertes"],
      },
      ads: { query: "dakrenovatie gent", sponsored: "Gesponsord", title: "Dakrenovatie in Gent · Plaatsbezoek en offerte", line: "Waterdichting, pannen, dakgoten. Stuur ons een bericht op WhatsApp.", metaTitle: "Facebook · Instagram", metaText: "Advertentie voor uw regio met berichtknop", metaCta: "Bericht sturen" },
      seo: { kind: "Webstudio", city: "Sofia", reviews: "Google-reviews", actions: ["Website", "Route", "Bellen"], verified: "Geverifieerd profiel" },
      care: { items: ["Hosting en HTTPS", "Koeriers", "Kaartbetalingen", "Aanpassingen op aanvraag"], status: "Website is online" },
    },
  },
};
