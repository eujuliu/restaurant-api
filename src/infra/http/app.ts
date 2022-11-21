import cookieParser from 'cookie-parser';
import express from 'express';
import { router } from './api/v1';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/v1', router);

export { app };
