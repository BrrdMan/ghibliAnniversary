import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(30);
  const [showControls, setShowControls] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const playerRef = useRef(null);
  const youtubeRef = useRef(null);

  // YouTube video IDs for your songs
  const songs = [
    { id: 'c7zn-c6mSho', title: 'For You' },
    { id: 'ijnrCaEHHK0', title: 'Wildflower' },
    { id: 'BZ6D9SEvBHs', title: 'Youre All I Want' },
    { id: 'K3oeuo2RmUk', title: 'red love' }
  ];

  // Load YouTube IFrame API
  useEffect(() => {
    // Create a flag to track if this is the first instance
    if (!window.musicPlayerInitialized) {
      window.musicPlayerInitialized = true;
    } else {
      // If another instance was already created, don't initialize this one
      return;
    }

    // Create YouTube script tag if it doesn't exist
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Initialize player when API is ready
    window.onYouTubeIframeAPIReady = initializePlayer;

    // If API was already loaded before component mounted
    if (window.YT && window.YT.Player) {
      initializePlayer();
    }

    // Check if music was playing in previous session
    const savedState = localStorage.getItem('backgroundMusicState');
    if (savedState) {
      const { wasPlaying, songIndex, volumeLevel } = JSON.parse(savedState);
      setCurrentSongIndex(songIndex || 0);
      setVolume(volumeLevel || 30);
      if (wasPlaying) {
        // We'll start playing once the player is ready
        setIsPlaying(true);
      }
    }

    return () => {
      // Clean up
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Save state when component unmounts or when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('backgroundMusicState', JSON.stringify({
        wasPlaying: isPlaying,
        songIndex: currentSongIndex,
        volumeLevel: volume
      }));
    }
  }, [isPlaying, currentSongIndex, volume, isLoaded]);

  // Initialize YouTube player
  const initializePlayer = () => {
    if (youtubeRef.current && !playerRef.current) {
      playerRef.current = new window.YT.Player(youtubeRef.current, {
        height: '0',
        width: '0',
        videoId: songs[currentSongIndex].id,
        playerVars: {
          autoplay: isPlaying ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        }
      });
    }
  };

  // Handle player ready event
  const onPlayerReady = (event) => {
    setIsLoaded(true);
    event.target.setVolume(volume);
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  // Handle player state changes
  const onPlayerStateChange = (event) => {
    // If video ended, play next song
    if (event.data === window.YT.PlayerState.ENDED) {
      playNextSong();
    }
    
    // Update playing state based on player state
    setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
  };

  // Handle player errors
  const onPlayerError = (event) => {
    console.error('YouTube player error:', event.data);
    // Try playing the next song if there's an error
    playNextSong();
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (!playerRef.current) return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Play next song
  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    
    if (playerRef.current) {
      playerRef.current.loadVideoById(songs[nextIndex].id);
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    }
  };

  // Play previous song
  const playPrevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    
    if (playerRef.current) {
      playerRef.current.loadVideoById(songs[prevIndex].id);
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  return (
    <>
      {/* Hidden YouTube player */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        <div ref={youtubeRef}></div>
      </div>
      
      {/* Music controls */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          className="bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300"
          onClick={() => setShowControls(!showControls)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </button>
        
        <AnimatePresence>
          {showControls && (
            <motion.div 
              className="absolute bottom-14 right-0 bg-black/70 backdrop-blur-md p-4 rounded-lg shadow-lg w-64"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white text-sm font-medium">Now Playing</h3>
                <div className="flex items-center">
                  <button 
                    className="text-white/70 hover:text-white p-1"
                    onClick={playPrevSong}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    className="text-white p-1 mx-1"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  
                  <button 
                    className="text-white/70 hover:text-white p-1"
                    onClick={playNextSong}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <p className="text-white/90 text-xs mb-3 truncate">
                {songs[currentSongIndex].title}
              </p>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/70 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-9.9m-2.828 9.9a9 9 0 010-12.728" />
                </svg>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume} 
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default BackgroundMusic; 