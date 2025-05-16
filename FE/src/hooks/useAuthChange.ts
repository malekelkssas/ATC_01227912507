import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/store/hooks';
import type { AuthState } from '@/types';

export function useAuthChange(callback: (auth: AuthState | null) => void) {
  const auth = useAppSelector(state => state.auth);
  const prevAuth = useRef(auth);

  useEffect(() => {
    if (prevAuth.current.user !== auth.user) {
      callback(auth);
      prevAuth.current = auth;
    }
  }, [auth.user, callback]);
} 