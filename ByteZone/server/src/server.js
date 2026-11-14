import { config } from './config/env.js';
import { initDb, getDriver } from './config/db.js';
import { seedIfEmpty } from './seed.js';
import { crearApp } from './app.js';

try {
  const db = initDb();
  const sembrada = seedIfEmpty(db);
  console.log(`Base de datos lista (${getDriver()}): ${config.dbPath}`);
  if (sembrada) console.log('Se cargaron los datos iniciales (usuarios, categorías, marcas, productos, fichas).');
} catch (error) {
  console.error('No se pudo iniciar la base de datos:', error.message);
  process.exit(1);
}

if (config.usingDefaultSecret) {
  console.warn('AVISO: usando JWT_SECRET de desarrollo. Crea el archivo .env (copia de .env.example) para definir el tuyo.');
}

crearApp().listen(config.port, config.host, () => {
  console.log(`BYTEZONE API escuchando en http://${config.host}:${config.port}`);
  console.log(`Prueba de salud: http://${config.host}:${config.port}/health`);
});
