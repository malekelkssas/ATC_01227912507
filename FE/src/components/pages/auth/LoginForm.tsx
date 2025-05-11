import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TranslationConstants } from '@/utils/constants';
import { useLoginForm } from '@/hooks/useLoginForm';
import { Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { isLoading, errors, handleSubmit } = useLoginForm(onSuccess);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit({ email, password });
  };

  return (
    <form className="w-full max-w-[320px] mx-auto space-y-6 px-4 sm:px-6 md:px-8" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t(TranslationConstants.AUTH.EMAIL)}
        </label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t(TranslationConstants.AUTH.PASSWORD)}
        </label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow ${
              errors.password ? 'border-red-500' : ''
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
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
