import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import createGlobe from "cobe";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const CHIPS = [
  {
    label: "Сайт",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 9h20M7 6h.01M10 6h.01" />
      </svg>
    ),
  },
  {
    label: "E-магазин",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M6 7h15l-2 9H7L6 7Z" /><path d="M6 7 5 4H2" />
        <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" /><circle cx="17" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Реклами",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M3 17l4-8 4 4 4-6 4 4" /><path d="M21 21H3" />
      </svg>
    ),
  },
];

const COUNTRIES = [
  { name: "България",       flag: "🇧🇬", accent: "#22D3EE", lat: 42.7339, lng: 25.4858 },
  { name: "Германия",       flag: "🇩🇪", accent: "#FBBF24", lat: 51.1657, lng: 10.4515 },
  { name: "Белгия",         flag: "🇧🇪", accent: "#34D399", lat: 50.5039, lng:  4.4699 },
  { name: "Великобритания", flag: "🇬🇧", accent: "#A78BFA", lat: 55.3781, lng: -3.4360 },
  { name: "Испания",        flag: "🇪🇸", accent: "#f87171", lat: 40.4637, lng: -3.7492 },
  { name: "Норвегия",       flag: "🇳🇴", accent: "#38bdf8", lat: 60.4720, lng:  8.4689 },
];

// phi that centres Europe on the globe face
const GLOBE_PHI   = 0.22;
const GLOBE_THETA = 0.22;
const BADGE       = 28; // px diameter

function spreadPoints(pts: { x: number; y: number }[], minDist: number) {
  const out = pts.map((p) => ({ ...p }));
  for (let iter = 0; iter < 80; iter++) {
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        const dx = out[j].x - out[i].x;
        const dy = out[j].y - out[i].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < minDist && d > 0.001) {
          const push = (minDist - d) / 2;
          out[i].x -= (dx / d) * push * 0.55;
          out[i].y -= (dy / d) * push * 0.55;
          out[j].x += (dx / d) * push * 0.55;
          out[j].y += (dy / d) * push * 0.55;
        }
      }
    }
  }
  return out;
}

// ── Static Globe ──
function Globe({ activeCountry }: { activeCountry: number }) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flagPos, setFlagPos] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width:  760,
      height: 760,
      phi:    GLOBE_PHI,
      theta:  GLOBE_THETA,
      dark: 1,
      diffuse: 1.1,
      mapSamples: 20000,
      mapBrightness: 5.8,
      baseColor:   [0.08, 0.13, 0.22],
      markerColor: [0.08, 0.13, 0.22], // hidden — we use flag badges
      glowColor:   [0.07, 0.12, 0.22],
      markers: [],
    });

    // Keep rendering loop alive (cobe needs RAF to draw)
    let rafId = 0;
    const tick = () => {
      globe.update({ phi: GLOBE_PHI });
      rafId = requestAnimationFrame(tick);
    };
    tick();

    // Project lat/lng onto 2D canvas overlay
    const W  = wrap.offsetWidth;
    const cx = W / 2;
    const cy = W / 2;
    const r  = W * 0.44;
    const cosT = Math.cos(GLOBE_THETA);
    const sinT = Math.sin(GLOBE_THETA);

    const raw = COUNTRIES.map((c) => {
      const latR = (c.lat * Math.PI) / 180;
      const lngR = (c.lng * Math.PI) / 180;
      const x0   = Math.cos(latR) * Math.sin(lngR - GLOBE_PHI);
      const y0   = Math.sin(latR);
      const z0   = Math.cos(latR) * Math.cos(lngR - GLOBE_PHI);
      const y1   = y0 * cosT - z0 * sinT;
      return { x: cx + x0 * r, y: cy - y1 * r };
    });

    setFlagPos(spreadPoints(raw, BADGE + 5));

    return () => { cancelAnimationFrame(rafId); globe.destroy(); };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto select-none"
      style={{ width: "100%", maxWidth: 380, aspectRatio: "1" }}
    >
      {/* Glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.13) 0%, transparent 70%)" }}
      />
      {/* Pulsing rings */}
      <div aria-hidden className="globe-ring pointer-events-none absolute rounded-full border border-cyan-400/[0.18]" style={{ inset: "-10px" }} />
      <div aria-hidden className="globe-ring-2 pointer-events-none absolute rounded-full border border-cyan-400/[0.08]" style={{ inset: "-24px" }} />

      <canvas
        ref={canvasRef}
        width={760}
        height={760}
        style={{
          width: "100%", height: "100%",
          contain: "layout paint size",
          borderRadius: "50%",
          display: "block",
        }}
      />

      {/* Flag badges */}
      {flagPos.map((pos, i) => {
        const isActive = activeCountry === i;
        const c = COUNTRIES[i];
        return (
          <div
            key={c.name}
            aria-label={c.name}
            className="pointer-events-none absolute flex items-center justify-center rounded-full"
            style={{
              width:      isActive ? BADGE + 4 : BADGE,
              height:     isActive ? BADGE + 4 : BADGE,
              left:       pos.x,
              top:        pos.y,
              transform:  "translate(-50%, -50%)",
              border:     `${isActive ? 2 : 1}px solid ${c.accent}${isActive ? "cc" : "55"}`,
              background: isActive
                ? `color-mix(in srgb,${c.accent} 32%,rgba(4,8,16,0.75))`
                : `color-mix(in srgb,${c.accent} 18%,rgba(4,8,16,0.82))`,
              boxShadow:  isActive
                ? `0 0 22px -2px ${c.accent}bb, 0 0 6px 0 ${c.accent}66`
                : `0 0 10px -2px ${c.accent}55`,
              fontSize:   15,
              lineHeight: 1,
              transition: "all 0.35s ease",
              zIndex:     isActive ? 10 : 1,
            }}
          >
            {c.flag}
          </div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [activeCountry, setActiveCountry] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveCountry((i) => (i + 1) % COUNTRIES.length), 2400);
    return () => clearInterval(id);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate overflow-hidden text-slate-200"
      style={{
        backgroundColor: "#060a11",
        ["--hairline" as any]: "#1a2234",
        ["--mx" as any]: "50%",
        ["--my" as any]: "38%",
      }}
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.035]
          [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
          [background-size:28px_28px]" />
        <div className="hero-spot absolute inset-0" />
        <div className="absolute -right-64 -top-64 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(34,211,238,.12) 0%,transparent 65%)" }} />
        <div className="absolute -bottom-52 -left-52 h-[580px] w-[580px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(129,140,248,.08) 0%,transparent 65%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060a11] to-transparent" />
      </div>

      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-5xl px-5 pt-24 pb-16 text-center sm:px-8 sm:pt-32 sm:pb-28">

        {/* Badge */}
        <motion.div variants={fade} initial="hidden" animate="show" className="mx-auto mb-8 w-fit">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-[7px] text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            <span className="relative flex h-[7px] w-[7px] shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-400" />
            </span>
            Уеб агенция · България
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fade} initial="hidden" animate="show" custom={1}
          className="balance mx-auto text-[clamp(2.2rem,9vw,5.2rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
        >
          Сайт, който{" "}
          <span className="hero-text-gradient">носи клиенти.</span>
        </motion.h1>

        {/* One-liner */}
        <motion.p
          variants={fade} initial="hidden" animate="show" custom={1.6}
          className="mx-auto mt-6 max-w-[36ch] text-[clamp(1rem,2.5vw,1.2rem)] leading-relaxed text-slate-400"
        >
          Правим сайтове, e-магазини и реклами —{" "}
          <span className="text-slate-200 font-medium">бързо, ясно и на цена, която има смисъл.</span>
        </motion.p>

        {/* Service chips */}
        <motion.div
          variants={fade} initial="hidden" animate="show" custom={2}
          className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          {CHIPS.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-slate-300"
            >
              <span className="text-cyan-400">{c.icon}</span>
              {c.label}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fade} initial="hidden" animate="show" custom={2.5}
          className="mx-auto mt-10 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
          <ScrollLink
            to="contact" smooth duration={220} offset={-70}
            className="group relative inline-flex h-14 cursor-pointer items-center justify-center overflow-hidden rounded-full px-9 text-[16px] font-bold text-[#03060d]
                       shadow-[0_0_36px_-8px_rgba(34,211,238,0.6)] transition-all duration-300 hover:shadow-[0_0_52px_-8px_rgba(34,211,238,0.8)]
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
            style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}
          >
            <span aria-hidden className="absolute inset-0 -skew-x-[20deg] -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Искам оферта</span>
            <svg viewBox="0 0 24 24" className="relative ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </ScrollLink>

          <ScrollLink
            to="work" smooth duration={220} offset={-70}
            className="inline-flex h-14 cursor-pointer items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] px-9 text-[15px] font-semibold text-slate-300
                       transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.07] hover:text-slate-100
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            Виж проекти
          </ScrollLink>
        </motion.div>

        {/* ── Globe Section ── */}
        <motion.div
          variants={fade} initial="hidden" animate="show" custom={3.5}
          className="mx-auto mt-20 max-w-[860px]"
        >
          {/* Label */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.07))" }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Клиенти от 6 държави
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(270deg,transparent,rgba(255,255,255,0.07))" }} />
          </div>

          {/* Globe + side lists */}
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-0">

            {/* Left — first 3 */}
            <div className="order-3 flex flex-row flex-wrap justify-center gap-2.5 lg:order-1 lg:flex-col lg:items-end lg:gap-3 lg:w-[210px] lg:shrink-0">
              {COUNTRIES.slice(0, 3).map((c, i) => (
                <motion.div
                  key={c.name}
                  animate={activeCountry === i ? { scale: 1.05, x: 6 } : { scale: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex cursor-default items-center gap-2.5 rounded-full px-3.5 py-2"
                  style={{
                    border: `1px solid ${activeCountry === i ? c.accent + "50" : "rgba(255,255,255,0.06)"}`,
                    background: activeCountry === i ? `color-mix(in srgb,${c.accent} 10%,transparent)` : "rgba(255,255,255,0.02)",
                    boxShadow: activeCountry === i ? `0 0 20px -4px ${c.accent}44` : "none",
                    transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
                  }}
                >
                  <span className="text-xl leading-none">{c.flag}</span>
                  <span className="text-[13px] font-semibold" style={{ color: activeCountry === i ? c.accent : "#94a3b8", transition: "color 0.3s" }}>
                    {c.name}
                  </span>
                  {activeCountry === i && (
                    <span className="relative flex h-[6px] w-[6px] shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: c.accent }} />
                      <span className="relative inline-flex h-[6px] w-[6px] rounded-full" style={{ backgroundColor: c.accent }} />
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Globe */}
            <div className="order-2 w-full max-w-[340px] lg:flex-1 lg:max-w-[420px]">
              <Globe activeCountry={activeCountry} />
            </div>

            {/* Right — last 3 */}
            <div className="order-1 flex flex-row flex-wrap justify-center gap-2.5 lg:order-3 lg:flex-col lg:items-start lg:gap-3 lg:w-[210px] lg:shrink-0">
              {COUNTRIES.slice(3).map((c, i) => (
                <motion.div
                  key={c.name}
                  animate={activeCountry === i + 3 ? { scale: 1.05, x: -6 } : { scale: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex cursor-default items-center gap-2.5 rounded-full px-3.5 py-2"
                  style={{
                    border: `1px solid ${activeCountry === i + 3 ? c.accent + "50" : "rgba(255,255,255,0.06)"}`,
                    background: activeCountry === i + 3 ? `color-mix(in srgb,${c.accent} 10%,transparent)` : "rgba(255,255,255,0.02)",
                    boxShadow: activeCountry === i + 3 ? `0 0 20px -4px ${c.accent}44` : "none",
                    transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
                  }}
                >
                  <span className="text-xl leading-none">{c.flag}</span>
                  <span className="text-[13px] font-semibold" style={{ color: activeCountry === i + 3 ? c.accent : "#94a3b8", transition: "color 0.3s" }}>
                    {c.name}
                  </span>
                  {activeCountry === i + 3 && (
                    <span className="relative flex h-[6px] w-[6px] shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: c.accent }} />
                      <span className="relative inline-flex h-[6px] w-[6px] rounded-full" style={{ backgroundColor: c.accent }} />
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .hero-spot {
          background: radial-gradient(400px 400px at var(--mx) var(--my), rgba(34,211,238,.1) 0%, transparent 65%);
          transition: background 0.05s;
        }
        @media (hover: none) {
          .hero-spot { background: radial-gradient(380px 380px at 65% 30%, rgba(34,211,238,.08) 0%, transparent 65%); }
        }
        .hero-text-gradient {
          background: linear-gradient(110deg,#22d3ee 0%,#67e8f9 40%,#a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .balance { text-wrap: balance; }
        .globe-ring {
          animation: ring-pulse 3.5s ease-in-out infinite;
        }
        .globe-ring-2 {
          animation: ring-pulse 3.5s ease-in-out infinite 1.4s;
        }
        @keyframes ring-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.12; transform: scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </section>
  );
}
