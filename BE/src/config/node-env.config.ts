import dotenv from 'dotenv';
import { NodeEnv } from '@/utils';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/quackseat',
  jwtSecret: process.env.JWT_SECRET || 'The Quack is the best',
  nodeEnv: process.env.NODE_ENV || NodeEnv.DEVELOPMENT,
};