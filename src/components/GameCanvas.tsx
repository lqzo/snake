import React, { useRef, useEffect, useState } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { useTouchControls } from '../hooks/useTouchControls';
import { useGameStore } from '../store/useGameStore';
import { useNavigate } from 'react-router-dom';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { startGame, changeDirection } = useGameLoop(canvasRef);
  const { status } = useGameStore();
  const navigate = useNavigate();
  const [size, setSize] = useState(320);

  // Responsive canvas size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Keep it square, but max out at some reasonable size or window height
        const maxSize = Math.min(width, window.innerHeight - 200); 
        setSize(maxSize);
      }
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
      className="relative flex items-center justify-center w-full max-w-md mx-auto aspect-square bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border-4 border-zinc-800"
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
