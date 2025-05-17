import mongoose from 'mongoose';
import { config } from './node-env.config';
import { User } from '@/models';
import { UserRoleEnum } from '@/types';
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        name: 'Admin',
        email: config.adminEmail,
        password: config.adminPassword,
        role: UserRoleEnum.ADMIN,
      });
      console.log('Admin user created');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};