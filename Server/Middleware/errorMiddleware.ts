import { Request, Response, NextFunction } from 'express';

// Error interface for typed errors
interface AppError extends Error {
  statusCode?: number;
  errors?: any[];
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default to 500 server error
  const statusCode = err.statusCode || 500;
  
  // Format the error response
  const errorResponse = {
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    errors: err.errors || null
  };
  
  console.error(`[Error] ${req.method} ${req.path}: ${err.message}`);
  
  res.status(statusCode).json(errorResponse);
};

// Not found middleware for handling 404 errors
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as AppError;
  error.statusCode = 404;
  next(error);
};