import { getDb } from '../config/db.js';

export const catalogoModel = {
  categorias: () => getDb().prepare('SELECT id, nombre, slug FROM categorias ORDER BY id').all(),
  marcas: () => getDb().prepare('SELECT id, nombre FROM marcas ORDER BY nombre').all(),
  existeCategoria: (id) => !!getDb().prepare('SELECT 1 FROM categorias WHERE id = ?').get(id),
  existeMarca: (id) => !!getDb().prepare('SELECT 1 FROM marcas WHERE id = ?').get(id),
  fichas: () => getDb().prepare('SELECT id, numero, programa, instructor FROM fichas ORDER BY id').all()
};
