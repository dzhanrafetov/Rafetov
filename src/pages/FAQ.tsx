import  { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

const faqItems = [
  {
    question: 'What services do you offer?',
    answer: 'We offer comprehensive services including web development, mobile app design, SEO optimization, and digital marketing strategies.',
  },
  {
    question: 'How long does a project take?',
    answer: 'The duration varies based on complexity, generally ranging from 4 to 8 weeks, with a clear timeline provided at the start.',
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing, including fixed-rate, hourly, and retainer options, tailored to the project’s scope and needs.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes, our support and maintenance packages keep your project running smoothly, with ongoing updates and optimizations.',
  },
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(0); // Open the first item by default

  const filteredFaqItems = faqItems.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-8 sm:px-20">
      {/* Page Header */}
      <header className="text-center mb-12">
        <motion.h1
          className="text-5xl sm:text-6xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-teal-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          className="text-lg sm:text-2xl text-gray-400 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Find answers to common questions or get in touch if you need more help.
        </motion.p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            className="w-full p-4 pl-12 text-gray-200 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {filteredFaqItems.map((faq, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform group"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 100 }}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <h2 className="text-xl font-semibold text-gray-100 group-hover:text-blue-400 transition-colors">
                {faq.question}
              </h2>
              <FaChevronDown
                className={`text-gray-400 transform transition-transform duration-300 ${
                  expanded === index ? 'rotate-180' : ''
                }`}
              />
            </div>
            {expanded === index && (
              <motion.p
                className="text-gray-400 mt-4 leading-relaxed"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;