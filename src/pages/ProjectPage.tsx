import { Link as RouterLink, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang, withLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { SITE_ORIGIN } from "../seo/head";
import { findProject, projectAlternates, projectPath, projectsFor, type Project } from "../constants/projects";
import { CASE_STUDIES } from "../constants/caseStudies";
import { REVIEWS } from "../constants/reviews";
import { GOOGLE_REVIEWS, googleReviewsUrl } from "../constants/business";
import { GoogleG, Stars } from "../components/GoogleRating";
import { CardsGrid } from "./OnlinePresenceCTA";
import NotFound from "./NotFound";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] } }),
};

export default function ProjectPage() {
  const { slug = "" } = useParams();
  const { lang } = useLang();
  const project = findProject(lang, slug);
  if (!project) return <NotFound />;
  return <ProjectView project={project} />;
}

/**
 * Страница на проект: заглавие, един ред факти, описанието, голям кадър, какво включва,
 * отзивът на клиента (ако има) и един бутон. Само проверими неща от самия сайт.
 */
function ProjectView({ project: p }: { project: Project }) {
  const { lang, t, href } = useLang();
  const cs = t.work.caseStudy;
  const title = t.work.titles?.[p.id] ?? p.title;
  const description = t.work.projects[p.id];
  const includes = CASE_STUDIES[p.id]?.[lang].includes ?? [];
  const review = p.review ? REVIEWS.find((r) => r.name === p.review) : undefined;
  const path = projectPath(p, lang);
  const url = `${SITE_ORIGIN}${withLang(path, lang)}`;
  const typeLabel = t.work.tags[p.tag];
  const isMenu = p.tag === "menu";
  const more = projectsFor(lang).filter((x) => x.id !== p.id && x.tag === p.tag).slice(0, 3);
  const rating = GOOGLE_REVIEWS.rating.toLocaleString(lang, { minimumFractionDigits: 1 });

  const facts = [
    { k: cs.type, v: typeLabel },
    p.country && { k: cs.country, v: t.countries[p.country] },
    p.siteLangs && { k: cs.langs, v: p.siteLangs.map((c) => t.reviews.langs[c as keyof typeof t.reviews.langs] ?? c.toUpperCase()).join(", ") },
  ].filter(Boolean) as { k: string; v: string }[];

  useSeo({
    title: `${cs.metaTitle.replace("{title}", title).replace("{type}", typeLabel.toLowerCase())} | Rafetov.com`,
    description,
    path,
    alternates: projectAlternates(p),
    image: `${SITE_ORIGIN}${p.img}`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: title,
        description,
        url,
        image: `${SITE_ORIGIN}${p.img}`,
        creator: { "@id": `${SITE_ORIGIN}/#organization` },
        ...(p.href ? { sameAs: p.href } : {}),
        inLanguage: lang,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Rafetov.com", item: `${SITE_ORIGIN}${withLang("/", lang)}` },
          { "@type": "ListItem", position: 2, name: t.header.links.work, item: `${SITE_ORIGIN}${withLang("/", lang)}#work` },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
    ],
  });

  return (
    <main className="relative min-h-screen text-slate-200" style={{ backgroundColor: "#07090f" }}>
      <div className="mx-auto max-w-5xl px-5 pb-20 pt-24 sm:px-6 sm:pt-32">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-[12.5px] text-slate-500">
          <RouterLink to={href("/")} className="transition-colors hover:text-slate-200">Rafetov.com</RouterLink>
          <span aria-hidden>/</span>
          <RouterLink to={`${href("/")}#work`} className="transition-colors hover:text-slate-200">{t.header.links.work}</RouterLink>
        </nav>

        <motion.header variants={fade} initial="hidden" animate="show" className="mt-6 max-w-[60ch]">
          <h1 className="text-[clamp(2rem,6vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-slate-50" style={{ textWrap: "balance" }}>
            {title}
          </h1>
          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13.5px]">
            {facts.map((f) => (
              <div key={f.k} className="flex gap-1.5">
                <dt className="text-slate-500">{f.k}:</dt>
                <dd className="font-semibold text-slate-200">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[16.5px] leading-[1.7] text-slate-400">{description}</p>
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-cyan-300 underline decoration-cyan-300/30 underline-offset-4 transition-colors hover:text-cyan-200 hover:decoration-cyan-200"
            >
              {cs.live}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M14 3h7v7M21 3l-9 9M10 5H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4" />
              </svg>
            </a>
          )}
        </motion.header>

        {/* Кадърът: реалният сайт, без мокъп украса */}
        <motion.figure variants={fade} initial="hidden" animate="show" custom={1} className="mt-10">
          <div className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0f1d] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] ${isMenu ? "mx-auto max-w-[420px] p-4" : ""}`}>
            <img
              src={p.img}
              alt={title}
              width={900}
              height={isMenu ? 1350 : 589}
              className={`w-full ${isMenu ? "object-contain" : "object-cover"}`}
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.figure>

        {/* Какво включва + отзив */}
        <div className={`mt-14 grid gap-10 ${review ? "lg:grid-cols-2 lg:gap-14" : ""}`}>
          {includes.length > 0 && (
            <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-400">{cs.includes}</h2>
              <ul className="mt-5 space-y-3">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-slate-200">
                    <span className="mt-[7px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-300">
                      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {review && (
            <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={1}>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-400">{cs.review}</h2>
              <figure className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
                <div className="flex items-center gap-2">
                  <GoogleG className="h-4 w-4" />
                  <Stars />
                </div>
                <blockquote lang={review.lang} className="mt-4 whitespace-pre-line text-[15px] leading-[1.7] text-slate-300" style={{ textWrap: "pretty" }}>
                  {review.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-[13px]">
                  <span className="font-bold text-slate-100">{review.name}</span>
                  <a href={googleReviewsUrl(lang)} target="_blank" rel="noopener noreferrer" className="text-slate-500 transition-colors hover:text-slate-200">
                    {rating} · {t.reviews.count.replace("{n}", String(GOOGLE_REVIEWS.count))}
                  </a>
                </figcaption>
              </figure>
            </motion.section>
          )}
        </div>

        {/* Един бутон */}
        <motion.section variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="mt-16 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 text-center sm:p-10">
          <p className="mx-auto max-w-[40ch] text-[1.35rem] font-extrabold leading-tight tracking-[-0.01em] text-slate-50 sm:text-[1.6rem]" style={{ textWrap: "balance" }}>
            {cs.cta}
          </p>
          <p className="mx-auto mt-3 max-w-[46ch] text-[14.5px] text-slate-400">{cs.ctaSub}</p>
          <RouterLink
            to={`${href("/")}#contact`}
            className="mt-7 inline-flex h-14 items-center justify-center gap-2 rounded-full px-9 py-3.5 text-[15px] font-bold text-[#03060d] shadow-[0_12px_40px_-14px_rgba(34,211,238,0.9)] transition-shadow duration-300 hover:shadow-[0_16px_50px_-14px_rgba(34,211,238,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
            style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}
          >
            {t.hero.cta}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </RouterLink>
        </motion.section>

        {more.length > 0 && (
          <section className="mt-20">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-slate-400">{cs.more}</h2>
              <RouterLink to={`${href("/")}#work`} className="text-[13px] font-semibold text-slate-400 transition-colors hover:text-slate-100">
                {cs.back} →
              </RouterLink>
            </div>
            <CardsGrid projects={more} />
          </section>
        )}
      </div>
    </main>
  );
}
