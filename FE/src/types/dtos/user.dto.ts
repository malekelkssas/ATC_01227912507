import { z } from 'zod';
import { UserRoleEnum } from '@/types/enums';
import { TranslationConstants } from '@/utils/constants';

// Create User DTOs
export const CreateUserZod = z.object({
  name: z
    .string({
      required_error: TranslationConstants.VALIDATION.REQUIRED.NAME,
    })
    .min(3, TranslationConstants.VALIDATION.NAME.MIN)
    .max(50, TranslationConstants.VALIDATION.NAME.MAX),
  email: z
    .string({
      required_error: TranslationConstants.VALIDATION.REQUIRED.EMAIL,
    })
    .email(TranslationConstants.VALIDATION.EMAIL.INVALID),
  password: z
    .string({
      required_error: TranslationConstants.VALIDATION.REQUIRED.PASSWORD,
    })
    .min(8, TranslationConstants.VALIDATION.PASSWORD.MIN)
    .max(32, TranslationConstants.VALIDATION.PASSWORD.MAX),
  role: z.literal(UserRoleEnum.USER).default(UserRoleEnum.USER),
});

export type CreateUserInputDto = z.input<typeof CreateUserZod>;
export type CreateUserDto = z.output<typeof CreateUserZod>;

export const CreateUserResponseZod = z.object({
  success: z.literal(true),
});

export type CreateUserResponseDto = z.infer<typeof CreateUserResponseZod>;

// Sign In DTOs
export const SignInZod = z.object({
  email: z
    .string({
      required_error: TranslationConstants.VALIDATION.REQUIRED.EMAIL,
    })
    .email(TranslationConstants.VALIDATION.EMAIL.WRONG),
  password: z
    .string({
      required_error: TranslationConstants.VALIDATION.REQUIRED.PASSWORD,
    })
    .min(8, TranslationConstants.VALIDATION.PASSWORD.WRONG)
    .max(32, TranslationConstants.VALIDATION.PASSWORD.WRONG),
}).required();

export type SignInDto = z.infer<typeof SignInZod>;

export const SignInResponseZod = z.object({
  token: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.nativeEnum(UserRoleEnum),
  }),
});

export type SignInResponseDto = z.infer<typeof SignInResponseZod>;

// get user
export const GetUserResponseZod = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.nativeEnum(UserRoleEnum),
  }),
});

export type GetUserResponseDto = z.infer<typeof GetUserResponseZod>;

// refresh token
export const RefreshTokenResponseZod = z.object({
  token: z.string(),
});

export type RefreshTokenResponseDto = z.infer<typeof RefreshTokenResponseZod>;