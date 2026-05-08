import { useRef } from 'react';
import { motion } from 'framer-motion';
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
import ErrorBoundary from '../ErrorBoundary';
import './Window.css';

interface WindowProps {
  window: AppWindow;
}

export default function Window({ window: win }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId } = useOSStore();
  const windowRef = useRef<HTMLDivElement>(null);

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
      case 'copilot-chat': return <img src="icons/copilot.png" style={{ width: '16px', height: '16px' }} alt="" />;
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
      case 'copilot-chat': return (
        <div className="window-content-inner" style={{ background: '#0f0f0f', color: 'white', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <img src="icons/copilot.png" style={{ width: '64px', height: '64px', marginBottom: '20px' }} alt="Copilot" />
          <h2>Windows Copilot IA</h2>
          <p style={{ opacity: 0.7, maxWidth: '400px', marginTop: '10px' }}>Votre assistant personnel intelligent est prêt. Posez-moi n'importe quelle question sur Windows 12.</p>
          <div style={{ marginTop: '30px', width: '80%', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
            Tapez un message...
          </div>
        </div>
      );
      default:
        return (
          <div className="window-content-inner">
            <h1>{win.title}</h1>
            <p style={{ marginTop: '20px', opacity: 0.7 }}>This is a placeholder for the {win.title} application.</p>
          </div>
        );
    }
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
      onDragEnd={(_, info) => {
        if (!win.isMaximized) {
          const { x, y } = info.point;
          const { innerWidth } = window;
          const offset = 20; // Snap sensitivity
          
          if (x < offset) {
            useOSStore.getState().updateWindowDimensions(win.id, 0, 0, '50%', `calc(100% - 72px)`);
          } else if (x > innerWidth - offset) {
            useOSStore.getState().updateWindowDimensions(win.id, innerWidth / 2, 0, '50%', `calc(100% - 72px)`);
          } else if (y < offset) {
            useOSStore.getState().maximizeWindow(win.id);
          } else {
            useOSStore.getState().updateWindowDimensions(win.id, x, y, 900, 600);
          }
        }
      }}
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
          <button className="control-btn" onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}>
            <Square size={14} />
          </button>
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
