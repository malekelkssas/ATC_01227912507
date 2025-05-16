import { Router } from "express";
import { eventController } from "../controllers";
import { authenticate, authorization, uploadEventImage, optionalAuthenticate } from "@/middlewares";
import { ROUTES } from "@/utils";
import { UserRoleEnum } from "@/types";

const eventRouter = Router();

eventRouter.post("", authenticate, authorization(UserRoleEnum.ADMIN), uploadEventImage, eventController.createEvent);
eventRouter.get("", optionalAuthenticate, eventController.getEvents);
eventRouter.get(`/${ROUTES.ID}`, optionalAuthenticate, eventController.getEvent);
eventRouter.patch(`/${ROUTES.ID}`, authenticate, authorization(UserRoleEnum.ADMIN), uploadEventImage, eventController.updateEvent);
eventRouter.delete(`/${ROUTES.ID}`, authenticate, authorization(UserRoleEnum.ADMIN), eventController.deleteEvent);

export { eventRouter };