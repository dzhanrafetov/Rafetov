import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }
  }),
};

export default function SectionServicesPlainSpeak() {
  return (
    <section
      id="services"
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
          <div className="mx-auto mb-3 w-fit text-[12.5px] uppercase tracking-[0.18em] text-slate-400">
            услуги
          </div>
          <h2 className="balance mx-auto max-w-[26ch] text-[clamp(1.9rem,5.8vw,2.6rem)] font-extrabold leading-[1.06] tracking-tight text-slate-100">
            Как помагаме — просто и ясно
          </h2>
          <p className="balance mx-auto mt-4 max-w-[50ch] text-[15.5px] leading-relaxed text-slate-300">
            Без сложни думи. Правим неща, които работят и са лесни за ползване.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              k: "site",
              title: "Сайт",
              // НОВ, по-силен текст за „Сайт“
              text:
                "Начална страница, която казва за секунди с какво помагате — и води към „Обади се“ или „Пиши“. " +
                "Лек, бърз и супер четим на телефон.",
              points: [
                "Ясно послание + снимка/видео на началото",
                "Меню до 5 раздела: Начало · За нас · Услуги · Галерия · Контакт",
                "Бутони „Обади се/Пиши“ на видими места",
              ],
            },
            {
              k: "shop",
              title: "Онлайн магазин",
              text: "Продавате лесно от първия ден.",
              points: ["Каталог с продукти", "Поръчки и плащания", "Проследяване на доставки"],
            },
            {
              k: "ads",
              title: "Реклами",
              text: "Повече хора научават за вас.",
              points: ["Facebook и Instagram", "Google търсене и банери", "Показваме на точните хора"],
            },
            {
              k: "menu",
              title: "Дигитално меню",
              text: "QR меню за заведения.",
              points: ["Сканираш и виждаш менюто", "Снимки и описания", "Менюто е винаги актуално"],
            },
          ].map((c, i) => (
            <motion.article
              key={c.k}
              variants={fade}
              initial="hidden"
              animate="show"
              custom={i + 1}
              className="rounded-2xl border border-slate-700/60 bg-[#0f1424] p-5"
            >
              {/* малък таг */}
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-[#0b1220] px-2.5 py-1 text-[12px] text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                услуга
              </div>

              {/* ГОЛЯМО име на услуга + тънък акцент */}
              <h3 className="mt-2 text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold leading-[1.08] tracking-tight text-slate-100">
                {c.title}
              </h3>
              <div aria-hidden className="mt-1 h-[2px] w-12 rounded-full" style={{ backgroundColor: "var(--accent)" }} />

              <p className="mt-3 text-[15.5px] leading-relaxed text-slate-200">{c.text}</p>

              <ul className="mt-4 space-y-1.5 text-[13.75px] text-slate-300">
                {c.points.map((p) => (
                  <li key={p} className="inline-flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--accent)]" aria-hidden>
                      <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Section CTA (без цени, ясни действия) */}
        <motion.div variants={fade} initial="hidden" animate="show" custom={6} className="mt-10 text-center sm:mt-12">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ScrollLink
              to="contact"
              smooth
              duration={220}
              offset={-70}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-200/10 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 cursor-pointer"
              aria-label="Пишете ни"
            >
              Пишете ни
            </ScrollLink>
            <ScrollLink
              to="work"
              smooth
              duration={220}
              offset={-70}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700/60 px-6 text-sm font-semibold text-slate-200 hover:bg-[#101626] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/40 cursor-pointer"
              aria-label="Вижте проекти"
            >
              Вижте проекти
            </ScrollLink>
          </div>
          <div className="mt-3 text-[12.5px] text-slate-400">Отговаряме бързо. Няма спам.</div>
        </motion.div>
      </div>

      {/* hairline bottom */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .balance { text-wrap: balance }
      `}</style>
    </section>
  );
}