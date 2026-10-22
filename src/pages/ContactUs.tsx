import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { offers } from "../i18n/offers";
import sendEmail from "../service/emailService";
import { track } from "@vercel/analytics";
import { BUSINESS, ROUTES, VIBER_HREF } from "../constants/business";
import ViberIcon from "../components/ViberIcon";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { useLang } from "../i18n";
import type { SourceKey } from "../i18n/types";
import { attributionLine, sourceKeysFor } from "../service/attribution";
import { FormField, PHONE_PATTERN, chipCls, inputCls, sanitizePhone } from "../components/FormField";

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** WhatsApp първи: така пишат повечето хора от видеата. Цветът е само в иконата. */
const CONTACT_ITEMS = [
  {
    k: "whatsapp" as const,
    href: "https://wa.me/359897758062",
    external: true,
    tint: "#25D366",
    icon: <WhatsAppIcon className="h-5 w-5" />,
  },
  {
    k: "viber" as const,
    href: VIBER_HREF,
    external: true,
    tint: "#7360F2",
    icon: <ViberIcon className="h-5 w-5" />,
  },
  {
    k: "phone" as const,
    href: "tel:+359897758062",
    tint: "",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 5.2 2 2 0 0 1 4.1 3h2a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.5 2.1L7.4 10a16 16 0 0 0 6.6 6.6l.9-.8a2 2 0 0 1 2.1-.5c.7.3 1.5.5 2.3.6A2 2 0 0 1 22 16.9Z" />
      </svg>
    ),
  },
  {
    k: "email" as const,
    href: "mailto:business@rafetov.com",
    tint: "",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v12H4V6Z" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    ),
  },
];

/** Стойностите остават на български — така пристигат в имейла към собственика. */
type ReplyKey = "whatsapp" | "viber" | "call" | "email";
const REPLY_OPTIONS: ReplyKey[] = ["whatsapp", "viber", "call", "email"];

const REPLY_ICON: Record<ReplyKey, React.ReactNode> = {
  whatsapp: <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />,
  viber: <ViberIcon className="h-4 w-4 shrink-0 text-[#8b7cf6]" />,
  call: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 5.2 2 2 0 0 1 4.1 3h2a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.5 2.1L7.4 10a16 16 0 0 0 6.6 6.6l.9-.8a2 2 0 0 1 2.1-.5c.7.3 1.5.5 2.3.6A2 2 0 0 1 22 16.9Z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 6h16v12H4V6Z" /><path d="M4 7l8 6 8-6" />
    </svg>
  ),
};

const SERVICE_OPTIONS = [
  { value: "уебсайт",            k: "site"  as const },
  { value: "електронен магазин", k: "shop"  as const },
  { value: "дигитално меню",     k: "menu"  as const },
  { value: "реклами",            k: "ads"   as const },
  { value: "друго",              k: "other" as const },
];

/** Маха „(по желание)“ от етикета — в тялото на имейла стои по-добре без него. */
const plain = (label: string) => label.replace(/\s*[({\[].*$/, "").trim();

export default function ContactUs() {
  const { t, href, lang } = useLang();
  const c = offers[lang];
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  // Видео анализът се отваря само по линк (?intent=audit); обикновената форма не пита „как да започнем“.
  const [audit, setAudit] = useState(params.get('intent') === 'audit');
  // Как да отговорим: повечето хора от видеата искат да пишат, не да говорят — затова по подразбиране е WhatsApp.
  const [reply, setReply] = useState<ReplyKey>("whatsapp");
  const [website, setWebsite] = useState('');
  const requestedPackage = params.get('package');
  const selectedPackage = requestedPackage !== null && /^[0-2]$/.test(requestedPackage) ? c.packages[Number(requestedPackage)] : undefined;
  useEffect(() => {
    setAudit(new URLSearchParams(search).get('intent') === 'audit');
    setSent(false);
    setFailed(false);
  }, [search]);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [source, setSource] = useState<SourceKey | "">("");
  // Капан за ботове: поле, което човек не вижда. Попълнено ли е — запитването не се праща.
  const [trap, setTrap] = useState("");
  const [openedAt] = useState(() => Date.now());
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((v) => ({ ...v, [name]: name === "phone" ? sanitizePhone(value) : value }));
  };

  /**
   * Центрира блок, който току-що се е появил. Потвърждението изниква в горния край
   * на картата, а човекът е долу при бутона — иначе просто не го вижда.
   */
  const revealOnMount = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    node.focus?.({ preventScroll: true });
    // Без requestAnimationFrame: в скрит таб той не се изпълнява изобщо и скролът се губи.
    // Височината е известна още при монтирането, така че директното извикване е достатъчно.
    node.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "center" });
  }, []);

  /** Каналите за спасяване на запитването: същите данни, друг път до нас. */
  const requestDetails = [
    `${c.mode}: ${audit ? c.audit : c.reply[reply]}`,
    !audit && selectedPackage && `Package: ${selectedPackage.name}`,
    audit && `${c.website}: ${website}`,
    formData.message,
  ].filter(Boolean).join('\n');
  const fallbackBody = [
    `${plain(t.contact.name)}: ${formData.name}`,
    `${plain(t.contact.phone)}: ${formData.phone}`,
    formData.email && `${plain(t.contact.email)}: ${formData.email}`,
    formData.service && `${plain(t.contact.service)}: ${formData.service}`,
    requestDetails,
  ].filter(Boolean).join("\n");

  const mailtoHref =
    `mailto:${BUSINESS.email}` +
    `?subject=${encodeURIComponent(t.contact.errorSubject)}` +
    `&body=${encodeURIComponent(fallbackBody)}`;
  const whatsappHref =
    `https://wa.me/359897758062?text=${encodeURIComponent(`${t.contact.errorSubject}\n\n${fallbackBody}`)}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const secs = Math.round((Date.now() - openedAt) / 1000);
    // Ботът вижда „изпратено“ и спира да опитва; на нас не идва нищо.
    if (trap) {
      track("contact_form_bot", { secs });
      setSent(true);
      return;
    }
    setIsSending(true);
    setFailed(false);
    try {
      await sendEmail({ ...formData,
        service: audit ? c.audit : selectedPackage?.name || formData.service,
        // Името и тук — дори шаблонът в EmailJS да не го показва, стига до нас.
        message: `${[formData.name && `${plain(t.contact.name)}: ${formData.name}`, requestDetails].filter(Boolean).join("\n")}\n\n${attributionLine()}`,
      });
      track("contact_form_sent", { service: selectedPackage?.name || formData.service || "—", intent: audit ? "audit" : reply });
      setSent(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setSource("");
    } catch (err) {
      // Запазваме въведеното — потребителят не бива да пише всичко наново.
      setFailed(true);
      // Без това провалените запитвания са напълно невидими.
      // EmailJS отхвърля с { status, text }, не с Error — иначе всяка причина излиза „unknown“.
      // status 0 = заявката изобщо не е стигнала (блокер на реклами, мрежа).
      const ejs = err as { status?: number; text?: string };
      track("contact_form_failed", {
        reason: (err instanceof Error
          ? err.message
          : typeof ejs?.status === "number"
            ? `${ejs.status} ${ejs.text || ""}`.trim()
            : String(err)
        ).slice(0, 80),
        // Различава истински хора от автоматизирани браузъри (ботове, скенери).
        webdriver: navigator.webdriver ? "yes" : "no",
        filled: [formData.name && "name", formData.phone && "phone", formData.email && "email", formData.message && "msg"].filter(Boolean).join(",") || "none",
        secs,
      });
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden text-slate-200"
      style={{ backgroundColor: "#07090f", ["--hairline" as any]: "#1a2234" }}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">

        {/* ── Header ── */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }} className="text-center">
          <h2 className="balance mx-auto max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100">
            {t.contact.h2a}{" "}
            <span className="gradient-text">
              {t.contact.h2b}
            </span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400">
            {t.contact.sub}
          </p>
        </motion.div>

        {/* ── Two-column ── */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 lg:grid-cols-12 lg:gap-6">

          {/* ── LEFT: директни канали. На телефон са над формата като 2×2 плочки — който не иска да пише във форма, пише веднага. ── */}
          <div className="lg:col-span-5">
            <div className="mb-3 text-center text-[13px] font-semibold text-slate-400 lg:text-left">{t.contact.direct}</div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {CONTACT_ITEMS.map((item, i) => {
                const txt = t.contact.items[item.k];
                const value =
                  "value" in txt ? txt.value
                  : item.k === "phone" ? BUSINESS.phone
                  : BUSINESS.email;
                return (
                  <motion.a
                    key={item.k}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={() => track("contact_direct", { channel: item.k })}
                    variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }} custom={i + 1}
                    className="group flex min-w-0 flex-col items-center gap-2.5 rounded-2xl border border-white/[0.08] p-4 text-center transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16]
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 lg:flex-row lg:gap-4 lg:text-left"
                    style={{ backgroundColor: "#0c111b" }}
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-100"
                      style={item.tint ? { backgroundColor: item.tint, color: "#fff" } : { backgroundColor: "rgba(255,255,255,.06)" }}
                    >
                      {item.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14.5px] font-bold text-slate-100 lg:hidden">{txt.label}</span>
                      <span className="hidden truncate text-[15px] font-bold text-slate-100 lg:block">{value}</span>
                      <span className="mt-0.5 block text-[12px] leading-snug text-slate-500">{txt.sub}</span>
                    </span>
                    <svg viewBox="0 0 24 24" className="hidden h-4 w-4 shrink-0 text-slate-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-300 lg:block"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }} custom={2}
            className="lg:col-span-7"
          >
            <div className="group/form relative overflow-hidden rounded-3xl border border-white/[0.09] shadow-[0_30px_80px_-40px_rgba(0,0,0,.9)]" style={{ backgroundColor: "#0c111b" }}>
              {/* Top accent bar */}
              <div aria-hidden className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: "linear-gradient(90deg,transparent,#22d3ee,transparent)", opacity: 0.6 }} />

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    ref={revealOnMount}
                    tabIndex={-1}
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-5 p-10 text-center outline-none"
                    style={{ minHeight: 440 }}
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full"
                      style={{
                        background: "color-mix(in srgb,#34D399 14%,transparent)",
                        border: "1px solid color-mix(in srgb,#34D399 30%,transparent)",
                        color: "#34D399",
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xl font-extrabold tracking-tight text-slate-100">{t.contact.successTitle}</div>
                      <div className="mt-2 text-[14px] text-slate-400">{c.received}</div>
                      <div className="mt-2 text-[13px] text-slate-500">
                        {t.contact.hurry}{" "}
                        <a href="tel:+359897758062" className="whitespace-nowrap font-semibold text-slate-300 transition-colors hover:text-white">
                          +359 897 758 062
                        </a>
                      </div>
                    </div>
                    {/* Питаме след изпращането: във формата е още едно поле преди бутона, тук не пречи на никого. */}
                    <div className="w-full max-w-md border-t border-white/[0.07] pt-5">
                      <div className="text-[13px] font-semibold text-slate-300">{t.contact.source}</div>
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
                            {source === k && (
                              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                            )}
                            {t.contact.sources[k]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => { setSent(false); setSource(""); }}
                      className="mt-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-6 py-2.5 text-[13px] font-semibold text-slate-300 transition-all hover:border-white/[0.15] hover:bg-white/[0.06]"
                    >
                      {t.contact.newInquiry}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative p-5 sm:p-8"
                  >
                    <div className="mb-6">
                      <div className="text-[18px] font-extrabold tracking-tight text-slate-50">{audit ? c.audit : t.contact.formTitle}</div>
                      <div className="mt-1 text-[14px] leading-relaxed text-slate-400">{audit ? c.auditText : c.booking}</div>
                      {selectedPackage && !audit && <p className="mt-3 inline-flex rounded-full bg-cyan-300/10 px-3 py-1 text-[13px] font-semibold text-cyan-200">{selectedPackage.name}</p>}
                    </div>

                    {audit && <div className="mb-4"><FormField label={c.website}>
                      <input type="url" required value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://example.com" autoComplete="url" className={inputCls} />
                    </FormField></div>}

                    {/* Име + телефон: единствените задължителни полета */}
                    {!audit && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField label={t.contact.name}>
                        <input type="text" name="name" value={formData.name}
                          onChange={handleChange} required autoComplete="name"
                          placeholder={t.contact.namePlaceholder}
                          className={inputCls} />
                      </FormField>
                      <FormField label={reply === 'email' ? c.optionalPhone : t.contact.phone} error={t.contact.phoneInvalid}>
                        <input type="tel" name="phone" value={formData.phone}
                          onChange={handleChange} required={reply !== 'email'}
                          inputMode="tel" autoComplete="tel" maxLength={20}
                          pattern={PHONE_PATTERN} title={t.contact.phoneInvalid}
                          placeholder={t.contact.phonePlaceholder}
                          className={inputCls} />
                      </FormField>
                    </div>}

                    {/* Как да отговорим: с един тап, без падащо меню. Писането е равностойно на разговора. */}
                    {!audit && (
                      <fieldset className="mt-5">
                        <legend className="mb-1.5 block text-[13px] font-semibold text-slate-300">{c.mode}</legend>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {REPLY_OPTIONS.map((v) => {
                            const checked = reply === v;
                            return (
                              <label key={v} className={`${chipCls(checked)} px-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan-300/70`}>
                                <input type="radio" name="reply" value={v} checked={checked} onChange={() => setReply(v)} className="sr-only" />
                                {REPLY_ICON[v]}
                                {c.reply[v]}
                              </label>
                            );
                          })}
                        </div>
                        <p className="mt-2 text-[12.5px] text-slate-500">{c.replyHint}</p>
                      </fieldset>
                    )}

                    {(audit || reply === 'email') && (
                      <div className="mt-4">
                        <FormField label={c.email}>
                          <input type="email" name="email" value={formData.email}
                            onChange={handleChange} required autoComplete="email"
                            placeholder={t.contact.emailPlaceholder}
                            className={inputCls} />
                        </FormField>
                      </div>
                    )}

                    {!audit && !selectedPackage && (
                      <fieldset className="mt-5">
                        <legend className="mb-1.5 block text-[13px] font-semibold text-slate-300">{t.contact.service}</legend>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {SERVICE_OPTIONS.map((o) => {
                            const checked = formData.service === o.value;
                            return (
                              <button
                                key={o.value}
                                type="button"
                                aria-pressed={checked}
                                // Втори тап маха избора — полето е по желание.
                                onClick={() => setFormData((v) => ({ ...v, service: checked ? "" : o.value }))}
                                className={`${chipCls(checked)} min-h-[40px] px-3 text-[13px] sm:px-3.5 sm:text-[13.5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70`}
                              >
                                {t.contact.options[o.k]}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                    )}

                    <div className="mt-4">
                      <FormField label={t.contact.message}>
                        <textarea name="message" value={formData.message}
                          onChange={handleChange} rows={3}
                          placeholder={t.contact.messagePlaceholder}
                          className={`${inputCls} h-auto resize-none py-3 sm:h-auto`} />
                      </FormField>
                    </div>

                    {failed && (
                      <div
                        ref={revealOnMount}
                        tabIndex={-1}
                        role="alert"
                        className="mt-5 flex items-start gap-3 rounded-xl px-4 py-3 text-[13px] leading-relaxed outline-none"
                        style={{
                          background: "color-mix(in srgb,#F87171 10%,transparent)",
                          border: "1px solid color-mix(in srgb,#F87171 28%,transparent)",
                          color: "#FCA5A5",
                        }}
                      >
                        <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 8v5M12 16.5v.01" />
                        </svg>
                        <div className="min-w-0">
                          <span>
                            {t.contact.error}{" "}
                            <a href={BUSINESS.phoneHref} className="font-semibold underline underline-offset-2 hover:text-white">
                              {BUSINESS.phone}
                            </a>
                          </span>
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            <a
                              href={mailtoHref}
                              onClick={() => track("contact_fallback_used", { channel: "email" })}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.06] px-3 py-1.5 text-[12.5px] font-semibold text-slate-100 transition-colors hover:bg-white/[0.11]"
                            >
                              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 6h16v12H4V6Z" /><path d="M4 7l8 6 8-6" />
                              </svg>
                              {t.contact.sendByEmail}
                            </a>
                            <a
                              href={whatsappHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => track("contact_fallback_used", { channel: "whatsapp" })}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#25D366]/35 bg-[#25D366]/12 px-3 py-1.5 text-[12.5px] font-semibold text-[#6ee7a0] transition-colors hover:bg-[#25D366]/20"
                            >
                              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Z" />
                              </svg>
                              {t.contact.sendByWhatsapp}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Капан за ботове: извън екрана и извън Tab реда, човек не го попълва. */}
                    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                    </div>

                    {/* Submit */}
                    <div className="mt-6">
                      <motion.button
                        type="submit"
                        disabled={isSending}
                        whileTap={{ scale: 0.97 }}
                        className="group relative w-full overflow-hidden rounded-full py-3.5 text-[14px] font-bold text-[#03060d] shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.75)] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                        style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}
                      >
                        <span aria-hidden className="absolute inset-0 -skew-x-[20deg] -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        {isSending ? (
                          <span className="relative flex items-center justify-center gap-2">
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="40" />
                            </svg>
                            {t.contact.sending}
                          </span>
                        ) : (
                          <span className="relative flex items-center justify-center gap-2">
                            {t.contact.send}
                            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                          </span>
                        )}
                      </motion.button>
                      <p className="mt-3 text-center text-[11.5px] text-slate-400">
                        {t.contact.micro.replace(/ · /g, "\u00A0· ")}{" "}
                        <a href="tel:+359897758062" className="font-semibold text-slate-300 transition-colors hover:text-white">
                          {t.contact.call}
                        </a>
                      </p>
                      <p className="mt-2 text-center text-[11.5px] leading-relaxed text-slate-400">
                        {t.contact.consent}{" "}
                        <Link
                          to={href(ROUTES.privacy)}
                          className="text-slate-200 underline decoration-slate-600 underline-offset-2 transition-colors hover:text-white hover:decoration-[#22D3EE]"
                        >
                          {t.contact.consentLink}
                        </Link>
                        .
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .balance { text-wrap: balance; }
      `}</style>
    </section>
  );
}
