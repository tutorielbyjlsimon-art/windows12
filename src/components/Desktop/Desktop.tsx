import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import Taskbar from './Taskbar';
import WindowManager from '../Window/WindowManager';
import StartMenu from './StartMenu';

export default function Desktop() {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const wallpaper = useOSStore(state => state.wallpaper);

  const toggleStart = () => setIsStartOpen(prev => !prev);
  const closeStart = () => {
    if (isStartOpen) setIsStartOpen(false);
  };

  // Memoize wallpaper style to prevent unnecessary re-renders
  const wallpaperStyle = useMemo(() => ({
    backgroundImage: `url(${wallpaper})`,
    backgroundColor: '#000', // Solid fallback
  }), [wallpaper]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="os-container"
      onClick={closeStart}
    >
      <div 
        className="os-wallpaper"
        style={wallpaperStyle}
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
