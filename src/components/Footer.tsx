import { FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

        {/* Company Name and Tagline */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-white">RAFETOV.COM</h2>
          <p className="text-s text-gray-500">Иновирайте вашия бизнес, едно решение наведнъж.</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4 text-sm">
          <a href="#services" className="hover:text-pink-400 transition-colors duration-150">Проекти</a>
          <a href="#about" className="hover:text-pink-400 transition-colors duration-150">Услуги</a>
          <a href="#contact" className="hover:text-pink-400 transition-colors duration-150">Свържи се</a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-3 text-gray-500 text-lg">
          <a href="#" className="hover:text-pink-400 transition-colors duration-150">
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-pink-400 transition-colors duration-150">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-pink-400 transition-colors duration-150">
            <FaTiktok className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-4 text-xs text-gray-500 border-t border-gray-700 pt-3">
        &copy; {new Date().getFullYear()} RAFETOV.COM. ВСИЧКИ ПРАВА СА ЗАПАЗЕНИ.
      </div>
    </footer>
  );
};

export default Footer;