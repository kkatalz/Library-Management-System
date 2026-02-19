import express from 'express';
import * as LoanController from '../controllers/loan.controller';
import { validate } from '../middleware/validate';
import { createLoanSchema } from '../schemas/loan.schema';

const router = express.Router();

router.get('/', LoanController.getLoans);

router.post('/', validate(createLoanSchema), LoanController.createLoan);

router.post('/:id/return', LoanController.returnLoan);

export default router;
