import { AppError } from './AppError.js';
import { HTTP_STATUS_CODE, MONGOOSE_ERRORS } from '@/utils';

export class DatabaseError extends AppError {
  errorLabelSet?: any;
  errorResponse?: string;
  index?: any;
  code?: any;
  keyPattern?: any;
  keyValue?: any;

  constructor(error: any) {
    super(error.message, HTTP_STATUS_CODE.BAD_REQUEST);
    this.name = error.name || MONGOOSE_ERRORS.DATABASE_ERROR;

    if (error.keyValue) this.keyValue = error.keyValue;
    if (error.errorLabelSet) this.errorLabelSet = error.errorLabelSet;
    if (error.errorResponse) this.errorResponse = error.errorResponse;
    if (error.index) this.index = error.index;
    if (error.code) this.code = error.code;
    if (error.keyPattern) this.keyPattern = error.keyPattern;
  }
}