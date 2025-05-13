import { Router } from "express";
import { eventController } from "../controllers";
import { authenticate, authorization } from "@/middlewares";
import { ROUTES } from "@/utils";
import { UserRoleEnum } from "@/types";

const eventRouter = Router();

eventRouter.post("", authenticate, authorization(UserRoleEnum.ADMIN), eventController.createEvent);
eventRouter.get("", eventController.getEvents);
eventRouter.get(`/${ROUTES.ID}`, eventController.getEvent);
eventRouter.patch(`/${ROUTES.ID}`, authenticate, authorization(UserRoleEnum.ADMIN), eventController.updateEvent);
eventRouter.delete(`/${ROUTES.ID}`, authenticate, authorization(UserRoleEnum.ADMIN), eventController.deleteEvent);

export { eventRouter };