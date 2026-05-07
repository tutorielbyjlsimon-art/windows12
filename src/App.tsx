import { useEffect } from 'react';
import { useOSStore } from './store/useOSStore';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import Desktop from './components/Desktop/Desktop';
import VirtualCursor from './components/VirtualCursor';

function App() {
  const { isBooting, isLoggedIn, theme, accentColor, transparency, setIsMobile } = useOSStore();

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
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  return (
    <div className="os-container">
      {isBooting ? (
        <BootScreen />
      ) : !isLoggedIn ? (
        <LoginScreen />
      ) : (
        <>
          <Desktop />
          <VirtualCursor />
        </>
      )}
    </div>
  );
}

export default App;
