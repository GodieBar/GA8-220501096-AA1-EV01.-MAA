// Middleware de protección: valida el JWT enviado en "Authorization: Bearer <token>".
import { AppError } from './AppError.js';
import { authService } from '../services/authService.js';

export function verifyToken(req, res, next) {
  const encabezado = req.headers.authorization || '';
  const [esquema, token] = encabezado.split(' ');

  if (esquema !== 'Bearer' || !token) {
    return next(new AppError(401, 'Acceso denegado: token no proporcionado'));
  }
  try {
    req.usuario = authService.verificarToken(token);
    next();
  } catch (error) {
    const mensaje = error.name === 'TokenExpiredError' ? 'Acceso denegado: el token expiró' : 'Acceso denegado: token inválido';
    next(new AppError(401, mensaje));
  }
}

// Control de acceso por rol. Debe usarse DESPUÉS de verifyToken.
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.usuario || !roles.includes(req.usuario.rol)) {
    return next(new AppError(403, 'No tienes permisos para realizar esta acción'));
  }
  next();
};
