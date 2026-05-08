import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { Search, FileText, Sparkles } from 'lucide-react';

export default function Spotlight() {
  const { fs, openWindow } = useOSStore();
  const [query, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 's' && e.metaKey) { e.preventDefault(); setIsOpen(prev => !prev); }
      if (e.key === 'Escape') { setIsOpen(false); setAiResponse(''); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const apps = [
    { id: 'browser', title: 'Edge', icon: '/icons/edge.png' },
    { id: 'explorer', title: 'Files', icon: '/icons/explorer.png' },
    { id: 'settings', title: 'Settings', icon: '/icons/settings.png' },
    { id: 'weather', title: 'Weather', icon: '/icons/weather.png' },
    { id: 'gallery', title: 'Photos', icon: '/icons/photos.png' },
    { id: 'terminal', title: 'Terminal', icon: '/icons/terminal.png' },
  ];

  const handleAiAsk = async () => {
    if (!query) return;
    setIsAiLoading(true);
    setTimeout(() => {
      setAiResponse(`En tant que Copilot Windows 12, j'ai analysé votre requête : "${query}". Je peux vous aider à organiser vos fichiers sur le disque (C:) ou changer votre fond d'écran dans les paramètres.`);
      setIsAiLoading(false);
    }, 1500);
  };

  const results = useMemo(() => {
    if (!query) return [];
    const filteredApps = apps.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));
    const filteredFiles = fs.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
    return [
      ...filteredApps.map(a => ({ ...a, type: 'app' as const })), 
      ...filteredFiles.map(f => ({ id: f.id, title: f.name, type: 'file' as const, name: f.name }))
    ];
  }, [query, fs]);

  const handleLaunch = (item: any) => {
    if (item.type === 'app') openWindow(item.id, item.title, item.icon);
    else if (item.type === 'file') {
       openWindow('notepad', item.title, '/icons/notepad.png', item.id);
    }
    setIsOpen(false);
    setInput('');
    setAiResponse('');
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 30000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }} onClick={() => setIsOpen(false)}>
      <motion.div 
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="glass"
        style={{ width: '700px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--glass-border)' }}>
          <Search size={24} color="var(--accent-color)" />
          <input 
            autoFocus 
            placeholder="Rechercher ou demander à l'IA..."
            value={query}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
            style={{ flex: 1, background: 'none', border: 'none', color: 'inherit', fontSize: '20px', outline: 'none' }}
          />
          <button onClick={handleAiAsk} style={{ background: 'var(--accent-color)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}>
            <Sparkles size={16} /> Copilot
          </button>
        </div>

        <div style={{ display: 'flex', height: '450px' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', borderRight: '1px solid var(--glass-border)' }}>
            <h3 style={{ fontSize: '12px', opacity: 0.5, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Résultats</h3>
            {results.map((res: any, i) => (
              <div key={i} onClick={() => handleLaunch(res)} style={{ padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} className="search-result-item">
                 {res.type === 'app' ? <img src={res.icon} style={{ width: '32px', height: '32px' }} alt={res.title} /> : <FileText size={32} opacity={0.7} />}
                 <div>
                   <div style={{ fontSize: '14px', fontWeight: 500 }}>{res.title}</div>
                   <div style={{ fontSize: '11px', opacity: 0.5 }}>{res.type === 'app' ? 'Application' : 'Fichier'}</div>
                 </div>
              </div>
            ))}
          </div>

          <div style={{ width: '280px', background: 'rgba(255,255,255,0.02)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-color)', fontWeight: 600 }}>
               <Sparkles size={18} /> Copilot
            </div>
            {isAiLoading ? (
               <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <div className="spinner" style={{ width: '30px', height: '30px', border: '3px solid var(--accent-color)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
               </div>
            ) : aiResponse ? (
               <div style={{ fontSize: '13px', lineHeight: '1.6', opacity: 0.9 }}>
                 {aiResponse}
               </div>
            ) : (
               <div style={{ fontSize: '13px', opacity: 0.5, fontStyle: 'italic' }}>
                 Posez-moi une question sur vos fichiers ou vos réglages.
               </div>
            )}
          </div>
        </div>
      </motion.div>
      <style>{`
        .search-result-item:hover { background: var(--hover-bg); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
