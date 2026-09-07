import { motion } from "framer-motion";

/** Илюстрации за началната страница: гаранциите и четирите стъпки на процеса. */

const float = (delay = 0, dy = -7) => ({
  animate: { y: [0, dy, 0] },
  transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
});
const pulse = (delay = 0) => ({
  animate: { opacity: [0.55, 1, 0.55] },
  transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay },
});

/* ────────────── Гаранции: хостинг, поддръжка, обучение, ясна цена ────────────── */
export function CareArt() {
  const id = "art-care";
  return (
    <svg viewBox="0 0 520 440" className="h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE" /><stop offset="60%" stopColor="#A78BFA" /><stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <linearGradient id={`${id}-btn`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34d9f0" /><stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.3" /><stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>
      <circle cx="260" cy="220" r="200" fill={`url(#${id}-glow)`} />

      {/* Server rack — free hosting */}
      <motion.g {...float(0.2)} filter={`url(#${id}-shadow)`}>
        <rect x="40" y="70" width="200" height="150" rx="16" fill="#0b1220" stroke="rgba(255,255,255,0.12)" />
        {[92, 130, 168].map((y, i) => (
          <g key={y}>
            <rect x="58" y={y} width="164" height="28" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
            <motion.circle cx="72" cy={y + 14} r="4" fill={i === 1 ? "#34D399" : "#22D3EE"} {...pulse(i * 0.5)} />
            <rect x="84" y={y + 11} width="60" height="6" rx="3" fill="rgba(255,255,255,0.28)" />
            <rect x="180" y={y + 9} width="30" height="10" rx="5" fill="rgba(255,255,255,0.08)" />
          </g>
        ))}
        {/* gift badge */}
        <g transform="translate(196 52)">
          <circle r="22" fill="#0f172a" stroke="#34D39988" />
          <path d="M-10 -2h20v12h-20zM-12 -8h24v6h-24zM0 -8v18M-6 -8c-5 0-6-8 0-6 3 1 5 4 6 6M6 -8c5 0 6-8 0-6-3 1-5 4-6 6" fill="none" stroke="#34D399" strokeWidth="2" strokeLinejoin="round" />
        </g>
        <rect x="58" y="204" width="80" height="6" rx="3" fill="rgba(255,255,255,0.18)" />
      </motion.g>

      {/* Chat — support after launch */}
      <motion.g {...float(0.9, -9)} filter={`url(#${id}-shadow)`}>
        <rect x="280" y="40" width="200" height="170" rx="16" fill="#0b1220" stroke="rgba(255,255,255,0.12)" />
        <circle cx="304" cy="66" r="10" fill="#22D3EE44" stroke="#22D3EE" />
        <rect x="320" y="60" width="70" height="7" rx="3.5" fill="rgba(255,255,255,0.7)" />
        <circle cx="456" cy="66" r="5" fill="#34D399" />
        {/* messages */}
        <rect x="298" y="86" width="120" height="30" rx="12" fill="rgba(255,255,255,0.06)" />
        <rect x="310" y="96" width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
        <rect x="310" y="105" width="44" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
        <rect x="342" y="124" width="120" height="30" rx="12" fill={`url(#${id}-btn)`} />
        <rect x="354" y="134" width="80" height="5" rx="2.5" fill="rgba(3,6,13,0.6)" />
        <rect x="354" y="143" width="50" height="5" rx="2.5" fill="rgba(3,6,13,0.4)" />
        <rect x="298" y="162" width="70" height="30" rx="12" fill="rgba(255,255,255,0.06)" />
        <motion.g animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <circle cx="318" cy="177" r="3" fill="rgba(255,255,255,0.6)" />
          <circle cx="330" cy="177" r="3" fill="rgba(255,255,255,0.6)" />
          <circle cx="342" cy="177" r="3" fill="rgba(255,255,255,0.6)" />
        </motion.g>
      </motion.g>

      {/* Training — phone with editable price + cursor */}
      <motion.g {...float(1.4, -6)} filter={`url(#${id}-shadow)`}>
        <rect x="40" y="250" width="200" height="150" rx="16" fill="#0b1220" stroke="rgba(255,255,255,0.12)" />
        <rect x="58" y="270" width="90" height="8" rx="4" fill="rgba(255,255,255,0.75)" />
        <rect x="58" y="292" width="164" height="36" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
        <rect x="68" y="302" width="26" height="16" rx="5" fill="#A78BFA33" stroke="#A78BFA88" />
        <text x="81" y="314" textAnchor="middle" fontSize="9" fontWeight="800" fill="#A78BFA" fontFamily="ui-sans-serif, system-ui">€</text>
        <rect x="104" y="306" width="60" height="7" rx="3.5" fill="rgba(255,255,255,0.4)" />
        <rect x="176" y="300" width="36" height="20" rx="10" fill="#A78BFA" />
        <path d="M186 313l6-6 3 3-6 6h-3z" fill="#03060d" />
        <rect x="58" y="340" width="164" height="36" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
        <rect x="68" y="350" width="26" height="16" rx="5" fill="rgba(255,255,255,0.08)" />
        <rect x="104" y="354" width="80" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
        <motion.path d="M200 372l2 14 4-4 4 6 3-2-4-6 5-1z" fill="#fff" stroke="#03060d" strokeWidth="1" animate={{ x: [0, -14, 0], y: [0, -40, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} />
      </motion.g>

      {/* Fixed price — document with stamp */}
      <motion.g {...float(0.5, -8)} filter={`url(#${id}-shadow)`}>
        <rect x="290" y="240" width="180" height="170" rx="16" fill="#0b1220" stroke="rgba(255,255,255,0.12)" />
        <rect x="310" y="262" width="80" height="8" rx="4" fill="rgba(255,255,255,0.75)" />
        {[284, 300, 316].map((y, i) => (
          <g key={y}>
            <rect x="310" y={y} width={[90, 70, 100][i]} height="5" rx="2.5" fill="rgba(255,255,255,0.22)" />
            <rect x="420" y={y - 1} width="30" height="7" rx="3.5" fill="rgba(255,255,255,0.3)" />
          </g>
        ))}
        <path d="M310 340H450" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 4" />
        <rect x="310" y="352" width="60" height="9" rx="4.5" fill="rgba(255,255,255,0.75)" />
        <rect x="392" y="348" width="58" height="18" rx="9" fill="#FBBF24" />
        <text x="421" y="361" textAnchor="middle" fontSize="10" fontWeight="800" fill="#03060d" fontFamily="ui-sans-serif, system-ui">€ FIX</text>
        <g transform="translate(436 262) rotate(-12)">
          <circle r="20" fill="none" stroke="#34D399" strokeWidth="2.5" />
          <circle r="14" fill="none" stroke="#34D399" strokeWidth="1" opacity="0.6" />
          <path d="M-7 0l5 5 9-10" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </motion.g>

      {/* Central shield */}
      <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "260px 226px" }}>
        <circle cx="260" cy="226" r="34" fill="#0f172a" stroke="rgba(255,255,255,0.14)" />
        <path d="M260 206l14 5v10c0 10-6 17-14 21-8-4-14-11-14-21v-10z" fill={`url(#${id}-grad)`} opacity="0.9" />
        <path d="M253 226l5 5 9-10" fill="none" stroke="#03060d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      {["M240 130 L255 195", "M290 150 L270 195", "M235 300 L250 258", "M300 290 L272 256"].map((d) => (
        <motion.path key={d} d={d} stroke="rgba(148,163,184,0.35)" strokeWidth="1.5" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} />
      ))}
    </svg>
  );
}

/* ────────────── Четирите стъпки: мини сцени ────────────── */
function StepDefs({ id, accent }: { id: string; accent: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={accent} /><stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.28" /><stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function TalkArt({ accent }: { accent: string }) {
  const id = "step-talk";
  return (
    <svg viewBox="0 0 260 130" className="h-auto w-full" aria-hidden>
      <StepDefs id={id} accent={accent} />
      <ellipse cx="130" cy="70" rx="110" ry="55" fill={`url(#${id}-glow)`} />
      <motion.g {...float(0, -4)}>
        <path d="M40 34h96a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10H70l-14 12v-12H40a10 10 0 0 1-10-10V44a10 10 0 0 1 10-10z" fill="#0f172a" stroke="rgba(255,255,255,0.14)" />
        <rect x="44" y="46" width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.55)" />
        <rect x="44" y="57" width="48" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
      </motion.g>
      <motion.g {...float(0.8, -5)}>
        <path d="M124 62h96a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10h-16v12l-14-12h-66a10 10 0 0 1-10-10V72a10 10 0 0 1 10-10z" fill={`url(#${id}-g)`} />
        <rect x="136" y="74" width="72" height="5" rx="2.5" fill="rgba(3,6,13,0.55)" />
        <rect x="136" y="85" width="40" height="5" rx="2.5" fill="rgba(3,6,13,0.4)" />
      </motion.g>
      <g transform="translate(200 30)">
        <circle r="14" fill="#0f172a" stroke={`${accent}88`} />
        <circle r="9" fill="none" stroke={accent} strokeWidth="2" />
        <motion.path d="M0 -6V0l4 3" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "0px 0px" }} />
      </g>
    </svg>
  );
}

function OfferArt({ accent }: { accent: string }) {
  const id = "step-offer";
  return (
    <svg viewBox="0 0 260 130" className="h-auto w-full" aria-hidden>
      <StepDefs id={id} accent={accent} />
      <ellipse cx="130" cy="70" rx="110" ry="55" fill={`url(#${id}-glow)`} />
      <motion.g {...float(0, -4)}>
        <rect x="70" y="14" width="120" height="104" rx="10" fill="#0f172a" stroke="rgba(255,255,255,0.14)" />
        <rect x="84" y="28" width="56" height="7" rx="3.5" fill="rgba(255,255,255,0.7)" />
        {[46, 58, 70].map((y, i) => (
          <g key={y}>
            <rect x="84" y={y} width={[70, 54, 62][i]} height="4" rx="2" fill="rgba(255,255,255,0.22)" />
            <rect x="160" y={y - 1} width="18" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
          </g>
        ))}
        <path d="M84 84H178" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 4" />
        <rect x="84" y="94" width="40" height="7" rx="3.5" fill="rgba(255,255,255,0.7)" />
        <rect x="138" y="90" width="40" height="16" rx="8" fill={accent} />
        <text x="158" y="102" textAnchor="middle" fontSize="9" fontWeight="800" fill="#03060d" fontFamily="ui-sans-serif, system-ui">€</text>
      </motion.g>
      <motion.g {...float(0.7, -6)}>
        <g transform="translate(196 40) rotate(-12)">
          <circle r="17" fill="#0f172a" stroke={accent} strokeWidth="2.5" />
          <path d="M-6 0l4 4 8-9" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </motion.g>
      <motion.g {...float(1.2, -5)}>
        <rect x="24" y="76" width="54" height="22" rx="11" fill="#0f172a" stroke="rgba(255,255,255,0.14)" />
        <text x="51" y="91" textAnchor="middle" fontSize="10" fontWeight="800" fill="rgba(255,255,255,0.8)" fontFamily="ui-sans-serif, system-ui">24h</text>
      </motion.g>
    </svg>
  );
}

function BuildArt({ accent }: { accent: string }) {
  const id = "step-build";
  return (
    <svg viewBox="0 0 260 130" className="h-auto w-full" aria-hidden>
      <StepDefs id={id} accent={accent} />
      <ellipse cx="130" cy="70" rx="110" ry="55" fill={`url(#${id}-glow)`} />
      <motion.g {...float(0, -4)}>
        <rect x="46" y="18" width="150" height="96" rx="10" fill="#0f172a" stroke="rgba(255,255,255,0.14)" />
        <rect x="46" y="18" width="150" height="18" rx="10" fill="#111a2c" />
        <circle cx="58" cy="27" r="2.5" fill="#f87171" /><circle cx="66" cy="27" r="2.5" fill="#fbbf24" /><circle cx="74" cy="27" r="2.5" fill="#34d399" />
        <rect x="60" y="48" width="70" height="8" rx="4" fill="rgba(255,255,255,0.75)" />
        <rect x="60" y="62" width="50" height="8" rx="4" fill={`url(#${id}-g)`} />
        <rect x="60" y="78" width="90" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="60" y="86" width="70" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <motion.rect x="60" y="96" width="44" height="12" rx="6" fill={accent} {...pulse()} />
        <rect x="142" y="48" width="42" height="60" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
        <path d="M150 100l10-14 8 8 6-6 4 12z" fill={accent} opacity="0.6" />
        <circle cx="172" cy="60" r="4" fill="#FBBF24" opacity="0.8" />
      </motion.g>
      <motion.g {...float(0.8, -6)}>
        <rect x="190" y="70" width="46" height="52" rx="8" fill="#0b1220" stroke="rgba(255,255,255,0.16)" />
        <rect x="204" y="76" width="18" height="3" rx="1.5" fill="#1e293b" />
        <rect x="197" y="86" width="32" height="5" rx="2.5" fill="rgba(255,255,255,0.7)" />
        <rect x="197" y="95" width="22" height="5" rx="2.5" fill={accent} />
        <rect x="197" y="106" width="32" height="8" rx="4" fill={`url(#${id}-g)`} />
      </motion.g>
      <motion.path d="M24 60l-8 8 8 8M40 60l8 8-8 8" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...pulse(0.6)} />
    </svg>
  );
}

function LaunchArt({ accent }: { accent: string }) {
  const id = "step-launch";
  return (
    <svg viewBox="0 0 260 130" className="h-auto w-full" aria-hidden>
      <StepDefs id={id} accent={accent} />
      <ellipse cx="130" cy="70" rx="110" ry="55" fill={`url(#${id}-glow)`} />
      {/* growth bars */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect key={i} x={40 + i * 22} width="14" rx="4" fill={i === 3 ? accent : `${accent}66`}
          initial={{ y: 108, height: 0 }} whileInView={{ y: 108 - (18 + i * 14), height: 18 + i * 14 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }} />
      ))}
      <path d="M36 108H132" stroke="rgba(255,255,255,0.14)" />
      {/* rocket */}
      <motion.g animate={{ y: [0, -10, 0], x: [0, 6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}>
        <g transform="translate(180 66) rotate(-40)">
          <path d="M0 -34c12 8 16 26 12 44H-12c-4-18 0-36 12-44z" fill={`url(#${id}-g)`} />
          <circle cy="-8" r="6" fill="#0f172a" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <path d="M-12 10l-12 12 4-22zM12 10l12 12-4-22z" fill={accent} opacity="0.8" />
          <motion.path d="M-6 12h12l-6 22z" fill="#FBBF24" animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.8, 1.2, 0.8] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ transformOrigin: "0px 12px" }} />
        </g>
      </motion.g>
      {/* sparkles */}
      {[[224, 30], [236, 62], [206, 20]].map(([x, y], i) => (
        <motion.path key={i} d={`M${x} ${y - 5}v10M${x - 5} ${y}h10`} stroke="#fff" strokeWidth="1.5" strokeLinecap="round" {...pulse(i * 0.4)} />
      ))}
    </svg>
  );
}

export function StepArt({ index, accent }: { index: number; accent: string }) {
  switch (index) {
    case 0: return <TalkArt accent={accent} />;
    case 1: return <OfferArt accent={accent} />;
    case 2: return <BuildArt accent={accent} />;
    default: return <LaunchArt accent={accent} />;
  }
}
