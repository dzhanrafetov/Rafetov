import { Link as RouterLink } from "react-router-dom";
import { useLang } from "../i18n";
import { useSeo } from "../hooks/useSeo";
import { BLOG_BASE } from "../blog";

export default function NotFound() {
  const { t, href } = useLang();
  useSeo({ title: `${t.blog.notFoundTitle} | Rafetov.com`, description: t.blog.notFoundText, path: "/404" });

  return (
    <main
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5 text-center text-slate-200"
      style={{ backgroundColor: "#07090f" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]
        [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
        [background-size:28px_28px]" />
      <div>
        <div className="text-[clamp(4rem,15vw,7rem)] font-black leading-none tracking-tight gradient-text">
          404
        </div>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-100">{t.blog.notFoundTitle}</h1>
        <p className="mt-2 text-slate-400">{t.blog.notFoundText}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <RouterLink
            to={href("/")}
            className="inline-flex h-12 items-center justify-center rounded-full px-7 text-[14px] font-bold text-[#03060d]"
            style={{ background: "linear-gradient(135deg,#34d9f0 0%,#0ea5e9 55%,#0284c7 100%)" }}
          >
            {t.blog.notFoundHome}
          </RouterLink>
          <RouterLink
            to={href(BLOG_BASE)}
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] px-7 text-[14px] font-semibold text-slate-300 transition-all hover:border-white/[0.15] hover:bg-white/[0.06]"
          >
            {t.blog.allPosts}
          </RouterLink>
        </div>
      </div>
    </main>
  );
}
