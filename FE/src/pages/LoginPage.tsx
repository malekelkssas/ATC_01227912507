import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import { PagesRoutesConstants, TranslationConstants } from '@/utils/constants';
import Logo from '@/components/shared/Logo';
import LoginForm from '@/components/pages/auth/LoginForm';
import { useToast } from "@/hooks/useToast";
import { ToastVariantsConstants } from '@/utils/constants';
import { UserService } from '@/api/services';
import type { SignInDto, SignInResponseDto } from '@/types/dtos';
import { setAuth } from '@/store/slices';
import { useAppDispatch } from '@/store';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  
  

  useEffect(() => {
    async function fetchMe() {
      setIsLoading(true);
      try {
        await UserService.getMe();
        navigate(PagesRoutesConstants.EVENTS);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMe();
  }, [navigate]);

  const handleLoginSuccess = async (data: SignInDto) => {
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
      navigate(PagesRoutesConstants.EVENTS);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Logo className="h-20 w-20" isAnimated={true} />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t(TranslationConstants.AUTH.LOGIN)}
          </h2>
        </div>

        <div className="mt-8 mx-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-duck-brown/5 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-duck-nature/20">
            <LoginForm onLogin={handleLoginSuccess} isLoading={isLoading} />
          </div>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t(TranslationConstants.AUTH.DONT_HAVE_ACCOUNT)}{ ' ' }
            <Link to={PagesRoutesConstants.SIGN_UP} className="font-medium text-duck-nature hover:text-duck-nature/80">
              {t(TranslationConstants.AUTH.SIGN_UP_LINK)}
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;