import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeLoginModal, setAuth } from '@/store/slices/authSlice';
import LoginForm from '@/components/pages/auth/LoginForm';
import { useToast } from '@/hooks/useToast';
import { ToastVariantsConstants, TranslationConstants } from '@/utils/constants';
import { UserService } from '@/api/services';
import type { SignInDto, SignInResponseDto } from '@/types/dtos';
import { useTranslation } from 'react-i18next';
import useClickOutside from '@/hooks/useClickOutside';
import { createPortal } from 'react-dom';

const GlobalLoginModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.auth.isLoginModalOpen);
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useClickOutside(modalRef, () => {
    if (isOpen) dispatch(closeLoginModal());
  });

  const handleLogin = async (data: SignInDto) => {
    setIsLoading(true);
    try {
      const response = await UserService.signIn(data);
      const responseData = response as SignInResponseDto;
      dispatch(setAuth(responseData));
      toast({
        title: t(TranslationConstants.COMMON.MESSAGES.SUCCESS),
        description: t(TranslationConstants.AUTH.LOGIN_SUCCESS),
        variant: ToastVariantsConstants.SUCCESS,
      });
      dispatch(closeLoginModal());
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div 
        ref={modalRef} 
        className="bg-white dark:bg-duck-brown/90 rounded-xl shadow-lg p-8 w-full max-w-md relative transform transition-all duration-200 scale-100"
        style={{
          animation: 'modalFadeIn 0.2s ease-out'
        }}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-duck-yellow text-xl transition-colors duration-200"
          onClick={() => dispatch(closeLoginModal())}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-duck-brown dark:text-duck-yellow">
          {t(TranslationConstants.AUTH.LOGIN)}
        </h2>
        <LoginForm onLogin={handleLogin} isLoading={isLoading} />
      </div>
    </div>,
    document.body
  );
};

export default GlobalLoginModal; 