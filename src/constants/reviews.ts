import type { ReviewLang, ReviewTag } from "../i18n/types";

export type Review = {
  name: string;
  /** Фирма или проект — само ако клиентът сам го е посочил. */
  company?: string;
  /** Езикът, на който клиентът е написал отзива. */
  lang: ReviewLang;
  text: string;
  /** Дословен откъс от `text`, който се удебелява — аргументът, заради който отзивът продава. */
  highlight?: string;
  tag?: ReviewTag;
};

/**
 * Дословно от Google Business профила, на оригиналния език (всички са 5/5), подредени по сила на аргумента:
 * отгоре са тези, които отговарят на най-честите страхове на клиента —
 * „ще изчезне ли след старта“, „ще ми отнеме ли време“, „ще стане ли както го искам“.
 * На десктоп се виждат първите INITIAL, останалите се разгъват с бутон; на телефон всички са в една лента в същия ред.
 */
export const REVIEWS: Review[] = [
  {
    name: "behlul kamber",
    lang: "bg",
    tag: "repeat",
    highlight: "това е вторият уебсайт, който създава за мен",
    text: "Искам изрично да кажа, че това е вторият уебсайт, който създава за мен, и до момента съм изключително доволен от неговата работа. Рафетов винаги е на разположение и се грижи много внимателно за нашия уебсайт за прозорци и строителни елементи.\n\nОсвен това той е много любезен, коректен и работи професионално с клиентите си.\n\nБлагодаря ти многo за страхотната работа и за твоите услуги! Определено те препоръчвам на всеки!",
  },
  {
    name: "Simeon Hristov",
    lang: "en",
    highlight: "the process was professional, smooth, and well organised",
    text: "I had a great experience working with Rafetov on the development of my website. From start to finish, the process was professional, smooth, and well organised.\n\nThey took the time to understand what I wanted and turned my ideas into a professional, modern, and user friendly website. Communication was excellent throughout, and they were always responsive to my questions and requests.\n\nI’m very happy with the final result and would definitely recommend their services to anyone looking for someone reliable and professional to build their website.",
  },
  {
    name: "Alpha Reiniging",
    lang: "nl",
    highlight: "De website ziet er modern, professioneel en overzichtelijk uit",
    text: "Zeer tevreden over de website die Dzhan van Rafetov voor ons bedrijf Alpha Reiniging heeft gemaakt! Vanaf het begin heeft hij goed geluisterd naar onze wensen en alles zeer professioneel uitgewerkt.\n\nDe website ziet er modern, professioneel en overzichtelijk uit en past perfect bij ons bedrijf. Ook de mogelijkheid voor klanten om gemakkelijk een offerte aan te vragen is zeer goed uitgewerkt. Alles werkt vlot en ziet er verzorgd uit.\n\nDzhan heeft echt goed werk geleverd en veel aandacht besteed aan de details. We zijn zeer tevreden met het eindresultaat en de samenwerking.\n\nGoed zo Dzhan, doe zo voort! Zeker een aanrader voor iedereen die een professionele website wil laten maken. 💪🏼",
  },
  {
    name: "Aptula Cholak",
    lang: "de",
    highlight: "Die Zusammenarbeit war angenehm, zuverlässig und professionell",
    text: "Ich brauchte für meine Firma eine professionelle Internetseite und bin dabei auf Herrn Rafetov aufmerksam geworden. Nachdem wir uns kennengelernt hatten, habe ich mir einige seiner bisherigen Arbeiten angesehen und war direkt überzeugt.\n\nDeshalb habe ich mich entschieden, meine Firmenwebsite von ihm erstellen zu lassen – und mit dem Ergebnis bin ich sehr zufrieden. Die Zusammenarbeit war angenehm, zuverlässig und professionell.\n\nIch kann Herrn Rafetov mit gutem Gewissen weiterempfehlen. Vielen Dank für die tolle Arbeit!",
  },
  {
    name: "Osman Toko",
    lang: "nl",
    tag: "rescue",
    highlight: "sinds hij erbij is, loopt alles perfect",
    text: "Voordat ik Rafetov leerde kennen, had ik altijd problemen met mijn website. Maar sinds hij erbij is, loopt alles perfect. Hij doet zijn werk echt heel goed, is super respectvol en denkt echt met je mee. Hij heeft mijn hele website vanaf nul opgebouwd, precies zoals ik het wilde. Ik ben super tevreden en zou hem echt aan iedereen aanraden. Heel erg bedankt!",
  },
  {
    name: "Nurbin Nuridin",
    company: "Mery Gebäudedienste-Nuridin",
    lang: "de",
    highlight: "schnell, professionell und genau nach unseren Wünschen umgesetzt",
    text: "Top Service! Die Website für unsere Dienstleistung wurde schnell, professionell und genau nach unseren Wünschen umgesetzt. Super Kommunikation und tolles Design - absolut empfehlenswert! Wir freuen uns auf die weitere Zusammenarbeit.",
  },
  {
    name: "Богомил Ивайлов",
    lang: "bg",
    tag: "hands",
    highlight: "като свърши почти всичко сам и с минимална помощ от моя страна",
    text: "Изключително съм доволен от работата! Изработи професионален уебсайт за моя бизнес с метали, като свърши почти всичко сам и с минимална помощ от моя страна. Всичко беше направено бързо, качествено и точно както трябва. Крайният резултат е супер! Препоръчвам с две ръце!",
  },
  {
    name: "Sevilay Kamber",
    lang: "de",
    tag: "twoSites",
    highlight: "Er hat für uns zwei Webseiten erstellt",
    text: "Wir sind mit der Arbeit von Rafetov sehr zufrieden! Er hat für uns zwei Webseiten erstellt und alles professionell und zuverlässig umgesetzt. Bei Fragen war er jederzeit erreichbar und hat schnell geantwortet. Wir bedanken uns für die tolle Zusammenarbeit und empfehlen ihn gerne weiter!",
  },
  {
    name: "Nesrin Shyukri",
    lang: "bg",
    highlight: "Подходи с огромна отговорност и внимание към всичко",
    text: "Изключително съм доволна от отношението и професионализма на Джан! Подходи с огромна отговорност и внимание към всичко, което направи за нас, за нашия център и за нашия сайт.\n\nКоректен, отзивчив и изключително ангажиран във всеки детайл от работата. За мен беше истинско удоволствие да работим заедно и го препоръчвам с две ръце на всеки, който търси надежден човек за изработка на сайт и всичко свързано с неговото развитие и поддръжка!\n\nБлагодаря ти, Джан, за страхотната работа и отношението! ❤️",
  },
  {
    name: "Plamen Chalakov",
    company: "azteca-premium.com",
    lang: "bg",
    highlight: "Комуникацията беше лесна и коректна",
    text: "Много съм доволен от съвместната работа с Rafetov.com по изработката на сайта azteca-premium.com. Комуникацията беше лесна и коректна, а всичко беше изпълнено професионално и според изискванията ми. Препоръчвам!",
  },
  {
    name: "Ersin Metesoy",
    lang: "tr",
    highlight: "hayal ettiğimden daha iyi bir site ortaya çıkarttı",
    text: "Benim tarif ettiğimden ve hayal ettiğimden daha iyi bir site ortaya çıkarttı.Kendi vizyonuyla siteye daha fonksiyonel şeyler ekledi.Sonrasında ise her zaman destek oldu ve problemlerle ilgilendi.İşini severek ve hakkını fazlasıyla vererek yapıyor. 🙌",
  },
  {
    name: "Миглена Иванова",
    lang: "bg",
    highlight: "точно както си го представях",
    text: "Изключително съм доволна от работата му! Направи ми страхотен, модерен и професионален уебсайт, точно както си го представях. Работи бързо, коректно и с голямо внимание към детайлите. Препоръчвам го на всеки, който има нужда от качествен уебсайт и професионално отношение. Доверете му се и вие — няма да съжалявате! ⭐⭐⭐⭐⭐",
  },
  {
    name: "Дани Юзиров",
    lang: "bg",
    tag: "deadline",
    highlight: "Беше спазен срок макар и доста кратък",
    text: "Изключително съм доволен от работата. Беше спазен срок макар и доста кратък си пролича професионализма и уменията. Препоръчвам с две ръце!",
  },
  {
    name: "Abibe Izetova",
    company: "Abi Studio",
    lang: "bg",
    highlight: "елегантен, модерен и напълно отразява визията и характера на студиото",
    text: "Уебсайтът на Abi Studio беше създаден с много стил, усет към детайла и внимание към всяко мое изискване. Крайният резултат е елегантен, модерен и напълно отразява визията и характера на студиото.\nБлагодаря за прекрасния резултат, препоръчвам с две ръце!",
  },
  {
    name: "Taxi Alper",
    lang: "es",
    highlight: "sin duda volveré a trabajar con el",
    text: "Trato con cliente y trabajos realizados de un profesional sin duda volveré a trabajar con el muchas gracias🔝🔝🔝👍🏽👍🏽👍🏽",
  },
  {
    name: "Веселка Ангелова",
    lang: "bg",
    highlight: "обяснява всичко на достъпен език",
    text: "Изключително точен,любезен,обяснява всичко на достъпен език. Съдейства по всяко време и с всички средства. Препоръчвам с две ръце и винаги бихме използвали неговите услуги отново и отново!",
  },
  {
    name: "Neli Stefanova",
    lang: "bg",
    tag: "shop",
    highlight: "Коректна и бърза работа",
    text: "Коректна и бърза работа, по възложената поръчка за сайт и онлайн магазин 👍 ако имате нужда от сайт препоръчвам Rafetov с две ръце!!!",
  },
  {
    name: "Deivid Høgård",
    lang: "no",
    text: "Veldig flink kar! Anbefales",
  },
];
