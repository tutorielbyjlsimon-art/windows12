import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';
import { X, Info, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

export default function NotificationsLayer() {
  const { notifications, removeNotification } = useOSStore();

  return (
    <div style={{
      position: 'fixed', bottom: '80px', right: '20px',
      display: 'flex', flexDirection: 'column', gap: '10px',
      zIndex: 10001, pointerEvents: 'none'
    }}>
      <AnimatePresence>
        {notifications.map(n => (
          <motion.div
            key={n.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="glass"
            style={{
              width: '320px', padding: '16px', borderRadius: '12px',
              display: 'flex', gap: '12px', pointerEvents: 'auto'
            }}
          >
            <div style={{ color: 'var(--accent-color)' }}>
              {n.type === 'info' && <Info size={20} />}
              {n.type === 'success' && <CheckCircle size={20} color="#00cc6a" />}
              {n.type === 'warning' && <AlertTriangle size={20} color="#ffb900" />}
              {n.type === 'error' && <AlertCircle size={20} color="#e81123" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{n.title}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{n.message}</div>
            </div>
            <button 
              onClick={() => removeNotification(n.id)}
              style={{ background: 'none', border: 'none', color: 'inherit', opacity: 0.5, cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
