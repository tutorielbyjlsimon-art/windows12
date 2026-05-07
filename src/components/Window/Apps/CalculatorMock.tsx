import { useState } from 'react';

export default function CalculatorMock() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleInput = (val: string) => {
    if (display === '0' && val !== '.') setDisplay(val);
    else setDisplay(prev => prev + val);
  };

  const calculate = () => {
    try {
      // Basic math only for safety
      const result = eval(display.replace(/[^-+*/.0-9]/g, ''));
      setEquation(display + ' =');
      setDisplay(String(result));
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const btnStyle = {
    padding: '20px', fontSize: '18px', border: '1px solid var(--glass-border)',
    background: 'rgba(255,255,255,0.05)', color: 'var(--text-color)',
    borderRadius: '8px', cursor: 'pointer'
  };

  return (
    <div style={{ padding: '24px', maxWidth: '320px', margin: 'auto', height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ textAlign: 'right', padding: '20px', background: 'var(--hover-bg)', borderRadius: '12px' }}>
        <div style={{ fontSize: '14px', opacity: 0.6, height: '20px' }}>{equation}</div>
        <div style={{ fontSize: '32px', fontWeight: 600 }}>{display}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        <button style={{ ...btnStyle, gridColumn: 'span 2', color: '#e81123' }} onClick={clear}>C</button>
        <button style={btnStyle} onClick={() => handleInput('/')}>/</button>
        <button style={btnStyle} onClick={() => handleInput('*')}>*</button>
        
        {[7,8,9].map(n => <button key={n} style={btnStyle} onClick={() => handleInput(String(n))}>{n}</button>)}
        <button style={btnStyle} onClick={() => handleInput('-')}>-</button>
        
        {[4,5,6].map(n => <button key={n} style={btnStyle} onClick={() => handleInput(String(n))}>{n}</button>)}
        <button style={btnStyle} onClick={() => handleInput('+')}>+</button>
        
        {[1,2,3].map(n => <button key={n} style={btnStyle} onClick={() => handleInput(String(n))}>{n}</button>)}
        <button style={{ ...btnStyle, gridRow: 'span 2', background: 'var(--accent-color)', color: 'white' }} onClick={calculate}>=</button>
        
        <button style={{ ...btnStyle, gridColumn: 'span 2' }} onClick={() => handleInput('0')}>0</button>
        <button style={btnStyle} onClick={() => handleInput('.')}>.</button>
      </div>
    </div>
  );
}
