import { CloudRain, Sun, Wind } from 'lucide-react';

export default function WeatherMock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px', background: 'linear-gradient(to bottom, #4facfe, #00f2fe)', color: 'white' }}>
      <h2>Weather</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Sun size={80} style={{ marginBottom: '20px' }} />
        <h1 style={{ fontSize: '64px', fontWeight: 300 }}>72°F</h1>
        <p style={{ fontSize: '24px' }}>Sunny, Paris</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 'auto', background: 'rgba(255,255,255,0.2)', padding: '16px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Wind /> 12 mph</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CloudRain /> 0%</div>
      </div>
    </div>
  );
}
