import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import GraphQL schema and resolvers
import { typeDefs } from './Schema/typeDefs.js';
import { resolvers } from './Schema/Resolvers.js';

// Import middleware
import { optionalAuthenticateToken } from './Middleware/Auth.js';

// Load environment variables
dotenv.config();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/apothecaryshoppe';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Set up middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes - do this after the middleware setup to avoid circular dependencies
import herbRoutes from './Routes/herbRoutes.js';
// Only import routes that exist and are properly set up
// import userRoutes from './Routes/userRoutes.js';
// import authRoutes from './Routes/auth-routes.js';

// API routes
app.use('/api/herbs', optionalAuthenticateToken, herbRoutes);
// Only use routes that exist and are properly set up
// app.use('/api/users', authenticateToken, userRoutes);
// app.use('/auth', authRoutes);

// Health check endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Set up Apollo Server (GraphQL)
const startApolloServer = async () => {
  // Connect to database
  await connectDB();
  
  // Create Apollo Server instance with explicit typeDefs and resolvers
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    // Add the request to the GraphQL context
    context: ({ req }) => ({ req }),
    // Enable introspection and playground in all environments for development
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    //playground: true,
  });

  // Start the Apollo server
  await apolloServer.start();
  
  // Apply Apollo middleware to Express
  apolloServer.applyMiddleware({ app: app as express.Application });
  
  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    // Any route that isn't API or GraphQL will be redirected to the frontend
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
  }
  
  // Start server
  app.listen(PORT, () => {
    console.log(`🌿 ApothecaryShop server running on port ${PORT}`);
    console.log(`🚀 GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
};

// Start the server
startApolloServer().catch((err) => {
  console.error('Failed to start server:', err);
});