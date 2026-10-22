/**
 * Възел от „пътя“ — тънката циан линия, която минава през началната страница от първото съобщение
 * до формата. Всяка глава започва с такъв възел: отгоре идва линията, после светеща точка и номерът на главата.
 * Линията се „рисува“ при първо влизане в екрана; при prefers-reduced-motion стои готова.
 */
import { useEffect, useRef, useState } from "react";

export default function PathMark({ n, label, align = "center" }: { n: string; label: string; align?: "center" | "left" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setOn(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { rootMargin: "0px 0px -15% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className={`path-mark ${on ? "is-on" : ""} flex flex-col ${align === "center" ? "items-center" : "items-start"}`}>
      <span className="path-mark-line block h-16 w-[2px] sm:h-24" />
      {/* Номерът стои в самия възел — без етикет над заглавието (правило: без eyebrow). */}
      <span title={label} className="path-mark-dot flex h-7 w-7 items-center justify-center rounded-full border border-[#22d3ee]/60 bg-[#07090f] text-[11px] font-bold tabular-nums text-[#67e8f9]">
        {n}
      </span>
      <style>{`
        .path-mark-line { background: linear-gradient(180deg, rgba(34,211,238,0), #22d3ee); transform-origin: top; transform: scaleY(0); transition: transform .9s cubic-bezier(.16,1,.3,1); }
        .path-mark-dot { box-shadow: 0 0 0 5px rgba(34,211,238,.10), 0 6px 18px -4px rgba(34,211,238,.45); opacity: 0; transform: scale(.4); transition: opacity .4s ease .6s, transform .5s cubic-bezier(.16,1,.3,1) .6s; }
        .path-mark.is-on .path-mark-line { transform: scaleY(1); }
        .path-mark.is-on .path-mark-dot { opacity: 1; transform: scale(1); }
        @media (prefers-reduced-motion: reduce) { .path-mark-line, .path-mark-dot { transform: none; opacity: 1; transition: none; } }
      `}</style>
    </div>
  );
}
