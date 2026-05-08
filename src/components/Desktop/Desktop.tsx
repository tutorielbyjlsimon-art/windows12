import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import Taskbar from './Taskbar';
import WindowManager from '../Window/WindowManager';
import StartMenu from './StartMenu';
import ActionCenter from './ActionCenter';
import DesktopWidgets from './DesktopWidgets';
import Spotlight from './Spotlight';
import DesktopIcon from './DesktopIcon';

export default function Desktop() {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
  const { 
    wallpaper, isActionCenterOpen, closeActionCenter, 
    toggleTheme, lock, addNotification, desktopIcons,
    createItem, addDesktopIcon
  } = useOSStore();

  const toggleStart = () => setIsStartOpen(prev => !prev);
  const closeStart = () => {
    if (isStartOpen) setIsStartOpen(false);
    if (isActionCenterOpen) closeActionCenter();
    setContextMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          const fileId = createItem({
            name: file.name,
            type: 'file',
            parentId: 'drive-c', // Default to C: for dropped files
            content: content
          });

          addDesktopIcon({
            id: `icon-${fileId}`,
            name: file.name,
            icon: file.type.startsWith('image/') ? content : 'icons/notepad.png',
            type: 'file',
            fileId: fileId
          });

          addNotification({
            title: 'Importation',
            message: `Fichier "${file.name}" importé avec succès.`,
            type: 'success'
          });
        };

        if (file.type.startsWith('image/')) {
          reader.readAsDataURL(file);
        } else {
          reader.readAsText(file);
        }
      }
    }
  };

  // Preload image
  useEffect(() => {
    setIsImageLoaded(false);
    const img = new Image();
    img.src = wallpaper;
    img.onload = () => setIsImageLoaded(true);
  }, [wallpaper]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="os-container"
      onClick={closeStart}
      onContextMenu={handleContextMenu}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{ backgroundColor: '#000' }}
    >
      <motion.div 
        key={wallpaper}
        initial={{ opacity: 0 }}
        animate={{ opacity: isImageLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="os-wallpaper"
        style={{ 
          backgroundImage: `url(${wallpaper})`,
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%', zIndex: 0
        }}
      />

      <DesktopWidgets />
      <Spotlight />

      {/* Desktop Icons Layer */}
      <div className="desktop-icons-container" style={{ position: 'absolute', inset: 0, padding: '20px', zIndex: 10, pointerEvents: 'none' }}>
        {desktopIcons.map(icon => (
          <div key={icon.id} style={{ pointerEvents: 'auto' }}>
            <DesktopIcon icon={icon} />
          </div>
        ))}
      </div>
      
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', zIndex: 20, pointerEvents: 'none' }}>
        <WindowManager />
      </div>
      
      <AnimatePresence>
        {isStartOpen && <StartMenu closeStart={closeStart} />}
        {isActionCenterOpen && <ActionCenter />}
        {contextMenu && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass"
            style={{
              position: 'fixed', top: contextMenu.y, left: contextMenu.x,
              width: '200px', padding: '8px', borderRadius: '12px',
              zIndex: 100000, boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            <ContextItem label="Refroidir l'affichage" onClick={() => window.location.reload()} />
            <ContextItem label="Changer de thème" onClick={toggleTheme} />
            <ContextItem label="Verrouiller (Win+L)" onClick={lock} />
            <div style={{ height: '1px', background: 'var(--glass-border)', margin: '4px 8px' }} />
            <ContextItem label="Nouveau dossier" onClick={() => {
              const id = createItem({ name: 'Nouveau Dossier', type: 'folder', parentId: null });
              addDesktopIcon({ id: `icon-${id}`, name: 'Nouveau Dossier', icon: 'icons/explorer.png', type: 'folder', fileId: id });
            }} />
            <ContextItem label="Paramètres" onClick={() => useOSStore.getState().openWindow('settings', 'Settings')} />
          </motion.div>
        )}
      </AnimatePresence>

      <Taskbar toggleStart={toggleStart} isStartOpen={isStartOpen} />
    </motion.div>
  );
}

function ContextItem({ label, onClick }: { label: string, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      style={{ padding: '8px 12px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-bg)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      {label}
    </div>
  );
}
