import { User } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

// If you're storing JWT payloads with the request object:
export interface UserPayload {
  _id: string;
  email: string;
}

// Optional: Declare types for any custom environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    JWT_SECRET: string;
    OPENAI_API_KEY: string;
    NODE_ENV: 'development' | 'production';
    PORT?: string;
  }
} 