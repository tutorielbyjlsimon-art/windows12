import { useState, useRef, useEffect } from 'react';
import { Palette, Eraser, Download, Trash2 } from 'lucide-react';

export default function PaintMock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0078d4');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
      }
    }
  }, [color, brushSize]);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (tool === 'eraser') {
        ctx.strokeStyle = 'white';
      } else {
        ctx.strokeStyle = color;
      }
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'windows12-paint.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f0f0f0' }}>
      <div style={{ padding: '10px 20px', background: 'white', borderBottom: '1px solid #ddd', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setTool('brush')} style={{ padding: '8px', borderRadius: '4px', border: tool === 'brush' ? '1px solid var(--accent-color)' : '1px solid transparent', background: 'none', cursor: 'pointer' }}><Palette size={18} /></button>
          <button onClick={() => setTool('eraser')} style={{ padding: '8px', borderRadius: '4px', border: tool === 'eraser' ? '1px solid var(--accent-color)' : '1px solid transparent', background: 'none', cursor: 'pointer' }}><Eraser size={18} /></button>
        </div>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ border: 'none', width: '32px', height: '32px', cursor: 'pointer' }} />
        <input type="range" min="1" max="50" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button onClick={clear} style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Trash2 size={16} /> Effacer</button>
          <button onClick={download} style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', background: 'var(--accent-color)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={16} /> Enregistrer</button>
        </div>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <canvas 
          ref={canvasRef}
          width={800}
          height={500}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', cursor: 'crosshair', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
}
