import type { Lang } from "../types";

/**
 * Безплатна проверка на сайт (/proverka-na-sait). Текстовете са за собственик на бизнес, не за програмист:
 * какво значи проверката за запитванията и Google, с едно изречение. Ключовете на проверките идват от api/audit.ts.
 */
export type AuditStatus = "good" | "warn" | "bad";
export type AuditCheck = { id: string; status: AuditStatus; value?: string | number };
export type AuditGroupKey = "google" | "phone" | "trust" | "leads";

/** Групите в доклада и редът на проверките в тях. */
export const AUDIT_GROUPS: Record<AuditGroupKey, string[]> = {
  leads: ["contact"],
  phone: ["viewport", "pagespeed", "ttfb", "html_size", "img_alt"],
  google: ["title", "description", "h1", "noindex", "robots", "sitemap", "canonical", "structured_data", "lang"],
  trust: ["https", "http_redirect", "og", "favicon"],
};

/** Същата таблица като в api/audit.ts — за да расте резултатът, когато Google измери скоростта. */
export const AUDIT_WEIGHTS: Record<string, number> = {
  https: 10, http_redirect: 4, ttfb: 6, html_size: 3, title: 8, description: 6, h1: 4, viewport: 10, lang: 2, og: 6,
  img_alt: 3, favicon: 2, canonical: 3, structured_data: 3, robots: 3, sitemap: 3, noindex: 10, contact: 10, pagespeed: 8,
};

export function auditScore(checks: AuditCheck[]): number {
  let got = 0;
  let total = 0;
  for (const c of checks) {
    const w = AUDIT_WEIGHTS[c.id] ?? 0;
    total += w;
    got += w * (c.status === "good" ? 1 : c.status === "warn" ? 0.5 : 0);
  }
  return total ? Math.round((got / total) * 100) : 0;
}

export type AuditCopy = {
  nav: string;
  /** Тих линк от страницата за SEO: „Вижте как Google вижда сайта ви: безплатна проверка“. */
  entry: { question: string; link: string };
  metaTitle: string;
  metaDescription: string;
  title: string;
  sub: string;
  urlLabel: string;
  urlPlaceholder: string;
  run: string;
  running: string;
  disclaimer: string;
  loading: { title: string; text: string; pagespeed: string };
  score: { title: string; of: string; levels: { good: string; ok: string; bad: string } };
  groups: Record<AuditGroupKey, string>;
  statuses: Record<AuditStatus, string>;
  checks: Record<string, { title: string; why: string }>;
  values: { ms: string; kb: string; h1: string; imgs: string; pagespeed: string; found: Record<string, string> };
  pagespeedPending: string;
  pagespeedFailed: string;
  errors: Record<string, string>;
  checkedUrl: string;
  again: string;
  cta: {
    title: string;
    text: string;
    name: string;
    namePlaceholder: string;
    nameError: string;
    contact: string;
    contactPlaceholder: string;
    contactError: string;
    submit: string;
    sending: string;
    whatsapp: string;
    success: { title: string; text: string };
    failed: { title: string; text: string };
  };
  labels: { check: string; score: string; toFix: string; service: string; name: string; contact: string };
  waIntro: string;
};

export const auditCopy: Record<Lang, AuditCopy> = {
  bg: {
    entry: { question: "Имате сайт?", link: "Проверете го безплатно за 1 минута" },
    nav: "Безплатна проверка на сайт",
    metaTitle: "Безплатна проверка на сайт: Google, телефон, скорост и запитвания | Rafetov.com",
    metaDescription: "Въведете адреса на сайта си и за секунди вижте какво му пречи да носи запитвания: мобилна версия, скорост, заглавия за Google, контакти, HTTPS. Бърза автоматична проверка на прост език.",
    title: "Проверете сайта\u00a0си за една минута",
    sub: "Въведете адреса и вижте какво му пречи да носи запитвания: как го вижда Google, как се отваря на телефон и лесно ли е да ви потърсят. Бърза автоматична проверка, на прост език.",
    urlLabel: "Адрес на сайта",
    urlPlaceholder: "вашиятсайт.com",
    run: "Провери",
    running: "Проверяваме…",
    disclaimer: "Това е бърза автоматична проверка на началната страница, не пълен професионален одит. Тя показва най-честите проблеми, които виждаме при сайтове на малки бизнеси.",
    loading: { title: "Проверяваме {url}", text: "Сваляме страницата и преглеждаме заглавията, мобилната версия, контактите и настройките за Google.", pagespeed: "Google измерва скоростта на телефон. Отнема до 30 секунди." },
    score: { title: "Резултат", of: "от 100", levels: { good: "Сайтът е в добра форма. Остават дребни неща.", ok: "Има какво да се подобри, за да носи повече запитвания.", bad: "Сайтът ви губи запитвания. Повечето от тези проблеми се оправят бързо." } },
    groups: { leads: "Запитвания", phone: "Телефон и скорост", google: "Google", trust: "Доверие и споделяне" },
    statuses: { good: "Наред", warn: "Може по-добре", bad: "За поправка" },
    checks: {
      contact: { title: "Лесно ли е да ви потърсят", why: "Телефон с едно докосване, WhatsApp, Viber или форма за запитване. Без тях хората излизат, вместо да ви пишат." },
      viewport: { title: "Мобилна версия", why: "Повечето посетители идват от телефон. Без настройка за мобилни екрани сайтът излиза дребен и Google го класира по-ниско." },
      pagespeed: { title: "Скорост на телефон според Google", why: "Google мери колко бързо се отваря страницата на обикновен телефон. Бавен сайт губи хора, преди да са видели каквото и да е." },
      ttfb: { title: "Време за отговор на сървъра", why: "Колко чака браузърът, преди сървърът изобщо да отговори. Бавният хостинг забавя всичко останало." },
      html_size: { title: "Тежест на страницата", why: "Голяма страница се отваря бавно на мобилен интернет. Обикновено причината са неоптимизирани снимки или ненужен код." },
      img_alt: { title: "Описания на снимките", why: "Google не вижда снимките, чете текстовото им описание. Без него страницата казва по-малко за вас." },
      title: { title: "Заглавие на страницата", why: "Това е синият ред в Google. Трябва да казва какво правите и къде, в до 60 знака." },
      description: { title: "Описание за Google", why: "Текстът под заглавието в резултатите. Той решава дали човекът ще кликне на вас или на конкурента." },
      h1: { title: "Основно заглавие на страницата", why: "Едно ясно главно заглавие казва и на хората, и на Google за какво е страницата." },
      noindex: { title: "Разрешено ли е индексиране", why: "Понякога сайтът е оставен скрит от Google след изработката. Тогава не излиза в търсенето, колкото и да е добър." },
      robots: { title: "Файл robots.txt", why: "Казва на Google кои части от сайта да обхожда. Грешна настройка може да скрие целия сайт." },
      sitemap: { title: "Карта на сайта", why: "Списък със страниците ви за Google. Помага новите страници да се намерят по-бързо." },
      canonical: { title: "Основен адрес на страницата", why: "Казва на Google кой адрес е „истинският“, когато една страница се отваря на няколко адреса." },
      structured_data: { title: "Структурирани данни", why: "Допълнителна информация за бизнеса ви в език, който Google разбира: фирма, услуги, отзиви. Дава по-богат резултат в търсенето." },
      lang: { title: "Език на страницата", why: "Казва на браузърите и Google на какъв език е сайтът. Важно за правилното показване и превода." },
      https: { title: "Сигурна връзка (HTTPS)", why: "Без катинарче браузърът пише „Не е защитено“, а Google класира сайта по-ниско. Хората не оставят телефона си на такъв сайт." },
      http_redirect: { title: "Пренасочване към HTTPS", why: "Когато някой напише адреса без https, сайтът трябва сам да го прехвърли към сигурната версия." },
      og: { title: "Как изглежда при споделяне", why: "Картинката и заглавието, които се показват, когато пратите линка във Viber, WhatsApp или Facebook. Без тях линкът изглежда като спам." },
      favicon: { title: "Икона на сайта", why: "Малката икона в таба и в Google резултатите. Дребен детайл, който показва, че сайтът е поддържан." },
    },
    values: { ms: "{n} ms", kb: "{n} KB", h1: "{n} заглавия", imgs: "{n} без описание от {total}", pagespeed: "{n} от 100", found: { tel: "телефон", whatsapp: "WhatsApp", viber: "Viber", form: "форма", email: "имейл" } },
    pagespeedPending: "Google измерва…",
    pagespeedFailed: "Google не отговори навреме. Останалите проверки са пълни.",
    errors: {
      invalid_url: "Това не прилича на адрес на сайт. Опитайте например вашиятсайт.com.",
      blocked: "Този адрес не може да бъде проверен. Въведете публичен адрес на сайт.",
      unreachable: "Сайтът не отговори. Проверете адреса или опитайте след малко.",
      timeout: "Сайтът не отговори за 8 секунди. Това само по себе си е проблем: опитайте отново или ни пишете.",
      http_error: "Сайтът върна грешка вместо страница. Проверете адреса.",
      not_html: "На този адрес няма уеб страница. Въведете адреса на началната страница.",
      too_many_redirects: "Сайтът пренасочва твърде много пъти. Това е проблем за посетителите и за Google.",
      rate_limited: "Твърде много проверки за кратко време. Опитайте след няколко минути.",
      failed: "Нещо се обърка при нас. Опитайте отново или ни пишете.",
      network: "Няма връзка със сървъра. Проверете интернета и опитайте отново.",
    },
    checkedUrl: "Проверен адрес",
    again: "Провери друг сайт",
    cta: {
      title: "Искате ли да ви покажем как да го оправим?",
      text: "Оставете телефон или имейл. Ще прегледаме сайта ви и ще ви кажем кои от тези неща носят най-много и колко работа са. Без ангажимент.",
      name: "Име",
      namePlaceholder: "Вашето име",
      nameError: "Напишете името си.",
      contact: "Телефон или имейл",
      contactPlaceholder: "+359 … или име@…",
      contactError: "Напишете телефон или имейл, за да ви отговорим.",
      submit: "Изпрати резултата",
      sending: "Изпращане…",
      whatsapp: "или пишете в WhatsApp",
      success: { title: "Получихме резултата", text: "Ще ви отговорим до 24 часа с конкретни предложения за сайта ви." },
      failed: { title: "Не успяхме да изпратим", text: "Опитайте отново или ни пишете в WhatsApp с бутона по-долу." },
    },
    labels: { check: "Проверка на сайт", score: "Резултат", toFix: "За подобрение", service: "Безплатна проверка", name: "Име", contact: "Контакт" },
    waIntro: "Здравейте, направих проверка на сайта си в rafetov.com:",
  },

  en: {
    entry: { question: "Already have a website?", link: "Check it for free in 1 minute" },
    nav: "Free website check",
    metaTitle: "Free website check: Google, mobile, speed and enquiries | Rafetov.com",
    metaDescription: "Enter your website address and see in seconds what stops it from bringing enquiries: mobile version, speed, Google titles, contact details, HTTPS. A quick automatic check in plain language.",
    title: "Check your website in one minute",
    sub: "Enter the address and see what stops it from bringing enquiries: how Google sees it, how it opens on a phone and how easy it is to contact you. A quick automatic check, in plain language.",
    urlLabel: "Website address",
    urlPlaceholder: "yourwebsite.com",
    run: "Check",
    running: "Checking…",
    disclaimer: "This is a quick automatic check of the home page, not a full professional audit. It shows the most common problems we see on small-business websites.",
    loading: { title: "Checking {url}", text: "Loading the page and reviewing titles, mobile version, contact details and Google settings.", pagespeed: "Google is measuring speed on a phone. This takes up to 30 seconds." },
    score: { title: "Score", of: "out of 100", levels: { good: "The website is in good shape. Only small things remain.", ok: "There is room to improve so it brings more enquiries.", bad: "Your website is losing enquiries. Most of these problems are quick to fix." } },
    groups: { leads: "Enquiries", phone: "Phone and speed", google: "Google", trust: "Trust and sharing" },
    statuses: { good: "Fine", warn: "Could be better", bad: "Needs fixing" },
    checks: {
      contact: { title: "How easy it is to contact you", why: "A one-tap phone number, WhatsApp, Viber or an enquiry form. Without them people leave instead of writing to you." },
      viewport: { title: "Mobile version", why: "Most visitors come from a phone. Without a mobile setting the site looks tiny and Google ranks it lower." },
      pagespeed: { title: "Speed on a phone according to Google", why: "Google measures how fast the page opens on an ordinary phone. A slow site loses people before they see anything." },
      ttfb: { title: "Server response time", why: "How long the browser waits before the server answers at all. Slow hosting delays everything else." },
      html_size: { title: "Page weight", why: "A heavy page opens slowly on mobile internet. Usually the cause is unoptimised images or unnecessary code." },
      img_alt: { title: "Image descriptions", why: "Google cannot see images, it reads their text description. Without it the page says less about you." },
      title: { title: "Page title", why: "This is the blue line in Google. It should say what you do and where, in up to 60 characters." },
      description: { title: "Description for Google", why: "The text under the title in the results. It decides whether the person clicks on you or on a competitor." },
      h1: { title: "Main heading of the page", why: "One clear main heading tells both people and Google what the page is about." },
      noindex: { title: "Indexing allowed", why: "Sometimes a site is left hidden from Google after the build. Then it does not show up in search, however good it is." },
      robots: { title: "robots.txt file", why: "Tells Google which parts of the site to crawl. A wrong setting can hide the whole site." },
      sitemap: { title: "Sitemap", why: "A list of your pages for Google. It helps new pages get found faster." },
      canonical: { title: "Main address of the page", why: "Tells Google which address is the “real” one when a page opens at several addresses." },
      structured_data: { title: "Structured data", why: "Extra information about your business in a language Google understands: company, services, reviews. It gives a richer search result." },
      lang: { title: "Page language", why: "Tells browsers and Google which language the site is in. Important for correct display and translation." },
      https: { title: "Secure connection (HTTPS)", why: "Without the padlock the browser says “Not secure” and Google ranks the site lower. People do not leave their phone number on such a site." },
      http_redirect: { title: "Redirect to HTTPS", why: "When someone types the address without https, the site should move them to the secure version by itself." },
      og: { title: "How it looks when shared", why: "The image and title shown when you send the link on WhatsApp, Viber or Facebook. Without them the link looks like spam." },
      favicon: { title: "Site icon", why: "The small icon in the tab and in Google results. A small detail that shows the site is looked after." },
    },
    values: { ms: "{n} ms", kb: "{n} KB", h1: "{n} headings", imgs: "{n} without description of {total}", pagespeed: "{n} of 100", found: { tel: "phone", whatsapp: "WhatsApp", viber: "Viber", form: "form", email: "email" } },
    pagespeedPending: "Google is measuring…",
    pagespeedFailed: "Google did not answer in time. The other checks are complete.",
    errors: {
      invalid_url: "This does not look like a website address. Try something like yourwebsite.com.",
      blocked: "This address cannot be checked. Enter a public website address.",
      unreachable: "The website did not respond. Check the address or try again shortly.",
      timeout: "The website did not respond within 8 seconds. That is a problem in itself: try again or write to us.",
      http_error: "The website returned an error instead of a page. Check the address.",
      not_html: "There is no web page at this address. Enter the address of the home page.",
      too_many_redirects: "The website redirects too many times. That is a problem for visitors and for Google.",
      rate_limited: "Too many checks in a short time. Try again in a few minutes.",
      failed: "Something went wrong on our side. Try again or write to us.",
      network: "No connection to the server. Check your internet and try again.",
    },
    checkedUrl: "Checked address",
    again: "Check another website",
    cta: {
      title: "Want us to show you how to fix it?",
      text: "Leave a phone number or email. We will look at your website and tell you which of these bring the most and how much work they are. No commitment.",
      name: "Name",
      namePlaceholder: "Your name",
      nameError: "Please write your name.",
      contact: "Phone or email",
      contactPlaceholder: "+44 … or name@…",
      contactError: "Write a phone number or email so we can reply.",
      submit: "Send the result",
      sending: "Sending…",
      whatsapp: "or message us on WhatsApp",
      success: { title: "We have the result", text: "We reply within 24 hours with specific suggestions for your website." },
      failed: { title: "We could not send it", text: "Try again or message us on WhatsApp with the button below." },
    },
    labels: { check: "Website check", score: "Score", toFix: "To improve", service: "Free website check", name: "Name", contact: "Contact" },
    waIntro: "Hello, I checked my website on rafetov.com:",
  },

  de: {
    entry: { question: "Sie haben schon eine Webseite?", link: "Kostenlos in 1 Minute prüfen" },
    nav: "Kostenloser Webseiten-Check",
    metaTitle: "Kostenloser Webseiten-Check: Google, Handy, Geschwindigkeit und Anfragen | Rafetov.com",
    metaDescription: "Geben Sie die Adresse Ihrer Webseite ein und sehen Sie in Sekunden, was sie daran hindert, Anfragen zu bringen: mobile Version, Geschwindigkeit, Google-Titel, Kontaktdaten, HTTPS. Schnelle automatische Prüfung in einfacher Sprache.",
    title: "Prüfen Sie Ihre Webseite in einer Minute",
    sub: "Geben Sie die Adresse ein und sehen Sie, was sie daran hindert, Anfragen zu bringen: wie Google sie sieht, wie sie auf dem Handy öffnet und wie leicht man Sie erreicht. Schnelle automatische Prüfung, in einfacher Sprache.",
    urlLabel: "Adresse der Webseite",
    urlPlaceholder: "ihrewebseite.de",
    run: "Prüfen",
    running: "Wird geprüft…",
    disclaimer: "Dies ist eine schnelle automatische Prüfung der Startseite, kein vollständiges professionelles Audit. Sie zeigt die häufigsten Probleme, die wir bei Webseiten kleiner Unternehmen sehen.",
    loading: { title: "Wir prüfen {url}", text: "Die Seite wird geladen; wir prüfen Titel, mobile Version, Kontaktdaten und Google-Einstellungen.", pagespeed: "Google misst die Geschwindigkeit auf dem Handy. Das dauert bis zu 30 Sekunden." },
    score: { title: "Ergebnis", of: "von 100", levels: { good: "Die Webseite ist in guter Form. Es bleiben nur Kleinigkeiten.", ok: "Es gibt Luft nach oben, damit sie mehr Anfragen bringt.", bad: "Ihre Webseite verliert Anfragen. Die meisten dieser Probleme sind schnell behoben." } },
    groups: { leads: "Anfragen", phone: "Handy und Geschwindigkeit", google: "Google", trust: "Vertrauen und Teilen" },
    statuses: { good: "In Ordnung", warn: "Geht besser", bad: "Zu beheben" },
    checks: {
      contact: { title: "Wie leicht man Sie erreicht", why: "Telefonnummer mit einem Tipp, WhatsApp, Viber oder ein Anfrageformular. Ohne sie gehen die Leute, statt Ihnen zu schreiben." },
      viewport: { title: "Mobile Version", why: "Die meisten Besucher kommen vom Handy. Ohne Einstellung für mobile Bildschirme wirkt die Seite winzig, und Google stuft sie niedriger ein." },
      pagespeed: { title: "Geschwindigkeit auf dem Handy laut Google", why: "Google misst, wie schnell die Seite auf einem gewöhnlichen Handy öffnet. Eine langsame Seite verliert Leute, bevor sie etwas sehen." },
      ttfb: { title: "Antwortzeit des Servers", why: "Wie lange der Browser wartet, bis der Server überhaupt antwortet. Langsames Hosting verzögert alles andere." },
      html_size: { title: "Gewicht der Seite", why: "Eine schwere Seite öffnet im mobilen Netz langsam. Meist liegt es an nicht optimierten Bildern oder unnötigem Code." },
      img_alt: { title: "Bildbeschreibungen", why: "Google sieht keine Bilder, es liest ihre Textbeschreibung. Ohne sie sagt die Seite weniger über Sie." },
      title: { title: "Seitentitel", why: "Das ist die blaue Zeile bei Google. Sie sollte sagen, was Sie tun und wo, in bis zu 60 Zeichen." },
      description: { title: "Beschreibung für Google", why: "Der Text unter dem Titel in den Ergebnissen. Er entscheidet, ob jemand auf Sie oder auf die Konkurrenz klickt." },
      h1: { title: "Hauptüberschrift der Seite", why: "Eine klare Hauptüberschrift sagt Menschen und Google, worum es auf der Seite geht." },
      noindex: { title: "Indexierung erlaubt", why: "Manchmal bleibt eine Seite nach der Erstellung vor Google versteckt. Dann erscheint sie nicht in der Suche, egal wie gut sie ist." },
      robots: { title: "Datei robots.txt", why: "Sagt Google, welche Teile der Seite es durchsuchen soll. Eine falsche Einstellung kann die ganze Seite verstecken." },
      sitemap: { title: "Sitemap", why: "Eine Liste Ihrer Seiten für Google. Hilft, neue Seiten schneller zu finden." },
      canonical: { title: "Hauptadresse der Seite", why: "Sagt Google, welche Adresse die „richtige“ ist, wenn eine Seite unter mehreren Adressen öffnet." },
      structured_data: { title: "Strukturierte Daten", why: "Zusätzliche Informationen über Ihr Unternehmen in einer Sprache, die Google versteht: Firma, Leistungen, Bewertungen. Ergibt ein reicheres Suchergebnis." },
      lang: { title: "Sprache der Seite", why: "Sagt Browsern und Google, in welcher Sprache die Seite ist. Wichtig für korrekte Darstellung und Übersetzung." },
      https: { title: "Sichere Verbindung (HTTPS)", why: "Ohne Schloss zeigt der Browser „Nicht sicher“, und Google stuft die Seite niedriger ein. Niemand hinterlässt dort seine Telefonnummer." },
      http_redirect: { title: "Weiterleitung zu HTTPS", why: "Wenn jemand die Adresse ohne https eingibt, sollte die Seite ihn von selbst zur sicheren Version leiten." },
      og: { title: "Aussehen beim Teilen", why: "Bild und Titel, die erscheinen, wenn Sie den Link per WhatsApp, Viber oder Facebook senden. Ohne sie sieht der Link wie Spam aus." },
      favicon: { title: "Seitensymbol", why: "Das kleine Symbol im Tab und in den Google-Ergebnissen. Ein kleines Detail, das zeigt, dass die Seite gepflegt wird." },
    },
    values: { ms: "{n} ms", kb: "{n} KB", h1: "{n} Überschriften", imgs: "{n} ohne Beschreibung von {total}", pagespeed: "{n} von 100", found: { tel: "Telefon", whatsapp: "WhatsApp", viber: "Viber", form: "Formular", email: "E-Mail" } },
    pagespeedPending: "Google misst…",
    pagespeedFailed: "Google hat nicht rechtzeitig geantwortet. Die übrigen Prüfungen sind vollständig.",
    errors: {
      invalid_url: "Das sieht nicht wie eine Webadresse aus. Versuchen Sie zum Beispiel ihrewebseite.de.",
      blocked: "Diese Adresse kann nicht geprüft werden. Geben Sie eine öffentliche Webadresse ein.",
      unreachable: "Die Webseite hat nicht geantwortet. Prüfen Sie die Adresse oder versuchen Sie es gleich noch einmal.",
      timeout: "Die Webseite hat innerhalb von 8 Sekunden nicht geantwortet. Das ist selbst ein Problem: versuchen Sie es erneut oder schreiben Sie uns.",
      http_error: "Die Webseite hat einen Fehler statt einer Seite zurückgegeben. Prüfen Sie die Adresse.",
      not_html: "Unter dieser Adresse gibt es keine Webseite. Geben Sie die Adresse der Startseite ein.",
      too_many_redirects: "Die Webseite leitet zu oft weiter. Das ist ein Problem für Besucher und für Google.",
      rate_limited: "Zu viele Prüfungen in kurzer Zeit. Versuchen Sie es in ein paar Minuten erneut.",
      failed: "Bei uns ist etwas schiefgelaufen. Versuchen Sie es erneut oder schreiben Sie uns.",
      network: "Keine Verbindung zum Server. Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
    },
    checkedUrl: "Geprüfte Adresse",
    again: "Andere Webseite prüfen",
    cta: {
      title: "Sollen wir Ihnen zeigen, wie man das behebt?",
      text: "Hinterlassen Sie Telefonnummer oder E-Mail. Wir sehen uns Ihre Webseite an und sagen Ihnen, welche dieser Punkte am meisten bringen und wie viel Arbeit sie sind. Unverbindlich.",
      name: "Name",
      namePlaceholder: "Ihr Name",
      nameError: "Bitte schreiben Sie Ihren Namen.",
      contact: "Telefon oder E-Mail",
      contactPlaceholder: "+49 … oder name@…",
      contactError: "Schreiben Sie eine Telefonnummer oder E-Mail, damit wir antworten können.",
      submit: "Ergebnis senden",
      sending: "Wird gesendet…",
      whatsapp: "oder schreiben Sie uns auf WhatsApp",
      success: { title: "Wir haben das Ergebnis", text: "Wir antworten innerhalb von 24 Stunden mit konkreten Vorschlägen für Ihre Webseite." },
      failed: { title: "Senden nicht möglich", text: "Versuchen Sie es erneut oder schreiben Sie uns auf WhatsApp mit dem Button unten." },
    },
    labels: { check: "Webseiten-Check", score: "Ergebnis", toFix: "Zu verbessern", service: "Kostenloser Webseiten-Check", name: "Name", contact: "Kontakt" },
    waIntro: "Hallo, ich habe meine Webseite auf rafetov.com geprüft:",
  },

  nl: {
    entry: { question: "Heeft u al een website?", link: "Controleer die gratis in 1 minuut" },
    nav: "Gratis websitecheck",
    metaTitle: "Gratis websitecheck: Google, telefoon, snelheid en aanvragen | Rafetov.com",
    metaDescription: "Voer het adres van uw website in en zie in seconden wat haar tegenhoudt om aanvragen te brengen: mobiele versie, snelheid, Google-titels, contactgegevens, HTTPS. Een snelle automatische controle in gewone taal.",
    title: "Controleer uw website in één minuut",
    sub: "Voer het adres in en zie wat haar tegenhoudt om aanvragen te brengen: hoe Google haar ziet, hoe ze opent op een telefoon en hoe makkelijk men u bereikt. Een snelle automatische controle, in gewone taal.",
    urlLabel: "Adres van de website",
    urlPlaceholder: "uwwebsite.be",
    run: "Controleer",
    running: "Bezig…",
    disclaimer: "Dit is een snelle automatische controle van de startpagina, geen volledige professionele audit. Ze toont de meest voorkomende problemen die we zien bij websites van kleine bedrijven.",
    loading: { title: "We controleren {url}", text: "De pagina wordt geladen; we bekijken titels, mobiele versie, contactgegevens en Google-instellingen.", pagespeed: "Google meet de snelheid op een telefoon. Dit duurt tot 30 seconden." },
    score: { title: "Resultaat", of: "van 100", levels: { good: "De website is in goede vorm. Er blijven alleen kleine dingen over.", ok: "Er is ruimte voor verbetering zodat ze meer aanvragen brengt.", bad: "Uw website verliest aanvragen. De meeste van deze problemen zijn snel op te lossen." } },
    groups: { leads: "Aanvragen", phone: "Telefoon en snelheid", google: "Google", trust: "Vertrouwen en delen" },
    statuses: { good: "In orde", warn: "Kan beter", bad: "Te herstellen" },
    checks: {
      contact: { title: "Hoe makkelijk men u bereikt", why: "Een telefoonnummer met één tik, WhatsApp, Viber of een aanvraagformulier. Zonder die vertrekken mensen in plaats van u te schrijven." },
      viewport: { title: "Mobiele versie", why: "De meeste bezoekers komen van een telefoon. Zonder instelling voor mobiele schermen lijkt de site piepklein en zet Google haar lager." },
      pagespeed: { title: "Snelheid op een telefoon volgens Google", why: "Google meet hoe snel de pagina opent op een gewone telefoon. Een trage site verliest mensen voordat ze iets zien." },
      ttfb: { title: "Reactietijd van de server", why: "Hoe lang de browser wacht voordat de server überhaupt antwoordt. Trage hosting vertraagt alles." },
      html_size: { title: "Gewicht van de pagina", why: "Een zware pagina opent traag op mobiel internet. Meestal komt het door niet-geoptimaliseerde foto's of onnodige code." },
      img_alt: { title: "Beschrijvingen van foto's", why: "Google ziet geen foto's, het leest hun tekstbeschrijving. Zonder die zegt de pagina minder over u." },
      title: { title: "Titel van de pagina", why: "Dit is de blauwe regel in Google. Ze moet zeggen wat u doet en waar, in maximaal 60 tekens." },
      description: { title: "Beschrijving voor Google", why: "De tekst onder de titel in de resultaten. Die bepaalt of iemand op u klikt of op een concurrent." },
      h1: { title: "Hoofdtitel van de pagina", why: "Eén duidelijke hoofdtitel vertelt mensen en Google waar de pagina over gaat." },
      noindex: { title: "Indexeren toegestaan", why: "Soms blijft een site na de bouw verborgen voor Google. Dan verschijnt ze niet in de zoekresultaten, hoe goed ze ook is." },
      robots: { title: "Bestand robots.txt", why: "Vertelt Google welke delen van de site het mag doorzoeken. Een foute instelling kan de hele site verbergen." },
      sitemap: { title: "Sitemap", why: "Een lijst van uw pagina's voor Google. Helpt nieuwe pagina's sneller gevonden te worden." },
      canonical: { title: "Hoofdadres van de pagina", why: "Vertelt Google welk adres het 'echte' is wanneer een pagina op meerdere adressen opent." },
      structured_data: { title: "Gestructureerde gegevens", why: "Extra informatie over uw bedrijf in een taal die Google begrijpt: bedrijf, diensten, reviews. Geeft een rijker zoekresultaat." },
      lang: { title: "Taal van de pagina", why: "Vertelt browsers en Google in welke taal de site is. Belangrijk voor correcte weergave en vertaling." },
      https: { title: "Veilige verbinding (HTTPS)", why: "Zonder slotje toont de browser 'Niet beveiligd' en zet Google de site lager. Niemand laat daar zijn telefoonnummer achter." },
      http_redirect: { title: "Doorverwijzing naar HTTPS", why: "Als iemand het adres zonder https typt, moet de site hem zelf naar de veilige versie sturen." },
      og: { title: "Hoe het eruitziet bij delen", why: "De afbeelding en titel die verschijnen als u de link stuurt via WhatsApp, Viber of Facebook. Zonder die lijkt de link op spam." },
      favicon: { title: "Icoon van de site", why: "Het kleine icoon in de tab en in de Google-resultaten. Een klein detail dat toont dat de site onderhouden wordt." },
    },
    values: { ms: "{n} ms", kb: "{n} KB", h1: "{n} titels", imgs: "{n} zonder beschrijving van {total}", pagespeed: "{n} van 100", found: { tel: "telefoon", whatsapp: "WhatsApp", viber: "Viber", form: "formulier", email: "e-mail" } },
    pagespeedPending: "Google meet…",
    pagespeedFailed: "Google antwoordde niet op tijd. De overige controles zijn volledig.",
    errors: {
      invalid_url: "Dit lijkt niet op een webadres. Probeer bijvoorbeeld uwwebsite.be.",
      blocked: "Dit adres kan niet gecontroleerd worden. Voer een openbaar webadres in.",
      unreachable: "De website antwoordde niet. Controleer het adres of probeer het zo meteen opnieuw.",
      timeout: "De website antwoordde niet binnen 8 seconden. Dat is op zich een probleem: probeer opnieuw of schrijf ons.",
      http_error: "De website gaf een fout in plaats van een pagina. Controleer het adres.",
      not_html: "Op dit adres staat geen webpagina. Voer het adres van de startpagina in.",
      too_many_redirects: "De website verwijst te vaak door. Dat is een probleem voor bezoekers en voor Google.",
      rate_limited: "Te veel controles in korte tijd. Probeer het over een paar minuten opnieuw.",
      failed: "Er ging iets mis bij ons. Probeer opnieuw of schrijf ons.",
      network: "Geen verbinding met de server. Controleer uw internet en probeer opnieuw.",
    },
    checkedUrl: "Gecontroleerd adres",
    again: "Een andere website controleren",
    cta: {
      title: "Wilt u dat we tonen hoe het op te lossen?",
      text: "Laat een telefoonnummer of e-mail achter. We bekijken uw website en zeggen welke van deze punten het meest opbrengen en hoeveel werk ze zijn. Vrijblijvend.",
      name: "Naam",
      namePlaceholder: "Uw naam",
      nameError: "Schrijf uw naam.",
      contact: "Telefoon of e-mail",
      contactPlaceholder: "+32 … of naam@…",
      contactError: "Schrijf een telefoonnummer of e-mail zodat we kunnen antwoorden.",
      submit: "Resultaat versturen",
      sending: "Versturen…",
      whatsapp: "of stuur ons een bericht op WhatsApp",
      success: { title: "We hebben het resultaat", text: "We antwoorden binnen 24 uur met concrete voorstellen voor uw website." },
      failed: { title: "Versturen is niet gelukt", text: "Probeer opnieuw of stuur ons een bericht op WhatsApp met de knop hieronder." },
    },
    labels: { check: "Websitecheck", score: "Resultaat", toFix: "Te verbeteren", service: "Gratis websitecheck", name: "Naam", contact: "Contact" },
    waIntro: "Hallo, ik heb mijn website gecontroleerd op rafetov.com:",
  },
};
