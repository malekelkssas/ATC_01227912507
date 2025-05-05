import mongoose from 'mongoose';
import { Request } from 'express';

export const commitTransaction = async (req: Request) => {
  const session = req.session as mongoose.ClientSession;
  if (session) {
    await session.commitTransaction();
    session.endSession();
  }
};

export const rollbackTransaction = async (req: Request) => {
  const session = req.session as mongoose.ClientSession;
  if (session) {
    await session.abortTransaction();
    session.endSession();
  }
};