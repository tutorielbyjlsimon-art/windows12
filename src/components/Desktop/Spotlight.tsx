import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../../store/useOSStore';
import { Search, FileText, Sparkles, Send } from 'lucide-react';

export default function Spotlight() {
  const { fs, openWindow, executeSystemAction } = useOSStore();
  const [query, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const lang = navigator.language.startsWith('fr') ? 'fr' : 'en';

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 's' && e.metaKey) { e.preventDefault(); setIsOpen(prev => !prev); }
      if (e.key === 'Escape') { setIsOpen(false); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (isOpen && chat.length === 0) {
      const welcome = lang === 'fr' 
        ? "Hey ! Salut, bienvenue dans Windows 12. Je suis votre assistant intelligent."
        : "Hey! Hi, welcome to Windows 12. I am your intelligent assistant.";
      setChat([{ role: 'ai', content: welcome }]);
    }
  }, [isOpen, lang, chat.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const apps = [
    { id: 'browser', title: 'Edge', icon: 'icons/edge.png' },
    { id: 'explorer', title: 'Files', icon: 'icons/explorer.png' },
    { id: 'settings', title: 'Settings', icon: 'icons/settings.png' },
    { id: 'weather', title: 'Weather', icon: 'icons/weather.png' },
    { id: 'gallery', title: 'Photos', icon: 'icons/photos.png' },
    { id: 'terminal', title: 'Terminal', icon: 'icons/terminal.png' },
  ];

  const processAICommand = (input: string) => {
    const cmd = input.toLowerCase();
    
    if (cmd.startsWith('/theme ')) {
      const theme = cmd.split(' ')[1];
      executeSystemAction('set_theme', theme);
      return lang === 'fr' ? `Thème changé en ${theme}.` : `Theme changed to ${theme}.`;
    }
    if (cmd.startsWith('/wallpaper ')) {
      const url = input.split(' ')[1];
      executeSystemAction('set_wallpaper', url);
      return lang === 'fr' ? "Fond d'écran mis à jour." : "Wallpaper updated.";
    }
    if (cmd.startsWith('/lock')) {
      executeSystemAction('lock');
      return lang === 'fr' ? "Système verrouillé." : "System locked.";
    }
    if (cmd.startsWith('/open ')) {
      const appName = cmd.split(' ')[1];
      const app = apps.find(a => a.title.toLowerCase() === appName);
      if (app) {
        executeSystemAction('open_app', app);
        return lang === 'fr' ? `Ouverture de ${app.title}...` : `Opening ${app.title}...`;
      }
      return lang === 'fr' ? `Application "${appName}" non trouvée.` : `App "${appName}" not found.`;
    }

    if (cmd.includes('sombre') || cmd.includes('dark')) {
      executeSystemAction('set_theme', 'dark');
      return lang === 'fr' ? "Je passe en mode sombre pour vous." : "Switching to dark mode for you.";
    }
    if (cmd.includes('clair') || cmd.includes('light')) {
      executeSystemAction('set_theme', 'light');
      return lang === 'fr' ? "Bien sûr, voici le mode clair." : "Sure, here is the light mode.";
    }
    if (cmd.includes('verrouille') || cmd.includes('lock')) {
      executeSystemAction('lock');
      return lang === 'fr' ? "Je verrouille votre session." : "Locking your session.";
    }

    return lang === 'fr' 
      ? "Je peux changer le thème, verrouiller le PC, ouvrir des apps ou rechercher vos fichiers. Essayez '/theme light' ou '/lock'."
      : "I can change the theme, lock the PC, open apps or search your files. Try '/theme light' or '/lock'.";
  };

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const userMsg = query;
    setChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsAiLoading(true);

    setTimeout(() => {
      const aiResponse = processAICommand(userMsg);
      setChat(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsAiLoading(false);
    }, 800);
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

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 30000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }} onClick={() => setIsOpen(false)}>
      <motion.div 
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        className="glass"
        style={{ width: '800px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', flexDirection: 'column' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--glass-border)' }}>
          <Sparkles size={24} color="var(--accent-color)" />
          <input 
            autoFocus 
            placeholder={lang === 'fr' ? "Demandez à Copilot..." : "Ask Copilot..."}
            value={query}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, background: 'none', border: 'none', color: 'inherit', fontSize: '18px', outline: 'none' }}
          />
          <button onClick={handleSend} style={{ background: 'var(--accent-color)', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Send size={16} /> {lang === 'fr' ? 'Envoyer' : 'Send'}
          </button>
        </div>

        <div style={{ display: 'flex', height: '500px' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', borderRight: '1px solid var(--glass-border)' }}>
            {query ? (
              <>
                <h3 style={{ fontSize: '11px', opacity: 0.5, marginBottom: '15px', textTransform: 'uppercase' }}>{lang === 'fr' ? 'Résultats' : 'Results'}</h3>
                {results.map((res: any, i) => (
                  <div key={i} onClick={() => openWindow(res.id, res.title, res.icon)} style={{ padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} className="search-result-item">
                     {res.type === 'app' ? <img src={res.icon} style={{ width: '32px', height: '32px' }} alt="" /> : <FileText size={32} opacity={0.7} />}
                     <div>
                       <div style={{ fontSize: '14px', fontWeight: 500 }}>{res.title}</div>
                       <div style={{ fontSize: '11px', opacity: 0.5 }}>{res.type === 'app' ? 'Application' : 'Fichier'}</div>
                     </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>
                 <Search size={48} style={{ marginBottom: '20px', opacity: 0.2 }} />
                 <p>{lang === 'fr' ? 'Recherche ou IA' : 'Search or AI'}</p>
              </div>
            )}
          </div>

          <div style={{ width: '350px', background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '15px 20px', borderBottom: '1px solid var(--glass-border)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Sparkles size={16} color="var(--accent-color)" /> Copilot Chat
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {chat.map((msg, i) => (
                 <div key={i} style={{ 
                   alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                   maxWidth: '90%',
                   padding: '10px 14px',
                   borderRadius: '12px',
                   fontSize: '13px',
                   background: msg.role === 'user' ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)',
                   color: 'white',
                   lineHeight: '1.4'
                 }}>
                   {msg.content}
                 </div>
               ))}
               {isAiLoading && (
                 <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '12px' }}>
                   <div className="dot-flashing" />
                 </div>
               )}
               <div ref={chatEndRef} />
            </div>
          </div>
        </div>
      </motion.div>
      <style>{`
        .search-result-item:hover { background: var(--hover-bg); }
        .dot-flashing { position: relative; width: 6px; height: 6px; border-radius: 5px; background-color: var(--accent-color); color: var(--accent-color); animation: dot-flashing 1s infinite linear alternate; animation-delay: .5s; }
        .dot-flashing::before, .dot-flashing::after { content: ''; display: inline-block; position: absolute; top: 0; width: 6px; height: 6px; border-radius: 5px; background-color: var(--accent-color); color: var(--accent-color); animation: dot-flashing 1s infinite linear alternate; }
        .dot-flashing::before { left: -12px; animation-delay: 0s; }
        .dot-flashing::after { left: 12px; animation-delay: 1s; }
        @keyframes dot-flashing { 0% { background-color: var(--accent-color); } 50%, 100% { background-color: rgba(255,255,255,0.2); } }
      `}</style>
    </div>
  );
}
