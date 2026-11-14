const cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
export const formatoPrecio = (n) => cop.format(n);
export const ENVIO_GRATIS_DESDE = 1500000;
export const COSTO_ENVIO = 25000;
export const STOCK_BAJO = 5;
