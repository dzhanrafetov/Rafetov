/**
 * Глава 03 „Отзиви“: един голям избран отзив (цитат, клиент, лого, линк към проекта) и бавна стена от
 * кратки откъси на всички останали — всеки откъс сменя избрания. Отзивите са дословно от Google;
 * на чужд език се показват преведени на езика на страницата, оригиналът е на един клик.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n";
import type { Lang } from "../i18n/types";
import PathMark from "../components/PathMark";
import { GoogleG } from "../components/GoogleRating";
import { CLIENT_LOGOS } from "../components/TrustedBy";
import { REVIEWS, type Review } from "../constants/reviews";
import { GOOGLE_REVIEWS, googleReviewsUrl } from "../constants/business";
import { projectPath, projectsFor } from "../constants/projects";
import { REVIEW_TRANSLATIONS } from "./reviewTranslations";
import { reviewsCopy } from "../i18n/sections/reviews";

/** Кавичките на езика на показания текст. */
const QUOTES: Record<string, [string, string]> = { bg: ["„", "“"], de: ["„", "“"], nl: ["“", "”"], en: ["“", "”"] };

/** Редът по език: на de/nl отзивите на този език и Alpha Reiniging (Белгия) са отпред. */
function orderFor(lang: Lang): Review[] {
  const rank = (r: Review) => {
    if (lang === "de") return r.name === "Alpha Reiniging" ? 0 : r.lang === "de" ? 1 : r.lang === "nl" ? 2 : 3;
    if (lang === "nl") return r.name === "Alpha Reiniging" ? 0 : r.lang === "nl" ? 1 : r.lang === "de" ? 2 : 3;
    return 0;
  };
  return [...REVIEWS].sort((a, b) => rank(a) - rank(b));
}

/** Текстът за показване: преводът на езика на страницата по подразбиране, оригиналът при поискване. */
function shownText(r: Review, lang: Lang, original: boolean) {
  const tr = r.lang !== lang ? REVIEW_TRANSLATIONS[r.name]?.[lang] : undefined;
  const useTr = !!tr && !original;
  return {
    hasTr: !!tr,
    translated: useTr,
    text: useTr ? tr!.text : r.text,
    highlight: useTr ? tr!.highlight : r.highlight,
    lang: useTr ? lang : r.lang,
  };
}

/** Първото изречение (или две, ако първото е кратко) — дословно, без съкращаване по средата на дума. */
function excerpt(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  const parts = flat.match(/[^.!?]+[.!?]+["”“]?|[^.!?]+$/g) ?? [flat];
  let out = "";
  for (const p of parts) {
    const next = (out + p).trim();
    if (out && next.length > 160) break;
    out = next;
    if (out.length >= 60) break;
  }
  return out;
}

/** Абзаците на отзива, с удебелен дословния откъс (`highlight`), ако се среща в текста. */
function Emphasised({ text, highlight, open, close }: { text: string; highlight?: string; open: string; close: string }) {
  const paras = text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  const mark = (p: string): ReactNode => {
    if (!highlight) return p;
    const i = p.toLowerCase().indexOf(highlight.toLowerCase());
    if (i < 0) return p;
    return (
      <>
        {p.slice(0, i)}
        <strong className="font-bold text-white">{p.slice(i, i + highlight.length)}</strong>
        {p.slice(i + highlight.length)}
      </>
    );
  };
  return (
    <>
      {paras.map((p, i) => (
        <p key={i} className={i ? "mt-[0.9em]" : undefined}>
          {i === 0 && open}
          {mark(p)}
          {i === paras.length - 1 && close}
        </p>
      ))}
    </>
  );
}

const StarRow = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <span className="inline-flex gap-[3px]" aria-hidden>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
      </svg>
    ))}
  </span>
);

const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

export default function Reviews() {
  const { t, lang, href } = useLang();
  const c = reviewsCopy[lang];
  const reviews = useMemo(() => orderFor(lang), [lang]);
  const [idx, setIdx] = useState(0);
  const [original, setOriginal] = useState(false);
  const [reduce, setReduce] = useState(false);
  const mounted = useRef(false);
  const panel = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => { mounted.current = true; }, []);
  useEffect(() => { setIdx(0); setOriginal(false); }, [lang]);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const n = reviews.length;
  const go = useCallback((i: number) => { setIdx(((i % n) + n) % n); setOriginal(false); }, [n]);

  /** От стената: сменя избрания и, ако панелът е над екрана, го връща в полезрението. */
  const pick = useCallback((i: number) => {
    go(i);
    const el = panel.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [go, reduce]);

  const r = reviews[idx] ?? reviews[0];
  const s = shownText(r, lang, original);
  const [open, close] = QUOTES[s.lang] ?? QUOTES.en;
  const rating = GOOGLE_REVIEWS.rating.toLocaleString(lang, { minimumFractionDigits: 1 });

  // Проектът на клиента (ако отзивът е свързан с такъв и той се показва на този език) и логото му.
  const project = projectsFor(lang).find((p) => p.review === r.name);
  const logo = project && CLIENT_LOGOS.find((l) => l.id === project.id);
  const projectTitle = project && (t.work.titles?.[project.id] ?? project.title);
  const langName = t.reviews.langs[r.lang];

  // Стената: всички останали отзиви в два реда, вторият в обратна посока. При reduced motion — без дубликати, с ролка.
  const others = reviews.map((rv, i) => ({ rv, i })).filter((x) => x.i !== idx);
  const rows = [others.filter((_, k) => k % 2 === 0), others.filter((_, k) => k % 2 === 1)];

  const arrow = "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.10] text-slate-300 transition-colors duration-200 hover:border-white/[0.22] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67e8f9]/70";

  return (
    <section id="reviews" className="relative text-slate-200" style={{ backgroundColor: "#07090f" }}>
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <PathMark n="03" label={c.chapter} />

        <div className="mx-auto mt-6 max-w-[40rem] text-center">
          <h2 className="text-[clamp(2rem,1.35rem+2.8vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white [text-wrap:balance]">
            {c.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400 [text-wrap:pretty] sm:text-[17px]">{c.sub}</p>
          <p className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[14px] text-slate-400">
            <GoogleG className="h-5 w-5" />
            <b className="text-[17px] font-extrabold tabular-nums text-white">{rating}</b>
            <span className="text-[#67e8f9]"><StarRow /></span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-slate-600" />
            <span>{fmt(t.reviews.count, { n: GOOGLE_REVIEWS.count })}</span>
          </p>
        </div>

        {/* Избраният отзив */}
        <article
          ref={panel}
          aria-roledescription="carousel"
          aria-label={fmt(c.reviewOf, { i: idx + 1, n })}
          className="relative mx-auto mt-10 max-w-5xl scroll-mt-24 rounded-3xl border border-white/[0.08] bg-[#0e1626] p-6 sm:mt-14 sm:p-10 lg:p-12"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const x0 = touchX.current; touchX.current = null;
            if (x0 == null) return;
            const dx = e.changedTouches[0].clientX - x0;
            if (Math.abs(dx) > 60) go(idx + (dx < 0 ? 1 : -1));
          }}
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
            <motion.blockquote
              key={`${r.name}-${s.lang}`}
              initial={mounted.current && !reduce ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              lang={s.lang}
              className="min-w-0 text-[clamp(1.15rem,1.02rem+0.75vw,1.55rem)] font-medium leading-[1.45] tracking-[-0.015em] text-slate-300 [text-wrap:pretty]"
            >
              <Emphasised text={s.text} highlight={s.highlight} open={open} close={close} />
            </motion.blockquote>

            <aside className="flex min-w-0 flex-col gap-4 border-t border-white/[0.08] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {logo ? (
                <span
                  className={`flex h-16 w-28 items-center justify-center overflow-hidden rounded-xl px-3 ${
                    logo.tile === "light" ? "bg-white ring-1 ring-black/5" : logo.tile === "photo" ? "bg-[#d6c9b8]" : "bg-[#141f33] ring-1 ring-white/10"
                  }`}
                >
                  <img src={logo.logo} alt={projectTitle ?? logo.name} className={logo.tile === "photo" ? "h-full w-full object-contain" : "max-h-10 max-w-full object-contain"} loading="lazy" decoding="async" />
                </span>
              ) : (
                <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-[#141f33] text-[17px] font-bold uppercase text-slate-100 ring-1 ring-white/10">
                  {r.name.charAt(0)}
                </span>
              )}

              <div className="min-w-0">
                <p className="text-[16px] font-bold leading-tight text-white">{r.name}</p>
                {(r.company || r.tag) && (
                  <p className="mt-1 text-[13.5px] leading-snug text-slate-400">{r.company ?? t.reviews.tags[r.tag!]}</p>
                )}
                <p className="mt-2 inline-flex items-center gap-2 text-[12.5px] text-slate-500">
                  <GoogleG className="h-3.5 w-3.5" />
                  <span className="text-[#67e8f9]"><StarRow className="h-3 w-3" /></span>
                </p>
              </div>

              {project && (
                <RouterLink
                  to={href(projectPath(project, lang))}
                  className="inline-flex w-fit items-center gap-1 text-[14px] font-semibold text-[#67e8f9] underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
                >
                  {c.viewProject}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </RouterLink>
              )}

              {r.lang !== lang && (
                <p className="text-[12.5px] leading-snug text-slate-500">
                  {s.hasTr ? (
                    s.translated ? (
                      <>
                        {c.translated} ·{" "}
                        <button type="button" onClick={() => setOriginal(true)} className="rv-tiny">{fmt(c.originalIn, { lang: langName })}</button>
                      </>
                    ) : (
                      <>
                        <span className="first-letter:uppercase">{fmt(c.originalIn, { lang: langName })}</span> ·{" "}
                        <button type="button" onClick={() => setOriginal(false)} className="rv-tiny">{c.showTranslation}</button>
                      </>
                    )
                  ) : (
                    <span className="first-letter:uppercase">{fmt(c.originalIn, { lang: langName })}</span>
                  )}
                </p>
              )}
            </aside>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-white/[0.08] pt-6 sm:mt-10">
            <div className="flex items-center gap-3">
              <button type="button" aria-label={t.reviews.prev} onClick={() => go(idx - 1)} className={arrow}>
                <ArrowLeft className="h-[18px] w-[18px]" aria-hidden />
              </button>
              <button type="button" aria-label={t.reviews.next} onClick={() => go(idx + 1)} className={arrow}>
                <ArrowRight className="h-[18px] w-[18px]" aria-hidden />
              </button>
              <span className="ml-1 text-[13px] font-semibold tabular-nums text-slate-500" aria-live="polite">
                {idx + 1} / {n}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5" role="group">
              {reviews.map((rv, i) => (
                <button
                  key={rv.name}
                  type="button"
                  aria-label={fmt(c.reviewOf, { i: i + 1, n })}
                  aria-current={i === idx || undefined}
                  onClick={() => go(i)}
                  className="group flex h-6 items-center px-0.5 focus:outline-none"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 group-hover:bg-slate-400 group-focus-visible:ring-2 group-focus-visible:ring-[#67e8f9]/70 ${i === idx ? "w-6 bg-[#22d3ee]" : "w-1.5 bg-slate-600"}`} />
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* Стената: останалите отзиви в два бавни реда */}
      <div className="rv-wall pb-16 sm:pb-24" aria-label={c.wall} role="region">
        {rows.map((row, ri) => {
          const items = reduce ? row : [...row, ...row];
          return (
            <div
              key={ri}
              className={`rv-mask ${ri ? "mt-3" : ""} ${reduce ? "overflow-x-auto px-4 sm:px-6 [scrollbar-width:thin]" : "overflow-hidden"}`}
              style={reduce ? undefined : { maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }}
            >
              <ul className={`flex w-max [&>li]:pr-3 ${reduce ? "pb-2" : `rv-track ${ri ? "rv-track-rev" : ""}`}`}>
                {items.map(({ rv, i }, k) => {
                  const clone = k >= row.length;
                  const st = shownText(rv, lang, false);
                  return (
                    <li key={`${rv.name}-${k}`} aria-hidden={clone || undefined}>
                      <button
                        type="button"
                        tabIndex={clone ? -1 : 0}
                        onClick={() => pick(i)}
                        lang={st.lang}
                        className="rv-chip flex h-full w-[280px] flex-col items-start gap-1.5 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 text-left transition-colors duration-200 hover:border-white/[0.18] hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#67e8f9]/70 sm:w-[340px]"
                      >
                        <span className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-200">
                          <span className="text-[#67e8f9]"><StarRow className="h-2.5 w-2.5" /></span>
                          {rv.name}
                        </span>
                        <span className="line-clamp-2 text-[13.5px] leading-snug text-slate-400">{excerpt(st.text)}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <p className="mt-8 text-center sm:mt-10">
          <a
            href={googleReviewsUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-slate-300 underline-offset-4 transition-colors hover:text-white hover:underline focus:outline-none focus-visible:underline"
          >
            <GoogleG className="h-4 w-4" />
            {c.viewAll}
            <ArrowUpRight className="h-4 w-4 text-slate-500" aria-hidden />
          </a>
        </p>
      </div>

      <style>{`
        .rv-tiny { color: #cbd5e1; text-decoration: underline; text-decoration-color: rgba(148,163,184,.5); text-underline-offset: 3px; }
        .rv-tiny:hover { color: #fff; text-decoration-color: currentColor; }
        .rv-tiny:focus-visible { outline: 2px solid #67e8f9; outline-offset: 2px; border-radius: 2px; }
        .rv-track { animation: rv-scroll 90s linear infinite; }
        .rv-track-rev { animation-direction: reverse; }
        .rv-mask:hover .rv-track, .rv-mask:focus-within .rv-track { animation-play-state: paused; }
        @keyframes rv-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .rv-track { animation: none; } }
      `}</style>
    </section>
  );
}
