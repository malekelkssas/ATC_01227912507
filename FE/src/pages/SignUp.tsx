import React, { useState } from 'react';
import { UserService } from '@/api/services';
import { Link, useNavigate } from 'react-router-dom';
import { type ErrorResponse } from '@/types';
import { PagesRoutesConstants, ToastVariantsConstants, TranslationConstants } from '@/utils/constants';
import { useToast } from '@/hooks/useToast';
import { type CreateUserDto, type CreateUserInputDto } from '@/types/dtos';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/layout/Layout';
import Logo from '@/components/shared/Logo';
import SignUpForm from '@/components/pages/auth/SignUpForm';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: CreateUserInputDto) => {
    setIsLoading(true);
    try {
        await UserService.createUser(data as CreateUserDto);
        toast({
            title: t(TranslationConstants.COMMON.MESSAGES.SUCCESS),
            description: t(TranslationConstants.AUTH.SIGNUP_SUCCESS),
            variant: ToastVariantsConstants.SUCCESS,
        });
        navigate(PagesRoutesConstants.SIGN_IN);
    } catch (error) {
        const errorResponse : ErrorResponse = error as ErrorResponse;
        toast({
            title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
            description: errorResponse.response?.data?.message || t(TranslationConstants.AUTH.SIGNUP_FAILED),
            variant: ToastVariantsConstants.ERROR,
        });
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
            {t(TranslationConstants.AUTH.SIGNUP)}
          </h2>
        </div>

        <div className="mt-8 mx-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-duck-brown/5 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-duck-nature/20">
            <SignUpForm onSignUp={handleSignUp} isLoading={isLoading} />
          </div>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {t(TranslationConstants.AUTH.ALREADY_HAVE_ACCOUNT)}{ ' ' }
            <Link to={PagesRoutesConstants.SIGN_IN} className="font-medium text-duck-nature hover:text-duck-nature/80">
              {t(TranslationConstants.AUTH.SIGN_IN_LINK)}
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
