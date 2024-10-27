import djanam from '../assets/djanam-logo.svg';
import skarata from '../assets/skarataTest.png';
import azteca from '../assets/azteca_v2.png';
import laopera from '../assets/laoopera.png';

import { motion } from 'framer-motion';

const Hero = () => {
  const clientLogos = [
    { src: djanam, alt: 'Djanam' },
    { src: skarata, alt: 'Skarata' },
    { src: azteca, alt: 'Azteca' },
    { src: laopera, alt: 'La Opera' },

  ];

  return (
    <div className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col justify-center items-center px-6 py-36 sm:py-40 overflow-hidden">



      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl space-y-8 sm:space-y-10">

        {/* Headline with Glow Effect */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-wide leading-tight mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ОТКРИЙТЕ
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-teal-400 glow-text">
            ДИГИТАЛНИ РЕШЕНИЯ
          </span>
          ЗА ВАШИЯ УСПЕХ
        </motion.h1>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <button className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
            Започнете Проект
          </button>
          <button className="relative bg-transparent border border-gray-400 text-white font-semibold py-3 px-8 sm:py-4 sm:px-12 rounded-full hover:bg-gray-800 hover:border-gray-300 transition-all duration-300 transform hover:scale-105">
            Нашите Проекти
          </button>
        </motion.div>

        {/* Rotating Client Logos */}
        <motion.div
  className="flex flex-col items-center space-y-6 mt-10 sm:mt-16"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1, delay: 1 }}
>
  <h3 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">Нашите Клиенти</h3>

  {/* Wrapping flex container for logos */}
  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 opacity-100">
    {clientLogos.map((logo, index) => (
      <motion.img
        key={index}
        src={logo.src}
        alt={logo.alt}
        className="h-20 w-auto sm:h-20 md:h-24 transition-transform duration-500 ease-in-out transform hover:scale-110"
      />
    ))}
  </div>
</motion.div>
      </div>
    </div>
  );
};

export default Hero;


