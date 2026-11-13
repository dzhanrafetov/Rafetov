/**
 * Страница за строителни фирми и майстори (/stroitelstvo): линкът в биото на TikTok/Reels видеата
 * и целта на Meta рекламите. Само на български.
 *
 * Собствен вид (решение на собственика, 2026-11-13): графит + жълто, заглавия с Oswald, наши икони на занаятите.
 * Аудитория: мъже 30+, от телефон (главно Android, често слаб), отварят от TikTok/Facebook, често навън.
 * Затова: много кратък текст, големи букви, WhatsApp първо, без видео, без анимации и без размити сенки.
 *
 * UTM: параметрите от линка (?utm_source=tiktok…) се пазят и се добавят към вътрешните линкове.
 *
 * Резултатите са истински цифри от отчетите на Meta кампаниите (папки „Отчети реклами …“ на работния плот, 8 ное 2026).
 * Без имена на клиенти — само занаят и град. Обнови RESULTS, когато има по-нови отчети.
 */
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { track } from "@vercel/analytics";
import { ArrowRight, Check, ChevronDown, LoaderCircle, Phone, X } from "lucide-react";
import "@fontsource/oswald/cyrillic-700.css";
import "@fontsource/oswald/latin-700.css";
import { useLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { SITE_ORIGIN } from "../seo/head";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ViberIcon from "../components/ViberIcon";
import { PHONE_PATTERN, sanitizePhone } from "../components/FormField";
import sendEmail from "../service/emailService";
import { attributionLine } from "../service/attribution";
import Flag from "../components/Flag";
import TradeIcon, { type TradeKey } from "../components/TradeIcons";
import { BUSINESS, GOOGLE_REVIEWS, VIBER_HREF, whatsappHref } from "../constants/business";
import { liveShot, projectPath, projectsFor, type Project } from "../constants/projects";

export const BUILDERS_PATH = "/stroitelstvo";

const WA_TEXT = "Здравейте! Имам строителна фирма и искам сайт / реклама.";

// Цветове на страницата (графит + жълто). Контраст: текст 13:1, сив текст ~8:1, жълто ~10:1 спрямо фона.
const C = {
  bg: "#1E1E1B",
  panel: "#272723",
  line: "#3A3934",
  text: "#F5F2EA",
  muted: "#BDB8AC",
  yellow: "#FFC20E",
};
const OSWALD = { fontFamily: "Oswald, 'Arial Narrow', sans-serif", fontWeight: 700 } as const;

const TRADES: { key: TradeKey; label: string }[] = [
  { key: "roof", label: "Покриви" },
  { key: "pvc", label: "PVC дограма" },
  { key: "pergola", label: "Перголи" },
  { key: "renovation", label: "Ремонти" },
  { key: "waterproof", label: "Хидроизолация" },
  { key: "drywall", label: "Гипсокартон" },
  { key: "solar", label: "Соларни" },
  { key: "metal", label: "Метал" },
  { key: "excavation", label: "Изкопи" },
  { key: "survey", label: "Геодезия" },
];

const PAINS = [
  "Пишат „колко струва баня?“ — без снимки, без квадратура.",
  "Плащате реклама, а идват харесвания, не обаждания.",
  "Нямате сайт или е стар — клиентът звъни на друг.",
];

/** Строителните проекти: град и две-три думи какво правят. Липсващо id просто се пропуска. */
const WORK: { id: string; place: string; note: string }[] = [
  { id: "nn-bau", place: "Дуисбург", note: "Саниране, хидроизолация" },
  { id: "bk-handwerk", place: "Мюнхен", note: "PVC дограма, щори" },
  { id: "innenausbau-ahmedov", place: "Ханау", note: "Довършителни работи" },
  { id: "hh-edelstahl", place: "Берлин", note: "Неръждаема стомана" },
  { id: "gs-aluminium", place: "Русе", note: "Перголи, дограма, 3D" },
  { id: "active-solar", place: "България", note: "Фотоволтаици" },
  { id: "pachka-stil", place: "Търговище, Шумен", note: "Ремонти" },
  { id: "creative-homes", place: "София", note: "Ремонт и интериор" },
  { id: "korn-metal", place: "България", note: "Метални конструкции" },
  { id: "dudo-group", place: "България", note: "Строителни материали" },
  { id: "mig-group", place: "София", note: "Геодезия" },
  { id: "taupe", place: "София", note: "Жилищен проект" },
];

const GET = ["Сайт с вашите обекти и снимки", "Бутон за WhatsApp и обаждане", "Meta реклама към работеща форма", "Виждате колко запитвания идват"];

const TERMS = ["Фиксирана цена — до 1 час", "Виждате сайта преди пускане", "30 дни безплатни малки промени", "Сайт без месечен абонамент"];

/** Истински резултати от Meta реклами на наши клиенти (отчети до 8 ное 2026). Без имена — занаят и град. */
const RESULTS = [
  { num: "40", unit: "запитвания за 6 дни", who: "Щори и перголи · Варна", extra: "по €0,75 на запитване" },
  { num: "92", unit: "запитвания за 1 месец", who: "Фотоволтаици", extra: "" },
  { num: "10", unit: "запитвания за 4 дни", who: "Навеси и перголи · Русе", extra: "" },
  { num: "6", unit: "запитвания за 3 дни", who: "Строителна фирма · София", extra: "вече ходят на огледи" },
  { num: "12", unit: "огледа на апартаменти", who: "Нов жилищен проект · София", extra: "" },
];

/** Цени за реклама (решение на собственика, 2026-11-13): показват се само на тази страница. */
const ADS_PRICE = [
  { big: "120 €", label: "първия месец", sub: "Настройка и управление на рекламата" },
  { big: "50 €", label: "на месец след това", sub: "Управление, промени и отчети" },
  { big: "от 3,20 €", label: "на ден към Facebook", sub: "Това е минимумът. Бюджетът го избирате вие — с повече пари рекламата стига до повече хора. Плаща се директно на Facebook." },
];
/** Реален капацитет (собственикът, 2026-11-13): до 2 нови фирми на месец. Смени числото тук, ако се промени. */
const NEW_CLIENTS_PER_MONTH = 2;
/** Честна гаранция: рискуваме нашата такса за втория месец, не обещаваме резултат от Facebook. */
const GUARANTEE = "Ако през първия месец рекламата не донесе нито едно запитване, вторият месец управлението е безплатно — 0 € вместо 50 €.";
const GUARANTEE_NOTE = "При бюджет поне 3,20 € на ден към Facebook.";

const ADS_GET = ["Безплатна консултация преди старта", "Отчет с цифри всяка седмица", "Следим рекламите всеки ден", "Постоянно сме на връзка — казваме ви как вървят рекламите", "Спираме това, което не носи запитвания"];
/** Истински наши реклами (публични в Meta). Снимките са в public/builders/ads/. */
const AD_EXAMPLES: { src: string; alt: string }[] = [
  // Ради Строй първи (вижда се майсторът), после още една на Ради, после Пижо. Всички са истински наши реклами.
  { src: "/builders/ads/steni-sofia.webp", alt: "Реклама на Ради Строй за шпакловка и боядисване в София" },
  { src: "/builders/ads/banya-sofia.webp", alt: "Реклама на Ради Строй за бани и плочки в София" },
  { src: "/builders/ads/pijo-asfalt.webp", alt: "Реклама на Пижо Бригада за асфалт за двора и алеята" },
  { src: "/builders/ads/solar-smetka.webp", alt: "Реклама на Active Solar за фотоволтаици" },
  { src: "/builders/ads/gs-pergola.webp", alt: "Реклама на GS Aluminium за перголи" },
  { src: "/builders/ads/zip-shtori.webp", alt: "Реклама на Assa за зип щори" },
  { src: "/builders/ads/ch-maystorat.webp", alt: "Реклама на CreativeHomes за ремонт с един екип" },
  { src: "/builders/ads/pod-sofia.webp", alt: "Реклама на Ради Строй за подови плочки" },
  { src: "/builders/ads/pijo-paveta.webp", alt: "Реклама на Пижо Бригада за павета" },
  { src: "/builders/ads/taupe-vecher.webp", alt: "Реклама на Taupe за нов жилищен проект в София" },
  { src: "/builders/ads/gs-zimna.webp", alt: "Реклама на GS Aluminium за зимни градини" },
  { src: "/builders/ads/solar-pokriv.webp", alt: "Реклама на Active Solar: покривът ви може да плаща тока" },
  { src: "/builders/ads/maistor-samokov.webp", alt: "Реклама на Ради Строй за майстор в Самоков" },
  { src: "/builders/ads/dush-kabini.webp", alt: "Реклама на Assa за душ кабини" },
  { src: "/builders/ads/remont-interior.webp", alt: "Реклама на CreativeHomes: от визуализацията до реалността" },
  { src: "/builders/ads/pijo-bordyuri.webp", alt: "Реклама на Пижо Бригада за бордюри" },
  { src: "/builders/ads/gs-naves.webp", alt: "Реклама на GS Aluminium за навеси за кола" },
  { src: "/builders/ads/mazilka-sofia.webp", alt: "Реклама на Ради Строй за декоративни мазилки" },
  { src: "/builders/ads/taupe-fasada.webp", alt: "Реклама на Taupe за апартаменти" },
  { src: "/builders/ads/ch-edin-ekip.webp", alt: "Реклама на CreativeHomes: целият ремонт с един екип" },
];

/** Примерен седмичен отчет: истински цифри от отчет на клиент (щори и перголи, Варна, 2–7 ное 2026), без името. */
const REPORT = {
  period: "2–7 ноември",
  rows: [
    { k: "Похарчени", v: "29,83 €" },
    { k: "Запитвания", v: "40" },
    { k: "Цена на запитване", v: "0,75 €" },
    { k: "Миналата седмица", v: "31 по 1,21 €" },
  ],
  best: "Най-добра реклама: прозрачни щори — 19 запитвания",
};

const STEPS = ["Пишете ни в WhatsApp", "Оферта до 1 час", "Сайтът и рекламата тръгват"];

const FAQ = [
  { q: "Колко струва?", a: "Реклама: 120 € първия месец, после 50 € на месец, плюс бюджет към Facebook по ваш избор (минимум 3,20 € на ден). Сайт: фиксирана цена след кратък разговор." },
  { q: "За колко време?", a: "Сайт — около 1–2 седмици. Само реклама — пускаме я, щом одобрите визиите." },
  { q: "Какво трябва от мен?", a: "Снимки от обекти (от телефона стават) и какво работите. Текстовете ги пишем ние." },
  { q: "За какви фирми правите реклами?", a: "Ремонти, бани и плочки, перголи и щори, фотоволтаици, асфалт и павета, нови жилищни сгради и други. Ако сте в строителството — пишете ни." },
  { q: "Работите ли за фирми в Германия?", a: "Да. Говорим на български, сайтът е на немски или на няколко езика." },
];

/** Параметрите от линка, които трябва да стигнат до следващата страница (utm_*, ref, fbclid, ttclid). */
function useCarryParams(): string {
  const [qs, setQs] = useState("");
  useEffect(() => {
    const keep = new URLSearchParams();
    new URLSearchParams(window.location.search).forEach((v, k) => {
      if (k.startsWith("utm_") || k === "ref" || k === "fbclid" || k === "ttclid") keep.set(k, v);
    });
    setQs(keep.toString());
  }, []);
  return qs;
}

const withQs = (path: string, qs: string) => (qs ? `${path}${path.includes("?") ? "&" : "?"}${qs}` : path);

const focus = "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#FFC20E]";
const btnYellow = `inline-flex min-h-[60px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#FFC20E] px-6 text-[19px] uppercase tracking-[0.02em] text-[#1E1E1B] active:translate-y-px ${focus}`;
const btnGhost = `inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#3A3934] px-6 text-[17px] font-semibold text-[#F5F2EA] active:translate-y-px ${focus}`;
const h2 = "text-[clamp(1.9rem,8vw,2.8rem)] text-balance uppercase leading-[1.18] tracking-[0.01em] text-[#F5F2EA]";

export default function Builders() {
  const { t, setAlternates } = useLang();
  const qs = useCarryParams();
  const src = new URLSearchParams(qs).get("utm_source") ?? "";

  useSeo({
    title: "Сайт и реклама за строителни фирми | Rafetov",
    description: "Сайтове и Meta реклами за строителни фирми и майстори в България и Германия. Реални обекти, WhatsApp бутон, оферта до 1 час.",
    path: BUILDERS_PATH,
    alternates: { bg: BUILDERS_PATH },
    image: liveShot("nn-bau") ?? undefined,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Сайт и Meta реклама за строителни фирми",
        serviceType: "Изработка на сайт и Meta реклама",
        audience: { "@type": "BusinessAudience", name: "Строителни фирми и майстори" },
        areaServed: ["BG", "DE", "AT", "BE", "NL"],
        url: `${SITE_ORIGIN}${BUILDERS_PATH}`,
        provider: { "@id": `${SITE_ORIGIN}/#organization` },
        inLanguage: "bg",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  });

  // Само на български: превключвателят на език води към началната страница на другия език (не към 404).
  useEffect(() => {
    setAlternates({ bg: BUILDERS_PATH, en: "/", de: "/", nl: "/" });
  }, [setAlternates]);

  const all = projectsFor("bg");
  const work = WORK.map((w) => ({ ...w, p: all.find((p) => p.id === w.id) })).filter((x): x is typeof x & { p: Project } => !!x.p);

  const wa = whatsappHref(WA_TEXT);
  // Долната лента се показва чак когато бутонът WhatsApp в началото излезе от екрана — иначе са два един под друг.
  const heroCta = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const el = heroCta.current;
    if (!el || typeof IntersectionObserver === "undefined") return setShowBar(true);
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const onCta = (cta: string) => () => track("builders_cta", { cta, src: src || "direct" });

  const WaButton = ({ where }: { where: string }) => (
    <a href={wa} target="_blank" rel="noopener noreferrer" onClick={onCta(`${where}_whatsapp`)} className={btnYellow} style={OSWALD}>
      <WhatsAppIcon className="h-6 w-6" /> Пишете в WhatsApp
    </a>
  );
  const ViberButton = ({ where }: { where: string }) => (
    <a href={VIBER_HREF} target="_blank" rel="noopener noreferrer" onClick={onCta(`${where}_viber`)} className={btnGhost}>
      <ViberIcon className="h-6 w-6 text-[#A78BFA]" /> Пишете във Viber
    </a>
  );

  return (
    <main style={{ backgroundColor: C.bg, color: C.text }} className="pb-6 text-[17px] leading-[1.5]">
      {/* ── Хиро ── */}
      <header className="mx-auto max-w-xl px-4 pb-12 pt-24 text-center sm:pt-32">
        <div aria-hidden className="mx-auto mb-7 h-2 w-24 rounded-sm" style={{ background: `repeating-linear-gradient(-45deg, ${C.yellow} 0 8px, ${C.bg} 8px 16px)` }} />
        <h1 style={OSWALD} className="text-[clamp(2.5rem,11.5vw,4rem)] text-balance uppercase leading-[1.12] tracking-[0.005em]">
          Сайт и реклама, които носят <span style={{ color: C.yellow }}>обаждания</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[30ch] text-[19px] leading-snug" style={{ color: C.muted }}>
          За строителни фирми и майстори. Отговаряме до 20 минути в работно време.
        </p>
        <div ref={heroCta} className="mt-8 flex flex-col gap-3">
          <WaButton where="hero" />
          <a href="#b-work-s" onClick={onCta("hero_projects")} className={btnGhost}>
            Вижте наши проекти <ChevronDown className="h-5 w-5" aria-hidden />
          </a>
        </div>
        <p className="mt-5 text-[15px]" style={{ color: C.muted }}>
          <span style={{ color: C.yellow }} aria-hidden>★★★★★</span> {GOOGLE_REVIEWS.rating.toFixed(1)} в Google · {GOOGLE_REVIEWS.count} отзива
        </p>
      </header>

      {/* ── Резултати: доказателството веднага след обещанието ── */}
      <section className="mx-auto max-w-3xl px-4 pb-14" aria-labelledby="b-results">
        <h2 id="b-results" style={OSWALD} className={`text-center ${h2}`}>
          Реални <span style={{ color: C.yellow }}>резултати</span>
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-5">
          {RESULTS.map((r) => (
            <li key={r.who} className="flex flex-col rounded-xl border p-4 text-center last:odd:col-span-2 md:last:odd:col-span-1" style={{ background: C.panel, borderColor: C.line }}>
              <span style={{ ...OSWALD, color: C.yellow }} className={`${r.num.length > 3 ? "text-[34px]" : "text-[46px]"} leading-none uppercase`}>{r.num}</span>
              <span style={OSWALD} className="mt-1.5 text-[17px] uppercase leading-tight">{r.unit}</span>
              <span className="mt-2 text-[14px] leading-snug" style={{ color: C.muted }}>{r.who}</span>
              {r.extra && <span className="mt-1 text-[13.5px] font-semibold leading-snug" style={{ color: C.text }}>{r.extra}</span>}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-[13.5px] leading-snug" style={{ color: C.muted }}>
          Meta реклами на наши клиенти, октомври–ноември 2026. Запитване = човек, оставил телефон или попълнил форма.
        </p>
      </section>

      {/* ── За кого ── */}
      <section className="mx-auto max-w-3xl px-4 pb-14" aria-labelledby="b-trades">
        <h2 id="b-trades" style={OSWALD} className={`text-center ${h2}`}>Правим сайтове за</h2>
        <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
          {TRADES.map((tr) => (
            <li key={tr.key} className="flex items-center gap-2.5 rounded-xl border px-2.5 py-3 sm:flex-col sm:gap-2 sm:py-4" style={{ background: C.panel, borderColor: C.line }}>
              <TradeIcon name={tr.key} className="h-8 w-8 shrink-0" />
              <span style={OSWALD} className="min-w-0 text-[15px] uppercase leading-tight tracking-[0.01em] sm:text-[17px]">{tr.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Болката ── */}
      <section className="mx-auto max-w-xl px-4 pb-14" aria-labelledby="b-pain">
        <h2 id="b-pain" style={OSWALD} className={`text-center ${h2}`}>Познато ли ви е?</h2>
        <ul className="mt-6 space-y-2.5">
          {PAINS.map((p) => (
            <li key={p} className="flex items-start gap-3 rounded-xl border p-4 text-[18px] leading-snug" style={{ background: C.panel, borderColor: C.line }}>
              <X className="mt-0.5 h-6 w-6 shrink-0 text-[#FF6B5E]" strokeWidth={3} aria-hidden />
              {p}
            </li>
          ))}
        </ul>
        <p style={OSWALD} className="mt-6 text-center text-[26px] uppercase leading-tight">
          Ние го <span style={{ color: C.yellow }}>оправяме.</span>
        </p>
      </section>

      {/* ── Нашите строителни сайтове ── */}
      <section id="b-work-s" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-14" aria-labelledby="b-work">
        <h2 id="b-work" style={OSWALD} className={`text-center ${h2}`}>
          Наши сайтове на <span style={{ color: C.yellow }}>строители</span>
        </h2>
        <p className="mt-3 text-center text-[17px]" style={{ color: C.muted }}>В България и Германия. Отворете ги — истински са.</p>
        <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {work.map(({ p, place, note }) => {
            const title = t.work.titles?.[p.id] ?? p.title;
            return (
              <li key={p.id}>
                <RouterLink to={withQs(projectPath(p, "bg"), qs)} className={`flex h-full flex-col overflow-hidden rounded-xl border ${focus}`} style={{ background: C.panel, borderColor: C.line }}>
                  <img src={p.img} alt={`Сайтът на ${title}`} width={450} height={295} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top" style={{ background: C.bg }} />
                  <span className="flex flex-1 flex-col items-center p-2.5 text-center sm:items-start sm:p-3 sm:text-left">
                    <span style={OSWALD} className="text-[16px] uppercase leading-tight tracking-[0.02em] sm:text-[18px]">{title}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-[13.5px]" style={{ color: C.muted }}>
                      {p.country && <Flag code={p.country} className="h-3 w-[18px] shrink-0 rounded-[2px]" />}
                      {place}
                    </span>
                    <span className="mt-0.5 text-[13.5px] leading-snug" style={{ color: C.muted }}>{note}</span>
                    <span style={{ ...OSWALD, color: C.yellow }} className="mt-auto flex items-center gap-1 pt-2.5 text-[15px] uppercase tracking-[0.03em]">
                      Вижте проекта <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </span>
                </RouterLink>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Какво получавате + без риск ── */}
      <section className="mx-auto grid max-w-4xl gap-3 px-4 pb-14 md:grid-cols-2" aria-label="Какво получавате">
        {[
          { title: "Какво получавате", items: GET },
          { title: "Ясни условия", items: TERMS },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl border p-5" style={{ background: C.panel, borderColor: C.line }}>
            <h2 style={OSWALD} className="text-center text-[26px] uppercase leading-tight md:text-left">{b.title}</h2>
            <ul className="mx-auto mt-4 w-fit space-y-3 md:mx-0">
              {b.items.map((it) => (
                <li key={it} className="flex items-start gap-3 text-[18px] leading-snug">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: C.yellow }}>
                    <Check className="h-4 w-4 text-[#1E1E1B]" strokeWidth={3.5} aria-hidden />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* ── Само реклама: цени, примерни реклами, примерен отчет ── */}
      <section id="b-ads" className="mx-auto max-w-4xl scroll-mt-20 px-4 pb-14" aria-labelledby="b-ads-h">
        <h2 id="b-ads-h" style={OSWALD} className={`text-center ${h2}`}>
          Нямате бюджет за сайт? <span style={{ color: C.yellow }}>Започнете с реклама.</span>
        </h2>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-3">
          {ADS_PRICE.map((p) => (
            <li key={p.label} className="rounded-xl border p-4 text-center" style={{ background: C.panel, borderColor: C.line }}>
              <p style={{ ...OSWALD, color: C.yellow }} className="text-[40px] leading-none">{p.big}</p>
              <p style={OSWALD} className="mt-1.5 text-[18px] uppercase leading-tight">{p.label}</p>
              <p className="mt-1.5 text-[14.5px] leading-snug" style={{ color: C.muted }}>{p.sub}</p>
            </li>
          ))}
        </ul>
        <ul className="mx-auto mt-5 grid w-fit gap-2.5 sm:w-auto sm:grid-cols-2">
          {ADS_GET.map((it) => (
            <li key={it} className="flex items-center gap-3 text-[18px] leading-snug">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: C.yellow }}>
                <Check className="h-4 w-4 text-[#1E1E1B]" strokeWidth={3.5} aria-hidden />
              </span>
              {it}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-6 max-w-xl rounded-2xl border-2 p-5 text-center" style={{ borderColor: C.yellow, background: C.panel }}>
          <p style={{ ...OSWALD, color: C.yellow }} className="text-[24px] uppercase leading-tight">Честна гаранция</p>
          <p className="mt-2 text-[18px] font-semibold leading-snug">{GUARANTEE}</p>
          <p className="mt-2 text-[14.5px]" style={{ color: C.muted }}>{GUARANTEE_NOTE}</p>
        </div>
        <p className="mt-4 text-center text-[16px] font-semibold">
          Поемаме до <span style={{ color: C.yellow }}>{NEW_CLIENTS_PER_MONTH} нови фирми</span> на месец — за да отделим нужното внимание на всяка.
        </p>

        <h3 style={OSWALD} className="mt-10 text-center text-[24px] uppercase leading-tight">Ето така изглеждат нашите реклами</h3>
        <ul className="-mx-4 mt-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
          {AD_EXAMPLES.map((a) => (
            <li key={a.src} className="w-[62%] shrink-0 snap-start sm:w-auto">
              <img src={a.src} alt={a.alt} width={480} height={600} loading="lazy" decoding="async" className="aspect-[4/5] w-full rounded-xl border object-cover" style={{ borderColor: C.line, background: C.panel }} />
            </li>
          ))}
        </ul>
        <p className="mt-1 text-center text-[13.5px] sm:hidden" style={{ color: C.muted }}>Плъзнете настрани →</p>

        <h3 style={OSWALD} className="mt-10 text-center text-[24px] uppercase leading-tight">Така ги виждат клиентите ви</h3>
        <p className="mt-2 text-center text-[16px]" style={{ color: C.muted }}>Във Facebook и Instagram — в стената и като история.</p>
        <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center">
          <FeedMock />
          <StoryMock />
        </div>

        <h3 style={OSWALD} className="mt-10 text-center text-[24px] uppercase leading-tight">Всяка седмица получавате отчет</h3>
        <div className="mx-auto mt-4 max-w-sm overflow-hidden rounded-2xl border" style={{ background: "#F5F2EA", borderColor: C.line, color: "#1E1E1B" }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ background: C.yellow }}>
            <span style={OSWALD} className="text-[18px] uppercase">Отчет за рекламите</span>
            <span className="text-[14px] font-semibold">{REPORT.period}</span>
          </div>
          <dl className="divide-y divide-[#1E1E1B]/10 px-4">
            {REPORT.rows.map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-3 py-2.5">
                <dt className="text-[16px]">{row.k}</dt>
                <dd style={OSWALD} className="text-[22px] leading-none">{row.v}</dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-[#1E1E1B]/10 px-4 py-3 text-[15px] font-semibold">{REPORT.best}</p>
        </div>
        <p className="mt-2 text-center text-[13.5px]" style={{ color: C.muted }}>Истински отчет на наш клиент (щори и перголи, Варна).</p>
      </section>

      {/* ── 3 стъпки ── */}
      <section className="mx-auto max-w-xl px-4 pb-14" aria-labelledby="b-steps">
        <h2 id="b-steps" style={OSWALD} className={`text-center ${h2}`}>Как става</h2>
        <ol className="mt-6 space-y-2.5">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-4 rounded-xl border p-4" style={{ background: C.panel, borderColor: C.line }}>
              <span style={{ ...OSWALD, background: C.yellow }} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[24px] text-[#1E1E1B]">{i + 1}</span>
              <span className="text-[19px] font-semibold leading-snug">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Въпроси ── */}
      <section className="mx-auto max-w-xl px-4 pb-14" aria-labelledby="b-faq">
        <h2 id="b-faq" style={OSWALD} className={`text-center ${h2}`}>Въпроси</h2>
        <div className="mt-6 space-y-2.5">
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0} className="group rounded-xl border" style={{ background: C.panel, borderColor: C.line }}>
              <summary className={`flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 text-[18px] font-semibold ${focus} [&::-webkit-details-marker]:hidden`}>
                {f.q}
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform group-open:rotate-180" style={{ color: C.yellow }} aria-hidden />
              </summary>
              <p className="px-4 pb-4 text-[17px] leading-snug" style={{ color: C.muted }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Форма „звъним ние“: за тези, които не искат да пишат ── */}
      <section className="mx-auto max-w-xl px-4 pb-14" aria-labelledby="b-call">
        <div className="rounded-2xl border p-5" style={{ background: C.panel, borderColor: C.line }}>
          <h2 id="b-call" style={OSWALD} className="text-center text-[28px] uppercase leading-tight">
            Нямате време да пишете? <span style={{ color: C.yellow }}>Ние звъним.</span>
          </h2>
          <CallbackForm onSent={() => track("builders_lead", { src: src || "direct" })} />
        </div>
      </section>

      {/* ── Финал ── */}
      <section className="mx-auto max-w-xl px-4 pb-16 text-center" aria-labelledby="b-cta">
        <h2 id="b-cta" style={OSWALD} className={h2}>
          Пишете ни. <span style={{ color: C.yellow }}>Отговаряме до 20 минути.</span>
        </h2>
        <p className="mt-3 text-[16px]" style={{ color: C.muted }}>Поемаме до {NEW_CLIENTS_PER_MONTH} нови фирми на месец — за да отделим нужното внимание на всяка.</p>
        <div className="mt-7 flex flex-col gap-3">
          <WaButton where="final" />
          <ViberButton where="final" />
        </div>
      </section>

      {/* ── Лепкава лента на телефон: WhatsApp + обаждане (заменя общата лента на сайта тук) ── */}
      <div aria-hidden={!showBar} className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t px-3 pt-2.5 transition-transform duration-200 lg:hidden ${showBar ? "translate-y-0" : "pointer-events-none translate-y-full"}`} style={{ background: C.bg, borderColor: C.line, paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom, 0px))" }}>
        <a href={wa} target="_blank" rel="noopener noreferrer" onClick={onCta("bar_whatsapp")} className={`flex h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#FFC20E] text-[18px] uppercase text-[#1E1E1B] ${focus}`} style={OSWALD}>
          <WhatsAppIcon className="h-6 w-6" /> WhatsApp
        </a>
        <a href={VIBER_HREF} target="_blank" rel="noopener noreferrer" onClick={onCta("bar_viber")} aria-label="Пишете във Viber" className={`flex h-[52px] w-[56px] items-center justify-center rounded-xl border-2 ${focus}`} style={{ borderColor: C.line }}>
          <ViberIcon className="h-6 w-6 text-[#A78BFA]" />
        </a>
        <a href={BUSINESS.phoneHref} onClick={onCta("bar_phone")} aria-label={`Обадете се: ${BUSINESS.phone}`} className={`flex h-[52px] w-[56px] items-center justify-center rounded-xl border-2 ${focus}`} style={{ borderColor: C.line, color: C.text }}>
          <Phone className="h-6 w-6" aria-hidden />
        </a>
      </div>
    </main>
  );
}

const PHONE_RE = new RegExp(`^(?:${PHONE_PATTERN})$`);

/** Две полета: телефон (задължително) и име (по желание). Отива в Telegram (/api/lead) и по имейл като резерва. */
function CallbackForm({ onSent }: { onSent: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [trap, setTrap] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (state === "sending") return;
    if (!PHONE_RE.test(phone.trim())) {
      setError("Напишете телефон, на който да ви звъннем.");
      document.getElementById("b-phone")?.focus();
      return;
    }
    if (trap) return setState("sent");
    setState("sending");
    const message = `Строителна фирма — иска обаждане (страница за строители).\n\n${attributionLine()}`;
    const service = "Сайт / реклама за строителна фирма";
    const viaTelegram = async () => {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: "", service, reply: "Обаждане", message, lang: "bg", page: window.location.pathname, source: "builders", website: trap }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error(`lead ${res.status}`);
    };
    const viaEmail = () => sendEmail({ name: name.trim() || "—", email: "", phone: phone.trim(), service, message });
    const results = await Promise.allSettled([viaTelegram(), viaEmail()]);
    if (results.some((r) => r.status === "fulfilled")) {
      setState("sent");
      onSent();
    } else {
      setState("failed");
    }
  };

  if (state === "sent") {
    return (
      <p role="status" className="mt-5 flex items-center justify-center gap-2 text-center text-[19px] font-semibold">
        <Check className="h-6 w-6 shrink-0" style={{ color: C.yellow }} strokeWidth={3} aria-hidden /> Готово. Ще ви звъннем.
      </p>
    );
  }

  const field = `h-14 w-full rounded-xl border-2 px-4 text-[18px] text-[#F5F2EA] placeholder:text-[#8F8A7F] focus:border-[#FFC20E] focus:outline-none`;
  return (
    <form onSubmit={submit} noValidate className="mt-5 space-y-3">
      <div>
        <label htmlFor="b-phone" className="mb-1.5 block text-[16px] font-semibold">Телефон</label>
        <input
          id="b-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="08X XXX XXXX" value={phone}
          onChange={(e) => { setPhone(sanitizePhone(e.target.value)); setError(""); }}
          aria-invalid={!!error} aria-describedby={error ? "b-phone-err" : undefined}
          className={field} style={{ background: C.bg, borderColor: error ? "#FF6B5E" : C.line }}
        />
        {error && <p id="b-phone-err" role="alert" className="mt-1.5 text-[15px] text-[#FF8A80]">{error}</p>}
      </div>
      <div>
        <label htmlFor="b-name" className="mb-1.5 block text-[16px] font-semibold">Име <span className="font-normal" style={{ color: C.muted }}>(по желание)</span></label>
        <input id="b-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} style={{ background: C.bg, borderColor: C.line }} />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} className="hidden" aria-hidden />
      <button type="submit" disabled={state === "sending"} className={btnYellow} style={OSWALD}>
        {state === "sending" ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden /> : <Phone className="h-5 w-5" aria-hidden />}
        {state === "sending" ? "Изпращаме…" : "Обадете ми се"}
      </button>
      {state === "failed" && (
        <p role="alert" className="text-center text-[15px] text-[#FF8A80]">Не се изпрати. Пишете ни в WhatsApp или звъннете на {BUSINESS.phone}.</p>
      )}
    </form>
  );
}

/** Как изглежда спонсорирана публикация във Facebook (пример с истинска наша реклама). Само HTML/CSS, без снимки на интерфейса. */
function FeedMock() {
  return (
    <figure className="w-full max-w-[320px]">
      <div className="overflow-hidden rounded-2xl border bg-white text-[#050505]" style={{ borderColor: C.line }}>
        <div className="flex items-center gap-2.5 px-3 pb-2 pt-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E1E1B] text-[11px] font-bold text-[#FFC20E]">ПБ</span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[14.5px] font-semibold">Пижо Бригада</span>
            <span className="block text-[12.5px] text-[#65676B]">Спонсорирано · 🌐</span>
          </span>
        </div>
        <p className="px-3 pb-2 text-[14px] leading-snug">Асфалт, павета и бордюри за двора и алеята. София и околността — безплатен оглед и оферта.</p>
        <img src="/builders/ads/pijo-asfalt.webp" alt="Реклама на Пижо Бригада за асфалт във Facebook" width={480} height={600} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
        <div className="flex items-center justify-between gap-2 bg-[#F0F2F5] px-3 py-2.5">
          <span className="min-w-0 leading-tight">
            <span className="block text-[11.5px] uppercase text-[#65676B]">Форма</span>
            <span className="block truncate text-[14px] font-semibold">Безплатен оглед и оферта</span>
          </span>
          <span className="shrink-0 rounded-md bg-[#E4E6EB] px-3 py-2 text-[13.5px] font-semibold">Научете повече</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-[14px]" style={{ color: C.muted }}>В стената</figcaption>
    </figure>
  );
}

/** Как изглежда реклама като история (Stories) — вертикална, на цял екран. */
function StoryMock() {
  return (
    <figure className="w-[230px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border bg-black" style={{ borderColor: C.line }}>
        <img src="/builders/ads/story-ch-video.webp" alt="Видео реклама на CreativeHomes като история в Instagram" width={420} height={747} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent px-2.5 pb-6 pt-2">
          <div className="h-[3px] rounded-full bg-white/40"><div className="h-full w-2/5 rounded-full bg-white" /></div>
          <div className="mt-2 flex items-center gap-2 text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B08D57] text-[10px] font-bold">CH</span>
            <span className="text-[12.5px] font-semibold leading-tight">CreativeHomes<span className="block font-normal opacity-80">Спонсорирано</span></span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3">
          <span className="rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-[#050505]">⌃ Научете повече</span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-[14px]" style={{ color: C.muted }}>Като история</figcaption>
    </figure>
  );
}
