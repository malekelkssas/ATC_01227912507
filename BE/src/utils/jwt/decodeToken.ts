import jwt from 'jsonwebtoken';
import { config } from '@/config';
import { IJwtUser } from '@/types';

export const decodeToken = (token: string): IJwtUser => {
    return jwt.verify(token, config.jwtSecret) as IJwtUser;
};
