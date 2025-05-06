import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'supersecret';
const expiration = '2h';

export function signToken(payload: object) {
  return jwt.sign(payload, secret, { expiresIn: expiration });
}

export function authMiddleware(req: any) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (token) {
    try {
      const user = jwt.verify(token, secret);
      req.user = user;
    } catch {
      console.warn('Invalid token');
    }
  }
  return req;
}