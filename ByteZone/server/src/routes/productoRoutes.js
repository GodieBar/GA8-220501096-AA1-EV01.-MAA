import { Router } from 'express';
import { productoController as c } from '../controllers/productoController.js';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';
import { validate, validarId, reglasProducto } from '../middlewares/validate.js';

const router = Router();
const soloAdmin = [verifyToken, requireRole('admin')];

// Públicas
router.get('/', c.listar);
router.get('/:id', validarId, c.obtener);
// Protegidas (token válido + rol admin)
router.post('/', ...soloAdmin, validate(reglasProducto(false)), c.crear);
router.put('/:id', ...soloAdmin, validarId, validate(reglasProducto(true)), c.actualizar);
router.delete('/:id', ...soloAdmin, validarId, c.eliminar);

export default router;
