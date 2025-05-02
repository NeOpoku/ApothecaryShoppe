import { Router } from 'express';
import authRoutes from './Routes/API/auth-routes.ts';
import apiRoutes from './API/index.js';
import { authenticateToken } from '../Middleware/Auth.ts';

const router = Router();

router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes
router.use('/api', apiRoutes);

export default router;
