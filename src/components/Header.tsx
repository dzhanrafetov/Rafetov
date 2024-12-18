import  { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-scroll';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <>
      {/* Header Section */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? 'backdrop-blur-md bg-opacity-50 bg-black'
            : 'bg-transparent'
        } ${isMenuOpen ? 'bg-transparent' : ''}`} // Apply blur when menu is open
      >
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-6 flex justify-between items-center">
          {/* Conditionally Render RAFETOV.COM */}
          {!isMenuOpen && (
            <div className="text-lg md:text-2xl font-bold text-white">
              RAFETOV.COM
            </div>
          )}

          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            className="border-2 border-white text-white font-medium py-2 px-4 md:px-6 rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center space-x-2"
          >
              <span>Меню</span>
            {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Blur background when the menu is open */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          isMenuOpen ? 'backdrop-blur-md opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      ></div>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-60 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 backdrop-blur-md' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu} // Close the menu when clicking outside
      ></div>

      {/* Sliding Menu with Rounded Corners */}
      <div
        className={`fixed top-0 right-0 w-64 sm:w-72 max-h-[90vh] bg-white text-black rounded-3xl z-50 transform transition-transform duration-300 flex flex-col justify-between p-6 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          borderRadius: '40px 0px 0px 40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Close Button */}
        <div className="flex justify-end w-full">
          <button
            onClick={toggleMenu}
            className="text-black hover:text-gray-600 transition-colors duration-300"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Links */}

        <nav className="flex-1 flex flex-col justify-center space-y-8 text-2xl font-semibold text-center">
        <Link
            to="hero"
            smooth={true}
            duration={200}
            offset={-70}
            onClick={toggleMenu}
            className="hover:text-gray-600 transition-colors duration-300 transform hover:scale-105 cursor-pointer"
          >
            Начало
          </Link>
          <Link
            to="services"
            smooth={true}
            duration={200}
            offset={-70}
            onClick={toggleMenu}

            className="hover:text-gray-600 transition-colors duration-300 hover:shadow-s transform hover:scale-105 transition duration-300 cursor-pointer"
          >
            Услуги
          </Link>
          <Link
            to="portfolio"
            smooth={true}
            duration={200}
            offset={-70}
            onClick={toggleMenu}

            className="hover:text-gray-600 transition-colors duration-300 hover:shadow-s transform hover:scale-105 transition duration-300 cursor-pointer"
          >
            Проекти
          </Link>

          <Link
            to="contact"
            smooth={true}
            duration={200}
            offset={-70}
            onClick={toggleMenu}

            className="hover:text-gray-600 transition-colors duration-300 hover:shadow-s transform hover:scale-105 transition duration-300 cursor-pointer"
          >
            Свържи се
          </Link>

        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-between items-center space-x-6 mt-4 px-4">
          <a href="https://www.instagram.com/rafetov.com_/" target="_blank" rel="noopener noreferrer" className="p-2">
            <FaInstagram className="w-8 h-8 md:w-10 md:h-10 text-black hover:text-gray-600 transition-all duration-300" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61565660383482" target="_blank" rel="noopener noreferrer" className="p-2">
            <FaFacebook className="w-8 h-8 md:w-10 md:h-10 text-black hover:text-gray-600 transition-all duration-300" />
          </a>

          <a href="mailto:business@rafetov.com" target="_blank" rel="noopener noreferrer" className="p-2">
            <FaEnvelope className="w-8 h-8 md:w-10 md:h-10 text-black hover:text-gray-600 transition-all duration-300" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
