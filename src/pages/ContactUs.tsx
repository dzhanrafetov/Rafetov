import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import sendEmail from "../service/emailService";
import { track } from "@vercel/analytics";
import { BUSINESS, ROUTES } from "../constants/business";
import { useLang } from "../i18n";

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const CONTACT_ITEMS = [
  {
    accent: "#22D3EE",
    glow: "rgba(34,211,238,.15)",
    k: "phone" as const,
    href: "tel:+359897758062",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 5.2 2 2 0 0 1 4.1 3h2a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.5 2.1L7.4 10a16 16 0 0 0 6.6 6.6l.9-.8a2 2 0 0 1 2.1-.5c.7.3 1.5.5 2.3.6A2 2 0 0 1 22 16.9Z" />
      </svg>
    ),
  },
  {
    accent: "#34D399",
    glow: "rgba(52,211,153,.15)",
    k: "whatsapp" as const,
    href: "https://wa.me/359897758062",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 2a9 9 0 0 0-7.8 13.5L3 22l6.7-1.8A9 9 0 1 0 12 2Z" />
        <path d="M9.2 8.9c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.4.5c-.1.1-.2.3-.1.5.2.6 1.1 1.8 2.5 2.5.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5 0 .9-.5 1.6-1.3 1.8-.6.2-1.4.2-2.4-.2-2.7-1.1-4.8-3.8-5.3-5.3-.2-.6-.2-1.2 0-1.7Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    accent: "#A78BFA",
    glow: "rgba(167,139,250,.15)",
    k: "email" as const,
    href: "mailto:business@rafetov.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v12H4V6Z" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    ),
  },
  {
    accent: "#FBBF24",
    glow: "rgba(251,191,36,.13)",
    k: "location" as const,
    href: undefined,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

/** Стойностите остават на български — така пристигат в имейла към собственика. */
const SERVICE_OPTIONS = [
  { value: "уебсайт",            k: "site"  as const },
  { value: "електронен магазин", k: "shop"  as const },
  { value: "дигитално меню",     k: "menu"  as const },
  { value: "реклами",            k: "ads"   as const },
  { value: "друго",              k: "other" as const },
];

/** Позволени са само цифри, интервали и +()- ; „+“ само в началото. */
const PHONE_PATTERN = "\\+?[0-9][0-9 \\(\\)\\-]{5,18}";

function sanitizePhone(value: string) {
  const cleaned = value.replace(/[^\d+\s()-]/g, "");
  // „+“ има смисъл единствено като първи символ.
  return cleaned.charAt(0) + cleaned.slice(1).replace(/\+/g, "");
}

/** Маха „(по желание)“ от етикета — в тялото на имейла стои по-добре без него. */
const plain = (label: string) => label.replace(/\s*[({\[].*$/, "").trim();

export default function ContactUs() {
  const { t, href } = useLang();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
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
  const fallbackBody = [
    `${plain(t.contact.name)}: ${formData.name}`,
    `${plain(t.contact.phone)}: ${formData.phone}`,
    formData.email && `${plain(t.contact.email)}: ${formData.email}`,
    formData.service && `${plain(t.contact.service)}: ${formData.service}`,
    formData.message && `${plain(t.contact.message)}: ${formData.message}`,
  ].filter(Boolean).join("\n");

  const mailtoHref =
    `mailto:${BUSINESS.email}` +
    `?subject=${encodeURIComponent(t.contact.errorSubject)}` +
    `&body=${encodeURIComponent(fallbackBody)}`;
  const whatsappHref =
    `https://wa.me/359897758062?text=${encodeURIComponent(`${t.contact.errorSubject}\n\n${fallbackBody}`)}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setFailed(false);
    try {
      await sendEmail(formData);
      track("contact_form_sent", { service: formData.service || "—" });
      setSent(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      // Запазваме въведеното — потребителят не бива да пише всичко наново.
      setFailed(true);
      // Без това провалените запитвания са напълно невидими.
      track("contact_form_failed", {
        reason: err instanceof Error ? err.message.slice(0, 80) : "unknown",
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
      {/* ── Background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
          [background-size:28px_28px]" />
        <div className="absolute -left-72 top-32 h-[600px] w-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle,#22D3EE 0%,transparent 65%)" }} />
        <div className="absolute -right-72 top-1/2 h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle,#A78BFA 0%,transparent 65%)" }} />
        <div className="absolute left-1/3 bottom-0 h-[400px] w-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle,#34D399 0%,transparent 65%)" }} />
      </div>

      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">

        {/* ── Header ── */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            {t.contact.eyebrow}
          </span>
          <h2 className="balance mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100">
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
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12">

          {/* ── LEFT: contact cards (на телефон идват след формата) ── */}
          <div className="order-2 flex flex-col gap-4 lg:order-none lg:col-span-5">

            {/* Status pill */}
            <motion.div
              variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#34D399]" />
              </span>
              <div>
                <div className="text-[13.5px] font-semibold text-slate-100">{t.contact.statusTitle}</div>
                <div className="text-[12px] text-slate-500">{t.contact.statusSub}</div>
              </div>
            </motion.div>

            {/* Cards */}
            {CONTACT_ITEMS.map((item, i) => {
              const txt = t.contact.items[item.k];
              const value =
                "value" in txt ? txt.value
                : item.k === "phone" ? "+359 897 758 062"
                : "business@rafetov.com";
              const inner = (
                <motion.div
                  key={item.k}
                  variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i + 2}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {/* Hover glow */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 0% 50%,${item.glow},transparent 70%)` }} />
                  {/* Top accent bar */}
                  <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg,${item.accent},transparent)` }} />

                  {/* Icon */}
                  <div
                    className="relative shrink-0 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `color-mix(in srgb,${item.accent} 12%,transparent)`,
                      border: `1px solid color-mix(in srgb,${item.accent} 22%,transparent)`,
                      color: item.accent,
                    }}
                  >
                    {item.icon}
                  </div>

                  <div className="relative min-w-0 flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: item.accent }}>
                      {txt.label}
                    </div>
                    <div className="mt-0.5 truncate text-[14.5px] font-semibold text-slate-100 transition-colors group-hover:text-white">
                      {value}
                    </div>
                    <div className="text-[12px] text-slate-500">{txt.sub}</div>
                  </div>

                  {item.href && (
                    <svg viewBox="0 0 24 24" className="relative h-4 w-4 shrink-0 text-slate-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-400"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                </motion.div>
              );

              return item.href ? (
                <a key={item.k} href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block">
                  {inner}
                </a>
              ) : (
                <div key={item.k}>{inner}</div>
              );
            })}
          </div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
            className="order-1 lg:order-none lg:col-span-7"
          >
            <div className="group/form relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
              {/* Top accent bar */}
              <div aria-hidden className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: "linear-gradient(90deg,#22d3ee,#a78bfa,#34d399)", opacity: 0.5 }} />
              {/* Inner glow */}
              <div aria-hidden className="pointer-events-none absolute -top-28 -right-28 h-56 w-56 rounded-full opacity-[0.06] blur-3xl"
                style={{ background: "radial-gradient(circle,#22d3ee,transparent)" }} />

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
                      <div className="mt-2 text-[14px] text-slate-400">{t.contact.successSub}</div>
                      <div className="mt-2 text-[13px] text-slate-500">
                        {t.contact.hurry}{" "}
                        <a href="tel:+359897758062" className="font-semibold text-slate-300 transition-colors hover:text-white">
                          +359 897 758 062
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => setSent(false)}
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
                    className="relative p-6 sm:p-8"
                  >
                    <div className="mb-6">
                      <div className="text-[16px] font-extrabold tracking-tight text-slate-100">{t.contact.formTitle}</div>
                      <div className="mt-1 text-[13.5px] text-slate-400">{t.contact.formSub}</div>
                    </div>

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField label={t.contact.name}>
                        <input type="text" name="name" value={formData.name}
                          onChange={handleChange} required autoComplete="name"
                          placeholder={t.contact.namePlaceholder}
                          className={inputCls} />
                      </FormField>
                      <FormField label={t.contact.phone}>
                        <input type="tel" name="phone" value={formData.phone}
                          onChange={handleChange} required
                          inputMode="tel" autoComplete="tel" maxLength={20}
                          pattern={PHONE_PATTERN} title={t.contact.phoneInvalid}
                          placeholder={t.contact.phonePlaceholder}
                          className={inputCls} />
                      </FormField>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField label={t.contact.email}>
                        <input type="email" name="email" value={formData.email}
                          onChange={handleChange} autoComplete="email"
                          placeholder={t.contact.emailPlaceholder}
                          className={inputCls} />
                      </FormField>
                      <FormField label={t.contact.service}>
                        <select name="service" value={formData.service}
                          onChange={handleChange}
                          className={`${selectCls} ${formData.service ? "text-slate-100" : "text-slate-400"}`}>
                          <option value="">{t.contact.servicePlaceholder}</option>
                          {SERVICE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {t.contact.options[o.k]}
                            </option>
                          ))}
                        </select>
                      </FormField>
                    </div>

                    <div className="mt-4">
                      <FormField label={t.contact.message}>
                        <textarea name="message" value={formData.message}
                          onChange={handleChange} rows={4}
                          placeholder={t.contact.messagePlaceholder}
                          className={`${inputCls} h-auto resize-none py-3`} />
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

/** <label> обгръща полето, за да е тапваем и етикетът (иначе ~40% мъртва зона на телефон). */
function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls = `
  h-11 w-full rounded-xl bg-white/[0.04] px-4 text-[14px] text-slate-100
  ring-1 ring-inset ring-white/[0.08] placeholder:text-slate-400
  transition-all duration-150
  focus:outline-none focus:bg-white/[0.06] focus:ring-2 focus:ring-[#22d3ee]/35
`;

/** Без text-slate-*: цветът се подава условно (сив, докато не е избрана услуга). */
const selectCls = `
  h-11 w-full rounded-xl bg-white/[0.04] px-4 text-[14px]
  ring-1 ring-inset ring-white/[0.08]
  transition-all duration-150
  focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/35
  [&>option]:bg-[#07090f]
`;
