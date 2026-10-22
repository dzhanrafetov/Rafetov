import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { useLang } from "../i18n";
import type { WorkTag } from "../i18n/types";
import { featuredFor, projectPath, projectsFor, type Project } from "../constants/projects";

type Tag = WorkTag;

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.05 * Math.min(i, 5), ease: [0.22, 1, 0.36, 1] },
  }),
};

function TagIcon({ tag }: { tag: Tag }) {
  if (tag === "shop")
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M6 7h15l-2 9H7L6 7Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M6 7 5 4H2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
      </svg>
    );
  if (tag === "platform")
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m3 13 9 5 9-5M3 17.5l9 5 9-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  if (tag === "menu")
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M7 4h10a2 2 0 0 1 2 2v14H5V6a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 8h8M8 12h8M8 16h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path d="M4 6h16v12H4V6Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M4 10h16" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8h.01M6 8h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const TAG_THEME: Record<Tag, { accent: string; glow: string }> = {
  site: { accent: "#22D3EE", glow: "rgba(34,211,238,.18)" },
  shop: { accent: "#34D399", glow: "rgba(52,211,153,.18)" },
  platform: { accent: "#FBBF24", glow: "rgba(251,191,36,.18)" },
  menu: { accent: "#A78BFA", glow: "rgba(167,139,250,.18)" },
};

const CATEGORY_ORDER: Tag[] = ["site", "shop", "platform", "menu"];

// ── Category section divider ─────────────────────────────────────────────────
function CategoryHeader({ tag }: { tag: Tag }) {
  const { t } = useLang();
  const theme = TAG_THEME[tag];
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className="flex items-center justify-center rounded-lg p-2"
        style={{ background: `color-mix(in srgb,${theme.accent} 14%,transparent)`, color: theme.accent }}
      >
        <TagIcon tag={tag} />
      </span>
      <span className="text-[14px] font-bold tracking-wide text-slate-300">{t.work.tags[tag]}</span>
      <div
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg,color-mix(in srgb,${theme.accent} 40%,transparent),transparent)` }}
      />
    </div>
  );
}

// ── Cards grid ───────────────────────────────────────────────────────────────
export function CardsGrid({ projects }: { projects: Project[] }) {
  const { t, href, lang } = useLang();
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => {
        const theme = TAG_THEME[p.tag];
        return (
          <motion.div
            key={p.id}
            variants={fade}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
            custom={i}
          >
            {/* Картата води към страницата на проекта (разтегнат линк отдолу); бутонът „Виж сайта“ е отделен външен линк отгоре. */}
            <div
              style={{ "--accent": theme.accent, "--glow": theme.glow } as React.CSSProperties}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.045] to-white/[0.02] shadow-[0_18px_80px_-46px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[var(--accent)]/60"
            >
              <RouterLink
                to={href(projectPath(p, lang))}
                aria-label={t.work.titles?.[p.id] ?? p.title}
                className="absolute inset-0 z-0 rounded-3xl focus-visible:outline-none"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-12 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(closest-side, var(--glow), transparent 70%)" }}
              />

              <div className={`pointer-events-none relative z-10 ${p.tag === "menu" ? "aspect-[2/3] overflow-hidden bg-[#0a0f1d]" : "aspect-[16/11] overflow-hidden"}`}>
                <img
                  src={p.img}
                  alt={t.work.titles?.[p.id] ?? p.title}
                  className={`w-full transition-transform duration-700 group-hover:scale-[1.02] ${p.tag === "menu" ? "object-contain" : "h-full object-cover group-hover:scale-[1.05]"}`}
                  width={900}
                  height={p.tag === "menu" ? 1350 : 589}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="pointer-events-none relative z-10 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        color: "var(--accent)",
                      }}
                    >
                      <TagIcon tag={p.tag} />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[12.5px] font-extrabold" style={{ color: "var(--accent)" }}>
                        {t.work.tags[p.tag]}
                      </div>
                      {p.country && (
                        <div className="truncate text-[12.5px] text-slate-300/70">{t.countries[p.country]}</div>
                      )}
                    </div>
                  </div>

                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto relative z-20 inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-semibold transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60"
                      style={{
                        background: "color-mix(in srgb, var(--accent) 18%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                        color: "color-mix(in srgb, var(--accent) 92%, white)",
                      }}
                    >
                      {p.tag === "menu" ? t.work.viewMenu : p.tag === "platform" ? t.work.viewPlatform : t.work.viewSite}
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M14 3h7v7M21 3l-9 9M10 5H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4" />
                      </svg>
                    </a>
                  )}
                </div>

                <h3 className="mt-4 text-[1.08rem] font-extrabold tracking-tight text-slate-100">{t.work.titles?.[p.id] ?? p.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300/90">{t.work.projects[p.id]}</p>

                <div
                  aria-hidden
                  className="mt-4 h-px w-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 55%, transparent), transparent)",
                    opacity: 0.9,
                  }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
/**
 * Шест избрани проекта (FEATURED), останалите се разгъват с бутон и филтър по категория.
 * Картите са същите като преди; само водят към страницата на проекта, а „Виж сайта“ отваря сайта на живо.
 */
/** `page`: отделната страница с всички проекти — h1, всичко разгънато, без бутон. */
export default function SectionWorkGalleryMinimal({ page = false }: { page?: boolean }) {
  const { t, lang } = useLang();
  const projects = projectsFor(lang);
  const featured = featuredFor(lang);
  const [showAll, setShowAll] = useState(page);
  const Heading = page ? "h1" : "h2";
  const [filter, setFilter] = useState<Tag | "all">("all");
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const didMount = useRef(false);

  const isMobile = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;

  const centerTab = useCallback((btn: HTMLElement, behavior: ScrollBehavior = "smooth") => {
    const wrap = tabsRef.current;
    if (!wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const delta = (btnRect.left - wrapRect.left) - (wrapRect.width / 2 - btnRect.width / 2);
    wrap.scrollTo({ left: wrap.scrollLeft + delta, behavior });
  }, []);

  useEffect(() => {
    if (!isMobile()) return;
    if (!didMount.current) { didMount.current = true; return; }
    const wrap = tabsRef.current;
    if (!wrap) return;
    const activeBtn = wrap.querySelector<HTMLButtonElement>('[data-active="true"]');
    if (activeBtn) requestAnimationFrame(() => centerTab(activeBtn, "smooth"));
  }, [filter, centerTab]);

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden text-slate-200"
      style={{ backgroundColor: "#07090f", ["--hairline" as any]: "#1a2234" } as React.CSSProperties}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className={`relative mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-24 ${page ? "pt-28 sm:pt-36" : "pt-16 sm:pt-24"}`}>

        {/* Header */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }} className="text-center">
          <Heading className="mx-auto max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100" style={{ textWrap: "balance" } as React.CSSProperties}>
            {t.work.h2a}{" "}
            <span className="gradient-text">
              {t.work.h2b}
            </span>
          </Heading>
          <p className="mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400" style={{ textWrap: "balance" } as React.CSSProperties}>
            {t.work.sub}
          </p>
        </motion.div>

        {/* Избраните шест */}
        {!showAll && (
          <div className="mt-10">
            <CardsGrid projects={featured} />
          </div>
        )}

        {/* Всички: филтър по категория + мрежи */}
        {showAll && (
          <>
            <LayoutGroup id="workFilters">
              <motion.div variants={fade} initial="hidden" animate="show" custom={1} className="mt-8 flex justify-center">
                <div className="relative -my-2 w-full sm:w-auto">
                  <div ref={tabsRef} className="no-scrollbar flex overflow-x-auto py-4 sm:overflow-visible">
                    <div className="mx-auto flex w-max items-center gap-2 px-4 sm:px-0">
                    {(["all", ...CATEGORY_ORDER.filter((c) => projects.some((p) => p.tag === c))] as const).map((tab) => {
                      const active = filter === tab;
                      const accent = tab === "all" ? null : TAG_THEME[tab].accent;
                      return (
                        <button
                          key={tab}
                          type="button"
                          data-active={active ? "true" : "false"}
                          onClick={() => setFilter(tab)}
                          className="relative isolate flex-none whitespace-nowrap h-10 rounded-full px-4 text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                          style={
                            active
                              ? accent
                                ? { background: `color-mix(in srgb,${accent} 18%,rgba(255,255,255,0.06))`, border: `1px solid color-mix(in srgb,${accent} 40%,transparent)`, color: accent, boxShadow: `0 0 18px -6px ${accent}` }
                                : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)", color: "#f1f5f9", boxShadow: "0 0 18px -6px rgba(255,255,255,0.2)" }
                              : accent
                                ? { background: `color-mix(in srgb,${accent} 7%,transparent)`, border: `1px solid color-mix(in srgb,${accent} 18%,transparent)`, color: `color-mix(in srgb,${accent} 60%,#94a3b8)` }
                                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }
                          }
                        >
                          {accent
                            ? <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle transition-opacity" style={{ background: accent, opacity: active ? 1 : 0.4 }} />
                            : <span aria-hidden className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: "linear-gradient(135deg,#22D3EE,#34D399,#A78BFA)", opacity: active ? 1 : 0.5 }} />
                          }
                          {tab === "all" ? t.work.all : t.work.tags[tab]}
                        </button>
                      );
                    })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </LayoutGroup>

            <AnimatePresence mode="wait">
              {filter === "all" ? (
                <motion.div
                  key="all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-10 space-y-12"
                >
                  {CATEGORY_ORDER.map((cat) => {
                    const items = projects.filter((p) => p.tag === cat);
                    if (!items.length) return null;
                    return (
                      <div key={cat}>
                        <CategoryHeader tag={cat} />
                        <CardsGrid projects={items} />
                      </div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key={filter}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-10"
                >
                  <CategoryHeader tag={filter as Tag} />
                  <CardsGrid projects={projects.filter((p) => p.tag === filter)} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Покажи всички / само избраните */}
        {!page && <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-7 text-[14px] font-semibold text-slate-200
                       transition-colors duration-200 hover:border-white/[0.18] hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
          >
            {showAll ? t.work.showLess : t.work.showAll.replace("{n}", String(projects.length))}
            <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>}

      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </section>
  );
}
