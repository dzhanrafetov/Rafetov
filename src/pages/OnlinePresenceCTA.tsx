import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronDown, Globe, LayoutGrid, QrCode, ShoppingBag, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { useLang } from "../i18n";
import type { WorkTag } from "../i18n/types";
import { PROJECTS_COPY } from "../i18n/sections/projects";
import { featuredFor, liveShot, mobileShot, projectPath, projectsFor, type Project } from "../constants/projects";
import { CLIENT_LOGOS } from "../components/TrustedBy";
import PathMark from "../components/PathMark";
import Flag from "../components/Flag";

type Tag = WorkTag;
type Size = "hero" | "medium" | "small";

const CATEGORY_ORDER: Tag[] = ["site", "shop", "platform", "menu"];

const TAG_ICON: Record<Tag, LucideIcon> = {
  site: Globe,
  shop: ShoppingBag,
  platform: LayoutGrid,
  menu: UtensilsCrossed,
};

/** Плочка под логото: тъмните логота на светла, светлите на тъмна (както в лентата „Доверяват ни се“). */
const TILE: Record<"light" | "dark" | "photo", string> = {
  light: "bg-white ring-1 ring-black/5",
  dark: "bg-[#141f33] ring-1 ring-white/10",
  photo: "bg-[#d6c9b8] ring-1 ring-black/5",
};

/**
 * Екранната снимка. Мокъпите в public/work са 900×589 с нарисуван браузър: прозорецът е x 82–818,
 * лентата с адреса свършва на y≈85, страницата стига до y≈530. Показваме само страницата (736×445),
 * за да няма двоен браузър в картата. Рамката е центрирана и покрива кутията; при hover (само с мишка)
 * бавно „скролва“ надолу като при разглеждане на сайта.
 */
function Shot({ p, alt, sizes, eager }: { p: Project; alt: string; sizes: string; eager?: boolean }) {
  const portrait = p.tag === "menu";
  const live = liveShot(p.id);
  const phone = portrait ? mobileShot(p.id) : undefined;
  return (
    <div className="work-shot relative aspect-[16/10] w-full overflow-hidden bg-[#0a0f1d]">
      {phone ? (
        // Дигиталното меню се гледа от телефона — показваме го в телефон, за да е ясно какво е.
        <div className="absolute inset-0 flex items-start justify-center pt-[6%]">
          <span aria-hidden className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#07090f]/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-300">
            <QrCode className="h-3.5 w-3.5 text-accent-text" strokeWidth={2} />
            QR
          </span>
          <div className="work-phone relative h-[165%] rounded-[30px] border border-white/15 bg-[#05070c] p-[5px] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.9)]" style={{ aspectRatio: "390 / 844" }}>
            <img src={phone} alt={alt} width={780} height={1688} sizes="220px" loading={eager ? "eager" : "lazy"} decoding="async" className="h-full w-full rounded-[23px] object-cover object-top" />
            <span aria-hidden className="absolute left-1/2 top-[9px] h-[14px] w-[56px] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      ) : live ? (
        <img
          src={live}
          alt={alt}
          width={1600}
          height={1000}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="work-shot-page absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : portrait ? (
        <img
          src={p.img}
          alt={alt}
          width={900}
          height={1350}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="work-shot-page absolute inset-0 h-full w-full object-cover object-[50%_42%]"
        />
      ) : (
        <div className="work-shot-page absolute left-1/2 top-0 h-full" style={{ aspectRatio: "736 / 445" }}>
          <img
            src={p.img}
            alt={alt}
            width={900}
            height={589}
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="absolute max-w-none"
            style={{ width: "122.28%", left: "-11.14%", top: "-19.1%" }}
          />
        </div>
      )}
      <span aria-hidden className="pointer-events-none absolute inset-0 border-b border-white/[0.06]" />
    </div>
  );
}

function LogoTile({ id, name, size }: { id: string; name: string; size: "lg" | "sm" }) {
  const c = CLIENT_LOGOS.find((x) => x.id === id);
  if (!c) return null;
  // Правоъгълна плочка: широките логота (с надпис) иначе стават нечетливи в квадрат.
  const box = size === "lg" ? "h-14 w-28 rounded-xl px-3" : "h-10 w-20 rounded-lg px-2";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center overflow-hidden ${box} ${TILE[c.tile]}`}>
      <img
        src={c.logo}
        alt={name}
        className={c.tile === "photo" ? "h-full w-full object-cover" : size === "lg" ? "max-h-10 max-w-full object-contain" : "max-h-7 max-w-full object-contain"}
        style={c.scale ? { transform: `scale(${c.scale})` } : undefined}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

function TypeBadge({ tag, label }: { tag: Tag; label: string }) {
  const Icon = TAG_ICON[tag];
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-2.5 text-[12px] font-semibold text-slate-300">
      <Icon className="h-3.5 w-3.5 text-accent-text" strokeWidth={2} />
      {label}
    </span>
  );
}

/**
 * Една карта: снимка, тип + държава, име, описание в два реда, „Виж проекта“ (разтегнат върху цялата карта)
 * и малка иконка към сайта на живо. Еднаква структура → еднаква височина в реда.
 */
function WorkCard({ p, size, index, animate }: { p: Project; size: Size; index: number; animate: boolean }) {
  const { t, lang, href } = useLang();
  const c = PROJECTS_COPY[lang];
  const name = t.work.titles?.[p.id] ?? p.title;
  const desc = t.work.projects[p.id];
  const to = href(projectPath(p, lang));
  const hero = size === "hero";

  return (
    <article
      style={animate ? { animation: `work-in .55s cubic-bezier(.16,1,.3,1) ${0.04 * Math.min(index, 8)}s backwards` } : undefined}
      className={`work-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-panel
        ${hero ? "lg:grid lg:grid-cols-12" : ""}`}
    >
      <div className={hero ? "lg:col-span-7" : ""}>
        <div>
          <Shot
            p={p}
            alt={name}
            eager={hero}
            sizes={hero ? "(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw" : size === "medium" ? "(min-width: 1280px) 600px, (min-width: 640px) 50vw, 100vw" : "(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          />
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${hero ? "p-5 sm:p-6 lg:col-span-5 lg:justify-center lg:p-9" : size === "medium" ? "p-5 sm:p-6" : "p-5"}`}>
        {hero && (
          <div className="mb-5 hidden lg:block">
            <LogoTile id={p.id} name={name} size="lg" />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <TypeBadge tag={p.tag} label={t.work.tags[p.tag]} />
          {p.country && (
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-400">
              <Flag code={p.country} className="h-3 w-[18px] overflow-hidden rounded-[2px]" />
              {t.countries[p.country]}
            </span>
          )}
        </div>

        <div className={`flex items-center gap-3 ${hero ? "mt-4" : "mt-3.5"}`}>
          {size === "medium" && <LogoTile id={p.id} name={name} size="sm" />}
          {hero && <span className="lg:hidden"><LogoTile id={p.id} name={name} size="sm" /></span>}
          <h3 className={`min-w-0 truncate font-extrabold tracking-[-0.025em] text-slate-50 ${hero ? "text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem]" : size === "medium" ? "text-[1.25rem] sm:text-[1.35rem]" : "text-[1.1rem]"}`}>
            {name}
          </h3>
        </div>

        <p className={`mt-2 text-slate-400 ${hero ? "line-clamp-2 text-[15px] leading-[1.6] sm:text-[15.5px] lg:line-clamp-3 lg:text-base" : "line-clamp-2 text-[14px] leading-[1.55]"}`}>
          {desc}
        </p>

        <div className={`flex items-center justify-between gap-3 ${hero ? "mt-6 lg:mt-8" : "mt-auto pt-5"}`}>
          <RouterLink
            to={to}
            className="work-link inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-text after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent/70"
          >
            {c.view}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" strokeWidth={2.25} aria-hidden />
          </RouterLink>
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.work.caseStudy.live}: ${name}`}
              title={t.work.caseStudy.live}
              className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-slate-400 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Еднаква мрежа от малки карти — за страниците на услуги, проект и „За нас“. */
export function CardsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {projects.map((p, i) => (
        <WorkCard key={p.id} p={p} size="small" index={i} animate={false} />
      ))}
      <WorkStyles />
    </div>
  );
}

function WorkStyles() {
  return (
    <style>{`
      .work-card { transition: border-color .3s ease, transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s cubic-bezier(.16,1,.3,1); }
      .work-shot-page { transition: transform 1.8s cubic-bezier(.16,1,.3,1); will-change: transform; }
      div.work-shot-page { transform: translateX(-50%); }
      .work-phone { transition: transform .6s cubic-bezier(.16,1,.3,1); }
      @media (hover: hover) and (prefers-reduced-motion: no-preference) { .work-card:hover .work-phone { transform: translateY(2%); } }
      @keyframes work-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      @media (hover: hover) and (min-width: 1024px) {
        .work-card:hover { border-color: rgba(255,255,255,.16); transform: translateY(-3px); box-shadow: 0 28px 60px -34px rgba(0,0,0,.85); }
        .work-card:hover img.work-shot-page { transform: translateY(-4.5%) scale(1.1); }
        .work-card:hover div.work-shot-page { transform: translateX(-50%) translateY(-4.5%) scale(1.1); }
      }
      @media (prefers-reduced-motion: reduce) {
        .work-card, .work-shot-page { transition: none !important; animation: none !important; }
        .work-card:hover { transform: none; }
        .work-card:hover .work-shot-page { transform: none; }
        .work-card:hover div.work-shot-page { transform: translateX(-50%); }
      }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { scrollbar-width: none; }
    `}</style>
  );
}

/**
 * Глава 02 „Проекти“: бенто от избраните проекти (FEATURED, в реда за езика) — първият голям с лого,
 * следващите два средни, останалите малки. Чиповете филтрират по тип и разгъват всички проекти;
 * „Покажи всички N“ разгъва без филтър. Една покана за действие накрая → #contact.
 * `page`: отделната страница с всички проекти — h1, всичко разгънато, без възел от пътя и без бутон.
 */
export default function SectionWorkGalleryMinimal({ page = false }: { page?: boolean }) {
  const { t, lang, href } = useLang();
  const c = PROJECTS_COPY[lang];
  // Дигиталните менюта са по-слаб продукт — винаги последни (собственикът, 2026-10-22).
  const projects = [...projectsFor(lang).filter((p) => p.tag !== "menu"), ...projectsFor(lang).filter((p) => p.tag === "menu")];
  const featured = featuredFor(lang);
  const [showAll, setShowAll] = useState(page);
  const [filter, setFilter] = useState<Tag | "all">("all");
  const Heading = page ? "h1" : "h2";

  // Картите, които са в първия рендер (SSR), са видими веднага; само добавените после се появяват с движение.
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);

  const source = showAll ? projects : featured;
  const list = filter === "all" ? source : source.filter((p) => p.tag === filter);
  const chips: (Tag | "all")[] = ["all", ...CATEGORY_ORDER.filter((tag) => projects.some((p) => p.tag === tag))];

  const pick = (tag: Tag | "all") => {
    setFilter(tag);
    if (tag !== "all") setShowAll(true);
  };

  const sizeFor = (i: number): Size => (i === 0 ? "hero" : i < 3 ? "medium" : "small");
  const spanFor = (s: Size) => (s === "hero" ? "sm:col-span-12" : s === "medium" ? "sm:col-span-6" : "sm:col-span-6 lg:col-span-4");

  return (
    <section id="work" className="relative text-slate-200" style={{ backgroundColor: "#07090f" }}>
      <div className={`mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 ${page ? "pt-28 sm:pt-36" : "pt-4 sm:pt-6"}`}>
        {!page && <PathMark n="03" label={c.label} />}

        <div className={`text-center ${page ? "" : "mt-8 sm:mt-10"}`}>
          <Heading className="mx-auto max-w-[22ch] text-[clamp(1.9rem,5.5vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-slate-50">
            {t.work.h2a} <span className="text-accent-text">{t.work.h2b}</span>
          </Heading>
          <p className="mx-auto mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-slate-400 sm:text-base">{t.work.sub}</p>
        </div>

        {/* Филтър по тип: леки чипове, на телефон се плъзгат хоризонтално. */}
        <div className="no-scrollbar -mx-4 mt-8 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label={c.label}>
          <div className="mx-auto flex w-max items-center gap-2">
            {chips.map((tag) => {
              const active = filter === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  onClick={() => pick(tag)}
                  className={`h-9 whitespace-nowrap rounded-full border px-4 text-[13px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70
                    ${active ? "border-accent/40 bg-accent/10 text-accent-text" : "border-white/[0.09] bg-white/[0.03] text-slate-400 hover:border-white/[0.16] hover:text-slate-200"}`}
                >
                  {tag === "all" ? t.work.all : c.filters[tag]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Бенто: 12 колони; редовете са с еднаква височина, защото всяка карта има една и съща структура. */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-12 sm:gap-5">
          {list.map((p, i) => {
            const s = sizeFor(i);
            return (
              // На телефон първо 4 проекта; останалите избрани излизат с „Покажи всички“.
              <div key={p.id} className={`${spanFor(s)} ${!showAll && !page && i >= 4 ? "max-sm:hidden" : ""}`}>
                <WorkCard p={p} size={s} index={i} animate={mounted.current} />
              </div>
            );
          })}
        </div>

        {/* Разгъване: навигация, не покана за действие. */}
        {!page && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => {
                if (showAll) {
                  setFilter("all");
                  // При свиване страницата става много по-къса и бутонът „отскача“ надолу към футъра —
                  // връщаме посетителя в началото на секцията.
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                setShowAll((v) => !v);
              }}
              aria-expanded={showAll}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 text-[14px] font-semibold text-slate-200 transition-colors duration-200 hover:border-white/[0.18] hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              {showAll ? t.work.showLess : t.work.showAll.replace("{n}", String(projects.length))}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} strokeWidth={2.25} aria-hidden />
            </button>
          </div>
        )}

        {/* Една покана за действие за главата. */}
        <div className="mt-14 flex flex-col items-center gap-3 text-center sm:mt-20">
          <RouterLink
            to={href("/#contact")}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-semibold text-[#07090f] shadow-[0_6px_20px_-8px_rgba(34,211,238,.45)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-8px_rgba(34,211,238,.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090f]"
          >
            {t.work.caseStudy.cta}
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </RouterLink>
          <p className="text-[13.5px] text-slate-500">{t.work.caseStudy.ctaSub}</p>
        </div>
      </div>
      <WorkStyles />
    </section>
  );
}
