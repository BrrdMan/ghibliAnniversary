import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for Three.js
  const containerRef = useRef(null);
  const tilesRef = useRef([]);
  
  // Sample gallery images - replace with your actual images
  useEffect(() => {
    // Simulating image loading
    const sampleImages = [
      {
        id: 1,
        src: '/images/assets/gallery/image1.jpg'        
      },
      {
        id: 2,
        src: '/images/assets/gallery/image2.jpg'
      },
      {
        id: 3,
        src: '/images/assets/gallery/image3.jpg'
      },
      {
        id: 4,
        src: '/images/assets/gallery/image4.jpg'
      },
      {
        id: 5,
        src: '/images/assets/gallery/image5.jpg'
      },
      {
        id: 6,
        src: '/images/assets/gallery/image6.jpg'
      },
      {
        id: 7,
        src: '/images/assets/gallery/image7.jpg'
      },
      {
        id: 8,
        src: '/images/assets/gallery/image8.jpg'
      },
      {
        id: 9,
        src: '/images/assets/gallery/image9.jpg'
      },
      // Add more images to fill the grid
      {
        id: 10,
        src: '/images/assets/gallery/image10.jpg'
      },
      {
        id: 11,
        src: '/images/assets/gallery/image11.jpg'
      },
      {
        id: 12,
        src: '/images/assets/gallery/image12.jpg'
      },
      {
        id: 13,
        src: '/images/assets/gallery/image13.jpg'
      },
      {
        id: 14,
        src: '/images/assets/gallery/image14.jpg'
      },
      {
        id: 15,
        src: '/images/assets/gallery/image15.jpg'
      },
      {
        id: 16,
        src: '/images/assets/gallery/image16.jpg'
      },
      {
        id: 17,
        src: '/images/assets/gallery/image17.jpg'
      },
      {
        id: 18,
        src: '/images/assets/gallery/image18.jpg'
      },
      {
        id: 19,
        src: '/images/assets/gallery/image19.jpg'
      },
      {
        id: 20,
        src: '/images/assets/gallery/image20.jpg'
      },
      {
        id: 21,
        src: '/images/assets/gallery/image21.jpg'
      },
      {
        id: 22,
        src: '/images/assets/gallery/image22.jpg'
      },
      {
        id: 23,
        src: '/images/assets/gallery/image23.jpg'
      },
      {
        id: 24,
        src: '/images/assets/gallery/image24.jpg'
      },
      // Add more images to fill the grid
      {
        id: 25,
        src: '/images/assets/gallery/image25.jpg'
      },
      {
        id: 26,
        src: '/images/assets/gallery/image26.jpg'
      },
      {
        id: 27,
        src: '/images/assets/gallery/image27.jpg'
      },
      {
        id: 28,
        src: '/images/assets/gallery/image28.jpg'
      },
      {
        id: 29,
        src: '/images/assets/gallery/image29.jpg'
      },
      {
        id: 30,
        src: '/images/assets/gallery/image30.jpg'
      },
      {
        id: 31,
        src: '/images/assets/gallery/image31.jpg'
      },
      {
        id: 32,
        src: '/images/assets/gallery/image32.jpg'
      },
      {
        id: 33,
        src: '/images/assets/gallery/image33.jpg'
      },
      {
        id: 34,
        src: '/images/assets/gallery/image34.jpg'
      },
      {
        id: 35,
        src: '/images/assets/gallery/image35.jpg'
      },
      {
        id: 36,
        src: '/images/assets/gallery/image36.jpg'
      },
      {
        id: 37,
        src: '/images/assets/gallery/image37.jpg'
      },
      {
        id: 38,
        src: '/images/assets/gallery/image38.jpg'
      },
      {
        id: 39,
        src: '/images/assets/gallery/image39.jpg'
      },
      // Add more images to fill the grid
      {
        id: 40,
        src: '/images/assets/gallery/image40.jpg'
      }
    ];
    
    setImages(sampleImages);
    setTimeout(() => setLoading(false), 800); // Simulate loading delay
  }, []);
  
  // Set up mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get container position
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Apply ripple effect based on mouse position
  useEffect(() => {
    if (loading || !containerRef.current) return;
    
    // Animation frame for continuous updates
    let animationFrameId;
    
    // Animation function that continuously updates based on mouse position
    const animate = () => {
      // Calculate scales for all tiles based on current mouse position
      tilesRef.current.forEach((tile, index) => {
        if (!tile) return;
        
        // Get tile position
        const rect = tile.getBoundingClientRect();
        const tileX = rect.left + rect.width / 2;
        const tileY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to tile center
        const containerRect = containerRef.current.getBoundingClientRect();
        const mouseX = mousePosition.x + containerRect.left;
        const mouseY = mousePosition.y + containerRect.top;
        
        const dx = mouseX - tileX;
        const dy = mouseY - tileY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Maximum distance for effect (in pixels)
        const maxDistance = 250;
        
        // Calculate scale based on distance (inverse relationship)
        let targetScale = 1;
        if (distance < maxDistance) {
          targetScale = 1 + (1 - distance / maxDistance) * 0.65;
          
          // Apply easing function to make the effect more subtle
          targetScale = 1 + Math.pow(targetScale - 1, 1.5);
        }
        
        // Get current scale from transform style or default to 1
        const currentTransform = tile.style.transform || 'scale(1)';
        const currentScale = parseFloat(currentTransform.replace('scale(', '').replace(')', '')) || 1;
        
        // Interpolate between current and target (lerp)
        // Increased factor from 0.2 to 0.3 for more responsive movement
        const newScale = currentScale + (targetScale - currentScale) * 0.15;
        
        // Apply the interpolated scale
        tile.style.transform = `scale(${newScale})`;
        tile.style.zIndex = newScale > 1.1 ? '10' : '0';
      });
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start the animation loop
    animationFrameId = requestAnimationFrame(animate);
    
    // Clean up
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mousePosition, loading]);
  
  // Handle image click to show modal
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };
  
  // Close modal
  const handleCloseModal = () => {
    setSelectedImage(null);
    setSelectedIndex(null);
  };
  
  // Navigate to next image
  const handleNextImage = (e) => {
    e.stopPropagation(); // Prevent modal from closing
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };
  
  // Navigate to previous image
  const handlePrevImage = (e) => {
    e.stopPropagation(); // Prevent modal from closing
    const prevIndex = (selectedIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setSelectedIndex(prevIndex);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIndex = (selectedIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
        setSelectedIndex(nextIndex);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIndex = (selectedIndex - 1 + images.length) % images.length;
        setSelectedImage(images[prevIndex]);
        setSelectedIndex(prevIndex);
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex, images]);
  
  // Set ref for each tile
  const setTileRef = (el, index) => {
    tilesRef.current[index] = el;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Page header - made more compact */}
      {/* <div className="py-4 px-4 text-center">
          <motion.h1 
          className="text-3xl font-serif text-gray-800 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          >
            Our Photo Gallery
          </motion.h1>
          
          <motion.p
          className="text-gray-600 max-w-2xl mx-auto text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          >
          A collection of our favorite moments together
          </motion.p>
      </div> */}
          
          {/* Loading indicator */}
      {loading ? (
            <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
        </div>
      ) : (
        
        /* Image grid with ripple effect */
        
        <motion.div 
          className="px-4 pb-4 flex-grow flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          ref={containerRef}
        >
          <div className="grid grid-cols-10 gap-8 max-w-[95vw] max-h-[80vh]">
            {images.slice(0, 50).map((image, index) => (
              <motion.div
                key={image.id}
                className="relative aspect-square overflow-hidden cursor-pointer"
                ref={(el) => setTileRef(el, index)}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0.3,
                  opacity: 0 
                }}
                animate={{ 
                  x: 0, 
                  y: 0, 
                  scale: 1,
                  opacity: 1 
                }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.01,
                  type: "spring",
                  stiffness: 50
                }}
                onClick={() => handleImageClick(image, index)}
              >
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300 z-10"></div>
                
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 transform translate-y-2 hover:translate-y-0">
                  <h3 className="text-white text-xs font-medium truncate">{image.title}</h3>
                </div>
              </motion.div>
            ))}
      </div>
        </motion.div>
      )}
      
      {/* Enhanced Modal with Navigation Controls */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            {/* Previous button */}
            <motion.button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full w-12 h-12 flex items-center justify-center text-white transition-colors duration-300 z-10"
              onClick={handlePrevImage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            {/* Next button */}
            <motion.button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full w-12 h-12 flex items-center justify-center text-white transition-colors duration-300 z-10"
              onClick={handleNextImage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
            
            <motion.div 
              className="relative max-w-4xl w-full max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
              
              <div className="mt-4 text-white">
                <h3 className="text-2xl font-medium mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
              </div>
              
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center text-white transition-colors duration-300"
                aria-label="Close modal"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery; 