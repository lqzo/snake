import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GameCanvas } from '../components/GameCanvas';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/Button';
import { Pause, Play, Home as HomeIcon } from 'lucide-react';

export const Game: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { score, status, setStatus } = useGameStore();

  const togglePause = () => {
    if (status === 'PLAYING') {
      setStatus('PAUSED');
    } else if (status === 'PAUSED') {
      setStatus('PLAYING');
    }
  };

  const handleHome = () => {
    setStatus('IDLE');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col">
      {/* Header HUD */}
      <div className="flex items-center justify-between mb-6 px-2">
        <Button variant="icon" onClick={handleHome}>
          <HomeIcon />
        </Button>
        <div className="text-2xl font-bold text-green-500">
          {score}
        </div>
        <Button variant="icon" onClick={togglePause}>
          {status === 'PAUSED' ? <Play /> : <Pause />}
        </Button>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col justify-center">
        <GameCanvas />
        <p className="text-center text-zinc-500 mt-6 text-sm">
          {t('game.swipeHint')}
        </p>
      </div>
    </div>
  );
};
