import { useState } from 'react';
import { Search, ArrowLeft, ArrowRight, RotateCw, Home } from 'lucide-react';

export default function BrowserMock() {
  const [url, setUrl] = useState('https://react.dev');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', 
        borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-bg)'
      }}>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-color)' }}><ArrowLeft size={18} /></button>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-color)' }}><ArrowRight size={18} opacity={0.3}/></button>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-color)' }}><RotateCw size={18} /></button>
        <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-color)' }}><Home size={18} /></button>
        
        <div style={{ 
          flex: 1, display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--hover-bg)', padding: '6px 12px', borderRadius: '16px'
        }}>
          <Search size={16} opacity={0.6}/>
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', flex: 1, color: 'var(--text-color)' }} 
          />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--window-bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Mock Browser</h2>
          <p>Displaying simulated web content for: {url}</p>
        </div>
      </div>
    </div>
  );
}
