import { NextFunction, Request, Response } from 'express';
import { IJwtUser } from '@/types';
import { config } from '@/config';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, JWT_CONSTANTS, ERROR_MESSAGES } from '@/utils';


export const authenticate = async (req: Request, _: Response, next: NextFunction) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith(JWT_CONSTANTS.BEARER_PREFIX)) {
          throw new UnauthorizedError(ERROR_MESSAGES.NO_TOKEN_PROVIDED);
        }

        const token = bearerToken.split(" ")[1];
    
        const decoded = jwt.verify(token, config.jwtSecret) as IJwtUser;
        req.user = decoded;
        next();
    } catch{
        next(new UnauthorizedError(ERROR_MESSAGES.INVALID_TOKEN));
    }
}