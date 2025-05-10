import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/i18n/i18n';
import { Button } from '@/components/ui/button';
import { LanguagesConstants } from '@/utils/constants';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleLanguageChange = () => {
    const newLang = currentLang === LanguagesConstants.ENGLISH ? LanguagesConstants.ARABIC : LanguagesConstants.ENGLISH;
    changeLanguage(newLang);
  };

  return (
    <Button
      onClick={handleLanguageChange}
      variant="outline"
      size="sm"
      className="border border-duck-yellow/20 hover:bg-duck-yellow/10 text-gray-700 dark:text-gray-200"
    >
      {currentLang === LanguagesConstants.ENGLISH ? 'العربية' : 'English'}
    </Button>
  );
};

export default LanguageSwitcher;