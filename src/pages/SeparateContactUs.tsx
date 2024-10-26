import React from 'react';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <div className="min-h-screen text-gray-900">

      {/* Header Section with Background */}
      <div className="relative h-96 bg-yellow-500 bg-opacity-80 text-white flex items-center justify-center">
        <motion.h1
          className="text-6xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          İletişim
        </motion.h1>
      </div>

      {/* Invitation Section */}
      <section className="py-16 px-8 sm:px-20 bg-white text-center">
        <h2 className="text-4xl font-semibold text-gray-700 mb-4">Kahve İçmeye Bekleriz</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Markanızı online platformlara taşımak ve satışlarınızı artırmak konusunda markanıza yardımcı oluyoruz.
        </p>
      </section>

      {/* Contact Details and Map */}
      <div className="flex flex-col lg:flex-row lg:space-x-16 px-8 sm:px-20 py-16 bg-gray-100">

        {/* Contact Info */}
        <motion.div
          className="flex-1 space-y-8 text-gray-700"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center space-x-4">
            <FaPhone className="text-3xl text-blue-500" />
            <span className="text-2xl font-semibold">+1 234 567 890</span>
          </div>

          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-3xl text-green-500" />
            <span className="text-lg font-medium">info@yourcompany.com</span>
          </div>

          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-3xl text-red-500" />
            <span className="text-lg font-medium">
              1234 Elm Street, San Francisco, CA, 94103
            </span>
          </div>

          {/* Social Media */}
          <div className="flex space-x-6 mt-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl text-blue-600 hover:text-blue-500 transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl text-pink-600 hover:text-pink-500 transition duration-300" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl text-blue-700 hover:text-blue-600 transition duration-300" />
            </a>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          className="flex-1 mt-12 lg:mt-0 shadow-lg overflow-hidden rounded-lg"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.422512647058!2d-122.41941538440114!3d37.77492927975988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809cbb0a37f1%3A0x60a8cfd0f0b07b8e!2sSan%20Francisco%2C%20CA%2094103!5e0!3m2!1sen!2sus!4v1624344933227!5m2!1sen!2sus"
            className="w-full h-80 border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>

      {/* Contact Form Section */}
      <section className="py-16 px-8 sm:px-20 bg-white">
        <div className="max-w-3xl mx-auto bg-gray-800 text-white p-10 rounded-lg shadow-xl">
          <h3 className="text-3xl font-semibold mb-6 text-center">Send Us a Message</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-lg mb-2">Your Name</label>
              <input
                type="text"
                className="w-full p-4 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Email Address</label>
              <input
                type="email"
                className="w-full p-4 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Message</label>
              <textarea
                className="w-full p-4 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                placeholder="Write your message here"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;