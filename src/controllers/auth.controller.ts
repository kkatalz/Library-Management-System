import type { Request, Response } from 'express';
import { RegisterDTO, LoginDTO } from '../schemas/auth.schema';
import * as AuthService from '../services/auth.service';

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
