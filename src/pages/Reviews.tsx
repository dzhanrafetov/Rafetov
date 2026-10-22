import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n";
import { REVIEWS, type Review } from "../constants/reviews";
import { GOOGLE_REVIEWS, googleReviewsUrl } from "../constants/business";
import { GoogleG, Stars } from "../components/GoogleRating";
import { REVIEW_TRANSLATIONS } from "./reviewTranslations";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** Толкова отзива се виждат в мрежата (таблет/десктоп), преди „Покажи още“. */
const INITIAL = 3;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Последната дума се слепва с предходната, за да не остава самотна на нов ред. */
const glue = (s: string) => s.replace(/[ \t]+(\S+)$/gm, "\u00A0$1");

type CardVariant = "grid" | "rail";

const CARD_CLS: Record<CardVariant, string> = {
  grid: "mb-5 break-inside-avoid p-7",
  rail: "w-[86%] max-w-[420px] shrink-0 snap-center p-5",
};

function ReviewCard({ r, i, variant }: { r: Review; i: number; variant: CardVariant }) {
  const { t, lang } = useLang();
  const [showTr, setShowTr] = useState(false);
  const body = useRef<HTMLQuoteElement>(null);
  const [open, setOpen] = useState(false);
  // „Прочети целия“ се показва само ако съкратеният текст наистина е отрязан.
  const [clamped, setClamped] = useState(false);

  // Превод на езика на сайта — само ако отзивът е на друг език.
  const tr = r.lang !== lang ? REVIEW_TRANSLATIONS[r.name]?.[lang] : undefined;
  const translated = showTr && tr;
  const highlight = translated ? tr.highlight ?? r.highlight : r.highlight;
  const text = translated ? tr.text : r.text;
  const shownLang = translated ? lang : r.lang;

  // Мери се синхронно след всяка смяна на текста (без мигане на бутона), после при преоразмеряване и след зареждане на шрифта.
  useIsoLayoutEffect(() => {
    const el = body.current;
    if (!el || open) return;
    const check = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    document.fonts?.ready.then(check);
    return () => ro.disconnect();
  }, [open, showTr, lang]);

  // В лентата не анимираме всяка карта: изместените надолу (y) карти извън екрана правят лентата по-висока
  // и тя започва да се скролва вертикално. Там се появява цялата лента наведнъж.
  const reveal = variant === "grid" && {
    variants: fade,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.1 },
    custom: (i % 3) + 1,
  };

  return (
    <motion.figure
      data-review={variant === "rail" || undefined}
      {...reveal}
      whileHover={variant === "grid" ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] transition-colors duration-300 hover:border-white/[0.12] ${CARD_CLS[variant]}`}
    >
      {/* Един тих ред: звезди + Google вляво, етикетът (ако има) вдясно като обикновен текст.
          Без цветни пилчета и без декоративни кавички — карти с еднакъв тон, за да се чете самият отзив. */}
      <div className="relative flex h-6 items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2">
          <GoogleG className="h-4 w-4" />
          <Stars />
        </span>
        {r.tag && (
          <span className="truncate text-[12px] font-medium text-slate-500">
            {t.reviews.tags[r.tag]}
          </span>
        )}
      </div>

        <motion.div
          key={translated ? "tr" : "orig"}
          initial={showTr ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="relative"
        >
          {/* Най-силният откъс като заглавие — за да се разбере отзивът и без да се чете целият. */}
          {highlight && (
            <p
              lang={shownLang}
              className="mt-5 text-[1.2rem] font-extrabold leading-[1.25] tracking-[-0.01em] text-slate-50 [text-wrap:balance]"
            >
              „{glue(highlight)}“
            </p>
          )}

          <blockquote
            ref={body}
            lang={shownLang}
            className={`whitespace-pre-line text-[14.5px] leading-[1.7] text-slate-400 [text-wrap:pretty] ${highlight ? "mt-3" : "mt-5"} ${open ? "" : "line-clamp-5"}`}
          >
            {glue(text)}
          </blockquote>
        </motion.div>


      {(clamped || open || tr) && (
        <div className="relative mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          {(clamped || open) && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="text-[13px] font-semibold text-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:underline"
            >
              {open ? t.reviews.less : t.reviews.more}
            </button>
          )}
          {tr && (
            <button
              type="button"
              onClick={() => setShowTr((v) => !v)}
              aria-pressed={!!translated}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-[12.5px] font-semibold text-slate-300
                         transition-colors duration-200 hover:border-white/[0.18] hover:bg-white/[0.07] hover:text-white
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
              </svg>
              {translated ? t.reviews.showOriginal : t.reviews.showTranslation}
            </button>
          )}
        </div>
      )}

      <div aria-hidden className="grow" />
      <figcaption className="relative mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
        <span
          aria-hidden
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.05] text-[15px] font-bold uppercase text-slate-200"
        >
          {r.name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-bold text-slate-100">{r.name}</span>
          <span className="block truncate text-[12px] text-slate-500">
            {[
              r.company,
              translated
                ? `${t.reviews.translated} · ${t.reviews.original} ${t.reviews.langs[r.lang]}`
                : r.lang !== lang && `${t.reviews.original} ${t.reviews.langs[r.lang]}`,
            ].filter(Boolean).join(" · ")}
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
  const reviews = [...REVIEWS].sort((a, b) => {
    const priority = (r: Review) => lang === 'de'
      ? r.name === 'Alpha Reiniging' ? 0 : r.lang === 'de' ? 1 : r.lang === 'nl' ? 2 : 3
      : lang === 'nl' ? r.name === 'Alpha Reiniging' ? 0 : r.lang === 'nl' ? 1 : r.lang === 'de' ? 2 : 3 : 0;
    return priority(a) - priority(b);
  });
  useEffect(() => { setActive(0); setShowAll(false); if (scroller.current) scroller.current.scrollLeft = 0; }, [lang]);
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
    const card = cards()[Math.max(0, Math.min(reviews.length - 1, i))];
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  }, [reviews.length]);

  const [showAll, setShowAll] = useState(false);
  const hidden = reviews.length - INITIAL;

  const arrowCls = `inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] text-slate-300
    transition-colors duration-200 hover:bg-white/[0.07] disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20`;

  return (
    <section
      id="reviews"
      className="relative isolate overflow-hidden text-slate-200"
      style={{ backgroundColor: "#07090f", ["--hairline" as any]: "#1a2234" }}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">

        {/* Header */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }} className="text-center">
          <h2 className="balance mx-auto max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100">
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
            href={googleReviewsUrl(lang)}
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
          {reviews.map((r, i) => (
            <ReviewCard key={r.name} r={r} i={i} variant="rail" />
          ))}
        </motion.div>

        {/* Навигация за лентата — само под md */}
        <div className="mt-5 flex items-center justify-center gap-4 md:hidden">
          <button type="button" aria-label={t.reviews.prev} onClick={() => go(active - 1)} disabled={active === 0} className={arrowCls}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <span className="min-w-[4.5rem] text-center text-[13px] font-semibold tabular-nums text-slate-400" aria-live="polite">
            {active + 1} / {reviews.length}
          </span>
          <button type="button" aria-label={t.reviews.next} onClick={() => go(active + 1)} disabled={active === reviews.length - 1} className={arrowCls}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>

        {/* Таблет и десктоп: мрежа с най-силните отзиви, останалите — с бутон. */}
        <div className="mt-12 hidden md:block">
          <div className="columns-2 gap-5 lg:columns-3">
            {(showAll ? reviews : reviews.slice(0, INITIAL)).map((r, i) => (
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

      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .balance { text-wrap: balance; }
      `}</style>
    </section>
  );
}
