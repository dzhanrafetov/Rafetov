import { CSSProperties, ReactNode } from "react";

/**
 * Обща обвивка за правните страници — същият тъмен фон, hairline и типография
 * като останалата част от сайта, но с ширина, оптимизирана за четене.
 */
export default function LegalLayout({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main
      className="relative isolate min-h-screen overflow-hidden text-slate-300"
      style={{ backgroundColor: "#07090f", "--hairline": "#1a2234" } as CSSProperties}
    >
      {/* ── Background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
          [background-size:28px_28px]" />
        <div className="absolute -left-72 top-24 h-[600px] w-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle,#22D3EE 0%,transparent 65%)" }} />
        <div className="absolute -right-72 top-1/2 h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle,#A78BFA 0%,transparent 65%)" }} />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36">

        {/* ── Header ── */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
          {eyebrow}
        </span>

        <h1 className="mt-5 text-[clamp(1.7rem,5vw,2.6rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-slate-100"
          style={{ textWrap: "balance" } as CSSProperties}>
          {title}
        </h1>

        {intro && (
          <p className="mt-4 max-w-[62ch] text-[15.5px] leading-relaxed text-slate-400">
            {intro}
          </p>
        )}

        {updated && (
          <p className="mt-5 text-[12px] uppercase tracking-[0.14em] text-slate-600">
            Последна актуализация: <span className="text-slate-500">{updated}</span>
          </p>
        )}

        <div aria-hidden className="mt-10 h-px" style={{ backgroundColor: "var(--hairline)" }} />

        {/* ── Body ── */}
        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </main>
  );
}

/** Секция със заглавие и дискретен номер отляво. */
export function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-[19px] font-bold tracking-[-0.01em] text-slate-100 sm:text-[21px]">
        {title}
      </h2>
      <div className="mt-3 space-y-3.5 text-[15px] leading-[1.75] text-slate-400">
        {children}
      </div>
    </section>
  );
}

/** Списък с дискретни cyan маркери — в стила на footer-а. */
export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 rounded-full bg-slate-700" />
          <span className="min-w-0 flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Карта за подчертан блок (напр. данни за контакт с администратора). */
export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "linear-gradient(90deg,#22d3ee,#a78bfa,#34d399)", opacity: 0.45 }} />
      {children}
    </div>
  );
}

/** Вътрешен акцентиран линк/имейл. */
export function A({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="font-semibold text-slate-200 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-white hover:decoration-[#22D3EE]"
    >
      {children}
    </a>
  );
}
