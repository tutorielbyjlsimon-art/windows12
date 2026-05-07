import { useState } from 'react';
import { Folder, File, ChevronRight, HardDrive, LayoutGrid, List } from 'lucide-react';

export default function FileExplorerMock() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const files = [
    { name: 'Documents', type: 'folder' },
    { name: 'Downloads', type: 'folder' },
    { name: 'Pictures', type: 'folder' },
    { name: 'Music', type: 'folder' },
    { name: 'Videos', type: 'folder' },
    { name: 'Project_Design.pdf', type: 'file' },
    { name: 'Notes.txt', type: 'file' },
    { name: 'Budget_2026.xlsx', type: 'file' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--window-bg)', color: 'var(--text-color)' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', borderRight: '1px solid var(--glass-border)', padding: '16px', fontSize: '13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: 600 }}>
          <HardDrive size={16} /> This PC
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Folder size={16} color="#4cc2ff" fill="#4cc2ff" /> Desktop</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Folder size={16} color="#4cc2ff" fill="#4cc2ff" /> Documents</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Folder size={16} color="#4cc2ff" fill="#4cc2ff" /> Downloads</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><HardDrive size={16} /> Windows (C:)</div>
        </div>
      </div>

      {/* Main Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
            <span style={{ opacity: 0.6 }}>This PC</span> <ChevronRight size={14} opacity={0.5} /> <span>Documents</span>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => setView('grid')} style={{ background: view === 'grid' ? 'var(--hover-bg)' : 'transparent', border: 'none', padding: '4px', borderRadius: '4px', cursor: 'pointer', color: 'inherit' }}><LayoutGrid size={16} /></button>
            <button onClick={() => setView('list')} style={{ background: view === 'list' ? 'var(--hover-bg)' : 'transparent', border: 'none', padding: '4px', borderRadius: '4px', cursor: 'pointer', color: 'inherit' }}><List size={16} /></button>
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          padding: '24px', flex: 1, overflowY: 'auto',
          display: view === 'grid' ? 'grid' : 'block',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '20px'
        }}>
          {files.map(f => (
            <div 
              key={f.name}
              style={{
                display: 'flex', 
                flexDirection: view === 'grid' ? 'column' : 'row',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-bg)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              {f.type === 'folder' ? <Folder size={view === 'grid' ? 48 : 20} color="#ffca28" fill="#ffca28" /> : <File size={view === 'grid' ? 48 : 20} color="#90a4ae" />}
              <div style={{ fontSize: '12px', textAlign: view === 'grid' ? 'center' : 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                {f.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
