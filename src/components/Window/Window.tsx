import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import type { AppWindow } from '../../store/useOSStore';
import { Minus, Square, X } from 'lucide-react';
import BrowserMock from './Apps/BrowserMock';
import SettingsMock from './Apps/SettingsMock';
import WeatherMock from './Apps/WeatherMock';
import TerminalMock from './Apps/TerminalMock';
import CalculatorMock from './Apps/CalculatorMock';
import FileExplorerMock from './Apps/FileExplorerMock';
import NotepadMock from './Apps/NotepadMock';
import GalleryMock from './Apps/GalleryMock';
import MinesweeperMock from './Apps/MinesweeperMock';
import PaintMock from './Apps/PaintMock';
import ErrorBoundary from '../ErrorBoundary';
import './Window.css';

interface WindowProps {
  window: AppWindow;
}

export default function Window({ window: win }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId, updateWindowDimensions } = useOSStore();
  const windowRef = useRef<HTMLDivElement>(null);
  const [showSnapAssist, setShowSnapAssist] = useState(false);

  if (win.isMinimized) return null;

  const isActive = activeWindowId === win.id;

  const handlePointerDown = () => {
    if (!isActive) focusWindow(win.id);
  };

  const getIcon = () => {
    if (win.icon) return <img src={win.icon} style={{ width: '16px', height: '16px' }} alt="" />;
    switch (win.id) {
      case 'browser': return <img src="icons/edge.png" style={{ width: '16px', height: '16px' }} alt="" />;
      case 'settings': return <img src="icons/settings.png" style={{ width: '16px', height: '16px' }} alt="" />;
      case 'weather': return <img src="icons/weather.png" style={{ width: '16px', height: '16px' }} alt="" />;
      case 'terminal': return <img src="icons/terminal.png" style={{ width: '16px', height: '16px' }} alt="" />;
      case 'calculator': return <img src="icons/calculator.png" style={{ width: '16px', height: '16px' }} alt="" />;
      case 'notepad': return <img src="icons/notepad.png" style={{ width: '16px', height: '16px' }} alt="" />;
      case 'explorer': return <img src="icons/explorer.png" style={{ width: '16px', height: '16px' }} alt="" />;
      case 'gallery': return <img src="icons/photos.png" style={{ width: '16px', height: '16px' }} alt="" />;
      case 'minesweeper': return <img src="https://img.icons8.com/fluency/512/mine-sweeper.png" style={{ width: '16px', height: '16px' }} alt="" />;
      case 'paint': return <img src="https://img.icons8.com/fluency/512/paint-palette.png" style={{ width: '16px', height: '16px' }} alt="" />;
      default: return null;
    }
  };

  const renderContent = () => {
    switch (win.id) {
      case 'browser': return <BrowserMock />;
      case 'settings': return <SettingsMock />;
      case 'weather': return <WeatherMock />;
      case 'terminal': return <TerminalMock />;
      case 'calculator': return <CalculatorMock />;
      case 'explorer': return <FileExplorerMock />;
      case 'notepad': return <NotepadMock fileId={win.fileId} />;
      case 'gallery': return <GalleryMock />;
      case 'minesweeper': return <MinesweeperMock />;
      case 'paint': return <PaintMock />;
      default:
        return (
          <div className="window-content-inner">
            <h1>{win.title}</h1>
            <p style={{ marginTop: '20px', opacity: 0.7 }}>Contenu simulé pour {win.title}.</p>
          </div>
        );
    }
  };

  const handleSnap = (type: 'left' | 'right' | 'top') => {
    const { innerWidth } = window;
    if (type === 'left') updateWindowDimensions(win.id, 0, 0, '50%', 'calc(100% - 72px)');
    else if (type === 'right') updateWindowDimensions(win.id, innerWidth / 2, 0, '50%', 'calc(100% - 72px)');
    else if (type === 'top') maximizeWindow(win.id);
    setShowSnapAssist(false);
  };

  return (
    <motion.div
      ref={windowRef}
      className={`window ${win.isMaximized ? 'maximized' : ''} ${isActive ? 'active' : ''}`}
      drag={!win.isMaximized}
      dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 100, bottom: window.innerHeight - 100 }}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: win.isMaximized ? 0 : win.y ?? 100,
        x: win.isMaximized ? 0 : win.x ?? 100,
        width: win.isMaximized ? '100%' : win.width ?? 900, 
        height: win.isMaximized ? 'calc(100% - 72px)' : win.height ?? 600,
        borderRadius: win.isMaximized ? 0 : 12,
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{ zIndex: win.zIndex, position: 'absolute' }}
      onPointerDown={handlePointerDown}
    >
      <div className="window-header" onDoubleClick={() => maximizeWindow(win.id)}>
        <div className="window-title">
          {getIcon()}
          <span>{win.title}</span>
        </div>
        <div className="window-controls">
          <button className="control-btn" onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}>
            <Minus size={16} />
          </button>
          
          <div style={{ position: 'relative', height: '100%' }} onMouseEnter={() => setShowSnapAssist(true)} onMouseLeave={() => setShowSnapAssist(false)}>
            <button className="control-btn" onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}>
              <Square size={14} />
            </button>
            <AnimatePresence>
              {showSnapAssist && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="snap-assist-menu glass"
                  style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: '160px', padding: '12px', borderRadius: '12px', zIndex: 100 }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div onClick={() => handleSnap('left')} style={{ height: '40px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer' }} title="Snap Gauche" />
                    <div onClick={() => handleSnap('right')} style={{ height: '40px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer' }} title="Snap Droite" />
                    <div onClick={() => handleSnap('top')} style={{ gridColumn: 'span 2', height: '20px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', borderRadius: '4px', cursor: 'pointer' }} title="Maximiser" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="control-btn close" onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}>
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="window-content">
        <ErrorBoundary>
          {renderContent()}
        </ErrorBoundary>
      </div>
    </motion.div>
  );
}
