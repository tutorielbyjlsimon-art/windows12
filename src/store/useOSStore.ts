import { create } from 'zustand';

export type Theme = 'light' | 'dark';

export interface AppWindow {
  id: string;
  title: string;
  icon?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface OSState {
  isBooting: boolean;
  isLoggedIn: boolean;
  theme: Theme;
  wallpaper: string;
  windows: AppWindow[];
  activeWindowId: string | null;
  
  // Actions
  completeBoot: () => void;
  login: () => void;
  logout: () => void;
  toggleTheme: () => void;
  setWallpaper: (url: string) => void;
  openWindow: (id: string, title: string, icon?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useOSStore = create<OSState>((set) => ({
  isBooting: true,
  isLoggedIn: false,
  theme: 'dark',
  // Fallback direct links from Unsplash Source or more stable ones
  wallpaper: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2000',
  windows: [],
  activeWindowId: null,

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
  
  openWindow: (id, title, icon) => set((state) => {
    const existing = state.windows.find(w => w.id === id);
    const maxZ = Math.max(0, ...state.windows.map(w => w.zIndex));
    
    if (existing) {
      return {
        windows: state.windows.map(w => 
          w.id === id ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w
        ),
        activeWindowId: id
      };
    }
    
    return {
      windows: [...state.windows, {
        id,
        title,
        icon,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: maxZ + 1
      }],
      activeWindowId: id
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
    const maxZ = Math.max(0, ...state.windows.map(w => w.zIndex));
    return {
      windows: state.windows.map(w => 
        w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
      ),
      activeWindowId: id
    };
  })
}));
