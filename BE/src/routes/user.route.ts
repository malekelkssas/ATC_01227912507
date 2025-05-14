import { Router } from "express";
import { ROUTES } from "../utils";
import { userController } from "../controllers";
import { authenticate } from "@/middlewares";

const userRouter = Router();


userRouter.post(`/${ROUTES.SIGN_IN}`, userController.signIn);
userRouter.post(`/${ROUTES.SIGN_UP}`, userController.signUp);
userRouter.get(`/${ROUTES.ME}`, authenticate, userController.getUser);
userRouter.post(`/${ROUTES.REFRESH_TOKEN}`, userController.refreshToken);
userRouter.post(`/${ROUTES.BOOK_EVENT}/${ROUTES.ID}`, authenticate, userController.addEventToBookedEvents);
userRouter.post(`/${ROUTES.UNBOOK_EVENT}/${ROUTES.ID}`, authenticate, userController.removeEventFromBookedEvents);
userRouter.get(`/${ROUTES.GET_BOOKED_EVENTS}`, authenticate, userController.getBookedEvents);


export { userRouter };
