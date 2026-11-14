// Acceso a datos de usuarios (única capa que escribe SQL de usuarios).
import { getDb } from '../config/db.js';

export const usuarioModel = {
  buscarPorEmail(email) {
    return getDb().prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
  },
  buscarPorId(id) {
    return getDb().prepare('SELECT id, nombre, email, rol, creado_en FROM usuarios WHERE id = ?').get(id);
  },
  crear({ nombre, email, passwordHash, rol = 'cliente' }) {
    const r = getDb()
      .prepare('INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)')
      .run(nombre, email, passwordHash, rol);
    return this.buscarPorId(Number(r.lastInsertRowid));
  }
};
