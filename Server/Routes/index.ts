import { Router } from 'express';
import authRoutes from './Routes/API/auth-routes.ts';
import apiRoutes from './API/index.ts';
import { authenticateToken } from '../Middleware/Auth.ts';

const router = Router();

router.use('/auth', authRoutes);

export default router;
