import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { Search, Power } from 'lucide-react';
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
    { id: 'browser', title: 'Edge', icon: 'icons/edge.png' },
    { id: 'explorer', title: 'Files', icon: 'icons/explorer.png' },
    { id: 'settings', title: 'Settings', icon: 'icons/settings.png' },
    { id: 'weather', title: 'Weather', icon: 'icons/weather.png' },
    { id: 'gallery', title: 'Photos', icon: 'icons/photos.png' },
    { id: 'terminal', title: 'Terminal', icon: 'icons/terminal.png' },
    { id: 'calculator', title: 'Calc', icon: 'icons/calculator.png' },
    { id: 'notepad', title: 'Notepad', icon: 'icons/notepad.png' },
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
