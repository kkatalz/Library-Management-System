import fs from 'fs';
import path from 'path';
import { CreateUserDto } from '../schemas/user.schema';
import prisma from '../lib/prisma';
import { User } from '../generated/prisma/client';
import { HttpError } from '../middleware/error';

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

  if (!user) throw new HttpError(404, 'User not found');

  const { passwordHash, ...userWithoutPasswordHash } = user;

  return userWithoutPasswordHash;
}

export async function create(dto: CreateUserDto): Promise<UserResponseDto> {
  const userExists = await prisma.user.findFirst({
    where: { name: dto.name, email: dto.email },
  });

  if (userExists)
    throw new HttpError(409, 'User with this name and email already exists');

  return prisma.user.create({
    data: {
      ...dto,
    },
  });
}

function deleteFileIfExists(filePath: string) {
  try {
    fs.unlinkSync(filePath);
  } catch {
    // file may not exist, ignore
  }
}

export async function updateAvatar(
  userId: string,
  filename: string,
): Promise<{ avatarUrl: string }> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new HttpError(404, 'User not found');

  // Delete old avatar file if exists
  if (user.avatarUrl) {
    const oldPath = path.join(process.cwd(), user.avatarUrl);
    deleteFileIfExists(oldPath);
  }

  const avatarUrl = `/uploads/avatars/${filename}`;

  await prisma.user.update({
    where: { id: userId },
    data: { avatarUrl }, 
  });

  return { avatarUrl };
}

export async function deleteAvatar(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new HttpError(404, 'User not found');

  if (!user.avatarUrl) {
    throw new HttpError(404, 'No avatar to delete');
  }

  const filePath = path.join(process.cwd(), user.avatarUrl);
  deleteFileIfExists(filePath);

  await prisma.user.update({
    where: { id: userId },
    data: { avatarUrl: null },
  });
}
