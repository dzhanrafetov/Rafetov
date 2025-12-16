import { useState } from "react";
import { motion } from "framer-motion";
import sendEmail from "../service/emailService";

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FreeConsultation() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setIsSending(true);

    try {
      await sendEmail(formData);
      setIsSending(false);
      setSuccessMessage("Получихме съобщението. Връщаме отговор до 24 часа.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      setIsSending(false);
      alert("Грешка при изпращане на съобщението.");
      console.error("Email error:", error);
    }
  };

  // WhatsApp link (same phone)
  const whatsappHref = "https://wa.me/359897758062";

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden text-slate-200"
      style={
        {
          backgroundColor: "#0b0f19",
          ["--accent" as any]: "#22D3EE",
          ["--hairline" as any]: "#1f2937",
        } as React.CSSProperties
      }
    >
      {/* hairline top */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">
        {/* Header */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center"
        >
          <div className="mx-auto mb-3 w-fit text-[12px] uppercase tracking-[0.18em] text-slate-400">контакт</div>
          <h2 className="balance mx-auto max-w-[26ch] text-[clamp(1.9rem,5.8vw,2.6rem)] font-extrabold leading-[1.06] tracking-tight text-slate-100">
            Кажете ни какво искате — ние ще го направим да работи
          </h2>
          <p className="balance mx-auto mt-4 max-w-[54ch] text-[15.5px] leading-relaxed text-slate-300">
            Пишете ни. Отговаряме бързо, даваме ясна посока и конкретна оферта без „дребен шрифт“.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left: Contact info / reassurance */}
          <motion.aside
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            custom={1}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl border border-slate-700/60 bg-[#0f1424] p-6 sm:p-7">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 text-slate-100">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path
                      d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 5.2 2 2 0 0 1 4.1 3h2a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.5 2.1L7.4 10a16 16 0 0 0 6.6 6.6l.9-.8a2 2 0 0 1 2.1-.5c.7.3 1.5.5 2.3.6A2 2 0 0 1 22 16.9Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-sm text-slate-400">Телефон</div>
                  <a href="tel:+359897758062" className="text-[16px] font-semibold text-slate-100 hover:opacity-90">
                    +359 897 758 062
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="mt-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 text-slate-100">
                  {/* WhatsApp icon (inline SVG) */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path
                      d="M12 2a9 9 0 0 0-7.8 13.5L3 22l6.7-1.8A9 9 0 1 0 12 2Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.2 8.9c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4-.1.6l-.4.5c-.1.1-.2.3-.1.5.2.6 1.1 1.8 2.5 2.5.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5 0 .9-.5 1.6-1.3 1.8-.6.2-1.4.2-2.4-.2-2.7-1.1-4.8-3.8-5.3-5.3-.2-.6-.2-1.2 0-1.7Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-sm text-slate-400">WhatsApp</div>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] font-semibold text-slate-100 hover:opacity-90"
                  >
                    Пишете ни в WhatsApp
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="mt-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 text-slate-100">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path
                      d="M4 6h16v12H4V6Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 7l8 6 8-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-sm text-slate-400">Имейл</div>
                  <a
                    href="mailto:business@rafetov.com"
                    className="text-[16px] font-semibold text-slate-100 hover:opacity-90"
                  >
                    business@rafetov.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="mt-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 text-slate-100">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path
                      d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                <div>
                  <div className="text-sm text-slate-400">Локация</div>
                  <div className="text-[16px] font-semibold text-slate-100">Sofia, Bulgaria</div>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-slate-700/60 bg-black/20 p-4">
                <div className="text-[14px] font-semibold text-slate-100">Какво получавате</div>
                <ul className="mt-3 space-y-2 text-[13.5px] text-slate-300/90">
                  {[
                    "Кратка консултация и ясни следващи стъпки",
                    "Оферта с етапи и реалистични срокове",
                    "Фокус: скорост, мобилна версия и резултат",
                  ].map((t) => (
                    <li key={t} className="inline-flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--accent)]" aria-hidden>
                        <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-[12.5px] text-slate-400">Пишете ни. Обикновено отговаряме в рамките на минути.</div>
            </div>
          </motion.aside>

          {/* Right: Form */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            custom={2}
            className="lg:col-span-7"
          >
            <div
              className="
                relative overflow-hidden rounded-3xl
                border border-slate-700/60 bg-[#0f1424]
                shadow-[0_20px_80px_-48px_rgba(34,211,238,0.25)]
              "
            >
              {/* subtle glow */}
              <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl" />

              <form onSubmit={handleSubmit} className="relative p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">Име</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Вашето име"
                      className="
                        h-11 w-full rounded-2xl bg-black/25 px-4 text-[14px] text-slate-100
                        ring-1 ring-inset ring-white/10 placeholder:text-slate-500
                        focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45
                      "
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">Фамилия</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Вашата фамилия"
                      className="
                        h-11 w-full rounded-2xl bg-black/25 px-4 text-[14px] text-slate-100
                        ring-1 ring-inset ring-white/10 placeholder:text-slate-500
                        focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45
                      "
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">Имейл</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@gmail.com"
                    className="
                      h-11 w-full rounded-2xl bg-black/25 px-4 text-[14px] text-slate-100
                      ring-1 ring-inset ring-white/10 placeholder:text-slate-500
                      focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45
                    "
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">Телефон</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+359..."
                      className="
                        h-11 w-full rounded-2xl bg-black/25 px-4 text-[14px] text-slate-100
                        ring-1 ring-inset ring-white/10 placeholder:text-slate-500
                        focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45
                      "
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">Услуга</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="
                        h-11 w-full rounded-2xl bg-black/25 px-4 text-[14px] text-slate-100
                        ring-1 ring-inset ring-white/10
                        focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45
                      "
                    >
                      <option value="" disabled>
                        Изберете услуга
                      </option>
                      <option value="уебсайт">Уебсайт</option>
                      <option value="електронен магазин">Електронен магазин</option>
                      <option value="дигитално меню">Дигитално меню</option>
                      <option value="мобилно приложение">Мобилно приложение</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-300">Съобщение</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Кратко описание на проекта (цел, срок, примери)..."
                    className="
                      w-full resize-none rounded-2xl bg-black/25 px-4 py-3 text-[14px] text-slate-100
                      ring-1 ring-inset ring-white/10 placeholder:text-slate-500
                      focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/45
                    "
                  />
                </div>

                <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
                  {/* <div className="text-[12.5px] text-slate-400">3 минути. Без ангажимент.</div> */}

                  <motion.button
                    type="submit"
                    disabled={isSending}
                    whileTap={{ scale: 0.98 }}
                    className="
                      inline-flex h-11 items-center justify-center rounded-full
                      bg-[var(--accent)] px-6 text-sm font-semibold text-slate-900
                      ring-1 ring-inset ring-slate-200/10
                      hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40
                      disabled:cursor-not-allowed disabled:opacity-70
                      w-full sm:w-auto
                    "
                  >
                    {isSending ? "Изпращане..." : "Изпрати"}
                  </motion.button>
                </div>

                {successMessage && <p className="mt-4 text-center text-[13.5px] text-emerald-300">{successMessage}</p>}
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* hairline bottom */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .balance { text-wrap: balance }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </section>
  );
}