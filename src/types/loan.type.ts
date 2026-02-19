export type Loan = {
  id: string;
  userId: string;
  bookId: string;
  loanDate: Date;
  returnDate: Date | null;
  status: STATUS;
};

export enum STATUS {
  ACTIVE = 'ACTIVE',
  RETURNED = 'RETURNED',
}

export type LoanParams = { id: string };
