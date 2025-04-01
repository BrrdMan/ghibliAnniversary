import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [hoverIcon, setHoverIcon] = useState(null);
  const currentYear = new Date().getFullYear();

  // Social media links - replace with your actual links
  const socialLinks = [
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com/' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/' },
    { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com/' },
    { name: 'Spotify', icon: '🎧', url: 'https://spotify.com/' }
  ];

  // Quick links for footer navigation
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Gallery', path: '/gallery' }
  ];

  return (
    <footer className="bg-[#3a5169] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-24 sm:w-40 h-24 sm:h-40 opacity-10"
          style={{ 
            backgroundImage: "url('/images/assets/cat-bus.png')", 
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            bottom: '-5%',
            right: '5%'
          }}
          animate={{ 
            x: [-20, 0, -20],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute w-20 sm:w-32 h-20 sm:h-32 opacity-10"
          style={{ 
            backgroundImage: "url('/images/assets/kodama.png')", 
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            top: '10%',
            left: '5%'
          }}
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {/* Column 1: About */}
          <div>
            <motion.div 
              className="flex items-center mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/images/assets/totoro-logo.png" 
                alt="Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/></svg>';
                }}
              />
              <h3 className="text-lg sm:text-xl font-serif">Our Story</h3>
            </motion.div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <motion.h3 
              className="text-base sm:text-lg font-medium mb-4 border-b border-white border-opacity-20 pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Quick Links
            </motion.h3>
            
            <motion.ul 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          
          {/* Column 3: Message */}
          <div>
            <motion.h3 
              className="text-base sm:text-lg font-medium mb-4 border-b border-white border-opacity-20 pb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A Note For You
            </motion.h3>
            
            <motion.div
              className="bg-white bg-opacity-10 p-3 sm:p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-xs sm:text-sm italic mb-2">
              "Once you've met someone, you never really forget them"
              </p>
              <p className="text-xs text-right text-gray-300">— Spirited Away</p>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom copyright */}
        <motion.div 
          className="mt-8 sm:mt-12 pt-4 border-t border-white border-opacity-20 text-center text-xs sm:text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>© {currentYear} Our Magical Journey. Made with ❤️</p>
          <p>Your one and only boro bachha XD</p>
         
        </motion.div>
      </div>
      
      {/* Hover tooltip for social icons */}
      <AnimatedTooltip text={hoverIcon} />
    </footer>
  );
};

// Tooltip component that appears when hovering over social icons
const AnimatedTooltip = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: text ? 1 : 0,
        y: text ? 0 : 10
      }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-[#f2cc8f] text-[#3a5169] px-3 py-1 rounded text-sm pointer-events-none"
    >
      {text}
    </motion.div>
  );
};

export default Footer; 