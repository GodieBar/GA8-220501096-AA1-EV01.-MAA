// Envuelve controladores para que los errores lleguen al manejador de errores.
export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
