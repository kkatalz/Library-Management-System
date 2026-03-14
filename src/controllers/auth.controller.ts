import type { Request, Response } from 'express';
import { RegisterDTO, LoginDTO } from '../schemas/auth.schema';
import * as AuthService from '../services/auth.service';

export async function register(
  req: Request<{}, {}, RegisterDTO>,
  res: Response,
) {
  await AuthService.register(req.body);
  res.json({ message: 'Registration completed' });
}

export async function login(req: Request<{}, {}, LoginDTO>, res: Response) {
  const data = await AuthService.login(req.body);
  res.json({ data });
}
