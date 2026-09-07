import { useEffect, useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { track } from "@vercel/analytics";
import { stripLang, useLang } from "../i18n";

const SHOW_AFTER = 500; // px скрол, преди лентата изобщо да се появи
const DELTA = 8; // минимално движение, за да се брои за смяна на посоката

/**
 * Лепкава долна лента на телефон: бутон към формата за запитване и WhatsApp.
 * „Обади се“ е махнато — почти никой не звъни от сайта, докато формата и WhatsApp носят запитвания.
 * UX правила:
 *  - появява се чак след като hero секцията е подмината;
 *  - скрива се при скрол надолу (четене), показва се при скрол нагоре (търсене);
 *  - скрива се, когато контактната секция или footer-ът са на екрана — там вече е самата форма.
 */
export default function MobileBar() {
  const [visible, setVisible] = useState(false);
  const { t, href } = useLang();
  const { pathname } = useLocation();
  const isHome = stripLang(pathname) === "/";
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const overlapsContact = () => {
      const vh = window.innerHeight;
      const els = [document.getElementById("contact"), document.querySelector("footer")];
      return els.some((el) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        // елементът заема долната част на екрана
        return r.top < vh * 0.8 && r.bottom > 0;
      });
    };

    const update = () => {
      ticking.current = false;
      const y = window.scrollY;
      const scrollingUp = y < lastY.current - DELTA;
      const scrollingDown = y > lastY.current + DELTA;
      if (scrollingUp || scrollingDown) lastY.current = y;

      if (y < SHOW_AFTER || overlapsContact()) {
        setVisible(false);
        return;
      }
      if (scrollingDown) setVisible(false);
      else if (scrollingUp) setVisible(true);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    lastY.current = window.scrollY;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Без това не се вижда дали лентата изобщо води хора към формата.
  const onClick = () => track("mobilebar_form_cta");

  const btnClass =
    `relative flex h-12 flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-full text-[15px] font-semibold tracking-[0.01em] text-white
     transition-transform duration-150 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60`;
  const btnStyle = {
    background: "linear-gradient(135deg,#38bdf8 0%,#0ea5e9 50%,#0369a1 100%)",
    boxShadow: "0 8px 24px -8px rgba(14,165,233,0.7), inset 0 1px 0 rgba(255,255,255,0.28)",
  };

  const label = (
    <>
      {/* лек блясък в горната половина — прави бутона по-„стъклен“ */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
      <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 6h16v12H4V6Z" />
          <path d="M4 7l8 6 8-6" />
        </svg>
      </span>
      <span className="relative">{t.mobileBar.cta}</span>
    </>
  );

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-[transform,opacity] duration-300 ease-out will-change-transform ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* Мек градиент под капсулата, за да се отделя от съдържанието без плътен черен блок */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-10 top-0 bg-gradient-to-t from-[#060a11] via-[#060a11]/80 to-transparent"
      />

      <div
        className="relative mx-3 flex gap-1.5 rounded-full border border-white/10 bg-[#0f1624]/85 p-1.5 backdrop-blur-xl"
        style={{ boxShadow: "0 18px 50px -12px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.06)" }}
      >
        {isHome ? (
          // На началната страница формата е на същия екран — плавен скрол дотам.
          <ScrollLink
            to="contact"
            smooth
            duration={400}
            offset={-70}
            onClick={onClick}
            aria-label={t.mobileBar.aria}
            className={`${btnClass} cursor-pointer`}
            style={btnStyle}
          >
            {label}
          </ScrollLink>
        ) : (
          <RouterLink
            to={`${href("/")}#contact`}
            onClick={onClick}
            aria-label={t.mobileBar.aria}
            className={btnClass}
            style={btnStyle}
          >
            {label}
          </RouterLink>
        )}

        {/* WhatsApp — вторично действие, приглушен зелен tint с добър контраст */}
        <a
          href={`https://wa.me/359897758062?text=${encodeURIComponent(t.whatsapp.text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] text-[15px] font-semibold tracking-[0.01em] text-emerald-100
                     transition-[transform,background-color] duration-150 active:scale-[0.97] active:bg-emerald-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_12px_-4px_rgba(37,211,102,0.8)]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.27Z" />
            </svg>
          </span>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
