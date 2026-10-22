import type { Service } from "./index";

/**
 * Платформи и вътрешни системи: CRM, портали, учебни платформи.
 * Единственото реално доказателство е платформата на ЦЗПО; без измислени резултати, цената се казва след разговор.
 */
export const platformService: Service = {
  id: "platform",
  key: "platform",
  visual: { vignette: "apps" },
  projects: ["czpo"],
  caseIcons: ["Users", "ClipboardList", "CalendarCheck", "FileText", "LayoutDashboard", "Workflow"],
  tag: "platform",
  accent: "#22D3EE",
  relatedPosts: [],
  includeIcons: [],
  forWhomIcons: [],
  content: {
    bg: {
      slug: "platformi-i-sistemi",
      metaTitle: "Платформи и вътрешни системи за бизнеса | CRM, портали | Rafetov.com",
      metaDescription:
        "Вътрешна система, направена за вашата работа: профили с роли, заявки, графици, документи и отчети на едно място. Връзка със сайта, фактурирането и имейла.",
      title: "Система, направена за вашата работа",
      intro:
        "Когато таблиците и чатовете вече не стигат. Профили за клиенти и служители, заявки, графици, документи и отчети на едно място, с права за всеки вид потребител. Така направихме платформата за обучения на ЦЗПО с профили за администратори, преподаватели, курсисти и инспектори.",
      priceLine: "",
      cases: [
        { title: "Профили и роли", text: "Клиенти, служители, партньори или курсисти, всеки със свой вход. Вижда и променя само това, което му е позволено." },
        { title: "Заявки и поръчки", text: "Всяка заявка има статус, отговорник и история. Виждате коя чака, коя е в работа и коя е готова, без да питате в чата." },
        { title: "Графици и смени", text: "График за екипа, обектите или курсовете. Промяната се вижда веднага от всички, за които се отнася." },
        { title: "Документи към всяко досие", text: "Договори, протоколи, сертификати и снимки стоят при клиента или заявката, за която се отнасят, а не в нечий телефон." },
        { title: "Отчети", text: "Справки за свършена работа, часове, плащания или присъствия, готови за изтегляне, вместо да ги събирате на ръка в края на месеца." },
        { title: "Връзка със сайта, фактурирането и имейла", text: "Запитването от сайта влиза в системата, фактурата излиза от нея, а клиентът получава имейл при промяна на статуса." },
      ],
      includes: [],
      forWhom: [
        "Фирми, които водят работата в таблици и чатове и губят информация",
        "Учебни центрове и школи с курсисти, преподаватели и документи",
        "Фирми с офис и екип на терен, които трябва да виждат едно и също",
        "Сервизи и доставчици, чиито клиенти питат докъде е поръчката",
      ],
      steps: [
        { title: "Разговор и схема на работата", text: "Разказвате ни как върви един ден при вас: кой какво прави, къде се губи време. Записваме процеса стъпка по стъпка и казваме честно дали си струва собствена система." },
        { title: "Прототип на екраните", text: "Показваме ви как ще изглеждат основните екрани, преди да е написан код. Поправяме ги заедно, докато отговарят на реалната ви работа." },
        { title: "Разработка на части", text: "Започваме от най-важното, например заявките, и го пускаме в употреба. Останалите части добавяме, докато вече работите с първата." },
        { title: "Пускане, обучение и развитие", text: "Прехвърляме данните, показваме на екипа как се работи и оставаме на линия. Системата расте с фирмата ви." },
      ],
      faq: [
        {
          q: "Защо не готов CRM или готова платформа?",
          a: "Ако готово решение върши работа, ще ви го кажем и ще ви помогнем да го настроите. Собствена система правим, когато процесите ви са специфични и готовите програми ви карат да работите по техния начин, а не по вашия.",
        },
        {
          q: "Къде стоят данните и кой има достъп?",
          a: "На сървър във вашия акаунт или на хостинг, договорен с вас, с ежедневни резервни копия. Достъпът е по роли и вие решавате кой какво вижда. Подписваме договор за обработка на лични данни.",
        },
        {
          q: "Може ли системата да се разширява после?",
          a: "Да, така я правим от самото начало. Обикновено започваме с една част и добавяме следващите, когато първата вече се ползва всеки ден.",
        },
        {
          q: "Колко струва?",
          a: "Зависи от броя на частите и потребителите. Казваме ви фиксирана цена след безплатен разговор по телефон или Google Meet. Хостингът и поддръжката се договарят отделно и ги знаете предварително.",
        },
      ],
    },
    en: {
      slug: "custom-platforms",
      metaTitle: "Custom platforms and internal systems | CRM, portals | Rafetov.com",
      metaDescription:
        "An internal system built for the way you work: accounts with roles, requests, schedules, documents and reports in one place, connected to your site and invoicing.",
      title: "A system built for your work",
      intro:
        "For when spreadsheets and chats are no longer enough. Accounts for clients and staff, requests, schedules, documents and reports in one place, with permissions for every user type. That is how we built the CZPO training platform, with roles for administrators, lecturers, trainees and inspectors.",
      priceLine: "",
      cases: [
        { title: "Accounts and roles", text: "Clients, staff, partners or trainees, each with their own login. They see and change only what they are allowed to." },
        { title: "Requests and orders", text: "Every request has a status, an owner and a history. You see what is waiting, what is in progress and what is done, without asking in the chat." },
        { title: "Schedules and shifts", text: "A schedule for the team, the sites or the courses. A change is visible straight away to everyone it concerns." },
        { title: "Documents on every file", text: "Contracts, reports, certificates and photos sit with the client or request they belong to, not on someone's phone." },
        { title: "Reports", text: "Summaries of work done, hours, payments or attendance, ready to download, instead of collecting them by hand at the end of the month." },
        { title: "Connected to your site, invoicing and email", text: "An enquiry from the website goes into the system, the invoice comes out of it, and the client gets an email when the status changes." },
      ],
      includes: [],
      forWhom: [
        "Companies that run their work in spreadsheets and chats and lose track",
        "Training centres and schools with trainees, lecturers and documents",
        "Companies with an office and a field team that need to see the same thing",
        "Workshops and suppliers whose clients keep asking where their order is",
      ],
      steps: [
        { title: "A call and a map of the work", text: "You tell us how a day at your company goes: who does what and where time gets lost. We write the process down step by step and tell you honestly whether a custom system is worth it." },
        { title: "A prototype of the screens", text: "We show you what the main screens will look like before any code is written. We adjust them together until they match how you really work." },
        { title: "Building in parts", text: "We start with the most important part, for example requests, and put it to use. The other parts are added while you are already working with the first one." },
        { title: "Launch, training and growth", text: "We move your data across, show the team how it works and stay available. The system grows with your business." },
      ],
      faq: [
        {
          q: "Why not an off-the-shelf CRM or platform?",
          a: "If a ready-made tool does the job, we will tell you and help you set it up. We build a custom system when your processes are specific and ready-made software makes you work its way instead of yours.",
        },
        {
          q: "Where is the data kept and who has access?",
          a: "On a server in your own account or on hosting agreed with you, with daily backups. Access is by role and you decide who sees what. We sign a data processing agreement.",
        },
        {
          q: "Can the system be extended later?",
          a: "Yes, it is built that way from the start. We usually begin with one part and add the next ones once the first is in daily use.",
        },
        {
          q: "How much does it cost?",
          a: "It depends on the number of parts and users. We give you a fixed price after a free call by phone or Google Meet. Hosting and maintenance are agreed separately, and you know them in advance.",
        },
      ],
    },
    de: {
      slug: "individualsoftware",
      metaTitle: "Plattformen und interne Systeme | CRM, Portale | Rafetov.com",
      metaDescription:
        "Ein internes System für Ihre Arbeitsweise: Konten mit Rollen, Anfragen, Pläne, Dokumente und Berichte an einem Ort, verbunden mit Website und Rechnungen.",
      title: "Ein System, gebaut für Ihre Arbeit",
      intro:
        "Wenn Tabellen und Chats nicht mehr reichen. Konten für Kunden und Mitarbeiter, Anfragen, Pläne, Dokumente und Berichte an einem Ort, mit Rechten für jeden Nutzertyp. So haben wir die Lernplattform von CZPO gebaut, mit Rollen für Verwaltung, Dozenten, Teilnehmer und Prüfer.",
      priceLine: "",
      cases: [
        { title: "Konten und Rollen", text: "Kunden, Mitarbeiter, Partner oder Teilnehmer, jeder mit eigenem Zugang. Jeder sieht und ändert nur das, was ihm erlaubt ist." },
        { title: "Anfragen und Aufträge", text: "Jede Anfrage hat einen Status, einen Verantwortlichen und einen Verlauf. Sie sehen, was wartet, was in Arbeit ist und was fertig ist, ohne im Chat nachzufragen." },
        { title: "Pläne und Schichten", text: "Ein Plan für das Team, die Baustellen oder die Kurse. Eine Änderung sehen sofort alle, die sie betrifft." },
        { title: "Dokumente in jeder Akte", text: "Verträge, Protokolle, Zertifikate und Fotos liegen beim Kunden oder bei der Anfrage, zu der sie gehören, nicht auf irgendeinem Handy." },
        { title: "Berichte", text: "Auswertungen zu erledigter Arbeit, Stunden, Zahlungen oder Anwesenheit, fertig zum Herunterladen, statt sie am Monatsende von Hand zusammenzusuchen." },
        { title: "Verbunden mit Website, Rechnungen und E-Mail", text: "Die Anfrage von der Website landet im System, die Rechnung kommt aus dem System, und der Kunde bekommt eine E-Mail, wenn sich der Status ändert." },
      ],
      includes: [],
      forWhom: [
        "Betriebe, die ihre Arbeit in Tabellen und Chats führen und den Überblick verlieren",
        "Bildungszentren und Schulen mit Teilnehmern, Dozenten und Dokumenten",
        "Betriebe mit Büro und Außendienst, die dasselbe sehen müssen",
        "Werkstätten und Lieferanten, deren Kunden ständig fragen, wo der Auftrag steht",
      ],
      steps: [
        { title: "Gespräch und Ablaufplan", text: "Sie erzählen uns, wie ein Tag bei Ihnen abläuft: wer was macht und wo Zeit verloren geht. Wir halten den Ablauf Schritt für Schritt fest und sagen Ihnen ehrlich, ob sich ein eigenes System lohnt." },
        { title: "Prototyp der Bildschirme", text: "Wir zeigen Ihnen, wie die wichtigsten Bildschirme aussehen werden, bevor eine Zeile Code geschrieben ist. Wir passen sie gemeinsam an, bis sie zu Ihrer echten Arbeit passen." },
        { title: "Umsetzung in Teilen", text: "Wir beginnen mit dem Wichtigsten, zum Beispiel den Anfragen, und nehmen es in Betrieb. Die weiteren Teile kommen dazu, während Sie mit dem ersten schon arbeiten." },
        { title: "Start, Einweisung und Ausbau", text: "Wir übernehmen Ihre Daten, zeigen dem Team die Bedienung und bleiben erreichbar. Das System wächst mit Ihrem Betrieb." },
      ],
      faq: [
        {
          q: "Warum kein fertiges CRM oder eine fertige Plattform?",
          a: "Wenn eine fertige Lösung ausreicht, sagen wir Ihnen das und helfen bei der Einrichtung. Ein eigenes System bauen wir, wenn Ihre Abläufe besonders sind und fertige Programme Sie zwingen, nach deren Logik zu arbeiten statt nach Ihrer.",
        },
        {
          q: "Wo liegen die Daten und wer hat Zugriff?",
          a: "Auf einem Server in Ihrem eigenen Konto oder auf einem mit Ihnen vereinbarten Hosting, mit täglichen Backups. Der Zugriff ist nach Rollen geregelt, und Sie entscheiden, wer was sieht. Wir schließen einen Auftragsverarbeitungsvertrag ab.",
        },
        {
          q: "Kann das System später erweitert werden?",
          a: "Ja, so ist es von Anfang an angelegt. Meist beginnen wir mit einem Teil und ergänzen die nächsten, sobald der erste im täglichen Einsatz ist.",
        },
        {
          q: "Was kostet das?",
          a: "Das hängt von der Anzahl der Teile und Nutzer ab. Sie bekommen nach einem kostenlosen Gespräch per Telefon oder Google Meet einen Festpreis. Hosting und Betreuung werden separat vereinbart, und Sie kennen sie vorab.",
        },
      ],
    },
    nl: {
      slug: "maatwerk-software",
      metaTitle: "Platformen en interne systemen | CRM, portalen | Rafetov.com",
      metaDescription:
        "Een intern systeem voor uw manier van werken: accounts met rollen, aanvragen, planningen, documenten en rapporten op één plek, gekoppeld aan website en facturatie.",
      title: "Een systeem gebouwd voor uw werk",
      intro:
        "Voor wanneer tabellen en chats niet meer volstaan. Accounts voor klanten en medewerkers, aanvragen, planningen, documenten en rapporten op één plek, met rechten per type gebruiker. Zo bouwden we het leerplatform van CZPO, met rollen voor beheerders, docenten, cursisten en inspecteurs.",
      priceLine: "",
      cases: [
        { title: "Accounts en rollen", text: "Klanten, medewerkers, partners of cursisten, elk met een eigen login. Ze zien en wijzigen alleen wat ze mogen." },
        { title: "Aanvragen en bestellingen", text: "Elke aanvraag heeft een status, een verantwoordelijke en een geschiedenis. U ziet wat wacht, wat in uitvoering is en wat klaar is, zonder het in de chat te vragen." },
        { title: "Planningen en shiften", text: "Een planning voor het team, de werven of de cursussen. Een wijziging is meteen zichtbaar voor iedereen die ze aangaat." },
        { title: "Documenten bij elk dossier", text: "Contracten, verslagen, attesten en foto's staan bij de klant of de aanvraag waar ze bij horen, niet op iemands gsm." },
        { title: "Rapporten", text: "Overzichten van uitgevoerd werk, uren, betalingen of aanwezigheden, klaar om te downloaden, in plaats van ze op het einde van de maand met de hand te verzamelen." },
        { title: "Gekoppeld aan website, facturatie en e-mail", text: "De aanvraag van de website komt in het systeem, de factuur komt eruit, en de klant krijgt een e-mail wanneer de status verandert." },
      ],
      includes: [],
      forWhom: [
        "Bedrijven die hun werk in tabellen en chats bijhouden en het overzicht verliezen",
        "Opleidingscentra en scholen met cursisten, docenten en documenten",
        "Bedrijven met een kantoor en een ploeg op de werf die hetzelfde moeten zien",
        "Werkplaatsen en leveranciers waarvan de klanten blijven vragen waar hun bestelling blijft",
      ],
      steps: [
        { title: "Gesprek en schema van het werk", text: "U vertelt ons hoe een dag bij u verloopt: wie wat doet en waar tijd verloren gaat. We schrijven het proces stap voor stap uit en zeggen eerlijk of een eigen systeem de moeite waard is." },
        { title: "Prototype van de schermen", text: "We tonen u hoe de belangrijkste schermen eruit zullen zien voordat er code geschreven is. We passen ze samen aan tot ze kloppen met hoe u echt werkt." },
        { title: "Bouwen in delen", text: "We beginnen met het belangrijkste, bijvoorbeeld de aanvragen, en nemen dat in gebruik. De andere delen voegen we toe terwijl u al met het eerste werkt." },
        { title: "Lancering, opleiding en uitbreiding", text: "We zetten uw gegevens over, tonen het team hoe het werkt en blijven bereikbaar. Het systeem groeit mee met uw zaak." },
      ],
      faq: [
        {
          q: "Waarom geen kant-en-klaar CRM of platform?",
          a: "Als een bestaande oplossing volstaat, zeggen we dat en helpen we u ze in te stellen. We bouwen een eigen systeem wanneer uw processen specifiek zijn en bestaande programma's u verplichten om op hun manier te werken in plaats van op de uwe.",
        },
        {
          q: "Waar staan de gegevens en wie heeft toegang?",
          a: "Op een server in uw eigen account of op hosting die we met u afspreken, met dagelijkse back-ups. De toegang verloopt via rollen en u beslist wie wat ziet. We sluiten een verwerkersovereenkomst af.",
        },
        {
          q: "Kan het systeem later uitgebreid worden?",
          a: "Ja, zo is het van bij het begin opgezet. Meestal beginnen we met één deel en voegen we de volgende toe zodra het eerste dagelijks gebruikt wordt.",
        },
        {
          q: "Wat kost het?",
          a: "Dat hangt af van het aantal delen en gebruikers. U krijgt een vaste prijs na een gratis gesprek via telefoon of Google Meet. Hosting en onderhoud spreken we apart af, en u kent ze vooraf.",
        },
      ],
    },
  },
};
