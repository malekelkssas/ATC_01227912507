import { eventService } from "@/services";
import {
  CreateEventDto,
  CreateEventZod,
  IdParamDto,
  IdParamZod,
  PaginationQueryDto,
  PaginationQueryZod,
  UpdateEventDto,
  UpdateEventZod,
} from "@/types";
import { extractLanguage, HTTP_STATUS_CODE, TryCatchController } from "@/utils";
import { Request, Response } from "express";

export class EventController {
    private static eventController: EventController;

    static getInstance() {
        if (!EventController.eventController) {
            EventController.eventController = new EventController();
        }
        return EventController.eventController;
    }

    @TryCatchController
    async createEvent(req: Request, res: Response) {
        const eventData: CreateEventDto = CreateEventZod.parse(req.body);
        const response = await eventService.createEvent(eventData);
        res.status(HTTP_STATUS_CODE.CREATED).json(response);
    }

    @TryCatchController
    async getEvents(req: Request, res: Response) {
        const language = extractLanguage(req);
        const pagination: PaginationQueryDto = PaginationQueryZod.parse(req.query);
        const response = await eventService.getEvents(language, pagination);
        res.status(HTTP_STATUS_CODE.OK).json(response);
    }

    @TryCatchController
    async getEvent(req: Request, res: Response) {
        const id: IdParamDto = IdParamZod.parse(req.params.id);
        const language = extractLanguage(req);
        const response = await eventService.getEvent(id, language);
        res.status(HTTP_STATUS_CODE.OK).json(response);
    }

    @TryCatchController
    async updateEvent(req: Request, res: Response) {
        const id: IdParamDto = IdParamZod.parse(req.params.id);
        const eventData: UpdateEventDto = UpdateEventZod.parse(req.body);
        const response = await eventService.updateEvent(id, eventData);
        res.status(HTTP_STATUS_CODE.OK).json(response);
    }
    
    @TryCatchController
    async deleteEvent(req: Request, res: Response) {
        const id: IdParamDto = IdParamZod.parse(req.params.id);
        await eventService.deleteEvent(id);
        res.status(HTTP_STATUS_CODE.NO_CONTENT).send().end();
    }
    
}