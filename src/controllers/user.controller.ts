import { Request, Response } from 'express';
import { CreateUserDto } from '../schemas/user.schema';
import * as UserService from '../services/user.service';
import { UserParams } from '../types/user.type';

export function getUsers(req: Request, res: Response) {
  res.json({ data: UserService.getAll() });
}

export function getUserById(req: Request<UserParams>, res: Response) {
  const user = UserService.getById(req.params.id);
  res.json({ data: user });
}

export function createUser(req: Request<{}, {}, CreateUserDto>, res: Response) {
  const user = UserService.create(req.body);
  res.status(201).json({ data: user });
}
