import express from 'express';
import * as UserController from '../controllers/user.controller';
import { auth, adminOnly } from '../middleware/auth';
import { uploadAvatar } from '../middleware/upload';

const router = express.Router();

router.get('/', auth, adminOnly, UserController.getUsers);

router.get('/me', auth, UserController.getMe);

router.get('/:id', auth, adminOnly, UserController.getUserById);

router.post(
  '/me/avatar',
  auth,
  uploadAvatar.single('avatar'),
  UserController.uploadAvatar,
);

router.delete('/me/avatar', auth, UserController.deleteAvatar);

export default router;
