import React, { Suspense, type ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import MobileBar from "./components/MobileBar";
import ScrollManager from "./components/ScrollManager";
import { LanguageProvider, PREFIXED_LANGS, useLang, withLang, type Lang } from "./i18n";
import { useSeo } from "./hooks/useSeo";
import { organizationJsonLd, SITE_ORIGIN } from "./seo/head";
import { SERVICES, servicePath } from "./services";
import { BLOG_BASE } from "./blog";

export type Pages = {
  Hero: ComponentType;
  Services: ComponentType;
  Guarantees: ComponentType;
  Market: ComponentType;
  Portfolio: ComponentType;
  BlogTeaser: ComponentType;
  Contact: ComponentType;
  PrivacyPolicy: ComponentType;
  LegalNotice: ComponentType;
  BlogIndex: ComponentType;
  BlogPost: ComponentType;
  ServicePage: ComponentType;
  NotFound: ComponentType;
};

const Loader = ({ small = false }: { small?: boolean }) => {
  const { t } = useLang();
  return (
    <div className={`flex items-center justify-center text-gray-500 ${small ? "min-h-[40vh]" : "min-h-screen"}`}>
      <span className="loader" aria-label={t.loader} />
    </div>
  );
};

function Home({ pages }: { pages: Pages }) {
  const { t, lang } = useLang();
  useSeo({
    title: t.meta.title,
    description: t.meta.description,
    path: "/",
    jsonLd: [
      organizationJsonLd(lang),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: t.process.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: SERVICES.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: t.services.items[s.id].title,
            description: t.services.items[s.id].text,
            url: `${SITE_ORIGIN}${withLang(servicePath(s, lang), lang)}`,
            provider: { "@id": `${SITE_ORIGIN}/#organization` },
          },
        })),
      },
    ],
  });
  const { Hero, Services, Guarantees, Market, Portfolio, BlogTeaser, Contact } = pages;
  return (
    <>
      <Hero />
      <Suspense fallback={<Loader small />}><Services /></Suspense>
      <Suspense fallback={<Loader small />}><Guarantees /></Suspense>
      <Suspense fallback={<Loader small />}><Market /></Suspense>
      <Suspense fallback={<Loader small />}><Portfolio /></Suspense>
      <Suspense fallback={<Loader small />}><Contact /></Suspense>
      <Suspense fallback={<Loader small />}><BlogTeaser /></Suspense>
    </>
  );
}

/** Едни и същи страници на "/", "/en" и "/de". */
const PREFIXES = ["", ...PREFIXED_LANGS.map((l) => `/${l}`)];

/**
 * Общата част на приложението. В браузъра се рендерира в BrowserRouter с lazy страници,
 * при build — в StaticRouter с eager страници (виж entry-server.tsx).
 */
export default function AppShell({
  pages,
  initialLang,
  children,
}: {
  pages: Pages;
  initialLang?: Lang;
  /** Само за браузъра (Analytics и др.). */
  children?: React.ReactNode;
}) {
  const { PrivacyPolicy, LegalNotice, BlogIndex, BlogPost, ServicePage, NotFound } = pages;
  return (
    <LanguageProvider initialLang={initialLang}>
      <ScrollManager />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          {PREFIXES.map((p) => (
            <React.Fragment key={p || "bg"}>
              <Route path={`${p}/`} element={<Home pages={pages} />} />
              <Route path={`${p}/privacy`} element={<PrivacyPolicy />} />
              <Route path={`${p}/legal`} element={<LegalNotice />} />
              <Route path={`${p}${BLOG_BASE}`} element={<BlogIndex />} />
              <Route path={`${p}${BLOG_BASE}/:slug`} element={<BlogPost />} />
              <Route path={`${p}/:base/:slug`} element={<ServicePage />} />
            </React.Fragment>
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingContact />
      {/* Резервира мястото под лепкавата лента — иначе тя закрива дъното на всяка страница
          (вкл. бутона „Изпрати запитване“) и тапът попада в „Обади се“. */}
      <div aria-hidden className="lg:hidden" style={{ height: "calc(4.5rem + env(safe-area-inset-bottom, 0px))" }} />
      <MobileBar />
      {children}
    </LanguageProvider>
  );
}
