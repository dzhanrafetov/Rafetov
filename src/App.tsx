import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy loading pages
const Hero = React.lazy(() => import('./pages/Hero'));
const Services = React.lazy(() => import('./pages/Services'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const HowWeWork = React.lazy(() => import('./pages/FAQ'));
// const Market = React.lazy(() => import('./pages/OnlinePresenceCTA'));
const Contact = React.lazy(() => import('./pages/ContactUs'));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Portfolio />
                {/* <Market /> */}
                <Contact />
                <HowWeWork />
              </>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default App;