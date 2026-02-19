import express from 'express';
import bookRoutes from './books.routes';
import loanRoutes from './loans.routes';
import userRoutes from './users.routes';

const router = express.Router();

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/loans', loanRoutes);

export default router;
