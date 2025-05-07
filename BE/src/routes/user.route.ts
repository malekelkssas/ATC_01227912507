import { Router } from "express";
import { ROUTES } from "../utils";
import { userController } from "../controllers";

const userRouter = Router();


userRouter.post(`/${ROUTES.SIGN_IN}`, userController.signIn);
userRouter.post(`/${ROUTES.SIGN_UP}`, userController.signUp);

export { userRouter };
