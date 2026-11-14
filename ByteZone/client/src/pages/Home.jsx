import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';
import { formatoPrecio, ENVIO_GRATIS_DESDE } from '../api/format.js';
import { Glyph, colorCategoria } from '../components/Glyphs.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [destacados, setDestacados] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.categorias(), api.productos({ destacado: 1, orden: 'recientes' })])
      .then(([c, p]) => { setCategorias(c.categorias); setDestacados(p.productos); })
      .catch((e) => setError(e.message));
  }, []);

  const seleccion = destacados.slice(0, 4);
  const totalSeleccion = seleccion.reduce((s, p) => s + p.precio, 0);

  return (
    <>
      <section className="hero">
        <div className="container hero-in">
          <div>
            <h1>El hardware que te falta, al precio que sí puedes pagar.</h1>
            <p className="hero-sub">Computadores, portátiles, procesadores, tarjetas gráficas y periféricos para jugar, estudiar y trabajar sin complicaciones.</p>
            <div className="hero-cta">
              <Link className="btn btn-lg" to="/catalogo">Ver catálogo</Link>
              <Link className="btn btn-lg btn-ghost" to="/catalogo?categoria=portatiles">Ver portátiles</Link>
            </div>
          </div>

          <aside className="specsheet" aria-label="Selección destacada">
            <header><strong>Selección destacada</strong><span>Ficha de compra</span></header>
            {seleccion.length === 0 && !error && <p className="muted pad">Cargando…</p>}
            {seleccion.map((p) => (
              <Link to={`/producto/${p.id}`} className="spec-row" key={p.id}>
                <span className="spec-cat">{p.categoria}</span>
                <span className="spec-nombre">{p.nombre}</span>
                <span className="spec-precio">{formatoPrecio(p.precio)}</span>
              </Link>
            ))}
            {seleccion.length > 0 && (
              <footer><span>Total de la selección</span><strong>{formatoPrecio(totalSeleccion)}</strong></footer>
            )}
          </aside>
        </div>
      </section>

      <div className="container">
        {error && <p className="alerta alerta-error">{error}</p>}

        <section className="seccion">
          <h2>Compra por categoría</h2>
          <div className="categorias">
            {categorias.map((c) => (
              <Link key={c.id} to={`/catalogo?categoria=${c.slug}`} className="categoria"
                style={{ '--h': colorCategoria(c.slug) }}>
                <Glyph slug={c.slug} size={84} />
                <span>{c.nombre}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="seccion">
          <div className="seccion-cab">
            <h2>Productos destacados</h2>
            <Link to="/catalogo">Ver todo el catálogo</Link>
          </div>
          <div className="grid-productos">
            {destacados.map((p) => <ProductCard key={p.id} producto={p} />)}
          </div>
        </section>

        <section className="seccion promos" aria-label="Promociones">
          <div className="promo promo-1">
            <h3>Envío gratis</h3>
            <p>En compras desde {formatoPrecio(ENVIO_GRATIS_DESDE)}. Se aplica automáticamente en tu carrito.</p>
          </div>
          <div className="promo promo-2">
            <h3>Arma tu PC por piezas</h3>
            <p>Combina procesador, tarjeta gráfica, memoria y almacenamiento compatibles.</p>
            <Link to="/catalogo?categoria=procesadores">Empezar por el procesador</Link>
          </div>
          <div className="promo promo-3">
            <h3>Renueva tu almacenamiento</h3>
            <p>SSD NVMe y SATA para que tu equipo arranque en segundos.</p>
            <Link to="/catalogo?categoria=almacenamiento">Ver SSD y discos</Link>
          </div>
        </section>
      </div>
    </>
  );
}
