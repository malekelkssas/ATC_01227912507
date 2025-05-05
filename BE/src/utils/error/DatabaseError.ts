import { AppError } from './AppError.js';
import { HTTP_STATUS_CODE } from '../constants/http-status-code.constants.js';

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    this.name = 'DatabaseError';
  }
}