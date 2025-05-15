import { useEffect } from 'react';
import i18n from '@/i18n/i18n';

export function useLanguageChange(callback: (lng: string) => void) {
  useEffect(() => {
    const handler = (lng: string) => {
      callback(lng);
    };
    i18n.on('languageChanged', handler);
    return () => {
      i18n.off('languageChanged', handler);
    };
  }, [callback]);
} 