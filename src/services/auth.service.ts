import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';

import prisma from '../lib/prisma';
import CONFIG from '../config';
import { HttpError } from '../middleware/error';
import type { RegisterDTO, LoginDTO } from '../schemas/auth.schema';
import type { User } from '../generated/prisma/client';
import { PasswordResetRequestDTO } from '../schemas/passwordReset.schema';
import sendMail from '../utils/sendMail';
import { ResetPasswordDTO } from '../schemas/resetPassword.schema';

export function generateToken(user: User) {
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
    throw new HttpError(409, 'Email is already registered');
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
    throw new HttpError(401, 'Email or password is incorrect');
  }
  console.log('USER:', user);

  console.log('PASSWORD hash:', user.passwordHash);
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (isPasswordValid !== true) {
    throw new HttpError(401, 'Email or password is incorrect');
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

export async function requestPasswordReset(dto: PasswordResetRequestDTO) {
  const { email } = dto;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    const resetToken = jwt.sign({ email: user.email }, CONFIG.jwtSecret, {
      expiresIn: '15m',
    });

    try {
      await sendMail({
        to: user.email,
        subject: 'Reset password',
        text: `To reset password please open this link: http://localhost:8080/api/auth/reset-password?token=${resetToken}`,
        html: `<p>To reset password please open this <a href="http://localhost:8080/api/auth/reset-password?token=${resetToken}">link</a></p>`,
      });
      console.log(
        'Email sent successfully to:',
        user.email,
        'From:',
        CONFIG.senderEmail,
      );
    } catch (err) {
      console.error('Failed to send email:', err);
      throw err;
    }
  }

  return;
}

export async function resetPassword(dto: ResetPasswordDTO) {
  const { token, newPassword } = dto;

  jwt.verify(token, CONFIG.jwtSecret, async (err, decoded) => {
    if (err) {
      if (err.name === 'JsonWebTokenError')
        throw new HttpError(400, 'Code is not valid'); // I use 400 because the task says so, but 401 would be more appropriate.

      if (err.name === 'TokenExpiredError')
        throw new HttpError(400, 'Code is expired');

      throw err;
    }

    const email = (decoded as { email: string }).email;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user === null) {
      throw new HttpError(404, 'User not found');
    }

    try {
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await prisma.user.update({
        where: { email },
        data: { passwordHash: hashedPassword },
      });
    } catch (err) {
      console.error('Failed to reset password:', err);
      throw err;
    }
  });
}
