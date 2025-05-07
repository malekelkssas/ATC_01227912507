import { AppError } from './AppError.js';
import { HTTP_STATUS_CODE } from '@/utils';

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, HTTP_STATUS_CODE.UNAUTHORIZED);
  }
}