import type { Lang } from "../i18n/types";

/**
 * Съдържание на страницата на всеки проект: какво включва сайтът, на четирите езика.
 * Само проверими неща от самия сайт — без измислени „проблеми“ и „резултати“.
 * Уводът на страницата е описанието от i18n (work.projects), а фактите (тип, държава, езици) идват от projects.ts.
 */
export type CaseStudy = Record<Lang, { includes: string[] }>;

const cs = (bg: string[], en: string[], de: string[], nl: string[]): CaseStudy => ({
  bg: { includes: bg }, en: { includes: en }, de: { includes: de }, nl: { includes: nl },
});

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "chef-resat-site": cs(
    ["Представяне на кухнята и атмосферата със снимки", "Работно време, адрес и телефон с едно докосване", "Връзка към дигиталното меню на три езика"],
    ["Cuisine and atmosphere presented with photos", "Opening hours, address and one-tap phone", "Link to the digital menu in three languages"],
    ["Küche und Atmosphäre mit Fotos vorgestellt", "Öffnungszeiten, Adresse und Telefon mit einem Tipp", "Link zur digitalen Speisekarte in drei Sprachen"],
    ["Keuken en sfeer gepresenteerd met foto’s", "Openingsuren, adres en telefoon met één tik", "Link naar de digitale menukaart in drie talen"],
  ),
  vulcho: cs(
    ["Каталог с месарски продукти и онлайн поръчка", "Лоялна програма, промокодове и ваучери", "AI рецепти към продуктите", "Админ панел за поръчки и наличности"],
    ["Butcher product catalogue with online ordering", "Loyalty programme, promo codes and vouchers", "AI recipes linked to products", "Admin panel for orders and stock"],
    ["Produktkatalog mit Online-Bestellung", "Treueprogramm, Gutscheincodes und Wertgutscheine", "KI-Rezepte zu den Produkten", "Admin-Bereich für Bestellungen und Lager"],
    ["Productcatalogus met online bestellen", "Loyaliteitsprogramma, promocodes en vouchers", "AI-recepten bij de producten", "Beheerpaneel voor bestellingen en voorraad"],
  ),
  zirve1: cs(
    ["Каталог с металдетектори и аксесоари", "Онлайн поръчка с доставка до държави в Европа", "Страници с характеристики и сравнение на модели"],
    ["Metal detector and accessory catalogue", "Online ordering with delivery across Europe", "Specification pages and model comparison"],
    ["Katalog mit Metalldetektoren und Zubehör", "Online-Bestellung mit Lieferung in ganz Europa", "Datenblätter und Modellvergleich"],
    ["Catalogus met metaaldetectoren en accessoires", "Online bestellen met levering in heel Europa", "Specificatiepagina’s en modelvergelijking"],
  ),
  "emis-cleaning": cs(
    ["Услуги за почистване с ясни описания и цени", "Бърза онлайн резервация", "Оптимизиран за търсения в Лондон"],
    ["Cleaning services with clear descriptions and prices", "Fast online booking", "Optimised for searches in London"],
    ["Reinigungsleistungen mit klaren Beschreibungen und Preisen", "Schnelle Online-Buchung", "Optimiert für Suchanfragen in London"],
    ["Schoonmaakdiensten met duidelijke beschrijvingen en prijzen", "Snel online boeken", "Geoptimaliseerd voor zoekopdrachten in Londen"],
  ),
  santander: cs(
    ["Форма за резервация на такси в няколко стъпки", "Телефон и WhatsApp с едно докосване", "Представяне на маршрути и услуги"],
    ["Multi-step taxi booking form", "One-tap phone and WhatsApp", "Routes and services presented"],
    ["Taxi-Buchungsformular in mehreren Schritten", "Telefon und WhatsApp mit einem Tipp", "Strecken und Leistungen vorgestellt"],
    ["Taxireservering in enkele stappen", "Telefoon en WhatsApp met één tik", "Routes en diensten gepresenteerd"],
  ),
  beca: cs(
    ["Услуги по преместване и почистване в Мюнхен", "Форма за оферта", "Сайт на немски език"],
    ["Moving and cleaning services in Munich", "Quote request form", "Website in German"],
    ["Umzugs- und Reinigungsleistungen in München", "Formular für Angebotsanfrage", "Webseite auf Deutsch"],
    ["Verhuis- en schoonmaakdiensten in München", "Offerteformulier", "Website in het Duits"],
  ),
  "amalfi-menu": cs(
    ["Меню на норвежки и английски", "Категории, снимки и алергени", "Промени от телефона без нов печат"],
    ["Menu in Norwegian and English", "Categories, photos and allergens", "Updates from a phone, no reprinting"],
    ["Speisekarte auf Norwegisch und Englisch", "Kategorien, Fotos und Allergene", "Änderungen vom Handy, ohne Neudruck"],
    ["Menukaart in het Noors en Engels", "Categorieën, foto’s en allergenen", "Aanpassen vanaf de telefoon, zonder herdruk"],
  ),
  "chef-resat-menu": cs(
    ["Меню на български, турски и английски", "Категории, снимки и цени", "QR кодове за масите"],
    ["Menu in Bulgarian, Turkish and English", "Categories, photos and prices", "QR codes for the tables"],
    ["Speisekarte auf Bulgarisch, Türkisch und Englisch", "Kategorien, Fotos und Preise", "QR-Codes für die Tische"],
    ["Menukaart in het Bulgaars, Turks en Engels", "Categorieën, foto’s en prijzen", "QR-codes voor de tafels"],
  ),
  "pancetita-menu": cs(
    ["Меню на норвежки и английски", "Пици, категории и алергени", "Бърза промяна на цени от телефона"],
    ["Menu in Norwegian and English", "Pizzas, categories and allergens", "Quick price changes from a phone"],
    ["Speisekarte auf Norwegisch und Englisch", "Pizzen, Kategorien und Allergene", "Schnelle Preisänderungen vom Handy"],
    ["Menukaart in het Noors en Engels", "Pizza’s, categorieën en allergenen", "Snel prijzen aanpassen vanaf de telefoon"],
  ),
  "abi-studio": cs(
    ["Процедури с описание, продължителност и цени", "Представяне на апаратурата", "Контакт и запазване на час"],
    ["Treatments with description, duration and prices", "Equipment presented", "Contact and appointment request"],
    ["Behandlungen mit Beschreibung, Dauer und Preisen", "Geräte vorgestellt", "Kontakt und Terminanfrage"],
    ["Behandelingen met beschrijving, duur en prijzen", "Apparatuur gepresenteerd", "Contact en afspraak aanvragen"],
  ),
  metesso: cs(
    ["Каталог с колекции мебели по помещения", "Галерии на шоурума", "Форма за запитване и адрес с карта"],
    ["Furniture collections catalogue by room", "Showroom galleries", "Enquiry form and address with map"],
    ["Möbelkatalog nach Räumen", "Galerien des Showrooms", "Anfrageformular und Adresse mit Karte"],
    ["Meubelcatalogus per ruimte", "Galerijen van de showroom", "Aanvraagformulier en adres met kaart"],
  ),
  "opaka-fits": cs(
    ["Басейн, ресторант и стаи на един сайт", "Дигитално меню на ресторанта", "Заявка за резервация"],
    ["Pool, restaurant and rooms on one site", "Digital menu for the restaurant", "Booking request"],
    ["Pool, Restaurant und Zimmer auf einer Webseite", "Digitale Speisekarte des Restaurants", "Reservierungsanfrage"],
    ["Zwembad, restaurant en kamers op één website", "Digitale menukaart van het restaurant", "Reserveringsaanvraag"],
  ),
  taupe: cs(
    ["Представяне на жилищния проект с визуализации", "Планове и характеристики на имотите", "Форма за запитване"],
    ["Residential project presented with renders", "Floor plans and property details", "Enquiry form"],
    ["Wohnprojekt mit Visualisierungen", "Grundrisse und Objektdaten", "Anfrageformular"],
    ["Woonproject gepresenteerd met visualisaties", "Plattegronden en kenmerken", "Aanvraagformulier"],
  ),
  "azteca-site": cs(
    ["Каталог с премиум пури и запалки", "Онлайн поръчка и доставка", "Проверка за възраст при вход"],
    ["Premium cigar and lighter catalogue", "Online ordering and delivery", "Age verification on entry"],
    ["Katalog mit Premium-Zigarren und Feuerzeugen", "Online-Bestellung und Lieferung", "Altersprüfung beim Aufruf"],
    ["Catalogus met premium sigaren en aanstekers", "Online bestellen en levering", "Leeftijdscontrole bij binnenkomst"],
  ),
  "dudo-group": cs(
    ["Каталог със строителни материали по категории", "Представяне на магазините и контакти", "Запитване за наличност и цена"],
    ["Building materials catalogue by category", "Stores and contacts presented", "Availability and price enquiry"],
    ["Baustoffkatalog nach Kategorien", "Filialen und Kontakte", "Anfrage zu Verfügbarkeit und Preis"],
    ["Catalogus bouwmaterialen per categorie", "Winkels en contact", "Aanvraag voor beschikbaarheid en prijs"],
  ),
  "het-pitta-loft": cs(
    ["Вградена резервационна система", "Имейл известия за гостите и ресторанта", "Управление на резервациите от собственика"],
    ["Built-in reservation system", "Email notifications for guests and the restaurant", "Reservation management by the owner"],
    ["Integriertes Reservierungssystem", "E-Mail-Benachrichtigungen für Gäste und Restaurant", "Reservierungsverwaltung durch den Inhaber"],
    ["Ingebouwd reserveringssysteem", "E-mailmeldingen voor gasten en restaurant", "Reserveringsbeheer door de eigenaar"],
  ),
  "pet-zvezdi": cs(
    ["Каталог с налични автомобили", "Внос от Канада, Европа и Южна Корея", "Форма за поръчка на конкретен автомобил"],
    ["Catalogue of available cars", "Imports from Canada, Europe and South Korea", "Order form for a specific vehicle"],
    ["Katalog verfügbarer Fahrzeuge", "Import aus Kanada, Europa und Südkorea", "Bestellformular für ein bestimmtes Fahrzeug"],
    ["Catalogus van beschikbare auto’s", "Import uit Canada, Europa en Zuid-Korea", "Bestelformulier voor een specifieke auto"],
  ),
  "hh-edelstahl": cs(
    ["Изделия от неръждаема стомана и вентилация", "Лазерно и водоструйно рязане по поръчка", "Форма за оферта на немски"],
    ["Stainless steel products and ventilation", "Laser and waterjet cutting to order", "Quote form in German"],
    ["Edelstahlprodukte und Lüftung", "Laser- und Wasserstrahlschneiden nach Maß", "Angebotsformular auf Deutsch"],
    ["Roestvrijstalen producten en ventilatie", "Laser- en waterstraalsnijden op maat", "Offerteformulier in het Duits"],
  ),
  primasell: cs(
    ["Печат, брандиране и персонализирани подаръци", "Галерия с реализирани поръчки", "Система за запитвания"],
    ["Printing, branding and personalised gifts", "Gallery of completed orders", "Enquiry system"],
    ["Druck, Branding und personalisierte Geschenke", "Galerie mit ausgeführten Aufträgen", "Anfragesystem"],
    ["Drukwerk, branding en gepersonaliseerde geschenken", "Galerij met uitgevoerde bestellingen", "Aanvraagsysteem"],
  ),
  szo: cs(
    ["Камери, алармени системи и рекордери", "Онлайн поръчка", "Запитване за монтаж"],
    ["Cameras, alarm systems and recorders", "Online ordering", "Installation request"],
    ["Kameras, Alarmanlagen und Rekorder", "Online-Bestellung", "Montageanfrage"],
    ["Camera’s, alarmsystemen en recorders", "Online bestellen", "Installatieaanvraag"],
  ),
  "24tours": cs(
    ["Онлайн резервации и плащания за турове", "Подаръчни ваучери, промокодове и отстъпки", "Админ панел за турове и дати"],
    ["Online tour bookings and payments", "Gift vouchers, promo codes and discounts", "Admin panel for tours and dates"],
    ["Online-Buchung und Bezahlung von Touren", "Geschenkgutscheine, Gutscheincodes und Rabatte", "Admin-Bereich für Touren und Termine"],
    ["Online boeken en betalen van tours", "Cadeaubonnen, promocodes en kortingen", "Beheerpaneel voor tours en data"],
  ),
  "hustle-clothing": cs(
    ["Каталог с дрехи по категории и размери", "Админ панел за продукти, промокодове и разпродажби", "Поръчка и доставка"],
    ["Clothing catalogue by category and size", "Admin panel for products, promo codes and sales", "Ordering and delivery"],
    ["Bekleidungskatalog nach Kategorie und Größe", "Admin-Bereich für Produkte, Gutscheincodes und Sales", "Bestellung und Lieferung"],
    ["Kledingcatalogus per categorie en maat", "Beheerpaneel voor producten, promocodes en uitverkoop", "Bestellen en levering"],
  ),
  shop4home: cs(
    ["Широк асортимент за дома по категории", "Удобна поръчка от телефон", "Админ панел за поръчки, продукти и категории"],
    ["Wide home product range by category", "Easy ordering from a phone", "Admin panel for orders, products and categories"],
    ["Breites Sortiment für Haushalt und Wohnen", "Bequeme Bestellung vom Handy", "Admin-Bereich für Bestellungen, Produkte und Kategorien"],
    ["Breed assortiment voor thuis per categorie", "Eenvoudig bestellen vanaf de telefoon", "Beheerpaneel voor bestellingen, producten en categorieën"],
  ),
  "korn-metal": cs(
    ["Каталог с метали и термопанели", "Портфолио от метални конструкции", "Система за запитвания"],
    ["Metal and thermal panel catalogue", "Portfolio of metal structures", "Enquiry system"],
    ["Katalog für Metalle und Thermopaneele", "Referenzen im Metallbau", "Anfragesystem"],
    ["Catalogus metalen en thermopanelen", "Portfolio van metaalconstructies", "Aanvraagsysteem"],
  ),
  "hotel-fenix": cs(
    ["Стаи, ресторант и пакети със снимки", "Галерия на хотела", "Система за резервационни запитвания"],
    ["Rooms, restaurant and packages with photos", "Hotel gallery", "Booking enquiry system"],
    ["Zimmer, Restaurant und Pakete mit Fotos", "Galerie des Hotels", "System für Reservierungsanfragen"],
    ["Kamers, restaurant en arrangementen met foto’s", "Galerij van het hotel", "Systeem voor reserveringsaanvragen"],
  ),
  slapfight: cs(
    ["Продажба на билети за събития онлайн", "Бърза покупка от телефон", "Информация за всяко събитие"],
    ["Online event ticket sales", "Fast checkout from a phone", "Information for every event"],
    ["Online-Ticketverkauf für Veranstaltungen", "Schneller Kauf vom Handy", "Informationen zu jedem Event"],
    ["Online ticketverkoop voor evenementen", "Snel afrekenen vanaf de telefoon", "Informatie over elk evenement"],
  ),
  "mig-group": cs(
    ["Кадастър, трасиране и заснемане с дрон", "3D лазерно сканиране", "Форма за запитване за обект"],
    ["Cadastre, setting out and drone surveying", "3D laser scanning", "Project enquiry form"],
    ["Kataster, Absteckung und Drohnenvermessung", "3D-Laserscanning", "Anfrageformular für Projekte"],
    ["Kadaster, uitzetten en dronemetingen", "3D-laserscanning", "Aanvraagformulier voor een project"],
  ),
  "innenausbau-ahmedov": cs(
    ["Довършителни работи с портфолио от проекти", "Форма за оферта", "Сайт на немски език за Ханау и района"],
    ["Interior finishing with a project portfolio", "Quote request form", "German-language site for Hanau and the area"],
    ["Innenausbau mit Projektreferenzen", "Angebotsformular", "Deutschsprachige Webseite für Hanau und Umgebung"],
    ["Afwerking met een projectportfolio", "Offerteformulier", "Duitstalige website voor Hanau en omgeving"],
  ),
  "nn-bau": cs(
    ["Хидроизолация, саниране, гипсокартон и демонтаж", "Ясно представяне на всяка услуга", "Форма за оферта на немски"],
    ["Waterproofing, renovation, drywall and demolition", "Clear presentation of each service", "Quote form in German"],
    ["Abdichtung, Sanierung, Trockenbau und Abbruch", "Klare Darstellung jeder Leistung", "Angebotsformular auf Deutsch"],
    ["Waterdichting, renovatie, gyproc en sloop", "Duidelijke presentatie van elke dienst", "Offerteformulier in het Duits"],
  ),
  "alpha-reiniging": cs(
    ["Прозорци, покриви, фасади и соларни панели", "Заявка за оферта в няколко стъпки", "Сайт на нидерландски за Гент и региона"],
    ["Windows, roofs, facades and solar panels", "Multi-step quote request", "Dutch-language site for Ghent and the region"],
    ["Fenster, Dächer, Fassaden und Solaranlagen", "Angebotsanfrage in mehreren Schritten", "Niederländische Webseite für Gent und Umgebung"],
    ["Ramen, daken, gevels en zonnepanelen", "Offerteaanvraag in enkele stappen", "Nederlandstalige website voor Gent en omstreken"],
  ),
  "active-solar": cs(
    ["Каталог с панели, инвертори и батерии", "Соларен калкулатор", "Клиентски профил с гаранции и сервиз", "Две езикови версии"],
    ["Panel, inverter and battery catalogue", "Solar calculator", "Client account with warranties and service", "Two language versions"],
    ["Katalog für Module, Wechselrichter und Speicher", "Solarrechner", "Kundenkonto mit Garantie und Service", "Zwei Sprachversionen"],
    ["Catalogus panelen, omvormers en batterijen", "Zonnecalculator", "Klantaccount met garanties en service", "Twee taalversies"],
  ),
  "creative-homes": cs(
    ["Портфолио с реализирани проекти", "Сравнение преди/след", "Блог", "Форма за оферта по площ и бюджет"],
    ["Portfolio of completed projects", "Before/after comparisons", "Blog", "Quote form by area and budget"],
    ["Portfolio mit umgesetzten Projekten", "Vorher-nachher-Vergleiche", "Blog", "Angebotsformular nach Fläche und Budget"],
    ["Portfolio van uitgevoerde projecten", "Voor/na-vergelijkingen", "Blog", "Offerteformulier op basis van oppervlakte en budget"],
  ),
  jitara: cs(
    ["Каталог с хляб, брашно, закуски и сладкиши", "Страница за проектите, съфинансирани от ЕС", "Две езикови версии"],
    ["Bread, flour, snacks and sweets catalogue", "Page for the EU co-funded projects", "Two language versions"],
    ["Katalog für Brot, Mehl, Snacks und Süßwaren", "Seite zu den EU-kofinanzierten Projekten", "Zwei Sprachversionen"],
    ["Catalogus brood, meel, snacks en zoetwaren", "Pagina voor de door de EU medegefinancierde projecten", "Twee taalversies"],
  ),
  "pachka-stil": cs(
    ["Услуги с реални снимки преди и след", "Форма за оглед и оферта", "Връзка по WhatsApp с едно докосване", "Оптимизиран за търсения в района"],
    ["Services with real before/after photos", "Inspection and quote form", "One-tap WhatsApp contact", "Optimised for local searches"],
    ["Leistungen mit echten Vorher-nachher-Fotos", "Formular für Besichtigung und Angebot", "WhatsApp-Kontakt mit einem Tipp", "Optimiert für lokale Suchanfragen"],
    ["Diensten met echte voor/na-foto’s", "Formulier voor plaatsbezoek en offerte", "WhatsApp-contact met één tik", "Geoptimaliseerd voor lokale zoekopdrachten"],
  ),
  kapisel: cs(
    ["14 марки с филтри по марка и проблем на косата", "Поръчка без регистрация", "Наложен платеж, Еконт и Спиди"],
    ["14 brands with filters by brand and hair concern", "Ordering without registration", "Cash on delivery and courier shipping"],
    ["14 Marken mit Filtern nach Marke und Haarproblem", "Bestellung ohne Registrierung", "Nachnahme und Kurierversand"],
    ["14 merken met filters op merk en haarprobleem", "Bestellen zonder registratie", "Rembours en koerierslevering"],
  ),
  aloeway: cs(
    ["Продуктите на LR с абонаментни пакети", "Месечна доставка", "Поръчка без регистрация", "Страница за бизнес партньорство"],
    ["LR products with subscription packages", "Monthly delivery", "Ordering without registration", "Business partnership page"],
    ["LR-Produkte mit Abo-Paketen", "Monatliche Lieferung", "Bestellung ohne Registrierung", "Seite zur Geschäftspartnerschaft"],
    ["LR-producten met abonnementspakketten", "Maandelijkse levering", "Bestellen zonder registratie", "Pagina voor zakelijk partnerschap"],
  ),
  czpo: cs(
    ["Профили за администратори, преподаватели, курсисти и инспектори", "Онлайн кандидатстване, учебни групи и график", "Онлайн уроци с отчет на присъствието", "Учебни материали и тестове с автоматична проверка"],
    ["Accounts for admins, teachers, students and inspectors", "Online applications, training groups and schedules", "Live online lessons with attendance reports", "Course materials and tests with automatic scoring"],
    ["Bereiche für Administratoren, Lehrkräfte, Teilnehmende und Prüfer", "Online-Bewerbung, Kursgruppen und Stundenpläne", "Live-Unterricht mit Anwesenheitsberichten", "Lernmaterialien und Tests mit automatischer Auswertung"],
    ["Accounts voor beheerders, docenten, cursisten en inspecteurs", "Online inschrijven, lesgroepen en roosters", "Online lessen met aanwezigheidsrapporten", "Lesmateriaal en toetsen met automatische verbetering"],
  ),
};
