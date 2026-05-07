import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { Wifi, Bluetooth, Moon, Sun, BatteryMedium, Volume2, SunDim, Bell } from 'lucide-react';
import './ActionCenter.css';

export default function ActionCenter() {
  const { theme, toggleTheme, transparency, setTransparency } = useOSStore();
  const [wifiOn, setWifiOn] = useState(true);
  const [btOn, setBtOn] = useState(true);
  const [batterySaver, setBatterySaver] = useState(false);

  return (
    <motion.div 
      className="action-center glass"
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="ac-header">
        <span>Quick Settings</span>
        <SettingsIcon />
      </div>

      <div className="ac-grid">
        <button className={`ac-btn ${wifiOn ? 'active' : ''}`} onClick={() => setWifiOn(!wifiOn)}>
          <Wifi size={20} />
          <span style={{ fontSize: '11px' }}>WiFi</span>
        </button>
        <button className={`ac-btn ${btOn ? 'active' : ''}`} onClick={() => setBtOn(!btOn)}>
          <Bluetooth size={20} />
          <span style={{ fontSize: '11px' }}>Bluetooth</span>
        </button>
        <button className={`ac-btn ${batterySaver ? 'active' : ''}`} onClick={() => setBatterySaver(!batterySaver)}>
          <BatteryMedium size={20} />
          <span style={{ fontSize: '11px' }}>Battery Saver</span>
        </button>
        <button className="ac-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          <span style={{ fontSize: '11px' }}>Theme</span>
        </button>
      </div>

      <div className="ac-slider-group">
        <div className="ac-slider-row">
          <SunDim size={16} />
          <input type="range" min="0" max="100" defaultValue="75" />
        </div>
        <div className="ac-slider-row">
          <Volume2 size={16} />
          <input type="range" min="0" max="100" defaultValue="50" />
        </div>
        <div className="ac-slider-row">
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Glass</span>
          <input 
            type="range" min="0.1" max="1" step="0.1" 
            value={transparency} 
            onChange={(e) => setTransparency(parseFloat(e.target.value))} 
          />
        </div>
      </div>

      <div className="ac-header" style={{ marginTop: '10px' }}>
        <span>Notifications</span>
        <button style={{ background: 'none', border: 'none', color: 'inherit', fontSize: '12px', cursor: 'pointer', opacity: 0.7 }}>Clear all</button>
      </div>

      <div className="ac-notifications">
        <div className="ac-notif-card">
          <div className="ac-notif-icon"><Bell size={16} /></div>
          <div className="ac-notif-content">
            <h4>System Update</h4>
            <p>Windows 12 is up to date. No actions required at this time.</p>
          </div>
        </div>
        <div className="ac-notif-card">
          <div className="ac-notif-icon" style={{ background: '#00cc6a' }}><Wifi size={16} /></div>
          <div className="ac-notif-content">
            <h4>Network</h4>
            <p>Connected to a high-speed secure network.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SettingsIcon() {
  return (
    <button style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }} onClick={() => useOSStore.getState().openWindow('settings', 'Settings')}>
      <Settings size={18} />
    </button>
  );
}

import { Settings } from 'lucide-react';
