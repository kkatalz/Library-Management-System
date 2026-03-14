import type { Request, Response } from 'express';
import type { RequestWithUser } from '../middleware/auth';
import * as LoanService from '../services/loan.service';

export async function getLoans(req: Request, res: Response) {
  const user = (req as RequestWithUser).user;

  if (user.role === 'ADMIN') {
    res.json({ data: await LoanService.getAll() });
  } else {
    res.json({ data: await LoanService.getByUserId(user.id) });
  }
}

export async function createLoan(req: Request, res: Response) {
  const user = (req as RequestWithUser).user;

  const loan = await LoanService.takeLoan({
    bookId: req.body.bookId,
    userId: user.id,
  });
  res.status(201).json({ data: loan });
}

export async function returnLoan(req: Request, res: Response) {
  const user = (req as RequestWithUser).user;
  const loan = await LoanService.returnLoan(req.params.id as string, user.id);
  res.json({ data: loan });
}
