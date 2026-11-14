import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate, reglasLogin, reglasRegistro } from '../middlewares/validate.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', validate(reglasLogin), asyncHandler(authController.login));
router.post('/register', validate(reglasRegistro), asyncHandler(authController.register));
router.get('/perfil', verifyToken, authController.perfil);

export default router;
