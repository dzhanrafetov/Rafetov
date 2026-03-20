import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// ── Particle network background ──
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
      o: Math.random() * 0.35 + 0.08,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.strokeStyle = `rgba(34,211,238,${0.07 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

// ── Letter with glitch on entrance ──
function GlitchLetter({ char, delay }: { char: string; delay: number }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGlitch(true),  delay * 1000 + 60);
    const t2 = setTimeout(() => setGlitch(false), delay * 1000 + 160);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [delay]);

  return (
    <motion.span
      className="relative inline-block"
      initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
      animate={{ opacity: 1,  y: 0,  filter: "blur(0px)" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textShadow: glitch
          ? "3px 0 #f87171, -3px 0 #22d3ee"
          : "0 0 40px rgba(34,211,238,0.25)",
      }}
    >
      {char}
    </motion.span>
  );
}

const LETTERS = ["R", "A", "F", "E", "T", "O", "V"];

export default function BrandFilm() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(wrapRef, { once: true, margin: "-120px" });
  const bars    = useAnimation();
  const [playing, setPlaying] = useState(false);

  // Trigger sequence once in view
  useEffect(() => {
    if (!inView) return;
    bars.start({ scaleY: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 } });
    setTimeout(() => setPlaying(true), 200);
  }, [inView, bars]);

  return (
    <section
      ref={wrapRef}
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "#030508", minHeight: "60vh" }}
    >
      {/* Particle bg */}
      <Particles />

      {/* Scanline texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* Cinematic letterbox bars */}
      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }}
        animate={bars}
        className="absolute inset-x-0 top-0 z-[5] h-[14%] origin-top bg-black"
      />
      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }}
        animate={bars}
        className="absolute inset-x-0 bottom-0 z-[5] h-[14%] origin-bottom bg-black"
      />

      {/* Scan-line sweep */}
      {playing && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-[3] w-[3px]"
          style={{
            background: "linear-gradient(180deg, transparent 0%, #22d3ee 40%, #a78bfa 60%, transparent 100%)",
            boxShadow: "0 0 24px 8px rgba(34,211,238,0.5)",
          }}
          initial={{ left: "-1%" }}
          animate={{ left: "102%" }}
          transition={{ duration: 1.0, delay: 0.1, ease: "easeInOut" }}
        />
      )}

      {/* Center content */}
      <div className="relative z-[4] flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">

        {/* Agency label */}
        {playing && (
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 text-[11px] font-bold uppercase text-slate-500 tracking-[0.3em]"
          >
            web agency
          </motion.p>
        )}

        {/* RAFETOV — letter by letter */}
        <div className="flex items-end gap-[0.02em] overflow-hidden">
          {playing && LETTERS.map((ch, i) => (
            <GlitchLetter key={i} char={ch} delay={0.35 + i * 0.07} />
          ))}
          {!playing && <span className="opacity-0 text-[clamp(4rem,18vw,9rem)]">RAFETOV</span>}
          <style>{`
            .glitch-wrap span {
              font-size: clamp(4rem, 18vw, 9rem);
              font-weight: 900;
              letter-spacing: -0.04em;
              color: #f1f5f9;
              line-height: 1;
            }
          `}</style>
          {playing && LETTERS.map((_, i) => (
            // invisible placeholder keeps layout stable before playing
            <span key={"ph" + i} style={{ display: "none" }} />
          ))}
        </div>

        {/* .COM */}
        {playing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 flex items-center gap-3"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/40" />
            <span
              className="text-[clamp(1.4rem,5vw,2.6rem)] font-black tracking-widest"
              style={{
                color: "#22d3ee",
                textShadow: "0 0 30px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.25)",
              }}
            >
              .COM
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/40" />
          </motion.div>
        )}

        {/* Tagline */}
        {playing && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1,  y: 0  }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-8 text-[clamp(1rem,2.5vw,1.25rem)] font-medium text-slate-400"
          >
            Правим сайтове,{" "}
            <span className="text-slate-200">които носят клиенти.</span>
          </motion.p>
        )}

        {/* Decorative bottom line */}
        {playing && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 h-px w-48 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, #22d3ee, #a78bfa, transparent)" }}
          />
        )}

        {/* Corner accents */}
        {playing && (
          <>
            {[["top-8 left-8", "top-0 left-0", "bottom-0 left-0"],
              ["top-8 right-8", "top-0 right-0", "bottom-0 right-0"],
              ["bottom-8 left-8", "top-0 left-0", "bottom-0 left-0"],
              ["bottom-8 right-8", "top-0 right-0", "bottom-0 right-0"],
            ].map((_, i) => null)}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="pointer-events-none absolute inset-8 hidden sm:block"
              style={{ border: "1px solid rgba(34,211,238,0.07)", borderRadius: 2 }}
            />
            {/* Corner brackets */}
            {(["top-8 left-8","top-8 right-8","bottom-8 left-8","bottom-8 right-8"] as const).map((pos, i) => (
              <motion.div
                key={pos}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + i * 0.06, duration: 0.3 }}
                className={`pointer-events-none absolute hidden h-4 w-4 sm:block ${pos}`}
                style={{
                  borderTop:    i < 2 ? "1.5px solid #22d3ee" : "none",
                  borderBottom: i >= 2 ? "1.5px solid #22d3ee" : "none",
                  borderLeft:   i % 2 === 0 ? "1.5px solid #22d3ee" : "none",
                  borderRight:  i % 2 === 1 ? "1.5px solid #22d3ee" : "none",
                }}
              />
            ))}
          </>
        )}

      </div>

      {/* Bottom gradient into next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[6] h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #07090f)" }}
      />
    </section>
  );
}
