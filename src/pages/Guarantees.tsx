import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { useLang } from "../i18n";
import type { CareKey } from "../i18n/types";
import { CareArt } from "../services/HomeArt";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ITEMS: { k: CareKey; accent: string; glow: string; icon: JSX.Element }[] = [
  {
    k: "hosting",
    accent: "#22D3EE",
    glow: "rgba(34,211,238,.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7Z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z" />
      </svg>
    ),
  },
  {
    k: "support",
    accent: "#34D399",
    glow: "rgba(52,211,153,.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    k: "training",
    accent: "#A78BFA",
    glow: "rgba(167,139,250,.15)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    k: "price",
    accent: "#FBBF24",
    glow: "rgba(251,191,36,.13)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
  },
];

export default function Guarantees() {
  const { t } = useLang();
  return (
    <section
      id="care"
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
          className="absolute -right-60 top-1/4 h-[480px] w-[480px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #34D399 0%, transparent 65%)" }}
        />
        <div
          className="absolute -left-60 bottom-1/4 h-[420px] w-[420px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #22D3EE 0%, transparent 65%)" }}
        />
      </div>

      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">

        {/* Header */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            {t.care.eyebrow}
          </span>
          <h2 className="balance mx-auto mt-5 max-w-[26ch] text-[clamp(1.6rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-normal sm:tracking-[-0.02em] text-slate-100">
            {t.care.h2a}{" "}
            <span className="gradient-text">
              {t.care.h2b}
            </span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[50ch] text-[15.5px] leading-relaxed text-slate-400">
            {t.care.sub}
          </p>
        </motion.div>

        {/* Illustration + cards */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px] lg:col-span-5"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/[0.12]" />
              <div className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet-400/[0.12]" />
            </div>
            <CareArt />
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
          {ITEMS.map((c, i) => (
            <motion.article
              key={c.k}
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={i + 1}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${c.glow}, transparent 70%)` }}
              />
              {/* Top border glow */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }}
              />

              {/* Icon */}
              <div
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  background: `color-mix(in srgb, ${c.accent} 12%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${c.accent} 22%, transparent)`,
                  color: c.accent,
                }}
              >
                {c.icon}
              </div>

              <h3 className="text-[1.1rem] font-extrabold leading-[1.2] tracking-tight text-slate-100">
                {t.care.items[c.k].title}
              </h3>

              <div
                aria-hidden
                className="mt-3 h-px w-10 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }}
              />

              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-400">
                {t.care.items[c.k].text}
              </p>
            </motion.article>
          ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
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
              <span className="relative">{t.care.cta}</span>
              <svg viewBox="0 0 24 24" className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </ScrollLink>

            <a
              href="tel:+359897758062"
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-7 text-[14px] font-semibold text-slate-300
                         transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-slate-100
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 5.2 2 2 0 0 1 4.1 3h2a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.5 2.1L7.4 10a16 16 0 0 0 6.6 6.6l.9-.8a2 2 0 0 1 2.1-.5c.7.3 1.5.5 2.3.6A2 2 0 0 1 22 16.9Z" />
              </svg>
              +359 897 758 062
            </a>
          </div>
          <p className="balance mx-auto mt-4 max-w-[30ch] text-[12px] font-medium uppercase tracking-wider text-slate-500 sm:max-w-none">
            {t.care.micro.replace(/ · /g, "\u00A0· ")}
          </p>
        </motion.div>

      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .balance { text-wrap: balance; }
      `}</style>
    </section>
  );
}
