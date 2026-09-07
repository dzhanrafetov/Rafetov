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

  // Същият език като hero CTA-то: циан градиент, тъмен текст (по-висок контраст от бяло върху синьо), стрелка.
  const btnClass =
    `group relative flex h-[52px] flex-1 items-center justify-center gap-2 overflow-hidden rounded-full text-[15px] font-bold tracking-[0.005em] text-[#03060d]
     transition-transform duration-150 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70`;
  const btnStyle = {
    background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)",
    boxShadow: "0 10px 28px -10px rgba(34,211,238,0.75), 0 0 0 1px rgba(255,255,255,0.12) inset, 0 1px 0 rgba(255,255,255,0.35) inset",
  };

  const label = (
    <>
      {/* блясък, който минава през бутона веднъж при показване — привлича окото без да натрапва */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent ${
          visible ? "mobilebar-shine" : "-translate-x-full"
        }`}
      />
      <span className="relative">{t.mobileBar.cta}</span>
      <svg viewBox="0 0 24 24" className="relative h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
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
        className="pointer-events-none absolute inset-x-0 -bottom-10 top-0 bg-gradient-to-t from-[#060a11] via-[#060a11]/85 to-transparent"
      />

      <div
        className="relative mx-3 flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#0b1220]/90 p-1.5 backdrop-blur-xl"
        style={{ boxShadow: "0 20px 50px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)" }}
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

        {/* WhatsApp — вторично действие: стъклен зелен бутон с плътна икона, по-тих от офертата, но ясно четим */}
        <a
          href={`https://wa.me/359897758062?text=${encodeURIComponent(t.whatsapp.text)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.whatsapp.aria}
          className="inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full border border-emerald-300/25 text-[15px] font-bold tracking-[0.005em] text-emerald-50
                     transition-[transform,background-color] duration-150 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
          style={{
            background: "linear-gradient(135deg,rgba(37,211,102,0.22) 0%,rgba(37,211,102,0.10) 100%)",
            boxShadow: "0 8px 22px -12px rgba(37,211,102,0.6), inset 0 1px 0 rgba(255,255,255,0.10)",
          }}
        >
          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_12px_-3px_rgba(37,211,102,0.9),inset_0_1px_0_rgba(255,255,255,0.35)]">
            <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden>
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.86 9.86 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.27Z" />
            </svg>
          </span>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
