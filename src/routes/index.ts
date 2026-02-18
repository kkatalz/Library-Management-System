import express from 'express';

import bookRoutes from './books';

const router = express.Router();

router.use('/books', bookRoutes);
// router.use("/users", userRoutes);
// router.use("/loans", loanRoutes);

export default router;
