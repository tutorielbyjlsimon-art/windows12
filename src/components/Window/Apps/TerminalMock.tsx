import { useState, useRef, useEffect } from 'react';

export default function TerminalMock() {
  const [history, setHistory] = useState<string[]>(['Windows PowerShell', 'Copyright (C) Microsoft Corporation. All rights reserved.', '', 'PS C:\\Users\\Admin> ']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let response = '';

    if (cmd === 'help') response = 'Available commands: help, cls, dir, date, echo, whoami';
    else if (cmd === 'cls') {
      setHistory(['PS C:\\Users\\Admin> ']);
      setInput('');
      return;
    }
    else if (cmd === 'dir') response = '08/05/2026  10:00 AM    <DIR>          Desktop\n08/05/2026  10:00 AM    <DIR>          Documents\n08/05/2026  10:00 AM    <DIR>          Downloads';
    else if (cmd === 'date') response = new Date().toLocaleString();
    else if (cmd === 'whoami') response = 'windows12\\admin';
    else if (cmd.startsWith('echo ')) response = cmd.substring(5);
    else if (cmd !== '') response = `'${cmd}' is not recognized as an internal or external command.`;

    setHistory(prev => [...prev.slice(0, -1), `PS C:\\Users\\Admin> ${input}`, response, 'PS C:\\Users\\Admin> '].filter(line => line !== ''));
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div style={{ 
      background: '#0c0c0c', color: '#cccccc', fontFamily: 'Consolas, monospace', 
      padding: '16px', height: '100%', overflowY: 'auto', fontSize: '14px', lineHeight: '1.5'
    }}>
      {history.map((line, i) => (
        <div key={i} style={{ whiteSpace: 'pre-wrap' }}>{line}</div>
      ))}
      <form onSubmit={handleCommand} style={{ display: 'flex' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          style={{ 
            background: 'none', border: 'none', color: 'inherit', font: 'inherit',
            outline: 'none', flex: 1, padding: 0
          }}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
