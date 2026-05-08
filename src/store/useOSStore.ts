import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

export interface VFSItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'drive';
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
  width?: number | string;
  height?: number | string;
  fileId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: number;
}

export interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  type: 'app' | 'file' | 'folder' | 'drive';
  appId?: string;
  fileId?: string;
}

interface OSState {
  isBooting: boolean;
  isLoggedIn: boolean;
  isLocked: boolean;
  theme: Theme;
  wallpaper: string;
  accentColor: string;
  transparency: number;
  showVirtualCursor: boolean;
  isMobile: boolean;
  isActionCenterOpen: boolean;
  isTaskViewOpen: boolean;
  windows: AppWindow[];
  activeWindowId: string | null;
  notifications: Notification[];
  fs: VFSItem[];
  desktopIcons: DesktopIcon[];
  
  // Actions
  completeBoot: () => void;
  login: () => void;
  logout: () => void;
  lock: () => void;
  unlock: () => void;
  toggleTheme: () => void;
  setWallpaper: (url: string) => void;
  setAccentColor: (color: string) => void;
  setTransparency: (val: number) => void;
  toggleVirtualCursor: () => void;
  setIsMobile: (val: boolean) => void;
  toggleActionCenter: () => void;
  closeActionCenter: () => void;
  toggleTaskView: () => void;
  openWindow: (id: string, title: string, icon?: string, fileId?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowDimensions: (id: string, x: number, y: number, width?: number | string, height?: number | string) => void;
  addNotification: (notif: Omit<Notification, 'id' | 'time'>) => void;
  removeNotification: (id: string) => void;
  
  // Desktop Icon Actions
  updateIconPosition: (id: string, x: number, y: number) => void;
  addDesktopIcon: (icon: Omit<DesktopIcon, 'x' | 'y'>) => void;

  // FS Actions
  createItem: (item: Omit<VFSItem, 'id' | 'lastModified'>) => string;
  deleteItem: (id: string) => void;
  updateFileContent: (id: string, content: string) => void;
  renameItem: (id: string, newName: string) => void;
}

const DEFAULT_FS: VFSItem[] = [
  { id: 'drive-c', name: 'Local Disk (C:)', type: 'drive', parentId: null, lastModified: Date.now() },
  { id: 'drive-d', name: 'Data (D:)', type: 'drive', parentId: null, lastModified: Date.now() },
  { id: 'root-docs', name: 'Documents', type: 'folder', parentId: 'drive-c', lastModified: Date.now() },
  { id: 'root-pics', name: 'Pictures', type: 'folder', parentId: 'drive-c', lastModified: Date.now() },
  { id: 'root-down', name: 'Downloads', type: 'folder', parentId: 'drive-c', lastModified: Date.now() },
  { id: 'welcome-txt', name: 'Welcome.txt', type: 'file', content: 'Welcome to Windows 12!\n\nExploitez la puissance de l\'IA et du VFS.', parentId: 'root-docs', lastModified: Date.now() },
];

const DEFAULT_ICONS: DesktopIcon[] = [
  { id: 'icon-pc', name: 'Ce PC', icon: 'icons/explorer.png', x: 500, y: 40, type: 'app', appId: 'explorer' },
  { id: 'icon-bin', name: 'Corbeille', icon: 'https://img.icons8.com/fluency/512/recycle-bin.png', x: 500, y: 140, type: 'folder' },
  { id: 'icon-edge', name: 'Edge', icon: 'icons/edge.png', x: 500, y: 240, type: 'app', appId: 'browser' },
  { id: 'icon-settings', name: 'Settings', icon: 'icons/settings.png', x: 500, y: 340, type: 'app', appId: 'settings' },
];

export const useOSStore = create<OSState>()(
  persist(
    (set) => ({
      isBooting: true,
      isLoggedIn: false,
      isLocked: false,
      theme: 'dark',
      wallpaper: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000',
      accentColor: '#0078d4',
      transparency: 0.8,
      showVirtualCursor: false,
      isMobile: false,
      isActionCenterOpen: false,
      isTaskViewOpen: false,
      windows: [],
      activeWindowId: null,
      notifications: [],
      fs: DEFAULT_FS,
      desktopIcons: DEFAULT_ICONS,

      completeBoot: () => set({ isBooting: false }),
      login: () => set({ isLoggedIn: true, isLocked: false }),
      logout: () => set({ isLoggedIn: false, isLocked: false, windows: [] }),
      lock: () => set({ isLocked: true }),
      unlock: () => set({ isLocked: false }),
      toggleTheme: () => set((state) => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        const nextWallpaper = nextTheme === 'light' 
          ? 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2000'
          : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000';
        return { theme: nextTheme, wallpaper: nextWallpaper };
      }),
      setWallpaper: (url) => set({ wallpaper: url }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setTransparency: (transparency) => set({ transparency }),
      toggleVirtualCursor: () => set((state) => ({ showVirtualCursor: !state.showVirtualCursor })),
      setIsMobile: (isMobile) => set({ isMobile }),
      toggleActionCenter: () => set((state) => ({ isActionCenterOpen: !state.isActionCenterOpen })),
      closeActionCenter: () => set({ isActionCenterOpen: false }),
      toggleTaskView: () => set((state) => ({ isTaskViewOpen: !state.isTaskViewOpen })),
      
      openWindow: (id, title, icon, fileId) => set((state) => {
        const windowId = fileId ? `${id}-${fileId}` : id;
        const existing = state.windows.find(w => w.id === windowId);
        const maxZ = Math.max(0, ...state.windows.map(w => w.zIndex));
        
        if (existing) {
          if (existing.isMinimized) {
            return {
              windows: state.windows.map(w => 
                w.id === windowId ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w
              ),
              activeWindowId: windowId
            };
          }
          return { activeWindowId: windowId };
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

      updateWindowDimensions: (id, x, y, width, height) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, x, y, width: width ?? w.width, height: height ?? w.height } : w)
      })),

      addNotification: (notif) => set((state) => ({
        notifications: [...state.notifications, { ...notif, id: Math.random().toString(36).substr(2, 9), time: Date.now() }]
      })),

      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),

      updateIconPosition: (id, x, y) => set((state) => ({
        desktopIcons: state.desktopIcons.map(icon => icon.id === id ? { ...icon, x, y } : icon)
      })),

      addDesktopIcon: (icon) => set((state) => {
        const x = 500;
        const y = 40 + (state.desktopIcons.length * 100);
        return {
          desktopIcons: [...state.desktopIcons, { ...icon, x, y }]
        };
      }),

      createItem: (item) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
          fs: [...state.fs, { ...item, id, lastModified: Date.now() }]
        }));
        return id;
      },

      deleteItem: (id) => set((state) => ({
        fs: state.fs.filter(i => i.id !== id && i.parentId !== id),
        desktopIcons: state.desktopIcons.filter(icon => icon.fileId !== id)
      })),

      updateFileContent: (id, content) => set((state) => ({
        fs: state.fs.map(i => i.id === id ? { ...i, content, lastModified: Date.now() } : i)
      })),

      renameItem: (id, name) => set((state) => ({
        fs: state.fs.map(i => i.id === id ? { ...i, name, lastModified: Date.now() } : i)
      }))
    }),
    {
      name: 'windows12-storage-v9',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        theme: state.theme, 
        wallpaper: state.wallpaper,
        accentColor: state.accentColor,
        transparency: state.transparency,
        isLoggedIn: state.isLoggedIn,
        isLocked: state.isLocked,
        fs: state.fs,
        desktopIcons: state.desktopIcons
      }),
    }
  )
);
