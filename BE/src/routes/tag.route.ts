import { Router } from "express";
import { tagController } from "../controllers";
import { authenticate, authorization } from "@/middlewares";
import { ROUTES } from "@/utils";
import { UserRoleEnum } from "@/types";

const tagRouter = Router();

tagRouter.post("", authenticate, authorization(UserRoleEnum.ADMIN), tagController.createTag);
tagRouter.get("", tagController.getTags);
tagRouter.delete(`/${ROUTES.ID}`, authenticate, authorization(UserRoleEnum.ADMIN), tagController.deleteTag);

export { tagRouter };