

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


const PremiumCTA = () => {
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

      {/* Key Points Section */}
  <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
  {keyPoints.map((point) => (
    <motion.div
      key={point.id}
      className={`group relative p-8 rounded-2xl bg-gradient-to-br ${point.color} transform hover:scale-105 transition-transform duration-500`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Icon */}
      <motion.div
        className="p-5 rounded-full bg-black bg-opacity-40 shadow-xl transform group-hover:rotate-45 transition-transform duration-500"
        whileHover={{ rotate: 360 }}
      >
        <point.icon className="text-4xl text-gray-200 drop-shadow-md" />
      </motion.div>

      {/* Title and Description */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-200 leading-tight" style={{ textShadow: '0px 0px 6px rgba(0, 0, 0, 0.6)' }}>
          {point.title}
        </h3>
        <p className="mt-2 text-base text-gray-300 font-normal leading-relaxed" style={{ textShadow: '0px 0px 4px rgba(0, 0, 0, 0.5)' }}>
          {point.description}
        </p>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-200 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ zIndex: -1 }}
      />
    </motion.div>
  ))}
</section>

      {/* CTA Section */}
      <section className="text-center mt-28">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-white mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Take Your Business Online Today
        </motion.h2>

      </section>
    </div>
  );
};

export default PremiumCTA;
