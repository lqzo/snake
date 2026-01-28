import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useGameStore } from '../store/useGameStore';
import { Trophy, Play, Info } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { highScore } = useGameStore();

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center space-y-8 relative">
      <LanguageSwitcher />
      
      {/* Title Section */}
      <div className="text-center space-y-4">
        <div className="text-6xl animate-bounce">🐍</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          {t('home.title')}
        </h1>
        <p className="text-zinc-400">{t('home.subtitle')}</p>
      </div>

      {/* High Score Card */}
      <Card className="w-full max-w-xs p-6 flex flex-col items-center space-y-2 border-green-900/50 bg-green-900/10">
        <div className="flex items-center space-x-2 text-green-400">
          <Trophy size={20} />
          <span className="font-medium">{t('home.highScore')}</span>
        </div>
        <div className="text-4xl font-bold text-white">{highScore}</div>
      </Card>

      {/* Actions */}
      <div className="w-full max-w-xs space-y-4">
        <Button 
          className="w-full text-lg h-14" 
          onClick={() => navigate('/game')}
        >
          <Play className="mr-2" size={20} />
          {t('home.startGame')}
        </Button>
      </div>

      {/* Instructions */}
      <Card className="w-full max-w-xs p-6 space-y-4 text-sm text-zinc-400">
        <div className="flex items-center space-x-2 text-white mb-2">
          <Info size={16} />
          <span className="font-medium">{t('home.howToPlay')}</span>
        </div>
        <ul className="space-y-2 list-disc list-inside">
          <li>{t('home.rules.move')}</li>
          <li>{t('home.rules.eat')}</li>
          <li>{t('home.rules.avoid')}</li>
          <li>{t('home.rules.speed')}</li>
        </ul>
      </Card>
    </div>
  );
};
