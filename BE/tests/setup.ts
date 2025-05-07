import { MongoMemoryServer } from 'mongodb-memory-server';
import { afterAll, beforeAll, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import { setupTestData } from '@tests/seeds';

let mongod: MongoMemoryServer;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(uri);
    }
});

beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }

    await setupTestData();
});

afterAll(async () => {
    
    if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
    }

    await mongod.stop();
});