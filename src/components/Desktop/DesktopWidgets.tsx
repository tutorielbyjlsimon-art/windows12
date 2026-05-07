import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Newspaper } from 'lucide-react';

export default function DesktopWidgets() {
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * (25 - 5 + 1)) + 5);
      setRam(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newVal = prev + change;
        return newVal > 60 ? 59 : newVal < 30 ? 31 : newVal;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: '40px',
      left: '40px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      {/* System Performance Widget */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass"
        style={{
          padding: '20px',
          borderRadius: '20px',
          width: '200px',
          pointerEvents: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', opacity: 0.8 }}>
          <Activity size={18} color="var(--accent-color)" />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>Performance</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
              <span>CPU</span>
              <span>{cpu}%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <motion.div animate={{ width: `${cpu}%` }} style={{ height: '100%', background: 'var(--accent-color)', borderRadius: '2px' }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
              <span>RAM</span>
              <span>{ram}%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <motion.div animate={{ width: `${ram}%` }} style={{ height: '100%', background: '#00cc6a', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* World Clock Widget */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="glass"
        style={{
          padding: '20px',
          borderRadius: '20px',
          width: '200px',
          pointerEvents: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', opacity: 0.8 }}>
          <Clock size={18} color="#ffb900" />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>Tokyo</span>
        </div>
        <div style={{ fontSize: '24px', fontWeight: 300 }}>
          {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo' })}
        </div>
        <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '4px' }}>Tomorrow, +7h</div>
      </motion.div>

      {/* Mini News Widget */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="glass"
        style={{
          padding: '20px',
          borderRadius: '20px',
          width: '200px',
          pointerEvents: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', opacity: 0.8 }}>
          <Newspaper size={18} color="#ff4757" />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>News</span>
        </div>
        <p style={{ fontSize: '12px', lineHeight: '1.4', fontWeight: 500 }}>
          Windows 12 prototype reaches Masterpiece status.
        </p>
        <div style={{ fontSize: '10px', opacity: 0.5, marginTop: '8px' }}>2 mins ago • TechCrunch</div>
      </motion.div>
    </div>
  );
}
