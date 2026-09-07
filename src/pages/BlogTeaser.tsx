import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import { useLang } from "../i18n";
import { BLOG_BASE, POSTS } from "../blog";
import BlogCard from "../blog/BlogCard";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** Секция на началната страница с трите най-нови статии. */
export default function BlogTeaser() {
  const { t, href } = useLang();
  const latest = POSTS.slice(0, 3);

  return (
    <section
      id="blog"
      className="relative isolate overflow-hidden text-slate-200"
      style={{ backgroundColor: "#07090f", ["--hairline" as string]: "#1a2234" } as React.CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
          [background-size:28px_28px]" />
        <div className="absolute -left-60 top-1/3 h-[480px] w-[480px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle,#FBBF24 0%,transparent 65%)" }} />
      </div>
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-24">
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            {t.blog.eyebrow}
          </span>
          <h2 className="mx-auto mt-5 max-w-[26ch] text-[clamp(1.75rem,5.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.02em] text-slate-100"
            style={{ textWrap: "balance" } as React.CSSProperties}>
            <span className="gradient-text">
              {t.blog.teaserTitle}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-slate-400">{t.blog.teaserSub}</p>
        </motion.div>

        <motion.div
          variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} custom={1}
          className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {latest.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </motion.div>

        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2} className="mt-12 text-center">
          <RouterLink
            to={href(BLOG_BASE)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-7 text-[14px] font-semibold text-slate-300 transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-slate-100"
          >
            {t.blog.allPosts}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </RouterLink>
        </motion.div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />
    </section>
  );
}
