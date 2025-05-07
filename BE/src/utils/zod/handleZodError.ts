import { ZodError } from 'zod';
import { HTTP_STATUS_CODE } from '@/utils';
import { IErrorResponse } from "@/types";

export function handleZodError(error: any): IErrorResponse {
  const response: IErrorResponse = {
    statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
    message: error.message,
  };
  if (error instanceof ZodError) {
    const zodError = error as ZodError;
    const firstError = zodError.errors[0];
    const field = firstError.path.join('.');
    response.message = `Validation failed for field: ${field}. Reason: ${firstError.message}`;
  }
  return response;
}