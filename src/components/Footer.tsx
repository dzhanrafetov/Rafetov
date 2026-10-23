import type { CSSProperties } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { BUSINESS, ROUTES, SOCIALS, VIBER_HREF } from "../constants/business";
import { PROJECT_BASE } from "../constants/projects";
import { stripLang, useLang } from "../i18n";
import { BLOG_BASE } from "../blog";
import { SERVICES, servicePath } from "../services";
import { servicesCopy } from "../i18n/sections/services";
import { plannerCopy } from "../i18n/sections/planner";
import { auditCopy } from "../i18n/sections/audit";
import { AUDIT_BASE, PLANNER_BASE } from "../constants/tools";
import LogoMark from "./LogoMark";

// „За нас“ е скрита засега — страницата съществува, но не се показва в навигацията.
const NAV_SECTIONS = ["services", "work", "process", "blog", "contact"] as const;

const CONTACT_LINKS = [
  { label: BUSINESS.phone,         href: BUSINESS.phoneHref,            external: false },
  { label: BUSINESS.email,         href: `mailto:${BUSINESS.email}`,    external: false },
  { label: "WhatsApp",             href: "https://wa.me/359897758062",  external: true  },
  { label: "Viber",                href: VIBER_HREF,                    external: true  },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: SOCIALS.instagram, Icon: FaInstagram },
  { label: "TikTok",    href: SOCIALS.tiktok,    Icon: FaTiktok    },
  { label: "Facebook",  href: SOCIALS.facebook,  Icon: FaFacebook  },
].filter((s) => s.href);

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
      style={{ backgroundColor: "#07090f", "--hairline": "#1a2234" } as CSSProperties}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--hairline)" }} />

      <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-24 sm:px-6 lg:pb-7">

        {/* ── Brand (centered on mobile, left on desktop) ── */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">

          {/* Logo + tagline */}
          <div>
            <RouterLink
              to={href("/")}
              onClick={(e) => {
                if (!isHome) return;
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.22em] text-slate-100 transition-opacity hover:opacity-80"
            >
              <LogoMark className="h-4 w-auto" />
              <span>RAFETOV<span style={{ color: "#22D3EE" }}>.</span>COM</span>
            </RouterLink>
            <p className="mt-2 text-[13px] text-slate-500">
              {t.footer.tagline}
            </p>
            {/* Социални профили — оттам идват повечето посетители и търсят същите канали тук */}
            <div className="mt-4 flex items-center justify-center gap-1 sm:justify-start">
              {SOCIAL_LINKS.map(({ label, href: url, Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-slate-400 transition-colors hover:border-white/[0.18] hover:text-slate-100"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
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
                      {servicesCopy[lang].items[s.key].name}
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
                      ) : to === "work" ? (
                        <RouterLink to={href(PROJECT_BASE[lang])} className={cls}>
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
                {/* Инструменти: планер на проект и безплатна проверка на сайт */}
                {[
                  { label: plannerCopy[lang].nav, to: href(PLANNER_BASE[lang]) },
                  { label: auditCopy[lang].nav, to: href(AUDIT_BASE[lang]) },
                ].map((l) => (
                  <li key={l.to}>
                    <RouterLink to={l.to} className="group flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-slate-100">
                      <span aria-hidden className="h-px w-3 rounded-full bg-slate-700 transition-all duration-200 group-hover:w-4 group-hover:bg-[#22D3EE]" />
                      {l.label}
                    </RouterLink>
                  </li>
                ))}
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
