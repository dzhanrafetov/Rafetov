import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // махнат FaEnvelope
import sendEmail from '../service/emailService';

const FreeConsultation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await sendEmail(formData);
      setIsSending(false);
      setSuccessMessage('Вашето съобщение е изпратено успешно!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      setIsSending(false);
      alert('Грешка при изпращане на съобщението.');
      console.error('Email error:', error);
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-8 sm:px-20">
      {/* Page Header */}
      <header className="text-center mb-16">
        <motion.h1
          className="text-6xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-red-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          КОНТАКТ
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-400 mt-4 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Свържете се с нас и нека заедно превърнем вашите идеи в реалност!
        </motion.p>
      </header>

      {/* Contact Information */}
      <div className="flex flex-col lg:flex-row justify-center text-xl sm:text-xl gap-4 lg:gap-8 items-center mb-10 -mt-10">
        <div className="flex items-center space-x-2">
          <FaPhone className="text-lg text-green-400" />
          <p className="text-gray-300 font-medium">+359 897 758 062</p>
        </div>

        {/* ⬇ Премахнат имейл блок
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-lg text-blue-400" />
          <p className="text-gray-300 font-medium">business@rafetov.com</p>
        </div>
        */}

        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-lg text-pink-400" />
          <p className="text-gray-300 font-medium">Sofia, Bulgaria</p>
        </div>
      </div>

      <motion.div
        className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300"
        style={{ boxShadow: "0px 4px 30px rgba(138, 43, 226, 0.3)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-s font-medium mb-1">Име</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Въведете вашето име.."
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-s font-medium mb-1">Фамилия</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Въведете вашата фамилия.."
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-s font-medium mb-1">Имейл</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Въведете вашият имейл.."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-s font-medium mb-1">Телефонен Номер</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Въведете вашият тел.."
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-s font-medium mb-1">Избере Услуга</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="" disabled>
                  Изберете Услуга
                </option>
                <option value="уебсайт">Уебсайт</option>
                <option value="електронен магазин">Електронен Магазин</option>
                <option value="мобилно приложение">Мобилно Приложение</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-s font-medium mb-1">Съобщение</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              rows={3}
              placeholder="Опишете накратко за вашата идея"
              required
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="relative w-full py-3 text-xl font-extrabold rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-white shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            style={{ boxShadow: "0px 4px 20px rgba(255, 105, 135, 0.4)" }}
            whileHover={{
              scale: 1.03,
              background: "linear-gradient(90deg, rgba(245, 67, 142, 1) 0%, rgba(139, 68, 225, 1) 100%)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {isSending ? "Изпращане..." : "Изпрати"}
          </motion.button>

          {successMessage && (
            <p className="text-green-400 text-center mt-4">{successMessage}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default FreeConsultation;