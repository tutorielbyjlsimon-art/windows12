import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { Search, Power, Globe, Settings, Cloud, Terminal, Calculator, FileText, Folder, Image as ImageIcon } from 'lucide-react';
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
    { id: 'browser', title: 'Edge', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Microsoft_Edge_logo_%282019%29.svg' },
    { id: 'explorer', title: 'Files', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Windows_11_File_Explorer_Icon.svg' },
    { id: 'settings', title: 'Settings', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Windows_Settings_icon.svg' },
    { id: 'weather', title: 'Weather', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Windows_11_Weather_icon.svg' },
    { id: 'gallery', title: 'Photos', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Windows_11_Photos_icon.svg' },
    { id: 'terminal', title: 'Terminal', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Windows_Terminal_logo.svg' },
    { id: 'calculator', title: 'Calc', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Windows_10_Calculator_icon.svg' },
    { id: 'notepad', title: 'Notepad', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Windows_Notepad_Icon.svg' },
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
        <input type="text" placeholder="Rechercher des applications et fichiers" />
      </div>

      <div className="start-section">
        <h3>Applications épinglées</h3>
        <div className="app-grid">
          {apps.map(app => (
            <button key={app.id} className="app-btn" onClick={() => handleAppLaunch(app.id, app.title, app.icon)}>
              <div className="app-icon">
                <img src={app.icon} style={{ width: '32px', height: '32px' }} alt={app.title} />
              </div>
              <span className="app-title">{app.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="start-footer">
        <div className="user-info">
          <div className="user-avatar">AD</div>
          <span>Administrateur</span>
        </div>
        <button className="power-btn" onClick={logout} title="Déconnexion">
          <Power size={18} />
        </button>
      </div>
    </motion.div>
  );
}
