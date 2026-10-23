import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { ArrowRight, FileText, Phone, Search, Send, Globe } from "lucide-react";
import { useLang } from "../i18n";
import { PROCESS, type ProcessCopy } from "../i18n/sections/process";
import { BUSINESS, VIBER_HREF, whatsappHref } from "../constants/business";
import PathMark from "../components/PathMark";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ViberIcon from "../components/ViberIcon";
import AccentTitle from "../components/AccentTitle";

/* Реален проект (различен за всеки език, виж process.ts), който „се строи“ в стъпка 3 и е онлайн в стъпка 4. */
const SHOT = { w: 1600, h: 1000 };
const EASE = "cubic-bezier(.16,1,.3,1)";

/**
 * Глава 04 „Как работим“ — четири стъпки, които се сменят сами (с лента за напредък) или при клик;
 * до тях една визуализация се прелива според стъпката. Обикновена височина, без закачане при скрол.
 * Глава 05 „Въпроси“ — акордеон и до него карта с реални контакти.
 */
export default function SectionProcessSimple() {
  return (
    <>
      <ProcessChapter />
      <FaqChapter />
      <style>{`
        .balance { text-wrap: balance; }
        .vis-card { background: #0e1626; border: 1px solid rgba(255,255,255,.08); border-radius: 20px; box-shadow: 0 30px 70px -30px rgba(0,0,0,.75); }
        .vis-stage > * { position: absolute; inset: 0; display: flex; align-items: center; transition: opacity .55s ${EASE}, transform .7s ${EASE}, filter .55s ${EASE}; }
        .vis-stage > [data-active="false"] { opacity: 0; transform: translateY(18px) scale(.985); filter: blur(6px); pointer-events: none; visibility: hidden; transition-delay: 0s, 0s, 0s, .55s; }
        .vis-stage > [data-active="true"] { opacity: 1; transform: none; filter: none; visibility: visible; }
        .build-shot { clip-path: inset(0 100% 0 0); }
        .build-scan { opacity: 0; }
        .is-building .build-shot { animation: build-reveal 1.5s ${EASE} .3s both; }
        .is-building .build-scan { animation: build-scan 1.5s ${EASE} .3s both; }
        @keyframes build-reveal { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
        @keyframes build-scan { 0% { left: 0; opacity: 1; } 85% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
        .live-dot { animation: live-pulse 2s ease-in-out infinite; }
        @keyframes live-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,.45); } 60% { box-shadow: 0 0 0 6px rgba(34,211,238,0); } }
        .faq-plus::before, .faq-plus::after { content: ""; position: absolute; left: 50%; top: 50%; background: currentColor; border-radius: 1px; transition: transform .35s ${EASE}; }
        .faq-plus::before { width: 12px; height: 2px; transform: translate(-50%,-50%); }
        .faq-plus::after { width: 2px; height: 12px; transform: translate(-50%,-50%); }
        [aria-expanded="true"] .faq-plus::after { transform: translate(-50%,-50%) scaleY(0); }
        [aria-expanded="true"] .faq-plus::before { transform: translate(-50%,-50%) rotate(180deg); }
        @media (prefers-reduced-motion: reduce) {
          .vis-stage > * { transition: none; }
          .build-shot, .is-building .build-shot { clip-path: none; animation: none; }
          .build-scan, .is-building .build-scan { animation: none; opacity: 0; }
          .live-dot { animation: none; }
          .faq-plus::before, .faq-plus::after { transition: none; }
        }
      `}</style>
    </>
  );
}

/* ───────────────────────── 04 · Как работим ───────────────────────── */

const STEPS = 4;
const STEP_MS = 5500;

/**
 * Стъпките се сменят сами на всеки ~5,5 s (тънка циан лента показва напредъка на активната).
 * Клик/тап върху стъпка я показва и рестартира таймера. Паузира при фокус от клавиатура и когато
 * секцията не е на екрана (без пауза при hover — изглеждаше като забиване); при prefers-reduced-motion няма автоматична смяна.
 */
function ProcessChapter() {
  const { lang, t } = useLang();
  const c = PROCESS[lang];
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const elapsed = useRef(0);
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [seen, setSeen] = useState(false);
  const [hold, setHold] = useState(false);

  const go = useCallback((i: number) => {
    setActive(i);
    setCycle((n) => n + 1);
  }, []);

  // Стартира, когато секцията влезе в екрана; спира, когато излезе.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Нова стъпка (или клик) → лентата започва от нулата.
  useEffect(() => {
    elapsed.current = 0;
    if (barRef.current) barRef.current.style.transform = "scaleX(0)";
  }, [active, cycle]);

  // Таймер през requestAnimationFrame; при пауза запазва изминалото време.
  useEffect(() => {
    if (reduced || !seen || hold) return;
    let raf = 0;
    const t0 = performance.now() - elapsed.current;
    const tick = (now: number) => {
      elapsed.current = now - t0;
      const p = Math.min(1, elapsed.current / STEP_MS);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (p >= 1) return setActive((a) => (a + 1) % STEPS);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, seen, hold, active, cycle]);

  const startHref = whatsappHref(t.whatsapp.text);

  return (
    <section id="process" className="relative bg-ink pb-16 text-slate-200 sm:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <PathMark n="05" label={c.label} />
        <h2 className="balance mx-auto mt-6 max-w-[22ch] text-center text-[clamp(1.9rem,5.5vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:mt-8">
          {c.h2a} <span className="text-accent-text">{c.h2b}</span>
        </h2>

        {/* Телефон: визуализация отгоре, компактни редове отдолу. Десктоп: списък отляво, визуализация отдясно. */}
        <div
          ref={ref}
          onFocus={(e) => { try { if (e.target.matches(":focus-visible")) setHold(true); } catch { /* стар браузър */ } }}
          onBlur={() => setHold(false)}
          className="mt-8 grid items-center gap-7 sm:mt-10 lg:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
        >
          <div className="vis-stage relative order-first h-[330px] w-full max-w-[560px] justify-self-center sm:h-[380px] lg:order-none lg:h-[470px] lg:justify-self-end">
            <div data-active={active === 0}><ChatVisual c={c} /></div>
            <div data-active={active === 1}><OfferVisual c={c} /></div>
            <div data-active={active === 2}><BuildVisual c={c} active={active === 2} /></div>
            <div data-active={active === 3}><LiveVisual c={c} /></div>
          </div>

          <div className="w-full max-w-[560px] justify-self-center lg:max-w-[440px] lg:justify-self-start">
            <ol className="relative">
              <span aria-hidden className="absolute bottom-6 left-[15px] top-6 w-[2px] bg-white/[0.08]" />
              {c.steps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-current={on ? "step" : undefined}
                      className="group flex w-full items-start gap-4 rounded-xl py-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:gap-5 lg:py-3"
                    >
                      <span
                        className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12.5px] font-bold tabular-nums transition-all duration-500 ${
                          on
                            ? "border-accent bg-accent text-ink shadow-[0_0_0_5px_rgba(34,211,238,.16),0_4px_18px_rgba(34,211,238,.45)]"
                            : "border-white/15 bg-ink text-slate-400 group-hover:border-white/30 group-hover:text-slate-200"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 pt-1">
                        <b className={`block text-[1.05rem] font-extrabold leading-tight tracking-[-0.02em] transition-colors duration-500 sm:text-[1.15rem] ${on ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
                          {s.title}
                        </b>
                        {/* На телефон описанието стои само под активната стъпка; на десктоп — под всички. */}
                        <span className={`mt-1.5 max-w-[38ch] text-[14.5px] leading-relaxed transition-colors duration-500 lg:block lg:text-[15px] ${on ? "block text-slate-300" : "hidden text-slate-400"}`}>
                          {s.text}
                        </span>
                        {on && !reduced && (
                          <span aria-hidden className="mt-3 block h-[2px] w-full max-w-[38ch] overflow-hidden rounded-full bg-white/[0.08]">
                            <span ref={barRef} className="block h-full w-full origin-left rounded-full bg-accent" style={{ transform: "scaleX(0)" }} />
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <a
              href={startHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group ml-12 mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-slate-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:ml-[52px] lg:mt-5"
            >
              <WhatsAppIcon className="h-4 w-4 text-accent-text" />
              <span className="border-b border-white/25 pb-px group-hover:border-white/60">{c.startLink}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── визуализации: чат → оферта → изработка → онлайн ───── */

function ChatVisual({ c }: { c: ProcessCopy }) {
  const ch = c.chat;
  return (
    <div className="vis-card w-full">
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-[13px] font-extrabold text-ink">R</span>
        <div className="min-w-0">
          <b className="block text-[13px] font-semibold text-slate-100">{ch.name}</b>
          <span className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
            <i aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {ch.status}
          </span>
        </div>
      </div>
      <div className="space-y-2.5 px-4 py-4">
        <p className="max-w-[86%] rounded-2xl rounded-tl-md border border-white/[0.08] bg-ink-raised px-3.5 py-2.5 text-[13.5px] leading-snug text-slate-200">{ch.inbound}</p>
        <p className="ml-auto max-w-[86%] rounded-2xl rounded-tr-md border border-accent/25 bg-accent/[0.09] px-3.5 py-2.5 text-[13.5px] leading-snug text-slate-100">{ch.reply}</p>
      </div>
      <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-ink px-3.5 py-2.5 text-[12.5px] text-slate-500">
        {ch.placeholder}
        <Send className="ml-auto h-4 w-4 text-accent-text" aria-hidden />
      </div>
    </div>
  );
}

function OfferVisual({ c }: { c: ProcessCopy }) {
  const o = c.offer;
  const rows: [string, ReactNode][] = [
    [o.scope, o.scopeValue],
    [o.term, o.termValue],
    [
      o.steps,
      <span key="s" className="flex flex-wrap gap-1.5">
        {o.stepsValue.map((s, i) => (
          <span key={s} className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.1] bg-ink px-2 py-0.5 text-[12px] text-slate-200">
            <span className="text-[10.5px] font-bold tabular-nums text-accent-text">{i + 1}</span>
            {s}
          </span>
        ))}
      </span>,
    ],
    [o.price, o.priceValue],
  ];
  return (
    <div className="vis-card w-full p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 text-[14px] font-semibold text-slate-100">
          <FileText className="h-4 w-4 text-accent-text" aria-hidden />
          {o.title}
        </span>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent-text">{o.stamp}</span>
      </div>
      <dl className="mt-3 divide-y divide-white/[0.08]">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[5.5rem_1fr] items-start gap-3 py-3">
            <dt className="text-[12px] font-medium uppercase tracking-[0.08em] text-slate-500">{k}</dt>
            <dd className="text-[13.5px] leading-snug text-slate-200">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function BrowserBar({ site, live, badge }: { site: string; live?: boolean; badge?: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-3.5 py-2.5">
      <i aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <i aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <i aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className={`mx-auto flex h-6 min-w-0 items-center justify-center gap-1.5 rounded-md bg-ink px-2 text-[11px] text-slate-400 ${badge ? "ml-1.5 mr-1.5 flex-1" : "w-[62%]"}`}>
        {live && <i aria-hidden className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
        <span className="truncate">{site}</span>
      </span>
      {badge ? (
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 px-2 py-0.5 text-[10.5px] font-semibold text-white">
          <i aria-hidden className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
          {badge}
        </span>
      ) : (
        <span aria-hidden className="w-[2.1rem]" />
      )}
    </div>
  );
}

function BuildVisual({ c, active }: { c: ProcessCopy; active: boolean }) {
  return (
    <div className={`vis-card w-full overflow-hidden ${active ? "is-building" : ""}`}>
      <BrowserBar site={c.build.site} />
      <div className="relative aspect-[900/589] overflow-hidden bg-ink">
        {/* скица (wireframe) под екрана */}
        <div aria-hidden className="absolute inset-0 p-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-14 rounded bg-white/[0.08]" />
            <span className="ml-auto h-2 w-8 rounded bg-white/[0.06]" />
            <span className="h-2 w-8 rounded bg-white/[0.06]" />
            <span className="h-2 w-8 rounded bg-white/[0.06]" />
          </div>
          <div className="mt-6 h-5 w-[58%] rounded bg-white/[0.1]" />
          <div className="mt-2 h-5 w-[42%] rounded bg-white/[0.1]" />
          <div className="mt-4 h-2.5 w-[64%] rounded bg-white/[0.06]" />
          <div className="mt-1.5 h-2.5 w-[50%] rounded bg-white/[0.06]" />
          <div className="mt-5 h-7 w-28 rounded-md border border-accent/40" />
          <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-3">
            <span className="h-12 rounded-md bg-white/[0.05]" />
            <span className="h-12 rounded-md bg-white/[0.05]" />
            <span className="h-12 rounded-md bg-white/[0.05]" />
          </div>
        </div>
        <img
          src={c.build.shot} width={SHOT.w} height={SHOT.h} alt="" loading="lazy" decoding="async"
          className="build-shot absolute inset-0 h-full w-full object-cover object-top"
        />
        <span aria-hidden className="build-scan absolute bottom-0 top-0 w-px bg-accent shadow-[0_0_14px_2px_rgba(34,211,238,.6)]" />
        <span className="absolute left-3 top-3 rounded-full border border-white/[0.1] bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur">
          {c.build.badge}
        </span>
      </div>
    </div>
  );
}

function LiveVisual({ c }: { c: ProcessCopy }) {
  const l = c.live;
  return (
    <div className="relative w-full pb-12">
      <div className="vis-card overflow-hidden">
        <BrowserBar site={c.build.site} badge={l.badge} />
        <div className="relative aspect-[900/520] overflow-hidden bg-ink">
          <img src={c.build.shot} width={SHOT.w} height={SHOT.h} alt={l.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-top" />
        </div>
      </div>
      {/* резултат в Google — заглавието е реално, описанието е схематично */}
      <div className="absolute bottom-0 right-3 w-[74%] max-w-[360px] rounded-2xl border border-white/[0.1] bg-ink-raised p-3.5 shadow-[0_24px_50px_-18px_rgba(0,0,0,.85)]">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Search className="h-3.5 w-3.5" aria-hidden />
          {l.google}
          <span aria-hidden className="ml-auto h-1.5 w-20 rounded bg-white/[0.08]" />
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.08]"><Globe className="h-3 w-3 text-slate-300" aria-hidden /></span>
          <span className="truncate text-[11.5px] text-slate-400">{c.build.site}</span>
        </div>
        <b className="mt-1 block text-[14px] font-semibold leading-snug text-accent-text">{l.title}</b>
        <span className="block text-[11.5px] text-slate-400">{l.caption}</span>
        <span aria-hidden className="mt-2 block h-1.5 w-[80%] rounded bg-white/[0.07]" />
        <span aria-hidden className="mt-1 block h-1.5 w-[55%] rounded bg-white/[0.07]" />
      </div>
    </div>
  );
}

/* ───────────────────────── 05 · Въпроси ───────────────────────── */

function FaqChapter() {
  const { lang, t } = useLang();
  const f = PROCESS[lang].faq;
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-ink pb-20 text-slate-200 sm:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <PathMark n="06" label={f.label} />
        <div className="mx-auto mt-6 grid max-w-6xl gap-10 sm:mt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          {/* На телефон: заглавие → въпроси → карта. На десктоп двете части отляво са закачени заедно. */}
          <div className="contents lg:sticky lg:top-24 lg:block lg:self-start">
            <div className="order-1 text-center lg:text-left">
              <h2 className="balance text-[clamp(1.9rem,5.5vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white"><AccentTitle text={f.h2} accents={["въпроси", "questions", "Fragen", "vragen"]} /></h2>
              <p className="balance mx-auto mt-4 max-w-[40ch] text-[16px] leading-relaxed text-slate-400 lg:mx-0">{f.sub}</p>
            </div>
            <div className="order-3 rounded-3xl border border-white/[0.08] bg-ink-panel p-6 lg:mt-10 sm:p-7">
              <h3 className="text-[1.2rem] font-extrabold tracking-[-0.02em] text-white">{f.cardTitle}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-slate-400">{f.cardText}</p>
              <a
                href={whatsappHref(t.whatsapp.text)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-5 text-[15px] font-semibold text-ink shadow-[0_6px_20px_-8px_rgba(34,211,238,.45)] transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-[0_10px_26px_-8px_rgba(34,211,238,.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-panel"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {f.whatsapp}
              </a>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href={VIBER_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.1] text-[13.5px] font-medium text-slate-200 transition-colors hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  <ViberIcon className="h-4 w-4 text-slate-400" />
                  {f.viber}
                </a>
                <a
                  href={BUSINESS.phoneHref}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.1] text-[13.5px] font-medium text-slate-200 transition-colors hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  <Phone className="h-4 w-4 text-slate-400" aria-hidden />
                  {f.call}
                </a>
              </div>
              <p className="mt-4 flex items-center gap-2 text-[13px] text-slate-400">
                <i aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {f.reply}
              </p>
              <ScrollLink
                to="contact" href="#contact" smooth duration={220} offset={-70}
                className="group mt-3 inline-flex cursor-pointer items-center gap-1.5 text-[14px] font-semibold text-slate-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
              >
                <span className="border-b border-white/25 pb-px group-hover:border-white/60">{f.brief}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </ScrollLink>
            </div>
          </div>

          <div className="order-2 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {t.process.faq.map((item, i) => {
              const expanded = open === i;
              const id = `faq-${i}`;
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      type="button"
                      id={`${id}-q`}
                      aria-expanded={expanded}
                      aria-controls={`${id}-a`}
                      onClick={() => setOpen(expanded ? null : i)}
                      className="group flex w-full items-center justify-between gap-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:py-6"
                    >
                      <span className={`text-[16px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-[17px] ${expanded ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className={`faq-plus relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          expanded ? "border-accent bg-accent text-ink" : "border-white/15 text-slate-300 group-hover:border-white/35"
                        }`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        key="a"
                        id={`${id}-a`}
                        role="region"
                        aria-labelledby={`${id}-q`}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-6 pr-12 text-[15px] leading-relaxed text-slate-400">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
