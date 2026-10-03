import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { offers } from '../i18n/offers';
import { serviceById, servicePath } from '../services';

export default function Services() {
  const { lang, href } = useLang();
  const c = offers[lang];
  return <section id="services" className="border-y border-white/10 bg-[#07090f] px-5 py-16 text-slate-200 sm:py-24">
    <div className="mx-auto max-w-7xl">
      <h2 className="text-center text-3xl font-extrabold sm:text-4xl">{c.title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-slate-400">{c.sub}</p>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {c.packages.map((p, i) => <article key={p.name} className={`flex flex-col rounded-3xl border p-6 sm:p-8 ${i === 1 ? 'border-cyan-400/40 bg-cyan-400/[0.06]' : 'border-white/10 bg-white/[0.02]'}`}>
          <h3 className="text-xl font-bold">{p.name}</h3>
          <p className="mt-3 min-h-16 text-sm leading-relaxed text-slate-400">{p.goal}</p>
          <p className="mt-5 text-4xl font-extrabold"><span className="text-base font-normal text-slate-400">{c.from} </span>{p.price} €</p>
          <p className="mt-1 text-sm text-slate-400">{c.once}</p>
          <ul className="my-6 space-y-3 text-sm leading-relaxed">{p.points.map(point => <li key={point} className="flex gap-3"><span aria-hidden className="text-cyan-300">✓</span><span>{point}</span></li>)}</ul>
          <p className="mb-6 text-sm leading-relaxed text-slate-400">{p.note}</p>
          <Link className="mt-auto rounded-full bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" to={href(`/?package=${i}#contact`)}>{c.cta}</Link>
        </article>)}
      </div>
      <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-relaxed text-slate-400">{c.terms}</p>
      <article className="mt-10 flex flex-col gap-6 rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.04] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-bold sm:text-3xl">{c.shop}</h3>
          <p className="mt-3 leading-relaxed text-slate-300">{c.shopSub}</p>
          <Link className="mt-4 inline-block text-sm font-semibold text-cyan-300 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" to={href(servicePath(serviceById('shop'), lang))}>{c.shopDetails}</Link>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
          <p className="text-3xl font-extrabold sm:text-4xl">{c.shopPrice}</p>
          <Link className="rounded-full bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" to={href('/#contact')}>{c.shopCta}</Link>
        </div>
      </article>
      <p className="mt-6 max-w-4xl text-sm leading-relaxed text-slate-400">{c.ads}</p>
    </div>
  </section>;
}
