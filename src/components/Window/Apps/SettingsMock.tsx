import { useOSStore } from '../../../store/useOSStore';
import { Monitor, Palette, Info, ShieldCheck } from 'lucide-react';

export default function SettingsMock() {
  const { theme, toggleTheme, wallpaper, setWallpaper } = useOSStore();

  const wallpapers = [
    { name: 'Abstract Purple', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
    { name: 'Modern Blue', url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop' },
    { name: 'Mountain Lake', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop' },
    { name: 'Cyberpunk City', url: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=2670&auto=format&fit=crop' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', color: 'var(--text-color)' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', background: 'rgba(255,255,255,0.05)', borderRight: '1px solid var(--glass-border)', padding: '20px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '24px' }}>Settings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px', background: 'var(--hover-bg)', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
            <Palette size={18} /> Personalization
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px', background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', opacity: 0.7 }}>
            <Monitor size={18} /> System
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px', background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', opacity: 0.7 }}>
            <ShieldCheck size={18} /> Privacy & Security
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px', background: 'transparent', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', opacity: 0.7 }}>
            <Info size={18} /> About
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '32px' }}>Personalization</h1>
        
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px', opacity: 0.8 }}>Theme</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <div>
              <p style={{ fontWeight: 500 }}>System Theme</p>
              <p style={{ fontSize: '13px', opacity: 0.6 }}>Current: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
            <button 
              onClick={toggleTheme}
              style={{
                padding: '8px 24px', background: 'var(--accent-color)', color: 'white',
                border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500,
                boxShadow: '0 4px 12px rgba(0, 120, 212, 0.3)'
              }}
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: '16px', marginBottom: '16px', opacity: 0.8 }}>Desktop Wallpaper</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {wallpapers.map(wp => (
              <div 
                key={wp.url}
                onClick={() => setWallpaper(wp.url)}
                style={{
                  cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', 
                  border: `3px solid ${wallpaper === wp.url ? 'var(--accent-color)' : 'transparent'}`,
                  transition: 'all 0.2s',
                  boxShadow: wallpaper === wp.url ? '0 8px 20px rgba(0, 120, 212, 0.2)' : 'none'
                }}
              >
                <div style={{ height: '120px', background: `url(${wp.url}) center/cover` }} />
                <div style={{ padding: '10px', fontSize: '13px', background: 'rgba(255,255,255,0.05)' }}>{wp.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
