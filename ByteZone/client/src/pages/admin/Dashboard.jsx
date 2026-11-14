import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client.js';
import { formatoPrecio } from '../../api/format.js';

export default function Dashboard() {
  const [inv, setInv] = useState(null);
  const [fichas, setFichas] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.inventario().then(setInv).catch((e) => setError(e.message));
    api.fichas().then(setFichas).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="alerta alerta-error">{error}</p>;
  if (!inv) return <p className="muted">Cargando panel…</p>;

  return (
    <>
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="card stat"><span>Productos</span><strong>{inv.totalProductos}</strong></div>
        <div className="card stat"><span>Unidades en stock</span><strong>{inv.unidades}</strong></div>
        <div className="card stat"><span>Valor del inventario</span><strong>{formatoPrecio(inv.valorInventario)}</strong></div>
        <div className="card stat stat-warn"><span>Stock bajo</span><strong>{inv.stockBajo}</strong></div>
        <div className="card stat stat-bad"><span>Agotados</span><strong>{inv.agotados}</strong></div>
      </div>

      <div className="dos-col">
        <div className="card">
          <h2>Alertas de inventario</h2>
          <p className="muted">Productos con {inv.umbralStockBajo} unidades o menos.</p>
          {inv.alertas.length === 0 ? <p>Sin alertas.</p> : (
            <ul className="lista-alertas">
              {inv.alertas.map((p) => (
                <li key={p.id}>
                  <Link to={`/admin/productos/${p.id}/editar`}>{p.nombre}</Link>
                  <span className={p.stock === 0 ? 'badge badge-bad' : 'badge badge-warn'}>{p.stock === 0 ? 'Agotado' : `${p.stock} uds`}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2>Ruta protegida: /api/fichas</h2>
          <p className="muted">Consulta hecha con tu token JWT. {fichas?.mensaje}</p>
          {fichas ? (
            <table className="tabla">
              <thead><tr><th>Ficha</th><th>Programa</th></tr></thead>
              <tbody>{fichas.fichas.map((f) => <tr key={f.id}><td>{f.numero}</td><td>{f.programa}</td></tr>)}</tbody>
            </table>
          ) : <p className="muted">Cargando…</p>}
        </div>
      </div>
    </>
  );
}
