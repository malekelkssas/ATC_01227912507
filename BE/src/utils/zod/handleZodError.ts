import { ZodError } from 'zod';
import { HTTP_STATUS_CODE } from '@/utils';
import { IErrorResponse } from "@/types";

export function handleZodError(error: ZodError): IErrorResponse {
  const zodError = error as ZodError;
  const firstError = zodError.errors[0];
  const field = firstError.path.join('.');
  return {
    statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
    message: `Validation failed for field: ${field}. Reason: ${firstError.message}`,
  };
}