/**
 * Ново запитване от сайта → веднага в Telegram (бот на собственика).
 * Имейлът през EmailJS остава като резерва в браузъра — запитването се брои за изпратено, ако мине поне единият път.
 *
 * Нужни променливи във Vercel: TELEGRAM_BOT_TOKEN (от @BotFather) и TELEGRAM_CHAT_ID (чатът, в който ботът пише).
 */

type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  reply?: string;
  message?: string;
  lang?: string;
  page?: string;
  source?: string;
  /** Скрито поле: попълват го само ботове. */
  website?: string;
};

const MAX = 2000;
const clean = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX) : "");
const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

export async function POST(request: Request): Promise<Response> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return Response.json({ ok: false, error: "not_configured" }, { status: 503 });

  let body: Lead;
  try {
    body = (await request.json()) as Lead;
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  // Бот попълнил скритото поле — отговаряме „ок“, за да не опитва отново, но не пращаме нищо.
  if (clean(body.website)) return Response.json({ ok: true });

  const lead = {
    name: clean(body.name),
    phone: clean(body.phone),
    email: clean(body.email),
    service: clean(body.service),
    reply: clean(body.reply),
    message: clean(body.message),
    lang: clean(body.lang),
    page: clean(body.page),
    source: clean(body.source),
  };
  if (!lead.phone && !lead.email) return Response.json({ ok: false, error: "no_contact" }, { status: 400 });

  const lines = [
    "🆕 <b>Ново запитване</b>",
    lead.name && `👤 ${esc(lead.name)}`,
    lead.phone && `📞 ${esc(lead.phone)}`,
    lead.email && `✉️ ${esc(lead.email)}`,
    lead.service && `🧩 ${esc(lead.service)}`,
    lead.reply && `💬 Да отговорим: ${esc(lead.reply)}`,
    lead.message && `\n${esc(lead.message)}`,
    "",
    [lead.lang && `🌐 ${esc(lead.lang)}`, lead.page && esc(lead.page), lead.source && esc(lead.source)].filter(Boolean).join(" · "),
  ].filter((l) => l !== "" && l !== undefined && l !== false) as string[];

  const digits = lead.phone.replace(/[^\d]/g, "");
  const buttons = [
    digits && { text: "WhatsApp", url: `https://wa.me/${digits.startsWith("0") ? `359${digits.slice(1)}` : digits}` },
    digits && { text: "Viber", url: `https://viber.click/${digits.startsWith("0") ? `359${digits.slice(1)}` : digits}` },
    lead.email && { text: "Имейл", url: `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(lead.email)}` },
  ].filter(Boolean);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
      ...(buttons.length ? { reply_markup: { inline_keyboard: [buttons] } } : {}),
    }),
  });
  if (!res.ok) {
    console.error("Telegram error", res.status, await res.text());
    return Response.json({ ok: false, error: "telegram" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
