import request from 'supertest';
import { app } from '@/index';
import { ROUTES } from '@/utils';
import { SignInResponseDto } from '@/types';
export const login = async (email: string, password: string): Promise<SignInResponseDto> => {
    const response = await request(app).post(`${ROUTES.BASE}/${ROUTES.USER}/${ROUTES.SIGN_IN}`).send({ email, password });
    return response.body;
}
