import { removeUser } from '@/store/slices/authSlice';
import { store } from '@/store/store';
export const logout = () => {
  store.dispatch(removeUser());
}; 