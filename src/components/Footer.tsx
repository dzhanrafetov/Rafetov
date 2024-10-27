import { FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 via-gray-900 to-black text-gray-400 py-10 px-8 sm:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

        {/* Company Name and Tagline */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">Rafetov.com</h2>
          <p className="text-sm text-gray-500">Innovating your business, one solution at a time.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#services" className="hover:text-pink-500 transition-colors">Services</a>
          <a href="#about" className="hover:text-pink-500 transition-colors">About</a>
          <a href="#contact" className="hover:text-pink-500 transition-colors">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-gray-500 text-lg">
          <a href="#" className="hover:text-pink-500 transition-colors"><FaFacebookF /></a>

          <a href="#" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-pink-500 transition-colors"><FaTiktok /></a>

        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-6 text-sm text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} RAFETOV.COM . ВСИЧКИ ПРАВА СА ЗАПАЗЕНИ.
      </div>
    </footer>
  );
};

export default Footer;