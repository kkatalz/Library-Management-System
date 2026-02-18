import type { Request, Response } from 'express';
import { CreateUserDto } from '../schemas/user.schema';
import { User } from '../types/library';

const USERS: User[] = [
  {
    id: '1',
    name: 'User 1',
    email: 'user1@example.com',
  },
  {
    id: '2',
    name: 'User 2',
    email: 'user2@example.com',
  },
  {
    id: '3',
    name: 'User 3',
    email: 'user3@example.com',
  },
];

type UserParams = { id: string };

export function getUsers(req: Request, res: Response) {
  res.json(USERS);
}

export function getUserById(req: Request<UserParams>, res: Response) {
  const userId = req.params.id.toString();

  const user = USERS.find((user) => user.id === userId);

  if (typeof user === 'undefined') {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(user);
}

export function createUser(req: Request<{}, {}, CreateUserDto>, res: Response) {
  const { name, email } = req.body;

  const user: User = {
    id: (USERS.length + 1).toString(),
    name,
    email,
  };

  USERS.push(user);

  res.status(201).json(user);
}
