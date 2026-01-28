import { STORAGE_KEYS } from '../game/constants';

export const getHighScore = (): number => {
  const score = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
  return score ? parseInt(score, 10) : 0;
};

export const setHighScore = (score: number): void => {
  const currentHigh = getHighScore();
  if (score > currentHigh) {
    localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
  }
};
