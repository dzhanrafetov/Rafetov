// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource-variable/onest/wght.css";
import "./index.css";
import { stripLang } from "./i18n";
import { captureFirstTouch, trackContactClicks } from "./service/attribution";

/**
 * Страниците са пререндерирани в HTML (виж scripts/prerender.mjs). За да не мига спинър
 * върху вече видимото съдържание, зареждаме предварително частите за текущия адрес
 * и чак тогава хидратираме React върху готовия HTML.
 */
function preloadFor(path: string): Promise<unknown>[] {
  if (path === "/") {
    return [
      import("./pages/Hero"),
      import("./pages/About"),
      import("./pages/Services"),
      import("./pages/Guarantees"),
      import("./pages/OnlinePresenceCTA"),
      import("./pages/Portfolio"),
      import("./pages/BlogTeaser"),
      import("./pages/ContactUs"),
    ];
  }
  if (path === "/blog") return [import("./pages/BlogIndex")];
  if (path.startsWith("/blog/")) return [import("./pages/BlogPost")];
  if (path === "/privacy") return [import("./pages/PrivacyPolicy")];
  if (path === "/legal") return [import("./pages/LegalNotice")];
  if (/^\/(uslugi|services|leistungen|diensten)\//.test(path)) return [import("./pages/ServicePage")];
  if (/^\/(proekti|projects|projekte|projecten)\//.test(path)) return [import("./pages/ProjectPage")];
  if (/^\/(proekti|projects|projekte|projecten)$/.test(path)) return [import("./pages/ProjectsIndex"), import("./pages/OnlinePresenceCTA")];
  if (/^\/(za-nas|about|ueber-uns|over-ons)$/.test(path)) return [import("./pages/AboutPage"), import("./pages/About"), import("./pages/Reviews"), import("./pages/Portfolio")];
  return [];
}

const mount = () => {
  const root = document.getElementById("root") as HTMLElement;
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // Пререндерираният HTML се хидратира (React „закача“ обработчиците към готовия DOM),
  // а не се изтрива и строи наново — иначе картите и снимките примигват при първото зареждане.
  if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
  else ReactDOM.createRoot(root).render(app);
};

captureFirstTouch();
trackContactClicks();

Promise.all(preloadFor(stripLang(window.location.pathname))).then(mount, mount);
