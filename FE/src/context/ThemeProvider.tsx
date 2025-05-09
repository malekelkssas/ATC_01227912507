import React, { type ReactNode } from 'react';
import { ThemeProvider as ThemeContextProvider } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
};
