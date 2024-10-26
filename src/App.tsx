import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './pages/Hero';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import HowWeWork from './pages/FAQ';
import Market from './pages/OnlinePresenceCTA';
import Contact from './pages/ContactUs';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Services />
              <Market />

              <Portfolio />

              <HowWeWork />
               <Contact />
              {/* <Separate /> */}

            </>
          }
        />
      </Routes>
      <Footer />

    </Router>
  );
};

export default App;
