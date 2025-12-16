import React, { Suspense, memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react"

// Lazy loading pages
const Hero = React.lazy(() => import('./pages/Hero'));
const Services = React.lazy(() => import('./pages/Services'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const HowWeWork = React.lazy(() => import('./pages/FAQ'));
const Market = React.lazy(() => import('./pages/OnlinePresenceCTA'));
const Contact = React.lazy(() => import('./pages/ContactUs'));

// Minimal Spinner as fallback
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen text-gray-500">
    <span className="loader" aria-label="Loading content" />
  </div>
);

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Suspense fallback={<Loader />}>
                  <Services />
                </Suspense>
                <Suspense fallback={<Loader />}>
                  <Portfolio />
                </Suspense>
                <Suspense fallback={<Loader />}>
                  <Market />
                </Suspense>
                <Suspense fallback={<Loader />}>
                  <Contact />
                </Suspense>
                {/* <Suspense fallback={<Loader />}>
                  <HowWeWork />
                </Suspense> */}
              </>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
      <Analytics /> {/* Include Analytics component here */}

    </Router>
  );
};

// Memoized Header and Footer to avoid re-renders
export default memo(App);