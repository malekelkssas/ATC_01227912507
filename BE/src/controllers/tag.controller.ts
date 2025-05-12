import { tagService } from "@/services";
import {
  CreateTagDto,
  CreateTagResponseDto,
  CreateTagZod,
  GetTagsResponseDto,
  IdParamDto,
  IdParamZod,
} from "@/types";
import { extractLanguage, HTTP_STATUS_CODE, TryCatchController } from "@/utils";
import { Request, Response } from "express";

export class TagController {
  private static tagController: TagController;

  static getInstance() {
    if (!TagController.tagController) {
      TagController.tagController = new TagController();
    }
    return TagController.tagController;
  }

  @TryCatchController
  async createTag(req: Request, res: Response) {
    const tagData: CreateTagDto = CreateTagZod.parse(req.body);
    const response: CreateTagResponseDto = await tagService.createTag(tagData);
    res.status(HTTP_STATUS_CODE.CREATED).json(response);
  }

  @TryCatchController
  async getTags(req: Request, res: Response) {
    const language = extractLanguage(req);
    const response = await tagService.getTags(language);
    res.status(HTTP_STATUS_CODE.OK).json(response);
  }

  @TryCatchController
  async getFullTags(req: Request, res: Response) {
    const response = await tagService.getFullTags();
    res.status(HTTP_STATUS_CODE.OK).json(response);
  }

  @TryCatchController
  async deleteTag(req: Request, res: Response) {
    const id: IdParamDto = IdParamZod.parse(req.params.id);
    await tagService.deleteTag(id);
    res.status(HTTP_STATUS_CODE.OK).send().end();
  }
}
