import express from 'express';
import * as UserController from '../controllers/user.controller';
import { auth, adminOnly } from '../middleware/auth';

const router = express.Router();

router.get('/', auth, adminOnly, UserController.getUsers);

router.get('/:id', auth, UserController.getUserById);

export default router;
