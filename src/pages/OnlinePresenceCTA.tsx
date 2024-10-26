import { motion } from 'framer-motion';
import { FaLightbulb, FaSearchDollar, FaGlobe, FaUserClock } from 'react-icons/fa';

const keyPoints = [
  {
    id: 1,
    title: '24/7 Visibility',
    description: 'Your business is always open online, welcoming new customers anytime.',
    icon: FaUserClock,
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'Reach Global Audiences',
    description: 'Go beyond your local market and sell to a global audience with ease.',
    icon: FaGlobe,
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 3,
    title: 'Increase Sales Opportunities',
    description: 'Capture leads and drive sales with a tailored online experience.',
    icon: FaSearchDollar,
    color: 'from-pink-500 to-red-500',
  },
  {
    id: 4,
    title: 'Build Brand Trust',
    description: 'Showcase your expertise and establish your authority in the market.',
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
         ЗА ВАШИЯТ БИЗНЕС
        </motion.h1>
        <motion.p
          className="text-md sm:text-xl text-gray-400 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          Силното дигитално присъствие е основата на успеха в съвременния бизнес.      </motion.p>
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
              className="p-5 rounded-full bg-black bg-opacity-50 shadow-xl transform group-hover:rotate-45 transition-transform duration-500"
              whileHover={{ rotate: 360 }}
            >
              <point.icon className="text-4xl text-white" />
            </motion.div>

            {/* Title and Description */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-white">{point.title}</h3>
              <p className="mt-2 text-gray-200">{point.description}</p>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"
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
        <motion.a
          href="/get-started"
          className="inline-block py-4 px-12 bg-gradient-to-r from-teal-400 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Get Started Now
        </motion.a>
      </section>
    </div>
  );
};

export default OnlinePresenceCTA;