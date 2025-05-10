import { AppError } from './AppError';
import { HTTP_STATUS_CODE } from '@/utils';

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, HTTP_STATUS_CODE.FORBIDDEN);
  }
}