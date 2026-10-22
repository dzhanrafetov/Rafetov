import type { Service } from "./index";

/**
 * Мобилни приложения за iOS и Android от една кодова база, публикувани в App Store и Google Play.
 * Без измислени резултати и срокове; цената се казва след разговор.
 */
export const mobileService: Service = {
  id: "mobile",
  key: "mobile",
  visual: { vignette: "mobile" },
  caseIcons: ["Smartphone", "Bell", "Users", "WifiOff", "ClipboardList", "Star"],
  tag: null,
  accent: "#22D3EE",
  relatedPosts: [],
  includeIcons: [],
  forWhomIcons: [],
  content: {
    bg: {
      slug: "mobilni-prilozhenia",
      metaTitle: "Мобилни приложения за iOS и Android | Rafetov.com",
      metaDescription:
        "Мобилно приложение за вашия бизнес: поръчки, записване, лоялност или вътрешно приложение за екипа. iOS и Android от един код, известия, вход с телефон, офлайн.",
      title: "Приложение в джоба на клиентите ви",
      intro:
        "Мобилно приложение за iOS и Android: поръчки, записване на час, лоялна карта или вътрешно приложение за екипа на терен. Една кодова база за двете системи, публикувано в App Store и Google Play. Вие получавате известие при всяка нова поръчка.",
      priceLine: "",
      cases: [
        { title: "Поръчки и записване от телефона", text: "Клиентът поръчва или си записва час с няколко натискания, без да търси сайта. Вие виждате поръчката веднага." },
        { title: "Известия на телефона", text: "Съобщение при нова поръчка, напомняне за час или промоция за клиентите. Вие решавате кога и на кого се изпраща." },
        { title: "Вход с телефон и профили", text: "Клиентът влиза с номера си и код по SMS, без пароли. Вижда поръчките, часовете и документите си." },
        { title: "Работа без обхват", text: "Екипът на терен попълва работни карти и снима обекта и без интернет. Данните се изпращат, щом има връзка." },
        { title: "Вътрешно приложение за екипа", text: "Заявки за деня, адрес и навигация, снимки от обекта и подпис на клиента. Офисът вижда всичко в реално време." },
        { title: "Лоялност и отстъпки", text: "Точки при всяка поръчка, дигитална карта и отстъпки за редовни клиенти, без пластмасови карти и печати." },
      ],
      includes: [],
      forWhom: [
        "Магазини и заведения с редовни клиенти и повторни поръчки",
        "Салони, сервизи и студиа, които работят с часове",
        "Фирми с екип на терен: монтажи, доставки, огледи",
        "Бизнеси, които вече имат сайт и искат клиентите по-близо",
      ],
      steps: [
        { title: "Разговор и екрани", text: "Уточняваме за кого е приложението и кои три неща трябва да върши най-добре. Показваме ви екраните, преди да започнем кода." },
        { title: "Работеща версия на вашия телефон", text: "Инсталираме тестова версия на вашите iPhone и Android телефони. Пробвате я с реални поръчки и ни казвате какво да поправим." },
        { title: "Публикуване в App Store и Google Play", text: "Създаваме акаунтите за разработчици на ваше име, подготвяме описанията и снимките и минаваме през одобрението на Apple и Google." },
        { title: "Обновления и развитие", text: "След пускането следим грешките и отзивите в магазините. Новите функции добавяме, когато първите вече се ползват." },
      ],
      faq: [
        {
          q: "Трябва ли ми приложение, или стига сайт?",
          a: "Ако клиентите ви идват веднъж и търсят в Google, по-често стига добър сайт. Приложение си струва, когато имате редовни клиенти, екип на терен или искате да пращате известия. Казваме ви честно кое е за вас.",
        },
        {
          q: "На чие име са акаунтите в App Store и Google Play?",
          a: "На ваше. Приложението излиза с вашето име и лого, а вие държите достъпа. Ние помагаме с всички стъпки по създаването и одобрението.",
        },
        {
          q: "Какво става след публикуването?",
          a: "Apple и Google обновяват системите си всяка година и приложенията трябва да се поддържат. Договаряме поддръжка, при която обновяваме приложението и поправяме грешки.",
        },
        {
          q: "Колко струва?",
          a: "Зависи от функциите и от това дали има и вътрешна част за екипа. Казваме ви фиксирана цена след безплатен разговор по телефон или Google Meet. Таксите на Apple и Google за акаунт за разработчици се плащат директно на тях и ги знаете предварително.",
        },
      ],
    },
    en: {
      slug: "mobile-app-development",
      metaTitle: "Mobile app development for iOS and Android | Rafetov.com",
      metaDescription:
        "A mobile app for your business: orders, booking, loyalty or an internal app for the field team. iOS and Android from one codebase, push notifications, offline mode.",
      title: "An app in your customers' pocket",
      intro:
        "A mobile app for iOS and Android: orders, appointment booking, a loyalty card or an internal app for the team in the field. One codebase for both systems, published in the App Store and Google Play. You get a notification with every new order.",
      priceLine: "",
      cases: [
        { title: "Orders and booking from the phone", text: "The customer orders or books an appointment in a few taps, without looking for your website. You see the order straight away." },
        { title: "Push notifications", text: "A message for a new order, a reminder for an appointment or a promotion for customers. You decide when it is sent and to whom." },
        { title: "Phone login and accounts", text: "The customer signs in with their number and a code by SMS, no passwords. They see their orders, appointments and documents." },
        { title: "Working without signal", text: "The field team fills in job cards and takes photos on site even without internet. The data is sent as soon as there is a connection." },
        { title: "An internal app for the team", text: "Jobs for the day, address and navigation, photos from the site and the customer's signature. The office sees everything in real time." },
        { title: "Loyalty and discounts", text: "Points with every order, a digital card and discounts for regulars, with no plastic cards or stamps." },
      ],
      includes: [],
      forWhom: [
        "Shops and restaurants with regular customers and repeat orders",
        "Salons, workshops and studios that work by appointment",
        "Companies with a field team: installations, deliveries, site visits",
        "Businesses that already have a website and want customers closer",
      ],
      steps: [
        { title: "A call and the screens", text: "We work out who the app is for and the three things it has to do best. We show you the screens before we start the code." },
        { title: "A working version on your phone", text: "We install a test version on your iPhone and Android phones. You try it with real orders and tell us what to fix." },
        { title: "Publishing in the App Store and Google Play", text: "We set up the developer accounts in your name, prepare the descriptions and screenshots and take it through Apple's and Google's review." },
        { title: "Updates and growth", text: "After launch we watch for errors and the reviews in the stores. New features are added once the first ones are in use." },
      ],
      faq: [
        {
          q: "Do I need an app, or is a website enough?",
          a: "If your customers come once and find you on Google, a good website is usually enough. An app is worth it when you have regular customers, a field team or want to send notifications. We tell you honestly which one is for you.",
        },
        {
          q: "Whose name are the App Store and Google Play accounts in?",
          a: "Yours. The app is published under your name and logo, and you keep the access. We help with every step of setting them up and getting approved.",
        },
        {
          q: "What happens after publishing?",
          a: "Apple and Google update their systems every year and apps need to be kept up to date. We agree on maintenance, where we update the app and fix errors.",
        },
        {
          q: "How much does it cost?",
          a: "It depends on the features and whether there is also an internal part for the team. We give you a fixed price after a free call by phone or Google Meet. Apple's and Google's developer account fees are paid directly to them, and you know them in advance.",
        },
      ],
    },
    de: {
      slug: "app-entwicklung",
      metaTitle: "App-Entwicklung für iOS und Android | Rafetov.com",
      metaDescription:
        "Eine App für Ihren Betrieb: Bestellungen, Termine, Treueprogramm oder interne App für das Team. iOS und Android aus einem Code, Push-Nachrichten, Offline-Modus.",
      title: "Eine App in der Tasche Ihrer Kunden",
      intro:
        "Eine App für iOS und Android: Bestellungen, Terminbuchung, Treuekarte oder eine interne App für das Team auf der Baustelle. Ein Code für beide Systeme, veröffentlicht im App Store und bei Google Play. Sie bekommen bei jeder neuen Bestellung eine Nachricht.",
      priceLine: "",
      cases: [
        { title: "Bestellungen und Termine vom Handy", text: "Der Kunde bestellt oder bucht einen Termin mit wenigen Tipps, ohne Ihre Website zu suchen. Sie sehen die Bestellung sofort." },
        { title: "Push-Nachrichten", text: "Eine Nachricht bei neuer Bestellung, eine Terminerinnerung oder eine Aktion für Kunden. Sie entscheiden, wann und an wen sie geht." },
        { title: "Login per Telefon und Konten", text: "Der Kunde meldet sich mit seiner Nummer und einem Code per SMS an, ohne Passwort. Er sieht seine Bestellungen, Termine und Dokumente." },
        { title: "Arbeiten ohne Empfang", text: "Das Team vor Ort füllt Arbeitskarten aus und fotografiert die Baustelle auch ohne Internet. Die Daten werden gesendet, sobald Verbindung da ist." },
        { title: "Interne App für das Team", text: "Aufträge des Tages, Adresse und Navigation, Fotos von der Baustelle und Unterschrift des Kunden. Das Büro sieht alles in Echtzeit." },
        { title: "Treueprogramm und Rabatte", text: "Punkte bei jeder Bestellung, digitale Karte und Rabatte für Stammkunden, ohne Plastikkarten und Stempel." },
      ],
      includes: [],
      forWhom: [
        "Läden und Gastronomie mit Stammkunden und wiederkehrenden Bestellungen",
        "Salons, Werkstätten und Studios, die mit Terminen arbeiten",
        "Betriebe mit Außendienst: Montagen, Lieferungen, Besichtigungen",
        "Unternehmen, die schon eine Website haben und ihre Kunden näher halten wollen",
      ],
      steps: [
        { title: "Gespräch und Bildschirme", text: "Wir klären, für wen die App ist und welche drei Dinge sie am besten können muss. Wir zeigen Ihnen die Bildschirme, bevor wir mit dem Code beginnen." },
        { title: "Testversion auf Ihrem Handy", text: "Wir installieren eine Testversion auf Ihren iPhones und Android-Handys. Sie probieren sie mit echten Bestellungen aus und sagen uns, was wir anpassen sollen." },
        { title: "Veröffentlichung im App Store und bei Google Play", text: "Wir richten die Entwicklerkonten auf Ihren Namen ein, bereiten Beschreibungen und Screenshots vor und begleiten die Prüfung durch Apple und Google." },
        { title: "Updates und Ausbau", text: "Nach dem Start behalten wir Fehler und Bewertungen in den Stores im Blick. Neue Funktionen kommen dazu, wenn die ersten im Einsatz sind." },
      ],
      faq: [
        {
          q: "Brauche ich eine App, oder reicht eine Website?",
          a: "Wenn Ihre Kunden einmal kommen und Sie über Google finden, reicht meist eine gute Website. Eine App lohnt sich bei Stammkunden, einem Team im Außendienst oder wenn Sie Push-Nachrichten senden wollen. Wir sagen Ihnen ehrlich, was zu Ihnen passt.",
        },
        {
          q: "Auf wessen Namen laufen die Konten im App Store und bei Google Play?",
          a: "Auf Ihren. Die App erscheint unter Ihrem Namen und Logo, und Sie behalten den Zugang. Wir helfen bei allen Schritten der Einrichtung und Prüfung.",
        },
        {
          q: "Was passiert nach der Veröffentlichung?",
          a: "Apple und Google aktualisieren ihre Systeme jedes Jahr, und Apps müssen gepflegt werden. Wir vereinbaren eine Betreuung, bei der wir die App aktualisieren und Fehler beheben.",
        },
        {
          q: "Was kostet das?",
          a: "Das hängt von den Funktionen ab und davon, ob es auch einen internen Teil für das Team gibt. Sie bekommen nach einem kostenlosen Gespräch per Telefon oder Google Meet einen Festpreis. Die Gebühren von Apple und Google für die Entwicklerkonten zahlen Sie direkt an diese und kennen sie vorab.",
        },
      ],
    },
    nl: {
      slug: "app-laten-maken",
      metaTitle: "App laten maken voor iOS en Android | Rafetov.com",
      metaDescription:
        "Een app voor uw zaak: bestellingen, afspraken, klantenkaart of een interne app voor het team. iOS en Android uit één code, meldingen, inloggen met gsm, offline.",
      title: "Een app in de zak van uw klanten",
      intro:
        "Een app voor iOS en Android: bestellingen, afspraken maken, een klantenkaart of een interne app voor het team op de werf. Eén code voor beide systemen, gepubliceerd in de App Store en Google Play. U krijgt een melding bij elke nieuwe bestelling.",
      priceLine: "",
      cases: [
        { title: "Bestellen en afspraken maken vanop de gsm", text: "De klant bestelt of maakt een afspraak met enkele tikken, zonder uw website te zoeken. U ziet de bestelling meteen." },
        { title: "Meldingen op de gsm", text: "Een bericht bij een nieuwe bestelling, een herinnering aan een afspraak of een promotie voor klanten. U beslist wanneer en naar wie ze gaat." },
        { title: "Inloggen met gsm en accounts", text: "De klant meldt zich aan met zijn nummer en een code per sms, zonder wachtwoord. Hij ziet zijn bestellingen, afspraken en documenten." },
        { title: "Werken zonder bereik", text: "Het team op de werf vult werkbonnen in en maakt foto's ook zonder internet. De gegevens worden verstuurd zodra er verbinding is." },
        { title: "Interne app voor het team", text: "Opdrachten van de dag, adres en navigatie, foto's van de werf en de handtekening van de klant. Het kantoor ziet alles in real time." },
        { title: "Klantenkaart en kortingen", text: "Punten bij elke bestelling, een digitale kaart en kortingen voor vaste klanten, zonder plastic kaarten of stempels." },
      ],
      includes: [],
      forWhom: [
        "Winkels en horecazaken met vaste klanten en terugkerende bestellingen",
        "Salons, garages en studio's die op afspraak werken",
        "Bedrijven met een ploeg op de baan: montages, leveringen, plaatsbezoeken",
        "Zaken die al een website hebben en hun klanten dichterbij willen",
      ],
      steps: [
        { title: "Gesprek en schermen", text: "We bepalen voor wie de app is en welke drie dingen ze het best moet doen. We tonen u de schermen voordat we met de code beginnen." },
        { title: "Testversie op uw gsm", text: "We installeren een testversie op uw iPhones en Android-toestellen. U probeert ze met echte bestellingen en zegt ons wat we moeten aanpassen." },
        { title: "Publicatie in de App Store en Google Play", text: "We maken de ontwikkelaarsaccounts aan op uw naam, bereiden de beschrijvingen en schermafbeeldingen voor en begeleiden de controle door Apple en Google." },
        { title: "Updates en uitbreiding", text: "Na de lancering volgen we fouten en reviews in de stores op. Nieuwe functies voegen we toe zodra de eerste in gebruik zijn." },
      ],
      faq: [
        {
          q: "Heb ik een app nodig, of volstaat een website?",
          a: "Als uw klanten één keer komen en u via Google vinden, volstaat meestal een goede website. Een app is de moeite waard bij vaste klanten, een ploeg op de baan of wanneer u meldingen wilt sturen. We zeggen u eerlijk wat bij u past.",
        },
        {
          q: "Op wiens naam staan de accounts in de App Store en Google Play?",
          a: "Op de uwe. De app verschijnt onder uw naam en logo, en u houdt de toegang. We helpen bij elke stap van het aanmaken en de goedkeuring.",
        },
        {
          q: "Wat gebeurt er na de publicatie?",
          a: "Apple en Google vernieuwen hun systemen elk jaar en apps moeten onderhouden worden. We spreken een onderhoud af waarbij we de app updaten en fouten herstellen.",
        },
        {
          q: "Wat kost het?",
          a: "Dat hangt af van de functies en of er ook een intern deel voor het team is. U krijgt een vaste prijs na een gratis gesprek via telefoon of Google Meet. De kosten van Apple en Google voor de ontwikkelaarsaccounts betaalt u rechtstreeks aan hen, en u kent ze vooraf.",
        },
      ],
    },
  },
};
