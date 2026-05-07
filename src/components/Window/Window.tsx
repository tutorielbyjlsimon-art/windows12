import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import type { AppWindow } from '../../store/useOSStore';
import { Minus, Square, X, Globe, Settings, Cloud, Terminal, Calculator, FileText, Folder, Image as ImageIcon } from 'lucide-react';
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
    switch (win.id) {
      case 'browser': return <Globe size={16} color="#0078d4" />;
      case 'settings': return <Settings size={16} />;
      case 'weather': return <Cloud size={16} color="#4cc2ff" />;
      case 'terminal': return <Terminal size={16} />;
      case 'calculator': return <Calculator size={16} color="#f0932b" />;
      case 'notepad': return <FileText size={16} color="#48dbfb" />;
      case 'explorer': return <Folder size={16} color="#ffca28" fill="#ffca28" />;
      case 'gallery': return <ImageIcon size={16} color="#e81123" />;
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
