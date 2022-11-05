import express from 'express';
import { router } from './api/v1';

const app = express();
app.use(express.json());
app.use(router);

export { app };
