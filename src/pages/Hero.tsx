import { useState } from 'react';
import djanam from '../assets/djanam-logo.svg';
import skarata from '../assets/skarataTest.png';
import azteca from '../assets/azteca_v2.png';

import anotherClientLogo from '../assets/laoopera.png'; // Add more logos as needed
import { motion } from 'framer-motion';

const Hero = () => {
  const [setAnimationComplete] = useState(false);

  // Array of client logos
  const clientLogos = [
    { src: djanam, alt: 'Djanam' },
    { src: anotherClientLogo, alt: 'Another Client' },

    { src: skarata, alt: 'Skarata' },
    { src: azteca, alt: 'Another Client' },

    // Add more logos here as needed
  ];

  return (
    <div className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col justify-center items-center px-6 py-36 sm:py-40 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900 via-black to-black opacity-60 pointer-events-none"></div>

      {/* Centralized Content */}
      <div className="relative z-10 text-center max-w-6xl space-y-8 sm:space-y-10">

        {/* Main Heading */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-custom-xl sm:text-5xl md:text-8xl font-extrabold tracking-wide mb-4 leading-tight">
            ДИГИТАЛНИ <br />
            РЕШЕНИЯ ЗА
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              ВАШИЯТ БИЗНЕС
            </span>
          </h1>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <button className="relative bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-3 px-6 sm:py-4 sm:px-10 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
            Безплатна консултация
          </button>

          <button className="relative bg-transparent border border-gray-400 text-white font-semibold py-3 px-6 sm:py-4 sm:px-10 rounded-full hover:bg-gray-800 hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105">
            Нашите проекти
          </button>
        </motion.div>

        {/* Client Logos with Enhanced Auto-Hover Animation */}
        <motion.div
          className="flex flex-col items-center space-y-6 mt-10 sm:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h3 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">НАШИТЕ КЛИЕНТИ</h3>
          <div className="flex space-x-6 sm:space-x-8 opacity-90">
            {clientLogos.map((logo, index) => (
              <motion.img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="h-14 sm:h-20  transition-transform duration-500 ease-in-out hover:scale-110 hover:grayscale-0 hover:drop-shadow-lg"

                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                  delay: index * 0.3,
                }}
                onAnimationComplete={() => {
                  if (index === clientLogos.length - 1) {
                    setAnimationComplete(true);
                  }
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;