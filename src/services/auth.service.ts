import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';

import prisma from '../lib/prisma';
import CONFIG from '../config';
import type { RegisterDTO, LoginDTO } from '../schemas/auth.schema';

export async function register(dto: RegisterDTO) {
  const { name, email, password } = dto;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser !== null) {
    throw new Error('Email is already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });
}

export async function login(dto: LoginDTO) {
  const { email, password } = dto;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user === null) {
    throw new Error('Email or password is incorrect');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (isPasswordValid !== true) {
    throw new Error('Email or password is incorrect');
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role,
    },
    CONFIG.jwtSecret,
    {
      expiresIn: CONFIG.jwtExpiresIn as StringValue,
    },
  );

  return {
    accessToken: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
