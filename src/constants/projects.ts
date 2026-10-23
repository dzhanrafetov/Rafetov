import type { CountryCode, Lang, WorkTag } from "../i18n/types";

export type Project = {
  id: string;
  tag: WorkTag;
  title: string;
  img: string;
  /** Снимка на българската версия на сайта — показва се само на bg. */
  imgBg?: string;
  href?: string;
  country?: CountryCode;
  /** Езици на самия сайт (кодове), когато са повече от един или не са очевидни. */
  siteLangs?: string[];
  /** Името на автора на отзива в Google за този проект (от constants/reviews.ts), ако има такъв. */
  review?: string;
};

/** Базов път на страниците на проектите за всеки език (без езиков префикс). */
export const PROJECT_BASE: Record<Lang, string> = { bg: "/proekti", en: "/projects", de: "/projekte", nl: "/projecten" };

/** Път на страницата „За нас“ за всеки език. */
export const ABOUT_BASE: Record<Lang, string> = { bg: "/za-nas", en: "/about", de: "/ueber-uns", nl: "/over-ons" };

/**
 * Избраните проекти на началната страница: по един от нишите, които най-често питат
 * (строителство, магазин, ресторант, соларни, платформа, чужбина). Останалите се разгъват с бутон.
 */
export const FEATURED: Record<Lang, string[]> = {
  bg: ["chef-resat-site", "vulcho", "alpha-reiniging", "creative-homes", "nn-bau", "emis-cleaning", "jitara", "zirve1", "czpo"],
  en: ["emis-cleaning", "chef-resat-site", "vulcho", "alpha-reiniging", "creative-homes", "nn-bau", "jitara", "zirve1", "czpo"],
  de: ["nn-bau", "chef-resat-site", "vulcho", "alpha-reiniging", "creative-homes", "emis-cleaning", "jitara", "zirve1", "czpo"],
  nl: ["alpha-reiniging", "het-pitta-loft", "chef-resat-site", "vulcho", "creative-homes", "nn-bau", "emis-cleaning", "zirve1", "beca"],
};

/**
 * Проекти с истинска снимка на живия сайт (1600×1000, заснета при 1440×900 @2x) в public/work/live/.
 * Ползва се вместо мокъпа там, където снимката е голяма — мокъпите са 900×589 и изглеждат размазани.
 * Metesso и Korn Metal нямат: анимацията и видеото им не се заснемат чисто.
 */
const LIVE_SHOTS = new Set(["czpo", "24tours", "abi-studio", "active-solar", "aloeway", "alpha-reiniging", "amalfi-menu", "azteca-site", "beca", "chef-resat-menu", "chef-resat-site", "creative-homes", "dudo-group", "emis-cleaning", "het-pitta-loft", "hh-edelstahl", "hotel-fenix", "hustle-clothing", "innenausbau-ahmedov", "jitara", "kapisel", "mig-group", "nn-bau", "opaka-fits", "pachka-stil", "pancetita-menu", "pet-zvezdi", "primasell", "santander", "shop4home", "slapfight", "szo", "taupe", "vulcho", "zirve1"]);
export const liveShot = (id: string): string | undefined => (LIVE_SHOTS.has(id) ? `/work/live/${id}.webp?v=3` : undefined);

/** Мобилни снимки (390×844 @2x → 780×1688) в public/work/mobile/ — за мокъпи с телефон. */
const MOBILE_SHOTS = new Set(["amalfi-menu", "chef-resat-menu", "pancetita-menu", "alpha-reiniging", "beca", "chef-resat-site", "creative-homes", "czpo", "emis-cleaning", "het-pitta-loft", "innenausbau-ahmedov", "jitara", "nn-bau", "shop4home", "vulcho", "zirve1"]);
export const mobileShot = (id: string): string | undefined => (MOBILE_SHOTS.has(id) ? `/work/mobile/${id}.webp?v=3` : undefined);

/**
 * Цялата страница на живия сайт (десктоп 1440 → 1200 px, телефон 390 @2x → 600 px) в public/work/full/.
 * Страницата на проекта я превърта бавно в рамка на браузър и телефон. Заснети с Playwright на 2026-10-23.
 * Metesso няма: домейнът е изтекъл.
 */
const FULL_SHOTS = new Set(["czpo", "24tours", "abi-studio", "active-solar", "aloeway", "alpha-reiniging", "amalfi-menu", "azteca-site", "beca", "chef-resat-menu", "chef-resat-site", "creative-homes", "dudo-group", "emis-cleaning", "het-pitta-loft", "hh-edelstahl", "hotel-fenix", "hustle-clothing", "innenausbau-ahmedov", "jitara", "kapisel", "korn-metal", "mig-group", "nn-bau", "opaka-fits", "pachka-stil", "pancetita-menu", "pet-zvezdi", "primasell", "santander", "shop4home", "slapfight", "szo", "taupe", "vulcho", "zirve1"]);
export const fullShot = (id: string, kind: "d" | "m"): string | undefined => (FULL_SHOTS.has(id) ? `/work/full/${id}-${kind}.webp?v=1` : undefined);

export const PROJECTS: Project[] = [
  {
    id: "chef-resat-site",
    tag: "site",
    title: "Chef Resat",
    img: "/work/rft.webp",
    href: "https://www.chefresatsofya.com/",
    country: "BG",
  },
  {
    id: "vulcho",
    tag: "shop",
    title: "Vulcho.bg",
    img: "/work/valchoph.webp",
    href: "https://valcho-zeta.vercel.app/",
    country: "BG",
  },
  {
    id: "zirve1",
    tag: "shop",
    title: "Zirve1",
    img: "/work/ztest.webp",
    href: "https://www.zirve1.bg/",
    country: "BG",
  },
  {
    id: "emis-cleaning",
    tag: "site",
    title: "Emis Cleaning",
    img: "/work/london.webp",
    href: "https://www.emiscleaning.co.uk/",
    country: "GB",
  },
  {
    id: "santander",
    review: "Taxi Alper",
    tag: "site",
    title: "Alp Taxi Santander",
    img: "/work/sndr.webp",
    href: "https://taxisantander.online/",
    country: "ES",
  },
  {
    id: "beca",
    tag: "site",
    title: "BECA Umzugsservice",
    img: "/work/becca.webp",
    href: "https://becaumzug.de/",
    country: "DE",
  },
  {
    id: "amalfi-menu",
    siteLangs: ["no", "en"],
    tag: "menu",
    title: "Amalfi",
    img: "/work/menu-amalfi.webp",
    href: "https://www.amalfirestaurant.no/",
    country: "NO",
  },
  {
    id: "chef-resat-menu",
    siteLangs: ["bg", "tr", "en"],
    tag: "menu",
    title: "Chef Resat",
    img: "/work/menu-resat.webp",
    href: "https://www.chefresatsofya.com/menu",
    country: "BG",
  },
  {
    id: "pancetita-menu",
    siteLangs: ["no", "en"],
    tag: "menu",
    title: "Pizza Pancetita",
    img: "/work/menu-pancetta.webp",
    href: "https://pancetta.vercel.app/",
    country: "NO",
  },
  {
    id: "abi-studio",
    review: "Abibe Izetova",
    tag: "site",
    title: "Abi Studio",
    img: "/work/abistudio1.webp",
    href: "https://www.abistudiovarna.com/",
    country: "BG",
  },
  {
    id: "nn-bau",
    tag: "site",
    title: "N&N Bau",
    img: "/work/nnbau.webp",
    href: "https://nnbau-sanierung.de/",
    country: "DE",
  },
  {
    id: "metesso",
    review: "Ersin Metesoy",
    tag: "site",
    title: "Metesso",
    img: "/work/metesso1.webp",
    href: "https://www.metesso.com/",
    country: "BG",
  },
  {
    id: "opaka-fits",
    tag: "site",
    title: "Комплекс Фъц",
    img: "/work/opakafits.webp",
    href: "https://opakafits.com/",
    country: "BG",
  },
  {
    id: "taupe",
    tag: "site",
    title: "Taupe",
    img: "/work/taupe1.webp",
    href: "https://www.taupe.bg/",
    country: "BG",
  },
  {
    id: "azteca-site",
    review: "Plamen Chalakov",
    tag: "shop",
    title: "Azteca",
    img: "/work/aztecanew.webp",
    href: "https://azteca-premium.com/",
    country: "BG",
  },
  {
    id: "dudo-group",
    tag: "site",
    title: "Dudo Group",
    img: "/work/dudohip2.webp",
    href: "https://d-group.bg/dudo-stroitelen/index.php",
    country: "BG",
  },
  {
    id: "mig-group",
    tag: "site",
    title: "МИГ Инженеринг Груп",
    img: "/work/geodezi1.webp",
    href: "https://migbulgaria.com/",
    country: "BG",
  },
  {
    id: "het-pitta-loft",
    tag: "site",
    title: "Het Pitta Loft",
    img: "/work/hetpittaloft.webp",
    href: "https://hetpittaloft.be/",
    country: "BE",
  },
  {
    id: "pet-zvezdi",
    tag: "site",
    title: "Пет Звезди",
    img: "/work/petzvezdi.webp",
    href: "https://www.petzvezdiexotics.com",
    country: "BG",
  },
  {
    id: "hh-edelstahl",
    tag: "site",
    title: "H&H Edelstahl",
    img: "/work/edel3.webp",
    href: "https://www.edelstahl-gastro.de",
    country: "DE",
  },
  {
    id: "primasell",
    tag: "site",
    title: "PrimaSell",
    img: "/work/primasell.webp",
    href: "https://primasell.bg/",
    country: "BG",
  },
  {
    id: "szo",
    tag: "shop",
    title: "Security Systems",
    img: "/work/szof1.webp",
    href: "https://www.szo.bg/",
    country: "BG",
  },
  {
    id: "24tours",
    tag: "shop",
    title: "24Tours",
    img: "/work/mototours.webp",
    href: "https://www.24tours.bg/",
    country: "BG",
  },
  {
    id: "hustle-clothing",
    tag: "shop",
    title: "Hustle Clothing",
    img: "/work/hustle2.webp",
    href: "https://hustleclothing.shop/",
    country: "BG",
  },
  {
    id: "shop4home",
    tag: "shop",
    title: "Shop4Home",
    img: "/work/shop111.webp",
    href: "https://shop4home.bg/",
    country: "BG",
  },
  {
    id: "korn-metal",
    tag: "site",
    title: "Korn Metal",
    img: "/work/korn.webp",
    href: "https://www.korn-metal.com/",
    country: "BG",
  },
  {
    id: "hotel-fenix",
    tag: "site",
    title: "Хотел Феникс",
    img: "/work/chepelare.webp",
    href: "https://hotelfenix.vercel.app/",
    country: "BG",
  },
  {
    id: "slapfight",
    tag: "shop",
    title: "SlapFight Bulgaria",
    img: "/work/slapfight2.webp",
    href: "https://slap-fight-bulgaria-nine.vercel.app/",
    country: "BG",
  },
  {
    id: "innenausbau-ahmedov",
    tag: "site",
    title: "Innenausbau Ahmedov",
    img: "/work/innenausbau.webp",
    href: "https://www.innenausbau-ahmedov.de/",
    country: "DE",
  },
  {
    id: "alpha-reiniging",
    review: "Alpha Reiniging",
    siteLangs: ["nl"],
    tag: "site",
    title: "Alpha Reiniging",
    img: "/work/alphareining.webp",
    href: "https://www.alphareiniging.be/",
    country: "BE",
  },
  {
    id: "active-solar",
    siteLangs: ["bg", "en"],
    tag: "site",
    title: "Active Solar Energy",
    img: "/work/activesolar-en.webp",
    imgBg: "/work/activesolar-bg.webp",
    href: "https://activesolar-energy.com/",
    country: "BG",
  },
  {
    id: "creative-homes",
    tag: "site",
    title: "CreativeHomes",
    img: "/work/creativehomes.webp",
    href: "https://creativehomes.bg/",
    country: "BG",
  },
  {
    id: "jitara",
    siteLangs: ["bg", "en"],
    tag: "site",
    title: "Jitara",
    img: "/work/jitara-en.webp",
    imgBg: "/work/jitara-bg.webp",
    href: "https://www.jitara.eu/",
    country: "BG",
  },
  {
    id: "pachka-stil",
    tag: "site",
    title: "Пачка Стил",
    img: "/work/pachkastil.webp",
    href: "https://pachkastil.com/",
    country: "BG",
  },
  {
    id: "kapisel",
    tag: "shop",
    title: "Kapisel",
    img: "/work/kapisel.webp",
    href: "https://kapisel.com/",
    country: "BG",
  },
  {
    id: "aloeway",
    tag: "shop",
    title: "AloeWay",
    img: "/work/aloeway.webp",
    href: "https://aloeway.eu/",
    country: "BG",
  },  {
    id: "czpo",
    tag: "platform",
    title: "ЦЗПО",
    img: "/work/czpo.webp",
    href: "https://czpo.bg/",
    country: "BG",
  },
];

/** Нидерландската версия е за Белгия: първо проекти от Белгия и Германия, после подбрани други. */
const NL_PROJECT_IDS = [
  "alpha-reiniging", "het-pitta-loft",
  "nn-bau", "beca", "hh-edelstahl", "innenausbau-ahmedov",
  "emis-cleaning", "santander",
  "vulcho", "zirve1", "chef-resat-site",
  "chef-resat-menu", "amalfi-menu", "pancetita-menu",
  "active-solar", "creative-homes",
];

export function projectsFor(lang: Lang): Project[] {
  const list =
    lang === "nl"
      ? (NL_PROJECT_IDS.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean) as Project[])
      : PROJECTS;
  return lang === "bg" ? list.map((p) => (p.imgBg ? { ...p, img: p.imgBg } : p)) : list;
}

export function projectPath(p: Project, lang: Lang): string {
  return `${PROJECT_BASE[lang]}/${p.id}`;
}

export function projectAlternates(p: Project): Record<Lang, string> {
  return { bg: projectPath(p, "bg"), en: projectPath(p, "en"), de: projectPath(p, "de"), nl: projectPath(p, "nl") };
}

export function findProject(lang: Lang, slug: string): Project | undefined {
  return projectsFor(lang).find((p) => p.id === slug);
}

/** Избраните проекти за езика, в реда от FEATURED; липсващи id-та се пропускат. */
export function featuredFor(lang: Lang): Project[] {
  const all = projectsFor(lang);
  return FEATURED[lang].map((id) => all.find((p) => p.id === id)).filter((p): p is Project => !!p);
}
