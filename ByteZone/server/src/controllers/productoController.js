import { productoService } from '../services/productoService.js';

export const productoController = {
  listar(req, res) {
    const productos = productoService.listar(req.query);
    res.json({ total: productos.length, productos });
  },
  obtener(req, res) {
    res.json({ producto: productoService.obtener(req.params.id) });
  },
  crear(req, res) {
    res.status(201).json({ mensaje: 'Producto creado correctamente', producto: productoService.crear(req.body) });
  },
  actualizar(req, res) {
    res.json({ mensaje: 'Producto actualizado correctamente', producto: productoService.actualizar(req.params.id, req.body) });
  },
  eliminar(req, res) {
    productoService.eliminar(req.params.id);
    res.json({ mensaje: 'Producto eliminado correctamente' });
  }
};
