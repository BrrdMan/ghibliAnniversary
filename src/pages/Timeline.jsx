import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample timeline events - replace with your actual relationship milestones
  const timelineEvents = [
    {
      id: 1,
      date: "October 12, 2024",
      title: "First Pujo",
      description: "I kinda want to forget that day :3. Koto gulo missed oppurtunities. Gorom er moddhye tang tang kre hata. Tr palazzo ta k ami dekhioni jotokkhn na tui blli. Then ei godforsaken pic ta XXDDD. Basic byapar ta holo akhono ami unsure, uncomfortable chilam. Line ta dkhte petam na. Tai aro kichu krtam na. Jdi offend hye jas. Er jnne ei chobi ta :(. Atleast Ghibli kre improve hyeche. Anyway, we came a long way since then.",
      image: "/src/assets/timeline/first-meeting.jpg",
      icon: "🌱",
      color: "#81b29a"
    },
    {
      id: 2,
      date: "November 5, 2024",
      title: "First Date",
      description: "Our first official date. 5th Novemeber. Tr interview er porer din. Aladai lgchilo toke. Calcutta 64. Affogato :). Kbe abr khabo k jane.",
      image: "/src/assets/timeline/first-date.jpg",
      icon: "🍵",
      color: "#f2cc8f"
    },
    {
      id: 3,
      date: "November 30, 2024",
      title: "Became Official",
      description: "The day we decided to make it official. Bittersweet din. Na.  Actually khub khub koster din. Actually khub koster week. Office without you is nothing. Dankuni Kamalgazi/201/Metro without you is nothing. I wish things were different. But amader life completely change holo sedin. Sbai k kosto die beriecho.",
      image: "/src/assets/timeline/official.jpg",
      icon: "❤️",
      color: "#e07a5f"
    },
    {
      id: 4,
      date: "February 14, 2025",
      title: "First Valentine's Day",
      description: "Is this the day you looked the best. Amar choice e top ta kinechilis. And the top paired with the pant. Simply ethereal. Amader first valentine's day. Chilli cheese fries with chicken popcorn khawa hyechilo XD",
      image: "/src/assets/timeline/valentines.jpg",
      icon: "💝",
      color: "#e07a5f"
    },
    {
      id: 5,
      date: "March 9, 2025",
      title: "Sunday Getaway",
      description: "Cubbon Park, Museum, UB City. Ami bhaloi jayga bar kri. Day well spent. Aro dure ebar jete hbe. Nandi Hills?",
      image: "/src/assets/timeline/trip.jpg",
      icon: "🌲",
      color: "#3d405b"
    },
    {
      id: 6,
      date: "February 9, 2025",
      title: "Shopping Date",
      description: "Another favorite outfit amr. Denim with check pant. Sedin tr to nicher part er e video kre jchhilam XXDD.",
      image: "/src/assets/timeline/shopping.jpg",
      icon: "🛍️",
      color: "#81b29a"
    },
    {
      id: 7,
      date: "April 1, 2025",
      title: "Six Month Anniversary",
      description: "Half a year of loving you, and I fall more in love with you every day. Tuio amae jalas; amio toke jalai. But that's normal na? 6 months done. And ebar officialy blbo j YOU ARE THE ONE; YOU ARE THE ONLY!! Here's to many more months and years together and many more adventures together.",
      image: "/src/assets/timeline/anniversary.jpg",
      icon: "🎉",
      color: "#f2cc8f"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#e6f0f6] pt-10 pb-20 px-4">
      {/* Parallax background elements */}
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-20 z-0"
        style={{ 
          backgroundImage: "url('/src/assets/ghibli-field-bg.jpg')"
        }}
      />
      
      {/* Floating elements */}
      <motion.div 
        className="fixed z-1 w-24 h-24 opacity-60"
        style={{ 
          backgroundImage: "url('/src/assets/flying-bird.png')", 
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          top: '15%',
          left: '10%'
        }}
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -20, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 20,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="fixed z-1 w-16 h-16 opacity-60"
        style={{ 
          backgroundImage: "url('/src/assets/small-cloud.png')", 
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          top: '40%',
          right: '15%'
        }}
        animate={{ 
          x: [-50, 0, -50], 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 15,
          ease: "easeInOut" 
        }}
      />

      {/* Page content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif text-[#3a5169] mb-4">Our Journey Together</h1>
          <p className="text-[#3a5169] text-lg max-w-2xl mx-auto">
            Every moment with you has been a page from a beautiful story. Here's our timeline of memories.
          </p>
        </motion.div> */}

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#81b29a] rounded-full"></div>
          
          {/* Timeline events */}
          {timelineEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-16 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-md border-2 h-full"
                  style={{ borderColor: event.color }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="text-2xl mb-2" style={{ color: event.color }}>{event.icon}</div>
                  <h3 className="text-xl font-medium text-[#3a5169] mb-1">{event.title}</h3>
                  <p className="text-sm text-[#3a5169] opacity-75 mb-3">{event.date}</p>
                  <p className="text-[#3a5169]">{event.description}</p>
                </motion.div>
              </div>
              
              {/* Pin replacing the center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-6 z-10">
                <div 
                  className="w-8 h-8 flex items-center justify-center"
                  style={{ filter: `drop-shadow(0 2px 2px rgba(0,0,0,0.2))` }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2Z" 
                          fill={event.color} />
                    <path d="M12 12C9.24 12 7 14.24 7 17V22L12 20L17 22V17C17 14.24 14.76 12 12 12Z" 
                          fill={event.color} 
                          fillOpacity="0.8" />
                  </svg>
                </div>
              </div>
              
              {/* Image (opposite side) */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pl-10' : 'pr-10'}`}>
                <motion.div 
                  className="h-128 rounded-xl overflow-hidden shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/src/assets/placeholder-image.jpg';
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for viewing event details */}
      {selectedEvent && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div 
            className="bg-white rounded-xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col md:flex-row"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:w-1/2 h-64 md:h-auto">
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/src/assets/placeholder-image.jpg';
                }}
              />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-medium text-[#3a5169]">{selectedEvent.title}</h3>
                  <p className="text-sm text-[#3a5169] opacity-75">{selectedEvent.date}</p>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-[#3a5169] hover:text-[#e07a5f] text-xl"
                >
                  ×
                </button>
              </div>
              <p className="text-[#3a5169] flex-grow">{selectedEvent.description}</p>
              <div className="text-3xl mt-4" style={{ color: selectedEvent.color }}>{selectedEvent.icon}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Timeline; 