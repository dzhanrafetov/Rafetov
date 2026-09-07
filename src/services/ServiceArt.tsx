import { motion } from "framer-motion";
import type { ServiceId } from "./index";

/**
 * Илюстрации за hero секцията на страниците за услуги. Чист SVG без текст
 * (за да работи на всички езици), с лека, повтаряща се анимация.
 */

const float = (delay = 0, dy = -8) => ({
  animate: { y: [0, dy, 0] },
  transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
});

const pulse = (delay = 0) => ({
  animate: { opacity: [0.55, 1, 0.55] },
  transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay },
});

function Defs({ accent, id }: { accent: string; id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={accent} />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
      <linearGradient id={`${id}-btn`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#34d9f0" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#000" floodOpacity="0.55" />
      </filter>
    </defs>
  );
}

/** Панел/карта с тъмен фон и тънка рамка. */
function Panel(props: React.SVGProps<SVGRectElement>) {
  return <rect rx="14" fill="#0b1220" stroke="rgba(255,255,255,0.10)" {...props} />;
}

/* ───────────────────────── Сайт ───────────────────────── */
function SiteArt({ accent }: { accent: string }) {
  const id = "art-site";
  return (
    <svg viewBox="0 0 520 400" className="h-auto w-full" aria-hidden>
      <Defs accent={accent} id={id} />
      <circle cx="280" cy="200" r="190" fill={`url(#${id}-glow)`} />

      {/* Browser window */}
      <g filter={`url(#${id}-shadow)`}>
        <Panel x="40" y="40" width="360" height="270" />
        <rect x="40" y="40" width="360" height="34" rx="14" fill="#0f172a" />
        <rect x="40" y="60" width="360" height="14" fill="#0f172a" />
        <circle cx="62" cy="57" r="4" fill="#f87171" />
        <circle cx="76" cy="57" r="4" fill="#fbbf24" />
        <circle cx="90" cy="57" r="4" fill="#34d399" />
        <rect x="110" y="50" width="200" height="14" rx="7" fill="rgba(255,255,255,0.06)" />
        <circle cx="120" cy="57" r="3" fill={accent} opacity="0.9" />

        {/* nav */}
        <rect x="62" y="90" width="52" height="8" rx="4" fill={accent} opacity="0.9" />
        <rect x="250" y="90" width="26" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
        <rect x="284" y="90" width="26" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
        <rect x="318" y="90" width="26" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
        <rect x="352" y="86" width="30" height="14" rx="7" fill={`url(#${id}-btn)`} />

        {/* hero headline */}
        <rect x="62" y="122" width="180" height="16" rx="6" fill="rgba(255,255,255,0.85)" />
        <rect x="62" y="146" width="140" height="16" rx="6" fill={`url(#${id}-grad)`} />
        <rect x="62" y="174" width="200" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
        <rect x="62" y="186" width="160" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
        <motion.g {...pulse()}>
          <rect x="62" y="206" width="84" height="24" rx="12" fill={`url(#${id}-btn)`} />
          <rect x="82" y="216" width="44" height="4" rx="2" fill="#03060d" opacity="0.7" />
        </motion.g>
        <rect x="156" y="206" width="70" height="24" rx="12" fill="none" stroke="rgba(255,255,255,0.18)" />

        {/* hero image block */}
        <rect x="274" y="122" width="106" height="108" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
        <path d="M290 210 L318 176 L336 196 L352 182 L368 210 Z" fill={accent} opacity="0.55" />
        <circle cx="352" cy="150" r="9" fill="#FBBF24" opacity="0.8" />

        {/* cards row */}
        {[62, 172, 282].map((x, i) => (
          <g key={x}>
            <rect x={x} y="250" width="98" height="44" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
            <rect x={x + 10} y="260" width="14" height="14" rx="4" fill={i === 1 ? "#34D399" : accent} opacity="0.85" />
            <rect x={x + 32} y="262" width="46" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
            <rect x={x + 32} y="273" width="34" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
          </g>
        ))}
      </g>

      {/* Phone (mobile version) */}
      <motion.g {...float(0.6, -6)} filter={`url(#${id}-shadow)`}>
        <rect x="392" y="150" width="92" height="190" rx="18" fill="#0b1220" stroke="rgba(255,255,255,0.14)" />
        <rect x="418" y="160" width="40" height="6" rx="3" fill="#1e293b" />
        <rect x="404" y="180" width="52" height="8" rx="4" fill="rgba(255,255,255,0.8)" />
        <rect x="404" y="194" width="40" height="8" rx="4" fill={`url(#${id}-grad)`} />
        <rect x="404" y="210" width="68" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="404" y="219" width="56" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="404" y="234" width="68" height="18" rx="9" fill={`url(#${id}-btn)`} />
        <rect x="404" y="262" width="68" height="40" rx="8" fill="rgba(255,255,255,0.05)" />
        <rect x="404" y="310" width="68" height="18" rx="6" fill="rgba(255,255,255,0.05)" />
      </motion.g>

      {/* Google result badge */}
      <motion.g {...float(0, -9)} filter={`url(#${id}-shadow)`}>
        <rect x="24" y="318" width="176" height="52" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.12)" />
        <circle cx="50" cy="344" r="13" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
        <path d="M58 344h-8" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="72" y="332" width="64" height="7" rx="3.5" fill="rgba(255,255,255,0.85)" />
        <rect x="72" y="345" width="96" height="5" rx="2.5" fill="rgba(255,255,255,0.28)" />
        <rect x="72" y="355" width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.18)" />
        <rect x="150" y="326" width="38" height="16" rx="8" fill="#34D399" />
        <text x="169" y="338" textAnchor="middle" fontSize="10" fontWeight="800" fill="#03060d" fontFamily="ui-sans-serif, system-ui">#1</text>
      </motion.g>

      {/* Speed badge */}
      <motion.g {...float(1.2, -7)}>
        <rect x="300" y="24" width="120" height="30" rx="15" fill="#0f172a" stroke={`${accent}55`} />
        <path d="M318 39h10l-4 6 12-9h-10l4-6z" fill={accent} />
        <rect x="342" y="34" width="64" height="9" rx="4.5" fill="rgba(255,255,255,0.7)" />
      </motion.g>
    </svg>
  );
}

/* ─────────────────────── Онлайн магазин ─────────────────────── */
function ShopArt({ accent }: { accent: string }) {
  const id = "art-shop";
  return (
    <svg viewBox="0 0 520 400" className="h-auto w-full" aria-hidden>
      <Defs accent={accent} id={id} />
      <circle cx="260" cy="200" r="190" fill={`url(#${id}-glow)`} />

      {/* Phone with product grid */}
      <g filter={`url(#${id}-shadow)`}>
        <rect x="170" y="24" width="180" height="352" rx="28" fill="#0b1220" stroke="rgba(255,255,255,0.14)" />
        <rect x="230" y="36" width="60" height="8" rx="4" fill="#1e293b" />
        <rect x="190" y="60" width="70" height="10" rx="5" fill="rgba(255,255,255,0.8)" />
        <rect x="190" y="78" width="140" height="22" rx="11" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
        <circle cx="203" cy="89" r="5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        {/* products 2x2 */}
        {[
          [190, 112], [262, 112], [190, 214], [262, 214],
        ].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="68" height="90" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
            <rect x={x + 8} y={y + 8} width="52" height="44" rx="8" fill={i % 2 ? "#0f172a" : `${accent}33`} />
            <circle cx={x + 34} cy={y + 30} r="12" fill={i % 2 ? `${accent}66` : "#FBBF24"} opacity="0.85" />
            <rect x={x + 8} y={y + 60} width="36" height="5" rx="2.5" fill="rgba(255,255,255,0.6)" />
            <rect x={x + 8} y={y + 71} width="22" height="7" rx="3.5" fill={accent} />
            <rect x={x + 44} y={y + 66} width="16" height="16" rx="8" fill={`url(#${id}-btn)`} />
            <path d={`M${x + 49} ${y + 74}h6M${x + 52} ${y + 71}v6`} stroke="#03060d" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ))}
        {/* bottom bar */}
        <rect x="190" y="316" width="140" height="36" rx="18" fill={`url(#${id}-btn)`} />
        <rect x="222" y="331" width="76" height="6" rx="3" fill="#03060d" opacity="0.7" />
      </g>

      {/* Cart badge */}
      <motion.g {...float(0.3, -8)} filter={`url(#${id}-shadow)`}>
        <circle cx="350" cy="60" r="28" fill="#0f172a" stroke={`${accent}66`} />
        <path d="M338 52h18l-2.5 11h-12z" fill="none" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M338 52l-1.5-4h-3" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="343" cy="68" r="1.6" fill={accent} />
        <circle cx="352" cy="68" r="1.6" fill={accent} />
        <circle cx="368" cy="44" r="10" fill="#f87171" />
        <text x="368" y="48" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="ui-sans-serif, system-ui">3</text>
      </motion.g>

      {/* Payment card */}
      <motion.g {...float(0.9, -7)} filter={`url(#${id}-shadow)`}>
        <rect x="20" y="70" width="150" height="92" rx="14" fill={`url(#${id}-grad)`} opacity="0.95" />
        <rect x="34" y="88" width="28" height="20" rx="4" fill="rgba(255,255,255,0.35)" />
        <rect x="34" y="122" width="96" height="7" rx="3.5" fill="rgba(3,6,13,0.45)" />
        <rect x="34" y="138" width="50" height="6" rx="3" fill="rgba(3,6,13,0.35)" />
        <circle cx="140" cy="140" r="9" fill="rgba(255,255,255,0.55)" />
        <circle cx="152" cy="140" r="9" fill="rgba(255,255,255,0.35)" />
      </motion.g>

      {/* Paid check */}
      <motion.g {...pulse(0.5)}>
        <rect x="36" y="184" width="118" height="34" rx="17" fill="#0f172a" stroke="#34D39966" />
        <circle cx="54" cy="201" r="9" fill="#34D399" />
        <path d="M49.5 201l3 3 6-6" fill="none" stroke="#03060d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="70" y="197" width="66" height="8" rx="4" fill="rgba(255,255,255,0.7)" />
      </motion.g>

      {/* Delivery truck card */}
      <motion.g {...float(1.5, -9)} filter={`url(#${id}-shadow)`}>
        <rect x="360" y="240" width="140" height="70" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.12)" />
        <path d="M378 262h34v22h-34zM412 268h12l8 8v8h-20z" fill="none" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="386" cy="288" r="4" fill="#0f172a" stroke={accent} strokeWidth="2.2" />
        <circle cx="420" cy="288" r="4" fill="#0f172a" stroke={accent} strokeWidth="2.2" />
        <rect x="444" y="262" width="42" height="7" rx="3.5" fill="rgba(255,255,255,0.7)" />
        <rect x="444" y="276" width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
        <motion.path d="M366 300h40" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
      </motion.g>

      {/* Sales chart */}
      <motion.g {...float(0.2, -6)} filter={`url(#${id}-shadow)`}>
        <rect x="372" y="90" width="124" height="120" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.12)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i}
            x={388 + i * 20}
            width="12"
            rx="3"
            fill={i === 4 ? accent : `${accent}66`}
            initial={{ y: 190, height: 0 }}
            animate={{ y: 190 - (28 + i * 14), height: 28 + i * 14 }}
            transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        <rect x="388" y="104" width="40" height="7" rx="3.5" fill="rgba(255,255,255,0.6)" />
      </motion.g>
    </svg>
  );
}

/* ─────────────────────── Дигитално меню ─────────────────────── */
const QR = [
  "1111111010111111",
  "1000001001100001",
  "1011101101101110",
  "1011101011101110",
  "1011101100101110",
  "1000001010100001",
  "1111111010111111",
  "0000000110000000",
  "1101011011011010",
  "0110100100110101",
  "1010110011001110",
  "0000000101110011",
  "1111111000101010",
  "1000001110011101",
  "1011101011100110",
  "1011101100111011",
];

function MenuArt({ accent }: { accent: string }) {
  const id = "art-menu";
  const cell = 6;
  return (
    <svg viewBox="0 0 520 400" className="h-auto w-full" aria-hidden>
      <Defs accent={accent} id={id} />
      <circle cx="260" cy="200" r="190" fill={`url(#${id}-glow)`} />

      {/* Phone with menu */}
      <g filter={`url(#${id}-shadow)`}>
        <rect x="150" y="24" width="180" height="352" rx="28" fill="#0b1220" stroke="rgba(255,255,255,0.14)" />
        <rect x="210" y="36" width="60" height="8" rx="4" fill="#1e293b" />
        {/* header image */}
        <rect x="150" y="52" width="180" height="70" fill={`${accent}22`} />
        <circle cx="300" cy="80" r="16" fill="#FBBF24" opacity="0.8" />
        <rect x="168" y="96" width="90" height="10" rx="5" fill="rgba(255,255,255,0.85)" />
        {/* category tabs */}
        {[168, 214, 262].map((x, i) => (
          <rect key={x} x={x} y="134" width="40" height="16" rx="8" fill={i === 0 ? accent : "rgba(255,255,255,0.06)"} stroke={i === 0 ? "none" : "rgba(255,255,255,0.1)"} />
        ))}
        {/* dishes */}
        {[164, 216, 268].map((y, i) => (
          <g key={y}>
            <rect x="166" y={y} width="148" height="44" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
            <rect x="174" y={y + 7} width="30" height="30" rx="7" fill={["#FBBF24", "#f87171", "#34D399"][i]} opacity="0.75" />
            <rect x="212" y={y + 10} width="60" height="6" rx="3" fill="rgba(255,255,255,0.7)" />
            <rect x="212" y={y + 22} width="42" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
            <rect x="282" y={y + 12} width="24" height="10" rx="5" fill={accent} opacity="0.9" />
            <text x="294" y={y + 20} textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#03060d" fontFamily="ui-sans-serif, system-ui">€</text>
            <circle cx="222" cy={y + 34} r="2.5" fill="rgba(255,255,255,0.3)" />
            <circle cx="230" cy={y + 34} r="2.5" fill="rgba(255,255,255,0.3)" />
          </g>
        ))}
        <rect x="166" y="320" width="148" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
        <rect x="166" y="332" width="100" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
      </g>

      {/* QR card with scan line */}
      <motion.g {...float(0.4, -8)} filter={`url(#${id}-shadow)`}>
        <rect x="360" y="60" width="136" height="150" rx="16" fill="#0f172a" stroke={`${accent}66`} />
        <rect x="380" y="76" width="96" height="96" rx="8" fill="#fff" />
        <g fill="#0b1220">
          {QR.map((row, r) =>
            row.split("").map((c, col) =>
              c === "1" ? <rect key={`${r}-${col}`} x={380 + col * cell} y={76 + r * cell} width={cell} height={cell} /> : null,
            ),
          )}
        </g>
        <motion.rect x="380" width="96" height="3" rx="1.5" fill={accent} opacity="0.9" animate={{ y: [78, 168, 78] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} />
        <rect x="392" y="184" width="72" height="8" rx="4" fill="rgba(255,255,255,0.6)" />
      </motion.g>

      {/* Language chips */}
      <motion.g {...float(1, -6)}>
        {[["BG", 28, 96], ["EN", 78, 96], ["DE", 128, 96]].map(([l, x, y], i) => (
          <g key={l}>
            <rect x={x as number} y={y as number} width="42" height="26" rx="13" fill={i === 1 ? accent : "#0f172a"} stroke={i === 1 ? "none" : "rgba(255,255,255,0.14)"} />
            <text x={(x as number) + 21} y={(y as number) + 17} textAnchor="middle" fontSize="11" fontWeight="800" fill={i === 1 ? "#03060d" : "rgba(255,255,255,0.75)"} fontFamily="ui-sans-serif, system-ui">{l}</text>
          </g>
        ))}
      </motion.g>

      {/* Price edit card */}
      <motion.g {...float(1.6, -9)} filter={`url(#${id}-shadow)`}>
        <rect x="20" y="200" width="150" height="72" rx="14" fill="#0f172a" stroke="rgba(255,255,255,0.12)" />
        <rect x="36" y="216" width="60" height="7" rx="3.5" fill="rgba(255,255,255,0.7)" />
        <rect x="36" y="232" width="38" height="20" rx="6" fill={`${accent}33`} stroke={`${accent}88`} />
        <text x="55" y="246" textAnchor="middle" fontSize="10" fontWeight="800" fill={accent} fontFamily="ui-sans-serif, system-ui">€</text>
        <path d="M118 230l16-16 8 8-16 16h-8z" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinejoin="round" />
        <motion.circle cx="150" cy="222" r="5" fill="#34D399" {...pulse(0.2)} />
      </motion.g>

      {/* Table sign */}
      <motion.g {...float(0.7, -5)} filter={`url(#${id}-shadow)`}>
        <rect x="372" y="250" width="110" height="86" rx="12" fill="#0f172a" stroke="rgba(255,255,255,0.12)" />
        <rect x="392" y="266" width="34" height="34" rx="4" fill="#fff" />
        <g fill="#0b1220">
          {QR.slice(0, 8).map((row, r) =>
            row.slice(0, 8).split("").map((c, col) =>
              c === "1" ? <rect key={`${r}-${col}`} x={392 + col * 4.25} y={266 + r * 4.25} width="4.25" height="4.25" /> : null,
            ),
          )}
        </g>
        <rect x="434" y="270" width="34" height="6" rx="3" fill="rgba(255,255,255,0.6)" />
        <rect x="434" y="282" width="24" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
        <rect x="392" y="310" width="76" height="6" rx="3" fill={`${accent}88`} />
      </motion.g>
    </svg>
  );
}

/* ───────────────────────── Реклама ───────────────────────── */
function AdsArt({ accent }: { accent: string }) {
  const id = "art-ads";
  const pts = [40, 64, 52, 86, 78, 118, 104, 140, 150];
  const path = pts.map((v, i) => `${i === 0 ? "M" : "L"}${60 + i * 34} ${190 - v * 0.75}`).join(" ");
  return (
    <svg viewBox="0 0 520 400" className="h-auto w-full" aria-hidden>
      <Defs accent={accent} id={id} />
      <circle cx="260" cy="200" r="190" fill={`url(#${id}-glow)`} />

      {/* Dashboard */}
      <g filter={`url(#${id}-shadow)`}>
        <Panel x="30" y="60" width="340" height="230" />
        <rect x="52" y="82" width="90" height="9" rx="4.5" fill="rgba(255,255,255,0.8)" />
        <rect x="52" y="98" width="60" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
        <rect x="284" y="80" width="64" height="22" rx="11" fill="#34D39922" stroke="#34D39966" />
        <path d="M296 91l4 4 8-8" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
        <rect x="312" y="88" width="26" height="6" rx="3" fill="#34D399" opacity="0.8" />
        {/* grid lines */}
        {[130, 160, 190].map((y) => (
          <path key={y} d={`M52 ${y}H348`} stroke="rgba(255,255,255,0.05)" />
        ))}
        {/* area + line */}
        <motion.path d={`${path} L332 190 L60 190 Z`} fill={`url(#${id}-grad)`} opacity="0.18" initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: 1.2, delay: 0.6 }} />
        <motion.path d={path} fill="none" stroke={`url(#${id}-grad)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: "easeOut" }} />
        <motion.circle cx="332" cy={190 - 150 * 0.75} r="6" fill={accent} {...pulse()} />
        {/* KPI tiles */}
        {[52, 152, 252].map((x, i) => (
          <g key={x}>
            <rect x={x} y="212" width="96" height="58" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
            <rect x={x + 12} y="224" width="40" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
            <rect x={x + 12} y="238" width={[50, 36, 60][i]} height="12" rx="4" fill={["#fff", accent, "#34D399"][i]} opacity={i === 0 ? 0.85 : 0.9} />
            <path d={`M${x + 68} 246l6-8 6 8`} fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
          </g>
        ))}
      </g>

      {/* Google node */}
      <motion.g {...float(0.2, -8)} filter={`url(#${id}-shadow)`}>
        <circle cx="420" cy="80" r="30" fill="#0f172a" stroke="rgba(255,255,255,0.14)" />
        <text x="420" y="90" textAnchor="middle" fontSize="28" fontWeight="800" fill="#fff" fontFamily="ui-sans-serif, system-ui">G</text>
        <circle cx="443" cy="60" r="5" fill="#4285F4" /><circle cx="449" cy="72" r="5" fill="#EA4335" />
        <circle cx="449" cy="88" r="5" fill="#FBBC05" /><circle cx="443" cy="100" r="5" fill="#34A853" />
      </motion.g>

      {/* Meta node */}
      <motion.g {...float(1.1, -8)} filter={`url(#${id}-shadow)`}>
        <circle cx="440" cy="190" r="30" fill="#0f172a" stroke="rgba(255,255,255,0.14)" />
        <path d="M424 198c0-14 6-22 11-22 5 0 8 22 12 22s6-22 11-22c4 0 8 8 8 22" fill="none" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      {/* connectors */}
      {[
        "M390 92 C 372 110, 372 120, 360 128",
        "M410 190 C 392 190, 380 176, 370 168",
      ].map((d) => (
        <motion.path key={d} d={d} fill="none" stroke={accent} strokeWidth="2" strokeDasharray="5 7" strokeLinecap="round" animate={{ strokeDashoffset: [0, -24] }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />
      ))}

      {/* Phone with call notification */}
      <motion.g {...float(0.6, -7)} filter={`url(#${id}-shadow)`}>
        <rect x="392" y="240" width="96" height="140" rx="18" fill="#0b1220" stroke="rgba(255,255,255,0.14)" />
        <rect x="420" y="250" width="40" height="6" rx="3" fill="#1e293b" />
        <rect x="402" y="270" width="76" height="44" rx="10" fill="#0f172a" stroke={`${accent}66`} />
        <circle cx="418" cy="292" r="9" fill="#34D399" />
        <path d="M414 289c1 4 4 7 8 8l2-2c.5-.5 1.2-.5 1.7 0l1.5 1.5c.5.5.5 1.3 0 1.8l-1 1c-.6.6-1.5.8-2.3.5-5-1.8-9-5.8-10.7-10.8-.3-.8-.1-1.7.5-2.3l1-1c.5-.5 1.3-.5 1.8 0l1.5 1.5c.5.5.5 1.2 0 1.7l-2 2" fill="#03060d" />
        <rect x="432" y="284" width="38" height="6" rx="3" fill="rgba(255,255,255,0.8)" />
        <rect x="432" y="296" width="26" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
        <rect x="402" y="324" width="76" height="20" rx="6" fill="rgba(255,255,255,0.05)" />
        <rect x="402" y="350" width="76" height="20" rx="6" fill="rgba(255,255,255,0.05)" />
        <motion.circle cx="474" cy="270" r="7" fill="#f87171" {...pulse(0.4)} />
      </motion.g>

      {/* Target badge */}
      <motion.g {...float(1.4, -6)}>
        <circle cx="70" cy="330" r="26" fill="#0f172a" stroke={`${accent}66`} />
        <circle cx="70" cy="330" r="16" fill="none" stroke={accent} strokeWidth="2" />
        <circle cx="70" cy="330" r="8" fill="none" stroke={accent} strokeWidth="2" />
        <circle cx="70" cy="330" r="2.5" fill={accent} />
        <rect x="106" y="318" width="90" height="24" rx="12" fill="#0f172a" stroke="rgba(255,255,255,0.12)" />
        <rect x="118" y="327" width="66" height="6" rx="3" fill="rgba(255,255,255,0.6)" />
      </motion.g>
    </svg>
  );
}

export default function ServiceIllustration({ id, accent }: { id: ServiceId; accent: string }) {
  switch (id) {
    case "site": return <SiteArt accent={accent} />;
    case "shop": return <ShopArt accent={accent} />;
    case "menu": return <MenuArt accent={accent} />;
    case "ads": return <AdsArt accent={accent} />;
  }
}
