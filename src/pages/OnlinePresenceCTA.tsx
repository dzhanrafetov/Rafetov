import { motion } from 'framer-motion';
import { FaLightbulb, FaSearchDollar, FaGlobe, FaUserClock } from 'react-icons/fa';

const keyPoints = [
  {
    id: 1,
    title: 'Видимост 24/7',
    description: 'Вашият бизнес е винаги отворен онлайн, приветствайки нови клиенти по всяко време.',
    icon: FaUserClock,
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'Достигнете глобални аудитории',
    description: 'Превъзмогнете местния си пазар и продавайте на глобална аудитория с лекота.',
    icon: FaGlobe,
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 3,
    title: 'Увеличете възможностите за продажби',
    description: 'Уловете потенциални клиенти и стимулирайте продажбите с персонализирано онлайн преживяване.',
    icon: FaSearchDollar,
    color: 'from-pink-500 to-red-500',
  },
  {
    id: 4,
    title: 'Изградете доверие в бранда',
    description: 'Покажете своята експертиза и утвърдете авторитета си на пазара.',
    icon: FaLightbulb,
    color: 'from-yellow-500 to-orange-500',
  },
];

const OnlinePresenceCTA = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-8 sm:px-20">
      {/* Section Header */}
      <header className="text-center mb-16">
        <motion.h1
          className="text-6xl sm:text-7xl font-extrabold tracking-wide bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        ВАШИЯТ БИЗНЕС
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-400 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
Изградете видимост, спечелете доверие и разширете бизнеса си с интелигентно дигитално присъствие.
        </motion.p>
      </header>
      <section className="relative grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 p-8 lg:p-16 -mt-14 ">
  {keyPoints.map((point) => (
    <motion.div
      key={point.id}
      className="relative p-10 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-500 bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        perspective: "1000px",
      }}
      whileHover={{
        rotateX: 10,
        rotateY: -10,
      }}
    >
      {/* Light Trail Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-10 blur-lg pointer-events-none " style={{
          backgroundPosition: "100% 0%",
          backgroundSize: "300% 300%",
          // animation: "slide 5s linear infinite"
      }}></div>

      {/* Icon with Neon Accent */}
      <div className="relative z-10 flex items-center justify-center mb-6">
        <point.icon className="text-5xl text-teal-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
      </div>

      {/* Title and Description */}
      <div className="relative z-10 text-center">
        <h3 className="text-2xl font-semibold text-white mb-3" style={{ textShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}>
          {point.title}
        </h3>
        <p className="text-gray-300 leading-relaxed">
          {point.description}
        </p>
      </div>

      {/* Animated Border Glow */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none" style={{
          borderImage: "linear-gradient(45deg, teal, purple) 1",
          animation: "borderGlow 5s ease-in-out infinite alternate"
      }}></div>
    </motion.div>
  ))}


</section>


    </div>
  );
};

export default OnlinePresenceCTA;