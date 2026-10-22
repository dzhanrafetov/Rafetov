import type { Service } from "./index";

/**
 * Локално SEO: Google Business Profile, страници за услуга и град, отзиви, карти.
 * Без обещания за позиции и без измислени резултати; цената се казва след разговор.
 */
export const seoService: Service = {
  id: "seo",
  key: "seo",
  visual: { vignette: "seo" },
  caseIcons: ["MapPin", "Star", "FileText", "ScanText", "Monitor", "LayoutDashboard"],
  tag: null,
  accent: "#22D3EE",
  relatedPosts: [],
  includeIcons: [],
  forWhomIcons: [],
  content: {
    bg: {
      slug: "lokalno-seo",
      metaTitle: "Локално SEO и Google Business Profile | Rafetov.com",
      metaDescription:
        "Да ви намират в Google и в картите за услугата и града ви: Google Business профил, страници за всяка услуга и град, събиране на отзиви и отговори на тях.",
      title: "Да ви намират в Google и в картите",
      intro:
        "Когато някой потърси вашата услуга и своя град, трябва да види вас: в картата, с отзиви, снимки и работно време, и в сайта със страница точно за тази услуга. Настройваме Google Business профила и сайта ви така, че да работят заедно.",
      priceLine: "",
      cases: [
        { title: "Google Business Profile", text: "Категории, услуги, район на работа, снимки, работно време и бутон за обаждане и съобщение. Профилът става пълен и потвърден, вместо празна карта с име." },
        { title: "Отзиви", text: "Линк и QR код, които давате на доволния клиент след работа. Показваме ви как да отговаряте на отзивите, включително на лошите, така че следващият клиент да види как работите." },
        { title: "Страници за услуга и град", text: "Отделна страница за всяка услуга и за всеки град, в който работите: ремонт на покриви в Пловдив, не само „покриви“. Google показва страницата, която отговаря на търсенето." },
        { title: "Техническа проверка на сайта", text: "Скорост на телефон, заглавия и описания, структурирани данни за фирма и услуги, карта на сайта. Поправяме това, което пречи на Google да ви разбере." },
        { title: "Еднакви данни навсякъде", text: "Име, адрес и телефон, еднакви в сайта, в Google, в картите и в указателите. Разминаванията свалят доверието на Google към профила ви." },
        { title: "Данни, които сами четете", text: "Показваме ви къде в Google профила виждате за какво ви търсят, колко обаждания и маршрути идват от него. Не ви трябва никой, за да ги проверите." },
      ],
      includes: [],
      forWhom: [
        "Майстори и фирми, които работят в един град или район",
        "Сервизи, салони и заведения, които живеят от хората наоколо",
        "Български фирми в Германия и Белгия, които искат да ги намират местните клиенти",
        "Бизнеси с Google профил без снимки, отзиви и актуално работно време",
      ],
      steps: [
        { title: "Проверка", text: "Гледаме как изглеждате в Google сега: профил, отзиви, сайт и конкуренти за същото търсене. Казваме ви какво липсва и какво можем да променим." },
        { title: "Профил и сайт", text: "Попълваме и потвърждаваме Google Business профила, оправяме техническите проблеми на сайта и подреждаме данните еднакво навсякъде." },
        { title: "Страници и отзиви", text: "Пишем страници за услугите и градовете ви и пускаме системата за събиране на отзиви. Отговаряме на първите отзиви заедно с вас, за да видите как става." },
        { title: "Предаване", text: "Показваме ви как сами да поддържате профила актуален: снимки, публикации, работно време, отговори на отзиви. За промени по сайта или профила ни пишете, когато ви трябват." },
      ],
      faq: [
        {
          q: "Кога ще се видят резултати?",
          a: "Google има нужда от време, за да приеме промените, и никой не може да обещае конкретна позиция. Казваме ви честно какво зависи от нас и какво от конкуренцията, и ви показваме къде сами да следите промяната.",
        },
        {
          q: "Каква е разликата с рекламата в Google?",
          a: "Рекламата носи обаждания, докато плащате за нея. Локалното SEO работи по-бавно, но профилът и страниците остават и носят запитвания и след като спрем да работим по тях. Най-често двете се допълват.",
        },
        {
          q: "Трябва ли ми нов сайт?",
          a: "Не винаги. Ако сайтът ви е бърз и може да се редактира, добавяме страниците в него. Ако е стар и бавен, ще ви кажем честно, преди да хабите пари за SEO върху него.",
        },
        {
          q: "Колко струва?",
          a: "Настройката е с фиксирана цена, която казваме след безплатен разговор по телефон или Google Meet. Няма месечна такса. Ако по-късно искате нова страница или промяна в профила, казваме цената предварително и плащате само за нея.",
        },
      ],
    },
    en: {
      slug: "local-seo",
      metaTitle: "Local SEO and Google Business Profile | Rafetov.com",
      metaDescription:
        "Be found in Google and on the map for your service and city: Google Business Profile setup, a page for every service and city, collecting and replying to reviews.",
      title: "Be found in Google and on the map",
      intro:
        "When someone searches for your service and their town, they should see you: on the map with reviews, photos and opening hours, and on your website with a page for exactly that service. We set up your Google Business Profile and your site so they work together.",
      priceLine: "",
      cases: [
        { title: "Google Business Profile", text: "Categories, services, service area, photos, opening hours and buttons to call and message. The profile becomes complete and verified instead of an empty pin with a name." },
        { title: "Reviews", text: "A link and a QR code you hand to a happy customer after the job. We show you how to reply to reviews, including the bad ones, so the next customer sees how you work." },
        { title: "Pages per service and city", text: "A separate page for every service and every town you work in: roof repair in Leeds, not just roofs. Google shows the page that matches the search." },
        { title: "Technical check of your site", text: "Speed on a phone, titles and descriptions, structured data for your business and services, sitemap. We fix what stops Google from understanding you." },
        { title: "The same details everywhere", text: "Name, address and phone, identical on your site, in Google, on maps and in directories. Mismatches lower Google's trust in your profile." },
        { title: "Numbers you read yourself", text: "We show you where in your Google profile you can see what people search for to find you and how many calls and direction requests come from it. You do not need anyone to check them." },
      ],
      includes: [],
      forWhom: [
        "Tradespeople and companies that work in one town or area",
        "Workshops, salons and restaurants that live off the people nearby",
        "Businesses abroad that want local customers to find them",
        "Businesses with a Google profile with no photos, reviews or current opening hours",
      ],
      steps: [
        { title: "Check", text: "We look at how you appear in Google now: profile, reviews, website and the competitors for the same search. We tell you what is missing and what we can change." },
        { title: "Profile and site", text: "We complete and verify the Google Business Profile, fix the technical problems on the site and make your details consistent everywhere." },
        { title: "Pages and reviews", text: "We write pages for your services and towns and set up the system for collecting reviews. We reply to the first reviews together with you, so you see how it is done." },
        { title: "Handover", text: "We show you how to keep the profile up to date yourself: photos, posts, opening hours, replies to reviews. For changes to the site or the profile you write to us when you need them." },
      ],
      faq: [
        {
          q: "When will I see results?",
          a: "Google needs time to take in the changes, and nobody can promise a specific position. We tell you honestly what depends on us and what on the competition, and we show you where to follow the change yourself.",
        },
        {
          q: "What is the difference from Google ads?",
          a: "Ads bring calls while you pay for them. Local SEO works more slowly, but the profile and the pages stay and keep bringing enquiries after we stop working on them. Most often the two complement each other.",
        },
        {
          q: "Do I need a new website?",
          a: "Not always. If your site is fast and can be edited, we add the pages to it. If it is old and slow, we will tell you honestly before you spend money on SEO for it.",
        },
        {
          q: "How much does it cost?",
          a: "The setup has a fixed price, which we give you after a free call by phone or Google Meet. There is no monthly fee. If you later want a new page or a change to the profile, we tell you the price in advance and you pay only for that.",
        },
      ],
    },
    de: {
      slug: "lokales-seo",
      metaTitle: "Lokales SEO und Google-Unternehmensprofil | Rafetov.com",
      metaDescription:
        "Bei Google und auf der Karte gefunden werden: Google-Unternehmensprofil einrichten, eine Seite je Leistung und Stadt, Bewertungen sammeln und beantworten.",
      title: "Bei Google und auf der Karte gefunden werden",
      intro:
        "Wenn jemand nach Ihrer Leistung und seiner Stadt sucht, soll er Sie sehen: auf der Karte mit Bewertungen, Fotos und Öffnungszeiten, und auf Ihrer Website mit einer Seite genau für diese Leistung. Wir richten Ihr Google-Unternehmensprofil und Ihre Website so ein, dass beide zusammenarbeiten.",
      priceLine: "",
      cases: [
        { title: "Google-Unternehmensprofil", text: "Kategorien, Leistungen, Einsatzgebiet, Fotos, Öffnungszeiten und Buttons zum Anrufen und Schreiben. Das Profil wird vollständig und bestätigt, statt einer leeren Markierung mit Namen." },
        { title: "Bewertungen", text: "Ein Link und ein QR-Code, den Sie dem zufriedenen Kunden nach der Arbeit geben. Wir zeigen Ihnen, wie Sie auf Bewertungen antworten, auch auf die schlechten, damit der nächste Kunde sieht, wie Sie arbeiten." },
        { title: "Seiten je Leistung und Stadt", text: "Eine eigene Seite für jede Leistung und jede Stadt, in der Sie arbeiten: Dachsanierung in Hanau, nicht nur Dächer. Google zeigt die Seite, die zur Suche passt." },
        { title: "Technische Prüfung der Website", text: "Geschwindigkeit auf dem Handy, Titel und Beschreibungen, strukturierte Daten zu Betrieb und Leistungen, Sitemap. Wir beheben, was Google daran hindert, Sie zu verstehen." },
        { title: "Überall dieselben Daten", text: "Name, Adresse und Telefon, identisch auf der Website, bei Google, auf Karten und in Verzeichnissen. Abweichungen senken das Vertrauen von Google in Ihr Profil." },
        { title: "Zahlen, die Sie selbst lesen", text: "Wir zeigen Ihnen, wo Sie in Ihrem Google-Profil sehen, wonach man Sie sucht und wie viele Anrufe und Routenanfragen daraus kommen. Dafür brauchen Sie niemanden." },
      ],
      includes: [],
      forWhom: [
        "Handwerker und Betriebe, die in einer Stadt oder Region arbeiten",
        "Werkstätten, Salons und Gastronomie, die von den Menschen in der Nähe leben",
        "Bulgarische Betriebe in Deutschland, die von deutschen Kunden gefunden werden wollen",
        "Unternehmen mit einem Google-Profil ohne Fotos, Bewertungen und aktuelle Öffnungszeiten",
      ],
      steps: [
        { title: "Prüfung", text: "Wir sehen uns an, wie Sie heute bei Google erscheinen: Profil, Bewertungen, Website und die Mitbewerber für dieselbe Suche. Wir sagen Ihnen, was fehlt und was wir ändern können." },
        { title: "Profil und Website", text: "Wir vervollständigen und bestätigen das Google-Unternehmensprofil, beheben die technischen Probleme der Website und bringen Ihre Daten überall auf denselben Stand." },
        { title: "Seiten und Bewertungen", text: "Wir schreiben Seiten für Ihre Leistungen und Städte und richten das System zum Sammeln von Bewertungen ein. Die ersten Bewertungen beantworten wir gemeinsam mit Ihnen, damit Sie sehen, wie es geht." },
        { title: "Übergabe", text: "Wir zeigen Ihnen, wie Sie das Profil selbst aktuell halten: Fotos, Beiträge, Öffnungszeiten, Antworten auf Bewertungen. Für Änderungen an Website oder Profil schreiben Sie uns, wenn Sie sie brauchen." },
      ],
      faq: [
        {
          q: "Wann sehe ich Ergebnisse?",
          a: "Google braucht Zeit, um Änderungen zu übernehmen, und niemand kann eine bestimmte Position versprechen. Wir sagen Ihnen ehrlich, was von uns abhängt und was von der Konkurrenz, und zeigen Ihnen, wo Sie die Entwicklung selbst verfolgen können.",
        },
        {
          q: "Was ist der Unterschied zu Google-Werbung?",
          a: "Werbung bringt Anrufe, solange Sie dafür zahlen. Lokales SEO wirkt langsamer, aber Profil und Seiten bleiben und bringen weiter Anfragen, auch wenn wir nicht mehr daran arbeiten. Meist ergänzen sich beide.",
        },
        {
          q: "Brauche ich eine neue Website?",
          a: "Nicht immer. Wenn Ihre Website schnell ist und sich bearbeiten lässt, ergänzen wir die Seiten dort. Ist sie alt und langsam, sagen wir Ihnen das ehrlich, bevor Sie Geld für SEO darauf ausgeben.",
        },
        {
          q: "Was kostet das?",
          a: "Die Einrichtung hat einen Festpreis, den wir Ihnen nach einem kostenlosen Gespräch per Telefon oder Google Meet nennen. Es gibt keine monatliche Gebühr. Wenn Sie später eine neue Seite oder eine Änderung am Profil wünschen, nennen wir den Preis vorab, und Sie zahlen nur dafür.",
        },
      ],
    },
    nl: {
      slug: "lokale-seo",
      metaTitle: "Lokale SEO en Google Bedrijfsprofiel | Rafetov.com",
      metaDescription:
        "Gevonden worden in Google en op de kaart: Google Bedrijfsprofiel instellen, een pagina per dienst en gemeente, reviews verzamelen en beantwoorden.",
      title: "Gevonden worden in Google en op de kaart",
      intro:
        "Wanneer iemand uw dienst en zijn gemeente zoekt, moet hij u zien: op de kaart met reviews, foto's en openingsuren, en op uw website met een pagina precies voor die dienst. We stellen uw Google Bedrijfsprofiel en uw website zo in dat ze samenwerken.",
      priceLine: "",
      cases: [
        { title: "Google Bedrijfsprofiel", text: "Categorieën, diensten, werkgebied, foto's, openingsuren en knoppen om te bellen en te berichten. Het profiel wordt volledig en geverifieerd in plaats van een lege speld met een naam." },
        { title: "Reviews", text: "Een link en een QR-code die u na het werk aan een tevreden klant geeft. We tonen u hoe u op reviews antwoordt, ook op de slechte, zodat de volgende klant ziet hoe u werkt." },
        { title: "Pagina's per dienst en gemeente", text: "Een aparte pagina voor elke dienst en elke gemeente waar u werkt: dakrenovatie in Gent, niet alleen daken. Google toont de pagina die bij de zoekopdracht past." },
        { title: "Technische controle van de website", text: "Snelheid op de gsm, titels en beschrijvingen, gestructureerde gegevens over uw zaak en diensten, sitemap. We herstellen wat Google belet u te begrijpen." },
        { title: "Overal dezelfde gegevens", text: "Naam, adres en telefoon, identiek op uw website, in Google, op kaarten en in gidsen. Verschillen verlagen het vertrouwen van Google in uw profiel." },
        { title: "Cijfers die u zelf leest", text: "We tonen u waar u in uw Google-profiel ziet waarop men u zoekt en hoeveel oproepen en routeaanvragen eruit komen. Daar hebt u niemand voor nodig." },
      ],
      includes: [],
      forWhom: [
        "Vakmensen en bedrijven die in één gemeente of regio werken",
        "Garages, salons en horecazaken die leven van de mensen in de buurt",
        "Bulgaarse bedrijven in België die door Belgische klanten gevonden willen worden",
        "Zaken met een Google-profiel zonder foto's, reviews of actuele openingsuren",
      ],
      steps: [
        { title: "Controle", text: "We bekijken hoe u nu in Google verschijnt: profiel, reviews, website en de concurrenten voor dezelfde zoekopdracht. We zeggen u wat ontbreekt en wat we kunnen veranderen." },
        { title: "Profiel en website", text: "We vullen het Google Bedrijfsprofiel aan en verifiëren het, herstellen de technische problemen op de website en zetten uw gegevens overal gelijk." },
        { title: "Pagina's en reviews", text: "We schrijven pagina's voor uw diensten en gemeenten en zetten het systeem op om reviews te verzamelen. De eerste reviews beantwoorden we samen met u, zodat u ziet hoe het gaat." },
        { title: "Overdracht", text: "We tonen u hoe u het profiel zelf actueel houdt: foto's, berichten, openingsuren, antwoorden op reviews. Voor aanpassingen aan de website of het profiel schrijft u ons wanneer u ze nodig hebt." },
      ],
      faq: [
        {
          q: "Wanneer zie ik resultaten?",
          a: "Google heeft tijd nodig om veranderingen op te nemen, en niemand kan een bepaalde positie beloven. We zeggen u eerlijk wat van ons afhangt en wat van de concurrentie, en we tonen u waar u de evolutie zelf kunt opvolgen.",
        },
        {
          q: "Wat is het verschil met Google-advertenties?",
          a: "Advertenties brengen oproepen zolang u ervoor betaalt. Lokale SEO werkt trager, maar het profiel en de pagina's blijven en brengen aanvragen ook nadat we er niet meer aan werken. Meestal vullen beide elkaar aan.",
        },
        {
          q: "Heb ik een nieuwe website nodig?",
          a: "Niet altijd. Als uw website snel is en bewerkt kan worden, voegen we de pagina's daar toe. Is ze oud en traag, dan zeggen we dat eerlijk voordat u geld uitgeeft aan SEO erop.",
        },
        {
          q: "Wat kost het?",
          a: "De instelling heeft een vaste prijs, die we u geven na een gratis gesprek via telefoon of Google Meet. Er zijn geen maandelijkse kosten. Wilt u later een nieuwe pagina of een aanpassing aan het profiel, dan geven we de prijs vooraf en betaalt u alleen daarvoor.",
        },
      ],
    },
  },
};
