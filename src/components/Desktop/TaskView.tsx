import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { X } from 'lucide-react';

export default function TaskView() {
  const { windows, isTaskViewOpen, toggleTaskView, focusWindow, closeWindow } = useOSStore();

  if (!isTaskViewOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50000,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(20px)',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      onClick={toggleTaskView}
    >
      <h2 style={{ color: 'white', marginBottom: '40px', fontWeight: 300, fontSize: '32px' }}>Vues des tâches</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px',
        width: '100%',
        maxWidth: '1200px'
      }}>
        {windows.map(win => (
          <motion.div
            key={win.id}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => { e.stopPropagation(); focusWindow(win.id); toggleTaskView(); }}
            style={{
              background: 'var(--window-bg)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              position: 'relative',
              aspectRatio: '16/10',
              border: '1px solid var(--glass-border)'
            }}
          >
            <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                {win.icon ? <img src={win.icon} style={{ width: '16px', height: '16px' }} alt="" /> : null}
                <span>{win.title}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.6 }}
              >
                <X size={16} />
              </button>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
              <div style={{ fontSize: '11px' }}>Aperçu de la fenêtre</div>
            </div>
          </motion.div>
        ))}
        {windows.length === 0 && (
          <div style={{ color: 'white', opacity: 0.5, textAlign: 'center', gridColumn: '1/-1', marginTop: '100px' }}>
            Aucune fenêtre ouverte
          </div>
        )}
      </div>
    </motion.div>
  );
}
