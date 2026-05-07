import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { Search, Power, Globe, Settings, Cloud, Terminal, Calculator, FileText, Folder, Image as ImageIcon } from 'lucide-react';
import './StartMenu.css';

interface StartMenuProps {
  closeStart: () => void;
}

export default function StartMenu({ closeStart }: StartMenuProps) {
  const { logout, openWindow } = useOSStore();

  const handleAppLaunch = (id: string, title: string) => {
    openWindow(id, title);
    closeStart();
  };

  const apps = [
    { id: 'browser', title: 'Edge', icon: <Globe size={32} color="#4285F4" /> },
    { id: 'explorer', title: 'Files', icon: <Folder size={32} color="#ffca28" fill="#ffca28" /> },
    { id: 'settings', title: 'Settings', icon: <Settings size={32} /> },
    { id: 'weather', title: 'Weather', icon: <Cloud size={32} color="#00a8ff" /> },
    { id: 'gallery', title: 'Photos', icon: <ImageIcon size={32} color="#e81123" /> },
    { id: 'terminal', title: 'Terminal', icon: <Terminal size={32} /> },
    { id: 'calculator', title: 'Calc', icon: <Calculator size={32} color="#f0932b" /> },
    { id: 'notepad', title: 'Notepad', icon: <FileText size={32} color="#48dbfb" /> },
  ];

  return (
    <motion.div 
      className="start-menu glass"
      initial={{ y: 50, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 50, opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="start-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search apps, settings, and files" />
      </div>

      <div className="start-section">
        <h3>Pinned Apps</h3>
        <div className="app-grid">
          {apps.map(app => (
            <button key={app.id} className="app-btn" onClick={() => handleAppLaunch(app.id, app.title)}>
              <div className="app-icon">{app.icon}</div>
              <span className="app-title">{app.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="start-footer">
        <div className="user-info">
          <div className="user-avatar">AD</div>
          <span>Administrator</span>
        </div>
        <button className="power-btn" onClick={logout} title="Sign out">
          <Power size={18} />
        </button>
      </div>
    </motion.div>
  );
}
