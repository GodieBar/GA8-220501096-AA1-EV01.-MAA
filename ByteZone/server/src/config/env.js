// Carga de variables de entorno y configuración central del servidor.
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(here, '../..');
const projectRoot = path.resolve(serverRoot, '..');

dotenv.config({ path: path.join(projectRoot, '.env') });

const DEFAULT_SECRET = 'bytezone_clave_solo_para_desarrollo_cambiala';

export const config = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || '127.0.0.1',
  jwtSecret: process.env.JWT_SECRET || DEFAULT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2h',
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 10,
  dbPath: path.resolve(serverRoot, process.env.DB_PATH || '../database/bytezone.db'),
  schemaPath: path.join(projectRoot, 'database', 'schema.sql'),
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://127.0.0.1:5173,http://localhost:5173')
    .split(',').map((o) => o.trim()).filter(Boolean),
  usingDefaultSecret: !process.env.JWT_SECRET
};
