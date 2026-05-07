import { useState } from 'react';
import { Image as ImageIcon, Play, SkipBack, PlayCircle, SkipForward } from 'lucide-react';

export default function GalleryMock() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const photos = [
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-color)' }}>
      {/* App Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ImageIcon size={20} color="var(--accent-color)" /> Photos
        </h2>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', opacity: 0.7 }}>
          <span style={{ cursor: 'pointer' }}>Collection</span>
          <span style={{ cursor: 'pointer' }}>Albums</span>
          <span style={{ cursor: 'pointer' }}>Video Editor</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {selectedImg ? (
          <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={selectedImg} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} />
            <button 
              onClick={() => setSelectedImg(null)}
              style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
            >
              Back to Gallery
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: '14px', marginBottom: '20px', opacity: 0.6 }}>Recent Photos</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {photos.map((url, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedImg(url)}
                  style={{ position: 'relative', aspectRatio: '16/10', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img src={url} alt="Gallery item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '14px', margin: '40px 0 20px', opacity: 0.6 }}>Music Player (Simulation)</h3>
            <div className="glass" style={{ padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '24px' }}>
               <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Play size={32} color="white" fill="white" />
               </div>
               <div style={{ flex: 1 }}>
                 <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>Midnight City</h4>
                 <p style={{ fontSize: '12px', opacity: 0.6 }}>M83 • Hurry Up, We're Dreaming</p>
                 <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <span style={{ fontSize: '10px', opacity: 0.5 }}>1:24</span>
                   <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                     <div style={{ width: '35%', height: '100%', background: 'var(--accent-color)', borderRadius: '2px' }} />
                   </div>
                   <span style={{ fontSize: '10px', opacity: 0.5 }}>4:03</span>
                 </div>
               </div>
               <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                 <SkipBack size={20} style={{ opacity: 0.7, cursor: 'pointer' }} />
                 <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <PlayCircle size={24} color="white" />
                 </div>
                 <SkipForward size={20} style={{ opacity: 0.7, cursor: 'pointer' }} />
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
