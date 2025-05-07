import { AppError } from './AppError';
import { HTTP_STATUS_CODE } from '@/utils';
export class ValidationError extends AppError {
  public readonly errors: Record<string, string>;

  constructor(message: string, errors: Record<string, string>) {
    super(message, HTTP_STATUS_CODE.BAD_REQUEST);
    this.errors = errors;
  }
}