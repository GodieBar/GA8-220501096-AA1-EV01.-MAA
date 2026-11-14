import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const [q, setQ] = useState(params.get('q') || '');
  const [min, setMin] = useState(params.get('min') || '');
  const [max, setMax] = useState(params.get('max') || '');

  const get = (k) => params.get(k) || '';

  // Cambia parámetros de la URL (los filtros viven en la URL: se pueden compartir y la tienda recuerda la categoría).
  function actualizar(cambios) {
    setParams((previos) => {
      const sig = new URLSearchParams(previos);
      Object.entries(cambios).forEach(([k, v]) => (v === '' || v === false || v == null ? sig.delete(k) : sig.set(k, v)));
      return sig;
    }, { replace: true });
  }

  useEffect(() => {
    api.categorias().then((r) => setCategorias(r.categorias)).catch(() => {});
    api.marcas().then((r) => setMarcas(r.marcas)).catch(() => {});
  }, []);

  // Búsqueda y precios con pequeña espera para no consultar en cada tecla.
  useEffect(() => {
    const t = setTimeout(() => actualizar({ q: q.trim(), min, max }), 350);
    return () => clearTimeout(t);
  }, [q, min, max]);

  const clave = params.toString();
  useEffect(() => {
    setCargando(true);
    api.productos(Object.fromEntries(params))
      .then((r) => { setProductos(r.productos); setError(''); })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [clave]);

  function limpiar() {
    setQ(''); setMin(''); setMax('');
    setParams({}, { replace: true });
  }

  return (
    <div className="container catalogo">
      <aside className="filtros" aria-label="Filtros">
        <h2>Filtros</h2>

        <label className="campo">Buscar
          <input type="search" placeholder="Ej: Ryzen, RTX, SSD…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>

        <fieldset className="campo">
          <legend>Categoría</legend>
          <label className="radio"><input type="radio" name="cat" checked={!get('categoria')} onChange={() => actualizar({ categoria: '' })} /> Todas</label>
          {categorias.map((c) => (
            <label className="radio" key={c.id}>
              <input type="radio" name="cat" checked={get('categoria') === c.slug} onChange={() => actualizar({ categoria: c.slug })} /> {c.nombre}
            </label>
          ))}
        </fieldset>

        <label className="campo">Marca
          <select value={get('marca')} onChange={(e) => actualizar({ marca: e.target.value })}>
            <option value="">Todas las marcas</option>
            {marcas.map((m) => <option key={m.id} value={m.nombre}>{m.nombre}</option>)}
          </select>
        </label>

        <div className="campo">
          <span>Precio (COP)</span>
          <div className="fila-2">
            <input type="number" min="0" placeholder="Mínimo" value={min} onChange={(e) => setMin(e.target.value)} aria-label="Precio mínimo" />
            <input type="number" min="0" placeholder="Máximo" value={max} onChange={(e) => setMax(e.target.value)} aria-label="Precio máximo" />
          </div>
        </div>

        <label className="radio"><input type="checkbox" checked={get('enStock') === '1'} onChange={(e) => actualizar({ enStock: e.target.checked ? '1' : '' })} /> Solo con stock</label>

        <button className="btn btn-ghost btn-block" onClick={limpiar}>Limpiar filtros</button>
      </aside>

      <section>
        <div className="catalogo-cab">
          <h1>Catálogo</h1>
          <label className="orden">Ordenar por
            <select value={get('orden')} onChange={(e) => actualizar({ orden: e.target.value })}>
              <option value="">Más recientes</option>
              <option value="precio_asc">Precio: menor a mayor</option>
              <option value="precio_desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre (A-Z)</option>
            </select>
          </label>
        </div>

        {error && <p className="alerta alerta-error">{error}</p>}
        {!error && <p className="muted">{cargando ? 'Buscando…' : `${productos.length} producto${productos.length === 1 ? '' : 's'} encontrado${productos.length === 1 ? '' : 's'}`}</p>}

        <div className="grid-productos">
          {productos.map((p) => <ProductCard key={p.id} producto={p} />)}
        </div>
        {!cargando && !error && productos.length === 0 && (
          <div className="vacio"><p>No encontramos productos con esos filtros.</p><button className="btn" onClick={limpiar}>Limpiar filtros</button></div>
        )}
      </section>
    </div>
  );
}
