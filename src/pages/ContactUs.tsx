import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FreeConsultation = () => {
  return (
    <div  id="contact" className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-8 sm:px-20">

      {/* Page Header */}
      <header className="text-center mb-16">
        <motion.h1
          className="text-6xl sm:text-7xl  font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-red-400"
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
  <div className="flex items-center space-x-2">
    <FaEnvelope className="text-lg text-blue-400" />
    <p className="text-gray-300 font-medium">business@rafetov.com</p>
  </div>
  <div className="flex items-center space-x-2">
    <FaMapMarkerAlt className="text-lg text-pink-400" />
    <p className="text-gray-300 font-medium">Sofia, Bulgaria</p>
  </div>
</div>

      {/* Consultation Form */}
      <motion.div
        className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300"
        style={{ boxShadow: "0px 4px 30px rgba(138, 43, 226, 0.3)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-s font-medium mb-1">Име</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent focus:ring-gradient"
                placeholder="Въведете вашето име.."
              />
            </div>
            <div>
              <label className="block text-gray-400 text-s font-medium mb-1">Фамилия</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent focus:ring-gradient"
                placeholder="Въведете вашата фамилия.."
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-400 text-s font-medium mb-1">Имейл</label>
            <input
              type="email"
              className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent focus:ring-gradient"
              placeholder="Въведете вашият имейл.."
            />
          </div>

          {/* Phone and Services Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-s font-medium mb-1">Телефонен Номер</label>
              <input
                type="text"
                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent focus:ring-gradient"
                placeholder="Въведете вашият тел.."
              />
            </div>
            <div>
              <label className="block text-gray-400 text-s font-medium mb-1">Избере Услуга</label>
              <select
                className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent focus:ring-gradient"
              >
                <option value="" disabled selected>
                  Изберете Услуга
                </option>
                <option value="website">Уебсайт</option>
                <option value="shop">Електронен Магазин</option>
                <option value="app">Мобилно приложение</option>
              </select>
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-gray-400 text-s font-medium mb-1">Съобщение</label>
            <textarea
              className="w-full px-3 py-2 text-sm rounded-lg bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:border-transparent focus:ring-gradient"
              rows={3}
              placeholder="Опишете накратко за вашата идея"
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="relative w-full py-3 text-xl font-extrabold rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-white shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            style={{
              boxShadow: "0px 4px 20px rgba(255, 105, 135, 0.4)", // Soft glow effect
            }}
            whileHover={{
              scale: 1.03,
              background: "linear-gradient(90deg, rgba(245, 67, 142, 1) 0%, rgba(139, 68, 225, 1) 100%)", // Transition color
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Изпрати</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default FreeConsultation;