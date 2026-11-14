import { useEffect, useState } from 'react';
import { api } from '../../api/client.js';
import { STOCK_BAJO, formatoPrecio } from '../../api/format.js';

export default function Inventory() {
  const [productos, setProductos] = useState([]);
  const [valores, setValores] = useState({});
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargar = () => api.productos({ orden: 'nombre' }).then((r) => { setProductos(r.productos); setValores({}); }).catch((e) => setError(e.message));
  useEffect(() => { cargar(); }, []);

  async function guardar(p) {
    try {
      await api.actualizarProducto(p.id, { stock: Number(valores[p.id]) });
      setMensaje(`Stock de "${p.nombre}" actualizado.`);
      setError('');
      cargar();
    } catch (e) { setError(e.message); setMensaje(''); }
  }

  return (
    <>
      <h1>Inventario</h1>
      {mensaje && <p className="alerta alerta-ok">{mensaje}</p>}
      {error && <p className="alerta alerta-error">{error}</p>}
      <div className="tabla-wrap">
        <table className="tabla">
          <thead><tr><th>Producto</th><th>Precio</th><th>Estado</th><th>Stock</th><th></th></tr></thead>
          <tbody>
            {productos.map((p) => {
              const valor = valores[p.id] ?? p.stock;
              const cambio = String(valor) !== String(p.stock);
              return (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{formatoPrecio(p.precio)}</td>
                  <td>
                    {p.stock === 0 ? <span className="badge badge-bad">Agotado</span>
                      : p.stock <= STOCK_BAJO ? <span className="badge badge-warn">Stock bajo</span>
                      : <span className="badge badge-ok">Normal</span>}
                  </td>
                  <td><input className="stock-input" type="number" min="0" value={valor} onChange={(e) => setValores({ ...valores, [p.id]: e.target.value })} aria-label={`Stock de ${p.nombre}`} /></td>
                  <td><button className="btn btn-sm" disabled={!cambio} onClick={() => guardar(p)}>Guardar</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
