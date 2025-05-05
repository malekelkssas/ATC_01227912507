import { AppError } from './AppError.js';
import { HTTP_STATUS_CODE } from '../constants/http-status-code.constants.js';
export class ValidationError extends AppError {
  public readonly errors: Record<string, string>;

  constructor(message: string, errors: Record<string, string>) {
    super(message, HTTP_STATUS_CODE.BAD_REQUEST);
    this.errors = errors;
  }
}