import { useState, useEffect } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { Grid, Globe, Settings, Cloud, Maximize, Minimize } from 'lucide-react';
import clsx from 'clsx';
import './Taskbar.css';

interface TaskbarProps {
  toggleStart: () => void;
  isStartOpen: boolean;
}

export default function Taskbar({ toggleStart, isStartOpen }: TaskbarProps) {
  const { windows, activeWindowId, openWindow, minimizeWindow, focusWindow } = useOSStore();
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
      <div className="taskbar-left">
        <button 
          className={clsx('taskbar-btn start-btn', { active: isStartOpen })}
          onClick={(e) => {
            e.stopPropagation();
            toggleStart();
          }}
          title="Start (Win)"
        >
          <Grid size={24} color="#0078d4" />
        </button>
      </div>

      <div className="taskbar-apps">
        <button className="taskbar-btn" onClick={() => handleAppClick('browser', 'Edge Browser')} title="Microsoft Edge">
          <Globe size={24} color="#4285F4" />
        </button>
        <button className="taskbar-btn" onClick={() => handleAppClick('settings', 'Settings')} title="Settings">
          <Settings size={24} />
        </button>
        <button className="taskbar-btn" onClick={() => handleAppClick('weather', 'Weather')} title="Weather">
          <Cloud size={24} color="#00a8ff" />
        </button>

        {windows.map(win => {
          if (['browser', 'settings', 'weather'].includes(win.id)) return null;
          return (
            <button 
              key={win.id}
              className={clsx('taskbar-btn', { active: activeWindowId === win.id && !win.isMinimized })}
              onClick={() => handleAppClick(win.id, win.title)}
            >
              <div className="active-dot" />
              <div style={{ width: '20px', height: '20px', background: 'var(--accent-color)', borderRadius: '4px', opacity: 0.8 }} />
            </button>
          );
        })}
      </div>

      <div className="taskbar-tray">
        <button className="tray-icon-btn" onClick={toggleFullscreen} title="Toggle Fullscreen">
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
        <div className="tray-item time-tray">
          <div className="time">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="date">{time.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
        </div>
      </div>
    </div>
  );
}
