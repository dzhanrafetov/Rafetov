import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
type Tag = "Сайт" | "E-магазин" | "Дигитално меню";
type Country = "BG" | "NO" | "DE" | "ES";

type Project = {
  id: string;
  tag: Tag;
  title: string;
  desc: string;
  img: string;
  href?: string;
  country?: Country; // ще го покажем като текст (не флаг)
};

const COUNTRY: Record<Country, { name: string }> = {
  BG: { name: "България" },
  NO: { name: "Норвегия" },
  DE: { name: "Германия" },
  ES: { name: "Испания" },
};

const PROJECTS: Project[] = [
  {
    id: "chef-resat-site",
    tag: "Сайт",
    title: "Chef Resat",
    desc: "Официален сайт на ресторант Chef Resat с акцент върху атмосферата, кухнята и ключова информация за посетители. ",
    img: "/rft.jpg",
    href: "https://www.chefresatsofya.com/",
    country: "BG",
  },
  {
    id: "zirve1",
    tag: "E-магазин",
    title: "Zirve1",
    desc: "Официален електронен магазин за металдетектори Zirve1 с онлайн поръчка и доставка до държави в Европа.",
    img: "/ztest.jpg",
    href: "https://www.zirve1.bg/",
    country: "BG",
  },
  {
    id: "santander",
    tag: "Сайт",
    title: "Alp Taxi Santander",
    desc: "Сайт за такси услуги в Сантандер, Испания, с бърза форма за резервация и изпращане на заявка.",
    img: "/sndr.jpg",
    href: "https://taxisantander.online/",
    country: "ES",
  },
  {
    id: "24tours",
    tag: "E-магазин",
    title: "24Tours",
    desc: "Платформа за турове с онлайн резервации и плащания, включително подаръчни ваучери, промокодове и отстъпки. ",
    img: "/mototours.jpg",
    href: "https://www.24tours.bg/",
    country: "BG",
  },
  {
    id: "beca",
    tag: "Сайт",
    title: "BECA Umzugsservice",
    desc: "Корпоративен сайт за услуги по преместване и почистване в Мюнхен, Германия. ",
    img: "/km5.jpg",
    href: "https://becaumzug.de/",
    country: "DE",
  },
  {
    id: "amalfi-menu",
    tag: "Дигитално меню",
    title: "Amalfi",
    desc: "Дигитално меню за ресторант Amalfi (Елверум, Норвегия) на норвежки и английски език. Включва категории, бързо разглеждане и опция за харесване на ястия за по-лесна поръчка.",
    img: "/amalfi.jpg",
    href: "https://www.amalfirestaurant.no/",
    country: "NO",
  },
  {
    id: "chef-resat-menu",
    tag: "Дигитално меню",
    title: "Chef Resat",
    desc: "Дигитално меню за ресторант Chef Resat на три езика – български, турски и английски. Структурирани категории и удобно преживяване на мобилни устройства.",
    img: "/dijitalMenuch.jpg",
    href: "https://www.chefresatsofya.com/menu",
    country: "BG",
  },
  {
    id: "taupe",
    tag: "Сайт",
    title: "Taupe",
    desc: "Сайт за имоти в Горубляне, София, с представяне на проекта и форма за запитване.",
    img: "/taupe1.jpg",
    href: "https://www.taupe.bg/",
    country: "BG",
  },
  {
    id: "azteca-site",
    tag: "Сайт",
    title: "Azteca",
    desc: "Презентационен сайт за шоурум Azteca с премиум селекция от пури и запалки.",
    img: "/aztecaf.jpg",
    href: "https://azteca-premium.com/",
    country: "BG",
  },
  {
    id: "slapfight",
    tag: "E-магазин",
    title: "SlapFight Bulgaria",
    desc: "Онлайн платформа за продажба на билети за събития с бърза покупка и ясна информация за събитията.",
    img: "/slpbg.jpg",
    href: "https://www.slapfightbulgaria.com/",
    country: "BG",
  },
];

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

function TagIcon({ tag }: { tag: Tag }) {
  if (tag === "E-магазин")
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path d="M6 7h15l-2 9H7L6 7Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M6 7 5 4H2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
      </svg>
    );
  if (tag === "Дигитално меню")
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
  "Сайт": { accent: "#22D3EE", glow: "rgba(34,211,238,.18)" },
  "E-магазин": { accent: "#34D399", glow: "rgba(52,211,153,.18)" },
  "Дигитално меню": { accent: "#A78BFA", glow: "rgba(167,139,250,.18)" },
};

export default function SectionWorkGalleryMinimal() {
  const [filter, setFilter] = useState<Tag | "Всички">("Всички");
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  // IMPORTANT: useRef трябва да е вътре в component
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(
    () => (filter === "Всички" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter)),
    [filter]
  );

  const hasItems = filtered.length > 0;

  const openAt = useCallback(
    (idx: number) => {
      if (!hasItems) return;
      setLightbox({ open: true, index: Math.max(0, Math.min(idx, filtered.length - 1)) });
    },
    [hasItems, filtered.length]
  );

  const close = useCallback(() => setLightbox({ open: false, index: 0 }), []);

  const next = useCallback(() => {
    if (!hasItems) return;
    setLightbox((v) => ({ open: true, index: (v.index + 1) % filtered.length }));
  }, [hasItems, filtered.length]);

  const prev = useCallback(() => {
    if (!hasItems) return;
    setLightbox((v) => ({ open: true, index: (v.index - 1 + filtered.length) % filtered.length }));
  }, [hasItems, filtered.length]);

  // Auto-center active tab on mobile when filter changes
const didMount = useRef(false);

useEffect(() => {
  if (typeof window === "undefined") return;
  if (!window.matchMedia("(max-width: 639px)").matches) return;

  // ✅ не скролвай при първото зареждане
  if (!didMount.current) {
    didMount.current = true;
    return;
  }

  const wrap = tabsRef.current;
  if (!wrap) return;

  const activeBtn = wrap.querySelector<HTMLButtonElement>('[data-active="true"]');
  if (!activeBtn) return;

  requestAnimationFrame(() => {
    // по-добре без smooth тук
    activeBtn.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" });
  });
}, [filter]);

  useEffect(() => {
    if (!lightbox.open) return;
    if (!hasItems) {
      close();
      return;
    }
    if (lightbox.index > filtered.length - 1) {
      setLightbox((v) => ({ ...v, index: filtered.length - 1 }));
    }
  }, [filter, filtered.length, hasItems, lightbox.open, lightbox.index, close]);

  useEffect(() => {
    if (!lightbox.open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, close, next, prev]);

  useEffect(() => {
    if (!lightbox.open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox.open]);

  const activeProject = hasItems ? filtered[lightbox.index] : undefined;

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden text-slate-200"
      style={
        {
          backgroundColor: "#0b0f19",
          ["--hairline" as any]: "#1f2937",
        } as React.CSSProperties
      }
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">
        <motion.div variants={fade} initial="hidden" animate="show" className="text-center">
          <div className="mx-auto mb-3 w-fit text-[12px] uppercase tracking-[0.18em] text-slate-400">проекти</div>

          <h2 className="balance mx-auto max-w-[26ch] text-[clamp(1.9rem,5.8vw,2.6rem)] font-extrabold leading-[1.06] tracking-tight text-slate-100">
            Това са проектите, с които се гордеем.
          </h2>

          <p className="balance mx-auto mt-4 max-w-[50ch] text-[15.5px] leading-relaxed text-slate-300">
            Правим сайтове, които изглеждат премиум и не оставят място за „ами“. Влизаш, разбираш, действаш.
          </p>
        </motion.div>

      <LayoutGroup id="workFilters">
  <motion.div variants={fade} initial="hidden" animate="show" custom={1} className="mt-8 flex justify-center">
    <div className="w-full px-2 sm:w-auto sm:px-0">
      <div
        className="
          relative w-full sm:w-fit
          rounded-3xl sm:rounded-full
          border border-slate-700/60 bg-[#0f1424]/80 p-1.5
          shadow-[0_12px_50px_-28px_rgba(0,0,0,0.85)]
          backdrop-blur
        "
      >
        {/* mobile row separator (subtle “seam”) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-4 right-4 top-[50%] hidden max-[639px]:block"
          style={{ height: 1, background: "rgba(148,163,184,0.18)" }}
        />

        <div
          ref={tabsRef}
          className="
            no-scrollbar
            flex flex-wrap sm:flex-nowrap
            items-center gap-2
            overflow-visible sm:overflow-visible
            justify-center
            scroll-smooth px-1
          "
        >
          {(["Всички", "Сайт", "E-магазин", "Дигитално меню"] as const).map((t) => {
            const active = filter === t;
            const isMenu = t === "Дигитално меню";

            return (
              <div
                key={t}
                className={`
                  ${isMenu ? "basis-full flex justify-center sm:basis-auto" : "basis-auto"}
                `}
              >
                <button
                  data-active={active ? "true" : "false"}
                  onClick={(e) => {
                    setFilter(t);

                    // ако искаш да центрира долния ред при клик (mobile):
                    if (typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches) {
                      requestAnimationFrame(() => {
                        e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                      });
                    }
                  }}
                  className="
                    relative isolate flex-none whitespace-nowrap
                    h-10 rounded-full px-4
                    text-[13px] sm:text-sm font-semibold
                    transition
                    text-slate-200/90 hover:text-slate-100
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25
                  "
                >
                  {active && (
                    <motion.span
                      layoutId="workFilterPill"
                      transition={{ type: "spring", stiffness: 520, damping: 38 }}
                      className="
                        absolute inset-0 -z-10 rounded-full
                        bg-white/90
                        shadow-[0_14px_34px_-22px_rgba(255,255,255,0.75)]
                      "
                    />
                  )}

                  <span className={active ? "text-slate-900" : ""}>{t}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </motion.div>
</LayoutGroup>

        {!hasItems ? (
          <div className="mt-10 rounded-3xl border border-slate-700/60 bg-[#0f1424] p-8 text-center text-slate-300">
            Няма добавени проекти за този филтър.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => {
              const theme = TAG_THEME[p.tag];

              return (
                <motion.article
                  key={p.id}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i + 2}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openAt(i);
                  }}
                  onClick={() => openAt(i)}
                  style={
                    {
                      ["--accent" as any]: theme.accent,
                      ["--glow" as any]: theme.glow,
                    } as React.CSSProperties
                  }
                  className="
                    group relative overflow-hidden rounded-3xl
                    border border-white/10
                    bg-gradient-to-b from-white/[0.045] to-white/[0.02]
                    shadow-[0_18px_80px_-46px_rgba(0,0,0,0.9)]
                    transition-all duration-300 hover:-translate-y-1
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60
                    cursor-pointer
                  "
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-12 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(closest-side, var(--glow), transparent 70%)" }}
                  />

                  <div className="aspect-[16/11] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="p-5">
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
                            {p.tag}
                          </div>
                          {p.country && (
                            <div className="truncate text-[12.5px] text-slate-300/70">{COUNTRY[p.country].name}</div>
                          )}
                        </div>
                      </div>

                      {p.href && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="
                            inline-flex shrink-0 items-center gap-2 rounded-full
                            px-3.5 py-2 text-[12.5px] font-semibold
                            transition hover:brightness-110
                          "
                          style={{
                            background: "color-mix(in srgb, var(--accent) 18%, transparent)",
                            border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                            color: "color-mix(in srgb, var(--accent) 92%, white)",
                          }}
                        >
                          Виж сайта
                          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                            <path d="M14 3h7v7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M21 3l-9 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path
                              d="M10 5H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </a>
                      )}
                    </div>

                    <h3 className="mt-4 text-[1.08rem] font-extrabold tracking-tight text-slate-100">{p.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300/90 lineclamp-3">{p.desc}</p>

                    <div
                      aria-hidden
                      className="mt-4 h-px w-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 55%, transparent), transparent)",
                        opacity: 0.9,
                      }}
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightbox.open && hasItems && activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-[2px]"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Затвори"
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-slate-100 hover:bg-white/10"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Предишен"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 p-3 text-slate-100 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Следващ"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 p-3 text-slate-100 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <div className="mx-auto w-full max-w-6xl px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeProject.img}
              alt={activeProject.title}
              className="max-h-[76vh] w-full rounded-2xl object-contain ring-1 ring-white/10"
            />

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="truncate text-[14px] text-slate-200/90">
                  {activeProject.tag} · {activeProject.title}
                  <span className="ml-2 text-slate-300/60">
                    ({lightbox.index + 1}/{filtered.length})
                  </span>
                </div>
                <div className="mt-1 text-[13.5px] leading-relaxed text-slate-300/90">{activeProject.desc}</div>
              </div>

              {!!activeProject.href && (
                <a
                  href={activeProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit rounded-full bg-white/90 px-4 py-2 text-[13px] font-semibold text-slate-900 transition hover:brightness-110"
                >
                  Виж сайта
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .balance { text-wrap: balance; }

        .lineclamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </section>
  );
}