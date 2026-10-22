/**
 * Първият екран: вляво обещанието и WhatsApp, вдясно примерен чат, в който едно съобщение
 * става реален клиентски сайт. От дъното на чата тръгва циан „пътят“ към следващата глава.
 *
 * Чатът е изцяло в SSR HTML-а (видим без JS). Единственият авторски момент на страницата:
 * след хидратация, когато панелът влезе в екрана, чатът се „изиграва“ веднъж — балончетата се
 * появяват едно след друго, с индикатор за писане преди нашия отговор, накрая картата на проекта.
 * При prefers-reduced-motion нищо не се анимира.
 */
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { CheckCheck, Star } from "lucide-react";
import { useLang } from "../i18n";
import HERO from "../i18n/sections/hero";
import Flag from "../components/Flag";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { GoogleG } from "../components/GoogleRating";
import { GOOGLE_REVIEWS, googleReviewsUrl, whatsappHref } from "../constants/business";
import { PROJECTS, projectPath, liveShot } from "../constants/projects";

export default function Hero() {
  const { t, lang, href } = useLang();
  const c = HERO[lang];
  const project = PROJECTS.find((p) => p.id === c.chat.projectId) ?? PROJECTS[0];
  const rating = GOOGLE_REVIEWS.rating.toLocaleString(lang, { minimumFractionDigits: 1 });

  const chatRef = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setPlay(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // „{r} в Google от {n} отзива“ → текст преди и след рейтинга, за да стои той в по-тежко начертание.
  const proofGoogle = c.proofGoogle.replace("{n}", String(GOOGLE_REVIEWS.count)).split("{r}");

  return (
    <section id="hero" className="relative bg-ink text-slate-200">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pt-24 sm:px-8 sm:pt-32 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,520px)] lg:items-center lg:gap-16 lg:pt-28 xl:px-12">
        {/* ── Копие ── */}
        <div className="text-center lg:text-left">
          <h1 className="hero-balance mx-auto max-w-[14ch] text-[clamp(2.35rem,9.2vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.034em] text-white lg:mx-0 lg:max-w-[640px]">
            {c.h1[0]}
            <span className="text-accent-text">{c.h1[1]}</span>
            {c.h1[2]}
          </h1>

          <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-[1.55] text-slate-400 sm:text-lg lg:mx-0">{c.sub}</p>

          <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-7 lg:justify-start">
            <a
              href={whatsappHref(t.whatsapp.text)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("hero_cta", { channel: "whatsapp" })}
              className="inline-flex h-14 w-full max-w-sm items-center justify-center gap-3 rounded-[14px] bg-accent pl-5 pr-7 text-[16px] font-semibold text-ink
                         shadow-[0_8px_24px_-10px_rgba(34,211,238,0.6)] transition-[transform,box-shadow,background-color] duration-300 ease-out
                         hover:bg-[#4fdcf2] hover:shadow-[0_12px_30px_-10px_rgba(34,211,238,0.75)] active:translate-y-px
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:w-auto"
            >
              <WhatsAppIcon className="h-[22px] w-[22px]" />
              {c.cta}
            </a>
            <a
              href="#process"
              className="border-b border-slate-400/40 pb-px text-[15px] font-medium text-slate-400 transition-colors duration-200 hover:border-slate-200 hover:text-slate-200
                         focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent-text/60"
            >
              {c.quiet}
            </a>
          </div>

          {/* Доказателство: реалният рейтинг в Google и държавите, в които работим */}
          <p className="mt-10 flex flex-col items-center gap-x-3.5 gap-y-2 text-[14px] text-slate-500 sm:flex-row sm:flex-wrap sm:justify-center lg:mt-14 lg:justify-start">
            <a
              href={googleReviewsUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-sm transition-colors hover:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-text/60"
            >
              <GoogleG className="h-4 w-4" />
              <span className="inline-flex gap-[2px] text-accent-text" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-[13px] w-[13px]" fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span>
                {proofGoogle[0]}
                <b className="font-semibold text-slate-200">{rating}</b>
                {proofGoogle[1]}
              </span>
            </a>
            <span aria-hidden className="hidden h-[3px] w-[3px] rounded-full bg-slate-600 sm:block" />
            <span>{c.proofCountries}</span>
          </p>
        </div>

        {/* ── Чатът + началото на пътя ── */}
        <div className="flex flex-col items-center">
          <aside
            ref={chatRef}
            aria-label={c.chat.aria}
            className={`hc relative w-full max-w-[520px] rounded-[22px] border border-white/[0.08] bg-ink-panel p-3.5 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] sm:p-[18px] ${play ? "is-play" : ""}`}
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3.5">
              <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-extrabold tracking-[0.04em] text-ink">R</span>
              <div className="min-w-0">
                <b className="block text-[14px] font-semibold text-slate-100">{c.chat.name}</b>
                <small className="flex items-center gap-1.5 text-[12px] text-slate-400">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {c.chat.status}
                </small>
              </div>
              <span className="ml-auto hidden self-start whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500 sm:block">{c.chat.example}</span>
            </div>

            <div className="hc-a mx-auto mt-3 w-max text-[11px] uppercase tracking-[0.06em] text-slate-500" style={{ ["--d" as string]: "0s" }}>
              {c.chat.day1}
            </div>

            {/* Входящо: клиентът */}
            <div className="hc-a mt-2.5 max-w-[88%] rounded-2xl rounded-tl-md border border-white/[0.08] bg-ink-raised px-3.5 py-2.5 text-[14px] leading-[1.5] sm:max-w-[392px] sm:text-[14.5px]" style={{ ["--d" as string]: ".25s" }}>
              {c.chat.inMsg}
              <span className="mt-1.5 block text-right text-[11px] tabular-nums text-slate-500">09:14</span>
            </div>

            {/* Изходящо: ние, с план в три точки. Индикаторът за писане стои върху същото място, за да няма скок на оформлението. */}
            <div className="relative">
              <div aria-hidden className="hc-typing absolute right-0 top-2.5 flex h-10 items-center gap-1 rounded-2xl rounded-tr-md border border-accent/[0.22] bg-accent/[0.09] px-4">
                <span className="hc-dot h-1.5 w-1.5 rounded-full bg-accent-text" />
                <span className="hc-dot h-1.5 w-1.5 rounded-full bg-accent-text" style={{ animationDelay: ".15s" }} />
                <span className="hc-dot h-1.5 w-1.5 rounded-full bg-accent-text" style={{ animationDelay: ".3s" }} />
              </div>
              <div className="hc-a ml-auto mt-2.5 max-w-[92%] rounded-2xl rounded-tr-md border border-accent/[0.22] bg-accent/[0.09] px-3.5 py-2.5 text-[14px] leading-[1.5] sm:max-w-[392px] sm:text-[14.5px]" style={{ ["--d" as string]: "2.4s" }}>
                {c.chat.outIntro}
                <ol className="mb-0.5 mt-2 list-none p-0">
                  {c.chat.plan.map((step, i) => (
                    <li key={i} className="flex gap-2.5 border-t border-accent-text/[0.12] py-1">
                      <span className="mt-[3px] flex-none text-[11px] font-semibold leading-[1.6] tracking-[0.06em] text-accent-text tabular-nums">0{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <span className="mt-1.5 flex items-center justify-end gap-1 text-[11px] tabular-nums text-accent-text/70">
                  09:31
                  <CheckCheck className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
            </div>

            <div className="hc-a mx-auto mt-3 w-max text-[11px] uppercase tracking-[0.06em] text-slate-500" style={{ ["--d" as string]: "3.3s" }}>
              {c.chat.day2}
            </div>

            {/* Картата: реален проект със снимка от public/work */}
            <a
              href={href(projectPath(project, lang))}
              aria-label={`${c.chat.openProject}: ${project.title}`}
              className="hc-a hc-card group ml-auto mt-2.5 block max-w-[440px] rounded-2xl rounded-tr-md border border-accent/[0.28] bg-ink p-2 transition-colors duration-200 hover:border-accent/60
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-text/60"
              style={{ ["--d" as string]: "3.6s" }}
            >
              <span className="relative block aspect-[16/10] overflow-hidden rounded-[10px] bg-black">
                <img
                  src={liveShot(project.id) ?? project.img}
                  alt={project.title}
                  width={1600}
                  height={1000}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <span aria-hidden className="absolute inset-0 rounded-[10px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
              </span>
              {/* „Сайтът е онлайн“ стои под снимката, за да не закрива сайта. */}
              <span className="flex items-center justify-between gap-3 px-1.5 pb-1 pt-2.5 text-[13px]">
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_0_3px_rgba(34,211,238,0.25)]" />
                  <b className="truncate font-semibold text-slate-200">{project.title}</b>
                  <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.06em] text-accent-text sm:inline">· {c.chat.live}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] text-slate-500">
                  {c.chat.city}
                  {project.country && <Flag code={project.country} className="h-[10px] w-[15px] rounded-[2px]" />}
                </span>
              </span>
            </a>

            {/* На телефон надписът „примерен разговор“ не се побира в заглавния ред — стои под картата */}
            <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500 sm:hidden">{c.chat.example}</p>
          </aside>

          {/* Пътят тръгва от дъното на чата и излиза от hero към следващата глава */}
          <div aria-hidden className={`hc-path flex flex-col items-center ${play ? "is-play" : ""}`}>
            <span className="hc-node -mt-1.5 block h-3 w-3 rounded-full bg-accent" />
            <span className="hc-line block h-20 w-[2px] sm:h-28" />
          </div>
        </div>
      </div>

      <style>{`
        .hero-balance { text-wrap: balance; }
        .hc-typing { opacity: 0; }
        .hc.is-play .hc-a { animation: hc-in .6s cubic-bezier(.16,1,.3,1) var(--d, 0s) both; }
        .hc.is-play .hc-card { animation-name: hc-card; animation-duration: .8s; }
        .hc.is-play .hc-typing { animation: hc-typing 1.5s ease 1s both; }
        .hc.is-play .hc-dot { animation: hc-dot 1s ease-in-out infinite; }
        .hc-node { box-shadow: 0 0 0 6px rgba(34,211,238,.18), 0 0 24px rgba(34,211,238,.6); }
        .hc-line { background: linear-gradient(180deg, #22d3ee, rgba(34,211,238,.25)); transform-origin: top; }
        .hc-path.is-play .hc-node { animation: hc-node .5s cubic-bezier(.16,1,.3,1) 4.2s both; }
        .hc-path.is-play .hc-line { animation: hc-line .9s cubic-bezier(.16,1,.3,1) 4.4s both; }
        @keyframes hc-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes hc-card { from { opacity: 0; transform: translateY(18px) scale(.985); } to { opacity: 1; transform: none; } }
        @keyframes hc-typing { 0% { opacity: 0; } 12% { opacity: 1; } 85% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes hc-dot { 0%, 100% { transform: translateY(0); opacity: .55; } 50% { transform: translateY(-3px); opacity: 1; } }
        @keyframes hc-node { from { opacity: 0; transform: scale(.4); } to { opacity: 1; transform: none; } }
        @keyframes hc-line { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @media (prefers-reduced-motion: reduce) {
          .hc .hc-a, .hc .hc-typing, .hc .hc-dot, .hc-path .hc-node, .hc-path .hc-line { animation: none !important; }
          .hc-typing { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
