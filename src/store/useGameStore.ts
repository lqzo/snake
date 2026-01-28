import { create } from 'zustand';
import { GameStatus } from '../game/types';
import { getHighScore, setHighScore } from '../utils/storage';

interface GameState {
  status: GameStatus;
  score: number;
  highScore: number;
  gameTime: number; // in seconds
  
  // Actions
  setStatus: (status: GameStatus) => void;
  setScore: (score: number) => void;
  incrementScore: (amount: number) => void;
  updateHighScore: () => void;
  resetGame: () => void;
  setGameTime: (time: number) => void;
  incrementGameTime: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  status: 'IDLE',
  score: 0,
  highScore: getHighScore(),
  gameTime: 0,

  setStatus: (status) => set({ status }),
  
  setScore: (score) => set({ score }),
  
  incrementScore: (amount) => set((state) => ({ score: state.score + amount })),
  
  updateHighScore: () => {
    const { score, highScore } = get();
    if (score > highScore) {
      setHighScore(score);
      set({ highScore: score });
    }
  },
  
  resetGame: () => set({ 
    status: 'IDLE', 
    score: 0, 
    gameTime: 0 
  }),

  setGameTime: (time) => set({ gameTime: time }),
  
  incrementGameTime: () => set((state) => ({ gameTime: state.gameTime + 1 })),
}));
