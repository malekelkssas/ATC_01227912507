import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError, ERROR_MESSAGES, decodeToken, HTTP_STATUS_CODE, HTTP_HEADERS } from '@/utils';
import jwt from 'jsonwebtoken';
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

export const optionalAuthenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = extractToken(req);
        
        if (!token) {
            next();
            return;
        }

        try {
            const decoded = decodeToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                next(new UnauthorizedError(ERROR_MESSAGES.TOKEN_EXPIRED));
            }
            next();
        }
    } catch {
        next();
    }
}