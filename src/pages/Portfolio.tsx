import { useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }
  }),
};

const FAQ = [
  {
    q: "Колко време отнема?",
    a: "Сайт: около 1–3 седмици според обхвата и съдържанието. Онлайн магазин: около 2–4 седмици с интеграции (доставки, плащания).",
  },
  {
    q: "Какво трябва от мен?",
    a: "Кратко описание на бизнеса и целите, лого/снимки (ако има) и човек за обратна връзка. Останалото движим ние.",
  },
  {
    q: "Може ли от стар сайт?",
    a: "Да. Прехвърляме съдържание, подреждаме структурата и подобряваме скоростта и видимостта в Google.",
  },
];

export default function SectionProcessSimple() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="process"
      className="relative isolate overflow-hidden text-slate-200"
      style={
        {
          backgroundColor: "#0b0f19",
          ["--accent"]: "#22D3EE",
          ["--hairline"]: "#1f2937",
        } as React.CSSProperties
      }
    >
      {/* hairline top */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">
        {/* Header */}
        <motion.div variants={fade} initial="hidden" animate="show" className="text-center">
          <div className="mx-auto mb-3 w-fit text-[12px] uppercase tracking-[0.18em] text-slate-400">процес</div>
          <h2 className="balance mx-auto max-w-[26ch] text-[clamp(1.9rem,5.8vw,2.6rem)] font-extrabold leading-[1.06] tracking-tight text-slate-100">
            Как работим — кратко и ясно
          </h2>
          <p className="balance mx-auto mt-4 max-w-[50ch] text-[15.5px] leading-relaxed text-slate-300">
            4 стъпки, без излишно. Вие давате идеи и материали — ние движим всичко останало.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              title: "Кратък разговор (15 мин)",
              text: "Уточняваме целта: повече запитвания, продажби или по-ясно представяне.",
              bullets: ["Без подготовка", "По телефон или онлайн"],
            },
            {
              n: "02",
              title: "План и оферта",
              text: "Получавате ясен план с етапи и срокове. Без „дребен шрифт“.",
              bullets: ["Фиксирани стъпки", "Реалистични срокове"],
            },
            {
              n: "03",
              title: "Изработка",
              text: "Дизайн + съдържание + настройки. Даваме визуализации преди пускане.",
              bullets: ["Мобилна версия", "SEO основи"],
            },
            {
              n: "04",
              title: "Старт и растеж",
              text: "Публикуваме и следим. По желание включваме реклами и надграждане.",
              bullets: ["Техническа поддръжка", "Идеи за подобрение"],
            },
          ].map((s, i) => (
            <motion.article
              key={s.n}
              variants={fade}
              initial="hidden"
              animate="show"
              custom={i + 1}
              className="group rounded-2xl border border-slate-700/60 bg-[#0f1424] p-5"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-[13px] font-bold text-slate-200">
                  {s.n}
                </span>
                <div className="h-[2px] w-8 rounded-full bg-[var(--accent)]/70" aria-hidden />
              </div>

              <h3 className="mt-3 text-[clamp(1.2rem,2.4vw,1.4rem)] font-extrabold leading-[1.15] tracking-tight text-slate-100">
                {s.title}
              </h3>

              <p className="mt-2 text-[15px] leading-relaxed text-slate-300/90">{s.text}</p>

              <ul className="mt-3 space-y-1.5 text-[13.5px] text-slate-300/90">
                {s.bullets.map((b) => (
                  <li key={b} className="inline-flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--accent)]" aria-hidden>
                      <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* FAQ — нов, по-четим акордеон */}
        <motion.div variants={fade} initial="hidden" animate="show" custom={6} className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-2xl border border-slate-700/60 bg-[#0f1424]">
            {FAQ.map((f, i) => {
              const expanded = open === i;
              const cid = `faq-${i}`;
              return (
                <div key={f.q} className={i !== FAQ.length - 1 ? "border-b border-slate-700/60" : ""}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={cid}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
                  >
                    <span className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
                      <span className="text-[16.5px] font-semibold leading-snug text-slate-100 sm:text-[17px]">
                        {f.q}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 text-slate-400 transition-transform ${expanded ? "rotate-45" : ""}`}
                      aria-hidden
                    >
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                  </button>

                  <motion.div
                    id={cid}
                    role="region"
                    initial={false}
                    animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-4 pb-5 pt-0 text-[14.5px] leading-relaxed text-slate-300 sm:px-5">
                      {f.a}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fade} initial="hidden" animate="show" custom={7} className="mt-10 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ScrollLink
              to="contact"
              smooth
              duration={220}
              offset={-70}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-200/10 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 cursor-pointer"
            >
              Започнете безплатна консултация
            </ScrollLink>
            <ScrollLink
              to="work"
              smooth
              duration={220}
              offset={-70}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700/60 px-6 text-sm font-semibold text-slate-200 hover:bg-[#101626] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/40 cursor-pointer"
            >
              Вижте реални проекти
            </ScrollLink>
          </div>
          <div className="mt-3 text-[12.5px] text-slate-400">15 минути, без ангажимент.</div>
        </motion.div>
      </div>

      {/* hairline bottom */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .balance { text-wrap: balance }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </section>
  );
}