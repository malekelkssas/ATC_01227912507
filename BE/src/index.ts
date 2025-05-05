import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { NodeEnv } from './utils/constants/node-env.constants';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { HttpMethod } from './utils/constants';
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();

if (process.env.NODE_ENV === NodeEnv.DEVELOPMENT) {
    app.use(morgan('dev'));
  }

const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(','),
    methods: [HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 1000, // 1 minute
  message: 'Too many requests, please try again later!',
});


app.get('/', (req, res) => {
res.send('This is Quackseat API!');
});

app.listen(port, () => {
console.log(`Express is listening at http://localhost:${port}`);
});