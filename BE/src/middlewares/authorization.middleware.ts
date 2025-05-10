import { NextFunction, Request, Response } from 'express';
import { IJwtUser, UserRoleEnum } from '@/types';
import { UnauthorizedError, ERROR_MESSAGES, ForbiddenError } from '@/utils';


export const authorization = (...roles: UserRoleEnum[]) => {
    return (req: Request, _: Response, next: NextFunction) => {
        const user = req.user as IJwtUser;
        if(!user) {
            return next(new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED));
        }
        if (!roles.includes(user.role)) {
            return next(new ForbiddenError(ERROR_MESSAGES.FORBIDDEN));
        }
        next();
    }
}