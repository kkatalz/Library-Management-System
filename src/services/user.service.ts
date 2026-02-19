import { CreateUserDto } from '../schemas/user.schema';
import { USERS } from '../storage/user.storage';
import { User } from '../types/user.type';

export function getAll(): User[] {
  return USERS;
}

export function getById(id: string): User {
  const user = USERS.find((user) => user.id === id);

  if (!user) throw new Error('User not found');

  return user;
}

export function create(dto: CreateUserDto): User {
  const userExists = USERS.some(
    (user) => user.name === dto.name && user.email === dto.email,
  );

  if (userExists)
    throw new Error('User with this name and email already exists');

  const user: User = {
    id: (USERS.length + 1).toString(),
    ...dto,
  };

  USERS.push(user);

  return user;
}
