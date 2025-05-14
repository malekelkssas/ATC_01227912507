import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError, ERROR_MESSAGES, decodeToken } from '@/utils';
import { extractToken } from '@/utils';

export const authenticate = async (req: Request, _: Response, next: NextFunction) => {
    try {
        const token = extractToken(req);
        
        const decoded = decodeToken(token);
        req.user = decoded;
        next();
    } catch{
        next(new UnauthorizedError(ERROR_MESSAGES.INVALID_TOKEN));
    }
}