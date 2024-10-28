import { motion } from 'framer-motion';
import { FaLightbulb, FaSearchDollar, FaGlobe, FaUserClock } from 'react-icons/fa';

const keyPoints = [
  {
    id: 1,
    title: 'Видимост 24/7',
    description: 'Вашият бизнес е винаги отворен онлайн, приветствайки нови клиенти по всяко време.',
    icon: FaUserClock,
    color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'Достигнете глобални аудитории',
    description: 'Превъзмогнете местния си пазар и продавайте на глобална аудитория с лекота.',
    icon: FaGlobe,
    color: 'bg-gradient-to-br from-green-800 to-teal-600',
  },
  {
    id: 3,
    title: 'Увеличете възможностите за продажби',
    description: 'Уловете потенциални клиенти и стимулирайте продажбите с персонализирано онлайн преживяване.',
    icon: FaSearchDollar,
    color: 'bg-gradient-to-br from-pink-700 to-red-800',
  },
  {
    id: 4,
    title: 'Изградете доверие в бранда',
    description: 'Покажете своята експертиза и утвърдете авторитета си на пазара.',
    icon: FaLightbulb,
    color: 'bg-gradient-to-br from-amber-600 to-orange-800',
  },
];

const PremiumCTA = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-8 sm:px-20">
      {/* Section Header */}
      <header className="text-center mb-16">
        <motion.h1
          className="text-6xl sm:text-7xl font-extrabold tracking-wide bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ВАШИЯТ БИЗНЕС
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-400 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Изградете видимост, спечелете доверие и разширете бизнеса си с интелигентно дигитално присъствие.
        </motion.p>
      </header>

      {/* Key Points Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {keyPoints.map((point) => (
          <div
            key={point.id}
            className={`relative p-8 rounded-2xl ${point.color} text-center bg-opacity-10 backdrop-blur-md shadow-md transition-transform duration-300 hover:scale-105`}
          >
            {/* Icon */}
            <div className="p-4 rounded-full bg-white/20 shadow-md mb-6 flex  items-center justify-center ">
              <point.icon className="text-4xl text-gray-200" />
            </div>

            {/* Title and Description */}
            <h3 className="text-2xl font-semibold text-gray-200 leading-tight mb-2">
              {point.title}
            </h3>
            <p className="text-base  font-semibold text-gray-300 leading-relaxed">
              {point.description}
            </p>
          </div>
        ))}
      </section>
  {/* CTA Section */}
  <section className="text-center mt-28">
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-white mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        ЗАЕДНО КЪМ ВАШИТЕ ЦЕЛИ
      </motion.h2>
    </section>

    </div>
  );
};

export default PremiumCTA;