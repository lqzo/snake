import { useEffect, useRef, useCallback } from 'react';
import { Snake } from '../game/Snake';
import { Food } from '../game/Food';
import { Renderer } from '../game/Renderer';
import { useGameStore } from '../store/useGameStore';
import { GAME_CONFIG } from '../game/constants';
import { Direction } from '../game/types';

export const useGameLoop = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const { status, setStatus, incrementScore, updateHighScore, resetGame, incrementGameTime } = useGameStore();
  
  const snakeRef = useRef<Snake>(new Snake());
  const foodRef = useRef<Food>(new Food());
  const rendererRef = useRef<Renderer | null>(null);
  const frameIdRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);
  const gameSpeedRef = useRef<number>(GAME_CONFIG.baseSpeed);
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize game
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        rendererRef.current = new Renderer(ctx, canvas.width, canvas.height);
        
        // Initial draw
        rendererRef.current.clear();
        rendererRef.current.drawGrid();
        rendererRef.current.drawSnake(snakeRef.current);
        rendererRef.current.drawFood(foodRef.current);
      }
    }
  }, [canvasRef]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== 'PLAYING') return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          snakeRef.current.setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          snakeRef.current.setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          snakeRef.current.setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          snakeRef.current.setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status]);

  // Game timer
  useEffect(() => {
    if (status === 'PLAYING') {
      timeIntervalRef.current = setInterval(() => {
        incrementGameTime();
      }, 1000);
    } else {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    }
    return () => {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    };
  }, [status, incrementGameTime]);

  const changeDirection = useCallback((dir: Direction) => {
    if (status === 'PLAYING') {
      snakeRef.current.setDirection(dir);
    }
  }, [status]);

  const startGame = useCallback(() => {
    snakeRef.current.reset();
    foodRef.current = new Food(); // Reset food position
    // Ensure food doesn't spawn on snake
    foodRef.current.spawn(snakeRef.current);
    
    resetGame();
    setStatus('PLAYING');
    gameSpeedRef.current = GAME_CONFIG.baseSpeed;
    lastUpdateRef.current = performance.now();
  }, [resetGame, setStatus]);

  const gameLoop = useCallback((time: number) => {
    if (status !== 'PLAYING') return;

    const deltaTime = time - lastUpdateRef.current;

    if (deltaTime >= gameSpeedRef.current) {
      const snake = snakeRef.current;
      const food = foodRef.current;
      const renderer = rendererRef.current;

      // Update snake position
      snake.move();

      // Check collision
      if (snake.checkCollision()) {
        setStatus('GAME_OVER');
        updateHighScore();
        return;
      }

      // Check food
      if (snake.body[0].x === food.position.x && snake.body[0].y === food.position.y) {
        snake.grow();
        incrementScore(10);
        food.spawn(snake);
        
        // Increase speed
        gameSpeedRef.current = Math.max(
          GAME_CONFIG.minSpeed,
          gameSpeedRef.current - GAME_CONFIG.speedIncrement
        );
      }

      // Render
      if (renderer) {
        renderer.clear();
        renderer.drawGrid();
        renderer.drawSnake(snake);
        renderer.drawFood(food);
      }

      lastUpdateRef.current = time;
    }

    frameIdRef.current = requestAnimationFrame(gameLoop);
  }, [status, setStatus, incrementScore, updateHighScore]);

  useEffect(() => {
    if (status === 'PLAYING') {
      frameIdRef.current = requestAnimationFrame(gameLoop);
    } else {
      cancelAnimationFrame(frameIdRef.current);
    }
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [status, gameLoop]);

  // Draw initial state when game is not playing
  useEffect(() => {
     if (status !== 'PLAYING' && rendererRef.current && canvasRef.current) {
        // We still want to see the last frame if game over or paused, 
        // but for IDLE we might want a clean state or the initial state
        if (status === 'IDLE') {
             // Optional: draw some attract screen or just initial positions
             rendererRef.current.clear();
             rendererRef.current.drawGrid();
             rendererRef.current.drawSnake(snakeRef.current);
             rendererRef.current.drawFood(foodRef.current);
        }
     }
  }, [status]);

  return {
    startGame,
    changeDirection,
    snakeRef
  };
};
