import type { Request, Response } from 'express';
import { RegisterDTO, LoginDTO } from '../schemas/auth.schema';
import * as AuthService from '../services/auth.service';
import type { User } from '../generated/prisma/client';
import { PasswordResetRequestDTO } from '../schemas/passwordReset.schema';
import { ResetPasswordDTO } from '../schemas/resetPassword.schema';

export async function register(
  req: Request<{}, {}, RegisterDTO>,
  res: Response,
) {
  const data = await AuthService.register(req.body);
  res.status(201).json({ data });
}

export async function login(req: Request<{}, {}, LoginDTO>, res: Response) {
  const data = await AuthService.login(req.body);
  res.json({ data });
}

export function googleCallback(req: Request, res: Response) {
  const user = req.user as User;
  const token = AuthService.generateToken(user);

  res.json({
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
  });
}

export async function requestPasswordReset(
  req: Request<{}, {}, PasswordResetRequestDTO>,
  res: Response,
) {
  await AuthService.requestPasswordReset(req.body);

  res.json({
    message:
      'Якщо вказаний email зареєстрований, лист з інструкціями надіслано.',
  });
}

export async function resetPassword(
  req: Request<{}, {}, ResetPasswordDTO>,
  res: Response,
) {
  await AuthService.resetPassword(req.body);
  res.json({
    message: 'Пароль успішно змінено.',
  });
}
