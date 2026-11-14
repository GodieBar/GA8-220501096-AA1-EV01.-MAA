import { Router } from 'express';
import { catalogoController as c } from '../controllers/catalogoController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/', verifyToken, c.fichas); // Cualquier usuario autenticado
export default router;
