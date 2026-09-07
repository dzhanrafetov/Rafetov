import type { Post } from "../types";

const post: Post = {
  id: "kolko-vreme",
  date: "2026-07-14",
  tag: "site",
  image: "/blog/kolko-vreme.webp",
  imageSmall: "/blog/kolko-vreme-800.webp",
  imageCredit: "Unsplash",
  content: {
    bg: {
      slug: "kolko-vreme-otnema-izrabotka-na-sait",
      title: "Колко време отнема изработка на сайт и къде реално се губи времето",
      excerpt:
        "Сайт за 1–3 седмици, магазин за 2–4. Но половината проекти закъсняват, и почти никога заради програмирането. Ето реалния график и трите неща, които го бавят.",
      imageAlt: "Лаптоп, отворена тетрадка с бележки и телефон на дървено бюро",
      body: [
        {
          type: "p",
          text: "„За колко време ще е готов?“ е вторият въпрос след цената. Честният отговор: сайт-визитка за 1–3 седмици, по-голям сайт за 3–5, онлайн магазин за 2–4 седмици. Но това са срокове при готови материали. В практиката повечето закъснения идват не от нас, а от чакане на текстове, снимки и решения. Ето как изглежда процесът и какво го ускорява.",
        },
        { type: "h2", text: "Реалният график, стъпка по стъпка" },
        {
          type: "ol",
          items: [
            "**Разговор и оферта: 1–2 дни.** 15 минути разговор, после получавате план и фиксирана цена до 24 часа.",
            "**Материали: 2–10 дни.** Тук е най-голямата променлива. Лого, снимки, текстове или поне бележки за тях, списък с услуги и цени.",
            "**Дизайн и структура: 3–5 дни.** Показваме ви първата версия на реален адрес, на телефон и компютър.",
            "**Корекции: 2–4 дни.** Обикновено един или два кръга. Колкото по-ясна е обратната връзка, толкова по-кратки са.",
            "**Настройки и пускане: 1–2 дни.** Домейн, Google, форма, скорост, обучение как сами да променяте съдържанието.",
          ],
        },
        { type: "h2", text: "Къде се губи времето" },
        {
          type: "p",
          text: "**Снимките.** „Ще ги пратя утре“ се превръща в три седмици. Ако нямате снимки, решете това в началото: фотограф за половин ден, снимки с телефон при добра светлина, или стокови, докато дойдат истинските. **Текстовете.** Не чакайте да напишете перфектния текст. Разкажете ни за бизнеса си по телефона, ние го подреждаме. **Решенията.** Три човека с три мнения за цвета на бутона. Определете един човек, който казва „да“.",
        },
        {
          type: "quote",
          text: "Сайт за две седмици е реалистично. Сайт за две седмици, в които вие сте заети, не е. Времето зависи повече от вас, отколкото от нас, и това е добра новина: контролирате го.",
        },
        { type: "h2", text: "Какво може да ускори всичко" },
        {
          type: "ul",
          items: [
            "Пратете всички материали наведнъж, в една папка, дори да не са идеални.",
            "Отговаряйте на въпроси в рамките на деня. Всеки ден чакане е ден закъснение.",
            "Гледайте първата версия на телефон, не само на компютър. Там ще я гледат клиентите ви.",
            "Давайте конкретна обратна връзка: „заглавието да е по-кратко“ вместо „не ми харесва“.",
          ],
        },
        { type: "h2", text: "Кога „бързо“ трябва да ви притесни" },
        {
          type: "p",
          text: "Обещание за сайт „до 48 часа“ обикновено означава шаблон с вашето лого. Може да е достатъчно за някои случаи, но питайте какво точно ще получите. Обратното също важи: три месеца за сайт-визитка не са „задълбочена работа“, а лоша организация. Повече за въпросите, които да зададете, в [как да изберете фирма за сайт](/blog/kak-da-izberete-firma-za-sait).",
        },
        { type: "h2", text: "След пускането" },
        {
          type: "p",
          text: "Сайтът не е готов в деня на пускането, а месец след това, когато има първите данни: кой идва, откъде, какво гледа и къде спира. Тогава правим малки корекции, които често удвояват запитванията. Затова оставаме на линия и след старта.",
        },
        {
          type: "tip",
          text: "Ако имате лого, 10 снимки и знаете какво предлагате, можем да започнем утре и да пуснем сайта до две седмици. [Пишете ни](/#contact) и ще получите точен график с офертата.",
        },
      ],
    },
    en: {
      slug: "how-long-does-it-take-to-build-a-website",
      title: "How long does it take to build a website, and where the time really goes",
      excerpt:
        "A website in 1–3 weeks, a store in 2–4. Yet half of all projects run late, and almost never because of the coding. The real timeline and the three things that slow it down.",
      imageAlt: "Laptop, an open notebook with notes and a phone on a wooden desk",
      body: [
        {
          type: "p",
          text: "“How long until it is ready?” is the second question after the price. The honest answer: a business card website in 1–3 weeks, a larger site in 3–5, an online store in 2–4 weeks. But those are timelines with materials ready. In practice most delays come not from us but from waiting for texts, photos and decisions. Here is what the process looks like and what speeds it up.",
        },
        { type: "h2", text: "The real timeline, step by step" },
        {
          type: "ol",
          items: [
            "**Call and quote: 1–2 days.** A 15-minute call, then you receive a plan and a fixed price within 24 hours.",
            "**Materials: 2–10 days.** This is the biggest variable. Logo, photos, texts or at least notes for them, a list of services and prices.",
            "**Design and structure: 3–5 days.** We show you the first version at a real address, on phone and desktop.",
            "**Revisions: 2–4 days.** Usually one or two rounds. The clearer the feedback, the shorter they are.",
            "**Setup and launch: 1–2 days.** Domain, Google, form, speed, training on how to change the content yourself.",
          ],
        },
        { type: "h2", text: "Where the time goes" },
        {
          type: "p",
          text: "**Photos.** “I'll send them tomorrow” turns into three weeks. If you have no photos, solve it at the start: a photographer for half a day, phone photos in good light, or stock images until the real ones arrive. **Texts.** Do not wait to write the perfect text. Tell us about your business on the phone, we organise it. **Decisions.** Three people with three opinions about the colour of the button. Appoint one person who says “yes”.",
        },
        {
          type: "quote",
          text: "A website in two weeks is realistic. A website in two weeks during which you are busy is not. The timeline depends more on you than on us, and that is good news: you control it.",
        },
        { type: "h2", text: "What speeds everything up" },
        {
          type: "ul",
          items: [
            "Send all materials at once, in one folder, even if they are not perfect.",
            "Answer questions within the day. Every day of waiting is a day of delay.",
            "Look at the first version on a phone, not just on a computer. That is where your customers will see it.",
            "Give concrete feedback: “make the heading shorter” instead of “I don't like it”.",
          ],
        },
        { type: "h2", text: "When “fast” should worry you" },
        {
          type: "p",
          text: "A promise of a website “within 48 hours” usually means a template with your logo. It may be enough in some cases, but ask exactly what you will get. The opposite also holds: three months for a business card website is not “thorough work”, it is poor organisation. More on the questions to ask in [how to choose a web agency](/blog/how-to-choose-a-web-agency).",
        },
        { type: "h2", text: "After launch" },
        {
          type: "p",
          text: "A website is not finished on launch day but a month later, when the first data comes in: who visits, from where, what they look at and where they stop. That is when we make small adjustments that often double the enquiries. That is why we stay available after the start.",
        },
        {
          type: "tip",
          text: "If you have a logo, 10 photos and know what you offer, we can start tomorrow and launch within two weeks. [Write to us](/#contact) and you will receive an exact schedule with the quote.",
        },
      ],
    },
    de: {
      slug: "wie-lange-dauert-eine-webseite",
      title: "Wie lange dauert die Erstellung einer Webseite, und wo die Zeit wirklich verloren geht",
      excerpt:
        "Eine Webseite in 1–3 Wochen, ein Shop in 2–4. Trotzdem verzögert sich die Hälfte aller Projekte, und fast nie wegen der Programmierung. Der echte Zeitplan und die drei Dinge, die ihn bremsen.",
      imageAlt: "Laptop, aufgeschlagenes Notizbuch mit Notizen und ein Handy auf einem Holzschreibtisch",
      body: [
        {
          type: "p",
          text: "„Wie lange dauert es, bis sie fertig ist?“ ist die zweite Frage nach dem Preis. Die ehrliche Antwort: eine Visitenkarten-Webseite in 1–3 Wochen, eine größere Seite in 3–5, ein Onlineshop in 2–4 Wochen. Das sind aber Zeiträume bei fertigen Materialien. In der Praxis kommen die meisten Verzögerungen nicht von uns, sondern vom Warten auf Texte, Fotos und Entscheidungen. So sieht der Ablauf aus und das beschleunigt ihn.",
        },
        { type: "h2", text: "Der echte Zeitplan, Schritt für Schritt" },
        {
          type: "ol",
          items: [
            "**Gespräch und Angebot: 1–2 Tage.** 15 Minuten Gespräch, dann erhalten Sie innerhalb von 24 Stunden einen Plan und einen Festpreis.",
            "**Materialien: 2–10 Tage.** Das ist die größte Variable. Logo, Fotos, Texte oder zumindest Notizen dazu, Liste der Leistungen und Preise.",
            "**Design und Struktur: 3–5 Tage.** Wir zeigen Ihnen die erste Version unter einer echten Adresse, auf Handy und Computer.",
            "**Korrekturen: 2–4 Tage.** Meist ein bis zwei Runden. Je klarer die Rückmeldung, desto kürzer.",
            "**Einrichtung und Start: 1–2 Tage.** Domain, Google, Formular, Geschwindigkeit, Einweisung, wie Sie Inhalte selbst ändern.",
          ],
        },
        { type: "h2", text: "Wo die Zeit verloren geht" },
        {
          type: "p",
          text: "**Fotos.** „Ich schicke sie morgen“ wird zu drei Wochen. Wenn Sie keine Fotos haben, lösen Sie das am Anfang: ein Fotograf für einen halben Tag, Handyfotos bei gutem Licht, oder Stockbilder, bis die echten kommen. **Texte.** Warten Sie nicht darauf, den perfekten Text zu schreiben. Erzählen Sie uns am Telefon von Ihrem Geschäft, wir ordnen es. **Entscheidungen.** Drei Personen mit drei Meinungen zur Farbe des Buttons. Bestimmen Sie eine Person, die „ja“ sagt.",
        },
        {
          type: "quote",
          text: "Eine Webseite in zwei Wochen ist realistisch. Eine Webseite in zwei Wochen, in denen Sie keine Zeit haben, nicht. Der Zeitplan hängt mehr von Ihnen ab als von uns, und das ist eine gute Nachricht: Sie steuern ihn.",
        },
        { type: "h2", text: "Was alles beschleunigt" },
        {
          type: "ul",
          items: [
            "Schicken Sie alle Materialien auf einmal, in einem Ordner, auch wenn sie nicht perfekt sind.",
            "Beantworten Sie Fragen innerhalb des Tages. Jeder Tag Warten ist ein Tag Verzögerung.",
            "Schauen Sie sich die erste Version auf dem Handy an, nicht nur am Computer. Dort werden Ihre Kunden sie sehen.",
            "Geben Sie konkrete Rückmeldungen: „die Überschrift kürzer“ statt „gefällt mir nicht“.",
          ],
        },
        { type: "h2", text: "Wann „schnell“ Sie stutzig machen sollte" },
        {
          type: "p",
          text: "Das Versprechen einer Webseite „innerhalb von 48 Stunden“ bedeutet meist eine Vorlage mit Ihrem Logo. Das kann in manchen Fällen reichen, aber fragen Sie genau, was Sie bekommen. Das Gegenteil gilt auch: Drei Monate für eine Visitenkarten-Webseite sind keine „gründliche Arbeit“, sondern schlechte Organisation. Mehr zu den Fragen, die Sie stellen sollten, in [wie Sie eine Webagentur auswählen](/blog/wie-sie-eine-webagentur-auswaehlen).",
        },
        { type: "h2", text: "Nach dem Start" },
        {
          type: "p",
          text: "Eine Webseite ist nicht am Tag des Starts fertig, sondern einen Monat später, wenn die ersten Daten da sind: wer kommt, woher, was er ansieht und wo er abbricht. Dann machen wir kleine Anpassungen, die die Anfragen oft verdoppeln. Deshalb bleiben wir auch nach dem Start erreichbar.",
        },
        {
          type: "tip",
          text: "Wenn Sie ein Logo, 10 Fotos und eine klare Vorstellung Ihres Angebots haben, können wir morgen anfangen und innerhalb von zwei Wochen live gehen. [Schreiben Sie uns](/#contact), und Sie erhalten mit dem Angebot einen genauen Zeitplan.",
        },
      ],
    },
  },
};

export default post;
