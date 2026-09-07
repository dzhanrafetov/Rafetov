import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { LANGS, LANG_META, setLangCookie, stripLang, useLang, withLang, type Lang } from '../i18n';
import { BLOG_BASE } from '../blog';

type MenuItem = { key: 'hero' | 'services' | 'work' | 'process' | 'blog' | 'contact'; section?: string; route?: string };
const MENU_ITEMS: MenuItem[] = [
  { key: 'hero',     section: 'hero'     },
  { key: 'services', section: 'services' },
  { key: 'work',     section: 'work'     },
  { key: 'process',  section: 'process'  },
  { key: 'blog',     route: BLOG_BASE    },
  { key: 'contact',  section: 'contact'  },
];

const MENU_LINK_CLASS =
  'hover:text-gray-600 transition-colors duration-300 transform hover:scale-105 cursor-pointer';

const CONTACT_BTN_CLASS =
  'hidden lg:inline-flex items-center border-2 border-white text-white text-sm font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer';

const Header = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { lang, t, href, alternates } = useLang();
  const isHome = stripLang(pathname) === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const switchLang = (next: Lang) => {
    setLangOpen(false);
    if (next === lang) return;
    setLangCookie(next);
    // Същата страница, само с друг езиков префикс; запазваме hash-а (секцията).
    // Страници със свой адрес на всеки език (статии) подават алтернативния път; иначе същият път с друг префикс.
    const target = alternates[next] ?? stripLang(pathname);
    navigate(withLang(target, next) + hash, { replace: false });
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
            isHome ? (
              <div className="text-sm md:text-2xl font-bold text-white tracking-widest">
                RAFETOV.COM
              </div>
            ) : (
              <RouterLink
                to={href('/')}
                className="text-sm md:text-2xl font-bold text-white tracking-widest transition-opacity hover:opacity-80"
              >
                RAFETOV.COM
              </RouterLink>
            )
          )}

          {/* Desktop navigation */}
          {!isMenuOpen && (
            <nav className="hidden lg:flex items-center gap-7 mx-auto text-[14px] font-semibold text-white/75">
              {MENU_ITEMS.filter((m) => m.key !== 'hero' && m.key !== 'contact').map(({ key, section, route }) =>
                route ? (
                  <RouterLink key={key} to={href(route)} className="transition-colors hover:text-white">
                    {t.header.links[key]}
                  </RouterLink>
                ) : isHome ? (
                  <Link key={key} to={section!} smooth={true} duration={200} offset={-70} className="cursor-pointer transition-colors hover:text-white">
                    {t.header.links[key]}
                  </Link>
                ) : (
                  <RouterLink key={key} to={`${href('/')}#${section}`} className="transition-colors hover:text-white">
                    {t.header.links[key]}
                  </RouterLink>
                )
              )}
            </nav>
          )}

          <div className="flex items-center gap-2 ml-auto">
            {/* Phone */}
            {!isMenuOpen && (
              <a
                href="tel:+359897758062"
                aria-label={t.header.callAria}
                className="flex items-center gap-1.5 text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-2 py-1 md:px-3 md:py-1.5 transition-all duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-4 md:h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 5.2 2 2 0 0 1 4.1 3h2a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.5 2.1L7.4 10a16 16 0 0 0 6.6 6.6l.9-.8a2 2 0 0 1 2.1-.5c.7.3 1.5.5 2.3.6A2 2 0 0 1 22 16.9Z" />
                </svg>
                <span className="hidden xl:inline text-sm font-semibold whitespace-nowrap">+359 897 758 062</span>
              </a>
            )}

            {/* Language Selector */}
            {!isMenuOpen && (
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen((o) => !o)}
                  className="flex items-center gap-1.5 text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-2 py-1 md:px-3 md:py-1.5 transition-all duration-200"
                  aria-label={t.header.langAria}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                >
                  <span className="text-sm md:text-base leading-none">{LANG_META[lang].flag}</span>
                  <span className="hidden md:inline text-sm font-semibold">{LANG_META[lang].label}</span>
                  <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0 opacity-70" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {langOpen && (
                  <div role="listbox" className="absolute right-0 mt-2 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/90 backdrop-blur-md z-50 py-1">
                    {LANGS.map((code) => (
                      <button
                        key={code}
                        role="option"
                        aria-selected={lang === code}
                        lang={code}
                        onClick={() => switchLang(code)}
                        className={`w-full flex items-center gap-2.5 px-4 py-2 text-[13px] whitespace-nowrap transition-colors duration-150 hover:bg-white/10 ${lang === code ? 'text-white font-semibold' : 'text-white/60'}`}
                      >
                        <span className="text-base leading-none">{LANG_META[code].flag}</span>
                        <span>{LANG_META[code].name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Contact CTA (desktop only) */}
            {isHome ? (
              <Link
                to="contact"
                smooth={true}
                duration={200}
                offset={-70}
                className={CONTACT_BTN_CLASS}
              >
                {t.header.ctaButton}
              </Link>
            ) : (
              <RouterLink to={`${href('/')}#contact`} className={CONTACT_BTN_CLASS}>
                {t.header.ctaButton}
              </RouterLink>
            )}

            {/* Menu Button (mobile/tablet only) */}
            <button
              onClick={toggleMenu}
              className="lg:hidden border-2 border-white text-white font-medium py-1.5 px-2.5 md:py-2 md:px-6 rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-1.5"
            >
              <span className="hidden md:inline text-sm font-semibold">{t.header.menu}</span>
              {isMenuOpen ? <FiX className="w-4 h-4 md:w-5 md:h-5" /> : <FiMenu className="w-4 h-4 md:w-5 md:h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Blur background when the menu is open */}
      <div
        className={`lg:hidden fixed inset-0 z-30 transition-opacity duration-300 ${
          isMenuOpen ? 'backdrop-blur-md opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      ></div>

      {/* Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black bg-opacity-60 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 backdrop-blur-md' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu} // Close the menu when clicking outside
      ></div>

      {/* Sliding Menu with Rounded Corners */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-64 sm:w-72 max-h-[90vh] bg-white text-black rounded-3xl z-50 transform transition-transform duration-300 flex flex-col justify-between p-6 ${
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
          {/* На началната страница скролваме плавно; извън нея навигираме към "/#секция". */}
          {MENU_ITEMS.map(({ key, section, route }) =>
            route ? (
              <RouterLink key={key} to={href(route)} onClick={toggleMenu} className={MENU_LINK_CLASS}>
                {t.header.links[key]}
              </RouterLink>
            ) : isHome ? (
              <Link
                key={key}
                to={section!}
                smooth={true}
                duration={200}
                offset={-70}
                onClick={toggleMenu}
                className={MENU_LINK_CLASS}
              >
                {t.header.links[key]}
              </Link>
            ) : (
              <RouterLink key={key} to={`${href('/')}#${section}`} onClick={toggleMenu} className={MENU_LINK_CLASS}>
                {t.header.links[key]}
              </RouterLink>
            )
          )}
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-between items-center space-x-6 mt-4 px-4">
          <a href="https://www.instagram.com/rafetov.com_/" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Instagram">
            <FaInstagram className="w-8 h-8 md:w-10 md:h-10 text-black hover:text-gray-600 transition-all duration-300" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61565660383482" target="_blank" rel="noopener noreferrer" className="p-2" aria-label="Facebook">
            <FaFacebook className="w-8 h-8 md:w-10 md:h-10 text-black hover:text-gray-600 transition-all duration-300" />
          </a>

          <a href="mailto:business@rafetov.com" className="p-2" aria-label="Email">
            <FaEnvelope className="w-8 h-8 md:w-10 md:h-10 text-black hover:text-gray-600 transition-all duration-300" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
