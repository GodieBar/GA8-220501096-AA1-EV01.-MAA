import { catalogoModel } from '../models/catalogoModel.js';
import { productoModel } from '../models/productoModel.js';

export const catalogoController = {
  categorias: (req, res) => res.json({ categorias: catalogoModel.categorias() }),
  marcas: (req, res) => res.json({ marcas: catalogoModel.marcas() }),
  // Ruta protegida exigida por la evidencia SENA (equivalente a /api/fichas)
  fichas: (req, res) => {
    const fichas = catalogoModel.fichas();
    res.json({ mensaje: `Acceso permitido para ${req.usuario.email}`, total: fichas.length, fichas });
  },
  resumenInventario: (req, res) => res.json(productoModel.resumenInventario())
};
