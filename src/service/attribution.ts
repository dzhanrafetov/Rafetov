import { track } from "@vercel/analytics";
import type { Lang, SourceKey } from "../i18n/types";

const FIRST_TOUCH_KEY = "first_touch";

type FirstTouch = { src: string; ref: string; page: string };

/** Отговорите на „Откъде научихте за нас?“. Trustlocal е само за Белгия (нидерландската версия). */
export function sourceKeysFor(lang: Lang): SourceKey[] {
  return ["tiktok", "social", "google", "referral", ...(lang === "nl" ? (["trustlocal"] as const) : []), "other"];
}

/**
 * Запомня откъде е дошъл човекът при първото отваряне в тази сесия: ?utm_source= / ?ref= от линка
 * и сайта, от който е кликнал. Влиза в имейла със запитването — без това не се знае кой канал работи.
 */
export function captureFirstTouch() {
  try {
    if (sessionStorage.getItem(FIRST_TOUCH_KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const refHost = document.referrer ? new URL(document.referrer).hostname : "";
    const touch: FirstTouch = {
      src: q.get("utm_source") || q.get("ref") || "",
      ref: refHost && refHost !== window.location.hostname ? refHost : "",
      page: window.location.pathname,
    };
    sessionStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
  } catch {
    // частен режим или блокирано хранилище — запитването просто е без източник
  }
}

/** Ред за имейла: „Източник: trustlocal · от tiktok.com · първа страница /nl · изпратено от /stroitelni-firmi“. */
export function attributionLine(): string {
  let touch: FirstTouch | null = null;
  try {
    touch = JSON.parse(sessionStorage.getItem(FIRST_TOUCH_KEY) || "null");
  } catch {
    touch = null;
  }
  const parts = [
    touch?.src && `линк: ${touch.src}`,
    touch?.ref ? `от ${touch.ref}` : "директно / от приложение",
    touch?.page && `първа страница ${touch.page}`,
    `изпратено от ${window.location.pathname}`,
  ].filter(Boolean);
  return `Източник: ${parts.join(" · ")}`;
}

/**
 * Брои кликовете на телефон, WhatsApp и имейл навсякъде в сайта (header, плаващия бутон, долната лента…).
 * Повечето хора не пращат формата, а звънят или пишат — без това тези запитвания не се виждат в статистиката.
 */
export function trackContactClicks() {
  document.addEventListener(
    "click",
    (e) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const event = href.startsWith("tel:")
        ? "phone_click"
        : href.includes("wa.me/")
          ? "whatsapp_click"
          : href.startsWith("mailto:")
            ? "email_click"
            : null;
      if (event) track(event, { page: window.location.pathname });
    },
    { capture: true },
  );
}
