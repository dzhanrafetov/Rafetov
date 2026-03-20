import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const STEPS = [
  {
    n: "01",
    accent: "#22D3EE",
    glow: "rgba(34,211,238,.18)",
    title: "Разговор",
    time: "15 мин",
    desc: "Свързвате се с нас по телефон, Viber или форма. Разбираме какво ви трябва и даваме честна оценка.",
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
    title: "Оферта",
    time: "до 24 ч",
    desc: "Получавате ясна оферта с фиксирана цена, точен срок и списък на всичко включено.",
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
    title: "Разработка",
    time: "1 – 2 седм.",
    desc: "Правим сайта. Показваме ви версия за преглед и приемаме корекции преди финалното пускане.",
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
    title: "Пускане",
    time: "готово 🚀",
    desc: "Качваме сайта на живо, обучаваме ви как да го ползвате и оставаме на линия след пускането.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
      </svg>
    ),
  },
];

const FAQ_ITEMS = [
  { accent: "#22D3EE", q: "Колко време отнема един проект?", a: "Обикновено 1 до 2 седмици от потвърждението. Казваме ви точен срок в офертата." },
  { accent: "#34D399", q: "Каква е вашата ценова политика?", a: "Работим с фиксирани цени — без изненади. Знаете точно колко ще платите преди да започнем." },
  { accent: "#A78BFA", q: "Предоставяте ли поддръжка след пускане?", a: "Да. Имаме пакети за поддръжка — от малки промени до пълно обслужване на сайта." },
  { accent: "#FBBF24", q: "Как мога да следя прогреса на проекта?", a: "Комуникираме редовно в Viber или по имейл. Показваме ви версия за преглед преди финалното пускане." },
  { accent: "#22D3EE", q: "Мога ли да правя промени докато се работи?", a: "Да, прилагаме гъвкав подход. Важното е промените да бъдат обсъдени навреме." },
  { accent: "#34D399", q: "Правите ли интеграция с Еконт и Спиди?", a: "Да — за онлайн магазини интегрираме Еконт и Спиди за автоматично изчисляване на доставка." },
  { accent: "#A78BFA", q: "Имате ли опит с платежни системи?", a: "Да. Интегрираме плащания с карти, банков превод и Stripe/Revolut според нуждите ви." },
  { accent: "#FBBF24", q: "Какви технологии използвате?", a: "React, Next.js, Node.js, PHP/WordPress — избираме правилното решение спрямо проекта, не обратното." },
];

export default function FAQPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden text-slate-200"
      style={{ backgroundColor: "#07090f", ["--hairline" as any]: "#1a2234" }}
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
          [background-size:28px_28px]" />
        <div className="absolute -left-72 top-32 h-[600px] w-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle,#22D3EE 0%,transparent 65%)" }} />
        <div className="absolute -right-72 top-1/2 h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle,#A78BFA 0%,transparent 65%)" }} />
        <div className="absolute left-1/3 bottom-0 h-[400px] w-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle,#34D399 0%,transparent 65%)" }} />
      </div>

      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">

        {/* ── PROCESS HEADER ── */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            процес
          </span>
          <h2 className="balance mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100">
            От разговор до{" "}
            <span style={{
              background: "linear-gradient(110deg,#22d3ee 0%,#a78bfa 60%,#34d399 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              готов сайт
            </span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400">
            4 стъпки. Ясно и без изненади.
          </p>
        </motion.div>

        {/* ── TIMELINE ── */}
        <div className="mt-16 relative">

          {/* Connector line — desktop only */}
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
                className="group relative flex flex-col"
              >
                {/* Circle node */}
                <div className="relative z-10 mx-auto mb-6 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{
                    borderColor: s.accent,
                    background: `color-mix(in srgb,${s.accent} 14%,#07090f)`,
                    boxShadow: `0 0 24px -6px ${s.accent}`,
                    color: s.accent,
                  }}
                >
                  {s.icon}
                </div>

                {/* Card */}
                <div
                  className="group/card relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* hover glow */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group/card-hover:opacity-100 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 50% 0%,${s.glow},transparent 70%)` }} />
                  {/* top border accent */}
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

                  <p className="flex-1 text-[13.5px] leading-relaxed text-slate-400">{s.desc}</p>

                  {/* Large ghost number */}
                  <span aria-hidden className="absolute -bottom-3 -right-1 select-none text-[5rem] font-black leading-none tabular-nums opacity-[0.04] group-hover:opacity-[0.07] transition-opacity"
                    style={{ color: s.accent }}>{s.n}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div aria-hidden className="my-20 flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,transparent,#1a2234)" }} />
          <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
          <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,#1a2234,transparent)" }} />
        </div>

        {/* ── FAQ HEADER ── */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            въпроси
          </span>
          <h2 className="balance mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100">
            Имате{" "}
            <span style={{
              background: "linear-gradient(110deg,#e2e8f0 0%,#f1f5f9 50%,#94a3b8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              въпроси?
            </span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400">
            Отговори на най-честите въпроси. Не намирате своя — пишете ни.
          </p>
        </motion.div>

        {/* ── FAQ 2-COL GRID ── */}
        <div className="mx-auto mt-10 max-w-5xl grid grid-cols-1 gap-3 lg:grid-cols-2">
          {FAQ_ITEMS.map((item, i) => {
            const open = expanded === i;
            return (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                custom={i + 1}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : i)}
                  className="group w-full overflow-hidden rounded-2xl border text-left transition-all duration-200"
                  style={{
                    borderColor: open
                      ? `color-mix(in srgb,${item.accent} 35%,transparent)`
                      : "rgba(255,255,255,0.07)",
                    background: open
                      ? `color-mix(in srgb,${item.accent} 5%,rgba(255,255,255,0.025))`
                      : "rgba(255,255,255,0.025)",
                  }}
                >
                  {/* Accent top bar */}
                  <div aria-hidden className="h-[2px] w-full transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg,${item.accent},transparent)`,
                      opacity: open ? 0.7 : 0,
                    }} />

                  <div className="px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Number badge */}
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-black tabular-nums transition-colors duration-200"
                          style={{
                            background: open
                              ? `color-mix(in srgb,${item.accent} 20%,transparent)`
                              : "rgba(255,255,255,0.05)",
                            color: open ? item.accent : "#64748b",
                            border: `1px solid ${open ? `color-mix(in srgb,${item.accent} 30%,transparent)` : "rgba(255,255,255,0.08)"}`,
                          }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[14.5px] font-semibold leading-snug text-slate-100 group-hover:text-white transition-colors">
                          {item.q}
                        </span>
                      </div>

                      {/* Toggle icon */}
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
                        style={{
                          borderColor: open
                            ? `color-mix(in srgb,${item.accent} 40%,transparent)`
                            : "rgba(255,255,255,0.1)",
                          background: open
                            ? `color-mix(in srgb,${item.accent} 15%,transparent)`
                            : "rgba(255,255,255,0.04)",
                          transform: open ? "rotate(45deg)" : "rotate(0deg)",
                          color: open ? item.accent : "#94a3b8",
                        }}
                      >
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="ans"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 pl-9 text-[13.5px] leading-relaxed text-slate-400 border-t pt-4"
                            style={{ borderColor: `color-mix(in srgb,${item.accent} 15%,rgba(255,255,255,0.05))` }}>
                            {item.a}
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

        {/* ── CTA ── */}
        <motion.div
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={5}
          className="mt-16 text-center"
        >
          <p className="mb-5 text-[14px] text-slate-500">Не намерихте отговора? Пишете ни — отговаряме бързо.</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ScrollLink
              to="contact" smooth duration={220} offset={-70}
              className="group relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full px-7 text-[14px] font-bold text-[#03060d]
                         shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.75)]"
              style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}
            >
              <span aria-hidden className="absolute inset-0 -skew-x-[20deg] -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Пишете ни</span>
              <svg viewBox="0 0 24 24" className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </ScrollLink>
          </div>
        </motion.div>

      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .balance { text-wrap: balance; }
        .group\/card-hover\:opacity-100:is(:hover *) { opacity: 1; }
      `}</style>
    </section>
  );
}
