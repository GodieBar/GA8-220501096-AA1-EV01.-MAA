// Carga los datos iniciales. Uso manual (reinicia la base): npm run seed
import bcrypt from 'bcryptjs';
import { pathToFileURL } from 'node:url';
import { config } from './config/env.js';
import { getDb, initDb, transaction } from './config/db.js';
import {
  usuariosIniciales, categoriasIniciales, marcasIniciales, fichasIniciales, productosIniciales
} from '../../database/seed-data.js';

function cargarDatos(db) {
  transaction(() => {
    const insUsuario = db.prepare('INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES (?, ?, ?, ?)');
    for (const u of usuariosIniciales) {
      insUsuario.run(u.nombre, u.email, bcrypt.hashSync(u.password, config.bcryptRounds), u.rol);
    }
    const insCategoria = db.prepare('INSERT INTO categorias (nombre, slug) VALUES (?, ?)');
    categoriasIniciales.forEach(([nombre, slug]) => insCategoria.run(nombre, slug));
    const insMarca = db.prepare('INSERT INTO marcas (nombre) VALUES (?)');
    marcasIniciales.forEach((nombre) => insMarca.run(nombre));
    const insFicha = db.prepare('INSERT INTO fichas (numero, programa, instructor) VALUES (?, ?, ?)');
    fichasIniciales.forEach((f) => insFicha.run(f.numero, f.programa, f.instructor));

    const catId = db.prepare('SELECT id FROM categorias WHERE slug = ?');
    const marcaId = db.prepare('SELECT id FROM marcas WHERE nombre = ?');
    const insProducto = db.prepare(
      'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, marca_id, destacado) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    for (const [nombre, descripcion, precio, stock, slug, marca, destacado] of productosIniciales) {
      insProducto.run(nombre, descripcion, precio, stock, catId.get(slug).id, marcaId.get(marca).id, destacado);
    }
  });
}

export function seedIfEmpty(db = getDb()) {
  const { n } = db.prepare('SELECT COUNT(*) AS n FROM usuarios').get();
  if (n > 0) return false;
  cargarDatos(db);
  return true;
}

function reiniciar() {
  const db = getDb();
  db.exec('PRAGMA foreign_keys = OFF');
  ['productos', 'fichas', 'marcas', 'categorias', 'usuarios'].forEach((t) => db.exec(`DROP TABLE IF EXISTS ${t}`));
  db.exec('PRAGMA foreign_keys = ON');
  initDb();
  seedIfEmpty(db);
  console.log('Base de datos reiniciada con los datos iniciales:', config.dbPath);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) reiniciar();
