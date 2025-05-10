import { JWT_CONSTANTS } from "../constants";
import { ERROR_MESSAGES } from "../constants";
import { UnauthorizedError } from "../error";
import { Request } from "express";

export const extractToken = (req: Request) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith(JWT_CONSTANTS.BEARER_PREFIX)) {
        throw new UnauthorizedError(ERROR_MESSAGES.NO_TOKEN_PROVIDED);
    }
    return bearerToken.split(" ")[1];
}
