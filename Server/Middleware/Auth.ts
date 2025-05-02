import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interface to extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
  
  // If no token, return 401 Unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { id: string, email: string };
    
    // Add the user info to the request
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Invalid token
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

// Optional middleware to check if a user is authenticated but allow the request to continue regardless
export const optionalAuthenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    // No token, but we'll let the request continue
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { id: string, email: string };
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    next();
  } catch (error) {
    // Invalid token, but we'll let the request continue
    next();
  }
};