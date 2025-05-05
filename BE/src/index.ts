import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { NodeEnv } from './utils/constants/node-env.constants';

dotenv.config();
const app = express();

if (process.env.NODE_ENV === NodeEnv.DEVELOPMENT) {
    app.use(morgan('dev'));
  }

const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.get('/', (req, res) => {
res.send('This is Quackseat API!');
});

app.listen(port, () => {
console.log(`Express is listening at http://localhost:${port}`);
});