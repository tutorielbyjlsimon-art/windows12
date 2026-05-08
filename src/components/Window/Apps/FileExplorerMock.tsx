import { useState } from 'react';
import { useOSStore } from '../../../store/useOSStore';
import { Folder, File, HardDrive, LayoutGrid, List, Plus, Trash2, ChevronLeft } from 'lucide-react';

export default function FileExplorerMock() {
  const { fs, createItem, deleteItem, openWindow } = useOSStore();
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const currentFiles = fs.filter(item => item.parentId === currentPath);
  const currentFolder = fs.find(i => i.id === currentPath);

  const handleCreateFile = () => {
    const name = prompt('Nom du fichier:', 'Nouveau Document.txt');
    if (name) createItem({ name, type: 'file', parentId: currentPath, content: '' });
  };

  const handleCreateFolder = () => {
    const name = prompt('Nom du dossier:', 'Nouveau Dossier');
    if (name) createItem({ name, type: 'folder', parentId: currentPath });
  };

  const handleOpen = (item: any) => {
    if (item.type === 'folder' || item.type === 'drive') {
      setCurrentPath(item.id);
    } else {
      openWindow('notepad', item.name, 'icons/notepad.png', item.id);
    }
  };

  const goBack = () => {
    if (currentFolder) {
      setCurrentPath(currentFolder.parentId);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: 'var(--window-bg)', color: 'var(--text-color)' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', borderRight: '1px solid var(--glass-border)', padding: '16px', fontSize: '13px', background: 'rgba(0,0,0,0.02)' }}>
        <div 
          onClick={() => setCurrentPath(null)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontWeight: 600, cursor: 'pointer' }}
        >
          <HardDrive size={18} color="var(--accent-color)" /> Ce PC
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {fs.filter(i => i.type === 'drive').map(drive => (
            <div 
              key={drive.id} 
              onClick={() => setCurrentPath(drive.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderRadius: '6px', cursor: 'pointer', background: currentPath === drive.id ? 'var(--hover-bg)' : 'transparent' }}
            >
              <HardDrive size={16} opacity={0.7} /> {drive.name}
            </div>
          ))}
          <div style={{ height: '1px', background: 'var(--glass-border)', margin: '8px 0' }} />
          {fs.filter(i => i.type === 'folder' && (i.parentId === 'drive-c' || i.parentId === null)).map(folder => (
            <div 
              key={folder.id} 
              onClick={() => setCurrentPath(folder.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderRadius: '6px', cursor: 'pointer', background: currentPath === folder.id ? 'var(--hover-bg)' : 'transparent' }}
            >
              <Folder size={16} color="#4cc2ff" fill="#4cc2ff" /> {folder.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={goBack} disabled={currentPath === null} style={{ background: 'none', border: 'none', color: 'inherit', cursor: currentPath === null ? 'default' : 'pointer', opacity: currentPath === null ? 0.3 : 1 }}>
              <ChevronLeft size={20} />
            </button>
            <div style={{ fontSize: '13px', fontWeight: 500 }}>
              {currentFolder ? currentFolder.name : 'Ce PC'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
             <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid var(--glass-border)', paddingRight: '12px' }}>
                <button onClick={handleCreateFolder} title="Nouveau Dossier" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><Plus size={18} /></button>
                <button onClick={handleCreateFile} title="Nouveau Fichier" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><Plus size={18} color="var(--accent-color)" /></button>
             </div>
             <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => setView('grid')} style={{ background: view === 'grid' ? 'var(--hover-bg)' : 'transparent', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: 'inherit' }}><LayoutGrid size={18} /></button>
                <button onClick={() => setView('list')} style={{ background: view === 'list' ? 'var(--hover-bg)' : 'transparent', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: 'inherit' }}><List size={18} /></button>
             </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          padding: '24px', flex: 1, overflowY: 'auto',
          display: view === 'grid' ? 'grid' : 'block',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '15px'
        }}>
          {currentFiles.length > 0 ? currentFiles.map(f => (
            <div 
              key={f.id}
              onDoubleClick={() => handleOpen(f)}
              style={{
                display: 'flex', 
                flexDirection: view === 'grid' ? 'column' : 'row',
                alignItems: 'center',
                gap: '12px',
                padding: '15px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              className="file-item"
            >
              {f.type === 'drive' ? <HardDrive size={view === 'grid' ? 48 : 20} color="var(--accent-color)" /> : 
               f.type === 'folder' ? <Folder size={view === 'grid' ? 48 : 20} color="#ffca28" fill="#ffca28" /> : 
               <File size={view === 'grid' ? 48 : 20} color="#90a4ae" />}
              <div style={{ fontSize: '12px', fontWeight: 500, textAlign: view === 'grid' ? 'center' : 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                {f.name}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteItem(f.id); }}
                className="delete-btn"
                style={{ position: 'absolute', top: '8px', right: '8px', background: '#e81123', border: 'none', color: 'white', borderRadius: '6px', padding: '4px', display: 'none', boxShadow: '0 4px 12px rgba(232, 17, 35, 0.3)' }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.4, marginTop: '60px' }}>
              <Folder size={64} style={{ marginBottom: '16px', opacity: 0.2 }} />
              <div>Ce dossier est vide</div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .file-item:hover { background: var(--hover-bg); transform: translateY(-2px); }
        .file-item:hover .delete-btn { display: block !important; }
      `}</style>
    </div>
  );
}
