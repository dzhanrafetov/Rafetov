/**
 * Компактна форма за запитване (планер, проверка на сайт): име + телефон или имейл (+ канал за отговор).
 * Праща към /api/lead (Telegram) и EmailJS едновременно, като формата на началната страница;
 * брои се за изпратено, ако мине поне единият път. Текстът на съобщението идва отвън (планът/резултатът).
 */
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Check, CircleAlert, LoaderCircle, Mail, Phone } from "lucide-react";
import { PHONE_PATTERN, sanitizePhone } from "./FormField";
import WhatsAppIcon from "./WhatsAppIcon";
import ViberIcon from "./ViberIcon";
import { ROUTES } from "../constants/business";
import { useLang } from "../i18n";
import { REPLY_KEYS, contactCopy, type ReplyKey } from "../i18n/sections/contact";
import sendEmail from "../service/emailService";
import { attributionLine } from "../service/attribution";

export type MiniLeadCopy = {
  name: string;
  namePlaceholder: string;
  nameError: string;
  contact: string;
  contactPlaceholder: string;
  contactError: string;
  channel?: string;
  channels?: Record<ReplyKey, string>;
  submit: string;
  sending: string;
  whatsapp: string;
  success: { title: string; text: string };
  failed: { title: string; text: string };
};

const PHONE_RE = new RegExp(`^(?:${PHONE_PATTERN})$`);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const REPLY_ICON: Record<ReplyKey, ReactNode> = {
  whatsapp: <WhatsAppIcon className="h-4 w-4" />,
  viber: <ViberIcon className="h-4 w-4" />,
  call: <Phone className="h-4 w-4" aria-hidden />,
  email: <Mail className="h-4 w-4" aria-hidden />,
};

export const inputCls =
  "peer h-12 w-full rounded-xl bg-white/[0.04] px-4 text-[16px] text-slate-100 ring-1 ring-inset ring-white/[0.10] placeholder:text-slate-500 transition-[background-color,box-shadow] duration-150 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-accent/50 sm:h-11 sm:text-[14.5px]";
const inputErrCls = "ring-red-400/60 focus:ring-red-400/60";
const labelCls = "mb-2 block text-[13.5px] font-semibold text-slate-200";
export const chipCls = (on: boolean) =>
  `inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-xl px-3.5 text-center text-[14px] font-semibold ring-1 ring-inset transition-colors duration-150 ${
    on ? "bg-accent/10 text-accent-text ring-accent/50" : "bg-white/[0.04] text-slate-300 ring-white/[0.10] hover:bg-white/[0.07] hover:ring-white/[0.18]"
  }`;

export type MiniLeadProps = {
  copy: MiniLeadCopy;
  /** Името на услугата за собственика (на български). */
  service: string;
  source: "planner" | "audit";
  /** Текстът на запитването (на български, за нас). */
  message: string;
  /** Готово съобщение за WhatsApp (на езика на човека). */
  waText: string;
  /** Събитие за статистиката при успешно изпращане. */
  onSent?: (reply: ReplyKey | undefined) => void;
  onWhatsApp?: () => void;
  /** Съдържание след потвърждението (напр. „Нов план“). */
  afterSuccess?: ReactNode;
  idPrefix: string;
};

export default function MiniLeadForm({ copy, service, source, message, waText, onSent, onWhatsApp, afterSuccess, idPrefix }: MiniLeadProps) {
  const { t, lang, href } = useLang();
  const withChannels = !!copy.channels;
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [reply, setReply] = useState<ReplyKey>("whatsapp");
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const isEmail = contact.includes("@");

  const validate = () => {
    const e: { name?: string; contact?: string } = {};
    if (!name.trim()) e.name = copy.nameError;
    const v = contact.trim();
    if (!v || (isEmail ? !EMAIL_RE.test(v) : !PHONE_RE.test(v))) e.contact = copy.contactError;
    return e;
  };

  const submit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (sending) return;
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      const first = Object.keys(e)[0];
      document.getElementById(`${idPrefix}-${first}`)?.focus();
      return;
    }
    // Ботът вижда „изпратено“ и спира; на нас не идва нищо.
    if (trap) {
      setSent(true);
      return;
    }
    setSending(true);
    setFailed(false);
    const phone = isEmail ? "" : contact.trim();
    const email = isEmail ? contact.trim() : "";
    const replyLabel = withChannels ? contactCopy.bg.reply.channels[reply] : "";
    const fullMessage = `${message}\n\n${attributionLine()}`;

    const viaTelegram = async () => {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone, email, service, reply: replyLabel, message: fullMessage, lang, page: window.location.pathname, source, website: trap }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error(`lead ${res.status}`);
    };
    const viaEmail = () =>
      sendEmail({
        name: name.trim(), email, phone, service,
        message: `${contactCopy.bg.reply.name}: ${name.trim()}${replyLabel ? `\n${contactCopy.bg.labels.reply}: ${replyLabel}` : ""}\n${fullMessage}`,
      });
    const results = await Promise.allSettled([viaTelegram(), viaEmail()]);
    setSending(false);
    if (results.some((r) => r.status === "fulfilled")) {
      setSent(true);
      onSent?.(withChannels ? reply : undefined);
    } else {
      setFailed(true);
      console.error(results);
    }
  };

  const wa = `https://wa.me/359897758062?text=${encodeURIComponent(waText)}`;

  if (sent) {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent-text ring-1 ring-inset ring-accent/40">
          <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden />
        </span>
        <h3 className="mt-4 text-[1.25rem] font-extrabold tracking-[-0.02em] text-white">{copy.success.title}</h3>
        <p className="mt-2 max-w-[40ch] text-[14.5px] leading-relaxed text-slate-400">
          {copy.success.text.replace("{channel}", copy.channels?.[reply] ?? "")}
        </p>
        {afterSuccess}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative">
      {withChannels && copy.channels && (
        <fieldset>
          <legend className={labelCls}>{copy.channel}</legend>
          <div className="grid grid-cols-2 gap-2">
            {REPLY_KEYS.map((k) => {
              const on = reply === k;
              return (
                <label key={k} className={`${chipCls(on)} has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-accent-text`}>
                  <input type="radio" name={`${idPrefix}-reply`} value={k} checked={on} onChange={() => setReply(k)} className="sr-only" />
                  {REPLY_ICON[k]}
                  {copy.channels![k]}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}
      <div className={`grid gap-4 ${withChannels ? "mt-5" : ""}`}>
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelCls}>{copy.name}</label>
          <input
            id={`${idPrefix}-name`} type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: undefined })); }}
            placeholder={copy.namePlaceholder} autoComplete="name" enterKeyHint="next" maxLength={80}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? `${idPrefix}-name-err` : undefined}
            className={`${inputCls} ${errors.name ? inputErrCls : ""}`}
          />
          {errors.name && <p id={`${idPrefix}-name-err`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-[12.5px] text-red-300"><CircleAlert className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden />{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-contact`} className={labelCls}>{copy.contact}</label>
          <input
            id={`${idPrefix}-contact`} type="text" value={contact}
            onChange={(e) => { const v = e.target.value; setContact(v.includes("@") ? v : sanitizePhone(v)); setErrors((x) => ({ ...x, contact: undefined })); }}
            placeholder={copy.contactPlaceholder} autoComplete="tel" inputMode={isEmail ? "email" : "text"} enterKeyHint="send" maxLength={120}
            aria-invalid={!!errors.contact} aria-describedby={errors.contact ? `${idPrefix}-contact-err` : undefined}
            className={`${inputCls} ${errors.contact ? inputErrCls : ""}`}
          />
          {errors.contact && <p id={`${idPrefix}-contact-err`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-[12.5px] text-red-300"><CircleAlert className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden />{errors.contact}</p>}
        </div>
      </div>

      {/* Капан за ботове: извън екрана и извън Tab реда. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>

      {failed && (
        <div role="alert" className="mt-4 flex items-start gap-3 rounded-xl bg-red-400/[0.08] px-4 py-3.5 text-[13.5px] leading-relaxed text-red-200 ring-1 ring-inset ring-red-400/30">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <div>
            <p className="font-bold">{copy.failed.title}</p>
            <p className="mt-0.5 text-red-200/80">{copy.failed.text}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-bold text-ink transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />}
        {sending ? copy.sending : copy.submit}
      </button>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onWhatsApp}
        className="group mt-3 flex min-h-[44px] items-center justify-center gap-2 rounded-xl text-[14px] font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-text"
      >
        <WhatsAppIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-200" />
        <span className="border-b border-white/20 pb-px group-hover:border-white/50">{copy.whatsapp}</span>
      </a>
      <p className="mt-3 text-center text-[12px] leading-relaxed text-slate-500">
        {t.contact.consent}{" "}
        <Link to={href(ROUTES.privacy)} className="text-slate-300 underline decoration-white/20 underline-offset-[3px] transition-colors hover:text-white hover:decoration-accent">
          {t.contact.consentLink}
        </Link>
        .
      </p>
    </form>
  );
}
