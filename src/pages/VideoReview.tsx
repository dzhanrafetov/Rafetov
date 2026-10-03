import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { offers } from '../i18n/offers';

export default function VideoReview() {
  const { lang, href } = useLang();
  const c = offers[lang];
  return <section id="video-review" className="bg-[#07090f] px-5 py-16 text-slate-100">
    <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-transparent p-7 sm:p-12 md:grid-cols-[1fr_auto]">
      <div><h2 className="max-w-2xl text-3xl font-extrabold">{c.auditTitle}</h2><p className="mt-4 max-w-2xl leading-relaxed text-slate-400">{c.auditText}</p></div>
      <Link to={href('/?intent=audit#contact')} className="rounded-full bg-cyan-300 px-6 py-4 text-center text-sm font-bold text-slate-950">{c.auditCta}</Link>
    </div>
  </section>;
}
