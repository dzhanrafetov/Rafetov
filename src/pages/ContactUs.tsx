/**
 * 06 Запитване — краят на „пътя“. Вместо дълга форма: бриф в три стъпки
 * (какво ви трябва → за бизнеса → как да ви отговорим) и един ред за директен контакт.
 * Запитването тръгва едновременно към /api/lead (Telegram) и EmailJS; брои се за изпратено, ако мине поне единият път.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import {
  ArrowLeft, ArrowRight, Bot, Check, CircleAlert, CircleHelp, Globe, LayoutGrid, LoaderCircle, Mail, Megaphone, Phone, ShoppingBag, Smartphone,
} from "lucide-react";
import PathMark from "../components/PathMark";
import WhatsAppIcon from "../components/WhatsAppIcon";
import ViberIcon from "../components/ViberIcon";
import { PHONE_PATTERN, sanitizePhone } from "../components/FormField";
import { BUSINESS, ROUTES, VIBER_HREF, whatsappHref } from "../constants/business";
import { useLang } from "../i18n";
import { offers } from "../i18n/offers";
import {
  COUNTRY_KEYS, REPLY_KEYS, SERVICE_KEYS, contactCopy,
  type ContactCopy, type CountryKey, type ReplyKey, type ServiceKey,
} from "../i18n/sections/contact";
import type { SourceKey } from "../i18n/types";
import { plannerCopy } from "../i18n/sections/planner";
import { PLANNER_BASE } from "../constants/tools";
import sendEmail from "../service/emailService";
import { attributionLine, sourceKeysFor } from "../service/attribution";
import AccentTitle from "../components/AccentTitle";

type Step = "need" | "business" | "reply";
type HasSite = "" | "yes" | "no";

type Brief = {
  services: ServiceKey[];
  niche: string;
  countries: CountryKey[];
  otherCountry: string;
  hasSite: HasSite;
  siteUrl: string;
  message: string;
  name: string;
  phone: string;
  reply: ReplyKey;
  email: string;
};

type FieldKey = "services" | "siteUrl" | "name" | "phone" | "email";
type Errors = Partial<Record<FieldKey, string>>;

const EMPTY: Brief = {
  services: [], niche: "", countries: [], otherCountry: "", hasSite: "", siteUrl: "", message: "",
  name: "", phone: "", reply: "whatsapp", email: "",
};

const SERVICE_ICON: Record<ServiceKey, React.ComponentType<{ className?: string }>> = {
  site: Globe, shop: ShoppingBag, platform: LayoutGrid, app: Smartphone, ai: Bot, ads: Megaphone, unsure: CircleHelp,
};

const REPLY_ICON: Record<ReplyKey, React.ReactNode> = {
  whatsapp: <WhatsAppIcon className="h-4 w-4" />,
  viber: <ViberIcon className="h-4 w-4" />,
  call: <Phone className="h-4 w-4" aria-hidden />,
  email: <Mail className="h-4 w-4" aria-hidden />,
};

/** `?service=` приема и синоними, за да може всяка страница да сочи към плочка. */
const SERVICE_ALIAS: Record<string, ServiceKey> = {
  // Ключовете на секцията „Услуги“ (src/i18n/sections/services.ts): sites, shop, menu, booking, platform, mobile, desktop, ai, ads, seo, care.
  site: "site", sites: "site", website: "site", web: "site", menu: "site", care: "site",
  shop: "shop", store: "shop", eshop: "shop", ecommerce: "shop",
  platform: "platform", system: "platform", crm: "platform", booking: "platform", desktop: "platform",
  app: "app", mobile: "app",
  ai: "ai", automation: "ai", chatbot: "ai",
  ads: "ads", seo: "ads", marketing: "ads",
  unsure: "unsure", other: "unsure",
};

const PHONE_RE = new RegExp(`^(?:${PHONE_PATTERN})$`);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Параметрите идват и от „?…“ преди hash-а (/?service=ai#contact), и от „#contact?service=ai“. */
function readParams(search: string, hash: string) {
  const p = new URLSearchParams(search);
  const q = hash.indexOf("?");
  if (q >= 0) new URLSearchParams(hash.slice(q)).forEach((v, k) => p.set(k, v));
  return p;
}

function normalizeUrl(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  const withScheme = /^[a-z]+:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    return u.hostname.includes(".") ? u.href.replace(/\/$/, "") : null;
  } catch {
    return null;
  }
}

const ease = [0.16, 1, 0.3, 1] as const;

const inputCls = `
  peer h-12 w-full rounded-xl bg-white/[0.04] px-4 text-[16px] text-slate-100 sm:h-11 sm:text-[14.5px]
  ring-1 ring-inset ring-white/[0.10] placeholder:text-slate-500 transition-[background-color,box-shadow] duration-150
  focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-accent/50
`;
const inputErrCls = "ring-red-400/60 focus:ring-red-400/60";

const chipCls = (on: boolean) =>
  `inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl px-3.5 text-center text-[14px] font-semibold ring-1 ring-inset transition-colors duration-150 ${
    on ? "bg-accent/10 text-accent-text ring-accent/50" : "bg-white/[0.04] text-slate-300 ring-white/[0.10] hover:bg-white/[0.07] hover:ring-white/[0.18]"
  }`;

const labelCls = "mb-2 block text-[13.5px] font-semibold text-slate-200";
const directLinkCls = "font-semibold text-slate-200 underline decoration-white/20 underline-offset-[3px] transition-colors hover:text-white hover:decoration-accent";

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-[12.5px] leading-snug text-red-300">
      <CircleAlert className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden />
      {text}
    </p>
  );
}

export default function ContactUs() {
  const { t, href, lang } = useLang();
  const s = contactCopy[lang];
  const { search, hash } = useLocation();
  const reduce = useReducedMotion();

  const params = useMemo(() => readParams(search, hash), [search, hash]);
  const audit = params.get("intent") === "audit";
  const requestedService = SERVICE_ALIAS[(params.get("service") || "").toLowerCase()];
  const requestedPackage = params.get("package");
  const packageName = requestedPackage !== null && /^[0-2]$/.test(requestedPackage) ? offers[lang].packages[Number(requestedPackage)]?.name : undefined;

  const steps: Step[] = audit ? ["business", "reply"] : ["need", "business", "reply"];
  const [stepIndex, setStepIndex] = useState(0);
  const step = steps[Math.min(stepIndex, steps.length - 1)];

  const [brief, setBrief] = useState<Brief>(() => ({
    ...EMPTY,
    services: requestedService ? [requestedService] : packageName ? ["site"] : [],
    hasSite: audit ? "yes" : "",
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [source, setSource] = useState<SourceKey | "">("");
  // Капан за ботове: поле, което човек не вижда. Попълнено ли е — запитването не се праща.
  const [trap, setTrap] = useState("");
  const [openedAt] = useState(() => Date.now());
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Линк от друга страница (?service= / ?intent=audit / ?package=) сменя избора и връща брифа в началото.
  useEffect(() => {
    setSent(false);
    setFailed(false);
    setErrors({});
    setStepIndex(0);
    setBrief((b) => ({
      ...b,
      services: requestedService ? [requestedService] : packageName && b.services.length === 0 ? ["site"] : b.services,
      hasSite: audit ? "yes" : b.hasSite,
    }));
  }, [requestedService, packageName, audit]);

  const set = <K extends keyof Brief>(key: K, value: Brief[K]) => {
    setBrief((b) => ({ ...b, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (k: ServiceKey) => {
    setBrief((b) => {
      const has = b.services.includes(k);
      // „Не съм сигурен“ изключва останалите и обратно.
      const next = has ? b.services.filter((x) => x !== k) : k === "unsure" ? ["unsure" as ServiceKey] : [...b.services.filter((x) => x !== "unsure"), k];
      return { ...b, services: next };
    });
    setErrors((e) => ({ ...e, services: undefined }));
  };

  const toggleCountry = (k: CountryKey) =>
    setBrief((b) => ({ ...b, countries: b.countries.includes(k) ? b.countries.filter((x) => x !== k) : [...b.countries, k] }));

  const validate = (which: Step): Errors => {
    const e: Errors = {};
    if (which === "need" && brief.services.length === 0) e.services = s.need.error;
    if (which === "business" && (brief.hasSite === "yes" || audit) && !normalizeUrl(brief.siteUrl)) e.siteUrl = s.business.siteUrlError;
    if (which === "reply") {
      if (!brief.name.trim()) e.name = s.reply.nameError;
      const phoneRequired = brief.reply !== "email";
      if ((phoneRequired || brief.phone) && !PHONE_RE.test(brief.phone.trim())) e.phone = s.reply.phoneError;
      if (brief.reply === "email" && !EMAIL_RE.test(brief.email.trim())) e.email = s.reply.emailError;
    }
    return e;
  };

  const focusField = (key: FieldKey) => {
    const el = panelRef.current?.querySelector<HTMLElement>(`[data-field="${key}"]`);
    el?.focus({ preventScroll: true });
    el?.scrollIntoView({ block: "center", behavior: reduce ? "instant" : "smooth" });
  };

  /** Връща горния край на панела в екрана при смяна на стъпка — бутонът е долу, новата стъпка започва горе. */
  const keepPanelVisible = () => {
    const el = panelRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0) window.scrollTo({ top: top + window.scrollY - 84, behavior: reduce ? "instant" : "smooth" });
  };

  const go = (index: number) => {
    setStepIndex(index);
    setErrors({});
    keepPanelVisible();
    track("contact_step", { step: steps[index], intent: audit ? "audit" : "brief" });
    // С мишка/клавиатура: фокусът отива на първото поле. На телефон не — иначе изскача клавиатурата.
    if (window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) {
      window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("[data-step] input, [data-step] button")?.focus({ preventScroll: true }), 60);
    }
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) {
      setErrors(e);
      focusField(Object.keys(e)[0] as FieldKey);
      return;
    }
    go(stepIndex + 1);
  };

  /** Обобщение на брифа. Към собственика отива на български; за резервните линкове (WhatsApp/имейл) — на езика на човека. */
  const summary = (c: ContactCopy) => {
    const serviceLabel = audit
      ? c.audit
      : [packageName, ...brief.services.map((k) => c.need.services[k].label)].filter(Boolean).join(", ");
    const countries = brief.countries
      .map((k) => (k === "other" ? brief.otherCountry.trim() || c.business.countries.other : c.business.countries[k]))
      .join(", ");
    const site = brief.hasSite === "yes" || audit ? normalizeUrl(brief.siteUrl) || brief.siteUrl.trim() : brief.hasSite === "no" ? c.labels.noSite : "";
    const lines = [
      serviceLabel && `${c.labels.services}: ${serviceLabel}`,
      brief.niche.trim() && `${c.labels.niche}: ${brief.niche.trim()}`,
      countries && `${c.labels.countries}: ${countries}`,
      site && `${c.labels.site}: ${site}`,
      brief.message.trim() && `${c.labels.message}: ${brief.message.trim()}`,
    ].filter(Boolean) as string[];
    return { serviceLabel, lines, replyLabel: c.reply.channels[brief.reply] };
  };

  const fallbackBody = () => {
    const { lines, replyLabel } = summary(s);
    return [
      `${s.reply.name}: ${brief.name.trim()}`,
      brief.phone.trim() && `${s.reply.phone}: ${brief.phone.trim()}`,
      brief.email.trim() && `${s.reply.email}: ${brief.email.trim()}`,
      `${s.labels.reply}: ${replyLabel}`,
      "",
      ...lines,
    ].filter((l): l is string => typeof l === "string").join("\n");
  };

  const submit = async () => {
    const e = validate("reply");
    if (Object.keys(e).length) {
      setErrors(e);
      focusField(Object.keys(e)[0] as FieldKey);
      return;
    }
    const secs = Math.round((Date.now() - openedAt) / 1000);
    // Ботът вижда „изпратено“ и спира да опитва; на нас не идва нищо.
    if (trap) {
      track("contact_form_bot", { secs });
      setSent(true);
      return;
    }
    setIsSending(true);
    setFailed(false);

    const bg = summary(contactCopy.bg);
    const name = brief.name.trim();
    const phone = brief.phone.trim();
    const email = brief.email.trim();
    const message = bg.lines.join("\n");
    const sourceLine = attributionLine();

    const viaTelegram = async () => {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, email,
          service: bg.serviceLabel,
          reply: bg.replyLabel,
          message,
          lang,
          page: window.location.pathname,
          source: sourceLine,
          website: trap,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(`lead ${res.status} ${data.error || ""}`.trim());
    };
    const viaEmail = () =>
      sendEmail({
        name, email, phone,
        service: bg.serviceLabel,
        // Името и тук — дори шаблонът в EmailJS да не го показва, стига до нас.
        message: `${contactCopy.bg.reply.name}: ${name}\n${contactCopy.bg.labels.reply}: ${bg.replyLabel}\n${message}\n\n${sourceLine}`,
      });

    const results = await Promise.allSettled([viaTelegram(), viaEmail()]);
    setIsSending(false);
    if (results.some((r) => r.status === "fulfilled")) {
      track("contact_form_sent", { service: bg.serviceLabel || "—", intent: audit ? "audit" : brief.reply, via: results.map((r) => (r.status === "fulfilled" ? "ok" : "x")).join("") });
      setSent(true);
      return;
    }
    // Запазваме въведеното — потребителят не бива да пише всичко наново.
    setFailed(true);
    const reason = results
      .map((r) => {
        if (r.status === "fulfilled") return "";
        const err = r.reason as { status?: number; text?: string; message?: string };
        return err instanceof Error ? err.message : typeof err?.status === "number" ? `${err.status} ${err.text || ""}`.trim() : String(err);
      })
      .join(" | ")
      .slice(0, 80);
    track("contact_form_failed", {
      reason,
      webdriver: navigator.webdriver ? "yes" : "no",
      filled: [name && "name", phone && "phone", email && "email", brief.message && "msg"].filter(Boolean).join(",") || "none",
      secs,
    });
    console.error(results);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;
    if (step === "reply") void submit();
    else next();
  };

  const reset = () => {
    setSent(false);
    setFailed(false);
    setSource("");
    setErrors({});
    setStepIndex(0);
    setBrief({ ...EMPTY, hasSite: audit ? "yes" : "" });
  };

  /** Потвърждението и грешката изникват далеч от бутона — центрираме ги и даваме фокус за четците. */
  const revealOnMount = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    node.focus?.({ preventScroll: true });
    node.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "center" });
  }, [reduce]);

  const slide = reduce
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, x: 18 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -14 } };

  const waDirect = whatsappHref(`${s.waPrefill}${brief.services.map((k) => s.need.services[k].label).join(", ") || "…"}`);
  const waFallback = whatsappHref(`${t.contact.errorSubject}\n\n${fallbackBody()}`);
  const mailFallback = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(t.contact.errorSubject)}&body=${encodeURIComponent(fallbackBody())}`;

  const stepTitle: Record<Step, string> = { need: s.steps.need, business: s.steps.business, reply: s.steps.reply };

  return (
    <section id="contact" className="relative bg-ink text-slate-200">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 sm:pb-28">
        <PathMark n="07" label={s.chapter} />

        <div className="mx-auto mt-6 max-w-[34ch] text-center sm:mt-8">
          <h2 className="text-[clamp(1.9rem,5.6vw,3.1rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-50"><AccentTitle text={s.h2} accents={["за бизнеса си.", "your business.", "Ihrem Unternehmen.", "uw bedrijf."]} /></h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400">{s.sub}</p>
          {/* Тих линк към планера: за хората, които още не знаят какво да поискат. */}
          <p className="mt-3 text-[13.5px] text-slate-500">
            {plannerCopy[lang].entry.question}{" "}
            <Link to={href(PLANNER_BASE[lang])} className={`${directLinkCls} whitespace-nowrap`}>{plannerCopy[lang].entry.link}</Link>
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-8 sm:mt-14">
          {/* ── Директен контакт: един хоризонтален ред под брифа (лявата колона стоеше празна). ── */}
          <aside className="order-2 flex flex-col items-center gap-4 rounded-2xl border border-white/[0.07] px-5 py-5 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:text-left">
            <p className="text-[15px] font-bold tracking-[-0.01em] text-slate-100">{s.direct.title}</p>
            <a
              href={waDirect}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("contact_direct", { channel: "whatsapp" })}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl px-5 sm:w-auto bg-accent/10 text-[15.5px] font-bold text-accent-text ring-1 ring-inset ring-accent/40 transition-[background-color,box-shadow] duration-200 hover:bg-accent/[0.16] hover:ring-accent/60"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {s.direct.whatsapp}
              <ArrowRight className="h-4 w-4 opacity-70" aria-hidden />
            </a>
            <ul className="flex flex-col items-center gap-2.5 text-[13.5px] text-slate-400 sm:flex-row sm:gap-5">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
                <span>
                  {s.direct.or}{" "}
                  <a href={BUSINESS.phoneHref} onClick={() => track("contact_direct", { channel: "phone" })} className={directLinkCls}>
                    {s.direct.call} {BUSINESS.phone}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-slate-500" aria-hidden />
                <a href={`mailto:${BUSINESS.email}`} onClick={() => track("contact_direct", { channel: "email" })} className={directLinkCls}>
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <ViberIcon className="h-4 w-4 shrink-0 text-slate-500" />
                <a href={VIBER_HREF} target="_blank" rel="noopener noreferrer" onClick={() => track("contact_direct", { channel: "viber" })} className={directLinkCls}>
                  {s.direct.viber}
                </a>
              </li>
            </ul>
          </aside>

          {/* ── Брифът ── */}
          <div className="order-1">
            <div
              ref={panelRef}
              className="overflow-hidden rounded-3xl bg-ink-panel ring-1 ring-inset ring-white/[0.08] shadow-[0_32px_80px_-36px_rgba(0,0,0,0.85)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="sent"
                    ref={revealOnMount}
                    tabIndex={-1}
                    role="status"
                    aria-live="polite"
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="flex flex-col items-center px-5 py-12 text-center outline-none sm:px-10 sm:py-16"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/12 text-accent-text ring-1 ring-inset ring-accent/40">
                      <Check className="h-7 w-7" strokeWidth={2.5} aria-hidden />
                    </span>
                    <h3 className="mt-6 text-[clamp(1.4rem,3.2vw,1.9rem)] font-extrabold tracking-[-0.03em] text-slate-50">{s.success.title}</h3>
                    <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-slate-400">
                      {s.success.text.replace("{channel}", s.reply.channels[brief.reply])}
                    </p>
                    <p className="mt-6 text-[13.5px] text-slate-400">
                      {s.success.faster}{" "}
                      <a href={waDirect} target="_blank" rel="noopener noreferrer" onClick={() => track("contact_direct", { channel: "whatsapp_after" })} className="inline-flex items-center gap-1.5 font-semibold text-accent-text underline decoration-accent/30 underline-offset-[3px] hover:decoration-accent">
                        <WhatsAppIcon className="h-4 w-4" />
                        {s.success.whatsapp}
                      </a>
                    </p>

                    {/* Питаме след изпращането: във формата е още едно поле, тук не пречи на никого. */}
                    <div className="mt-8 w-full max-w-md border-t border-white/[0.07] pt-6">
                      <p className="text-[13px] font-semibold text-slate-300">{t.contact.source}</p>
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {sourceKeysFor(lang).map((k) => (
                          <button
                            key={k}
                            type="button"
                            aria-pressed={source === k}
                            disabled={!!source && source !== k}
                            onClick={() => {
                              if (source) return;
                              setSource(k);
                              track("contact_source", { source: k });
                            }}
                            className={`${chipCls(source === k)} min-h-[38px] px-3.5 text-[13px] disabled:cursor-default disabled:opacity-40`}
                          >
                            {source === k && <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />}
                            {t.contact.sources[k]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button type="button" onClick={reset} className="mt-6 text-[13px] font-semibold text-slate-400 underline decoration-white/15 underline-offset-[3px] transition-colors hover:text-slate-200">
                      {s.success.again}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="brief" initial={false} exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="relative">
                    {/* ── Прогрес ── */}
                    <div className="border-b border-white/[0.07] px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
                      {audit && (
                        <div className="mb-4 rounded-xl bg-accent/[0.07] px-4 py-3 ring-1 ring-inset ring-accent/25">
                          <p className="text-[14px] font-bold text-accent-text">{s.audit}</p>
                          <p className="mt-0.5 text-[13px] leading-snug text-slate-400">{s.auditSub}</p>
                        </div>
                      )}
                      <ol className="flex gap-2" aria-label={s.stepOf.replace("{n}", String(stepIndex + 1)).replace("{total}", String(steps.length))}>
                        {steps.map((st, i) => {
                          const done = i < stepIndex;
                          const active = i === stepIndex;
                          return (
                            <li key={st} className="min-w-0 flex-1">
                              <button
                                type="button"
                                disabled={!done}
                                aria-current={active ? "step" : undefined}
                                onClick={() => done && go(i)}
                                className="group block w-full text-left disabled:cursor-default"
                              >
                                <span className={`block h-[3px] rounded-full transition-colors duration-300 ${done || active ? "bg-accent" : "bg-white/[0.10]"}`} />
                                <span className={`mt-2.5 hidden items-center gap-1.5 text-[12.5px] font-semibold sm:flex ${active ? "text-slate-100" : done ? "text-accent-text group-hover:text-white" : "text-slate-500"}`}>
                                  <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10.5px] tabular-nums ring-1 ring-inset ring-current">
                                    {done ? <Check className="h-3 w-3" strokeWidth={3} aria-hidden /> : i + 1}
                                  </span>
                                  <span className="truncate">{stepTitle[st]}</span>
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                      {/* На телефон трите етикета не се събират — една линия казва къде сме. */}
                      <p className="mt-2.5 text-[12.5px] font-semibold text-slate-400 sm:hidden">
                        <span className="text-accent-text">{s.stepOf.replace("{n}", String(stepIndex + 1)).replace("{total}", String(steps.length))}</span>
                        <span className="text-slate-600"> · </span>
                        <span className="text-slate-100">{stepTitle[step]}</span>
                      </p>
                    </div>

                    {/* ── Стъпки ── */}
                    <div className="px-5 py-6 sm:px-8 sm:py-8">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={step} data-step={step} {...slide} transition={{ duration: 0.32, ease }}>
                          {step === "need" && (
                            <fieldset>
                              <legend className="text-[clamp(1.25rem,2.6vw,1.5rem)] font-extrabold tracking-[-0.025em] text-slate-50">{s.need.title}</legend>
                              <p className="mt-1.5 text-[13.5px] text-slate-400">{s.need.hint}</p>
                              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3" data-field="services" tabIndex={-1}>
                                {SERVICE_KEYS.map((k) => {
                                  const on = brief.services.includes(k);
                                  const Icon = SERVICE_ICON[k];
                                  const wide = k === "unsure";
                                  return (
                                    <button
                                      key={k}
                                      type="button"
                                      aria-pressed={on}
                                      onClick={() => toggleService(k)}
                                      className={`group relative rounded-2xl p-4 text-left ring-1 ring-inset transition-[background-color,box-shadow,transform] duration-200 active:scale-[0.99] ${
                                        wide ? "col-span-2 flex items-center gap-4 sm:col-span-3" : "flex min-h-[118px] flex-col justify-between gap-3"
                                      } ${on ? "bg-accent/10 ring-accent/50" : "bg-white/[0.03] ring-white/[0.08] hover:bg-white/[0.06] hover:ring-white/[0.18]"}`}
                                    >
                                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${on ? "bg-accent/15 text-accent-text" : "bg-white/[0.05] text-slate-300 group-hover:text-slate-100"}`}>
                                        <Icon className="h-[18px] w-[18px]" aria-hidden />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-[15px] font-bold leading-tight text-slate-50">{s.need.services[k].label}</span>
                                        <span className="mt-1 block text-[12.5px] leading-snug text-slate-400">{s.need.services[k].hint}</span>
                                      </span>
                                      <span
                                        aria-hidden
                                        className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-ink transition-[opacity,transform] duration-200 ${on ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                                      >
                                        <Check className="h-3 w-3" strokeWidth={3.5} />
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                              <FieldError id="err-services" text={errors.services} />
                            </fieldset>
                          )}

                          {step === "business" && (
                            <div className="space-y-6">
                              <h3 className="text-[clamp(1.25rem,2.6vw,1.5rem)] font-extrabold tracking-[-0.025em] text-slate-50">{s.business.title}</h3>

                              <div>
                                <label htmlFor="brief-niche" className={labelCls}>{s.business.niche}</label>
                                <input
                                  id="brief-niche" type="text" value={brief.niche} onChange={(e) => set("niche", e.target.value)}
                                  placeholder={s.business.nichePlaceholder} autoComplete="organization-title" enterKeyHint="next" maxLength={120}
                                  className={inputCls}
                                />
                                <div className="mt-2.5 flex flex-wrap gap-1.5">
                                  {s.business.nicheChips.map((chip) => {
                                    const on = brief.niche === chip;
                                    return (
                                      <button key={chip} type="button" aria-pressed={on} onClick={() => set("niche", on ? "" : chip)} className={`${chipCls(on)} min-h-[34px] px-3 text-[12.5px]`}>
                                        {chip}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <fieldset>
                                <legend className={labelCls}>{s.business.where}</legend>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                  {COUNTRY_KEYS.map((k) => {
                                    const on = brief.countries.includes(k);
                                    return (
                                      <button key={k} type="button" aria-pressed={on} onClick={() => toggleCountry(k)} className={chipCls(on)}>
                                        {on && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
                                        {s.business.countries[k]}
                                      </button>
                                    );
                                  })}
                                </div>
                                <AnimatePresence initial={false}>
                                  {brief.countries.includes("other") && (
                                    <motion.div
                                      key="other"
                                      initial={reduce ? false : { opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={reduce ? undefined : { opacity: 0, height: 0 }}
                                      transition={{ duration: 0.25, ease }}
                                      className="overflow-hidden"
                                    >
                                      <div className="pt-3">
                                        <label htmlFor="brief-other-country" className="sr-only">{s.business.otherCountry}</label>
                                        <input
                                          id="brief-other-country" type="text" value={brief.otherCountry} onChange={(e) => set("otherCountry", e.target.value)}
                                          placeholder={`${s.business.otherCountry} ${s.business.otherCountryPlaceholder}`} autoComplete="country-name" enterKeyHint="next" maxLength={60}
                                          className={inputCls}
                                        />
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </fieldset>

                              <fieldset>
                                <legend className={labelCls}>{audit ? s.business.siteUrl : s.business.hasSite}</legend>
                                {!audit && (
                                  <div className="grid grid-cols-2 gap-2 sm:max-w-[22rem]">
                                    {(["yes", "no"] as const).map((v) => {
                                      const on = brief.hasSite === v;
                                      return (
                                        <button key={v} type="button" aria-pressed={on} onClick={() => set("hasSite", on ? "" : v)} className={chipCls(on)}>
                                          {on && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
                                          {v === "yes" ? s.business.hasSiteYes : s.business.hasSiteNo}
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                                <AnimatePresence initial={false}>
                                  {(brief.hasSite === "yes" || audit) && (
                                    <motion.div
                                      key="url"
                                      initial={reduce || audit ? false : { opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={reduce ? undefined : { opacity: 0, height: 0 }}
                                      transition={{ duration: 0.25, ease }}
                                      className="overflow-hidden"
                                    >
                                      <div className={audit ? "" : "pt-3"}>
                                        <label htmlFor="brief-url" className="sr-only">{s.business.siteUrl}</label>
                                        <input
                                          id="brief-url" type="url" inputMode="url" value={brief.siteUrl} onChange={(e) => set("siteUrl", e.target.value)}
                                          placeholder={s.business.siteUrlPlaceholder} autoComplete="url" enterKeyHint="next" data-field="siteUrl"
                                          aria-invalid={!!errors.siteUrl} aria-describedby={errors.siteUrl ? "err-siteUrl" : undefined}
                                          className={`${inputCls} ${errors.siteUrl ? inputErrCls : ""}`}
                                        />
                                        <FieldError id="err-siteUrl" text={errors.siteUrl} />
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </fieldset>

                              <div>
                                <label htmlFor="brief-message" className={labelCls}>{s.business.message}</label>
                                <textarea
                                  id="brief-message" value={brief.message} onChange={(e) => set("message", e.target.value)} rows={3} maxLength={1500}
                                  placeholder={s.business.messagePlaceholder} className={`${inputCls} h-auto resize-none py-3 sm:h-auto`}
                                />
                              </div>
                            </div>
                          )}

                          {step === "reply" && (
                            <div className="space-y-6">
                              <h3 className="text-[clamp(1.25rem,2.6vw,1.5rem)] font-extrabold tracking-[-0.025em] text-slate-50">{s.reply.title}</h3>

                              <fieldset>
                                <legend className={labelCls}>{s.reply.channel}</legend>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                  {REPLY_KEYS.map((k) => {
                                    const on = brief.reply === k;
                                    return (
                                      <label key={k} className={`${chipCls(on)} has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-accent-text`}>
                                        <input type="radio" name="reply" value={k} checked={on} onChange={() => set("reply", k)} className="sr-only" />
                                        {REPLY_ICON[k]}
                                        {s.reply.channels[k]}
                                      </label>
                                    );
                                  })}
                                </div>
                              </fieldset>

                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                  <label htmlFor="brief-name" className={labelCls}>{s.reply.name}</label>
                                  <input
                                    id="brief-name" type="text" value={brief.name} onChange={(e) => set("name", e.target.value)}
                                    placeholder={s.reply.namePlaceholder} autoComplete="name" enterKeyHint="next" maxLength={80} data-field="name"
                                    aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined}
                                    className={`${inputCls} ${errors.name ? inputErrCls : ""}`}
                                  />
                                  <FieldError id="err-name" text={errors.name} />
                                </div>
                                <div>
                                  <label htmlFor="brief-phone" className={labelCls}>{brief.reply === "email" ? s.reply.emailOptional : s.reply.phone}</label>
                                  <input
                                    id="brief-phone" type="tel" value={brief.phone} onChange={(e) => set("phone", sanitizePhone(e.target.value))}
                                    placeholder={s.reply.phonePlaceholder} inputMode="tel" autoComplete="tel" enterKeyHint={brief.reply === "email" ? "next" : "send"} maxLength={20} data-field="phone"
                                    aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined}
                                    className={`${inputCls} ${errors.phone ? inputErrCls : ""}`}
                                  />
                                  <FieldError id="err-phone" text={errors.phone} />
                                </div>
                                <AnimatePresence initial={false}>
                                  {brief.reply === "email" && (
                                    <motion.div
                                      key="email"
                                      initial={reduce ? false : { opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={reduce ? undefined : { opacity: 0, height: 0 }}
                                      transition={{ duration: 0.25, ease }}
                                      className="overflow-hidden sm:col-span-2"
                                    >
                                      <label htmlFor="brief-email" className={labelCls}>{s.reply.email}</label>
                                      <input
                                        id="brief-email" type="email" value={brief.email} onChange={(e) => set("email", e.target.value)}
                                        placeholder={s.reply.emailPlaceholder} autoComplete="email" enterKeyHint="send" maxLength={120} data-field="email"
                                        aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined}
                                        className={`${inputCls} ${errors.email ? inputErrCls : ""}`}
                                      />
                                      <FieldError id="err-email" text={errors.email} />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {failed && (
                                <div
                                  ref={revealOnMount}
                                  tabIndex={-1}
                                  role="alert"
                                  className="flex items-start gap-3 rounded-xl bg-red-400/[0.08] px-4 py-3.5 text-[13.5px] leading-relaxed text-red-200 outline-none ring-1 ring-inset ring-red-400/30"
                                >
                                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                                  <div className="min-w-0">
                                    <p className="font-bold">{s.failed.title}</p>
                                    <p className="mt-0.5 text-red-200/80">{s.failed.text}</p>
                                    <div className="mt-2.5 flex flex-wrap gap-2">
                                      <a href={waFallback} target="_blank" rel="noopener noreferrer" onClick={() => track("contact_fallback_used", { channel: "whatsapp" })}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-1.5 text-[12.5px] font-semibold text-slate-100 ring-1 ring-inset ring-white/[0.14] transition-colors hover:bg-white/[0.11]">
                                        <WhatsAppIcon className="h-3.5 w-3.5" />
                                        {t.contact.sendByWhatsapp}
                                      </a>
                                      <a href={mailFallback} onClick={() => track("contact_fallback_used", { channel: "email" })}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-1.5 text-[12.5px] font-semibold text-slate-100 ring-1 ring-inset ring-white/[0.14] transition-colors hover:bg-white/[0.11]">
                                        <Mail className="h-3.5 w-3.5" aria-hidden />
                                        {t.contact.sendByEmail}
                                      </a>
                                      <a href={BUSINESS.phoneHref} onClick={() => track("contact_fallback_used", { channel: "phone" })}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-1.5 text-[12.5px] font-semibold text-slate-100 ring-1 ring-inset ring-white/[0.14] transition-colors hover:bg-white/[0.11]">
                                        <Phone className="h-3.5 w-3.5" aria-hidden />
                                        {BUSINESS.phone}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Капан за ботове: извън екрана и извън Tab реда, човек не го попълва. */}
                    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                      <label>
                        website
                        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                      </label>
                    </div>

                    {/* ── Навигация ── */}
                    <div className="border-t border-white/[0.07] px-5 py-4 sm:px-8 sm:py-5">
                      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                        {stepIndex > 0 ? (
                          <button type="button" onClick={() => go(stepIndex - 1)} className="inline-flex min-h-[44px] items-center gap-1.5 self-start rounded-xl px-3 text-[14px] font-semibold text-slate-300 transition-colors hover:text-white">
                            <ArrowLeft className="h-4 w-4" aria-hidden />
                            {s.back}
                          </button>
                        ) : (
                          <span className="hidden items-center gap-1.5 text-[12.5px] text-slate-500 sm:inline-flex">
                            <kbd className="rounded-md bg-white/[0.05] px-1.5 py-0.5 font-sans text-[11px] font-semibold text-slate-400 ring-1 ring-inset ring-white/[0.10]">Enter</kbd>
                            {s.enterHint.replace(/^Enter\s*/, "")}
                          </span>
                        )}
                        {step === "reply" ? (
                          <button
                            type="submit"
                            disabled={isSending}
                            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-bold text-ink transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:ml-auto sm:w-auto"
                          >
                            {isSending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : null}
                            {isSending ? s.sending : s.submit}
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-bold text-ink transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] sm:ml-auto sm:w-auto"
                          >
                            {s.next}
                            <ArrowRight className="h-4 w-4" aria-hidden />
                          </button>
                        )}
                      </div>
                      {step === "reply" && (
                        <p className="mt-3 text-[12px] leading-relaxed text-slate-500 sm:text-right">
                          {t.contact.consent}{" "}
                          <Link to={href(ROUTES.privacy)} className="text-slate-300 underline decoration-white/20 underline-offset-[3px] transition-colors hover:text-white hover:decoration-accent">
                            {t.contact.consentLink}
                          </Link>
                          .
                        </p>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
