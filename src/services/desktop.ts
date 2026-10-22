import type { Service } from "./index";

/**
 * Десктоп приложения за Windows и macOS: склад, фактури, работни карти, принтери и устройства, работа офлайн.
 * Без измислени резултати и срокове; цената се казва след разговор.
 */
export const desktopService: Service = {
  id: "desktop",
  key: "desktop",
  visual: { vignette: "desktop" },
  caseIcons: ["Monitor", "WifiOff", "Printer", "ScanText", "FileText", "LayoutDashboard"],
  tag: null,
  accent: "#22D3EE",
  relatedPosts: [],
  includeIcons: [],
  forWhomIcons: [],
  content: {
    bg: {
      slug: "desktop-prilozhenia",
      metaTitle: "Десктоп приложения за Windows и macOS | Rafetov.com",
      metaDescription:
        "Програма за компютъра в офиса или цеха: склад, фактури, работни карти, връзка с принтери, баркод четци и касови апарати. Работи и без интернет, синхронизира после.",
      title: "Програма за офиса и производството",
      intro:
        "Приложение за компютъра, когато работата е в офиса, в склада или в цеха: склад и наличности, фактури, работни карти. Връзка с принтери, баркод четци и касови апарати. Работи и без интернет и синхронизира данните, щом има връзка.",
      priceLine: "",
      cases: [
        { title: "Склад и наличности", text: "Приемане, изписване и наличности по артикул и склад. Виждате кое свършва, преди клиентът да го поиска." },
        { title: "Работа без интернет", text: "В цеха или на склада връзката често пада. Програмата работи на компютъра и изпраща данните към офиса, щом има интернет." },
        { title: "Принтери и етикети", text: "Етикети за стока, товарителници и фактури излизат директно на принтера, без копиране в друга програма." },
        { title: "Баркод четци и касови апарати", text: "Сканирате артикула и той влиза в поръчката. Продажбата отива към касовия апарат по изискванията на НАП." },
        { title: "Работни карти и фактури", text: "Поръчка, материали, часове и готова фактура на едно място. Историята на всеки клиент е на един клик." },
        { title: "Справки", text: "Продажби, наличности, изработка по човек или машина. Справката се изтегля в Excel или PDF за счетоводителя." },
      ],
      includes: [],
      forWhom: [
        "Цехове и производства със склад и работни карти",
        "Магазини и складове с баркодове и касови апарати",
        "Сервизи, които описват ремонти, части и часове",
        "Офиси със стара програма, която никой вече не поддържа",
      ],
      steps: [
        { title: "Разговор на място или онлайн", text: "Гледаме как работите сега: кои програми, кои устройства, кои хартии. Записваме какво трябва да върши програмата и какво може да остане както е." },
        { title: "Прототип с ваши данни", text: "Правим първа версия с реалните ви артикули и клиенти, за да я пробвате в работата, а не на примери." },
        { title: "Инсталиране и връзка с устройствата", text: "Инсталираме програмата на компютрите ви, свързваме принтери, четци и касови апарати и прехвърляме данните от старата програма или таблиците." },
        { title: "Обучение и промени по заявка", text: "Показваме на екипа как се работи с програмата. Когато по-късно ви трябва промяна или обновление, ни пишете: казваме цената предварително и го правим." },
      ],
      faq: [
        {
          q: "Защо програма за компютъра, а не нещо в браузъра?",
          a: "Когато трябва работа без интернет, бърза работа с клавиатура и четец или директна връзка с принтери и касови апарати, програмата на компютъра е по-сигурна. Ако това не ви трябва, ще ви предложим уеб версия.",
        },
        {
          q: "Ще работи ли на нашите компютри?",
          a: "Правим я за Windows и macOS. Преди да започнем, проверяваме конкретните ви компютри и устройства и ви казваме дали нещо трябва да се смени.",
        },
        {
          q: "Какво става с данните, ако компютърът се повреди?",
          a: "Данните се синхронизират със сървър и се правят резервни копия. На нов компютър инсталирате програмата и продължавате от там, където сте спрели.",
        },
        {
          q: "Колко струва?",
          a: "Зависи от модулите и устройствата, които трябва да се свържат. Казваме ви фиксирана цена след безплатен разговор по телефон или Google Meet. Няма месечна такса: промени по-късно се правят по заявка, а цената им казваме предварително.",
        },
      ],
    },
    en: {
      slug: "desktop-software",
      metaTitle: "Desktop software for Windows and macOS | Rafetov.com",
      metaDescription:
        "Software for the computer in your office or workshop: stock, invoices, job cards, printers, barcode scanners and POS devices. Works without internet and syncs later.",
      title: "Software for the office and the workshop",
      intro:
        "A desktop application for when the work happens in the office, the warehouse or on the shop floor: stock levels, invoices, job cards. Connected to printers, barcode scanners and POS devices. Works without internet and syncs the data as soon as there is a connection.",
      priceLine: "",
      cases: [
        { title: "Stock and inventory", text: "Goods in, goods out and stock levels per item and location. You see what is running low before a customer asks for it." },
        { title: "Working without internet", text: "On the shop floor or in the warehouse the connection often drops. The software runs on the computer and sends the data to the office once it is back online." },
        { title: "Printers and labels", text: "Product labels, delivery notes and invoices go straight to the printer, with no copying into another program." },
        { title: "Barcode scanners and POS devices", text: "You scan the item and it goes into the order. The sale is passed on to the till according to the local fiscal rules." },
        { title: "Job cards and invoices", text: "Order, materials, hours and the finished invoice in one place. Each customer's history is one click away." },
        { title: "Reports", text: "Sales, stock, output per person or machine. The report exports to Excel or PDF for your accountant." },
      ],
      includes: [],
      forWhom: [
        "Workshops and manufacturers with a warehouse and job cards",
        "Shops and warehouses with barcodes and tills",
        "Repair shops that record repairs, parts and hours",
        "Offices with an old program that nobody maintains any more",
      ],
      steps: [
        { title: "A visit or a call", text: "We look at how you work now: which programs, which devices, which paper forms. We write down what the software has to do and what can stay as it is." },
        { title: "A prototype with your data", text: "We build a first version with your real products and customers, so you test it in daily work and not on sample data." },
        { title: "Installation and devices", text: "We install the software on your computers, connect printers, scanners and tills and move the data over from the old program or spreadsheets." },
        { title: "Training and changes on request", text: "We show the team how to work with the software. When you later need a change or an update, you write to us: we tell you the price in advance and do it." },
      ],
      faq: [
        {
          q: "Why a desktop program and not something in the browser?",
          a: "When you need to work without internet, work fast with a keyboard and scanner, or connect directly to printers and tills, a desktop program is more reliable. If you do not need that, we will suggest a web version.",
        },
        {
          q: "Will it run on our computers?",
          a: "We build it for Windows and macOS. Before we start, we check your actual computers and devices and tell you if anything needs replacing.",
        },
        {
          q: "What happens to the data if a computer breaks?",
          a: "The data is synced to a server and backed up. On a new computer you install the software and carry on from where you stopped.",
        },
        {
          q: "How much does it cost?",
          a: "It depends on the modules and the devices that need connecting. We give you a fixed price after a free call by phone or Google Meet. There is no monthly fee: later changes are done on request, with the price told in advance.",
        },
      ],
    },
    de: {
      slug: "desktop-software",
      metaTitle: "Desktop-Software für Windows und macOS | Rafetov.com",
      metaDescription:
        "Software für den Computer in Büro oder Werkstatt: Lager, Rechnungen, Arbeitskarten, Drucker, Scanner und Kassen. Läuft auch ohne Internet und gleicht später ab.",
      title: "Software für Büro und Werkstatt",
      intro:
        "Eine Anwendung für den Computer, wenn die Arbeit im Büro, im Lager oder in der Halle passiert: Bestände, Rechnungen, Arbeitskarten. Verbunden mit Druckern, Barcode-Scannern und Kassensystemen. Läuft auch ohne Internet und gleicht die Daten ab, sobald Verbindung da ist.",
      priceLine: "",
      cases: [
        { title: "Lager und Bestände", text: "Wareneingang, Entnahme und Bestände je Artikel und Lagerort. Sie sehen, was knapp wird, bevor ein Kunde danach fragt." },
        { title: "Arbeiten ohne Internet", text: "In der Halle oder im Lager bricht die Verbindung oft ab. Die Software läuft auf dem Computer und schickt die Daten ans Büro, sobald wieder Internet da ist." },
        { title: "Drucker und Etiketten", text: "Warenetiketten, Lieferscheine und Rechnungen gehen direkt an den Drucker, ohne Kopieren in ein anderes Programm." },
        { title: "Barcode-Scanner und Kassensysteme", text: "Sie scannen den Artikel, und er landet im Auftrag. Der Verkauf wird an die Kasse übergeben, wie es die Vorschriften verlangen." },
        { title: "Arbeitskarten und Rechnungen", text: "Auftrag, Material, Stunden und die fertige Rechnung an einem Ort. Die Historie jedes Kunden ist einen Klick entfernt." },
        { title: "Auswertungen", text: "Verkäufe, Bestände, Leistung je Mitarbeiter oder Maschine. Die Auswertung geht als Excel oder PDF an den Steuerberater." },
      ],
      includes: [],
      forWhom: [
        "Werkstätten und Produktionsbetriebe mit Lager und Arbeitskarten",
        "Läden und Lager mit Barcodes und Kassen",
        "Reparaturbetriebe, die Reparaturen, Teile und Stunden erfassen",
        "Büros mit einem alten Programm, das niemand mehr pflegt",
      ],
      steps: [
        { title: "Besuch vor Ort oder Gespräch online", text: "Wir sehen uns an, wie Sie heute arbeiten: welche Programme, welche Geräte, welche Zettel. Wir halten fest, was die Software können muss und was bleiben kann, wie es ist." },
        { title: "Prototyp mit Ihren Daten", text: "Wir bauen eine erste Version mit Ihren echten Artikeln und Kunden, damit Sie sie im Alltag testen und nicht an Beispielen." },
        { title: "Installation und Geräte", text: "Wir installieren die Software auf Ihren Computern, verbinden Drucker, Scanner und Kassen und übernehmen die Daten aus dem alten Programm oder den Tabellen." },
        { title: "Einweisung und Änderungen auf Anfrage", text: "Wir zeigen dem Team die Bedienung der Software. Brauchen Sie später eine Änderung oder ein Update, schreiben Sie uns: Wir nennen den Preis vorab und setzen es um." },
      ],
      faq: [
        {
          q: "Warum ein Programm für den Computer und nichts im Browser?",
          a: "Wenn Sie ohne Internet arbeiten, schnell mit Tastatur und Scanner erfassen oder Drucker und Kassen direkt anbinden müssen, ist ein Desktop-Programm zuverlässiger. Wenn Sie das nicht brauchen, schlagen wir Ihnen eine Web-Version vor.",
        },
        {
          q: "Läuft das auf unseren Computern?",
          a: "Wir bauen die Software für Windows und macOS. Vor dem Start prüfen wir Ihre konkreten Computer und Geräte und sagen Ihnen, ob etwas ersetzt werden muss.",
        },
        {
          q: "Was passiert mit den Daten, wenn ein Computer kaputtgeht?",
          a: "Die Daten werden mit einem Server abgeglichen und gesichert. Auf einem neuen Computer installieren Sie die Software und machen dort weiter, wo Sie aufgehört haben.",
        },
        {
          q: "Was kostet das?",
          a: "Das hängt von den Modulen und den Geräten ab, die angebunden werden müssen. Sie bekommen nach einem kostenlosen Gespräch per Telefon oder Google Meet einen Festpreis. Es gibt keine monatliche Gebühr: Spätere Änderungen erledigen wir auf Anfrage, den Preis nennen wir vorab.",
        },
      ],
    },
    nl: {
      slug: "desktopsoftware",
      metaTitle: "Desktopsoftware voor Windows en macOS | Rafetov.com",
      metaDescription:
        "Software voor de computer op kantoor of in het atelier: voorraad, facturen, werkbonnen, printers, scanners en kassa's. Werkt ook zonder internet, synchroniseert later.",
      title: "Software voor kantoor en atelier",
      intro:
        "Een programma voor de computer wanneer het werk op kantoor, in het magazijn of in het atelier gebeurt: voorraad, facturen, werkbonnen. Gekoppeld aan printers, barcodescanners en kassasystemen. Werkt ook zonder internet en synchroniseert de gegevens zodra er verbinding is.",
      priceLine: "",
      cases: [
        { title: "Voorraad en stock", text: "Ontvangst, uitgifte en voorraad per artikel en per magazijn. U ziet wat bijna op is voordat een klant ernaar vraagt." },
        { title: "Werken zonder internet", text: "In het atelier of het magazijn valt de verbinding vaak weg. Het programma draait op de computer en stuurt de gegevens naar het kantoor zodra er weer internet is." },
        { title: "Printers en etiketten", text: "Productetiketten, leverbonnen en facturen gaan rechtstreeks naar de printer, zonder kopiëren naar een ander programma." },
        { title: "Barcodescanners en kassasystemen", text: "U scant het artikel en het komt in de bestelling. De verkoop gaat naar de kassa volgens de geldende regels." },
        { title: "Werkbonnen en facturen", text: "Bestelling, materialen, uren en de afgewerkte factuur op één plek. De geschiedenis van elke klant is één klik ver." },
        { title: "Rapporten", text: "Verkoop, voorraad, productie per persoon of machine. Het rapport gaat als Excel of pdf naar uw boekhouder." },
      ],
      includes: [],
      forWhom: [
        "Ateliers en productiebedrijven met een magazijn en werkbonnen",
        "Winkels en magazijnen met barcodes en kassa's",
        "Herstelbedrijven die herstellingen, onderdelen en uren bijhouden",
        "Kantoren met een oud programma dat niemand nog onderhoudt",
      ],
      steps: [
        { title: "Bezoek ter plaatse of gesprek online", text: "We bekijken hoe u nu werkt: welke programma's, welke toestellen, welke papieren. We noteren wat de software moet doen en wat kan blijven zoals het is." },
        { title: "Prototype met uw gegevens", text: "We bouwen een eerste versie met uw echte artikelen en klanten, zodat u ze test in het dagelijkse werk en niet op voorbeelden." },
        { title: "Installatie en toestellen", text: "We installeren de software op uw computers, koppelen printers, scanners en kassa's en zetten de gegevens over uit het oude programma of de tabellen." },
        { title: "Opleiding en aanpassingen op vraag", text: "We tonen het team hoe de software werkt. Hebt u later een aanpassing of een update nodig, dan schrijft u ons: we geven de prijs vooraf en voeren ze uit." },
      ],
      faq: [
        {
          q: "Waarom een programma voor de computer en niet iets in de browser?",
          a: "Wanneer u zonder internet moet werken, snel moet ingeven met toetsenbord en scanner, of printers en kassa's rechtstreeks moet koppelen, is een desktopprogramma betrouwbaarder. Hebt u dat niet nodig, dan stellen we een webversie voor.",
        },
        {
          q: "Werkt het op onze computers?",
          a: "We bouwen het voor Windows en macOS. Voor we beginnen, controleren we uw computers en toestellen en zeggen we u of er iets vervangen moet worden.",
        },
        {
          q: "Wat gebeurt er met de gegevens als een computer stukgaat?",
          a: "De gegevens worden gesynchroniseerd met een server en er worden back-ups gemaakt. Op een nieuwe computer installeert u het programma en gaat u verder waar u gestopt was.",
        },
        {
          q: "Wat kost het?",
          a: "Dat hangt af van de modules en de toestellen die gekoppeld moeten worden. U krijgt een vaste prijs na een gratis gesprek via telefoon of Google Meet. Er zijn geen maandelijkse kosten: latere aanpassingen doen we op vraag, met de prijs vooraf.",
        },
      ],
    },
  },
};
