import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sendEmail from "../service/emailService";

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
    label: "Телефон",
    value: "+359 897 758 062",
    sub: "Обаждайте се директно",
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
    label: "WhatsApp",
    value: "Пишете ни в WhatsApp",
    sub: "Отговаряме до 30 минути",
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
    label: "Имейл",
    value: "business@rafetov.com",
    sub: "Отговор до 24 часа",
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
    label: "Локация",
    value: "София, България",
    sub: "Работим онлайн за целия свят",
    href: undefined,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

const SERVICES_OPTIONS = [
  { value: "", label: "Изберете услуга", disabled: true },
  { value: "уебсайт", label: "Уебсайт" },
  { value: "електронен магазин", label: "Електронен магазин" },
  { value: "дигитално меню", label: "Дигитално меню" },
  { value: "мобилно приложение", label: "Мобилно приложение" },
  { value: "друго", label: "Друго" },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", service: "", message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await sendEmail(formData);
      setSent(true);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      alert("Грешка при изпращане. Опитайте пак.");
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
            контакт
          </span>
          <h2 className="balance mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100">
            Кажете ни какво искате —{" "}
            <span style={{
              background: "linear-gradient(110deg,#22d3ee 0%,#a78bfa 60%,#34d399 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              ние го правим
            </span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400">
            Отговаряме бързо. Конкретна оферта без скрити разходи.
          </p>
        </motion.div>

        {/* ── Two-column ── */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12">

          {/* ── LEFT: contact cards ── */}
          <div className="flex flex-col gap-4 lg:col-span-5">

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
                <div className="text-[13.5px] font-semibold text-slate-100">Приемаме нови проекти</div>
                <div className="text-[12px] text-slate-500">Обикновено отговаряме в рамките на минути</div>
              </div>
            </motion.div>

            {/* Cards */}
            {CONTACT_ITEMS.map((item, i) => {
              const inner = (
                <motion.div
                  key={item.label}
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
                      {item.label}
                    </div>
                    <div className="mt-0.5 truncate text-[14.5px] font-semibold text-slate-100 transition-colors group-hover:text-white">
                      {item.value}
                    </div>
                    <div className="text-[12px] text-slate-500">{item.sub}</div>
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
                <a key={item.label} href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="block">
                  {inner}
                </a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}
          </div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
            className="lg:col-span-7"
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
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-5 p-10 text-center"
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
                      <div className="text-xl font-extrabold tracking-tight text-slate-100">Получихме съобщението!</div>
                      <div className="mt-2 text-[14px] text-slate-400">Ще ви върнем отговор до 24 часа.</div>
                    </div>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-6 py-2.5 text-[13px] font-semibold text-slate-300 transition-all hover:border-white/[0.15] hover:bg-white/[0.06]"
                    >
                      Изпрати ново запитване
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
                      <div className="text-[16px] font-extrabold tracking-tight text-slate-100">Изпратете запитване</div>
                      <div className="mt-1 text-[13.5px] text-slate-500">Попълнете формата — ще се свържем с вас бързо.</div>
                    </div>

                    {/* Name row */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField label="Иme">
                        <input type="text" name="firstName" value={formData.firstName}
                          onChange={handleChange} required placeholder="Вашето иme"
                          className={inputCls} />
                      </FormField>
                      <FormField label="Фамилия">
                        <input type="text" name="lastName" value={formData.lastName}
                          onChange={handleChange} required placeholder="Вашата фамилия"
                          className={inputCls} />
                      </FormField>
                    </div>

                    <div className="mt-4">
                      <FormField label="Имейл">
                        <input type="email" name="email" value={formData.email}
                          onChange={handleChange} required placeholder="name@gmail.com"
                          className={inputCls} />
                      </FormField>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField label="Телефон">
                        <input type="tel" name="phone" value={formData.phone}
                          onChange={handleChange} required placeholder="+359 8xx xxx xxx"
                          className={inputCls} />
                      </FormField>
                      <FormField label="Услуга">
                        <select name="service" value={formData.service}
                          onChange={handleChange} required className={selectCls}>
                          {SERVICES_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value} disabled={o.disabled}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </FormField>
                    </div>

                    <div className="mt-4">
                      <FormField label="Съобщение">
                        <textarea name="message" value={formData.message}
                          onChange={handleChange} required rows={4}
                          placeholder="Кратко описание — цел, бюджет, срок, примери..."
                          className={`${inputCls} h-auto resize-none py-3`} />
                      </FormField>
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
                            Изпращане...
                          </span>
                        ) : (
                          <span className="relative flex items-center justify-center gap-2">
                            Изпрати запитване
                            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                          </span>
                        )}
                      </motion.button>
                      <p className="mt-3 text-center text-[11.5px] text-slate-500">
                        Без спам · Само конкретен отговор за вашия проект
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

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls = `
  h-11 w-full rounded-xl bg-white/[0.04] px-4 text-[14px] text-slate-100
  ring-1 ring-inset ring-white/[0.08] placeholder:text-slate-600
  transition-all duration-150
  focus:outline-none focus:bg-white/[0.06] focus:ring-2 focus:ring-[#22d3ee]/35
`;

const selectCls = `
  h-11 w-full rounded-xl bg-white/[0.04] px-4 text-[14px] text-slate-100
  ring-1 ring-inset ring-white/[0.08]
  transition-all duration-150
  focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/35
  [&>option]:bg-[#07090f]
`;
