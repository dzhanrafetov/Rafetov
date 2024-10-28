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
];

const ServiceCard = ({ icon: Icon, title, description, iconColor }) => (
  <motion.div
    className="group relative p-6 md:p-8 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl shadow-lg transition-transform transform hover:scale-[1.02] hover:shadow-xl border border-transparent"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    {/* Icon */}
    <div className="flex items-center justify-center mb-6 relative">
      <Icon className={`text-6xl md:text-7xl ${iconColor} relative z-10`} />
    </div>

    {/* Gradient Title */}
    <h3 className="text-2xl font-semibold text-white mb-2 tracking-wide">
      {title}
    </h3>

    {/* Description */}
    <p className="text-gray-200 leading-relaxed text-sm md:text-base">
      {description}
    </p>

    {/* Hover Border Highlight */}
    <div
      className={`absolute inset-0 rounded-3xl border border-transparent group-hover:border-cyan-300/50 transition duration-500`}
    ></div>
  </motion.div>
);

const Services = () => (
  <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-8 sm:px-20 ">
    {/* Page Header */}
    <header className="text-center mb-16">
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wide bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        УСЛУГИ
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl text-gray-400 mt-4 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
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
          // gradient={service.gradient}
        />
      ))}
    </section>
  </div>
);

export default Services;