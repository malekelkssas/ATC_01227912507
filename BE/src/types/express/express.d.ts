import mongoose from 'mongoose';
import { IJwtUser } from '@/types';

declare module 'express-serve-static-core' {
  interface Request {
    session?: mongoose.ClientSession;
  }
}

declare module 'express' {
  interface Request {
    user?: IJwtUser;
  }
}