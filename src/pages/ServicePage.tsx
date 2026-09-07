import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang, withLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { SITE_ORIGIN } from "../seo/head";
import { SERVICES, findService, findServiceAnyLang, serviceAlternates, servicePath, type Service } from "../services";
import { Icon } from "../services/icons";
import ServiceIllustration from "../services/ServiceArt";
import { PROJECTS, CardsGrid } from "./OnlinePresenceCTA";
import { POSTS } from "../blog";
import BlogCard from "../blog/BlogCard";
import NotFound from "./NotFound";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const STEP_ACCENTS = ["#22D3EE", "#34D399", "#A78BFA", "#FBBF24"];

export default function ServicePage() {
  const { base = "", slug = "" } = useParams();
  const { lang } = useLang();
  const service = findService(lang, base, slug);

  if (!service) {
    const other = findServiceAnyLang(base, slug);
    if (other) return <Navigate to={withLang(servicePath(other.service, other.lang), other.lang)} replace />;
    return <NotFound />;
  }
  return <ServiceView service={service} />;
}

function SectionTitle({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400">{children}</h2>
      {right}
    </div>
  );
}

function ServiceView({ service }: { service: Service }) {
  const { lang, t, href } = useLang();
  const c = service.content[lang];
  const accent = service.accent;
  const path = servicePath(service, lang);
  const url = `${SITE_ORIGIN}${withLang(path, lang)}`;

  useSeo({
    title: c.metaTitle,
    description: c.metaDescription,
    path,
    alternates: serviceAlternates(service),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name: c.title,
        description: c.metaDescription,
        serviceType: t.services.items[service.id].title,
        provider: { "@id": `${SITE_ORIGIN}/#organization` },
        areaServed: ["BG", "DE", "AT", "CH", "GB", "BE", "NO", "ES"],
        url,
        inLanguage: lang,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Rafetov.com", item: `${SITE_ORIGIN}${withLang("/", lang)}` },
          { "@type": "ListItem", position: 2, name: t.header.links.services, item: `${SITE_ORIGIN}${withLang("/", lang)}#services` },
          { "@type": "ListItem", position: 3, name: c.title, item: url },
        ],
      },
    ],
  });

  const projects = service.tag ? PROJECTS.filter((p) => p.tag === service.tag).slice(0, 3) : [];
  const related = service.relatedPosts.map((id) => POSTS.find((p) => p.id === id)).filter(Boolean) as typeof POSTS;
  const others = SERVICES.filter((s) => s.id !== service.id);

  const ctaPrimary =
    "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-7 text-[14px] font-bold text-[#03060d] shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.75)]";
  const ctaSecondary =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-7 text-[14px] font-semibold text-slate-300 transition-all hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-slate-100";

  return (
    <main
      className="relative isolate min-h-screen overflow-hidden text-slate-200"
      style={{ backgroundColor: "#07090f", ["--hairline" as string]: "#1a2234" } as React.CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
          [background-size:28px_28px]" />
        <div className="absolute -left-72 top-24 h-[600px] w-[600px] rounded-full opacity-[0.06]"
          style={{ background: `radial-gradient(circle,${accent} 0%,transparent 65%)` }} />
        <div className="absolute -right-40 top-10 h-[700px] w-[700px] rounded-full opacity-[0.07]"
          style={{ background: `radial-gradient(circle,${accent} 0%,transparent 60%)` }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-6 sm:pt-32">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-[12.5px] text-slate-500">
          <RouterLink to={href("/")} className="transition-colors hover:text-slate-200">Rafetov.com</RouterLink>
          <span aria-hidden>/</span>
          <RouterLink to={`${href("/")}#services`} className="transition-colors hover:text-slate-200">{t.header.links.services}</RouterLink>
        </nav>

        {/* ── Hero ── */}
        <header className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <motion.div variants={fade} initial="hidden" animate="show">
              <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ color: accent, borderColor: `color-mix(in srgb,${accent} 30%,transparent)`, background: `color-mix(in srgb,${accent} 8%,transparent)` }}>
                <span className="relative flex h-[7px] w-[7px]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" style={{ background: accent }} />
                  <span className="relative inline-flex h-[7px] w-[7px] rounded-full" style={{ background: accent }} />
                </span>
                {t.services.items[service.id].label}
              </span>
            </motion.div>
            <motion.h1
              variants={fade} initial="hidden" animate="show" custom={1}
              className="mt-5 text-[clamp(1.9rem,5vw,3.1rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-100"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {c.title}
            </motion.h1>
            <motion.p variants={fade} initial="hidden" animate="show" custom={2} className="mt-5 max-w-[58ch] text-[16.5px] leading-relaxed text-slate-400">
              {c.intro}
            </motion.p>

            <motion.div variants={fade} initial="hidden" animate="show" custom={3} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <RouterLink to={`${href("/")}#contact`} className={`${ctaPrimary} px-8 py-3.5 text-[15px]`}
                style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}>
                <span aria-hidden className="absolute inset-0 -skew-x-[20deg] -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{t.service.ctaButton}</span>
                <svg viewBox="0 0 24 24" className="relative ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </RouterLink>
              <a href="tel:+359897758062" className={`${ctaSecondary} py-3.5`}>+359 897 758 062</a>
            </motion.div>

            {/* Price chip */}
            <motion.div variants={fade} initial="hidden" animate="show" custom={4}
              className="mt-7 flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 pr-5 sm:max-w-[520px]">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `color-mix(in srgb,${accent} 14%,transparent)`, border: `1px solid color-mix(in srgb,${accent} 25%,transparent)`, color: accent }}>
                <Icon name="tag" className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>{t.care.items.price.title}</div>
                <p className="mt-1 text-[14px] leading-relaxed text-slate-200">{c.priceLine}</p>
                <p className="mt-1 text-[12px] text-slate-500">{t.hero.micro}</p>
              </div>
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative lg:col-span-6"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-3xl"
                style={{ background: `radial-gradient(circle,${accent},transparent 70%)` }} />
              <div className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{ borderColor: `color-mix(in srgb,${accent} 14%,transparent)` }} />
              <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
                style={{ borderColor: `color-mix(in srgb,${accent} 10%,transparent)` }} />
            </div>
            <div className="mx-auto max-w-[560px]">
              <ServiceIllustration id={service.id} accent={accent} />
            </div>
          </motion.div>
        </header>

        {/* ── Includes ── */}
        <section className="mt-20">
          <SectionTitle
            right={<span className="text-[12.5px] text-slate-500">{String(c.includes.length).padStart(2, "0")}</span>}
          >
            {t.service.includes}
          </SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.includes.map((item, i) => (
              <motion.div
                key={item}
                variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={i}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.14]"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(ellipse at 20% 0%, color-mix(in srgb,${accent} 18%,transparent), transparent 60%)` }} />
                <div className="relative flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `color-mix(in srgb,${accent} 12%,transparent)`, border: `1px solid color-mix(in srgb,${accent} 24%,transparent)`, color: accent }}>
                    <Icon name={service.includeIcons[i] ?? "shield"} className="h-5 w-5" />
                  </span>
                  <p className="pt-1.5 text-[14.5px] leading-relaxed text-slate-200">{item}</p>
                </div>
                <span aria-hidden className="pointer-events-none absolute -bottom-3 -right-1 select-none text-[4.5rem] font-black leading-none opacity-[0.05] transition-opacity group-hover:opacity-[0.09]"
                  style={{ color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── For whom ── */}
        <section className="mt-20">
          <SectionTitle>{t.service.forWhom}</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.forWhom.map((item, i) => (
              <motion.div
                key={item}
                variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={i}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-6 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] opacity-60"
                  style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: `conic-gradient(from 180deg, ${accent}, #A78BFA, ${accent})`, padding: 1.5 }}>
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0b1220]" style={{ color: accent }}>
                    <Icon name={service.forWhomIcons[i] ?? "briefcase"} className="h-7 w-7" />
                  </div>
                </div>
                <p className="mt-5 text-[14.5px] leading-relaxed text-slate-200">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Process timeline ── */}
        <section className="mt-20">
          <SectionTitle
            right={
              <RouterLink to={`${href("/")}#process`} className="text-[13px] font-semibold text-slate-400 transition-colors hover:text-slate-100">
                {t.header.links.process} →
              </RouterLink>
            }
          >
            {t.service.process}
          </SectionTitle>
          <div className="relative">
            <div aria-hidden className="absolute left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] top-[26px] hidden h-px lg:block"
              style={{ background: "linear-gradient(90deg,#22D3EE,#34D399,#A78BFA,#FBBF24)", opacity: 0.3 }} />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {t.process.steps.map((s, i) => {
                const a = STEP_ACCENTS[i % STEP_ACCENTS.length];
                return (
                  <motion.div
                    key={s.title}
                    variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={i}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 text-[15px] font-black transition-transform duration-300 group-hover:scale-110"
                      style={{ borderColor: a, background: `color-mix(in srgb,${a} 14%,#07090f)`, boxShadow: `0 0 24px -6px ${a}`, color: a }}>
                      {i + 1}
                    </div>
                    <div className="mt-4 w-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: a }}>{s.time}</div>
                      <h3 className="mt-1.5 text-[15.5px] font-bold text-slate-100">{s.title}</h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{s.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        {projects.length > 0 && (
          <section className="mt-20">
            <SectionTitle
              right={
                <RouterLink to={`${href("/")}#work`} className="text-[13px] font-semibold text-slate-400 transition-colors hover:text-slate-100">
                  {t.service.allProjects} →
                </RouterLink>
              }
            >
              {t.service.projects}
            </SectionTitle>
            <CardsGrid projects={projects} />
          </section>
        )}

        {/* ── FAQ ── */}
        <section className="mt-20">
          <SectionTitle
            right={
              <RouterLink to={`${href("/")}#process`} className="text-[13px] font-semibold text-slate-400 transition-colors hover:text-slate-100">
                {t.process.faqEyebrow} →
              </RouterLink>
            }
          >
            {t.service.faq}
          </SectionTitle>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {c.faq.map((f, i) => (
              <motion.div
                key={f.q}
                variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={i}
                className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6"
              >
                <div aria-hidden className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg,${accent},transparent)`, opacity: 0.6 }} />
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-black"
                  style={{ background: `color-mix(in srgb,${accent} 14%,transparent)`, border: `1px solid color-mix(in srgb,${accent} 25%,transparent)`, color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[15.5px] font-bold leading-snug text-slate-100">{f.q}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-400">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <aside className="mt-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 sm:p-10">
            <div aria-hidden className="absolute inset-x-0 top-0 h-[2px]" style={{ background: "linear-gradient(90deg,#22d3ee,#a78bfa,#34d399)", opacity: 0.6 }} />
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.1] blur-3xl" style={{ background: `radial-gradient(circle,${accent},transparent)` }} />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[60ch]">
                <h2 className="text-[clamp(1.35rem,3vw,1.8rem)] font-extrabold tracking-tight text-slate-100">{t.service.ctaTitle}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{t.service.ctaText}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
                <RouterLink to={`${href("/")}#contact`} className={ctaPrimary}
                  style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}>
                  <span aria-hidden className="absolute inset-0 -skew-x-[20deg] -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">{t.service.ctaButton}</span>
                  <svg viewBox="0 0 24 24" className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </RouterLink>
                <a href="https://wa.me/359897758062" target="_blank" rel="noopener noreferrer" className={ctaSecondary}>WhatsApp</a>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <section className="mt-20">
            <SectionTitle>{t.service.related}</SectionTitle>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}

        {/* ── Other services ── */}
        <section className="mt-20">
          <SectionTitle>{t.service.allServices}</SectionTitle>
          <div className="flex flex-wrap gap-3">
            {others.map((s) => (
              <RouterLink
                key={s.id}
                to={href(servicePath(s, lang))}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: `color-mix(in srgb,${s.accent} 30%,transparent)`,
                  background: `color-mix(in srgb,${s.accent} 7%,transparent)`,
                  color: `color-mix(in srgb,${s.accent} 85%,white)`,
                }}
              >
                {t.services.items[s.id].title}
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </RouterLink>
            ))}
          </div>
        </section>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />
    </main>
  );
}
