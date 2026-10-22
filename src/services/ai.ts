import type { Service } from "./index";

/**
 * AI автоматизации: чатботове, обработка на запитвания, оферти и документи.
 * Без измислени резултати и проценти — само какво правим и как; цената се казва след разговор.
 */
export const aiService: Service = {
  id: "ai",
  key: "ai",
  visual: { vignette: "ai" },
  caseIcons: ["MessageCircle", "Bot", "ClipboardList", "FileText", "ScanText", "Star"],
  tag: null,
  accent: "#22D3EE",
  relatedPosts: [],
  includeIcons: [],
  forWhomIcons: [],
  content: {
    bg: {
      slug: "ai-avtomatizacii",
      metaTitle: "AI автоматизации и чатботове за бизнеса | Rafetov.com",
      metaDescription:
        "Чатбот за WhatsApp, Viber и сайта, автоматична обработка на запитвания, чернови на оферти и данни от фактури. Свързваме AI с програмите, които вече ползвате.",
      title: "AI, който поема повтарящата се работа",
      intro:
        "Чатбот, който отговаря на клиентите ви в WhatsApp и на сайта. Запитвания, които сами влизат в таблицата. Оферти и фактури, които се подготвят без преписване. Вие одобрявате, а повтарящото се го върши системата.",
      priceLine: "",
      cases: [
        { title: "Чатбот в WhatsApp, Viber и Messenger", text: "Отговаря денонощно на честите въпроси, пита за подробностите и телефона и ви прехвърля разговора, когато трябва човек." },
        { title: "AI асистент на сайта", text: "Познава услугите, районите и сроковете ви. Отговаря на посетителя на неговия език и го води към запитване." },
        { title: "Запитвания, подредени сами", text: "Всяко съобщение от сайта, имейла или чата става карта в CRM или в таблица: услуга, град, срок, телефон. Вие получавате известие в Telegram." },
        { title: "Чернови на оферти", text: "От запитването и вашия ценоразпис се подготвя оферта в PDF. Вие я преглеждате, поправяте при нужда и я изпращате." },
        { title: "Данни от фактури и документи", text: "Снимка или PDF на фактура, договор или товарителница, а данните влизат в таблица или в програмата ви, без преписване." },
        { title: "Отговори на отзиви и имейли", text: "Предложение за отговор във вашия стил на всеки нов отзив в Google или имейл. Одобрявате го с едно натискане." },
      ],
      includes: [],
      forWhom: [
        "Фирми, които отговарят на едни и същи въпроси всеки ден",
        "Майстори и сервизи с огледи, оферти и графици",
        "Онлайн магазини с въпроси за доставки и наличности",
        "Офиси с много фактури, договори и документи",
      ],
      steps: [
        { title: "Разговор", text: "Показвате ни коя работа се повтаря всеки ден и колко време отнема. Казваме ви честно какво си струва да се автоматизира." },
        { title: "Първа автоматизация", text: "Правим работеща версия за една задача и я пробваме с ваши реални съобщения и документи, преди да стигне до клиент." },
        { title: "Свързване", text: "Връзваме я с WhatsApp, сайта, имейла, таблиците или CRM. В началото вие одобрявате всяко автоматично действие." },
        { title: "Наблюдение и следващата задача", text: "Преглеждаме разговорите, поправяме слабите места и добавяме следващата задача, когато първата работи гладко." },
      ],
      faq: [
        {
          q: "Може ли AI да отговори грешно на клиент?",
          a: "Работи само с информацията, която вие одобрите: услуги, условия, срокове. Когато не е сигурен или въпросът е важен, прехвърля разговора на вас. Виждате всеки разговор.",
        },
        {
          q: "Трябва ли да сменям програмите, с които работя?",
          a: "Не. Свързваме се с това, което вече ползвате: WhatsApp, Viber, Gmail, Google Sheets, CRM или счетоводна програма, ако позволява връзка.",
        },
        {
          q: "Какво става с данните на клиентите ми?",
          a: "Остават във вашите акаунти. Ползваме AI през бизнес достъп, при който разговорите не се използват за обучение на модела, и подписваме договор за обработка на лични данни.",
        },
        {
          q: "Колко струва?",
          a: "Зависи от каналите и задачите. Казваме ви фиксирана цена след безплатен разговор. Отделно има малък месечен разход за самия AI според броя съобщения и го знаете предварително.",
        },
      ],
    },
    en: {
      slug: "ai-automation",
      metaTitle: "AI automation and chatbots for businesses | Rafetov.com",
      metaDescription:
        "Chatbots for WhatsApp, Viber and your website, automatic enquiry handling, draft quotes and data from invoices. We connect AI to the tools you already use.",
      title: "AI that takes over the repetitive work",
      intro:
        "A chatbot that answers your customers on WhatsApp and on your website. Enquiries that land in your spreadsheet by themselves. Quotes and invoices prepared without retyping. You approve, the system does the repetitive part.",
      priceLine: "",
      cases: [
        { title: "Chatbot on WhatsApp, Viber and Messenger", text: "Answers common questions day and night, asks for the details and a phone number, and hands the conversation to you when a person is needed." },
        { title: "AI assistant on your website", text: "Knows your services, areas and lead times. Answers visitors in their language and guides them to an enquiry." },
        { title: "Enquiries that sort themselves", text: "Every message from the website, email or chat becomes a card in your CRM or spreadsheet: service, town, deadline, phone. You get a Telegram notification." },
        { title: "Draft quotes", text: "A PDF quote is prepared from the enquiry and your price list. You review it, adjust it if needed and send it." },
        { title: "Data from invoices and documents", text: "A photo or PDF of an invoice, contract or delivery note, and the data goes into a spreadsheet or your software with no retyping." },
        { title: "Replies to reviews and emails", text: "A suggested reply in your tone for every new Google review or email. You approve it with one tap." },
      ],
      includes: [],
      forWhom: [
        "Companies that answer the same questions every day",
        "Tradespeople and workshops with site visits, quotes and schedules",
        "Online shops with questions about delivery and stock",
        "Offices with lots of invoices, contracts and documents",
      ],
      steps: [
        { title: "A call", text: "You show us which work repeats every day and how long it takes. We tell you honestly what is worth automating." },
        { title: "First automation", text: "We build a working version for one task and test it on your real messages and documents before it reaches a customer." },
        { title: "Connecting", text: "We connect it to WhatsApp, your website, email, spreadsheets or CRM. At first you approve every automatic action." },
        { title: "Monitoring and the next task", text: "We review the conversations, fix the weak spots and add the next task once the first one runs smoothly." },
      ],
      faq: [
        {
          q: "Can the AI give a customer a wrong answer?",
          a: "It works only with information you approve: services, terms, lead times. When it is unsure or the question matters, it hands the conversation to you. You can see every conversation.",
        },
        {
          q: "Do I have to change the tools I use?",
          a: "No. We connect to what you already use: WhatsApp, Viber, Gmail, Google Sheets, a CRM or accounting software, if it allows a connection.",
        },
        {
          q: "What happens to my customers' data?",
          a: "It stays in your accounts. We use AI through business access, where conversations are not used to train the model, and we sign a data processing agreement.",
        },
        {
          q: "How much does it cost?",
          a: "It depends on the channels and tasks. We give you a fixed price after a free call. There is also a small monthly cost for the AI itself, based on the number of messages, and you know it in advance.",
        },
      ],
    },
    de: {
      slug: "ki-automatisierung",
      metaTitle: "KI-Automatisierung und Chatbots für Unternehmen | Rafetov.com",
      metaDescription:
        "Chatbots für WhatsApp, Viber und Ihre Webseite, automatische Bearbeitung von Anfragen, Angebotsentwürfe und Daten aus Rechnungen. Wir verbinden KI mit den Programmen, die Sie schon nutzen.",
      title: "KI, die die wiederkehrende Arbeit übernimmt",
      intro:
        "Ein Chatbot, der Ihren Kunden auf WhatsApp und auf der Webseite antwortet. Anfragen, die von selbst in Ihrer Tabelle landen. Angebote und Rechnungen ohne Abtippen. Sie geben frei, das System erledigt das Wiederkehrende.",
      priceLine: "",
      cases: [
        { title: "Chatbot auf WhatsApp, Viber und Messenger", text: "Beantwortet häufige Fragen rund um die Uhr, fragt nach Details und Telefonnummer und übergibt Ihnen das Gespräch, wenn ein Mensch gebraucht wird." },
        { title: "KI-Assistent auf der Webseite", text: "Kennt Ihre Leistungen, Einsatzgebiete und Fristen. Antwortet Besuchern in ihrer Sprache und führt sie zur Anfrage." },
        { title: "Anfragen, die sich selbst sortieren", text: "Jede Nachricht von Webseite, E-Mail oder Chat wird zu einer Karte im CRM oder in der Tabelle: Leistung, Ort, Termin, Telefon. Sie bekommen eine Telegram-Benachrichtigung." },
        { title: "Angebotsentwürfe", text: "Aus der Anfrage und Ihrer Preisliste entsteht ein Angebot als PDF. Sie prüfen es, passen es bei Bedarf an und senden es ab." },
        { title: "Daten aus Rechnungen und Dokumenten", text: "Ein Foto oder PDF einer Rechnung, eines Vertrags oder Lieferscheins, und die Daten landen ohne Abtippen in der Tabelle oder Ihrer Software." },
        { title: "Antworten auf Bewertungen und E-Mails", text: "Ein Antwortvorschlag in Ihrem Ton für jede neue Google-Bewertung oder E-Mail. Sie geben ihn mit einem Tipp frei." },
      ],
      includes: [],
      forWhom: [
        "Firmen, die jeden Tag dieselben Fragen beantworten",
        "Handwerker und Werkstätten mit Besichtigungen, Angeboten und Terminplänen",
        "Onlineshops mit Fragen zu Lieferung und Verfügbarkeit",
        "Büros mit vielen Rechnungen, Verträgen und Dokumenten",
      ],
      steps: [
        { title: "Gespräch", text: "Sie zeigen uns, welche Arbeit sich täglich wiederholt und wie lange sie dauert. Wir sagen Ihnen ehrlich, was sich zu automatisieren lohnt." },
        { title: "Erste Automatisierung", text: "Wir bauen eine funktionierende Version für eine Aufgabe und testen sie mit Ihren echten Nachrichten und Dokumenten, bevor sie einen Kunden erreicht." },
        { title: "Anbindung", text: "Wir verbinden sie mit WhatsApp, Webseite, E-Mail, Tabellen oder CRM. Anfangs geben Sie jede automatische Aktion selbst frei." },
        { title: "Begleitung und nächste Aufgabe", text: "Wir prüfen die Gespräche, verbessern Schwachstellen und nehmen die nächste Aufgabe dazu, sobald die erste rund läuft." },
      ],
      faq: [
        {
          q: "Kann die KI einem Kunden falsch antworten?",
          a: "Sie arbeitet nur mit Informationen, die Sie freigeben: Leistungen, Konditionen, Fristen. Ist sie unsicher oder ist die Frage wichtig, übergibt sie das Gespräch an Sie. Sie sehen jedes Gespräch.",
        },
        {
          q: "Muss ich meine Programme wechseln?",
          a: "Nein. Wir verbinden uns mit dem, was Sie schon nutzen: WhatsApp, Viber, Gmail, Google Sheets, ein CRM oder eine Buchhaltungssoftware, sofern sie eine Anbindung erlaubt.",
        },
        {
          q: "Was passiert mit den Daten meiner Kunden?",
          a: "Sie bleiben in Ihren Konten. Wir nutzen KI über einen Business-Zugang, bei dem Gespräche nicht zum Training des Modells verwendet werden, und schließen einen Auftragsverarbeitungsvertrag ab.",
        },
        {
          q: "Was kostet das?",
          a: "Das hängt von Kanälen und Aufgaben ab. Sie bekommen nach einem kostenlosen Gespräch einen Festpreis. Dazu kommen geringe monatliche Kosten für die KI selbst, je nach Anzahl der Nachrichten, die Sie vorher kennen.",
        },
      ],
    },
    nl: {
      slug: "ai-automatisering",
      metaTitle: "AI-automatisering en chatbots voor bedrijven | Rafetov.com",
      metaDescription:
        "Chatbots voor WhatsApp, Viber en uw website, automatische verwerking van aanvragen, conceptoffertes en gegevens uit facturen. We koppelen AI aan de programma's die u al gebruikt.",
      title: "AI die het terugkerende werk overneemt",
      intro:
        "Een chatbot die uw klanten antwoordt op WhatsApp en op uw website. Aanvragen die vanzelf in uw overzicht komen. Offertes en facturen zonder overtypen. U keurt goed, het systeem doet het terugkerende werk.",
      priceLine: "",
      cases: [
        { title: "Chatbot op WhatsApp, Viber en Messenger", text: "Beantwoordt veelgestelde vragen dag en nacht, vraagt naar details en een telefoonnummer en geeft het gesprek aan u door wanneer een mens nodig is." },
        { title: "AI-assistent op uw website", text: "Kent uw diensten, regio's en levertijden. Antwoordt bezoekers in hun taal en leidt hen naar een aanvraag." },
        { title: "Aanvragen die zichzelf sorteren", text: "Elk bericht via website, e-mail of chat wordt een kaart in uw CRM of overzicht: dienst, gemeente, termijn, telefoon. U krijgt een melding in Telegram." },
        { title: "Conceptoffertes", text: "Uit de aanvraag en uw prijslijst ontstaat een offerte als pdf. U controleert ze, past ze aan waar nodig en verstuurt ze." },
        { title: "Gegevens uit facturen en documenten", text: "Een foto of pdf van een factuur, contract of leverbon, en de gegevens komen zonder overtypen in uw overzicht of software." },
        { title: "Antwoorden op reviews en e-mails", text: "Een voorstel voor een antwoord in uw stijl bij elke nieuwe Google-review of e-mail. U keurt het goed met één tik." },
      ],
      includes: [],
      forWhom: [
        "Bedrijven die elke dag dezelfde vragen beantwoorden",
        "Vakmensen en werkplaatsen met plaatsbezoeken, offertes en planningen",
        "Webshops met vragen over levering en voorraad",
        "Kantoren met veel facturen, contracten en documenten",
      ],
      steps: [
        { title: "Gesprek", text: "U laat zien welk werk elke dag terugkomt en hoeveel tijd het kost. Wij zeggen eerlijk wat de moeite waard is om te automatiseren." },
        { title: "Eerste automatisering", text: "We bouwen een werkende versie voor één taak en testen die met uw echte berichten en documenten, voordat ze een klant bereikt." },
        { title: "Koppelen", text: "We koppelen ze aan WhatsApp, uw website, e-mail, overzichten of CRM. In het begin keurt u elke automatische actie zelf goed." },
        { title: "Opvolging en de volgende taak", text: "We bekijken de gesprekken, verbeteren de zwakke punten en voegen de volgende taak toe zodra de eerste vlot loopt." },
      ],
      faq: [
        {
          q: "Kan de AI een klant een fout antwoord geven?",
          a: "Ze werkt alleen met informatie die u goedkeurt: diensten, voorwaarden, termijnen. Is ze niet zeker of is de vraag belangrijk, dan geeft ze het gesprek aan u door. U ziet elk gesprek.",
        },
        {
          q: "Moet ik andere programma's gaan gebruiken?",
          a: "Nee. We koppelen met wat u al gebruikt: WhatsApp, Viber, Gmail, Google Sheets, een CRM of boekhoudsoftware, als die een koppeling toelaat.",
        },
        {
          q: "Wat gebeurt er met de gegevens van mijn klanten?",
          a: "Die blijven in uw accounts. We gebruiken AI via zakelijke toegang, waarbij gesprekken niet worden gebruikt om het model te trainen, en we sluiten een verwerkersovereenkomst af.",
        },
        {
          q: "Wat kost het?",
          a: "Dat hangt af van de kanalen en taken. U krijgt een vaste prijs na een gratis gesprek. Daarnaast is er een kleine maandelijkse kost voor de AI zelf, afhankelijk van het aantal berichten, die u vooraf kent.",
        },
      ],
    },
  },
};
