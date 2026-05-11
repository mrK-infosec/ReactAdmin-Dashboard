import { Router } from 'express';
import * as authController from './auth.controller.js';
import * as authValidation from './auth.validation.js';
import { validate } from '../../core/middlewares/validate.js';
import { protect } from '../../../middleware/authMiddleware.js';

const router = Router();

router.post('/register', validate(authValidation.registerSchema), authController.register);
router.post('/login', validate(authValidation.loginSchema), authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/me', protect, authController.getMe);

export default router;
