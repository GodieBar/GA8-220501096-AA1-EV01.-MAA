import { Router } from 'express';
import authRoutes from './authRoutes.js';
import productoRoutes from './productoRoutes.js';
import catalogoRoutes from './catalogoRoutes.js';
import fichaRoutes from './fichaRoutes.js';
import inventarioRoutes from './inventarioRoutes.js';

const router = Router();
router.use('/auth', authRoutes);
router.use('/productos', productoRoutes);
router.use('/fichas', fichaRoutes);
router.use('/inventario', inventarioRoutes);
router.use('/', catalogoRoutes); // /api/categorias y /api/marcas
export default router;
