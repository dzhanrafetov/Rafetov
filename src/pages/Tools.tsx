/**
 * Глава 02 „Безплатни инструменти“: двете карти, с които посетителят може да направи нещо веднага,
 * без да пише на нас. Отляво — проверка на сайт с работещо поле за адрес (праща към /proverka-na-sait?url=,
 * където проверката тръгва сама). Отдясно — планерът с първия му въпрос като чипове (праща към /planer?s=,
 * където планерът се отваря на стъпка 2 с избраната услуга). Един акцент, без градиенти и без цени.
 */
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { track } from "@vercel/analytics";
import { ArrowRight, Bot, CalendarCheck, Check, CircleAlert, Globe, LayoutGrid, MoreHorizontal, Search, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";
import PathMark from "../components/PathMark";
import { inputCls } from "../components/MiniLeadForm";
import { useLang } from "../i18n";
import type { ServiceKey } from "../i18n/sections/services";
import { servicesCopy } from "../i18n/sections/services";
import { AUDIT_GROUPS, auditCopy, type AuditGroupKey } from "../i18n/sections/audit";
import { TOOLS_SERVICES, toolsCopy } from "../i18n/sections/tools";
import { AUDIT_BASE, PLANNER_BASE, normalizeSiteUrl } from "../constants/tools";
import AccentTitle from "../components/AccentTitle";

const SERVICE_ICON: Record<ServiceKey, LucideIcon> = {
  sites: Globe, shop: ShoppingBag, booking: CalendarCheck, mobile: Smartphone, ai: Bot, platform: LayoutGrid,
  menu: Globe, desktop: Globe, ads: Globe, seo: Globe, care: Globe,
};

const CARD = "tools-card relative flex flex-col rounded-3xl border border-white/[0.08] bg-ink-panel p-6 text-center sm:p-8 sm:text-left";
const CHIP =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-white/[0.04] px-3.5 text-[14px] font-semibold text-slate-300 ring-1 ring-inset ring-white/[0.10] transition-colors duration-150 hover:bg-white/[0.07] hover:text-white hover:ring-white/[0.18] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

export default function Tools() {
  const { lang, href } = useLang();
  const c = toolsCopy[lang];
  const names = servicesCopy[lang].items;
  const navigate = useNavigate();

  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  // Леко влизане на картите при първо показване. Картите са видими по подразбиране (без JS и в
  // пререндера); скриваме ги само когато са под екрана и ги показваме при влизане. При reduced-motion — без ефект.
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.wait = "true";
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      delete el.dataset.wait;
      io.disconnect();
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const submitCheck = (ev: FormEvent) => {
    ev.preventDefault();
    const full = normalizeSiteUrl(url);
    if (!full) {
      setUrlError(auditCopy[lang].errors.invalid_url);
      document.getElementById("tools-url")?.focus();
      return;
    }
    setUrlError("");
    track("home_tools_check", { host: new URL(full).hostname });
    navigate(`${href(AUDIT_BASE[lang])}?url=${encodeURIComponent(full)}`);
  };

  const pick = (service: ServiceKey | "other") => {
    track("home_tools_planner", { service });
    navigate(service === "other" ? href(PLANNER_BASE[lang]) : `${href(PLANNER_BASE[lang])}?s=${service}`);
  };

  return (
    <section id="tools" className="relative scroll-mt-20 bg-ink px-4 pb-20 text-slate-200 sm:px-6 sm:pb-28">
      <div className="mx-auto max-w-7xl">
        <PathMark n="02" label={c.mark} />

        <div className="mx-auto mt-6 max-w-[40rem] text-center">
          <h2 className="text-[clamp(2rem,1.35rem+2.8vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white [text-wrap:balance]"><AccentTitle text={c.title} accents={["откъде да започнете?", "where to start?", "wo Sie anfangen sollen?", "waar te beginnen?"]} /></h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400 [text-wrap:pretty] sm:text-[17px]">{c.sub}</p>
        </div>

        <div ref={ref} className="tools-grid mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          {/* ── Проверка на сайт ── */}
          <article className={CARD} style={{ "--i": 0 } as CSSProperties}>
            <span aria-hidden className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-text ring-1 ring-inset ring-accent/30 sm:mx-0">
              <Search className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="mt-5 text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-[1.5rem]">{c.check.title}</h3>
            <p className="mx-auto mt-2 max-w-[40ch] text-[14.5px] leading-relaxed text-slate-400 sm:mx-0 sm:text-[15px]">{c.check.text}</p>

            <form onSubmit={submitCheck} noValidate className="mt-6">
              <label htmlFor="tools-url" className="sr-only">{c.check.urlLabel}</label>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                  <Globe aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="tools-url" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} enterKeyHint="go"
                    value={url} onChange={(e) => { setUrl(e.target.value); setUrlError(""); }}
                    placeholder={c.check.urlPlaceholder} aria-invalid={!!urlError} aria-describedby={urlError ? "tools-url-err" : undefined}
                    className={`${inputCls} h-12 pl-11 sm:h-12 sm:text-[15px] ${urlError ? "ring-red-400/60 focus:ring-red-400/60" : ""}`}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-[15px] font-bold text-ink transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {c.check.button}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
              {urlError && (
                <p id="tools-url-err" role="alert" className="mt-2 flex items-start justify-center gap-1.5 text-[13px] text-red-300 sm:justify-start">
                  <CircleAlert className="mt-[2px] h-3.5 w-3.5 shrink-0" aria-hidden />
                  {urlError}
                </p>
              )}
            </form>
            {/* Какво проверяваме — четирите групи от доклада, за да е ясно какво получавате. */}
            <ul className="mx-auto mt-5 grid max-w-[22rem] grid-cols-2 gap-x-4 gap-y-2 text-left sm:mx-0 sm:max-w-none">
              {(Object.keys(AUDIT_GROUPS) as AuditGroupKey[]).map((g) => (
                <li key={g} className="flex items-center gap-2 text-[13.5px] text-slate-300">
                  <Check aria-hidden strokeWidth={2.5} className="h-3.5 w-3.5 shrink-0 text-accent-text" />
                  <span className="min-w-0 truncate">{auditCopy[lang].groups[g]}</span>
                </li>
              ))}
            </ul>
            <p className="mt-auto pt-5 text-[13px] text-slate-500">{c.check.note}</p>
          </article>

          {/* ── Планер на проект ── */}
          <article className={CARD} style={{ "--i": 1 } as CSSProperties}>
            <span aria-hidden className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-text ring-1 ring-inset ring-accent/30 sm:mx-0">
              <LayoutGrid className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="mt-5 text-[1.35rem] font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-[1.5rem]">{c.planner.title}</h3>
            <p className="mx-auto mt-2 max-w-[40ch] text-[14.5px] leading-relaxed text-slate-400 sm:mx-0 sm:text-[15px]">{c.planner.text}</p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start" role="group" aria-label={c.planner.title}>
              {TOOLS_SERVICES.map((k) => {
                const Icon = SERVICE_ICON[k];
                return (
                  <button key={k} type="button" onClick={() => pick(k)} className={CHIP}>
                    <Icon className="h-4 w-4 text-accent-text" strokeWidth={2} aria-hidden />
                    {names[k].name}
                  </button>
                );
              })}
              <button type="button" onClick={() => pick("other")} className={`${CHIP} text-slate-400`}>
                <MoreHorizontal className="h-4 w-4" strokeWidth={2} aria-hidden />
                {c.planner.other}
              </button>
            </div>
            <p className="mt-auto pt-5 text-[13px] text-slate-500">
              <RouterLink
                to={href(PLANNER_BASE[lang])}
                onClick={() => track("home_tools_planner", { service: "link" })}
                className="font-semibold text-slate-400 underline decoration-white/15 underline-offset-[3px] transition-colors hover:text-slate-200 hover:decoration-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                {c.planner.link}
              </RouterLink>
            </p>
          </article>
        </div>
      </div>
      <style>{`
        .tools-card { transition: opacity .55s cubic-bezier(.16,1,.3,1), transform .55s cubic-bezier(.16,1,.3,1); transition-delay: calc(var(--i, 0) * .08s); }
        .tools-grid[data-wait="true"] .tools-card { opacity: 0; transform: translateY(14px); }
        @media (prefers-reduced-motion: reduce) { .tools-card, .tools-grid[data-wait="true"] .tools-card { opacity: 1; transform: none; transition: none; } }
      `}</style>
    </section>
  );
}
