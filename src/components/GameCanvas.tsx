import React, { useRef, useEffect, useState } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { useTouchControls } from '../hooks/useTouchControls';
import { useGameStore } from '../store/useGameStore';
import { useNavigate } from 'react-router-dom';
import { GRID_SIZE } from '../game/constants';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(320);
  // Pass size to useGameLoop to ensure renderer updates
  const { startGame, changeDirection } = useGameLoop(canvasRef, size);
  const { status } = useGameStore();
  const navigate = useNavigate();

  // Responsive canvas size
  useEffect(() => {
    const updateSize = () => {
      // Calculate max available space
      // Width: Window width - padding (32px)
      // Height: Window height - header (80px) - footer/padding (100px)
      const maxWidth = Math.min(window.innerWidth - 32, 600); // Max width 600px
      const maxHeight = window.innerHeight - 180; 
      
      // Use the smaller dimension to keep it square
      let newSize = Math.min(maxWidth, maxHeight);
      
      // Snap to grid size
      newSize = Math.floor(newSize / GRID_SIZE) * GRID_SIZE;
      
      // Ensure min size
      newSize = Math.max(newSize, 200);
      
      setSize(newSize);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Initialize game on mount
  useEffect(() => {
    startGame();
  }, [startGame]);

  // Navigate to game over screen
  useEffect(() => {
    if (status === 'GAME_OVER') {
      // Small delay to show collision
      setTimeout(() => {
        navigate('/game-over');
      }, 500);
    }
  }, [status, navigate]);

  useTouchControls(containerRef, {
    onSwipe: changeDirection,
    enable: status === 'PLAYING',
  });

  return (
    <div 
      ref={containerRef} 
      className="relative flex items-center justify-center mx-auto bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border-4 border-zinc-800"
      style={{ width: size + 8, height: size + 8 }} // Container fits canvas exactly (+ border)
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="block touch-none"
        style={{ width: size, height: size }}
      />
      
      {status === 'PAUSED' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-white text-2xl font-bold">PAUSED</div>
        </div>
      )}
    </div>
  );
};
