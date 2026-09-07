import type { Lang, WorkTag } from "../i18n/types";
import type { IconKey } from "./icons";

export type ServiceId = "site" | "shop" | "menu" | "ads";

export type ServiceContent = {
  /** Латински slug за езика */
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  priceLine: string;
  includes: string[];
  forWhom: string[];
  faq: { q: string; a: string }[];
};

export type Service = {
  id: ServiceId;
  /** Кои проекти от портфолиото се показват (null = няма) */
  tag: WorkTag | null;
  accent: string;
  /** id-та на статии от блога, свързани с услугата */
  relatedPosts: string[];
  /** Икони за плочките „Какво включва“ (по ред на includes) */
  includeIcons: IconKey[];
  /** Икони за картите „За кого е“ (по ред на forWhom) */
  forWhomIcons: IconKey[];
  content: Record<Lang, ServiceContent>;
};

/** Базов път на страниците за услуги за всеки език (без езиков префикс). */
export const SERVICE_BASE: Record<Lang, string> = { bg: "/uslugi", en: "/services", de: "/leistungen" };

export const SERVICES: Service[] = [
  {
    id: "site",
    tag: "site",
    accent: "#22D3EE",
    relatedPosts: ["kolko-struva-sait", "7-greshki", "kolko-vreme"],
    includeIcons: ["palette", "phone", "search", "form", "globe", "server"],
    forWhomIcons: ["tools", "utensils", "globe", "refresh"],
    content: {
      bg: {
        slug: "izrabotka-na-sait",
        metaTitle: "Изработка на сайт за малък бизнес | от 250 € | Rafetov.com",
        metaDescription:
          "Изработка на уебсайт за вашия бизнес: бърз, удобен на телефон, готов за Google. Фиксирана цена, безплатен хостинг, поддръжка след пускане. Прост сайт от 250 €, по-голям 910–1 200 €.",
        title: "Изработка на сайт, който носи запитвания",
        intro:
          "Сайт, който с едно изречение казва кой сте и как помагате, зарежда бързо на телефон и излиза в Google за услугата и града ви. Без шаблони, които сте виждали при конкурентите, и без месечни такси за хостинг.",
        priceLine: "От около 250 € за прост сайт до 910–1 200 € за по-голям. Фиксирана цена след 15-минутен разговор.",
        includes: [
          "Дизайн, направен за вашия бизнес, не шаблон",
          "Мобилна версия, тествана на реални телефони",
          "Основна SEO настройка: заглавия, описания, скорост, структурирани данни",
          "Форма за запитване, телефон с един клик, карта",
          "Многоезичност при нужда (BG / EN / DE …)",
          "Безплатен хостинг, HTTPS и обучение как сами да променяте съдържанието",
        ],
        forWhom: [
          "Майстори, сервизи и услуги, които искат обаждания от Google",
          "Ресторанти, салони и студиа, които искат резервации",
          "Фирми с чуждестранни клиенти, които им трябва сайт на няколко езика",
          "Бизнеси със стар сайт, който не носи нищо",
        ],
        faq: [
          {
            q: "Колко време отнема?",
            a: "Прост сайт: 1–3 седмици от момента, в който имаме текстове и снимки. По-голям сайт: 3–5 седмици. Точния срок вписваме в офертата.",
          },
          {
            q: "Трябва ли да имам готови текстове и снимки?",
            a: "Не. Разказвате ни за бизнеса си по телефона, ние подреждаме текстовете. За снимки помагаме с избор на стокови или съвети за собствени.",
          },
          {
            q: "Мога ли сам да сменям цени и снимки след това?",
            a: "Да. Показваме ви как, на човешки език. За по-големи промени сме на линия и след пускането.",
          },
        ],
      },
      en: {
        slug: "website-development",
        metaTitle: "Website development for small businesses | from €250 | Rafetov.com",
        metaDescription:
          "A website for your business: fast, mobile-friendly, ready for Google. Fixed price, free hosting, support after launch. Simple site from €250, larger sites €910–1,200.",
        title: "A website that brings in enquiries",
        intro:
          "A website that says in one sentence who you are and how you help, loads fast on phones and shows up on Google for your service and your town. No templates you have seen at your competitors, and no monthly hosting fees.",
        priceLine: "From about €250 for a simple site to €910–1,200 for a larger one. Fixed price after a 15-minute call.",
        includes: [
          "A design made for your business, not a template",
          "Mobile version tested on real phones",
          "Basic SEO setup: titles, descriptions, speed, structured data",
          "Enquiry form, one-tap phone number, map",
          "Several languages when needed (EN / DE / BG …)",
          "Free hosting, HTTPS and training on how to change the content yourself",
        ],
        forWhom: [
          "Tradesmen, workshops and services that want calls from Google",
          "Restaurants, salons and studios that want bookings",
          "Companies with foreign clients that need a site in several languages",
          "Businesses with an old website that brings nothing",
        ],
        faq: [
          {
            q: "How long does it take?",
            a: "A simple site: 1–3 weeks from the moment we have texts and photos. A larger site: 3–5 weeks. The exact deadline goes into the quote.",
          },
          {
            q: "Do I need ready texts and photos?",
            a: "No. You tell us about your business on the phone and we organise the texts. For photos we help with stock images or advice on taking your own.",
          },
          {
            q: "Can I change prices and photos myself afterwards?",
            a: "Yes. We show you how, in plain language. For bigger changes we stay available after launch.",
          },
        ],
      },
      de: {
        slug: "webseite-erstellen",
        metaTitle: "Webseite erstellen lassen für kleine Unternehmen | ab 250 € | Rafetov.com",
        metaDescription:
          "Eine Webseite für Ihr Unternehmen: schnell, mobilfreundlich, bereit für Google. Festpreis, kostenloses Hosting, Betreuung nach dem Start. Einfache Seite ab 250 €, größere Seiten 910–1.200 €.",
        title: "Eine Webseite, die Anfragen bringt",
        intro:
          "Eine Webseite, die in einem Satz sagt, wer Sie sind und wie Sie helfen, auf dem Handy schnell lädt und bei Google für Ihre Leistung und Ihre Stadt erscheint. Keine Vorlagen, die Sie bei der Konkurrenz gesehen haben, und keine monatlichen Hosting-Gebühren.",
        priceLine: "Ab etwa 250 € für eine einfache Seite bis 910–1.200 € für eine größere. Festpreis nach einem 15-minütigen Gespräch.",
        includes: [
          "Ein Design für Ihr Unternehmen, keine Vorlage",
          "Mobile Version, auf echten Handys getestet",
          "SEO-Grundeinrichtung: Titel, Beschreibungen, Geschwindigkeit, strukturierte Daten",
          "Anfrageformular, Telefonnummer mit einem Tipp, Karte",
          "Mehrere Sprachen bei Bedarf (DE / EN / BG …)",
          "Kostenloses Hosting, HTTPS und Einweisung, wie Sie Inhalte selbst ändern",
        ],
        forWhom: [
          "Handwerker, Werkstätten und Dienstleister, die Anrufe über Google wollen",
          "Restaurants, Salons und Studios, die Reservierungen wollen",
          "Unternehmen mit ausländischen Kunden, die eine mehrsprachige Seite brauchen",
          "Betriebe mit einer alten Webseite, die nichts bringt",
        ],
        faq: [
          {
            q: "Wie lange dauert es?",
            a: "Einfache Seite: 1–3 Wochen, sobald Texte und Fotos vorliegen. Größere Seite: 3–5 Wochen. Den genauen Termin schreiben wir ins Angebot.",
          },
          {
            q: "Brauche ich fertige Texte und Fotos?",
            a: "Nein. Sie erzählen uns am Telefon von Ihrem Geschäft, wir ordnen die Texte. Bei Fotos helfen wir mit Stockbildern oder Tipps für eigene Aufnahmen.",
          },
          {
            q: "Kann ich Preise und Fotos danach selbst ändern?",
            a: "Ja. Wir zeigen Ihnen wie, in einfacher Sprache. Für größere Änderungen bleiben wir auch nach dem Start erreichbar.",
          },
        ],
      },
    },
  },
  {
    id: "shop",
    tag: "shop",
    accent: "#34D399",
    relatedPosts: ["onlain-magazin-dostavki", "kolko-struva-sait"],
    includeIcons: ["box", "card", "truck", "tag", "dashboard", "shield"],
    forWhomIcons: ["store", "briefcase", "refresh", "ticket"],
    content: {
      bg: {
        slug: "onlain-magazin",
        metaTitle: "Изработка на онлайн магазин с Еконт, Спиди и плащания с карта | Rafetov.com",
        metaDescription:
          "Онлайн магазин, който продава от телефон и компютър: продукти, кошница, плащания с карта и наложен платеж, интеграция с Еконт и Спиди, промокодове, админ панел. Фиксирана цена, безплатен хостинг.",
        title: "Онлайн магазин, който продава лесно",
        intro:
          "Магазин с продукти, кошница, плащания и доставки, който клиентите ползват без обяснения, а вие управлявате сами: поръчки, наличности, промоции. Свързан с Еконт и Спиди, за да не преписвате адреси.",
        priceLine: "Цена по оферта според броя продукти, куриерите и плащанията. Фиксирана, след 15-минутен разговор.",
        includes: [
          "Продукти с варианти, категории и търсене",
          "Плащане с карта и наложен платеж",
          "Интеграция с Еконт и Спиди: офиси, автомати, адреси, товарителници",
          "Промокодове, отстъпки, безплатна доставка над сума",
          "Админ панел за поръчки, наличности и продукти",
          "Общи условия, поверителност, мобилна версия, безплатен хостинг",
        ],
        forWhom: [
          "Физически магазини, които искат да продават и онлайн",
          "Производители, които искат да продават директно",
          "Търговци със стар магазин, който е бавен или скъп за поддръжка",
          "Билети, ваучери, резервации с онлайн плащане",
        ],
        faq: [
          {
            q: "Колко продукта мога да кача?",
            a: "Няма ограничение. Съветваме да започнете с продуктите, които наистина продавате, и да добавяте постепенно.",
          },
          {
            q: "Кой обработва плащанията с карта?",
            a: "Утвърден доставчик на плащания. Данните на картата никога не минават през вашия сайт, а парите постъпват по вашата сметка.",
          },
          {
            q: "Мога ли сам да добавям продукти и да сменям цени?",
            a: "Да, от админ панела, от телефон или компютър. Показваме ви как при пускането.",
          },
        ],
      },
      en: {
        slug: "online-store",
        metaTitle: "Online store development with shipping and card payments | Rafetov.com",
        metaDescription:
          "An online store that sells from phone and desktop: products, cart, card and cash-on-delivery payments, courier integrations, promo codes, admin panel. Fixed price, free hosting.",
        title: "An online store that sells easily",
        intro:
          "A store with products, cart, payments and shipping that customers use without explanations, and that you manage yourself: orders, stock, promotions. Connected to your couriers so you never copy addresses by hand.",
        priceLine: "Quoted according to the number of products, couriers and payment methods. Fixed, after a 15-minute call.",
        includes: [
          "Products with variants, categories and search",
          "Card payments and cash on delivery",
          "Courier integrations: pickup points, lockers, addresses, shipping labels",
          "Promo codes, discounts, free shipping above a threshold",
          "Admin panel for orders, stock and products",
          "Terms, privacy policy, mobile version, free hosting",
        ],
        forWhom: [
          "Physical shops that want to sell online too",
          "Producers who want to sell directly",
          "Retailers with an old store that is slow or expensive to maintain",
          "Tickets, vouchers, bookings with online payment",
        ],
        faq: [
          {
            q: "How many products can I add?",
            a: "There is no limit. We advise starting with the products you actually sell and adding gradually.",
          },
          {
            q: "Who processes the card payments?",
            a: "An established payment provider. Card data never passes through your website, and the money goes to your account.",
          },
          {
            q: "Can I add products and change prices myself?",
            a: "Yes, from the admin panel, on phone or desktop. We show you how at launch.",
          },
        ],
      },
      de: {
        slug: "onlineshop",
        metaTitle: "Onlineshop erstellen lassen mit Versand und Kartenzahlung | Rafetov.com",
        metaDescription:
          "Ein Onlineshop, der auf Handy und Computer verkauft: Produkte, Warenkorb, Karten- und Nachnahmezahlung, Paketdienst-Anbindung, Gutscheincodes, Admin-Bereich. Festpreis, kostenloses Hosting.",
        title: "Ein Onlineshop, der einfach verkauft",
        intro:
          "Ein Shop mit Produkten, Warenkorb, Zahlungen und Versand, den Kunden ohne Erklärung nutzen und den Sie selbst verwalten: Bestellungen, Bestände, Aktionen. An Ihre Paketdienste angebunden, damit Sie keine Adressen abtippen.",
        priceLine: "Angebot je nach Anzahl der Produkte, Paketdiensten und Zahlungsarten. Festpreis nach einem 15-minütigen Gespräch.",
        includes: [
          "Produkte mit Varianten, Kategorien und Suche",
          "Kartenzahlung und Nachnahme",
          "Paketdienst-Anbindung: Abholstellen, Paketstationen, Adressen, Versandetiketten",
          "Gutscheincodes, Rabatte, kostenloser Versand ab Bestellwert",
          "Admin-Bereich für Bestellungen, Bestände und Produkte",
          "AGB, Datenschutz, mobile Version, kostenloses Hosting",
        ],
        forWhom: [
          "Ladengeschäfte, die auch online verkaufen wollen",
          "Hersteller, die direkt verkaufen wollen",
          "Händler mit einem alten Shop, der langsam oder teuer im Betrieb ist",
          "Tickets, Gutscheine, Buchungen mit Online-Zahlung",
        ],
        faq: [
          {
            q: "Wie viele Produkte kann ich einstellen?",
            a: "Es gibt keine Grenze. Wir raten, mit den Produkten zu beginnen, die Sie wirklich verkaufen, und schrittweise zu ergänzen.",
          },
          {
            q: "Wer wickelt die Kartenzahlungen ab?",
            a: "Ein etablierter Zahlungsanbieter. Kartendaten laufen nie über Ihre Webseite, und das Geld geht auf Ihr Konto.",
          },
          {
            q: "Kann ich selbst Produkte anlegen und Preise ändern?",
            a: "Ja, im Admin-Bereich, vom Handy oder Computer. Wir zeigen es Ihnen beim Start.",
          },
        ],
      },
    },
  },
  {
    id: "menu",
    tag: "menu",
    accent: "#A78BFA",
    relatedPosts: ["digitalno-menu-restorant", "google-business-restorant"],
    includeIcons: ["list", "globe", "qr", "edit", "palette", "link"],
    forWhomIcons: ["utensils", "clock", "hotel", "image"],
    content: {
      bg: {
        slug: "digitalno-menu",
        metaTitle: "Дигитално меню за ресторант с QR код | Rafetov.com",
        metaDescription:
          "QR меню за ресторант, кафене или бар: снимки, категории, алергени, няколко езика, промяна на цените от телефона за минута. Без препечатване. Готово за няколко дни.",
        title: "Дигитално меню с QR код за вашето заведение",
        intro:
          "Гостът сканира QR кода на масата и вижда менюто на телефона си, на своя език, със снимки и алергени. Вие сменяте цена или ястие за минута, от телефона, без нов печат.",
        priceLine: "По-евтино от сайт и от един печат на ламинирани менюта. Точна цена след кратък разговор.",
        includes: [
          "Категории, ястия, снимки, цени, алергени",
          "Няколко езика: български, английски, немски, турски и др.",
          "QR кодове за маси, витрина и вход",
          "Промяна от телефона за минута, без да ни търсите",
          "Дизайн в стила на заведението, отваря се за под 2 секунди",
          "Линк за Google Business профила и социалните мрежи",
        ],
        forWhom: [
          "Ресторанти и кафенета с чуждестранни гости",
          "Заведения, при които цените се променят често",
          "Хотели с ресторант и румсервиз",
          "Барове и бистра, които искат да добавят снимки към менюто",
        ],
        faq: [
          {
            q: "Трябва ли гостът да инсталира приложение?",
            a: "Не. Сканира QR кода с камерата на телефона и менюто се отваря в браузъра веднага.",
          },
          {
            q: "Може ли и онлайн поръчка?",
            a: "Да, като допълнителна функция: поръчка от масата или за доставка. Обсъждаме го в разговора.",
          },
          {
            q: "За колко време е готово?",
            a: "Няколко дни, ако имаме менюто и снимките. Езиковите версии превеждаме ние.",
          },
        ],
      },
      en: {
        slug: "digital-menu",
        metaTitle: "Digital QR menu for restaurants | Rafetov.com",
        metaDescription:
          "A QR menu for restaurants, cafés and bars: photos, categories, allergens, several languages, price changes from your phone in a minute. No reprinting. Ready in a few days.",
        title: "A digital QR menu for your restaurant",
        intro:
          "The guest scans the QR code on the table and sees the menu on their phone, in their language, with photos and allergens. You change a price or a dish in a minute, from your phone, with no reprinting.",
        priceLine: "Cheaper than a website and than one print run of laminated menus. Exact price after a short call.",
        includes: [
          "Categories, dishes, photos, prices, allergens",
          "Several languages: English, German, Bulgarian, Turkish and more",
          "QR codes for tables, window and entrance",
          "Changes from your phone in a minute, without calling us",
          "Design in the style of your restaurant, opens in under 2 seconds",
          "A link for your Google Business Profile and social media",
        ],
        forWhom: [
          "Restaurants and cafés with foreign guests",
          "Places where prices change often",
          "Hotels with a restaurant and room service",
          "Bars and bistros that want photos next to the dishes",
        ],
        faq: [
          {
            q: "Does the guest need to install an app?",
            a: "No. They scan the QR code with the phone camera and the menu opens in the browser instantly.",
          },
          {
            q: "Can it take online orders too?",
            a: "Yes, as an additional feature: ordering from the table or for delivery. We discuss it on the call.",
          },
          {
            q: "How long until it is ready?",
            a: "A few days once we have the menu and the photos. We translate the language versions.",
          },
        ],
      },
      de: {
        slug: "digitale-speisekarte",
        metaTitle: "Digitale Speisekarte mit QR-Code für Restaurants | Rafetov.com",
        metaDescription:
          "QR-Speisekarte für Restaurant, Café oder Bar: Fotos, Kategorien, Allergene, mehrere Sprachen, Preisänderungen vom Handy in einer Minute. Kein Neudruck. In wenigen Tagen fertig.",
        title: "Digitale Speisekarte mit QR-Code für Ihr Lokal",
        intro:
          "Der Gast scannt den QR-Code auf dem Tisch und sieht die Karte auf seinem Handy, in seiner Sprache, mit Fotos und Allergenen. Sie ändern einen Preis oder ein Gericht in einer Minute, vom Handy, ohne Neudruck.",
        priceLine: "Günstiger als eine Webseite und als ein Druck laminierter Karten. Genauer Preis nach einem kurzen Gespräch.",
        includes: [
          "Kategorien, Gerichte, Fotos, Preise, Allergene",
          "Mehrere Sprachen: Deutsch, Englisch, Bulgarisch, Türkisch und mehr",
          "QR-Codes für Tische, Schaufenster und Eingang",
          "Änderungen vom Handy in einer Minute, ohne uns anzurufen",
          "Design im Stil Ihres Lokals, öffnet in unter 2 Sekunden",
          "Link für Ihr Google-Unternehmensprofil und soziale Netzwerke",
        ],
        forWhom: [
          "Restaurants und Cafés mit ausländischen Gästen",
          "Lokale, in denen sich Preise oft ändern",
          "Hotels mit Restaurant und Zimmerservice",
          "Bars und Bistros, die Fotos neben den Gerichten wollen",
        ],
        faq: [
          {
            q: "Muss der Gast eine App installieren?",
            a: "Nein. Er scannt den QR-Code mit der Handykamera, und die Karte öffnet sich sofort im Browser.",
          },
          {
            q: "Geht auch Online-Bestellung?",
            a: "Ja, als Zusatzfunktion: Bestellung vom Tisch oder zur Lieferung. Das besprechen wir im Gespräch.",
          },
          {
            q: "Wie lange dauert es?",
            a: "Wenige Tage, sobald wir die Karte und die Fotos haben. Die Sprachversionen übersetzen wir.",
          },
        ],
      },
    },
  },
  {
    id: "ads",
    tag: null,
    accent: "#FBBF24",
    relatedPosts: ["sait-ili-facebook", "lokalno-seo", "google-business-restorant"],
    includeIcons: ["search", "image", "layout", "bell", "sliders", "chart"],
    forWhomIcons: ["rocket", "megaphone", "target", "cart"],
    content: {
      bg: {
        slug: "reklama-google-facebook",
        metaTitle: "Реклама в Google и Facebook за малък бизнес | Rafetov.com",
        metaDescription:
          "Реклама в Google, Facebook и Instagram с цел запитвания и продажби: настройка, целене на точните хора, седмична оптимизация и ясен отчет какво е донесла всяка кампания.",
        title: "Реклама в Google и Facebook, която води до запитвания",
        intro:
          "Показваме ви на хората, които търсят точно вашата услуга, в момента, в който я търсят. Не „харесвания“ и „обхват“, а обаждания, съобщения и поръчки, които можете да преброите.",
        priceLine: "Месечна такса за управление плюс рекламен бюджет, който сами определяте. Конкретна оферта след разговор.",
        includes: [
          "Google Ads: търсене по услуга и град, ремаркетинг",
          "Facebook и Instagram кампании с реални снимки от бизнеса",
          "Целеви страници, на които рекламата да води",
          "Проследяване на обаждания и запитвания от рекламата",
          "Седмична оптимизация: спираме това, което не работи",
          "Месечен отчет на прост език: колко сте дали и какво е дошло",
        ],
        forWhom: [
          "Бизнеси, които вече имат сайт и искат повече запитвания сега",
          "Нови заведения и магазини, които трябва да станат известни бързо",
          "Услуги с ясна цена, при които едно запитване е пари",
          "Онлайн магазини с продукти, които хората търсят",
        ],
        faq: [
          {
            q: "Какъв бюджет ми трябва?",
            a: "Зависи от услугата и града. За повечето малки бизнеси работещ старт е няколкостотин евро на месец. Казваме ви честно, ако рекламата няма смисъл за вас.",
          },
          {
            q: "Кога ще видя резултат?",
            a: "Google търсене носи първите запитвания в първата седмица. Facebook има нужда от 2–3 седмици за настройка на целенето.",
          },
          {
            q: "Мога ли да спра по всяко време?",
            a: "Да, без дългосрочен договор. Рекламните акаунти са ваши и остават при вас.",
          },
        ],
      },
      en: {
        slug: "google-facebook-ads",
        metaTitle: "Google and Facebook ads for small businesses | Rafetov.com",
        metaDescription:
          "Google, Facebook and Instagram ads aimed at enquiries and sales: setup, precise targeting, weekly optimisation and a clear report of what each campaign brought.",
        title: "Google and Facebook ads that lead to enquiries",
        intro:
          "We put you in front of people who are searching for exactly your service, at the moment they search for it. Not “likes” and “reach”, but calls, messages and orders you can count.",
        priceLine: "A monthly management fee plus an ad budget you set yourself. A concrete quote after a call.",
        includes: [
          "Google Ads: search by service and town, remarketing",
          "Facebook and Instagram campaigns with real photos from your business",
          "Landing pages for the ads to lead to",
          "Tracking of calls and enquiries from the ads",
          "Weekly optimisation: we stop what does not work",
          "A monthly report in plain language: what you spent and what came in",
        ],
        forWhom: [
          "Businesses that already have a website and want more enquiries now",
          "New restaurants and shops that need to become known fast",
          "Services with a clear price, where one enquiry is money",
          "Online stores with products people search for",
        ],
        faq: [
          {
            q: "What budget do I need?",
            a: "It depends on the service and the town. For most small businesses a working start is a few hundred euros a month. We tell you honestly if ads make no sense for you.",
          },
          {
            q: "When will I see results?",
            a: "Google Search brings the first enquiries within the first week. Facebook needs 2–3 weeks to tune the targeting.",
          },
          {
            q: "Can I stop at any time?",
            a: "Yes, with no long-term contract. The ad accounts are yours and stay with you.",
          },
        ],
      },
      de: {
        slug: "google-facebook-werbung",
        metaTitle: "Google- und Facebook-Werbung für kleine Unternehmen | Rafetov.com",
        metaDescription:
          "Werbung bei Google, Facebook und Instagram mit dem Ziel Anfragen und Verkäufe: Einrichtung, genaues Targeting, wöchentliche Optimierung und ein klarer Bericht, was jede Kampagne gebracht hat.",
        title: "Google- und Facebook-Werbung, die zu Anfragen führt",
        intro:
          "Wir zeigen Sie den Menschen, die genau Ihre Leistung suchen, in dem Moment, in dem sie suchen. Keine „Likes“ und „Reichweite“, sondern Anrufe, Nachrichten und Bestellungen, die Sie zählen können.",
        priceLine: "Monatliche Betreuungsgebühr plus ein Werbebudget, das Sie selbst festlegen. Konkretes Angebot nach einem Gespräch.",
        includes: [
          "Google Ads: Suche nach Leistung und Stadt, Remarketing",
          "Facebook- und Instagram-Kampagnen mit echten Fotos aus Ihrem Betrieb",
          "Zielseiten, auf die die Werbung führt",
          "Erfassung von Anrufen und Anfragen aus der Werbung",
          "Wöchentliche Optimierung: wir stoppen, was nicht funktioniert",
          "Monatlicher Bericht in einfacher Sprache: was Sie ausgegeben haben und was gekommen ist",
        ],
        forWhom: [
          "Unternehmen, die schon eine Webseite haben und jetzt mehr Anfragen wollen",
          "Neue Lokale und Geschäfte, die schnell bekannt werden müssen",
          "Dienstleistungen mit klarem Preis, bei denen eine Anfrage Geld bedeutet",
          "Onlineshops mit Produkten, nach denen gesucht wird",
        ],
        faq: [
          {
            q: "Welches Budget brauche ich?",
            a: "Das hängt von Leistung und Stadt ab. Für die meisten kleinen Unternehmen ist ein funktionierender Start einige hundert Euro im Monat. Wir sagen Ihnen ehrlich, wenn Werbung für Sie keinen Sinn ergibt.",
          },
          {
            q: "Wann sehe ich Ergebnisse?",
            a: "Die Google-Suche bringt die ersten Anfragen in der ersten Woche. Facebook braucht 2–3 Wochen, um das Targeting einzustellen.",
          },
          {
            q: "Kann ich jederzeit aufhören?",
            a: "Ja, ohne langfristigen Vertrag. Die Werbekonten gehören Ihnen und bleiben bei Ihnen.",
          },
        ],
      },
    },
  },
];

export function servicePath(s: Service, lang: Lang): string {
  return `${SERVICE_BASE[lang]}/${s.content[lang].slug}`;
}

export function serviceAlternates(s: Service): Record<Lang, string> {
  return { bg: servicePath(s, "bg"), en: servicePath(s, "en"), de: servicePath(s, "de") };
}

export function findService(lang: Lang, base: string, slug: string): Service | undefined {
  if (`/${base}` !== SERVICE_BASE[lang]) return undefined;
  return SERVICES.find((s) => s.content[lang].slug === slug);
}

/** Slug от друг език → услугата и езикът ѝ (за redirect към правилния адрес). */
export function findServiceAnyLang(base: string, slug: string): { service: Service; lang: Lang } | undefined {
  for (const lang of ["bg", "en", "de"] as Lang[]) {
    const s = findService(lang, base, slug);
    if (s) return { service: s, lang };
  }
  return undefined;
}

export function serviceById(id: ServiceId): Service {
  return SERVICES.find((s) => s.id === id)!;
}
