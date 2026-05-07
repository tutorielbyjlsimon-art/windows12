import { useState } from 'react';
import { Image as ImageIcon, PlayCircle } from 'lucide-react';

export default function GalleryMock() {
  const [selectedMedia, setSelectedMedia] = useState<{ url: string, type: 'photo' | 'video' } | null>(null);
  const [tab, setTab] = useState<'photos' | 'videos'>('photos');

  const photos = [
    'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200',
  ];

  const videos = [
    { title: 'Nature Cinematic', url: 'https://cdn.pixabay.com/video/2023/10/24/186358-877771764_tiny.mp4', thumb: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400' },
    { title: 'Cyber City', url: 'https://cdn.pixabay.com/video/2020/09/24/151934-802613764_tiny.mp4', thumb: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&q=80&w=400' },
    { title: 'Ocean Waves', url: 'https://cdn.pixabay.com/video/2021/04/12/70868-537446544_tiny.mp4', thumb: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-color)' }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ImageIcon size={20} color="var(--accent-color)" /> Media Gallery
        </h2>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', opacity: 0.7 }}>
          <span onClick={() => { setTab('photos'); setSelectedMedia(null); }} style={{ cursor: 'pointer', fontWeight: tab === 'photos' ? 600 : 400, color: tab === 'photos' ? 'var(--accent-color)' : 'inherit' }}>Photos</span>
          <span onClick={() => { setTab('videos'); setSelectedMedia(null); }} style={{ cursor: 'pointer', fontWeight: tab === 'videos' ? 600 : 400, color: tab === 'videos' ? 'var(--accent-color)' : 'inherit' }}>Vidéos</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {selectedMedia ? (
          <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', borderRadius: '12px' }}>
            {selectedMedia.type === 'photo' ? (
              <img src={selectedMedia.url} alt="Full" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            ) : (
              <video src={selectedMedia.url} controls autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }} />
            )}
            <button 
              onClick={() => setSelectedMedia(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
            >
              Fermer
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {tab === 'photos' ? photos.map((url, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedMedia({ url, type: 'photo' })}
                style={{ position: 'relative', aspectRatio: '16/10', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={url} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )) : videos.map((v, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedMedia({ url: v.url, type: 'video' })}
                style={{ position: 'relative', aspectRatio: '16/10', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={v.thumb} alt="Video thumb" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlayCircle size={40} color="white" />
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: 'white', fontSize: '11px' }}>
                  {v.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
