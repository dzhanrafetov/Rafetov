import type { Post } from "../types";

const post: Post = {
  id: "onlain-magazin-dostavki",
  date: "2026-07-07",
  tag: "shop",
  image: "/blog/onlain-magazin-dostavki.webp",
  imageSmall: "/blog/onlain-magazin-dostavki-800.webp",
  imageCredit: "Unsplash",
  content: {
    bg: {
      slug: "onlain-magazin-dostavki-i-plashtaniya",
      title: "Онлайн магазин в България: доставки с Еконт и Спиди, плащания и какво трябва да решите преди старта",
      excerpt:
        "Наложен платеж или карта, Еконт или Спиди, кой плаща доставката. Практичните решения, които определят дали магазинът ще продава, взети преди да е написан и ред код.",
      imageAlt: "Подредени продукти и аксесоари на равна повърхност",
      body: [
        {
          type: "p",
          text: "Повечето хора си представят онлайн магазина като „сайт с кошница“. Кошницата е най-лесната част. Трудните решения са около нея: как стига пратката до клиента, как получавате парите и какво става, когато някой върне стоката. Ето какво трябва да сте решили, преди да започне изработката.",
        },
        { type: "h2", text: "Доставки: Еконт, Спиди или и двете" },
        {
          type: "p",
          text: "В България двата куриера покриват почти всичко. Добрият магазин има директна интеграция с тях: клиентът избира офис или адрес от списък, цената на доставката се изчислява автоматично, а вие печатате товарителницата с едно натискане, без да преписвате адреси на ръка.",
        },
        {
          type: "ul",
          items: [
            "**До офис** е по-евтино и клиентите го предпочитат за дребни поръчки.",
            "**До адрес** е задължително за по-скъпи или обемни стоки.",
            "**Автомати (Еконтомат, Спиди автомат)** растат бързо, особено в големите градове.",
            "Предлагайте и двата куриера. Клиентът обикновено има любим и няма да смени навика си заради вас.",
          ],
        },
        { type: "h2", text: "Кой плаща доставката" },
        {
          type: "p",
          text: "Най-работещият вариант за малък магазин: **безплатна доставка над определена сума** (например над 60 €), а под нея клиентът плаща реалната цена. Това вдига средната поръчка, защото хората добавят още един продукт, за да минат прага. „Безплатна доставка за всичко“ звучи добре, но при дребни поръчки ви изяжда печалбата.",
        },
        { type: "h2", text: "Плащания: наложен платеж и карта" },
        {
          type: "p",
          text: "Наложеният платеж все още е най-предпочитан в България и трябва да го имате. Но той носи и най-много откази: клиентът поръчва импулсивно и не отива да вземе пратката. Плащането с карта решава това, защото платеното се взима. Предложете и двете, а за картите използвайте утвърден доставчик, така че данните на клиента никога не минават през вашия сайт.",
        },
        {
          type: "quote",
          text: "Магазин без наложен платеж губи клиенти. Магазин само с наложен платеж губи пари от невзети пратки. Трябват ви и двете.",
        },
        { type: "h2", text: "Какво още трябва да решите" },
        {
          type: "ol",
          items: [
            "**Наличности.** Продавате ли и офлайн? Тогава наличностите трябва да се синхронизират, иначе ще продадете последната бройка два пъти.",
            "**Връщане и рекламации.** По закон клиентът има 14 дни за връщане. Напишете ясни условия, за да няма спорове.",
            "**Промокодове и отстъпки.** Най-лесният начин да върнете клиент. Магазинът трябва да ги поддържа от първия ден.",
            "**Снимки на продуктите.** Еднакъв фон, еднакъв размер, няколко ъгъла. Лошите снимки убиват продажбите повече от високата цена.",
            "**Общи условия и поверителност.** Задължителни, и то написани за вашия магазин, не копирани отнякъде.",
          ],
        },
        { type: "h2", text: "Колко време и пари" },
        {
          type: "p",
          text: "Онлайн магазин с продукти, кошница, куриери и плащания отнема около 2–4 седмици, ако продуктите и снимките са готови. Точната цена казваме в офертата, след кратък разговор за това какво продавате и как. Разгледайте и магазините, които сме правили, в [проектите ни](/#work): месарски продукти, дрехи, пури, системи за сигурност, билети за събития.",
        },
        {
          type: "tip",
          text: "Съвет: започнете с 20–30 продукта, които наистина продавате, а не с целия каталог от 500. Магазин с малко, но добре представени продукти продава повече от пълен склад с лоши снимки. [Пишете ни](/#contact), ако искате да обсъдим вашия.",
        },
      ],
    },
    en: {
      slug: "online-store-shipping-and-payments",
      title: "Launching an online store: shipping, payments and the decisions to make before the first line of code",
      excerpt:
        "Cash on delivery or card, which couriers, who pays for shipping. The practical decisions that determine whether a store will sell, made before development starts.",
      imageAlt: "Neatly arranged products and accessories on a flat surface",
      body: [
        {
          type: "p",
          text: "Most people picture an online store as “a website with a cart”. The cart is the easy part. The hard decisions sit around it: how the parcel reaches the customer, how you receive the money and what happens when someone returns the goods. Here is what you should have decided before development begins.",
        },
        { type: "h2", text: "Shipping: which couriers and how" },
        {
          type: "p",
          text: "A good store has a direct integration with your couriers: the customer picks a pickup point or an address from a list, the shipping price is calculated automatically, and you print the shipping label with one click, without copying addresses by hand.",
        },
        {
          type: "ul",
          items: [
            "**Pickup points** are cheaper and customers prefer them for small orders.",
            "**Home delivery** is a must for more expensive or bulky goods.",
            "**Parcel lockers** are growing fast, especially in big cities.",
            "Offer at least two couriers. Customers usually have a favourite and will not change their habit for you.",
          ],
        },
        { type: "h2", text: "Who pays for shipping" },
        {
          type: "p",
          text: "The option that works best for a small store: **free shipping above a threshold** (for example above €60), and below it the customer pays the real price. This raises the average order, because people add one more product to reach the threshold. “Free shipping on everything” sounds nice, but on small orders it eats your margin.",
        },
        { type: "h2", text: "Payments: cash on delivery and card" },
        {
          type: "p",
          text: "In many markets cash on delivery is still the most popular option and you should offer it. But it also brings the most refused parcels: the customer orders impulsively and never picks it up. Card payment solves that, because what is paid for gets collected. Offer both, and for cards use an established payment provider, so the customer's card data never passes through your website.",
        },
        {
          type: "quote",
          text: "A store without cash on delivery loses customers. A store with only cash on delivery loses money on unclaimed parcels. You need both.",
        },
        { type: "h2", text: "What else you need to decide" },
        {
          type: "ol",
          items: [
            "**Stock.** Do you also sell offline? Then stock has to be synchronised, or you will sell the last item twice.",
            "**Returns and complaints.** By law the customer has 14 days to return. Write clear terms so there are no disputes.",
            "**Promo codes and discounts.** The easiest way to bring a customer back. The store must support them from day one.",
            "**Product photos.** Same background, same size, several angles. Bad photos kill sales more than a high price does.",
            "**Terms and privacy policy.** Mandatory, and written for your store, not copied from somewhere.",
          ],
        },
        { type: "h2", text: "How long and how much" },
        {
          type: "p",
          text: "An online store with products, cart, couriers and payments takes about 2–4 weeks if the products and photos are ready. The exact price comes in the quote, after a short call about what you sell and how. Have a look at the stores we have built in [our projects](/#work): butcher products, clothing, cigars, security systems, event tickets.",
        },
        {
          type: "tip",
          text: "Tip: start with the 20–30 products you actually sell, not the whole catalogue of 500. A store with few, well-presented products sells more than a full warehouse with bad photos. [Write to us](/#contact) if you want to discuss yours.",
        },
      ],
    },
    de: {
      slug: "onlineshop-versand-und-zahlungen",
      title: "Onlineshop starten: Versand, Zahlungen und die Entscheidungen vor der ersten Zeile Code",
      excerpt:
        "Nachnahme oder Karte, welche Paketdienste, wer zahlt den Versand. Die praktischen Entscheidungen, die bestimmen, ob ein Shop verkauft, getroffen bevor die Entwicklung beginnt.",
      imageAlt: "Ordentlich angeordnete Produkte und Accessoires auf einer flachen Oberfläche",
      body: [
        {
          type: "p",
          text: "Die meisten stellen sich einen Onlineshop als „Webseite mit Warenkorb“ vor. Der Warenkorb ist der einfache Teil. Die schwierigen Entscheidungen liegen drumherum: wie das Paket zum Kunden kommt, wie Sie das Geld erhalten und was passiert, wenn jemand die Ware zurückschickt. Hier steht, was Sie entschieden haben sollten, bevor die Entwicklung beginnt.",
        },
        { type: "h2", text: "Versand: welche Paketdienste und wie" },
        {
          type: "p",
          text: "Ein guter Shop hat eine direkte Anbindung an Ihre Paketdienste: Der Kunde wählt eine Abholstelle oder eine Adresse aus einer Liste, der Versandpreis wird automatisch berechnet, und Sie drucken das Versandetikett mit einem Klick, ohne Adressen von Hand abzutippen.",
        },
        {
          type: "ul",
          items: [
            "**Abholstellen** sind günstiger, und Kunden bevorzugen sie bei kleinen Bestellungen.",
            "**Lieferung an die Adresse** ist Pflicht bei teureren oder sperrigen Waren.",
            "**Paketstationen** wachsen schnell, besonders in großen Städten.",
            "Bieten Sie mindestens zwei Paketdienste an. Kunden haben meist einen Favoriten und ändern ihre Gewohnheit nicht Ihretwegen.",
          ],
        },
        { type: "h2", text: "Wer zahlt den Versand" },
        {
          type: "p",
          text: "Die Variante, die für kleine Shops am besten funktioniert: **kostenloser Versand ab einem Bestellwert** (zum Beispiel ab 60 €), darunter zahlt der Kunde den tatsächlichen Preis. Das erhöht den durchschnittlichen Bestellwert, weil die Leute ein Produkt mehr in den Warenkorb legen, um die Schwelle zu erreichen. „Kostenloser Versand für alles“ klingt gut, frisst aber bei kleinen Bestellungen Ihre Marge.",
        },
        { type: "h2", text: "Zahlungen: Nachnahme und Karte" },
        {
          type: "p",
          text: "In vielen Märkten ist die Nachnahme noch immer die beliebteste Option, und Sie sollten sie anbieten. Sie bringt aber auch die meisten verweigerten Pakete: Der Kunde bestellt impulsiv und holt das Paket nie ab. Die Kartenzahlung löst das, denn was bezahlt ist, wird abgeholt. Bieten Sie beides an, und nutzen Sie für Karten einen etablierten Zahlungsanbieter, damit die Kartendaten des Kunden nie über Ihre Webseite laufen.",
        },
        {
          type: "quote",
          text: "Ein Shop ohne Nachnahme verliert Kunden. Ein Shop nur mit Nachnahme verliert Geld durch nicht abgeholte Pakete. Sie brauchen beides.",
        },
        { type: "h2", text: "Was Sie außerdem entscheiden müssen" },
        {
          type: "ol",
          items: [
            "**Lagerbestand.** Verkaufen Sie auch offline? Dann müssen die Bestände synchronisiert werden, sonst verkaufen Sie das letzte Stück zweimal.",
            "**Rückgabe und Reklamationen.** Gesetzlich hat der Kunde 14 Tage Widerrufsrecht. Schreiben Sie klare Bedingungen, damit es keine Streitigkeiten gibt.",
            "**Gutscheincodes und Rabatte.** Der einfachste Weg, einen Kunden zurückzuholen. Der Shop muss sie vom ersten Tag an unterstützen.",
            "**Produktfotos.** Gleicher Hintergrund, gleiche Größe, mehrere Winkel. Schlechte Fotos töten den Verkauf mehr als ein hoher Preis.",
            "**AGB und Datenschutz.** Pflicht, und zwar für Ihren Shop geschrieben, nicht irgendwo kopiert.",
          ],
        },
        { type: "h2", text: "Wie lange und wie viel" },
        {
          type: "p",
          text: "Ein Onlineshop mit Produkten, Warenkorb, Paketdiensten und Zahlungen dauert etwa 2–4 Wochen, wenn Produkte und Fotos fertig sind. Den genauen Preis nennen wir im Angebot, nach einem kurzen Gespräch darüber, was Sie verkaufen und wie. Schauen Sie sich auch die Shops an, die wir gebaut haben, in [unseren Projekten](/#work): Fleischwaren, Bekleidung, Zigarren, Sicherheitssysteme, Veranstaltungstickets.",
        },
        {
          type: "tip",
          text: "Tipp: Starten Sie mit den 20–30 Produkten, die Sie wirklich verkaufen, nicht mit dem ganzen Katalog von 500. Ein Shop mit wenigen, gut präsentierten Produkten verkauft mehr als ein volles Lager mit schlechten Fotos. [Schreiben Sie uns](/#contact), wenn Sie Ihren besprechen möchten.",
        },
      ],
    },
  },
};

export default post;
