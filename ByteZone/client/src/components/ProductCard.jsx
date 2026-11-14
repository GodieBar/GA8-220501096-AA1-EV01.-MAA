import { Link } from 'react-router-dom';
import ProductImage from './ProductImage.jsx';
import { formatoPrecio, STOCK_BAJO } from '../api/format.js';
import { useCart } from '../context/CartContext.jsx';

export function EstadoStock({ stock }) {
  if (stock === 0) return <span className="badge badge-bad">Agotado</span>;
  if (stock <= STOCK_BAJO) return <span className="badge badge-warn">Últimas {stock} unidades</span>;
  return <span className="badge badge-ok">Disponible ({stock})</span>;
}

export default function ProductCard({ producto }) {
  const { agregar } = useCart();
  return (
    <article className="card producto">
      <Link to={`/producto/${producto.id}`} className="producto-img"><ProductImage producto={producto} /></Link>
      <div className="producto-body">
        <p className="producto-meta">{producto.marca} · {producto.categoria}</p>
        <h3><Link to={`/producto/${producto.id}`}>{producto.nombre}</Link></h3>
        <EstadoStock stock={producto.stock} />
        <div className="producto-pie">
          <strong className="precio">{formatoPrecio(producto.precio)}</strong>
          <button className="btn btn-sm" disabled={producto.stock === 0} onClick={() => agregar(producto)}>
            {producto.stock === 0 ? 'Sin stock' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  );
}
