import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, ShieldCheck, ExternalLink } from 'lucide-react';

export default function BrowserMock() {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [inputUrl, setInputUrl] = useState('https://www.wikipedia.org');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl.trim();
    if (!target.startsWith('http')) target = 'https://' + target;
    setUrl(target);
    setInputUrl(target);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'white' }}>
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', 
        borderBottom: '1px solid #ddd', background: '#f9f9f9'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#555' }}><ArrowLeft size={18} /></button>
          <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ccc' }}><ArrowRight size={18} /></button>
          <button onClick={() => setUrl(url)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#555' }}><RotateCw size={18} /></button>
        </div>
        
        <form onSubmit={handleSearch} style={{ 
          flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
          background: 'white', padding: '6px 15px', borderRadius: '20px',
          border: '1px solid #ccc'
        }}>
          <ShieldCheck size={14} color="#00cc6a" />
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', flex: 1, color: '#333', fontSize: '13px' }} 
          />
        </form>

        <button onClick={() => window.open(url, '_blank')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#555' }} title="Ouvrir dans un nouvel onglet">
          <ExternalLink size={18} />
        </button>
      </div>
      
      <div style={{ flex: 1, position: 'relative', background: 'white' }}>
        <iframe 
          src={url} 
          title="Edge Browser Content"
          style={{ width: '100%', height: '100%', border: 'none' }}
          sandbox="allow-scripts allow-same-origin"
        />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '8px 15px', borderRadius: '20px', fontSize: '11px', pointerEvents: 'none' }}>
          Certains sites peuvent bloquer l'affichage en iframe pour des raisons de sécurité.
        </div>
      </div>
    </div>
  );
}
