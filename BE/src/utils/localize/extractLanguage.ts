import { Request } from "express";
import { LanguageEnum } from "@/types";
import { HTTP_HEADERS } from "../constants";

export const extractLanguage = (req: Request): LanguageEnum => {
    const language: LanguageEnum = req.headers[HTTP_HEADERS.ACCEPT_LANGUAGE] as LanguageEnum || LanguageEnum.EN;
    return language;
};

