import type { Request, Response } from 'express';
import { CreateLoanDto } from '../schemas/loan.schema';
import * as LoanService from '../services/loan.service';
import { LoanParams } from '../types/loan.type';

export function getLoans(req: Request, res: Response) {
  res.json({ data: LoanService.getAll() });
}

export function createLoan(req: Request<{}, {}, CreateLoanDto>, res: Response) {
  const loan = LoanService.takeLoan(req.body);
  res.status(201).json({ data: loan });
}

export function returnLoan(req: Request<LoanParams>, res: Response) {
  const loan = LoanService.returnLoan(req.params.id);
  res.json({ data: loan });
}
