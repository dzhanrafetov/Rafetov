import { useLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { POSTS, BLOG_BASE, postPath } from "../blog";
import BlogCard from "../blog/BlogCard";
import { SITE_ORIGIN } from "../seo/head";

export default function BlogIndex() {
  const { lang, t } = useLang();

  useSeo({
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
    path: BLOG_BASE,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: t.blog.metaTitle,
      description: t.blog.metaDescription,
      inLanguage: lang,
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      blogPost: POSTS.map((p) => ({
        "@type": "BlogPosting",
        headline: p.content[lang].title,
        datePublished: p.date,
        url: `${SITE_ORIGIN}${lang === "bg" ? "" : `/${lang}`}${postPath(p, lang)}`,
      })),
    },
  });

  return (
    <main
      className="relative isolate min-h-screen overflow-hidden text-slate-200"
      style={{ backgroundColor: "#07090f", ["--hairline" as string]: "#1a2234" } as React.CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
          [background-size:28px_28px]" />
        <div className="absolute -left-72 top-24 h-[600px] w-[600px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle,#22D3EE 0%,transparent 65%)" }} />
        <div className="absolute -right-72 top-1/2 h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle,#A78BFA 0%,transparent 65%)" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            {t.blog.eyebrow}
          </span>
          <h1
            className="mx-auto mt-5 max-w-[24ch] text-[clamp(1.9rem,6vw,3.2rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            <span className="gradient-text">
              {t.blog.title}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-slate-400" style={{ textWrap: "balance" } as React.CSSProperties}>
            {t.blog.sub}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <BlogCard key={p.id} post={p} eager={i < 3} />
          ))}
        </div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />
    </main>
  );
}
