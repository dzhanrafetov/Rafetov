import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import { useLang, withLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { BLOG_BASE, POSTS, findPost, findPostAnyLang, formatDate, postAlternates, postPath, postReadingMinutes, postWords } from "../blog";
import BlogBody from "../blog/BlogBody";
import BlogCard, { TAG_ACCENT } from "../blog/BlogCard";
import NotFound from "./NotFound";
import { SITE_ORIGIN } from "../seo/head";

export default function BlogPost() {
  const { slug = "" } = useParams();
  const { lang } = useLang();
  const post = findPost(lang, slug);

  if (!post) {
    // Slug от друг език (напр. споделен български линк, отворен на /en) → към правилния адрес.
    const other = findPostAnyLang(slug);
    if (other) return <Navigate to={withLang(postPath(other.post, other.lang), other.lang)} replace />;
    return <NotFound />;
  }

  return <PostView post={post} />;
}

function PostView({ post }: { post: (typeof POSTS)[number] }) {
  const { lang, t, href } = useLang();
  const c = post.content[lang];
  const accent = TAG_ACCENT[post.tag];
  const path = postPath(post, lang);
  const url = `${SITE_ORIGIN}${withLang(path, lang)}`;

  useSeo({
    title: `${c.title} | Rafetov.com`,
    description: c.excerpt,
    path,
    alternates: postAlternates(post),
    image: post.image,
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: c.title,
        description: c.excerpt,
        image: `${SITE_ORIGIN}${post.image}`,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: lang,
        wordCount: postWords(c),
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "Rafetov", url: SITE_ORIGIN },
        publisher: { "@type": "Organization", name: "Rafetov", url: SITE_ORIGIN, logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/rafetov-logo.png` } },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Rafetov.com", item: `${SITE_ORIGIN}${withLang("/", lang)}` },
          { "@type": "ListItem", position: 2, name: t.header.links.blog, item: `${SITE_ORIGIN}${withLang(BLOG_BASE, lang)}` },
          { "@type": "ListItem", position: 3, name: c.title, item: url },
        ],
      },
    ],
  });

  const related = POSTS.filter((p) => p.id !== post.id)
    .sort((a, b) => (a.tag === post.tag ? -1 : b.tag === post.tag ? 1 : 0))
    .slice(0, 3);

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
          style={{ background: `radial-gradient(circle,${accent} 0%,transparent 65%)` }} />
        <div className="absolute -right-72 top-1/2 h-[500px] w-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle,#A78BFA 0%,transparent 65%)" }} />
      </div>

      <article className="relative mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-6 sm:pt-36">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mx-auto flex max-w-3xl items-center gap-2 text-[12.5px] text-slate-500">
          <RouterLink to={href("/")} className="transition-colors hover:text-slate-200">Rafetov.com</RouterLink>
          <span aria-hidden>/</span>
          <RouterLink to={href(BLOG_BASE)} className="transition-colors hover:text-slate-200">{t.header.links.blog}</RouterLink>
        </nav>

        {/* Header */}
        <header className="mx-auto mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-500">
            <span className="rounded-full border px-3 py-1 font-extrabold uppercase tracking-[0.16em]"
              style={{ color: accent, borderColor: `color-mix(in srgb,${accent} 30%,transparent)`, background: `color-mix(in srgb,${accent} 8%,transparent)` }}>
              {t.blog.tags[post.tag]}
            </span>
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            <span aria-hidden className="h-1 w-1 rounded-full bg-slate-700" />
            <span>{postReadingMinutes(c)} {t.blog.minRead}</span>
          </div>
          <h1
            className="mt-5 text-[clamp(1.6rem,4vw,2.3rem)] font-bold leading-[1.25] tracking-normal text-slate-100"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {c.title}
          </h1>
          <p className="mt-5 text-[16.5px] leading-relaxed text-slate-400">{c.excerpt}</p>
        </header>

        {/* Hero image */}
        <figure className="mx-auto mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_30px_100px_-50px_rgba(0,0,0,0.9)]">
            <img
              src={post.image}
              srcSet={`${post.imageSmall} 800w, ${post.image} 1600w`}
              sizes="(min-width: 1024px) 896px, 100vw"
              alt={c.imageAlt}
              width={1600}
              height={900}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
          <figcaption className="mt-2 text-right text-[11px] text-slate-600">{t.blog.photoCredit}</figcaption>
        </figure>

        {/* Body */}
        <div className="mx-auto mt-12 max-w-3xl">
          <BlogBody blocks={c.body} />
        </div>

        {/* CTA */}
        <aside className="mx-auto mt-14 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 text-center sm:p-10">
            <div aria-hidden className="absolute inset-x-0 top-0 h-[2px]"
              style={{ background: "linear-gradient(90deg,#22d3ee,#a78bfa,#34d399)", opacity: 0.6 }} />
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-[0.08] blur-3xl"
              style={{ background: "radial-gradient(circle,#22d3ee,transparent)" }} />
            <h2 className="text-[clamp(1.25rem,3vw,1.6rem)] font-extrabold tracking-tight text-slate-100">{t.blog.ctaTitle}</h2>
            <p className="mx-auto mt-2 max-w-[56ch] text-[15px] leading-relaxed text-slate-400">{t.blog.ctaText}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <RouterLink
                to={`${href("/")}#contact`}
                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-7 text-[14px] font-bold text-[#03060d] shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.75)]"
                style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}
              >
                <span aria-hidden className="absolute inset-0 -skew-x-[20deg] -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{t.blog.ctaButton}</span>
                <svg viewBox="0 0 24 24" className="relative ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </RouterLink>
              <a
                href="tel:+359897758062"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-7 text-[14px] font-semibold text-slate-300 transition-all hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-slate-100"
              >
                +359 897 758 062
              </a>
            </div>
          </div>
        </aside>

        {/* Related */}
        <section className="mx-auto mt-16 max-w-7xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400">{t.blog.related}</h2>
            <RouterLink to={href(BLOG_BASE)} className="text-[13px] font-semibold text-slate-400 transition-colors hover:text-slate-100">
              {t.blog.allPosts} →
            </RouterLink>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      </article>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />
    </main>
  );
}
