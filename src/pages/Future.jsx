import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Future = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStar, setSelectedStar] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  
  // Categories for bucket list items with refined color palette
  const categories = [
    { id: 'all', name: 'All Dreams', icon: '✨', color: '#f8f9fa' },
    { id: 'travel', name: 'Travel', icon: '✈️', color: '#4dabf7' },
    { id: 'adventure', name: 'Adventures', icon: '🧗‍♀️', color: '#69db7c' },
    { id: 'milestones', name: 'Milestones', icon: '🏆', color: '#ffd43b' },
    { id: 'experiences', name: 'Experiences', icon: '🎭', color: '#da77f2' },
    { id: 'goals', name: 'Goals', icon: '🎯', color: '#ff6b6b' }
  ];
  
  // Sample bucket list items - replace with your actual plans
  const starPlans = [
    {
      id: 1,
      title: 'Visit Japan During Cherry Blossom Season or anytine imho',
      description: 'Eta amar sbthke beshi icche ache krar',
      category: 'travel',
      timeframe: '4-5 years',
      priority: 'high',
      relatedTo: [4, 9, 10, 11], // IDs of related plans
      position: { x: 0.2, y: 0.3 } // Relative position (0-1)
    },
    {
      id: 2,
      title: 'Learn to Dance Together',
      description: 'Ektu sekha jetei pare biyer jnno but biye te ki bhodro nach nacha hbe?',
      category: 'experiences',
      timeframe: '6 months',
      priority: 'medium',
      relatedTo: [],
      position: { x: 0.35, y: 0.15 }
    },
    {
      id: 3,
      title: 'Build Our Dream Home',
      description: 'Design and create a space thats truly ours, with a garden, plenty of natural light, and not perhaps in the countryside.',
      category: 'milestones',
      timeframe: '4-5 years',
      priority: 'high',
      relatedTo: [5, 7],
      position: { x: 0.8, y: 0.7 }
    },
    {
      id: 4,
      title: 'Northern Lights Adventure',
      description: 'Travel to Iceland or Norway to witness the aurora borealis together, staying in a glass-roofed cabin.',
      category: 'travel',
      timeframe: '6-7 years',
      priority: 'medium',
      relatedTo: [1, 9, 10, 11],
      position: { x: 0.15, y: 0.5 }
    },
    {
      id: 5,
      title: 'Get a job, build our life',
      description: 'The most important time of our lives. Lets try our best :)',
      category: 'goals',
      timeframe: 'Ongoing',
      priority: 'medium',
      relatedTo: [3, 7],
      position: { x: 0.4, y: 0.6 }
    },
    {
      id: 6,
      title: 'Go on a Hot Air Balloon Ride',
      description: 'Float above beautiful landscapes at sunrise, sharing a peaceful and breathtaking experience together.',
      category: 'adventure',
      timeframe: '5 years',
      priority: 'low',
      relatedTo: [8],
      position: { x: 0.25, y: 0.65 }
    },
    {
      id: 7,
      title: 'Start a Family',
      description: 'Begin the next chapter of our lives together, creating a loving home for our children to grow and thrive.',
      category: 'milestones',
      timeframe: '4-5 years',
      priority: 'high',
      relatedTo: [3, 5],
      position: { x: 0.7, y: 0.8 }
    },
    {
      id: 8,
      title: 'Skydiving',
      description: 'Yes pls. Parachute chhara XXXDDD',
      category: 'experiences',
      timeframe: '2 years',
      priority: 'medium',
      relatedTo: [6],
      position: { x: 0.55, y: 0.45 }
    },
    {
      id: 9,
      title: 'Go to South Korea',
      description: 'Probably first foreign trip hole eta hbe. And maybe even attend a BTS concert *wink wink*',
      category: 'travel',
      timeframe: '2-4 years',
      priority: 'medium',
      relatedTo: [1, 4, 10, 11],
      position: { x: 0.3, y: 0.8 }
    },
    {
      id: 10,
      title: 'Travel to Antarctica once plz',
      description: 'Argentina giye jahaj e kre jete hoibo. Khub ichha.',
      category: 'travel',
      timeframe: '5-7 years',
      priority: 'low',
      relatedTo: [1, 4, 9, 11],
      position: { x: 0.5, y: 0.2 }
    },
    {
      id: 11,
      title: 'Take a Cross-Country Road Trip',
      description: 'Gari nie dure kothao jabo. Just us. No attachments no responsibilities.',
      category: 'travel',
      timeframe: '1-2 years',
      priority: 'medium',
      relatedTo: [1, 4, 9, 10],
      position: { x: 0.65, y: 0.3 }
    },
    {
      id: 12,
      title: 'Celebrate Our 10th Anniversary',
      description: '1st October 2034. Ik onek deri but still. Extra kre ceebrate krbo maybe even arekbar biye krbo XXDD.',
      category: 'milestones',
      timeframe: 'Future',
      priority: 'high',
      relatedTo: [],
      position: { x: 0.85, y: 0.5 }
    }
  ];
  
  // Filter stars based on selected category
  const filteredStars = useMemo(() => {
    return selectedCategory === 'all' 
      ? starPlans 
      : starPlans.filter(star => star.category === selectedCategory);
  }, [selectedCategory]);
  
  // Get all visible connections between stars
  const visibleConnections = useMemo(() => {
    const connections = [];
    
    filteredStars.forEach(star => {
      const relatedVisibleStars = star.relatedTo
        .map(id => filteredStars.find(s => s.id === id))
        .filter(Boolean);
      
      relatedVisibleStars.forEach(relatedStar => {
        // Create a unique ID for each connection to avoid duplicates
        const connectionId = [star.id, relatedStar.id].sort().join('-');
        
        if (!connections.some(conn => conn.id === connectionId)) {
          connections.push({
            id: connectionId,
            source: star,
            target: relatedStar
          });
        }
      });
    });
    
    return connections;
  }, [filteredStars]);
  
  // Get star size based on priority with refined sizes
  const getStarSize = (priority) => {
    switch(priority) {
      case 'high': return { size: 64, glow: 32, pulseScale: 1.15 };
      case 'medium': return { size: 48, glow: 24, pulseScale: 1.1 };
      case 'low': return { size: 36, glow: 18, pulseScale: 1.05 };
      default: return { size: 48, glow: 24, pulseScale: 1.1 };
    }
  };
  
  // Get star brightness based on timeframe with smoother gradation
  const getStarBrightness = (timeframe) => {
    if (timeframe.includes('month') || timeframe === 'Ongoing' || timeframe === '1 year') {
      return 1;
    } else if (timeframe.includes('1-2') || timeframe.includes('2 years')) {
      return 0.9;
    } else if (timeframe.includes('2-3') || timeframe.includes('2-4')) {
      return 0.8;
    } else if (timeframe.includes('3-5')) {
      return 0.7;
    } else {
      return 0.6; // For very distant future plans
    }
  };
  
  // Get category color
  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#f8f9fa';
  };
  
  // Calculate distance from mouse to a point
  const getDistanceFromMouse = (x, y) => {
    return Math.sqrt(
      Math.pow(mousePosition.x - x, 2) + 
      Math.pow(mousePosition.y - y, 2)
    );
  };
  
  // Generate twinkling animation parameters
  const generateTwinkleAnimation = (index) => {
    const duration = 2 + (index % 3);
    const delay = index * 0.2;
    
    return {
      opacity: [
        getStarBrightness(starPlans[index].timeframe) * 0.7,
        getStarBrightness(starPlans[index].timeframe),
        getStarBrightness(starPlans[index].timeframe) * 0.7
      ],
      scale: [
        1,
        getStarSize(starPlans[index].priority).pulseScale,
        1
      ],
      transition: {
        opacity: {
          repeat: Infinity,
          duration: duration,
          delay: delay
        },
        scale: {
          repeat: Infinity,
          duration: duration * 1.5,
          delay: delay
        }
      }
    };
  };
  
  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: Math.max(containerRef.current.offsetHeight, window.innerHeight * 0.7)
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Handle star click
  const handleStarClick = (star) => {
    setSelectedStar(star);
  };
  
  // Close modal
  const handleCloseModal = () => {
    setSelectedStar(null);
  };
  
  // Generate background stars
  const backgroundStars = useMemo(() => {
    const stars = [];
    const count = Math.floor((dimensions.width * dimensions.height) / 2000);
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2 + 1;
      stars.push({
        id: `bg-star-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        opacity: Math.random() * 0.7 + 0.3,
        animationDuration: Math.random() * 3 + 2
      });
    }
    
    return stars;
  }, [dimensions]);
  
  // Generate nebula effects
  const nebulae = useMemo(() => {
    if (dimensions.width === 0) return [];
    
    const nebulaeCount = 3;
    const nebulae = [];
    
    for (let i = 0; i < nebulaeCount; i++) {
      nebulae.push({
        id: `nebula-${i}`,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        size: Math.random() * 30 + 20,
        color: i % 2 === 0 ? 'rgba(111, 66, 193, 0.1)' : 'rgba(13, 110, 253, 0.1)',
        blur: Math.random() * 50 + 50
      });
    }
    
    return nebulae;
  }, [dimensions]);

  return (
    <div className="min-h-screen bg-[#070b1f] text-white overflow-hidden">
      {/* Background with stars and nebulae */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Background stars */}
        {backgroundStars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.animationDuration}s infinite ease-in-out`
            }}
          />
        ))}
        
        {/* Nebulae */}
        {nebulae.map(nebula => (
          <div
            key={nebula.id}
            className="absolute rounded-full"
            style={{
              left: `${nebula.x}%`,
              top: `${nebula.y}%`,
              width: `${nebula.size}vw`,
              height: `${nebula.size}vw`,
              background: nebula.color,
              filter: `blur(${nebula.blur}px)`,
              opacity: 0.6
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-serif mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            Our Cosmic Journey Together
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-blue-100 opacity-80">
            A constellation of dreams and adventures waiting for us among the stars.
            Each light represents a future memory we'll create together.
          </p>
        </motion.div>
        
        
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all backdrop-blur-sm ${
                selectedCategory === category.id 
                  ? 'bg-white bg-opacity-20 text-white border border-white border-opacity-30' 
                  : 'bg-white bg-opacity-5 text-white text-opacity-70 border border-white border-opacity-10 hover:bg-opacity-10'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 15px ${category.color}66`
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div> */}
        
        {/* Star constellation container */}
        <div 
          ref={containerRef}
          className="flex-grow relative bg-transparent rounded-xl overflow-hidden"
          style={{ height: '70vh', minHeight: '500px' }}
        >
          {/* Connections between stars */}
          {dimensions.width > 0 && visibleConnections.map(connection => {
            const sourceX = connection.source.position.x * dimensions.width;
            const sourceY = connection.source.position.y * dimensions.height;
            const targetX = connection.target.position.x * dimensions.width;
            const targetY = connection.target.position.y * dimensions.height;
            
            const categoryColor = getCategoryColor(connection.source.category);
            
            return (
              <motion.svg
                key={connection.id}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <defs>
                  <linearGradient id={`grad-${connection.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={getCategoryColor(connection.source.category)} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={getCategoryColor(connection.target.category)} stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <motion.line
                  x1={sourceX}
                  y1={sourceY}
                  x2={targetX}
                  y2={targetY}
                  stroke={`url(#grad-${connection.id})`}
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.7 }}
                />
              </motion.svg>
            );
          })}
          
          {/* Stars */}
          {dimensions.width > 0 && filteredStars.map((star, index) => {
            const { size, glow, pulseScale } = getStarSize(star.priority);
            const brightness = getStarBrightness(star.timeframe);
            const color = getCategoryColor(star.category);
            
            const posX = star.position.x * dimensions.width;
            const posY = star.position.y * dimensions.height;
            
            // Calculate interactive effects based on mouse distance
            const distance = getDistanceFromMouse(posX, posY);
            const interactionRadius = 200;
            const interactionStrength = Math.max(0, 1 - distance / interactionRadius);
            
            return (
              <motion.div
                key={star.id}
                className="absolute cursor-pointer"
                style={{
                  left: posX,
                  top: posY,
                  transform: 'translate(-50%, -50%)',
                  zIndex: star.priority === 'high' ? 3 : star.priority === 'medium' ? 2 : 1
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: brightness,
                  scale: 1,
                  x: interactionStrength * (mousePosition.x - posX) * 0.1,
                  y: interactionStrength * (mousePosition.y - posY) * 0.1
                }}
                transition={{ 
                  opacity: { duration: 1, delay: index * 0.1 },
                  scale: { 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 10, 
                    delay: index * 0.1 
                  }
                }}
                whileHover={{ 
                  scale: 1.2,
                  transition: { duration: 0.3 }
                }}
                onClick={() => handleStarClick(star)}
              >
                <motion.div 
                  className="rounded-full relative flex items-center justify-center"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: color,
                    boxShadow: `0 0 ${glow}px ${glow/2}px ${color}`
                  }}
                  animate={{
                    scale: [1, pulseScale, 1],
                    boxShadow: [
                      `0 0 ${glow}px ${glow/2}px ${color}`,
                      `0 0 ${glow*1.5}px ${glow}px ${color}`,
                      `0 0 ${glow}px ${glow/2}px ${color}`
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + index % 2,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-white opacity-30 flex items-center justify-center">
                    <span className="text-sm">{categories.find(cat => cat.id === star.category)?.icon}</span>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center whitespace-nowrap px-3 py-1 rounded-full text-sm backdrop-blur-md"
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: `1px solid ${color}66`
                  }}
                >
                  {star.title}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Modal for viewing star details */}
      <AnimatePresence>
        {selectedStar && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className="bg-[#0f1130] rounded-xl overflow-hidden max-w-2xl w-full max-h-[90vh] border border-[#3f4faf33]"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 0 30px ${getCategoryColor(selectedStar.category)}33`
              }}
            >
              <div 
                className="h-3"
                style={{ 
                  background: `linear-gradient(to right, ${getCategoryColor(selectedStar.category)}, transparent)`,
                }}
              />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: getCategoryColor(selectedStar.category),
                        boxShadow: `0 0 15px ${getCategoryColor(selectedStar.category)}66`
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 15px ${getCategoryColor(selectedStar.category)}66`,
                          `0 0 20px ${getCategoryColor(selectedStar.category)}88`,
                          `0 0 15px ${getCategoryColor(selectedStar.category)}66`
                        ]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    >
                      {categories.find(cat => cat.id === selectedStar.category)?.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-1">{selectedStar.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#a3b1ff]">
                          {categories.find(cat => cat.id === selectedStar.category)?.name}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#a3b1ff]"></span>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: getCategoryColor(selectedStar.category) }}
                        >
                          {selectedStar.priority.charAt(0).toUpperCase() + selectedStar.priority.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="text-white opacity-70 hover:opacity-100 text-xl h-8 w-8 flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-opacity-20"
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-[#d1d8ff] mb-6 leading-relaxed">{selectedStar.description}</p>
                
                <div className="bg-[#1a1f4d] p-4 rounded-lg mb-6">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a3b1ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Timeframe:</span>
                    <span className="text-[#d1d8ff]">{selectedStar.timeframe}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a3b1ff] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <span className="font-medium mt-1">Connected to:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedStar.relatedTo.map(relatedId => {
                        const relatedStar = starPlans.find(s => s.id === relatedId);
                        if (!relatedStar) return null;
                        
                        return (
                          <motion.span 
                            key={relatedId}
                            className="px-2 py-1 text-xs rounded-full cursor-pointer hover:bg-white hover:bg-opacity-20"
                            style={{ 
                              backgroundColor: `${getCategoryColor(relatedStar.category)}22`,
                              border: `1px solid ${getCategoryColor(relatedStar.category)}44`
                            }}
                            whileHover={{
                              backgroundColor: `${getCategoryColor(relatedStar.category)}33`,
                              boxShadow: `0 0 10px ${getCategoryColor(relatedStar.category)}33`
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStarClick(relatedStar);
                            }}
                          >
                            {relatedStar.title}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* <div className="border-t border-[#3f4faf33] pt-6">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a3b1ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Cosmic Notes:
                  </h4>
                  <p className="text-[#a3b1ff] text-sm italic">
                    As we journey through the cosmos together, this star represents a dream we'll make reality. Here we can add our thoughts and plans for making this dream come true.
                  </p>
                </div> */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add CSS for background star twinkling */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Future;
