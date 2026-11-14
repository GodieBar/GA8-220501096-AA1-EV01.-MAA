import { productoModel } from '../models/productoModel.js';
import { catalogoModel } from '../models/catalogoModel.js';
import { AppError } from '../middlewares/AppError.js';

const numeroOpcional = (v) => (v === undefined || v === '' || Number.isNaN(Number(v)) ? undefined : Number(v));

function verificarRelaciones(d) {
  if (d.categoria_id !== undefined && !catalogoModel.existeCategoria(d.categoria_id)) throw new AppError(400, 'La categoría indicada no existe');
  if (d.marca_id !== undefined && !catalogoModel.existeMarca(d.marca_id)) throw new AppError(400, 'La marca indicada no existe');
}

export const productoService = {
  listar(q) {
    return productoModel.listar({
      q: typeof q.q === 'string' ? q.q.trim() : undefined,
      categoria: q.categoria || undefined,
      marca: q.marca || undefined,
      min: numeroOpcional(q.min),
      max: numeroOpcional(q.max),
      orden: q.orden,
      destacado: q.destacado === '1' || q.destacado === 'true',
      enStock: q.enStock === '1' || q.enStock === 'true'
    });
  },
  obtener(id) {
    const p = productoModel.buscarPorId(id);
    if (!p) throw new AppError(404, 'Producto no encontrado');
    return p;
  },
  crear(datos) {
    verificarRelaciones(datos);
    return productoModel.crear(datos);
  },
  actualizar(id, datos) {
    this.obtener(id);
    verificarRelaciones(datos);
    return productoModel.actualizar(id, datos);
  },
  eliminar(id) {
    if (!productoModel.eliminar(id)) throw new AppError(404, 'Producto no encontrado');
  }
};
