import { Request, Response, NextFunction } from 'express';
import { IErrorResponse } from '@/types';
import { ERROR_MESSAGES, HTTP_STATUS_CODE, 
    AppError, DatabaseError, handleMongooseError, 
    NotFoundError, ValidationError,
    handleZodError
 } from '@/utils';
 import { ZodError } from 'zod';
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    let response: IErrorResponse = {
        statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    };

    if (err instanceof ZodError) {
        response = handleZodError(err);
    } else if (err instanceof DatabaseError) {
        response = handleMongooseError(err);
    } else if (err instanceof ValidationError) {
        response.message = Object.values(err.errors)[0];
        response.statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
    } else if (err instanceof NotFoundError) {
        response.message = err.message;
        response.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
    } else if (err instanceof AppError) {
        response.message = err.message;
        response.statusCode = err.statusCode;
    }

    res.status(response.statusCode).json(response.message);
}
