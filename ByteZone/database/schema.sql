-- BYTEZONE - Esquema de base de datos (SQLite)
CREATE TABLE IF NOT EXISTS usuarios (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre        TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  rol           TEXT NOT NULL DEFAULT 'cliente' CHECK (rol IN ('admin', 'cliente')),
  creado_en     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS categorias (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE,
  slug   TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS marcas (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS productos (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre         TEXT NOT NULL,
  descripcion    TEXT NOT NULL DEFAULT '',
  precio         INTEGER NOT NULL CHECK (precio >= 0),   -- pesos colombianos (COP)
  stock          INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  imagen         TEXT,
  destacado      INTEGER NOT NULL DEFAULT 0,
  categoria_id   INTEGER NOT NULL REFERENCES categorias(id),
  marca_id       INTEGER NOT NULL REFERENCES marcas(id),
  creado_en      TEXT NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Tabla usada por la ruta protegida GET /api/fichas (requisito de la evidencia SENA)
CREATE TABLE IF NOT EXISTS fichas (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  numero     TEXT NOT NULL UNIQUE,
  programa   TEXT NOT NULL,
  instructor TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria_id);
CREATE INDEX IF NOT EXISTS idx_productos_marca ON productos(marca_id);
