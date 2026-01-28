import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useGameStore } from '../store/useGameStore';
import { RotateCcw, Home as HomeIcon, Clock, Trophy } from 'lucide-react';

export const GameOver: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { score, highScore, gameTime, resetGame } = useGameStore();

  const handleRestart = () => {
    resetGame();
    navigate('/game');
  };

  const handleHome = () => {
    resetGame();
    navigate('/');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-red-500">{t('gameOver.title')}</h1>
        <p className="text-zinc-400">{t('gameOver.subtitle')}</p>
      </div>

      <Card className="w-full max-w-xs p-8 space-y-6 bg-zinc-900 border-zinc-800">
        <div className="text-center space-y-2">
          <div className="text-sm text-zinc-400 uppercase tracking-wider">{t('gameOver.finalScore')}</div>
          <div className="text-6xl font-bold text-green-500">{score}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center text-zinc-400 space-x-1">
              <Trophy size={14} />
              <span className="text-xs">{t('gameOver.best')}</span>
            </div>
            <div className="text-xl font-bold">{highScore}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center text-zinc-400 space-x-1">
              <Clock size={14} />
              <span className="text-xs">{t('gameOver.time')}</span>
            </div>
            <div className="text-xl font-bold">{formatTime(gameTime)}</div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col w-full max-w-xs space-y-3">
        <Button 
          className="w-full h-12 text-lg" 
          onClick={handleRestart}
        >
          <RotateCcw className="mr-2" size={20} />
          {t('gameOver.playAgain')}
        </Button>
        <Button 
          variant="secondary" 
          className="w-full h-12" 
          onClick={handleHome}
        >
          <HomeIcon className="mr-2" size={20} />
          {t('gameOver.backToHome')}
        </Button>
      </div>
    </div>
  );
};
