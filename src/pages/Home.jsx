import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const Home = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const sections = 2; // Update to just 2 sections
  const scrollTimeoutRef = useRef(null); // For debouncing scroll events
  const isScrollingRef = useRef(false); // To track if we're currently scrolling
  const touchStartY = useRef(0);
  
  // Direct navigation function using window.location
  const navigateTo = (path) => {
    // Remove the leading slash for HashRouter
    const hashPath = path.startsWith('/') ? path.substring(1) : path;
    window.location.hash = `#/${hashPath}`;
  };
  
  // Controlled section change with bounds checking
  const changeSection = (direction) => {
    // If we're already scrolling, don't allow another scroll
    if (isScrollingRef.current) return;
    
    // Set scrolling flag
    isScrollingRef.current = true;
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    setCurrentSection(prev => {
      // Calculate new section with bounds checking
      const newSection = prev + direction;
      
      // Ensure we stay within bounds (0 to sections-1)
      if (newSection < 0) return 0;
      if (newSection >= sections) return sections - 1;
      
      return newSection;
    });
    
    // Set a timeout to allow scrolling again after animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800); // Match this to your animation duration
  };
  
  // Mouse wheel scrolling
  useEffect(() => {
    const handleWheel = (e) => {
      // Don't handle wheel events on navigation cards
      if (e.target.closest('.nav-card')) {
        return;
      }
      
      // Prevent default scrolling
      e.preventDefault();
      
      // Determine scroll direction
      if (e.deltaY > 0) {
        // Scrolling down
        changeSection(1);
      } else if (e.deltaY < 0) {
        // Scrolling up
        changeSection(-1);
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
        // Clear timeout on cleanup
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, []);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        changeSection(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        changeSection(-1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Touch/swipe gesture support
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      if (!touchStartY.current) return;
      
      const touchY = e.touches[0].clientY;
      const diff = touchStartY.current - touchY;
      
      // Require a minimum swipe distance to trigger section change
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe up (move down)
          changeSection(1);
        } else {
          // Swipe down (move up)
          changeSection(-1);
        }
        
        // Reset touch start to prevent multiple triggers
        touchStartY.current = 0;
      }
      
      // Prevent default to avoid page scrolling
      e.preventDefault();
    };
    
    const handleTouchEnd = () => {
      touchStartY.current = 0;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#e6f0f6]"
    >
      {/* Main background image */}
      <div className="fixed inset-0 bg-cover bg-center z-0"
           style={{ backgroundImage: "url('/images/assets/ghibli-field-bg.jpg')" }}>
      </div>
      
      {/* Floating elements - Ghibli-inspired */}
      <motion.div 
        className="fixed z-5 w-16 h-16 opacity-70"
        style={{ 
          backgroundImage: "url('/images/assets/totoro-small.png')", 
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
        animate={{ 
          x: [0, 10, 0], 
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 6,
          ease: "easeInOut" 
        }}
        initial={{ top: '20%', left: '15%' }}
      />
      
      <motion.div 
        className="fixed z-5 w-20 h-20 opacity-70"
        style={{ 
          backgroundImage: "url('/images/assets/leaf-spirit.png')", 
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
        animate={{ 
          x: [0, -15, 0], 
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 7,
          ease: "easeInOut" 
        }}
        initial={{ top: '30%', right: '15%' }}
      />

      {/* Content sections */}
      <div className="relative z-10 h-screen">
        {/* Section 1: Title */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSection === 0 ? 1 : 0,
            y: currentSection === 0 ? 0 : -50
          }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <motion.h1 
              className="text-7xl md:text-8xl font-serif text-[#3a5169] leading-tight head"
              animate={{ 
                y: [0, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Our Magical
            </motion.h1>
            <motion.h1 
              className="text-7xl md:text-8xl font-serif text-[#e07a5f] leading-tight"
              animate={{ 
                y: [0, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              6 Months
            </motion.h1>
            <p className="text-[#3a5169] text-xl mt-4">A journey of love and adventure</p>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut" 
            }}
          >
            <p className="text-[#3a5169] text-sm mb-2">Scroll down</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#3a5169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Section 2: Navigation buttons */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSection === 1 ? 1 : 0,
            y: currentSection < 1 ? 50 : 0
          }}
          transition={{ duration: 0.8 }}
          style={{ 
            display: currentSection === 1 ? 'flex' : 'none',
            zIndex: 30 
          }}
        >
          <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { title: "Our Timeline", icon: "📜", path: "timeline", color: "#81b29a" },
              { title: "Photo Gallery", icon: "🖼️", path: "gallery", color: "#f2cc8f" },
              { title: "Our Future", icon: "🌱", path: "future", color: "#81b29a" }
            ].map((item, index) => (
              <div key={index} className="nav-card-container">
                <button
                  className="nav-card w-full bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center justify-center border-2 hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ borderColor: item.color }}
                  onClick={() => navigateTo(item.path)}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-medium" style={{ color: item.color }}>{item.title}</h3>
                </button>
              </div>
            ))}
          </div>
          
          {/* Scroll up indicator */}
          <div className="absolute bottom-10 flex flex-col items-center">
            <motion.div 
              className="mb-2"
              animate={{ 
                y: [0, 10, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut" 
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto rotate-180">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#3a5169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-[#3a5169] text-sm">Scroll up</p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Section indicators (dots) */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-40">
          {Array.from({ length: sections }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? 'bg-[#e07a5f] scale-125' 
                  : 'bg-[#3a5169] opacity-50 hover:opacity-75'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Add custom CSS for better hover effects */}
      <style jsx>{`
        .nav-card:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transform: translateY(-5px);
        }
        .nav-card:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Home;