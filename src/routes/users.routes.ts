import express from 'express';
import * as UserController from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { createUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.post('/', validate(createUserSchema), UserController.createUser);

export default router;
