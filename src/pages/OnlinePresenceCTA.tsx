import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

type Tag = "Сайт" | "E-магазин" | "Дигитално меню";
type Country = "BG" | "NO" | "DE" | "ES";

type Project = {
  id: string;
  tag: Tag;
  title: string;
  desc: string;
  img: string;
  href?: string;
  country?: Country;
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
    desc: "Официален сайт на ресторант Chef Resat с акцент върху атмосферата, кухнята и ключова информация за посетители.",
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
    desc: "Платформа за турове с онлайн резервации и плащания, включително подаръчни ваучери, промокодове и отстъпки.",
    img: "/mototours.jpg",
    href: "https://www.24tours.bg/",
    country: "BG",
  },
  {
    id: "beca",
    tag: "Сайт",
    title: "BECA Umzugsservice",
    desc: "Корпоративен сайт за услуги по преместване и почистване в Мюнхен, Германия.",
    img: "/becca.jpg",
    href: "https://becaumzug.de/",
    country: "DE",
  },
  {
    id: "amalfi-menu",
    tag: "Дигитално меню",
    title: "Amalfi",
    desc: "Дигитално меню за ресторант Amalfi (Елверум, Норвегия) на норвежки и английски език. ",
    img: "/corected-amalfi.jpg",
    href: "https://www.amalfirestaurant.no/",
    country: "NO",
  },
  {
    id: "chef-resat-menu",
    tag: "Дигитално меню",
    title: "Chef Resat",
    desc: "Дигитално меню за ресторант Chef Resat на три езика – български, турски и английски.",
    img: "/chefresatcorected.jpg",
    href: "https://www.chefresatsofya.com/menu",
    country: "BG",
  },
  {
    id: "pancetita-menu",
    tag: "Дигитално меню",
    title: "Pizza Pancetita",
    desc: "Дигитално меню за ресторант Pizza Pancetita (Осло, Норвегия) на норвежки и английски език.",
    img: "/corectedpancetita.jpg",
    href: "https://pancetta.vercel.app/",
    country: "NO",
  },
  {
    id: "abi-studio",
    tag: "Сайт",
    title: "Abi Studio",
    desc: "Сайт за козметично студио във Варна с детайлни процедури, апаратури и цени.",
    img: "/abistudio1.jpg",
    href: "https://www.abistudiovarna.com/",
    country: "BG",
  },
  {
    id: "metesso",
    tag: "Сайт",
    title: "Metesso",
    desc: "Сайт за мебелен шоурум в Пловдив с каталог от колекции и решения за всяко пространство.",
    img: "/metesso1.jpg",
    href: "https://www.metesso.com/",
    country: "BG",
  },
  {
    id: "9-april-village",
    tag: "Сайт",
    title: "9 April Village",
    desc: "Сайт за къща за гости с информация за стаите, спа зоната, локацията и предстоящите събития.",
    img: "/9april.jpg",
    href: "https://9-aprill-village-h8bb.vercel.app/",
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
    tag: "E-магазин",
    title: "Azteca",
    desc: "Електронен магазин за премиум пури и запалки с онлайн поръчка и доставка.",
    img: "/aztecanew.jpg",
    href: "https://azteca-premium.com/",
    country: "BG",
  },
  {
    id: "dudo-group",
    tag: "Сайт",
    title: "Dudo Group",
    desc: "Сайт за строителен хипермаркет с каталог от материали за строителство и ремонт.",
    img: "/dudohip2.jpg",
    href: "https://d-group.bg/dudo-stroitelen/index.php",
    country: "BG",
  },
  {
    id: "shop4home",
    tag: "E-магазин",
    title: "Shop4Home",
    desc: "Онлайн магазин за дома с широк асортимент от продукти, удобна поръчка и лесно администриране на поръчки, продукти и категории.",
    img: "/shop111.jpg",
    href: "https://shop4home.bg/",
    country: "BG",
  },
  {
    id: "slapfight",
    tag: "E-магазин",
    title: "SlapFight Bulgaria",
    desc: "Онлайн платформа за продажба на билети за събития с бърза покупка и ясна информация за събитията.",
    img: "/slpbg.jpg",
    href: "https://slap-fight-bulgaria-nine.vercel.app/",
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
  "Сайт":           { accent: "#22D3EE", glow: "rgba(34,211,238,.18)" },
  "E-магазин":      { accent: "#34D399", glow: "rgba(52,211,153,.18)" },
  "Дигитално меню": { accent: "#A78BFA", glow: "rgba(167,139,250,.18)" },
};

const CATEGORY_ORDER: Tag[] = ["Сайт", "E-магазин", "Дигитално меню"];

// ── Category section divider ─────────────────────────────────────────────────
function CategoryHeader({ tag }: { tag: Tag }) {
  const theme = TAG_THEME[tag];
  return (
    <div className="mb-6 flex items-center gap-3">
      <span
        className="flex items-center justify-center rounded-lg p-2"
        style={{ background: `color-mix(in srgb,${theme.accent} 14%,transparent)`, color: theme.accent }}
      >
        <TagIcon tag={tag} />
      </span>
      <span className="text-[14px] font-bold tracking-wide text-slate-300">{tag}</span>
      <div
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg,color-mix(in srgb,${theme.accent} 40%,transparent),transparent)` }}
      />
    </div>
  );
}

// ── Cards grid ───────────────────────────────────────────────────────────────
function CardsGrid({ projects }: { projects: Project[] }) {
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
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--accent": theme.accent, "--glow": theme.glow } as React.CSSProperties}
              className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.045] to-white/[0.02] shadow-[0_18px_80px_-46px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-12 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(closest-side, var(--glow), transparent 70%)" }}
              />

              <div className={p.tag === "Дигитално меню" ? "overflow-hidden bg-[#0a0f1d]" : "aspect-[16/11] overflow-hidden"}>
                <img
                  src={p.img}
                  alt={p.title}
                  className={`w-full transition-transform duration-700 group-hover:scale-[1.02] ${p.tag === "Дигитално меню" ? "object-contain" : "h-full object-cover group-hover:scale-[1.05]"}`}
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

                  <span
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-semibold"
                    style={{
                      background: "color-mix(in srgb, var(--accent) 18%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
                      color: "color-mix(in srgb, var(--accent) 92%, white)",
                    }}
                  >
                    {p.tag === "Дигитално меню" ? "Виж менюто" : "Виж сайта"}
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M14 3h7v7M21 3l-9 9M10 5H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-4" />
                    </svg>
                  </span>
                </div>

                <h3 className="mt-4 text-[1.08rem] font-extrabold tracking-tight text-slate-100">{p.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300/90">{p.desc}</p>

                <div
                  aria-hidden
                  className="mt-4 h-px w-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 55%, transparent), transparent)",
                    opacity: 0.9,
                  }}
                />
              </div>
            </a>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function SectionWorkGalleryMinimal() {
  const [filter, setFilter] = useState<Tag | "Всички">("Всички");
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
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute -right-56 top-20 h-[500px] w-[500px] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle,#34D399 0%,transparent 65%)" }} />
        <div className="absolute -left-56 bottom-10 h-[420px] w-[420px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle,#22D3EE 0%,transparent 65%)" }} />
      </div>
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">

        {/* Header */}
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            проекти
          </span>
          <h2 className="mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100" style={{ textWrap: "balance" } as React.CSSProperties}>
            Проекти, с които{" "}
            <span style={{ background: "linear-gradient(110deg,#22d3ee 0%,#a78bfa 60%,#34d399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              се гордеем.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400" style={{ textWrap: "balance" } as React.CSSProperties}>
            Правим сайтове, които изглеждат премиум и не оставят място за „ами". Влизаш, разбираш, действаш.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <LayoutGroup id="workFilters">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} className="mt-8 flex justify-center">
            <div className="relative -my-2 w-full sm:w-auto">
              <div ref={tabsRef} className="no-scrollbar flex items-center justify-center gap-2 overflow-x-auto px-4 py-4 sm:overflow-visible sm:px-0">
                {(["Всички", "Сайт", "E-магазин", "Дигитално меню"] as const).map((t) => {
                  const active = filter === t;
                  const accent = t === "Сайт" ? "#22D3EE" : t === "E-магазин" ? "#34D399" : t === "Дигитално меню" ? "#A78BFA" : null;
                  return (
                    <button
                      key={t}
                      type="button"
                      data-active={active ? "true" : "false"}
                      onClick={() => setFilter(t)}
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
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </LayoutGroup>

        {/* Projects */}
        <AnimatePresence mode="wait">
          {filter === "Всички" ? (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-10 space-y-12"
            >
              {CATEGORY_ORDER.map((cat) => {
                const items = PROJECTS.filter((p) => p.tag === cat);
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
              <CardsGrid projects={PROJECTS.filter((p) => p.tag === filter)} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </section>
  );
}
