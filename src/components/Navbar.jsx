import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll position to change navbar style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/timeline', label: 'Timeline', icon: '📜' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/future', label: 'Future', icon: '🌱' }
  ];

  const isActive = (path) => {
    // For the home path
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    // For other paths, check if the current path includes the nav path
    return path !== '/' && location.pathname.includes(path.substring(1));
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div 
              whileHover={{ rotate: 5 }}
              className="mr-2"
            >
              <img 
                src="/images/assets/totoro-logo.png" 
                alt="Logo" 
                className="h-10 w-10"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="%233a5169"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/></svg>';
                }}
              />
            </motion.div>
            <div>
              <h1 className={`font-serif text-xl ${scrolled ? 'text-[#3a5169]' : 'text-white'}`}>
                Our Story
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-3 py-2 rounded-lg transition-colors duration-300 flex items-center ${
                  isActive(link.path) 
                    ? 'bg-[#81b29a] text-white' 
                    : scrolled 
                      ? 'text-[#3a5169] hover:bg-[#f2cc8f] hover:text-[#3a5169]' 
                      : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
              >
                <span className="mr-1">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={scrolled ? 'text-[#3a5169]' : 'text-white'}>
              {isOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-[#3a5169] z-40 pt-20 px-6 md:hidden"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    className={`block px-4 py-3 rounded-lg text-white text-lg ${
                      isActive(link.path) 
                        ? 'bg-[#81b29a]' 
                        : 'hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <span className="mr-3 inline-block w-8">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Decorative elements */}
            <motion.div 
              className="absolute bottom-10 right-10 opacity-20 w-32 h-32"
              style={{ 
                backgroundImage: "url('/src/assets/totoro-silhouette.png')", 
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar; 