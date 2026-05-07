import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import Taskbar from './Taskbar';
import WindowManager from '../Window/WindowManager';
import StartMenu from './StartMenu';

export default function Desktop() {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const { wallpaper } = useOSStore();

  const toggleStart = () => setIsStartOpen(prev => !prev);
  const closeStart = () => {
    if (isStartOpen) setIsStartOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="os-container"
      onClick={closeStart}
    >
      <div 
        className="os-wallpaper"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
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
