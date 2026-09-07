import { Fragment, type ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLang } from "../i18n";
import { parseInline } from "./inline";
import type { Block } from "./types";

const ACCENT = "#22D3EE";

function Inline({ text }: { text: string }) {
  const { href } = useLang();
  return (
    <>
      {parseInline(text).map((s, i) => {
        if (s.kind === "text") return <Fragment key={i}>{s.text}</Fragment>;
        if (s.kind === "bold") return <strong key={i} className="font-semibold text-slate-100">{s.text}</strong>;
        const cls = "font-semibold text-slate-100 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white hover:decoration-[#22D3EE]";
        if (s.href.startsWith("/")) {
          return <RouterLink key={i} to={href(s.href)} className={cls}>{s.text}</RouterLink>;
        }
        return <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={cls}>{s.text}</a>;
      })}
    </>
  );
}

function Bullet() {
  return (
    <span
      className="mt-[9px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
      style={{ background: `color-mix(in srgb, ${ACCENT} 15%, transparent)`, color: ACCENT }}
    >
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function renderBlock(b: Block, i: number): ReactNode {
  switch (b.type) {
    case "h2":
      return (
        <h2 key={i} className="mt-10 text-[clamp(1.2rem,2.6vw,1.45rem)] font-bold leading-snug tracking-normal text-slate-100">
          <Inline text={b.text} />
        </h2>
      );
    case "p":
      return (
        <p key={i} className="text-[16px] leading-[1.8] text-slate-400">
          <Inline text={b.text} />
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="space-y-3">
          {b.items.map((it, j) => (
            <li key={j} className="flex gap-3 text-[15.5px] leading-[1.75] text-slate-400">
              <Bullet />
              <span className="min-w-0 flex-1"><Inline text={it} /></span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="space-y-3">
          {b.items.map((it, j) => (
            <li key={j} className="flex gap-3 text-[15.5px] leading-[1.75] text-slate-400">
              <span
                className="mt-[5px] flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-black"
                style={{
                  background: `color-mix(in srgb, ${ACCENT} 14%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${ACCENT} 25%, transparent)`,
                  color: ACCENT,
                }}
              >
                {j + 1}
              </span>
              <span className="min-w-0 flex-1"><Inline text={it} /></span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] px-6 py-5 text-[17px] font-medium leading-relaxed text-slate-200"
        >
          <span aria-hidden className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full" style={{ background: `linear-gradient(180deg,#22d3ee,#a78bfa)` }} />
          <Inline text={b.text} />
        </blockquote>
      );
    case "tip":
      return (
        <div
          key={i}
          className="relative overflow-hidden rounded-2xl border px-5 py-4 text-[15px] leading-relaxed text-slate-300"
          style={{
            borderColor: "color-mix(in srgb, #FBBF24 25%, transparent)",
            background: "color-mix(in srgb, #FBBF24 6%, rgba(255,255,255,0.02))",
          }}
        >
          <Inline text={b.text} />
        </div>
      );
  }
}

export default function BlogBody({ blocks }: { blocks: Block[] }) {
  return <div className="space-y-6">{blocks.map(renderBlock)}</div>;
}
