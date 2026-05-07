import { useOSStore } from '../../store/useOSStore';
import Window from './Window';
import { AnimatePresence } from 'framer-motion';

export default function WindowManager() {
  const windows = useOSStore(state => state.windows);

  return (
    <>
      <AnimatePresence>
        {windows.map(win => (
          <Window key={win.id} window={win} />
        ))}
      </AnimatePresence>
    </>
  );
}
