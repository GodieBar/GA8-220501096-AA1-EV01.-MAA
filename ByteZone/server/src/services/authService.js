// Lógica de autenticación: bcrypt (contraseñas) + JWT (sesión).
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { usuarioModel } from '../models/usuarioModel.js';
import { AppError } from '../middlewares/AppError.js';

const datosPublicos = (u) => ({ id: u.id, nombre: u.nombre, email: u.email, rol: u.rol });

export const authService = {
  generarToken(usuario) {
    return jwt.sign(
      { sub: String(usuario.id), nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );
  },

  verificarToken(token) {
    const p = jwt.verify(token, config.jwtSecret);
    return { id: Number(p.sub), nombre: p.nombre, email: p.email, rol: p.rol };
  },

  async registrar({ nombre, email, password }) {
    if (usuarioModel.buscarPorEmail(email)) throw new AppError(409, 'Ya existe una cuenta con ese correo');
    const passwordHash = await bcrypt.hash(password, config.bcryptRounds);
    // El rol siempre es "cliente": un administrador solo se crea desde la base de datos.
    const usuario = usuarioModel.crear({ nombre, email, passwordHash, rol: 'cliente' });
    return { usuario: datosPublicos(usuario), token: this.generarToken(usuario) };
  },

  async iniciarSesion({ email, password }) {
    const usuario = usuarioModel.buscarPorEmail(email);
    // Mismo mensaje si el correo no existe o la contraseña es incorrecta (no revela cuál falló).
    const coincide = usuario ? await bcrypt.compare(password, usuario.password_hash) : false;
    if (!usuario || !coincide) throw new AppError(401, 'Credenciales inválidas');
    return { usuario: datosPublicos(usuario), token: this.generarToken(usuario) };
  },

  perfil(id) {
    const usuario = usuarioModel.buscarPorId(id);
    if (!usuario) throw new AppError(404, 'Usuario no encontrado');
    return usuario;
  }
};
