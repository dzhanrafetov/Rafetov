import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n";
import { GOOGLE_REVIEWS } from "../constants/business";
import { PROJECTS } from "../constants/projects";
import LogoMark from "../components/LogoMark";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const view = { once: true, amount: 0.2 } as const;

/**
 * „Кой стои зад сайта“: снимка и няколко изречения от първо лице.
 * Повечето нови клиенти идват от видеата и търсят същия човек — без тази секция сайтът изглежда като анонимна агенция.
 */
/** `page`: секцията е начало на страницата „За нас“ (заглавието е h1, повече въздух отгоре). */
export default function About({ page = false }: { page?: boolean }) {
  const { t, lang } = useLang();
  const Heading = page ? "h1" : "h2";
  const rating = GOOGLE_REVIEWS.rating.toLocaleString(lang, { minimumFractionDigits: 1 });
  const facts = [
    { v: String(PROJECTS.length), l: t.about.facts.projects },
    { v: "6", l: t.about.facts.countries },
    { v: rating, l: t.about.facts.rating.replace("{n}", String(GOOGLE_REVIEWS.count)) },
  ];

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden text-slate-200"
      style={{ backgroundColor: "#07090f", "--hairline": "#1a2234" } as CSSProperties}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      {/* На мобилно: заглавие → снимка → текст. На десктоп снимката е вляво, заглавието и текстът вдясно. */}
      <div className={`relative mx-auto grid max-w-7xl gap-y-8 px-5 pb-16 [grid-template-areas:'head'_'photo'_'body'] sm:px-6 sm:pb-24 ${page ? "pt-28 sm:pt-36" : "pt-16 sm:pt-24"}
                      lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-0 lg:[grid-template-areas:'photo_head'_'photo_body']`}>

        {/* Снимка */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={view} className="mx-auto w-full max-w-[420px] [grid-area:photo] lg:max-w-none lg:self-center">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]">
              <img
                src="/about/dzhan.webp"
                srcSet="/about/dzhan.webp 880w, /about/dzhan@2x.webp 1120w"
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 420px, 90vw"
                width={880}
                height={1100}
                alt={t.about.photoAlt}
                loading="lazy"
                decoding="async"
                className="block aspect-[5/4] w-full object-cover object-[35%_30%] sm:aspect-[4/5] sm:object-center"
              />
              {/* Подпис върху долния край на снимката: марката, не името. Градиентът е тук, а не в снимката, за да може тя да се сменя свободно. */}
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: "linear-gradient(to top,rgba(7,9,15,.85),rgba(7,9,15,.35) 55%,transparent)" }} />
              <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/40 text-white backdrop-blur-sm">
                    <LogoMark className="h-4 w-auto" />
                  </span>
                  <span className="text-[14px] font-bold leading-tight text-white">{t.about.photoAlt}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Заглавие — на телефон е центрирано като всички други заглавия в сайта, на десктоп е ляво до снимката */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={view} className="text-center [grid-area:head] lg:self-end lg:text-left">
          <Heading className="mx-auto max-w-[22ch] text-[clamp(1.9rem,5.5vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100 lg:mx-0 lg:max-w-none" style={{ textWrap: "balance" } as CSSProperties}>
            {t.about.h2a}{" "}
            <span className="gradient-text">{t.about.h2b}</span>
          </Heading>
        </motion.div>

        {/* Текст */}
        <div className="[grid-area:body] lg:self-start lg:pt-6">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={view} custom={1} className="mx-auto max-w-[58ch] space-y-4 text-center text-[16px] lg:text-left leading-[1.75] text-slate-400 lg:mx-0">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </motion.div>

          {/* Числата — без бутони: формата е веднага под секцията. */}
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={view} custom={2} className="mx-auto mt-8 max-w-[560px] overflow-hidden rounded-2xl border border-white/[0.08] lg:mx-0" style={{ backgroundColor: "#0c111b" }}>
            <dl className="grid grid-cols-3 divide-x divide-white/[0.07]">
              {facts.map((f) => (
                <div key={f.l} className="px-3 py-5 text-center sm:px-5 lg:text-left">
                  <dt className="sr-only">{f.l}</dt>
                  <dd className="text-[1.6rem] font-extrabold leading-none tracking-[-0.02em] text-slate-50 sm:text-[1.9rem]">{f.v}</dd>
                  <dd className="mt-1.5 text-[11.5px] leading-snug text-slate-400 sm:text-[12.5px]">{f.l}</dd>
                </div>
              ))}
            </dl>

          </motion.div>
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />
    </section>
  );
}
