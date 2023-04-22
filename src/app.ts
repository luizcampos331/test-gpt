import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';

// Dependency Injection
import '@container/index';
import AppError from '@errors/AppError';
import routes from 'routes';

const allowedRequestOrigins = ['http://localhost:3000'];

// Express initialization
const app = express();

// Permission for external connections
app.use((req, res, next) => {
  const originReq = req.headers?.origin;

  if (originReq) {
    if (
      allowedRequestOrigins.includes(originReq) ||
      originReq.includes('.setatue.com')
    ) {
      res.header('Access-Control-Allow-Origin', originReq);
    }
  }

  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
// Visualization of static files
app.use(express.json());
app.use(routes);

// Global exception handling
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // If the error is an instance of the apperror class
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  // End
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app };
