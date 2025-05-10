import { removeUser } from '@/store/slices/authSlice';
import { store } from '@/store/store';
import { PagesRoutesConstants } from '@/utils/constants';
export const logout = () => {
  store.dispatch(removeUser());
  
  window.location.href = PagesRoutesConstants.SIGN_IN;
}; 