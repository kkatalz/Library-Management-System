import { CreateUserDto } from '../schemas/user.schema';
import prisma from '../lib/prisma';
import { User } from '../generated/prisma/client';

export async function getAll(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function getById(id: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new Error('User not found');

  return user;
}

export async function create(dto: CreateUserDto): Promise<User> {
  const userExists = await prisma.user.findFirst({
    where: { name: dto.name, email: dto.email },
  });

  if (userExists)
    throw new Error('User with this name and email already exists');

  return prisma.user.create({
    data: {
      ...dto,
    },
  });
}
