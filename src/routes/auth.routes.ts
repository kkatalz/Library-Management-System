import express from 'express';
import * as AuthController from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import passport from '../config/passport';
import { passwordResetRequestSchema } from '../schemas/passwordReset.schema';
import { resetPasswordSchema } from '../schemas/resetPassword.schema';

const router = express.Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);

router.post(
  '/request-password-reset',
  validate(passwordResetRequestSchema),
  AuthController.requestPasswordReset,
);

router.post(
  '/reset-password',
  validate(resetPasswordSchema),
  AuthController.resetPassword,
);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  AuthController.googleCallback,
);

export default router;
