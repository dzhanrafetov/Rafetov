import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div
      id="hero"
      className="relative bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col justify-center items-center px-6 py-36 sm:py-40 overflow-hidden"
    >
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
          <Link
            to="contact"
            smooth
            duration={200}
            offset={-70}
            className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-3 px-8 sm:py-4 sm:px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
          >
            Започнете Проект
          </Link>
          <Link
            to="portfolio"
            smooth
            duration={200}
            offset={-70}
            className="relative bg-transparent border border-gray-400 text-white font-semibold py-3 px-8 sm:py-4 sm:px-12 rounded-full hover:bg-gray-800 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            Нашите Проекти
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;