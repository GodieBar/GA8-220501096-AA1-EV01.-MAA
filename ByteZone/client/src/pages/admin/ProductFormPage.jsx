import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../../api/client.js';

const VACIO = { nombre: '', descripcion: '', precio: '', stock: '', categoria_id: '', marca_id: '', imagen: '', destacado: false };

export default function ProductFormPage() {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(VACIO);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [error, setError] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    api.categorias().then((r) => setCategorias(r.categorias));
    api.marcas().then((r) => setMarcas(r.marcas));
    if (editando) {
      api.producto(id)
        .then(({ producto: p }) => setForm({
          nombre: p.nombre, descripcion: p.descripcion, precio: p.precio, stock: p.stock,
          categoria_id: p.categoria_id, marca_id: p.marca_id, imagen: p.imagen || '', destacado: p.destacado
        }))
        .catch((e) => setError(e.message));
    }
  }, [id]);

  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  async function enviar(e) {
    e.preventDefault();
    setError(''); setDetalles([]); setEnviando(true);
    const datos = {
      ...form,
      precio: form.precio === '' ? '' : Number(form.precio),
      stock: form.stock === '' ? '' : Number(form.stock),
      categoria_id: form.categoria_id === '' ? '' : Number(form.categoria_id),
      marca_id: form.marca_id === '' ? '' : Number(form.marca_id)
    };
    try {
      if (editando) await api.actualizarProducto(id, datos);
      else await api.crearProducto(datos);
      navigate('/admin/productos');
    } catch (err) {
      setError(err.message);
      setDetalles(err.detalles || []);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <h1>{editando ? 'Editar producto' : 'Nuevo producto'}</h1>
      <form className="card form-producto" onSubmit={enviar} noValidate>
        <label className="campo ancho">Nombre
          <input value={form.nombre} onChange={cambiar('nombre')} required />
        </label>
        <label className="campo ancho">Descripción
          <textarea rows="3" value={form.descripcion} onChange={cambiar('descripcion')} />
        </label>
        <label className="campo">Categoría
          <select value={form.categoria_id} onChange={cambiar('categoria_id')} required>
            <option value="">Selecciona…</option>
            {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </label>
        <label className="campo">Marca
          <select value={form.marca_id} onChange={cambiar('marca_id')} required>
            <option value="">Selecciona…</option>
            {marcas.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
          </select>
        </label>
        <label className="campo">Precio (COP)
          <input type="number" min="0" step="1" value={form.precio} onChange={cambiar('precio')} required />
        </label>
        <label className="campo">Stock (unidades)
          <input type="number" min="0" step="1" value={form.stock} onChange={cambiar('stock')} required />
        </label>
        <label className="campo ancho">URL de imagen (opcional)
          <input type="url" placeholder="https://…  (si lo dejas vacío se usa una ilustración)" value={form.imagen} onChange={cambiar('imagen')} />
        </label>
        <label className="radio ancho"><input type="checkbox" checked={form.destacado} onChange={cambiar('destacado')} /> Mostrar como producto destacado</label>

        {error && (
          <div className="alerta alerta-error ancho" role="alert">
            {error}
            {detalles.length > 0 && <ul>{detalles.map((d) => <li key={d}>{d}</li>)}</ul>}
          </div>
        )}

        <div className="ancho acciones-form">
          <button className="btn btn-lg" disabled={enviando}>{enviando ? 'Guardando…' : editando ? 'Guardar cambios' : 'Crear producto'}</button>
          <Link className="btn btn-lg btn-ghost" to="/admin/productos">Cancelar</Link>
        </div>
      </form>
    </>
  );
}
