import { userService } from '@/services';
import { CreateUserDto, CreateUserResponseDto, CreateUserZod, 
    IdParamDto, IdParamZod, IJwtUser, LanguageEnum, PaginationQueryDto,
     PaginationQueryZod, SignInDto, SignInResponseDto, SignInZod } from '@/types';
import { extractLanguage, extractToken, HTTP_STATUS_CODE, TryCatchController } from '@/utils';
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

    @TryCatchController
    async getUser (req: Request, res: Response) {
        const user = req.user as IJwtUser;
        const response = await userService.getUser(user.id);
        res.status(HTTP_STATUS_CODE.OK).json(response);
    }

    @TryCatchController
    async refreshToken (req: Request, res: Response) {
        const token = extractToken(req);
        const response = await userService.refreshToken(token);
        res.status(HTTP_STATUS_CODE.OK).json(response);
    }

    @TryCatchController
    async addEventToBookedEvents(req: Request, res: Response) {
        const user: IJwtUser = req.user as IJwtUser;
        const eventId: IdParamDto = IdParamZod.parse(req.params.id);
        await userService.addEventToBookedEvents(user.id, eventId);
        res.status(HTTP_STATUS_CODE.NO_CONTENT).send();
    }

    @TryCatchController
    async removeEventFromBookedEvents(req: Request, res: Response) {
        const user: IJwtUser = req.user as IJwtUser;
        const eventId: IdParamDto = IdParamZod.parse(req.params.id);
        await userService.removeEventFromBookedEvents(user.id, eventId);
        res.status(HTTP_STATUS_CODE.NO_CONTENT).send();
    }

    @TryCatchController
    async getBookedEvents(req: Request, res: Response) {
        const language: LanguageEnum = extractLanguage(req);
        const user: IJwtUser = req.user as IJwtUser;
        const pagination: PaginationQueryDto = PaginationQueryZod.parse(req.query);
        const response = await userService.getBookedEvents(user.id, language, pagination);
        res.status(HTTP_STATUS_CODE.OK).json(response);
    }
}