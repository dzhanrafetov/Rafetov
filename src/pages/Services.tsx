import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SERVICES = [
  {
    k: "site",
    accent: "#22D3EE",
    glow: "rgba(34,211,238,.15)",
    label: "Сайт",
    title: "Корпоративен сайт",
    text: "Сайт, който с едно изречение казва кой сте и как помагате. Бърз, чист, удобен на телефон и готов за Google.",
    points: [
      "Многоезичност (BG / EN / …)",
      "Ясно заглавие и видими бутони за контакт",
      "Карта, телефон и кратка форма",
    ],
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
    label: "E-магазин",
    title: "Онлайн магазин",
    text: "Магазин, който продава лесно от телефон и компютър. Приема плащания от цял свят.",
    points: [
      "Плащания: карти, банков превод",
      "Промокодове, отстъпки и промо кампании",
      "Интеграции с Еконт и Спиди",
    ],
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
    label: "Реклами",
    title: "Performance реклами",
    text: "Показваме ви във Facebook, Instagram и Google на точните хора. Цел: запитвания и продажби.",
    points: [
      "Facebook и Instagram кампании",
      "Google търсене и банери",
      "Седмична оптимизация и отчет",
    ],
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
    label: "Меню",
    title: "Дигитално меню",
    text: "QR меню — клиентът сканира и вижда менюто на телефона. Винаги актуално, без нов печат.",
    points: [
      "Снимки, категории и алергени",
      "Бърза промяна от телефон",
      "QR кодове за маси",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h5" />
      </svg>
    ),
  },
];

export default function Services() {
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
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            услуги
          </span>
          <h2 className="balance mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100">
            Как помагаме —{" "}
            <span
              style={{
                background: "linear-gradient(110deg, #e2e8f0 0%, #f1f5f9 50%, #94a3b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              просто и ясно
            </span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400">
            Без сложни думи. Правим неща, които работят и са лесни за ползване.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((c) => (
            <motion.article
              key={c.k}
              className="svc-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300
                         hover:-translate-y-1"
              style={{
                ["--card-accent" as any]: c.accent,
                ["--card-glow" as any]: c.glow,
              }}
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

              {/* Label */}
              <div
                className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: c.accent }}
              >
                {c.label}
              </div>

              {/* Title */}
              <h3 className="text-[1.15rem] font-extrabold leading-[1.15] tracking-tight text-slate-100">
                {c.title}
              </h3>

              {/* Divider */}
              <div
                aria-hidden
                className="mt-3 h-px w-10 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }}
              />

              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-400">
                {c.text}
              </p>

              <ul className="mt-4 space-y-2">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[13px] text-slate-300">
                    <span
                      className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: `color-mix(in srgb, ${c.accent} 15%, transparent)`,
                        color: c.accent,
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
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
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
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
              <span className="relative">Пишете ни</span>
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
              Вижте проекти
            </ScrollLink>
          </div>
          <p className="mt-4 text-[12px] font-medium text-slate-500 uppercase tracking-wider">
            Отговаряме бързо · Няма спам
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
