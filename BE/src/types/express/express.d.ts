import mongoose from 'mongoose';

declare module 'express-serve-static-core' {
  interface Request {
    session?: mongoose.ClientSession;
  }
}