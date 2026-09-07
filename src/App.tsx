import React, { memo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import AppShell, { type Pages } from "./AppShell";

// Lazy loading pages (само в браузъра; при build се ползват eager версии — виж entry-server.tsx)
const pages: Pages = {
  Hero: React.lazy(() => import("./pages/Hero")),
  Services: React.lazy(() => import("./pages/Services")),
  Guarantees: React.lazy(() => import("./pages/Guarantees")),
  Market: React.lazy(() => import("./pages/OnlinePresenceCTA")),
  Portfolio: React.lazy(() => import("./pages/Portfolio")),
  BlogTeaser: React.lazy(() => import("./pages/BlogTeaser")),
  Contact: React.lazy(() => import("./pages/ContactUs")),
  PrivacyPolicy: React.lazy(() => import("./pages/PrivacyPolicy")),
  LegalNotice: React.lazy(() => import("./pages/LegalNotice")),
  BlogIndex: React.lazy(() => import("./pages/BlogIndex")),
  BlogPost: React.lazy(() => import("./pages/BlogPost")),
  ServicePage: React.lazy(() => import("./pages/ServicePage")),
  NotFound: React.lazy(() => import("./pages/NotFound")),
};

const App = () => (
  <Router>
    <AppShell pages={pages}>
      <Analytics />
    </AppShell>
  </Router>
);

export default memo(App);
