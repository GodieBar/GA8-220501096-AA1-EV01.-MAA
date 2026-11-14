// Validación de solicitudes (sin librerías externas, fácil de explicar).
import { AppError } from './AppError.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validate = (reglas) => (req, res, next) => {
  const { errores, valor } = reglas(req.body && typeof req.body === 'object' ? req.body : {});
  if (errores.length) return next(new AppError(400, 'Datos inválidos', errores));
  req.body = valor;
  next();
};

export function validarId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return next(new AppError(400, 'El id debe ser un número entero positivo'));
  req.params.id = id;
  next();
}

const esTexto = (v) => typeof v === 'string';
const entero = (v) => (typeof v === 'number' || (esTexto(v) && v.trim() !== '')) && Number.isInteger(Number(v));

export function reglasLogin(b) {
  const errores = [];
  if (!esTexto(b.email) || !EMAIL.test(b.email.trim())) errores.push('El correo no tiene un formato válido');
  if (!esTexto(b.password) || b.password.length === 0) errores.push('La contraseña es obligatoria');
  return { errores, valor: { email: esTexto(b.email) ? b.email.trim().toLowerCase() : '', password: b.password } };
}

export function reglasRegistro(b) {
  const errores = [];
  if (!esTexto(b.nombre) || b.nombre.trim().length < 2) errores.push('El nombre debe tener al menos 2 caracteres');
  if (!esTexto(b.email) || !EMAIL.test(b.email.trim())) errores.push('El correo no tiene un formato válido');
  if (!esTexto(b.password) || b.password.length < 8 || !/[A-Za-z]/.test(b.password) || !/\d/.test(b.password)) {
    errores.push('La contraseña debe tener mínimo 8 caracteres, con letras y números');
  }
  return {
    errores,
    valor: { nombre: esTexto(b.nombre) ? b.nombre.trim() : '', email: esTexto(b.email) ? b.email.trim().toLowerCase() : '', password: b.password }
  };
}

// parcial = true para PUT (solo se validan los campos enviados)
export const reglasProducto = (parcial = false) => (b) => {
  const errores = [];
  const valor = {};
  const tiene = (k) => b[k] !== undefined;
  const requerido = (k) => !parcial || tiene(k);

  if (requerido('nombre')) {
    if (!esTexto(b.nombre) || b.nombre.trim().length < 3 || b.nombre.trim().length > 150) errores.push('El nombre debe tener entre 3 y 150 caracteres');
    else valor.nombre = b.nombre.trim();
  }
  if (tiene('descripcion')) {
    if (!esTexto(b.descripcion) || b.descripcion.length > 1000) errores.push('La descripción debe ser texto de máximo 1000 caracteres');
    else valor.descripcion = b.descripcion.trim();
  }
  if (requerido('precio')) {
    if (!entero(b.precio) || Number(b.precio) < 0) errores.push('El precio debe ser un número entero mayor o igual a 0');
    else valor.precio = Number(b.precio);
  }
  if (requerido('stock')) {
    if (!entero(b.stock) || Number(b.stock) < 0) errores.push('El stock debe ser un número entero mayor o igual a 0');
    else valor.stock = Number(b.stock);
  }
  for (const campo of ['categoria_id', 'marca_id']) {
    if (requerido(campo)) {
      if (!entero(b[campo]) || Number(b[campo]) <= 0) errores.push(`${campo} debe ser un id válido`);
      else valor[campo] = Number(b[campo]);
    }
  }
  if (tiene('imagen')) {
    if (b.imagen === null || b.imagen === '') valor.imagen = null;
    else if (!esTexto(b.imagen) || !/^https?:\/\/\S+$/i.test(b.imagen.trim())) errores.push('La imagen debe ser una URL que empiece por http:// o https://');
    else valor.imagen = b.imagen.trim();
  }
  if (tiene('destacado')) {
    if (typeof b.destacado !== 'boolean' && ![0, 1].includes(b.destacado)) errores.push('destacado debe ser true o false');
    else valor.destacado = b.destacado ? 1 : 0;
  }
  if (parcial && Object.keys(b).length === 0) errores.push('Debes enviar al menos un campo para actualizar');
  return { errores, valor };
};
