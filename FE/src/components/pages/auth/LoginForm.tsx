import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TranslationConstants, LoginFields } from '@/utils/constants';
import { type SignInDto, SignInZod } from '@/types/dtos';
import { Loader2 } from 'lucide-react';

interface LoginFormProps {
  onLogin: (data: SignInDto) => Promise<void>;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDto>({
    resolver: zodResolver(SignInZod),
    defaultValues: {
      [LoginFields.EMAIL]: '',
      [LoginFields.PASSWORD]: '',
    }
  });

  return (
    <form className="w-full max-w-[320px] mx-auto space-y-6 px-4 sm:px-6 md:px-8" onSubmit={handleSubmit(onLogin)}>
      <div>
        <label htmlFor={LoginFields.EMAIL} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t(TranslationConstants.AUTH.EMAIL)}
        </label>
        <div className="mt-1">
          <Input
            id={LoginFields.EMAIL}
            type="email"
            autoComplete={LoginFields.EMAIL}
            {...register(LoginFields.EMAIL)}
            className={`border-duck-nature/20 focus:border-duck-nature focus:ring-duck-nature ${
              errors[LoginFields.EMAIL] ? 'border-red-500' : ''
            }`}
          />
          {errors[LoginFields.EMAIL] && (
            <p className="mt-1 text-sm text-red-500">{t(errors[LoginFields.EMAIL]?.message || '')}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={LoginFields.PASSWORD} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t(TranslationConstants.AUTH.PASSWORD)}
        </label>
        <div className="mt-1">
          <Input
            id={LoginFields.PASSWORD}
            type="password"
            autoComplete="current-password"
            {...register(LoginFields.PASSWORD)}
            className={`border-duck-nature/20 focus:border-duck-nature focus:ring-duck-nature ${
              errors[LoginFields.PASSWORD] ? 'border-red-500' : ''
            }`}
          />
          {errors[LoginFields.PASSWORD] && (
            <p className="mt-1 text-sm text-red-500">{t(errors[LoginFields.PASSWORD]?.message || '')}</p>
          )}
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t(TranslationConstants.COMMON.LOADING)}
            </>
          ) : (
            t(TranslationConstants.AUTH.LOGIN)
          )}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
