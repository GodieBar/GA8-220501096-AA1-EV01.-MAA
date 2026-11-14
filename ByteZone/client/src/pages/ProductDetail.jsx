import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client.js';
import { formatoPrecio } from '../api/format.js';
import { useCart } from '../context/CartContext.jsx';
import ProductImage from '../components/ProductImage.jsx';
import { EstadoStock } from '../components/ProductCard.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const { agregar } = useCart();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  const [error, setError] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    setP(null); setError(''); setCantidad(1); setAgregado(false);
    api.producto(id).then((r) => setP(r.producto)).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="container estado"><h1>Producto no disponible</h1><p>{error}</p><Link className="btn" to="/catalogo">Volver al catálogo</Link></div>;
  if (!p) return <div className="container estado">Cargando producto…</div>;

  return (
    <div className="container detalle">
      <p className="migas"><Link to="/catalogo">Catálogo</Link> / <Link to={`/catalogo?categoria=${p.categoria_slug}`}>{p.categoria}</Link></p>
      <div className="detalle-grid">
        <ProductImage producto={p} className="detalle-img" />
        <div>
          <p className="producto-meta">{p.marca}</p>
          <h1>{p.nombre}</h1>
          <p className="detalle-precio">{formatoPrecio(p.precio)}</p>
          <EstadoStock stock={p.stock} />
          <p className="detalle-desc">{p.descripcion || 'Sin descripción.'}</p>

          {p.stock > 0 ? (
            <div className="detalle-compra">
              <label>Cantidad
                <input type="number" min="1" max={p.stock} value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, Math.min(p.stock, Number(e.target.value) || 1)))} />
              </label>
              <button className="btn btn-lg" onClick={() => { agregar(p, cantidad); setAgregado(true); }}>Agregar al carrito</button>
            </div>
          ) : <p className="alerta alerta-error">Este producto está agotado por el momento.</p>}

          {agregado && (
            <p className="alerta alerta-ok">
              Producto agregado. <button className="link" onClick={() => navigate('/carrito')}>Ir al carrito</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
