import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import { PagesRoutesConstants, TranslationConstants } from '@/utils/constants';
import Logo from '@/components/shared/Logo';
import LoginForm from '@/components/pages/auth/LoginForm';
import { useToast } from "@/hooks/use-toast";
import { ToastVariantsConstants } from '@/utils/constants';
import { UserService } from '@/api/services';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchMe() {
      try {
        await UserService.getMe();
        navigate(PagesRoutesConstants.EVENTS);
      } catch {
        // PASS
      }
    }
    fetchMe();
  }, [navigate]);

  const handleLoginSuccess = () => {
    toast({
      title: t(TranslationConstants.COMMON.MESSAGES.SUCCESS),
      description: t(TranslationConstants.AUTH.LOGIN_SUCCESS),
      variant: ToastVariantsConstants.SUCCESS,
    });
    navigate(PagesRoutesConstants.EVENTS);
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
          <div className="bg-white dark:bg-duck-brown/5 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-duck-yellow/20">
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;