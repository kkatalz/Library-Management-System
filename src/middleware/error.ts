import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  next(new HttpError(404, `Route ${req.method} ${req.originalUrl} not found`));
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof multer.MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'File too large. Maximum size is 5 MB'
        : err.message;
    return res.status(400).json({ error: message });
  }

  const statusCode = err instanceof HttpError ? err.statusCode : 400;
  res.status(statusCode).json({ error: err.message });
}
