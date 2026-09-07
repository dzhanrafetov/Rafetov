import type { Post } from "../types";

const post: Post = {
  id: "lokalno-seo",
  date: "2026-07-28",
  tag: "general",
  image: "/blog/lokalno-seo.webp",
  imageSmall: "/blog/lokalno-seo-800.webp",
  imageCredit: "Unsplash",
  content: {
    bg: {
      slug: "lokalno-seo-blizo-do-men",
      title: "Локално SEO: как да излезете в Google при търсене „близо до мен“",
      excerpt:
        "Повечето клиенти на малкия бизнес търсят „услуга + град“ или „близо до мен“. Какво гледа Google, за да покаже точно вас, и петте неща, които решават класирането.",
      imageAlt: "Градски сгради и кула, гледани отдолу",
      body: [
        {
          type: "p",
          text: "„Автосервиз Бургас“, „зъболекар близо до мен“, „ремонт на перални Варна“. Така търсят клиентите на малкия бизнес и така Google решава кого да покаже: в картата с трите заведения и в резултатите под нея. Това се нарича локално SEO и за разлика от „голямото“ SEO е напълно постижимо за един бизнес с един сайт. Ето какво гледа Google.",
        },
        { type: "h2", text: "Какво гледа Google при локално търсене" },
        {
          type: "ol",
          items: [
            "**Близост.** Колко сте близо до човека, който търси. Не можете да го промените, но можете да покриете околните градове с текст на сайта.",
            "**Съответствие.** Дали категорията и текстовете ви казват точно това, което човекът търси. „Услуги“ не е категория. „Ремонт на перални и сушилни“ е.",
            "**Доверие.** Отзиви, пълен профил, споменавания на бизнеса на други места с еднакви данни, работещ сайт.",
          ],
        },
        { type: "h2", text: "1. Google Business профилът е половината работа" },
        {
          type: "p",
          text: "Без пълен, потвърден профил в Google Maps не съществувате в картата, независимо колко е добър сайтът. Категория, работно време, снимки, отзиви с отговори. Написали сме [подробна инструкция за ресторанти](/blog/google-business-profil-za-restorant), но стъпките са същите за всеки бизнес.",
        },
        { type: "h2", text: "2. Град и услуга в текста на сайта" },
        {
          type: "p",
          text: "Google не гадае. Ако на сайта никъде не пише „Варна“, няма да излезете за „Варна“. Заглавието на страницата, първото изречение и заглавието H1 трябва да съдържат услугата и града: „Ремонт на перални във Варна“. Ако покривате няколко града, всяка услуга и всеки град заслужават отделен кратък параграф, а най-важните комбинации, отделна страница.",
        },
        { type: "h2", text: "3. Еднакви данни навсякъде" },
        {
          type: "p",
          text: "Име, адрес и телефон трябва да са напълно еднакви в Google, на сайта, във Facebook, в Instagram и във всеки указател. „ул. Иван Вазов 5“ и „Ив. Вазов 5“ за Google са различни адреси, а различията намаляват доверието. Проверете и старите указатели, в които сте се записали преди години.",
        },
        { type: "h2", text: "4. Отзиви, постоянно" },
        {
          type: "p",
          text: "Не 40 отзива наведнъж и после нищо, а по 2–3 на месец, постоянно. Google цени свежестта. Молете доволните клиенти веднага след работата, докато са доволни: с линк по SMS или с QR код. Отговаряйте на всеки отзив с едно-две изречения, включително с думите, по които искате да ви намират: „Радваме се, че ремонтът на пералната мина бързо“.",
        },
        { type: "h2", text: "5. Сайт, който Google може да прочете" },
        {
          type: "p",
          text: "Бърз на телефон, с реален текст (не текст в снимки), с ясни заглавия и с адрес и телефон на всяка страница. Google трябва да разбира какво има на страницата, без да гадае. Структурирани данни за локален бизнес (адрес, телефон, работно време в машинно четим вид) помагат допълнително и ние ги слагаме на всеки сайт, който правим.",
        },
        {
          type: "quote",
          text: "Локалното SEO не е трик. Това е да кажете на Google същото, което бихте казали на клиент по телефона: какво правите, къде и защо на вас може да се вярва.",
        },
        { type: "h2", text: "Какво не работи" },
        {
          type: "ul",
          items: [
            "Списък от 30 града в долния край на страницата, без съдържание за тях.",
            "Фалшиви отзиви. Google ги разпознава, а клиентите още по-бързо.",
            "Ключови думи, повторени по десет пъти. Пишете за хора.",
            "Няколко профила в Google за един и същи бизнес.",
          ],
        },
        {
          type: "tip",
          text: "Тест: потърсете в Google основната си услуга плюс града си, в анонимен прозорец. Ако ви няма на първата страница и в картата, сайтът ви не казва на Google къде сте. [Пишете ни](/#contact) и ще ви кажем какво точно липсва.",
        },
      ],
    },
    en: {
      slug: "local-seo-near-me",
      title: "Local SEO: how to show up on Google for “near me” searches",
      excerpt:
        "Most small business customers search for “service + town” or “near me”. What Google looks at to show exactly you, and the five things that decide the ranking.",
      imageAlt: "City buildings and a tower seen from below",
      body: [
        {
          type: "p",
          text: "“Car repair Leeds”, “dentist near me”, “washing machine repair Brighton”. That is how small business customers search, and that is how Google decides whom to show: on the map with the three listings and in the results below it. This is called local SEO, and unlike “big” SEO it is entirely achievable for one business with one website. Here is what Google looks at.",
        },
        { type: "h2", text: "What Google looks at in a local search" },
        {
          type: "ol",
          items: [
            "**Proximity.** How close you are to the person searching. You cannot change it, but you can cover nearby towns with text on your site.",
            "**Relevance.** Whether your category and texts say exactly what the person is looking for. “Services” is not a category. “Washing machine and dryer repair” is.",
            "**Trust.** Reviews, a complete profile, mentions of the business elsewhere with identical details, a working website.",
          ],
        },
        { type: "h2", text: "1. The Google Business Profile is half the job" },
        {
          type: "p",
          text: "Without a complete, verified profile in Google Maps you do not exist on the map, no matter how good the website is. Category, opening hours, photos, reviews with replies. We wrote [detailed instructions for restaurants](/blog/google-business-profile-for-restaurants), but the steps are the same for any business.",
        },
        { type: "h2", text: "2. Town and service in the text of the site" },
        {
          type: "p",
          text: "Google does not guess. If the word “Brighton” appears nowhere on the site, you will not rank for “Brighton”. The page title, the first sentence and the H1 heading must contain the service and the town: “Washing machine repair in Brighton”. If you cover several towns, each service and each town deserves its own short paragraph, and the most important combinations their own page.",
        },
        { type: "h2", text: "3. Identical details everywhere" },
        {
          type: "p",
          text: "Name, address and phone must be exactly the same on Google, on the website, on Facebook, on Instagram and in every directory. “5 Church Street” and “5 Church St.” are different addresses to Google, and differences reduce trust. Check the old directories you signed up to years ago as well.",
        },
        { type: "h2", text: "4. Reviews, constantly" },
        {
          type: "p",
          text: "Not 40 reviews at once and then nothing, but 2–3 a month, constantly. Google values freshness. Ask happy customers right after the job, while they are happy: with a link by SMS or a QR code. Reply to every review with a sentence or two, including the words you want to be found by: “Glad the washing machine repair went quickly”.",
        },
        { type: "h2", text: "5. A website Google can read" },
        {
          type: "p",
          text: "Fast on phones, with real text (not text inside images), with clear headings and with the address and phone on every page. Google has to understand what is on the page without guessing. Structured data for a local business (address, phone, opening hours in machine-readable form) helps further, and we add it to every website we build.",
        },
        {
          type: "quote",
          text: "Local SEO is not a trick. It is telling Google the same thing you would tell a customer on the phone: what you do, where, and why you can be trusted.",
        },
        { type: "h2", text: "What does not work" },
        {
          type: "ul",
          items: [
            "A list of 30 towns at the bottom of the page with no content about them.",
            "Fake reviews. Google recognises them, and customers even faster.",
            "Keywords repeated ten times. Write for people.",
            "Several Google profiles for the same business.",
          ],
        },
        {
          type: "tip",
          text: "Test: search Google for your main service plus your town, in a private window. If you are not on the first page and on the map, your website is not telling Google where you are. [Write to us](/#contact) and we will tell you exactly what is missing.",
        },
      ],
    },
    de: {
      slug: "lokales-seo-in-der-naehe",
      title: "Lokales SEO: wie Sie bei Google für „in der Nähe“-Suchen erscheinen",
      excerpt:
        "Die meisten Kunden kleiner Unternehmen suchen „Leistung + Stadt“ oder „in der Nähe“. Worauf Google achtet, um genau Sie zu zeigen, und die fünf Dinge, die über das Ranking entscheiden.",
      imageAlt: "Stadtgebäude und ein Turm von unten gesehen",
      body: [
        {
          type: "p",
          text: "„Autowerkstatt Stuttgart“, „Zahnarzt in der Nähe“, „Waschmaschinen-Reparatur Köln“. So suchen die Kunden kleiner Unternehmen, und so entscheidet Google, wen es zeigt: auf der Karte mit den drei Einträgen und in den Ergebnissen darunter. Das nennt man lokales SEO, und anders als das „große“ SEO ist es für ein Unternehmen mit einer Webseite völlig erreichbar. Darauf achtet Google.",
        },
        { type: "h2", text: "Worauf Google bei einer lokalen Suche achtet" },
        {
          type: "ol",
          items: [
            "**Nähe.** Wie nah Sie an der suchenden Person sind. Das können Sie nicht ändern, aber Sie können umliegende Städte mit Text auf der Seite abdecken.",
            "**Relevanz.** Ob Ihre Kategorie und Ihre Texte genau das sagen, was die Person sucht. „Dienstleistungen“ ist keine Kategorie. „Reparatur von Waschmaschinen und Trocknern“ schon.",
            "**Vertrauen.** Bewertungen, vollständiges Profil, Erwähnungen des Unternehmens an anderen Stellen mit identischen Daten, eine funktionierende Webseite.",
          ],
        },
        { type: "h2", text: "1. Das Google-Unternehmensprofil ist die halbe Arbeit" },
        {
          type: "p",
          text: "Ohne vollständiges, bestätigtes Profil in Google Maps existieren Sie auf der Karte nicht, egal wie gut die Webseite ist. Kategorie, Öffnungszeiten, Fotos, Bewertungen mit Antworten. Wir haben [eine ausführliche Anleitung für Restaurants](/blog/google-unternehmensprofil-fuer-restaurants) geschrieben, aber die Schritte sind für jedes Unternehmen dieselben.",
        },
        { type: "h2", text: "2. Stadt und Leistung im Text der Webseite" },
        {
          type: "p",
          text: "Google rät nicht. Wenn auf der Seite nirgends „Köln“ steht, erscheinen Sie nicht für „Köln“. Seitentitel, erster Satz und H1-Überschrift müssen Leistung und Stadt enthalten: „Waschmaschinen-Reparatur in Köln“. Wenn Sie mehrere Städte abdecken, verdient jede Leistung und jede Stadt einen eigenen kurzen Absatz, und die wichtigsten Kombinationen eine eigene Seite.",
        },
        { type: "h2", text: "3. Überall identische Daten" },
        {
          type: "p",
          text: "Name, Adresse und Telefon müssen bei Google, auf der Webseite, auf Facebook, auf Instagram und in jedem Verzeichnis exakt gleich sein. „Hauptstraße 5“ und „Hauptstr. 5“ sind für Google verschiedene Adressen, und Unterschiede senken das Vertrauen. Prüfen Sie auch die alten Verzeichnisse, in die Sie sich vor Jahren eingetragen haben.",
        },
        { type: "h2", text: "4. Bewertungen, kontinuierlich" },
        {
          type: "p",
          text: "Nicht 40 Bewertungen auf einmal und dann nichts mehr, sondern 2–3 pro Monat, kontinuierlich. Google schätzt Aktualität. Bitten Sie zufriedene Kunden direkt nach der Arbeit, solange sie zufrieden sind: mit einem Link per SMS oder einem QR-Code. Antworten Sie auf jede Bewertung mit ein bis zwei Sätzen, auch mit den Wörtern, unter denen Sie gefunden werden wollen: „Schön, dass die Waschmaschinen-Reparatur schnell ging“.",
        },
        { type: "h2", text: "5. Eine Webseite, die Google lesen kann" },
        {
          type: "p",
          text: "Schnell auf dem Handy, mit echtem Text (nicht Text in Bildern), mit klaren Überschriften und mit Adresse und Telefon auf jeder Seite. Google muss verstehen, was auf der Seite steht, ohne zu raten. Strukturierte Daten für ein lokales Unternehmen (Adresse, Telefon, Öffnungszeiten in maschinenlesbarer Form) helfen zusätzlich, und wir bauen sie in jede Webseite ein.",
        },
        {
          type: "quote",
          text: "Lokales SEO ist kein Trick. Es bedeutet, Google dasselbe zu sagen, was Sie einem Kunden am Telefon sagen würden: was Sie tun, wo, und warum man Ihnen vertrauen kann.",
        },
        { type: "h2", text: "Was nicht funktioniert" },
        {
          type: "ul",
          items: [
            "Eine Liste von 30 Städten am Seitenende ohne Inhalt dazu.",
            "Gefälschte Bewertungen. Google erkennt sie, Kunden noch schneller.",
            "Zehnmal wiederholte Schlüsselwörter. Schreiben Sie für Menschen.",
            "Mehrere Google-Profile für dasselbe Unternehmen.",
          ],
        },
        {
          type: "tip",
          text: "Test: Suchen Sie bei Google Ihre Hauptleistung plus Ihre Stadt, in einem privaten Fenster. Wenn Sie nicht auf der ersten Seite und auf der Karte sind, sagt Ihre Webseite Google nicht, wo Sie sind. [Schreiben Sie uns](/#contact), und wir sagen Ihnen genau, was fehlt.",
        },
      ],
    },
  },
};

export default post;
