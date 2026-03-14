import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import CONFIG from '../config';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    name: string;
    role: string;
  };
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Please provide authorization token' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Please provide correct authorization token' });
  }

  const token = authHeader.slice(7);

  jwt.verify(token, CONFIG.jwtSecret, (err, decoded) => {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Access token is not valid' });
      }

      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Access token is expired' });
      }

      return next(err);
    }

    (req as RequestWithUser).user = decoded as RequestWithUser['user'];
    next();
  });
}

export function adminOnly(req: Request, res: Response, next: NextFunction) {
  const user = (req as RequestWithUser).user;

  if (user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied. Admins only' });
  }

  next();
}
