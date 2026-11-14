// Recibe la petición HTTP, llama al servicio y responde. No contiene lógica de negocio.
import { authService } from '../services/authService.js';

export const authController = {
  async login(req, res) {
    const { usuario, token } = await authService.iniciarSesion(req.body);
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token, usuario });
  },
  async register(req, res) {
    const { usuario, token } = await authService.registrar(req.body);
    res.status(201).json({ mensaje: 'Cuenta creada correctamente', token, usuario });
  },
  perfil(req, res) {
    res.json({ usuario: authService.perfil(req.usuario.id) });
  }
};
