import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

export default function BootScreen() {
  const completeBoot = useOSStore(state => state.completeBoot);

  useEffect(() => {
    const timer = setTimeout(() => {
      completeBoot();
    }, 3500); 
    return () => clearTimeout(timer);
  }, [completeBoot]);

  return (
    <div style={{
      width: '100%', height: '100%', backgroundColor: '#000', color: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '40px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
      >
        <div style={{
          width: '60px', height: '60px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #0078d4, #4cc2ff)',
          boxShadow: '0 0 30px rgba(0, 120, 212, 0.5)'
        }} />
        <h1 style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '2px' }}>WINDOWS 12</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ position: 'relative', width: '200px', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px', overflow: 'hidden' }}
      >
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          style={{
            position: 'absolute', top: 0, left: 0, width: '40%', height: '100%',
            background: 'linear-gradient(90deg, transparent, #4cc2ff, transparent)'
          }}
        />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: '60px', fontSize: '12px', letterSpacing: '1px' }}
      >
        PREPARING SYSTEM
      </motion.p>
    </div>
  );
}
