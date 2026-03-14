import { CreateLoanDto } from '../schemas/loan.schema';
import prisma from '../lib/prisma';
import { Loan, LoanStatus } from '../generated/prisma/client';

export async function getAll(): Promise<Loan[]> {
  return prisma.loan.findMany();
}

export async function getByUserId(userId: string): Promise<Loan[]> {
  return prisma.loan.findMany({ where: { userId } });
}

export async function takeLoan(dto: CreateLoanDto & { userId: string }): Promise<Loan> {
  const user = await prisma.user.findUnique({ where: { id: dto.userId } });
  if (!user) throw new Error('User not found');

  const book = await prisma.book.findUnique({ where: { id: dto.bookId } });
  if (!book) throw new Error('Book not found');
  if (!book.available) throw new Error('Book is not available for loan');

  const activeLoan = await prisma.loan.findFirst({
    where: { bookId: dto.bookId, status: LoanStatus.ACTIVE },
  });
  if (activeLoan) throw new Error('Book is already lent to this user');

  await prisma.book.update({
    where: { id: dto.bookId },
    data: { available: false },
  });

  return prisma.loan.create({
    data: {
      userId: dto.userId,
      bookId: dto.bookId,
      status: LoanStatus.ACTIVE,
    },
  });
}

export async function returnLoan(id: string): Promise<Loan> {
  const loan = await prisma.loan.findUnique({ where: { id } });
  if (!loan) throw new Error('Loan not found');

  if (loan.status === LoanStatus.RETURNED)
    throw new Error('Loan already returned');

  await prisma.book.update({
    where: { id: loan.bookId },
    data: { available: true },
  });

  return prisma.loan.update({
    where: { id },
    data: {
      status: LoanStatus.RETURNED,
      returnDate: new Date(),
    },
  });
}
