import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { useLang } from "../i18n";
import type { ReviewLang, ReviewTag } from "../i18n/types";
import { GOOGLE_REVIEWS } from "../constants/business";
import { GoogleG, Stars } from "../components/GoogleRating";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

type Review = {
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
const REVIEWS: Review[] = [
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

/** Толкова отзива се виждат в мрежата (таблет/десктоп), преди „Покажи още“. */
const INITIAL = 6;

const ACCENTS = ["#22D3EE", "#34D399", "#A78BFA", "#FBBF24"];

type CardVariant = "grid" | "rail";

const CARD_CLS: Record<CardVariant, string> = {
  grid: "border-white/[0.08] bg-white/[0.03] p-6",
  rail: "w-[86%] max-w-[420px] shrink-0 snap-center border-white/[0.07] bg-white/[0.025] p-5",
};

function ReviewCard({ r, i, variant }: { r: Review; i: number; variant: CardVariant }) {
  const { t, lang } = useLang();
  const accent = ACCENTS[i % ACCENTS.length];
  const body = useRef<HTMLQuoteElement>(null);
  const [open, setOpen] = useState(false);
  // Бутонът „Прочети целия“ се показва само ако съкратеният текст наистина е отрязан.
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = body.current;
    if (!el || open) return;
    const check = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  // В лентата не анимираме всяка карта: изместените надолу (y) карти извън екрана правят лентата по-висока
  // и тя започва да се скролва вертикално. Там се появява цялата лента наведнъж.
  const reveal = variant === "grid" && {
    variants: fade,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.15 },
    custom: (i % 3) + 1,
  };

  return (
    <motion.figure
      data-review={variant === "rail" || undefined}
      {...reveal}
      className={`relative flex flex-col overflow-hidden rounded-2xl border ${CARD_CLS[variant]}`}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      <div className="flex h-6 items-center justify-between gap-3">
        <Stars />
        {r.tag ? (
          <span
            className="truncate rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider"
            style={{
              background: `color-mix(in srgb, ${accent} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accent} 24%, transparent)`,
              color: accent,
            }}
          >
            {t.reviews.tags[r.tag]}
          </span>
        ) : (
          <GoogleG className="h-4 w-4 opacity-80" />
        )}
      </div>

      {/* Най-силният откъс като заглавие — за да се разбере отзивът и без да се чете целият. */}
      {r.highlight && (
        <p lang={r.lang} className="mt-4 text-[16px] font-bold leading-snug text-slate-50">
          „{r.highlight}“
        </p>
      )}

      <blockquote
        ref={body}
        lang={r.lang}
        className={`whitespace-pre-line text-[14px] leading-relaxed text-slate-400 ${r.highlight ? "mt-2" : "mt-4"} ${open ? "" : "line-clamp-4"}`}
      >
        {r.text}
      </blockquote>

      {(clamped || open) && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-2 self-start text-[13px] font-semibold text-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:underline"
        >
          {open ? t.reviews.less : t.reviews.more}
        </button>
      )}

      <div aria-hidden className="grow" />
      <figcaption className="mt-4 flex items-center gap-3 border-t border-white/[0.06] pt-4">
        <span
          aria-hidden
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[14px] font-bold uppercase"
          style={{
            background: `color-mix(in srgb, ${accent} 14%, transparent)`,
            border: `1px solid color-mix(in srgb, ${accent} 26%, transparent)`,
            color: accent,
          }}
        >
          {r.name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-bold text-slate-100">{r.name}</span>
          <span className="block truncate text-[12px] text-slate-500">
            {[r.company, r.lang !== lang && `${t.reviews.original} ${t.reviews.langs[r.lang]}`].filter(Boolean).join(" · ")}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

export default function Reviews() {
  const { t, lang } = useLang();
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const rating = GOOGLE_REVIEWS.rating.toLocaleString(lang, { minimumFractionDigits: 1 });

  const cards = () => Array.from(scroller.current?.querySelectorAll<HTMLElement>("[data-review]") ?? []);

  // На телефон отзивите са в хоризонтална лента — следим коя карта е в центъра.
  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const dist = (c: HTMLElement) => Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
    const all = cards();
    const best = all.reduce((b, c, i) => (dist(c) < dist(all[b]) ? i : b), 0);
    setActive(best);
  }, []);

  const go = useCallback((i: number) => {
    const el = scroller.current;
    const card = cards()[Math.max(0, Math.min(REVIEWS.length - 1, i))];
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  }, []);

  const [showAll, setShowAll] = useState(false);
  const hidden = REVIEWS.length - INITIAL;

  const arrowCls = `inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] text-slate-300
    transition-colors duration-200 hover:bg-white/[0.07] disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20`;

  return (
    <section
      id="reviews"
      className="relative isolate overflow-hidden text-slate-200"
      style={{ backgroundColor: "#07090f", ["--hairline" as any]: "#1a2234" }}
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
          [background-size:28px_28px]" />
        <div className="absolute -left-60 top-24 h-[480px] w-[480px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle,#FBBF24 0%,transparent 65%)" }} />
        <div className="absolute -right-60 bottom-24 h-[420px] w-[420px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle,#22D3EE 0%,transparent 65%)" }} />
      </div>

      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">

        {/* Header */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            {t.reviews.eyebrow}
          </span>
          <h2 className="balance mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100">
            {t.reviews.h2a}{" "}
            <span className="gradient-text">
              {t.reviews.h2b}
            </span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-slate-400">
            {t.reviews.sub}
          </p>

          {/* Rating badge */}
          <a
            href={GOOGLE_REVIEWS.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 transition-colors duration-200 hover:border-white/[0.15] hover:bg-white/[0.06]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <GoogleG className="h-7 w-7" />
            <span className="text-[1.75rem] font-extrabold leading-none text-slate-100">{rating}</span>
            <span className="flex flex-col items-start gap-1">
              <Stars />
              <span className="text-[12px] font-medium text-slate-400">
                {t.reviews.count.replace("{n}", String(GOOGLE_REVIEWS.count))}
              </span>
            </span>
          </a>
        </motion.div>

        {/* Телефон: всички отзиви в една лента, която се плъзга с пръст. */}
        <motion.div
          ref={scroller}
          onScroll={onScroll}
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }}
          className="relative -mx-5 mt-10 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-5 pb-2 sm:-mx-6 sm:px-6
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
        >
          {REVIEWS.map((r, i) => (
            <ReviewCard key={r.name} r={r} i={i} variant="rail" />
          ))}
        </motion.div>

        {/* Навигация за лентата — само под md */}
        <div className="mt-5 flex items-center justify-center gap-4 md:hidden">
          <button type="button" aria-label={t.reviews.prev} onClick={() => go(active - 1)} disabled={active === 0} className={arrowCls}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <span className="min-w-[4.5rem] text-center text-[13px] font-semibold tabular-nums text-slate-400" aria-live="polite">
            {active + 1} / {REVIEWS.length}
          </span>
          <button type="button" aria-label={t.reviews.next} onClick={() => go(active + 1)} disabled={active === REVIEWS.length - 1} className={arrowCls}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>

        {/* Таблет и десктоп: мрежа с най-силните отзиви, останалите — с бутон. */}
        <div className="mt-12 hidden md:block">
          <div className="grid grid-cols-2 items-stretch gap-5 lg:grid-cols-3">
            {(showAll ? REVIEWS : REVIEWS.slice(0, INITIAL)).map((r, i) => (
              <ReviewCard key={r.name} r={r} i={i} variant="grid" />
            ))}
          </div>
          {!showAll && hidden > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-6 text-[14px] font-semibold text-slate-300
                           transition-colors duration-200 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-slate-100
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                {t.reviews.showMore.replace("{n}", String(hidden))}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }}
          className="mt-10 flex flex-col items-center gap-4 text-center md:mt-14"
        >
          <p className="text-[1.15rem] font-extrabold text-slate-100">{t.reviews.ctaTitle}</p>
          <div className="flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
            <ScrollLink
              to="contact"
              smooth
              duration={220}
              offset={-70}
              className="group relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full px-7 text-[14px] font-bold text-[#03060d]
                         shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.75)]
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              style={{ background: "linear-gradient(135deg, #34d9f0 0%, #0ea5e9 55%, #0284c7 100%)" }}
            >
              <span aria-hidden className="absolute inset-0 -skew-x-[20deg] -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{t.reviews.cta}</span>
              <svg viewBox="0 0 24 24" className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </ScrollLink>
            <a
              href={GOOGLE_REVIEWS.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-6 text-[14px] font-semibold text-slate-300
                         transition-colors duration-200 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-slate-100
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              <GoogleG className="h-4 w-4" />
              {t.reviews.viewAll}
            </a>
          </div>
        </motion.div>

      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .balance { text-wrap: balance; }
      `}</style>
    </section>
  );
}
