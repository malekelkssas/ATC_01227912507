import { z } from 'zod';
import { UserRoleEnum } from '@/types';
import { VALIDATION_MESSAGES } from '@/utils/constants';


// Create User
export const CreateUserZod = z.object({
  name: z
    .string({
      required_error: VALIDATION_MESSAGES.USER.NAME.REQUIRED,
    })
    .min(3, VALIDATION_MESSAGES.USER.NAME.MIN_LENGTH)
    .max(50, VALIDATION_MESSAGES.USER.NAME.MAX_LENGTH),
  email: z
    .string({
      required_error: VALIDATION_MESSAGES.USER.EMAIL.REQUIRED,
    })
    .email(VALIDATION_MESSAGES.USER.EMAIL.INVALID),
  password: z
    .string({
      required_error: VALIDATION_MESSAGES.USER.PASSWORD.REQUIRED,
    })
    .min(8, VALIDATION_MESSAGES.USER.PASSWORD.MIN_LENGTH)
    .max(32, VALIDATION_MESSAGES.USER.PASSWORD.MAX_LENGTH),
  role: z.literal(UserRoleEnum.USER).default(UserRoleEnum.USER),
});

export type CreateUserDto = z.infer<typeof CreateUserZod>;

export const CreateUserResponseZod = z.object({
  success: z.literal(true),
});

export type CreateUserResponseDto = z.infer<typeof CreateUserResponseZod>;


// Sign In
export const SignInZod = z.object({
  email: z
    .string({
      required_error: VALIDATION_MESSAGES.USER.EMAIL.REQUIRED,
    })
    .email(VALIDATION_MESSAGES.USER.EMAIL.WRONG),
  password: z
    .string({
      required_error: VALIDATION_MESSAGES.USER.PASSWORD.REQUIRED,
    })
    .min(8, VALIDATION_MESSAGES.USER.PASSWORD.WRONG)
    .max(32, VALIDATION_MESSAGES.USER.PASSWORD.WRONG),
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