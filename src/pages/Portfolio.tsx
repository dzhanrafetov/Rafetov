import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const STEPS = [
  {
    n: "01",
    accent: "#22D3EE",
    glow: "rgba(34,211,238,.18)",
    title: "Кратък разговор",
    time: "15 мин",
    text: "Уточняваме целта: повече запитвания, продажби или по-ясно представяне.",
    bullets: ["Без подготовка", "По телефон или онлайн"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    n: "02",
    accent: "#34D399",
    glow: "rgba(52,211,153,.18)",
    title: "План и оферта",
    time: "до 24 ч",
    text: "Получавате ясен план с етапи и срокове. Без \"дребен шрифт\".",
    bullets: ["Фиксирани стъпки", "Реалистични срокове"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    n: "03",
    accent: "#A78BFA",
    glow: "rgba(167,139,250,.18)",
    title: "Изработка",
    time: "1 – 2 седм.",
    text: "Дизайн + съдържание + настройки. Даваме визуализации преди пускане.",
    bullets: ["Мобилна версия", "SEO основи"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    n: "04",
    accent: "#FBBF24",
    glow: "rgba(251,191,36,.15)",
    title: "Старт и растеж",
    time: "готово 🚀",
    text: "Публикуваме и следим. По желание включваме реклами и надграждане.",
    bullets: ["Техническа поддръжка", "Идеи за подобрение"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
      </svg>
    ),
  },
];

const FAQ = [
  {
    accent: "#22D3EE",
    q: "Колко време отнема?",
    a: "Сайт: около 1–3 седмици според обхвата и съдържанието. Онлайн магазин: около 2–4 седмици с интеграции (доставки, плащания).",
  },
  {
    accent: "#34D399",
    q: "Какво трябва от мен?",
    a: "Кратко описание на бизнеса и целите, лого/снимки (ако има) и човек за обратна връзка. Останалото движим ние.",
  },
  {
    accent: "#A78BFA",
    q: "Може ли от стар сайт?",
    a: "Да. Прехвърляме съдържание, подреждаме структурата и подобряваме скоростта и видимостта в Google.",
  },
];

export default function SectionProcessSimple() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="process"
      className="relative isolate overflow-hidden text-slate-200"
      style={{ backgroundColor: "#07090f", ["--hairline" as any]: "#1a2234" }}
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
          [background-size:28px_28px]" />
        <div className="absolute -right-60 top-24 h-[500px] w-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle,#22D3EE 0%,transparent 65%)" }} />
        <div className="absolute -left-60 bottom-24 h-[420px] w-[420px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle,#A78BFA 0%,transparent 65%)" }} />
      </div>

      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">

        {/* Header */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            процес
          </span>
          <h2 className="balance mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100">
            Как работим —{" "}
            <span style={{
              background: "linear-gradient(110deg,#22d3ee 0%,#a78bfa 60%,#34d399 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              кратко и ясно
            </span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[50ch] text-[15.5px] leading-relaxed text-slate-400">
            4 стъпки, без излишно. Вие давате идеи и материали — ние движим всичко останало.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-16 relative">
          {/* Connector line — desktop */}
          <div aria-hidden className="hidden lg:block absolute top-[52px] left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px"
            style={{ background: "linear-gradient(90deg,#22D3EE,#34D399,#A78BFA,#FBBF24)", opacity: 0.25 }} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={i + 1}
                className="group flex flex-col"
              >
                {/* Circle node */}
                <div className="relative z-10 mx-auto mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    borderColor: s.accent,
                    background: `color-mix(in srgb,${s.accent} 14%,#07090f)`,
                    boxShadow: `0 0 24px -6px ${s.accent}`,
                    color: s.accent,
                  }}>
                  {s.icon}
                </div>

                {/* Card */}
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1">
                  {/* hover glow */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 50% 0%,${s.glow},transparent 70%)` }} />
                  {/* top accent */}
                  <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg,transparent,${s.accent} 40%,transparent)`, opacity: 0.55 }} />

                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: s.accent }}>
                      Стъпка {s.n}
                    </span>
                    <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
                      style={{
                        borderColor: `color-mix(in srgb,${s.accent} 30%,transparent)`,
                        color: s.accent,
                        background: `color-mix(in srgb,${s.accent} 8%,transparent)`,
                      }}>
                      {s.time}
                    </span>
                  </div>

                  <h3 className="text-[1.1rem] font-extrabold tracking-tight text-slate-100 mb-2">{s.title}</h3>

                  <div aria-hidden className="mb-3 h-px w-8 rounded-full transition-all duration-300 group-hover:w-14"
                    style={{ background: `linear-gradient(90deg,${s.accent},transparent)` }} />

                  <p className="text-[13.5px] leading-relaxed text-slate-400 mb-3">{s.text}</p>

                  <ul className="mt-auto space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-[13px] text-slate-300">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{ background: `color-mix(in srgb,${s.accent} 15%,transparent)`, color: s.accent }}>
                          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <span aria-hidden className="absolute -bottom-3 -right-1 select-none text-[5rem] font-black leading-none tabular-nums opacity-[0.04] group-hover:opacity-[0.07] transition-opacity"
                    style={{ color: s.accent }}>{s.n}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div aria-hidden className="my-16 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,transparent,#1a2234)" }} />
          <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
          <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,#1a2234,transparent)" }} />
        </div>

        {/* FAQ */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            бързи отговори
          </span>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {FAQ.map((f, i) => {
            const expanded = open === i;
            return (
              <motion.div
                key={f.q}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                custom={i + 1}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : i)}
                  className="group w-full overflow-hidden rounded-2xl border text-left transition-all duration-200"
                  style={{
                    borderColor: expanded
                      ? `color-mix(in srgb,${f.accent} 35%,transparent)`
                      : "rgba(255,255,255,0.07)",
                    background: expanded
                      ? `color-mix(in srgb,${f.accent} 5%,rgba(255,255,255,0.025))`
                      : "rgba(255,255,255,0.025)",
                  }}
                >
                  <div aria-hidden className="h-[2px] w-full transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg,${f.accent},transparent)`, opacity: expanded ? 0.7 : 0 }} />

                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-black transition-colors"
                          style={{
                            background: expanded ? `color-mix(in srgb,${f.accent} 20%,transparent)` : "rgba(255,255,255,0.05)",
                            color: expanded ? f.accent : "#64748b",
                            border: `1px solid ${expanded ? `color-mix(in srgb,${f.accent} 30%,transparent)` : "rgba(255,255,255,0.08)"}`,
                          }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] font-semibold text-slate-100 group-hover:text-white transition-colors">
                          {f.q}
                        </span>
                      </div>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
                        style={{
                          borderColor: expanded ? `color-mix(in srgb,${f.accent} 40%,transparent)` : "rgba(255,255,255,0.1)",
                          background: expanded ? `color-mix(in srgb,${f.accent} 15%,transparent)` : "rgba(255,255,255,0.04)",
                          transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
                          color: expanded ? f.accent : "#94a3b8",
                        }}>
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          key="ans"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 pl-9 text-[13.5px] leading-relaxed text-slate-400 border-t pt-4"
                            style={{ borderColor: `color-mix(in srgb,${f.accent} 15%,rgba(255,255,255,0.05))` }}>
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={5} className="mt-14 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ScrollLink
              to="contact" smooth duration={220} offset={-70}
              className="group relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full px-7 text-[14px] font-bold text-[#03060d]
                         shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.75)]"
              style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}
            >
              <span aria-hidden className="absolute inset-0 -skew-x-[20deg] -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Започнете безплатна консултация</span>
              <svg viewBox="0 0 24 24" className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </ScrollLink>
            <ScrollLink
              to="work" smooth duration={220} offset={-70}
              className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] px-7 text-[14px] font-semibold text-slate-300
                         transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-slate-100"
            >
              Вижте реални проекти
            </ScrollLink>
          </div>
          <p className="mt-4 text-[12px] font-medium text-slate-500 uppercase tracking-wider">
            15 минути · Без ангажимент · Отговаряме бързо
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
