import type { Lang } from "../i18n/types";

export type ReviewTranslation = {
  /** Преводът на удебеления откъс. */
  highlight?: string;
  text: string;
};

/**
 * Преводи на отзивите на езиците на сайта, по име на клиента.
 * Показва се преводът на езика на страницата; оригиналът е на един клик.
 * За езика, на който е написан отзивът, няма запис.
 */
export const REVIEW_TRANSLATIONS: Record<string, Partial<Record<Lang, ReviewTranslation>>> = {
  "behlul kamber": {
    en: {
      highlight: "this is the second website he has created for me",
      text: "I want to say explicitly that this is the second website he has created for me, and so far I am extremely happy with his work. Rafetov is always available and takes great care of our website for windows and construction elements.\n\nHe is also very kind, fair and works professionally with his clients.\n\nThank you so much for the great work and your services! I definitely recommend you to everyone!",
    },
    de: {
      highlight: "das ist die zweite Website, die er für mich erstellt hat",
      text: "Ich möchte ausdrücklich sagen, dass dies die zweite Website ist, die er für mich erstellt hat, und ich bin bisher äußerst zufrieden mit seiner Arbeit. Rafetov ist immer erreichbar und kümmert sich sehr sorgfältig um unsere Website für Fenster und Bauelemente.\n\nAußerdem ist er sehr freundlich, korrekt und arbeitet professionell mit seinen Kunden.\n\nVielen Dank für die großartige Arbeit und deine Leistungen! Ich empfehle dich definitiv jedem weiter!",
    },
    nl: {
      highlight: "dit is de tweede website die hij voor mij heeft gemaakt",
      text: "Ik wil uitdrukkelijk zeggen dat dit de tweede website is die hij voor mij heeft gemaakt, en tot nu toe ben ik uiterst tevreden over zijn werk. Rafetov is altijd bereikbaar en zorgt heel zorgvuldig voor onze website voor ramen en bouwelementen.\n\nDaarnaast is hij heel vriendelijk, correct en werkt hij professioneel met zijn klanten.\n\nHartelijk dank voor het geweldige werk en je diensten! Ik beveel je zeker aan iedereen aan!",
    },
  },
  "Simeon Hristov": {
    bg: {
      highlight: "процесът беше професионален, гладък и добре организиран",
      text: "Имах страхотен опит при работата с Rafetov по разработването на моя уебсайт. От началото до края процесът беше професионален, гладък и добре организиран.\n\nВложиха време да разберат какво искам и превърнаха идеите ми в професионален, модерен и лесен за ползване уебсайт. Комуникацията беше отлична през цялото време и винаги отговаряха на въпросите и заявките ми.\n\nМного съм доволен от крайния резултат и определено бих препоръчал услугите им на всеки, който търси надежден и професионален човек за изработка на уебсайт.",
    },
    de: {
      highlight: "der Prozess war professionell, reibungslos und gut organisiert",
      text: "Ich hatte eine tolle Erfahrung bei der Zusammenarbeit mit Rafetov an der Entwicklung meiner Website. Von Anfang bis Ende war der Prozess professionell, reibungslos und gut organisiert.\n\nSie haben sich die Zeit genommen zu verstehen, was ich wollte, und meine Ideen in eine professionelle, moderne und benutzerfreundliche Website verwandelt. Die Kommunikation war die ganze Zeit ausgezeichnet, und auf meine Fragen und Wünsche wurde immer eingegangen.\n\nIch bin mit dem Ergebnis sehr zufrieden und würde ihre Dienste jedem empfehlen, der jemanden für eine zuverlässige und professionelle Website sucht.",
    },
    nl: {
      highlight: "het proces verliep professioneel, vlot en goed georganiseerd",
      text: "Ik heb een uitstekende ervaring gehad met Rafetov bij de ontwikkeling van mijn website. Van begin tot einde verliep het proces professioneel, vlot en goed georganiseerd.\n\nZe namen de tijd om te begrijpen wat ik wilde en zetten mijn ideeën om in een professionele, moderne en gebruiksvriendelijke website. De communicatie was de hele tijd uitstekend en ze reageerden altijd op mijn vragen en verzoeken.\n\nIk ben heel blij met het eindresultaat en zou hun diensten zeker aanbevelen aan iedereen die een betrouwbare en professionele partij zoekt om een website te bouwen.",
    },
  },
  "Alpha Reiniging": {
    bg: {
      highlight: "Уебсайтът изглежда модерно, професионално и подредено",
      text: "Много съм доволен от уебсайта, който Dzhan от Rafetov направи за нашата фирма Alpha Reiniging! От самото начало той слушаше внимателно нашите желания и изпълни всичко много професионално.\n\nУебсайтът изглежда модерно, професионално и подредено и пасва перфектно на фирмата ни. Възможността клиентите лесно да поискат оферта също е много добре реализирана. Всичко работи гладко и изглежда изискано.\n\nDzhan свърши наистина добра работа и обърна голямо внимание на детайлите. Много сме доволни от крайния резултат и от сътрудничеството.\n\nБраво, Dzhan, продължавай така! Горещо препоръчвам на всеки, който иска да си направи професионален уебсайт. 💪🏼",
    },
    en: {
      highlight: "The website looks modern, professional, and well-organized",
      text: "Very satisfied with the website that Dzhan van Rafetov created for our company, Alpha Reiniging! From the very beginning, he listened carefully to our wishes and executed everything very professionally.\n\nThe website looks modern, professional, and well-organized, and fits our company perfectly. The option for customers to easily request a quote is also very well implemented. Everything works smoothly and looks polished.\n\nDzhan delivered truly excellent work and paid a lot of attention to the details. We are very satisfied with the final result and the collaboration.\n\nWell done, Dzhan, keep it up! Highly recommended for anyone looking to have a professional website made. 💪🏼",
    },
    de: {
      highlight: "Die Website wirkt modern, professionell und übersichtlich",
      text: "Sehr zufrieden mit der Website, die Dzhan von Rafetov für unser Unternehmen Alpha Reiniging erstellt hat! Von Anfang an hat er gut auf unsere Wünsche gehört und alles sehr professionell umgesetzt.\n\nDie Website wirkt modern, professionell und übersichtlich und passt perfekt zu unserem Unternehmen. Auch die Möglichkeit für Kunden, einfach ein Angebot anzufragen, ist sehr gut umgesetzt. Alles funktioniert reibungslos und sieht gepflegt aus.\n\nDzhan hat wirklich gute Arbeit geleistet und viel Wert auf die Details gelegt. Wir sind mit dem Ergebnis und der Zusammenarbeit sehr zufrieden.\n\nWeiter so, Dzhan! Absolut empfehlenswert für alle, die eine professionelle Website erstellen lassen möchten. 💪🏼",
    },
  },
  "Aptula Cholak": {
    bg: {
      highlight: "Сътрудничеството беше приятно, надеждно и професионално",
      text: "Имах нужда от професионален уебсайт за моята фирма и попаднах на г-н Рафетов. След като се запознахме, разгледах някои от предишните му работи и веднага бях убеден.\n\nЗатова реших той да направи уебсайта на фирмата ми – и съм много доволен от резултата. Сътрудничеството беше приятно, надеждно и професионално.\n\nС чиста съвест мога да препоръчам г-н Рафетов. Благодаря за прекрасната работа!",
    },
    en: {
      highlight: "The collaboration was pleasant, reliable, and professional",
      text: "I needed a professional website for my company and came across Mr. Rafetov. After we met, I looked at some of his previous work and was immediately impressed.\n\nThat's why I decided to have him create my company website – and I'm very happy with the result. The collaboration was pleasant, reliable, and professional.\n\nI can wholeheartedly recommend Mr. Rafetov. Thank you for the excellent work!",
    },
    nl: {
      highlight: "De samenwerking was aangenaam, betrouwbaar en professioneel",
      text: "Ik had voor mijn bedrijf een professionele website nodig en kwam zo bij de heer Rafetov terecht. Nadat we hadden kennisgemaakt, heb ik enkele van zijn eerdere werken bekeken en was ik meteen overtuigd.\n\nDaarom heb ik besloten mijn bedrijfswebsite door hem te laten maken – en met het resultaat ben ik heel tevreden. De samenwerking was aangenaam, betrouwbaar en professioneel.\n\nIk kan de heer Rafetov met een gerust hart aanbevelen. Hartelijk dank voor het geweldige werk!",
    },
  },
  "Osman Toko": {
    bg: {
      highlight: "откакто той се зае, всичко работи перфектно",
      text: "Преди да опозная Рафетов, винаги имах проблеми с уебсайта си. Но откакто той се занимава, всичко работи перфектно. Наистина си върши работата много добре, изключително е уважителен и мисли заедно с теб. Изгради целия ми уебсайт от нулата, точно както го исках. Супер съм доволен и наистина бих го препоръчал на всеки. Много благодаря!",
    },
    en: {
      highlight: "since he came on board, everything runs perfectly",
      text: "Before I got to know Rafetov, I always had problems with my website. But since he came on board, everything runs perfectly. He really does his work very well, is super respectful and truly thinks along with you. He built my entire website from scratch, exactly the way I wanted it. I'm super satisfied and would really recommend him to everyone. Thank you so much!",
    },
    de: {
      highlight: "seit er dabei ist, läuft alles perfekt",
      text: "Bevor ich Rafetov kennengelernt habe, hatte ich immer Probleme mit meiner Website. Aber seit er dabei ist, läuft alles perfekt. Er macht seine Arbeit wirklich sehr gut, ist super respektvoll und denkt richtig mit. Er hat meine ganze Website von Grund auf aufgebaut, genau so, wie ich es wollte. Ich bin super zufrieden und würde ihn wirklich jedem weiterempfehlen. Vielen Dank!",
    },
  },
  "Nurbin Nuridin": {
    bg: {
      highlight: "бързо, професионално и точно според нашите желания",
      text: "Топ услуга! Уебсайтът за нашата услуга беше направен бързо, професионално и точно според нашите желания. Супер комуникация и страхотен дизайн – абсолютно препоръчвам! Радваме се на бъдещото сътрудничество.",
    },
    en: {
      highlight: "quickly, professionally and exactly as we wished",
      text: "Top service! The website for our business was built quickly, professionally and exactly as we wished. Great communication and great design – absolutely recommended! We look forward to further collaboration.",
    },
    nl: {
      highlight: "snel, professioneel en precies volgens onze wensen uitgevoerd",
      text: "Topservice! De website voor onze dienstverlening werd snel, professioneel en precies volgens onze wensen uitgevoerd. Uitstekende communicatie en een prachtig design – absoluut een aanrader! We kijken uit naar de verdere samenwerking.",
    },
  },
  "Богомил Ивайлов": {
    en: {
      highlight: "doing almost everything himself with minimal help from me",
      text: "I'm extremely happy with the work! He built a professional website for my metal business, doing almost everything himself with minimal help from me. Everything was done quickly, with quality and exactly as it should be. The end result is great! I recommend him wholeheartedly!",
    },
    de: {
      highlight: "und erledigte fast alles selbst, mit minimaler Hilfe von meiner Seite",
      text: "Ich bin äußerst zufrieden mit der Arbeit! Er hat eine professionelle Website für mein Metallgeschäft erstellt und dabei fast alles selbst erledigt, mit minimaler Hilfe von meiner Seite. Alles wurde schnell, in guter Qualität und genau so gemacht, wie es sein soll. Das Endergebnis ist super! Ich empfehle ihn mit voller Überzeugung!",
    },
    nl: {
      highlight: "waarbij hij bijna alles zelf deed, met minimale hulp van mijn kant",
      text: "Ik ben uiterst tevreden over het werk! Hij heeft een professionele website gemaakt voor mijn metaalbedrijf, waarbij hij bijna alles zelf deed, met minimale hulp van mijn kant. Alles werd snel, kwalitatief en precies zoals het hoort gedaan. Het eindresultaat is super! Ik beveel hem van harte aan!",
    },
  },
  "Sevilay Kamber": {
    bg: {
      highlight: "Направи ни два уебсайта",
      text: "Много сме доволни от работата на Рафетов! Направи ни два уебсайта и изпълни всичко професионално и надеждно. При въпроси беше достъпен по всяко време и отговаряше бързо. Благодарим за прекрасното сътрудничество и с удоволствие го препоръчваме!",
    },
    en: {
      highlight: "He built two websites for us",
      text: "We are very satisfied with Rafetov's work! He built two websites for us and delivered everything professionally and reliably. He was always reachable when we had questions and replied quickly. We thank him for the great collaboration and are happy to recommend him!",
    },
    nl: {
      highlight: "Hij heeft twee websites voor ons gemaakt",
      text: "We zijn heel tevreden over het werk van Rafetov! Hij heeft twee websites voor ons gemaakt en alles professioneel en betrouwbaar uitgevoerd. Bij vragen was hij altijd bereikbaar en antwoordde hij snel. We bedanken hem voor de fijne samenwerking en bevelen hem graag aan!",
    },
  },
  "Nesrin Shyukri": {
    en: {
      highlight: "He approached everything with great responsibility and attention",
      text: "I am extremely pleased with Dzhan's attitude and professionalism! He approached everything he did for us, for our center and for our website with great responsibility and attention.\n\nFair, responsive and extremely committed to every detail of the work. It was a real pleasure to work together, and I wholeheartedly recommend him to anyone looking for a reliable person to build a website and everything related to its development and maintenance!\n\nThank you, Dzhan, for the great work and attitude! ❤️",
    },
    de: {
      highlight: "Er ist mit großer Verantwortung und Aufmerksamkeit an alles herangegangen",
      text: "Ich bin äußerst zufrieden mit Dzhans Einstellung und Professionalität! Er ist mit großer Verantwortung und Aufmerksamkeit an alles herangegangen, was er für uns, für unser Zentrum und für unsere Website gemacht hat.\n\nKorrekt, zuvorkommend und in jedes Detail der Arbeit äußerst engagiert. Es war ein echtes Vergnügen, zusammenzuarbeiten, und ich empfehle ihn von ganzem Herzen jedem, der eine zuverlässige Person für die Erstellung einer Website und alles rund um Weiterentwicklung und Wartung sucht!\n\nDanke, Dzhan, für die tolle Arbeit und die Einstellung! ❤️",
    },
    nl: {
      highlight: "Hij pakte alles aan met enorme verantwoordelijkheid en aandacht",
      text: "Ik ben uiterst tevreden over de houding en het professionalisme van Dzhan! Hij pakte alles aan met enorme verantwoordelijkheid en aandacht – alles wat hij voor ons, voor ons centrum en voor onze website heeft gedaan.\n\nCorrect, behulpzaam en uiterst betrokken bij elk detail van het werk. Het was een waar genoegen om samen te werken, en ik beveel hem van harte aan bij iedereen die een betrouwbaar iemand zoekt voor het maken van een website en alles wat met de ontwikkeling en het onderhoud ervan te maken heeft!\n\nBedankt, Dzhan, voor het geweldige werk en de fijne houding! ❤️",
    },
  },
  "Plamen Chalakov": {
    en: {
      highlight: "Communication was easy and fair",
      text: "I am very happy with the collaboration with Rafetov.com on building the azteca-premium.com website. Communication was easy and fair, and everything was carried out professionally and according to my requirements. I recommend!",
    },
    de: {
      highlight: "Die Kommunikation war einfach und korrekt",
      text: "Ich bin sehr zufrieden mit der Zusammenarbeit mit Rafetov.com bei der Erstellung der Website azteca-premium.com. Die Kommunikation war einfach und korrekt, und alles wurde professionell und gemäß meinen Anforderungen umgesetzt. Ich empfehle es!",
    },
    nl: {
      highlight: "De communicatie verliep vlot en correct",
      text: "Ik ben heel tevreden over de samenwerking met Rafetov.com bij het maken van de website azteca-premium.com. De communicatie verliep vlot en correct, en alles werd professioneel en volgens mijn eisen uitgevoerd. Een aanrader!",
    },
  },
  "Ersin Metesoy": {
    bg: {
      highlight: "сайт, по-добър от този, който съм си представял",
      text: "Създаде сайт, по-добър от този, който му описах и си представях. Със своята визия добави към сайта по-функционални неща. След това винаги ме подкрепяше и се занимаваше с проблемите. Върши работата си с любов и дава всичко от себе си. 🙌",
    },
    en: {
      highlight: "a site better than I imagined",
      text: "He created a better site than I described or imagined. With his own vision he added more functional things to the site. Afterwards he was always supportive and took care of any problems. He does his work with love and gives it more than its due. 🙌",
    },
    de: {
      highlight: "eine bessere Website, als ich sie mir vorgestellt hatte",
      text: "Er hat eine bessere Website geschaffen, als ich sie beschrieben oder mir vorgestellt hatte. Mit seiner eigenen Vision hat er der Seite funktionalere Dinge hinzugefügt. Danach hat er mich immer unterstützt und sich um Probleme gekümmert. Er macht seine Arbeit mit Liebe und gibt mehr als nur das Nötige. 🙌",
    },
    nl: {
      highlight: "een betere site dan ik me had voorgesteld",
      text: "Hij heeft een betere site gemaakt dan ik had beschreven en me had voorgesteld. Met zijn eigen visie voegde hij functionelere dingen toe aan de site. Daarna bood hij altijd ondersteuning en loste hij problemen op. Hij doet zijn werk met liefde en geeft meer dan wat ervan verwacht wordt. 🙌",
    },
  },
  "Миглена Иванова": {
    en: {
      highlight: "exactly as I imagined it",
      text: "I am extremely pleased with his work! He made me a great, modern and professional website, exactly as I imagined it. He works quickly, fairly and with great attention to detail. I recommend him to anyone who needs a quality website and a professional attitude. Trust him too — you won't regret it! ⭐⭐⭐⭐⭐",
    },
    de: {
      highlight: "genau so, wie ich es mir vorgestellt hatte",
      text: "Ich bin von seiner Arbeit äußerst begeistert! Er hat mir eine großartige, moderne und professionelle Website gemacht, genau so, wie ich es mir vorgestellt hatte. Er arbeitet schnell, korrekt und mit großer Liebe zum Detail. Ich empfehle ihn jedem, der eine hochwertige Website und professionellen Umgang braucht. Vertraut ihm auch – ihr werdet es nicht bereuen! ⭐⭐⭐⭐⭐",
    },
    nl: {
      highlight: "precies zoals ik het me had voorgesteld",
      text: "Ik ben uiterst tevreden over zijn werk! Hij heeft een geweldige, moderne en professionele website voor me gemaakt, precies zoals ik het me had voorgesteld. Hij werkt snel, correct en met veel aandacht voor detail. Ik beveel hem aan bij iedereen die een kwaliteitsvolle website en een professionele aanpak nodig heeft. Vertrouw hem ook – u zult er geen spijt van krijgen! ⭐⭐⭐⭐⭐",
    },
  },
  "Дани Юзиров": {
    en: {
      highlight: "The deadline was met, even though it was quite short",
      text: "I'm extremely happy with the work. The deadline was met, even though it was quite short, and the professionalism and skills showed. I wholeheartedly recommend!",
    },
    de: {
      highlight: "Die Frist wurde eingehalten, obwohl sie recht kurz war",
      text: "Ich bin äußerst zufrieden mit der Arbeit. Die Frist wurde eingehalten, obwohl sie recht kurz war – Professionalität und Können waren deutlich zu erkennen. Ich empfehle ihn von ganzem Herzen!",
    },
    nl: {
      highlight: "De deadline werd gehaald, ook al was die vrij kort",
      text: "Ik ben uiterst tevreden over het werk. De deadline werd gehaald, ook al was die vrij kort, en het professionalisme en de vaardigheden waren duidelijk zichtbaar. Ik beveel hem van harte aan!",
    },
  },
  "Abibe Izetova": {
    en: {
      highlight: "elegant, modern and fully reflects the vision and character of the studio",
      text: "The Abi Studio website was created with a lot of style, an eye for detail and attention to my every requirement. The end result is elegant, modern and fully reflects the vision and character of the studio.\nThank you for the wonderful result, I wholeheartedly recommend!",
    },
    de: {
      highlight: "elegant, modern und spiegelt die Vision und den Charakter des Studios voll wider",
      text: "Die Website von Abi Studio wurde mit viel Stil, Gespür für Details und Aufmerksamkeit für jede meiner Anforderungen erstellt. Das Endergebnis ist elegant, modern und spiegelt die Vision und den Charakter des Studios voll wider.\nVielen Dank für das wunderbare Ergebnis, ich empfehle ihn von ganzem Herzen!",
    },
    nl: {
      highlight: "elegant, modern en weerspiegelt volledig de visie en het karakter van de studio",
      text: "De website van Abi Studio werd gemaakt met veel stijl, oog voor detail en aandacht voor elk van mijn wensen. Het eindresultaat is elegant, modern en weerspiegelt volledig de visie en het karakter van de studio.\nBedankt voor het prachtige resultaat, ik beveel hem van harte aan!",
    },
  },
  "Taxi Alper": {
    bg: {
      highlight: "определено ще работя пак с него",
      text: "Отношение към клиента и извършена работа на професионалист – определено ще работя отново с него, много благодаря 🔝🔝🔝👍🏽👍🏽👍🏽",
    },
    en: {
      highlight: "I will definitely work with him again",
      text: "Customer service and work done by a true professional – I will definitely work with him again, thank you very much 🔝🔝🔝👍🏽👍🏽👍🏽",
    },
    de: {
      highlight: "ich werde definitiv wieder mit ihm arbeiten",
      text: "Umgang mit dem Kunden und geleistete Arbeit eines Profis – ich werde definitiv wieder mit ihm zusammenarbeiten, vielen Dank 🔝🔝🔝👍🏽👍🏽👍🏽",
    },
    nl: {
      highlight: "ik zal zeker opnieuw met hem samenwerken",
      text: "Klantvriendelijkheid en werk van een echte professional – ik zal zeker opnieuw met hem samenwerken, hartelijk dank 🔝🔝🔝👍🏽👍🏽👍🏽",
    },
  },
  "Веселка Ангелова": {
    en: {
      highlight: "explains everything in plain language",
      text: "Extremely punctual, kind, explains everything in plain language. Helps at any time and by every means. I wholeheartedly recommend him and we would always use his services again and again!",
    },
    de: {
      highlight: "erklärt alles in verständlicher Sprache",
      text: "Äußerst pünktlich, freundlich, erklärt alles in verständlicher Sprache. Hilft jederzeit und mit allen Mitteln. Ich empfehle ihn von ganzem Herzen und wir würden seine Dienste immer wieder in Anspruch nehmen!",
    },
    nl: {
      highlight: "legt alles in begrijpelijke taal uit",
      text: "Uiterst stipt, vriendelijk, legt alles in begrijpelijke taal uit. Helpt op elk moment en met alle middelen. Ik beveel hem van harte aan en we zouden altijd opnieuw een beroep doen op zijn diensten!",
    },
  },
  "Neli Stefanova": {
    en: {
      highlight: "Fair and fast work",
      text: "Fair and fast work on the commissioned website and online store 👍 if you need a website, I wholeheartedly recommend Rafetov!!!",
    },
    de: {
      highlight: "Korrekte und schnelle Arbeit",
      text: "Korrekte und schnelle Arbeit beim beauftragten Webauftritt mit Online-Shop 👍 wenn ihr eine Website braucht, empfehle ich Rafetov von ganzem Herzen!!!",
    },
    nl: {
      highlight: "Correct en snel werk",
      text: "Correct en snel werk aan de bestelde website en webshop 👍 als u een website nodig hebt, beveel ik Rafetov van harte aan!!!",
    },
  },
  "Deivid Høgård": {
    bg: { text: "Много кадърен човек! Препоръчва се." },
    en: { text: "Very skilled guy! Recommended." },
    de: { text: "Sehr fähiger Kerl! Empfehlenswert." },
    nl: { text: "Heel bekwame kerel! Een aanrader." },
  },
};
