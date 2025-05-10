import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TranslationConstants } from '@/utils/constants';
import { THEME } from '@/types/theme';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const toggleTheme = () => {
    setTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="border border-duck-yellow/20 hover:bg-duck-yellow/10 text-gray-700 dark:text-gray-200"
      aria-label={t(TranslationConstants.COMMON.BUTTONS.THEME_TOGGLE)}
    >
      {theme === THEME.DARK ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;