/**
 * Страница за отделна услуга (/uslugi/<slug>, /en/services/<slug> …) в езика на началната страница:
 * един циан акцент, „пътят“ с възлите между главите, без решетки и петна на фона.
 * Ред: hero с картина → какво правим → за кого → как работим → реални проекти → въпроси с карта за контакт → други услуги.
 * Всяка услуга идва от src/services; новите (AI, приложения…) имат собствени примери и стъпки.
 */
import { useState } from "react";
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Bell, Bot, CalendarCheck, Check, ClipboardList, FileText, LayoutDashboard, LifeBuoy, MapPin,
  MessageCircle, Monitor, Phone, Printer, ScanText, Smartphone, Star, Users, WifiOff, Workflow,
  type LucideIcon,
} from "lucide-react";
import { useLang, withLang } from "../i18n";
import type { Lang } from "../i18n/types";
import { useSeo } from "../hooks/useSeo";
import { SITE_ORIGIN } from "../seo/head";
import { SERVICES, findService, findServiceAnyLang, serviceAlternates, servicePath, type Service } from "../services";
import { servicesCopy } from "../i18n/sections/services";
import { servicePageCopy } from "../i18n/sections/servicePage";
import { plannerCopy } from "../i18n/sections/planner";
import { auditCopy } from "../i18n/sections/audit";
import { AUDIT_BASE, PLANNER_BASE } from "../constants/tools";
import { PROJECT_BASE, PROJECTS, projectPath, projectsFor } from "../constants/projects";
import { BUSINESS, GOOGLE_REVIEWS, VIBER_HREF, whatsappHref } from "../constants/business";
import { AppsVignette, DeviceMockup, FlowVignette, VignetteView, proofProject } from "./Services";
import { CardsGrid } from "./OnlinePresenceCTA";
import PathMark from "../components/PathMark";
import { Stars } from "../components/GoogleRating";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ViberIcon from "../components/ViberIcon";
import NotFound from "./NotFound";
import AccentTitle from "../components/AccentTitle";

/** Иконите на картите „Какво можем да направим“ — по име от `caseIcons` на услугата. */
const CASE_ICONS: Record<string, LucideIcon> = {
  MessageCircle, Bot, ClipboardList, FileText, ScanText, Star, Bell, CalendarCheck, LayoutDashboard, LifeBuoy, MapPin,
  Monitor, Printer, Smartphone, Users, WifiOff, Workflow,
};

const BTN =
  "inline-flex h-14 items-center justify-center gap-2.5 rounded-[14px] bg-accent px-7 text-[15px] font-semibold text-ink shadow-[0_6px_20px_-8px_rgba(34,211,238,.45)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-8px_rgba(34,211,238,.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text";

/** Циан края на главното заглавие на всяка услуга (виж AccentTitle). Първата фраза, която се среща, печели. */
const TITLE_ACCENTS = [
  // bg
  "който носи запитвания", "който продава лесно", "с QR код", "която води до запитвания", "без телефонни обаждания",
  "за вашата работа", "в джоба на клиентите ви", "и производството", "повтарящата се работа", "в Google и в картите", "без месечен абонамент",
  // en
  "brings in enquiries", "sells easily", "QR menu", "lead to enquiries", "without phone calls", "built for your work",
  "in your customers' pocket", "and the workshop", "the repetitive work", "in Google and on the map", "without a monthly subscription",
  // de
  "die Anfragen bringt", "der einfach verkauft", "mit QR-Code", "die zu Anfragen führt", "ohne Telefonate", "gebaut für Ihre Arbeit",
  "in der Tasche Ihrer Kunden", "und Werkstatt", "die wiederkehrende Arbeit", "auf der Karte gefunden", "ohne monatliches Abo",
  // nl
  "die aanvragen oplevert", "eenvoudig bestellen", "op de telefoon van uw gasten", "de juiste mensen bereiken", "zonder telefoontjes",
  "gebouwd voor uw werk", "in de zak van uw klanten", "kantoor en atelier", "het terugkerende werk", "en op de kaart", "zonder maandelijks abonnement",
] as const;

export default function ServicePage() {
  const { base = "", slug = "" } = useParams();
  const { lang } = useLang();
  const service = findService(lang, base, slug);

  if (!service) {
    const other = findServiceAnyLang(base, slug);
    if (other) return <Navigate to={withLang(servicePath(other.service, other.lang), other.lang)} replace />;
    return <NotFound />;
  }
  return <ServiceView key={service.id} service={service} />;
}

function ServiceView({ service }: { service: Service }) {
  const { lang, href, t } = useLang();
  const c = service.content[lang];
  const s = servicePageCopy[lang];
  const name = servicesCopy[lang].items[service.key].name;
  const path = servicePath(service, lang);
  const url = `${SITE_ORIGIN}${withLang(path, lang)}`;
  const brief = href(`/?service=${service.key}#contact`);

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
        serviceType: name,
        provider: { "@id": `${SITE_ORIGIN}/#organization` },
        areaServed: ["BG", "DE", "AT", "CH", "GB", "BE", "NL", "NO", "ES"],
        url,
        inLanguage: lang,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Rafetov.com", item: `${SITE_ORIGIN}${withLang("/", lang)}` },
          { "@type": "ListItem", position: 2, name: s.services, item: `${SITE_ORIGIN}${withLang("/", lang)}#services` },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
    ],
  });

  const available = projectsFor(lang);
  const projects = service.projects
    ? service.projects.map((id) => available.find((p) => p.id === id)).filter((p): p is (typeof available)[number] => !!p)
    : service.tag ? available.filter((p) => p.tag === service.tag).slice(0, 6) : [];
  // Без собствени стъпки — общият процес от началната страница.
  const steps = c.steps ?? t.process.steps.map((x) => ({ title: x.title, text: x.text }));
  // Номерата на главите вървят подред според това кои глави има.
  let chapter = 0;
  const next = () => String(++chapter).padStart(2, "0");

  return (
    <main className="svc-page bg-ink text-slate-200">
      {/* ── Hero ── */}
      <header className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-14 lg:pb-24">
        <div className="text-center lg:text-left">
          <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 text-[13px] text-slate-500 lg:justify-start">
            <RouterLink to={href("/")} className="rounded transition-colors hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text">Rafetov.com</RouterLink>
            <span aria-hidden>/</span>
            <RouterLink to={href("/#services")} className="rounded transition-colors hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text">{s.services}</RouterLink>
          </nav>
          <h1 className="balance mt-6 text-[clamp(2.1rem,6.4vw,3.6rem)] font-extrabold leading-[1.03] tracking-[-0.034em] text-white"><AccentTitle text={c.title} accents={TITLE_ACCENTS} /></h1>
          <p className="balance mx-auto mt-6 max-w-[54ch] text-[16.5px] leading-[1.6] text-slate-400 sm:text-[17px] lg:mx-0">{c.intro}</p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <RouterLink to={brief} className={BTN}>
              {s.cta}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </RouterLink>
            <a
              href={whatsappHref(s.whatsappText.replace("{service}", name))}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded text-[14.5px] font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text"
            >
              <WhatsAppIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-200" />
              <span className="border-b border-white/20 pb-px group-hover:border-white/50">{s.orWhatsapp}</span>
            </a>
          </div>
          <p className="mt-8 inline-flex items-center gap-2.5 text-[13.5px] text-slate-400">
            <Stars className="h-3.5 w-3.5" />
            <span>
              <b className="font-semibold text-slate-200">{GOOGLE_REVIEWS.rating.toFixed(1).replace(".", lang === "en" ? "." : ",")}</b>{" "}
              {s.rating.replace("{n}", String(GOOGLE_REVIEWS.count))}
            </span>
          </p>
          {/* Тих линк: за SEO страницата — безплатната проверка на сайт; за останалите — планерът. */}
          <p className="mt-3 text-[13.5px] text-slate-500">
            {service.id === "seo" ? auditCopy[lang].entry.question : plannerCopy[lang].entry.question}{" "}
            <RouterLink
              to={href(service.id === "seo" ? AUDIT_BASE[lang] : PLANNER_BASE[lang])}
              className="whitespace-nowrap font-semibold text-slate-300 underline decoration-white/20 underline-offset-[3px] transition-colors hover:text-white hover:decoration-accent"
            >
              {service.id === "seo" ? auditCopy[lang].entry.link : plannerCopy[lang].entry.link}
            </RouterLink>
          </p>
        </div>
        <HeroVisual service={service} lang={lang} />
      </header>

      {/* ── Какво правим ── */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 sm:pb-28">
        <PathMark n={next()} label={c.cases ? s.cases : s.includes} />
        <h2 className="balance mx-auto mt-6 max-w-3xl text-center text-[clamp(1.9rem,5.5vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">
          {c.cases ? s.cases : s.includes}
        </h2>
        {c.cases ? (
          <ul className="mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-[22px] border border-white/[0.08] bg-ink-panel sm:grid-cols-2 lg:grid-cols-3">
            {c.cases.map((item, i) => {
              const Icon = CASE_ICONS[service.caseIcons?.[i] ?? ""] ?? Check;
              return (
                <li key={item.title} className="svc-case relative p-6 sm:p-8">
                  <Icon aria-hidden strokeWidth={1.75} className="h-6 w-6 text-accent-text" />
                  <h3 className="mt-5 text-[18px] font-bold leading-snug tracking-[-0.015em] text-white">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{item.text}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="mx-auto mt-12 grid max-w-5xl gap-x-10 rounded-[22px] border border-white/[0.08] bg-ink-panel px-6 py-3 sm:grid-cols-2 sm:px-10 sm:py-6">
            {c.includes.map((item) => (
              <li key={item} className="flex items-start gap-3.5 border-b border-white/[0.07] py-4 text-[15.5px] leading-snug text-slate-200 last:border-b-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0">
                <Check aria-hidden strokeWidth={2.5} className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* За кого: кратък ред под примерите, не отделна глава */}
        <div className="mx-auto mt-14 max-w-5xl">
          <h3 className="text-center text-[17px] font-bold tracking-[-0.01em] text-white">{s.forWhom}</h3>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {c.forWhom.map((w) => (
              <li key={w} className="rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-2.5 text-[14px] leading-snug text-slate-300">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Как работим ── */}
      {steps && steps.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 sm:pb-28">
          <PathMark n={next()} label={s.steps} />
          <h2 className="balance mx-auto mt-6 max-w-3xl text-center text-[clamp(1.9rem,5.5vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">{s.steps}</h2>
          <ol className="svc-steps relative mx-auto mt-12 max-w-2xl">
            {steps.map((st, i) => (
              <li key={st.title} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 pb-10 last:pb-0 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-7">
                <span aria-hidden className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 bg-ink text-[13px] font-bold tabular-nums text-accent-text shadow-[0_0_0_5px_rgba(34,211,238,.08)] sm:h-12 sm:w-12 sm:text-[14px]">
                  {i + 1}
                </span>
                <div className="pt-1.5 sm:pt-2.5">
                  <h3 className="text-[19px] font-bold leading-snug tracking-[-0.015em] text-white sm:text-[21px]">{st.title}</h3>
                  <p className="mt-2 max-w-[56ch] text-[15.5px] leading-relaxed text-slate-400">{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ── Реални проекти ── */}
      {projects.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 sm:pb-28">
          <PathMark n={next()} label={s.projects} />
          <h2 className="balance mx-auto mt-6 max-w-3xl text-center text-[clamp(1.9rem,5.5vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">{s.projects}</h2>
          <div className="mx-auto mt-12 max-w-6xl">
            <CardsGrid projects={projects} />
          </div>
          <div className="mt-8 flex justify-center">
            <RouterLink to={href(PROJECT_BASE[lang])} className="group inline-flex items-center gap-1.5 rounded text-[14.5px] font-semibold text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text">
              <span className="border-b border-white/25 pb-px group-hover:border-white/60">{s.allProjects}</span>
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </RouterLink>
          </div>
        </section>
      )}

      {/* ── Въпроси + карта за контакт ── */}
      <Faq service={service} chapter={next()} brief={brief} name={name} />

      {/* ── Други услуги ── */}
      <nav aria-label={s.others} className="mx-auto max-w-6xl px-5 pb-24 sm:px-6">
        <h2 className="text-center text-[17px] font-bold tracking-[-0.01em] text-white">{s.others}</h2>
        <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
          {SERVICES.filter((x) => x.id !== service.id).map((x) => (
            <li key={x.id}>
              <RouterLink
                to={href(servicePath(x, lang))}
                className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 text-[14px] font-medium text-slate-300 transition-colors hover:border-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
              >
                {servicesCopy[lang].items[x.key].name}
                <ArrowRight aria-hidden className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-text" />
              </RouterLink>
            </li>
          ))}
        </ul>
      </nav>

      <style>{`
        .svc-page .balance { text-wrap: balance; }
        .svc-page ::selection { background: rgba(34,211,238,.28); color: #fff; }
        /* Мрежа от тънки линии между примерите, без карти една в друга. */
        .svc-case { box-shadow: inset 0 -1px 0 rgba(255,255,255,.07); }
        @media (min-width: 640px) { .svc-case { box-shadow: inset -1px -1px 0 rgba(255,255,255,.07); } }
        /* Линията на стъпките: от първия до последния възел. */
        .svc-steps::before { content: ""; position: absolute; left: 1.25rem; top: 1.25rem; bottom: 1.25rem; width: 2px; transform: translateX(-50%); background: linear-gradient(180deg, #22d3ee, rgba(34,211,238,.15)); }
        @media (min-width: 640px) { .svc-steps::before { left: 1.5rem; top: 1.5rem; bottom: 1.5rem; } }
        /* Сцената на илюстрацията е без собствен фон тук — рамката вече е панел. */
        .svc-vig > div { background: transparent; }
        @media (min-width: 1024px) { .svc-vig > div > * { transform: scale(1.3); } }
        .faq-plus::before, .faq-plus::after { content: ""; position: absolute; left: 50%; top: 50%; background: currentColor; border-radius: 1px; transition: transform .35s cubic-bezier(.16,1,.3,1); }
        .faq-plus::before { width: 12px; height: 2px; transform: translate(-50%,-50%); }
        .faq-plus::after { width: 2px; height: 12px; transform: translate(-50%,-50%); }
        [aria-expanded="true"] .faq-plus::after { transform: translate(-50%,-50%) scaleY(0); }
        [aria-expanded="true"] .faq-plus::before { transform: translate(-50%,-50%) rotate(180deg); }
        @media (prefers-reduced-motion: reduce) { .faq-plus::before, .faq-plus::after { transition: none; } }
      `}</style>
    </main>
  );
}

/* ——— Картината в hero: реален проект в лаптоп и телефон или илюстрация в код ——— */

function HeroVisual({ service, lang }: { service: Service; lang: Lang }) {
  const { href, t } = useLang();
  const c = servicesCopy[lang];
  const s = servicePageCopy[lang];
  const v = service.visual;
  const project = "project" in v ? proofProject(v.project, lang) : undefined;
  const real = project ? PROJECTS.find((p) => p.id === project.id) : undefined;

  return (
    <figure className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-ink-panel shadow-[0_30px_70px_-30px_rgba(0,0,0,.75)]">
      <div className="relative flex min-h-[340px] items-center justify-center px-4 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-14 lg:min-h-[460px]">
        {project ? (
          <DeviceMockup project={project} animate={false} />
        ) : "vignette" in v && v.vignette === "ai" ? (
          <FlowVignette f={c.v.flow} />
        ) : "vignette" in v && v.vignette === "apps" ? (
          <AppsVignette c={c} animate={false} />
        ) : (
          // Илюстрациите-карти се уголемяват на десктоп, за да пълнят рамката; телефонът и таблицата вече са в пълен размер.
          <div className={`w-full ${"vignette" in v && ["booking", "seo", "care", "ads"].includes(v.vignette) ? "svc-vig" : ""}`}>
            <VignetteView kind={"vignette" in v ? v.vignette : "ads"} c={c} lang={lang} />
          </div>
        )}
        {project ? (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
            <i aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {c.live}
          </span>
        ) : (
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-ink/70 px-2 py-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-slate-500">{s.example}</span>
        )}
      </div>
      {real && (
        <figcaption className="border-t border-white/[0.07] text-[13px]">
          <RouterLink to={href(projectPath(real, lang))} className="group flex items-center justify-between gap-3 px-5 py-3.5 sm:px-6">
            <span className="min-w-0 truncate">
              <span className="font-semibold text-slate-200 underline-offset-4 group-hover:underline">{t.work.titles?.[real.id] ?? real.title}</span>
              {real.country && <span className="text-slate-500"> · {t.countries[real.country]}</span>}
            </span>
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </RouterLink>
        </figcaption>
      )}
    </figure>
  );
}

/* ——— Въпроси вдясно, карта за контакт вляво (както в главата „Въпроси“ на началната страница) ——— */

function Faq({ service, chapter, brief, name }: { service: Service; chapter: string; brief: string; name: string }) {
  const { lang } = useLang();
  const c = service.content[lang];
  const s = servicePageCopy[lang];
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 sm:pb-28">
      <PathMark n={chapter} label={s.faq} />
      <div className="mx-auto mt-6 grid max-w-6xl gap-10 sm:mt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="contents lg:sticky lg:top-24 lg:block lg:self-start">
          <div className="order-1 text-center lg:text-left">
            <h2 className="balance text-[clamp(1.9rem,5.5vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white">{s.faq}</h2>
            <p className="balance mx-auto mt-4 max-w-[40ch] text-[16px] leading-relaxed text-slate-400 lg:mx-0">{s.faqSub}</p>
          </div>
          <div className="order-3 rounded-3xl border border-white/[0.08] bg-ink-panel p-6 sm:p-7 lg:mt-10">
            <h3 className="text-[1.2rem] font-extrabold tracking-[-0.02em] text-white">{s.cardTitle}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-slate-400">{s.cardText}</p>
            <RouterLink to={brief} className={`${BTN} mt-5 h-12 w-full rounded-xl`}>
              {s.cta}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </RouterLink>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              <a
                href={whatsappHref(s.whatsappText.replace("{service}", name))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] text-[13px] font-medium text-slate-200 transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text"
              >
                <WhatsAppIcon className="h-4 w-4 text-slate-400" />
                <span className="truncate">WhatsApp</span>
              </a>
              <a
                href={VIBER_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] text-[13px] font-medium text-slate-200 transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text"
              >
                <ViberIcon className="h-4 w-4 text-slate-400" />
                {s.viber}
              </a>
              <a
                href={BUSINESS.phoneHref}
                className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] text-[13px] font-medium text-slate-200 transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text"
              >
                <Phone aria-hidden className="h-4 w-4 text-slate-400" />
                {s.call}
              </a>
            </div>
            <p className="mt-4 flex items-center gap-2 text-[13px] text-slate-400">
              <i aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {s.reply}
            </p>
          </div>
        </div>

        <div className="order-2 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {c.faq.map((item, i) => {
            const expanded = open === i;
            const id = `svc-faq-${i}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={`${id}-q`}
                    aria-expanded={expanded}
                    aria-controls={`${id}-a`}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="group flex w-full items-center justify-between gap-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:py-6"
                  >
                    <span className={`text-[16px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-[17px] ${expanded ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className={`faq-plus relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        expanded ? "border-accent bg-accent text-ink" : "border-white/15 text-slate-300 group-hover:border-white/35"
                      }`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      key="a"
                      id={`${id}-a`}
                      role="region"
                      aria-labelledby={`${id}-q`}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-6 pr-12 text-[15px] leading-relaxed text-slate-400">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
