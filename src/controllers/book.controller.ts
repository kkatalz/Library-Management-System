import { Request, Response } from 'express';
import * as BookService from '../services/book.service';
import { CreateBookDto, ReplaceBookDto } from '../schemas/book.schema';
import { BookParams } from '../types/book.type';

export function getBooks(req: Request, res: Response) {
  res.json({ data: BookService.getAll() });
}

export function getBookById(req: Request<BookParams>, res: Response) {
  const book = BookService.getById(req.params.id);
  res.json({ data: book });
}

export function createBook(req: Request<{}, {}, CreateBookDto>, res: Response) {
  const book = BookService.create(req.body);
  res.status(201).json({ data: book });
}

export function replaceBook(
  req: Request<BookParams, {}, ReplaceBookDto>,
  res: Response,
) {
  const book = BookService.replace(req.params.id, req.body);
  res.json({ data: book });
}

export function deleteBook(req: Request<BookParams>, res: Response) {
  const deleted = BookService.remove(req.params.id);
  res.json({ data: deleted });
}
