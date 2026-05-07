import { useEffect } from 'react';
import { useOSStore } from './store/useOSStore';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop/Desktop';
import VirtualCursor from './components/VirtualCursor';
import NotificationsLayer from './components/NotificationsLayer';

function App() {
  const { isBooting, isLoggedIn, isLocked, theme, accentColor, transparency, setIsMobile, lock } = useOSStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--accent-color', accentColor);
    document.documentElement.style.setProperty('--glass-bg', theme === 'dark' 
      ? `rgba(20, 20, 20, ${transparency})` 
      : `rgba(255, 255, 255, ${transparency})`);
  }, [theme, accentColor, transparency]);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(isMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'l' && e.metaKey) { e.preventDefault(); lock(); }
    };
    window.addEventListener('keydown', handleKeys);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('keydown', handleKeys);
    };
  }, [setIsMobile, lock]);

  return (
    <div className="os-container">
      {isBooting ? (
        <BootScreen />
      ) : !isLoggedIn ? (
        <LoginScreen />
      ) : isLocked ? (
        <LockScreen />
      ) : (
        <>
          <Desktop />
          <VirtualCursor />
          <NotificationsLayer />
        </>
      )}
    </div>
  );
}

export default App;
