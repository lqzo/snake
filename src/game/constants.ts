import { GameConfig } from './types';

export const GRID_SIZE = 20; // 20x20 grid

export const GAME_CONFIG: GameConfig = {
  gridSize: GRID_SIZE,
  baseSpeed: 150,
  speedIncrement: 2,
  minSpeed: 50,
};

export const COLORS = {
  background: '#000000',
  grid: '#1a1a1a',
  snakeHead: '#4CAF50', // Light Green
  snakeBody: '#2E7D32', // Dark Green
  food: '#FF5722', // Deep Orange
  obstacle: '#555555',
};

export const STORAGE_KEYS = {
  HIGH_SCORE: 'snake_high_score',
};
