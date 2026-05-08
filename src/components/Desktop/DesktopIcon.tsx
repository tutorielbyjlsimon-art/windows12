import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import type { DesktopIcon as IDesktopIcon } from '../../store/useOSStore';

interface Props {
  icon: IDesktopIcon;
}

export default function DesktopIcon({ icon }: Props) {
  const { openWindow, updateIconPosition, activeWindowId } = useOSStore();
  const [isSelected, setIsSelected] = useState(false);

  // Close selection when clicking elsewhere (handled by Desktop.tsx onClick, but we can also use activeWindowId)
  useEffect(() => {
    if (activeWindowId) setIsSelected(false);
  }, [activeWindowId]);

  const handleOpen = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    openWindow(icon.appId || icon.id, icon.name, icon.icon, icon.fileId);
    setIsSelected(false);
  };

  const handleSelect = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsSelected(true);
  };

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={() => setIsSelected(true)}
        onDragEnd={(_, info) => {
          const x = Math.round(info.point.x / 100) * 100 + 20;
          const y = Math.round(info.point.y / 100) * 100 + 20;
          updateIconPosition(icon.id, x, y);
        }}
        onClick={handleSelect}
        onDoubleClick={handleOpen}
        initial={{ x: icon.x, y: icon.y }}
        animate={{ 
          x: icon.x, 
          y: icon.y,
          scale: isSelected ? 1.02 : 1
        }}
        style={{
          position: 'absolute',
          width: '90px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          zIndex: 10,
          padding: '10px',
          borderRadius: '8px',
          background: isSelected ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
          border: isSelected ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
          pointerEvents: 'auto'
        }}
        className="desktop-icon"
      >
        <div className="icon-wrapper" style={{
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
        }}>
          <img src={icon.icon} style={{ width: '45px', height: '45px', objectFit: 'contain' }} alt={icon.name} />
        </div>
        <span style={{
          fontSize: '11px',
          color: 'white',
          textAlign: 'center',
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          padding: '2px 6px',
          borderRadius: '4px',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          background: isSelected ? 'var(--accent-color)' : 'transparent'
        }}>
          {icon.name}
        </span>
      </motion.div>
      <style>{`
        .desktop-icon:hover {
          background: ${isSelected ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)'};
        }
      `}</style>
    </>
  );
}
