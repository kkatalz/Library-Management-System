import { CreateLoanDto } from '../schemas/loan.schema';
import { BOOKS, saveBooks } from '../storage/books.storage';
import { LOANS, saveLoans } from '../storage/loan.storage';
import { USERS } from '../storage/user.storage';
import { Loan, STATUS } from '../types/loan.type';

export function getAll(): Loan[] {
  return LOANS;
}

export function takeLoan(dto: CreateLoanDto): Loan {
  const user = USERS.find((user) => user.id === dto.userId);
  if (!user) throw new Error('User not found');

  const book = BOOKS.find((book) => book.id === dto.bookId);

  if (!book) throw new Error('Book not found');
  if (!book.available) throw new Error('Book is not available for loan');

  const bookIsLent = LOANS.find(
    (loan) => loan.bookId === dto.bookId && loan.status === STATUS.ACTIVE,
  );

  if (bookIsLent) throw new Error('Book is already lent to this user');

  const loanDate = new Date();

  const loan: Loan = {
    id: (LOANS.length + 1).toString(),
    ...dto,
    loanDate,
    returnDate: null,
    status: STATUS.ACTIVE,
  };

  book.available = false;

  LOANS.push(loan);
  saveLoans();
  saveBooks();

  return loan;
}

export function returnLoan(id: string): Loan {
  const loan = LOANS.find((loan) => loan.id === id);
  if (!loan) throw new Error('Loan not found');

  if (loan.status === STATUS.RETURNED) throw new Error('Loan already returned');

  const returnDate = new Date();
  loan.returnDate = returnDate;

  loan.status = STATUS.RETURNED;

  const book = BOOKS.find((book) => book.id === loan.bookId);
  if (book) book.available = true;

  saveLoans();
  saveBooks();

  return loan;
}
