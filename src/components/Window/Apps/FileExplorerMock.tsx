import { useState } from 'react';
import { useOSStore } from '../../../store/useOSStore';
import { Folder, File, HardDrive, LayoutGrid, List, Plus, Trash2 } from 'lucide-react';

export default function FileExplorerMock() {
  const { fs, createItem, deleteItem, openWindow } = useOSStore();
  const [currentPath, setCurrentPath] = useState<string | null>(null); // null means root
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const currentFiles = fs.filter(item => item.parentId === currentPath);

  const handleCreateFile = () => {
    const name = prompt('File name:', 'New Text Document.txt');
    if (name) createItem({ name, type: 'file', parentId: currentPath, content: '' });
  };

  const handleCreateFolder = () => {
    const name = prompt('Folder name:', 'New Folder');
    if (name) createItem({ name, type: 'folder', parentId: currentPath });
  };

  const handleOpen = (item: any) => {
    if (item.type === 'folder') {
      setCurrentPath(item.id);
    } else {
      openWindow('notepad', item.name, 'notepad', item.id);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--window-bg)', color: 'var(--text-color)' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', borderRight: '1px solid var(--glass-border)', padding: '16px', fontSize: '13px' }}>
        <div 
          onClick={() => setCurrentPath(null)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontWeight: 600, cursor: 'pointer' }}
        >
          <HardDrive size={16} /> This PC
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.8 }}>
          {fs.filter(i => i.type === 'folder' && i.parentId === null).map(folder => (
            <div 
              key={folder.id} 
              onClick={() => setCurrentPath(folder.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <Folder size={16} color="#4cc2ff" fill="#4cc2ff" /> {folder.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={handleCreateFolder} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
              <Plus size={14} /> New Folder
            </button>
            <button onClick={handleCreateFile} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
              <Plus size={14} /> New File
            </button>
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '10px'
        }}>
          {currentFiles.map(f => (
            <div 
              key={f.id}
              onDoubleClick={() => handleOpen(f)}
              style={{
                display: 'flex', 
                flexDirection: view === 'grid' ? 'column' : 'row',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.2s',
                position: 'relative'
              }}
              className="file-item"
            >
              {f.type === 'folder' ? <Folder size={view === 'grid' ? 48 : 20} color="#ffca28" fill="#ffca28" /> : <File size={view === 'grid' ? 48 : 20} color="#90a4ae" />}
              <div style={{ fontSize: '12px', textAlign: view === 'grid' ? 'center' : 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                {f.name}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteItem(f.id); }}
                className="delete-btn"
                style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(232, 17, 35, 0.8)', border: 'none', color: 'white', borderRadius: '4px', padding: '2px', display: 'none' }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
          {currentFiles.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.5, marginTop: '40px' }}>
              This folder is empty.
            </div>
          )}
        </div>
      </div>
      <style>{`
        .file-item:hover .delete-btn { display: block !important; }
        .file-item:hover { background: var(--hover-bg); }
      `}</style>
    </div>
  );
}
