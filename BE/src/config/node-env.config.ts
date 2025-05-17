import dotenv from 'dotenv';
import { NODE_ENV } from '@/utils';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/quackseat',
  nodeEnv: process.env.NODE_ENV || NODE_ENV.DEVELOPMENT,
  jwtSecret: process.env.JWT_SECRET || 'The Quack is the best',
  jwtExpiration: process.env.JWT_EXPIRATION || '1d',
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'The Quack is the best',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@admin.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'Admin@123',
};