import { useState, useEffect } from 'react';
import { useOSStore } from '../../../store/useOSStore';
import { Save, FileText } from 'lucide-react';

interface NotepadProps {
  fileId?: string;
}

export default function NotepadMock({ fileId }: NotepadProps) {
  const { fs, updateFileContent } = useOSStore();
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('Untitled');

  useEffect(() => {
    if (fileId) {
      const file = fs.find(i => i.id === fileId);
      if (file) {
        setContent(file.content || '');
        setFileName(file.name);
      }
    }
  }, [fileId, fs]);

  const handleSave = () => {
    if (fileId) {
      updateFileContent(fileId, content);
      alert('File saved successfully!');
    } else {
      alert('Please use the File Explorer to create a file first.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--window-bg)', color: 'var(--text-color)' }}>
      {/* Menu Bar */}
      <div style={{ padding: '4px 12px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', opacity: 0.8 }}>
          <span style={{ cursor: 'pointer' }}>File</span>
          <span style={{ cursor: 'pointer' }}>Edit</span>
          <span style={{ cursor: 'pointer' }}>View</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', opacity: 0.6 }}>
          <FileText size={12} /> {fileName}
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ padding: '8px 16px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={handleSave}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', 
            background: 'var(--accent-color)', color: 'white', border: 'none', 
            borderRadius: '6px', cursor: 'pointer', fontSize: '12px' 
          }}
        >
          <Save size={14} /> Save Changes
        </button>
      </div>

      {/* Editor */}
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          flex: 1,
          padding: '24px',
          background: 'none',
          border: 'none',
          color: 'inherit',
          fontFamily: 'Consolas, "Courier New", monospace',
          fontSize: '15px',
          outline: 'none',
          resize: 'none',
          lineHeight: '1.6'
        }}
        placeholder="Start typing..."
      />
      
      {/* Status Bar */}
      <div style={{ padding: '4px 16px', borderTop: '1px solid var(--glass-border)', fontSize: '11px', opacity: 0.5, textAlign: 'right' }}>
        UTF-8 | Ln 1, Col 1 | Windows (CRLF)
      </div>
    </div>
  );
}
