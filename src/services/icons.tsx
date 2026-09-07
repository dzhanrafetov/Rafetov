/** Малък набор от линейни икони за плочките на страниците за услуги. */
export type IconKey =
  | "palette" | "phone" | "search" | "form" | "globe" | "server"
  | "box" | "card" | "truck" | "tag" | "dashboard" | "shield"
  | "list" | "qr" | "edit" | "clock" | "link" | "target"
  | "image" | "layout" | "bell" | "sliders" | "chart" | "store"
  | "utensils" | "hotel" | "refresh" | "tools" | "scissors" | "briefcase"
  | "ticket" | "rocket" | "megaphone" | "cart";

const PATHS: Record<IconKey, JSX.Element> = {
  palette: <><circle cx="12" cy="12" r="9" /><circle cx="8.5" cy="10" r="1" fill="currentColor" /><circle cx="12" cy="7.5" r="1" fill="currentColor" /><circle cx="15.5" cy="10" r="1" fill="currentColor" /><path d="M12 21c-1.5 0-2-1-2-2 0-1.2 1-2 2-2h2.5a3.5 3.5 0 0 0 0-7" /></>,
  phone: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  form: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9h10M7 13h6" /><path d="M15 16h2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  server: <><rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" /><path d="M7 7h.01M7 17h.01" /></>,
  box: <><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="M3 8l9 5 9-5M12 13v8" /></>,
  card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></>,
  truck: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.5" /><circle cx="17" cy="18" r="1.5" /></>,
  tag: <><path d="M3 12V4h8l9 9-8 8-9-9Z" /><circle cx="7.5" cy="8.5" r="1" fill="currentColor" /></>,
  dashboard: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1" fill="currentColor" /><circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="4" cy="18" r="1" fill="currentColor" /></>,
  qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM20 14h1M14 20h1M18 18h3v3" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="9" r="1.5" /><path d="m21 16-5-5-8 8" /></>,
  layout: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></>,
  sliders: <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" /><path d="M1 14h6M9 8h6M17 16h6" /></>,
  chart: <><path d="M3 3v18h18" /><path d="m7 15 4-5 3 3 5-7" /></>,
  store: <><path d="M3 9 5 3h14l2 6" /><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path d="M5 12v9h14v-9M10 21v-5h4v5" /></>,
  utensils: <><path d="M5 3v18M5 3c0 4 3 4 3 6v2H2V9c0-2 3-2 3-6Z" /><path d="M17 3c-2 0-3 3-3 6v3h2v9M17 3v18" /></>,
  hotel: <><path d="M3 21V7l9-4 9 4v14" /><path d="M9 21v-6h6v6M9 11h.01M15 11h.01M12 11h.01" /></>,
  refresh: <><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v6h-6" /></>,
  tools: <><path d="M14.7 6.3a4 4 0 0 0 5 5L9 22l-3-3L16.7 8.3a4 4 0 0 0-2-2Z" /><path d="m3 5 4 4" /></>,
  scissors: <><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.5 15.5M20 20 8.5 8.5" /></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" /></>,
  ticket: <><path d="M3 9V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a2 2 0 0 0 0 4v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a2 2 0 0 0 0-4Z" /><path d="M13 5v14" strokeDasharray="2 2" /></>,
  rocket: <><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M14 5a9 9 0 0 1 5 5l-8 8-5-5 8-8Z" /><circle cx="14.5" cy="9.5" r="1.5" /></>,
  megaphone: <><path d="M3 11v2a2 2 0 0 0 2 2h1l4 5v-4l9 3V3l-9 3H5a2 2 0 0 0-2 2Z" /><path d="M19 9a3 3 0 0 1 0 6" /></>,
  cart: <><path d="M6 7h15l-2 9H7L6 7Z" /><path d="M6 7 5 4H2" /><circle cx="9" cy="20" r="1" fill="currentColor" /><circle cx="17" cy="20" r="1" fill="currentColor" /></>,
};

export function Icon({ name, className = "h-5 w-5" }: { name: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {PATHS[name]}
    </svg>
  );
}
