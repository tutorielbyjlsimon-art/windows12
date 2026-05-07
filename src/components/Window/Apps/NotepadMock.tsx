import { useState } from 'react';

export default function NotepadMock() {
  const [text, setText] = useState('Welcome to Notepad Windows 12 Edition.\n\nYou can type your notes here.\n\nEverything is stored in your local session.');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-color)' }}>
      <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '20px', fontSize: '12px', opacity: 0.8 }}>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
      </div>
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          padding: '24px',
          background: 'none',
          border: 'none',
          color: 'inherit',
          fontFamily: 'Consolas, monospace',
          fontSize: '14px',
          outline: 'none',
          resize: 'none',
          lineHeight: '1.6'
        }}
      />
    </div>
  );
}
