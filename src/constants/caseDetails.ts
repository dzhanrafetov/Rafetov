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
  /** Преди и след: само при проекти, в които сменихме стар сайт на клиента. */
  before?: { intro: string; old: string[]; new: string[] };
};

export type CaseDetail = {
  site: string[];
  /** Скрийншоти на панела; липсва при проекти без собствен панел — тогава остават задачата, сайтът и списъкът „Още в проекта“. */
  admin?: string[];
  /** Скрийншотите на панела са от демо данни (локална версия), не от истинския панел. */
  demo?: boolean;
  /**
   * Старият сайт на клиента до новия (снимки 1200×750 на началните страници, заснети на 2026-11-06).
   * Минусите на стария сайт в `copy.before.old` са само проверими неща от самия сайт.
   */
  before?: { oldImg: string; oldHost: string; newImg: string; newHost: string };
  copy: Partial<Record<Lang, CaseCopy>>;
};

export const CASE_DETAILS: Record<string, CaseDetail> = {
  "gs-aluminium": {
    site: ["/work/case/gs-aluminium-configurator.webp", "/work/case/gs-aluminium-chooser.webp", "/work/case/gs-aluminium-offer.webp", "/work/case/gs-aluminium-projects.webp"],
    before: { oldImg: "/work/case/gs-aluminium-old.webp", oldHost: "gsaluminium.eu", newImg: "/work/case/gs-aluminium-new.webp", newHost: "gsaluminium.com" },
    copy: {
      bg: {
        task: "GS Aluminium от Русе изработва и монтира зимни градини, перголи, веранди, навеси, плъзгащи системи и дограма, след повече от 15 години работа в Германия и Холандия. Старият им сайт не показваше нищо от това: начална страница с един лозунг и галерия без описания. Искаха нов сайт, който обяснява всяка система, показва истинските обекти и води клиента до безплатен оглед.",
        before: {
          intro: "Старият сайт на gsaluminium.eu беше WordPress тема с четири страници. Направихме изцяло нова визия, ново съдържание и нова структура на gsaluminium.com.",
          old: [
            "Началната страница е един екран с лозунга „Прозорецът към бъдещето“ и не казва какво прави фирмата",
            "При първо влизане прозорец за съгласия с четири превключвателя закрива целия сайт",
            "Услугите са три кратки реда на страницата „За нас“, без отделна страница за никоя",
            "Проектите са снимки без категории и без нито дума текст",
            "Запитването е само обща форма, без Viber и WhatsApp",
            "Заглавието в Google е „Начало - GS Aluminium“, без услуга и без град",
          ],
          new: [
            "Още първият екран казва какво, къде и как: системите, Русе и цяла България, безплатен оглед",
            "Отделна страница за всяка от осемте системи с видове, обекти и подробно описание",
            "3D конфигуратор, който изпраща готова спецификация заедно със запитването",
            "Обекти, филтрирани по вид система, и видео от монтирани конструкции",
            "Запитване в три стъпки със снимки на мястото, плюс Viber, WhatsApp и телефон на всяка страница",
            "Четири езика и заглавия за Google по услуга и град",
          ],
        },
        site: [
          { title: "3D конфигуратор", text: "Клиентът избира пергола, веранда, зимна градина или навес, задава размери, покрив, ламели, цвят и странично затваряне и вижда модела веднага. Конфигурацията тръгва с формата за оферта, вместо да се обяснява по телефона." },
          { title: "Помощ при избора", text: "Който не знае как се казва това, което иска, избира целта: още една стая за цялата година, покрита тераса, сянка, защита за колата. Сайтът показва подходящите системи." },
          { title: "Запитване за безплатен оглед", text: "Три стъпки: какво ви интересува, къде е обектът и как да се свържем. По желание срок, вид обект и до пет снимки на мястото, за да е офертата точна още след първия разговор." },
          { title: "Реални обекти", text: "Снимки само от обекти, които фирмата е изработила и монтирала сама, с филтър по вид система, и кратки видеа от готови конструкции. Всяка услуга показва и своите обекти." },
        ],
        more: [
          "Страница за всяка система: зимни градини, веранди, перголи, навеси, плъзгащи системи, дограма, врати, ZIP щори",
          "Блог със съвети: цена на зимна градина, отопление, избор на пергола и други",
          "„Какво включва безплатният оглед“ и „От какво зависи цената“",
          "Процес в четири стъпки: оглед, оферта, изработка, монтаж",
          "Български, немски, английски и турски",
          "Шоурум в Русе с адрес и упътване",
        ],
      },
      en: {
        task: "GS Aluminium from Ruse makes and installs conservatories, pergolas, verandas, carports, sliding systems and windows, after more than 15 years of work in Germany and the Netherlands. Their old site showed none of this: a home page with one slogan and a gallery without descriptions. They wanted a new site that explains every system, shows the real projects and leads the client to a free site visit.",
        before: {
          intro: "The old site on gsaluminium.eu was a WordPress theme with four pages. We built a completely new look, new content and a new structure on gsaluminium.com.",
          old: [
            "The home page is one screen with the slogan \"The window to the future\" and does not say what the company does",
            "On the first visit a consent window with four switches covers the whole site",
            "The services are three short lines on the \"About us\" page, with no page of their own",
            "The projects are photos without categories and without a single word of text",
            "Enquiries go only through a general form, with no Viber or WhatsApp",
            "The title in Google is \"Начало - GS Aluminium\" (\"Home\"), with no service and no town",
          ],
          new: [
            "The very first screen says what, where and how: the systems, Ruse and all of Bulgaria, a free site visit",
            "A separate page for each of the eight systems with types, projects and a detailed description",
            "A 3D configurator that sends a ready specification together with the enquiry",
            "Projects filtered by type of system, and video of installed structures",
            "A three-step enquiry with photos of the place, plus Viber, WhatsApp and phone on every page",
            "Four languages and Google titles by service and town",
          ],
        },
        site: [
          { title: "3D configurator", text: "The client picks a pergola, veranda, conservatory or carport, sets the size, roof, louvres, colour and side enclosure and sees the model straight away. The configuration goes with the quote form instead of being explained over the phone." },
          { title: "Help choosing", text: "Anyone who does not know what the thing they want is called picks the goal: an extra room for the whole year, a covered terrace, shade, protection for the car. The site shows the systems that fit." },
          { title: "Request for a free site visit", text: "Three steps: what you are interested in, where the property is and how to reach you. Optionally a timeframe, the type of property and up to five photos of the place, so the quote is accurate after the first conversation." },
          { title: "Real projects", text: "Photos only of projects the company made and installed itself, with a filter by type of system, and short videos of finished structures. Every service also shows its own projects." },
        ],
        more: [
          "A page for each system: conservatories, verandas, pergolas, carports, sliding systems, windows, doors, ZIP screens",
          "A blog with advice: the cost of a conservatory, heating, choosing a pergola and more",
          "\"What the free site visit includes\" and \"What the price depends on\"",
          "A four-step process: site visit, quote, manufacturing, installation",
          "Bulgarian, German, English and Turkish",
          "Showroom in Ruse with address and directions",
        ],
      },
      de: {
        task: "GS Aluminium aus Russe fertigt und montiert Wintergärten, Pergolen, Terrassendächer, Carports, Schiebesysteme und Fenster, nach mehr als 15 Jahren Arbeit in Deutschland und den Niederlanden. Die alte Website zeigte nichts davon: eine Startseite mit einem Slogan und eine Galerie ohne Beschreibungen. Gewünscht war eine neue Website, die jedes System erklärt, echte Projekte zeigt und den Kunden zum kostenlosen Vor-Ort-Termin führt.",
        before: {
          intro: "Die alte Website auf gsaluminium.eu war ein WordPress-Theme mit vier Seiten. Wir haben auf gsaluminium.com einen komplett neuen Auftritt mit neuen Inhalten und neuer Struktur gebaut.",
          old: [
            "Die Startseite ist ein Bildschirm mit dem Slogan „Das Fenster zur Zukunft“ und sagt nicht, was die Firma macht",
            "Beim ersten Besuch verdeckt ein Einwilligungsfenster mit vier Schaltern die ganze Website",
            "Die Leistungen sind drei kurze Zeilen auf der Seite „Über uns“, ohne eigene Seite",
            "Die Projekte sind Fotos ohne Kategorien und ohne ein Wort Text",
            "Anfragen nur über ein allgemeines Formular, ohne Viber oder WhatsApp",
            "Der Titel in Google lautet „Начало - GS Aluminium“ („Start“), ohne Leistung und ohne Ort",
          ],
          new: [
            "Schon der erste Bildschirm sagt was, wo und wie: die Systeme, Russe und ganz Bulgarien, kostenloser Vor-Ort-Termin",
            "Eine eigene Seite für jedes der acht Systeme mit Arten, Projekten und ausführlicher Beschreibung",
            "Ein 3D-Konfigurator, der eine fertige Spezifikation mit der Anfrage sendet",
            "Projekte nach Systemart gefiltert und Videos von montierten Konstruktionen",
            "Anfrage in drei Schritten mit Fotos vom Ort, dazu Viber, WhatsApp und Telefon auf jeder Seite",
            "Vier Sprachen und Google-Titel nach Leistung und Ort",
          ],
        },
        site: [
          { title: "3D-Konfigurator", text: "Der Kunde wählt Pergola, Terrassendach, Wintergarten oder Carport, stellt Maße, Dach, Lamellen, Farbe und seitlichen Abschluss ein und sieht das Modell sofort. Die Konfiguration geht mit dem Angebotsformular mit, statt am Telefon erklärt zu werden." },
          { title: "Hilfe bei der Wahl", text: "Wer nicht weiß, wie das heißt, was er möchte, wählt das Ziel: ein zusätzlicher Raum fürs ganze Jahr, eine überdachte Terrasse, Schatten, Schutz fürs Auto. Die Website zeigt die passenden Systeme." },
          { title: "Anfrage für einen Vor-Ort-Termin", text: "Drei Schritte: was Sie interessiert, wo das Objekt ist und wie wir Sie erreichen. Optional Zeitrahmen, Objektart und bis zu fünf Fotos vom Ort, damit das Angebot schon nach dem ersten Gespräch genau ist." },
          { title: "Echte Projekte", text: "Nur Fotos von Projekten, die die Firma selbst gefertigt und montiert hat, mit Filter nach Systemart, und kurze Videos fertiger Konstruktionen. Jede Leistung zeigt auch ihre eigenen Projekte." },
        ],
        more: [
          "Eine Seite pro System: Wintergärten, Terrassendächer, Pergolen, Carports, Schiebesysteme, Fenster, Türen, ZIP-Screens",
          "Ein Blog mit Ratgebern: Kosten eines Wintergartens, Heizung, Wahl der Pergola und mehr",
          "„Was der kostenlose Vor-Ort-Termin umfasst“ und „Wovon der Preis abhängt“",
          "Ablauf in vier Schritten: Termin, Angebot, Fertigung, Montage",
          "Bulgarisch, Deutsch, Englisch und Türkisch",
          "Showroom in Russe mit Adresse und Anfahrt",
        ],
      },
      nl: {
        task: "GS Aluminium uit Roese maakt en plaatst serres, pergola's, veranda's, carports, schuifsystemen en ramen, na meer dan 15 jaar werk in Duitsland en Nederland. De oude website toonde daar niets van: een startpagina met één slogan en een galerij zonder beschrijvingen. Ze wilden een nieuwe website die elk systeem uitlegt, de echte projecten toont en de klant naar een gratis plaatsbezoek leidt.",
        before: {
          intro: "De oude website op gsaluminium.eu was een WordPress-thema met vier pagina's. We bouwden een volledig nieuwe uitstraling, nieuwe inhoud en een nieuwe structuur op gsaluminium.com.",
          old: [
            "De startpagina is één scherm met de slogan \"Het venster naar de toekomst\" en zegt niet wat het bedrijf doet",
            "Bij het eerste bezoek bedekt een toestemmingsvenster met vier schakelaars de hele website",
            "De diensten zijn drie korte regels op de pagina \"Over ons\", zonder eigen pagina",
            "De projecten zijn foto's zonder categorieën en zonder één woord tekst",
            "Aanvragen enkel via een algemeen formulier, zonder Viber of WhatsApp",
            "De titel in Google is \"Начало - GS Aluminium\" (\"Start\"), zonder dienst en zonder stad",
          ],
          new: [
            "Het eerste scherm zegt meteen wat, waar en hoe: de systemen, Roese en heel Bulgarije, een gratis plaatsbezoek",
            "Een aparte pagina voor elk van de acht systemen met types, projecten en een uitgebreide beschrijving",
            "Een 3D-configurator die een kant-en-klare specificatie meestuurt met de aanvraag",
            "Projecten gefilterd per type systeem, en video van geplaatste constructies",
            "Een aanvraag in drie stappen met foto's van de plek, plus Viber, WhatsApp en telefoon op elke pagina",
            "Vier talen en Google-titels per dienst en stad",
          ],
        },
        site: [
          { title: "3D-configurator", text: "De klant kiest een pergola, veranda, serre of carport, stelt afmetingen, dak, lamellen, kleur en zijafsluiting in en ziet het model meteen. De configuratie gaat mee met het offerteformulier, in plaats van ze aan de telefoon uit te leggen." },
          { title: "Hulp bij het kiezen", text: "Wie niet weet hoe het heet wat hij wil, kiest het doel: een extra kamer voor het hele jaar, een overdekt terras, schaduw, bescherming voor de auto. De website toont de passende systemen." },
          { title: "Aanvraag voor een gratis plaatsbezoek", text: "Drie stappen: wat u interesseert, waar het pand is en hoe we u bereiken. Optioneel een termijn, het type pand en tot vijf foto's van de plek, zodat de offerte al na het eerste gesprek klopt." },
          { title: "Echte projecten", text: "Enkel foto's van projecten die het bedrijf zelf heeft gemaakt en geplaatst, met een filter per type systeem, en korte video's van afgewerkte constructies. Elke dienst toont ook zijn eigen projecten." },
        ],
        more: [
          "Een pagina per systeem: serres, veranda's, pergola's, carports, schuifsystemen, ramen, deuren, ZIP-screens",
          "Een blog met advies: de prijs van een serre, verwarming, een pergola kiezen en meer",
          "\"Wat het gratis plaatsbezoek inhoudt\" en \"Waar de prijs van afhangt\"",
          "Een proces in vier stappen: plaatsbezoek, offerte, productie, plaatsing",
          "Bulgaars, Duits, Engels en Turks",
          "Showroom in Roese met adres en routebeschrijving",
        ],
      },
    },
  },
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

  printtopia: {
    site: ["/work/case/printtopia-design.webp", "/work/case/printtopia-editor.webp", "/work/case/printtopia-b2b.webp"],
    admin: ["/work/admin/printtopia-dashboard.webp", "/work/admin/printtopia-order.webp", "/work/admin/printtopia-prices.webp", "/work/admin/printtopia-b2b.webp"],
    demo: true,
    copy: {
      bg: {
        task: "Печатница искаше онлайн магазин, от който човек без опит в печата поръчва сам: вижда крайната цена за своя тираж, предава дизайна по най-лесния за него начин и плаща, а печатницата получава точната цена, тиража и одобрения файл без нито едно обаждане. Отделно фирмите и агенциите, които поръчват редовно, трябваше да виждат свои цени.",
        site: [
          { title: "Цена за тиража и три начина за дизайн", text: "На всеки продукт се избират хартия, печат и тираж, а сумата с ДДС се сменя веднага. После клиентът качва готов файл с безплатна проверка, прави дизайна онлайн или поръчва дизайн от печатницата." },
          { title: "Онлайн редактор", text: "Платно с точния формат, линия на рязане и безопасна зона, лице и гръб. Текст на кирилица с няколко шрифта, снимки, форми, линии и фон, отмяна на стъпка и чернова, която остава след презареждане. Накрая се прави готов PDF за печат, който се проверява сам." },
          { title: "Фирмен профил с едрови цени", text: "Фирмите кандидатстват веднъж и след одобрение виждат своите цени в целия каталог, в количката и в поръчката. Данните за фактура се попълват сами." },
        ],
        adminIntro: "Админ панелът е на български и е направен за собственика и оператора в печатницата, без програмист. Данните на снимките са примерни, от локалната версия.",
        admin: [
          { title: "Табло", text: "Какво чака действие: нови поръчки, файлове за преглед, дизайни за подготовка, чакащи преводи и поръчки, готови за производство. Отделно фирмите, които чакат одобрение." },
          { title: "Поръчка", text: "Всеки артикул с тиража, хартията, печата и файла за печат. Отгоре стои следващата стъпка с един бутон, а цената и файлът са замразени в момента на поръчката." },
          { title: "Цени по тираж", text: "Таблица с цената за всеки тираж и всяка комбинация от страници и хартия. Всяка промяна е нова версия на ценоразписа и не пипа приетите поръчки." },
          { title: "Ценови групи за фирми", text: "Отстъпка в проценти за цялата група и отделно по категория. Фирмите се одобряват, спират или отказват от същия раздел." },
        ],
        more: [
          "Над 90 продукта в три направления, с цени, текстове, снимки, тегло и видимост за всеки",
          "Нов продукт се прави, като се дублира подобен",
          "Търсене на поръчка по номер, име, имейл, телефон или фирма и филтри по състояние, плащане и доставка",
          "Преглед на файла за печат и връщане към клиента с причина",
          "Цена за дизайн по заявка, която клиентът вижда в поръчката си",
          "Изпращане с Еконт от самата поръчка",
          "Банкова сметка, наложен платеж, ДДС, безплатна доставка, контакти и работно време от настройките",
          "Чеклист на таблото какво остава преди пускане",
        ],
      },
      en: {
        task: "A print house wanted an online shop where someone with no print experience orders on their own: sees the final price for their quantity, hands over the design in the easiest way for them and pays, while the print house gets the exact price, quantity and approved file without a single phone call. On top of that, companies and agencies that order regularly needed to see their own prices.",
        site: [
          { title: "Price per quantity and three ways to design", text: "Each product lets the customer pick paper, print and quantity, and the total with VAT updates at once. Then they upload a ready file with a free check, design it online or order a design from the print house." },
          { title: "Online editor", text: "A canvas in the exact format with the cut line and safe zone, front and back. Cyrillic text in several fonts, photos, shapes, lines and background, undo and a draft that survives a reload. At the end it produces a print-ready PDF that is checked automatically." },
          { title: "Company account with trade prices", text: "Companies apply once and, after approval, see their own prices across the whole catalogue, in the cart and in the order. Invoice details are filled in automatically." },
        ],
        adminIntro: "The admin panel is in Bulgarian and built for the owner and the operator at the print house, with no developer needed. The data in the screenshots is sample data from the local version.",
        admin: [
          { title: "Dashboard", text: "What needs action: new orders, files to review, designs to prepare, pending bank transfers and orders ready for production. Separately, the companies waiting for approval." },
          { title: "Order", text: "Every item with its quantity, paper, print and print file. The next step sits at the top as one button, and the price and file are frozen at the moment of ordering." },
          { title: "Prices per quantity", text: "A table with the price for every quantity and every combination of pages and paper. Each change is a new version of the price list and never touches accepted orders." },
          { title: "Price groups for companies", text: "A percentage discount for the whole group and separately per category. Companies are approved, suspended or rejected in the same section." },
        ],
        more: [
          "Over 90 products in three lines, each with prices, texts, photos, weight and visibility",
          "A new product is made by duplicating a similar one",
          "Order search by number, name, email, phone or company, with filters by status, payment and delivery",
          "Print file review and sending it back to the customer with a reason",
          "A quoted design price that the customer sees in their order",
          "Shipping with Econt straight from the order",
          "Bank account, cash on delivery, VAT, free delivery, contacts and opening hours in the settings",
          "A checklist on the dashboard of what is left before launch",
        ],
      },
      de: {
        task: "Eine Druckerei wollte einen Onlineshop, in dem auch jemand ohne Druckerfahrung selbst bestellt: den Endpreis für seine Auflage sieht, das Design auf dem für ihn einfachsten Weg übergibt und bezahlt, während die Druckerei den genauen Preis, die Auflage und die freigegebene Datei ohne einen einzigen Anruf erhält. Dazu sollten Firmen und Agenturen, die regelmäßig bestellen, eigene Preise sehen.",
        site: [
          { title: "Preis pro Auflage und drei Wege zum Design", text: "Bei jedem Produkt werden Papier, Druck und Auflage gewählt, der Betrag inkl. MwSt. ändert sich sofort. Danach lädt der Kunde eine fertige Datei mit kostenloser Prüfung hoch, gestaltet online oder bestellt ein Design bei der Druckerei." },
          { title: "Online-Editor", text: "Eine Fläche im genauen Format mit Schnittlinie und Sicherheitszone, Vorder- und Rückseite. Kyrillischer Text in mehreren Schriften, Fotos, Formen, Linien und Hintergrund, Rückgängig und ein Entwurf, der nach dem Neuladen bleibt. Am Ende entsteht ein druckfertiges PDF, das automatisch geprüft wird." },
          { title: "Firmenkonto mit Großhandelspreisen", text: "Firmen bewerben sich einmal und sehen nach der Freigabe ihre Preise im ganzen Katalog, im Warenkorb und in der Bestellung. Die Rechnungsdaten werden automatisch ausgefüllt." },
        ],
        adminIntro: "Der Admin-Bereich ist auf Bulgarisch und für Inhaber und Mitarbeiter der Druckerei gemacht, ohne Entwickler. Die Daten auf den Bildern sind Beispieldaten aus der lokalen Version.",
        admin: [
          { title: "Übersicht", text: "Was zu tun ist: neue Bestellungen, Dateien zur Prüfung, Designs in Vorbereitung, offene Überweisungen und Bestellungen bereit für die Produktion. Daneben die Firmen, die auf Freigabe warten." },
          { title: "Bestellung", text: "Jeder Artikel mit Auflage, Papier, Druck und Druckdatei. Oben steht der nächste Schritt als ein Knopf, Preis und Datei sind zum Zeitpunkt der Bestellung festgeschrieben." },
          { title: "Preise pro Auflage", text: "Eine Tabelle mit dem Preis für jede Auflage und jede Kombination aus Seiten und Papier. Jede Änderung ist eine neue Version der Preisliste und berührt angenommene Bestellungen nicht." },
          { title: "Preisgruppen für Firmen", text: "Ein Rabatt in Prozent für die ganze Gruppe und getrennt pro Kategorie. Firmen werden im selben Bereich freigegeben, gesperrt oder abgelehnt." },
        ],
        more: [
          "Über 90 Produkte in drei Bereichen, jedes mit Preisen, Texten, Fotos, Gewicht und Sichtbarkeit",
          "Ein neues Produkt entsteht durch Duplizieren eines ähnlichen",
          "Suche nach Bestellungen per Nummer, Name, E-Mail, Telefon oder Firma, mit Filtern nach Status, Zahlung und Versand",
          "Prüfung der Druckdatei und Rückgabe an den Kunden mit Begründung",
          "Ein Designpreis auf Anfrage, den der Kunde in seiner Bestellung sieht",
          "Versand mit Econt direkt aus der Bestellung",
          "Bankkonto, Nachnahme, MwSt., kostenloser Versand, Kontakte und Öffnungszeiten in den Einstellungen",
          "Eine Checkliste auf der Übersicht, was vor dem Start noch fehlt",
        ],
      },
      nl: {
        task: "Een drukkerij wilde een webshop waar ook iemand zonder drukervaring zelf bestelt: de eindprijs voor zijn oplage ziet, het ontwerp op de makkelijkste manier aanlevert en betaalt, terwijl de drukkerij de exacte prijs, oplage en het goedgekeurde bestand krijgt zonder één telefoontje. Daarnaast moesten bedrijven en bureaus die regelmatig bestellen hun eigen prijzen zien.",
        site: [
          { title: "Prijs per oplage en drie manieren voor het ontwerp", text: "Bij elk product kiest de klant papier, druk en oplage, en het bedrag met btw verandert meteen. Daarna uploadt hij een kant-en-klaar bestand met gratis controle, ontwerpt online of bestelt een ontwerp bij de drukkerij." },
          { title: "Online editor", text: "Een canvas op exact formaat met snijlijn en veilige zone, voor- en achterkant. Cyrillische tekst in meerdere lettertypes, foto’s, vormen, lijnen en achtergrond, ongedaan maken en een concept dat na herladen blijft. Aan het eind ontstaat een drukklare pdf die automatisch wordt gecontroleerd." },
          { title: "Bedrijfsaccount met groothandelsprijzen", text: "Bedrijven vragen één keer aan en zien na goedkeuring hun eigen prijzen in de hele catalogus, in het winkelmandje en in de bestelling. De factuurgegevens worden automatisch ingevuld." },
        ],
        adminIntro: "Het beheerpaneel is in het Bulgaars en gemaakt voor de eigenaar en de medewerker van de drukkerij, zonder ontwikkelaar. De gegevens op de schermafbeeldingen zijn voorbeeldgegevens uit de lokale versie.",
        admin: [
          { title: "Dashboard", text: "Wat actie vraagt: nieuwe bestellingen, bestanden om te controleren, ontwerpen in voorbereiding, openstaande overschrijvingen en bestellingen klaar voor productie. Apart de bedrijven die op goedkeuring wachten." },
          { title: "Bestelling", text: "Elk artikel met oplage, papier, druk en drukbestand. Bovenaan staat de volgende stap als één knop, en prijs en bestand liggen vast op het moment van bestellen." },
          { title: "Prijzen per oplage", text: "Een tabel met de prijs voor elke oplage en elke combinatie van pagina’s en papier. Elke wijziging is een nieuwe versie van de prijslijst en raakt aanvaarde bestellingen niet." },
          { title: "Prijsgroepen voor bedrijven", text: "Een korting in procenten voor de hele groep en apart per categorie. Bedrijven worden in hetzelfde onderdeel goedgekeurd, geschorst of afgewezen." },
        ],
        more: [
          "Meer dan 90 producten in drie richtingen, elk met prijzen, teksten, foto’s, gewicht en zichtbaarheid",
          "Een nieuw product ontstaat door een vergelijkbaar product te dupliceren",
          "Bestellingen zoeken op nummer, naam, e-mail, telefoon of bedrijf, met filters op status, betaling en levering",
          "Controle van het drukbestand en terugsturen naar de klant met een reden",
          "Een ontwerpprijs op aanvraag die de klant in zijn bestelling ziet",
          "Verzenden met Econt rechtstreeks vanuit de bestelling",
          "Bankrekening, rembours, btw, gratis levering, contactgegevens en openingsuren in de instellingen",
          "Een checklist op het dashboard met wat er nog moet gebeuren voor de lancering",
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

  "hustle-clothing": {
    site: ["/work/case/hustle-clothing-shop.webp", "/work/case/hustle-clothing-product.webp", "/work/case/hustle-clothing-checkout.webp"],
    admin: ["/work/admin/hustle-products.webp", "/work/admin/hustle-product-edit.webp", "/work/admin/hustle-orders.webp", "/work/admin/hustle-trending.webp"],
    copy: {
      bg: {
        task: "Българска streetwear марка с лимитирани серии тениски искаше магазин, който изглежда като марката: тъмен, с видео от улицата, без нищо излишно. Поръчката трябваше да е бърза и без регистрация, с Еконт и наложен платеж, а собственикът сам да пуска нови модели, да следи размерите и да води поръчките.",
        site: [
          { title: "Магазин", text: "Всички модели с цена в евро и в лева, сортиране по препоръчани, цена и най-нови. Страницата „Sale“ показва само намалените, а когато няма намаления, казва го." },
          { title: "Продукт", text: "Снимки отпред и отзад, описание, избор на размер и количество. Изчерпаните размери не могат да се изберат, а отдолу стоят другите модели." },
          { title: "Каса без регистрация", text: "Име, телефон и град, доставка с Еконт до офис или до адрес, промокод и бележка. Плащането е наложен платеж, без карта и без профил." },
        ],
        adminIntro: "Собствен админ панел в стила на магазина. Собственикът пуска модели, следи наличността по размери и води поръчките без програмист.",
        admin: [
          { title: "Продукти", text: "Всички модели със статус, цена и наличност по размери. Търсене, сортиране и подредба на реда, в който излизат в магазина." },
          { title: "Редакция на продукт", text: "Име, описание, редовна и намалена цена, снимки с главна снимка. Статус „Активен“, „Изчерпан“ или „Скрит“ и количество за всеки размер." },
          { title: "Поръчки", text: "Номер, продукти, клиент, доставка, сума и използван промокод. Статус от „Нова“ до „Доставена“, филтри по статус и период и търсене по номер, име или телефон." },
          { title: "Най-търсени", text: "Кои четири модела стоят в секцията на началната страница и в какъв ред, със стрелки нагоре и надолу." },
        ],
        more: [
          "Промокодове с процент отстъпка, срок и брой използвания",
          "Запитванията от формата за контакт на едно място",
          "Абонати за бюлетина и изпращане на имейл кампании",
          "Видео на началната страница и в секцията за марката",
          "Страници за доставка, връщане, въпроси и общи условия",
        ],
      },
      en: {
        task: "A Bulgarian streetwear brand with limited-run T-shirts wanted a shop that looks like the brand: dark, with street video, nothing extra. Ordering had to be quick and without registration, with Econt delivery and cash on delivery, and the owner had to release new designs, track sizes and handle orders himself.",
        site: [
          { title: "Shop", text: "Every design with its price in euro and in leva, sorted by recommended, price or newest. The \"Sale\" page shows only discounted items, and says so when there are none." },
          { title: "Product", text: "Front and back photos, a description, size and quantity. Sold-out sizes cannot be selected, and the other designs sit underneath." },
          { title: "Checkout without registration", text: "Name, phone and town, Econt delivery to an office or to an address, a promo code and a note. Payment is cash on delivery, with no card and no account." },
        ],
        adminIntro: "A custom admin panel in the style of the shop. The owner releases designs, tracks stock by size and handles orders without a developer.",
        admin: [
          { title: "Products", text: "All designs with status, price and stock by size. Search, sorting and the order in which they appear in the shop." },
          { title: "Product editor", text: "Name, description, regular and sale price, photos with a main photo. Status \"Active\", \"Sold out\" or \"Hidden\" and a quantity for each size." },
          { title: "Orders", text: "Number, products, customer, delivery, amount and the promo code used. Status from \"New\" to \"Delivered\", filters by status and period and search by number, name or phone." },
          { title: "Bestsellers", text: "Which four designs sit in the home page section and in what order, with up and down arrows." },
        ],
        more: [
          "Promo codes with a percentage discount, a validity period and a usage count",
          "Enquiries from the contact form in one place",
          "Newsletter subscribers and sending email campaigns",
          "Video on the home page and in the brand section",
          "Pages for delivery, returns, questions and terms",
        ],
      },
      de: {
        task: "Eine bulgarische Streetwear-Marke mit limitierten T-Shirt-Serien wollte einen Shop, der aussieht wie die Marke: dunkel, mit Video von der Straße, nichts Überflüssiges. Bestellen sollte schnell und ohne Registrierung gehen, mit Econt-Versand und Nachnahme, und der Inhaber sollte neue Designs selbst veröffentlichen, Größen verfolgen und Bestellungen bearbeiten.",
        site: [
          { title: "Shop", text: "Alle Designs mit Preis in Euro und in Lewa, sortiert nach Empfehlung, Preis oder neu. Die Seite „Sale“ zeigt nur reduzierte Artikel und sagt es, wenn es keine gibt." },
          { title: "Produkt", text: "Fotos von vorne und hinten, Beschreibung, Größe und Menge. Ausverkaufte Größen lassen sich nicht wählen, darunter stehen die anderen Designs." },
          { title: "Kasse ohne Registrierung", text: "Name, Telefon und Ort, Econt-Versand an eine Filiale oder an die Adresse, Gutscheincode und Notiz. Bezahlt wird per Nachnahme, ohne Karte und ohne Konto." },
        ],
        adminIntro: "Ein eigener Admin-Bereich im Stil des Shops. Der Inhaber veröffentlicht Designs, verfolgt den Bestand nach Größen und bearbeitet Bestellungen ohne Entwickler.",
        admin: [
          { title: "Produkte", text: "Alle Designs mit Status, Preis und Bestand nach Größen. Suche, Sortierung und die Reihenfolge, in der sie im Shop erscheinen." },
          { title: "Produkt bearbeiten", text: "Name, Beschreibung, regulärer und reduzierter Preis, Fotos mit Hauptfoto. Status „Aktiv“, „Ausverkauft“ oder „Versteckt“ und eine Menge für jede Größe." },
          { title: "Bestellungen", text: "Nummer, Produkte, Kunde, Versand, Betrag und verwendeter Gutscheincode. Status von „Neu“ bis „Zugestellt“, Filter nach Status und Zeitraum und Suche nach Nummer, Name oder Telefon." },
          { title: "Bestseller", text: "Welche vier Designs im Bereich auf der Startseite stehen und in welcher Reihenfolge, mit Pfeilen nach oben und unten." },
        ],
        more: [
          "Gutscheincodes mit Prozentrabatt, Laufzeit und Anzahl der Nutzungen",
          "Anfragen aus dem Kontaktformular an einem Ort",
          "Newsletter-Abonnenten und Versand von E-Mail-Kampagnen",
          "Video auf der Startseite und im Bereich über die Marke",
          "Seiten zu Versand, Rückgabe, Fragen und AGB",
        ],
      },
      nl: {
        task: "Een Bulgaars streetwearmerk met gelimiteerde T-shirtreeksen wilde een webshop die eruitziet als het merk: donker, met video van de straat, niets overbodigs. Bestellen moest snel en zonder registratie, met levering via Econt en betaling bij levering, en de eigenaar moest zelf nieuwe ontwerpen lanceren, maten opvolgen en bestellingen afhandelen.",
        site: [
          { title: "Webshop", text: "Alle ontwerpen met prijs in euro en in leva, gesorteerd op aanbevolen, prijs of nieuwste. De pagina \"Sale\" toont enkel afgeprijsde artikelen, en zegt het als er geen zijn." },
          { title: "Product", text: "Foto's van voor en achter, een beschrijving, maat en aantal. Uitverkochte maten zijn niet te kiezen, en eronder staan de andere ontwerpen." },
          { title: "Afrekenen zonder registratie", text: "Naam, telefoon en gemeente, levering via Econt aan een kantoor of aan huis, een promocode en een opmerking. Betalen gebeurt bij levering, zonder kaart en zonder account." },
        ],
        adminIntro: "Een eigen beheerpaneel in de stijl van de webshop. De eigenaar lanceert ontwerpen, volgt de voorraad per maat op en handelt bestellingen af zonder ontwikkelaar.",
        admin: [
          { title: "Producten", text: "Alle ontwerpen met status, prijs en voorraad per maat. Zoeken, sorteren en de volgorde waarin ze in de webshop verschijnen." },
          { title: "Product bewerken", text: "Naam, beschrijving, gewone en afgeprijsde prijs, foto's met een hoofdfoto. Status \"Actief\", \"Uitverkocht\" of \"Verborgen\" en een aantal per maat." },
          { title: "Bestellingen", text: "Nummer, producten, klant, levering, bedrag en gebruikte promocode. Status van \"Nieuw\" tot \"Geleverd\", filters op status en periode en zoeken op nummer, naam of telefoon." },
          { title: "Bestsellers", text: "Welke vier ontwerpen in de sectie op de startpagina staan en in welke volgorde, met pijlen omhoog en omlaag." },
        ],
        more: [
          "Promocodes met een kortingspercentage, een geldigheid en het aantal keer gebruikt",
          "Aanvragen uit het contactformulier op één plek",
          "Nieuwsbriefabonnees en e-mailcampagnes versturen",
          "Video op de startpagina en in de sectie over het merk",
          "Pagina's over levering, retour, vragen en voorwaarden",
        ],
      },
    },
  },

  shop4home: {
    site: ["/work/case/shop4home-home.webp", "/work/case/shop4home-categories.webp", "/work/case/shop4home-checkout.webp"],
    admin: ["/work/admin/shop4home-dashboard.webp", "/work/admin/shop4home-products.webp", "/work/admin/shop4home-product-edit.webp", "/work/admin/shop4home-settings.webp"],
    copy: {
      bg: {
        task: "Вносител на стоки за дома и смарт уреди искаше онлайн магазин за хиляди продукти в десетки категории: бързо търсене, промоции и най-продавани на видно място и поръчка без регистрация с доставка с Еконт до офис или до адрес.",
        site: [
          { title: "Начало като витрина", text: "Категориите вляво, най-новото и промоциите в средата, банери към сезонните категории вдясно. Отстъпката и цената в евро и лева са на всяка карта." },
          { title: "Каталог по категории", text: "Всяка категория показва колко продукта и подкатегории има. Търсенето се отваря от всяка страница, а любимите продукти се пазят в отделен списък." },
          { title: "Поръчка без регистрация", text: "Количка, после данни за доставка: офис на Еконт или куриер до адрес, фактура за фирма и бележка към поръчката. Клиентът получава имейл с потвърждение." },
        ],
        adminIntro: "Собствен админ панел за магазин с хиляди продукти: собственикът добавя и променя продукти, следи поръчките и съобщенията и сменя началната страница сам.",
        admin: [
          { title: "Табло", text: "Броят продукти, поръчки и съобщения и последните поръчки със статус: доставена, отказана, нова. На снимката числата и клиентите са скрити." },
          { title: "Продукти", text: "Търсене по име, филтър по категория и списък със снимка, категория, цена и етикети „Ново“ и „Промо“. На снимката цените са скрити." },
          { title: "Редакция на продукт", text: "Няколко снимки с избор на главна, марка, описание, цена и стара цена за промоция. Вдясно картата на продукта се вижда точно както ще излезе в магазина." },
          { title: "Начална страница", text: "Трите банера на големия слайдер: фонова снимка, заглавие, акцентен текст и описание, с преглед на живо преди „Запази“." },
        ],
        more: [
          "Промоции, нови продукти и най-продавани с брой продажби",
          "Споделяне на продукт във Facebook, Viber и WhatsApp",
          "„Може да харесаш“ под всеки продукт",
          "Блог с категории: технологии, дом и градина, авто, здраве",
          "Категории с подкатегории и снимка, подредени от панела",
        ],
      },
      en: {
        task: "An importer of home goods and smart appliances wanted an online shop for thousands of products in dozens of categories: fast search, promotions and bestsellers in plain view, and ordering without registration with Econt delivery to an office or an address.",
        site: [
          { title: "A home page as a shop window", text: "Categories on the left, the newest products and promotions in the middle, banners for the seasonal categories on the right. The discount and the price in euro and leva sit on every card." },
          { title: "Catalogue by category", text: "Every category shows how many products and subcategories it holds. Search opens from any page, and favourite products are kept in a separate list." },
          { title: "Ordering without registration", text: "Basket, then delivery details: an Econt office or a courier to an address, an invoice for a company and a note to the order. The customer receives a confirmation email." },
        ],
        adminIntro: "A custom admin panel for a shop with thousands of products: the owner adds and edits products, follows orders and messages and changes the home page without a developer.",
        admin: [
          { title: "Dashboard", text: "The number of products, orders and messages and the latest orders with their status: delivered, cancelled, new. The numbers and customers in the screenshot are hidden." },
          { title: "Products", text: "Search by name, a category filter and a list with image, category, price and \"New\" and \"Promo\" labels. The prices in the screenshot are hidden." },
          { title: "Editing a product", text: "Several images with a choice of the main one, brand, description, price and an old price for a promotion. On the right the product card looks exactly as it will in the shop." },
          { title: "Home page", text: "The three banners of the main slider: background image, title, accent text and description, with a live preview before \"Save\"." },
        ],
        more: [
          "Promotions, new products and bestsellers with the number sold",
          "Sharing a product on Facebook, Viber and WhatsApp",
          "\"You may also like\" under every product",
          "A blog with categories: technology, home and garden, auto, health",
          "Categories with subcategories and an image, ordered from the panel",
        ],
      },
      de: {
        task: "Ein Importeur von Haushaltswaren und smarten Geräten wollte einen Online-Shop für Tausende Produkte in Dutzenden Kategorien: schnelle Suche, Aktionen und Bestseller gut sichtbar und Bestellung ohne Registrierung mit Econt-Lieferung an eine Filiale oder eine Adresse.",
        site: [
          { title: "Startseite als Schaufenster", text: "Die Kategorien links, Neuheiten und Aktionen in der Mitte, Banner zu den Saisonkategorien rechts. Rabatt und Preis in Euro und Lew stehen auf jeder Karte." },
          { title: "Katalog nach Kategorien", text: "Jede Kategorie zeigt, wie viele Produkte und Unterkategorien sie enthält. Die Suche öffnet sich von jeder Seite, und Lieblingsprodukte werden in einer eigenen Liste gespeichert." },
          { title: "Bestellung ohne Registrierung", text: "Warenkorb, dann Lieferdaten: Econt-Filiale oder Kurier an die Adresse, Rechnung für Firmen und eine Notiz zur Bestellung. Der Kunde erhält eine Bestätigung per E-Mail." },
        ],
        adminIntro: "Ein eigenes Admin-Panel für einen Shop mit Tausenden Produkten: Der Inhaber legt Produkte an und ändert sie, verfolgt Bestellungen und Nachrichten und ändert die Startseite selbst.",
        admin: [
          { title: "Übersicht", text: "Anzahl der Produkte, Bestellungen und Nachrichten und die letzten Bestellungen mit Status: geliefert, storniert, neu. Zahlen und Kunden im Screenshot sind ausgeblendet." },
          { title: "Produkte", text: "Suche nach Name, Filter nach Kategorie und eine Liste mit Bild, Kategorie, Preis und den Labels „Neu“ und „Promo“. Die Preise im Screenshot sind ausgeblendet." },
          { title: "Produkt bearbeiten", text: "Mehrere Bilder mit Wahl des Hauptbilds, Marke, Beschreibung, Preis und alter Preis für Aktionen. Rechts sieht die Produktkarte genau so aus wie später im Shop." },
          { title: "Startseite", text: "Die drei Banner des großen Sliders: Hintergrundbild, Titel, Akzenttext und Beschreibung, mit Live-Vorschau vor dem Speichern." },
        ],
        more: [
          "Aktionen, neue Produkte und Bestseller mit Verkaufszahl",
          "Produkt teilen über Facebook, Viber und WhatsApp",
          "„Das könnte Ihnen gefallen“ unter jedem Produkt",
          "Blog mit Kategorien: Technik, Haus und Garten, Auto, Gesundheit",
          "Kategorien mit Unterkategorien und Bild, im Panel sortiert",
        ],
      },
      nl: {
        task: "Een invoerder van huishoudartikelen en slimme toestellen wilde een webshop voor duizenden producten in tientallen categorieën: snel zoeken, promoties en bestsellers in het zicht, en bestellen zonder registratie met levering via Econt naar een kantoor of een adres.",
        site: [
          { title: "Startpagina als etalage", text: "De categorieën links, nieuwigheden en promoties in het midden, banners naar de seizoenscategorieën rechts. Korting en prijs in euro en lev staan op elke kaart." },
          { title: "Catalogus per categorie", text: "Elke categorie toont hoeveel producten en subcategorieën ze bevat. Zoeken opent vanaf elke pagina, en favoriete producten worden in een aparte lijst bewaard." },
          { title: "Bestellen zonder registratie", text: "Winkelmandje, dan leveringsgegevens: een Econt-kantoor of een koerier aan huis, factuur voor een bedrijf en een opmerking bij de bestelling. De klant krijgt een bevestiging per e-mail." },
        ],
        adminIntro: "Een eigen beheerpaneel voor een winkel met duizenden producten: de eigenaar voegt producten toe en past ze aan, volgt bestellingen en berichten en wijzigt zelf de startpagina.",
        admin: [
          { title: "Dashboard", text: "Het aantal producten, bestellingen en berichten en de laatste bestellingen met status: geleverd, geannuleerd, nieuw. De cijfers en klanten op de schermafbeelding zijn verborgen." },
          { title: "Producten", text: "Zoeken op naam, een filter per categorie en een lijst met foto, categorie, prijs en de labels \"Nieuw\" en \"Promo\". De prijzen op de schermafbeelding zijn verborgen." },
          { title: "Product bewerken", text: "Meerdere foto's met keuze van de hoofdfoto, merk, beschrijving, prijs en een oude prijs voor promoties. Rechts ziet de productkaart er precies zo uit als in de winkel." },
          { title: "Startpagina", text: "De drie banners van de grote slider: achtergrondfoto, titel, accenttekst en beschrijving, met een live voorbeeld voor je opslaat." },
        ],
        more: [
          "Promoties, nieuwe producten en bestsellers met het aantal verkocht",
          "Product delen via Facebook, Viber en WhatsApp",
          "\"Misschien vind je dit ook leuk\" onder elk product",
          "Blog met categorieën: technologie, huis en tuin, auto, gezondheid",
          "Categorieën met subcategorieën en een foto, geordend vanuit het paneel",
        ],
      },
    },
  },

  "active-solar": {
    admin: ["/work/admin/active-solar-dashboard.webp", "/work/admin/active-solar-inquiries.webp", "/work/admin/active-solar-products.webp", "/work/admin/active-solar-projects.webp"],
    site: ["/work/case/active-solar-calculator.webp", "/work/case/active-solar-products.webp", "/work/case/active-solar-portal.webp"],
    copy: {
      bg: {
        task: "Фирма за проектиране и монтаж на фотоволтаици, сертифицирана в Нидерландия, искаше двуезичен сайт за домове и бизнес: каталог на оборудването, което монтира, калкулатор, който за минута дава ориентировъчна мощност и цена, и вход за клиенти към данните на тяхната система.",
        site: [
          { title: "Соларен калкулатор", text: "Клиентът избира дом или бизнес, въвежда месечната сметка или годишните kWh, вида и посоката на покрива, фазите и дали иска батерия. Вдясно веднага излиза системен лист: мощност, панели, инвертор, годишно производство и ориентировъчна цена, който се праща с един бутон като запитване." },
          { title: "Каталог на оборудването", text: "Панели, инвертори, батерии, конструкции и аксесоари с филтри по категория и марка и търсене по модел. Цените не се публикуват: продуктите се събират в заявка, а офертата идва от фирмата." },
          { title: "Вход за клиенти", text: "След монтажа клиентът получава имейл и парола и вижда монтираните продукти със серийни номера, гаранцията до коя дата, сигнал за повреда и заявка за профилактика или разширение." },
        ],
        adminIntro: "Собствен админ панел за запитванията от сайта, заявките на клиентите от техния вход, каталога и реализираните проекти.",
        admin: [
          { title: "Табло", text: "Нови запитвания, отворени заявки от клиенти, клиенти, продукти и препоръки, които чакат решение. Под тях последните запитвания с източника им, например калкулатора." },
          { title: "Запитвания", text: "Статуси „ново“, „в процес“, „отговорено“ и „приключено“, търсене по име, имейл, телефон, град или код и филтри по вид и дата. Виждат се източникът, например реклама във Facebook, и кодът на препоръката. На снимката имената и данните са скрити." },
          { title: "Продукти", text: "Каталогът без цени: марка, категория, гаранция и PDF с техническите данни. Продукт се скрива, препоръчва, копира или редактира с едно натискане." },
          { title: "Проекти", text: "Реализираните обекти за сайта със снимките и използваното оборудване. Всеки проект може да се публикува, скрие или покаже на началната страница." },
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
        adminIntro: "A custom admin panel for the site's enquiries, the requests clients send from their login, the catalogue and the completed projects.",
        admin: [
          { title: "Dashboard", text: "New enquiries, open client requests, clients, products and referrals waiting for a decision. Below them the latest enquiries with their source, such as the calculator." },
          { title: "Enquiries", text: "Statuses new, in progress, answered and closed, search by name, email, phone, city or code and filters by type and date. The source, such as a Facebook ad, and the referral code are shown. Names and details are hidden in the screenshot." },
          { title: "Products", text: "The catalogue without prices: brand, category, warranty and a PDF datasheet. A product is hidden, recommended, duplicated or edited with one click." },
          { title: "Projects", text: "Completed installations for the site with photos and the equipment used. Each project can be published, hidden or shown on the home page." },
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
        adminIntro: "Ein eigenes Admin-Panel für die Anfragen der Website, die Meldungen der Kunden aus ihrem Zugang, den Katalog und die realisierten Projekte.",
        admin: [
          { title: "Übersicht", text: "Neue Anfragen, offene Kundenmeldungen, Kunden, Produkte und Empfehlungen, die auf eine Entscheidung warten. Darunter die letzten Anfragen mit ihrer Quelle, etwa dem Rechner." },
          { title: "Anfragen", text: "Status neu, in Bearbeitung, beantwortet und abgeschlossen, Suche nach Name, E-Mail, Telefon, Ort oder Code und Filter nach Art und Datum. Die Quelle, etwa eine Facebook-Anzeige, und der Empfehlungscode sind sichtbar. Namen und Daten sind im Screenshot verborgen." },
          { title: "Produkte", text: "Der Katalog ohne Preise: Marke, Kategorie, Garantie und ein PDF-Datenblatt. Ein Produkt wird mit einem Klick ausgeblendet, empfohlen, kopiert oder bearbeitet." },
          { title: "Projekte", text: "Die realisierten Anlagen für die Website mit Fotos und verbauter Technik. Jedes Projekt lässt sich veröffentlichen, ausblenden oder auf der Startseite zeigen." },
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
        adminIntro: "Een eigen beheerpaneel voor de aanvragen van de website, de meldingen die klanten via hun login sturen, de catalogus en de gerealiseerde projecten.",
        admin: [
          { title: "Dashboard", text: "Nieuwe aanvragen, open klantmeldingen, klanten, producten en aanbevelingen die op een beslissing wachten. Daaronder de laatste aanvragen met hun bron, zoals de calculator." },
          { title: "Aanvragen", text: "Statussen nieuw, in behandeling, beantwoord en afgesloten, zoeken op naam, e-mail, telefoon, plaats of code en filters op type en datum. De bron, zoals een Facebook-advertentie, en de aanbevelingscode zijn zichtbaar. Namen en gegevens zijn verborgen op de screenshot." },
          { title: "Producten", text: "De catalogus zonder prijzen: merk, categorie, garantie en een pdf met de technische gegevens. Een product wordt met één klik verborgen, aanbevolen, gekopieerd of bewerkt." },
          { title: "Projecten", text: "De gerealiseerde installaties voor de website met foto's en het gebruikte materiaal. Elk project kan gepubliceerd, verborgen of op de startpagina getoond worden." },
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

  primasell: {
    site: ["/work/case/primasell-home.webp", "/work/case/primasell-occasions.webp", "/work/case/primasell-product.webp"],
    admin: ["/work/admin/primasell-dashboard.webp", "/work/admin/primasell-categories.webp", "/work/admin/primasell-popular.webp", "/work/admin/primasell-offers.webp"],
    copy: {
      bg: {
        task: "Фирма за рекламни продукти, брандиране за бизнеса и подаръци по поводи искаше един сайт за трите посоки: каталог с цени и минимални количества, отделна част за поводите и бърз път до запитване по телефон, WhatsApp или форма.",
        site: [
          { title: "Начало с актуални оферти", text: "Вдясно стоят актуалните оферти с цена в евро и лева и срок за изработка. Отдолу са трите посоки, популярните продукти, стъпките от запитване до доставка и въпроси и отговори." },
          { title: "Подаръци по поводи", text: "Сватба, кръщене, бал, рожден ден и още поводи, всеки със своя категория: покани, подаръци за гости, табели и аксесоари за масата." },
          { title: "Страница на продукт", text: "Снимки, цена, наличност и три бутона: обаждане, WhatsApp или въпрос. Отдолу има още продукти, които често се поръчват заедно." },
        ],
        adminIntro: "Админ панелът е разделен по трите части на сайта: рекламни продукти, брандиране и поводи. Собственикът влиза направо в частта, по която работи.",
        admin: [
          { title: "Управление на сайта", text: "Бързи секции за рекламните продукти, брандирането и поводите. Всяка води до своите категории и после до продуктите в тях." },
          { title: "Категории", text: "Карти с корица, описание и етикет като „Хит“. От всяка категория се отварят продуктите или редакцията. На снимката числата са скрити." },
          { title: "Популярни продукти", text: "За всяка секция се избира кои продукти излизат в „Популярни продукти“. Редът се подрежда с влачене и се запазва с един бутон. На снимката числата са скрити." },
          { title: "Актуални оферти", text: "До 4 продукта за блока с оферти на началната страница. Добавят се от каталог с търсене по име и се подреждат с влачене. На снимката числата са скрити." },
        ],
        more: [
          "Брандиране за бизнеса: банери, фолио за витрини и прозорци, облепяне на вендинг машини",
          "Търсене в целия каталог от всяка страница",
          "Цена в евро и лева, минимално количество и срок за изработка на всеки продукт",
          "Форма за запитване, бутони за обаждане и WhatsApp",
          "Съобщенията от формата се събират в панела",
        ],
      },
      en: {
        task: "A company for promotional products, business branding and gifts for occasions wanted one site for all three lines: a catalogue with prices and minimum quantities, a separate part for occasions and a quick way to enquire by phone, WhatsApp or form.",
        site: [
          { title: "A home page with current offers", text: "Current offers sit on the right with the price in euro and leva and the production time. Below are the three lines, popular products, the steps from enquiry to delivery and a FAQ." },
          { title: "Gifts for occasions", text: "Weddings, christenings, proms, birthdays and more, each with its own category: invitations, guest gifts, signs and table accessories." },
          { title: "Product page", text: "Photos, price, availability and three buttons: call, WhatsApp or ask a question. Below are other products that are often ordered together." },
        ],
        adminIntro: "The admin panel follows the three parts of the site: promotional products, branding and occasions. The owner goes straight to the part that needs work.",
        admin: [
          { title: "Site management", text: "Quick sections for promotional products, branding and occasions. Each leads to its categories and then to the products in them." },
          { title: "Categories", text: "Cards with a cover image, a description and a tag such as \"Hit\". Each category opens its products or the editor. The numbers in the screenshot are hidden." },
          { title: "Popular products", text: "For each section the owner picks which products appear under \"Popular products\". The order is set by dragging and saved with one button. The numbers in the screenshot are hidden." },
          { title: "Current offers", text: "Up to 4 products for the offers block on the home page. They are added from a catalogue with search by name and ordered by dragging. The numbers in the screenshot are hidden." },
        ],
        more: [
          "Business branding: banners, film for shop windows and office windows, wrapping of vending machines",
          "Search across the whole catalogue from any page",
          "Price in euro and leva, minimum quantity and production time on every product",
          "An enquiry form plus call and WhatsApp buttons",
          "Messages from the form are collected in the panel",
        ],
      },
      de: {
        task: "Ein Anbieter von Werbeartikeln, Firmenbranding und Geschenken zu Anlässen wollte eine Website für alle drei Bereiche: einen Katalog mit Preisen und Mindestmengen, einen eigenen Teil für Anlässe und einen schnellen Weg zur Anfrage per Telefon, WhatsApp oder Formular.",
        site: [
          { title: "Startseite mit aktuellen Angeboten", text: "Rechts stehen die aktuellen Angebote mit Preis in Euro und Lew und der Herstellungszeit. Darunter folgen die drei Bereiche, beliebte Produkte, die Schritte von der Anfrage bis zur Lieferung und häufige Fragen." },
          { title: "Geschenke zu Anlässen", text: "Hochzeit, Taufe, Abschlussball, Geburtstag und weitere Anlässe, jeder mit eigener Kategorie: Einladungen, Gastgeschenke, Schilder und Tischdeko." },
          { title: "Produktseite", text: "Fotos, Preis, Verfügbarkeit und drei Buttons: Anruf, WhatsApp oder Frage. Darunter Produkte, die oft zusammen bestellt werden." },
        ],
        adminIntro: "Das Admin-Panel folgt den drei Teilen der Website: Werbeartikel, Branding und Anlässe. Der Inhaber springt direkt in den Teil, an dem gerade gearbeitet wird.",
        admin: [
          { title: "Website-Verwaltung", text: "Schnellzugriffe für Werbeartikel, Branding und Anlässe. Jeder führt zu seinen Kategorien und dann zu den Produkten darin." },
          { title: "Kategorien", text: "Karten mit Titelbild, Beschreibung und einem Etikett wie „Hit“. Aus jeder Kategorie öffnen sich die Produkte oder die Bearbeitung. Die Zahlen im Screenshot sind ausgeblendet." },
          { title: "Beliebte Produkte", text: "Für jeden Bereich wird gewählt, welche Produkte unter „Beliebte Produkte“ erscheinen. Die Reihenfolge wird per Drag & Drop festgelegt und mit einem Klick gespeichert. Die Zahlen im Screenshot sind ausgeblendet." },
          { title: "Aktuelle Angebote", text: "Bis zu 4 Produkte für den Angebotsblock auf der Startseite. Sie kommen aus einem Katalog mit Suche nach Namen und werden per Drag & Drop sortiert. Die Zahlen im Screenshot sind ausgeblendet." },
        ],
        more: [
          "Firmenbranding: Banner, Folie für Schaufenster und Bürofenster, Beklebung von Verkaufsautomaten",
          "Suche im gesamten Katalog von jeder Seite aus",
          "Preis in Euro und Lew, Mindestmenge und Herstellungszeit bei jedem Produkt",
          "Anfrageformular sowie Buttons für Anruf und WhatsApp",
          "Nachrichten aus dem Formular landen im Panel",
        ],
      },
      nl: {
        task: "Een bedrijf in reclameartikelen, branding voor bedrijven en geschenken voor gelegenheden wilde één website voor alle drie: een catalogus met prijzen en minimale aantallen, een apart deel voor gelegenheden en een snelle weg naar een aanvraag via telefoon, WhatsApp of formulier.",
        site: [
          { title: "Startpagina met actuele aanbiedingen", text: "Rechts staan de actuele aanbiedingen met prijs in euro en lev en de productietijd. Daaronder de drie richtingen, populaire producten, de stappen van aanvraag tot levering en veelgestelde vragen." },
          { title: "Geschenken per gelegenheid", text: "Huwelijk, doop, schoolbal, verjaardag en meer, elk met een eigen categorie: uitnodigingen, geschenkjes voor gasten, borden en tafelaccessoires." },
          { title: "Productpagina", text: "Foto's, prijs, beschikbaarheid en drie knoppen: bellen, WhatsApp of een vraag. Daaronder producten die vaak samen worden besteld." },
        ],
        adminIntro: "Het beheerpaneel volgt de drie delen van de website: reclameartikelen, branding en gelegenheden. De eigenaar gaat meteen naar het deel waaraan gewerkt wordt.",
        admin: [
          { title: "Websitebeheer", text: "Snelkoppelingen voor reclameartikelen, branding en gelegenheden. Elk leidt naar de eigen categorieën en daarna naar de producten erin." },
          { title: "Categorieën", text: "Kaarten met coverfoto, beschrijving en een label zoals \"Hit\". Vanuit elke categorie open je de producten of de bewerking. De cijfers op de schermafbeelding zijn verborgen." },
          { title: "Populaire producten", text: "Per sectie kies je welke producten onder \"Populaire producten\" verschijnen. De volgorde zet je met slepen en bewaar je met één knop. De cijfers op de schermafbeelding zijn verborgen." },
          { title: "Actuele aanbiedingen", text: "Tot 4 producten voor het aanbiedingenblok op de startpagina. Ze komen uit een catalogus met zoeken op naam en worden met slepen geordend. De cijfers op de schermafbeelding zijn verborgen." },
        ],
        more: [
          "Branding voor bedrijven: banners, folie voor etalages en kantoorramen, beplakken van verkoopautomaten",
          "Zoeken in de hele catalogus vanaf elke pagina",
          "Prijs in euro en lev, minimaal aantal en productietijd bij elk product",
          "Een aanvraagformulier en knoppen voor bellen en WhatsApp",
          "Berichten uit het formulier komen in het paneel terecht",
        ],
      },
    },
  },

  "het-pitta-loft": {
    site: ["/work/case/het-pitta-loft-menu.webp", "/work/case/het-pitta-loft-reservation.webp", "/work/case/het-pitta-loft-gallery.webp"],
    admin: ["/work/admin/het-pitta-loft-reservations.webp"],
    copy: {
      bg: {
        task: "Ресторант в Антверпен с пити, капсалони, паста и плата искаше сайт на нидерландски и английски с пълното меню и онлайн резервации, които екипът да приема и управлява сам.",
        site: [
          { title: "Меню с търсене", text: "Цялото меню по категории, от предястия до напитки и десерти, с цена и описание. Търсачка, превключване NL/EN и снимки на част от ястията на цял екран." },
          { title: "Резервация на маса", text: "Име, телефон, имейл, дата, час на всеки 15 минути и брой хора. Над формата стои бележка, че след 16:30 се резервира по телефона." },
          { title: "Галерия", text: "Снимки на ястията, залата и терасата в мрежа, която се отваря на цял екран." },
        ],
        adminIntro: "Панелът е направен за работата в залата: какви резервации има днес и кои дни са заети.",
        admin: [
          { title: "Резервации", text: "Календар на месеца с точки по дните с резервации и резервациите за избрания ден по час, с брой хора, статус и бутон за отказ. Бутонът горе спира или пуска онлайн резервациите. На снимката числата са скрити." },
        ],
        more: [
          "Работно време, а на контактната страница надпис дали ресторантът е отворен в момента",
          "Плъзгаща се лента с ястия на началната страница",
          "Адрес, телефон и карта на контактната страница",
          "Бутон „Резервирай“ в менюто на всяка страница",
          "Връзки към Instagram и Facebook",
        ],
      },
      en: {
        task: "A restaurant in Antwerp serving pittas, kapsalons, pasta and platters wanted a site in Dutch and English with the full menu and online reservations that the team accepts and manages on its own.",
        site: [
          { title: "Menu with search", text: "The whole menu by category, from starters to drinks and desserts, with price and description. A search box, an NL/EN switch and full-screen photos for some of the dishes." },
          { title: "Table reservation", text: "Name, phone, email, date, a time every 15 minutes and party size. A note above the form says that bookings after 16:30 go by phone." },
          { title: "Gallery", text: "Photos of the dishes, the dining room and the terrace in a grid that opens full screen." },
        ],
        adminIntro: "The panel is built for the work on the floor: which reservations there are today and which days are booked.",
        admin: [
          { title: "Reservations", text: "A month calendar with dots on the days that have bookings, and the selected day's reservations by time, with party size, status and a decline button. The button at the top pauses or reopens online reservations. The numbers in the screenshot are hidden." },
        ],
        more: [
          "Opening hours, and on the contact page a label showing whether the restaurant is open right now",
          "A sliding strip of dishes on the home page",
          "Address, phone and a map on the contact page",
          "A \"Reserve\" button in the menu on every page",
          "Links to Instagram and Facebook",
        ],
      },
      de: {
        task: "Ein Restaurant in Antwerpen mit Pitas, Kapsalons, Pasta und Tellergerichten wollte eine Website auf Niederländisch und Englisch mit der vollständigen Speisekarte und Online-Reservierungen, die das Team selbst annimmt und verwaltet.",
        site: [
          { title: "Speisekarte mit Suche", text: "Die ganze Karte nach Kategorien, von Vorspeisen bis zu Getränken und Desserts, mit Preis und Beschreibung. Suchfeld, Umschalter NL/EN und Vollbildfotos zu einem Teil der Gerichte." },
          { title: "Tischreservierung", text: "Name, Telefon, E-Mail, Datum, Uhrzeit im 15-Minuten-Takt und Personenzahl. Ein Hinweis über dem Formular sagt, dass nach 16:30 telefonisch reserviert wird." },
          { title: "Galerie", text: "Fotos der Gerichte, des Gastraums und der Terrasse in einem Raster, das sich im Vollbild öffnet." },
        ],
        adminIntro: "Das Panel ist für die Arbeit im Restaurant gebaut: welche Reservierungen es heute gibt und welche Tage belegt sind.",
        admin: [
          { title: "Reservierungen", text: "Ein Monatskalender mit Punkten an Tagen mit Reservierungen und die Reservierungen des gewählten Tages nach Uhrzeit, mit Personenzahl, Status und einer Absage-Taste. Der Schalter oben pausiert die Online-Reservierungen oder öffnet sie wieder. Die Zahlen im Screenshot sind ausgeblendet." },
        ],
        more: [
          "Öffnungszeiten und auf der Kontaktseite die Anzeige, ob das Restaurant gerade geöffnet ist",
          "Ein Laufband mit Gerichten auf der Startseite",
          "Adresse, Telefon und Karte auf der Kontaktseite",
          "Eine „Reservieren“-Taste im Menü jeder Seite",
          "Links zu Instagram und Facebook",
        ],
      },
      nl: {
        task: "Een restaurant in Antwerpen met pitta's, kapsalons, pasta's en schotels wilde een website in het Nederlands en Engels met de volledige menukaart en online reserveringen die het team zelf ontvangt en beheert.",
        site: [
          { title: "Menu met zoekfunctie", text: "De hele kaart per categorie, van voorgerechten tot dranken en desserts, met prijs en omschrijving. Een zoekveld, een NL/EN-schakelaar en foto's op volledig scherm bij een deel van de gerechten." },
          { title: "Tafel reserveren", text: "Naam, telefoon, e-mail, datum, een tijdstip per kwartier en het aantal personen. Boven het formulier staat dat reserveren na 16:30 telefonisch gaat." },
          { title: "Galerij", text: "Foto's van de gerechten, de zaal en het terras in een raster dat op volledig scherm opent." },
        ],
        adminIntro: "Het paneel is gemaakt voor het werk in de zaak: welke reserveringen er vandaag zijn en welke dagen geboekt zijn.",
        admin: [
          { title: "Reserveringen", text: "Een maandkalender met stippen op de dagen met reserveringen en de reserveringen van de gekozen dag per uur, met aantal personen, status en een knop om te weigeren. De knop bovenaan zet online reserveren op pauze of weer open. De cijfers op de schermafbeelding zijn verborgen." },
        ],
        more: [
          "Openingsuren, en op de contactpagina een melding of het restaurant nu open is",
          "Een schuivende strook met gerechten op de startpagina",
          "Adres, telefoon en kaart op de contactpagina",
          "Een knop \"Reserveer\" in het menu van elke pagina",
          "Links naar Instagram en Facebook",
        ],
      },
    },
  },

  metesso: {
    site: ["/work/case/metesso-projects.webp", "/work/case/metesso-project.webp", "/work/case/metesso-services.webp"],
    admin: ["/work/admin/metesso-dashboard.webp", "/work/admin/metesso-projects.webp", "/work/admin/metesso-project-edit.webp"],
    copy: {
      bg: {
        task: "Фирма за мебели по поръчка и ремонти в Пловдив искаше сайт, който показва завършените интериори като портфолио, обяснява услугите от проекта до монтажа и води към запитване, а екипът сам да добавя нови проекти и продукти.",
        site: [
          { title: "Портфолио по помещения", text: "Проектите стоят в мрежа от снимки: апартамент, дневна, баня, спалня, хотелска стая, офис. При посочване излизат името и категорията." },
          { title: "Страница на проект", text: "Всеки проект има голяма начална снимка, галерия от целия обект и свързани проекти отдолу." },
          { title: "Услуги стъпка по стъпка", text: "Мебели по поръчка, ремонт и управление на проекта, а после пътят на клиента: разговор, оглед на място, производство, монтаж и поддръжка след това." },
        ],
        adminIntro: "Собствен админ панел за каталога, портфолиото и запитванията. Промените излизат на сайта веднага след запис.",
        admin: [
          { title: "Табло", text: "Бързи бутони за нов продукт, нов проект и логата на началната страница, плюс бройки за продукти, проекти, запитвания за оферта и съобщения. На снимката числата са скрити." },
          { title: "Проекти", text: "Списък на портфолиото със снимка, категория и адрес на страницата. Всеки проект се редактира, отваря на сайта или изтрива от тук." },
          { title: "Редактор на проект", text: "Име, категория и качване на снимки и видео. Редът се сменя със стрелки, а първата снимка автоматично става главна." },
        ],
        more: [
          "Каталог с продукти, категории, колекции и филтър по покритие",
          "Марки и мрежа с лога на началната страница, с подредба и скриване",
          "Запитвания за оферта и съобщения от контактната форма в отделни списъци",
          "Контактна форма със съгласие за обработка на данните",
          "Бързи връзки към WhatsApp, Facebook, Instagram и TikTok",
        ],
      },
      en: {
        task: "A custom furniture and renovation company in Plovdiv wanted a site that presents finished interiors as a portfolio, explains the services from design to installation and leads to an enquiry, while the team adds new projects and products on its own.",
        site: [
          { title: "Portfolio by room", text: "Projects sit in a photo grid: apartment, living room, bathroom, bedroom, hotel room, office. On hover the name and category appear." },
          { title: "Project page", text: "Each project has a large opening image, a gallery of the whole space and related projects below." },
          { title: "Services step by step", text: "Custom furniture, renovation and project management, followed by the client's path: a first talk, a site survey, production, installation and after-sales support." },
        ],
        adminIntro: "A custom admin panel for the catalogue, the portfolio and the enquiries. Changes go live on the site as soon as they are saved.",
        admin: [
          { title: "Dashboard", text: "Quick buttons for a new product, a new project and the logo grid on the home page, plus counts for products, projects, offer requests and messages. The numbers in the screenshot are hidden." },
          { title: "Projects", text: "The portfolio list with a thumbnail, category and page address. Each project can be edited, opened on the site or deleted from here." },
          { title: "Project editor", text: "Title, category and upload of images and video. The order is changed with arrows, and the first image becomes the main one automatically." },
        ],
        more: [
          "A product catalogue with categories, collections and a filter by finish",
          "Brands and a logo grid on the home page, with ordering and hiding",
          "Offer requests and contact form messages in separate lists",
          "A contact form with consent to data processing",
          "Quick links to WhatsApp, Facebook, Instagram and TikTok",
        ],
      },
      de: {
        task: "Ein Unternehmen für Möbel nach Maß und Renovierungen in Plowdiw wollte eine Website, die fertige Interieurs als Portfolio zeigt, die Leistungen vom Entwurf bis zur Montage erklärt und zur Anfrage führt. Neue Projekte und Produkte sollte das Team selbst einpflegen.",
        site: [
          { title: "Portfolio nach Räumen", text: "Die Projekte stehen in einem Bilderraster: Wohnung, Wohnzimmer, Bad, Schlafzimmer, Hotelzimmer, Büro. Beim Darüberfahren erscheinen Name und Kategorie." },
          { title: "Projektseite", text: "Jedes Projekt hat ein großes Titelbild, eine Galerie des ganzen Objekts und verwandte Projekte darunter." },
          { title: "Leistungen Schritt für Schritt", text: "Möbel nach Maß, Renovierung und Projektleitung, danach der Weg des Kunden: Erstgespräch, Aufmaß vor Ort, Fertigung, Montage und Betreuung danach." },
        ],
        adminIntro: "Ein eigenes Admin-Panel für Katalog, Portfolio und Anfragen. Änderungen sind nach dem Speichern sofort auf der Website.",
        admin: [
          { title: "Übersicht", text: "Schnellzugriffe für neues Produkt, neues Projekt und das Logoraster der Startseite, dazu Zahlen zu Produkten, Projekten, Angebotsanfragen und Nachrichten. Die Zahlen im Screenshot sind ausgeblendet." },
          { title: "Projekte", text: "Die Portfolio-Liste mit Vorschaubild, Kategorie und Seitenadresse. Jedes Projekt wird hier bearbeitet, auf der Website geöffnet oder gelöscht." },
          { title: "Projekt bearbeiten", text: "Titel, Kategorie und Upload von Bildern und Videos. Die Reihenfolge wird mit Pfeilen geändert, das erste Bild wird automatisch zum Titelbild." },
        ],
        more: [
          "Produktkatalog mit Kategorien, Kollektionen und Filter nach Oberfläche",
          "Marken und ein Logoraster auf der Startseite, mit Reihenfolge und Ausblenden",
          "Angebotsanfragen und Nachrichten aus dem Kontaktformular in getrennten Listen",
          "Kontaktformular mit Einwilligung zur Datenverarbeitung",
          "Direkte Links zu WhatsApp, Facebook, Instagram und TikTok",
        ],
      },
      nl: {
        task: "Een bedrijf voor maatmeubelen en renovaties in Plovdiv wilde een website die afgewerkte interieurs als portfolio toont, de diensten van ontwerp tot plaatsing uitlegt en naar een aanvraag leidt. Nieuwe projecten en producten moest het team zelf kunnen toevoegen.",
        site: [
          { title: "Portfolio per ruimte", text: "De projecten staan in een fotoraster: appartement, woonkamer, badkamer, slaapkamer, hotelkamer, kantoor. Bij aanwijzen verschijnen naam en categorie." },
          { title: "Projectpagina", text: "Elk project heeft een grote openingsfoto, een galerij van de hele ruimte en verwante projecten eronder." },
          { title: "Diensten stap voor stap", text: "Maatmeubelen, renovatie en projectbeheer, daarna het traject van de klant: een eerste gesprek, opmeting ter plaatse, productie, plaatsing en opvolging achteraf." },
        ],
        adminIntro: "Een eigen beheerpaneel voor de catalogus, het portfolio en de aanvragen. Wijzigingen staan meteen na het opslaan op de website.",
        admin: [
          { title: "Dashboard", text: "Snelknoppen voor een nieuw product, een nieuw project en het logoraster op de startpagina, plus tellers voor producten, projecten, offerteaanvragen en berichten. De cijfers op de schermafbeelding zijn verborgen." },
          { title: "Projecten", text: "De portfoliolijst met miniatuur, categorie en paginaadres. Elk project wordt hier bewerkt, op de website geopend of verwijderd." },
          { title: "Project bewerken", text: "Titel, categorie en het opladen van foto's en video's. De volgorde wijzig je met pijlen, en de eerste foto wordt automatisch de hoofdfoto." },
        ],
        more: [
          "Een productcatalogus met categorieën, collecties en een filter op afwerking",
          "Merken en een logoraster op de startpagina, met volgorde en verbergen",
          "Offerteaanvragen en berichten van het contactformulier in aparte lijsten",
          "Een contactformulier met toestemming voor gegevensverwerking",
          "Snelle links naar WhatsApp, Facebook, Instagram en TikTok",
        ],
      },
    },
  },

  "korn-metal": {
    site: ["/work/case/korn-metal-categories.webp", "/work/case/korn-metal-services.webp", "/work/case/korn-metal-product.webp"],
    admin: ["/work/admin/korn-metal-dashboard.webp", "/work/admin/korn-metal-products.webp", "/work/admin/korn-metal-services.webp", "/work/admin/korn-metal-blog.webp"],
    copy: {
      bg: {
        task: "Фирма за търговия с черни и цветни метали, термопанели и металообработка искаше сайт, на който клиентът намира профила, ламарината или услугата, вижда наличните размери и пуска запитване за цена и срок, без да звъни за всяка подробност.",
        site: [
          { title: "Категории метали", text: "Кухи профили, тръби, ламарина, шини, арматура, термопанели и винкели, всяка категория с основните си видове. Списъкът води към продуктите в нея." },
          { title: "Услуги по групи", text: "Разкрой и рязане, огъване и заваряване в отделни раздели. Всяка услуга има своя страница с технически данни, например дебелини по материал, и форма за запитване." },
          { title: "Продукт с размери и запитване", text: "Таблица с вариантите на склад във формат дебелина х широчина х дължина, а до нея форма. Продуктът е попълнен предварително, клиентът пише размер и количество." },
        ],
        adminIntro: "Админ панелът е за съдържанието и запитванията: продукти, услуги, блог и портфолио се подреждат и редактират оттук, а новите запитвания стоят отгоре.",
        admin: [
          { title: "Табло", text: "Броят нови запитвания, продукти, услуги, статии и обекти в портфолиото, плюс бързи връзки към всяка част. На снимката числата са скрити." },
          { title: "Продукти", text: "Продуктите се показват по категории. Подреждат се с влачене или стрелки, а категориите се управляват от отделен бутон. На снимката числата са скрити." },
          { title: "Услуги", text: "Лазерно и плазмено рязане, гилотина, огъване и останалите услуги в реда, в който излизат на сайта. Всяка се редактира или мести със стрелки." },
          { title: "Блог", text: "Статии за видовете ламарина, профилите, термопанелите и арматурата. Нова статия се добавя с един бутон, а редът се сменя с влачене." },
        ],
        more: [
          "Запитвания от формите на сайта, събрани в панела",
          "Портфолио с изработени огради, портали и конструкции",
          "Форма за контакт с избор на тип запитване: материали, услуга или изработка по проект",
          "Бутони за обаждане и имейл на всяка страница",
          "Блог с наръчници, например как се изчислява теглото на профили и ламарина",
        ],
      },
      en: {
        task: "A trader in ferrous and non-ferrous metals, thermal panels and metal-working services wanted a site where customers find the profile, the sheet metal or the service, see the sizes in stock and send an enquiry for price and lead time without calling about every detail.",
        site: [
          { title: "Metal categories", text: "Hollow sections, tubes, sheet metal, flat and round bars, rebar, thermal panels and angles, each category with its main types. The list leads to the products inside." },
          { title: "Services by group", text: "Cutting, bending and welding in separate tabs. Each service has its own page with technical data, such as thickness by material, and an enquiry form." },
          { title: "Product with sizes and enquiry", text: "A table of the variants in stock as thickness x width x length, with a form next to it. The product is filled in already; the customer adds size and quantity." },
        ],
        adminIntro: "The admin panel covers content and enquiries: products, services, the blog and the portfolio are ordered and edited here, with new enquiries at the top.",
        admin: [
          { title: "Dashboard", text: "The number of new enquiries, products, services, articles and portfolio items, plus quick links to each part. The numbers in the screenshot are hidden." },
          { title: "Products", text: "Products are shown by category. They are ordered by dragging or with arrows, and categories are managed from a separate button. The numbers in the screenshot are hidden." },
          { title: "Services", text: "Laser and plasma cutting, guillotine, bending and the other services in the order they appear on the site. Each one can be edited or moved with arrows." },
          { title: "Blog", text: "Articles on types of sheet metal, profiles, thermal panels and rebar. A new article is added with one button, and the order is changed by dragging." },
        ],
        more: [
          "Enquiries from the site's forms, collected in the panel",
          "A portfolio of finished fences, gates and structures",
          "A contact form with a choice of enquiry type: materials, a service or custom fabrication",
          "Call and email buttons on every page",
          "A blog with guides, for example how to calculate the weight of profiles and sheet metal",
        ],
      },
      de: {
        task: "Ein Händler für Eisen- und Nichteisenmetalle, Sandwichpaneele und Metallbearbeitung wollte eine Website, auf der Kunden das Profil, das Blech oder die Leistung finden, die vorrätigen Maße sehen und eine Anfrage zu Preis und Lieferzeit senden, ohne wegen jedem Detail anzurufen.",
        site: [
          { title: "Metallkategorien", text: "Hohlprofile, Rohre, Bleche, Flach- und Rundstahl, Bewehrungsstahl, Sandwichpaneele und Winkel, jede Kategorie mit ihren Hauptsorten. Die Liste führt zu den Produkten darin." },
          { title: "Leistungen nach Gruppen", text: "Zuschnitt, Biegen und Schweißen in eigenen Reitern. Jede Leistung hat eine eigene Seite mit technischen Daten, etwa Stärken je Material, und ein Anfrageformular." },
          { title: "Produkt mit Maßen und Anfrage", text: "Eine Tabelle der Lagervarianten als Stärke x Breite x Länge, daneben ein Formular. Das Produkt ist schon eingetragen, der Kunde ergänzt Maß und Menge." },
        ],
        adminIntro: "Das Admin-Panel ist für Inhalte und Anfragen da: Produkte, Leistungen, Blog und Portfolio werden hier sortiert und bearbeitet, neue Anfragen stehen ganz oben.",
        admin: [
          { title: "Übersicht", text: "Anzahl neuer Anfragen, Produkte, Leistungen, Artikel und Portfolio-Objekte, dazu Schnellzugriffe auf jeden Bereich. Die Zahlen im Screenshot sind ausgeblendet." },
          { title: "Produkte", text: "Die Produkte werden nach Kategorie angezeigt. Sortiert wird per Drag & Drop oder mit Pfeilen, die Kategorien verwaltet ein eigener Button. Die Zahlen im Screenshot sind ausgeblendet." },
          { title: "Leistungen", text: "Laser- und Plasmaschneiden, Tafelschere, Biegen und die übrigen Leistungen in der Reihenfolge der Website. Jede lässt sich bearbeiten oder mit Pfeilen verschieben." },
          { title: "Blog", text: "Artikel über Blechsorten, Profile, Sandwichpaneele und Bewehrungsstahl. Ein neuer Artikel kommt mit einem Klick dazu, die Reihenfolge ändert sich per Drag & Drop." },
        ],
        more: [
          "Anfragen aus den Formularen der Website, gesammelt im Panel",
          "Portfolio mit gefertigten Zäunen, Toren und Konstruktionen",
          "Kontaktformular mit Wahl der Anfrageart: Material, Leistung oder Fertigung nach Projekt",
          "Buttons für Anruf und E-Mail auf jeder Seite",
          "Blog mit Ratgebern, zum Beispiel wie man das Gewicht von Profilen und Blech berechnet",
        ],
      },
      nl: {
        task: "Een handelaar in ferro- en non-ferrometalen, sandwichpanelen en metaalbewerking wilde een website waar klanten het profiel, de plaat of de dienst vinden, de maten op voorraad zien en een aanvraag voor prijs en levertijd sturen, zonder voor elk detail te bellen.",
        site: [
          { title: "Metaalcategorieën", text: "Kokerprofielen, buizen, plaatstaal, platte en ronde staven, betonstaal, sandwichpanelen en hoekprofielen, elke categorie met haar belangrijkste soorten. De lijst leidt naar de producten erin." },
          { title: "Diensten per groep", text: "Snijden, plooien en lassen in aparte tabbladen. Elke dienst heeft een eigen pagina met technische gegevens, zoals diktes per materiaal, en een aanvraagformulier." },
          { title: "Product met maten en aanvraag", text: "Een tabel met de varianten op voorraad als dikte x breedte x lengte, met een formulier ernaast. Het product staat al ingevuld, de klant vult maat en aantal aan." },
        ],
        adminIntro: "Het beheerpaneel is er voor inhoud en aanvragen: producten, diensten, blog en portfolio worden hier geordend en bewerkt, met nieuwe aanvragen bovenaan.",
        admin: [
          { title: "Dashboard", text: "Het aantal nieuwe aanvragen, producten, diensten, artikels en portfolio-items, plus snelkoppelingen naar elk deel. De cijfers op de schermafbeelding zijn verborgen." },
          { title: "Producten", text: "De producten staan per categorie. Ze worden geordend met slepen of pijltjes, en de categorieën beheer je via een aparte knop. De cijfers op de schermafbeelding zijn verborgen." },
          { title: "Diensten", text: "Laser- en plasmasnijden, guillotine, plooien en de andere diensten in de volgorde van de website. Elke dienst kan bewerkt of met pijltjes verplaatst worden." },
          { title: "Blog", text: "Artikels over soorten plaatstaal, profielen, sandwichpanelen en betonstaal. Een nieuw artikel voeg je toe met één knop, de volgorde wijzig je met slepen." },
        ],
        more: [
          "Aanvragen uit de formulieren van de website, verzameld in het paneel",
          "Portfolio met afgewerkte omheiningen, poorten en constructies",
          "Contactformulier met keuze van het type aanvraag: materialen, een dienst of maatwerk",
          "Knoppen om te bellen en te mailen op elke pagina",
          "Blog met gidsen, bijvoorbeeld hoe je het gewicht van profielen en plaatstaal berekent",
        ],
      },
    },
  },

  aloeway: {
    site: ["/work/case/aloeway-choice.webp", "/work/case/aloeway-subscription.webp", "/work/case/aloeway-business.webp"],
    admin: ["/work/admin/aloeway-dashboard.webp", "/work/admin/aloeway-products.webp", "/work/admin/aloeway-meta.webp", "/work/admin/aloeway-blog.webp"],
    copy: {
      bg: {
        task: "Независим партньор на LR Health & Beauty искаше един сайт за две различни неща: онлайн магазин за продуктите с месечни абонаментни комплекти и отделна част, която обяснява партньорството спокойно и без обещания, с рекламни страници за Facebook и Instagram.",
        site: [
          { title: "Здраве или бизнес", text: "Още на входа посетителят избира пътя си. Двете части имат собствено меню, цветове и блог, а превключвателят горе води от едната в другата." },
          { title: "Абонаментни комплекти", text: "Избраният комплект идва всеки месец с отстъпка и безплатна доставка и може да се смени във всеки месец. Поръчката е без регистрация, с наложен платеж." },
          { title: "Бизнес частта", text: "Как работи партньорството, без обещания за доход, и кратък тест от четири въпроса, след който човек вижда дали изобщо има смисъл да започне." },
        ],
        adminIntro: "Един админ панел за двете части: магазинът на „Здраве“, рекламните страници на „Бизнес“ и общите запитвания и блог.",
        admin: [
          { title: "Табло", text: "Нови поръчки, поръчки за месеца и новите запитвания, разделени на Здраве и Бизнес. Отдолу са последните поръчки и запитвания. На снимката числата и имената са скрити." },
          { title: "Продукти", text: "Филтри по единични, абонаментни и 3+1 продукти и по активни и неактивни. С молива се сменят име, снимка, цена, вид и категория, без да се отваря продуктът, а превключвателите „Активен“ и „Ново“ записват веднага. На снимката цените са скрити." },
          { title: "Meta реклами", text: "Страници за реклами във Facebook и Instagram. Черновата се вижда само от собственика, докато не я публикува. Всяка страница има преглед на телефон, копиране на линка и дубликат." },
          { title: "Блог", text: "Статиите от двата блога, Здраве и Бизнес, на едно място, с филтър за публикувани и чернови. Превключвателят публикува или скрива статията веднага." },
        ],
        more: [
          "Каталог по продуктови линии с търсене и цени в евро и лева",
          "Комплекти 3+1 и подаръци за редовност в абонамента",
          "Поръчките и запитванията се водят в панела, със статус за всяка поръчка",
          "Категориите на магазина се управляват отделно",
          "Готови рекламни страници, които събират заявки, и копие, което се редактира свободно",
          "Правни страници, онлайн форма за отказ от договора и законова гаранция",
        ],
      },
      en: {
        task: "An independent LR Health & Beauty partner wanted one site for two different things: an online shop for the products with monthly subscription sets, and a separate part that explains the partnership calmly and without promises, with landing pages for Facebook and Instagram ads.",
        site: [
          { title: "Health or business", text: "Right at the entrance the visitor picks a path. Each part has its own menu, colours and blog, and the switch at the top leads from one to the other." },
          { title: "Subscription sets", text: "The chosen set arrives every month with a discount and free delivery, and it can be changed in any month. Ordering needs no account and is paid on delivery." },
          { title: "The business part", text: "How the partnership works, with no income promises, and a short four-question test that shows whether starting makes sense at all." },
        ],
        adminIntro: "One admin panel for both parts: the Health shop, the Business ad pages, and the shared enquiries and blog.",
        admin: [
          { title: "Dashboard", text: "New orders, orders this month and new enquiries, split into Health and Business. Below are the latest orders and enquiries. The numbers and names in the screenshot are hidden." },
          { title: "Products", text: "Filters for single, subscription and 3+1 products and for active and inactive ones. The pencil changes name, image, price, type and category without opening the product, and the \"Active\" and \"New\" switches save instantly. The prices in the screenshot are hidden." },
          { title: "Meta ads", text: "Pages for Facebook and Instagram ads. A draft is visible only to the owner until it is published. Every page has a phone preview, a copy-link button and a duplicate option." },
          { title: "Blog", text: "Articles from both blogs, Health and Business, in one place, with a filter for published and drafts. The switch publishes or hides an article instantly." },
        ],
        more: [
          "A catalogue by product line with search and prices in euro and leva",
          "3+1 sets and loyalty gifts in the subscription",
          "Orders and enquiries are handled in the panel, with a status for every order",
          "Shop categories are managed separately",
          "Ready ad pages that collect requests, and copies that can be edited freely",
          "Legal pages, an online contract withdrawal form and statutory warranty",
        ],
      },
      de: {
        task: "Ein unabhängiger Partner von LR Health & Beauty wollte eine Website für zwei verschiedene Dinge: einen Online-Shop für die Produkte mit monatlichen Abo-Sets und einen eigenen Bereich, der die Partnerschaft ruhig und ohne Versprechen erklärt, mit Landingpages für Werbung auf Facebook und Instagram.",
        site: [
          { title: "Gesundheit oder Business", text: "Schon am Eingang wählt der Besucher seinen Weg. Beide Bereiche haben eigenes Menü, eigene Farben und einen eigenen Blog, und der Umschalter oben führt vom einen zum anderen." },
          { title: "Abo-Sets", text: "Das gewählte Set kommt jeden Monat mit Rabatt und kostenloser Lieferung und lässt sich in jedem Monat wechseln. Bestellt wird ohne Registrierung, bezahlt per Nachnahme." },
          { title: "Der Business-Bereich", text: "Wie die Partnerschaft funktioniert, ohne Einkommensversprechen, und ein kurzer Test mit vier Fragen, der zeigt, ob ein Einstieg überhaupt sinnvoll ist." },
        ],
        adminIntro: "Ein Admin-Panel für beide Bereiche: den Shop von „Gesundheit“, die Werbeseiten von „Business“ und die gemeinsamen Anfragen und den Blog.",
        admin: [
          { title: "Übersicht", text: "Neue Bestellungen, Bestellungen im Monat und neue Anfragen, getrennt nach Gesundheit und Business. Darunter die letzten Bestellungen und Anfragen. Zahlen und Namen im Screenshot sind ausgeblendet." },
          { title: "Produkte", text: "Filter nach Einzel-, Abo- und 3+1-Produkten sowie nach aktiv und inaktiv. Mit dem Stift ändern sich Name, Bild, Preis, Art und Kategorie, ohne das Produkt zu öffnen, und die Schalter „Aktiv“ und „Neu“ speichern sofort. Die Preise im Screenshot sind ausgeblendet." },
          { title: "Meta-Werbung", text: "Seiten für Werbung auf Facebook und Instagram. Ein Entwurf ist nur für den Inhaber sichtbar, bis er veröffentlicht wird. Jede Seite hat eine Handy-Vorschau, Link kopieren und Duplizieren." },
          { title: "Blog", text: "Die Artikel beider Blogs, Gesundheit und Business, an einem Ort, mit Filter für veröffentlicht und Entwürfe. Der Schalter veröffentlicht oder verbirgt einen Artikel sofort." },
        ],
        more: [
          "Katalog nach Produktlinien mit Suche und Preisen in Euro und Lew",
          "3+1-Sets und Treuegeschenke im Abo",
          "Bestellungen und Anfragen laufen über das Panel, mit Status für jede Bestellung",
          "Die Shop-Kategorien werden separat verwaltet",
          "Fertige Werbeseiten, die Anfragen sammeln, und Kopien, die frei bearbeitet werden",
          "Rechtliche Seiten, Online-Formular für den Widerruf und gesetzliche Gewährleistung",
        ],
      },
      nl: {
        task: "Een onafhankelijke partner van LR Health & Beauty wilde één website voor twee verschillende dingen: een webshop voor de producten met maandelijkse abonnementspakketten, en een apart deel dat het partnerschap rustig en zonder beloftes uitlegt, met landingspagina's voor advertenties op Facebook en Instagram.",
        site: [
          { title: "Gezondheid of business", text: "Meteen bij de ingang kiest de bezoeker zijn weg. Elk deel heeft een eigen menu, eigen kleuren en een eigen blog, en de schakelaar bovenaan leidt van het ene naar het andere." },
          { title: "Abonnementspakketten", text: "Het gekozen pakket komt elke maand met korting en gratis levering, en kan in elke maand worden gewisseld. Bestellen kan zonder account, betalen bij levering." },
          { title: "Het businessdeel", text: "Hoe het partnerschap werkt, zonder inkomensbeloftes, en een korte test van vier vragen die toont of beginnen überhaupt zin heeft." },
        ],
        adminIntro: "Eén beheerpaneel voor beide delen: de winkel van \"Gezondheid\", de advertentiepagina's van \"Business\" en de gedeelde aanvragen en blog.",
        admin: [
          { title: "Dashboard", text: "Nieuwe bestellingen, bestellingen deze maand en nieuwe aanvragen, opgesplitst in Gezondheid en Business. Daaronder de laatste bestellingen en aanvragen. De cijfers en namen op de schermafbeelding zijn verborgen." },
          { title: "Producten", text: "Filters op losse, abonnements- en 3+1-producten en op actief en inactief. Met het potlood wijzig je naam, foto, prijs, type en categorie zonder het product te openen, en de schakelaars \"Actief\" en \"Nieuw\" slaan meteen op. De prijzen op de schermafbeelding zijn verborgen." },
          { title: "Meta-advertenties", text: "Pagina's voor advertenties op Facebook en Instagram. Een concept is alleen zichtbaar voor de eigenaar tot het gepubliceerd wordt. Elke pagina heeft een voorbeeld op gsm, link kopiëren en dupliceren." },
          { title: "Blog", text: "De artikels van beide blogs, Gezondheid en Business, op één plek, met een filter op gepubliceerd en concepten. De schakelaar publiceert of verbergt een artikel meteen." },
        ],
        more: [
          "Een catalogus per productlijn met zoeken en prijzen in euro en lev",
          "3+1-pakketten en getrouwheidsgeschenken in het abonnement",
          "Bestellingen en aanvragen lopen via het paneel, met een status per bestelling",
          "De winkelcategorieën worden apart beheerd",
          "Kant-en-klare advertentiepagina's die aanvragen verzamelen, en kopieën die vrij te bewerken zijn",
          "Juridische pagina's, een online herroepingsformulier en wettelijke garantie",
        ],
      },
    },
  },

  "opaka-fits": {
    site: ["/work/case/opaka-fits-booking.webp", "/work/case/opaka-fits-menu.webp", "/work/case/opaka-fits-menu-phone.webp"],
    admin: ["/work/admin/opaka-fits-requests.webp", "/work/admin/opaka-fits-calendar.webp", "/work/admin/opaka-fits-menu-dishes.webp", "/work/admin/opaka-fits-menu-categories.webp"],
    copy: {
      bg: {
        task: "Комплекс в Опака с басейн, ресторант и две стаи за нощувка искаше сайт, през който гостите изпращат заявка за свободни дати без онлайн плащане, и дигитално меню за ресторанта на три езика, което се поддържа актуално от самия комплекс.",
        site: [
          { title: "Заявка за нощувка", text: "Гостът избира дати, брой хора и стая и вижда дали стаята е свободна. Заявката не е резервация и през сайта не се плаща: комплексът потвърждава лично, а при нужда иска депозит по банков път." },
          { title: "Дигитално меню", text: "Отделен сайт с менюто на ресторанта: категории, търсене, грамаж и цена на всяко ястие. Отваря се от бутон на сайта на комплекса." },
          { title: "Менюто на телефона", text: "На български, турски и английски, с лента с категориите, която остава горе при скролиране. Телефонът и работното време са с едно натискане." },
        ],
        adminIntro: "Комплексът има два админ панела: един за заявките и стаите от сайта и един за дигиталното меню.",
        admin: [
          { title: "Заявки", text: "Отгоре кой пристига днес, кой заминава и кой е в момента в комплекса. Заявките се търсят и филтрират по статус: за решение, за преглед, чака депозит, потвърдена, анулирана, отказана, изтекла. Вдясно са детайлите, депозитът и действията. На снимката числата и имената са скрити." },
          { title: "Календар на стаите", text: "Месечен изглед за двете стаи с отделен цвят за резервация, задържане, Booking.com, поддръжка и затворена стая. С „Затвори стая“ се блокират дати, а блокираните периоди са в списък отдолу." },
          { title: "Ястия в менюто", text: "Ястията по категории с цена и грамаж, търсене във всички категории и подреждане със стрелки. Промените се записват с „Запази“, могат да се върнат, а „Виж менюто“ отваря менюто на живо." },
          { title: "Категории на менюто", text: "Името на всяка категория се въвежда на трите езика. Редът в панела е редът в менюто, а категория се изтрива с едно натискане." },
        ],
        more: [
          "Настройки на менюто: телефон, работно време и знак на валутата",
          "Страници за стаите, басейна, ресторанта и събитията",
          "Запитване за сватба, рожден ден или празнична вечер",
          "Работно време и дали ресторантът е отворен в момента",
          "Бутон за WhatsApp и упътване до комплекса",
        ],
      },
      en: {
        task: "A complex in Opaka with a pool, a restaurant and two guest rooms wanted a site where guests send a request for free dates without paying online, and a digital restaurant menu in three languages that the complex keeps up to date itself.",
        site: [
          { title: "Stay request", text: "The guest picks dates, number of people and a room and sees whether the room is free. The request is not a booking and nothing is paid on the site: the complex confirms personally and, when needed, asks for a deposit by bank transfer." },
          { title: "Digital menu", text: "A separate site with the restaurant menu: categories, search, weight and price for every dish. It opens from a button on the complex's site." },
          { title: "The menu on a phone", text: "In Bulgarian, Turkish and English, with a category bar that stays on top while scrolling. Phone number and opening hours are one tap away." },
        ],
        adminIntro: "The complex has two admin panels: one for the requests and rooms from the site, and one for the digital menu.",
        admin: [
          { title: "Requests", text: "At the top: who arrives today, who leaves and who is staying right now. Requests can be searched and filtered by status: to decide, to review, awaiting deposit, confirmed, cancelled, declined, expired. Details, the deposit and the actions are on the right. The numbers and names in the screenshot are hidden." },
          { title: "Room calendar", text: "A monthly view of both rooms with a separate colour for booking, hold, Booking.com, maintenance and closed. \"Close room\" blocks dates, and the blocked periods are listed below." },
          { title: "Menu dishes", text: "Dishes by category with price and weight, search across all categories and reordering with arrows. Changes are saved with \"Save\", can be undone, and \"View menu\" opens the live menu." },
          { title: "Menu categories", text: "Each category name is entered in all three languages. The order in the panel is the order in the menu, and a category is deleted with one click." },
        ],
        more: [
          "Menu settings: phone, opening hours and currency sign",
          "Pages for the rooms, the pool, the restaurant and events",
          "Enquiries for a wedding, a birthday or a holiday evening",
          "Opening hours and whether the restaurant is open right now",
          "A WhatsApp button and directions to the complex",
        ],
      },
      de: {
        task: "Eine Anlage in Opaka mit Pool, Restaurant und zwei Gästezimmern wollte eine Website, über die Gäste eine Anfrage für freie Termine ohne Online-Zahlung schicken, und eine digitale Speisekarte in drei Sprachen, die die Anlage selbst aktuell hält.",
        site: [
          { title: "Übernachtungsanfrage", text: "Der Gast wählt Daten, Personenzahl und Zimmer und sieht, ob das Zimmer frei ist. Die Anfrage ist keine Buchung und auf der Website wird nichts bezahlt: Die Anlage bestätigt persönlich und verlangt bei Bedarf eine Anzahlung per Überweisung." },
          { title: "Digitale Speisekarte", text: "Eine eigene Website mit der Speisekarte des Restaurants: Kategorien, Suche, Gewicht und Preis jedes Gerichts. Sie öffnet sich über einen Button auf der Website der Anlage." },
          { title: "Die Karte auf dem Handy", text: "Auf Bulgarisch, Türkisch und Englisch, mit einer Kategorieleiste, die beim Scrollen oben bleibt. Telefon und Öffnungszeiten sind einen Tipp entfernt." },
        ],
        adminIntro: "Die Anlage hat zwei Admin-Panels: eines für die Anfragen und Zimmer der Website und eines für die digitale Speisekarte.",
        admin: [
          { title: "Anfragen", text: "Oben steht, wer heute anreist, wer abreist und wer gerade da ist. Anfragen lassen sich suchen und nach Status filtern: zu entscheiden, zu prüfen, wartet auf Anzahlung, bestätigt, storniert, abgelehnt, abgelaufen. Rechts stehen Details, Anzahlung und Aktionen. Zahlen und Namen im Screenshot sind ausgeblendet." },
          { title: "Zimmerkalender", text: "Monatsansicht beider Zimmer mit eigener Farbe für Buchung, Reservierung auf Zeit, Booking.com, Wartung und geschlossen. Mit „Zimmer schließen“ werden Daten gesperrt, die gesperrten Zeiträume stehen darunter in einer Liste." },
          { title: "Gerichte", text: "Die Gerichte nach Kategorien mit Preis und Gewicht, Suche über alle Kategorien und Sortieren mit Pfeilen. Änderungen werden mit „Speichern“ übernommen, lassen sich rückgängig machen, und „Karte ansehen“ öffnet die Live-Karte." },
          { title: "Kategorien", text: "Der Name jeder Kategorie wird in allen drei Sprachen eingegeben. Die Reihenfolge im Panel ist die Reihenfolge in der Karte, und eine Kategorie lässt sich mit einem Klick löschen." },
        ],
        more: [
          "Einstellungen der Karte: Telefon, Öffnungszeiten und Währungszeichen",
          "Seiten für Zimmer, Pool, Restaurant und Veranstaltungen",
          "Anfragen für Hochzeit, Geburtstag oder Festabend",
          "Öffnungszeiten und ob das Restaurant gerade geöffnet ist",
          "WhatsApp-Button und Anfahrt zur Anlage",
        ],
      },
      nl: {
        task: "Een complex in Opaka met een zwembad, een restaurant en twee gastenkamers wilde een website waarop gasten een aanvraag voor vrije data sturen zonder online te betalen, en een digitale menukaart in drie talen die het complex zelf actueel houdt.",
        site: [
          { title: "Aanvraag voor een verblijf", text: "De gast kiest data, aantal personen en een kamer en ziet of de kamer vrij is. De aanvraag is geen boeking en op de website wordt niets betaald: het complex bevestigt persoonlijk en vraagt indien nodig een voorschot via overschrijving." },
          { title: "Digitale menukaart", text: "Een aparte website met de kaart van het restaurant: categorieën, zoeken, gewicht en prijs van elk gerecht. Ze opent via een knop op de website van het complex." },
          { title: "De kaart op de gsm", text: "In het Bulgaars, Turks en Engels, met een categoriebalk die bovenaan blijft tijdens het scrollen. Telefoon en openingsuren zijn één tik verwijderd." },
        ],
        adminIntro: "Het complex heeft twee beheerpanelen: één voor de aanvragen en kamers van de website en één voor de digitale menukaart.",
        admin: [
          { title: "Aanvragen", text: "Bovenaan wie vandaag aankomt, wie vertrekt en wie er nu verblijft. Aanvragen zijn doorzoekbaar en te filteren op status: te beslissen, na te kijken, wacht op voorschot, bevestigd, geannuleerd, geweigerd, verlopen. Rechts staan de details, het voorschot en de acties. De cijfers en namen op de schermafbeelding zijn verborgen." },
          { title: "Kamerkalender", text: "Een maandoverzicht van beide kamers met een eigen kleur voor boeking, optie, Booking.com, onderhoud en gesloten. Met \"Kamer sluiten\" worden data geblokkeerd, en de geblokkeerde periodes staan in een lijst eronder." },
          { title: "Gerechten", text: "De gerechten per categorie met prijs en gewicht, zoeken in alle categorieën en volgorde wijzigen met pijltjes. Wijzigingen worden bewaard met \"Opslaan\", kunnen ongedaan worden gemaakt, en \"Bekijk menu\" opent de live kaart." },
          { title: "Categorieën", text: "De naam van elke categorie wordt in de drie talen ingevuld. De volgorde in het paneel is de volgorde op de kaart, en een categorie wordt met één klik verwijderd." },
        ],
        more: [
          "Instellingen van de kaart: telefoon, openingsuren en valutateken",
          "Pagina's voor de kamers, het zwembad, het restaurant en evenementen",
          "Aanvragen voor een huwelijk, een verjaardag of een feestavond",
          "Openingsuren en of het restaurant nu open is",
          "Een WhatsApp-knop en routebeschrijving naar het complex",
        ],
      },
    },
  },
};
