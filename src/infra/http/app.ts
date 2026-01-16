import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { router } from './api/v1';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, '../../../static')));

// API routes
app.use('/api/v1', router);

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../static/index.html'));
});

export { app };
