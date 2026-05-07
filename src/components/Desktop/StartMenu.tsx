import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { Search, Power, Globe, Settings, Cloud, Terminal, Calculator, FileText } from 'lucide-react';
import './StartMenu.css';

interface StartMenuProps {
  closeStart: () => void;
}

export default function StartMenu({ closeStart }: StartMenuProps) {
  const { logout, openWindow } = useOSStore();

  const handleAppLaunch = (id: string, title: string, icon: string) => {
    openWindow(id, title, icon);
    closeStart();
  };

  const apps = [
    { id: 'browser', title: 'Edge Browser', icon: <Globe size={32} color="#4285F4" /> },
    { id: 'settings', title: 'Settings', icon: <Settings size={32} /> },
    { id: 'weather', title: 'Weather', icon: <Cloud size={32} color="#00a8ff" /> },
    { id: 'terminal', title: 'Terminal', icon: <Terminal size={32} /> },
    { id: 'calculator', title: 'Calculator', icon: <Calculator size={32} color="#f0932b" /> },
    { id: 'notepad', title: 'Notepad', icon: <FileText size={32} color="#48dbfb" /> },
  ];

  return (
    <motion.div 
      className="start-menu glass"
      initial={{ y: 50, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 50, opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="start-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Type here to search" />
      </div>

      <div className="start-section">
        <h3>Pinned</h3>
        <div className="app-grid">
          {apps.map(app => (
            <button key={app.id} className="app-btn" onClick={() => handleAppLaunch(app.id, app.title, app.id)}>
              <div className="app-icon">{app.icon}</div>
              <span className="app-title">{app.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="start-footer">
        <div className="user-info">
          <div className="user-avatar">AD</div>
          <span>Admin User</span>
        </div>
        <button className="power-btn" onClick={logout} title="Power">
          <Power size={18} />
        </button>
      </div>
    </motion.div>
  );
}
