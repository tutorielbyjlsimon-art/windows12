import { useState, useEffect } from 'react';
import { Flag, Bomb, RefreshCw } from 'lucide-react';

export default function MinesweeperMock() {
  const size = 10;
  const minesCount = 15;
  const [grid, setGrid] = useState<any[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const initGrid = () => {
    let newGrid = Array(size).fill(null).map(() => Array(size).fill({ isMine: false, revealed: false, flagged: false, count: 0 }));
    
    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c] = { ...newGrid[r][c], isMine: true };
        minesPlaced++;
      }
    }

    // Calculate counts
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; r + dr < size && dr <= 1; dr++) {
            if (r + dr < 0) continue;
            for (let dc = -1; c + dc < size && dc <= 1; dc++) {
              if (c + dc < 0) continue;
              if (newGrid[r + dr][c + dc].isMine) count++;
            }
          }
          newGrid[r][c] = { ...newGrid[r][c], count };
        }
      }
    }
    setGrid(newGrid);
    setGameOver(false);
    setWin(false);
  };

  useEffect(() => {
    initGrid();
  }, []);

  const reveal = (r: number, c: number) => {
    if (gameOver || win || grid[r][c].revealed || grid[r][c].flagged) return;

    let newGrid = [...grid.map(row => [...row])];
    if (newGrid[r][c].isMine) {
      setGameOver(true);
      revealAllMines(newGrid);
    } else {
      floodFill(newGrid, r, c);
      setGrid(newGrid);
      checkWin(newGrid);
    }
  };

  const revealAllMines = (g: any[][]) => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (g[r][c].isMine) g[r][c].revealed = true;
      }
    }
    setGrid(g);
  };

  const floodFill = (g: any[][], r: number, c: number) => {
    if (r < 0 || r >= size || c < 0 || c >= size || g[r][c].revealed || g[r][c].isMine) return;
    g[r][c].revealed = true;
    if (g[r][c].count === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          floodFill(g, r + dr, c + dc);
        }
      }
    }
  };

  const checkWin = (g: any[][]) => {
    let revealedCount = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (g[r][c].revealed) revealedCount++;
      }
    }
    if (revealedCount === size * size - minesCount) setWin(true);
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || win || grid[r][c].revealed) return;
    let newGrid = [...grid.map(row => [...row])];
    newGrid[r][c].flagged = !newGrid[r][c].flagged;
    setGrid(newGrid);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '20px', background: 'var(--window-bg)', color: 'var(--text-color)' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '12px' }}>
        <div style={{ fontSize: '18px', fontWeight: 600 }}>{win ? 'GAGNÉ ! 🎉' : gameOver ? 'GAME OVER' : 'DÉMINEUR'}</div>
        <button onClick={initGrid} style={{ background: 'var(--accent-color)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
          <RefreshCw size={18} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 32px)`, gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '4px', borderRadius: '8px' }}>
        {grid.map((row, r) => row.map((cell, c) => (
          <div 
            key={`${r}-${c}`}
            onClick={() => reveal(r, c)}
            onContextMenu={(e) => toggleFlag(e, r, c)}
            style={{
              width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '4px', cursor: 'pointer',
              background: cell.revealed ? (cell.isMine ? '#e81123' : 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.2)',
              fontSize: '14px', fontWeight: 700, color: cell.count === 1 ? '#0078d4' : cell.count === 2 ? '#00cc6a' : cell.count === 3 ? '#e81123' : 'inherit'
            }}
          >
            {cell.revealed ? (cell.isMine ? <Bomb size={16} /> : cell.count > 0 ? cell.count : '') : (cell.flagged ? <Flag size={14} color="#e81123" fill="#e81123" /> : '')}
          </div>
        )))}
      </div>
      <div style={{ fontSize: '11px', opacity: 0.6 }}>Clic-droit pour poser un drapeau</div>
    </div>
  );
}
