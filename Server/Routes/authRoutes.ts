import { Router, Request, Response } from 'express';
import { User } from '../Models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
 
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      res.status(401).json({ message: `Authentication failed` });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ message: 'Authentication failed' });
    }
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
 const router = Router();
 router.post('/login', login);
 export default router;
