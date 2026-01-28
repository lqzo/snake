import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { GameOver } from './pages/GameOver';

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('app.title');
  }, [t]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/game-over" element={<GameOver />} />
    </Routes>
  );
}

export default App;
