import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from 'express-mongo-sanitize';
import { HTTP_HEADERS, HttpMethod, NODE_ENV, ROUTES, UPLOAD_IMAGES_CONSTANTS } from "@/utils";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config";
import { errorHandler, transactionMiddleware } from "./middlewares";
import { userRouter, tagRouter, eventRouter } from "./routes";
import path from 'path';

dotenv.config();
const app = express();

if (process.env.NODE_ENV === NODE_ENV.DEVELOPMENT) {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: "10kb" }));

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(","),
    methods: [
      HttpMethod.GET,
      HttpMethod.POST,
      HttpMethod.PATCH,
      HttpMethod.DELETE,
    ],
    allowedHeaders: [HTTP_HEADERS.CONTENT_TYPE, HTTP_HEADERS.AUTHORIZATION, HTTP_HEADERS.ACCEPT_LANGUAGE],
    credentials: true,
  })
);

app.use(UPLOAD_IMAGES_CONSTANTS.BASE_PATH, express.static(path.join(__dirname, `..${UPLOAD_IMAGES_CONSTANTS.BASE_PATH}`)));

/**
 * @Error: express-mongo-sanitize is not working with query params -> TypeError: Cannot set property query of #<IncomingMessage> which has only a getter
 * @Solution: is to use this custom middleware to make the query property writable
 * REF: https://stackoverflow.com/questions/79597051/express-v5-is-there-any-way-to-modify-req-query
 */
app.use((req, _, next) => {
  Object.defineProperty(req, 'query', 
    { ...Object.getOwnPropertyDescriptor(req, 'query'), 
      value: req.query, writable: true });
  next();
});

app.use(mongoSanitize({
  allowDots: true,
  replaceWith: "_",
  onSanitize: ({ req, key }) => {
    console.warn(`This request[${key}] is sanitized`, req);
  },
}));

const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 1000, // 1 minute
  message: "Too many requests, please try again later!",
});
app.use(limiter);
app.use(transactionMiddleware);

if (process.env.NODE_ENV !== NODE_ENV.TEST) {
    connectDB();
}

app.use(`/${ROUTES.BASE}/${ROUTES.USER}`, userRouter);
app.use(`/${ROUTES.BASE}/${ROUTES.TAGS}`, tagRouter);
app.use(`/${ROUTES.BASE}/${ROUTES.EVENTS}`, eventRouter);
app.get(`/${ROUTES.BASE}/${ROUTES.HEALTH_CHECK}`, (_, res) => {
  res.send("Quack 100% good!");
});


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

export { app };