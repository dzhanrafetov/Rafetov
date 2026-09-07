import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { stripLang } from "../i18n";

const HEADER_OFFSET = 70;

/**
 * При смяна на страница скролва в началото, а при адрес с hash (напр. "/#services",
 * използван от header/footer, когато сме на правна страница) изчаква lazy секцията
 * да се монтира и скролва до нея.
 *
 * Смяната само на езика (напр. "/" → "/en") НЕ скролва — посетителят остава където е.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const prevPage = useRef<string | null>(null);

  useEffect(() => {
    const page = stripLang(pathname);
    const langOnlyChange = prevPage.current === page;
    prevPage.current = page;

    if (!hash) {
      if (!langOnlyChange) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    const timers: number[] = [];
    let attempts = 0;
    let cancelled = false;
    let observer: ResizeObserver | null = null;

    const scrollToEl = (el: HTMLElement) => {
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "instant" });
    };

    // Ако посетителят започне да скролва сам, спираме да го "връщаме" към секцията.
    const stop = () => {
      cancelled = true;
      observer?.disconnect();
      timers.forEach(clearTimeout);
    };
    const userEvents = ["wheel", "touchstart", "keydown"] as const;
    userEvents.forEach((ev) => window.addEventListener(ev, stop, { passive: true }));

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        scrollToEl(el);
        // Lazy секциите и снимките променят височината на страницата след първия скрол.
        // Следим промените в размера и коригираме позицията, докато layout-ът се успокои (до ~4 s).
        observer = new ResizeObserver(() => {
          if (!cancelled) scrollToEl(el);
        });
        observer.observe(document.body);
        timers.push(window.setTimeout(() => observer?.disconnect(), 4000));
        return;
      }
      // Секциите се зареждат lazy — опитваме до ~6 секунди (setTimeout не се спира в неактивен таб като rAF).
      if (attempts++ < 120) timers.push(window.setTimeout(tryScroll, 50));
    };

    tryScroll();
    return () => {
      stop();
      userEvents.forEach((ev) => window.removeEventListener(ev, stop));
    };
  }, [pathname, hash]);

  return null;
}
