/**
 * Минимален inline синтаксис за текстовете в блога:
 *   **удебелен текст**  и  [текст на линк](/път или https://…)
 * Един и същ парсер се ползва от React компонентите и от prerender скрипта (HTML).
 */
export type Segment =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "link"; text: string; href: string };

const RE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function parseInline(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of text.matchAll(RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ kind: "text", text: text.slice(last, i) });
    if (m[1] !== undefined) out.push({ kind: "bold", text: m[1] });
    else out.push({ kind: "link", text: m[2], href: m[3] });
    last = i + m[0].length;
  }
  if (last < text.length) out.push({ kind: "text", text: text.slice(last) });
  return out;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Рендер до HTML низ (за prerender). Вътрешните линкове получават езиков префикс чрез `localize`. */
export function inlineToHtml(text: string, localize: (href: string) => string): string {
  return parseInline(text)
    .map((s) => {
      if (s.kind === "text") return escapeHtml(s.text);
      if (s.kind === "bold") return `<strong>${escapeHtml(s.text)}</strong>`;
      const href = s.href.startsWith("/") ? localize(s.href) : s.href;
      const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeHtml(href)}"${ext}>${escapeHtml(s.text)}</a>`;
    })
    .join("");
}

/** Приблизително време за четене (думи / 200). */
export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 200));
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
