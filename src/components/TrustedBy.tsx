import { Link as RouterLink } from "react-router-dom";
import { useLang } from "../i18n";
import { PROJECTS, projectPath, projectsFor } from "../constants/projects";

/**
 * Лента „Доверяват ни се“ под hero: истинските логота на клиентите в оригиналните им цветове, всяко в своя плочка.
 * Всички плочки са тъмни (собственикът, 2026-10-22: белият фон изглежда евтино); тъмните логота са с изсветлени версии в public/logos/.
 * Пълзи бавно и спира при hover; при prefers-reduced-motion стои на място.
 */
type ClientLogo = {
  id: string;
  name: string;
  /** Файл в public/logos/. */
  logo: string;
  /** Плочка: светла за тъмни логота, тъмна за светли. `photo` — логото е снимка и запълва плочката. */
  tile: "light" | "dark" | "photo";
  /** Увеличение за логота, които изглеждат дребни в плочката (кръгли значки и др.). */
  scale?: number;
  /** Име до знака, когато логото е само символ. */
  wordmark?: { title: string; sub?: string };
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "azteca-site", name: "Azteca Premium", logo: "/logos/azteca-site.png", tile: "dark" },
  { id: "mig-group", name: "MIG Engineering Group", logo: "/logos/mig-group-light.png", tile: "dark" },
  { id: "jitara", name: "Житара", logo: "/logos/jitara.png", tile: "dark" },
  { id: "creative-homes", name: "Creative Homes", logo: "/logos/creative-homes-gold-stack.png", tile: "dark" },
  { id: "chef-resat-site", name: "Chef Resat", logo: "/logos/chef-resat-site.png", tile: "dark" },
  { id: "abi-studio", name: "Abi Studio", logo: "/logos/abi-studio-light.png", tile: "dark" },
  { id: "metesso", name: "Metesso", logo: "/logos/metesso.png", tile: "dark" },
  { id: "dudo-group", name: "Дудо", logo: "/logos/dudo-yellow.png", tile: "dark" },
  { id: "szo", name: "Системи за охрана", logo: "/logos/szo.png", tile: "dark" },
  { id: "korn-metal", name: "Korn Metal", logo: "/logos/korn-metal.png", tile: "dark" },
  { id: "nn-bau", name: "N&N Bau", logo: "/logos/nn-bau.png", tile: "dark" },
  { id: "taupe", name: "Taupe", logo: "/logos/taupe-light.png", tile: "dark" },
  { id: "zirve1", name: "Zirve1", logo: "/logos/zirve1.png", tile: "dark" },
  { id: "vulcho", name: "Vulcho", logo: "/logos/vulcho.png", tile: "dark", scale: 1.1 },
  { id: "alpha-reiniging", name: "Alpha Reiniging", logo: "/logos/alpha-reiniging.png", tile: "dark" },
  { id: "beca", name: "BECA", logo: "/logos/beca.png", tile: "dark", wordmark: { title: "BECA", sub: "Umzugsservice" } },
  { id: "opaka-fits", name: "Комплекс Фъц", logo: "/logos/opaka-fits.png", tile: "dark" },
  { id: "innenausbau-ahmedov", name: "Innenausbau Ahmedov", logo: "/logos/innenausbau-ahmedov.png", tile: "dark", wordmark: { title: "Ahmedov", sub: "Innenausbau" } },
];

const TILE: Record<ClientLogo["tile"], string> = {
  light: "bg-white ring-1 ring-black/5",
  dark: "bg-[#0e1626] ring-1 ring-white/[0.08]",
  photo: "bg-[#d6c9b8] ring-1 ring-black/5",
};

export default function TrustedBy() {
  const { t, lang, href } = useLang();
  const visible = new Set(projectsFor(lang).map((p) => p.id));
  const items = CLIENT_LOGOS.filter((c) => visible.has(c.id) && PROJECTS.some((p) => p.id === c.id));
  if (items.length < 4) return null;
  // Два пъти един и същ ред, за да е безшевен цикълът.
  const row = [...items, ...items];

  return (
    <section aria-label={t.about.trustTitle} className="relative border-b border-[#1a2234] text-slate-200" style={{ backgroundColor: "#07090f" }}>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14">
        <p className="text-center text-sm font-semibold text-slate-400 sm:text-[15px]">{t.about.trustTitle}</p>
      </div>
      <div
        className="trust-mask relative -mt-3 overflow-hidden pb-10 sm:-mt-5 sm:pb-14"
        style={{ maskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)" }}
      >
        <ul className="trust-track flex w-max items-center gap-3 sm:gap-4">
          {row.map((c, i) => {
            const p = PROJECTS.find((x) => x.id === c.id)!;
            const name = t.work.titles?.[c.id] ?? c.name;
            const clone = i >= items.length;
            return (
              <li key={`${c.id}-${i}`} className="shrink-0" aria-hidden={clone || undefined}>
                <RouterLink
                  to={href(projectPath(p, lang))}
                  tabIndex={clone ? -1 : 0}
                  aria-label={name}
                  className={`trust-item flex h-[84px] w-[150px] items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:h-[104px] sm:w-[188px] sm:px-5 ${TILE[c.tile]}`}
                >
                  {c.tile === "photo" ? (
                    <img src={c.logo} alt={name} width={290} height={240} className="h-full w-full object-contain" loading="lazy" decoding="async" />
                  ) : (
                    <>
                      <img
                        src={c.logo}
                        alt={c.wordmark ? "" : name}
                        className={`w-auto object-contain ${c.wordmark ? "max-h-[44px] sm:max-h-[54px]" : "max-h-[52px] max-w-full sm:max-h-[64px]"}`}
                        style={c.scale ? { transform: `scale(${c.scale})` } : undefined}
                        loading="lazy"
                        decoding="async"
                      />
                      {c.wordmark && (
                        <span className={`flex flex-col leading-none ${c.tile === "light" ? "text-slate-900" : "text-white"}`}>
                          <span className="text-[15px] font-extrabold uppercase tracking-[0.14em] sm:text-[17px]">{c.wordmark.title}</span>
                          {c.wordmark.sub && <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.2em] opacity-60 sm:text-[9px]">{c.wordmark.sub}</span>}
                        </span>
                      )}
                    </>
                  )}
                </RouterLink>
              </li>
            );
          })}
        </ul>
      </div>
      <style>{`
        .trust-track { animation: trust-scroll 70s linear infinite; }
        .trust-mask:hover .trust-track { animation-play-state: paused; }
        .trust-item { transition: transform .25s ease, box-shadow .25s ease; }
        .trust-item:hover, .trust-item:focus-visible { transform: translateY(-3px); box-shadow: 0 10px 30px -12px rgba(0,0,0,.6); }
        @keyframes trust-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .trust-track { animation: none; } .trust-item:hover { transform: none; } }
      `}</style>
    </section>
  );
}
