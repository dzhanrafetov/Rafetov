export type Lang = "bg" | "en" | "de";

export type CountryCode = "BG" | "DE" | "BE" | "GB" | "ES" | "NO";

export type ServiceKey = "site" | "shop" | "ads" | "menu";
export type CareKey = "hosting" | "support" | "training" | "price";
export type WorkTag = "site" | "shop" | "menu";

export type Dict = {
  meta: {
    title: string;
    description: string;
    privacyTitle: string;
    privacyDescription: string;
    legalTitle: string;
    legalDescription: string;
  };
  header: {
    menu: string;
    ctaButton: string;
    call: string;
    callAria: string;
    langAria: string;
    links: { hero: string; services: string; work: string; process: string; blog: string; contact: string };
  };
  hero: {
    badge: string;
    h1a: string;
    h1b: string;
    sub1: string;
    sub2: string;
    chips: { site: string; shop: string; ads: string };
    cta: string;
    cta2: string;
    micro: string;
    clientsLabel: string;
  };
  countries: Record<CountryCode, string>;
  services: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    items: Record<
      ServiceKey,
      {
        label: string;
        title: string;
        text: string;
        points: string[];
        /** Ориентир за цена. Твърдо число само там, където не зависи от пазара и обема. */
        price: string;
        /** Какво включва / какво е отделно — редът, който спестява спор после. */
        priceNote: string;
      }
    >;
    more: string;
    cta: string;
    cta2: string;
    micro: string;
    /** Обещанието вместо ценоразпис. */
    pricePromise: string;
    /** Линк към статията с пазарния ориентир за цени. */
    priceLink: string;
  };
  care: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    items: Record<CareKey, { title: string; text: string }>;
    cta: string;
    micro: string;
  };
  work: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    all: string;
    tags: Record<WorkTag, string>;
    viewSite: string;
    viewMenu: string;
    projects: Record<string, string>;
    /** Латинизирани имена за проекти с кирилски бранд (по избор). */
    titles?: Partial<Record<string, string>>;
  };
  process: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    stepLabel: string;
    steps: { title: string; time: string; text: string; bullets: string[] }[];
    faqEyebrow: string;
    faq: { q: string; a: string }[];
    cta: string;
    cta2: string;
    micro: string;
  };
  contact: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    sub: string;
    statusTitle: string;
    statusSub: string;
    items: {
      phone: { label: string; sub: string };
      whatsapp: { label: string; value: string; sub: string };
      email: { label: string; sub: string };
      location: { label: string; value: string; sub: string };
    };
    formTitle: string;
    formSub: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    phoneInvalid: string;
    email: string;
    emailPlaceholder: string;
    service: string;
    servicePlaceholder: string;
    options: { site: string; shop: string; menu: string; ads: string; other: string };
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    successTitle: string;
    successSub: string;
    hurry: string;
    newInquiry: string;
    micro: string;
    call: string;
    consent: string;
    consentLink: string;
    errorSubject: string;
    sendByEmail: string;
    sendByWhatsapp: string;
    error: string;
  };
  footer: {
    tagline: string;
    accepting: string;
    navTitle: string;
    contactTitle: string;
    privacy: string;
    legal: string;
    rights: string;
    design1: string;
    design2: string;
  };
  mobileBar: { cta: string; aria: string };
  whatsapp: { aria: string; text: string };
  legal: { updated: string; bulgarianOnly?: string };
  blog: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    sub: string;
    readMore: string;
    minRead: string;
    allPosts: string;
    backToBlog: string;
    teaserTitle: string;
    teaserSub: string;
    related: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    tags: { site: string; shop: string; menu: string; general: string };
    photoCredit: string;
    notFoundTitle: string;
    notFoundText: string;
    notFoundHome: string;
  };
  service: {
    eyebrow: string;
    includes: string;
    forWhom: string;
    process: string;
    projects: string;
    allProjects: string;
    faq: string;
    related: string;
    allServices: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  loader: string;
};
