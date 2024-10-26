import { motion } from 'framer-motion';
import { FiGlobe, FiSmartphone, FiShare2 } from 'react-icons/fi';

const servicesData = [
  {
    id: 1,
    icon: FiGlobe,
    title: 'Уебсайт',
    description: 'Innovative, scalable, and high-performance web applications.',
    iconColor: 'text-blue-500',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    icon: FiGlobe,
    title: 'Електронен магазин',
    description: 'Innovative, scalable, and high-performance web applications.',
    iconColor: 'text-blue-500',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 3,
    icon: FiSmartphone,
    title: 'Мобилно Приложение',
    description: 'Powerful mobile apps tailored to your business needs.',
    iconColor: 'text-green-500',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 4,
    icon: FiShare2,
    title: 'Управление на социалните медии',
    description: 'Maximize your social presence and engage your audience.',
    iconColor: 'text-purple-500',
    gradient: 'from-purple-500 to-pink-600',
  },

  // {
  //   id: 4,
  //   icon: FiCamera,
  //   title: 'Рекламно видео',
  //   description: 'User-generated content to build trust and authenticity.',
  //   iconColor: 'text-yellow-500',
  //   gradient: 'from-yellow-500 to-orange-600',
  // },
];




const ServiceCard = ({ icon: Icon, title, description, iconColor, gradient }) => (
  <motion.div
    className="group relative p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <Icon className={`text-4xl ${iconColor} mx-auto mb-6 group-hover:scale-110 transition-transform`} />
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
    {/* Decorative Glow */}
    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>
  </motion.div>
);

// Services Page Component
const Services = () => (
  <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-6 sm:px-20 ">
    {/* Page Header */}
    <header className="text-center mb-16">
      <motion.h1

        className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-wide bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        УСЛУГИ
      </motion.h1>




      <motion.p
        className="text-xl sm:text-xl text-gray-400 mt-4 max-w-3xl mx-auto"

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Със знания и опит в различни области, предлагаме услуги, които ви улесняват и дават резултати.        </motion.p>
    </header>

    {/* Services Grid */}
    <section className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
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
  </div>
);

export default Services;