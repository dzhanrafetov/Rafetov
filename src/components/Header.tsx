import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-scroll';

const LANGUAGES = [
  { code: 'bg', label: 'БГ', flag: '🇧🇬', name: 'Български' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'tr', label: 'TR', flag: '🇹🇷', name: 'Türkçe' },
  { code: 'no', label: 'NO', flag: '🇳🇴', name: 'Norsk' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'nl', label: 'NL', flag: '🇧🇪', name: 'Vlaams' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const getCurrentLang = () => {
    const match = document.cookie.match(/googtrans=\/bg\/([a-z]+)/);
    return match ? match[1] : 'bg';
  };
  const [currentLang, setCurrentLang] = useState(getCurrentLang);

  const triggerTranslation = (lang: string) => {
    setCurrentLang(lang);
    setLangOpen(false);

    const expired = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    document.cookie = `googtrans=; ${expired}`;
    document.cookie = `googtrans=; ${expired}; domain=${location.hostname}`;
    document.cookie = `googtrans=; ${expired}; domain=.${location.hostname}`;

    if (lang !== 'bg') {
      document.cookie = `googtrans=/bg/${lang}; path=/`;
      document.cookie = `googtrans=/bg/${lang}; path=/; domain=.${location.hostname}`;
    }

    window.location.href = window.location.pathname + window.location.search;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <>
      {/* Header Section */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-[background-color,backdrop-filter] duration-150 ${
          isScrolled || isMenuOpen
            ? 'backdrop-blur-md bg-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 md:px-6 md:py-6 flex justify-between items-center">
          {/* Conditionally Render RAFETOV.COM */}
          {!isMenuOpen && (
            <div className="text-sm md:text-2xl font-bold text-white tracking-widest">
              RAFETOV.COM
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {/* Language Selector */}
            {!isMenuOpen && (
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen((o) => !o)}
                  className="flex items-center gap-1 text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-2 py-1 md:px-3 md:py-1.5 transition-all duration-200"
                  aria-label="Избор на език"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-4 md:h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <span className="text-sm md:text-xl leading-none">{LANGUAGES.find((l) => l.code === currentLang)?.flag ?? '🇧🇬'}</span>
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/90 backdrop-blur-md z-50 py-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => triggerTranslation(lang.code)}
                        className={`w-full flex items-center gap-2.5 px-4 py-2 text-[13px] whitespace-nowrap transition-colors duration-150 hover:bg-white/10 ${currentLang === lang.code ? 'text-white font-semibold' : 'text-white/60'}`}
                      >
                        <span className="text-base leading-none">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Menu Button */}
            <button
              onClick={toggleMenu}
              className="border-2 border-white text-white font-medium py-1.5 px-2.5 md:py-2 md:px-6 rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-1.5"
            >
              <span className="hidden md:inline text-sm font-semibold">Меню</span>
              {isMenuOpen ? <FiX className="w-4 h-4 md:w-5 md:h-5" /> : <FiMenu className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
          </div>
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
            to="work"
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
