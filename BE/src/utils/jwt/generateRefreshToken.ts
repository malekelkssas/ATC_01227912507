import jwt from "jsonwebtoken";
import { config } from "@/config";
import ms from "ms";

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ id: userId }, config.jwtRefreshSecret, {
      expiresIn: config.jwtRefreshExpiration as ms.StringValue,
    });
  }