import { CreateUserDto } from '../schemas/user.schema';
import prisma from '../lib/prisma';
import { User } from '../generated/prisma/client';

type UserResponseDto = Omit<User, 'passwordHash'>;

export async function getAll(): Promise<UserResponseDto[]> {
  const users = await prisma.user.findMany();
  // hide passwordHash
  const usersWithoutPasswordHash = users.map(
    ({ passwordHash, ...user }) => user,
  );

  return usersWithoutPasswordHash;
}

export async function getById(id: string): Promise<UserResponseDto> {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) throw new Error('User not found');

  const { passwordHash, ...userWithoutPasswordHash } = user;

  return userWithoutPasswordHash;
}

export async function create(dto: CreateUserDto): Promise<UserResponseDto> {
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
