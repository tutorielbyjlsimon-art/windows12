import { useOSStore } from '../../store/useOSStore';
import { Grid, Globe, Settings, Cloud } from 'lucide-react';
import clsx from 'clsx';
import './Taskbar.css'; // We will create this

interface TaskbarProps {
  toggleStart: () => void;
  isStartOpen: boolean;
}

export default function Taskbar({ toggleStart, isStartOpen }: TaskbarProps) {
  const { windows, activeWindowId, openWindow, minimizeWindow, focusWindow } = useOSStore();

  const handleAppClick = (id: string, title: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) {
      openWindow(id, title);
    } else if (win.id === activeWindowId && !win.isMinimized) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="taskbar glass">
      <div className="taskbar-apps">
        <button 
          className={clsx('taskbar-btn start-btn', { active: isStartOpen })}
          onClick={(e) => {
            e.stopPropagation();
            toggleStart();
          }}
        >
          <Grid size={24} color="#0067c0" />
        </button>

        {/* Pinned Apps */}
        <button className="taskbar-btn" onClick={() => handleAppClick('browser', 'Edge Browser')}>
          <Globe size={24} color="#4285F4" />
        </button>
        <button className="taskbar-btn" onClick={() => handleAppClick('settings', 'Settings')}>
          <Settings size={24} />
        </button>
        <button className="taskbar-btn" onClick={() => handleAppClick('weather', 'Weather')}>
          <Cloud size={24} color="#00a8ff" />
        </button>

        {/* Open Windows (Not pinned) */}
        {windows.map(win => {
          if (['browser', 'settings', 'weather'].includes(win.id)) return null;
          return (
            <button 
              key={win.id}
              className={clsx('taskbar-btn', { active: activeWindowId === win.id && !win.isMinimized })}
              onClick={() => handleAppClick(win.id, win.title)}
            >
              <div style={{ width: '20px', height: '20px', background: '#ccc', borderRadius: '4px' }} />
            </button>
          );
        })}
      </div>

      <div className="taskbar-tray">
        <div className="tray-item" style={{ fontSize: '12px', textAlign: 'right' }}>
          <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div>{new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}
