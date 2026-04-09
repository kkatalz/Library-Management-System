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


export async function uploadAvatar(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const user = (req as RequestWithUser).user;
  const { avatarUrl } = await UserService.updateAvatar(user.id, req.file.filename);

  res.json({ message: 'Аватарку успішно оновлено.', avatarUrl });
}

export async function deleteAvatar(req: Request, res: Response) {
  const user = (req as RequestWithUser).user;
  await UserService.deleteAvatar(user.id);
  res.json({ message: 'Аватарку видалено.' });
}