import { useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { useLang } from "../i18n";
import { Link as RouterLink } from "react-router-dom";
import { serviceById, servicePath } from "../services";
import ServiceIllustration from "../services/ServiceArt";
import type { ServiceKey } from "../i18n/types";
import { POSTS, postPath } from "../blog";

/** Статията с пазарния ориентир за цени — линкът, който отговаря на „колко струва“ без да ни обвързва. */
const pricingPost = POSTS.find((p) => p.id === "kolko-struva-sait");

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SERVICES: { k: ServiceKey; accent: string; glow: string; icon: JSX.Element }[] = [
  {
    k: "site",
    accent: "#22D3EE",
    glow: "rgba(34,211,238,.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 9h20" />
        <path d="M7 6h.01M10 6h.01" />
      </svg>
    ),
  },
  {
    k: "shop",
    accent: "#34D399",
    glow: "rgba(52,211,153,.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M6 7h15l-2 9H7L6 7Z" />
        <path d="M6 7 5 4H2" />
        <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
        <circle cx="17" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    k: "ads",
    accent: "#A78BFA",
    glow: "rgba(167,139,250,.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M3 17l4-8 4 4 4-6 4 4" />
        <path d="M21 21H3" />
      </svg>
    ),
  },
  {
    k: "menu",
    accent: "#FBBF24",
    glow: "rgba(251,191,36,.13)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </svg>
    ),
  },
];

export default function Services() {
  const { t, lang, href } = useLang();
  const [active, setActive] = useState(0);
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden text-slate-200"
      style={{
        backgroundColor: "#07090f",
        ["--hairline" as any]: "#1a2234",
      }}
    >
      {/* Фон */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
          [background-size:28px_28px]" />
        <div
          className="absolute -left-60 top-1/3 h-[500px] w-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #22D3EE 0%, transparent 65%)" }}
        />
        <div
          className="absolute -right-60 top-2/3 h-[400px] w-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #A78BFA 0%, transparent 65%)" }}
        />
      </div>

      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">

        {/* Header */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            {t.services.eyebrow}
          </span>
          <h2 className="balance mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-normal sm:tracking-[-0.02em] text-slate-100">
            {t.services.h2a}{" "}
            <span className="gradient-text">
              {t.services.h2b}
            </span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400">
            {t.services.sub}
          </p>
        </motion.div>

        {/* Витрина: списък с услугите вляво, избраната — на голямо вдясно. Всички панели са в HTML-а (за Google и за телефон без JS). */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }}
          custom={2}
          className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,4.6fr)_minmax(0,7.4fr)] lg:gap-6"
        >
          <div role="tablist" aria-orientation="vertical" className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-2.5 lg:[&>button]:flex-1">
            {SERVICES.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.k}
                  type="button"
                  role="tab"
                  id={`svc-tab-${c.k}`}
                  aria-selected={on}
                  aria-controls={`svc-panel-${c.k}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.06] px-3 py-3 text-left transition-colors duration-200
                             hover:border-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 lg:gap-4 lg:px-5 lg:py-4"
                >
                  {on && (
                    <motion.span
                      aria-hidden
                      layoutId="svc-active"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(100deg, color-mix(in srgb, ${c.accent} 16%, transparent), color-mix(in srgb, ${c.accent} 4%, transparent))`,
                        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${c.accent} 38%, transparent)`,
                      }}
                    />
                  )}
                  <span
                    className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 lg:h-11 lg:w-11"
                    style={{
                      background: `color-mix(in srgb, ${c.accent} ${on ? 20 : 10}%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${c.accent} ${on ? 40 : 20}%, transparent)`,
                      color: c.accent,
                    }}
                  >
                    {c.icon}
                  </span>
                  <span className="relative min-w-0">
                    <span className="block whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.18em]" style={{ color: on ? c.accent : "#64748b" }}>
                      <span className="hidden lg:inline">{String(i + 1).padStart(2, "0")} · </span>
                      {t.services.items[c.k].label.replace("-", "\u2011")}
                    </span>
                    <span className={`mt-0.5 hidden text-[1.02rem] font-extrabold leading-tight tracking-tight transition-colors duration-200 lg:block ${on ? "text-slate-50" : "text-slate-300"}`}>
                      {t.services.items[c.k].title}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className={`relative ml-auto hidden h-4 w-4 shrink-0 transition-all duration-300 lg:block ${on ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`}
                    fill="none" stroke={c.accent} strokeWidth="2.4" strokeLinecap="round"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
            {SERVICES.map((c, i) => {
              const on = i === active;
              const it = t.services.items[c.k];
              return (
                <article
                  key={c.k}
                  role="tabpanel"
                  id={`svc-panel-${c.k}`}
                  aria-labelledby={`svc-tab-${c.k}`}
                  hidden={!on}
                  className={on ? "svc-in grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : "hidden"}
                  style={{ ["--card-accent" as any]: c.accent }}
                >
                  {/* Илюстрация — на телефон отгоре, на широко вдясно */}
                  <div
                    className="relative order-first flex items-center justify-center overflow-hidden border-b border-white/[0.06] px-5 py-3 md:order-last md:border-b-0 md:border-l md:p-5"
                    style={{ background: `radial-gradient(ellipse at 50% 100%, color-mix(in srgb, ${c.accent} 16%, transparent), transparent 72%)` }}
                  >
                    <div className="w-full max-w-[190px] md:max-w-[420px]">
                      <ServiceIllustration id={c.k} accent={c.accent} />
                    </div>
                  </div>

                  <div className="flex flex-col p-5 sm:p-8">
                    <h3 className="text-[1.45rem] font-extrabold leading-[1.15] tracking-tight text-slate-50 [text-wrap:balance] sm:text-[1.7rem]">
                      {it.title}
                    </h3>
                    <div
                      aria-hidden
                      className="mt-4 h-[3px] w-12 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }}
                    />
                    <p className="mt-4 text-[15px] leading-relaxed text-slate-400 [text-wrap:pretty]">{it.text}</p>

                    <ul className="mb-6 mt-5 space-y-2.5">
                      {it.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[14px] leading-snug text-slate-300">
                          <span
                            className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                            style={{ background: `color-mix(in srgb, ${c.accent} 16%, transparent)`, color: c.accent }}
                          >
                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          </span>
                          <span className="[text-wrap:pretty]">{p}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Срокът и обещанието за цена са веднъж, под витрината. Тук остава само специфичното (напр. рекламният бюджет). */}
                    <div className="mt-auto flex flex-col gap-3 border-t border-white/[0.07] pt-5">
                      {it.priceNote !== t.services.items.site.priceNote && (
                        <p className="text-[12.5px] leading-snug text-slate-400 [text-wrap:pretty]"><span className="font-semibold text-slate-300">{it.price}</span> — {it.priceNote}</p>
                      )}
                      <RouterLink
                        to={href(servicePath(serviceById(c.k), lang))}
                        className="group/link inline-flex items-center gap-2 self-start text-[14.5px] font-bold transition-colors duration-200
                                   focus:outline-none focus-visible:underline"
                        style={{ color: c.accent }}
                      >
                        {t.services.more}
                        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </RouterLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }}
          custom={6}
          className="mt-14 text-center"
        >
          <div className="mx-auto flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
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
              <span className="relative">{t.services.cta}</span>
              <svg viewBox="0 0 24 24" className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </ScrollLink>

            <ScrollLink
              to="work"
              smooth
              duration={220}
              offset={-70}
              className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] px-7 text-[14px] font-semibold text-slate-300
                         transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-slate-100
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              {t.services.cta2}
            </ScrollLink>
          </div>
          {/* Обещанието вместо ценоразпис — плюс изход към статията с пазарния ориентир. */}
          <p className="balance mx-auto mt-6 max-w-[52ch] text-[13px] leading-relaxed text-slate-400">
            {t.services.pricePromise}{" "}
            {pricingPost && (
              <RouterLink
                to={href(postPath(pricingPost, lang))}
                className="whitespace-nowrap font-semibold text-slate-200 underline decoration-slate-600 underline-offset-2 transition-colors hover:text-white hover:decoration-cyan-400"
              >
                {t.services.priceLink} →
              </RouterLink>
            )}
          </p>
        </motion.div>

      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .balance { text-wrap: balance; }
        .svc-in { animation: svcIn .4s cubic-bezier(.22,1,.36,1); }
        @keyframes svcIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .svc-in { animation: none; } }
      `}</style>
    </section>
  );
}
