import { useId } from "react";

export type FlagCode = "BG" | "DE" | "BE" | "GB" | "ES" | "NO";

/**
 * SVG знамена вместо емоджи — Windows не рисува емоджи знамена и показва само буквите („BG“, „DE“).
 * Рисуват се в 3:2 кутия; размерът и заоблянето идват от className.
 */
export default function Flag({ code, className = "" }: { code: FlagCode; className?: string }) {
  // clipPath id трябва да е уникален за всяка инстанция; двоеточията от useId чупят url(#…)
  const clipId = `gb-${useId().replace(/:/g, "")}`;

  let body: JSX.Element;
  let viewBox = "0 0 3 2";
  switch (code) {
    case "BG":
      body = (
        <>
          <rect width="3" height="2" fill="#fff" />
          <rect y="0.667" width="3" height="0.667" fill="#00966E" />
          <rect y="1.333" width="3" height="0.667" fill="#D62612" />
        </>
      );
      break;
    case "DE":
      body = (
        <>
          <rect width="3" height="0.667" fill="#000" />
          <rect y="0.667" width="3" height="0.667" fill="#DD0000" />
          <rect y="1.333" width="3" height="0.667" fill="#FFCE00" />
        </>
      );
      break;
    case "BE":
      body = (
        <>
          <rect width="1" height="2" fill="#000" />
          <rect x="1" width="1" height="2" fill="#FDDA24" />
          <rect x="2" width="1" height="2" fill="#EF3340" />
        </>
      );
      break;
    case "ES":
      body = (
        <>
          <rect width="3" height="2" fill="#AA151B" />
          <rect y="0.5" width="3" height="1" fill="#F1BF00" />
        </>
      );
      break;
    case "NO":
      viewBox = "0 0 22 16";
      body = (
        <>
          <rect width="22" height="16" fill="#BA0C2F" />
          <path d="M6 0h4v16H6zM0 6h22v4H0z" fill="#fff" />
          <path d="M7 0h2v16H7zM0 7h22v2H0z" fill="#00205B" />
        </>
      );
      break;
    case "GB":
      viewBox = "0 0 60 30";
      body = (
        <>
          <clipPath id={clipId}>
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clipId})`} stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </>
      );
      break;
  }

  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 overflow-hidden ring-1 ring-white/15 ${className}`}
      style={{ aspectRatio: "3 / 2" }}
    >
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
        {body}
      </svg>
    </span>
  );
}
