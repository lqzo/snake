import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from './Button';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="icon"
      onClick={toggleLanguage}
      className="absolute top-4 right-4 z-50 text-white hover:text-green-400 transition-colors"
      title={i18n.language === 'en' ? 'Switch to Chinese' : '切换到英文'}
    >
      <Languages size={24} />
    </Button>
  );
};
