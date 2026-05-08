import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import type { DesktopIcon as IDesktopIcon } from '../../store/useOSStore';

interface Props {
  icon: IDesktopIcon;
}

export default function DesktopIcon({ icon }: Props) {
  const { openWindow, updateIconPosition } = useOSStore();

  const handleDoubleClick = () => {
    if (icon.type === 'app' && icon.appId) {
      openWindow(icon.appId, icon.name, icon.icon);
    } else if (icon.type === 'file' && icon.fileId) {
      openWindow('notepad', icon.name, 'icons/notepad.png', icon.fileId);
    } else if (icon.type === 'folder' && icon.fileId) {
      openWindow('explorer', icon.name, icon.icon);
    } else {
      openWindow('explorer', icon.name, icon.icon);
    }
  };

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        onDragEnd={(_, info) => {
          // Simple grid snapping (100px)
          const x = Math.round(info.point.x / 100) * 100 + 20;
          const y = Math.round(info.point.y / 100) * 100 + 20;
          updateIconPosition(icon.id, x, y);
        }}
        initial={{ x: icon.x, y: icon.y }}
        animate={{ x: icon.x, y: icon.y }}
        onDoubleClick={handleDoubleClick}
        style={{
          position: 'absolute',
          width: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          zIndex: 10
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
          transition: 'background 0.2s'
        }}>
          <img src={icon.icon} style={{ width: '40px', height: '40px', objectFit: 'contain' }} alt={icon.name} />
        </div>
        <span style={{
          fontSize: '11px',
          color: 'white',
          textAlign: 'center',
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          padding: '2px 4px',
          borderRadius: '4px',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {icon.name}
        </span>
      </motion.div>
      <style>{`
        .desktop-icon:hover .icon-wrapper {
          background: rgba(255, 255, 255, 0.1);
        }
        .desktop-icon:active .icon-wrapper {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}
