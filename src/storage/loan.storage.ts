import { Loan, STATUS } from '../types/loan.type';
import { BOOKS } from './books.storage';
import { USERS } from './user.storage';

export const LOANS: Loan[] = [
  {
    id: '1',
    userId: USERS[0].id,
    bookId: BOOKS[0].id,
    loanDate: new Date('2026-01-01'),
    returnDate: new Date('2026-01-15'),
    status: STATUS.RETURNED,
  },
  {
    id: '2',
    userId: USERS[1].id,
    bookId: BOOKS[1].id,
    loanDate: new Date('2026-02-01'),
    returnDate: null,
    status: STATUS.ACTIVE,
  },
  {
    id: '3',
    userId: USERS[2].id,
    bookId: BOOKS[2].id,
    loanDate: new Date('2026-03-01'),
    returnDate: new Date('2026-03-10'),
    status: STATUS.RETURNED,
  },
];
