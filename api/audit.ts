/**
 * Безплатна проверка на сайт (/proverka-na-sait): бърза автоматична проверка на една страница,
 * написана за собственик на бизнес, не за програмист. Не е пълен одит.
 *
 * Вход: { url, part?: "basic" | "pagespeed" }. Без `part` връща и двете.
 *  - basic: сваля HTML-а (до ~2 MB, 8 s) и проверява заглавие, описание, мобилна версия, контакти и т.н.
 *  - pagespeed: пита Google PageSpeed Insights (до ~25 s); ако не отговори, докладът е без него.
 *
 * Защита срещу SSRF: само http/https на порт 80/443, без localhost/.local/.internal, без частни,
 * loopback, link-local и резервирани адреси — и за името, и за всеки адрес от DNS, и за всеки redirect.
 * Опционално: PAGESPEED_API_KEY във Vercel за по-висок лимит към Google.
 */
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export type Status = "good" | "warn" | "bad";
export type Check = { id: string; status: Status; value?: string | number };

const FETCH_TIMEOUT = 8_000;
const PAGESPEED_TIMEOUT = 25_000;
const MAX_BODY = 2 * 1024 * 1024;
const MAX_REDIRECTS = 5;
const UA = "Mozilla/5.0 (compatible; RafetovSiteCheck/1.0; +https://www.rafetov.com/proverka-na-sait)";

/** Тежест на всяка проверка в общия резултат (good = 1, warn = 0.5, bad = 0). Същата таблица е и в src/pages/SiteCheck.tsx. */
const WEIGHTS: Record<string, number> = {
  https: 10, http_redirect: 4, ttfb: 6, html_size: 3, title: 8, description: 6, h1: 4, viewport: 10, lang: 2, og: 6,
  img_alt: 3, favicon: 2, canonical: 3, structured_data: 3, robots: 3, sitemap: 3, noindex: 10, contact: 10, pagespeed: 8,
};

export function scoreOf(checks: Check[]): number {
  let got = 0;
  let total = 0;
  for (const c of checks) {
    const w = WEIGHTS[c.id] ?? 0;
    total += w;
    got += w * (c.status === "good" ? 1 : c.status === "warn" ? 0.5 : 0);
  }
  return total ? Math.round((got / total) * 100) : 0;
}

/* ───────────── SSRF guard ───────────── */

class AuditError extends Error {
  code: string;
  status: number;
  constructor(code: string, status = 400) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

function isPrivateV4(ip: string): boolean {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;
  const [a, b] = p;
  return (
    a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && (b === 168 || b === 0)) ||
    (a === 198 && (b === 18 || b === 19 || b === 51)) ||
    (a === 203 && b === 0)
  );
}

/** Разгъва IPv6 до 8 шестнайсетични групи; връща null при невалиден адрес. */
function expandV6(ip: string): number[] | null {
  let s = ip.toLowerCase();
  if (s.includes("%")) s = s.slice(0, s.indexOf("%"));
  // ::ffff:1.2.3.4 → вградено v4
  const v4 = s.match(/^(.*:)(\d+\.\d+\.\d+\.\d+)$/);
  if (v4) {
    const p = v4[2].split(".").map(Number);
    s = `${v4[1]}${((p[0] << 8) | p[1]).toString(16)}:${((p[2] << 8) | p[3]).toString(16)}`;
  }
  const halves = s.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const fill = halves.length === 2 ? 8 - head.length - tail.length : 0;
  if (fill < 0 || (halves.length === 1 && head.length !== 8)) return null;
  const groups = [...head, ...Array(fill).fill("0"), ...tail].map((g) => parseInt(g || "0", 16));
  return groups.length === 8 && groups.every((n) => n >= 0 && n <= 0xffff) ? groups : null;
}

function isPrivateV6(ip: string): boolean {
  const g = expandV6(ip);
  if (!g) return true;
  const allZero = g.every((n) => n === 0);
  if (allZero) return true; // ::
  if (g.slice(0, 7).every((n) => n === 0) && g[7] === 1) return true; // ::1
  const embeddedV4 = (hi: number, lo: number) => `${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`;
  if (g.slice(0, 5).every((n) => n === 0) && g[5] === 0xffff) return isPrivateV4(embeddedV4(g[6], g[7])); // ::ffff:v4
  if (g.slice(0, 6).every((n) => n === 0)) return isPrivateV4(embeddedV4(g[6], g[7])); // ::v4 (deprecated)
  if (g[0] === 0x64 && g[1] === 0xff9b) return isPrivateV4(embeddedV4(g[6], g[7])); // NAT64
  if ((g[0] & 0xfe00) === 0xfc00) return true; // fc00::/7 unique local
  if ((g[0] & 0xffc0) === 0xfe80) return true; // fe80::/10 link-local
  if ((g[0] & 0xffc0) === 0xfec0) return true; // fec0::/10 site-local
  if ((g[0] & 0xff00) === 0xff00) return true; // multicast
  if (g[0] === 0x2001 && g[1] === 0x0db8) return true; // документация
  if (g[0] === 0x2002) return isPrivateV4(embeddedV4(g[1], g[2])); // 6to4
  return false;
}

function isPrivateIp(ip: string): boolean {
  const kind = isIP(ip);
  if (kind === 4) return isPrivateV4(ip);
  if (kind === 6) return isPrivateV6(ip);
  return true;
}

/** Проверява адреса преди всяка заявка (и при всеки redirect). Хвърля AuditError при проблем. */
async function assertSafeUrl(u: URL): Promise<void> {
  if (u.protocol !== "http:" && u.protocol !== "https:") throw new AuditError("blocked");
  if (u.port && u.port !== "80" && u.port !== "443") throw new AuditError("blocked");
  if (u.username || u.password) throw new AuditError("blocked");
  let host = u.hostname.toLowerCase().replace(/\.$/, "");
  if (host.startsWith("[") && host.endsWith("]")) host = host.slice(1, -1);
  if (!host || host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal") || host.endsWith(".home.arpa")) {
    throw new AuditError("blocked");
  }
  if (isIP(host)) {
    if (isPrivateIp(host)) throw new AuditError("blocked");
    return;
  }
  if (!host.includes(".")) throw new AuditError("blocked");
  let addrs: { address: string }[];
  try {
    addrs = await lookup(host, { all: true, verbatim: true });
  } catch {
    throw new AuditError("unreachable", 422);
  }
  if (!addrs.length) throw new AuditError("unreachable", 422);
  if (addrs.some((a) => isPrivateIp(a.address))) throw new AuditError("blocked");
}

export function normalizeUrl(raw: unknown): URL {
  if (typeof raw !== "string") throw new AuditError("invalid_url");
  let v = raw.trim();
  if (!v || v.length > 2048) throw new AuditError("invalid_url");
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(v)) v = `https://${v}`;
  let u: URL;
  try {
    u = new URL(v);
  } catch {
    throw new AuditError("invalid_url");
  }
  u.hash = "";
  return u;
}

/* ───────────── Safe fetch ───────────── */

type Fetched = {
  url: URL;
  status: number;
  headers: Headers;
  body: string;
  /** ms до първия байт на последния hop */
  ttfb: number;
  /** ms общо, вкл. redirect-ите */
  total: number;
  bytes: number;
  truncated: boolean;
  hops: URL[];
};

async function readLimited(res: Response, limit: number): Promise<{ text: string; bytes: number; truncated: boolean }> {
  if (!res.body) return { text: "", bytes: 0, truncated: false };
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let truncated = false;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    chunks.push(value);
    bytes += value.byteLength;
    if (bytes >= limit) {
      truncated = true;
      await reader.cancel().catch(() => {});
      break;
    }
  }
  const text = new TextDecoder("utf-8", { fatal: false }).decode(Buffer.concat(chunks.map((c) => Buffer.from(c))));
  return { text, bytes, truncated };
}

/** GET с ръчно следване на redirect-и (всеки hop минава през SSRF проверката) и ограничение на тялото. */
async function safeFetch(start: URL, limit = MAX_BODY, timeout = FETCH_TIMEOUT): Promise<Fetched> {
  const t0 = Date.now();
  let url = start;
  const hops: URL[] = [];
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    await assertSafeUrl(url);
    hops.push(url);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeout);
    let res: Response;
    const tHop = Date.now();
    try {
      res = await fetch(url, {
        redirect: "manual",
        signal: ctrl.signal,
        headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml,*/*;q=0.8", "accept-language": "bg,en;q=0.8" },
      });
    } catch {
      clearTimeout(timer);
      throw new AuditError(ctrl.signal.aborted ? "timeout" : "unreachable", 422);
    }
    const ttfb = Date.now() - tHop;
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      clearTimeout(timer);
      await res.body?.cancel().catch(() => {});
      let next: URL;
      try {
        next = new URL(res.headers.get("location")!, url);
      } catch {
        throw new AuditError("unreachable", 422);
      }
      next.hash = "";
      url = next;
      continue;
    }
    try {
      const { text, bytes, truncated } = await readLimited(res, limit);
      clearTimeout(timer);
      return { url, status: res.status, headers: res.headers, body: text, ttfb, total: Date.now() - t0, bytes, truncated, hops };
    } catch {
      clearTimeout(timer);
      throw new AuditError(ctrl.signal.aborted ? "timeout" : "unreachable", 422);
    }
  }
  throw new AuditError("too_many_redirects", 422);
}

/* ───────────── HTML checks ───────────── */

const attr = (tag: string, name: string): string | undefined => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i"));
  return m ? (m[1] ?? m[2] ?? m[3] ?? "").trim() : undefined;
};
const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

function stripNoise(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, "").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "");
}

function metaTags(html: string): string[] {
  return html.match(/<meta\b[^>]*>/gi) ?? [];
}
function metaContent(metas: string[], key: "name" | "property", value: string): string | undefined {
  for (const m of metas) {
    if ((attr(m, key) ?? "").toLowerCase() === value) return decode(attr(m, "content") ?? "");
  }
  return undefined;
}
function linkTags(html: string): string[] {
  return html.match(/<link\b[^>]*>/gi) ?? [];
}

function analyze(f: Fetched): Check[] {
  const raw = f.body;
  const html = stripNoise(raw);
  const head = html.slice(0, 200_000);
  const metas = metaTags(head);
  const links = linkTags(head);
  const out: Check[] = [];

  out.push({ id: "https", status: f.url.protocol === "https:" ? "good" : "bad" });

  out.push({ id: "ttfb", status: f.ttfb < 800 ? "good" : f.ttfb < 1800 ? "warn" : "bad", value: f.ttfb });
  const kb = Math.round(f.bytes / 1024);
  out.push({ id: "html_size", status: kb < 150 ? "good" : kb < 400 ? "warn" : "bad", value: kb });

  const titleM = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleM ? decode(titleM[1]) : "";
  out.push({ id: "title", status: !title ? "bad" : title.length < 10 || title.length > 65 ? "warn" : "good", value: title.slice(0, 120) });

  const desc = metaContent(metas, "name", "description") ?? "";
  out.push({ id: "description", status: !desc ? "bad" : desc.length < 50 || desc.length > 170 ? "warn" : "good", value: desc.slice(0, 200) });

  const h1s = html.match(/<h1\b[^>]*>/gi)?.length ?? 0;
  out.push({ id: "h1", status: h1s === 1 ? "good" : h1s === 0 ? "bad" : "warn", value: h1s });

  const viewport = metaContent(metas, "name", "viewport") ?? "";
  out.push({ id: "viewport", status: /width\s*=\s*device-width/i.test(viewport) ? "good" : viewport ? "warn" : "bad" });

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const lang = attr(htmlTag, "lang") ?? "";
  out.push({ id: "lang", status: lang ? "good" : "warn", value: lang });

  const ogImage = metaContent(metas, "property", "og:image") ?? metaContent(metas, "name", "twitter:image");
  const ogTitle = metaContent(metas, "property", "og:title");
  out.push({ id: "og", status: ogImage && ogTitle ? "good" : ogImage ? "warn" : "bad" });

  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  const noAlt = imgs.filter((t) => attr(t, "alt") === undefined).length;
  out.push({ id: "img_alt", status: noAlt === 0 ? "good" : noAlt <= 3 ? "warn" : "bad", value: `${noAlt}/${imgs.length}` });

  const hasIconLink = links.some((l) => /\bicon\b/i.test(attr(l, "rel") ?? ""));
  out.push({ id: "favicon", status: hasIconLink ? "good" : "warn" });

  const canonical = links.find((l) => (attr(l, "rel") ?? "").toLowerCase() === "canonical");
  out.push({ id: "canonical", status: canonical && attr(canonical, "href") ? "good" : "warn" });

  out.push({ id: "structured_data", status: /<script\b[^>]*type\s*=\s*["']?application\/ld\+json/i.test(raw) ? "good" : "warn" });

  const robotsMeta = (metaContent(metas, "name", "robots") ?? "") + " " + (metaContent(metas, "name", "googlebot") ?? "");
  const xRobots = f.headers.get("x-robots-tag") ?? "";
  out.push({ id: "noindex", status: /noindex/i.test(robotsMeta) || /noindex/i.test(xRobots) ? "bad" : "good" });

  const tel = /href\s*=\s*["']?tel:/i.test(html);
  const mail = /href\s*=\s*["']?mailto:/i.test(html);
  const wa = /wa\.me\/|api\.whatsapp\.com|whatsapp:\/\//i.test(html);
  const viber = /viber:\/\/|viber\.me\/|viber\.click\//i.test(html);
  const form = /<form\b/i.test(html);
  const found = [tel && "tel", wa && "whatsapp", viber && "viber", form && "form", mail && "email"].filter(Boolean) as string[];
  out.push({ id: "contact", status: tel || wa || viber || form ? "good" : mail ? "warn" : "bad", value: found.join(",") });

  return out;
}

/* ───────────── Secondary requests: robots, sitemap, http→https ───────────── */

async function checkRobots(origin: URL): Promise<Check[]> {
  const out: Check[] = [];
  let sitemapFromRobots: URL | null = null;
  try {
    const r = await safeFetch(new URL("/robots.txt", origin), 64 * 1024, 5_000);
    const text = r.status === 200 && !/<html/i.test(r.body.slice(0, 500)) ? r.body : "";
    if (!text) {
      out.push({ id: "robots", status: "warn" });
    } else {
      // Блокира ли всички ботове за целия сайт?
      const blocks = text.split(/\n\s*\n|(?=^user-agent:)/im).some((block) => /^\s*user-agent:\s*\*/im.test(block) && /^\s*disallow:\s*\/\s*$/im.test(block));
      out.push({ id: "robots", status: blocks ? "bad" : "good" });
      const sm = text.match(/^\s*sitemap:\s*(\S+)/im)?.[1];
      if (sm) {
        try {
          sitemapFromRobots = new URL(sm, origin);
        } catch {
          sitemapFromRobots = null;
        }
      }
    }
  } catch {
    out.push({ id: "robots", status: "warn" });
  }
  const candidates = [sitemapFromRobots, new URL("/sitemap.xml", origin), new URL("/sitemap_index.xml", origin)].filter((u): u is URL => !!u);
  let sitemap: Status = "warn";
  for (const c of candidates) {
    try {
      const r = await safeFetch(c, 32 * 1024, 5_000);
      if (r.status === 200 && /<(urlset|sitemapindex)\b/i.test(r.body)) {
        sitemap = "good";
        break;
      }
    } catch {
      /* следващият кандидат */
    }
  }
  out.push({ id: "sitemap", status: sitemap });
  return out;
}

async function checkHttpRedirect(finalUrl: URL): Promise<Check> {
  if (finalUrl.protocol !== "https:") return { id: "http_redirect", status: "bad" };
  try {
    const u = new URL(finalUrl.href);
    u.protocol = "http:";
    u.port = "";
    const r = await safeFetch(u, 16 * 1024, 5_000);
    return { id: "http_redirect", status: r.url.protocol === "https:" ? "good" : "warn" };
  } catch {
    // http портът не отговаря: не е проблем за посетителите, които пишат https, но типичната грешка е да напишат само домейна
    return { id: "http_redirect", status: "warn" };
  }
}

/* ───────────── PageSpeed ───────────── */

export type PageSpeed = { score: number; lcp?: number; cls?: number; tbt?: number };

async function pageSpeed(url: URL): Promise<PageSpeed | null> {
  const key = process.env.PAGESPEED_API_KEY;
  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", url.href);
  api.searchParams.set("strategy", "mobile");
  api.searchParams.set("category", "performance");
  if (key) api.searchParams.set("key", key);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), PAGESPEED_TIMEOUT);
  try {
    const res = await fetch(api, { signal: ctrl.signal });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      lighthouseResult?: { categories?: { performance?: { score?: number } }; audits?: Record<string, { numericValue?: number }> };
    };
    const score = data.lighthouseResult?.categories?.performance?.score;
    if (typeof score !== "number") return null;
    const a = data.lighthouseResult?.audits ?? {};
    const num = (id: string) => (typeof a[id]?.numericValue === "number" ? Math.round(a[id].numericValue! * 1000) / 1000 : undefined);
    return { score: Math.round(score * 100), lcp: num("largest-contentful-paint"), cls: num("cumulative-layout-shift"), tbt: num("total-blocking-time") };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/* ───────────── Rate limit (best effort, per instance) ───────────── */

const RATE: Map<string, { n: number; reset: number }> = new Map();
const RATE_MAX = 12;
const RATE_WINDOW = 10 * 60 * 1000;

function rateLimited(request: Request): boolean {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const cur = RATE.get(ip);
  if (!cur || cur.reset < now) {
    RATE.set(ip, { n: 1, reset: now + RATE_WINDOW });
    if (RATE.size > 5000) RATE.clear();
    return false;
  }
  cur.n++;
  return cur.n > RATE_MAX;
}

/* ───────────── Handler ───────────── */

export async function POST(request: Request): Promise<Response> {
  if (rateLimited(request)) return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: { url?: unknown; part?: unknown };
  try {
    body = (await request.json()) as { url?: unknown; part?: unknown };
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  const part = body.part === "basic" || body.part === "pagespeed" ? body.part : "all";

  try {
    const start = normalizeUrl(body.url);
    await assertSafeUrl(start);

    if (part === "pagespeed") {
      const ps = await pageSpeed(start);
      const checks: Check[] = ps ? [{ id: "pagespeed", status: ps.score >= 90 ? "good" : ps.score >= 50 ? "warn" : "bad", value: ps.score }] : [];
      return Response.json({ ok: true, url: start.href, checks, pagespeed: ps, score: scoreOf(checks) });
    }

    const psPromise = part === "all" ? pageSpeed(start) : Promise.resolve(null);
    const page = await safeFetch(start);
    if (page.status >= 400) return Response.json({ ok: false, error: "http_error", status: page.status, url: page.url.href }, { status: 422 });
    const ct = page.headers.get("content-type") ?? "";
    if (ct && !/html|xml|text\/plain|^$/i.test(ct) && !/<html|<!doctype/i.test(page.body.slice(0, 2000))) {
      return Response.json({ ok: false, error: "not_html", url: page.url.href }, { status: 422 });
    }

    const [extra, redirect] = await Promise.all([checkRobots(page.url), checkHttpRedirect(page.url)]);
    const checks = [...analyze(page), redirect, ...extra];
    const ps = await psPromise;
    if (ps) checks.push({ id: "pagespeed", status: ps.score >= 90 ? "good" : ps.score >= 50 ? "warn" : "bad", value: ps.score });

    return Response.json({
      ok: true,
      url: page.url.href,
      finalStatus: page.status,
      redirects: page.hops.length - 1,
      truncated: page.truncated,
      score: scoreOf(checks),
      checks,
      pagespeed: ps,
      checkedAt: new Date().toISOString(),
    });
  } catch (e) {
    if (e instanceof AuditError) return Response.json({ ok: false, error: e.code }, { status: e.status });
    console.error("audit error", e);
    return Response.json({ ok: false, error: "failed" }, { status: 500 });
  }
}
