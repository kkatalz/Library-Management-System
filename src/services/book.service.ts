import type { CreateBookDto, ReplaceBookDto } from '../schemas/book.schema';
import prisma from '../lib/prisma';
import { Book, LoanStatus } from '../generated/prisma/client';

export async function getAll(): Promise<Book[]> {
  return prisma.book.findMany();
}

export async function getById(id: string): Promise<Book> {
  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) throw new Error('Book not found');

  return book;
}

export async function create(dto: CreateBookDto): Promise<Book> {
  const bookExists = await prisma.book.findUnique({
    where: { isbn: dto.isbn },
  });

  if (bookExists) throw new Error('Book with this ISBN already exists');

  return prisma.book.create({
    data: {
      ...dto,
      available: true,
    },
  });
}

export async function replace(id: string, dto: ReplaceBookDto): Promise<Book> {
  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) throw new Error('Book not found');

  const duplicate = await prisma.book.findUnique({ where: { isbn: dto.isbn } });
  if (duplicate && duplicate.id !== id) {
    throw new Error('Book with this ISBN already exists');
  }

  return prisma.book.update({
    where: { id },
    data: {
      title: dto.title,
      author: dto.author,
      year: dto.year,
      isbn: dto.isbn,
    },
  });
}

export async function remove(id: string): Promise<Book> {
  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) throw new Error('Book not found');

  const activeLoan = await prisma.loan.findFirst({
    where: { bookId: id, status: LoanStatus.ACTIVE },
  });

  if (activeLoan) {
    throw new Error(
      'Can not delete this book because it is currently lent out',
    );
  }

  return prisma.book.delete({ where: { id } });
}
