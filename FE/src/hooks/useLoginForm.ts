import { useState } from 'react';
import { UserService } from '@/api/services/user.service';
import { type SignInDto, type SignInResponseDto, SignInZod } from '@/types/dtos';
import { z } from 'zod';
import type { ErrorResponse } from '@/types';
import { useToast } from './use-toast';
import { ToastVariantsConstants, TranslationConstants } from '@/utils/constants';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/store';
import { setAuth } from '@/store/slices';

export const useLoginForm = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignInDto, string>>>({});
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const validateForm = (data: SignInDto) => {
    try {
      SignInZod.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof SignInDto, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof SignInDto] = t(err.message);
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (data: SignInDto) => {
    if (!validateForm(data)) return;

    setIsLoading(true);
    try {
      const response = await UserService.signIn(data);
      const responseData = response as SignInResponseDto;
      dispatch(setAuth(responseData));
      onSuccess();
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      toast({
        title: t(TranslationConstants.COMMON.MESSAGES.ERROR),
        description: errorResponse.response?.data?.message || t(TranslationConstants.AUTH.LOGIN_FAILED),
        variant: ToastVariantsConstants.ERROR,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errors,
    handleSubmit,
  };
}; 