import { FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-gray-400 py-10 px-8 sm:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

        {/* Company Name and Tagline */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">Rafetov.com</h2>
          <p className="text-sm text-gray-500">Иновирайте вашия бизнес, едно решение наведнъж.</p>
        </div>

        {/* Navigation Links with Fixed Heights */}
        <div className="flex space-x-6 text-sm">
          <a href="#services" className="hover:text-pink-500 transition-colors">Проекти</a>
          <a href="#about" className="hover:text-pink-500 transition-colors">Услуги</a>
          <a href="#contact" className="hover:text-pink-500 transition-colors">Свържи се</a>
        </div>

        {/* Social Media Icons with Fixed Dimensions */}
        <div className="flex space-x-4 text-gray-500 text-lg">
          <a href="#" className="hover:text-pink-500 transition-colors" style={{ width: '24px', height: '24px' }}>
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="hover:text-pink-500 transition-colors" style={{ width: '24px', height: '24px' }}>
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-pink-500 transition-colors" style={{ width: '24px', height: '24px' }}>
            <FaTiktok size={20} />
          </a>
        </div>
      </div>

      {/* Copyright Section with Fixed Padding */}
      <div className="text-center mt-6 text-sm text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} RAFETOV.COM . ВСИЧКИ ПРАВА СА ЗАПАЗЕНИ.
      </div>
    </footer>
  );
};

export default Footer;