const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-gray-400 py-6 shadow-inner">
      <div className="max-w-7xl mx-auto text-center px-4">
        <p className="text-sm sm:text-base font-medium transition-colors duration-200 hover:text-gray-200">
          &copy; {new Date().getFullYear()} <span className="text-white">RAFETOV.COM</span>. ВСИЧКИ ПРАВА СА ЗАПАЗЕНИ.
        </p>
      </div>
    </footer>
  );
};

export default Footer;