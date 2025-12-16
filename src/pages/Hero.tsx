import { useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

type Key = "site" | "shop" | "ads";

const SERVICES: Record<Key, { label: string; sub: string; cta: string; anchor: string }> = {
  site: { label: "Сайт", sub: "корпоративни и продуктови страници", cta: "Оферта за сайт", anchor: "contact" },
  shop: { label: "E-магазин", sub: "каталог, плащания, интеграции", cta: "Оферта за e-магазин", anchor: "contact" },
  ads:  { label: "Реклами", sub: "Meta/Google, фунии и ретаргетинг", cta: "План за кампании", anchor: "contact" },
};

export default function HeroSpotlightSmartTabs() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Key>("site");

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const svc = SERVICES[active];

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate overflow-hidden text-slate-200"
      style={
        {
          backgroundColor: "#0a0d14",
          ["--accent"]: "#22D3EE",
          ["--accent-600"]: "#0891B2",
          ["--accent-200"]: "#A5F3FC",
          ["--hairline"]: "#1f2937",
          ["--x"]: "50%",
          ["--y"]: "40%",
        } as React.CSSProperties
      }
    >
      {/* фон: grid скрит на мобилно + статичен spotlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 hidden opacity-[0.045] sm:block [background-image:linear-gradient(#94a3b81a_1px,transparent_1px),linear-gradient(90deg,#94a3b81a_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="spot absolute inset-0" />
      </div>

      {/* hairlines само на ≥sm */}
      <div aria-hidden className="absolute inset-x-0 top-0 hidden h-px sm:block" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 pt-24 pb-14 text-center sm:px-6 sm:pt-28 sm:pb-24">
        {/* мото (леко по-голямо) */}
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="mx-auto mb-4 w-fit text-[12.5px] uppercase tracking-[0.18em] text-slate-400 sm:text-[12px]"
        >
          стратегия · дизайн · разработка
        </motion.div>

        {/* заглавие — по-голямо и по-тесни редове на мобилно */}
        <motion.h1
          variants={fade}
          initial="hidden"
          animate="show"
          custom={1}
          className="balance mx-auto max-w-[22ch] text-[clamp(2.3rem,9.5vw,4.8rem)] font-extrabold leading-[1.08] tracking-tight sm:max-w-5xl"
        >
          По-малко шум. Повече резултат.
          <span className="block font-semibold text-[color:var(--accent-200)]">сайтове, e-магазини и performance реклами</span>
        </motion.h1>

        {/* ── ПРЕДИ CTA: табове — по-високи, повече padding; horizontal scroll на мобилно ── */}
        <motion.div variants={fade} initial="hidden" animate="show" custom={1.3} className="mx-auto mt-7 w-full max-w-[680px]">
          <div className="-mx-5 overflow-x-auto px-1 no-scrollbar sm:mx-0 sm:overflow-visible">
            <div role="tablist" className="inline-flex snap-x snap-mandatory gap-1.5 rounded-full border border-slate-700/60 bg-[#0f131d] p-1.5 sm:snap-none">
              {([["site","Сайт"],["shop","E-магазин"],["ads","Реклами"]] as [Key,string][])
                .map(([key, label]) => {
                  const selected = active === key;
                  return (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActive(key)}
                      className={`snap-start shrink-0 rounded-full px-5 h-11 text-[15px] transition-colors sm:h-10 sm:text-sm ${
                        selected ? "bg-[var(--accent)] text-slate-900" : "text-slate-300 hover:bg-[#111722]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
            </div>
          </div>
        </motion.div>

        {/* подсказка под табовете — по-голяма и с повече въздух */}
        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          custom={1.45}
          className="balance mx-auto mt-4 max-w-[40ch] text-[17px] leading-relaxed text-slate-300 sm:max-w-2xl sm:text-[16px]"
        >
          {svc.sub}
        </motion.p>

        {/* CTA — по-големи, повече spacing; full width на мобилно */}
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          custom={1.9}
          className="mx-auto mt-9 flex w-full max-w-[720px] flex-col gap-3.5 sm:max-w-2xl sm:flex-row sm:items-center sm:justify-center"
        >
          {/* Primary */}
          <ScrollLink
            to={svc.anchor}
            smooth
            duration={220}
            offset={-70}
            aria-label={svc.cta}
            className="group relative inline-flex h-[52px] w-full items-center justify-center rounded-full px-7 text-[17px] font-semibold text-slate-900
                       bg-[var(--accent)] ring-1 ring-inset ring-[var(--accent-600)]/30
                       transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40
                       sm:w-auto sm:text-base sm:h-12"
          >
            {svc.cta}
            <svg aria-hidden viewBox="0 0 24 24" className="ml-2 h-[22px] w-[22px] translate-x-0 transition-transform group-hover:translate-x-0.5 sm:h-5 sm:w-5">
              <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </ScrollLink>

          {/* Secondary */}
          <ScrollLink
            to="work"
            smooth
            duration={220}
            offset={-70}
            aria-label="Вижте проекти"
            className="group relative inline-flex h-[52px] w-full items-center justify-center rounded-full px-0 text-[17px] font-semibold text-slate-200
                       underline decoration-slate-500/60 underline-offset-4 hover:decoration-[var(--accent)]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/40 sm:w-auto sm:no-underline sm:text-base sm:h-12"
          >
            Вижте проекти
            <svg aria-hidden viewBox="0 0 24 24" className="ml-2 h-[22px] w-[22px] translate-x-0 transition-transform group-hover:translate-x-0.5 sm:h-5 sm:w-5">
              <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span aria-hidden className="pointer-events-none absolute -bottom-1 left-0 hidden h-[1px] w-full origin-left scale-x-0 bg-slate-400/60 transition-transform duration-300 group-hover:scale-x-100 sm:block" />
          </ScrollLink>
        </motion.div>

        {/* ── СЛЕД CTA: capacity бар — по-голям шрифт и padding ── */}
        <motion.div variants={fade} initial="hidden" animate="show" custom={2.2} className="mx-auto mt-10 w-full max-w-[720px] sm:max-w-2xl">
          <div className="rounded-xl border border-slate-700/60 bg-[#0f131d] p-4 sm:p-5">
            <div className="flex items-center justify-between text-[12px] uppercase tracking-wider text-slate-400 sm:text-[11px]">
              <span>Капацитет този месец</span>
              <span>75%</span>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-800/80">
              <div className="h-full w-[75%]" style={{ background: "linear-gradient(90deg, var(--accent) 0%, rgba(34,211,238,0.45) 100%)" }} />
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2 text-center text-[13.5px] text-slate-300 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 sm:text-[12.5px]">
              <span>Свободни места: <strong className="text-slate-100">3</strong></span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-600/70 sm:inline-block" aria-hidden />
              <span>Следващ старт: <strong className="text-slate-100">2 март.</strong></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* bottom hairline само на ≥sm */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-px sm:block" style={{ backgroundColor: "var(--hairline)" }} />

      {/* стил: spotlight, no-scrollbar, balance, reduced motion */}
      <style>{`
        .spot { background: radial-gradient(260px 260px at var(--x) var(--y), var(--accent) 0%, transparent 65%); opacity: .12; }
        @media (hover: none) { .spot { background: radial-gradient(260px 260px at 50% 40%, var(--accent) 0%, transparent 65%); } }

        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        .balance { text-wrap: balance; }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </section>
  );
}