import { Request, Response } from 'express';
import * as BookService from '../services/book.service';
import { CreateBookDto, ReplaceBookDto } from '../schemas/book.schema';

export async function getBooks(req: Request, res: Response) {
  res.json({ data: await BookService.getAll() });
}

export async function getBookById(req: Request<{ id: string }>, res: Response) {
  const book = await BookService.getById(req.params.id);
  res.json({ data: book });
}

export async function createBook(
  req: Request<{}, {}, CreateBookDto>,
  res: Response,
) {
  const book = await BookService.create(req.body);
  res.status(201).json({ data: book });
}

export async function replaceBook(
  req: Request<{ id: string }, {}, ReplaceBookDto>,
  res: Response,
) {
  const book = await BookService.replace(req.params.id, req.body);
  res.json({ data: book });
}

export async function deleteBook(req: Request<{ id: string }>, res: Response) {
  const deleted = await BookService.remove(req.params.id);
  res.json({ data: deleted });
}
