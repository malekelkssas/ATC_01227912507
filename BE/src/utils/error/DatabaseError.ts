import { AppError } from './AppError.js';
import { HTTP_STATUS_CODE, MONGOOSE_ERRORS } from '@/utils';

export class DatabaseError extends AppError {
  keyValue?: any;
  path?: string;
  value?: any;
  errors?: any;

  constructor(error: any) {
    super(error.message, HTTP_STATUS_CODE.BAD_REQUEST);
    this.name = error.name || MONGOOSE_ERRORS.DATABASE_ERROR;

    if (error.keyValue) this.keyValue = error.keyValue;
    if (error.path) this.path = error.path;
    if (error.value) this.value = error.value;
    if (error.errors) this.errors = error.errors;
  }
}