import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { COSTO_ENVIO, ENVIO_GRATIS_DESDE } from '../api/format.js';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);
const KEY = 'bytezone_carrito';

function leer() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(leer);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  function agregar(p, cantidad = 1) {
    setItems((actual) => {
      const existe = actual.find((i) => i.id === p.id);
      if (existe) {
        return actual.map((i) => (i.id === p.id ? { ...i, stock: p.stock, cantidad: Math.min(i.cantidad + cantidad, p.stock) } : i));
      }
      return [...actual, {
        id: p.id, nombre: p.nombre, precio: p.precio, stock: p.stock, marca: p.marca,
        categoria_slug: p.categoria_slug, imagen: p.imagen, cantidad: Math.min(cantidad, p.stock)
      }];
    });
  }
  const cambiarCantidad = (id, cantidad) =>
    setItems((a) => a.map((i) => (i.id === id ? { ...i, cantidad: Math.max(1, Math.min(cantidad, i.stock)) } : i)));
  const quitar = (id) => setItems((a) => a.filter((i) => i.id !== id));
  const vaciar = () => setItems([]);

  const totales = useMemo(() => {
    const unidades = items.reduce((s, i) => s + i.cantidad, 0);
    const subtotal = items.reduce((s, i) => s + i.cantidad * i.precio, 0);
    const envio = items.length === 0 || subtotal >= ENVIO_GRATIS_DESDE ? 0 : COSTO_ENVIO;
    return { unidades, subtotal, envio, total: subtotal + envio };
  }, [items]);

  return (
    <CartContext.Provider value={{ items, agregar, cambiarCantidad, quitar, vaciar, ...totales }}>
      {children}
    </CartContext.Provider>
  );
}
