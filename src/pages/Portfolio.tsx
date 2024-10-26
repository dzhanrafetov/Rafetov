import { motion } from 'framer-motion';
import SkarataLogo from '../assets/skarataLogo.jpg';
import SkarataWeb from '../assets/skarataWeb.png';
import DjanamLogo from '../assets/djanam-logo.svg';

const portfolioItems = [
  {
    id: 1,
    title: 'Skarata',
    description: 'Уебсайт за ресторант',
    logo: SkarataLogo,
    screenshot: SkarataWeb,
    link: 'https://skarata.bg',
  },
  {
    id: 2,
    title: 'Djanam & La Opera',
    description: 'Уебсайт за ресторант & стекхаус',
    logo: DjanamLogo,
    screenshot: SkarataWeb,
    link: 'https://djanam.bg',
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-8 sm:px-20">
      {/* Header */}
      <header className="text-center mb-16">
        <motion.h1
          className="text-6xl sm:text-7xl  font-extrabold tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ПРОЕКТИ
        </motion.h1>
        <motion.p
          className="text-md sm:text-xl text-gray-400 mt-4 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Experience a curated selection of responsive web projects and mobile app designs that blend creativity and functionality.
        </motion.p>




      </header>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {portfolioItems.map((item) => (
          <motion.a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            key={item.id}
            className="group block rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <motion.div
              className="flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Logo and Title Section */}
              <div className="p-6 flex items-center space-x-6">
                {/* Logo */}
                <motion.div
                  className="w-20 h-20 md:w-24 md:h-24 relative"
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 200, duration: 0.6 }}
                >
                  <img
                    src={item.logo}
                    alt={`${item.title} logo`}
                    className="w-full h-full object-cover rounded-full border-2 border-gray-700 shadow-lg"
                  />
                </motion.div>

                {/* Title and Description */}
                <div className="flex-grow">
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-gray-300 text-md md:text-lg mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Screenshot Section */}
              <div className="relative overflow-hidden flex-grow">
                <motion.img
                  src={item.screenshot}
                  alt={`${item.title} screenshot`}
                  className="w-full h-48 md:h-60 lg:h-72 object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Soft Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;