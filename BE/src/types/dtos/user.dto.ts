import { z } from 'zod';
import { UserRoleEnum } from '@/types';


// Create User
export const CreateUserZod = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be less than 32 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  role: z.literal(UserRoleEnum.USER).default(UserRoleEnum.USER),
});

export type CreateUserDto = z.infer<typeof CreateUserZod>;

export const CreateUserResponseZod = z.object({
  success: z.literal(true),
});

export type CreateUserResponseDto = z.infer<typeof CreateUserResponseZod>;


// Sign In
export const SignInZod = z.object({
  email: z.string().email("Wrong email"),
  password: z.string().min(8, "Wrong password").max(32, "Wrong password"),
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
