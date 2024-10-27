import { motion } from 'framer-motion';
import { FiGlobe, FiSmartphone, FiShoppingCart } from 'react-icons/fi';

const servicesData = [
  {
    id: 1,
    icon: FiGlobe,
    title: 'Уебсайт',
    description: 'Създаваме професионални уебсайтове, които привличат вниманието и изграждат доверие у вашите клиенти.',
    iconColor: 'text-blue-500',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    icon: FiShoppingCart,
    title: 'Електронен магазин',
    description: 'Създаваме електронни магазини, които са удобни за управление и оптимизирани за продажби.',
    iconColor: 'text-blue-500',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 3,
    icon: FiSmartphone,
    title: 'Мобилнo Приложениe',
    description: 'Създаваме персонализирани мобилни приложения за iOS и Android, които отговарят на вашите специфични нужди.',
    iconColor: 'text-blue-500',
    gradient: 'from-blue-500 to-indigo-600',
  },
  // Additional services here...
];

const ServiceCard = ({ icon: Icon, title, description, iconColor, gradient }) => (
  <motion.div
    className="group relative  p-6 md:p-8 bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-md rounded-3xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border border-transparent hover:border-opacity-100 hover:border-cyan-300/50"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    {/* Icon with Glass Effect */}
    <div className="flex items-center justify-center mb-6 relative ">
      <Icon
        className={`text-6xl md:text-7xl ${iconColor} relative z-10 transition-transform transform group-hover:scale-110`}
        style={{ filter: 'drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.2))' }}
      />
      <div
        className="absolute inset-0 w-20 h-20 bg-white/10 rounded-full blur-3xl group-hover:opacity-30"
      ></div>
    </div>

    {/* Gradient Title */}
    <h3 className="text-2xl font-semibold text-white mb-2 tracking-wide">
      {title}
    </h3>

    {/* Description with Readability Enhancement */}
    <p className="text-gray-200 leading-relaxed text-sm md:text-base">
      {description}
    </p>

    {/* Hover Glow Effect */}
    <div
      className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-25 blur-lg transition-opacity duration-500`}
    ></div>

    {/* Soft Border Highlight */}
    <div
      className="absolute inset-0 border-[1.5px] border-transparent rounded-3xl group-hover:border-cyan-300/50 transition duration-700 opacity-0 group-hover:opacity-100"
    ></div>
  </motion.div>
);

// Services Page Component
const Services = () => (
  <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-8 sm:px-20 -mt-20">
    {/* Page Header */}
    <header className="text-center mb-16">
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wide bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        УСЛУГИ
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl text-gray-400 mt-4 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Комплексни дигитални решения, съобразени с нуждите на вашия бизнес.
      </motion.p>
    </header>

    {/* Services Grid */}
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
      {servicesData.map((service) => (
        <ServiceCard
          key={service.id}
          icon={service.icon}
          title={service.title}
          description={service.description}
          iconColor={service.iconColor}
          gradient={service.gradient}
        />
      ))}
    </section>
    <section className="text-center mt-28 relative">
  {/* Background Particles or Overlay */}
  <div className="absolute inset-0 flex justify-center items-center">
    <div className="w-80 h-80 bg-gradient-to-r from-teal-400 to-purple-500 opacity-20 blur-3xl rounded-full transform scale-125"></div>
  </div>

  {/* Heading with Glow Effect */}
  <motion.h2
    className="relative z-10 text-4xl sm:text-5xl font-bold text-white mb-6"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    style={{ textShadow: '0px 0px 15px rgba(255, 255, 255, 0.7)' }}
  >
    ВЕЧЕ ВСИЧКО Е ДИГИТАЛНО..
  </motion.h2>



  {/* Floating Particles */}
  <div className="absolute inset-0 pointer-events-none z-0">
    {/* Particle 1 */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-6 h-6 bg-white rounded-full opacity-20"
      animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
    ></motion.div>
    {/* Particle 2 */}
    <motion.div
      className="absolute top-1/3 right-1/3 w-8 h-8 bg-white rounded-full opacity-10"
      animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    ></motion.div>
    {/* Particle 3 */}
    <motion.div
      className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-white rounded-full opacity-30"
      animate={{ y: [0, -10, 0], x: [0, 15, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
    ></motion.div>
  </div>
</section>
  </div>
);

export default Services;