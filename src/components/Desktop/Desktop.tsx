import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import Taskbar from './Taskbar';
import WindowManager from '../Window/WindowManager';
import StartMenu from './StartMenu';

export default function Desktop() {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const wallpaper = useOSStore(state => state.wallpaper);

  const toggleStart = () => setIsStartOpen(prev => !prev);
  const closeStart = () => {
    if (isStartOpen) setIsStartOpen(false);
  };

  // Preload image to prevent flicker
  useEffect(() => {
    setIsImageLoaded(false);
    const img = new Image();
    img.src = wallpaper;
    img.onload = () => setIsImageLoaded(true);
  }, [wallpaper]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="os-container"
      onClick={closeStart}
      style={{ backgroundColor: '#000' }}
    >
      {/* Smoothly fade in wallpaper only when loaded */}
      <motion.div 
        key={wallpaper}
        initial={{ opacity: 0 }}
        animate={{ opacity: isImageLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="os-wallpaper"
        style={{ 
          backgroundImage: `url(${wallpaper})`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
      
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
        <WindowManager />
      </div>
      
      <AnimatePresence>
        {isStartOpen && (
          <StartMenu closeStart={closeStart} />
        )}
      </AnimatePresence>

      <Taskbar toggleStart={toggleStart} isStartOpen={isStartOpen} />
    </motion.div>
  );
}
