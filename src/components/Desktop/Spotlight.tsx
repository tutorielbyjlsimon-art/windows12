import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { Search, Globe, Settings, Cloud, Terminal, Calculator, FileText, Folder, Image as ImageIcon } from 'lucide-react';

export default function Spotlight() {
  const { fs, openWindow } = useOSStore();
  const [query, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 's' && e.metaKey) { e.preventDefault(); setIsOpen(prev => !prev); }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const apps = [
    { id: 'browser', title: 'Edge', icon: <Globe size={24} color="#4285F4" /> },
    { id: 'explorer', title: 'Files', icon: <Folder size={24} color="#ffca28" /> },
    { id: 'settings', title: 'Settings', icon: <Settings size={24} /> },
    { id: 'weather', title: 'Weather', icon: <Cloud size={24} color="#00a8ff" /> },
    { id: 'gallery', title: 'Photos', icon: <ImageIcon size={24} color="#e81123" /> },
    { id: 'terminal', title: 'Terminal', icon: <Terminal size={24} /> },
    { id: 'calculator', title: 'Calculator', icon: <Calculator size={24} color="#f0932b" /> },
    { id: 'notepad', title: 'Notepad', icon: <FileText size={24} color="#48dbfb" /> },
  ];

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
    if (item.type === 'app') openWindow(item.id, item.title);
    else if (item.type === 'file') {
       openWindow('notepad', item.title, 'notepad', item.id);
    }
    setIsOpen(false);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 30000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(5px)' }} onClick={() => setIsOpen(false)}>
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass"
        style={{ width: '600px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid var(--glass-border)' }}>
          <Search size={24} opacity={0.6} />
          <input 
            autoFocus 
            placeholder="Rechercher des applications, des fichiers..."
            value={query}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, background: 'none', border: 'none', color: 'inherit', fontSize: '18px', outline: 'none' }}
          />
        </div>
        <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
          {results.length > 0 ? results.map((res: any, i) => (
            <div 
              key={i} 
              onClick={() => handleLaunch(res)}
              style={{ padding: '12px 15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-bg)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
               {res.type === 'app' ? res.icon : <FileText size={24} opacity={0.7} />}
               <div>
                 <div style={{ fontSize: '14px', fontWeight: 500 }}>{res.title}</div>
                 <div style={{ fontSize: '11px', opacity: 0.5 }}>{res.type === 'app' ? 'Système Application' : 'Fichier local'}</div>
               </div>
            </div>
          )) : (
            <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>
              {query ? 'Aucun résultat trouvé' : 'Commencez à taper pour rechercher...'}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
