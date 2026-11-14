import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client.js';
import { formatoPrecio } from '../../api/format.js';

export default function AdminProducts() {
  const [productos, setProductos] = useState([]);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargar = () => api.productos({ q: q.trim(), orden: 'recientes' }).then((r) => setProductos(r.productos)).catch((e) => setError(e.message));

  useEffect(() => {
    const t = setTimeout(cargar, 300);
    return () => clearTimeout(t);
  }, [q]);

  async function eliminar(p) {
    if (!window.confirm(`¿Eliminar "${p.nombre}"? Esta acción no se puede deshacer.`)) return;
    try {
      await api.eliminarProducto(p.id);
      setMensaje(`Producto "${p.nombre}" eliminado.`);
      setError('');
      cargar();
    } catch (e) { setError(e.message); }
  }

  return (
    <>
      <div className="admin-cab">
        <h1>Productos</h1>
        <Link className="btn" to="/admin/productos/nuevo">Nuevo producto</Link>
      </div>
      <input className="buscar" type="search" placeholder="Buscar producto…" value={q} onChange={(e) => setQ(e.target.value)} />
      {mensaje && <p className="alerta alerta-ok">{mensaje}</p>}
      {error && <p className="alerta alerta-error">{error}</p>}
      <div className="tabla-wrap">
        <table className="tabla">
          <thead><tr><th>ID</th><th>Producto</th><th>Categoría</th><th>Marca</th><th>Precio</th><th>Stock</th><th></th></tr></thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{p.marca}</td>
                <td>{formatoPrecio(p.precio)}</td>
                <td>{p.stock}</td>
                <td className="acciones">
                  <Link className="btn btn-sm btn-ghost" to={`/admin/productos/${p.id}/editar`}>Editar</Link>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminar(p)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
