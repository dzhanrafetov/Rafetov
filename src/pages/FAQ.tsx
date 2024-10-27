import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

const faqItems = [

  {
    question: 'Колко време отнема един проект?',
    answer: 'Продължителността зависи от сложността, обикновено от 1 до 2 седмици, като в началото предоставяме ясен график.',
  },
  {
    question: 'Каква е вашата ценова политика?',
    answer: 'Предлагаме фиксирани цени, съобразени с вашите нужди и изисквания за проекта.',
  },
  {
    question: 'Предоставяте ли поддръжка след пускане?',
    answer: 'Да, нашите пакети за поддръжка и обслужване осигуряват безпроблемна работа на проекта с актуализации и оптимизации.',
  },
  {
    question: 'Как мога да следя прогреса на проекта?',
    answer: 'Ние поддържаме редовна комуникация и предоставяме отчет за напредъка всяка седмица, за да сте информирани за развитието на проекта.',
  },
  {
    question: 'Предлагате ли персонализирани решения?',
    answer: 'Да, разработваме индивидуални решения, напълно адаптирани към вашите бизнес цели и специфични изисквания.',
  },
  {
    question: 'Имате ли опит в интеграцията на платежни системи?',
    answer: 'Да, имаме опит с интеграция на различни платежни системи, включително карти, PayPal и други популярни методи за онлайн плащания.',
  },
  {
    question: 'Мога ли да променям проекта в процеса на работа?',
    answer: 'Да, прилагаме гъвкав подход и сме отворени за промени, стига да бъдат обсъдени и съгласувани преди внедряване.',
  },
  {
    question: 'Какви технологии използвате?',
    answer: 'Работим с най-новите технологии и платформи, включително JavaScript, React, Node.js, и PHP, за да осигурим максимална ефективност и надеждност.',
  },
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState<number | null>(0); // Type the state as number or null

  const filteredFaqItems = faqItems.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white py-16 px-8 sm:px-20">
      {/* Page Header */}
      <header className="text-center mb-16">
        <motion.h1
          className="text-6xl sm:text-7xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-teal-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ВЪПРОСИ
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-400 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Открийте отговори на често задавани въпроси.
        </motion.p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            className="w-full p-4 pl-12 text-gray-200 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Потърси въпрос..."
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
            onClick={() => handleToggle(index)} // Make entire card clickable
            className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform group cursor-pointer"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15, type: 'spring', stiffness: 100 }}
          >
            <div className="flex justify-between items-center">
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