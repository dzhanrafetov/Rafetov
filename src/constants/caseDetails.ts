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
  adminIntro: string;
  /** Описание под всеки скрийншот на панела, по ред на `admin`. */
  admin: { title: string; text: string }[];
  /** Още възможности на панела, без картинка. */
  more: string[];
  /** Роли в платформата (само ЦЗПО). */
  roles?: { name: string; text: string }[];
};

export type CaseDetail = {
  site: string[];
  admin: string[];
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
};
