import { userService } from '@/services';
import { CreateUserDto, CreateUserResponseDto, CreateUserZod, SignInDto, SignInResponseDto, SignInZod } from '@/types';
import { HTTP_STATUS_CODE, TryCatchController } from '@/utils';
import { Request, Response } from 'express';

export class UserController {

    private static userController: UserController;

    static getInstance() {
        if (!UserController.userController) {
            UserController.userController = new UserController();
        }
        return UserController.userController;
    }
    
    @TryCatchController
    async signIn (req: Request, res: Response) {
        const signInData: SignInDto = SignInZod.parse(req.body);
        const response: SignInResponseDto = await userService.signIn(signInData);
        res.status(HTTP_STATUS_CODE.OK).json(response);
    }

    @TryCatchController
    async signUp (req: Request, res: Response) {
        const signUpData: CreateUserDto = CreateUserZod.parse(req.body);
        const response: CreateUserResponseDto = await userService.signUp(signUpData);
        res.status(HTTP_STATUS_CODE.CREATED).json(response);
    }
}
