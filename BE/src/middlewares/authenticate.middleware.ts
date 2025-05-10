import { NextFunction, Request, Response } from 'express';
import { IJwtUser } from '@/types';
import { config } from '@/config';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, ERROR_MESSAGES } from '@/utils';
import { extractToken } from '@/utils';

export const authenticate = async (req: Request, _: Response, next: NextFunction) => {
    try {
        const token = extractToken(req);
        
        const decoded = jwt.verify(token, config.jwtSecret) as IJwtUser;
        req.user = decoded;
        next();
    } catch{
        next(new UnauthorizedError(ERROR_MESSAGES.INVALID_TOKEN));
    }
}