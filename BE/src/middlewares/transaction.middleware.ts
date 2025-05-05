import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const transactionMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  mongoose.startSession().then((session) => {
    session.startTransaction();
    req.session = session;
    next();
  });
};