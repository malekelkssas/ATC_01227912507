import request from 'supertest';
import { app } from '@/index';
import { ROUTES } from '@/utils';
import { SignInDto, SignInResponseDto } from '@/types';
export const login = async (data: SignInDto): Promise<SignInResponseDto> => {
    const response = await request(app).post(`/${ROUTES.BASE}/${ROUTES.USER}/${ROUTES.SIGN_IN}`).send(data);
    return response.body;
}
