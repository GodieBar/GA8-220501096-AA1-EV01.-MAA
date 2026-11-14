import { AppError } from './AppError.js';

export function notFound(req, res, next) {
  next(new AppError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

// Express reconoce un manejador de errores por sus 4 parámetros.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message, ...(err.detalles && { detalles: err.detalles }) });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la solicitud no es un JSON válido' });
  }
  console.error('[ERROR NO CONTROLADO]', err);
  res.status(500).json({ error: 'Error interno del servidor' });
}
