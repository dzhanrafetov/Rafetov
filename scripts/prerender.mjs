/**
 * Пререндер след `vite build`:
 *  1. зарежда dist/server/entry-server.js (SSR bundle),
 *  2. за всеки адрес генерира dist/<път>/index.html със статичен HTML + правилни head тагове,
 *  3. пише dist/sitemap.xml с hreflang алтернативи,
 *  4. трие dist/server, за да не се публикува.
 *
 * Резултат: Google, Facebook и др. получават пълния текст на всяка страница без JavaScript.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const SITE_ORIGIN = "https://www.rafetov.com";

const { render, getRoutes } = await import(path.join(DIST, "server/entry-server.js"));
const template = await fs.readFile(path.join(DIST, "index.html"), "utf8");

function inject(tpl, { html, headHtml, head }) {
  let out = tpl.replace(/<html lang="[^"]*"/, `<html lang="${head.lang}"`);
  // махаме статичните title/description/og/twitter тагове и коментарите от index.html
  out = out.replace(/[ \t]*<title>[\s\S]*?<\/title>\n?/, "");
  out = out.replace(/[ \t]*<meta (?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)" content="[^"]*" \/>\n?/g, "");
  out = out.replace(/[ \t]*<!--[\s\S]*?-->\n?/g, "");
  out = out.replace("</head>", `    ${headHtml}\n  </head>`);
  const marker = '<div id="root"></div>';
  if (!out.includes(marker)) throw new Error("index.html: липсва <div id=\"root\"></div>");
  return out.replace(marker, `<div id="root">${html}</div>`);
}

const routes = getRoutes();
let written = 0;
for (const r of routes) {
  const result = render(r.url);
  const file = r.url === "/" ? "index.html" : path.join(r.url.replace(/^\//, ""), "index.html");
  const target = path.join(DIST, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, inject(template, result), "utf8");
  written++;
}

// ── sitemap.xml ──
const byPath = new Map();
for (const r of routes) {
  if (!byPath.has(r.path)) byPath.set(r.path, []);
  byPath.get(r.path).push(r);
}
const abs = (p) => `${SITE_ORIGIN}${p}`;
const esc = (s) => s.replace(/&/g, "&amp;");
const withLang = (p, lang) => (lang === "bg" ? p : p === "/" ? `/${lang}` : `/${lang}${p}`);

const urls = routes.map((r) => {
  const alts = ["bg", "en", "de"]
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${esc(abs(withLang(r.alternates[l], l)))}" />`)
    .join("\n");
  const xdef = `    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(abs(r.alternates.bg))}" />`;
  return `  <url>
    <loc>${esc(abs(r.url))}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
${alts}
${xdef}
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

await fs.rm(path.join(DIST, "server"), { recursive: true, force: true });
console.log(`prerender: ${written} страници, sitemap с ${routes.length} адреса`);
