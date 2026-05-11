import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
export const authorize = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!roles.includes((req as any).user.role)) return res.status(403).json({ error: 'Forbidden' });
  next();
};