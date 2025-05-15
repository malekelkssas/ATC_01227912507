import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TranslationConstants } from '@/utils/constants';
import { SignUpFields } from '@/utils/constants';
import { CreateUserZod, type CreateUserInputDto } from '@/types/dtos';
import { Loader2 } from 'lucide-react';

interface SignUpFormProps {
  onSignUp: (data: CreateUserInputDto) => Promise<void>;
  isLoading: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, isLoading }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInputDto>({
    resolver: zodResolver(CreateUserZod),
    defaultValues: {
      [SignUpFields.NAME]: '',
      [SignUpFields.EMAIL]: '',
      [SignUpFields.PASSWORD]: '',
    }
  });

  return (
    <form
      className="w-full max-w-[320px] mx-auto space-y-6 px-4 sm:px-6 md:px-8"
      onSubmit={handleSubmit(onSignUp)}
    >
      <div>
        <label htmlFor={SignUpFields.NAME} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t(TranslationConstants.AUTH.NAME)}
        </label>
        <div className="mt-1">
          <Input
            id={SignUpFields.NAME}
            type="text"
            autoComplete={SignUpFields.NAME}
            {...register(SignUpFields.NAME)}
            className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
              errors[SignUpFields.NAME] ? 'border-red-500' : ''
            }`}
          />
          {errors[SignUpFields.NAME] && (
            <p className="mt-1 text-sm text-red-500">{t(errors[SignUpFields.NAME]?.message || '')}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={SignUpFields.EMAIL} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t(TranslationConstants.AUTH.EMAIL)}
        </label>
        <div className="mt-1">
          <Input
            id={SignUpFields.EMAIL}
            type="email"
            autoComplete={SignUpFields.EMAIL}
            {...register(SignUpFields.EMAIL)}
            className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
              errors[SignUpFields.EMAIL] ? 'border-red-500' : ''
            }`}
          />
          {errors[SignUpFields.EMAIL] && (
            <p className="mt-1 text-sm text-red-500">{t(errors[SignUpFields.EMAIL]?.message || '')}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={SignUpFields.PASSWORD} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t(TranslationConstants.AUTH.PASSWORD)}
        </label>
        <div className="mt-1">
          <Input
            id={SignUpFields.PASSWORD}
            type="password"
            autoComplete="new-password"
            {...register(SignUpFields.PASSWORD)}
            className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
              errors[SignUpFields.PASSWORD] ? 'border-red-500' : ''
            }`}
          />
          {errors[SignUpFields.PASSWORD] && (
            <p className="mt-1 text-sm text-red-500">{t(errors[SignUpFields.PASSWORD]?.message || '')}</p>
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
            t(TranslationConstants.AUTH.SIGNUP)
          )}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm; 