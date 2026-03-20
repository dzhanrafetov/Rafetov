import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const STATS = [
  { value: 10, suffix: "+",  label: "Завършени\nпроекта",  accent: "#22D3EE" },
  { value: 6,  suffix: "",   label: "Държави\nклиенти",    accent: "#34D399" },
  { value: 5,  suffix: "г+", label: "Опит\nв бранша",      accent: "#A78BFA" },
  { value: 100,suffix: "%",  label: "Доволни\nклиенти",    accent: "#FBBF24" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = 60;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const id = setInterval(() => {
      frame++;
      setVal(Math.round(ease(Math.min(frame / total, 1)) * target));
      if (frame >= total) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [active, target]);

  return <>{val}{suffix}</>;
}

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function StatsSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden text-slate-200"
      style={{ backgroundColor: "#060a11", ["--hairline" as any]: "#1a2234" }}
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03]
            [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
            [background-size:28px_28px]"
        />
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #22D3EE 0%, transparent 65%)" }}
        />
      </div>

      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-24">

        {/* Headline */}
        <motion.div
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            резултати
          </span>
          <h2 className="balance mx-auto mt-5 text-[clamp(1.7rem,5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
            Числата{" "}
            <span style={{
              background: "linear-gradient(110deg,#22d3ee 0%,#67e8f9 45%,#a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              говорят сами.
            </span>
          </h2>
          <p className="balance mx-auto mt-4 max-w-[42ch] text-[15px] leading-relaxed text-slate-400">
            Не само красив дизайн — реални проекти, реални клиенти, реален растеж.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i + 1}
              className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-8 text-center"
              style={{ ["--a" as any]: s.accent }}
            >
              {/* Top accent bar */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }}
              />
              {/* Hover glow */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb,${s.accent} 12%,transparent), transparent 70%)` }}
              />

              {/* Animated number */}
              <div
                className="relative text-[clamp(2.4rem,6vw,3.5rem)] font-black leading-none tracking-tight tabular-nums"
                style={{ color: s.accent }}
              >
                <CountUp target={s.value} suffix={s.suffix} active={inView} />
              </div>

              {/* Divider */}
              <div
                aria-hidden
                className="relative mt-3 h-px w-8 rounded-full transition-all duration-300 group-hover:w-12"
                style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }}
              />

              {/* Label */}
              <p className="relative mt-3 text-[13px] font-medium leading-snug text-slate-400 whitespace-pre-line">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={6}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <ScrollLink
            to="contact" smooth duration={220} offset={-70}
            className="group relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full px-7 text-[14px] font-bold text-[#03060d]
                       shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.75)]"
            style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}
          >
            <span aria-hidden className="absolute inset-0 -skew-x-[20deg] -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Искам такъв проект</span>
            <svg viewBox="0 0 24 24" className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </ScrollLink>

          <ScrollLink
            to="work" smooth duration={220} offset={-70}
            className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] px-7 text-[14px] font-semibold text-slate-300
                       transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-slate-100"
          >
            Виж проектите
          </ScrollLink>
        </motion.div>

      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`.balance { text-wrap: balance; }`}</style>
    </section>
  );
}
