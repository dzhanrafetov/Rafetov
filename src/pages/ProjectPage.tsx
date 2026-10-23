/**
 * Страница на проект (/proekti/<id>, /en/projects/<id> …) в езика на началната страница.
 * Сърцето ѝ е истинският сайт на клиента: цялата страница, заснета от живия адрес, се превърта бавно
 * в рамка на браузър и до нея в телефон. Без генерирани картинки и без измислени резултати —
 * само какво включва сайтът, отзивът на клиента (ако има) и услугата, с която е направен.
 */
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lock, Pause, Play } from "lucide-react";
import { useLang, withLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { SITE_ORIGIN } from "../seo/head";
import { PROJECT_BASE, findProject, fullShot, liveShot, mobileShot, projectAlternates, projectPath, projectsFor, type Project } from "../constants/projects";
import { CASE_STUDIES } from "../constants/caseStudies";
import { CASE_DETAILS, type CaseDetail, type CaseCopy } from "../constants/caseDetails";
import { REVIEWS } from "../constants/reviews";
import { GOOGLE_REVIEWS, googleReviewsUrl, whatsappHref } from "../constants/business";
import { SERVICES, servicePath } from "../services";
import { servicesCopy } from "../i18n/sections/services";
import { projectPageCopy } from "../i18n/sections/projectPage";
import { GoogleG, Stars } from "../components/GoogleRating";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { CardsGrid } from "./OnlinePresenceCTA";
import NotFound from "./NotFound";

const BTN =
  "inline-flex h-14 items-center justify-center gap-2.5 rounded-[14px] bg-accent px-7 text-[15px] font-semibold text-ink shadow-[0_6px_20px_-8px_rgba(34,211,238,.45)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-8px_rgba(34,211,238,.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text";
const SHADOW = "shadow-[0_40px_80px_-36px_rgba(0,0,0,.95),0_16px_32px_-16px_rgba(0,0,0,.6)]";

export default function ProjectPage() {
  const { slug = "" } = useParams();
  const { lang } = useLang();
  const project = findProject(lang, slug);
  if (!project) return <NotFound />;
  return <ProjectView key={project.id} project={project} />;
}

function ProjectView({ project: p }: { project: Project }) {
  const { lang, t, href } = useLang();
  const cs = t.work.caseStudy;
  const s = projectPageCopy[lang];
  const title = t.work.titles?.[p.id] ?? p.title;
  const description = t.work.projects[p.id];
  const detail = CASE_DETAILS[p.id];
  const caseCopy = detail?.copy[lang];
  // При разширено case study списъкът „Какво включва“ се повтаря — показваме само подробните секции.
  const includes = caseCopy ? [] : CASE_STUDIES[p.id]?.[lang].includes ?? [];
  const review = p.review ? REVIEWS.find((r) => r.name === p.review) : undefined;
  const path = projectPath(p, lang);
  const url = `${SITE_ORIGIN}${withLang(path, lang)}`;
  const typeLabel = t.work.tags[p.tag];
  const service = SERVICES.find((x) => x.tag === p.tag);
  const brief = href(`/?service=${service?.key ?? "sites"}#contact`);
  const host = p.href ? new URL(p.href).hostname.replace(/^www\./, "") : undefined;
  const rating = GOOGLE_REVIEWS.rating.toLocaleString(lang, { minimumFractionDigits: 1 });

  const all = projectsFor(lang);
  const i = all.findIndex((x) => x.id === p.id);
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];
  const more = all.filter((x) => x.id !== p.id && x.tag === p.tag && x.id !== prev.id && x.id !== next.id).slice(0, 3);

  const facts = [
    typeLabel,
    p.country && t.countries[p.country],
    p.siteLangs && p.siteLangs.map((c) => t.reviews.langs[c as keyof typeof t.reviews.langs] ?? c.toUpperCase()).join(", "),
  ].filter(Boolean) as string[];

  useSeo({
    title: `${cs.metaTitle.replace("{title}", title).replace("{type}", typeLabel.toLowerCase())} | Rafetov.com`,
    description,
    path,
    alternates: projectAlternates(p),
    image: `${SITE_ORIGIN}${liveShot(p.id)?.split("?")[0] ?? p.img}`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: title,
        description,
        url,
        image: `${SITE_ORIGIN}${liveShot(p.id)?.split("?")[0] ?? p.img}`,
        creator: { "@id": `${SITE_ORIGIN}/#organization` },
        ...(p.href ? { sameAs: p.href } : {}),
        inLanguage: lang,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Rafetov.com", item: `${SITE_ORIGIN}${withLang("/", lang)}` },
          { "@type": "ListItem", position: 2, name: s.projects, item: `${SITE_ORIGIN}${withLang(PROJECT_BASE[lang], lang)}` },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
    ],
  });

  return (
    <main className="prj-page bg-ink text-slate-200">
      {/* ── Заглавие ── */}
      <header className="mx-auto max-w-4xl px-5 pt-28 text-center sm:px-6 sm:pt-32">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 text-[13px] text-slate-500">
          <RouterLink to={href("/")} className="rounded transition-colors hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text">Rafetov.com</RouterLink>
          <span aria-hidden>/</span>
          <RouterLink to={href(PROJECT_BASE[lang])} className="rounded transition-colors hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text">{s.projects}</RouterLink>
        </nav>
        <h1 className="balance mt-6 text-[clamp(2.2rem,7vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.034em] text-white">{title}</h1>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {facts.map((f) => (
            <li key={f} className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-medium text-slate-300">{f}</li>
          ))}
        </ul>
        <p className="balance mx-auto mt-6 max-w-[60ch] text-[16.5px] leading-[1.65] text-slate-400 sm:text-[17px]">{description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <RouterLink to={brief} className={BTN}>
            {s.cta}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </RouterLink>
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded text-[14.5px] font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text"
            >
              <span className="border-b border-white/20 pb-px group-hover:border-white/50">{cs.live}</span>
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </header>

      {/* ── Истинският сайт ── */}
      <Showcase project={p} title={title} host={host} />

      {detail && caseCopy && <CaseStudy detail={detail} copy={caseCopy} title={title} />}

      {/* ── Какво включва · отзив · услуга ── */}
      <section className={`mx-auto grid max-w-6xl gap-5 px-5 pb-20 sm:px-6 sm:pb-28 ${includes.length === 0 ? "" : review ? "lg:grid-cols-2" : "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start"}`}>
        {includes.length > 0 && (
          <div className="rounded-[22px] border border-white/[0.08] bg-ink-panel p-6 sm:p-8">
            <h2 className="text-[clamp(1.35rem,3vw,1.7rem)] font-extrabold tracking-[-0.02em] text-white">{cs.includes}</h2>
            <ul className="mt-5 divide-y divide-white/[0.07]">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3.5 py-3.5 text-[15.5px] leading-snug text-slate-200">
                  <Check aria-hidden strokeWidth={2.5} className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-5">
          {review && (
            <figure className="rounded-[22px] border border-white/[0.08] bg-ink-panel p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <GoogleG className="h-4 w-4" />
                <Stars />
                <span className="ml-1 text-[13px] text-slate-500">{cs.review}</span>
              </div>
              <blockquote lang={review.lang} className="mt-4 whitespace-pre-line text-[15.5px] leading-[1.7] text-slate-300" style={{ textWrap: "pretty" } as React.CSSProperties}>
                {review.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4 text-[13px]">
                <span className="font-bold text-slate-100">{review.name}</span>
                <a href={googleReviewsUrl(lang)} target="_blank" rel="noopener noreferrer" className="rounded text-slate-500 transition-colors hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text">
                  {rating} · {t.reviews.count.replace("{n}", String(GOOGLE_REVIEWS.count))}
                </a>
              </figcaption>
            </figure>
          )}
          {service && (
            <RouterLink
              to={href(servicePath(service, lang))}
              className="group flex items-center gap-5 rounded-[22px] border border-white/[0.08] bg-ink-panel p-6 transition-colors hover:border-white/[0.16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text sm:p-8"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] text-slate-500">{s.service}</span>
                <span className="mt-1 block text-[clamp(1.25rem,2.6vw,1.5rem)] font-extrabold tracking-[-0.02em] text-white">{servicesCopy[lang].items[service.key].name}</span>
                <span className="mt-1.5 block text-[15px] leading-relaxed text-slate-400">{service.content[lang].title}</span>
              </span>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-accent-text transition-[border-color,transform] duration-200 group-hover:translate-x-0.5 group-hover:border-accent/50">
                <ArrowRight aria-hidden className="h-4 w-4" />
              </span>
            </RouterLink>
          )}
        </div>
      </section>

      {/* ── Един бутон ── */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-28">
        <div className="rounded-[24px] border border-white/[0.08] bg-ink-panel px-6 py-10 text-center sm:px-10 sm:py-14">
          <h2 className="balance mx-auto max-w-[24ch] text-[clamp(1.6rem,4.4vw,2.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">{cs.cta}</h2>
          <p className="balance mx-auto mt-3 max-w-[48ch] text-[15.5px] leading-relaxed text-slate-400">{cs.ctaSub}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RouterLink to={brief} className={BTN}>
              {s.cta}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </RouterLink>
            <a
              href={whatsappHref(s.whatsappText.replace("{title}", title))}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded text-[14.5px] font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text"
            >
              <WhatsAppIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-200" />
              <span className="border-b border-white/20 pb-px group-hover:border-white/50">{s.whatsapp}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Предишен / следващ ── */}
      <nav aria-label={s.projects} className="mx-auto grid max-w-6xl gap-3 px-5 sm:grid-cols-2 sm:px-6">
        {[{ x: prev, label: s.prev, dir: "prev" as const }, { x: next, label: s.next, dir: "next" as const }].map(({ x, label, dir }) => (
          <RouterLink
            key={dir}
            to={href(projectPath(x, lang))}
            className={`group flex items-center gap-4 rounded-[18px] border border-white/[0.08] p-3 pr-5 transition-colors hover:border-white/[0.16] hover:bg-white/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text ${dir === "next" ? "sm:flex-row-reverse sm:pl-5 sm:pr-3 sm:text-right" : ""}`}
          >
            <span className="aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-ink-raised sm:w-36">
              <img src={liveShot(x.id) ?? x.img} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
            </span>
            <span className="min-w-0 flex-1">
              <span className={`flex items-center gap-1.5 text-[13px] text-slate-500 ${dir === "next" ? "sm:justify-end" : ""}`}>
                {dir === "prev" && <ArrowLeft aria-hidden className="h-3.5 w-3.5" />}
                {label}
                {dir === "next" && <ArrowRight aria-hidden className="h-3.5 w-3.5" />}
              </span>
              <span className="mt-1 block truncate text-[17px] font-bold tracking-[-0.01em] text-white">{t.work.titles?.[x.id] ?? x.title}</span>
            </span>
          </RouterLink>
        ))}
      </nav>

      {more.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-[clamp(1.35rem,3vw,1.7rem)] font-extrabold tracking-[-0.02em] text-white">{cs.more}</h2>
            <RouterLink to={href(PROJECT_BASE[lang])} className="group inline-flex items-center gap-1.5 rounded text-[14px] font-semibold text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text">
              {cs.back}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </RouterLink>
          </div>
          <CardsGrid projects={more} />
        </section>
      )}
      {more.length === 0 && <div className="pb-24" />}

      <style>{`
        .prj-page .balance { text-wrap: balance; }
        .prj-page ::selection { background: rgba(34,211,238,.28); color: #fff; }
        /* Превъртане на записа: кратка пауза горе и долу, после обратно. Разстоянието и времето идват от JS. */
        .shot-img { will-change: transform; }
        .shot.is-ready .shot-img { animation: shot-scroll var(--dur, 20s) cubic-bezier(.45,.05,.55,.95) infinite alternate; }
        .shot.is-paused .shot-img, .shot-stage:hover .shot-img { animation-play-state: paused; }
        @keyframes shot-scroll { 0%, 3% { transform: translateY(0); } 97%, 100% { transform: translateY(calc(var(--dist, 0px) * -1)); } }
        @media (prefers-reduced-motion: reduce) {
          .shot.is-ready .shot-img { animation: none; }
          .shot { overflow-y: auto !important; }
        }
      `}</style>
    </main>
  );
}

/* ——— Разширено case study: задачата, какво направихме на сайта, админ панелът ——— */

const H2 = "balance text-[clamp(1.75rem,4.6vw,2.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white";

function CaseStudy({ detail, copy, title }: { detail: CaseDetail; copy: CaseCopy; title: string }) {
  const { lang } = useLang();
  const s = projectPageCopy[lang];
  const [tab, setTab] = useState(0);
  // Разделите се сменят сами (лентата на активния бутон отмерва времето); спират при посочване с мишката или извън екрана.
  const [hold, setHold] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = panel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const advance = () => setTab((t) => (t + 1) % detail.admin.length);
  const running = onScreen && !hold && detail.admin.length > 1;
  const shot = detail.admin[tab];
  const item = copy.admin[tab];

  return (
    <>
      {/* Задачата */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-28">
        <div className="grid gap-6 border-t border-white/[0.08] pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16 lg:pt-14">
          <h2 className={H2}>{s.task}</h2>
          <p className="max-w-[58ch] text-[clamp(1.1rem,2.1vw,1.35rem)] leading-[1.55] text-slate-300" style={{ textWrap: "pretty" } as React.CSSProperties}>{copy.task}</p>
        </div>
      </section>

      {/* Какво направихме */}
      {copy.site.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-28">
          <h2 className={H2}>{s.built}</h2>
          <div className="mt-10 space-y-14 sm:mt-14 sm:space-y-20">
            {copy.site.map((b, i) => (
              <article key={b.title} className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
                <figure className={`overflow-hidden rounded-[18px] border border-white/[0.1] bg-ink-raised ${SHADOW} lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                  <img src={detail.site[i]} alt={`${title}: ${b.title}`} width={1200} loading="lazy" decoding="async" className="block h-auto w-full" />
                </figure>
                <div className="lg:col-span-5">
                  <span className="text-[13px] font-bold tabular-nums text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-[clamp(1.3rem,2.6vw,1.6rem)] font-extrabold tracking-[-0.02em] text-white">{b.title}</h3>
                  <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-slate-400">{b.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Админ панелът */}
      {detail.admin.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className={H2}>{s.admin}</h2>
              <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-slate-400">{copy.adminIntro}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/10 bg-ink-panel px-3 py-1.5 text-[12px] font-medium text-slate-400 sm:self-auto">
              <i aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {detail.demo ? s.adminDemo : s.adminReal}
            </span>
          </div>

          <div
            ref={panel}
            onPointerEnter={() => setHold(true)}
            onPointerLeave={() => setHold(false)}
            className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-8"
          >
            {/* Изборът: на телефон хоризонтален ред, на десктоп списък с описания */}
            <div role="tablist" aria-label={s.admin} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0">
              {copy.admin.map((a, i) => (
                <button
                  key={a.title}
                  type="button"
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={`relative shrink-0 overflow-hidden rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text lg:px-5 lg:py-4 ${
                    tab === i ? "border-accent/40 bg-accent/[0.07]" : "border-white/[0.08] hover:border-white/[0.16] hover:bg-white/[0.02]"
                  }`}
                >
                  <span className={`block text-[15px] font-bold tracking-[-0.01em] ${tab === i ? "text-white" : "text-slate-300"}`}>{a.title}</span>
                  <span className="mt-1 hidden text-[14px] leading-relaxed text-slate-400 lg:block">{a.text}</span>
                  {tab === i && detail.admin.length > 1 && (
                    <span
                      key={tab}
                      aria-hidden
                      onAnimationEnd={advance}
                      className="prj-timer absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
                      style={{ animationPlayState: running ? "running" : "paused" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <figure>
              <div className={`overflow-hidden rounded-[14px] border border-white/[0.12] bg-[#1a2437] p-[3px] ${SHADOW}`}>
                <div className="overflow-hidden rounded-[11px] bg-white">
                  <div className="flex h-8 items-center gap-1.5 bg-ink-raised px-3">
                    <i aria-hidden className="h-2 w-2 rounded-full bg-white/[0.14]" />
                    <i aria-hidden className="h-2 w-2 rounded-full bg-white/[0.14]" />
                    <i aria-hidden className="h-2 w-2 rounded-full bg-white/[0.14]" />
                    <span className="ml-2 text-[11.5px] text-slate-400">{item.title}</span>
                  </div>
                  <img key={shot} src={shot} alt={`${title}, ${s.admin.toLowerCase()}: ${item.title}`} width={1440} height={691} loading="lazy" decoding="async" className="prj-admin block aspect-[1440/691] h-auto w-full object-cover object-top" />
                </div>
              </div>
              <figcaption className="mt-4 text-[14.5px] leading-relaxed text-slate-400 lg:hidden">{item.text}</figcaption>
            </figure>
          </div>

          {copy.roles && (
            <div className="mt-14">
              <h3 className="text-[clamp(1.2rem,2.4vw,1.45rem)] font-extrabold tracking-[-0.02em] text-white">{s.roles}</h3>
              <ul className="mt-5 grid overflow-hidden rounded-[22px] border border-white/[0.08] bg-ink-panel sm:grid-cols-2">
                {copy.roles.map((r) => (
                  <li key={r.name} className="prj-role p-6 sm:p-7">
                    <span className="text-[16px] font-bold text-white">{r.name}</span>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-400">{r.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {copy.more.length > 0 && (
            <div className="mt-14">
              <h3 className="text-[clamp(1.2rem,2.4vw,1.45rem)] font-extrabold tracking-[-0.02em] text-white">{s.more}</h3>
              <ul className="mt-5 grid gap-x-10 sm:grid-cols-2">
                {copy.more.map((m) => (
                  <li key={m} className="flex items-start gap-3.5 border-b border-white/[0.07] py-3.5 text-[15.5px] leading-snug text-slate-200">
                    <Check aria-hidden strokeWidth={2.5} className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
      <style>{`
        .prj-admin { animation: prj-fade .35s ease both; }
        .prj-timer { transform: scaleX(0); animation: prj-timer 4s linear forwards; }
        @keyframes prj-timer { to { transform: scaleX(1); } }
        @keyframes prj-fade { from { opacity: .4; } to { opacity: 1; } }
        .prj-role { box-shadow: inset 0 -1px 0 rgba(255,255,255,.07); }
        @media (min-width: 640px) { .prj-role { box-shadow: inset -1px -1px 0 rgba(255,255,255,.07); } }
        @media (prefers-reduced-motion: reduce) { .prj-admin, .prj-timer { animation: none; } .prj-timer { display: none; } }
      `}</style>
    </>
  );
}

/* ——— Истинският сайт в браузър и телефон, превъртан бавно ——— */

function Showcase({ project: p, title, host }: { project: Project; title: string; host?: string }) {
  const { lang } = useLang();
  const s = projectPageCopy[lang];
  const desk = fullShot(p.id, "d");
  const phone = fullShot(p.id, "m") ?? mobileShot(p.id);
  const still = liveShot(p.id) ?? p.img;
  const [paused, setPaused] = useState(false);

  return (
    <section aria-label={s.recording} className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-16">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-panel px-3 py-1.5 text-[12px] font-semibold text-white">
          <i aria-hidden className="prj-dot h-1.5 w-1.5 rounded-full bg-accent" />
          {s.recording}
        </span>
        {desk && (
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-white/10 px-3.5 text-[13px] font-medium text-slate-300 transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text"
          >
            {paused ? <Play aria-hidden className="h-3.5 w-3.5" /> : <Pause aria-hidden className="h-3.5 w-3.5" />}
            {paused ? s.play : s.pause}
          </button>
        )}
      </div>

      <div className="shot-stage relative pb-[12%] sm:pb-[6%]">
        {/* Браузър */}
        <div className={`w-full rounded-[14px] border border-white/[0.12] bg-[#1a2437] p-[3px] sm:w-[84%] ${SHADOW}`}>
          <div className="overflow-hidden rounded-[11px] bg-ink-raised">
            <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.08] px-3.5">
              <i aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/[0.14]" />
              <i aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/[0.14]" />
              <i aria-hidden className="h-2.5 w-2.5 rounded-full bg-white/[0.14]" />
              <span className="ml-3 flex h-6 min-w-0 max-w-[60%] flex-1 items-center gap-1.5 rounded-md bg-ink px-2.5 text-[11.5px] text-slate-400">
                <Lock aria-hidden className="h-3 w-3 shrink-0 text-slate-500" />
                <span className="truncate">{host ?? title}</span>
              </span>
            </div>
            {desk ? (
              <Scroller src={desk} width={1200} alt={title} paused={paused} className="aspect-[16/10]" />
            ) : (
              <img src={still} alt={title} width={1600} height={1000} className="block aspect-[16/10] h-auto w-full object-cover object-top" />
            )}
          </div>
        </div>

        {/* Телефон */}
        {phone && (
          <div className="absolute bottom-0 right-0 w-[30%] max-w-[260px] sm:w-[24%]">
            <div className={`border border-white/[0.16] bg-[#1a2437] p-[3.5%] ${SHADOW}`} style={{ borderRadius: "17% / 8%" }}>
              <div className="relative overflow-hidden bg-ink-raised" style={{ borderRadius: "14% / 6.6%" }}>
                <Scroller src={phone} width={600} alt="" paused={paused} className="aspect-[390/844]" />
                <i aria-hidden className="absolute left-1/2 top-[1.6%] h-[2.4%] w-[30%] -translate-x-1/2 rounded-full bg-ink" />
              </div>
            </div>
          </div>
        )}
      </div>
      {desk && <p className="mt-6 text-center text-[13px] text-slate-500">{s.hint}</p>}
      <style>{`
        .prj-dot { animation: prj-pulse 2.4s ease-out infinite; }
        @keyframes prj-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,.4); } 50% { box-shadow: 0 0 0 5px rgba(34,211,238,0); } }
        @media (prefers-reduced-motion: reduce) { .prj-dot { animation: none; } }
      `}</style>
    </section>
  );
}

/** Рамка с фиксирана пропорция; вътре цялата страница се превърта нагоре-надолу (CSS анимация, само докато се вижда). */
function Scroller({ src, width, alt, paused, className }: { src: string; width: number; alt: string; paused: boolean; className: string }) {
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = box.current;
    const pic = img.current;
    if (!el || !pic) return;
    const measure = () => {
      const dist = pic.offsetHeight - el.clientHeight;
      if (dist <= 8) return setReady(false);
      // Около 140 px в секунда на десктоп рамката (пропорционално за телефона), между 8 и 50 секунди за една посока.
      const speed = el.clientWidth * 0.15;
      el.style.setProperty("--dist", `${dist}px`);
      el.style.setProperty("--dur", `${Math.min(50, Math.max(8, dist / speed)).toFixed(1)}s`);
      setReady(true);
    };
    if (pic.complete && pic.naturalHeight) measure();
    pic.addEventListener("load", measure);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : undefined;
    ro?.observe(el);
    const io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 }) : undefined;
    io?.observe(el);
    return () => {
      pic.removeEventListener("load", measure);
      ro?.disconnect();
      io?.disconnect();
    };
  }, [src]);

  return (
    <div ref={box} className={`shot relative overflow-hidden ${ready ? "is-ready" : ""} ${paused || !visible ? "is-paused" : ""} ${className}`}>
      <img ref={img} src={src} alt={alt} width={width} decoding="async" className="shot-img absolute left-0 top-0 block h-auto w-full" />
    </div>
  );
}
