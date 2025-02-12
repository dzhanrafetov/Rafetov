import { motion } from 'framer-motion';
import SkarataWeb from '../assets/skarata_1.webp';
import DjanamWeb from '../assets/djanam_2.webp';
import AztecaWeb from '../assets/azteca.webp';
import KoleloWeb from '../assets/ekolelo.webp';
import DGroup from '../assets/zStroitel.webp';
import Zeus from '../assets/zZeus.webp';
import Mebelen from '../assets/mMebeli.webp';
import Eacf from '../assets/eacf.webp';
import Slap from '../assets/slap2.webp';


const portfolioItems = [
  {
    id: 1,
    title: 'Skarata',
    description: 'Уебсайт за ресторант',
    screenshot: SkarataWeb,
    link: 'https://www.skarata.bg',
  },
  {
    id: 2,
    title: 'Djanam & La Opera',
    description: 'Уебсайт за ресторант',
    screenshot: DjanamWeb,
    link: 'https://djanam-laopera.bg',
  },
  {
    id: 2,
    title: 'Azteca Cigars',
    description: 'Е-магазин за пури',
    screenshot: AztecaWeb,
    link: 'https://azteca-premium.com',
  },
  {
    id: 2,
    title: 'Slap Fight BG',
    description: 'Уебсайт за закупуване на билети',
    screenshot: Slap,
    link: 'https://slapfightbulgaria.com/',
  },
  {
    id: 2,
    title: 'ERB',
    description: 'Уебсайт за наемане на колела',
    screenshot: KoleloWeb,
    link: 'https://d-group.bg/emil/public/index.php',
  },

  {
    id: 2,
    title: 'EACF',
    description: 'Уебсайт за фондация',
    screenshot: Eacf,
    link: 'https://eacf-bg.eu/',
  },

  {
    id: 2,
    title: 'D-Group',
    description: 'Е-магазин за мебели',
    screenshot: Mebelen,
    link: 'https://d-group.bg/dudo-mebeli/',
  },




  {
    id: 2,
    title: 'Zeus & Hera',
    description: 'Уебсайт за ресторант',
    screenshot: Zeus,
    link: 'https://d-group.bg/zeus-hera/',
  },
  {
    id: 2,
    title: 'D-Group',
    description: 'Е-магазин за строителен хипермаркет',
    screenshot: DGroup,
    link: 'https://d-group.bg/dudo-stroitelen/index.php',
  },


];

const Portfolio = () => {
  return (
    <div  id="portfolio" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-8 sm:px-20">
      {/* Header */}
      <header className="text-center mb-16">
        <motion.h1
          className="text-6xl sm:text-7xl font-extrabold tracking-wide bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ПРОЕКТИ
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-400 mt-4 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Създаваме решения, които привличат и задържат аудиторията.
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
      className="group relative block rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg"
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <motion.div
        className="flex flex-col h-full relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Floating Logo Section
        <div className="absolute top-4 left-4 bg-white/30 p-2 rounded-full shadow-md backdrop-blur-md">
          <img
            src={item.logo}
            alt={`${item.title} logo`}
            className="w-12 h-12 object-cover rounded-full"
          />
        </div> */}

        {/* Screenshot Section with Overlay */}
        <div className="relative overflow-hidden flex-grow rounded-xl shadow-inner transition-transform duration-500 group-hover:scale-105">
          <motion.img
            src={item.screenshot}
            alt={`${item.title} screenshot`}
            className="w-full h-48 md:h-60 lg:h-72 object-cover rounded-xl"
          />
          {/* Title and Description Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/90 to-transparent p-3">
            <h3 className="text-lg md:text-2xl  font-bold text-white drop-shadow-lg">{item.title}</h3>
            <p className="text-gray-300 text-sm mt-1 drop-shadow-md">{item.description}</p>
          </div>
        </div>

        {/* Soft Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
      </motion.div>
    </motion.a>
  ))}
</div>
    </div>
  );
};

export default Portfolio;