import type { Request, Response } from 'express';
import type { RequestWithUser } from '../middleware/auth';
import * as UserService from '../services/user.service';

export async function getUsers(req: Request, res: Response) {
  res.json({ data: await UserService.getAll() });
}

export async function getMe(req: Request, res: Response) {
  const user = (req as RequestWithUser).user;
  const result = await UserService.getById(user.id);
  res.json({ data: result });
}

export async function getUserById(req: Request, res: Response) {
  const user = (req as RequestWithUser).user;
  const id = req.params.id as string;

  if (user.role !== 'ADMIN' && user.id !== id) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const result = await UserService.getById(id);
  res.json({ data: result });
}
