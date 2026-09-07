import type { Post } from "../types";

const post: Post = {
  id: "digitalno-menu-restorant",
  date: "2026-08-04",
  tag: "menu",
  image: "/blog/digitalno-menu-restorant.webp",
  imageSmall: "/blog/digitalno-menu-restorant-800.webp",
  imageCredit: "Unsplash",
  content: {
    bg: {
      slug: "digitalno-menu-ili-hartieno",
      title: "Дигитално меню срещу хартиено: какво печели ресторантът с QR код на масата",
      excerpt:
        "Колко струва да препечатате менюто при всяка промяна на цените, какво губите, когато чужденец не разбира нищо, и какво реално дава QR менюто.",
      imageAlt: "Чаша кафе и сметка на дървена маса в заведение",
      body: [
        {
          type: "p",
          text: "Всеки собственик на заведение познава ситуацията: доставчикът вдига цените, а менюто е напечатано преди месец. Или: група туристи гледа менюто, не разбира нищо и си тръгва. Дигиталното меню решава точно тези проблеми, но не е магия. Ето какво дава, какво не дава и как да го направите така, че гостите наистина да го ползват.",
        },
        { type: "h2", text: "Какво е дигитално меню" },
        {
          type: "p",
          text: "Страница в интернет, направена специално за вашето заведение, с категории, ястия, снимки, цени и алергени. На всяка маса стои QR код, гостът го сканира с телефона и менюто се отваря веднага, без приложение и без регистрация. Промените правите вие, от телефона си, за минута.",
        },
        { type: "h2", text: "Какво печелите" },
        {
          type: "ul",
          items: [
            "**Край на препечатването.** Промяна на цена, ново ястие, свършил продукт: коригирате го и гостите виждат актуалното меню в същата секунда. Един печат на 20 менюта с ламинат струва колкото половин дигитално меню.",
            "**Езици.** Български, английски, немски, турски: гостът избира и чете на своя език. За заведения по морето и в планините това е разликата между поръчка и „само една вода“.",
            "**Снимки продават.** Ястие със снимка се поръчва по-често от ястие само с име. Добрите снимки вдигат средната сметка.",
            "**Алергени и информация.** Задължителни по закон, а на хартия често липсват. Дигитално се отбелязват с иконка.",
            "**По-малко чакане.** Гостът разглежда менюто, докато сервитьорът стига до масата. Оборотът на масите се ускорява.",
            "**Google ви намира.** Менюто е страница в интернет, тоест хората, които търсят „ресторант + град“, стигат до него и виждат какво предлагате, преди да дойдат.",
          ],
        },
        { type: "h2", text: "Какво не дава" },
        {
          type: "p",
          text: "Дигиталното меню не замества хартиеното напълно, и не бива. Винаги има гости без телефон под ръка, по-възрастни хора или просто такива, които предпочитат хартия. Дръжте няколко хартиени менюта за тях. Също така менюто не е система за поръчки: гостът чете, но поръчва при сервитьора. Онлайн поръчката е отделна функция, която може да се добави, ако ви трябва.",
        },
        {
          type: "quote",
          text: "Най-добрите QR менюта не се забелязват. Гостът сканира, чете, поръчва. Ако трябва да инсталира нещо или да чака зареждане, се отказва.",
        },
        { type: "h2", text: "Какво прави едно QR меню добро" },
        {
          type: "ol",
          items: [
            "**Отваря се за под две секунди** на всякакъв телефон, дори с бавен интернет.",
            "**Изглежда като вашето заведение,** не като шаблон, който сте виждали в три други ресторанта.",
            "**Категориите са видими веднага:** салати, основни, напитки. Без скролване през 80 ястия.",
            "**Снимките са истински,** на вашите ястия, не стокови.",
            "**Смяната е лесна.** Ако трябва да се обаждате на някого за всяка цена, не е дигитално меню, а хартиено с QR код.",
          ],
        },
        { type: "h2", text: "Примери от наши клиенти" },
        {
          type: "p",
          text: "Правили сме менюта за ресторанти в България и Норвегия, на два и три езика, с QR кодове за масите и за витрината. Разгледайте ги в [проектите ни](/#work), сканирайте и вижте как работи от телефона си. Ако искате същото за вашето заведение, [пишете ни](/#contact), правим го за няколко дни.",
        },
        {
          type: "tip",
          text: "Съвет: сложете QR кода не само на масите, а и на витрината и на входа. Хората решават дали да влязат, докато гледат менюто отвън.",
        },
      ],
    },
    en: {
      slug: "digital-menu-vs-paper-menu",
      title: "Digital menu vs paper menu: what a restaurant gains from a QR code on the table",
      excerpt:
        "What reprinting the menu at every price change costs you, what you lose when a tourist cannot read it, and what a QR menu actually delivers.",
      imageAlt: "Cup of coffee and a bill on a wooden restaurant table",
      body: [
        {
          type: "p",
          text: "Every restaurant owner knows the situation: the supplier raises prices and the menu was printed a month ago. Or a group of tourists looks at the menu, understands nothing and leaves. A digital menu solves exactly these problems, but it is not magic. Here is what it gives you, what it does not, and how to make one that guests actually use.",
        },
        { type: "h2", text: "What a digital menu is" },
        {
          type: "p",
          text: "A web page built specifically for your restaurant, with categories, dishes, photos, prices and allergens. A QR code sits on every table, the guest scans it with their phone and the menu opens instantly, with no app and no sign-up. You make changes yourself, from your phone, in a minute.",
        },
        { type: "h2", text: "What you gain" },
        {
          type: "ul",
          items: [
            "**No more reprinting.** A price change, a new dish, a sold-out item: you edit it and guests see the current menu that same second. One print run of 20 laminated menus costs about half of a digital menu.",
            "**Languages.** English, German, Bulgarian, Turkish: the guest picks a language and reads in their own. For restaurants in tourist areas this is the difference between an order and “just a water”.",
            "**Photos sell.** A dish with a photo gets ordered more often than a dish with just a name. Good photos raise the average bill.",
            "**Allergens and information.** Required by law and often missing on paper. Digitally they are marked with an icon.",
            "**Less waiting.** The guest browses the menu while the waiter is on the way. Tables turn faster.",
            "**Google finds you.** The menu is a web page, so people searching “restaurant + town” reach it and see what you offer before they come.",
          ],
        },
        { type: "h2", text: "What it does not do" },
        {
          type: "p",
          text: "A digital menu does not fully replace the paper one, and it should not. There are always guests without a phone at hand, older people or simply those who prefer paper. Keep a few paper menus for them. Also, the menu is not an ordering system: the guest reads, but orders with the waiter. Online ordering is a separate feature that can be added if you need it.",
        },
        {
          type: "quote",
          text: "The best QR menus go unnoticed. The guest scans, reads, orders. If they have to install something or wait for loading, they give up.",
        },
        { type: "h2", text: "What makes a QR menu good" },
        {
          type: "ol",
          items: [
            "**It opens in under two seconds** on any phone, even with slow internet.",
            "**It looks like your restaurant,** not like a template you have seen in three other places.",
            "**Categories are visible immediately:** salads, mains, drinks. No scrolling through 80 dishes.",
            "**The photos are real,** of your dishes, not stock images.",
            "**Changes are easy.** If you have to call someone for every price, it is not a digital menu, it is a paper menu with a QR code.",
          ],
        },
        { type: "h2", text: "Examples from our clients" },
        {
          type: "p",
          text: "We have built menus for restaurants in Bulgaria and Norway, in two and three languages, with QR codes for the tables and the shop window. Have a look at [our projects](/#work), scan and see how it works on your own phone. If you want the same for your restaurant, [write to us](/#contact), it takes a few days.",
        },
        {
          type: "tip",
          text: "Tip: put the QR code not only on the tables, but also on the window and at the entrance. People decide whether to come in while reading the menu from outside.",
        },
      ],
    },
    de: {
      slug: "digitale-speisekarte-oder-papier",
      title: "Digitale Speisekarte oder Papier: was ein Restaurant mit dem QR-Code auf dem Tisch gewinnt",
      excerpt:
        "Was der Neudruck der Karte bei jeder Preisänderung kostet, was Sie verlieren, wenn ein Tourist nichts versteht, und was eine QR-Speisekarte wirklich bringt.",
      imageAlt: "Tasse Kaffee und Rechnung auf einem Holztisch im Restaurant",
      body: [
        {
          type: "p",
          text: "Jeder Gastronom kennt die Situation: Der Lieferant erhöht die Preise, und die Karte wurde vor einem Monat gedruckt. Oder: Eine Gruppe Touristen schaut in die Karte, versteht nichts und geht wieder. Die digitale Speisekarte löst genau diese Probleme, aber sie ist keine Zauberei. Hier lesen Sie, was sie bringt, was nicht, und wie Sie sie so gestalten, dass Gäste sie wirklich nutzen.",
        },
        { type: "h2", text: "Was eine digitale Speisekarte ist" },
        {
          type: "p",
          text: "Eine Webseite, die speziell für Ihr Lokal gebaut ist, mit Kategorien, Gerichten, Fotos, Preisen und Allergenen. Auf jedem Tisch steht ein QR-Code, der Gast scannt ihn mit dem Handy, und die Karte öffnet sich sofort, ohne App und ohne Registrierung. Änderungen machen Sie selbst, vom Handy aus, in einer Minute.",
        },
        { type: "h2", text: "Was Sie gewinnen" },
        {
          type: "ul",
          items: [
            "**Schluss mit dem Neudruck.** Preisänderung, neues Gericht, ausverkaufte Position: Sie korrigieren es, und die Gäste sehen die aktuelle Karte in derselben Sekunde. Ein Druck von 20 laminierten Karten kostet etwa die Hälfte einer digitalen Speisekarte.",
            "**Sprachen.** Deutsch, Englisch, Bulgarisch, Türkisch: Der Gast wählt und liest in seiner Sprache. Für Lokale in Touristengebieten ist das der Unterschied zwischen einer Bestellung und „nur ein Wasser“.",
            "**Fotos verkaufen.** Ein Gericht mit Foto wird häufiger bestellt als eines nur mit Namen. Gute Fotos erhöhen den Durchschnittsbon.",
            "**Allergene und Informationen.** Gesetzlich vorgeschrieben und auf Papier oft nicht vorhanden. Digital werden sie mit einem Symbol markiert.",
            "**Weniger Wartezeit.** Der Gast schaut in die Karte, während der Kellner unterwegs ist. Die Tische wechseln schneller.",
            "**Google findet Sie.** Die Karte ist eine Webseite, das heißt, wer „Restaurant + Stadt“ sucht, landet dort und sieht Ihr Angebot, bevor er kommt.",
          ],
        },
        { type: "h2", text: "Was sie nicht leistet" },
        {
          type: "p",
          text: "Die digitale Karte ersetzt die Papierkarte nicht vollständig, und das sollte sie auch nicht. Es gibt immer Gäste ohne Handy zur Hand, ältere Menschen oder einfach solche, die Papier bevorzugen. Halten Sie ein paar Papierkarten für sie bereit. Außerdem ist die Karte kein Bestellsystem: Der Gast liest, bestellt aber beim Kellner. Online-Bestellung ist eine separate Funktion, die sich bei Bedarf ergänzen lässt.",
        },
        {
          type: "quote",
          text: "Die besten QR-Speisekarten fallen nicht auf. Der Gast scannt, liest, bestellt. Muss er etwas installieren oder aufs Laden warten, gibt er auf.",
        },
        { type: "h2", text: "Was eine gute QR-Speisekarte ausmacht" },
        {
          type: "ol",
          items: [
            "**Sie öffnet sich in unter zwei Sekunden** auf jedem Handy, auch bei langsamem Internet.",
            "**Sie sieht aus wie Ihr Lokal,** nicht wie eine Vorlage, die man schon in drei anderen Restaurants gesehen hat.",
            "**Die Kategorien sind sofort sichtbar:** Salate, Hauptgerichte, Getränke. Kein Scrollen durch 80 Gerichte.",
            "**Die Fotos sind echt,** von Ihren Gerichten, keine Stockbilder.",
            "**Änderungen sind einfach.** Wenn Sie für jeden Preis jemanden anrufen müssen, ist es keine digitale Speisekarte, sondern eine Papierkarte mit QR-Code.",
          ],
        },
        { type: "h2", text: "Beispiele unserer Kunden" },
        {
          type: "p",
          text: "Wir haben Speisekarten für Restaurants in Bulgarien und Norwegen gebaut, in zwei und drei Sprachen, mit QR-Codes für die Tische und das Schaufenster. Schauen Sie sich [unsere Projekte](/#work) an, scannen Sie und sehen Sie, wie es auf Ihrem Handy funktioniert. Wenn Sie dasselbe für Ihr Lokal möchten, [schreiben Sie uns](/#contact), es dauert nur wenige Tage.",
        },
        {
          type: "tip",
          text: "Tipp: Platzieren Sie den QR-Code nicht nur auf den Tischen, sondern auch im Schaufenster und am Eingang. Die Leute entscheiden, ob sie hereinkommen, während sie die Karte von draußen lesen.",
        },
      ],
    },
  },
};

export default post;
