import jwt from "jsonwebtoken";
import ms from "ms";
import { IJwtUser } from "@/types";
import { config } from "@/config";
export const generateToken = (user: IJwtUser): string => {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiration as ms.StringValue,
      }
    );
  }