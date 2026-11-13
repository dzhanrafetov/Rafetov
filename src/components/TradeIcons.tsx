/**
 * Собствени икони на занаятите за страницата за строители (/stroitelstvo).
 * Една спецификация: мрежа 24, линия 2, прави ъгли (square/miter), един жълт елемент на икона.
 * Цветът идва отвън: currentColor за основата и --trade-accent за жълтия детайл.
 */
import type { ReactNode } from "react";

export type TradeKey = "roof" | "pvc" | "pergola" | "renovation" | "waterproof" | "drywall" | "solar" | "metal" | "excavation" | "survey";

const A = { stroke: "var(--trade-accent, #FFC20E)" } as const;

const PATHS: Record<TradeKey, ReactNode> = {
  roof: (
    <>
      <path d="M2 12 12 4l10 8" />
      <path d="M5 10v10h14V10" />
      <path style={A} d="M8 14h8M8 17h8" />
    </>
  ),
  pvc: (
    <>
      <rect x="4" y="3" width="16" height="18" />
      <path d="M12 3v18M4 12h16" />
      <path style={A} d="M14.5 8.5v4" />
    </>
  ),
  pergola: (
    <>
      <path d="M3 8h18M5 8v13M19 8v13" />
      <path style={A} d="M3 4h18M7 8V4M12 8V4M17 8V4" />
    </>
  ),
  renovation: (
    <>
      <rect x="3" y="3" width="12" height="6" />
      <path d="M15 6h4v6h-8v3" />
      <path style={A} d="M10 15h2v6h-2z" />
    </>
  ),
  waterproof: (
    <>
      <path d="M3 16h18M3 20h18" />
      <path style={A} d="M12 3c-2.5 3.5-4 5.5-4 7.5a4 4 0 0 0 8 0c0-2-1.5-4-4-7.5Z" />
    </>
  ),
  drywall: (
    <>
      <rect x="3" y="4" width="18" height="16" />
      <path d="M9 4v16M15 4v16" />
      <path style={A} d="M3 20h18" />
    </>
  ),
  solar: (
    <>
      <path d="M3 16 6 6h15l-3 10Z" />
      <path d="M4.5 11h15M10.5 6l-2.5 10M16 6l-2.5 10" />
      <path style={A} d="M9 21h6M12 16v5" />
    </>
  ),
  metal: (
    <>
      <path d="M3 20 12 4l9 16" />
      <path d="M7.5 12h9M12 4v16" />
      <path style={A} d="M2 20h20" />
    </>
  ),
  excavation: (
    <>
      <path d="M2 20h11v-4H4Z" />
      <path d="M9 16V10l7-5 5 6" />
      <path style={A} d="M21 11l-2 5h-4" />
    </>
  ),
  survey: (
    <>
      <path d="M12 8 6 21M12 8l6 13M12 8v13" />
      <path style={A} d="M9 3h6v5H9z" />
    </>
  ),
};

export default function TradeIcon({ name, className = "h-10 w-10" }: { name: TradeKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" aria-hidden>
      {PATHS[name]}
    </svg>
  );
}
