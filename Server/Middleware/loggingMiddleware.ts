import { Request, Response, NextFunction } from 'express';

// Request logging middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log request details
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  
  // Track response time
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });
  
  next();
};

// GraphQL specific logging middleware
export const graphqlLogger = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.includes('/graphql')) {
    // Only log GraphQL operations if they have a query
    if (req.body && req.body.query) {
      // Extract operation name and type
      const query = req.body.query;
      const operationType = query.includes('mutation') ? 'Mutation' : 'Query';
      
      // Try to get operation name
      const operationMatch = query.match(/(?:query|mutation)\s+(\w+)/);
      const operationName = operationMatch ? operationMatch[1] : 'Anonymous';
      
      console.log(`[GraphQL] ${operationType}: ${operationName}`);
    }
  }
  
  next();
};