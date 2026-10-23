/**
 * Безплатна проверка на сайт (/proverka-na-sait, /en/website-check …): адрес → бърза автоматична проверка
 * през api/audit.ts → резултат 0–100 и проверките по групи (запитвания, телефон и скорост, Google, доверие).
 * Две заявки едновременно: основната (секунди) и Google PageSpeed (до 30 s), която допълва резултата, когато дойде.
 * Отдолу: карта „Искате ли да ви покажем как да го оправим?“ с компактна форма (source "audit").
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import { ArrowRight, Check, CircleAlert, LoaderCircle, Minus, Search, X } from "lucide-react";
import { useLang, withLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { SITE_ORIGIN } from "../seo/head";
import { AUDIT_GROUPS, auditCopy, auditScore, type AuditCheck, type AuditGroupKey, type AuditStatus } from "../i18n/sections/audit";
import { AUDIT_BASE, normalizeSiteUrl as normalize } from "../constants/tools";
import MiniLeadForm, { inputCls } from "../components/MiniLeadForm";
import AccentTitle from "../components/AccentTitle";

type Phase = "idle" | "running" | "done" | "error";
type PsState = "pending" | "done" | "failed";
type ApiOk = { ok: true; url: string; score: number; checks: AuditCheck[]; pagespeed?: { score: number } | null };
type ApiErr = { ok: false; error: string };

const ease = [0.16, 1, 0.3, 1] as const;
const ALL_IDS = (Object.keys(AUDIT_GROUPS) as AuditGroupKey[]).flatMap((g) => AUDIT_GROUPS[g]);

async function callAudit(url: string, part: "basic" | "pagespeed"): Promise<ApiOk | ApiErr> {
  const res = await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url, part }) });
  const data = (await res.json().catch(() => null)) as ApiOk | ApiErr | null;
  if (!data || typeof data !== "object") return { ok: false, error: "failed" };
  return data;
}

export default function SiteCheck() {
  const { lang, href } = useLang();
  const c = auditCopy[lang];
  const reduce = useReducedMotion();
  const { search } = useLocation();
  const path = AUDIT_BASE[lang];

  useSeo({
    title: c.metaTitle,
    description: c.metaDescription,
    path,
    alternates: { ...AUDIT_BASE },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: c.nav,
      description: c.metaDescription,
      url: `${SITE_ORIGIN}${withLang(path, lang)}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      provider: { "@id": `${SITE_ORIGIN}/#organization` },
      inLanguage: lang,
    },
  });

  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [checkedUrl, setCheckedUrl] = useState("");
  const [checks, setChecks] = useState<AuditCheck[]>([]);
  const [ps, setPs] = useState<PsState>("pending");
  const [elapsed, setElapsed] = useState(0);
  const runId = useRef(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const autoRan = useRef<string | null>(null);

  useEffect(() => {
    if (phase !== "running" && !(phase === "done" && ps === "pending")) return;
    const t0 = Date.now();
    const id = window.setInterval(() => setElapsed(Math.round((Date.now() - t0) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, [phase, ps]);

  const run = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    const url = normalize(input);
    if (!url) {
      setInputError(c.errors.invalid_url);
      document.getElementById("audit-url")?.focus();
      return;
    }
    setInputError("");
    void start(url);
  };

  // ?url= от друга страница (картата на началната страница): попълва полето и проверката тръгва сама.
  // Невалиден адрес само попълва полето, за да го поправи човекът. Пази се кой адрес е пуснат, за да не
  // тръгне два пъти (StrictMode) и да не се повтаря при „Провери друг сайт“.
  useEffect(() => {
    const q = new URLSearchParams(search).get("url");
    if (!q || autoRan.current === q) return;
    autoRan.current = q;
    setInput(q);
    const url = normalize(q);
    if (url) void start(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function start(url: string) {
    const id = ++runId.current;
    setPhase("running");
    setError("");
    setChecks([]);
    setPs("pending");
    setElapsed(0);
    track("audit_run", { host: new URL(url).hostname });

    // PageSpeed тръгва едновременно с основната проверка; резултатът му идва по-късно.
    const psPromise = callAudit(url, "pagespeed").catch(() => ({ ok: false, error: "network" }) as ApiErr);
    let basic: ApiOk | ApiErr;
    try {
      basic = await callAudit(url, "basic");
    } catch {
      basic = { ok: false, error: "network" };
    }
    if (id !== runId.current) return;
    if (!basic.ok) {
      setPhase("error");
      setError(basic.error);
      return;
    }
    setCheckedUrl(basic.url);
    setChecks(basic.checks);
    setPhase("done");
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" }), 50);

    const psRes = await psPromise;
    if (id !== runId.current) return;
    if (psRes.ok && psRes.checks.length) {
      setChecks((prev) => [...prev.filter((x) => x.id !== "pagespeed"), ...psRes.checks]);
      setPs("done");
    } else {
      setPs("failed");
    }
  }

  const again = () => {
    runId.current++;
    setPhase("idle");
    setChecks([]);
    setError("");
    setInput("");
    document.getElementById("audit-url")?.focus();
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
  };

  const score = useMemo(() => auditScore(checks), [checks]);
  const byId = useMemo(() => Object.fromEntries(checks.map((x) => [x.id, x])), [checks]);
  const failed = useMemo(() => ALL_IDS.filter((id) => byId[id] && byId[id].status !== "good"), [byId]);
  const level = score >= 80 ? "good" : score >= 55 ? "ok" : "bad";

  const formatValue = (ch: AuditCheck): string => {
    const v = ch.value;
    if (v === undefined || v === "") return "";
    switch (ch.id) {
      case "ttfb": return c.values.ms.replace("{n}", String(v));
      case "html_size": return c.values.kb.replace("{n}", String(v));
      case "h1": return c.values.h1.replace("{n}", String(v));
      case "pagespeed": return c.values.pagespeed.replace("{n}", String(v));
      case "img_alt": {
        const [n, total] = String(v).split("/");
        return n === "0" ? "" : c.values.imgs.replace("{n}", n).replace("{total}", total);
      }
      case "contact": return String(v).split(",").filter(Boolean).map((k) => c.values.found[k] ?? k).join(", ");
      case "title":
      case "description": return `„${String(v).slice(0, 110)}${String(v).length > 110 ? "…" : ""}“`;
      case "lang": return String(v);
      default: return "";
    }
  };

  const toFixText = (copy: typeof c) => failed.map((id) => `- ${copy.checks[id]?.title ?? id} (${copy.statuses[byId[id].status]})`).join("\n");
  const ownerText = `${auditCopy.bg.labels.check}: ${checkedUrl}\n${auditCopy.bg.labels.score}: ${score}/100\n${auditCopy.bg.labels.toFix}:\n${toFixText(auditCopy.bg) || "—"}`;
  const waText = `${c.waIntro}\n${checkedUrl}\n${c.labels.score}: ${score}/100\n${c.labels.toFix}:\n${toFixText(c) || "—"}`;

  const ring = 2 * Math.PI * 52;

  return (
    <main className="bg-ink text-slate-200">
      <header className="mx-auto max-w-3xl px-5 pt-28 text-center sm:px-6 sm:pt-32">
        <nav aria-label="breadcrumb" className="flex items-center justify-center gap-2 text-[13px] text-slate-500">
          <RouterLink to={href("/")} className="rounded transition-colors hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text">Rafetov.com</RouterLink>
          <span aria-hidden>/</span>
          <span>{c.nav}</span>
        </nav>
        <h1 className="mt-6 text-[clamp(2.1rem,6.4vw,3.4rem)] font-extrabold leading-[1.03] tracking-[-0.034em] text-white"><AccentTitle text={c.title} accents={["за една минута", "in one minute", "in einer Minute", "in één minuut"]} breakBefore /></h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-[16.5px] leading-[1.6] text-slate-400 sm:text-[17px]">{c.sub}</p>

        <form onSubmit={run} noValidate className="mx-auto mt-8 max-w-xl">
          <label htmlFor="audit-url" className="sr-only">{c.urlLabel}</label>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                id="audit-url" type="text" inputMode="url" autoComplete="url" autoCapitalize="none" spellCheck={false} enterKeyHint="go"
                value={input} onChange={(e) => { setInput(e.target.value); setInputError(""); }}
                placeholder={c.urlPlaceholder} aria-invalid={!!inputError} aria-describedby={inputError ? "audit-url-err" : undefined}
                className={`${inputCls} h-14 pl-11 sm:h-14 sm:text-[16px] ${inputError ? "ring-red-400/60 focus:ring-red-400/60" : ""}`}
              />
            </div>
            <button
              type="submit"
              disabled={phase === "running"}
              className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-7 text-[15px] font-bold text-ink transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {phase === "running" ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : null}
              {phase === "running" ? c.running : c.run}
              {phase !== "running" && <ArrowRight className="h-4 w-4" aria-hidden />}
            </button>
          </div>
          {inputError && (
            <p id="audit-url-err" role="alert" className="mt-2 flex items-start justify-center gap-1.5 text-[13px] text-red-300">
              <CircleAlert className="mt-[2px] h-3.5 w-3.5 shrink-0" aria-hidden />
              {inputError}
            </p>
          )}
        </form>
        <p className="mx-auto mt-5 max-w-[60ch] text-[13px] leading-relaxed text-slate-500">{c.disclaimer}</p>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14" aria-live="polite">
        <div ref={resultRef} className="mx-auto max-w-4xl scroll-mt-24">
          <AnimatePresence mode="wait" initial={false}>
            {phase === "running" && (
              <motion.div key="running" initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}
                className="rounded-3xl bg-ink-panel p-6 ring-1 ring-inset ring-white/[0.08] sm:p-8">
                <h2 className="text-center text-[1.25rem] font-extrabold tracking-[-0.02em] text-white sm:text-left">{c.loading.title.replace("{url}", normalize(input) ?? input)}</h2>
                <p className="mt-2 text-center text-[14.5px] leading-relaxed text-slate-400 sm:text-left">{c.loading.text}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {ALL_IDS.map((id) => (
                    <li key={id} className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3 text-[14px] text-slate-300 ring-1 ring-inset ring-white/[0.06]">
                      <LoaderCircle className="h-4 w-4 shrink-0 animate-spin text-slate-500" aria-hidden />
                      <span className="truncate">{c.checks[id]?.title}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-center text-[12.5px] tabular-nums text-slate-500 sm:text-left">{elapsed} s</p>
              </motion.div>
            )}

            {phase === "error" && (
              <motion.div key="error" role="alert" initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}
                className="mx-auto max-w-xl rounded-2xl bg-ink-panel p-6 text-center ring-1 ring-inset ring-white/[0.08]">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-400/10 text-red-300 ring-1 ring-inset ring-red-400/30">
                  <CircleAlert className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-200">{c.errors[error] ?? c.errors.failed}</p>
                <button type="button" onClick={again} className="mt-5 text-[13.5px] font-semibold text-slate-300 underline decoration-white/20 underline-offset-[3px] transition-colors hover:text-white hover:decoration-accent">
                  {c.again}
                </button>
              </motion.div>
            )}

            {phase === "done" && (
              <motion.div key="done" initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
                {/* ── Резултат ── */}
                <div className="flex flex-col items-center gap-6 rounded-3xl bg-ink-panel p-6 ring-1 ring-inset ring-white/[0.08] sm:flex-row sm:gap-8 sm:p-8">
                  <div className="relative h-[124px] w-[124px] shrink-0" role="img" aria-label={`${c.score.title}: ${score} ${c.score.of}`}>
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="8" />
                      <circle cx="60" cy="60" r="52" fill="none" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" strokeDasharray={ring} strokeDashoffset={ring * (1 - score / 100)} className="motion-safe:transition-[stroke-dashoffset] motion-safe:duration-700" />
                    </svg>
                    <span className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[2.1rem] font-extrabold leading-none tracking-[-0.03em] text-white tabular-nums">{score}</span>
                      <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">{c.score.of}</span>
                    </span>
                  </div>
                  <div className="min-w-0 text-center sm:text-left">
                    <h2 className="text-[clamp(1.4rem,3vw,1.8rem)] font-extrabold leading-snug tracking-[-0.025em] text-white">{c.score.levels[level]}</h2>
                    <p className="mt-2 truncate text-[13.5px] text-slate-400">
                      {c.checkedUrl}: <span className="text-slate-200">{checkedUrl}</span>
                    </p>
                    {ps === "pending" && (
                      <p className="mt-3 inline-flex items-center gap-2 text-[13px] text-slate-400">
                        <LoaderCircle className="h-3.5 w-3.5 animate-spin text-accent-text" aria-hidden />
                        {c.loading.pagespeed} <span className="tabular-nums text-slate-500">{elapsed} s</span>
                      </p>
                    )}
                    {ps === "failed" && <p className="mt-3 text-[13px] text-slate-500">{c.pagespeedFailed}</p>}
                  </div>
                </div>

                {/* ── Групи ── */}
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  {(Object.keys(AUDIT_GROUPS) as AuditGroupKey[]).map((g) => (
                    <section key={g} className="rounded-3xl bg-ink-panel ring-1 ring-inset ring-white/[0.08]">
                      <h3 className="px-6 pt-6 text-[15px] font-bold tracking-[-0.01em] text-white">{c.groups[g]}</h3>
                      <ul className="divide-y divide-white/[0.06] px-6 pb-3 pt-2">
                        {AUDIT_GROUPS[g].map((id) => {
                          const ch = byId[id];
                          const pending = id === "pagespeed" && !ch;
                          if (!ch && !pending) return null;
                          if (pending && ps === "failed") return null;
                          const copy = c.checks[id];
                          const value = ch ? formatValue(ch) : "";
                          return (
                            <li key={id} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 py-4">
                              <StatusIcon status={ch?.status} pending={pending} labels={c.statuses} />
                              <div className="min-w-0">
                                <p className="flex flex-wrap items-baseline gap-x-2 text-[15px] font-semibold leading-snug text-slate-100">
                                  {copy?.title ?? id}
                                  <span className={`text-[12px] font-semibold ${ch?.status === "good" ? "text-accent-text" : ch?.status === "warn" ? "text-slate-400" : ch ? "text-red-300" : "text-slate-500"}`}>
                                    {pending ? c.pagespeedPending : c.statuses[ch!.status]}
                                  </span>
                                </p>
                                {value && <p className="mt-0.5 truncate text-[13px] text-slate-400">{value}</p>}
                                <p className="mt-1 text-[13.5px] leading-relaxed text-slate-400">{copy?.why}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ))}
                </div>

                {/* ── Карта за контакт ── */}
                <div className="mt-8 grid gap-6 rounded-3xl bg-ink-panel p-6 ring-1 ring-inset ring-white/[0.08] sm:p-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-10">
                  <div className="text-center lg:text-left">
                    <h2 className="text-[clamp(1.5rem,3.4vw,2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white">{c.cta.title}</h2>
                    <p className="mx-auto mt-3 max-w-[44ch] text-[15px] leading-relaxed text-slate-400 lg:mx-0">{c.cta.text}</p>
                    {failed.length > 0 && (
                      <ul className="mx-auto mt-5 inline-flex max-w-full flex-wrap justify-center gap-1.5 lg:justify-start">
                        {failed.slice(0, 6).map((id) => (
                          <li key={id} className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-[12.5px] text-slate-300">{c.checks[id]?.title}</li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-6 text-[13px] text-slate-500">
                      <button type="button" onClick={again} className="font-semibold text-slate-400 underline decoration-white/15 underline-offset-[3px] transition-colors hover:text-slate-200">{c.again}</button>
                    </p>
                  </div>
                  <div>
                    <MiniLeadForm
                      idPrefix="audit"
                      copy={c.cta}
                      service={auditCopy.bg.labels.service}
                      source="audit"
                      message={ownerText}
                      waText={waText}
                      onSent={() => track("audit_send", { score, via: "form" })}
                      onWhatsApp={() => track("audit_send", { score, via: "whatsapp" })}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

function StatusIcon({ status, pending, labels }: { status?: AuditStatus; pending: boolean; labels: Record<AuditStatus, string> }) {
  if (pending || !status) {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.05] text-slate-500" aria-hidden>
        <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
      </span>
    );
  }
  const cls = status === "good" ? "bg-accent/12 text-accent-text ring-accent/40" : status === "warn" ? "bg-white/[0.05] text-slate-300 ring-white/[0.14]" : "bg-red-400/10 text-red-300 ring-red-400/30";
  const Icon = status === "good" ? Check : status === "warn" ? Minus : X;
  return (
    <span className={`flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-inset ${cls}`} role="img" aria-label={labels[status]}>
      <Icon className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden />
    </span>
  );
}
