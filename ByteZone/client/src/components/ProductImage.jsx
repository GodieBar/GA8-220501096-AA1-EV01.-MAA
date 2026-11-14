import { Glyph, colorCategoria } from './Glyphs.jsx';

// Muestra la foto del producto si tiene URL; si no, una ilustración generada por categoría.
export default function ProductImage({ producto, className = '' }) {
  if (producto.imagen) {
    return <img className={`pimg ${className}`} src={producto.imagen} alt={producto.nombre} loading="lazy" />;
  }
  const h = colorCategoria(producto.categoria_slug);
  return (
    <div className={`pimg pimg-gen ${className}`} style={{ background: `linear-gradient(145deg, hsl(${h} 62% 30%), hsl(${h} 70% 16%))` }} role="img" aria-label={producto.nombre}>
      <Glyph slug={producto.categoria_slug} />
      <span className="pimg-marca">{producto.marca}</span>
    </div>
  );
}
