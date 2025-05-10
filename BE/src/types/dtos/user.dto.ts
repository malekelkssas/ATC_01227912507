import { z } from 'zod';
import { UserRoleEnum } from '@/types';


// Create User
export const CreateUserZod = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be less than 32 characters"),
  role: z.literal(UserRoleEnum.USER).default(UserRoleEnum.USER),
});

export type CreateUserDto = z.infer<typeof CreateUserZod>;

export const CreateUserResponseZod = z.object({
  success: z.literal(true),
});

export type CreateUserResponseDto = z.infer<typeof CreateUserResponseZod>;


// Sign In
export const SignInZod = z.object({
  email: z.string({
    required_error: "Email is required",
  }).email("Wrong email"),
  password: z.string({
    required_error: "Password is required",
  }).min(8, "Wrong password").max(32, "Wrong password"),
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
  refreshToken: z.string(),
});

export type RefreshTokenResponseDto = z.infer<typeof RefreshTokenResponseZod>;