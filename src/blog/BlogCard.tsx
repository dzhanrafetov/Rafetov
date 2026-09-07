import { Link as RouterLink } from "react-router-dom";
import { useLang } from "../i18n";
import { formatDate, postPath, postReadingMinutes, type Post } from "./index";

export const TAG_ACCENT: Record<Post["tag"], string> = {
  site: "#22D3EE",
  shop: "#34D399",
  menu: "#A78BFA",
  general: "#FBBF24",
};

export default function BlogCard({ post, eager = false }: { post: Post; eager?: boolean }) {
  const { lang, t, href } = useLang();
  const c = post.content[lang];
  const accent = TAG_ACCENT[post.tag];

  return (
    <RouterLink
      to={href(postPath(post, lang))}
      style={{ "--accent": accent } as React.CSSProperties}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.045] to-white/[0.02] shadow-[0_18px_80px_-46px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={post.imageSmall}
          srcSet={`${post.imageSmall} 800w, ${post.image} 1600w`}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          alt={c.imageAlt}
          width={800}
          height={450}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-[12px] text-slate-500">
          <span className="font-extrabold uppercase tracking-[0.16em]" style={{ color: accent }}>
            {t.blog.tags[post.tag]}
          </span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-slate-700" />
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
        </div>

        <h3 className="mt-3 text-[1.02rem] font-semibold leading-[1.4] tracking-normal text-slate-100 transition-colors group-hover:text-white">
          {c.title}
        </h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate-400">{c.excerpt}</p>

        <div className="mt-4 flex items-center justify-between text-[12.5px]">
          <span className="text-slate-500">
            {postReadingMinutes(c)} {t.blog.minRead}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: accent }}>
            {t.blog.readMore}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </RouterLink>
  );
}
