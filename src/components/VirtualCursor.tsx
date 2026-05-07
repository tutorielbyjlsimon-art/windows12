import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';
import { MousePointer2 } from 'lucide-react';

export default function VirtualCursor() {
  const { showVirtualCursor, isMobile } = useOSStore();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!showVirtualCursor && !isMobile) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const y = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchstart', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchstart', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [showVirtualCursor, isMobile]);

  if (!showVirtualCursor && !isMobile) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        color: 'white',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
      }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    >
      <MousePointer2 size={24} fill="currentColor" stroke="black" strokeWidth={1} />
      {isMobile && (
        <div style={{
          position: 'absolute',
          top: -10,
          left: -10,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.1)'
        }} />
      )}
    </motion.div>
  );
}
