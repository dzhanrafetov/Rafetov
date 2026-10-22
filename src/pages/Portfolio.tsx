import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { useLang } from "../i18n";
import { whatsappHref } from "../constants/business";
import WhatsAppIcon from "../components/WhatsAppIcon";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const view = { once: true, amount: 0.05, margin: "0px 0px 200px 0px" } as const;

/**
 * Процесът в четири стъпки и най-честите въпроси. Стъпките са кратък текст в карти,
 * който се чете за десет секунди, и един бутон в края.
 */
export default function SectionProcessSimple() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="process" className="relative text-slate-200" style={{ backgroundColor: "#07090f" }}>
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[#1a2234]" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={view} className="text-center">
          <h2 className="balance mx-auto max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100">
            {t.process.h2a} <span className="text-cyan-300">{t.process.h2b}</span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[50ch] text-[15.5px] leading-relaxed text-slate-400">
            {t.process.sub}
          </p>
        </motion.div>

        {/* Стъпки: на телефон вертикална линия с номерата, на десктоп четири карти в ред, свързани с линия */}
        <ol className="relative mx-auto mt-12 grid max-w-6xl gap-3 sm:mt-14 lg:grid-cols-4 lg:gap-5">
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px lg:block" style={{ background: "linear-gradient(90deg,rgba(103,232,249,.45),rgba(103,232,249,.15) 50%,rgba(103,232,249,.45))" }} />
          {t.process.steps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={fade} initial="hidden" whileInView="show" viewport={view} custom={i + 1}
              className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 lg:flex lg:flex-col lg:gap-x-0"
            >
              <div className="relative flex justify-center lg:mb-5">
                {i < t.process.steps.length - 1 && (
                  <span aria-hidden className="absolute bottom-[-0.75rem] left-1/2 top-10 w-px -translate-x-1/2 bg-white/[0.09] lg:hidden" />
                )}
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/35 text-[14px] font-extrabold tabular-nums text-cyan-200 shadow-[0_0_0_6px_#07090f]" style={{ backgroundColor: "#0b1a22" }}>
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0 rounded-2xl border border-white/[0.08] p-5 transition-colors duration-300 hover:border-white/[0.14] sm:p-6 lg:flex-1" style={{ backgroundColor: "#0c111b" }}>
                <span className="inline-flex rounded-full bg-cyan-300/[0.08] px-2.5 py-1 text-[11.5px] font-bold text-cyan-200/90">{step.time}</span>
                <h3 className="mt-3 text-[1.1rem] font-extrabold leading-snug tracking-tight text-slate-50 sm:text-[1.15rem]">{step.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-400">{step.text}</p>
                <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-4">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13.5px] leading-snug text-slate-300">
                      <svg viewBox="0 0 24 24" className="mt-[3px] h-3.5 w-3.5 shrink-0 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* Въпроси: всеки въпрос е отделна карта, за да не се слива с фона; отляво заглавие и изход към WhatsApp */}
        <div className="mx-auto mt-20 grid max-w-6xl gap-8 sm:mt-24 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={view} className="text-center lg:sticky lg:top-28 lg:self-start lg:text-left">
            <h3 className="balance text-[clamp(1.5rem,4.2vw,2.1rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-slate-100">{t.process.faqEyebrow}</h3>
            <p className="mt-3 text-[15px] text-slate-400">{t.process.faqMore}</p>
            <a
              href={whatsappHref(t.whatsapp.text)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 items-center gap-2.5 rounded-full border border-white/[0.10] bg-white/[0.04] pl-2 pr-5 text-[14px] font-bold text-slate-100
                         transition-colors duration-200 hover:border-white/[0.18] hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="h-4 w-4" />
              </span>
              {t.process.faqMoreCta}
            </a>
          </motion.div>

          <div className="space-y-3">
            {t.process.faq.map((f, i) => {
              const expanded = open === i;
              return (
                <div
                  key={f.q}
                  className={`rounded-2xl border transition-colors duration-300 ${expanded ? "border-cyan-300/25" : "border-white/[0.08] hover:border-white/[0.14]"}`}
                  style={{ backgroundColor: expanded ? "#0d1520" : "#0c111b" }}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="group flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 sm:px-6 sm:py-5"
                  >
                    <span className={`text-[15px] font-semibold leading-snug transition-colors sm:text-[16px] ${expanded ? "text-slate-50" : "text-slate-200 group-hover:text-white"}`}>
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        expanded ? "rotate-45 bg-cyan-300 text-[#03060d]" : "bg-white/[0.06] text-slate-300 group-hover:bg-white/[0.1]"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
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
                        <p className="max-w-[62ch] px-5 pb-5 text-[14.5px] leading-relaxed text-slate-400 sm:px-6 sm:pb-6">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Един бутон */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={view} custom={2} className="mt-16 text-center sm:mt-20">
          <ScrollLink
            to="contact" smooth duration={220} offset={-70}
            className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full px-8 text-[14.5px] font-bold text-[#03060d]
                       shadow-[0_12px_40px_-14px_rgba(34,211,238,0.9)] transition-shadow duration-300 hover:shadow-[0_16px_50px_-14px_rgba(34,211,238,1)]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
            style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}
          >
            {t.process.cta}
            <svg viewBox="0 0 24 24" className="ml-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </ScrollLink>
          <p className="balance mx-auto mt-4 max-w-[34ch] text-[12.5px] text-slate-500 sm:max-w-none">
            {t.process.micro.replace(/ · /g, " · ")}
          </p>
        </motion.div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[#1a2234]" />
      <style>{`.balance { text-wrap: balance; }`}</style>
    </section>
  );
}
