import React, { createContext, useEffect, type ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/slices';
import { type Theme, THEME } from '@/types/theme';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const themeState = useAppSelector((state) => state.theme);
  const mode = themeState?.mode ?? THEME.LIGHT;

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mode === THEME.DARK) {
      htmlElement.classList.add(THEME.DARK);
    } else {
      htmlElement.classList.remove(THEME.DARK);
    }
  }, [mode]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: mode,
        toggleTheme: handleToggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

