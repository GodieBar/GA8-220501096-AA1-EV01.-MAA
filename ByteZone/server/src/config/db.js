// Conexión a SQLite. Usa better-sqlite3 si está instalado; si no, el SQLite integrado de Node (node:sqlite).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { config } from './env.js';

const require = createRequire(import.meta.url);
let db = null;
let driver = null;

function abrir(file) {
  try {
    const Database = require('better-sqlite3');
    const conexion = new Database(file);
    driver = 'better-sqlite3';
    return conexion;
  } catch { /* se intenta la siguiente opción */ }
  try {
    const { DatabaseSync } = require('node:sqlite');
    const conexion = new DatabaseSync(file);
    driver = 'node:sqlite';
    return conexion;
  } catch { /* sin driver disponible */ }
  throw new Error(
    'No hay motor SQLite disponible. Ejecuta "npm install" en la carpeta server. ' +
    'Si better-sqlite3 no se instala, actualiza Node.js a la versión 22 LTS o superior.'
  );
}

export function getDb() {
  if (!db) {
    fs.mkdirSync(path.dirname(config.dbPath), { recursive: true });
    db = abrir(config.dbPath);
    db.exec('PRAGMA foreign_keys = ON');
  }
  return db;
}

export const getDriver = () => driver;

export function transaction(fn) {
  const conexion = getDb();
  conexion.exec('BEGIN');
  try {
    const resultado = fn();
    conexion.exec('COMMIT');
    return resultado;
  } catch (error) {
    conexion.exec('ROLLBACK');
    throw error;
  }
}

export function initDb() {
  const conexion = getDb();
  conexion.exec(fs.readFileSync(config.schemaPath, 'utf8'));
  return conexion;
}
