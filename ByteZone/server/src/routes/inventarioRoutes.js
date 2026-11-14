import { Router } from 'express';
import { catalogoController as c } from '../controllers/catalogoController.js';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/', verifyToken, requireRole('admin'), c.resumenInventario);
export default router;
