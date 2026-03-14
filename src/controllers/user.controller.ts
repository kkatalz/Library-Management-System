import { Request, Response } from 'express';
import { CreateUserDto } from '../schemas/user.schema';
import * as UserService from '../services/user.service';

export async function getUsers(req: Request, res: Response) {
  res.json({ data: await UserService.getAll() });
}

export async function getUserById(req: Request<{ id: string }>, res: Response) {
  const user = await UserService.getById(req.params.id);
  res.json({ data: user });
}

export async function createUser(
  req: Request<{}, {}, CreateUserDto>,
  res: Response,
) {
  const user = await UserService.create(req.body);
  res.status(201).json({ data: user });
}
