import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { TranslationConstants } from '@/utils/constants';
import Logo from '@/components/shared/Logo';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Redirect if already logged in
  // useEffect(() => {
  // }, []);

  // TODO: Handle submit
  const handleSubmit = async (e: React.FormEvent) => {}


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

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-duck-brown/5 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-duck-yellow/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {t(TranslationConstants.AUTH.EMAIL)}
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow"
                  />
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="border-duck-yellow/20 focus:border-duck-yellow focus:ring-duck-yellow"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-duck-yellow hover:bg-duck-yellow/80 text-duck-brown font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? t(TranslationConstants.COMMON.LOADING) : t(TranslationConstants.AUTH.LOGIN)}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;