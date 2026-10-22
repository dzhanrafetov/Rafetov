import type { Service } from "./index";

/**
 * Поддръжка без месечен абонамент: промени по заявка, Еконт и Спиди, плащания, фактуриране, хостинг и домейн, поемане на чужд сайт.
 * Няма месечна такса: цената за всяка промяна се казва предварително и клиентът плаща само за нея.
 * Без измислени резултати, без обещани срокове за реакция.
 */
export const careService: Service = {
  id: "care",
  key: "care",
  visual: { vignette: "care" },
  caseIcons: ["FileText", "MapPin", "ClipboardList", "Monitor", "LifeBuoy", "Workflow"],
  tag: null,
  accent: "#22D3EE",
  relatedPosts: [],
  includeIcons: [],
  forWhomIcons: [],
  content: {
    bg: {
      slug: "poddruzhka-na-sait",
      metaTitle: "Поддръжка на сайт без месечен абонамент | Промени, Еконт, плащания | Rafetov.com",
      metaDescription:
        "Поддръжка на сайт без месечна такса. Промени по заявка, Еконт и Спиди, картови плащания, фактуриране, хостинг и домейн. Казваме цената предварително, плащате само за направеното.",
      title: "Поддръжка без месечен абонамент",
      intro:
        "Няма месечна такса към нас, а първите 30 дни след пускането дребните промени са безплатни. След това, когато ви трябва промяна по сайта, нова интеграция или помощ с хостинга и домейна, пишете ни. Казваме ви цената предварително, правим промяната и плащате само за нея.",
      priceLine: "",
      cases: [
        { title: "Промени по сайта", text: "Нова страница, сменени снимки и текстове, друга цена, нов служител в екипа. Пишете ни какво трябва да се смени и ние го правим." },
        { title: "Еконт и Спиди", text: "Поръчката от магазина става товарителница с едно натискане, а клиентът получава номер за проследяване. Вие не преписвате адреси." },
        { title: "Картови плащания и фактуриране", text: "Плащане с карта в магазина, автоматична фактура към всяка поръчка и връзка със счетоводната ви програма, ако позволява." },
        { title: "Хостинг, домейн и HTTPS", text: "Помагаме с настройката на хостинга, преместване на друг хостинг, подновяване на изтекъл домейн и включване на HTTPS сертификат." },
        { title: "Сайт, направен от друг", text: "Ако сайтът ви е правен от друг и никой вече не го поддържа, първо го преглеждаме. Казваме ви какво може да се направи и на каква цена." },
        { title: "Нови функции", text: "Система за записване на час, нова форма, допълнителен език, чат с клиентите. Добавяме ги към съществуващия сайт, без да го правим отначало." },
      ],
      includes: [],
      forWhom: [
        "Фирми със сайт от нас, които искат промени от време на време",
        "Фирми със сайт от друг, който никой вече не поддържа",
        "Онлайн магазини, които искат куриери, плащания и фактури",
        "Бизнеси, които не искат месечна такса за сайта си",
      ],
      steps: [
        { title: "Пишете ни", text: "В WhatsApp, Viber или на имейл: какво трябва да се промени или добави. Може да е изречение или списък, не е нужно да е техническо." },
        { title: "Цена предварително", text: "Гледаме сайта и ви казваме цената за тази промяна, преди да сме започнали. Ако има по-лесен начин да постигнете същото, ще ви го предложим." },
        { title: "Правим промяната", text: "Правим промяната и ви я показваме. Ако нещо не е както сте го искали, го коригираме, преди да е публикувано." },
        { title: "Плащате само за направеното", text: "Плащате за тази конкретна промяна. Няма абонамент, няма такса за месеците, в които не ви е трябвало нищо." },
      ],
      faq: [
        {
          q: "Има ли месечна поддръжка?",
          a: "Не, нямаме месечен абонамент. Първите 30 дни след пускането дребните промени са безплатни. След това плащате само когато поискате промяна, и знаете цената предварително. Ако месеци наред не ви трябва нищо, не плащате нищо.",
        },
        {
          q: "Мога ли сам да сменям текстове и снимки?",
          a: "Ако сайтът ви има административен панел за това, ви показваме как се работи с него и го правите сами. За всичко останало ни пишете и го правим ние.",
        },
        {
          q: "Поемате ли сайт, направен от друг?",
          a: "Да. Първо го преглеждаме: къде е хостван, кой държи домейна, как е построен. После ви казваме какво може да се направи по него и на каква цена.",
        },
        {
          q: "Колко струва?",
          a: "Зависи от промяната. Казваме ви цената, преди да започнем, и тя не се променя по пътя. Няма месечна такса и няма обвързване.",
        },
      ],
    },
    en: {
      slug: "website-maintenance",
      metaTitle: "Website maintenance with no monthly subscription | Changes, couriers, payments | Rafetov.com",
      metaDescription:
        "Website support with no monthly fee. Changes on request, couriers, card payments, invoicing, hosting and domain. You get the price in advance and pay only for what is done.",
      title: "Support without a monthly subscription",
      intro:
        "There is no monthly fee to us, and small changes are free for the first 30 days after launch. After that, when you need a change to the site, a new integration or help with the hosting and domain, you write to us. We tell you the price in advance, make the change and you pay only for that.",
      priceLine: "",
      cases: [
        { title: "Changes to the site", text: "A new page, new photos and texts, a different price, a new team member. You write to us what needs changing and we do it." },
        { title: "Couriers", text: "An order in the shop becomes a shipping label in one tap and the customer gets a tracking number. You do not retype addresses. Econt and Speedy in Bulgaria, or the courier you use." },
        { title: "Card payments and invoicing", text: "Card payment in the shop, an automatic invoice for every order and a connection to your accounting software, if it allows one." },
        { title: "Hosting, domain and HTTPS", text: "We help with setting up the hosting, moving to another host, renewing an expired domain and switching on an HTTPS certificate." },
        { title: "A site built by someone else", text: "If your site was built by someone else and nobody maintains it any more, we review it first. We tell you what can be done and at what price." },
        { title: "New features", text: "An appointment booking system, a new form, an extra language, a chat with your customers. We add them to the existing site without rebuilding it." },
      ],
      includes: [],
      forWhom: [
        "Businesses with a site by us that want changes from time to time",
        "Businesses with a site by someone else that nobody maintains any more",
        "Online shops that want couriers, payments and invoices",
        "Businesses that do not want a monthly fee for their site",
      ],
      steps: [
        { title: "You write to us", text: "On WhatsApp, Viber or by email: what needs changing or adding. It can be one sentence or a list, it does not need to be technical." },
        { title: "The price in advance", text: "We look at the site and tell you the price for that change before we start. If there is a simpler way to get the same result, we will suggest it." },
        { title: "We make the change", text: "We make the change and show it to you. If something is not the way you wanted it, we correct it before it goes live." },
        { title: "You pay only for what was done", text: "You pay for that specific change. No subscription, no fee for the months in which you needed nothing." },
      ],
      faq: [
        {
          q: "Is there monthly maintenance?",
          a: "No, we have no monthly subscription. Small changes are free for the first 30 days after launch. After that you pay only when you ask for a change, and you know the price in advance. If you need nothing for months, you pay nothing.",
        },
        {
          q: "Can I change texts and photos myself?",
          a: "If your site has an admin panel for that, we show you how to use it and you do it yourself. For everything else you write to us and we do it.",
        },
        {
          q: "Will you take on a site built by someone else?",
          a: "Yes. We review it first: where it is hosted, who holds the domain, how it is built. Then we tell you what can be done with it and at what price.",
        },
        {
          q: "How much does it cost?",
          a: "It depends on the change. We tell you the price before we start, and it does not change along the way. There is no monthly fee and no contract.",
        },
      ],
    },
    de: {
      slug: "website-betreuung",
      metaTitle: "Website-Betreuung ohne monatliches Abo | Änderungen, Versand, Zahlungen | Rafetov.com",
      metaDescription:
        "Website-Betreuung ohne monatliche Gebühr. Änderungen auf Anfrage, Paketdienste, Kartenzahlung, Rechnungen, Hosting und Domain. Sie kennen den Preis vorab und zahlen nur, was gemacht wurde.",
      title: "Betreuung ohne monatliches Abo",
      intro:
        "Bei uns gibt es keine monatliche Gebühr, und in den ersten 30 Tagen nach dem Start sind kleine Änderungen kostenlos. Danach gilt: Wenn Sie eine Änderung an der Website, eine neue Anbindung oder Hilfe mit Hosting und Domain brauchen, schreiben Sie uns. Wir nennen Ihnen den Preis vorab, erledigen die Änderung, und Sie zahlen nur dafür.",
      priceLine: "",
      cases: [
        { title: "Änderungen an der Website", text: "Eine neue Seite, neue Fotos und Texte, ein anderer Preis, ein neuer Mitarbeiter im Team. Sie schreiben uns, was sich ändern soll, und wir erledigen es." },
        { title: "Paketdienste", text: "Aus der Bestellung im Shop wird mit einem Klick ein Versandetikett, und der Kunde bekommt eine Sendungsnummer. Sie tippen keine Adressen ab. Econt und Speedy in Bulgarien oder der Paketdienst, den Sie nutzen." },
        { title: "Kartenzahlung und Rechnungen", text: "Kartenzahlung im Shop, automatische Rechnung zu jeder Bestellung und Anbindung an Ihre Buchhaltungssoftware, sofern sie das erlaubt." },
        { title: "Hosting, Domain und HTTPS", text: "Wir helfen beim Einrichten des Hostings, beim Umzug zu einem anderen Anbieter, beim Verlängern einer abgelaufenen Domain und beim Einrichten eines HTTPS-Zertifikats." },
        { title: "Website von jemand anderem", text: "Wenn Ihre Website von jemand anderem gebaut wurde und niemand sie mehr pflegt, prüfen wir sie zuerst. Wir sagen Ihnen, was sich machen lässt und zu welchem Preis." },
        { title: "Neue Funktionen", text: "Eine Terminbuchung, ein neues Formular, eine weitere Sprache, ein Chat mit Ihren Kunden. Wir ergänzen sie auf der bestehenden Website, ohne sie neu zu bauen." },
      ],
      includes: [],
      forWhom: [
        "Betriebe mit einer Website von uns, die hin und wieder Änderungen brauchen",
        "Betriebe mit einer Website von jemand anderem, die niemand mehr pflegt",
        "Onlineshops, die Paketdienste, Zahlungen und Rechnungen anbinden wollen",
        "Unternehmen, die keine monatliche Gebühr für ihre Website wollen",
      ],
      steps: [
        { title: "Sie schreiben uns", text: "Auf WhatsApp, Viber oder per E-Mail: was geändert oder ergänzt werden soll. Ein Satz oder eine Liste reicht, es muss nicht technisch sein." },
        { title: "Preis vorab", text: "Wir sehen uns die Website an und nennen Ihnen den Preis für diese Änderung, bevor wir anfangen. Gibt es einen einfacheren Weg zum selben Ergebnis, schlagen wir ihn Ihnen vor." },
        { title: "Wir erledigen die Änderung", text: "Wir setzen die Änderung um und zeigen sie Ihnen. Ist etwas nicht so, wie Sie es wollten, korrigieren wir es, bevor es online geht." },
        { title: "Sie zahlen nur, was gemacht wurde", text: "Sie zahlen für genau diese Änderung. Kein Abo, keine Gebühr für Monate, in denen Sie nichts gebraucht haben." },
      ],
      faq: [
        {
          q: "Gibt es eine monatliche Betreuung?",
          a: "Nein, wir haben kein monatliches Abo. In den ersten 30 Tagen nach dem Start sind kleine Änderungen kostenlos. Danach zahlen Sie nur, wenn Sie eine Änderung wünschen, und Sie kennen den Preis vorab. Brauchen Sie monatelang nichts, zahlen Sie auch nichts.",
        },
        {
          q: "Kann ich Texte und Fotos selbst ändern?",
          a: "Wenn Ihre Website dafür einen Verwaltungsbereich hat, zeigen wir Ihnen, wie er funktioniert, und Sie machen es selbst. Für alles andere schreiben Sie uns, und wir erledigen es.",
        },
        {
          q: "Übernehmen Sie eine Website, die jemand anderes gebaut hat?",
          a: "Ja. Wir prüfen sie zuerst: wo sie gehostet ist, wer die Domain hält, wie sie gebaut ist. Dann sagen wir Ihnen, was sich daran machen lässt und zu welchem Preis.",
        },
        {
          q: "Was kostet das?",
          a: "Das hängt von der Änderung ab. Wir nennen Ihnen den Preis, bevor wir anfangen, und er ändert sich unterwegs nicht. Es gibt keine monatliche Gebühr und keine Bindung.",
        },
      ],
    },
    nl: {
      slug: "website-onderhoud",
      metaTitle: "Website-onderhoud zonder maandelijks abonnement | Aanpassingen, koeriers, betalingen | Rafetov.com",
      metaDescription:
        "Website-ondersteuning zonder maandelijkse kosten. Aanpassingen op vraag, koeriers, kaartbetalingen, facturatie, hosting en domein. U kent de prijs vooraf en betaalt alleen wat gedaan is.",
      title: "Ondersteuning zonder maandelijks abonnement",
      intro:
        "Bij ons betaalt u geen maandelijkse kosten, en de eerste 30 dagen na de lancering zijn kleine aanpassingen gratis. Daarna geldt: hebt u een aanpassing aan de website, een nieuwe koppeling of hulp met hosting en domein nodig, dan schrijft u ons. We geven u de prijs vooraf, doen de aanpassing en u betaalt alleen daarvoor.",
      priceLine: "",
      cases: [
        { title: "Aanpassingen aan de website", text: "Een nieuwe pagina, nieuwe foto's en teksten, een andere prijs, een nieuwe medewerker in het team. U schrijft ons wat er moet veranderen en wij doen het." },
        { title: "Koeriers", text: "Een bestelling in de webshop wordt met één klik een verzendetiket en de klant krijgt een trackingnummer. U typt geen adressen over. Econt en Speedy in Bulgarije, of de koerier die u gebruikt." },
        { title: "Kaartbetalingen en facturatie", text: "Betaling met kaart of Bancontact in de webshop, een automatische factuur bij elke bestelling en een koppeling met uw boekhoudsoftware, als die het toelaat." },
        { title: "Hosting, domein en HTTPS", text: "We helpen met het instellen van de hosting, verhuizen naar een andere host, vernieuwen van een vervallen domein en inschakelen van een HTTPS-certificaat." },
        { title: "Website van iemand anders", text: "Is uw website door iemand anders gemaakt en onderhoudt niemand ze nog, dan bekijken we ze eerst. We zeggen u wat er mogelijk is en tegen welke prijs." },
        { title: "Nieuwe functies", text: "Een afsprakensysteem, een nieuw formulier, een extra taal, een chat met uw klanten. We voegen ze toe aan de bestaande website zonder ze opnieuw te bouwen." },
      ],
      includes: [],
      forWhom: [
        "Zaken met een website van ons die af en toe aanpassingen willen",
        "Zaken met een website van iemand anders die niemand nog onderhoudt",
        "Webshops die koeriers, betalingen en facturen willen koppelen",
        "Bedrijven die geen maandelijkse kosten voor hun website willen",
      ],
      steps: [
        { title: "U schrijft ons", text: "Op WhatsApp, Viber of per e-mail: wat er veranderd of toegevoegd moet worden. Eén zin of een lijstje volstaat, het hoeft niet technisch te zijn." },
        { title: "Prijs vooraf", text: "We bekijken de website en geven u de prijs voor die aanpassing voordat we beginnen. Is er een eenvoudigere manier om hetzelfde te bereiken, dan stellen we die voor." },
        { title: "We doen de aanpassing", text: "We voeren de aanpassing uit en tonen ze u. Is iets niet zoals u het wilde, dan corrigeren we het voordat het online gaat." },
        { title: "U betaalt alleen wat gedaan is", text: "U betaalt voor die ene aanpassing. Geen abonnement, geen kosten voor de maanden waarin u niets nodig had." },
      ],
      faq: [
        {
          q: "Is er maandelijks onderhoud?",
          a: "Nee, we hebben geen maandelijks abonnement. De eerste 30 dagen na de lancering zijn kleine aanpassingen gratis. Daarna betaalt u alleen wanneer u een aanpassing vraagt, en u kent de prijs vooraf. Hebt u maandenlang niets nodig, dan betaalt u ook niets.",
        },
        {
          q: "Kan ik zelf teksten en foto's aanpassen?",
          a: "Als uw website daarvoor een beheerpaneel heeft, tonen we u hoe het werkt en doet u het zelf. Voor al het andere schrijft u ons en doen wij het.",
        },
        {
          q: "Nemen jullie een website over die iemand anders gemaakt heeft?",
          a: "Ja. We bekijken ze eerst: waar ze gehost is, wie het domein beheert, hoe ze gebouwd is. Daarna zeggen we u wat ermee mogelijk is en tegen welke prijs.",
        },
        {
          q: "Wat kost het?",
          a: "Dat hangt af van de aanpassing. We geven u de prijs voordat we beginnen, en die verandert onderweg niet. Er zijn geen maandelijkse kosten en geen contract.",
        },
      ],
    },
  },
};
