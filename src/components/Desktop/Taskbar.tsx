import { useState, useEffect } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { Maximize, Minimize, Wifi, BatteryMedium, Volume2 } from 'lucide-react';
import clsx from 'clsx';
import './Taskbar.css';

interface TaskbarProps {
  toggleStart: () => void;
  isStartOpen: boolean;
}

export default function Taskbar({ toggleStart, isStartOpen }: TaskbarProps) {
  const { windows, activeWindowId, openWindow, minimizeWindow, focusWindow, toggleActionCenter } = useOSStore();
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleAppClick = (id: string, title: string, icon: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) {
      openWindow(id, title, icon);
    } else if (win.id === activeWindowId && !win.isMinimized) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const pinnedApps = [
    { id: 'browser', title: 'Edge', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Microsoft_Edge_logo_%282019%29.svg' },
    { id: 'explorer', title: 'Files', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Windows_11_File_Explorer_Icon.svg' },
    { id: 'settings', title: 'Settings', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Windows_Settings_icon.svg' },
    { id: 'weather', title: 'Weather', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Windows_11_Weather_icon.svg' },
  ];

  return (
    <div className="taskbar glass">
      <div className="taskbar-left">
        <button 
          className={clsx('taskbar-btn start-btn', { active: isStartOpen })}
          onClick={(e) => {
            e.stopPropagation();
            toggleStart();
          }}
          title="Démarrer"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Windows_logo_-_2021.svg" style={{ width: '22px', height: '22px' }} alt="Start" />
        </button>
      </div>

      <div className="taskbar-apps">
        {pinnedApps.map(app => (
          <button 
            key={app.id} 
            className={clsx('taskbar-btn', { active: activeWindowId === app.id && !windows.find(w => w.id === app.id)?.isMinimized })} 
            onClick={() => handleAppClick(app.id, app.title, app.icon)} 
            title={app.title}
          >
            <img src={app.icon} style={{ width: '26px', height: '26px' }} alt={app.title} />
          </button>
        ))}

        {windows.map(win => {
          if (pinnedApps.some(a => a.id === win.id)) return null;
          return (
            <button 
              key={win.id}
              className={clsx('taskbar-btn', { active: activeWindowId === win.id && !win.isMinimized })}
              onClick={() => handleAppClick(win.id, win.title, win.icon || '')}
              title={win.title}
            >
              <div className="active-dot" />
              {win.icon ? <img src={win.icon} style={{ width: '26px', height: '26px' }} alt={win.title} /> : <div style={{ width: '20px', height: '20px', background: 'var(--accent-color)', borderRadius: '4px', opacity: 0.8 }} />}
            </button>
          );
        })}
      </div>

      <div className="taskbar-tray">
        <button className="tray-icon-btn" onClick={toggleFullscreen} title="Plein Écran">
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
        <button 
          className="tray-icon-btn" 
          onClick={(e) => { e.stopPropagation(); toggleActionCenter(); }} 
          title="Réglages rapides"
          style={{ display: 'flex', gap: '6px', alignItems: 'center' }}
        >
          <Wifi size={14} />
          <Volume2 size={14} />
          <BatteryMedium size={14} />
        </button>
        <div className="tray-item time-tray">
          <div className="time">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="date">{time.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
        </div>
      </div>
    </div>
  );
}
