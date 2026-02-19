import type { CreateBookDto, ReplaceBookDto } from '../schemas/book.schema';
import { BOOKS } from '../storage/books.storage';
import { LOANS } from '../storage/loan.storage';
import { Book } from '../types/book.type';
import { STATUS } from '../types/loan.type';

export function getAll(): Book[] {
  return BOOKS;
}

export function getById(id: string): Book {
  const book = BOOKS.find((book) => book.id === id);

  if (!book) throw new Error('Book not found');

  return book;
}

export function create(dto: CreateBookDto): Book {
  const bookExists = BOOKS.some((book) => book.isbn === dto.isbn);

  if (bookExists) throw new Error('Book with this ISBN already exists');

  const book: Book = {
    id: (BOOKS.length + 1).toString(),
    ...dto,
    available: true,
  };

  BOOKS.push(book);

  return book;
}

export function replace(id: string, dto: ReplaceBookDto): Book {
  const bookIndex = BOOKS.findIndex((book) => book.id === id);

  if (bookIndex === -1) throw new Error('Book not found');

  const bookExists = BOOKS.some((book) => book.isbn === dto.isbn);
  if (bookExists) throw new Error('Book with this ISBN already exists');

  BOOKS[bookIndex] = {
    ...BOOKS[bookIndex],
    ...dto,
    available: BOOKS[bookIndex].available,
  };

  return BOOKS[bookIndex];
}

export function remove(id: string): Book {
  const bookIndex = BOOKS.findIndex((book) => book.id === id);

  if (bookIndex === -1) throw new Error('Book not found');

  const bookIsLent = LOANS.some(
    (loan) => loan.bookId === id && loan.status === STATUS.ACTIVE,
  );

  if (bookIsLent) {
    throw new Error(
      'Can not delete this book because it is currently lent out',
    );
  }

  const deletedBook = BOOKS.splice(bookIndex, 1);

  return deletedBook[0];
}
