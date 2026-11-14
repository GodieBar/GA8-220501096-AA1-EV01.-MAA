import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { getDb, getDriver } from './config/db.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

export function crearApp() {
  const app = express();

  app.use(cors({ origin: config.clientOrigins }));
  app.use(express.json({ limit: '100kb' }));

  app.get('/health', (req, res) => {
    let baseDeDatos = 'conectada';
    try { getDb().prepare('SELECT 1').get(); } catch { baseDeDatos = 'sin conexión'; }
    res.json({ estado: 'ok', servicio: 'BYTEZONE API', baseDeDatos, motorSqlite: getDriver(), fecha: new Date().toISOString() });
  });

  app.use('/api', routes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
