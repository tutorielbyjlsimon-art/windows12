import { useEffect } from 'react';
import { useOSStore } from './store/useOSStore';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import Desktop from './components/Desktop/Desktop';

function App() {
  const { isBooting, isLoggedIn, theme } = useOSStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="os-container">
      {isBooting ? (
        <BootScreen />
      ) : !isLoggedIn ? (
        <LoginScreen />
      ) : (
        <Desktop />
      )}
    </div>
  );
}

export default App;
