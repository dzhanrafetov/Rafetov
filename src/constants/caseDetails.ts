import type { Lang } from "../i18n/types";

/**
 * Разширено case study за водещите проекти: задачата, какво направихме на сайта и какво управлява собственикът в панела.
 * Картинките са общи за езиците (по индекс), текстовете — на всеки език.
 * Сайтът: изрязани части от живия сайт (public/work/case/). Панелът: истински скрийншоти, в които суми, бройки,
 * имена, имейли и телефони са размазани (public/work/admin/); на ЦЗПО са от локалната версия с демо данни.
 * Всичко описано е проверено в самите сайтове и панели на 2026-10-23 — без измислени резултати.
 */
export type CaseCopy = {
  task: string;
  /** Блокове „Какво направихме“, по ред на `site`. */
  site: { title: string; text: string }[];
  /** Само при проекти със скрийншоти на панела. */
  adminIntro?: string;
  /** Описание под всеки скрийншот на панела, по ред на `admin`. */
  admin?: { title: string; text: string }[];
  /** Още възможности: на панела (ако има) или на самия сайт, без картинка. */
  more: string[];
  /** Роли в платформата (само ЦЗПО). */
  roles?: { name: string; text: string }[];
};

export type CaseDetail = {
  site: string[];
  /** Скрийншоти на панела; липсва при проекти без собствен панел — тогава остават задачата, сайтът и списъкът „Още в проекта“. */
  admin?: string[];
  /** Скрийншотите на панела са от демо данни (локална версия), не от истинския панел. */
  demo?: boolean;
  copy: Partial<Record<Lang, CaseCopy>>;
};

export const CASE_DETAILS: Record<string, CaseDetail> = {
  "creative-homes": {
    site: ["/work/case/creative-homes-compare.webp", "/work/case/creative-homes-plan.webp", "/work/case/creative-homes-materials.webp"],
    admin: ["/work/admin/ch-dashboard.webp", "/work/admin/ch-projects.webp", "/work/admin/ch-project-edit.webp"],
    copy: {
      bg: {
        task: "Студио за интериорен дизайн, ремонт и мебели по поръчка в София искаше сайт, който показва готовите обекти така, както изглеждат на живо, и събира запитвания с истинска информация: площ, бюджет и какво точно трябва. Екипът трябваше сам да добавя проекти, без да чака програмист.",
        site: [
          { title: "Визуализация и реалност", text: "Плъзгач преди/след: 3D визуализацията от проекта и снимка от същата гледна точка след ремонта. Клиентът вижда, че резултатът отговаря на обещаното." },
          { title: "Разпределение на имота", text: "Чертеж на плана към проекта и избор на услуга направо до него: интериорен проект, ремонт или цялостна реализация." },
          { title: "Материали и детайли", text: "Близки кадри на материалите по помещения, за клиентите, които избират по усещане, а не по описание." },
        ],
        adminIntro: "Собствен админ панел, направен за начина, по който работи студиото. Всичко се променя от телефона или компютъра и излиза на сайта веднага след „Запази“.",
        admin: [
          { title: "Табло", text: "Запитванията по седмици, по етапи и по източник: сайт, телефон, Viber, Instagram или препоръка. Отгоре стои какво чака действие." },
          { title: "Проекти", text: "Редът в панела е редът на сайта. Проектите се местят със стрелки, скриват се и се показват с едно натискане." },
          { title: "Редактор на проект", text: "Списък показва дали страницата е пълна: главна снимка, галерия, двойки визуализация/снимка, план, квадратура. Има преглед преди запис." },
        ],
        more: [
          "Запитвания с етапи, изглед „дъска“, бележки, напомняния и експорт в Excel",
          "Галерия от PDF с визуализации, разделен автоматично на снимки",
          "Блог с преглед как статията изглежда в Google",
          "„Оферта на месеца“ с цена и краен срок",
          "Въпроси и отговори, контакти, социални мрежи и лентата най-горе на сайта",
          "Екип с отделен достъп и помощ вътре в панела",
        ],
      },
      en: {
        task: "A studio for interior design, renovation and custom-made furniture in Sofia wanted a site that shows finished projects the way they look in real life and collects enquiries with real information: floor area, budget and exactly what is needed. The team had to be able to add projects themselves, without waiting for a developer.",
        site: [
          { title: "Visualisation and reality", text: "A before/after slider: the 3D visualisation from the project and a photo from the same viewpoint after the renovation. The client sees that the result matches what was promised." },
          { title: "Property layout", text: "The floor plan of the project with a choice of service right next to it: interior design, renovation or full realisation." },
          { title: "Materials and details", text: "Close-up shots of the materials by room, for clients who choose by feel rather than by description." },
        ],
        adminIntro: "A custom admin panel, built for the way the studio works. Everything is edited from a phone or a computer and appears on the site right after \"Save\".",
        admin: [
          { title: "Dashboard", text: "Enquiries by week, by stage and by source: website, phone, Viber, Instagram or referral. What needs action sits at the top." },
          { title: "Projects", text: "The order in the panel is the order on the site. Projects are moved with arrows and hidden or shown with one tap." },
          { title: "Project editor", text: "A checklist shows whether the page is complete: main photo, gallery, visualisation/photo pairs, floor plan, floor area. There is a preview before saving." },
        ],
        more: [
          "Enquiries with stages, a board view, notes, reminders and export to Excel",
          "A gallery from a PDF with visualisations, split into images automatically",
          "A blog with a preview of how the article looks in Google",
          "\"Offer of the month\" with a price and a deadline",
          "Questions and answers, contacts, social networks and the bar at the top of the site",
          "Team members with separate access and help inside the panel",
        ],
      },
      de: {
        task: "Ein Studio für Innenarchitektur, Renovierung und Möbel nach Maß in Sofia wollte eine Website, die fertige Objekte so zeigt, wie sie in Wirklichkeit aussehen, und Anfragen mit echten Angaben sammelt: Fläche, Budget und was genau gebraucht wird. Das Team sollte Projekte selbst hinzufügen können, ohne auf einen Entwickler zu warten.",
        site: [
          { title: "Visualisierung und Realität", text: "Ein Vorher/Nachher-Schieberegler: die 3D-Visualisierung aus dem Projekt und ein Foto aus demselben Blickwinkel nach der Renovierung. Der Kunde sieht, dass das Ergebnis dem Versprochenen entspricht." },
          { title: "Grundriss der Immobilie", text: "Der Grundrissplan zum Projekt mit der Wahl der Leistung direkt daneben: Innenarchitekturprojekt, Renovierung oder komplette Umsetzung." },
          { title: "Materialien und Details", text: "Nahaufnahmen der Materialien nach Räumen, für Kunden, die nach Gefühl und nicht nach Beschreibung wählen." },
        ],
        adminIntro: "Ein eigenes Admin-Panel, gebaut für die Arbeitsweise des Studios. Alles wird vom Handy oder Computer aus geändert und erscheint direkt nach „Speichern“ auf der Website.",
        admin: [
          { title: "Übersicht", text: "Anfragen nach Wochen, nach Phasen und nach Quelle: Website, Telefon, Viber, Instagram oder Empfehlung. Ganz oben steht, was eine Aktion erfordert." },
          { title: "Projekte", text: "Die Reihenfolge im Panel ist die Reihenfolge auf der Website. Projekte werden mit Pfeilen verschoben und mit einem Klick ausgeblendet oder eingeblendet." },
          { title: "Projekt-Editor", text: "Eine Checkliste zeigt, ob die Seite vollständig ist: Hauptfoto, Galerie, Paare aus Visualisierung und Foto, Grundriss, Quadratmeter. Vor dem Speichern gibt es eine Vorschau." },
        ],
        more: [
          "Anfragen mit Phasen, Board-Ansicht, Notizen, Erinnerungen und Export nach Excel",
          "Galerie aus einem PDF mit Visualisierungen, automatisch in Bilder aufgeteilt",
          "Blog mit Vorschau, wie der Artikel bei Google aussieht",
          "„Angebot des Monats“ mit Preis und Frist",
          "Fragen und Antworten, Kontakte, soziale Netzwerke und die Leiste ganz oben auf der Website",
          "Team mit getrenntem Zugang und Hilfe direkt im Panel",
        ],
      },
      nl: {
        task: "Een studio voor interieurontwerp, renovatie en meubels op maat in Sofia wilde een website die afgewerkte projecten toont zoals ze er in het echt uitzien en aanvragen verzamelt met echte informatie: oppervlakte, budget en wat precies nodig is. Het team moest zelf projecten kunnen toevoegen, zonder op een ontwikkelaar te wachten.",
        site: [
          { title: "Visualisatie en realiteit", text: "Een voor/na-schuifbalk: de 3D-visualisatie uit het project en een foto vanuit hetzelfde standpunt na de renovatie. De klant ziet dat het resultaat overeenkomt met wat beloofd is." },
          { title: "Indeling van de woning", text: "Het grondplan van het project met de keuze van de dienst er vlak naast: interieurontwerp, renovatie of volledige uitvoering." },
          { title: "Materialen en details", text: "Close-ups van de materialen per ruimte, voor klanten die op gevoel kiezen en niet op beschrijving." },
        ],
        adminIntro: "Een eigen beheerpaneel, gemaakt voor de manier waarop de studio werkt. Alles wordt aangepast vanaf de telefoon of de computer en verschijnt op de website meteen na \"Opslaan\".",
        admin: [
          { title: "Dashboard", text: "Aanvragen per week, per fase en per bron: website, telefoon, Viber, Instagram of aanbeveling. Bovenaan staat wat actie vraagt." },
          { title: "Projecten", text: "De volgorde in het paneel is de volgorde op de website. Projecten worden met pijlen verplaatst en met één tik verborgen of getoond." },
          { title: "Projectbewerker", text: "Een checklist toont of de pagina volledig is: hoofdfoto, galerij, paren visualisatie/foto, grondplan, oppervlakte. Er is een voorbeeld voor het opslaan." },
        ],
        more: [
          "Aanvragen met fasen, bordweergave, notities, herinneringen en export naar Excel",
          "Galerij uit een pdf met visualisaties, automatisch opgesplitst in afbeeldingen",
          "Blog met een voorbeeld van hoe het artikel er in Google uitziet",
          "\"Aanbieding van de maand\" met prijs en einddatum",
          "Vragen en antwoorden, contactgegevens, sociale media en de balk bovenaan de website",
          "Team met aparte toegang en hulp in het paneel zelf",
        ],
      },
    },
  },

  vulcho: {
    site: ["/work/case/vulcho-shop.webp", "/work/case/vulcho-recipes.webp"],
    admin: ["/work/admin/vulcho-dashboard.webp", "/work/admin/vulcho-meat-map.webp", "/work/admin/vulcho-marinades.webp", "/work/admin/vulcho-delivery.webp"],
    copy: {
      bg: {
        task: "Месарски магазин с няколко обекта искаше да продава прясно месо онлайн с доставка до адрес в избран час, без да губи усещането за квартален месар: съвет за разфасовката, мариноване по желание и рецепти към продуктите.",
        site: [
          { title: "Магазин с доставка в час", text: "Каталог по животно и разфасовка, най-продаваните, пакети и кайма по поръчка. В чекаута клиентът избира свободен час за доставка." },
          { title: "Рецепти и обекти", text: "Рецепти към продуктите, някои с видео, а отдолу всички обекти с адрес и работно време." },
        ],
        adminIntro: "Админ панелът е направен около ежедневието на месарницата: поръчки за деня, доставки по часове и продуктите, които трябва да се допълнят.",
        admin: [
          { title: "Табло", text: "Оборот по дни, поръчки, които чакат потвърждение, доставките за днес по час и най-продаваните продукти. На снимката числата са скрити." },
          { title: "Карта на месото", text: "Номерираните части на животното и кои продукти са от всяка. Клиентът я вижда в магазина и филтрира по нея." },
          { title: "Маринати", text: "Готови маринати със съставки и надценка, плюс „своя марината“, която клиентът сглобява сам от съставките." },
          { title: "Часове за доставка", text: "Интервали за доставка с капацитет на поръчки и изключения по дата за празници и почивни дни." },
        ],
        more: [
          "Абонаменти за периодични доставки",
          "Зони за доставка по радиус около всеки град",
          "„Прясна доставка“: банер на сайта и имейл до абонираните клиенти",
          "Рекламни страници за Facebook и Instagram",
          "Лоялна програма, промокодове и ваучери",
          "Текстовете на сайта, началната и продуктовата страница се редактират от панела",
        ],
      },
      en: {
        task: "A butcher's shop with several locations wanted to sell fresh meat online with delivery to an address at a chosen time, without losing the feel of a neighbourhood butcher: advice on the cut, marinating on request and recipes for the products.",
        site: [
          { title: "Shop with timed delivery", text: "A catalogue by animal and cut, bestsellers, bundles and minced meat to order. At checkout the customer picks a free delivery slot." },
          { title: "Recipes and locations", text: "Recipes for the products, some with video, and below them all the locations with address and opening hours." },
        ],
        adminIntro: "The admin panel is built around the butcher's daily routine: today's orders, deliveries by the hour and the products that need restocking.",
        admin: [
          { title: "Dashboard", text: "Turnover by day, orders waiting for confirmation, today's deliveries by hour and the bestselling products. The numbers in the screenshot are hidden." },
          { title: "Meat map", text: "The numbered parts of the animal and which products come from each. The customer sees it in the shop and filters by it." },
          { title: "Marinades", text: "Ready-made marinades with ingredients and a surcharge, plus \"your own marinade\", which the customer puts together from the ingredients." },
          { title: "Delivery slots", text: "Delivery intervals with an order capacity and exceptions by date for holidays and days off." },
        ],
        more: [
          "Subscriptions for recurring deliveries",
          "Delivery zones by radius around each town",
          "\"Fresh delivery\": a banner on the site and an email to subscribed customers",
          "Promotional pages for Facebook and Instagram",
          "Loyalty programme, promo codes and vouchers",
          "The site texts, the home page and the product page are edited from the panel",
        ],
      },
      de: {
        task: "Eine Metzgerei mit mehreren Filialen wollte frisches Fleisch online verkaufen, mit Lieferung an die Adresse zu einer gewählten Uhrzeit, ohne das Gefühl des Metzgers um die Ecke zu verlieren: Beratung zum Zuschnitt, Marinieren auf Wunsch und Rezepte zu den Produkten.",
        site: [
          { title: "Shop mit Lieferung zur Wunschzeit", text: "Katalog nach Tier und Zuschnitt, Bestseller, Pakete und Hackfleisch auf Bestellung. Im Checkout wählt der Kunde ein freies Lieferzeitfenster." },
          { title: "Rezepte und Filialen", text: "Rezepte zu den Produkten, einige mit Video, und darunter alle Filialen mit Adresse und Öffnungszeiten." },
        ],
        adminIntro: "Das Admin-Panel ist um den Alltag der Metzgerei herum gebaut: Bestellungen des Tages, Lieferungen nach Uhrzeit und die Produkte, die nachgefüllt werden müssen.",
        admin: [
          { title: "Übersicht", text: "Umsatz nach Tagen, Bestellungen, die auf Bestätigung warten, die heutigen Lieferungen nach Uhrzeit und die meistverkauften Produkte. Die Zahlen im Screenshot sind ausgeblendet." },
          { title: "Fleischkarte", text: "Die nummerierten Teile des Tieres und welche Produkte aus jedem stammen. Der Kunde sieht sie im Shop und filtert danach." },
          { title: "Marinaden", text: "Fertige Marinaden mit Zutaten und Aufpreis, plus „eigene Marinade“, die der Kunde selbst aus den Zutaten zusammenstellt." },
          { title: "Lieferzeitfenster", text: "Lieferintervalle mit Bestellkapazität und Ausnahmen nach Datum für Feiertage und freie Tage." },
        ],
        more: [
          "Abonnements für regelmäßige Lieferungen",
          "Lieferzonen nach Radius um jede Stadt",
          "„Frische Lieferung“: Banner auf der Website und E-Mail an die angemeldeten Kunden",
          "Werbeseiten für Facebook und Instagram",
          "Treueprogramm, Promo-Codes und Gutscheine",
          "Die Texte der Website, die Startseite und die Produktseite werden im Panel bearbeitet",
        ],
      },
      nl: {
        task: "Een slagerij met meerdere vestigingen wilde vers vlees online verkopen met levering aan huis op een gekozen uur, zonder het gevoel van de buurtslager te verliezen: advies over de versnijding, marineren op vraag en recepten bij de producten.",
        site: [
          { title: "Winkel met levering op uur", text: "Een catalogus per dier en versnijding, bestsellers, pakketten en gehakt op bestelling. Bij het afrekenen kiest de klant een vrij leveringsuur." },
          { title: "Recepten en vestigingen", text: "Recepten bij de producten, sommige met video, en daaronder alle vestigingen met adres en openingsuren." },
        ],
        adminIntro: "Het beheerpaneel is gebouwd rond de dagelijkse werking van de slagerij: bestellingen van de dag, leveringen per uur en de producten die moeten worden aangevuld.",
        admin: [
          { title: "Dashboard", text: "Omzet per dag, bestellingen die op bevestiging wachten, de leveringen van vandaag per uur en de best verkochte producten. De cijfers op de schermafbeelding zijn verborgen." },
          { title: "Vleeskaart", text: "De genummerde delen van het dier en welke producten van elk deel komen. De klant ziet ze in de winkel en filtert erop." },
          { title: "Marinades", text: "Kant-en-klare marinades met ingrediënten en een toeslag, plus \"eigen marinade\", die de klant zelf samenstelt uit de ingrediënten." },
          { title: "Leveringsuren", text: "Leveringsintervallen met een capaciteit aan bestellingen en uitzonderingen per datum voor feestdagen en sluitingsdagen." },
        ],
        more: [
          "Abonnementen voor terugkerende leveringen",
          "Leveringszones per straal rond elke stad",
          "\"Verse levering\": een banner op de website en een e-mail naar de ingeschreven klanten",
          "Advertentiepagina's voor Facebook en Instagram",
          "Getrouwheidsprogramma, promocodes en waardebonnen",
          "De teksten van de website, de startpagina en de productpagina worden vanuit het paneel bewerkt",
        ],
      },
    },
  },

  szo: {
    site: ["/work/case/szo-categories.webp", "/work/case/szo-services.webp"],
    admin: ["/work/admin/szo-products.webp", "/work/admin/szo-installations.webp"],
    copy: {
      bg: {
        task: "Фирма за системи за сигурност искаше онлайн магазин с камери, аларми и мрежово оборудване и отделна заявка за монтаж. Каталогът на доставчика трябваше да се зарежда автоматично, вместо стотици продукти да се въвеждат на ръка.",
        site: [
          { title: "Каталог по категории", text: "IP и Wi-Fi камери, аналогови системи, аларми, мрежово оборудване, памет и аксесоари, с търсене и филтри." },
          { title: "Услуги и заявка за монтаж", text: "Видеонаблюдение, пожароизвестяване, контрол на достъпа, паркинг системи и периметрова охрана, с форма за монтаж в избран град." },
        ],
        adminIntro: "Панелът пази собственика от ръчна работа: продуктите идват от доставчика, а той решава какво и на каква цена да се показва.",
        admin: [
          { title: "Продукти", text: "Каталогът на доставчика влиза автоматично. Собственикът сменя цена или промоция, скрива продукт или добавя свой." },
          { title: "Заявки за монтаж", text: "Заявките по статус и период, а вдясно градовете, които се показват във формата за монтаж. Данните на клиентите на снимката са скрити." },
        ],
        more: ["Запитвания от формата за контакт със статуси", "Поръчки от магазина", "Категории", "Блог"],
      },
      en: {
        task: "A security systems company wanted an online shop with cameras, alarms and network equipment and a separate request for installation. The supplier's catalogue had to load automatically instead of hundreds of products being entered by hand.",
        site: [
          { title: "Catalogue by category", text: "IP and Wi-Fi cameras, analogue systems, alarms, network equipment, storage and accessories, with search and filters." },
          { title: "Services and installation request", text: "Video surveillance, fire detection, access control, parking systems and perimeter security, with an installation form for a chosen city." },
        ],
        adminIntro: "The panel spares the owner manual work: the products come from the supplier, and he decides what is shown and at what price.",
        admin: [
          { title: "Products", text: "The supplier's catalogue comes in automatically. The owner changes a price or a promotion, hides a product or adds his own." },
          { title: "Installation requests", text: "Requests by status and period, and on the right the cities shown in the installation form. Customer data in the screenshot is hidden." },
        ],
        more: ["Enquiries from the contact form with statuses", "Orders from the shop", "Categories", "Blog"],
      },
      de: {
        task: "Ein Unternehmen für Sicherheitssysteme wollte einen Online-Shop mit Kameras, Alarmanlagen und Netzwerktechnik und eine separate Montageanfrage. Der Katalog des Lieferanten sollte automatisch geladen werden, statt Hunderte Produkte von Hand einzugeben.",
        site: [
          { title: "Katalog nach Kategorien", text: "IP- und WLAN-Kameras, analoge Systeme, Alarmanlagen, Netzwerktechnik, Speicher und Zubehör, mit Suche und Filtern." },
          { title: "Leistungen und Montageanfrage", text: "Videoüberwachung, Brandmeldung, Zutrittskontrolle, Parksysteme und Perimeterschutz, mit einem Montageformular für eine gewählte Stadt." },
        ],
        adminIntro: "Das Panel erspart dem Inhaber Handarbeit: Die Produkte kommen vom Lieferanten, und er entscheidet, was zu welchem Preis angezeigt wird.",
        admin: [
          { title: "Produkte", text: "Der Katalog des Lieferanten wird automatisch übernommen. Der Inhaber ändert Preis oder Aktion, blendet ein Produkt aus oder fügt ein eigenes hinzu." },
          { title: "Montageanfragen", text: "Anfragen nach Status und Zeitraum, rechts die Städte, die im Montageformular angezeigt werden. Die Kundendaten im Screenshot sind ausgeblendet." },
        ],
        more: ["Anfragen aus dem Kontaktformular mit Status", "Bestellungen aus dem Shop", "Kategorien", "Blog"],
      },
      nl: {
        task: "Een bedrijf voor beveiligingssystemen wilde een webshop met camera's, alarmen en netwerkapparatuur en een aparte aanvraag voor installatie. De catalogus van de leverancier moest automatisch worden ingeladen in plaats van honderden producten manueel in te voeren.",
        site: [
          { title: "Catalogus per categorie", text: "IP- en wifi-camera's, analoge systemen, alarmen, netwerkapparatuur, opslag en accessoires, met zoekfunctie en filters." },
          { title: "Diensten en installatieaanvraag", text: "Camerabewaking, branddetectie, toegangscontrole, parkeersystemen en perimeterbeveiliging, met een installatieformulier voor een gekozen stad." },
        ],
        adminIntro: "Het paneel bespaart de eigenaar manueel werk: de producten komen van de leverancier, en hij beslist wat er tegen welke prijs wordt getoond.",
        admin: [
          { title: "Producten", text: "De catalogus van de leverancier komt automatisch binnen. De eigenaar wijzigt een prijs of promotie, verbergt een product of voegt een eigen product toe." },
          { title: "Installatieaanvragen", text: "Aanvragen per status en periode, en rechts de steden die in het installatieformulier worden getoond. De klantgegevens op de schermafbeelding zijn verborgen." },
        ],
        more: ["Aanvragen uit het contactformulier met statussen", "Bestellingen uit de winkel", "Categorieën", "Blog"],
      },
    },
  },

  "azteca-site": {
    site: [],
    admin: ["/work/admin/azteca-dashboard.webp"],
    copy: {
      bg: {
        task: "Вносител на премиум пури и аксесоари искаше онлайн магазин с проверка за пълнолетие и прост панел, в който поръчките и наличностите се движат без обучение, включително цветовете на всяка запалка.",
        site: [],
        adminIntro: "Панел с три раздела, точно колкото е нужно: поръчки, каталог и наличности. На таблото пише кое за какво е.",
        admin: [{ title: "Табло", text: "Трите най-чести задачи с кратко обяснение какво се прави във всеки раздел." }],
        more: [
          "Поръчки: „Изпрати и маркирай“ с имейл до клиента или само смяна на статуса",
          "Каталог: продукти със снимки и SKU, цветове и категории",
          "Наличност по продукт и по цветови вариант",
        ],
      },
      en: {
        task: "An importer of premium cigars and accessories wanted an online shop with an age check and a simple panel in which orders and stock are handled without training, including the colours of each lighter.",
        site: [],
        adminIntro: "A panel with three sections, exactly as many as needed: orders, catalogue and stock. The dashboard says what each one is for.",
        admin: [{ title: "Dashboard", text: "The three most common tasks with a short explanation of what is done in each section." }],
        more: [
          "Orders: \"Send and mark\" with an email to the customer, or just a change of status",
          "Catalogue: products with photos and SKU, colours and categories",
          "Stock by product and by colour variant",
        ],
      },
      de: {
        task: "Ein Importeur von Premium-Zigarren und Zubehör wollte einen Online-Shop mit Altersprüfung und ein einfaches Panel, in dem Bestellungen und Bestände ohne Schulung bearbeitet werden, einschließlich der Farben jedes Feuerzeugs.",
        site: [],
        adminIntro: "Ein Panel mit drei Bereichen, genau so viele wie nötig: Bestellungen, Katalog und Bestand. Auf der Übersicht steht, wofür welcher Bereich ist.",
        admin: [{ title: "Übersicht", text: "Die drei häufigsten Aufgaben mit einer kurzen Erklärung, was in jedem Bereich gemacht wird." }],
        more: [
          "Bestellungen: „Senden und markieren“ mit E-Mail an den Kunden oder nur Statuswechsel",
          "Katalog: Produkte mit Fotos und SKU, Farben und Kategorien",
          "Bestand pro Produkt und pro Farbvariante",
        ],
      },
      nl: {
        task: "Een invoerder van premium sigaren en accessoires wilde een webshop met leeftijdscontrole en een eenvoudig paneel waarin bestellingen en voorraad zonder opleiding worden afgehandeld, inclusief de kleuren van elke aansteker.",
        site: [],
        adminIntro: "Een paneel met drie onderdelen, precies zoveel als nodig: bestellingen, catalogus en voorraad. Op het dashboard staat waar elk onderdeel voor dient.",
        admin: [{ title: "Dashboard", text: "De drie meest voorkomende taken met een korte uitleg van wat er in elk onderdeel gebeurt." }],
        more: [
          "Bestellingen: \"Verzenden en markeren\" met een e-mail naar de klant, of enkel een statuswijziging",
          "Catalogus: producten met foto's en SKU, kleuren en categorieën",
          "Voorraad per product en per kleurvariant",
        ],
      },
    },
  },

  czpo: {
    site: ["/work/case/czpo-programs.webp", "/work/case/czpo-platform.webp"],
    admin: ["/work/admin/czpo-admin.webp", "/work/admin/czpo-lesson.webp", "/work/admin/czpo-attendance.webp", "/work/admin/czpo-teacher.webp", "/work/admin/czpo-student.webp"],
    demo: true,
    copy: {
      bg: {
        task: "Лицензиран център за професионално обучение във Варна искаше два продукта в един: сайт, който води до записване и обучение с ваучер, и затворена платформа за дистанционно обучение, готова за изискванията на НАПОО и проверките на Агенцията по заетостта.",
        site: [
          { title: "Професии и записване", text: "Професиите и специалностите с форма и срок на обучение, кандидатстване онлайн и обучение с ваучер за работещи." },
          { title: "Входът към платформата", text: "От сайта курсистът влиза в платформата: занятия, материали и тестове на едно място." },
        ],
        adminIntro: "Платформата има четири роли и всяка вижда само своето. Данните на снимките са демо.",
        admin: [
          { title: "Администратор", text: "Какво чака внимание: нови кандидатури от сайта, запитвания и тестове за проверка. Бързи действия за нов курсист, група или преподавател." },
          { title: "Онлайн занятие", text: "Стаята се създава автоматично с бутон „Започнете занятието“. Може и собствен линк за Google Meet или Zoom." },
          { title: "Отчет за присъствие", text: "Всяко влизане през платформата се записва. Отчетът се печата или тегли като CSV за проверки." },
          { title: "Преподавател", text: "Следващото занятие с бутон за започване, тестовете за проверка и неговите групи." },
          { title: "Курсист", text: "Своите занятия, тестове с резултати и учебни материали за изтегляне." },
        ],
        more: [
          "Тестове със затворени и отворени въпроси, ръчна проверка и публикуване на резултата",
          "Седмичен график на всяка група",
          "Консултациите се отчитат спрямо минималните часове",
          "Материали в PDF и DOC с дневник кой ги е отворил",
          "Съдържанието на сайта от панела: програми, предстоящи курсове, блог и въпроси",
        ],
        roles: [
          { name: "Администратор", text: "Създава профили, групи и програми, назначава преподаватели и проверяващи, вижда кандидатурите от сайта." },
          { name: "Преподавател", text: "Вижда само своите групи. Води онлайн занятия, качва материали, прави и проверява тестове." },
          { name: "Курсист", text: "Влиза в занятията от платформата, тегли материали, решава тестове и вижда резултата, когато е публикуван." },
          { name: "Проверяващ", text: "Служител на Агенцията по заетостта. Само преглед на назначените групи: участници, график, присъствие и резултати." },
        ],
      },
      en: {
        task: "A licensed vocational training centre in Varna wanted two products in one: a site that leads to enrolment and voucher-funded training, and a closed distance learning platform ready for the requirements of the national vocational training agency (NAPOO) and the inspections of the Employment Agency.",
        site: [
          { title: "Professions and enrolment", text: "The professions and specialities with the form and length of training, online application and voucher-funded training for people in work." },
          { title: "The way into the platform", text: "From the site the learner enters the platform: classes, materials and tests in one place." },
        ],
        adminIntro: "The platform has four roles and each sees only its own part. The data in the screenshots is demo data.",
        admin: [
          { title: "Administrator", text: "What needs attention: new applications from the site, enquiries and tests to mark. Quick actions for a new learner, group or teacher." },
          { title: "Online class", text: "The room is created automatically with a \"Start the class\" button. A custom Google Meet or Zoom link also works." },
          { title: "Attendance report", text: "Every entry through the platform is recorded. The report is printed or downloaded as CSV for inspections." },
          { title: "Teacher", text: "The next class with a start button, the tests to mark and their groups." },
          { title: "Learner", text: "Their own classes, tests with results and learning materials to download." },
        ],
        more: [
          "Tests with closed and open questions, manual marking and publishing of the result",
          "A weekly timetable for each group",
          "Consultations are reported against the minimum hours",
          "Materials in PDF and DOC with a log of who opened them",
          "Site content from the panel: programmes, upcoming courses, blog and questions",
        ],
        roles: [
          { name: "Administrator", text: "Creates profiles, groups and programmes, assigns teachers and inspectors, sees the applications from the site." },
          { name: "Teacher", text: "Sees only their own groups. Runs online classes, uploads materials, creates and marks tests." },
          { name: "Learner", text: "Joins classes from the platform, downloads materials, takes tests and sees the result once it is published." },
          { name: "Inspector", text: "An employee of the Employment Agency. View only of the assigned groups: participants, timetable, attendance and results." },
        ],
      },
      de: {
        task: "Ein lizenziertes Zentrum für Berufsbildung in Warna wollte zwei Produkte in einem: eine Website, die zur Anmeldung und zur Weiterbildung mit Gutschein führt, und eine geschlossene Plattform für Fernunterricht, bereit für die Anforderungen der nationalen Agentur für Berufsbildung (NAPOO) und die Prüfungen der Arbeitsagentur.",
        site: [
          { title: "Berufe und Anmeldung", text: "Die Berufe und Fachrichtungen mit Form und Dauer der Ausbildung, Online-Bewerbung und Weiterbildung mit Gutschein für Berufstätige." },
          { title: "Der Zugang zur Plattform", text: "Von der Website aus gelangt der Teilnehmer in die Plattform: Unterricht, Materialien und Tests an einem Ort." },
        ],
        adminIntro: "Die Plattform hat vier Rollen, und jede sieht nur ihren eigenen Bereich. Die Daten auf den Screenshots sind Demodaten.",
        admin: [
          { title: "Administrator", text: "Was Aufmerksamkeit braucht: neue Bewerbungen von der Website, Anfragen und Tests zur Korrektur. Schnellaktionen für einen neuen Teilnehmer, eine Gruppe oder eine Lehrkraft." },
          { title: "Online-Unterricht", text: "Der Raum wird automatisch mit der Schaltfläche „Unterricht starten“ erstellt. Ein eigener Link für Google Meet oder Zoom ist ebenfalls möglich." },
          { title: "Anwesenheitsbericht", text: "Jeder Zugang über die Plattform wird aufgezeichnet. Der Bericht wird gedruckt oder als CSV für Prüfungen heruntergeladen." },
          { title: "Lehrkraft", text: "Der nächste Unterricht mit Start-Schaltfläche, die Tests zur Korrektur und die eigenen Gruppen." },
          { title: "Teilnehmer", text: "Die eigenen Unterrichtsstunden, Tests mit Ergebnissen und Lernmaterialien zum Herunterladen." },
        ],
        more: [
          "Tests mit geschlossenen und offenen Fragen, manuelle Korrektur und Veröffentlichung des Ergebnisses",
          "Wochenplan für jede Gruppe",
          "Beratungsstunden werden gegenüber den Mindeststunden erfasst",
          "Materialien als PDF und DOC mit Protokoll, wer sie geöffnet hat",
          "Inhalte der Website aus dem Panel: Programme, kommende Kurse, Blog und Fragen",
        ],
        roles: [
          { name: "Administrator", text: "Erstellt Profile, Gruppen und Programme, weist Lehrkräfte und Prüfer zu, sieht die Bewerbungen von der Website." },
          { name: "Lehrkraft", text: "Sieht nur die eigenen Gruppen. Führt Online-Unterricht durch, lädt Materialien hoch, erstellt und korrigiert Tests." },
          { name: "Teilnehmer", text: "Nimmt über die Plattform am Unterricht teil, lädt Materialien herunter, löst Tests und sieht das Ergebnis, sobald es veröffentlicht ist." },
          { name: "Prüfer", text: "Mitarbeiter der Arbeitsagentur. Nur Einsicht in die zugewiesenen Gruppen: Teilnehmer, Zeitplan, Anwesenheit und Ergebnisse." },
        ],
      },
      nl: {
        task: "Een erkend centrum voor beroepsopleiding in Varna wilde twee producten in één: een website die leidt naar inschrijving en opleiding met voucher, en een gesloten platform voor afstandsonderwijs, klaar voor de vereisten van het nationale agentschap voor beroepsopleiding (NAPOO) en de controles van de arbeidsbemiddelingsdienst.",
        site: [
          { title: "Beroepen en inschrijving", text: "De beroepen en specialisaties met vorm en duur van de opleiding, online kandidatuur en opleiding met voucher voor werkenden." },
          { title: "De toegang tot het platform", text: "Vanaf de website gaat de cursist naar het platform: lessen, materiaal en toetsen op één plaats." },
        ],
        adminIntro: "Het platform heeft vier rollen en elke rol ziet alleen het eigen deel. De gegevens op de schermafbeeldingen zijn demogegevens.",
        admin: [
          { title: "Beheerder", text: "Wat aandacht vraagt: nieuwe kandidaturen van de website, aanvragen en toetsen om te verbeteren. Snelle acties voor een nieuwe cursist, groep of lesgever." },
          { title: "Onlineles", text: "De lesruimte wordt automatisch aangemaakt met de knop \"Start de les\". Een eigen link voor Google Meet of Zoom kan ook." },
          { title: "Aanwezigheidsrapport", text: "Elke aanmelding via het platform wordt geregistreerd. Het rapport wordt afgedrukt of gedownload als CSV voor controles." },
          { title: "Lesgever", text: "De volgende les met een startknop, de toetsen om te verbeteren en de eigen groepen." },
          { title: "Cursist", text: "De eigen lessen, toetsen met resultaten en lesmateriaal om te downloaden." },
        ],
        more: [
          "Toetsen met gesloten en open vragen, manuele verbetering en publicatie van het resultaat",
          "Weekrooster voor elke groep",
          "Consultaties worden bijgehouden tegenover de minimumuren",
          "Materiaal in pdf en DOC met een logboek van wie het heeft geopend",
          "De inhoud van de website vanuit het paneel: programma's, komende cursussen, blog en vragen",
        ],
        roles: [
          { name: "Beheerder", text: "Maakt profielen, groepen en programma's aan, wijst lesgevers en controleurs toe, ziet de kandidaturen van de website." },
          { name: "Lesgever", text: "Ziet alleen de eigen groepen. Geeft onlinelessen, laadt materiaal op, maakt en verbetert toetsen." },
          { name: "Cursist", text: "Volgt de lessen via het platform, downloadt materiaal, legt toetsen af en ziet het resultaat zodra het gepubliceerd is." },
          { name: "Controleur", text: "Medewerker van de arbeidsbemiddelingsdienst. Alleen inzage in de toegewezen groepen: deelnemers, rooster, aanwezigheid en resultaten." },
        ],
      },
    },
  },

  /* ——— Проекти без собствен панел: задачата, сайтът и „Още в проекта“. Проверени на живо на 2026-10-24. ——— */

  shop4home: {
    site: ["/work/case/shop4home-home.webp", "/work/case/shop4home-categories.webp", "/work/case/shop4home-checkout.webp"],
    copy: {
      bg: {
        task: "Вносител на стоки за дома и смарт уреди искаше онлайн магазин за хиляди продукти в десетки категории: бързо търсене, промоции и най-продавани на видно място и поръчка без регистрация с доставка с Еконт до офис или до адрес.",
        site: [
          { title: "Начало като витрина", text: "Категориите вляво, най-новото и промоциите в средата, банери към сезонните категории вдясно. Отстъпката и цената в евро и лева са на всяка карта." },
          { title: "Каталог по категории", text: "Всяка категория показва колко продукта и подкатегории има. Търсенето се отваря от всяка страница, а любимите продукти се пазят в отделен списък." },
          { title: "Поръчка без регистрация", text: "Количка, после данни за доставка: офис на Еконт или куриер до адрес, фактура за фирма и бележка към поръчката. Клиентът получава имейл с потвърждение." },
        ],
        more: [
          "Промоции, нови продукти и най-продавани с брой продажби",
          "Споделяне на продукт във Facebook, Viber и WhatsApp",
          "„Може да харесаш“ под всеки продукт",
          "Блог с категории: технологии, дом и градина, авто, здраве",
          "Продуктите, категориите и поръчките се управляват от админ панел",
        ],
      },
      en: {
        task: "An importer of home goods and smart appliances wanted an online shop for thousands of products in dozens of categories: fast search, promotions and bestsellers in plain view, and ordering without registration with Econt delivery to an office or an address.",
        site: [
          { title: "A home page as a shop window", text: "Categories on the left, the newest products and promotions in the middle, banners for the seasonal categories on the right. The discount and the price in euro and leva sit on every card." },
          { title: "Catalogue by category", text: "Every category shows how many products and subcategories it holds. Search opens from any page, and favourite products are kept in a separate list." },
          { title: "Ordering without registration", text: "Basket, then delivery details: an Econt office or a courier to an address, an invoice for a company and a note to the order. The customer receives a confirmation email." },
        ],
        more: [
          "Promotions, new products and bestsellers with the number sold",
          "Sharing a product on Facebook, Viber and WhatsApp",
          "\"You may also like\" under every product",
          "A blog with categories: technology, home and garden, auto, health",
          "Products, categories and orders are managed from an admin panel",
        ],
      },
      de: {
        task: "Ein Importeur von Haushaltswaren und smarten Geräten wollte einen Online-Shop für Tausende Produkte in Dutzenden Kategorien: schnelle Suche, Aktionen und Bestseller gut sichtbar und Bestellung ohne Registrierung mit Econt-Lieferung an eine Filiale oder eine Adresse.",
        site: [
          { title: "Startseite als Schaufenster", text: "Die Kategorien links, Neuheiten und Aktionen in der Mitte, Banner zu den Saisonkategorien rechts. Rabatt und Preis in Euro und Lew stehen auf jeder Karte." },
          { title: "Katalog nach Kategorien", text: "Jede Kategorie zeigt, wie viele Produkte und Unterkategorien sie enthält. Die Suche öffnet sich von jeder Seite, und Lieblingsprodukte werden in einer eigenen Liste gespeichert." },
          { title: "Bestellung ohne Registrierung", text: "Warenkorb, dann Lieferdaten: Econt-Filiale oder Kurier an die Adresse, Rechnung für Firmen und eine Notiz zur Bestellung. Der Kunde erhält eine Bestätigung per E-Mail." },
        ],
        more: [
          "Aktionen, neue Produkte und Bestseller mit Verkaufszahl",
          "Produkt teilen über Facebook, Viber und WhatsApp",
          "„Das könnte Ihnen gefallen“ unter jedem Produkt",
          "Blog mit Kategorien: Technik, Haus und Garten, Auto, Gesundheit",
          "Produkte, Kategorien und Bestellungen werden über ein Admin-Panel verwaltet",
        ],
      },
      nl: {
        task: "Een invoerder van huishoudartikelen en slimme toestellen wilde een webshop voor duizenden producten in tientallen categorieën: snel zoeken, promoties en bestsellers in het zicht, en bestellen zonder registratie met levering via Econt naar een kantoor of een adres.",
        site: [
          { title: "Startpagina als etalage", text: "De categorieën links, nieuwigheden en promoties in het midden, banners naar de seizoenscategorieën rechts. Korting en prijs in euro en lev staan op elke kaart." },
          { title: "Catalogus per categorie", text: "Elke categorie toont hoeveel producten en subcategorieën ze bevat. Zoeken opent vanaf elke pagina, en favoriete producten worden in een aparte lijst bewaard." },
          { title: "Bestellen zonder registratie", text: "Winkelmandje, dan leveringsgegevens: een Econt-kantoor of een koerier aan huis, factuur voor een bedrijf en een opmerking bij de bestelling. De klant krijgt een bevestiging per e-mail." },
        ],
        more: [
          "Promoties, nieuwe producten en bestsellers met het aantal verkocht",
          "Product delen via Facebook, Viber en WhatsApp",
          "\"Misschien vind je dit ook leuk\" onder elk product",
          "Blog met categorieën: technologie, huis en tuin, auto, gezondheid",
          "Producten, categorieën en bestellingen worden beheerd vanuit een beheerpaneel",
        ],
      },
    },
  },

  "active-solar": {
    site: ["/work/case/active-solar-calculator.webp", "/work/case/active-solar-products.webp", "/work/case/active-solar-portal.webp"],
    copy: {
      bg: {
        task: "Фирма за проектиране и монтаж на фотоволтаици, сертифицирана в Нидерландия, искаше двуезичен сайт за домове и бизнес: каталог на оборудването, което монтира, калкулатор, който за минута дава ориентировъчна мощност и цена, и вход за клиенти към данните на тяхната система.",
        site: [
          { title: "Соларен калкулатор", text: "Клиентът избира дом или бизнес, въвежда месечната сметка или годишните kWh, вида и посоката на покрива, фазите и дали иска батерия. Вдясно веднага излиза системен лист: мощност, панели, инвертор, годишно производство и ориентировъчна цена, който се праща с един бутон като запитване." },
          { title: "Каталог на оборудването", text: "Панели, инвертори, батерии, конструкции и аксесоари с филтри по категория и марка и търсене по модел. Цените не се публикуват: продуктите се събират в заявка, а офертата идва от фирмата." },
          { title: "Вход за клиенти", text: "След монтажа клиентът получава имейл и парола и вижда монтираните продукти със серийни номера, гаранцията до коя дата, сигнал за повреда и заявка за профилактика или разширение." },
        ],
        more: [
          "Български и английски със собствени адреси",
          "Реализирани системи с мощност и оборудване",
          "Монтаж, профилактика и ремонт на отделни страници",
          "„Препоръчайте ни“: личен код на всеки клиент, който се въвежда в запитването",
          "Анимация „Един ден от живота на вашата система“",
          "Настройки за бисквитки, общи условия и поверителност",
        ],
      },
      en: {
        task: "A company that designs and installs photovoltaic systems, certified in the Netherlands, wanted a bilingual site for homes and business: a catalogue of the equipment it installs, a calculator that gives an indicative capacity and price in a minute, and a client login to the data of their own system.",
        site: [
          { title: "Solar calculator", text: "The client picks home or business, enters the monthly bill or the yearly kWh, the roof type and orientation, the phases and whether they want a battery. A system sheet appears on the right at once: capacity, panels, inverter, yearly production and an indicative price, sent as an enquiry with one button." },
          { title: "Equipment catalogue", text: "Panels, inverters, batteries, mounting systems and accessories with filters by category and brand and search by model. Prices are not published: products are collected into a request and the quote comes from the company." },
          { title: "Client login", text: "After installation the client receives an email and a password and sees the installed products with serial numbers, the warranty end dates, a fault report and a request for servicing or an extension." },
        ],
        more: [
          "Bulgarian and English with their own URLs",
          "Completed systems with capacity and equipment",
          "Installation, servicing and repair on separate pages",
          "\"Recommend us\": a personal code for every client, entered in the enquiry",
          "An animation of a day in the life of your system",
          "Cookie settings, terms and privacy",
        ],
      },
      de: {
        task: "Ein in den Niederlanden zertifiziertes Unternehmen für Planung und Montage von Photovoltaikanlagen wollte eine zweisprachige Website für Privathaushalte und Gewerbe: einen Katalog der Technik, die es montiert, einen Rechner, der in einer Minute Leistung und Richtpreis nennt, und einen Kundenzugang zu den Daten der eigenen Anlage.",
        site: [
          { title: "Solarrechner", text: "Der Kunde wählt Haus oder Gewerbe, gibt die Monatsrechnung oder die Jahres-kWh ein, Dachtyp und Ausrichtung, Phasen und ob er einen Speicher möchte. Rechts erscheint sofort ein Systemblatt: Leistung, Module, Wechselrichter, Jahresertrag und Richtpreis, das mit einem Klick als Anfrage gesendet wird." },
          { title: "Katalog der Technik", text: "Module, Wechselrichter, Speicher, Unterkonstruktionen und Zubehör mit Filtern nach Kategorie und Marke und Suche nach Modell. Preise werden nicht veröffentlicht: Die Produkte werden in einer Anfrage gesammelt, das Angebot kommt vom Unternehmen." },
          { title: "Kundenzugang", text: "Nach der Montage erhält der Kunde E-Mail und Passwort und sieht die montierten Produkte mit Seriennummern, die Garantie bis zu welchem Datum, eine Störungsmeldung und eine Anfrage für Wartung oder Erweiterung." },
        ],
        more: [
          "Bulgarisch und Englisch mit eigenen Adressen",
          "Realisierte Anlagen mit Leistung und Technik",
          "Montage, Wartung und Reparatur auf eigenen Seiten",
          "„Empfehlen Sie uns“: ein persönlicher Code für jeden Kunden, der in der Anfrage eingegeben wird",
          "Animation „Ein Tag im Leben Ihrer Anlage“",
          "Cookie-Einstellungen, AGB und Datenschutz",
        ],
      },
      nl: {
        task: "Een in Nederland gecertificeerd bedrijf voor ontwerp en installatie van zonnepanelen wilde een tweetalige website voor woningen en bedrijven: een catalogus van het materiaal dat het plaatst, een calculator die in een minuut een indicatief vermogen en een richtprijs geeft, en een klantenlogin naar de gegevens van de eigen installatie.",
        site: [
          { title: "Zonnecalculator", text: "De klant kiest woning of bedrijf, vult de maandfactuur of de jaarlijkse kWh in, het daktype en de oriëntatie, de fasen en of hij een batterij wil. Rechts verschijnt meteen een systeemblad: vermogen, panelen, omvormer, jaarproductie en richtprijs, dat met één knop als aanvraag wordt verstuurd." },
          { title: "Catalogus van het materiaal", text: "Panelen, omvormers, batterijen, montagesystemen en accessoires met filters per categorie en merk en zoeken op model. Prijzen worden niet gepubliceerd: producten worden verzameld in een aanvraag en de offerte komt van het bedrijf." },
          { title: "Klantenlogin", text: "Na de installatie krijgt de klant een e-mail en wachtwoord en ziet hij de geplaatste producten met serienummers, de garantie tot welke datum, een storingsmelding en een aanvraag voor onderhoud of uitbreiding." },
        ],
        more: [
          "Bulgaars en Engels met eigen adressen",
          "Gerealiseerde installaties met vermogen en materiaal",
          "Installatie, onderhoud en herstelling op aparte pagina's",
          "\"Beveel ons aan\": een persoonlijke code voor elke klant, in te vullen bij de aanvraag",
          "Animatie \"Een dag uit het leven van uw installatie\"",
          "Cookie-instellingen, algemene voorwaarden en privacy",
        ],
      },
    },
  },

  "24tours": {
    site: ["/work/case/24tours-booking.webp", "/work/case/24tours-vouchers.webp", "/work/case/24tours-tours.webp"],
    copy: {
      bg: {
        task: "Фирма за офроуд турове с електрически мотори и джипове край Самоков и София искаше сайт, от който турът се резервира за минути: дата, час, участници, мотори и добавки, с промокод или ваучер. Плюс подаръчни ваучери, които се купуват онлайн и пристигат по имейл.",
        site: [
          { title: "Резервация в пет стъпки", text: "Тур, дата и час, участници и добавки, данни и потвърждение. Обобщението вдясно се смята в движение: мотори, GoPro, отстъпки и крайна сума. Потвърждението идва по имейл." },
          { title: "Подаръчни ваучери", text: "Шест номинала с отстъпка, количество, име на получателя и по желание пластмасов ваучер с куриер. Кодовете пристигат по имейл и се въвеждат като промокод при резервация." },
          { title: "Турове и мотори", text: "Всеки тур с програма, продължителност, ниво, какво е включено и бутон за резервация. Моторите са с въртящ момент, мощност, тегло и максимална скорост." },
        ],
        more: [
          "Отзиви с оценка, снимка и преглед как ще изглежда преди публикуване",
          "Често задавани въпроси",
          "Блог със снимки от туровете",
          "Форма за контакт и страница „Стани партньор“",
          "Общи условия, поверителност и политика за бисквитки",
        ],
      },
      en: {
        task: "An off-road tour company with electric bikes and jeeps near Samokov and Sofia wanted a site where a tour is booked in minutes: date, time, participants, bikes and extras, with a promo code or a voucher. Plus gift vouchers bought online and delivered by email.",
        site: [
          { title: "Booking in five steps", text: "Tour, date and time, participants and extras, details and confirmation. The summary on the right updates as you go: bikes, GoPro, discounts and the final amount. The confirmation arrives by email." },
          { title: "Gift vouchers", text: "Six values with a discount, quantity, the recipient's name and, if wanted, a plastic voucher by courier. The codes arrive by email and are entered as a promo code when booking." },
          { title: "Tours and bikes", text: "Every tour with a programme, duration, level, what is included and a booking button. The bikes come with torque, power, weight and top speed." },
        ],
        more: [
          "Reviews with a rating, a photo and a preview before publishing",
          "Frequently asked questions",
          "A blog with photos from the tours",
          "A contact form and a \"Become a partner\" page",
          "Terms, privacy and cookie policy",
        ],
      },
      de: {
        task: "Ein Anbieter von Offroad-Touren mit Elektromotorrädern und Jeeps bei Samokow und Sofia wollte eine Website, auf der eine Tour in Minuten gebucht ist: Datum, Uhrzeit, Teilnehmer, Motorräder und Extras, mit Promo-Code oder Gutschein. Dazu Geschenkgutscheine, die online gekauft werden und per E-Mail ankommen.",
        site: [
          { title: "Buchung in fünf Schritten", text: "Tour, Datum und Uhrzeit, Teilnehmer und Extras, Daten und Bestätigung. Die Übersicht rechts rechnet mit: Motorräder, GoPro, Rabatte und Endbetrag. Die Bestätigung kommt per E-Mail." },
          { title: "Geschenkgutscheine", text: "Sechs Werte mit Rabatt, Menge, Name des Empfängers und auf Wunsch ein Plastikgutschein per Kurier. Die Codes kommen per E-Mail und werden bei der Buchung als Promo-Code eingegeben." },
          { title: "Touren und Motorräder", text: "Jede Tour mit Programm, Dauer, Niveau, Leistungen und Buchungsbutton. Die Motorräder mit Drehmoment, Leistung, Gewicht und Höchstgeschwindigkeit." },
        ],
        more: [
          "Bewertungen mit Note, Foto und Vorschau vor der Veröffentlichung",
          "Häufige Fragen",
          "Blog mit Fotos von den Touren",
          "Kontaktformular und Seite „Partner werden“",
          "AGB, Datenschutz und Cookie-Richtlinie",
        ],
      },
      nl: {
        task: "Een aanbieder van offroadtochten met elektrische motoren en jeeps bij Samokov en Sofia wilde een website waarop een tocht in enkele minuten geboekt is: datum, uur, deelnemers, motoren en extra's, met een promocode of waardebon. Plus cadeaubonnen die online worden gekocht en per e-mail aankomen.",
        site: [
          { title: "Boeken in vijf stappen", text: "Tocht, datum en uur, deelnemers en extra's, gegevens en bevestiging. Het overzicht rechts rekent mee: motoren, GoPro, kortingen en eindbedrag. De bevestiging komt per e-mail." },
          { title: "Cadeaubonnen", text: "Zes waarden met korting, aantal, naam van de ontvanger en desgewenst een plastic bon per koerier. De codes komen per e-mail en worden bij het boeken als promocode ingevoerd." },
          { title: "Tochten en motoren", text: "Elke tocht met programma, duur, niveau, wat inbegrepen is en een boekingsknop. De motoren met koppel, vermogen, gewicht en topsnelheid." },
        ],
        more: [
          "Beoordelingen met score, foto en een voorbeeld voor publicatie",
          "Veelgestelde vragen",
          "Blog met foto's van de tochten",
          "Contactformulier en pagina \"Word partner\"",
          "Algemene voorwaarden, privacy en cookiebeleid",
        ],
      },
    },
  },

  jitara: {
    site: ["/work/case/jitara-catalog.webp", "/work/case/jitara-selection.webp", "/work/case/jitara-en.webp"],
    copy: {
      bg: {
        task: "Мелница и хлебозавод във Враца, на пазара от 1993 г., искаше сайт на български и английски, който представя продуктите пред магазини, вериги и заведения и публикува проектите, съфинансирани от ЕС, така както го изисква програмата.",
        site: [
          { title: "Каталог по категории", text: "Хляб, брашно, питки и козунаци, закуски, крекери и солети, сладкарски изделия. Всеки продукт със снимка, грамаж и кратко описание, без цени: сайтът е за търговски партньори." },
          { title: "Специална селекция", text: "Шест хляба със закваска, показани с етикета, съставките и хранителните стойности на 100 г, както са на опаковката." },
          { title: "На английски", text: "Цялото съдържание има английска версия със собствени адреси, за партньори извън България. Превключването е от менюто на всяка страница." },
        ],
        more: [
          "Страница „Проекти по ЕС“ с цел, резултати, финансиране и публичните покани за изтегляне",
          "Лента за съфинансирането най-горе на всяка страница",
          "„За нас“: собствена мелница, каменна мелница, два цеха, дистрибуция в цялата страна",
          "Контакти за магазини, вериги и заведения с телефон на всяка страница",
        ],
      },
      en: {
        task: "A mill and bakery in Vratsa, in business since 1993, wanted a site in Bulgarian and English that presents the products to shops, retail chains and restaurants and publishes the projects co-funded by the EU, as the programme requires.",
        site: [
          { title: "Catalogue by category", text: "Bread, flour, pitas and kozunak, savoury snacks, crackers and pretzel sticks, pastries. Every product with a photo, weight and a short description, without prices: the site is for trade partners." },
          { title: "Special selection", text: "Six sourdough breads shown with the label, the ingredients and the nutritional values per 100 g, as on the packaging." },
          { title: "In English", text: "All the content has an English version with its own URLs, for partners outside Bulgaria. The switch is in the menu on every page." },
        ],
        more: [
          "An \"EU projects\" page with the aim, results, funding and the public invitations to download",
          "A co-funding bar at the top of every page",
          "\"About us\": own mill, stone mill, two bakeries, distribution across the country",
          "Contacts for shops, chains and restaurants with a phone number on every page",
        ],
      },
      de: {
        task: "Eine Mühle und Bäckerei in Wraza, seit 1993 am Markt, wollte eine Website auf Bulgarisch und Englisch, die die Produkte Geschäften, Handelsketten und Gastronomie vorstellt und die von der EU kofinanzierten Projekte veröffentlicht, wie es das Programm verlangt.",
        site: [
          { title: "Katalog nach Kategorien", text: "Brot, Mehl, Fladen und Kozunak, herzhaftes Gebäck, Cracker und Salzstangen, Süßwaren. Jedes Produkt mit Foto, Gewicht und kurzer Beschreibung, ohne Preise: Die Website richtet sich an Handelspartner." },
          { title: "Spezielle Auswahl", text: "Sechs Sauerteigbrote, gezeigt mit Etikett, Zutaten und Nährwerten pro 100 g, wie auf der Verpackung." },
          { title: "Auf Englisch", text: "Alle Inhalte gibt es in einer englischen Version mit eigenen Adressen, für Partner außerhalb Bulgariens. Der Wechsel ist im Menü jeder Seite." },
        ],
        more: [
          "Seite „EU-Projekte“ mit Ziel, Ergebnissen, Finanzierung und den öffentlichen Ausschreibungen zum Herunterladen",
          "Leiste zur Kofinanzierung ganz oben auf jeder Seite",
          "„Über uns“: eigene Mühle, Steinmühle, zwei Werke, Vertrieb im ganzen Land",
          "Kontakte für Geschäfte, Ketten und Gastronomie mit Telefonnummer auf jeder Seite",
        ],
      },
      nl: {
        task: "Een maalderij en bakkerij in Vratsa, actief sinds 1993, wilde een website in het Bulgaars en Engels die de producten voorstelt aan winkels, ketens en horeca en de door de EU medegefinancierde projecten publiceert, zoals het programma vereist.",
        site: [
          { title: "Catalogus per categorie", text: "Brood, bloem, pita's en kozunak, hartige snacks, crackers en zoutstengels, gebak. Elk product met foto, gewicht en korte beschrijving, zonder prijzen: de website is voor handelspartners." },
          { title: "Speciale selectie", text: "Zes zuurdesembroden, getoond met het etiket, de ingrediënten en de voedingswaarden per 100 g, zoals op de verpakking." },
          { title: "In het Engels", text: "Alle inhoud heeft een Engelse versie met eigen adressen, voor partners buiten Bulgarije. Wisselen gebeurt via het menu op elke pagina." },
        ],
        more: [
          "Pagina \"EU-projecten\" met doel, resultaten, financiering en de openbare oproepen om te downloaden",
          "Balk over de medefinanciering bovenaan elke pagina",
          "\"Over ons\": eigen maalderij, steenmolen, twee bakkerijen, distributie in het hele land",
          "Contact voor winkels, ketens en horeca met telefoonnummer op elke pagina",
        ],
      },
    },
  },

  "alpha-reiniging": {
    site: ["/work/case/alpha-reiniging-before-after.webp", "/work/case/alpha-reiniging-offerte.webp", "/work/case/alpha-reiniging-regions.webp"],
    copy: {
      bg: {
        task: "Млада фирма за почистване от Гент искаше сайт на нидерландски, който показва истински резултати и води до безплатна оферта: осем услуги със собствени страници, работен район в цяла Фландрия и форма, в която клиентът избира услугите, пише къде е обектът и праща снимки.",
        site: [
          { title: "Преди и след", text: "Плъзгачи със снимки от собствени обекти: веранда, покрив, керемиди отблизо. На сайта пише, че няма стокови изображения, и е така." },
          { title: "Заявка за оферта", text: "Клиентът отбелязва една или няколко услуги, пише пощенски код, срок и тип сграда, добавя до пет снимки или оставя телефон за обратно обаждане в избран часови интервал. Формата е защитена от спам с Cloudflare Turnstile." },
          { title: "Работен район", text: "Регионите от Гент до Антверпен с общините във всеки и търсене „работите ли в моята община“." },
        ],
        more: [
          "Осем услуги с отделна страница: подход, въпроси, съвети и свързани услуги",
          "Оценки от Google и Trustlocal с връзка към профилите",
          "Какво определя цената: площ, достъпност, замърсяване",
          "Блог със съвети, подредени по теми",
          "WhatsApp и телефон от всяка страница, включително в лентата на телефона",
          "Настройки за бисквитки, поверителност и общи условия",
        ],
      },
      en: {
        task: "A young cleaning company from Ghent wanted a Dutch-language site that shows real results and leads to a free quote: eight services with their own pages, a service area across Flanders and a form in which the client picks the services, says where the property is and sends photos.",
        site: [
          { title: "Before and after", text: "Sliders with photos from the company's own jobs: a veranda, a roof, roof tiles up close. The site says there are no stock images, and there are none." },
          { title: "Quote request", text: "The client ticks one or more services, enters a postcode, a preferred time frame and the type of building, adds up to five photos or leaves a phone number for a call back in a chosen time slot. The form is protected from spam with Cloudflare Turnstile." },
          { title: "Service area", text: "The regions from Ghent to Antwerp with the municipalities in each and a search for \"do you work in my municipality\"." },
        ],
        more: [
          "Eight services with a separate page: approach, questions, tips and related services",
          "Google and Trustlocal ratings with links to the profiles",
          "What determines the price: area, accessibility, degree of soiling",
          "A blog with tips sorted by topic",
          "WhatsApp and phone from every page, including the bar on mobile",
          "Cookie settings, privacy and terms",
        ],
      },
      de: {
        task: "Ein junges Reinigungsunternehmen aus Gent wollte eine niederländischsprachige Website, die echte Ergebnisse zeigt und zum kostenlosen Angebot führt: acht Leistungen mit eigenen Seiten, ein Einsatzgebiet in ganz Flandern und ein Formular, in dem der Kunde die Leistungen wählt, den Ort angibt und Fotos schickt.",
        site: [
          { title: "Vorher und nachher", text: "Schieberegler mit Fotos von eigenen Aufträgen: Veranda, Dach, Dachziegel aus der Nähe. Die Website sagt, dass es keine Stockbilder gibt, und so ist es." },
          { title: "Angebotsanfrage", text: "Der Kunde markiert eine oder mehrere Leistungen, gibt Postleitzahl, Wunschtermin und Gebäudetyp an, fügt bis zu fünf Fotos hinzu oder hinterlässt eine Telefonnummer für einen Rückruf im gewählten Zeitfenster. Das Formular ist mit Cloudflare Turnstile gegen Spam geschützt." },
          { title: "Einsatzgebiet", text: "Die Regionen von Gent bis Antwerpen mit den Gemeinden in jeder und einer Suche „Arbeiten Sie in meiner Gemeinde?“." },
        ],
        more: [
          "Acht Leistungen mit eigener Seite: Vorgehen, Fragen, Tipps und verwandte Leistungen",
          "Bewertungen von Google und Trustlocal mit Link zu den Profilen",
          "Was den Preis bestimmt: Fläche, Erreichbarkeit, Verschmutzung",
          "Blog mit Tipps, nach Themen geordnet",
          "WhatsApp und Telefon von jeder Seite, auch in der Leiste auf dem Handy",
          "Cookie-Einstellungen, Datenschutz und AGB",
        ],
      },
      nl: {
        task: "Een jong schoonmaakbedrijf uit Gent wilde een Nederlandstalige website die echte resultaten toont en naar een gratis offerte leidt: acht diensten met eigen pagina's, een werkgebied in heel Vlaanderen en een formulier waarin de klant de diensten kiest, zegt waar het pand is en foto's stuurt.",
        site: [
          { title: "Voor en na", text: "Schuifbalken met foto's van eigen opdrachten: een veranda, een dak, dakpannen van dichtbij. De website zegt dat er geen stockbeelden zijn, en dat klopt." },
          { title: "Offerteaanvraag", text: "De klant vinkt een of meer diensten aan, vult postcode, gewenste termijn en type gebouw in, voegt tot vijf foto's toe of laat een nummer achter om teruggebeld te worden in een gekozen tijdvak. Het formulier is tegen spam beschermd met Cloudflare Turnstile." },
          { title: "Werkgebied", text: "De regio's van Gent tot Antwerpen met de gemeenten in elke regio en een zoekveld \"werken jullie in mijn gemeente\"." },
        ],
        more: [
          "Acht diensten met een eigen pagina: aanpak, vragen, tips en verwante diensten",
          "Beoordelingen van Google en Trustlocal met link naar de profielen",
          "Wat de prijs bepaalt: oppervlakte, bereikbaarheid, vervuilingsgraad",
          "Blog met tips, geordend per thema",
          "WhatsApp en telefoon vanaf elke pagina, ook in de balk op de telefoon",
          "Cookie-instellingen, privacybeleid en algemene voorwaarden",
        ],
      },
    },
  },

  "hotel-fenix": {
    site: ["/work/case/hotel-fenix-rooms.webp", "/work/case/hotel-fenix-reservation.webp", "/work/case/hotel-fenix-packages.webp"],
    copy: {
      bg: {
        task: "Семеен хотел в Чепеларе искаше сайт, който показва стаите, ресторанта и планината така, както ги усещат гостите, и събира запитвания за дати без онлайн плащане: собственикът потвърждава лично по имейл или телефон.",
        site: [
          { title: "Стаи и мезонети", text: "Четири типа с квадратура, легла и брой гости. Всяка стая има страница със снимки, разпределение, удобства и форма за запитване за дати." },
          { title: "Запитване за дати", text: "Настаняване и напускане, тип стая или „още не съм решил“, възрастни и деца, съобщение. Вляво е написано какво следва: проверка на наличността и потвърждение." },
          { title: "Пакети", text: "Десет пакета за лято, за двама, семейства, групи и зима с филтри по вид, какво включва всеки, валидност и минимален престой." },
        ],
        more: [
          "Ресторант с кухня, работно време и изба",
          "Галерия на хотела, стаите и града",
          "Локация със забележителности в района",
          "Viber и телефон от всяка страница",
          "Общи условия и поверителност",
        ],
      },
      en: {
        task: "A family hotel in Chepelare wanted a site that shows the rooms, the restaurant and the mountain the way guests experience them, and collects date enquiries without online payment: the owner confirms personally by email or phone.",
        site: [
          { title: "Rooms and maisonettes", text: "Four types with floor area, beds and number of guests. Every room has a page with photos, layout, amenities and a date enquiry form." },
          { title: "Date enquiry", text: "Check-in and check-out, room type or \"not decided yet\", adults and children, a message. On the left it says what happens next: an availability check and a confirmation." },
          { title: "Packages", text: "Ten packages for summer, couples, families, groups and winter with filters by type, what each includes, validity and minimum stay." },
        ],
        more: [
          "A restaurant page with the kitchen, opening hours and wine cellar",
          "A gallery of the hotel, the rooms and the town",
          "Location with sights in the area",
          "Viber and phone from every page",
          "Terms and privacy",
        ],
      },
      de: {
        task: "Ein Familienhotel in Tschepelare wollte eine Website, die Zimmer, Restaurant und Berge so zeigt, wie Gäste sie erleben, und Anfragen für Termine ohne Online-Zahlung sammelt: Der Inhaber bestätigt persönlich per E-Mail oder Telefon.",
        site: [
          { title: "Zimmer und Maisonetten", text: "Vier Typen mit Fläche, Betten und Gästezahl. Jedes Zimmer hat eine Seite mit Fotos, Aufteilung, Ausstattung und einem Anfrageformular für Termine." },
          { title: "Terminanfrage", text: "An- und Abreise, Zimmertyp oder „noch nicht entschieden“, Erwachsene und Kinder, Nachricht. Links steht, was danach passiert: Verfügbarkeitsprüfung und Bestätigung." },
          { title: "Pakete", text: "Zehn Pakete für Sommer, zu zweit, Familien, Gruppen und Winter mit Filtern nach Art, Leistungen, Gültigkeit und Mindestaufenthalt." },
        ],
        more: [
          "Restaurantseite mit Küche, Öffnungszeiten und Weinkeller",
          "Galerie von Hotel, Zimmern und Stadt",
          "Lage mit Sehenswürdigkeiten der Umgebung",
          "Viber und Telefon von jeder Seite",
          "AGB und Datenschutz",
        ],
      },
      nl: {
        task: "Een familiehotel in Chepelare wilde een website die de kamers, het restaurant en de bergen toont zoals gasten ze beleven, en aanvragen voor data verzamelt zonder online betaling: de eigenaar bevestigt persoonlijk per e-mail of telefoon.",
        site: [
          { title: "Kamers en maisonnettes", text: "Vier types met oppervlakte, bedden en aantal gasten. Elke kamer heeft een pagina met foto's, indeling, voorzieningen en een aanvraagformulier voor data." },
          { title: "Aanvraag voor data", text: "Aankomst en vertrek, kamertype of \"nog niet beslist\", volwassenen en kinderen, bericht. Links staat wat er daarna gebeurt: beschikbaarheid nakijken en bevestigen." },
          { title: "Arrangementen", text: "Tien arrangementen voor de zomer, voor twee, gezinnen, groepen en winter met filters per soort, wat elk omvat, geldigheid en minimumverblijf." },
        ],
        more: [
          "Restaurantpagina met keuken, openingsuren en wijnkelder",
          "Galerij van het hotel, de kamers en de stad",
          "Locatie met bezienswaardigheden in de buurt",
          "Viber en telefoon vanaf elke pagina",
          "Algemene voorwaarden en privacy",
        ],
      },
    },
  },

  "emis-cleaning": {
    site: ["/work/case/emis-cleaning-services.webp", "/work/case/emis-cleaning-book.webp", "/work/case/emis-cleaning-process.webp"],
    copy: {
      bg: {
        task: "Фирма за почистване в Югозападен Лондон искаше сайт, който вдъхва доверие на офиси и домакинства и превръща посещението в заявка: четири услуги, районите, които покрива, и резервация на почистване в три стъпки.",
        site: [
          { title: "Четири услуги", text: "Прозорци, офиси и магазини, почистване след строеж и основно почистване. Всяка има собствена страница със снимки преди и след." },
          { title: "Резервация в три стъпки", text: "Клиентът избира една или няколко услуги и колко често: еднократно, всяка седмица, на две седмици или месечно. Вдясно пише какво следва: преглед на заявката, потвърждение по телефона и екип на място." },
          { title: "Как работи", text: "Три стъпки от заявка до екип на адреса, със срок за отговор, и районите в Югозападен Лондон с пощенските им кодове." },
        ],
        more: [
          "Проекти със снимки от обекти",
          "Блог със съвети за наематели и офиси",
          "„Стандартът Emis“: проверени служители, гъвкави часове, екологични препарати, гаранция",
          "Телефон, имейл и бутон „Book a clean“ от всяка страница",
          "Политика за поверителност и общи условия",
        ],
      },
      en: {
        task: "A cleaning company in South West London wanted a site that earns the trust of offices and households and turns a visit into a request: four services, the areas it covers and booking a clean in three steps.",
        site: [
          { title: "Four services", text: "Windows, offices and retail, after-building cleaning and deep cleaning. Each has its own page with before and after photos." },
          { title: "Booking in three steps", text: "The client picks one or more services and how often: one-off, weekly, fortnightly or monthly. On the right it says what happens next: a review of the request, confirmation by phone and a team on site." },
          { title: "How it works", text: "Three steps from request to a team at the address, with a response time, and the areas in South West London with their postcodes." },
        ],
        more: [
          "Projects with photos from jobs",
          "A blog with tips for tenants and offices",
          "\"The Emis standard\": vetted staff, flexible hours, eco-friendly products, a guarantee",
          "Phone, email and a \"Book a clean\" button from every page",
          "Privacy policy and terms of service",
        ],
      },
      de: {
        task: "Ein Reinigungsunternehmen im Südwesten Londons wollte eine Website, die Büros und Haushalten Vertrauen gibt und den Besuch in eine Anfrage verwandelt: vier Leistungen, die abgedeckten Stadtteile und eine Buchung der Reinigung in drei Schritten.",
        site: [
          { title: "Vier Leistungen", text: "Fenster, Büros und Läden, Reinigung nach dem Bau und Grundreinigung. Jede hat eine eigene Seite mit Vorher-nachher-Fotos." },
          { title: "Buchung in drei Schritten", text: "Der Kunde wählt eine oder mehrere Leistungen und die Häufigkeit: einmalig, wöchentlich, alle zwei Wochen oder monatlich. Rechts steht, was danach passiert: Prüfung der Anfrage, Bestätigung per Telefon und Team vor Ort." },
          { title: "So läuft es ab", text: "Drei Schritte von der Anfrage bis zum Team an der Adresse, mit Antwortzeit, und die Stadtteile im Südwesten Londons mit ihren Postleitzahlen." },
        ],
        more: [
          "Projekte mit Fotos von Aufträgen",
          "Blog mit Tipps für Mieter und Büros",
          "„Der Emis-Standard“: geprüfte Mitarbeiter, flexible Zeiten, umweltfreundliche Mittel, Garantie",
          "Telefon, E-Mail und Button „Book a clean“ von jeder Seite",
          "Datenschutz und Nutzungsbedingungen",
        ],
      },
      nl: {
        task: "Een schoonmaakbedrijf in Zuidwest-Londen wilde een website die vertrouwen wekt bij kantoren en gezinnen en een bezoek omzet in een aanvraag: vier diensten, de wijken die het bedient en een schoonmaak boeken in drie stappen.",
        site: [
          { title: "Vier diensten", text: "Ramen, kantoren en winkels, schoonmaak na bouwwerken en grondige schoonmaak. Elke dienst heeft een eigen pagina met foto's voor en na." },
          { title: "Boeken in drie stappen", text: "De klant kiest een of meer diensten en hoe vaak: eenmalig, wekelijks, tweewekelijks of maandelijks. Rechts staat wat er daarna gebeurt: nazicht van de aanvraag, bevestiging per telefoon en een team ter plaatse." },
          { title: "Hoe het werkt", text: "Drie stappen van aanvraag tot een team op het adres, met antwoordtermijn, en de wijken in Zuidwest-Londen met hun postcodes." },
        ],
        more: [
          "Projecten met foto's van opdrachten",
          "Blog met tips voor huurders en kantoren",
          "\"De Emis-standaard\": gescreende medewerkers, flexibele uren, milieuvriendelijke producten, garantie",
          "Telefoon, e-mail en knop \"Book a clean\" vanaf elke pagina",
          "Privacybeleid en algemene voorwaarden",
        ],
      },
    },
  },

  "nn-bau": {
    site: ["/work/case/nn-bau-services.webp", "/work/case/nn-bau-projects.webp", "/work/case/nn-bau-anfrage.webp"],
    copy: {
      bg: {
        task: "Строителна фирма от Дуисбург за хидроизолация, саниране, сух строеж и демонтаж искаше сайт на немски, който обяснява кога коя изолация е правилната, показва истински обекти и прави запитването лесно: формуляр в три стъпки или направо в WhatsApp.",
        site: [
          { title: "Четири направления", text: "Хидроизолацията е акцентът, с три подстраници: мазета отвътре, балкони и тераси, външни стълби. До нея саниране, сух строеж и демонтаж, всяко със собствена страница." },
          { title: "Истински обекти", text: "Проекти със снимки и видео преди, по време и след: тераса, външна стълба, мазе с вода. На сайта пише, че няма стокови снимки, и е така." },
          { title: "Запитване в три стъпки", text: "Услуга, обект, контакт. Пощенски код и град стигат, снимки до пет, а въведеното се пази между стъпките. Който предпочита, отваря WhatsApp с вече попълненото." },
        ],
        more: [
          "Галерия от осем кадъра от строежи, подредени по раздели",
          "Процес в пет стъпки: запитване, оглед, оферта, изпълнение, приемане",
          "Въпросите, които клиентите задават преди запитване",
          "Гаранция от пет години, описана при хидроизолацията",
          "Импресум и защита на данните по немските изисквания",
        ],
      },
      en: {
        task: "A construction company from Duisburg for waterproofing, renovation, drywall and demolition wanted a German-language site that explains which waterproofing is the right one and when, shows real sites and makes the enquiry easy: a three-step form or straight to WhatsApp.",
        site: [
          { title: "Four areas of work", text: "Waterproofing is the focus, with three subpages: basements from the inside, balconies and terraces, outdoor stairs. Next to it renovation, drywall and demolition, each with its own page." },
          { title: "Real sites", text: "Projects with photos and video before, during and after: a terrace, an outdoor staircase, a basement with water. The site says there are no stock photos, and there are none." },
          { title: "Enquiry in three steps", text: "Service, property, contact. A postcode and town are enough, up to five photos, and what has been entered is kept between the steps. Those who prefer open WhatsApp with what they have already filled in." },
        ],
        more: [
          "A gallery of eight shots from building sites, sorted by section",
          "A five-step process: enquiry, site visit, quote, execution, hand-over",
          "The questions clients ask before enquiring",
          "A five-year guarantee, described with the waterproofing",
          "Imprint and data protection to German requirements",
        ],
      },
      de: {
        task: "Ein Bauunternehmen aus Duisburg für Abdichtung, Sanierung, Trockenbau und Abbruch wollte eine deutschsprachige Website, die erklärt, wann welche Abdichtung die richtige ist, echte Baustellen zeigt und die Anfrage leicht macht: ein Formular in drei Schritten oder direkt per WhatsApp.",
        site: [
          { title: "Vier Bereiche", text: "Die Abdichtung ist der Schwerpunkt, mit drei Unterseiten: Keller von innen, Balkone und Terrassen, Außentreppen. Daneben Sanierung, Trockenbau und Abbruch, jeweils mit eigener Seite." },
          { title: "Echte Baustellen", text: "Projekte mit Fotos und Videos vorher, währenddessen und nachher: Terrasse, Außentreppe, Keller mit Wasser. Die Website sagt, dass es keine Stockfotos gibt, und so ist es." },
          { title: "Anfrage in drei Schritten", text: "Leistung, Objekt, Kontakt. Postleitzahl und Ort reichen, bis zu fünf Fotos, und die Angaben bleiben zwischen den Schritten erhalten. Wer möchte, öffnet WhatsApp mit dem bereits Ausgefüllten." },
        ],
        more: [
          "Galerie mit acht Aufnahmen von Baustellen, nach Bereichen geordnet",
          "Ablauf in fünf Schritten: Anfrage, Besichtigung, Angebot, Ausführung, Abnahme",
          "Die Fragen, die Kunden vor der Anfrage stellen",
          "Fünf Jahre Garantie, beschrieben bei der Abdichtung",
          "Impressum und Datenschutz nach deutschen Vorgaben",
        ],
      },
      nl: {
        task: "Een bouwbedrijf uit Duisburg voor waterdichting, renovatie, gipskarton en sloop wilde een Duitstalige website die uitlegt wanneer welke waterdichting de juiste is, echte werven toont en de aanvraag makkelijk maakt: een formulier in drie stappen of rechtstreeks via WhatsApp.",
        site: [
          { title: "Vier domeinen", text: "Waterdichting is de focus, met drie subpagina's: kelders van binnenuit, balkons en terrassen, buitentrappen. Daarnaast renovatie, gipskarton en sloop, elk met een eigen pagina." },
          { title: "Echte werven", text: "Projecten met foto's en video voor, tijdens en na: een terras, een buitentrap, een kelder met water. De website zegt dat er geen stockfoto's zijn, en dat klopt." },
          { title: "Aanvraag in drie stappen", text: "Dienst, pand, contact. Postcode en gemeente volstaan, tot vijf foto's, en wat is ingevuld blijft bewaard tussen de stappen. Wie dat verkiest, opent WhatsApp met wat al ingevuld is." },
        ],
        more: [
          "Galerij van acht beelden van werven, geordend per onderdeel",
          "Proces in vijf stappen: aanvraag, plaatsbezoek, offerte, uitvoering, oplevering",
          "De vragen die klanten stellen voor ze een aanvraag doen",
          "Vijf jaar garantie, beschreven bij de waterdichting",
          "Impressum en gegevensbescherming volgens de Duitse vereisten",
        ],
      },
    },
  },
};
