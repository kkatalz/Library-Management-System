import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';

import prisma from '../lib/prisma';
import CONFIG from '../config';
import type { RegisterDTO, LoginDTO } from '../schemas/auth.schema';
import type { User } from '../generated/prisma/client';

function generateToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    CONFIG.jwtSecret,
    {
      expiresIn: CONFIG.jwtExpiresIn as StringValue,
    },
  );
}

export async function register(dto: RegisterDTO) {
  const { name, email, password } = dto;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser !== null) {
    throw new Error('Email is already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
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

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}
