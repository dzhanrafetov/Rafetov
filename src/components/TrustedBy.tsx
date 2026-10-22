import { Link as RouterLink } from "react-router-dom";
import { useLang } from "../i18n";
import { PROJECTS, projectPath, projectsFor } from "../constants/projects";

/**
 * Лента „Доверяват ни се“ под hero: истинските логота на клиентите, в цвят, в версия за тъмен фон.
 * Всяко лого получава еднаква визуална площ (широките са по-ниски, квадратните по-високи), за да не „скача“ редът.
 * Ако клиентът няма лого с надпис, до знака се изписва името (`wordmark`). Без файл се показва само името.
 * Пълзи бавно и спира при hover; при prefers-reduced-motion стои на място.
 */
type ClientLogo = {
  id: string;
  name: string;
  /** Файл в public/logos/ – подготвен за тъмен фон (светъл текст). */
  logo?: string;
  /** Ширина / височина на файла. */
  ratio?: number;
  /** Име до знака, когато логото е само символ. */
  wordmark?: { title: string; sub?: string };
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "azteca-site", name: "Azteca Premium", logo: "/logos/azteca-site.png", ratio: 6.71 },
  { id: "jitara", name: "Житара", logo: "/logos/jitara.png", ratio: 1.06 },
  { id: "creative-homes", name: "Creative Homes", logo: "/logos/creative-homes.png", ratio: 4.01 },
  { id: "mig-group", name: "MIG Engineering Group", logo: "/logos/mig-group.png", ratio: 1.29 },
  { id: "chef-resat-site", name: "Chef Resat", logo: "/logos/chef-resat-site.png", ratio: 1.11 },
  { id: "metesso", name: "Metesso", logo: "/logos/metesso.png", ratio: 3.94 },
  { id: "nn-bau", name: "N&N Bau", logo: "/logos/nn-bau.png", ratio: 1.22 },
  { id: "zirve1", name: "Zirve1", logo: "/logos/zirve1.png", ratio: 3.95 },
  { id: "dudo-group", name: "Дудо", logo: "/logos/dudo-group.png", ratio: 0.79 },
  { id: "korn-metal", name: "Korn Metal", logo: "/logos/korn-metal.png", ratio: 2.69 },
  { id: "opaka-fits", name: "Комплекс Фъц", logo: "/logos/opaka-fits.png", ratio: 0.97 },
  { id: "alpha-reiniging", name: "Alpha Reiniging", logo: "/logos/alpha-reiniging.png", ratio: 1.89 },
  { id: "beca", name: "BECA", logo: "/logos/beca.png", ratio: 1, wordmark: { title: "BECA", sub: "Umzugsservice" } },
  { id: "vulcho", name: "Vulcho", logo: "/logos/vulcho.png", ratio: 1 },
  { id: "innenausbau-ahmedov", name: "Innenausbau Ahmedov", logo: "/logos/innenausbau-ahmedov.png", ratio: 1.43, wordmark: { title: "Ahmedov", sub: "Innenausbau" } },
  { id: "taupe", name: "Taupe" },
  { id: "abi-studio", name: "Abi Studio" },
];

/** Височина при еднаква площ: квадратно лого = MAX, много широко ≈ MIN. */
const AREA = 7600;
const MAX_H = 80;
const MIN_H = 40;
function logoHeight(ratio = 1, hasWordmark = false) {
  if (hasWordmark) return 56;
  return Math.round(Math.min(MAX_H, Math.max(MIN_H, Math.sqrt(AREA / ratio))));
}

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
        <div
          className="trust-mask relative mt-7 overflow-hidden sm:mt-9"
          style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}
        >
          <ul className="trust-track flex w-max items-center gap-14 sm:gap-20">
            {row.map((c, i) => {
              const p = PROJECTS.find((x) => x.id === c.id)!;
              const name = t.work.titles?.[c.id] ?? c.name;
              const h = logoHeight(c.ratio, !!c.wordmark);
              const clone = i >= items.length;
              return (
                <li key={`${c.id}-${i}`} className="shrink-0" aria-hidden={clone || undefined}>
                  <RouterLink
                    to={href(projectPath(p, lang))}
                    tabIndex={clone ? -1 : 0}
                    aria-label={name}
                    className="trust-item flex h-20 items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:h-24"
                  >
                    {c.logo ? (
                      <>
                        <img
                          src={c.logo}
                          alt={c.wordmark ? "" : name}
                          width={Math.round(h * (c.ratio ?? 1))}
                          height={h}
                          className="trust-logo w-auto"
                          style={{ ["--h" as string]: `${h}px` }}
                          loading="lazy"
                          decoding="async"
                        />
                        {c.wordmark && (
                          <span className="flex flex-col leading-none">
                            <span className="text-[19px] font-extrabold uppercase tracking-[0.16em] text-white sm:text-[22px]">{c.wordmark.title}</span>
                            {c.wordmark.sub && <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:text-[11px]">{c.wordmark.sub}</span>}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="whitespace-nowrap text-[22px] font-extrabold uppercase tracking-[0.14em] text-white/90 sm:text-[26px]">{name}</span>
                    )}
                  </RouterLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <style>{`
        .trust-track { animation: trust-scroll 60s linear infinite; }
        .trust-mask:hover .trust-track { animation-play-state: paused; }
        .trust-logo { height: calc(var(--h) * 0.75); }
        @media (min-width: 640px) { .trust-logo { height: var(--h); } }
        .trust-item { opacity: .92; transition: opacity .2s ease, transform .2s ease; }
        .trust-item:hover, .trust-item:focus-visible { opacity: 1; transform: translateY(-2px); }
        @keyframes trust-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .trust-track { animation: none; } .trust-item:hover { transform: none; } }
      `}</style>
    </section>
  );
}
