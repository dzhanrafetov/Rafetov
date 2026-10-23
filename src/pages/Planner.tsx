/**
 * Планер на проект (/planer, /en/planner …): пет въпроса, по един на екран, после „Вашият план“ —
 * какво ще изградим, функции, обхват, реалистичен срок, какво следва. Планът се праща с един тап
 * към /api/lead (source "planner") или в WhatsApp. Без цени. Отговорите се пазят в sessionStorage.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import {
  ArrowLeft, ArrowRight, Bot, CalendarCheck, Check, Globe, LayoutGrid, LifeBuoy, MapPin, Megaphone, Monitor, ShoppingBag, Smartphone, Utensils,
  type LucideIcon,
} from "lucide-react";
import { useLang, withLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { SITE_ORIGIN } from "../seo/head";
import { servicesCopy, type ServiceKey } from "../i18n/sections/services";
import {
  FEATURES, GOAL_KEYS, PLANNER_SERVICES, STATE_KEYS, TIMELINE, WHEN_KEYS, plannerCopy,
  type GoalKey, type PlannerCopy, type StateKey, type TimelineKey, type WhenKey,
} from "../i18n/sections/planner";
import type { ReplyKey } from "../i18n/sections/contact";
import { PLANNER_BASE } from "../constants/tools";
import MiniLeadForm, { chipCls } from "../components/MiniLeadForm";
import PathMark from "../components/PathMark";
import AccentTitle from "../components/AccentTitle";

type Answers = { service: ServiceKey | null; goals: GoalKey[]; features: string[]; state: StateKey | null; when: WhenKey | null };
const EMPTY: Answers = { service: null, goals: [], features: [], state: null, when: null };
const STORAGE_KEY = "planner_v1";
const TITLE_ACCENTS = ["за една минута", "in one minute", "in einer Minute", "in één minuut"];
const PLAN_ACCENTS = ["план", "plan", "Plan"];
const TOTAL = 5;
const ease = [0.16, 1, 0.3, 1] as const;

const SERVICE_ICON: Record<ServiceKey, LucideIcon> = {
  sites: Globe, shop: ShoppingBag, menu: Utensils, booking: CalendarCheck, platform: LayoutGrid, mobile: Smartphone, desktop: Monitor, ai: Bot, ads: Megaphone, seo: MapPin, care: LifeBuoy,
};

function restore(): { answers: Answers; step: number } {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { answers: EMPTY, step: 0 };
    const v = JSON.parse(raw) as { answers?: Partial<Answers>; step?: number };
    const a: Answers = { ...EMPTY, ...v.answers };
    if (a.service && !PLANNER_SERVICES.includes(a.service)) return { answers: EMPTY, step: 0 };
    // Стари или непознати функции (след промяна на списъците) не се показват като празни отметки.
    a.features = a.service ? (a.features ?? []).filter((f) => (FEATURES[a.service!] as readonly string[]).includes(f)) : [];
    return { answers: a, step: Math.min(Math.max(v.step ?? 0, 0), TOTAL) };
  } catch {
    return { answers: EMPTY, step: 0 };
  }
}

/** Срокът: сайт с много функции или нужда от текстове = по-голям сайт; приложения, системи, AI — след разговора. */
function timelineFor(a: Answers): TimelineKey {
  if (!a.service) return "call";
  if (a.service === "sites" && (a.features.length >= 3 || a.state === "help")) return "large";
  return TIMELINE[a.service];
}

/** Текстът на плана: за нас на български, за WhatsApp на езика на човека. */
function planText(c: PlannerCopy, names: Record<ServiceKey, { name: string }>, a: Answers): string {
  if (!a.service) return "";
  const tl = timelineFor(a);
  const lines = [
    c.labels.plan,
    `${c.labels.service}: ${names[a.service].name}`,
    a.goals.length ? `${c.labels.goals}: ${a.goals.map((g) => c.steps.goals.options[g]).join(", ")}` : "",
    `${c.labels.features}: ${a.features.length ? a.features.map((f) => c.features[f]).join(", ") : c.steps.features.none}`,
    `${c.labels.scope}: ${c.scope[a.service].join("; ")}`,
    `${c.labels.timeline}: ${c.result.timelines[tl]}${tl !== "call" ? ` (${c.result.timelineNote})` : ""}`,
    a.state ? `${c.labels.state}: ${c.steps.state.options[a.state]}` : "",
    a.when ? `${c.labels.when}: ${c.steps.when.options[a.when]}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

export default function Planner() {
  const { lang, href } = useLang();
  const c = plannerCopy[lang];
  const names = servicesCopy[lang].items;
  const reduce = useReducedMotion();
  const path = PLANNER_BASE[lang];
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useSeo({
    title: c.metaTitle,
    description: c.metaDescription,
    path,
    alternates: { ...PLANNER_BASE },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: c.nav,
      description: c.metaDescription,
      url: `${SITE_ORIGIN}${withLang(path, lang)}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      provider: { "@id": `${SITE_ORIGIN}/#organization` },
      inLanguage: lang,
    },
  });

  const [{ answers, step }, setState] = useState<{ answers: Answers; step: number }>({ answers: EMPTY, step: 0 });
  const [hydrated, setHydrated] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    // ?s=<услуга> от началната страница (чиповете в „Безплатни инструменти“): услугата е избрана и планерът
    // се отваря на втория въпрос. Непознат идентификатор се пропуска. Параметърът се маха от адреса, за да
    // не връща човека на стъпка 2 при презареждане.
    const s = new URLSearchParams(search).get("s") as ServiceKey | null;
    const saved = restore();
    if (s && PLANNER_SERVICES.includes(s)) {
      const features = saved.answers.service === s ? saved.answers.features : [];
      setState({ answers: { ...saved.answers, service: s, features }, step: 1 });
      started.current = true;
      track("planner_start", { service: s, via: "home" });
      navigate(pathname, { replace: true });
    } else {
      setState(saved);
    }
    setHydrated(true);
    // Само при първо показване: по-късна смяна на адреса идва от самия планер.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step }));
    } catch {
      /* частен режим — просто без запомняне */
    }
  }, [answers, step, hydrated]);

  const setAnswers = (patch: Partial<Answers>) => setState((s) => ({ ...s, answers: { ...s.answers, ...patch } }));

  const keepPanelVisible = () => {
    const el = panelRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0) window.scrollTo({ top: top + window.scrollY - 84, behavior: reduce ? "instant" : "smooth" });
  };

  const go = (next: number) => {
    setState((s) => ({ ...s, step: next }));
    keepPanelVisible();
    if (next === TOTAL) track("planner_complete", { service: answers.service ?? "—", features: answers.features.length, when: answers.when ?? "—" });
  };

  const choose = <K extends "service" | "state" | "when">(key: K, value: Answers[K]) => {
    const patch: Partial<Answers> = { [key]: value };
    // Нова услуга → старите функции не важат.
    if (key === "service" && value !== answers.service) patch.features = [];
    setAnswers(patch);
    if (key === "service" && !started.current) {
      started.current = true;
      track("planner_start", { service: String(value) });
    }
    // Единичен избор: напред веднага, без втори тап.
    go(step + 1);
  };

  const toggle = (key: "goals" | "features", value: string) => {
    const list = answers[key] as string[];
    setAnswers({ [key]: list.includes(value) ? list.filter((x) => x !== value) : [...list, value] } as Partial<Answers>);
  };

  const canNext = step === 0 ? !!answers.service : step === 1 ? answers.goals.length > 0 : step === 3 ? !!answers.state : step === 4 ? !!answers.when : true;

  const reset = () => {
    setState({ answers: EMPTY, step: 0 });
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* няма хранилище */
    }
    keepPanelVisible();
  };

  const tl = timelineFor(answers);
  const ownerText = useMemo(() => planText(plannerCopy.bg, servicesCopy.bg.items, answers), [answers]);
  const visitorText = useMemo(() => planText(c, names, answers), [c, names, answers]);
  const waText = `${c.waIntro}\n\n${visitorText}`;

  const slide = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, x: 18 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -14 } };

  const stepTitle = [c.steps.service.title, c.steps.goals.title, c.steps.features.title, c.steps.state.title, c.steps.when.title][step];
  const stepHint = [c.steps.service.hint, c.steps.goals.hint, c.steps.features.hint, "", ""][step];
  const featureKeys = answers.service ? FEATURES[answers.service] : [];

  return (
    <main className="bg-ink text-slate-200">
      <header className="mx-auto max-w-3xl px-5 pt-28 text-center sm:px-6 sm:pt-32">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 text-[13px] text-slate-500">
          <RouterLink to={href("/")} className="rounded transition-colors hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text">Rafetov.com</RouterLink>
          <span aria-hidden>/</span>
          <span>{c.nav}</span>
        </nav>
        <h1 className="mt-6 text-[clamp(2.1rem,6.4vw,3.4rem)] font-extrabold leading-[1.03] tracking-[-0.034em] text-white"><AccentTitle text={c.title} accents={TITLE_ACCENTS} /></h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-[1.6] text-slate-400 sm:text-[17px]">{c.sub}</p>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        {/* До възстановяването от sessionStorage панелът е скрит: иначе за миг се вижда първият въпрос, преди
            да се появи запомнената стъпка или планът. Новият key пресъздава AnimatePresence, за да няма анимация на изход. */}
        <div ref={panelRef} className={`mx-auto ${step === TOTAL ? "max-w-6xl" : "max-w-3xl"} ${hydrated ? "" : "invisible"}`}>
          <AnimatePresence key={hydrated ? "restored" : "initial"} mode="wait" initial={false}>
            {step < TOTAL ? (
              <motion.div key="steps" initial={false} exit={{ opacity: 0 }} className="overflow-hidden rounded-3xl bg-ink-panel ring-1 ring-inset ring-white/[0.08] shadow-[0_32px_80px_-36px_rgba(0,0,0,0.85)]">
                {/* ── Прогрес ── */}
                <div className="border-b border-white/[0.07] px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
                  <ol className="flex gap-2" aria-label={c.stepOf.replace("{n}", String(step + 1)).replace("{total}", String(TOTAL))}>
                    {Array.from({ length: TOTAL }, (_, i) => (
                      <li key={i} className="min-w-0 flex-1">
                        <button
                          type="button"
                          disabled={i >= step}
                          aria-current={i === step ? "step" : undefined}
                          aria-label={c.stepOf.replace("{n}", String(i + 1)).replace("{total}", String(TOTAL))}
                          onClick={() => i < step && go(i)}
                          className="block w-full py-1 disabled:cursor-default"
                        >
                          <span className={`block h-[3px] rounded-full transition-colors duration-300 ${i <= step ? "bg-accent" : "bg-white/[0.10]"}`} />
                        </button>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-2.5 text-center text-[12.5px] font-semibold text-slate-400 sm:text-left">
                    <span className="text-accent-text">{c.stepOf.replace("{n}", String(step + 1)).replace("{total}", String(TOTAL))}</span>
                  </p>
                </div>

                {/* ── Въпросът ── */}
                <div className="px-5 py-6 sm:px-8 sm:py-8">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={step} {...slide} transition={{ duration: 0.3, ease }}>
                      <fieldset>
                        <legend className="w-full text-center text-[clamp(1.35rem,2.8vw,1.7rem)] font-extrabold tracking-[-0.025em] text-white sm:text-left">{stepTitle}</legend>
                        {stepHint && <p className="mt-1.5 text-center text-[13.5px] text-slate-400 sm:text-left">{stepHint}</p>}

                        {step === 0 && (
                          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                            {PLANNER_SERVICES.map((k) => {
                              const on = answers.service === k;
                              const Icon = SERVICE_ICON[k];
                              return (
                                <button
                                  key={k}
                                  type="button"
                                  aria-pressed={on}
                                  onClick={() => choose("service", k)}
                                  className={`group relative flex min-h-[112px] flex-col justify-between gap-3 rounded-2xl p-4 text-left ring-1 ring-inset transition-[background-color,box-shadow,transform] duration-200 active:scale-[0.99] ${
                                    on ? "bg-accent/10 ring-accent/50" : "bg-white/[0.03] ring-white/[0.08] hover:bg-white/[0.06] hover:ring-white/[0.18]"
                                  }`}
                                >
                                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${on ? "bg-accent/15 text-accent-text" : "bg-white/[0.05] text-slate-300 group-hover:text-slate-100"}`}>
                                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-[14.5px] font-bold leading-tight text-slate-50">{names[k].name}</span>
                                    <span className="mt-1 block text-[12.5px] leading-snug text-slate-400">{names[k].tagline}</span>
                                  </span>
                                  <span aria-hidden className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-ink transition-[opacity,transform] duration-200 ${on ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
                                    <Check className="h-3 w-3" strokeWidth={3.5} />
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {step === 1 && (
                          <div className="mt-5 grid gap-2 sm:grid-cols-2">
                            {GOAL_KEYS.map((g) => {
                              const on = answers.goals.includes(g);
                              return (
                                <button key={g} type="button" aria-pressed={on} onClick={() => toggle("goals", g)} className={`${chipCls(on)} min-h-[52px] justify-start px-4 text-left`}>
                                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ring-1 ring-inset ${on ? "bg-accent text-ink ring-accent" : "ring-white/20"}`} aria-hidden>
                                    {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                                  </span>
                                  {c.steps.goals.options[g]}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {step === 2 && (
                          <div className="mt-5 grid gap-2 sm:grid-cols-2">
                            {featureKeys.map((f) => {
                              const on = answers.features.includes(f);
                              return (
                                <button key={f} type="button" aria-pressed={on} onClick={() => toggle("features", f)} className={`${chipCls(on)} min-h-[52px] justify-start px-4 text-left`}>
                                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ring-1 ring-inset ${on ? "bg-accent text-ink ring-accent" : "ring-white/20"}`} aria-hidden>
                                    {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                                  </span>
                                  {c.features[f]}
                                </button>
                              );
                            })}
                            <button type="button" aria-pressed={answers.features.length === 0} onClick={() => setAnswers({ features: [] })} className={`${chipCls(answers.features.length === 0)} min-h-[52px] justify-start px-4 text-left text-slate-400 sm:col-span-2`}>
                              {c.steps.features.none}
                            </button>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="mt-5 grid gap-2 sm:grid-cols-2">
                            {STATE_KEYS.map((k) => {
                              const on = answers.state === k;
                              return (
                                <button key={k} type="button" aria-pressed={on} onClick={() => choose("state", k)} className={`${chipCls(on)} min-h-[56px] justify-start px-4 text-left`}>
                                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${on ? "bg-accent text-ink ring-accent" : "ring-white/20"}`} aria-hidden>
                                    {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                                  </span>
                                  {c.steps.state.options[k]}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {step === 4 && (
                          <div className="mt-5 grid gap-2 sm:grid-cols-3">
                            {WHEN_KEYS.map((k) => {
                              const on = answers.when === k;
                              return (
                                <button key={k} type="button" aria-pressed={on} onClick={() => choose("when", k)} className={`${chipCls(on)} min-h-[56px] px-4`}>
                                  {on && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
                                  {c.steps.when.options[k]}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </fieldset>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── Навигация ── */}
                <div className="flex flex-col-reverse gap-2 border-t border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
                  {step > 0 ? (
                    <button type="button" onClick={() => go(step - 1)} className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-3 text-[14px] font-semibold text-slate-300 transition-colors hover:text-white sm:justify-start">
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                      {c.back}
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => go(step + 1)}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-bold text-ink transition-[filter,transform,opacity] duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 sm:ml-auto sm:w-auto"
                  >
                    {step === TOTAL - 1 ? c.showPlan : c.next}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
                <PathMark n="✓" label={c.result.title} />
                <h2 className="mt-6 text-center text-[clamp(1.9rem,5.5vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white"><AccentTitle text={c.result.title} accents={PLAN_ACCENTS} /></h2>
                <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start lg:gap-8">
                  {answers.service && (
                    <article className="rounded-3xl bg-ink-panel p-6 ring-1 ring-inset ring-white/[0.08] sm:p-8">
                      <h3 className="text-[15px] font-bold text-white">{c.result.build}</h3>
                      <p className="mt-3 text-[clamp(1.25rem,2.4vw,1.5rem)] font-extrabold leading-snug tracking-[-0.02em] text-white">{names[answers.service].name}</p>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-slate-300">{c.result.buildText[answers.service]}</p>
                      {answers.goals.length > 0 && (
                        <p className="mt-3 text-[14.5px] leading-relaxed text-slate-400">
                          <span className="font-semibold text-slate-200">{c.result.goalsLead}:</span> {answers.goals.map((g) => c.steps.goals.options[g]).join(", ")}
                        </p>
                      )}

                      <div className="mt-7 grid gap-7 sm:grid-cols-2">
                        <div>
                          <h3 className="text-[15px] font-bold text-white">{c.result.featuresTitle}</h3>
                          {answers.features.length ? (
                            <ul className="mt-3 space-y-2.5">
                              {answers.features.map((f) => (
                                <li key={f} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-slate-200">
                                  <Check aria-hidden strokeWidth={2.5} className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                                  {c.features[f]}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="mt-3 text-[14.5px] leading-relaxed text-slate-400">{c.result.noFeatures}</p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-[15px] font-bold text-white">{c.result.scopeTitle}</h3>
                          <ul className="mt-3 space-y-2.5">
                            {c.scope[answers.service].map((s) => (
                              <li key={s} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-slate-200">
                                <i aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-7 rounded-2xl bg-white/[0.03] p-5 ring-1 ring-inset ring-white/[0.07]">
                        <h3 className="text-[15px] font-bold text-white">{c.result.timelineTitle}</h3>
                        <p className="mt-2 text-[1.35rem] font-extrabold tracking-[-0.02em] text-white">
                          {c.result.timelines[tl]}
                          {tl !== "call" && <span className="block text-[13.5px] font-medium text-slate-400 sm:inline sm:before:content-['_·_']">{c.result.timelineNote}</span>}
                        </p>
                        {answers.state && <p className="mt-3 text-[14.5px] leading-relaxed text-slate-300">{c.result.stateNote[answers.state]}</p>}
                        {answers.when && <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-400">{c.result.whenNote[answers.when]}</p>}
                      </div>

                      <div className="mt-7">
                        <h3 className="text-[15px] font-bold text-white">{c.result.nextTitle}</h3>
                        <ol className="mt-3 space-y-3">
                          {c.result.nextSteps.map((s, i) => (
                            <li key={s} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 text-[14.5px] leading-relaxed text-slate-200">
                              <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/60 text-[12px] font-bold tabular-nums text-accent-text">{i + 1}</span>
                              <span className="pt-0.5">{s}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-white/[0.07] pt-5 text-[13.5px] sm:justify-start">
                        <button type="button" onClick={() => go(0)} className="font-semibold text-slate-300 underline decoration-white/20 underline-offset-[3px] transition-colors hover:text-white hover:decoration-accent">
                          {c.result.edit}
                        </button>
                        <button type="button" onClick={reset} className="font-semibold text-slate-500 underline decoration-white/15 underline-offset-[3px] transition-colors hover:text-slate-200">
                          {c.result.restart}
                        </button>
                      </div>
                    </article>
                  )}

                  <aside className="rounded-3xl bg-ink-panel p-6 ring-1 ring-inset ring-white/[0.08] sm:p-8 lg:sticky lg:top-24">
                    <h3 className="text-center text-[1.25rem] font-extrabold tracking-[-0.02em] text-white lg:text-left">{c.form.title}</h3>
                    <p className="mt-2 text-center text-[14.5px] leading-relaxed text-slate-400 lg:text-left">{c.form.text}</p>
                    <div className="mt-6">
                      <MiniLeadForm
                        idPrefix="planner"
                        copy={c.form}
                        service={answers.service ? servicesCopy.bg.items[answers.service].name : "Планер"}
                        source="planner"
                        message={ownerText}
                        waText={waText}
                        onSent={(reply?: ReplyKey) => track("planner_send", { service: answers.service ?? "—", reply: reply ?? "—" })}
                        onWhatsApp={() => track("planner_send", { service: answers.service ?? "—", reply: "whatsapp_direct" })}
                        afterSuccess={
                          <button type="button" onClick={reset} className="mt-6 text-[13px] font-semibold text-slate-400 underline decoration-white/15 underline-offset-[3px] transition-colors hover:text-slate-200">
                            {c.form.success.again}
                          </button>
                        }
                      />
                    </div>
                  </aside>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
