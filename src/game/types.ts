export interface Position {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type GameStatus = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

export interface GameConfig {
  gridSize: number; // Number of cells in width/height (square grid)
  baseSpeed: number; // Initial speed in ms per frame
  speedIncrement: number; // Speed decrease per food eaten
  minSpeed: number; // Fastest speed limit
}
