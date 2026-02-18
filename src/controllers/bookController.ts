import type { Request, Response } from 'express';
import type { CreateBookDto, ReplaceBookDto } from '../schemas/book.schema';
import type { Book } from '../types/library';

const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Book 1',
    author: 'Author 1',
    year: 2020,
    isbn: '1234567890',
    available: true,
  },
  {
    id: '2',
    title: 'Book 2',
    author: 'Author 2',
    year: 2021,
    isbn: '0987654321',
    available: false,
  },
  {
    id: '3',
    title: 'Book 3',
    author: 'Author 3',
    year: 2022,
    isbn: '1111111111',
    available: true,
  },
];

type BookParams = {
  id: string;
};

export function getBooks(req: Request, res: Response) {
  res.json(BOOKS);
}

export function getBookById(req: Request<BookParams>, res: Response) {
  const bookId = req.params.id.toString();

  const book = BOOKS.find((book) => book.id === bookId);

  if (typeof book === 'undefined') {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json({ data: book });
}

export function createBook(req: Request<{}, {}, CreateBookDto>, res: Response) {
  const { title, author, year, isbn, available } = req.body;

  const book: Book = {
    id: (BOOKS.length + 1).toString(),
    title,
    author,
    year,
    isbn,
    available,
  };

  BOOKS.push(book);

  res.status(201).json({ data: book });
}

export const replaceBook = (
  req: Request<BookParams, {}, ReplaceBookDto>,
  res: Response,
) => {
  const id = req.params.id;
  const { title, author, year, isbn, available } = req.body;
  const bookIndex = BOOKS.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  BOOKS[bookIndex] = {
    ...BOOKS[bookIndex],
    ...req.body,
  };

  res.json(BOOKS[bookIndex]);
};

export function deleteBook(req: Request<BookParams>, res: Response) {
  const bookId = req.params.id;

  const bookIndex = BOOKS.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = BOOKS.splice(bookIndex, 1);

  res.status(200).json({ data: deletedBook[0] });
}
