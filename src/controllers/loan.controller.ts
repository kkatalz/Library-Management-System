import type { Request, Response } from 'express';
import { CreateLoanDto } from '../schemas/loan.schema';
import * as LoanService from '../services/loan.service';

export async function getLoans(req: Request, res: Response) {
  res.json({ data: await LoanService.getAll() });
}

export async function createLoan(
  req: Request<{}, {}, CreateLoanDto>,
  res: Response,
) {
  const loan = await LoanService.takeLoan(req.body);
  res.status(201).json({ data: loan });
}

export async function returnLoan(req: Request<{ id: string }>, res: Response) {
  const loan = await LoanService.returnLoan(req.params.id);
  res.json({ data: loan });
}
