import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { formatoPrecio, ENVIO_GRATIS_DESDE } from '../api/format.js';
import ProductImage from '../components/ProductImage.jsx';
import { useState } from 'react';

export default function Cart() {
  const { items, cambiarCantidad, quitar, vaciar, subtotal, envio, total } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [finalizado, setFinalizado] = useState(false);

  if (finalizado) {
    return (
      <div className="container estado">
        <h1>¡Gracias por tu compra!</h1>
        <p>Esta es una compra de demostración: el pedido no se guarda ni se cobra.</p>
        <Link className="btn" to="/catalogo">Seguir comprando</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container estado">
        <h1>Tu carrito está vacío</h1>
        <p>Agrega productos desde el catálogo.</p>
        <Link className="btn" to="/catalogo">Ir al catálogo</Link>
      </div>
    );
  }

  function finalizar() {
    if (!usuario) return navigate('/login', { state: { from: '/carrito' } });
    vaciar();
    setFinalizado(true);
  }

  return (
    <div className="container carrito">
      <h1>Carrito de compras</h1>
      <div className="carrito-grid">
        <div className="card">
          {items.map((i) => (
            <div className="item" key={i.id}>
              <Link to={`/producto/${i.id}`}><ProductImage producto={i} className="item-img" /></Link>
              <div className="item-info">
                <Link to={`/producto/${i.id}`}><strong>{i.nombre}</strong></Link>
                <span className="muted">{formatoPrecio(i.precio)} c/u</span>
                <button className="link link-danger" onClick={() => quitar(i.id)}>Eliminar</button>
              </div>
              <div className="cantidad" role="group" aria-label={`Cantidad de ${i.nombre}`}>
                <button onClick={() => cambiarCantidad(i.id, i.cantidad - 1)} disabled={i.cantidad <= 1} aria-label="Restar uno">−</button>
                <span>{i.cantidad}</span>
                <button onClick={() => cambiarCantidad(i.id, i.cantidad + 1)} disabled={i.cantidad >= i.stock} aria-label="Sumar uno">+</button>
              </div>
              <strong className="item-total">{formatoPrecio(i.precio * i.cantidad)}</strong>
            </div>
          ))}
        </div>

        <aside className="card resumen">
          <h2>Resumen</h2>
          <dl>
            <div><dt>Subtotal</dt><dd>{formatoPrecio(subtotal)}</dd></div>
            <div><dt>Envío</dt><dd>{envio === 0 ? 'Gratis' : formatoPrecio(envio)}</dd></div>
            <div className="total"><dt>Total</dt><dd>{formatoPrecio(total)}</dd></div>
          </dl>
          {envio > 0 && <p className="muted">Te faltan {formatoPrecio(ENVIO_GRATIS_DESDE - subtotal)} para envío gratis.</p>}
          <button className="btn btn-lg btn-block" onClick={finalizar}>{usuario ? 'Finalizar compra (demo)' : 'Inicia sesión para comprar'}</button>
          <button className="btn btn-ghost btn-block" onClick={vaciar}>Vaciar carrito</button>
        </aside>
      </div>
    </div>
  );
}
