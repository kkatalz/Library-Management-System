import express from 'express';
import * as BookController from '../controllers/bookController';
import { validate } from '../middleware/validate';
import { createBookSchema, replaceBookSchema } from '../schemas/book.schema';

const router = express.Router();
const jsonParser = express.json();

router.get('/', BookController.getBooks);

router.get('/:id', BookController.getBookById);

router.post(
  '/',
  jsonParser,
  validate(createBookSchema),
  BookController.createBook,
);

router.put(
  '/:id',
  jsonParser,
  validate(replaceBookSchema),
  BookController.replaceBook,
);

router.delete('/:id', BookController.deleteBook);

export default router;
