import { useOSStore } from '../../../store/useOSStore';
import { Monitor, Palette, ShieldCheck, MousePointer } from 'lucide-react';

export default function SettingsMock() {
  const { 
    theme, toggleTheme, wallpaper, setWallpaper, 
    accentColor, setAccentColor, transparency, setTransparency,
    showVirtualCursor, toggleVirtualCursor, isMobile
  } = useOSStore();

  const wallpapers = [
    { name: 'Abstract Purple', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
    { name: 'Modern Blue', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop' },
    { name: 'Mountain Lake', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop' },
    { name: 'Cyberpunk City', url: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=2670&auto=format&fit=crop' },
  ];

  const colors = ['#0078d4', '#4cc2ff', '#00cc6a', '#ffb900', '#d83b01', '#e81123', '#b4009e', '#5c2d91'];

  return (
    <div style={{ display: 'flex', height: '100%', color: 'var(--text-color)' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', background: 'rgba(255,255,255,0.05)', borderRight: '1px solid var(--glass-border)', padding: '20px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Settings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button className="settings-nav-btn active">
            <Palette size={18} /> Personalization
          </button>
          <button className="settings-nav-btn">
            <Monitor size={18} /> System
          </button>
          <button className="settings-nav-btn">
            <MousePointer size={18} /> Devices & Input
          </button>
          <button className="settings-nav-btn">
            <ShieldCheck size={18} /> Privacy
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '32px' }}>Personalization</h1>
        
        {/* Theme Section */}
        <section className="settings-section">
          <h3>System Theme</h3>
          <div className="settings-row">
            <div>
              <p style={{ fontWeight: 500 }}>Light/Dark Mode</p>
              <p style={{ fontSize: '12px', opacity: 0.6 }}>Current: {theme}</p>
            </div>
            <button onClick={toggleTheme} className="settings-btn">Switch Theme</button>
          </div>
        </section>

        {/* Accent Color Section */}
        <section className="settings-section">
          <h3>Accent Color</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            {colors.map(c => (
              <button 
                key={c}
                onClick={() => setAccentColor(c)}
                style={{
                  width: '32px', height: '32px', borderRadius: '50%', background: c,
                  border: accentColor === c ? '3px solid white' : 'none',
                  cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              />
            ))}
          </div>
        </section>

        {/* Transparency Section */}
        <section className="settings-section">
          <h3>Transparency Effect</h3>
          <div className="settings-row">
            <input 
              type="range" min="0.1" max="1" step="0.1" 
              value={transparency} 
              onChange={(e) => setTransparency(parseFloat(e.target.value))}
              style={{ flex: 1, marginRight: '20px' }}
            />
            <span>{Math.round(transparency * 100)}%</span>
          </div>
        </section>

        {/* Mobile / Mouse Section */}
        <section className="settings-section">
          <h3>Interaction</h3>
          <div className="settings-row">
            <div>
              <p style={{ fontWeight: 500 }}>Virtual Cursor</p>
              <p style={{ fontSize: '12px', opacity: 0.6 }}>{isMobile ? "Recommandé pour votre appareil mobile" : "Optionnel pour ordinateur"}</p>
            </div>
            <button onClick={toggleVirtualCursor} className="settings-btn">
              {showVirtualCursor ? "Désactiver" : "Activer"}
            </button>
          </div>
        </section>

        {/* Wallpaper Section */}
        <section className="settings-section">
          <h3>Wallpaper</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '10px' }}>
            {wallpapers.map(wp => (
              <div 
                key={wp.url}
                onClick={() => setWallpaper(wp.url)}
                className={`wallpaper-card ${wallpaper === wp.url ? 'active' : ''}`}
              >
                <div style={{ height: '100px', background: `url(${wp.url}) center/cover` }} />
                <div className="label">{wp.name}</div>
              </div>
            ))}
          </div>
        </section>

        <style>{`
          .settings-section { margin-bottom: 40px; }
          .settings-section h3 { font-size: 14px; margin-bottom: 16px; opacity: 0.7; text-transform: uppercase; }
          .settings-row { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: rgba(255,255,255,0.05); borderRadius: 12px; border: 1px solid var(--glass-border); }
          .settings-btn { padding: 8px 16px; background: var(--accent-color); color: white; border: none; borderRadius: 8px; cursor: pointer; font-weight: 500; }
          .settings-nav-btn { display: flex; alignItems: center; gap: 12px; padding: 12px; borderRadius: 8px; background: transparent; border: none; color: inherit; textAlign: left; cursor: pointer; width: 100%; opacity: 0.7; transition: all 0.2s; }
          .settings-nav-btn.active { background: var(--hover-bg); opacity: 1; font-weight: 600; }
          .wallpaper-card { cursor: pointer; borderRadius: 12px; overflow: hidden; border: 2px solid transparent; transition: all 0.2s; }
          .wallpaper-card.active { border-color: var(--accent-color); }
          .wallpaper-card .label { padding: 8px; font-size: 12px; background: rgba(255,255,255,0.05); }
        `}</style>
      </div>
    </div>
  );
}
