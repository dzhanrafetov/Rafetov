// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { stripLang } from "./i18n";

/**
 * Страниците са пререндерирани в HTML (виж scripts/prerender.mjs). За да не мига спинър
 * върху вече видимото съдържание, зареждаме предварително частите за текущия адрес
 * и чак тогава монтираме React (React заменя статичния HTML при първия render).
 */
function preloadFor(path: string): Promise<unknown>[] {
  if (path === "/") {
    return [
      import("./pages/Hero"),
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
  if (/^\/(uslugi|services|leistungen)\//.test(path)) return [import("./pages/ServicePage")];
  return [];
}

const mount = () => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

Promise.all(preloadFor(stripLang(window.location.pathname))).then(mount, mount);
