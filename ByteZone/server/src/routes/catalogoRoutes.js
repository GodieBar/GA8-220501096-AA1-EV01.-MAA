import { Router } from 'express';
import { catalogoController as c } from '../controllers/catalogoController.js';

const router = Router();
router.get('/categorias', c.categorias);
router.get('/marcas', c.marcas);
export default router;
