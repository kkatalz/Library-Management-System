import type { Request, Response } from 'express';
import { RegisterDTO, LoginDTO } from '../schemas/auth.schema';
import * as AuthService from '../services/auth.service';
import type { User } from '../generated/prisma/client';

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
