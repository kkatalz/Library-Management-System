import express from 'express';
import * as BookController from '../controllers/book.controller';
import { validate } from '../middleware/validate';
import { createBookSchema, replaceBookSchema } from '../schemas/book.schema';

const router = express.Router();

router.get('/', BookController.getBooks);

router.get('/:id', BookController.getBookById);

router.post('/', validate(createBookSchema), BookController.createBook);

router.put('/:id', validate(replaceBookSchema), BookController.replaceBook);

router.delete('/:id', BookController.deleteBook);

export default router;
