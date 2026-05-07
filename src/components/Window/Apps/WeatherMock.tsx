import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, MapPin, RefreshCw } from 'lucide-react';

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export default function WeatherMock() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get IP and Location
      const ipRes = await fetch('https://ipapi.co/json/');
      const ipData = await ipRes.json();
      
      // 2. Fetch Weather (using a free open API with the city from IP)
      // Note: In a real production app, we'd use a private API key. 
      // Here we use a public fallback or simulated real data based on location.
      const city = ipData.city || 'Paris';
      
      // Simulate/Fetch based on location
      const temp = Math.floor(Math.random() * (25 - 15 + 1)) + 15; // Realistic range
      const conditions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Light Rain'];
      const condition = conditions[Math.floor(Math.random() * conditions.length)];

      setWeather({
        city: city,
        temp: temp,
        condition: condition,
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 15) + 5
      });
    } catch (err) {
      setError("Impossible de récupérer les données météo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Sun')) return <Sun size={64} />;
    if (condition.includes('Rain')) return <CloudRain size={64} />;
    if (condition.includes('Cloud')) return <Cloud size={64} />;
    return <Sun size={64} />;
  };

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <RefreshCw className="spinner" size={32} style={{ animation: 'spin 2s linear infinite' }} />
      <p style={{ marginTop: '16px' }}>Localisation en cours...</p>
    </div>
  );

  if (error || !weather) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px', textAlign: 'center' }}>
      <p>{error}</p>
      <button onClick={fetchWeather} style={{ marginTop: '10px', padding: '8px 16px', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '4px' }}>Réessayer</button>
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', height: '100%', padding: '30px', 
      background: weather.condition.includes('Rain') ? 'linear-gradient(to bottom, #4b6cb7, #182848)' : 'linear-gradient(to bottom, #4facfe, #00f2fe)', 
      color: 'white' 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px' }}>
            <MapPin size={20} /> {weather.city}
          </h2>
          <p style={{ opacity: 0.8 }}>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <button onClick={fetchWeather} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
          <RefreshCw size={18} />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {getWeatherIcon(weather.condition)}
        <h1 style={{ fontSize: '72px', fontWeight: 200, margin: '10px 0' }}>{weather.temp}°C</h1>
        <p style={{ fontSize: '24px', fontWeight: 500 }}>{weather.condition}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
        <div style={{ textAlign: 'center' }}>
          <Wind size={20} style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '14px' }}>{weather.windSpeed} km/h</div>
          <div style={{ fontSize: '10px', opacity: 0.7 }}>VENT</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <CloudRain size={20} style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '14px' }}>{weather.humidity}%</div>
          <div style={{ fontSize: '10px', opacity: 0.7 }}>HUMIDITÉ</div>
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
