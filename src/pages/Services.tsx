/**
 * Глава 01 „Какво правим“: четири големи раздела (табове) — сайтове и магазини, софтуер и приложения,
 * AI автоматизации, реклами/SEO/поддръжка. Активният раздел показва ЕДНА композиция: кратък списък на
 * услугите в него (име, един ред, линк) и до него голяма картина — реална снимка от портфолиото или
 * илюстрация в код. Нищо не зависи от посочване с мишката; първият раздел е видим и без JS.
 * Без пакети и без цени: офертата се дава след разговор.
 */
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Bell, Bot, CalendarCheck, Check, ClipboardList, Code2, CreditCard, FileText, Globe,
  LayoutDashboard, LifeBuoy, Lock, MapPin, Megaphone, MessageCircle, Monitor, QrCode, Search, Send, Server, ShieldCheck, ShoppingBag, Smartphone, Truck,
  type LucideIcon,
} from "lucide-react";
import PathMark from "../components/PathMark";
import { Stars } from "../components/GoogleRating";
import { useLang } from "../i18n";
import type { Lang } from "../i18n/types";
import { servicesCopy, type ServiceGroupKey, type ServiceKey, type ServicesCopy } from "../i18n/sections/services";
import { PROJECTS, type Project, liveShot, mobileShot, projectPath } from "../constants/projects";
import { serviceById, servicePath, type ServiceId } from "../services";
import { GOOGLE_REVIEWS } from "../constants/business";
import AccentTitle from "../components/AccentTitle";

export type Vignette = "booking" | "mobile" | "desktop" | "apps" | "ai" | "ads" | "seo" | "care";

type Item = {
  key: ServiceKey;
  icon: LucideIcon;
  /** Отделна страница за услугата, ако има. */
  page?: ServiceId;
};

type Group = {
  key: ServiceGroupKey;
  icon: LucideIcon;
  /** Картината на раздела: реален проект (по един за език, с десктоп и мобилна снимка) или илюстрация. */
  proof: { project: Record<Lang, string> } | { vignette: Vignette; real?: string };
  items: Item[];
};

const GROUPS: Group[] = [
  {
    key: "web",
    icon: Globe,
    proof: { project: { bg: "zirve1", en: "emis-cleaning", de: "nn-bau", nl: "alpha-reiniging" } },
    items: [
      { key: "sites", icon: Globe, page: "site" },
      { key: "shop", icon: ShoppingBag, page: "shop" },
      { key: "menu", icon: QrCode, page: "menu" },
      { key: "booking", icon: CalendarCheck, page: "booking" },
    ],
  },
  {
    key: "software",
    icon: Code2,
    // Илюстрация на софтуер (сайтът на ЦЗПО изглеждаше като обикновен сайт); реалният проект е линк отдолу.
    proof: { vignette: "apps", real: "czpo" },
    items: [
      { key: "platform", icon: LayoutDashboard, page: "platform" },
      { key: "mobile", icon: Smartphone, page: "mobile" },
      { key: "desktop", icon: Monitor, page: "desktop" },
    ],
  },
  { key: "ai", icon: Bot, proof: { vignette: "ai" }, items: [{ key: "ai", icon: Bot, page: "ai" }] },
  {
    key: "growth",
    icon: Megaphone,
    proof: { vignette: "ads" },
    items: [
      { key: "ads", icon: Megaphone, page: "ads" },
      { key: "seo", icon: MapPin, page: "seo" },
      { key: "care", icon: LifeBuoy, page: "care" },
    ],
  },
];

/** Проектът за езика, само ако има и десктоп, и мобилна снимка (иначе мокъпът няма какво да покаже). */
export function proofProject(ids: Record<Lang, string>, lang: Lang): Project | undefined {
  const p = PROJECTS.find((x) => x.id === ids[lang]);
  return p && liveShot(p.id) && mobileShot(p.id) ? p : undefined;
}

export default function Services() {
  const { t, lang, href } = useLang();
  const c = servicesCopy[lang];
  const [active, setActive] = useState<ServiceGroupKey>("web");
  // Панелът се анимира само след първата смяна: при зареждане стои видим без JS.
  const [touched, setTouched] = useState(false);
  const tabRefs = useRef<Partial<Record<ServiceGroupKey, HTMLButtonElement | null>>>({});

  const choose = (key: ServiceGroupKey) => {
    if (key !== active) {
      setActive(key);
      setTouched(true);
    }
  };

  // Стрелки, Home и End местят фокуса и избора между табовете (WAI-ARIA tabs).
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = GROUPS.length;
    let next: number | undefined;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === undefined) return;
    e.preventDefault();
    const key = GROUPS[next].key;
    choose(key);
    tabRefs.current[key]?.focus();
  };

  const group = GROUPS.find((g) => g.key === active) ?? GROUPS[0];

  return (
    <section id="services" className="scroll-mt-20 bg-ink px-4 pb-20 text-slate-200 sm:px-6 sm:pb-28">
      <div className="mx-auto max-w-7xl">
        <PathMark n="01" label={c.mark} />
        <h2 className="mx-auto mt-6 max-w-3xl text-center text-[2rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
          <AccentTitle text={c.title} accents={["онлайн.", "online.", "online braucht.", "online nodig heeft."]} />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-slate-400 sm:text-lg">{c.sub}</p>

        {/* Табове: 2×2 на телефон, един ред на по-широк екран */}
        <div
          role="tablist"
          aria-label={c.mark}
          className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-1.5 rounded-2xl border border-white/[0.08] bg-ink-panel p-1.5 sm:grid-cols-4 lg:mt-12"
        >
          {GROUPS.map((g, i) => {
            const on = g.key === active;
            const Icon = g.icon;
            return (
              <button
                key={g.key}
                ref={(el) => { tabRefs.current[g.key] = el; }}
                type="button"
                role="tab"
                id={`svc-tab-${g.key}`}
                aria-selected={on}
                aria-controls={`svc-panel-${g.key}`}
                tabIndex={on ? 0 : -1}
                data-active={on}
                onClick={() => choose(g.key)}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-xl px-3 py-3 text-center text-[14px] font-semibold leading-tight text-slate-400 transition-colors duration-200 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent-text data-[active=true]:bg-ink-raised data-[active=true]:text-white data-[active=true]:shadow-[inset_0_0_0_1px_rgba(255,255,255,.1),0_8px_24px_-16px_rgba(0,0,0,.9)] sm:min-h-[64px] sm:flex-row sm:gap-2.5 sm:px-4 sm:text-[15px] lg:text-[16px]"
              >
                <Icon aria-hidden strokeWidth={1.75} className="h-5 w-5 shrink-0 text-slate-500 transition-colors group-data-[active=true]:text-accent-text" />
                {c.groups[g.key]}
              </button>
            );
          })}
        </div>

        {/* Активният раздел: списък + картина, еднаква височина на десктоп */}
        <div
          key={group.key}
          role="tabpanel"
          id={`svc-panel-${group.key}`}
          aria-labelledby={`svc-tab-${group.key}`}
          className={`mx-auto mt-4 max-w-6xl overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-panel ${touched ? "svc-enter" : ""}`}
        >
          <div className="grid lg:grid-cols-2">
            <ServiceList group={group} c={c} lang={lang} />
            <Proof group={group} c={c} lang={lang} countries={t.countries} animate={touched} />
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to={href("/#contact")}
            className="inline-flex h-14 items-center gap-2.5 rounded-[14px] bg-accent px-7 text-[15px] font-semibold text-ink shadow-[0_6px_20px_-8px_rgba(34,211,238,.45)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-8px_rgba(34,211,238,.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text"
          >
            {c.cta}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes svc-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .svc-enter { animation: svc-in .45s cubic-bezier(.16,1,.3,1) both; }
        @keyframes svc-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,.35); } 50% { box-shadow: 0 0 0 5px rgba(34,211,238,0); } }
        .svc-live { animation: svc-pulse 2.4s ease-out infinite; }
        @keyframes svc-lap { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .svc-lap { animation: svc-lap .6s cubic-bezier(.16,1,.3,1) both; }
        @keyframes svc-ph { from { opacity: 0; transform: translate(18px, 10px); } to { opacity: 1; transform: none; } }
        .svc-ph { animation: svc-ph .6s cubic-bezier(.16,1,.3,1) .18s both; }
        @media (prefers-reduced-motion: reduce) { .svc-enter, .svc-live, .svc-lap, .svc-ph { animation: none; } }
      `}</style>
    </section>
  );
}

/* ——— Списъкът с услугите в раздела ——— */

function ServiceList({ group, c, lang }: { group: Group; c: ServicesCopy; lang: Lang }) {
  const { href } = useLang();
  // Раздел с една услуга (AI) показва и описанието ѝ, за да не стои празен до картината.
  const rich = group.items.length === 1;
  return (
    <ul className="flex flex-col justify-center divide-y divide-white/[0.07] px-5 py-2 sm:px-8 sm:py-4 lg:py-6">
      {group.items.map((item) => {
        const copy = c.items[item.key];
        const page = item.page ? serviceById(item.page) : undefined;
        const to = page ? href(servicePath(page, lang)) : href(`/?service=${item.key}#contact`);
        const Icon = item.icon;
        // Обикновен ред: целият ред е линк, стрелката е вдясно (без отделен ред „Повече“ — по-стегнато на телефон).
        if (!rich)
          return (
            <li key={item.key}>
              <Link
                to={to}
                className="group -mx-3 flex items-center gap-3.5 rounded-xl px-3 py-4 transition-colors hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text sm:py-5"
              >
                <Icon aria-hidden strokeWidth={1.75} className="h-5 w-5 shrink-0 text-accent-text" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-bold leading-snug tracking-[-0.01em] text-white">{copy.name}</span>
                  <span className="mt-0.5 block text-[14px] leading-relaxed text-slate-400">{copy.tagline}</span>
                </span>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-accent-text transition-[border-color,transform] duration-200 group-hover:translate-x-0.5 group-hover:border-accent/50">
                  <ArrowRight aria-hidden className="h-4 w-4" />
                  <span className="sr-only">{page ? c.more : c.ask}</span>
                </span>
              </Link>
            </li>
          );
        return (
          <li key={item.key} className="py-4 sm:py-5">
            <div className="flex items-start gap-3.5">
              <Icon aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-accent-text" />
              <div className="min-w-0 flex-1">
                <h3 className={`font-bold tracking-[-0.01em] text-white ${rich ? "text-[22px] leading-tight sm:text-2xl" : "text-[17px] leading-snug"}`}>
                  {rich ? copy.title : copy.name}
                </h3>
                <p className={`mt-1 leading-relaxed text-slate-400 ${rich ? "text-[15px]" : "text-[14px]"}`}>{rich ? copy.text : copy.tagline}</p>
                {rich && (
                  <ul className="mt-4 space-y-2">
                    {copy.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[14px] leading-snug text-slate-200">
                        <Check aria-hidden strokeWidth={2.5} className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  to={to}
                  className="mt-2 inline-flex items-center gap-1.5 rounded text-[13.5px] font-semibold text-accent-text underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
                >
                  {page ? c.more : c.ask}
                  <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ——— Картината на раздела: реален проект в мокъп на лаптоп и телефон, или илюстрация в код ——— */

function Proof({
  group, c, lang, countries, animate,
}: { group: Group; c: ServicesCopy; lang: Lang; countries: Record<string, string>; animate: boolean }) {
  const project = "project" in group.proof ? proofProject(group.proof.project, lang) : undefined;
  const vignette = "vignette" in group.proof ? group.proof.vignette : undefined;
  const real = "real" in group.proof ? PROJECTS.find((x) => x.id === (group.proof as { real?: string }).real) : undefined;
  const { href } = useLang();
  return (
    <figure className="order-first flex flex-col border-b border-white/[0.07] bg-ink lg:order-none lg:border-b-0 lg:border-l">
      {project ? (
        <div className="relative flex w-full items-center justify-center px-5 pb-6 pt-14 sm:px-8 sm:pb-8 sm:pt-16 lg:min-h-[420px] lg:flex-1 lg:px-10 lg:py-12">
          <DeviceMockup project={project} animate={animate} />
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-panel px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
            <i aria-hidden className="svc-live h-1.5 w-1.5 rounded-full bg-accent" />
            {c.live}
          </span>
        </div>
      ) : vignette === "apps" ? (
        <div className="relative flex w-full items-center justify-center px-5 pb-6 pt-14 sm:px-8 sm:pb-8 sm:pt-16 lg:min-h-[420px] lg:flex-1 lg:px-10 lg:py-12">
          <AppsVignette c={c} animate={animate} />
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-ink/70 px-2 py-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-slate-500">{c.example}</span>
        </div>
      ) : vignette === "ai" ? (
        <div className="relative flex w-full items-center px-4 pb-6 pt-12 sm:px-6 sm:pb-8 sm:pt-14 lg:min-h-[420px] lg:flex-1 lg:px-8">
          <FlowVignette f={c.v.flow} />
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-ink/70 px-2 py-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-slate-500">{c.example}</span>
        </div>
      ) : (
        // Останалите илюстрации са с естествена височина на телефон, на десктоп пълнят височината на списъка.
        <div className="relative w-full overflow-hidden lg:min-h-[420px] lg:flex-1">
          <VignetteView kind={vignette ?? "ads"} c={c} lang={lang} />
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-ink/70 px-2 py-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-slate-500">{c.example}</span>
        </div>
      )}
      {real && (
        <figcaption className="border-t border-white/[0.07] text-[13px]">
          <Link to={href(projectPath(real, lang))} className="group flex items-center justify-between gap-3 px-5 py-3 sm:px-6">
            <span className="min-w-0 truncate">
              <span className="text-slate-500">{c.v.apps.real}: </span>
              <span className="font-semibold text-slate-200 underline-offset-4 group-hover:underline">{real.title}</span>
            </span>
            <ArrowRight aria-hidden className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </figcaption>
      )}
      {project && (
        <figcaption className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-5 py-3 text-[13px] sm:px-6">
          <span className="min-w-0 truncate">
            <span className="font-semibold text-slate-200">{project.title}</span>
            {project.country && <span className="text-slate-500"> · {countries[project.country]}</span>}
          </span>
          {project.href && (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 font-medium text-slate-400 underline-offset-4 hover:text-slate-200 hover:underline">
              {c.open}
              <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}

/* ——— Мокъп: прозорец на лаптоп с десктоп снимката (16:10, без изрязване) и телефон отпред с мобилната ——— */

const SHADOW = "shadow-[0_32px_64px_-28px_rgba(0,0,0,.9),0_14px_28px_-14px_rgba(0,0,0,.6)]";

export function DeviceMockup({ project, animate }: { project: Project; animate: boolean }) {
  const host = project.href ? new URL(project.href).hostname.replace(/^www\./, "") : project.title;
  return (
    <div className="relative w-full max-w-[640px] pb-[9%]">
      {/* Лаптоп / браузър */}
      <div className={`relative w-[86%] ${animate ? "svc-lap" : ""}`}>
        <div className={`rounded-[10px] border border-white/[0.14] bg-[#1a2437] p-[3px] ${SHADOW}`}>
          <div className="overflow-hidden rounded-[7px] bg-ink-raised">
            <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.08] px-2.5">
              <i aria-hidden className="h-2 w-2 rounded-full bg-white/[0.14]" />
              <i aria-hidden className="h-2 w-2 rounded-full bg-white/[0.14]" />
              <i aria-hidden className="h-2 w-2 rounded-full bg-white/[0.14]" />
              <span className="ml-2 flex h-[18px] min-w-0 max-w-[62%] flex-1 items-center gap-1 rounded-md bg-ink px-2 text-[9.5px] leading-none text-slate-400">
                <Lock aria-hidden className="h-2.5 w-2.5 shrink-0 text-slate-500" />
                <span className="truncate">{host}</span>
              </span>
            </div>
            <img
              src={liveShot(project.id)}
              alt={project.title}
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="block aspect-[16/10] h-auto w-full"
            />
          </div>
        </div>
      </div>
      {/* Телефон, в предния план долу вдясно */}
      <div className={`absolute bottom-0 right-0 w-[27%] ${animate ? "svc-ph" : ""}`}>
        <div className={`border border-white/[0.16] bg-[#1a2437] p-[2.6%] ${SHADOW}`} style={{ borderRadius: "16% / 7.4%" }}>
          <div className="relative overflow-hidden bg-ink-raised" style={{ borderRadius: "13.5% / 6.2%" }}>
            <img
              src={mobileShot(project.id)}
              alt=""
              width={780}
              height={1688}
              loading="lazy"
              decoding="async"
              className="block aspect-[780/1688] h-auto w-full"
            />
            <i aria-hidden className="absolute left-1/2 top-[1.7%] h-[2.3%] w-[32%] -translate-x-1/2 rounded-full bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Софтуер: десктоп програма и мобилно приложение, вързани в една система ———
   На всеки 8 секунди в таблицата влиза нов ред и в същия момент телефонът показва известие за него. */

const APPS_CSS = `
  .ap-row { animation: ap-row 8s ease-in-out infinite; }
  .ap-push { animation: ap-push 8s cubic-bezier(.16,1,.3,1) infinite; }
  .ap-sync { animation: ap-sync 8s ease-in-out infinite; }
  @keyframes ap-row { 0%, 12% { max-height: 0; opacity: 0; background: rgba(34,211,238,0); } 20% { max-height: 44px; opacity: 1; background: rgba(34,211,238,.12); } 45%, 88% { max-height: 44px; opacity: 1; background: rgba(34,211,238,0); } 96%, 100% { max-height: 0; opacity: 0; } }
  @keyframes ap-push { 0%, 20% { opacity: 0; transform: translateY(-10px) scale(.96); } 26%, 86% { opacity: 1; transform: none; } 94%, 100% { opacity: 0; transform: translateY(-6px); } }
  @keyframes ap-sync { 0%, 14% { opacity: .35; } 20%, 30% { opacity: 1; } 40%, 100% { opacity: .35; } }
  @media (prefers-reduced-motion: reduce) { .ap-row, .ap-push, .ap-sync { animation: none; } }
`;

export function AppsVignette({ c, animate }: { c: ServicesCopy; animate: boolean }) {
  const { desktop: d, mobile: m, apps: a } = c.v;
  const rows: [string, string, string][] = [a.newRow, ...d.rows];
  const tabIcons = [CalendarCheck, ClipboardList, MessageCircle, LayoutDashboard];
  return (
    <div className="relative w-full max-w-[640px] pb-[6%]">
      {/* Десктоп програма: собствен прозорец (не браузър) с меню и таблица с поръчки */}
      <div className={`relative w-[80%] ${animate ? "svc-lap" : ""}`}>
        <div className={`overflow-hidden rounded-[10px] border border-white/[0.14] bg-ink-raised ${SHADOW}`}>
          <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.08] bg-[#1a2437] px-2.5">
            <i aria-hidden className="h-2 w-2 rounded-full bg-white/[0.14]" />
            <i aria-hidden className="h-2 w-2 rounded-full bg-white/[0.14]" />
            <i aria-hidden className="h-2 w-2 rounded-full bg-white/[0.14]" />
            <span className="ml-2 inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-300">
              <Monitor aria-hidden className="h-3 w-3 text-accent-text" />
              {d.nav[1]}
            </span>
            <span className="ap-sync ml-3 inline-flex items-center gap-1 text-[9.5px] text-slate-400">
              <i aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {a.synced}
            </span>
          </div>
          <div className="flex">
            <aside className="w-[30%] shrink-0 border-r border-white/[0.08] bg-ink-panel p-2 sm:p-2.5">
              <ul className="space-y-0.5">
                {d.nav.map((n, i) => (
                  <li key={n} className={`truncate rounded-md px-1.5 py-1 text-[9.5px] sm:px-2 sm:py-1.5 sm:text-[11px] ${i === 1 ? "bg-accent/10 font-semibold text-accent-text" : "text-slate-400"}`}>{n}</li>
                ))}
              </ul>
            </aside>
            <div className="min-w-0 flex-1 p-2.5 pb-4 sm:p-4 sm:pb-6">
              <div className="grid grid-cols-[1.5fr_1fr] gap-2 border-b border-white/[0.08] pb-1.5 text-[9.5px] font-medium text-slate-500 sm:text-[11px]">
                {d.head.slice(0, 2).map((h) => <span key={h} className="truncate">{h}</span>)}
              </div>
              {rows.map(([name, status], i) => (
                <div key={name} className={`overflow-hidden ${i === 0 ? "ap-row rounded-md" : ""}`}>
                  <div className="grid grid-cols-[1.5fr_1fr] items-center gap-2 border-b border-white/[0.06] py-1.5 text-[9.5px] text-slate-300 sm:py-2 sm:text-[11.5px]">
                    <span className={`truncate ${i === 0 ? "font-semibold text-white" : ""}`}>{name}</span>
                    <span className={`inline-flex min-w-0 items-center gap-1.5 ${i === 0 ? "text-accent-text" : i === 3 ? "text-slate-200" : "text-slate-400"}`}>
                      <i aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? "bg-accent" : i === 3 ? "bg-slate-200" : "bg-slate-500"}`} />
                      <span className="truncate">{status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Мобилно приложение: известие, списък и долна навигация */}
      <div className={`absolute bottom-0 right-0 w-[29%] max-w-[180px] ${animate ? "svc-ph" : ""}`}>
        <div className={`border border-white/[0.16] bg-[#1a2437] p-[3%] ${SHADOW}`} style={{ borderRadius: "16% / 7.4%" }}>
          <div className="relative flex aspect-[9/19] flex-col overflow-hidden bg-ink-raised" style={{ borderRadius: "13.5% / 6.2%" }}>
            <i aria-hidden className="absolute left-1/2 top-[2%] h-[2.6%] w-[32%] -translate-x-1/2 rounded-full bg-ink" />
            <div className="min-h-0 flex-1 overflow-hidden px-[8%] pt-[18%]">
              <div className="ap-push flex items-start gap-1.5 rounded-lg border border-accent/30 bg-ink-panel p-1.5 shadow-[0_10px_20px_-12px_rgba(34,211,238,.5)]">
                <Bell aria-hidden strokeWidth={1.75} className="mt-px h-3 w-3 shrink-0 text-accent-text" />
                <span className="min-w-0 text-[7px] font-semibold leading-tight text-slate-100 sm:text-[9.5px]">{a.push}</span>
              </div>
              <p className="mt-[12%] text-[9px] font-bold text-white sm:text-[12.5px]">{m.app}</p>
              <ul className="mt-1 divide-y divide-white/[0.06]">
                {m.rows.map(([x, y], i) => (
                  <li key={x} className="flex items-center justify-between gap-1 py-1 text-[7px] sm:py-1.5 sm:text-[9.5px]">
                    <span className="truncate text-slate-300">{x}</span>
                    <span className={`shrink-0 rounded px-1 py-px ${i === 0 ? "bg-accent/15 text-accent-text" : "bg-white/[0.05] text-slate-500"}`}>{y}</span>
                  </li>
                ))}
              </ul>
            </div>
            <nav aria-hidden className="grid grid-cols-4 border-t border-white/[0.08] bg-ink-panel px-[4%] pb-[8%] pt-[6%]">
              {a.tabs.map((tab, i) => {
                const Icon = tabIcons[i];
                return (
                  <span key={tab} title={tab} className={`flex flex-col items-center gap-1 ${i === 1 ? "text-accent-text" : "text-slate-500"}`}>
                    <Icon strokeWidth={1.75} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <i className={`h-[3px] w-[3px] rounded-full ${i === 1 ? "bg-accent" : "bg-transparent"}`} />
                  </span>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <style>{APPS_CSS}</style>
    </div>
  );
}

/* ——— AI: анимиран поток на автоматизация (съобщение → AI → CRM, отговор, известие, оферта) ——— */

const LOOP = 10;
const pct = (s: number) => `${((s / LOOP) * 100).toFixed(2)}%`;
const DIM = "opacity:.35;border-color:rgba(255,255,255,.08);box-shadow:none";
const LIT = "opacity:1;border-color:rgba(34,211,238,.45);box-shadow:0 0 0 1px rgba(34,211,238,.1),0 18px 36px -22px rgba(34,211,238,.5)";
const kfNode = (n: string, at: number) => `@keyframes ${n}{0%,${pct(at)}{${DIM}}${pct(at + 0.3)},93%{${LIT}}100%{${DIM}}}`;
const kfChip = (n: string, at: number) => `@keyframes ${n}{0%,${pct(at)}{opacity:.2;transform:translateY(3px)}${pct(at + 0.25)},93%{opacity:1;transform:none}100%{opacity:.2;transform:translateY(3px)}}`;
const kfLine = (n: string, at: number) => `@keyframes ${n}{0%,${pct(at)}{background:rgba(255,255,255,.1)}${pct(at + 0.3)},93%{background:rgba(34,211,238,.55)}100%{background:rgba(255,255,255,.1)}}`;
const kfPulse = (n: string, from: number, to: number) => `@keyframes ${n}{0%,${pct(from)}{top:-28px;opacity:0}${pct(from + 0.1)}{opacity:1}${pct(to - 0.1)}{opacity:1}${pct(to)},100%{top:100%;opacity:0}}`;

/** Времена в секунди в 10-секундния цикъл: съобщение → линия → AI (полета) → гръбнак → четири изхода. */
const T = { msg: 0.3, c1: [1.2, 1.9] as const, ai: 2.1, fields: [2.6, 3.0, 3.4], spine: [3.9, 5.9] as const, out: [4.5, 5.1, 5.7, 6.3] };

const FLOW_CSS = [
  kfNode("fl-msg", T.msg), kfPulse("fl-c1p", T.c1[0], T.c1[1]), kfLine("fl-c1", T.c1[1] - 0.1), kfNode("fl-ai", T.ai),
  ...T.fields.map((t, i) => kfChip(`fl-f${i}`, t)),
  kfPulse("fl-sp", T.spine[0], T.spine[1]), kfLine("fl-spine", T.spine[0] + 0.2),
  ...T.out.map((t, i) => kfNode(`fl-o${i}`, t)),
  ...T.out.map((t, i) => kfLine(`fl-b${i}`, t - 0.2)),
  `.fl [style*="animation-name"]{animation-duration:${LOOP}s;animation-timing-function:linear;animation-iteration-count:infinite}`,
  `.fl[data-play="0"] *{animation-play-state:paused}`,
  `@media (prefers-reduced-motion: reduce){.fl *{animation:none !important}}`,
].join("\n");

export function FlowVignette({ f }: { f: ServicesCopy["v"]["flow"] }) {
  const ref = useRef<HTMLDivElement>(null);

  // Цикълът спира, когато диаграмата не се вижда.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => el.setAttribute("data-play", e.isIntersecting ? "1" : "0"), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const outputs: { key: string; icon: LucideIcon; title: string; body: ReactNode }[] = [
    {
      key: "crm", icon: ClipboardList, title: f.crm.title,
      body: (
        <dl className="mt-1 space-y-0.5">
          {f.crm.rows.map(([k, v], i) => (
            <div key={k} className="flex items-baseline justify-between gap-2 text-[11.5px]">
              <dt className="shrink-0 text-slate-500">{k}</dt>
              <dd className={`truncate ${i === 2 ? "rounded bg-accent/15 px-1.5 font-semibold text-accent-text" : "text-slate-300"}`}>{v}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    { key: "reply", icon: Send, title: f.reply.title, body: <p className="mt-1 text-[11.5px] leading-snug text-slate-400">{f.reply.text}</p> },
    { key: "notify", icon: Bell, title: f.notify.title, body: <p className="mt-1 text-[11.5px] leading-snug text-slate-400">{f.notify.text}</p> },
    {
      key: "pdf", icon: FileText, title: f.pdf.title,
      body: (
        <p className="mt-1 flex items-center gap-1.5 text-[11.5px] leading-snug text-slate-400">
          <span className="shrink-0 rounded border border-white/15 px-1 text-[9px] font-bold uppercase tracking-wide text-slate-300">PDF</span>
          <span className="min-w-0 truncate">{f.pdf.text}</span>
        </p>
      ),
    },
  ];

  const node = "relative z-[1] rounded-xl border border-accent/45 bg-ink-panel shadow-[0_0_0_1px_rgba(34,211,238,.1),0_18px_36px_-22px_rgba(34,211,238,.5)]";

  return (
    <div ref={ref} className="fl mx-auto w-full max-w-[560px]" data-play="1">
      {/* 1. Входящо съобщение */}
      <div className={`${node} flex items-start gap-3 p-3.5`} style={{ animationName: "fl-msg" }}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-text">
          <MessageCircle aria-hidden strokeWidth={1.75} className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-2 text-[11px] text-slate-500">
            <span><b className="font-semibold text-slate-200">{f.from}</b> · {f.channel}</span>
            <span className="tabular-nums">{f.time}</span>
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-slate-100">{f.msg}</span>
        </span>
      </div>

      {/* Линия към AI */}
      <i aria-hidden className="relative mx-auto block h-6 w-px overflow-hidden bg-accent/55" style={{ animationName: "fl-c1" }}>
        <i className="absolute left-0 top-[-28px] h-7 w-px bg-accent opacity-0 shadow-[0_0_8px_2px_rgba(34,211,238,.6)]" style={{ animationName: "fl-c1p" }} />
      </i>

      {/* 2. AI възел */}
      <div className={`${node} p-3.5`} style={{ animationName: "fl-ai" }}>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-ink">
            <Bot aria-hidden strokeWidth={2} className="h-[18px] w-[18px]" />
          </span>
          <span className="min-w-0">
            <b className="block text-[13px] font-semibold text-white">{f.ai.title}</b>
            <span className="block text-[11.5px] text-slate-400">{f.ai.sub}</span>
          </span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {f.fields.map(([k, v], i) => (
            <li key={k} className="rounded-md border border-white/10 bg-ink px-2 py-1 text-[11.5px] leading-none" style={{ animationName: `fl-f${i}` }}>
              <span className="text-slate-500">{k}: </span>
              <span className="font-medium text-slate-200">{v}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Гръбнак и четирите изхода: на телефон в една колона, от sm в две с разклонения в междината */}
      <div className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-10 sm:auto-rows-fr">
        <i
          aria-hidden
          className="fl-spine absolute left-1/2 top-[-20px] w-px -translate-x-1/2 overflow-hidden bg-accent/55"
          style={{ animationName: "fl-spine" }}
        >
          <i className="absolute left-0 top-[-28px] h-7 w-px bg-accent opacity-0 shadow-[0_0_8px_2px_rgba(34,211,238,.6)]" style={{ animationName: "fl-sp" }} />
        </i>
        {outputs.map((o, i) => {
          const Icon = o.icon;
          return (
            <div key={o.key} className="relative">
              <i
                aria-hidden
                className={`absolute top-1/2 hidden h-px w-5 bg-accent/55 sm:block ${i % 2 === 0 ? "-right-5" : "-left-5"}`}
                style={{ animationName: `fl-b${i}` }}
              />
              <div className={`${node} h-full p-3`} style={{ animationName: `fl-o${i}` }}>
                <span className="flex items-center gap-2 text-[12.5px] font-semibold text-white">
                  <Icon aria-hidden strokeWidth={1.75} className="h-4 w-4 shrink-0 text-accent-text" />
                  {o.title}
                </span>
                {o.body}
              </div>
            </div>
          );
        })}
      </div>

      {/* Какво още върши */}
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {f.chips.map((chip) => (
          <li key={chip} className="rounded-full border border-white/10 bg-ink-panel px-2.5 py-1 text-[11.5px] text-slate-300">{chip}</li>
        ))}
      </ul>

      <style>{FLOW_CSS}</style>
      {/* Гръбнакът свършва в центъра на последния ред: 4 реда на телефон, 2 от sm. */}
      <style>{`.fl-spine{bottom:calc((100% - 36px) / 8)} @media (min-width:640px){.fl-spine{bottom:calc((100% - 12px) / 4)}}`}</style>
    </div>
  );
}

/* ——— Илюстрации в код за услугите без проект в портфолиото ——— */

export function VignetteView({ kind, c, lang }: { kind: Vignette; c: ServicesCopy; lang: Lang }) {
  const v = c.v;
  switch (kind) {
    case "booking":
      return (
        <Stage>
          <Card className="w-[300px]">
            <div className="flex items-center justify-between">
              <b className="text-[14px] font-semibold text-slate-100">{v.booking.title}</b>
              <span className="text-[12px] text-slate-500">{v.booking.day}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {v.booking.slots.map((s, i) => (
                <span
                  key={s}
                  className={`rounded-lg border px-3 py-2 text-center text-[13px] tabular-nums ${i === 2 ? "border-accent/60 bg-accent/10 font-semibold text-accent-text" : "border-white/10 bg-ink-raised text-slate-300"}`}
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-accent/25 bg-accent/[0.07] px-3 py-2 text-[13px]">
              <Check aria-hidden strokeWidth={2.5} className="h-4 w-4 text-accent-text" />
              <span className="font-semibold text-slate-100">{v.booking.confirmed}</span>
              <span className="ml-auto text-[11.5px] text-slate-500">{v.booking.slots[2]}</span>
            </div>
            <p className="mt-2.5 text-[11.5px] text-slate-500">{v.booking.note}</p>
          </Card>
        </Stage>
      );

    case "mobile":
      return (
        <Stage>
          <div className="relative h-[86%] w-[46%] max-w-[190px] overflow-hidden rounded-[26px] border border-white/15 bg-ink-raised shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)]">
            <span aria-hidden className="absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-ink" />
            <div className="px-3 pb-3 pt-7">
              <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-ink-panel p-2.5">
                <Bell aria-hidden strokeWidth={1.75} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-text" />
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold text-slate-200">{v.mobile.app}</span>
                  <span className="block truncate text-[10.5px] text-slate-400">{v.mobile.push}</span>
                </span>
              </div>
              <p className="mt-4 text-[13px] font-bold text-white">{v.mobile.app}</p>
              <ul className="mt-2 divide-y divide-white/[0.06]">
                {v.mobile.rows.map(([a, b], i) => (
                  <li key={a} className="flex items-center justify-between gap-2 py-2 text-[10.5px]">
                    <span className="truncate text-slate-300">{a}</span>
                    <span className={`shrink-0 rounded-md px-1.5 py-0.5 ${i === 0 ? "bg-accent/15 text-accent-text" : "bg-white/[0.05] text-slate-500"}`}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span aria-hidden className="absolute bottom-1.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-white/25" />
          </div>
        </Stage>
      );

    case "desktop":
      return (
        <Stage>
          <div className="flex h-[78%] w-[88%] overflow-hidden rounded-xl border border-white/10 bg-ink-raised shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)]">
            <aside className="hidden w-[30%] border-r border-white/[0.08] bg-ink-panel p-3 sm:block">
              <span aria-hidden className="mb-3 flex gap-1.5">
                <i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" />
              </span>
              <ul className="space-y-1">
                {v.desktop.nav.map((n, i) => (
                  <li key={n} className={`rounded-md px-2 py-1.5 text-[11.5px] ${i === 1 ? "bg-accent/10 font-semibold text-accent-text" : "text-slate-400"}`}>{n}</li>
                ))}
              </ul>
            </aside>
            <div className="min-w-0 flex-1 p-3 sm:p-4">
              <p className="text-[13px] font-bold text-white">{v.desktop.nav[1]}</p>
              <table className="mt-2 w-full border-collapse text-left text-[11.5px]">
                <thead>
                  <tr className="text-slate-500">
                    {v.desktop.head.map((h) => <th key={h} className="border-b border-white/[0.08] py-1.5 pr-2 font-medium">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {v.desktop.rows.map(([a, b, d], i) => (
                    <tr key={a} className="text-slate-300">
                      <td className="border-b border-white/[0.06] py-2 pr-2">{a}</td>
                      <td className="border-b border-white/[0.06] py-2 pr-2">
                        <span className={`inline-flex items-center gap-1.5 ${i === 0 ? "text-accent-text" : i === 2 ? "text-slate-200" : "text-slate-400"}`}>
                          <i aria-hidden className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-accent" : i === 2 ? "bg-slate-200" : "bg-slate-500"}`} />
                          {b}
                        </span>
                      </td>
                      <td className="border-b border-white/[0.06] py-2 text-slate-500">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Stage>
      );

    case "ads":
      return (
        <Stage>
          <div className="w-[88%] max-w-[420px] space-y-3">
            <Card>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-raised px-3 py-1.5 text-[12.5px] text-slate-300">
                <Search aria-hidden className="h-3.5 w-3.5 text-slate-500" />
                {v.ads.query}
              </div>
              <p className="mt-3 text-[11px] font-bold text-slate-300">{v.ads.sponsored}</p>
              <p className="mt-0.5 text-[14px] font-semibold leading-snug text-accent-text">{v.ads.title}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-slate-400">{v.ads.line}</p>
            </Card>
            <Card className="flex flex-wrap items-center gap-3 py-3">
              <span className="min-w-[180px] flex-1">
                <span className="block text-[11px] font-semibold text-slate-500">{v.ads.metaTitle}</span>
                <span className="block text-[12.5px] text-slate-300">{v.ads.metaText}</span>
              </span>
              <span className="shrink-0 rounded-lg bg-accent px-2.5 py-1.5 text-[11.5px] font-semibold text-ink">{v.ads.metaCta}</span>
            </Card>
          </div>
        </Stage>
      );

    case "seo": {
      const rating = GOOGLE_REVIEWS.rating.toFixed(1).replace(".", lang === "en" ? "." : ",");
      return (
        <Stage>
          <Card className="w-[88%] max-w-[380px]">
            <div className="flex items-start justify-between gap-3">
              <span>
                <b className="block text-[16px] font-bold text-white">Rafetov</b>
                <span className="block text-[12.5px] text-slate-400">{v.seo.kind} · {v.seo.city}</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-[10.5px] text-slate-400">
                <ShieldCheck aria-hidden className="h-3 w-3 text-accent-text" />
                {v.seo.verified}
              </span>
            </div>
            <p className="mt-2.5 flex items-center gap-2 text-[13px]">
              <b className="font-semibold text-slate-100">{rating}</b>
              <Stars className="h-3.5 w-3.5" />
              <span className="text-slate-500">{GOOGLE_REVIEWS.count} {v.seo.reviews}</span>
            </p>
            <div className="mt-3 flex gap-2">
              {v.seo.actions.map((a, i) => (
                <span key={a} className={`flex-1 rounded-lg border px-2 py-1.5 text-center text-[12px] ${i === 0 ? "border-accent/50 bg-accent/10 font-semibold text-accent-text" : "border-white/10 bg-ink-raised text-slate-300"}`}>{a}</span>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-500">
              <MapPin aria-hidden className="h-3.5 w-3.5 text-accent-text" />
              Google Business Profile
            </div>
          </Card>
        </Stage>
      );
    }

    case "care": {
      const icons = [Server, Truck, CreditCard, MessageCircle];
      return (
        <Stage>
          <div className="w-[88%] max-w-[400px]">
            <div className="grid grid-cols-2 gap-2">
              {v.care.items.map((label, i) => {
                const Icon = icons[i];
                return (
                  <span key={label} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-ink-panel px-3 py-3 text-[12.5px] text-slate-200">
                    <Icon aria-hidden strokeWidth={1.75} className="h-4 w-4 shrink-0 text-accent-text" />
                    {label}
                  </span>
                );
              })}
            </div>
            <p className="mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-ink-panel px-3 py-2 text-[12px] font-medium text-slate-200">
              <i aria-hidden className="svc-live h-2 w-2 rounded-full bg-accent" />
              {v.care.status}
            </p>
          </div>
        </Stage>
      );
    }
  }
}

function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center bg-ink px-5 pb-6 pt-12 sm:pt-14 lg:absolute lg:inset-0 lg:p-5 ${className}`}>
      {children}
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-ink-panel p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,.9)] ${className}`}>{children}</div>;
}
