import { ZodError } from 'zod';
import { ValidationError } from '@/utils';

export function handleZodError(error: unknown): never {
  if (error instanceof ZodError) {
    const firstError = error.errors[0];
    const field = firstError.path.join('.');
    throw new ValidationError(
      `Validation failed for field: ${field}. Reason: ${firstError.message}`,
      {
        [field]: firstError.message,
      }
    );
  }
  throw error;
}