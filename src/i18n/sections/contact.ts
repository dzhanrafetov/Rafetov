import type { Lang } from "../types";

/** Плочките в стъпка 1. Ключовете се четат и от `?service=` в адреса (напр. /?service=ai#contact). */
export type ServiceKey = "site" | "shop" | "platform" | "app" | "ai" | "ads" | "unsure";
export const SERVICE_KEYS: ServiceKey[] = ["site", "shop", "platform", "app", "ai", "ads", "unsure"];

export type CountryKey = "BG" | "DE" | "BE" | "other";
export const COUNTRY_KEYS: CountryKey[] = ["BG", "DE", "BE", "other"];

export type ReplyKey = "whatsapp" | "viber" | "call" | "email";
export const REPLY_KEYS: ReplyKey[] = ["whatsapp", "viber", "call", "email"];

export type ContactCopy = {
  chapter: string;
  h2: string;
  sub: string;
  /** Бадж над стъпките при ?intent=audit. */
  audit: string;
  auditSub: string;
  stepOf: string;
  steps: { need: string; business: string; reply: string };
  need: {
    title: string;
    hint: string;
    services: Record<ServiceKey, { label: string; hint: string }>;
    error: string;
  };
  business: {
    title: string;
    niche: string;
    nichePlaceholder: string;
    nicheChips: string[];
    where: string;
    countries: Record<CountryKey, string>;
    otherCountry: string;
    otherCountryPlaceholder: string;
    hasSite: string;
    hasSiteYes: string;
    hasSiteNo: string;
    siteUrl: string;
    siteUrlPlaceholder: string;
    siteUrlError: string;
    message: string;
    messagePlaceholder: string;
  };
  reply: {
    title: string;
    name: string;
    namePlaceholder: string;
    nameError: string;
    phone: string;
    phonePlaceholder: string;
    phoneError: string;
    channel: string;
    channels: Record<ReplyKey, string>;
    email: string;
    emailPlaceholder: string;
    emailError: string;
    emailOptional: string;
  };
  back: string;
  next: string;
  submit: string;
  sending: string;
  enterHint: string;
  success: {
    title: string;
    /** {channel} се заменя с избрания канал. */
    text: string;
    faster: string;
    whatsapp: string;
    again: string;
  };
  failed: { title: string; text: string; retry: string };
  direct: { title: string; whatsapp: string; or: string; call: string; email: string; viber: string };
  /** Текстът, с който се отваря WhatsApp от тази секция. */
  waPrefill: string;
  /** Етикети за обобщението в Telegram/имейла и в резервните линкове. */
  labels: { services: string; niche: string; countries: string; site: string; noSite: string; message: string; reply: string };
};

export const contactCopy: Record<Lang, ContactCopy> = {
  bg: {
    chapter: "Запитване",
    h2: "Разкажете ни за бизнеса си.",
    sub: "Три кратки стъпки. Отговаряме до 24 часа по канала, който изберете, с ясни следващи стъпки.",
    audit: "Безплатен видео анализ",
    auditSub: "Оставете адреса на сайта си. Ще запишем кратко видео с три конкретни неща за подобряване.",
    stepOf: "Стъпка {n} от {total}",
    steps: { need: "Какво ви трябва", business: "За бизнеса", reply: "Как да ви отговорим" },
    need: {
      title: "Какво ви трябва?",
      hint: "Може да изберете повече от едно.",
      services: {
        site: { label: "Уебсайт", hint: "представяне, услуги, контакт" },
        shop: { label: "Онлайн магазин", hint: "продукти, плащания, доставки" },
        platform: { label: "Платформа / система", hint: "портал, CRM, вътрешна система" },
        app: { label: "Мобилно приложение", hint: "iOS и Android" },
        ai: { label: "AI автоматизация", hint: "чатбот, запитвания, документи" },
        ads: { label: "Реклами и SEO", hint: "Google, Meta, локално търсене" },
        unsure: { label: "Не съм сигурен", hint: "ще ви предложим вариант" },
      },
      error: "Изберете поне една опция, за да продължите.",
    },
    business: {
      title: "За бизнеса",
      niche: "С какво се занимавате?",
      nichePlaceholder: "напр. покриви и хидроизолация",
      nicheChips: ["Строителство и ремонти", "Ресторант / кафе", "Търговия", "Услуги", "Производство", "Транспорт"],
      where: "Къде са клиентите ви?",
      countries: { BG: "България", DE: "Германия", BE: "Белгия", other: "Друга държава" },
      otherCountry: "Коя държава?",
      otherCountryPlaceholder: "напр. Австрия",
      hasSite: "Имате ли сайт в момента?",
      hasSiteYes: "Да, имам",
      hasSiteNo: "Не, нямам",
      siteUrl: "Адрес на сайта",
      siteUrlPlaceholder: "https://вашиятсайт.com",
      siteUrlError: "Въведете адреса на сайта, напр. https://example.com.",
      message: "Нещо друго, което да знаем? (по желание)",
      messagePlaceholder: "Например: имаме 30 продукта и искаме плащане с карта.",
    },
    reply: {
      title: "Как да ви отговорим?",
      name: "Име",
      namePlaceholder: "Вашето име",
      nameError: "Напишете името си, за да знаем към кого да се обърнем.",
      phone: "Телефон",
      phonePlaceholder: "+359 / +49 / +32 …",
      phoneError: "Телефонът трябва да е с цифри и код на държавата, напр. +49 170 1234567.",
      channel: "Къде да ви пишем?",
      channels: { whatsapp: "WhatsApp", viber: "Viber", call: "Обаждане", email: "Имейл" },
      email: "Имейл",
      emailPlaceholder: "name@gmail.com",
      emailError: "Въведете валиден имейл, напр. name@gmail.com.",
      emailOptional: "Телефон (по желание)",
    },
    back: "Назад",
    next: "Напред",
    submit: "Изпратете запитването",
    sending: "Изпращане…",
    enterHint: "Enter продължава напред",
    success: {
      title: "Получихме запитването.",
      text: "Ще ви отговорим до 24 часа през {channel} с въпроси или с конкретно предложение.",
      faster: "По-бързо?",
      whatsapp: "Пишете ни в WhatsApp",
      again: "Ново запитване",
    },
    failed: {
      title: "Изпращането не успя.",
      text: "Въведеното е запазено. Опитайте пак или ни го пратете директно:",
      retry: "Опитайте пак",
    },
    direct: {
      title: "Предпочитате да пишете направо?",
      whatsapp: "Пишете ни в WhatsApp",
      or: "или",
      call: "обадете се",
      email: "имейл",
      viber: "Viber",
    },
    waPrefill: "Здравейте, пиша от rafetov.com. Интересувам се от: ",
    labels: { services: "Услуги", niche: "Бизнес", countries: "Клиенти в", site: "Сайт сега", noSite: "няма", message: "Съобщение", reply: "Да отговорим" },
  },
  en: {
    chapter: "Inquiry",
    h2: "Tell us about your business.",
    sub: "Three short steps. We reply within 24 hours on the channel you choose, with clear next steps.",
    audit: "Free video review",
    auditSub: "Leave your website address. We will record a short video with three specific things to improve.",
    stepOf: "Step {n} of {total}",
    steps: { need: "What you need", business: "Your business", reply: "How to reach you" },
    need: {
      title: "What do you need?",
      hint: "You can pick more than one.",
      services: {
        site: { label: "Website", hint: "presentation, services, contact" },
        shop: { label: "Online shop", hint: "products, payments, delivery" },
        platform: { label: "Platform / system", hint: "portal, CRM, internal tool" },
        app: { label: "Mobile app", hint: "iOS and Android" },
        ai: { label: "AI automation", hint: "chatbot, inquiries, documents" },
        ads: { label: "Ads and SEO", hint: "Google, Meta, local search" },
        unsure: { label: "Not sure yet", hint: "we will suggest an option" },
      },
      error: "Pick at least one option to continue.",
    },
    business: {
      title: "Your business",
      niche: "What do you do?",
      nichePlaceholder: "e.g. roofing and waterproofing",
      nicheChips: ["Construction and renovation", "Restaurant / café", "Retail", "Services", "Manufacturing", "Transport"],
      where: "Where are your clients?",
      countries: { BG: "Bulgaria", DE: "Germany", BE: "Belgium", other: "Another country" },
      otherCountry: "Which country?",
      otherCountryPlaceholder: "e.g. Austria",
      hasSite: "Do you have a website now?",
      hasSiteYes: "Yes, I do",
      hasSiteNo: "No, not yet",
      siteUrl: "Website address",
      siteUrlPlaceholder: "https://yoursite.com",
      siteUrlError: "Enter the website address, e.g. https://example.com.",
      message: "Anything else we should know? (optional)",
      messagePlaceholder: "For example: we have 30 products and want card payments.",
    },
    reply: {
      title: "How should we reply?",
      name: "Name",
      namePlaceholder: "Your name",
      nameError: "Enter your name so we know who to address.",
      phone: "Phone",
      phonePlaceholder: "+44 / +49 / +32 …",
      phoneError: "The phone needs digits and a country code, e.g. +44 7700 900123.",
      channel: "Where should we write?",
      channels: { whatsapp: "WhatsApp", viber: "Viber", call: "Phone call", email: "Email" },
      email: "Email",
      emailPlaceholder: "name@gmail.com",
      emailError: "Enter a valid email, e.g. name@gmail.com.",
      emailOptional: "Phone (optional)",
    },
    back: "Back",
    next: "Next",
    submit: "Send the inquiry",
    sending: "Sending…",
    enterHint: "Enter moves forward",
    success: {
      title: "We received your inquiry.",
      text: "We will reply within 24 hours via {channel} with questions or a concrete proposal.",
      faster: "Faster?",
      whatsapp: "Write to us on WhatsApp",
      again: "New inquiry",
    },
    failed: {
      title: "Sending failed.",
      text: "Your answers are kept. Try again or send them to us directly:",
      retry: "Try again",
    },
    direct: {
      title: "Prefer to write directly?",
      whatsapp: "Write to us on WhatsApp",
      or: "or",
      call: "call us",
      email: "email",
      viber: "Viber",
    },
    waPrefill: "Hello, I am writing from rafetov.com. I am interested in: ",
    labels: { services: "Services", niche: "Business", countries: "Clients in", site: "Current site", noSite: "none", message: "Message", reply: "Reply via" },
  },
  de: {
    chapter: "Anfrage",
    h2: "Erzählen Sie uns von Ihrem Unternehmen.",
    sub: "Drei kurze Schritte. Wir antworten innerhalb von 24 Stunden über den Kanal Ihrer Wahl, mit klaren nächsten Schritten.",
    audit: "Kostenlose Videoanalyse",
    auditSub: "Hinterlassen Sie die Adresse Ihrer Website. Wir nehmen ein kurzes Video mit drei konkreten Verbesserungen auf.",
    stepOf: "Schritt {n} von {total}",
    steps: { need: "Was Sie brauchen", business: "Ihr Unternehmen", reply: "Wie wir antworten" },
    need: {
      title: "Was brauchen Sie?",
      hint: "Sie können mehrere auswählen.",
      services: {
        site: { label: "Website", hint: "Vorstellung, Leistungen, Kontakt" },
        shop: { label: "Online-Shop", hint: "Produkte, Zahlungen, Versand" },
        platform: { label: "Plattform / System", hint: "Portal, CRM, internes Tool" },
        app: { label: "Mobile App", hint: "iOS und Android" },
        ai: { label: "KI-Automatisierung", hint: "Chatbot, Anfragen, Dokumente" },
        ads: { label: "Werbung und SEO", hint: "Google, Meta, lokale Suche" },
        unsure: { label: "Noch unsicher", hint: "wir schlagen etwas vor" },
      },
      error: "Wählen Sie mindestens eine Option, um fortzufahren.",
    },
    business: {
      title: "Ihr Unternehmen",
      niche: "Was machen Sie?",
      nichePlaceholder: "z. B. Dach und Abdichtung",
      nicheChips: ["Bau und Renovierung", "Restaurant / Café", "Handel", "Dienstleistungen", "Produktion", "Transport"],
      where: "Wo sind Ihre Kunden?",
      countries: { BG: "Bulgarien", DE: "Deutschland", BE: "Belgien", other: "Anderes Land" },
      otherCountry: "Welches Land?",
      otherCountryPlaceholder: "z. B. Österreich",
      hasSite: "Haben Sie derzeit eine Website?",
      hasSiteYes: "Ja, habe ich",
      hasSiteNo: "Nein, noch nicht",
      siteUrl: "Website-Adresse",
      siteUrlPlaceholder: "https://ihre-seite.de",
      siteUrlError: "Geben Sie die Website-Adresse ein, z. B. https://example.com.",
      message: "Noch etwas, das wir wissen sollten? (optional)",
      messagePlaceholder: "Zum Beispiel: Wir haben 30 Produkte und möchten Kartenzahlung.",
    },
    reply: {
      title: "Wie sollen wir antworten?",
      name: "Name",
      namePlaceholder: "Ihr Name",
      nameError: "Geben Sie Ihren Namen ein, damit wir wissen, an wen wir uns wenden.",
      phone: "Telefon",
      phonePlaceholder: "+49 / +43 / +41 …",
      phoneError: "Die Telefonnummer braucht Ziffern und eine Ländervorwahl, z. B. +49 170 1234567.",
      channel: "Wo sollen wir schreiben?",
      channels: { whatsapp: "WhatsApp", viber: "Viber", call: "Anruf", email: "E-Mail" },
      email: "E-Mail",
      emailPlaceholder: "name@gmail.com",
      emailError: "Geben Sie eine gültige E-Mail ein, z. B. name@gmail.com.",
      emailOptional: "Telefon (optional)",
    },
    back: "Zurück",
    next: "Weiter",
    submit: "Anfrage senden",
    sending: "Wird gesendet…",
    enterHint: "Enter geht weiter",
    success: {
      title: "Wir haben Ihre Anfrage erhalten.",
      text: "Wir antworten innerhalb von 24 Stunden per {channel} mit Rückfragen oder einem konkreten Vorschlag.",
      faster: "Schneller?",
      whatsapp: "Schreiben Sie uns auf WhatsApp",
      again: "Neue Anfrage",
    },
    failed: {
      title: "Senden fehlgeschlagen.",
      text: "Ihre Angaben bleiben erhalten. Versuchen Sie es erneut oder senden Sie sie uns direkt:",
      retry: "Erneut versuchen",
    },
    direct: {
      title: "Lieber direkt schreiben?",
      whatsapp: "Schreiben Sie uns auf WhatsApp",
      or: "oder",
      call: "anrufen",
      email: "E-Mail",
      viber: "Viber",
    },
    waPrefill: "Hallo, ich schreibe von rafetov.com. Ich interessiere mich für: ",
    labels: { services: "Leistungen", niche: "Unternehmen", countries: "Kunden in", site: "Aktuelle Website", noSite: "keine", message: "Nachricht", reply: "Antwort per" },
  },
  nl: {
    chapter: "Aanvraag",
    h2: "Vertel ons over uw bedrijf.",
    sub: "Drie korte stappen. We antwoorden binnen 24 uur via het kanaal dat u kiest, met duidelijke volgende stappen.",
    audit: "Gratis videoanalyse",
    auditSub: "Laat het adres van uw website achter. We nemen een korte video op met drie concrete verbeterpunten.",
    stepOf: "Stap {n} van {total}",
    steps: { need: "Wat u nodig heeft", business: "Uw bedrijf", reply: "Hoe we antwoorden" },
    need: {
      title: "Wat heeft u nodig?",
      hint: "U kunt meerdere kiezen.",
      services: {
        site: { label: "Website", hint: "voorstelling, diensten, contact" },
        shop: { label: "Webshop", hint: "producten, betalingen, levering" },
        platform: { label: "Platform / systeem", hint: "portaal, CRM, interne tool" },
        app: { label: "Mobiele app", hint: "iOS en Android" },
        ai: { label: "AI-automatisering", hint: "chatbot, aanvragen, documenten" },
        ads: { label: "Advertenties en SEO", hint: "Google, Meta, lokaal zoeken" },
        unsure: { label: "Nog niet zeker", hint: "we stellen iets voor" },
      },
      error: "Kies minstens één optie om verder te gaan.",
    },
    business: {
      title: "Uw bedrijf",
      niche: "Wat doet u?",
      nichePlaceholder: "bv. dakwerken en waterdichting",
      nicheChips: ["Bouw en renovatie", "Restaurant / café", "Handel", "Diensten", "Productie", "Transport"],
      where: "Waar zijn uw klanten?",
      countries: { BG: "Bulgarije", DE: "Duitsland", BE: "België", other: "Ander land" },
      otherCountry: "Welk land?",
      otherCountryPlaceholder: "bv. Nederland",
      hasSite: "Heeft u nu een website?",
      hasSiteYes: "Ja",
      hasSiteNo: "Nee, nog niet",
      siteUrl: "Websiteadres",
      siteUrlPlaceholder: "https://uwsite.be",
      siteUrlError: "Vul het websiteadres in, bv. https://example.com.",
      message: "Nog iets dat we moeten weten? (optioneel)",
      messagePlaceholder: "Bijvoorbeeld: we hebben 30 producten en willen kaartbetaling.",
    },
    reply: {
      title: "Hoe zullen we antwoorden?",
      name: "Naam",
      namePlaceholder: "Uw naam",
      nameError: "Vul uw naam in zodat we weten tot wie we ons richten.",
      phone: "Telefoon",
      phonePlaceholder: "+32 / +31 / +49 …",
      phoneError: "Het nummer heeft cijfers en een landcode nodig, bv. +32 470 12 34 56.",
      channel: "Waar zullen we schrijven?",
      channels: { whatsapp: "WhatsApp", viber: "Viber", call: "Telefoon", email: "E-mail" },
      email: "E-mail",
      emailPlaceholder: "naam@gmail.com",
      emailError: "Vul een geldig e-mailadres in, bv. naam@gmail.com.",
      emailOptional: "Telefoon (optioneel)",
    },
    back: "Terug",
    next: "Volgende",
    submit: "Aanvraag versturen",
    sending: "Versturen…",
    enterHint: "Enter gaat verder",
    success: {
      title: "We hebben uw aanvraag ontvangen.",
      text: "We antwoorden binnen 24 uur via {channel} met vragen of een concreet voorstel.",
      faster: "Sneller?",
      whatsapp: "Schrijf ons op WhatsApp",
      again: "Nieuwe aanvraag",
    },
    failed: {
      title: "Versturen mislukt.",
      text: "Uw antwoorden zijn bewaard. Probeer opnieuw of stuur ze ons rechtstreeks:",
      retry: "Opnieuw proberen",
    },
    direct: {
      title: "Liever rechtstreeks schrijven?",
      whatsapp: "Schrijf ons op WhatsApp",
      or: "of",
      call: "bel ons",
      email: "e-mail",
      viber: "Viber",
    },
    waPrefill: "Hallo, ik schrijf via rafetov.com. Ik ben geïnteresseerd in: ",
    labels: { services: "Diensten", niche: "Bedrijf", countries: "Klanten in", site: "Huidige website", noSite: "geen", message: "Bericht", reply: "Antwoord via" },
  },
};
