import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';
import { User, ArrowRight } from 'lucide-react';

export default function LoginScreen() {
  const { login, wallpaper } = useOSStore();
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div 
        className="os-wallpaper blurred"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '4rem 3rem', borderRadius: '32px',
          backdropFilter: 'blur(30px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          color: '#fff',
          width: '400px'
        }}
      >
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <User size={60} strokeWidth={1.5} />
        </div>
        <h1 style={{ marginBottom: '2rem', fontWeight: 600, fontSize: '24px', letterSpacing: '-0.5px' }}>Admin User</h1>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input 
              type="password" 
              placeholder="PIN"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '14px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255, 255, 255, 0.15)', color: '#fff',
                outline: 'none', width: '100%', fontSize: '16px',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
              autoFocus
            />
            <button type="submit" style={{
              position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
              width: '36px', height: '36px', borderRadius: '8px', border: 'none',
              background: 'rgba(255, 255, 255, 0.2)', color: '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}>
              <ArrowRight size={20} />
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
            <button type="button" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '13px', cursor: 'pointer' }}>I forgot my PIN</button>
          </div>
        </form>
      </motion.div>

      <div style={{ position: 'absolute', bottom: '40px', right: '40px', display: 'flex', gap: '24px' }}>
        <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8 }}><User size={24} /></button>
        <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8 }}><ArrowRight size={24} /></button>
      </div>
    </div>
  );
}
