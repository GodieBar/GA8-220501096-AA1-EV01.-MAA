import { getDb } from '../config/db.js';

export const STOCK_BAJO = 5;

const BASE = `
  SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, p.imagen, p.destacado,
         p.categoria_id, c.nombre AS categoria, c.slug AS categoria_slug,
         p.marca_id, m.nombre AS marca, p.creado_en, p.actualizado_en
  FROM productos p
  JOIN categorias c ON c.id = p.categoria_id
  JOIN marcas m ON m.id = p.marca_id`;

const mapear = (fila) => (fila ? { ...fila, destacado: fila.destacado === 1 } : fila);

const ORDEN = {
  recientes: 'p.id DESC',
  precio_asc: 'p.precio ASC',
  precio_desc: 'p.precio DESC',
  nombre: 'p.nombre COLLATE NOCASE ASC'
};

export const productoModel = {
  listar(f = {}) {
    const donde = [];
    const params = [];
    if (f.q) {
      donde.push('(p.nombre LIKE ? OR p.descripcion LIKE ? OR m.nombre LIKE ?)');
      params.push(`%${f.q}%`, `%${f.q}%`, `%${f.q}%`);
    }
    if (f.categoria) { donde.push('c.slug = ?'); params.push(f.categoria); }
    if (f.marca) { donde.push('m.nombre = ? COLLATE NOCASE'); params.push(f.marca); }
    if (f.min !== undefined) { donde.push('p.precio >= ?'); params.push(f.min); }
    if (f.max !== undefined) { donde.push('p.precio <= ?'); params.push(f.max); }
    if (f.destacado) donde.push('p.destacado = 1');
    if (f.enStock) donde.push('p.stock > 0');
    const sql = `${BASE} ${donde.length ? 'WHERE ' + donde.join(' AND ') : ''} ORDER BY ${ORDEN[f.orden] || ORDEN.recientes}`;
    return getDb().prepare(sql).all(...params).map(mapear);
  },

  buscarPorId(id) {
    return mapear(getDb().prepare(`${BASE} WHERE p.id = ?`).get(id));
  },

  crear(d) {
    const r = getDb().prepare(
      `INSERT INTO productos (nombre, descripcion, precio, stock, imagen, destacado, categoria_id, marca_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(d.nombre, d.descripcion ?? '', d.precio, d.stock, d.imagen ?? null, d.destacado ?? 0, d.categoria_id, d.marca_id);
    return this.buscarPorId(Number(r.lastInsertRowid));
  },

  actualizar(id, d) {
    const campos = Object.keys(d);
    const sets = campos.map((c) => `${c} = ?`).join(', ');
    getDb()
      .prepare(`UPDATE productos SET ${sets}, actualizado_en = datetime('now') WHERE id = ?`)
      .run(...campos.map((c) => d[c]), id);
    return this.buscarPorId(id);
  },

  eliminar(id) {
    return getDb().prepare('DELETE FROM productos WHERE id = ?').run(id).changes > 0;
  },

  resumenInventario() {
    const db = getDb();
    const t = db.prepare(
      `SELECT COUNT(*) AS totalProductos,
              COALESCE(SUM(stock), 0) AS unidades,
              COALESCE(SUM(stock * precio), 0) AS valorInventario,
              COALESCE(SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END), 0) AS agotados,
              COALESCE(SUM(CASE WHEN stock > 0 AND stock <= ? THEN 1 ELSE 0 END), 0) AS stockBajo
       FROM productos`
    ).get(STOCK_BAJO);
    const alertas = db.prepare(`${BASE} WHERE p.stock <= ? ORDER BY p.stock ASC, p.nombre`).all(STOCK_BAJO).map(mapear);
    return { ...t, umbralStockBajo: STOCK_BAJO, alertas };
  }
};
