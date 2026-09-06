/** Едно място за юридическите данни, за да не се разминават между страниците и footer-а. */
export const BUSINESS = {
  brand: "Rafetov",
  domain: "rafetov.com",
  legalName: "Джан Рафетов",
  bulstat: "181648949",
  email: "business@rafetov.com",
  phone: "+359 897 758 062",
  phoneHref: "tel:+359897758062",
  registeredAddress: "гр. Попово, обл. Търговище",
  activityScope: "Услугите се предоставят дистанционно на територията на цялата страна.",
  updated: "6 септември 2026",
} as const;

export const ROUTES = {
  privacy: "/privacy",
  legal: "/legal",
} as const;
