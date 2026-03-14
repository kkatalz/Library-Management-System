import express from 'express';
import * as BookController from '../controllers/book.controller';
import { validate } from '../middleware/validate';
import { auth, adminOnly } from '../middleware/auth';
import { createBookSchema, replaceBookSchema } from '../schemas/book.schema';

const router = express.Router();

router.get('/', BookController.getBooks);

router.get('/:id', BookController.getBookById);

router.post('/', auth, adminOnly, validate(createBookSchema), BookController.createBook);

router.put('/:id', auth, adminOnly, validate(replaceBookSchema), BookController.replaceBook);

router.delete('/:id', auth, adminOnly, BookController.deleteBook);

export default router;
