import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

export default function LockScreen() {
  const { unlock, wallpaper } = useOSStore();
  const [time, setTime] = useState(new Date());
  const [isSlidingUp, setIsSlidingUp] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setIsSlidingUp(true);
    setTimeout(unlock, 500);
  };

  return (
    <motion.div 
      className="lock-screen"
      initial={{ y: 0 }}
      animate={{ y: isSlidingUp ? '-100%' : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleUnlock}
      onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
      tabIndex={0}
      style={{
        width: '100%', height: '100%', position: 'absolute', zIndex: 20000,
        overflow: 'hidden', cursor: 'pointer'
      }}
    >
      <div 
        className="os-wallpaper"
        style={{ backgroundImage: `url(${wallpaper})`, filter: 'brightness(0.8)' }}
      />
      
      <div style={{
        position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', color: 'white', textShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '120px', fontWeight: 200, margin: 0 }}
        >
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '24px', fontWeight: 400, marginTop: '-10px' }}
        >
          {time.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </motion.p>
      </div>

      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        color: 'white', opacity: 0.6, fontSize: '14px', animation: 'bounce 2s infinite'
      }}>
        Cliquez ou appuyez sur une touche pour déverrouiller
      </div>

      <style>{`
        @keyframes bounce { 
          0%, 20%, 50%, 80%, 100% {transform: translateX(-50%) translateY(0);} 
          40% {transform: translateX(-50%) translateY(-10px);} 
          60% {transform: translateX(-50%) translateY(-5px);} 
        }
      `}</style>
    </motion.div>
  );
}
