import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/business";
import { stripLang, useLang } from "../i18n";
import { BLOG_BASE } from "../blog";
import { SERVICES, servicePath } from "../services";

const NAV_SECTIONS = ["services", "work", "process", "blog", "contact"] as const;

const CONTACT_LINKS = [
  { label: "+359 897 758 062",    href: "tel:+359897758062",           external: false },
  { label: "business@rafetov.com", href: "mailto:business@rafetov.com", external: false },
  { label: "WhatsApp",             href: "https://wa.me/359897758062",  external: true  },
];

export default function Footer() {
  const { pathname } = useLocation();
  const { t, href, lang } = useLang();
  const isHome = stripLang(pathname) === "/";

  const legalLinks = [
    { label: t.footer.privacy, to: href(ROUTES.privacy) },
    { label: t.footer.legal,   to: href(ROUTES.legal)   },
  ];

  return (
    <footer
      className="relative isolate overflow-hidden text-slate-400"
      style={{ backgroundColor: "#07090f", ["--hairline" as any]: "#1a2234" }}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      {/* grid bg */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025]
        [background-image:linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]
        [background-size:28px_28px]" />

      {/* glow */}
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle,#22D3EE,transparent)" }} />

      <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-24 sm:px-6 lg:pb-7">

        {/* ── Brand (centered on mobile, left on desktop) ── */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">

          {/* Logo + tagline */}
          <div>
            <div className="text-[13px] font-black uppercase tracking-[0.22em] text-slate-100">
              RAFETOV<span style={{ color: "#22D3EE" }}>.</span>COM
            </div>
            <p className="mt-2 text-[13px] text-slate-500">
              {t.footer.tagline}
            </p>
            <div className="mt-3 inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34D399]" />
              </span>
              <span className="text-[12px] text-slate-500">{t.footer.accepting}</span>
            </div>
          </div>

          {/* Links — 2 columns on mobile, inline on desktop */}
          <div className="mt-8 grid w-full grid-cols-2 gap-x-6 gap-y-6 text-left sm:mt-0 sm:flex sm:w-auto sm:gap-12">

            {/* Services */}
            <div>
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">
                {t.header.links.services}
              </div>
              <ul className="space-y-2">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <RouterLink
                      to={href(servicePath(s, lang))}
                      className="group flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-slate-100"
                    >
                      <span aria-hidden className="h-px w-3 rounded-full bg-slate-700 transition-all duration-200 group-hover:w-4 group-hover:bg-[#22D3EE]" />
                      {t.services.items[s.id].title}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nav */}
            <div>
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">
                {t.footer.navTitle}
              </div>
              <ul className="space-y-2">
                {NAV_SECTIONS.map((to) => {
                  const inner = (
                    <>
                      <span aria-hidden className="h-px w-3 rounded-full bg-slate-700 transition-all duration-200 group-hover:w-4 group-hover:bg-[#22D3EE]" />
                      {t.header.links[to]}
                    </>
                  );
                  const cls =
                    "group flex cursor-pointer items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-slate-100";

                  return (
                    <li key={to}>
                      {to === "blog" ? (
                        <RouterLink to={href(BLOG_BASE)} className={cls}>
                          {inner}
                        </RouterLink>
                      ) : isHome ? (
                        <ScrollLink to={to} smooth duration={220} offset={-70} className={cls}>
                          {inner}
                        </ScrollLink>
                      ) : (
                        <RouterLink to={`${href("/")}#${to}`} className={cls}>
                          {inner}
                        </RouterLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">
                {t.footer.contactTitle}
              </div>
              <ul className="space-y-2">
                {CONTACT_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      rel={l.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-slate-100"
                    >
                      <span aria-hidden className="h-px w-3 rounded-full bg-slate-700 transition-all duration-200 group-hover:w-4 group-hover:bg-[#22D3EE]" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div aria-hidden className="mt-10 h-px" style={{ backgroundColor: "var(--hairline)" }} />

        {/* ── Legal (връзки към правните страници) ── */}
        <div className="mt-5 flex justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <RouterLink
                  to={l.to}
                  className="text-[12px] text-slate-600 underline decoration-transparent underline-offset-4 transition-colors hover:text-slate-300 hover:decoration-slate-600"
                >
                  {l.label}
                </RouterLink>
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden className="mt-5 h-px" style={{ backgroundColor: "var(--hairline)" }} />

        {/* ── Bottom ── */}
        <div className="mt-4 flex flex-col items-center gap-1 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="text-[12px] text-slate-600">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-slate-500">RAFETOV.COM</span>
            {" "}· {t.footer.rights}
          </div>
          <div className="text-[12px] text-slate-600">
            {t.footer.design1} <span className="text-slate-500">{t.footer.design2}</span>.
          </div>
        </div>

      </div>
    </footer>
  );
}
