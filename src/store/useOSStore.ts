import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

export interface VFSItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  parentId: string | null;
  lastModified: number;
}

export interface AppWindow {
  id: string;
  title: string;
  icon?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x?: number;
  y?: number;
  fileId?: string; // If opening a specific file
}

interface OSState {
  isBooting: boolean;
  isLoggedIn: boolean;
  theme: Theme;
  wallpaper: string;
  accentColor: string;
  transparency: number;
  showVirtualCursor: boolean;
  isMobile: boolean;
  windows: AppWindow[];
  activeWindowId: string | null;
  
  // Virtual File System
  fs: VFSItem[];
  
  // Actions
  completeBoot: () => void;
  login: () => void;
  logout: () => void;
  toggleTheme: () => void;
  setWallpaper: (url: string) => void;
  setAccentColor: (color: string) => void;
  setTransparency: (val: number) => void;
  toggleVirtualCursor: () => void;
  setIsMobile: (val: boolean) => void;
  openWindow: (id: string, title: string, icon?: string, fileId?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;

  // FS Actions
  createItem: (item: Omit<VFSItem, 'id' | 'lastModified'>) => void;
  deleteItem: (id: string) => void;
  updateFileContent: (id: string, content: string) => void;
  renameItem: (id: string, newName: string) => void;
}

const DEFAULT_FS: VFSItem[] = [
  { id: 'root-docs', name: 'Documents', type: 'folder', parentId: null, lastModified: Date.now() },
  { id: 'root-pics', name: 'Pictures', type: 'folder', parentId: null, lastModified: Date.now() },
  { id: 'root-down', name: 'Downloads', type: 'folder', parentId: null, lastModified: Date.now() },
  { id: 'welcome-txt', name: 'Welcome.txt', type: 'file', content: 'Welcome to Windows 12!\n\nThis is a real virtual file system.', parentId: 'root-docs', lastModified: Date.now() },
];

export const useOSStore = create<OSState>()(
  persist(
    (set) => ({
      isBooting: true,
      isLoggedIn: false,
      theme: 'dark',
      wallpaper: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2000',
      accentColor: '#0078d4',
      transparency: 0.8,
      showVirtualCursor: false,
      isMobile: false,
      windows: [],
      activeWindowId: null,
      fs: DEFAULT_FS,

      completeBoot: () => set({ isBooting: false }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      toggleTheme: () => set((state) => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        const nextWallpaper = nextTheme === 'light' 
          ? 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000'
          : 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2000';
        return { theme: nextTheme, wallpaper: nextWallpaper };
      }),
      setWallpaper: (url) => set({ wallpaper: url }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setTransparency: (transparency) => set({ transparency }),
      toggleVirtualCursor: () => set((state) => ({ showVirtualCursor: !state.showVirtualCursor })),
      setIsMobile: (isMobile) => set({ isMobile }),
      
      openWindow: (id, title, icon, fileId) => set((state) => {
        const windowId = fileId ? `${id}-${fileId}` : id;
        const existing = state.windows.find(w => w.id === windowId);
        const maxZ = Math.max(0, ...state.windows.map(w => w.zIndex));
        
        if (existing) {
          return {
            windows: state.windows.map(w => 
              w.id === windowId ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w
            ),
            activeWindowId: windowId
          };
        }
        
        return {
          windows: [...state.windows, {
            id: windowId,
            title,
            icon,
            fileId,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: maxZ + 1,
            x: 100 + (state.windows.length * 20),
            y: 100 + (state.windows.length * 20)
          }],
          activeWindowId: windowId
        };
      }),

      closeWindow: (id) => set((state) => ({
        windows: state.windows.filter(w => w.id !== id),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
      })),

      minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => 
          w.id === id ? { ...w, isMinimized: true } : w
        ),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
      })),

      maximizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => 
          w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
        )
      })),

      focusWindow: (id) => set((state) => {
        const win = state.windows.find(w => w.id === id);
        if (!win) return state;
        const maxZ = Math.max(0, ...state.windows.map(w => w.zIndex));
        return {
          windows: state.windows.map(w => 
            w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
          ),
          activeWindowId: id
        };
      }),

      updateWindowPosition: (id, x, y) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, x, y } : w)
      })),

      // FS Actions
      createItem: (item) => set((state) => ({
        fs: [...state.fs, { ...item, id: Math.random().toString(36).substr(2, 9), lastModified: Date.now() }]
      })),

      deleteItem: (id) => set((state) => ({
        fs: state.fs.filter(i => i.id !== id && i.parentId !== id) // Delete item and children
      })),

      updateFileContent: (id, content) => set((state) => ({
        fs: state.fs.map(i => i.id === id ? { ...i, content, lastModified: Date.now() } : i)
      })),

      renameItem: (id, name) => set((state) => ({
        fs: state.fs.map(i => i.id === id ? { ...i, name, lastModified: Date.now() } : i)
      }))
    }),
    {
      name: 'windows12-storage-v3',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        theme: state.theme, 
        wallpaper: state.wallpaper,
        accentColor: state.accentColor,
        transparency: state.transparency,
        isLoggedIn: state.isLoggedIn,
        fs: state.fs
      }),
    }
  )
);
